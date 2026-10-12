import fs from 'fs';
import path from 'path';

const baseDir = path.join(process.cwd(), 'content', 'learn');

const renames = [
  { from: '08-backtesting-journal', to: '15-backtesting-journal' },
  { from: '07-gold-xauusd', to: '13-gold-xauusd' },
  { from: '06-trading-psychology', to: '12-trading-psychology' },
  { from: '05-risk-management', to: '09-risk-management' },
  { from: '04-support-resistance', to: '05-support-resistance' },
  { from: '03-candlesticks', to: '04-candlesticks' },
  { from: '02-market-structure', to: '03-market-structure' }
];

for (const { from, to } of renames) {
  const fromPath = path.join(baseDir, from);
  const toPath = path.join(baseDir, to);
  if (fs.existsSync(fromPath)) {
    console.log(`Renaming ${from} to ${to}`);
    fs.renameSync(fromPath, toPath);
  }
}

const curriculum = {
  '02-broker-platform-setup': [
    'Broker kivabe choose korbo',
    'Demo vs live account',
    'MT5 ar TradingView setup',
    'Order types',
    'Lot size margin call stop out',
    'Bangladesh e retail forex niyom ar tax'
  ],
  '03-market-structure': [
    'Premium discount swing high low'
  ],
  '06-trend-chart-patterns': [
    'Trend identify kora',
    'Double top bottom head shoulders',
    'Triangle wedge flag pennant',
    'Channel range breakout',
    'Fake breakout'
  ],
  '07-technical-indicators': [
    'Moving averages crossover',
    'RSI divergence',
    'MACD',
    'ATR stop size',
    'Bollinger Bands',
    'Volume VWAP',
    'Indicator overload keno bad'
  ],
  '08-price-action-entries-strategies': [
    'Breakout retest pullback entry',
    'Trend continuation vs reversal',
    'Multi-timeframe entry top-down',
    'Confirmation vs trigger',
    'Entry model checklist',
    'My Strategies'
  ],
  '09-risk-management': [
    'Correlation risk expectancy risk of ruin'
  ],
  '10-trade-management-execution': [
    'Stop loss placement',
    'Take profit partial close',
    'Trailing stop',
    'Slippage requote spread widening',
    'Trade kokhon exit korbo'
  ],
  '11-fundamental-intermarket-analysis': [
    'Central bank interest rate inflation',
    'Economic calendar NFP CPI FOMC',
    'Currency strength DXY',
    'Risk-on risk-off',
    'Correlation gold vs DXY',
    'News trade avoid korbo'
  ],
  '12-trading-psychology': [
    'Overtrading loss accept kora'
  ],
  '13-gold-xauusd': [
    'Gold contract spec pip value',
    'Asian London New York session behaviour',
    'Real yields DXY central bank',
    'Safe-haven flow geopolitical event',
    'Gold e news volatility',
    'Gold typical ATR',
    'London breakout NY reversal setup',
    'Gold e spread slippage swap'
  ],
  '14-trading-plan-system': [
    'Trading plan template',
    'Entry exit risk rules ek page e',
    'Pre-trade checklist',
    'Daily weekly routine',
    'Kokhon trading bondho korbo'
  ],
  '15-backtesting-journal': [
    'Performance metrics forward testing'
  ],
  '16-advanced': [
    'Smart Money Concepts ICT basics',
    'Volume profile market profile',
    'Wyckoff basics',
    'Elliott wave',
    'Automation'
  ],
  '17-case-studies-trade-reviews': [
    'Nijer winning losing trade breakdown',
    'Famous gold move analysis',
    'Weekly review template'
  ],
  '18-notes-library': [
    'Book Notes',
    'Video Notes',
    'Cheat Sheets',
    'Mistakes Log',
    'Weekly Review'
  ]
};

const slugify = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

for (const [folder, lessons] of Object.entries(curriculum)) {
  const dirPath = path.join(baseDir, folder);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    // Write meta.json
    fs.writeFileSync(path.join(dirPath, 'meta.json'), JSON.stringify({
      title: folder.replace(/^\d+-/, '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
    }, null, 2));
  }
  
  lessons.forEach((lesson, index) => {
    const fileName = `${String(index + 1).padStart(2, '0')}-${slugify(lesson)}.mdx`;
    const filePath = path.join(dirPath, fileName);
    
    if (!fs.existsSync(filePath)) {
      const frontmatter = `---
title: "${lesson}"
description: "Detailed notes on ${lesson}"
status: draft
updated: ${new Date().toISOString().split('T')[0]}
---

# ${lesson}

<div className="rounded-xl border border-border bg-card p-6 text-center text-muted-foreground my-8">
  <p className="text-3xl mb-4">🚧</p>
  <p className="font-semibold text-foreground">Coming in Phase 2</p>
  <p className="text-sm mt-1">This module is under construction.</p>
</div>
`;
      fs.writeFileSync(filePath, frontmatter);
    }
  });
}

console.log("Curriculum generated!");
