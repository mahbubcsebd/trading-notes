# Trading Methodologies Series — Writing Rules

> **For the AI agent:** This file governs chapter 16 "Trading Methodologies": one comparison overview (`00-overview`) + one overview-level lesson per methodology. Read it fully before researching or writing. Run the Self-Check (Section 14) before delivering each lesson.
>
> `ARTICLE_WRITING_RULES.md` (style, linking, chart JSON, quiz format) still applies. Where rules conflict, **this file wins for lessons in this chapter**.

---

## 0. Series Config

| Setting                | Value                                                                                                                                                |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Site                   | TradeNotes                                                                                                                                           |
| Chapter folder         | `content/learn/16-trading-methodologies/`                                                                                                            |
| Chapter name (BN / EN) | `১৬. Trading Methodology` / `16. Trading Methodologies`                                                                                              |
| Series title (BN)      | `Trading Methodology পরিচিতি: কোন পদ্ধতি কীভাবে Market পড়ে`                                                                                         |
| Series title (EN)      | `Trading Methodologies Explained: How Each Approach Reads the Market`                                                                                |
| Files                  | BN master `NN-slug.mdx`, EN `NN-slug.en.mdx` (same folder, same slug)                                                                                |
| Reader URL             | `/bn/learn/16-trading-methodologies/NN-slug`, `/en/...`                                                                                              |
| Primary language       | Bangla, `আপনি`, trading terms stay English (see memory rule: never translate keywords)                                                               |
| English version        | Required for every file (site is bilingual). EN = faithful plain translation of BN, same structure, same chart ids, same table values. No additions. |
| Reader level           | Knows basics: candlestick, timeframe, trend, S/R, pip, lot, stop loss. New to these methodologies.                                                   |
| Shared example market  | XAUUSD (Gold), H4                                                                                                                                    |
| Length (BN)            | Overview 1,500–2,500 words. Lesson 1,800–3,000 words.                                                                                                |
| Visuals                | Overview 3+. Lesson 6+ (min 3 `<Chart>`: shared-chart reading, extra example, failed example; rest `<CandleDiagram>` / tables).                      |

---

## 1. Series Scope & Order

| #   | File                         | Lesson                              | Core focus                               |
| --- | ---------------------------- | ----------------------------------- | ---------------------------------------- |
| 0   | `00-overview`                | Comparison overview (chapter intro) | All 8 side by side                       |
| 1   | `01-price-action`            | Price Action                        | Price movement & candlesticks            |
| 2   | `02-indicator-based-trading` | Indicator-Based Trading             | Mathematical indicators                  |
| 3   | `03-wyckoff-method`          | Wyckoff Method                      | Accumulation & distribution              |
| 4   | `04-volume-spread-analysis`  | Volume Spread Analysis (VSA)        | Volume–price relationship                |
| 5   | `05-volume-profile`          | Volume Profile                      | Activity at price levels                 |
| 6   | `06-smc-ict`                 | SMC / ICT                           | Liquidity & institutional price delivery |
| 7   | `07-elliott-wave`            | Elliott Wave                        | Market cycles & waves                    |
| 8   | `08-harmonic-patterns`       | Harmonic Patterns                   | Fibonacci-based patterns                 |

**Why this order:** Price Action is the base every other method uses. Wyckoff comes before VSA (VSA grew out of Wyckoff) and before SMC/ICT (many SMC ideas resemble Wyckoff phases). Elliott and Harmonic come last: most rule-heavy and subjective. Do not change the order without the user's approval. After adding/renaming files run `npm run curriculum`.

**No duplicates:** this chapter replaced the old `16-advanced` lessons (SMC, Volume Profile, Wyckoff, Elliott). Their useful content and charts are folded into lessons 3, 5, 6, 7; old URLs redirect (`next.config.mjs`). Automation moved to `15-backtesting-journal`. Price Action and Indicator lessons here are _methodology-level_: they link to chapters 04/06/07/09 for detail instead of repeating them.

---

