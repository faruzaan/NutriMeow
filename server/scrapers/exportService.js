// Export Service to convert product_template items into JSON and CSV

export function exportToJSON(items) {
  // Returns raw array matching the exact [ { product_template: { ... } } ] format
  const formatted = items.map(item => {
    if (item.product_template) return item;
    return { product_template: item };
  });
  return JSON.stringify(formatted, null, 2);
}

export function exportToCSV(items) {
  if (!items || items.length === 0) {
    return 'ID,Brand,Product Name,Market,Type,Life Stage,Primary Protein,Price per KG (IDR),Price Source,Crude Protein (As Fed %),Crude Fat (As Fed %),Crude Fiber (As Fed %),Moisture (%),Crude Protein (Dry Matter %),Estimated Carb (Dry Matter %),Grain Free,Special Tags,Photo URL,Source URL\n';
  }

  const headers = [
    'ID',
    'Brand',
    'Product Name',
    'Market',
    'Type',
    'Life Stage',
    'Primary Protein',
    'Price per KG (IDR)',
    'Price Source',
    'Crude Protein (As Fed %)',
    'Crude Fat (As Fed %)',
    'Crude Fiber (As Fed %)',
    'Moisture (%)',
    'Crude Protein (Dry Matter %)',
    'Estimated Carb (Dry Matter %)',
    'Grain Free',
    'Special Tags',
    'Photo URL',
    'Source URL'
  ];

  const escapeCSV = (val) => {
    if (val === undefined || val === null) return '""';
    const str = Array.isArray(val) ? val.join('; ') : String(val);
    return `"${str.replace(/"/g, '""')}"`;
  };

  const rows = items.map(item => {
    const pt = item.product_template || item;
    const ga = pt.guaranteed_analysis_as_fed_percent || {};
    const dm = pt.dry_matter_estimates_percent || {};
    const pr = pt.pricing || {};
    const q = pt.quality || {};

    return [
      escapeCSV(pt.id),
      escapeCSV(pt.brand),
      escapeCSV(pt.name),
      escapeCSV(pt.market),
      escapeCSV(pt.type),
      escapeCSV(pt.life_stage),
      escapeCSV(pt.primary_protein),
      escapeCSV(pr.price_per_kg_idr),
      escapeCSV(pr.price_source),
      escapeCSV(ga.crude_protein_min),
      escapeCSV(ga.crude_fat_min),
      escapeCSV(ga.crude_fiber_max),
      escapeCSV(ga.moisture_max),
      escapeCSV(dm.crude_protein_min),
      escapeCSV(dm.estimated_carbohydrate),
      escapeCSV(q.grain_free ? 'Yes' : 'No'),
      escapeCSV(q.special_tags),
      escapeCSV(pt.photo_url),
      escapeCSV(pt.source_url)
    ].join(',');
  });

  return [headers.join(','), ...rows].join('\n');
}
