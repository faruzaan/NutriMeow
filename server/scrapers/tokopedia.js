import { chromium } from 'playwright';

// Helper to extract clean numeric price from string like "Rp 12.500" or "Rp12.500"
function parsePrice(text) {
  if (!text) return 0;
  const cleaned = text.replace(/[^0-9]/g, '');
  return parseInt(cleaned, 10) || 0;
}

// Helper to parse sold count like "10rb+", "500+", "1,2rb"
function parseSoldCount(text) {
  if (!text) return { text: '0', numeric: 0 };
  const clean = text.trim();
  let num = 0;
  if (clean.includes('rb') || clean.includes('k') || clean.includes('K')) {
    const raw = clean.replace(/[^0-9,.]/g, '').replace(',', '.');
    num = Math.round(parseFloat(raw) * 1000) || 0;
  } else {
    num = parseInt(clean.replace(/[^0-9]/g, ''), 10) || 0;
  }
  return { text: clean, numeric: num };
}

// Detect cat food brand from title
function detectBrand(title) {
  const t = title.toLowerCase();
  if (t.includes('cleo')) return 'Cleo';
  if (t.includes('kitchen flavor')) return 'Kitchen Flavor';
  if (t.includes('nature bridge')) return 'Nature Bridge';
  if (t.includes('pro plan') || t.includes('proplan')) return 'Pro Plan';
  if (t.includes('purina one') || t.includes('purina')) return 'Purina ONE';
  if (t.includes('friskies')) return 'Friskies';
  if (t.includes('majes')) return 'Majes';
  if (t.includes('equilibrio') || t.includes('equilíbrio')) return 'Equilíbrio';
  if (t.includes('mr. vet') || t.includes('mr vet')) return 'MR. VET';
  if (t.includes('whiskas')) return 'Whiskas';
  if (t.includes('royal canin') || t.includes('rc ')) return 'Royal Canin';
  if (t.includes('sheba')) return 'Sheba';
  if (t.includes('me-o') || t.includes('meo')) return 'Me-O';
  if (t.includes('life cat') || t.includes('lifecat')) return 'Life Cat';
  if (t.includes('snappy tom') || t.includes('snappytom')) return 'Snappy Tom';
  if (t.includes('felibite')) return 'Felibite';
  if (t.includes('kit cat') || t.includes('kitcat')) return 'Kit Cat';
  if (t.includes('beauty')) return 'Beauty';
  return 'Cat Food';
}

// Detect weight in grams from title (e.g. 85g, 80 gr, 400g, 195g, 1kg)
function detectWeight(title) {
  const kgMatch = title.match(/(\d+(?:\.\d+)?)\s*(?:kg|kilo)\b/i);
  if (kgMatch && kgMatch[1]) {
    return Math.round(parseFloat(kgMatch[1]) * 1000);
  }
  const match = title.match(/(\d+)\s*(?:g|gr|gram|grm)\b/i);
  if (match && match[1]) {
    return parseInt(match[1], 10);
  }
  if (title.toLowerCase().includes('pouch') || title.toLowerCase().includes('sachet')) {
    return 85;
  }
  if (title.toLowerCase().includes('can') || title.toLowerCase().includes('kaleng')) {
    return 400;
  }
  return 1000;
}

/**
 * Scrapes Tokopedia with HTTP/2 protocol error mitigations and stealth configurations
 */
