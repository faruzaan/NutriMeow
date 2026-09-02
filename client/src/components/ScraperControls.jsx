import React from 'react';
import { Search, Play, Sparkles, Filter, Layers } from 'lucide-react';

const PRESET_QUERIES = [
  'Cleo Skin & Coat',
  'Kitchen Flavor Grain Free',
  'Pro Plan Urinary Care',
  'Nature Bridge Vet Complete',
  'Whiskas Pouch 85g',
  'Royal Canin Recovery',
  'Purina ONE Healthy Kitten',
  'Majes Freeze-Dried',
  'Equilíbrio Black Cats',
  'MR. VET T1 Digestion'
];

export default function ScraperControls({
  query,
  setQuery,
  brand,
  setBrand,
  foodType,
  setFoodType,
  sortBy,
  setSortBy,
  mode,
  setMode,
  maxResults,
  setMaxResults,
  onScrape,
  loading
}) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !loading) {
      onScrape();
    }
  };

  return (
    <div className="control-card">
      {/* Main Search Bar */}
      <div className="search-bar-row">
        <div className="input-with-icon">
          <Search size={20} />
          <input
            type="text"
            className="search-input"
            placeholder="Search cat food brand, product name, or ingredient (e.g., Cleo, Kitchen Flavor, Pro Plan, Grain Free)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <button
          className="scrape-btn"
          onClick={() => onScrape()}
          disabled={loading}
        >
          {loading ? (
            <>
              <div className="pulse-dot" style={{ background: '#fff' }} />
              <span>Standardizing Templates...</span>
            </>
          ) : (
            <>
              <Play size={18} />
              <span>Run Search & Scrape</span>
            </>
          )}
        </button>
      </div>

      {/* Preset Quick Tags */}
      <div className="preset-row">
        <span className="preset-label">Quick Presets:</span>
        {PRESET_QUERIES.map((tag) => (
          <button
            key={tag}
            className="preset-btn"
            onClick={() => {
              setQuery(tag);
              onScrape(tag);
            }}
          >
            <Sparkles size={11} style={{ color: '#ff9966' }} />
            {tag}
          </button>
        ))}
      </div>

      {/* Advanced Filter / Settings Row */}
      <div className="options-grid">
        {/* Food Type Selector */}
        <div className="option-group">
          <label className="option-label">Food Format</label>
          <select
            className="select-custom"
            value={foodType}
            onChange={(e) => setFoodType(e.target.value)}
          >
            <option value="all">🥣 All Formats (Dry & Wet Food)</option>
            <option value="Dry Food">🥩 Dry Food (Kibble / Freeze-Dried)</option>
            <option value="Wet Food">🥫 Wet Food (Pouch / Can / Mousse)</option>
          </select>
        </div>

        {/* Brand Filter */}
        <div className="option-group">
          <label className="option-label">Brand</label>
          <select
            className="select-custom"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          >
            <option value="all">🐾 All Brands</option>
            <option value="Cleo">Cleo (CP Petindo)</option>
            <option value="Kitchen Flavor">Kitchen Flavor</option>
            <option value="Nature Bridge">Nature Bridge</option>
            <option value="Pro Plan">Purina Pro Plan</option>
            <option value="Purina ONE">Purina ONE</option>
            <option value="Friskies">Friskies</option>
            <option value="Majes">Majes</option>
            <option value="Equilíbrio">Equilíbrio</option>
            <option value="MR. VET">MR. VET</option>
            <option value="Whiskas">Whiskas</option>
            <option value="Royal Canin">Royal Canin</option>
            <option value="Sheba">Sheba</option>
          </select>
        </div>

        {/* Sort Options */}
        <div className="option-group">
          <label className="option-label">Sort By</label>
          <select
            className="select-custom"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="relevance">⭐ Most Relevant</option>
            <option value="price_asc">💰 Price / kg: Low to High</option>
            <option value="price_desc">💎 Price / kg: High to Low</option>
            <option value="protein_desc">🍗 Crude Protein (Highest DM%)</option>
            <option value="carb_asc">🥣 Low Carb (Lowest NFE DM%)</option>
          </select>
        </div>

        {/* Scraping Engine Mode */}
        <div className="option-group">
          <label className="option-label">Scraper Engine</label>
          <div className="mode-toggle">
            <button
              type="button"
              className={`mode-btn ${mode === 'live' ? 'active' : ''}`}
              onClick={() => setMode('live')}
              title="Performs real headless browser scraping against Shopee/Tokopedia"
            >
              🌐 Live Browser
            </button>
            <button
              type="button"
              className={`mode-btn ${mode === 'cache' ? 'active' : ''}`}
              onClick={() => setMode('cache')}
              title="Instant retrieval from verified template database"
            >
              ⚡ Fast Database
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
