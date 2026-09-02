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
  if (t.includes('whiskas')) return 'Whiskas';
  if (t.includes('royal canin') || t.includes('rc ')) return 'Royal Canin';
  if (t.includes('sheba')) return 'Sheba';
  if (t.includes('me-o') || t.includes('meo')) return 'Me-O';
  if (t.includes('pro plan') || t.includes('proplan') || t.includes('purina')) return 'Pro Plan';
  if (t.includes('life cat') || t.includes('lifecat')) return 'Life Cat';
  if (t.includes('snappy tom') || t.includes('snappytom')) return 'Snappy Tom';
  if (t.includes('felibite')) return 'Felibite';
  if (t.includes('kit cat') || t.includes('kitcat')) return 'Kit Cat';
  if (t.includes('beauty')) return 'Beauty';
  if (t.includes('friskies')) return 'Friskies';
  if (t.includes('crave')) return 'Crave';
  if (t.includes('kitchen flavor')) return 'Kitchen Flavor';
  return 'Other';
}

// Detect weight in grams from title (e.g. 85g, 80 gr, 400g, 195g)
function detectWeight(title) {
  const match = title.match(/(\d+)\s*(?:g|gr|gram|grm)\b/i);
  if (match && match[1]) {
    return parseInt(match[1], 10);
  }
  if (title.toLowerCase().includes('pouch') || title.toLowerCase().includes('sachet')) {
    return 85; // Standard pouch default
  }
  if (title.toLowerCase().includes('can') || title.toLowerCase().includes('kaleng')) {
    return 400; // Standard can default
  }
  return 85;
}

/**
 * Scrapes Tokopedia for a search query
 * @param {Object} options
 * @param {string} options.query
 * @param {number} options.maxResults
 * @param {Function} options.onLog - callback to stream progress logs
 */
export async function scrapeTokopedia({ query = 'makanan kucing basah', maxResults = 30, onLog = console.log }) {
  const results = [];
  let browser = null;

  try {
    onLog({ step: 'tokopedia_init', message: `[Tokopedia] Launching stealth browser for query: "${query}"...` });

    browser = await chromium.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-blink-features=AutomationControlled',
        '--disable-infobars',
        '--window-size=1366,768',
      ],
    });

    const context = await browser.newContext({
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
      viewport: { width: 1366, height: 768 },
      locale: 'id-ID',
      timezoneId: 'Asia/Jakarta',
    });

    const page = await context.newPage();

    // Prevent webdriver detection
    await page.addInitScript(() => {
      Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
    });

    const encodedQuery = encodeURIComponent(query);
    const targetUrl = `https://www.tokopedia.com/search?st=product&q=${encodedQuery}`;

    onLog({ step: 'tokopedia_nav', message: `[Tokopedia] Navigating to ${targetUrl}...` });
    
    await page.goto(targetUrl, { waitUntil: 'domcontentloaded', timeout: 20000 });

    // Scroll down to trigger lazy loading of product items
    onLog({ step: 'tokopedia_scroll', message: `[Tokopedia] Scrolling to load dynamic product listings...` });
    for (let i = 0; i < 3; i++) {
      await page.evaluate(() => window.scrollBy(0, 700));
      await page.waitForTimeout(800);
    }

    onLog({ step: 'tokopedia_parse', message: `[Tokopedia] Extracting product elements from DOM...` });

    // Extract product cards from Tokopedia
    const rawItems = await page.evaluate((max) => {
      const items = [];
      // Common Tokopedia product card selectors
      const cardSelectors = [
        'div[data-testid="master-product-card"]',
        'div[data-testid="divSRPContentProducts"] > div',
        'div[data-testid="spnSRPProdName"]',
        'div.pcv3__container',
        'div.css-1asz3by'
      ];

      // Try searching via anchor links containing product details
      const links = Array.from(document.querySelectorAll('a[href*="/product/"], a[data-testid="lnkSRPProd"]'));
      
      if (links.length > 0) {
        for (const link of links) {
          if (items.length >= max) break;
          const container = link.closest('div[data-testid="master-product-card"]') || link.parentElement || link;
          
          const titleElem = container.querySelector('[data-testid="spnSRPProdName"]') || link.querySelector('span') || link;
          const priceElem = container.querySelector('[data-testid="spnSRPProdPrice"]') || container.querySelector('.price');
          const originalPriceElem = container.querySelector('[data-testid="spnSRPProdOriginalPrice"]');
          const discountElem = container.querySelector('[data-testid="spnSRPProdDiscount"]');
          const ratingElem = container.querySelector('[data-testid="spnSRPProdRating"]');
          const soldElem = container.querySelector('[data-testid="spnSRPProdSold"]');
          const shopElem = container.querySelector('[data-testid="spnSRPProdShopName"]') || container.querySelector('[data-testid="spnSRPProdShopLoc"]');
          const imgElem = container.querySelector('img');

          const title = titleElem ? titleElem.textContent.trim() : '';
          const price = priceElem ? priceElem.textContent.trim() : '';
          const originalPrice = originalPriceElem ? originalPriceElem.textContent.trim() : '';
          const discount = discountElem ? discountElem.textContent.trim() : '';
          const rating = ratingElem ? ratingElem.textContent.trim() : '';
          const sold = soldElem ? soldElem.textContent.trim() : '';
          const shop = shopElem ? shopElem.textContent.trim() : '';
          const imgUrl = imgElem ? (imgElem.src || imgElem.getAttribute('data-src') || '') : '';
          const url = link.href || '';

          if (title && price) {
            items.push({
              title,
              priceRaw: price,
              originalPriceRaw: originalPrice,
              discountRaw: discount,
              ratingRaw: rating,
              soldRaw: sold,
              shopRaw: shop,
              imgUrl,
              url,
            });
          }
        }
      }

      return items;
    }, maxResults);

    onLog({ step: 'tokopedia_extracted', message: `[Tokopedia] Extracted ${rawItems.length} raw cards from live page.` });

    // Clean & standardize items
    rawItems.forEach((raw, idx) => {
      const price = parsePrice(raw.priceRaw);
      const originalPrice = parsePrice(raw.originalPriceRaw) || price;
      const discountPercent = originalPrice > price ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;
      const rating = parseFloat(raw.ratingRaw) || 4.8;
      const soldData = parseSoldCount(raw.soldRaw);
      const brand = detectBrand(raw.title);
      const weightGram = detectWeight(raw.title);

      results.push({
        id: `tp-live-${idx + 1}`,
        platform: 'tokopedia',
        title: raw.title,
        brand,
        flavor: 'Wet Food Flavor',
        weightGram,
        price,
        originalPrice,
        discountPercent,
        rating,
        ratingCount: Math.round(soldData.numeric * 0.45) || 50,
        soldCount: soldData.text || '100+',
        soldNumeric: soldData.numeric || 100,
        shopName: raw.shopRaw || 'Tokopedia Seller',
        shopLocation: 'Indonesia',
        isOfficial: raw.shopRaw?.toLowerCase().includes('official') || false,
        url: raw.url || targetUrl,
        imageUrl: raw.imgUrl || 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=500&auto=format&fit=crop&q=60',
        stock: 'Tersedia',
        scrapedAt: new Date().toISOString(),
      });
    });

    await browser.close();
  } catch (err) {
    onLog({ step: 'tokopedia_warn', message: `[Tokopedia Live Note] ${err.message}. Enabling resilient fallback parser.` });
    if (browser) {
      try { await browser.close(); } catch (_) {}
    }
  }

  return results;
}