## 2. Depth Policy (one lesson now, sub-series later)

1. Each methodology gets exactly **one overview-level lesson**: philosophy, core concepts, how it reads a chart, strengths, weaknesses — enough to decide whether to study deeper. Not a full course.
2. **SMC/ICT:** no separate pillar guide exists yet. Lesson 6 is the overview; detailed building blocks already live in ch 03 (liquidity, BOS/CHoCH) and ch 05 (supply & demand) — link there. The SMC/ICT sub-series now exists as chapter `19-smc-ict` (placed at 19 because 17–18 were already taken); lesson 6 links to it.
3. If a concept needs more than ~400 words, explain it briefly and add it to "Deep dive later".
4. **Propose a sub-series** (agent suggests, user decides) when: reader demand reported, OR the lesson can't stay under 3,000 words without dropping essentials, OR > ~8 core concepts each needing its own chart.
5. Sub-series format (when approved): new chapter or lessons following the `ARTICLE_WRITING_RULES.md` 16-section template; the overview lesson stays the entry point and links to each.

---

## 3. Comparison Overview (`00-overview`) — Template

This file is both the chapter intro and series Lesson 0. It replaces `ARTICLE_WRITING_RULES.md` §4A for this chapter but must keep its reading-order table matching `docs/CURRICULUM.md`.

```
1.  Hook — "একই chart, আটজন trader, আট রকম বিশ্লেষণ"
2.  What you will learn
3.  Why so many methodologies exist (each asks the market a different question)
4.  The shared chart (Section 6) — shown once, plain
5.  One-line summary of each methodology (its question)
6.  Master comparison table (Section 5 dimensions)
7.  What each method mainly reads (grouping table)
      - Price only: Price Action, Elliott Wave, Harmonic
      - Price + liquidity narrative: SMC/ICT
      - Price + volume: Wyckoff, VSA, Volume Profile
      - Math derived from price/volume: Indicator-Based
8.  Overlaps & relationships (Wyckoff → VSA, Wyckoff ↔ SMC, Fibonacci in Elliott & Harmonic)
9.  Forex volume caveat (Section 8.2) — short
10. How to choose: personality, time, style — decision table/steps
11. Common mistake: methodology hopping / mixing too many
12. Reading order table (# | lesson link | main question | difficulty) = learning path
13. Series color legend (Section 7.4)
14. Key takeaways
15. Next steps → Disclaimer
```

Rules: neutral, no "best" method; equal depth per method in table and summaries; every table claim must match the lessons (re-check after editing any lesson).

---

## 4. Framework Lesson Template (Lessons 1–8)

Exact section order in every lesson (Bangla headings fixed, EN equivalents in brackets):

```
1.  Title (frontmatter) — "{Method}: {what it reads} — বাংলায় সহজ গাইড"
2.  Hook (2–4 lines)
3.  ## এক নজরে            [At a glance]          → <MethodCard />
4.  ## এই লেখা পড়ে আপনি যা পারবেন  [What you will learn] (3–5)
5.  ## ইতিহাস ও উৎপত্তি    [History and origin]   short, verified
6.  ## মূল দর্শন           [Core philosophy]      the one big question
7.  ## মূল ধারণাগুলো       [Core concepts]        5–8, each ### : definition → analogy → diagram/chart
8.  ## Shared chart-এ পড়া [Reading the shared chart] step by step, <Chart id="meth-{short}-shared" />
9.  ## Trade-এর মূল যুক্তি [Basic trade logic]    entry / SL / TP overview + extra example chart
10. ## শক্তি               [Strengths]
11. ## দুর্বলতা ও সীমা     [Weaknesses and limits] honest, evidence status, failed-example chart, subjectivity justified
12. ## কার জন্য, কার জন্য নয় [Who it suits]
13. ## অন্য পদ্ধতির সাথে মেলানো [Combining with other methods] pairings + what NOT to mix
14. ## পরে গভীরে যা শিখবেন [Deep dive later]
15. ## কীভাবে শেখা শুরু করবেন [How to start]     practice task + resources
16. ## সাধারণ ভুল          [Common mistakes]      3–5, table mistake | why | fix
17. ## সারসংক্ষেপ          [Summary]              <KeyTakeaways>
18. ## কুইজ               [Quiz]                 5 questions, answers in <details> (no numbered list inside)
19. ## পরের ধাপ            [Next steps]           overview + prev + next + related; ### সূত্র list
20. <Disclaimer> exact text (12.3)
```

