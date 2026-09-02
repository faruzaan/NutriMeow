import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ScraperControls from './components/ScraperControls';
import LiveConsole from './components/LiveConsole';
import ProductCard from './components/ProductCard';
import ProductDetailModal from './components/ProductDetailModal';
import MarketCompare from './components/MarketCompare';
import AnalyticsView from './components/AnalyticsView';
import confetti from 'canvas-confetti';
import { Grid, GitCompare, BarChart3, Download, FileText, Sparkles, Code2 } from 'lucide-react';

const API_BASE = typeof window !== 'undefined' && window.location.hostname
  ? `http://${window.location.hostname}:3001`
  : 'http://127.0.0.1:3001';

export default function App() {
  const [query, setQuery] = useState('Cleo Skin & Coat');
  const [brand, setBrand] = useState('all');
  const [foodType, setFoodType] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  const [mode, setMode] = useState('cache');
  const [maxResults, setMaxResults] = useState(40);

  const [activeTab, setActiveTab] = useState('grid');
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const [comparisons, setComparisons] = useState([]);
  const [logs, setLogs] = useState([]);
  const [isConsoleCollapsed, setIsConsoleCollapsed] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Connect to SSE log stream
  useEffect(() => {
    let eventSource = null;
    try {
      eventSource = new EventSource(`${API_BASE}/api/logs/stream`);

      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          setLogs((prev) => [...prev, data]);
        } catch (e) {
          console.error('Failed to parse SSE event:', e);
        }
      };

      eventSource.onerror = () => {
        setIsOnline(false);
      };

      eventSource.onopen = () => {
        setIsOnline(true);
      };
    } catch (err) {
      console.error('SSE initialization error:', err);
      setIsOnline(false);
    }

    return () => {
      if (eventSource) eventSource.close();
    };
  }, []);

  // Fetch initial master data on mount
  useEffect(() => {
    handleScrape('Cleo', 'cache');
  }, []);

  const handleScrape = async (overrideQuery, overrideMode) => {
    const targetQuery = overrideQuery !== undefined ? overrideQuery : query;
    const targetMode = overrideMode !== undefined ? overrideMode : mode;

    setLoading(true);
    setLogs((prev) => [
      ...prev,
      { step: 'request_sent', message: `📡 Standardizing product templates for query: "${targetQuery}" [${targetMode.toUpperCase()} MODE]...` }
    ]);

    try {
      const response = await fetch(`${API_BASE}/api/scrape`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: targetQuery,
          brand,
          type: foodType,
          sortBy,
          mode: targetMode,
          maxResults
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }

      const data = await response.json();
      setItems(data.items || []);
      setAnalytics(data.analytics || {});
      setComparisons(data.comparisons || []);

      if (data.items && data.items.length > 0) {
        try {
          confetti({
            particleCount: 40,
            spread: 50,
            origin: { y: 0.8 },
            colors: ['#ff5e62', '#ff9966', '#10b981', '#38bdf8']
          });
        } catch (_) {}
      }
    } catch (err) {
      console.error('Scrape execution error:', err);
      setLogs((prev) => [
        ...prev,
        { step: 'error', message: `❌ Error connecting to server: ${err.message}. Make sure the backend server is running on port 3001.` }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = (format) => {
    window.open(`${API_BASE}/api/export?format=${format}`, '_blank');
  };

  return (
    <div className="app-container">
      {/* Top Header */}
      <Header isOnline={isOnline} totalScraped={items.length} />

      {/* Control Panel */}
      <ScraperControls
        query={query}
        setQuery={setQuery}
        brand={brand}
        setBrand={setBrand}
        foodType={foodType}
        setFoodType={setFoodType}
        sortBy={sortBy}
        setSortBy={setSortBy}
        mode={mode}
        setMode={setMode}
        maxResults={maxResults}
        setMaxResults={setMaxResults}
        onScrape={handleScrape}
        loading={loading}
      />

      {/* Live Terminal Logger */}
      <LiveConsole
        logs={logs}
        onClear={() => setLogs([])}
        isCollapsed={isConsoleCollapsed}
        setIsCollapsed={setIsConsoleCollapsed}
      />

      {/* Tab Navigation & Export Actions */}
      <div className="view-tabs">
        <div className="tab-buttons">
          <button
            className={`tab-btn ${activeTab === 'grid' ? 'active' : ''}`}
            onClick={() => setActiveTab('grid')}
          >
            <Grid size={16} />
            <span>Product Catalog</span>
            <span className="tab-badge">{items.length}</span>
          </button>

          <button
            className={`tab-btn ${activeTab === 'compare' ? 'active' : ''}`}
            onClick={() => setActiveTab('compare')}
          >
            <GitCompare size={16} />
            <span>Price & DM Variance</span>
            <span className="tab-badge">{comparisons.length} Brands</span>
          </button>

          <button
            className={`tab-btn ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            <BarChart3 size={16} />
            <span>Nutritional Intelligence</span>
          </button>
        </div>

        <div className="export-actions">
          <button
            className="btn-secondary"
            style={{ background: 'var(--accent-gradient-subtle)', color: 'var(--accent-peach)', borderColor: 'var(--border-active)' }}
            onClick={() => handleExport('json')}
            title="Download full product_template JSON schema"
          >
            <Code2 size={14} />
            <span>Export product_template (JSON)</span>
          </button>
          <button
            className="btn-secondary"
            onClick={() => handleExport('csv')}
            title="Download CSV table"
          >
            <Download size={14} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Main Tab Content */}
      <main>
        {activeTab === 'grid' && (
          items.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🐱</div>
              <h3 className="empty-title">No Product Templates Found</h3>
              <p className="empty-desc">
                Try searching for "Cleo", "Kitchen Flavor", "Pro Plan", "Nature Bridge", or "Grain Free".
              </p>
            </div>
          ) : (
            <div className="product-grid">
              {items.map((item, idx) => (
                <ProductCard
                  key={item.product_template?.id || idx}
                  item={item}
                  onInspect={(prod) => setSelectedProduct(prod)}
                />
              ))}
            </div>
          )
        )}

        {activeTab === 'compare' && (
          <MarketCompare
            comparisons={comparisons}
            onInspect={(prod) => setSelectedProduct(prod)}
          />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsView analytics={analytics} items={items} />
        )}
      </main>

      {/* Detail Modal (JSON Template Viewer & Nutrition) */}
      {selectedProduct && (
        <ProductDetailModal
          item={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}
