import React from 'react';
import { ExternalLink, Star, Code2, Sparkles, Activity } from 'lucide-react';

function formatRupiah(number) {
  if (!number) return 'Rp 0';
  return 'Rp ' + Number(number).toLocaleString('id-ID');
}

export default function ProductCard({ item, onInspect }) {
  const pt = item.product_template || item;
  const isWet = pt.type === 'Wet Food';
  const ga = pt.guaranteed_analysis_as_fed_percent || {};
  const dm = pt.dry_matter_estimates_percent || {};
  const pr = pt.pricing || {};
  const q = pt.quality || {};

  return (
    <div className="product-card">
      <div className="card-image-wrap">
        <img
          src={pt.photo_url}
          alt={pt.name}
          className="product-img"
          loading="lazy"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=500&auto=format&fit=crop&q=60';
          }}
        />

        {/* Food Type Badge */}
        <div className={`platform-badge ${isWet ? 'shopee' : 'tokopedia'}`}>
          <span>{pt.type || 'Cat Food'}</span>
        </div>

        {/* Brand Badge */}
        {pt.brand && (
          <div className="brand-badge">
            {pt.brand}
          </div>
        )}

        {/* Grain-Free Badge */}
        {q.grain_free && (
          <div className="discount-badge" style={{ background: '#059669' }}>
            Grain-Free
          </div>
        )}
      </div>

      <div className="card-content">
        <h3 className="product-title" title={pt.name}>
          {pt.name}
        </h3>

        {/* Pricing Block */}
        <div>
          <div className="price-container">
            <span className="current-price">{formatRupiah(pr.price_per_kg_idr)}</span>
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>/kg</span>
          </div>

          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 6 }}>
            <span className="price-per-gram-pill" style={{ color: '#10b981', background: 'rgba(16, 185, 129, 0.12)' }}>
              🍗 Protein: {ga.crude_protein_min}% ({dm.crude_protein_min}% DM)
            </span>
            <span className="price-per-gram-pill" style={{ color: '#38bdf8', background: 'rgba(56, 189, 248, 0.12)' }}>
              🥣 Carb: {dm.estimated_carbohydrate}% DM
            </span>
          </div>
        </div>

        {/* Special Functional Tags */}
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', margin: '4px 0' }}>
          {q.special_tags?.slice(0, 3).map(tag => (
            <span key={tag} style={{ fontSize: 10, color: 'var(--text-dim)', background: 'var(--bg-secondary)', padding: '2px 6px', borderRadius: 4 }}>
              #{tag}
            </span>
          ))}
        </div>

        {/* Meta row */}
        <div className="card-meta-row">
          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
            🎯 {pt.life_stage}
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-dim)' }}>
            📍 {pt.country_of_origin}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="card-actions" style={{ display: 'flex', gap: 6 }}>
          <button
            type="button"
            onClick={() => onInspect && onInspect(item)}
            className="view-store-btn"
            style={{ background: 'var(--accent-gradient-subtle)', color: 'var(--accent-peach)', borderColor: 'var(--border-active)' }}
          >
            <Code2 size={13} />
            <span>Inspect Template & Nutrition</span>
          </button>

          {pr.price_source_url && (
            <a
              href={pr.price_source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="view-store-btn"
              style={{ width: 'auto', padding: '0 12px' }}
              title="Open Marketplace Store"
            >
              <ExternalLink size={13} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