### 4.1 "At a glance" card (identical fields in every lesson)

```mdx
<MethodCard
  name="Wyckoff Method"
  origin="Richard D. Wyckoff, early 20th century"
  reads="Price + Volume"
  question="বড় player-রা কি accumulate করছে না distribute করছে?"
  timeframes="H4, D1, W1"
  difficulty="intermediate"
  subjectivity="medium"
  needsVolume
/>
```

Component: `components/mdx/MethodCard.tsx`. Allowed values (enforced by types):

- `reads`: `Price` | `Price + Volume` | `Price + Liquidity narrative` | `Indicators (math on price/volume)`
- `difficulty`: `beginner` | `intermediate` | `advanced`
- `subjectivity`: `low` | `medium` | `high` — justify in Weaknesses.
- `lang`: `bn` (default) | `en` — card labels switch language; pass `lang="en"` in EN files.

---

## 5. Comparison Dimensions (fixed)

| Dimension         | What to state                             |
| ----------------- | ----------------------------------------- |
| মূল ফোকাস         | What it primarily reads                   |
| মূল প্রশ্ন        | The question it asks                      |
| উৎপত্তি           | Founder / era                             |
| Data needed       | Price only / price + volume / indicators  |
| Typical timeframe | Where most commonly applied               |
| Subjectivity      | low / medium / high                       |
| Learning curve    | beginner / intermediate / advanced        |
| Main strength     | One line                                  |
| Main weakness     | One line                                  |
| Forex/Gold caveat | Market-specific limitation (e.g., volume) |

---

## 6. Shared Chart Rule

1. One XAUUSD H4 price path is used in **every** lesson; each lesson reads _that same_ path through its own lens.
2. **Data honesty:** the repo has no real XAUUSD OHLC history. Until real data is supplied, the shared chart is **synthetic** (`"mode": "synthetic"`), generated once by `scripts/chartgen/meth_shared.py` (same candles + synthetic tick-volume pane in every `meth-*-shared` chart; only annotations/overlays differ). Captions must say "শিক্ষামূলক কাল্পনিক ডেটা". Delivery note lists `NEEDS_REAL_EXAMPLE`. When real data arrives, regenerate from it and state symbol, TF, source, date range (BD time).
3. The path contains: downtrend → range/accumulation (with a spring-like sweep) → strong up leg in waves → distribution-ish top → drop. Every method should find something; if one finds nothing clean, **say so** and use a second labelled example. Never force a pattern.
4. Chart ids: `meth-{short}-shared`, `meth-{short}-ex-01` (extra example), `meth-{short}-fail-01` (failed). Short names: `pa`, `ind`, `wyckoff`, `vsa`, `vp`, `smc`, `ew`, `harm`, base `meth-shared-base` (overview).
5. Existing synthetic charts from the old lessons (`wyckoff-*`, `vp-*`, `smc-*`, `elliott-*`) may be reused as extra/failed examples; update their `module`/`lessonSlugs`.

---

## 7. Visual & Color Rules

1. Use only components that exist: `<Chart id>` (JSON in `content/charts/`), `<CandleDiagram>`/`<DiagramRow>` (concept shapes), markdown tables, `<ChartPlaceholder>` (fallback only). `<Figure src>` only when a real image file exists.
2. Every chart/diagram has a caption that says what to look at; reference it in the text. Synthetic = labelled.
3. Max ~6 annotations per chart; short tags (`SC`, `W3`, `X-A-B-C-D`).
4. **Series color legend** (chartgen constants; shown in the overview):

