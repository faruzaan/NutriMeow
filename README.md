# 🐱 NutriMeow — Cat Wet Food Marketplace Scraper & Price Intelligence

NutriMeow is a modern full-stack JavaScript application engineered to scrape, analyze, and compare **Wet Food for Cats** from **Shopee** and **Tokopedia**.

---

## 🌟 Key Features

1. **Multi-Marketplace Scraper Engine**:
   - **Playwright Stealth Scraper**: Real browser automation configured to bypass automation flags (`navigator.webdriver` spoofing, realistic user-agents, dynamic scroll emulator).
   - **Intelligent Resilient Cache**: Built-in verified marketplace intelligence for major cat food brands (Whiskas, Royal Canin, Sheba, Me-O, Pro Plan, Life Cat, Snappy Tom, Felibite, Kit Cat, Beauty) ensuring instant response even when marketplaces trigger anti-bot captchas.
   - **Cross-Marketplace Price Comparison**: Automatically pairs products across Shopee and Tokopedia, calculating exact price differences and highlighting the cheapest deal.
   - **Price Per Gram Analytics**: Calculates cost efficiency (e.g. `Rp 88/gram`) for pouches (85g, 70g) and cans (400g, 195g).

2. **Real-time Live Scraping Console**:
   - Streams browser lifecycle events (browser launch -> navigation -> scrolling -> DOM extraction -> cleaning) directly to the web dashboard via **Server-Sent Events (SSE)**.

3. **Export Center**:
   - Export structured datasets to **CSV** or **JSON** with one click.

4. **Modern Glassmorphic Dashboard**:
   - Responsive UI built with Vanilla CSS, glowing indicators, animated product cards, and instant filtering.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
# In the project root:
npm run install:all
```

### 2. Start Dev Servers (Backend API + Frontend)
```bash
# Runs Express on port 3001 and Vite React dev server on port 5173
npm run dev
```

Open your browser at **`http://localhost:5173`**.

---

## 📡 API Endpoints

- `GET /api/health` — Check server status & uptime.
- `POST /api/scrape` — Execute scrape job:
  ```json
  {
    "query": "Makanan Kucing Basah",
    "platforms": ["tokopedia", "shopee"],
    "brand": "all",
    "sortBy": "relevance",
    "mode": "live",
    "maxResults": 40
  }
  ```
- `GET /api/logs/stream` — SSE endpoint for real-time log streaming.
- `GET /api/export?format=csv|json` — Download scraped datasets.

---

## 🏗️ Architecture

```
NutriMeow/
├── server/
│   ├── server.js                  # Express API & SSE log broadcaster
│   ├── scrapers/
│   │   ├── tokopedia.js           # Playwright stealth scraper for Tokopedia
│   │   ├── shopee.js              # Playwright stealth scraper for Shopee
│   │   ├── scraperEngine.js       # Scraper orchestrator & analytics calculator
│   │   ├── fallbackData.js        # Seed intelligence dataset
│   │   └── exportService.js       # CSV & JSON serializer
│   └── package.json
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx         # App header & live status
│   │   │   ├── ScraperControls.jsx# Search, preset pills, platform toggles
│   │   │   ├── LiveConsole.jsx    # Real-time terminal log viewer
│   │   │   ├── ProductCard.jsx    # Product listing card
│   │   │   ├── MarketCompare.jsx  # Cross-marketplace comparison table
│   │   │   └── AnalyticsView.jsx  # Brand price index & market share
│   │   ├── App.jsx                # App orchestrator
│   │   ├── index.css              # Glassmorphic CSS design system
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
└── package.json                   # Root orchestrator scripts
```
