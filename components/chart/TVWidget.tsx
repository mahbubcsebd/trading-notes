'use client';

import React, { useState, useEffect, useRef } from 'react';

const SYMBOLS = [
  { label: 'Gold (XAUUSD)', symbol: 'OANDA:XAUUSD' },
  { label: 'US Dollar Index (DXY)', symbol: 'CAPITALCOM:DXY' },
  { label: 'EURUSD', symbol: 'FX:EURUSD' },
  { label: 'US 10Y Yield', symbol: 'TVC:US10Y' },
];

export function TVWidget() {
  const [selectedSymbol, setSelectedSymbol] = useState(SYMBOLS[0].symbol);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = '';

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: selectedSymbol,
      interval: 'D',
      timezone: 'Etc/UTC',
      theme: 'dark',
      style: '1',
      locale: 'en',
      enable_publishing: false,
      allow_symbol_change: true,
      calendar: false,
      support_host: 'https://www.tradingview.com',
    });

    const widgetContainer = document.createElement('div');
    widgetContainer.className = 'tradingview-widget-container__widget';
    widgetContainer.style.height = '100%';
    widgetContainer.style.width = '100%';

    containerRef.current.appendChild(widgetContainer);
    containerRef.current.appendChild(script);
  }, [selectedSymbol]);

  return (
    <div className="rounded-2xl border border-border/80 bg-card overflow-hidden shadow-xl space-y-4 p-4">
      {/* Symbol Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {SYMBOLS.map((s) => (
          <button
            key={s.symbol}
            onClick={() => setSelectedSymbol(s.symbol)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedSymbol === s.symbol
                ? 'bg-gold text-black shadow-sm ring-1 ring-gold'
                : 'bg-muted/40 text-muted-foreground hover:text-foreground border border-border/60 hover:bg-muted'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Widget Container */}
      <div className="relative w-full h-[540px] rounded-xl overflow-hidden bg-background">
        <div ref={containerRef} className="w-full h-full" />
      </div>
    </div>
  );
}