| Element                     | Color                     |
| --------------------------- | ------------------------- |
| Bullish zone / demand, TP   | Green `#22c55e`           |
| Bearish zone / supply, SL   | Red `#ef4444`             |
| Range / consolidation       | Grey zone `#64748b`       |
| Key level                   | Solid/dashed hline        |
| Fibonacci / POC / highlight | Gold `#f5b301`            |
| Entry, FVG                  | Blue `#3b82f6`            |
| Volume / indicators         | Separate pane under price |

---

## 8. Accuracy & Honesty Rules

### 8.1 General

1. Research per methodology; cross-check every origin, rule and ratio in 2+ reliable sources. List real URLs only in frontmatter `sources`.
2. Never copy text or charts. Never invent statistics, win rates, quotes or URLs (`LINK_NEEDED` if unsure).
3. Every lesson states its **evidence status**: what independent research exists (or that little exists) and that no method guarantees profit.
4. Where practitioners disagree (wave counts, harmonic tolerances, valid OB, Wyckoff schematic variants) say so and state the version used.

### 8.2 Forex volume caveat (mandatory in Overview, Wyckoff, VSA, Volume Profile)

- Spot forex/gold has **no centralised exchange**; chart volume is broker **tick volume** — a proxy, not traded volume.
- Workarounds: exchange-traded gold futures (CME GC) volume; treat tick volume as approximate.
- Never present tick volume as real volume.

### 8.3 Methodology-specific checklist

| Lesson          | Verify                                                                                 |
| --------------- | -------------------------------------------------------------------------------------- |
| Price Action    | Consistent with ch 04/05/06/09 definitions                                             |
| Indicator-Based | Defaults/formulas; leading vs lagging; repainting; overfitting                         |
| Wyckoff         | Origin, three laws, phases A–E, event names                                            |
| VSA             | Tom Williams, developed from Wyckoff; bar types & stated meaning                       |
| Volume Profile  | Market Profile at CBOT, J. Peter Steidlmayer; POC/VAH/VAL, ~70% value area, HVN/LVN    |
| SMC / ICT       | Consistent with ch 03 liquidity/BOS and ch 05 supply-demand lessons                    |
| Elliott Wave    | R.N. Elliott; three hard rules vs guidelines; Fibonacci relations; count subjectivity  |
| Harmonic        | Gartley (1935), Pesavento, Carney; ratio set from cited source; tolerance disagreement |

---

## 9. Writing Style

1. Why → What → How in every concept; definition → everyday analogy (Bangladeshi context welcome) → diagram → shared-chart use.
2. Short sentences (mostly < 20 words), paragraphs 2–4 lines, `আপনি` only.
3. Neutral toward every school; criticism factual. No hype ("secret", "holy grail", "guaranteed", "100%").
4. Consistent terms across the series (use "range"; alias "consolidation").
5. Same Bangla section headings in every lesson. Each lesson readable alone: prerequisites get one line + link.

---

## 10. Linking

1. Follow `ARTICLE_WRITING_RULES.md` §10 (first mention only, internal first, trusted external, `LINK_NEEDED`, never invent URLs; only paths listed in `docs/CURRICULUM.md`).
2. Every lesson links: overview, previous, next, closely related (VSA ↔ Wyckoff, SMC ↔ Wyckoff, Elliott ↔ Harmonic via Fibonacci).
3. EN files link `/en/...`, BN files `/bn/...`.

---

## 11. Bilingual

1. BN is master, written first. EN mirrors it faithfully (same sections, charts, tables, values).
2. Chart JSON holds both `bn` and `en` caption/explanation; `<Chart caption>` in each file is in that file's language. Chart labels inside the chart stay English.
3. Edit BN later → update EN in the same turn.

---

## 12. Output Format

### 12.1 Frontmatter (only fields allowed by `source.config.ts`)

