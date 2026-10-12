# PROJECT_SPEC.md — TradeNotes: Personal Trading Learning Platform

> This file is the single source of truth for the project. Read it fully before writing any code.
> Build in the phases defined in Section 14. Do not skip ahead. Do not ask clarifying questions: make the most sensible decision, and record it in `DECISIONS.md`.

---

## 1. Project Overview

**What:** A personal learning / note-taking website for a trader who is learning Forex and Gold (XAUUSD) trading from YouTube, PDF books and blogs. The owner writes structured articles with charts, candlestick examples, annotated screenshots and diagrams. Articles live in a fixed learning sequence (curriculum), like a course or documentation site.

**Who uses it:** One primary user (the owner/author). It may later be made public. It must be pleasant to *write in* and pleasant to *read and revise from*.

**Core goals**
1. Writing a new article must be fast: paste screenshots, drop in a chart, add a callout. No manual file juggling.
2. Charts must be creatable **manually** (hand-drawn candles + annotations) and from real data (CSV import, screenshots).
3. Articles are strictly sequential (Module → Lesson), with previous/next navigation and progress tracking.
4. Content language: **Bengali and English mixed** (Banglish is also fine in text). Bengali typography must render beautifully.
5. Fast, clean, dark "trading terminal" look. Mobile friendly (the owner will revise on a phone).

**Non-goals (for now):** payments, public user accounts, comments, social features, live trading, broker integration.

**Footer disclaimer (every page):** "Educational notes only. Not financial advice."

---

## 2. Tech Stack (decisions are final)

| Area | Choice | Notes |
|---|---|---|
| Framework | Next.js (latest stable, App Router, TypeScript strict) | Server Components by default |
| Styling | Tailwind CSS (latest stable) | CSS variables for theme tokens |
| UI kit | shadcn/ui | Install components only as needed |
| Content engine | **Fumadocs** (`fumadocs-core`, `fumadocs-mdx`, `fumadocs-ui`) | Gives sidebar, ordering via `meta.json`, TOC, prev/next, search. Verify current setup in official docs before configuring |
| Content format | MDX with Zod-validated frontmatter | Files live in `content/` |
| Charts (interactive) | **TradingView Lightweight Charts** (latest v5) | Use v5 APIs (e.g. `createSeriesMarkers`). Check docs, do not guess APIs |
| Drawing overlays | Lightweight Charts **series primitives** (preferred) or synchronized SVG overlay | For trendlines, zones, arrows, fib |
| Diagrams | Excalidraw (`@excalidraw/excalidraw`) inside Studio, Mermaid for flowcharts | |
| Math | KaTeX via `remark-math` + `rehype-katex` | Risk/position-size formulas |
| Icons | `lucide-react` | |
| Animation | `motion` (Framer Motion) | Subtle only |
| Validation | Zod | Frontmatter + chart JSON |
| State | React state + `zustand` for Studio editor | Progress in `localStorage` (client only) |
| Image handling | `next/image`, `sharp` | Convert pasted images to WebP on save |
| Package manager | `pnpm` (fall back to `npm` if unavailable) | Dev machine is Windows 11: use cross-platform paths and scripts only |
| Lint/format | ESLint + Prettier + `prettier-plugin-tailwindcss` | |
| Tests | Vitest (unit) + Playwright (smoke e2e) | Minimal but real |
| Hosting | Vercel (primary). Must also run with `pnpm build && pnpm start` | |

**Database:** none in Phases 1 to 3. Content is files in Git. A database is introduced only in Phase 4 (journal).

---

## 3. Fonts & Visual Design

**Fonts (via `next/font`)**
- Latin UI/body: `Inter`
- Bengali: `Hind Siliguri` (body) with `Noto Sans Bengali` as fallback
- Mono / numbers / prices: `JetBrains Mono`
- Font stack must put the Bengali font in the fallback chain so mixed Bangla/English lines look consistent. Body line-height 1.8 for Bengali paragraphs.

**Theme:** Dark by default, light theme supported (`next-themes`). All colors via CSS variables.

```
--bull:  #22c55e   (bullish candle / profit)
--bear:  #ef4444   (bearish candle / loss)
--gold:  #f5b301   (brand accent, XAUUSD highlights)
--bg:    #0b0e14   (dark background)
--panel: #121722
--border:#1f2733
--muted: #8b95a7
```

