# Pattern Library — Article Plan

Applies to every page under `/[lang]/patterns/[id]` (`content/patterns/{id}.{bn,en}.mdx`).
Base rules: `ARTICLE_WRITING_RULES.md` (style, English trading keywords, honest charts, no invented stats).
This file only adds what is different for a pattern page.

## 1. What a pattern page is

- **Lesson** (`/learn`) = teaches a concept in a learning path.
- **Pattern page** = complete field guide for ONE pattern. A reader who lands here from Google,
  with no other context, must be able to recognise, judge, trade (or skip) the pattern.
- Where a lesson already goes deeper (e.g. engulfing entries), link to it; do not copy it.

## 2. Problems in the old pages (fixed by this plan)

- Unverified numbers: "70–75% winrate", "1:3 to 1:5 R:R", "80% body". → Removed. Win rate = "measure it yourself".
- Hype: "institutional smart money", "proven profitable strategies". → Plain, honest tone.
- Transliterated keywords (সাপোর্ট, এনগালফিং). → English keywords in Latin script.
- No failing example, no step-by-step, no quiz, 9-candle charts. → Full template below.
- Content split across MDX + `lib/patternDeepGuides.ts` (bearish-engulfing only). → Everything in MDX.

## 3. Frontmatter

```yaml
title: "Hammer: support-এ sellers হেরে যাওয়ার এক candle-এর গল্প" # name + benefit, ≤70 chars
description: "..." # 120–160 chars
type: bullish # bullish | bearish | neutral
category: rejection # group id from lib/patternsData.ts
level: beginner # beginner | intermediate | advanced
candleCount: 1 # 1 | 2 | 3 | 5
signal: reversal # reversal | continuation | indecision
chartId: hammer-win-01 # win chart (used as page preview)
tags: [pattern, candlestick, hammer]
status: done
sources: [...] # Nison / Bulkowski / Investopedia etc. Only real, existing works.
updated: 2026-11-06
```

## 4. Section order (same for all 28 patterns, both languages)

| #   | Section (bn heading idea)         | Content                                                                                                   |
| --- | --------------------------------- | --------------------------------------------------------------------------------------------------------- |
| 1   | Hook (no heading)                 | 2–4 lines, a real pain point. Never a definition.                                                         |
| 2   | এক নজরে                           | Quick-facts table: type, candles, where, confirmation, stop, invalid, opposite, look-alike                |
| 3   | এই লেখা পড়ে আপনি যা পারবেন       | 3–5 action bullets                                                                                        |
| 4   | কেন জরুরি                         | Why + prerequisites (lesson links)                                                                        |
| 5   | {Pattern} কী                      | Bold one-line definition → analogy → `<CandleDiagram>` textbook → rules table (must-have vs nice-to-have) |
| 6   | শক্তিশালী বনাম দুর্বল             | `<CandleDiagram>` strong vs weak + quality table; look-alike table                                        |
| 7   | Candle-এর ভেতরের গল্প             | Psychology candle by candle, framed as "one common interpretation"                                        |
| 8   | কোথায় কাজ করে, কোথায় করে না     | `<Compare>` good vs bad locations (this is the ONLY "when it fails" section; no separate one)             |
| 8b  | 24h market-এ gap (gap patterns)   | Only for star/harami/engulfing/piercing/dark-cloud/tweezer: `<Callout type="note">` how definition adapts |
| 9   | ধাপে ধাপে trade                   | `<Steps>`: context → wait close → quality → entry type (table) → stop → size → target → manage            |
| 9b  | Trade-এর আগে checklist            | `<Checklist>` same 5 questions every page: level? shape rules? candle closed? R:R ≥ 1:1.5? HTF obstacle?  |
| 10  | উদাহরণ ১: যখন কাজ করে (কাল্পনিক)  | `<Chart id="{id}-win-01">` + seen → decision → result → lesson + `<TradeSetup>`                           |
| 11  | উদাহরণ ২: যখন ফাঁদ হয় (কাল্পনিক) | `<Chart id="{id}-fail-01">` + why it failed, loss capped by stop                                          |
| 12  | সাধারণ ভুল                        | Table: mistake → why → what instead (4–6 rows)                                                            |
| 13  | Pro tips                          | 2–3 `<Callout type="tip">` or `type="warning"`                                                            |
| 14  | সারসংক্ষেপ                        | `<KeyTakeaways>` 3–5 bullets                                                                              |
| 15  | অনুশীলন ও নিজের backtest          | Concrete chart task + journal columns (no win-rate claims)                                                |
| 16  | কুইজ                              | 3–5 questions, answers in `<details>` (bold labels, no numbered list)                                     |
| 17  | পরের ধাপ                          | Prerequisite lesson, related lesson, 2–3 related patterns (`/bn/patterns/x`)                              |
| 18  | Disclaimer                        | `<Disclaimer />`                                                                                          |

