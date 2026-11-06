// One-off: renumber lessons so every chapter has unique, ordered prefixes; swap ch 8/9; fix refs + meta.json.
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const L = "content/learn";
const M = "03-market-structure";
const lessonMoves = [
  [M, "01-trend-range-hhhl", "02-trend-range-hhhl"],
  [M, "02-break-of-structure", "03-break-of-structure"],
  [M, "03-liquidity-stop-hunts", "04-liquidity-stop-hunts"],
  [M, "04-multi-timeframe-analysis", "05-multi-timeframe-analysis"],
  [M, "05-premium-discount-zones", "06-premium-discount-zones"],
  [
    "09-risk-management",
    "01-correlation-risk-expectancy-risk-of-ruin",
    "06-correlation-risk-expectancy-risk-of-ruin",
  ],
  [
    "12-trading-psychology",
    "01-overtrading-loss-accept-kora",
    "02-overtrading-loss-accept-kora",
  ],
  [
    "12-trading-psychology",
    "02-fomo-revenge-trading",
    "03-fomo-revenge-trading",
  ],
  ["12-trading-psychology", "03-journaling-habit", "04-journaling-habit"],
  ["12-trading-psychology", "04-routine", "05-routine"],
  ["13-gold-xauusd", "02-sessions-volatility", "05-sessions-volatility"],
  ["13-gold-xauusd", "03-dxy-us-yields", "03-dxy-us-yields"],
  [
    "13-gold-xauusd",
    "01-gold-contract-spec-pip-value",
    "02-gold-contract-spec-pip-value",
  ],
  [
    "13-gold-xauusd",
    "04-safe-haven-flow-geopolitical-event",
    "04-safe-haven-flow-geopolitical-event",
  ],
  ["13-gold-xauusd", "04-news-events", "06-news-events"],
  ["13-gold-xauusd", "06-spread-slippage", "07-spread-slippage"],
  ["13-gold-xauusd", "05-gold-risk-lot-size", "08-gold-risk-lot-size"],
  ["13-gold-xauusd", "06-gold-typical-atr", "09-gold-typical-atr"],
  [
    "13-gold-xauusd",
    "07-london-breakout-ny-reversal-setup",
    "10-london-breakout-ny-reversal-setup",
  ],
  [
    "15-backtesting-journal",
    "01-performance-metrics-forward-testing",
    "02-performance-metrics-forward-testing",
  ],
  ["15-backtesting-journal", "02-journal-template", "03-journal-template"],
  ["15-backtesting-journal", "03-reviewing-trades", "04-reviewing-trades"],
  ["15-backtesting-journal", "04-building-a-plan", "05-building-a-plan"],
];
const deletes = [
  ["13-gold-xauusd", "02-asian-london-new-york-session-behaviour"],
  ["13-gold-xauusd", "03-real-yields-dxy-central-bank"],
  ["13-gold-xauusd", "05-gold-e-news-volatility"],
  ["13-gold-xauusd", "08-gold-e-spread-slippage-swap"],
];
const folderMoves = [
  ["08-price-action-entries-strategies", "09-price-action-entries-strategies"],
  ["09-risk-management", "08-risk-management"],
];
const folderOf = (f) => folderMoves.find(([o]) => o === f)?.[1] ?? f;

// reference map (old "folder/slug" -> new "folder/slug"); deleted dups redirect to survivors
const ref = new Map();
for (const [f, o, n] of lessonMoves)
  ref.set(`${f}/${o}`, `${folderOf(f)}/${n}`);
ref.set(
  "13-gold-xauusd/02-asian-london-new-york-session-behaviour",
  "13-gold-xauusd/05-sessions-volatility",
);
ref.set(
  "13-gold-xauusd/03-real-yields-dxy-central-bank",
  "13-gold-xauusd/03-dxy-us-yields",
);
ref.set(
  "13-gold-xauusd/05-gold-e-news-volatility",
  "13-gold-xauusd/06-news-events",
);
ref.set(
  "13-gold-xauusd/08-gold-e-spread-slippage-swap",
  "13-gold-xauusd/07-spread-slippage",
);
for (const [o, n] of folderMoves) ref.set(o, n);
// other lessons in swapped folders keep slug, folder changes
for (const [o, n] of folderMoves)
  for (const f of fs.readdirSync(path.join(L, o)))
    if (f.endsWith(".mdx")) {
      const s = f.replace(/\.mdx$/, "");
      if (!ref.has(`${o}/${s}`)) ref.set(`${o}/${s}`, `${n}/${s}`);
    }

const git = (c) => execSync(`git ${c}`, { stdio: "pipe" });
// 1. deletes
for (const [f, s] of deletes) fs.rmSync(path.join(L, f, s + ".mdx"));
// 2. lesson renames via temp names (avoid collisions)
for (const [f, o, n] of lessonMoves)
  if (o !== n)
    fs.renameSync(path.join(L, f, o + ".mdx"), path.join(L, f, n + ".tmpmove"));
for (const [f, o, n] of lessonMoves)
  if (o !== n)
    fs.renameSync(path.join(L, f, n + ".tmpmove"), path.join(L, f, n + ".mdx"));
// 3. folder swap via temp
fs.renameSync(
  path.join(L, "08-price-action-entries-strategies"),
  path.join(L, "tmp-08"),
);
fs.renameSync(
  path.join(L, "09-risk-management"),
  path.join(L, "08-risk-management"),
);
fs.renameSync(
  path.join(L, "tmp-08"),
  path.join(L, "09-price-action-entries-strategies"),
);

// 4. rewrite references
const keys = [...ref.keys()].sort((a, b) => b.length - a.length);
const re = new RegExp(keys.join("|"), "g");
const roots = ["content", "lib", "app", "components", "scripts", "tests"];
const files = [
  "ARTICLE_WRITING_RULES.md",
  "PROJECT_SPEC.md",
  "DECISIONS.md",
  "HANDOFF.md",
  "README.md",
  "build-curriculum.mjs",
  "CLAUDE.md",
];
const walk = (d) =>
  fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(d, e.name);
    return e.isDirectory() ? walk(p) : [p];
  });
for (const r of roots) if (fs.existsSync(r)) files.push(...walk(r));
let changed = 0;
for (const f of files) {
  if (
    !/\.(mdx?|tsx?|mjs|js|json|md)$/.test(f) ||
    f.includes("restructure-learn") ||
    !fs.existsSync(f)
  )
    continue;
  const s = fs.readFileSync(f, "utf8");
  const t = s.replace(re, (m) => ref.get(m));
  if (t !== s) {
    fs.writeFileSync(f, t);
    changed++;
  }
}
console.log("refs rewritten in", changed, "files");

// 5. regenerate meta.json
const dirs = fs
  .readdirSync(L, { withFileTypes: true })
  .filter((e) => e.isDirectory())
  .map((e) => e.name)
  .sort();
for (const d of dirs) {
  const mp = path.join(L, d, "meta.json");
  const prev = fs.existsSync(mp) ? JSON.parse(fs.readFileSync(mp, "utf8")) : {};
  const pages = fs
    .readdirSync(path.join(L, d))
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""))
    .sort();
  fs.writeFileSync(
    mp,
    JSON.stringify(
      { ...prev, title: prev.title ?? d.replace(/^\d+-/, ""), pages },
      null,
      2,
    ) + "\n",
  );
}
fs.writeFileSync(
  path.join(L, "meta.json"),
  JSON.stringify({ title: "TradeNotes Curriculum", pages: dirs }, null, 2) +
    "\n",
);
console.log("done", dirs.length, "chapters");