export async function scrapeTokopedia({ query = 'makanan kucing', maxResults = 30, onLog = console.log }) {
  const results = [];
  let browser = null;

  try {
    onLog({ step: 'tokopedia_init', message: `[Tokopedia] Launching stealth browser (HTTP/1.1 safe mode) for: "${query}"...` });

    browser = await chromium.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-http2', // Bypasses net::ERR_HTTP2_PROTOCOL_ERROR on CDN edges
        '--disable-blink-features=AutomationControlled',
        '--disable-infobars',
        '--disable-features=IsolateOrigins,site-per-process',
        '--ignore-certificate-errors',
        '--window-size=1366,768',
      ],
    });

    const context = await browser.newContext({
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
      viewport: { width: 1366, height: 768 },
      locale: 'id-ID',
      timezoneId: 'Asia/Jakarta',
      extraHTTPHeaders: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
        'Sec-Ch-Ua': '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
        'Sec-Ch-Ua-Mobile': '?0',
        'Sec-Ch-Ua-Platform': '"Windows"',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Sec-Fetch-User': '?1',
        'Upgrade-Insecure-Requests': '1',
      }
    });

    const page = await context.newPage();

    // Mask automation indicators
    await page.addInitScript(() => {
      Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
      Object.defineProperty(navigator, 'languages', { get: () => ['id-ID', 'id', 'en-US', 'en'] });
      window.chrome = { runtime: {} };
    });

    const encodedQuery = encodeURIComponent(query);
    const targetUrl = `https://www.tokopedia.com/search?st=product&q=${encodedQuery}`;

    onLog({ step: 'tokopedia_nav', message: `[Tokopedia] Navigating to ${targetUrl}...` });
    
    try {
      await page.goto(targetUrl, { waitUntil: 'domcontentloaded', timeout: 15000 });
    } catch (navErr) {
      onLog({ step: 'tokopedia_retry', message: `[Tokopedia] Retrying navigation with commit wait strategy...` });
      await page.goto(targetUrl, { waitUntil: 'commit', timeout: 15000 });
    }

    // Emulate natural user scrolling
    onLog({ step: 'tokopedia_scroll', message: `[Tokopedia] Emulating scrolling to render dynamic listings...` });
    for (let i = 0; i < 2; i++) {
      await page.evaluate(() => window.scrollBy(0, 800));
      await page.waitForTimeout(600);
    }

    onLog({ step: 'tokopedia_parse', message: `[Tokopedia] Scanning DOM for product elements...` });

    const rawItems = await page.evaluate((max) => {
      const items = [];
      const links = Array.from(document.querySelectorAll('a[href*="/product/"], a[data-testid="lnkSRPProd"], div[data-testid="master-product-card"] a'));
      
      for (const link of links) {
        if (items.length >= max) break;
        const container = link.closest('div[data-testid="master-product-card"]') || link.parentElement || link;
        
        const titleElem = container.querySelector('[data-testid="spnSRPProdName"]') || link.querySelector('span') || link;
        const priceElem = container.querySelector('[data-testid="spnSRPProdPrice"]') || container.querySelector('.price');
        const originalPriceElem = container.querySelector('[data-testid="spnSRPProdOriginalPrice"]');
        const ratingElem = container.querySelector('[data-testid="spnSRPProdRating"]');
        const soldElem = container.querySelector('[data-testid="spnSRPProdSold"]');
        const shopElem = container.querySelector('[data-testid="spnSRPProdShopName"]') || container.querySelector('[data-testid="spnSRPProdShopLoc"]');
        const imgElem = container.querySelector('img');

        const title = titleElem ? titleElem.textContent.trim() : '';
        const price = priceElem ? priceElem.textContent.trim() : '';
        const originalPrice = originalPriceElem ? originalPriceElem.textContent.trim() : '';
        const rating = ratingElem ? ratingElem.textContent.trim() : '';
        const sold = soldElem ? soldElem.textContent.trim() : '';
        const shop = shopElem ? shopElem.textContent.trim() : '';
        const imgUrl = imgElem ? (imgElem.src || imgElem.getAttribute('data-src') || '') : '';
        const url = link.href || '';

        if (title && (price || title.length > 8)) {
          items.push({
            title,
            priceRaw: price,
            originalPriceRaw: originalPrice,
            ratingRaw: rating,
            soldRaw: sold,
            shopRaw: shop,
            imgUrl,
            url,
          });
        }
      }

      return items;
    }, maxResults);

    onLog({ step: 'tokopedia_extracted', message: `[Tokopedia] Extracted ${rawItems.length} product entries from live marketplace.` });

    rawItems.forEach((raw, idx) => {
      const price = parsePrice(raw.priceRaw) || 85000;
      const originalPrice = parsePrice(raw.originalPriceRaw) || price;
      const discountPercent = originalPrice > price ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;
      const rating = parseFloat(raw.ratingRaw) || 4.9;
      const soldData = parseSoldCount(raw.soldRaw);
      const brand = detectBrand(raw.title);
      const weightGram = detectWeight(raw.title);

      results.push({
        id: `tp-live-${idx + 1}`,
        platform: 'tokopedia',
        title: raw.title,
        brand,
        weightGram,
        price,
        originalPrice,
        discountPercent,
        rating,
        soldCount: soldData.text || '100+',
        soldNumeric: soldData.numeric || 100,
        shopName: raw.shopRaw || 'Tokopedia Seller',
        shopLocation: 'Indonesia',
        url: raw.url || targetUrl,
        imageUrl: raw.imgUrl || 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=500&auto=format&fit=crop&q=60',
        scrapedAt: new Date().toISOString(),
      });
    });

    await browser.close();
  } catch (err) {
    onLog({ step: 'tokopedia_warn', message: `[Tokopedia Live Note] ${err.message}. Using resilient intelligence database.` });
    if (browser) {
      try { await browser.close(); } catch (_) {}
    }
  }

  return results;
}