**Look & feel:** Calm, focused, high contrast, terminal-inspired but not cluttered. Generous spacing in articles (max prose width ~72ch). Tables, code and charts may go wider. Rounded-xl cards, subtle borders, no heavy shadows.

**Accessibility:** WCAG AA contrast, keyboard navigable, focus rings visible, `prefers-reduced-motion` respected. Bull/bear must never rely on color alone (use ▲/▼ or labels in charts).

---

## 4. Folder Structure

```
tradenotes/
├─ PROJECT_SPEC.md
├─ DECISIONS.md                  # agent logs every non-obvious decision here
├─ README.md                     # how to run, write, publish
├─ package.json
├─ next.config.ts
├─ source.config.ts              # Fumadocs MDX config + Zod frontmatter schema
├─ content/
│  ├─ learn/                     # the curriculum (Fumadocs docs source)
│  │  ├─ meta.json               # top-level module order
│  │  ├─ 01-foundations/
│  │  │  ├─ meta.json            # { "title": "Foundations", "pages": [...] }
│  │  │  ├─ 01-what-is-forex.mdx
│  │  │  └─ 02-pips-lots-leverage.mdx
│  │  ├─ 02-market-structure/
│  │  ├─ 03-candlesticks/
│  │  ├─ 04-support-resistance/
│  │  ├─ 05-risk-management/
│  │  ├─ 06-trading-psychology/
│  │  ├─ 07-gold-xauusd/
│  │  └─ 08-backtesting-journal/
│  ├─ charts/                    # chart JSON files (see Section 7)
│  │  └─ bullish-engulfing-01.json
│  └─ glossary.json
├─ public/
│  └─ images/
│     └─ <module>/<lesson>/<name>.webp
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx
│  │  ├─ page.tsx                       # Home dashboard
│  │  ├─ learn/[[...slug]]/page.tsx     # Lesson pages
│  │  ├─ patterns/page.tsx              # Candlestick pattern library
│  │  ├─ charts/page.tsx                # Chart gallery
│  │  ├─ glossary/page.tsx
│  │  ├─ tags/[tag]/page.tsx
│  │  ├─ tools/risk-calculator/page.tsx
│  │  ├─ studio/                        # DEV ONLY (404 in production)
│  │  │  ├─ page.tsx                    # Studio home
│  │  │  ├─ write/page.tsx              # Article editor
│  │  │  └─ chart-lab/page.tsx          # Chart Lab
│  │  ├─ api/studio/                    # DEV ONLY route handlers
│  │  │  ├─ save-article/route.ts
│  │  │  ├─ save-chart/route.ts
│  │  │  └─ upload-image/route.ts
│  │  ├─ api/search/route.ts
│  │  ├─ not-found.tsx
│  │  └─ sitemap.ts / robots.ts
│  ├─ components/
│  │  ├─ ui/                            # shadcn components
│  │  ├─ layout/ (Header, Footer, ThemeToggle, MobileNav)
│  │  ├─ mdx/                           # components usable inside MDX (Section 6)
│  │  ├─ chart/ (CandleChart, ChartToolbar, primitives/)
│  │  ├─ studio/ (ArticleEditor, ChartLab, CandleEditor, AnnotationTools, ImagePaste)
│  │  └─ progress/ (ProgressBar, MarkComplete, ContinueCard)
│  ├─ lib/
│  │  ├─ source.ts                      # Fumadocs loader
│  │  ├─ charts.ts                      # chart JSON loader + Zod schema
│  │  ├─ patterns.ts                    # pattern generators (Section 7.4)
│  │  ├─ risk.ts                        # position-size math
│  │  ├─ progress.ts                    # localStorage progress helpers
│  │  └─ utils.ts
│  └─ styles/globals.css
├─ tests/ (unit + e2e)
└─ .github/workflows/ci.yml             # lint + typecheck + test + build
```

---

## 5. Content Model

### 5.1 Lesson frontmatter (Zod-validated; build fails on invalid)

```yaml
---
title: Bullish Engulfing Pattern
description: কখন এই reversal signal কাজ করে, আর কখন করে না
level: beginner            # beginner | intermediate | advanced
tags: [candlestick, reversal, price-action]
instruments: [XAUUSD, EURUSD]     # optional
timeframes: [H1, H4]              # optional
status: draft              # draft | in-progress | done  (drafts hidden in production unless STUDIO env)
sources:                          # optional, rendered as "Sources" card
  - type: youtube                 # youtube | pdf | book | blog | other
    title: "Channel / video title"
    url: "https://..."
    note: "timestamp 12:40"
updated: 2026-01-01
---
```

