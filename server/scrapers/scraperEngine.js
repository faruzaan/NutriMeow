import { scrapeTokopedia } from './tokopedia.js';
import { scrapeShopee } from './shopee.js';
import { getFilteredProductTemplates, MASTER_PRODUCT_TEMPLATES } from './fallbackData.js';
import { buildProductTemplate } from './productTemplateMapper.js';

export async function runScraper({
  query = 'makanan kucing basah',
  platforms = ['tokopedia', 'shopee'],
  brand = 'all',
  type = 'all',
  maxResults = 40,
  sortBy = 'relevance',
  mode = 'live', // 'live' or 'cache'
  onLog = () => {}
}) {
  const startTime = Date.now();
  onLog({ step: 'start', message: `🚀 Starting scrape job: "${query}" | Type: ${type} | Mode: ${mode}` });

  let rawItems = [];

  if (mode === 'live') {
    const perPlatformLimit = Math.ceil(maxResults / (platforms.length || 1));
    const scrapePromises = [];

    if (platforms.includes('tokopedia')) {
      scrapePromises.push(
        scrapeTokopedia({ query, maxResults: perPlatformLimit, onLog })
          .catch(err => {
            onLog({ step: 'error_tokopedia', message: `⚠️ Tokopedia live note: ${err.message}` });
            return [];
          })
      );
    }

    if (platforms.includes('shopee')) {
      scrapePromises.push(
        scrapeShopee({ query, maxResults: perPlatformLimit, onLog })
          .catch(err => {
            onLog({ step: 'error_shopee', message: `⚠️ Shopee live note: ${err.message}` });
            return [];
          })
      );
    }

    const scrapedArrays = await Promise.all(scrapePromises);
    const liveScraped = scrapedArrays.flat();

    onLog({ step: 'merged_live', message: `📦 Extracted ${liveScraped.length} listings from live marketplace browsers.` });

    // Map live items into product_template
    const liveTemplates = liveScraped.map(item => buildProductTemplate(item));

    // Enrich with verified master dataset
    const fallbackTemplates = getFilteredProductTemplates({
      query,
      brand,
      type,
      maxResults,
      sortBy
    });

    const existingNames = new Set(liveTemplates.map(t => t.product_template.name.toLowerCase()));
    const enrichedFallbacks = fallbackTemplates.filter(f => !existingNames.has(f.product_template.name.toLowerCase()));

    rawItems = [...liveTemplates, ...enrichedFallbacks];
  } else {
    onLog({ step: 'cached_mode', message: `⚡ Generating nutritional & marketplace intelligence from verified templates...` });
    rawItems = getFilteredProductTemplates({
      query,
      brand,
      type,
      maxResults,
      sortBy
    });
  }

  // Filter by Food Type (Wet Food / Dry Food)
  if (type && type !== 'all') {
    rawItems = rawItems.filter(item => {
      const t = item.product_template.type.toLowerCase();
      return t.includes(type.toLowerCase());
    });
  }

  // Filter by Brand
  if (brand && brand !== 'all') {
    rawItems = rawItems.filter(item => item.product_template.brand.toLowerCase() === brand.toLowerCase());
  }

  // Sort results
  if (sortBy === 'price_asc') {
    rawItems.sort((a, b) => (a.product_template.pricing?.price_per_kg_idr || 0) - (b.product_template.pricing?.price_per_kg_idr || 0));
  } else if (sortBy === 'price_desc') {
    rawItems.sort((a, b) => (b.product_template.pricing?.price_per_kg_idr || 0) - (a.product_template.pricing?.price_per_kg_idr || 0));
  } else if (sortBy === 'protein_desc') {
    rawItems.sort((a, b) => (b.product_template.dry_matter_estimates_percent?.crude_protein_min || 0) - (a.product_template.dry_matter_estimates_percent?.crude_protein_min || 0));
  } else if (sortBy === 'carb_asc') {
    rawItems.sort((a, b) => (a.product_template.dry_matter_estimates_percent?.estimated_carbohydrate || 0) - (b.product_template.dry_matter_estimates_percent?.estimated_carbohydrate || 0));
  }

  const finalItems = rawItems.slice(0, maxResults);
  const durationMs = Date.now() - startTime;

  // Compute Analytics and Comparisons
  const analytics = computeAnalytics(finalItems);
  const comparisons = computeComparisons(finalItems);

  onLog({ step: 'complete', message: `✨ Processing complete in ${(durationMs / 1000).toFixed(2)}s. Standardized ${finalItems.length} product templates.` });

  return {
    success: true,
    query,
    count: finalItems.length,
    durationMs,
    items: finalItems,
    analytics,
    comparisons
  };
}

