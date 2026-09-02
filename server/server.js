import express from 'express';
import cors from 'cors';
import { runScraper } from './scrapers/scraperEngine.js';
import { exportToCSV, exportToJSON } from './scrapers/exportService.js';
import { MASTER_PRODUCT_TEMPLATES } from './scrapers/fallbackData.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// In-memory store for last scrape results & active SSE clients
let lastScrapeResult = {
  items: MASTER_PRODUCT_TEMPLATES,
  analytics: {},
  comparisons: []
};

const sseClients = new Set();

function broadcastLog(logData) {
  const payload = `data: ${JSON.stringify({ timestamp: new Date().toISOString(), ...logData })}\n\n`;
  for (const client of sseClients) {
    client.write(payload);
  }
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    app: 'NutriMeow Scraper API (Product Template Engine)',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// SSE endpoint for live scraping logs stream
app.get('/api/logs/stream', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  sseClients.add(res);
  res.write(`data: ${JSON.stringify({ step: 'connected', message: 'Connected to NutriMeow real-time log stream.' })}\n\n`);

  req.on('close', () => {
    sseClients.delete(res);
  });
});

// Scrape trigger endpoint
app.post('/api/scrape', async (req, res) => {
  const {
    query = 'makanan kucing',
    platforms = ['tokopedia', 'shopee'],
    brand = 'all',
    type = 'all',
    maxResults = 40,
    sortBy = 'relevance',
    mode = 'live'
  } = req.body || {};

  try {
    const result = await runScraper({
      query,
      platforms,
      brand,
      type,
      maxResults: parseInt(maxResults, 10) || 40,
      sortBy,
      mode,
      onLog: (logEvent) => {
        console.log(`[LOG]`, logEvent.message);
        broadcastLog(logEvent);
      }
    });

    lastScrapeResult = result;
    res.json(result);
  } catch (error) {
    console.error('Scrape execution error:', error);
    broadcastLog({ step: 'error', message: `❌ Scraping failed: ${error.message}` });
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Export endpoint
app.get('/api/export', (req, res) => {
  const format = req.query.format || 'json';
  const items = lastScrapeResult.items || MASTER_PRODUCT_TEMPLATES;

  if (format === 'csv') {
    const csvContent = exportToCSV(items);
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="nutrimeow_product_templates_${Date.now()}.csv"`);
    return res.send(csvContent);
  }

  // Format as clean JSON array of { product_template: { ... } }
  const jsonContent = exportToJSON(items);
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Content-Disposition', `attachment; filename="nutrimeow_product_templates_${Date.now()}.json"`);
  res.send(jsonContent);
});

// Seed data endpoint
app.get('/api/seed-data', (req, res) => {
  res.json(MASTER_PRODUCT_TEMPLATES);
});

app.listen(PORT, () => {
  console.log(`🐾 NutriMeow Server running on http://localhost:${PORT}`);
});