### 5.2 Recommended lesson template (Studio "New article" pre-fills this)

1. **Key takeaways** (`<KeyTakeaways>`)
2. **Definition**
3. **Chart example** (`<Chart id="..."/>` and/or screenshot)
4. **Context** (timeframe, session, trend, location at S/R)
5. **Entry / stop / target idea** (`<TradeSetup>`)
6. **When it works / when it fails** (`<Compare>`)
7. **Common mistakes** (`<Callout type="mistake">`)
8. **My own examples** (screenshots with captions)
9. **Checklist** (`<Checklist>`)
10. **Sources**

### 5.3 Ordering
Order is controlled only by `meta.json` files and numeric filename prefixes. Every lesson page shows: breadcrumb, reading time, level badge, tags, TOC (right side desktop), prev/next lesson links, "Mark as complete" button.

---

## 6. MDX Components (available in every article without importing)

Register all of these globally in the MDX components map.

| Component | Purpose | Example |
|---|---|---|
| `<Callout type="note\|tip\|warning\|mistake\|rule">` | Highlight boxes with icon and color | `<Callout type="rule">Risk max 1% per trade</Callout>` |
| `<KeyTakeaways>` | Summary box at top of lesson | list inside |
| `<Chart id="..." height={420} caption="..."/>` | Renders a chart from `content/charts/<id>.json` | |
| `<ChartInline ...>` | Chart with data defined inline (small examples) | |
| `<TVWidget symbol="OANDA:XAUUSD" interval="60"/>` | Embeds the free TradingView widget (lazy loaded, client only) | |
| `<Figure src="..." caption="..." />` | `next/image` with caption, click-to-zoom lightbox, blur placeholder | |
| `<Compare left={...} right={...} leftLabel="Good" rightLabel="Bad"/>` | Side-by-side images or charts; draggable slider variant optional | |
| `<YouTube id="..." start={760}/>` | Lite embed (click-to-load), timestamp support | |
| `<TradeSetup entry stop target direction pair/>` | Visual card: RR ratio auto-calculated | |
| `<Checklist items={[...]} id="..."/>` | Interactive checklist (state in localStorage) | |
| `<Term>` | Hover/tap tooltip from `glossary.json` | `<Term>pip</Term>` |
| `<PatternCard name="..."/>` | Mini card of a candlestick pattern with generated chart | |
| `<Steps>` | Numbered steps | |
| `<Tabs>` | Fumadocs/shadcn tabs (e.g. per timeframe) | |
| `<Mermaid>` | Flowchart / decision tree | |
| `<Quiz>` (Phase 3) | Self-test MCQ at the end of lesson | |

Rules: all components must work in dark and light themes, be responsive, and degrade gracefully with JS disabled where possible (static content still readable).

---

## 7. Chart System (the heart of the project)

### 7.1 Chart JSON schema (`content/charts/<id>.json`, validate with Zod)

```json
{
  "id": "bullish-engulfing-01",
  "title": "Bullish Engulfing at support",
  "symbol": "XAUUSD",
  "timeframe": "H1",
  "mode": "synthetic",
  "candles": [
    { "i": 0, "o": 2310.5, "h": 2314.0, "l": 2308.2, "c": 2312.1 }
  ],
  "annotations": [
    { "type": "hline", "price": 2305, "label": "Support", "color": "#f5b301", "style": "dashed" },
    { "type": "trendline", "p1": { "i": 2, "price": 2300 }, "p2": { "i": 9, "price": 2315 }, "label": "Uptrend" },
    { "type": "zone", "from": { "i": 4, "price": 2308 }, "to": { "i": 10, "price": 2303 }, "label": "Demand", "color": "#22c55e" },
    { "type": "marker", "i": 8, "position": "belowBar", "shape": "arrowUp", "text": "Entry" },
    { "type": "text", "p": { "i": 6, "price": 2320 }, "text": "Engulfs previous body" },
    { "type": "fib", "p1": { "i": 2, "price": 2300 }, "p2": { "i": 9, "price": 2330 } }
  ],
  "notes": "Optional author notes shown under the chart"
}
```

