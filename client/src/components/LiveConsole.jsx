import React, { useEffect, useRef } from 'react';
import { Terminal, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

export default function LiveConsole({ logs = [], onClear, isCollapsed, setIsCollapsed }) {
  const bodyRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current && !isCollapsed) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [logs, isCollapsed]);

  return (
    <div className="terminal-card">
      <div className="terminal-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div className="terminal-dots">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
          </div>
          <div className="terminal-title">
            <Terminal size={14} />
            <span>Live Scraping Terminal Engine (Playwright Stream)</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {logs.length > 0 && (
            <button
              onClick={onClear}
              className="preset-btn"
              style={{ padding: '3px 8px', fontSize: 11 }}
              title="Clear terminal logs"
            >
              <Trash2 size={12} />
              <span>Clear</span>
            </button>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="preset-btn"
            style={{ padding: '3px 8px', fontSize: 11 }}
          >
            {isCollapsed ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
            <span>{isCollapsed ? 'Expand' : 'Collapse'}</span>
          </button>
        </div>
      </div>

      {!isCollapsed && (
        <div className="terminal-body" ref={bodyRef}>
          {logs.length === 0 ? (
            <div style={{ color: 'var(--text-dim)', fontStyle: 'italic', padding: '6px 0' }}>
              &gt; Ready. Trigger a scrape to monitor headless browser actions and real-time DOM extraction.
            </div>
          ) : (
            logs.map((log, index) => {
              const isError = log.step?.includes('error') || log.step?.includes('warn');
              const isSuccess = log.step === 'complete';
              const timeStr = log.timestamp
                ? new Date(log.timestamp).toLocaleTimeString()
                : new Date().toLocaleTimeString();

              return (
                <div key={index} className="log-line">
                  <span className="log-time">[{timeStr}]</span>
                  <span className={`log-msg ${isError ? 'error' : isSuccess ? 'success' : ''}`}>
                    {log.message}
                  </span>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
