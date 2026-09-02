import React from 'react';
import { Award, ExternalLink, Sparkles, Code2 } from 'lucide-react';

function formatRupiah(number) {
  if (!number) return 'Rp 0';
  return 'Rp ' + Number(number).toLocaleString('id-ID');
}

export default function MarketCompare({ comparisons = [], onInspect }) {
  if (!comparisons || comparisons.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">⚖️</div>
        <h3 className="empty-title">Multi-Product Comparison</h3>
        <p className="empty-desc">
          Compare pricing variance, protein levels, and dry matter carbohydrates across brand variants.
        </p>
      </div>
    );
  }

  return (
    <div className="compare-container">
      {comparisons.map((comp, idx) => {
        const lowest = comp.lowestItem;
        const highest = comp.highestItem;

        return (
          <div key={idx} className="compare-card">
            <div className="compare-header">
              <div className="brand-deal-tag">
                <span>{comp.brand} Product Line Price Variance</span>
              </div>
              {comp.savingsPercent > 0 && (
                <div className="savings-chip">
                  <Sparkles size={13} />
                  <span>Up to {formatRupiah(comp.priceDifferenceKg)}/kg ({comp.savingsPercent}%) Price Variance</span>
                </div>
              )}
            </div>

            <div className="compare-grid">
              {/* Lowest Cost Option */}
              <div className="platform-compare-box winner">
                <div className="winner-crown">
                  <Award size={12} />
                  <span>Best Value in Brand</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="platform-badge tokopedia">{lowest.type}</span>
                  <span className="current-price" style={{ color: '#10b981' }}>
                    {formatRupiah(lowest.pricing?.price_per_kg_idr)}/kg
                  </span>
                </div>
                <p style={{ fontSize: 13, color: 'var(--text-main)', lineHeight: 1.4, minHeight: 36, fontWeight: 600 }}>
                  {lowest.name}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-dim)' }}>
                  <span>🍗 Protein: {lowest.dry_matter_estimates_percent?.crude_protein_min}% DM</span>
                  <span>🥣 Carb: {lowest.dry_matter_estimates_percent?.estimated_carbohydrate}% DM</span>
                </div>
                <button
                  type="button"
                  onClick={() => onInspect && onInspect(lowest)}
                  className="view-store-btn"
                  style={{ marginTop: 8 }}
                >
                  <Code2 size={13} />
                  <span>Inspect Template (JSON)</span>
                </button>
              </div>

              {/* Premium / Specialty Option */}
              <div className="platform-compare-box">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="platform-badge shopee">{highest.type}</span>
                  <span className="current-price">
                    {formatRupiah(highest.pricing?.price_per_kg_idr)}/kg
                  </span>
                </div>
                <p style={{ fontSize: 13, color: 'var(--text-main)', lineHeight: 1.4, minHeight: 36, fontWeight: 600 }}>
                  {highest.name}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-dim)' }}>
                  <span>🍗 Protein: {highest.dry_matter_estimates_percent?.crude_protein_min}% DM</span>
                  <span>🥣 Carb: {highest.dry_matter_estimates_percent?.estimated_carbohydrate}% DM</span>
                </div>
                <button
                  type="button"
                  onClick={() => onInspect && onInspect(highest)}
                  className="view-store-btn"
                  style={{ marginTop: 8 }}
                >
                  <Code2 size={13} />
                  <span>Inspect Template (JSON)</span>
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