```yaml
---
title: "Wyckoff Method: Accumulation ও Distribution — বাংলায় সহজ গাইড"
description: "120–160 chars, main keyword + benefit"
level: intermediate
tags: [wyckoff, accumulation, distribution, volume, methodology]
instruments: [XAUUSD]
timeframes: [H4, D1]
status: done
sources:
  - type: blog # youtube | pdf | book | blog | other
    title: "..."
    url: "https://..."
updated: 2026-11-07
---
```

No `slug/series/seriesOrder/translationOf/readingTime` fields: order comes from filename + `meta.json`, translation from the `.en.mdx` sibling.

### 12.2 Components

```mdx
<MethodCard ... />                 // §4.1
<Chart id="..." height={460} caption="..." />
<CandleDiagram candles={[...]} levels={[...]} caption="..." />  <DiagramRow>...</DiagramRow>
<Callout type="tip|warning|note">...</Callout>
<KeyTakeaways>...</KeyTakeaways>
<Steps>### ...</Steps>
<Compare leftLabel rightLabel left right />
<Checklist id items={[...]} />
<ExternalLink href="...">...</ExternalLink>
<Disclaimer>...</Disclaimer>
```

### 12.3 Disclaimer (exact text)

BN:

```mdx
<Disclaimer>
  এই লেখাটি শুধুমাত্র শিক্ষামূলক উদ্দেশ্যে। এটি কোনো financial advice নয়। কোনো
  trading পদ্ধতিই নিশ্চিত লাভ দেয় না। Forex ও Gold trading-এ উল্লেখযোগ্য আর্থিক
  ঝুঁকি রয়েছে এবং আপনি আপনার বিনিয়োগের পুরোটাই হারাতে পারেন। Real money দিয়ে
  trade করার আগে demo account-এ যথেষ্ট অনুশীলন করুন।
</Disclaimer>
```

EN:

```mdx
<Disclaimer>
  This article is for educational purposes only and is not financial advice. No
  trading methodology guarantees profit. Forex and gold trading carry
  significant financial risk, and you can lose all of your capital. Practise on
  a demo account before trading with real money.
</Disclaimer>
```

---

## 13. Forbidden

- ❌ Declaring any methodology "the best" / "the only one that works"
- ❌ Uneven depth between methods in the overview
- ❌ Course-level depth inside a lesson (use "Deep dive later")
- ❌ Repeating content that lives in ch 03–09 instead of linking it
- ❌ Forcing a pattern onto the shared chart
- ❌ Tick volume presented as true volume
- ❌ Synthetic data presented as real; copied text/charts; invented stats, quotes, origins, ratios, URLs
- ❌ Inconsistent section order or MethodCard values
- ❌ Only winning examples; teaching entries without stop loss
- ❌ Hype words; mixing `আপনি` and `তুমি`; numbered list inside `<details>`

---

## 14. Self-Check (every item YES)

**Series** — template order exact? MethodCard values allowed? Shared chart used, honest if nothing clean? Overview table still matches? Overview/prev/next links present?
**Understanding** — reader can explain the core idea? 5–8 concepts with definition + analogy + visual? Overview-level only?
**Accuracy** — origins/rules/ratios cross-checked? Disagreements noted? Evidence status stated? Volume caveat where required? No invented facts/URLs?
**Visuals** — 6+ visuals, ≥3 charts (shared, extra, failed), all captioned and referenced, synthetic labelled? Legend colors followed?
**Output** — frontmatter valid per schema? BN + EN both present and matching? Exact disclaimer? `npm run curriculum` run, `node scripts/chartgen/mdxcheck.mjs <files>` passes? Delivery note done?

---

## 15. Delivery Note (per lesson, in chat)

1. Word count (BN), visual count
2. Sources (URLs)
3. Disputed rules and the version used
4. Charts: id | synthetic/real | status (`NEEDS_REAL_EXAMPLE`)
5. `LINK_NEEDED` items
6. Overview-table values changed (if any)
7. Deep-dive topics + sub-series recommendation (reason per §2.4)
8. Claims left out due to uncertainty
