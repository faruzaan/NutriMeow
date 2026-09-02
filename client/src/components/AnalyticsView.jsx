import React from 'react';
import { DollarSign, Activity, Wheat, Layers } from 'lucide-react';

function formatRupiah(number) {
  if (!number) return 'Rp 0';
  return 'Rp ' + Number(number).toLocaleString('id-ID');
}

export default function AnalyticsView({ analytics = {}, items = [] }) {
  if (!items || items.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📊</div>
        <h3 className="empty-title">No Nutritional Analytics Available</h3>
        <p className="empty-desc">Run a search or scrape query to view dry matter protein and pricing distributions.</p>
      </div>
    );
  }

  const {
    totalProducts = items.length,
    avgPricePerKg = 0,
    minPricePerKg = 0,
    maxPricePerKg = 0,
    avgProteinDM = 0,
    avgCarbDM = 0,
    grainFreeCount = 0,
    brandCounts = {},
    brandAvgPrices = {}
  } = analytics;

  const grainFreePercent = totalProducts > 0 ? Math.round((grainFreeCount / totalProducts) * 100) : 0;
  const brandEntries = Object.entries(brandAvgPrices).sort((a, b) => b[1] - a[1]);

  return (
    <div className="analytics-grid">
      {/* Overview Stat Card */}
      <div className="stat-widget">
        <div className="stat-header">
          <span>Average Price per KG</span>
          <DollarSign size={16} />
        </div>
        <div className="stat-value">{formatRupiah(avgPricePerKg)}<span style={{ fontSize: 14, color: 'var(--text-muted)' }}>/kg</span></div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-muted)' }}>
          <span>Cheapest: <strong style={{ color: '#10b981' }}>{formatRupiah(minPricePerKg)}</strong></span>
          <span>Premium: <strong style={{ color: '#ff9966' }}>{formatRupiah(maxPricePerKg)}</strong></span>
        </div>
      </div>

      {/* Average Protein DM */}
      <div className="stat-widget">
        <div className="stat-header">
          <span>Average Dry Matter Protein (DM%)</span>
          <Activity size={16} />
        </div>
        <div className="stat-value" style={{ color: '#10b981' }}>{avgProteinDM}% <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>DM Basis</span></div>
        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
          Est. Average Carbs: <strong style={{ color: '#38bdf8' }}>{avgCarbDM}% NFE DM</strong>
        </div>
      </div>

      {/* Grain-Free Ratio */}
      <div className="stat-widget">
        <div className="stat-header">
          <span>Grain-Free Formulations</span>
          <Wheat size={16} />
        </div>
        <div className="stat-value">{grainFreePercent}% <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>({grainFreeCount}/{totalProducts})</span></div>
        <div className="stat-bars">
          <div className="stat-bar-row">
            <div className="stat-bar-label">
              <span>Grain-Free Diets</span>
              <span>{grainFreePercent}%</span>
            </div>
            <div className="stat-bar-bg">
              <div className="stat-bar-fill coral" style={{ width: `${grainFreePercent}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Brand Price Index */}
      <div className="stat-widget" style={{ gridColumn: '1 / -1' }}>
        <div className="stat-header">
          <span>Brand Price Index (Average IDR / KG)</span>
          <Layers size={16} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 14, marginTop: 10 }}>
          {brandEntries.map(([brandName, avg]) => {
            const count = brandCounts[brandName] || 0;
            return (
              <div
                key={brandName}
                style={{
                  background: 'var(--bg-secondary)',
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{brandName}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-dim)' }}>{count} templates verified</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 800, color: 'var(--accent-peach)', fontSize: 15 }}>
                    {formatRupiah(avg)}
                  </div>
                  <div style={{ fontSize: 10, color: 'var(--text-dim)' }}>avg / kg</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