Length: bn 1,200–2,000 words; en same structure, same facts, can be a bit tighter.

**Mirror pages** (second of a pair: hanging-man↔hammer, shooting-star↔inverted-hammer, bearish-engulfing↔bullish-engulfing,
dark-cloud-cover↔piercing-line, bearish-harami↔bullish-harami, tweezer-top↔tweezer-bottom, evening-star↔morning-star,
three-black-crows↔three-white-soldiers, three-inside-down↔three-inside-up, falling-three↔rising-three, gravestone↔dragonfly):
keep all sections but short. Steps 9 = only what differs + link to the mirror page for the full walk-through. Target 1,000–1,400 words.
No repeated position-size / stop theory; link the lesson.

## 5. Charts

- Two new synthetic charts per pattern: `{id}-win-01` (hits target before stop) and `{id}-fail-01`
  (looks valid, hits stop). ~25–35 candles, trend leading in, level marked, entry/stop/target hlines.
- `"mode": "synthetic"`, captions say "(শিক্ষামূলক, কাল্পনিক উদাহরণ)". Generator asserts outcome + OHLC validity.
- Rotate instrument + timeframe across patterns (EURUSD, GBPUSD, USDJPY, XAUUSD × H1/H4/D1); never the same pair+TF on
  two consecutive patterns. XAUUSD prices in dollars, JPY pairs 3 decimals.
- `<CandleDiagram>` (components/mdx) for clean shape drawings: textbook, strong vs weak, look-alikes.

## 6. Honesty rules specific to patterns

- No win rates, no "proven". If quoting Bulkowski-style stats, attribute and say they vary by market/period; default = don't quote.
- Volume: spot Forex/Gold = tick volume only; treat as soft hint.
- 24h markets rarely gap: say how gap-based definitions (star, harami, engulfing) adapt.
- Every page has a bad-locations column (section 8) and a failing example. No separate "কখন কাজ করে না" section.

## 7. Page layout

Lesson-style shell: breadcrumb → eyebrow (group · candles · signal) → title → description → MDX in
`.lesson-prose` → prev/next pattern (order of `patternsData`) → TOC right. No separate TS deep-guide sections.

## 8. Rollout order (follow `patternsData` learning sequence)

1. Momentum & Indecision: marubozu, spinning-top, doji, dragonfly-doji, gravestone-doji, long-legged-doji
2. Rejection: hammer (pilot), hanging-man, inverted-hammer, shooting-star
3. Two-candle: bullish-engulfing, bearish-engulfing, piercing-line, dark-cloud-cover, bullish-harami, bearish-harami, tweezer-bottom, tweezer-top
4. Range bars: inside-bar, outside-bar
5. Three-candle: morning-star, evening-star, three-white-soldiers, three-black-crows, three-inside-up, three-inside-down
6. Continuation: rising-three-methods, falling-three-methods

Per pattern: write bn + en MDX, 2 charts, run MDX compile + link/chart-id check.

## 9. Status (2026-11-06)

All 28 patterns done (bn + en, `{id}-win-01` / `{id}-fail-01`, generators `scripts/chartgen/p_{id}.py`).
Check: `node scripts/chartgen/mdxcheck.mjs content/patterns/*.mdx` (compile, links, chart ids, duplicate links outside Next steps).

Each failing example teaches a different lesson; keep it that way when adding patterns:
no level / mid-trend, worn-out level, nearest obstacle under 1.5R, counter-trend, news candle, half confirmation,
mid-wick stop, weak engulfing quality, time stop, shallow 50% penetration, textbook loss (expectancy),
mother-open obstacle, no prior trend, equal-lows sweep, Asian-session tweezer, fakey, mid-range outside bar,
falling moving average (overlay), weekend gap beyond 1R, advance block, late crows at support,
higher-timeframe zone, rollover spread spike, deep pullback, noisy two-sided pause.