- `mode: "synthetic"` → candles use bar index `i` (x-axis hidden or labeled by index). Used for textbook pattern illustrations.
- `mode: "real"` → candles use `t` (unix seconds, UTC) instead of `i`. Used for imported market data. Annotations then use `t` instead of `i`.
- Each candle must satisfy `l <= min(o,c)` and `h >= max(o,c)`; validate and report clear errors.

### 7.2 `<CandleChart />` (read-only renderer)
- Built on Lightweight Charts v5, client component, lazy loaded, SSR-safe.
- Renders candles + all annotation types (via primitives or overlay).
- Theme-aware, responsive (`ResizeObserver`), crosshair OHLC legend, optional volume, optional "fullscreen" button, "Download PNG" button.
- Bull/bear colors from CSS variables.
- Skeleton loader while chart mounts. Must not cause layout shift (fixed height).

### 7.3 Chart Lab (dev-only Studio tool at `/studio/chart-lab`)
The tool to create charts **manually**. Features:

1. **Candle editor**
   - Click on the canvas to add a candle; drag the body to move open/close, drag wick ends for high/low.
   - Spreadsheet-style table view synced with the canvas (edit O/H/L/C numerically).
   - Insert / delete / duplicate candle, undo/redo (`Ctrl+Z`, `Ctrl+Shift+Z`).
   - Snap to price grid toggle.
2. **Pattern presets** (see 7.4): pick a pattern, adjust parameters, insert candles at a chosen position.
3. **Annotation tools** (toolbar): horizontal line, trendline, rectangle zone, arrow marker, text label, fib retracement. Select, move, resize, delete, change color and label.
4. **Import**: CSV (columns `time,open,high,low,close[,volume]`; handle MT5 and TradingView export formats), paste-from-clipboard table, choose range.
5. **Replay mode**: step candle-by-candle to view how a setup played out (useful for backtesting notes).
6. **Export**: save JSON to `content/charts/<id>.json` (via dev API), export PNG, and **copy the MDX snippet** `<Chart id="..."/>` to clipboard.
7. **Open existing chart** to edit from the gallery.

Autosave drafts in `localStorage`. The Save button writes to disk only in development.

### 7.4 Pattern generators (`lib/patterns.ts`)
Pure functions returning candle arrays given a start price, ATR-like size and trend context. Implement at least:
Doji (standard, dragonfly, gravestone), Hammer, Inverted Hammer, Hanging Man, Shooting Star, Pin Bar, Bullish/Bearish Engulfing, Inside Bar, Outside Bar, Morning Star, Evening Star, Three White Soldiers, Three Black Crows, Tweezer Top/Bottom, Marubozu, Harami, Piercing Line, Dark Cloud Cover. Unit-test that each output satisfies OHLC validity and the pattern's defining relationship (e.g. engulfing body fully contains previous body).

### 7.5 Real screenshots
Most real-market examples will be TradingView screenshots. `<Figure>` must handle them well: zoom lightbox, captions, optional numbered overlay markers (①②③) as absolutely positioned badges defined in props.

---

## 8. Studio (dev-only authoring environment)

Studio routes and `api/studio/*` handlers must:
- Work **only** when `NODE_ENV === "development"`; in production return 404 (and exclude from sitemap).
- Never accept paths outside `content/` and `public/images/` (sanitize, prevent path traversal, whitelist extensions).

**`/studio/write` — article editor**
- Left: MDX editor (CodeMirror 6 with MDX syntax). Right: live preview (using the real MDX components).
- Toolbar buttons to insert every component from Section 6 with a snippet dialog.
- **Paste an image from clipboard (Ctrl+V) or drag-drop** → uploaded to `public/images/<module>/<lesson>/`, converted to WebP (max width 1600px, quality ~82), and a `<Figure>` snippet inserted at the cursor. Ask for / auto-generate a caption field.
- "Insert chart": opens Chart Lab picker (existing charts or create new).
- Frontmatter form (title, level, tags, sources, status) with Zod validation.
- Choose Module and position; creates file with proper numeric prefix and updates `meta.json`.
- Save writes the `.mdx` file; show saved state and validation errors.
- Keyboard shortcuts: `Ctrl+S` save, `Ctrl+K` command palette.

**Publishing workflow:** Write in Studio locally → `git commit && git push` → Vercel deploys. Document this in `README.md`.

---

## 9. Pages & Features