function computeAnalytics(items) {
  if (!items.length) {
    return {
      totalProducts: 0,
      avgPricePerKg: 0,
      minPricePerKg: 0,
      maxPricePerKg: 0,
      avgProteinDM: 0,
      avgCarbDM: 0,
      grainFreeCount: 0,
      brandCounts: {},
      brandAvgPrices: {}
    };
  }

  let totalPriceKg = 0;
  let totalProteinDM = 0;
  let totalCarbDM = 0;
  let grainFreeCount = 0;

  const pricesKg = [];
  const brandCounts = {};
  const brandPriceSums = {};

  items.forEach(item => {
    const pt = item.product_template || item;
    const priceKg = pt.pricing?.price_per_kg_idr || 0;
    const proteinDM = pt.dry_matter_estimates_percent?.crude_protein_min || 0;
    const carbDM = pt.dry_matter_estimates_percent?.estimated_carbohydrate || 0;

    if (priceKg > 0) {
      pricesKg.push(priceKg);
      totalPriceKg += priceKg;
    }
    totalProteinDM += proteinDM;
    totalCarbDM += carbDM;
    if (pt.quality?.grain_free) grainFreeCount++;

    const b = pt.brand || 'Other';
    brandCounts[b] = (brandCounts[b] || 0) + 1;
    if (!brandPriceSums[b]) brandPriceSums[b] = { total: 0, count: 0 };
    if (priceKg > 0) {
      brandPriceSums[b].total += priceKg;
      brandPriceSums[b].count += 1;
    }
  });

  const avgPricePerKg = pricesKg.length ? Math.round(totalPriceKg / pricesKg.length) : 0;
  const minPricePerKg = pricesKg.length ? Math.min(...pricesKg) : 0;
  const maxPricePerKg = pricesKg.length ? Math.max(...pricesKg) : 0;
  const avgProteinDM = Number((totalProteinDM / items.length).toFixed(1));
  const avgCarbDM = Number((totalCarbDM / items.length).toFixed(1));

  const brandAvgPrices = {};
  for (const [b, data] of Object.entries(brandPriceSums)) {
    brandAvgPrices[b] = data.count > 0 ? Math.round(data.total / data.count) : 0;
  }

  return {
    totalProducts: items.length,
    avgPricePerKg,
    minPricePerKg,
    maxPricePerKg,
    avgProteinDM,
    avgCarbDM,
    grainFreeCount,
    brandCounts,
    brandAvgPrices
  };
}

function computeComparisons(items) {
  const comparisons = [];
  const brandGroups = {};

  items.forEach(item => {
    const pt = item.product_template || item;
    const key = pt.brand.toLowerCase();
    if (!brandGroups[key]) brandGroups[key] = [];
    brandGroups[key].push(pt);
  });

  for (const [brand, products] of Object.entries(brandGroups)) {
    if (products.length >= 2) {
      const sortedByPrice = [...products].sort((a, b) => (a.pricing?.price_per_kg_idr || 0) - (b.pricing?.price_per_kg_idr || 0));
      const lowest = sortedByPrice[0];
      const highest = sortedByPrice[sortedByPrice.length - 1];

      if (lowest.pricing?.price_per_kg_idr !== highest.pricing?.price_per_kg_idr) {
        const diff = (highest.pricing?.price_per_kg_idr || 0) - (lowest.pricing?.price_per_kg_idr || 0);
        const savingsPercent = highest.pricing?.price_per_kg_idr > 0 ? Math.round((diff / highest.pricing.price_per_kg_idr) * 100) : 0;

        comparisons.push({
          brand: lowest.brand,
          lowestItem: lowest,
          highestItem: highest,
          priceDifferenceKg: diff,
          savingsPercent
        });
      }
    }
  }

  return comparisons;
}
