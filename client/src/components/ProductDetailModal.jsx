import React, { useState } from 'react';
import { X, Copy, Check, ExternalLink, Code2, Activity, ListFilter, ShieldCheck, Tag } from 'lucide-react';

function formatRupiah(number) {
  if (!number || number === '-') return 'Rp 0';
  return 'Rp ' + Number(number).toLocaleString('id-ID');
}

export default function ProductDetailModal({ item, onClose }) {
  const [activeTab, setActiveTab] = useState('json');
  const [copied, setCopied] = useState(false);

  if (!item) return null;

  const pt = item.product_template || item;
  const ga = pt.guaranteed_analysis_as_fed_percent || {};
  const dm = pt.dry_matter_estimates_percent || {};
  const q = pt.quality || {};
  const pr = pt.pricing || {};
  const prov = pt.provenance || {};

  const jsonString = JSON.stringify(item.product_template ? item : { product_template: item }, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-title-wrap">
            <img
              src={pt.photo_url}
              alt={pt.name}
              className="modal-thumb"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=500&auto=format&fit=crop&q=60';
              }}
            />
            <div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4 }}>
                <span className="brand-badge" style={{ position: 'static' }}>{pt.brand}</span>
                <span className={`platform-badge ${pt.type === 'Wet Food' ? 'shopee' : 'tokopedia'}`} style={{ position: 'static' }}>
                  {pt.type}
                </span>
                {q.grain_free && (
                  <span className="savings-chip" style={{ fontSize: 11, padding: '2px 8px' }}>
                    Grain-Free
                  </span>
                )}
              </div>
              <h2 className="modal-title">{pt.name}</h2>
              <div className="modal-sub">
                <span>{pt.life_stage}</span> • <span>Origin: {pt.country_of_origin}</span> • <span>{formatRupiah(pr.price_per_kg_idr)}/kg</span>
              </div>
            </div>
          </div>

          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="modal-nav">
          <button
            className={`modal-tab-btn ${activeTab === 'json' ? 'active' : ''}`}
            onClick={() => setActiveTab('json')}
          >
            <Code2 size={15} />
            <span>Product Template JSON</span>
          </button>
          <button
            className={`modal-tab-btn ${activeTab === 'nutrition' ? 'active' : ''}`}
            onClick={() => setActiveTab('nutrition')}
          >
            <Activity size={15} />
            <span>Guaranteed & Dry Matter (DM%)</span>
          </button>
          <button
            className={`modal-tab-btn ${activeTab === 'ingredients' ? 'active' : ''}`}
            onClick={() => setActiveTab('ingredients')}
          >
            <ListFilter size={15} />
            <span>Ingredients & Quality</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          {/* TAB 1: JSON Template */}
          {activeTab === 'json' && (
            <div className="json-viewer-wrap">
              <div className="json-toolbar">
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                  Standardized <code>product_template</code> Object
                </span>
                <button className="btn-copy" onClick={handleCopy}>
                  {copied ? (
                    <>
                      <Check size={14} style={{ color: '#10b981' }} />
                      <span style={{ color: '#10b981' }}>Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>Copy JSON Template</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="json-code-block">{jsonString}</pre>
            </div>
          )}

          {/* TAB 2: Guaranteed Analysis & Dry Matter */}
          {activeTab === 'nutrition' && (
            <div className="nutrition-grid-view">
              {/* As Fed vs Dry Matter Grid */}
              <div className="nutrition-box">
                <h4 className="nutrition-box-title">📊 Guaranteed Analysis vs Dry Matter Basis (DM%)</h4>
                <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 14 }}>
                  Dry Matter (DM) removes moisture ({ga.moisture_max}%) to reveal real nutrient density & estimated carbohydrates.
                </p>

                <div className="nutrient-table">
                  <div className="nutrient-row header">
                    <span>Nutrient</span>
                    <span>As-Fed Guaranteed</span>
                    <span>Dry Matter (DM Basis)</span>
                  </div>

                  <div className="nutrient-row">
                    <span className="nutrient-name">Crude Protein (min)</span>
                    <span className="nutrient-val as-fed">{ga.crude_protein_min}%</span>
                    <span className="nutrient-val dm" style={{ color: '#10b981' }}>{dm.crude_protein_min}% DM</span>
                  </div>

                  <div className="nutrient-row">
                    <span className="nutrient-name">Crude Fat (min)</span>
                    <span className="nutrient-val as-fed">{ga.crude_fat_min}%</span>
                    <span className="nutrient-val dm" style={{ color: '#ff9966' }}>{dm.crude_fat_min}% DM</span>
                  </div>

                  <div className="nutrient-row">
                    <span className="nutrient-name">Crude Fiber (max)</span>
                    <span className="nutrient-val as-fed">{ga.crude_fiber_max}%</span>
                    <span className="nutrient-val dm">{dm.crude_fiber_max}% DM</span>
                  </div>

                  <div className="nutrient-row">
                    <span className="nutrient-name">Moisture (max)</span>
                    <span className="nutrient-val as-fed">{ga.moisture_max}%</span>
                    <span className="nutrient-val dm" style={{ color: 'var(--text-dim)' }}>0% (Base)</span>
                  </div>

                  <div className="nutrient-row">
                    <span className="nutrient-name">Crude Ash (max)</span>
                    <span className="nutrient-val as-fed">{ga.ash_max}%</span>
                    <span className="nutrient-val dm">{(ga.ash_max / ((100 - ga.moisture_max) / 100)).toFixed(2)}% DM</span>
                  </div>

                  <div className="nutrient-row highlighted">
                    <span className="nutrient-name">🥣 Estimated Carbohydrates (NFE)</span>
                    <span className="nutrient-val as-fed">-</span>
                    <span className="nutrient-val dm" style={{ color: '#38bdf8' }}>{dm.estimated_carbohydrate}% DM</span>
                  </div>
                </div>
              </div>

              {/* Other Nutrients & Energy */}
              <div className="nutrition-box">
                <h4 className="nutrition-box-title">⚡ Energy & Micronutrients</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 10 }}>
                  <div className="stat-pill">
                    <span className="stat-pill-label">Calories</span>
                    <span className="stat-pill-val">{pt.calories?.metabolizable_energy_kcal_per_kg || '-'} kcal/kg</span>
                  </div>
                  <div className="stat-pill">
                    <span className="stat-pill-label">Taurine</span>
                    <span className="stat-pill-val">{pt.other_nutrients_label?.taurine_min_percent !== '-' ? `${pt.other_nutrients_label?.taurine_min_percent}%` : '-'}</span>
                  </div>
                  <div className="stat-pill">
                    <span className="stat-pill-label">Calcium</span>
                    <span className="stat-pill-val">{pt.other_nutrients_label?.calcium_min_percent ? `${pt.other_nutrients_label.calcium_min_percent}%` : '-'}</span>
                  </div>
                  <div className="stat-pill">
                    <span className="stat-pill-label">Phosphorus</span>
                    <span className="stat-pill-val">{pt.other_nutrients_label?.phosphorus_min_percent ? `${pt.other_nutrients_label.phosphorus_min_percent}%` : '-'}</span>
                  </div>
                  <div className="stat-pill">
                    <span className="stat-pill-label">Magnesium</span>
                    <span className="stat-pill-val">{pt.other_nutrients_label?.magnesium_min_percent !== '-' ? `${pt.other_nutrients_label?.magnesium_min_percent}%` : '-'}</span>
                  </div>
                  <div className="stat-pill">
                    <span className="stat-pill-label">Omega-3</span>
                    <span className="stat-pill-val">{pt.other_nutrients_label?.omega_3_min_percent !== '-' ? `${pt.other_nutrients_label?.omega_3_min_percent}%` : '-'}</span>
                  </div>
                </div>

                <div style={{ marginTop: 14, fontSize: 12, color: 'var(--text-dim)', fontStyle: 'italic' }}>
                  Calorie wording: "{pt.calories?.source_label_wording || 'Official label calculation'}"
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Ingredients & Quality */}
          {activeTab === 'ingredients' && (
            <div className="nutrition-grid-view">
              {/* Quality & Score Rationale */}
              <div className="nutrition-box">
                <h4 className="nutrition-box-title">🛡️ Quality & Formulation Rationale</h4>
                <p style={{ fontSize: 13, color: 'var(--text-main)', lineHeight: 1.6, background: 'var(--bg-secondary)', padding: 12, borderRadius: 8 }}>
                  {q.score_rationale || 'Formulasi seimbang untuk kesehatan kucing.'}
                </p>

                <div style={{ marginTop: 14 }}>
                  <h5 style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase' }}>Special Functional Tags</h5>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {q.special_tags?.map((tag) => (
                      <span key={tag} className="tag-pill">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Full Ingredients List */}
              <div className="nutrition-box">
                <h4 className="nutrition-box-title">🥩 Complete Ingredient List ({pt.ingredient_list?.length || 0} items)</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, maxHeight: 220, overflowY: 'auto' }}>
                  {pt.ingredient_list?.map((ing, idx) => (
                    <span
                      key={idx}
                      className={`ingredient-chip ${idx < 5 ? 'primary' : ''}`}
                      title={idx < 5 ? 'Top 5 Primary Ingredient' : ''}
                    >
                      {idx < 5 && <span style={{ color: 'var(--accent-coral)', fontWeight: 800 }}>#{idx + 1} </span>}
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              {/* Provenance & Source */}
              <div className="nutrition-box" style={{ gridColumn: '1 / -1' }}>
                <h4 className="nutrition-box-title">🛒 Marketplace Pricing & Provenance Verification</h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
                  <div>
                    <div style={{ fontSize: 13, color: 'var(--text-main)' }}>
                      <strong>Price Source:</strong> {pr.price_source} ({pr.price_updated_at})
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-dim)' }}>
                      <strong>Data Quality:</strong> {pt.data_quality?.status} • {pt.data_quality?.notes}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {pr.price_source_url && (
                      <a href={pr.price_source_url} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                        <span>Lihat di Toko</span>
                        <ExternalLink size={13} />
                      </a>
                    )}
                    {prov.official_label_url && (
                      <a href={prov.official_label_url} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                        <span>Label Resmi Produsen</span>
                        <ExternalLink size={13} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