### 9.1 Home `/`
- Hero with brand, short tagline, search box (`Ctrl+K`).
- **Continue learning** card (last opened lesson from localStorage).
- Overall progress ring + per-module progress bars.
- Latest updated lessons, module grid with icons and lesson counts.

### 9.2 Lesson `/learn/...`
- Fumadocs docs layout: sidebar (modules/lessons with completion checkmarks), TOC, prev/next, breadcrumb.
- "Mark as complete" + auto-save scroll position optional.
- Print-friendly stylesheet.
- Draft lessons visible with a "Draft" badge in dev, hidden in production.

### 9.3 Pattern Library `/patterns`
- Gallery of candlestick patterns, each with generated chart, short description, bullish/bearish/neutral filter, link to the full lesson.

### 9.4 Chart Gallery `/charts`
- Grid of all saved charts with filters (symbol, timeframe, tag), click to open large view and link to the lesson where it is used.

### 9.5 Glossary `/glossary`
- A–Z list, searchable, from `glossary.json`; used by `<Term>` tooltips.

### 9.6 Risk Calculator `/tools/risk-calculator`
Inputs: account balance, risk %, entry, stop loss, instrument (XAUUSD, EURUSD, GBPUSD, USDJPY, custom).
Outputs: risk amount, stop distance, lot size, risk:reward if target given.
- Core formula: `lots = riskAmount / (stopDistanceInPrice × contractSize)` for instruments quoted in USD.
- XAUUSD default contract size: 100 oz per 1.0 lot (so a $1.00 price move ≈ $100 per 1.0 lot). EURUSD: 100,000 units. Make contract size editable because brokers differ, and show a note: "Verify contract size with your broker."
- Pure functions in `lib/risk.ts`, unit tested, including JPY pairs and rounding to lot step (default 0.01).

### 9.7 Search
- Full-text search across title, headings, body and tags (Fumadocs search, Orama). Bengali text must be searchable.

### 9.8 Tags `/tags/[tag]`
- List lessons by tag.

### 9.9 SEO & meta
- Per-lesson metadata, OpenGraph images (dynamic `opengraph-image` with title), sitemap, robots. Set `noindex` by default via env flag `NEXT_PUBLIC_INDEXABLE=false` (owner decides later).

---

## 10. Curriculum Seed (create these modules and empty-but-valid draft lessons with frontmatter and the template headings)

1. **Foundations:** What is Forex · Market participants · Pips, lots, leverage, margin · Spread, commission, swap · Trading sessions · Reading a chart
2. **Market Structure:** Trend, range, HH/HL/LH/LL · Break of structure & change of character · Liquidity & stop hunts · Multi-timeframe analysis
3. **Candlesticks:** Anatomy of a candle · Single candle patterns · Two candle patterns · Three candle patterns · Candle context (location beats pattern)
4. **Support & Resistance:** Levels vs zones · Role reversal · Supply & demand · Trendlines & channels · Fibonacci basics
5. **Risk Management:** Risk per trade · Position sizing · Risk:reward · Drawdown rules · Daily/weekly loss limits
6. **Trading Psychology:** Discipline · FOMO & revenge trading · Journaling habit · Routine
7. **Gold (XAUUSD):** Why gold moves · Sessions & volatility · DXY & US yields · News events (NFP, CPI, FOMC) · Gold-specific risk and lot size · Spread/slippage in gold
8. **Backtesting & Journal:** How to backtest · Journal template · Reviewing trades · Building a plan

Also create **one fully written example lesson** (`03-candlesticks/04-bullish-engulfing.mdx`, content in Bengali + English) that uses every major MDX component, plus a matching `bullish-engulfing-01.json` chart, so the owner can see the intended result.

Seed `glossary.json` with at least 40 terms (pip, lot, leverage, margin, spread, swap, slippage, drawdown, RR, ATR, liquidity, order block, etc.), with short Bengali + English definitions.

---

## 11. Performance, Quality & Security Requirements

- Lighthouse (mobile) targets: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95, Best Practices ≥ 95.
- Chart and heavy components lazy loaded (`next/dynamic`, `ssr: false` only where required). No chart library in the initial JS of non-chart pages.
- Images: always `next/image` (or Studio-processed WebP), explicit width/height to avoid layout shift.
- No secrets needed. Do not hard-code any API keys. `.env.example` provided.
- Studio endpoints dev-only, path-sanitized (Section 8). Add a unit test that production mode returns 404 for them.
- Strict TypeScript, no `any` without a comment, no unused exports, no console errors in browser.
- Errors: friendly `not-found` and `error` pages, error boundary around charts (chart failure must not break the article).
- TradingView widget embed: lazy, consent-free, loaded only when visible.

