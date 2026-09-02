import React from 'react';
import { Cat, Sparkles, Activity } from 'lucide-react';

export default function Header({ isOnline = true, totalScraped = 0 }) {
  return (
    <header className="header">
      <div className="brand-wrapper">
        <div className="brand-logo-icon">
          🐱
        </div>
        <div>
          <h1 className="brand-title">
            NutriMeow <Sparkles size={18} style={{ color: '#ff9966' }} />
          </h1>
          <p className="brand-subtitle">
            Cat Wet Food Scraping & Price Intelligence Hub • Shopee & Tokopedia
          </p>
        </div>
      </div>

      <div className="header-status">
        <div className="status-badge">
          <span className="pulse-dot"></span>
          <span>{isOnline ? 'Scraper Engine Active' : 'Connecting...'}</span>
        </div>
        {totalScraped > 0 && (
          <div className="status-badge" style={{ background: 'rgba(56, 189, 248, 0.12)', color: '#38bdf8', borderColor: 'rgba(56, 189, 248, 0.3)' }}>
            <Activity size={14} />
            <span>{totalScraped} Items Analyzed</span>
          </div>
        )}
      </div>
    </header>
  );
}