---

## 12. Testing & CI

- **Vitest:** `lib/risk.ts`, `lib/patterns.ts`, chart JSON Zod schema, frontmatter schema.
- **Playwright smoke tests:** home loads; a lesson renders with a chart; search returns a result; mark-complete persists after reload; dark/light toggle works; `/studio` returns 404 in production build.
- **GitHub Actions** (`ci.yml`): install → lint → typecheck → test → build. Fail on any error.

---

## 13. Developer Experience

Provide these scripts in `package.json`:

```
dev, build, start, lint, typecheck, test, test:e2e, format,
new:lesson   # CLI: pnpm new:lesson "01-foundations" "Pips and lots"
```

`README.md` must include: prerequisites, install, run, how to write a lesson (Studio and manual), how to create a chart (Chart Lab), how to add images, how to deploy to Vercel, project structure summary.

---

## 14. Build Phases (execute in order; stop at the end of each phase and run the verification)

### Phase 1 — Foundation & Reading Experience
- Init Next.js + TS + Tailwind + shadcn, ESLint/Prettier, fonts, theme tokens, dark/light.
- Fumadocs content pipeline, `content/learn` with all seed modules/lessons (drafts), Zod frontmatter.
- Layouts: header, footer (with disclaimer), mobile nav, lesson layout with sidebar/TOC/prev-next.
- MDX components: `Callout`, `KeyTakeaways`, `Figure` (+ lightbox), `YouTube`, `Steps`, `Tabs`, `Term`, `Checklist`, `Compare`.
- Home page, progress tracking (localStorage), search, tags, glossary, sitemap/robots.
- **Verify:** `pnpm lint && pnpm typecheck && pnpm build` pass; app runs; all seed lessons render; Bengali text renders correctly.

### Phase 2 — Charts
- Chart JSON schema + loader, `CandleChart`, annotation primitives, `<Chart>`, `<ChartInline>`, `<TVWidget>`, `<TradeSetup>`, `<PatternCard>`.
- `lib/patterns.ts` with tests, `/patterns` and `/charts` pages, example lesson + example chart.
- **Verify:** unit tests pass; example lesson shows interactive chart with annotations; PNG export works.

### Phase 3 — Studio (authoring)
- Dev-only guards, `/studio/write` editor with live preview and clipboard image paste → WebP.
- Chart Lab (candle editor, annotations, import CSV, replay, export, copy MDX snippet).
- New-lesson CLI, README writing guide.
- **Verify:** can create a lesson, paste an image, build a chart manually, save, and see them on the site; production build 404s `/studio`.

### Phase 4 — Tools & Polish
- Risk calculator + tests, quizzes (`<Quiz>`), print styles, OG images, Lighthouse pass, Playwright suite, CI workflow, deploy to Vercel.

### Phase 5 — Optional (only if requested later)
- Trade journal (Postgres + Drizzle, auth), spaced-repetition flashcards, cross-device progress sync, public/private toggle.

---

## 15. Agent Working Rules

1. Read this whole file first. Follow the phases strictly; at the end of each phase summarize what was built and what was verified.
2. Never invent APIs. For Next.js, Fumadocs, Tailwind, shadcn and Lightweight Charts, check the current official docs for the installed version before using an API.
3. Prefer simple, boring, maintainable code over clever code. Small focused components. No dead code.
4. Every new component: typed props, responsive, dark/light safe, accessible.
5. Do not add libraries not listed here without logging the reason in `DECISIONS.md`.
6. Commit after each logical unit with a clear message (Conventional Commits).
7. If something in this spec is ambiguous or conflicts with reality (e.g. a package API changed), choose the closest sensible option, document it in `DECISIONS.md`, and continue.
8. Quality bar: it must look and feel like a premium product, not a template. Polish spacing, typography, empty states, loading states and error states.
9. Windows 11 compatibility: no bash-only scripts, use cross-platform npm scripts and `path` utilities.
10. Definition of done for the project: all Phase 1 to 4 items complete, CI green, README accurate, example lesson demonstrates every feature.
