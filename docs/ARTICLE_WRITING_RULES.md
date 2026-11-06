# Trading Learning Article — Writing Rules

> **For the AI agent:** Read this entire file before writing ANY article. Follow every rule. If a rule conflicts with a user instruction for a specific article, the user instruction wins for that article only. Never skip the Self-Check (Section 13) before delivering.

---

## 0. Project Config (edit these values)

| Setting                 | Value                                                                                                                                                                               |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Site name               | TradeNotes (trading-knowledge)                                                                                                                                                      |
| Site base URL           | set via env when deployed; use relative links only                                                                                                                                  |
| Article output language | Bengali (বাংলা script). Trading terms stay in English, with Bengali meaning on first use.                                                                                           |
| Default audience        | Beginner to intermediate retail traders (forex, gold, indices)                                                                                                                      |
| Output format           | `.mdx` file with frontmatter (see Section 11)                                                                                                                                       |
| Output folder           | `content/learn/{NN-module}/{NN-slug}.mdx` (module = existing folder). Prefixes MUST be unique and gapless inside a chapter (`01`, `02`, …); `00-overview.mdx` is the chapter intro. |
| Order & meta            | Sidebar order = filename order. After adding, renaming or deleting any lesson run `npm run curriculum`: it syncs every chapter `meta.json` and regenerates `docs/CURRICULUM.md`.    |
| Link map file           | `docs/CURRICULUM.md` (authoritative, generated). Section 10.4 holds only keyword shortcuts.                                                                                         |
| Reader URL              | `/bn/learn/{NN-module}/{NN-slug}`                                                                                                                                                   |
| Lesson status           | `draft` = stub, `in-progress` = partly written, `done` = passes Section 13                                                                                                          |

---

## 1. Core Mission

Every article must leave the reader with a **crystal-clear understanding** of ONE topic — clear enough that they can:

1. Explain the concept in their own words,
2. Spot it on a real chart,
3. Use it (or avoid misusing it) in a real trade.

If the reader finishes and still needs to Google the topic, the article has failed.

---

## 2. Mandatory Workflow (follow in order)

0. **Check the map** — Open `docs/CURRICULUM.md`. Confirm the lesson's chapter, its position in the sequence, and which lessons come before/after (for links and prerequisites). If the sequence is wrong (duplicate prefix, wrong order, missing or duplicate topic), fix the structure first (rename/add/delete files, then `npm run curriculum`) and update links. Never publish a lesson that breaks the chapter's sequence. If the chapter has no `00-overview.mdx` yet, write it first (Section 4A).
1. **Understand the topic** — Identify the single core idea. If the topic is too broad (e.g. "Technical Analysis"), stop and propose a split into multiple articles.
2. **Research** — Follow Section 3. Read multiple sources before writing a single line.
3. **Build a research summary** (internal, not published): key facts, points all sources agree on, disagreements, common misconceptions, gaps nobody explains well.
4. **Write the outline** using the template in Section 4.
5. **Draft** following Sections 5–9.
6. **Add links** following Section 10.
7. **Add frontmatter** following Section 11.
8. **Run the Self-Check** in Section 13. Fix every failed item.
9. **Deliver** the final `.mdx` file plus a short note listing: sources used, `[LINK_NEEDED]` items, and `[CHART]` placeholders that need real images.

---

## 3. Research Rules

1. Read **at least 5 quality sources** per topic before writing. Prefer:
   - Investopedia, BabyPips, CME Group education, IG/OANDA/FXCM education pages, TradingView education/ideas, Bank for International Settlements (BIS), central bank sites (Fed, ECB), reputable books (e.g. John Murphy, Al Brooks, Mark Douglas).
2. Avoid as primary sources: random forums, YouTube comments, "signal" sellers, sites promising guaranteed profit.
3. **Never copy.** No sentence may be copied from any source. Rewrite every idea in your own words and your own structure.
4. **Cross-check facts.** Any number, definition, or rule must appear in at least 2 reliable sources. If sources disagree, say so in the article and explain why.
5. **Find the gap.** Identify what most articles explain badly or skip — and explain that part better. This is where our article beats the competition.
6. **Add original value** in every article: our own analogy, our own worked example, our own checklist or framework.
7. Never invent statistics, studies, quotes, or historical events. If unsure, leave it out.

---

## 4. Mandatory Article Template

Every article MUST follow this section order. Section headings can be adapted to the topic, but the structure cannot change.

```
1.  Title
2.  Hook (2–4 lines)
3.  What you will learn (learning outcomes, 3–5 bullets)
4.  Why this matters (the "why" before the "what")
5.  What it is (simple definition + analogy)
6.  How it looks on a chart (annotated chart)
7.  How to use it — step by step
8.  Real market example — a winning case
9.  Real market example — a failing case
10. Common mistakes
11. Pro tips
12. Key takeaways (summary box)
13. Practice task
14. Quick quiz (3–5 questions, answers hidden/collapsed)
15. Next steps (links to next/related articles)
16. Risk disclaimer
```

### Section-by-section rules

**1. Title**

- Specific + benefit-driven. Max ~70 characters.
- Good: `Support & Resistance: চার্টে দাম কোথায় থামবে বুঝুন`
- Bad: `Support and Resistance সম্পর্কে সবকিছু`

**2. Hook**

- Start with a real pain point, question, or short story the reader relates to.
- Example: `কখনো দেখেছেন, আপনি entry নেওয়ার ঠিক পরেই দাম উল্টো দিকে ঘুরে গেছে? এটা কাকতালীয় নয় — এর পেছনে একটা কারণ আছে।`
- Never start with a dictionary definition or "In this article we will discuss…".

**3. What you will learn**

- 3–5 bullets, each starting with an action verb (চিনতে পারবেন, আঁকতে পারবেন, ব্যবহার করতে পারবেন).

**4. Why this matters**

- Explain how this concept saves money, improves entries, or prevents mistakes. Keep it short and concrete.

**5. What it is**

- One-sentence plain definition first.
- Then one analogy from everyday life.
  Example: `Support হলো একটা মেঝের মতো — দাম বারবার নিচে নেমে এখানে ধাক্কা খেয়ে উপরে উঠে আসে।`
- Then the precise/technical definition.

**6. Chart section** — follow Section 7.

**7. Step by step**

- Numbered steps. One action per step. The reader should be able to follow along on their own chart.

**8 & 9. Real examples** — follow Section 8. The failing case is mandatory.

**10. Common mistakes**

- 3–6 mistakes. Format: mistake → why it happens → what to do instead.

**11. Pro tips**

- 2–4 tips, written as callout boxes (see Section 11.3).

**12. Key takeaways**

- 3–5 bullets. A reader who reads only this box should still get the core idea.

**13. Practice task**

- A concrete task on a demo account or chart. Example: `TradingView-এ EUR/USD-এর 4H চার্ট খুলুন এবং শেষ ৩ মাসের ৩টি support level চিহ্নিত করুন।`

**14. Quiz**

- 3–5 multiple-choice or short questions testing understanding, not memorization. Put answers in a collapsed `<details>` block.

**15. Next steps**

- Link 1 prerequisite article (if any) and 1–3 next articles in the learning path.

**16. Disclaimer** — use the exact text from Section 9.6.

---

## 4A. Chapter Overview Page (`00-overview.mdx`)

Every chapter starts with an overview page. It tells the reader what the chapter is, why it matters, what it covers and in which order to read it. It is NOT a lesson: it is not counted in lesson totals and does not use the 16-section template. Write it before the chapter's lessons, update it whenever the lesson list changes.

Required sections, in order:

1. **Title** — `{Chapter name}: {benefit in a few words} (চ্যাপ্টার পরিচিতি)`.
2. **Hook** — one analogy or pain point (map, foundation, etc.), 2–4 lines.
3. **What is {topic}** — one-sentence definition + the single question the chapter answers.
4. **Why learn it first / now** — 3–4 bullets (what breaks without it, which later chapters depend on it).
5. **What you will be able to do** — 4–6 action-verb bullets (one per lesson, roughly).
6. **Reading order table** — `# | Lesson (internal link) | Main question | Difficulty`. Must match `docs/CURRICULUM.md` exactly.
7. **How the lessons connect** — a short ordered walkthrough of one decision flow across the lessons.
8. **What is NOT in this chapter** — link to the chapter that covers each excluded neighbour topic.
9. **How to study it** — 3–4 bullets (order, practice, timeframe, demo account).
10. **Self-check** — `<Checklist>` of prerequisite questions.
11. **Next steps** — first lesson, previous chapter, next chapter. Then `<Disclaimer />`.

Frontmatter: `level` = chapter's starting level, `status: done`, no `sources`. Do not state statistics. Mention synthetic charts honestly.

---

## 5. Writing Style Rules

1. **One article = one core idea.** Related ideas get one line + a link, not a full explanation.
2. **Why → What → How** order, always.
3. **Simple to complex.** Never use a concept before it has been explained or linked.
4. **Address the reader directly** with `আপনি` (respectful, consistent across all articles). Never mix `তুমি` and `আপনি`.
5. **Short sentences.** Aim for under 20 words. One idea per sentence.
6. **Short paragraphs.** 2–4 lines max (mobile-first reading).
7. **Active voice.** `দাম support-এ ধাক্কা খায়` — not `support-এ দামের দ্বারা ধাক্কা খাওয়া হয়`.
8. **Be specific.** Not `অনেক trader ভুল করে` — instead give a concrete scenario or number (only real, verifiable numbers).
9. **Jargon rule:** Every trading term, on first use: English term + Bengali meaning + link (Section 10).
   Example: `**Pip** (দামের সবচেয়ে ছোট মাপের একক)`
   **Keep trading keywords in English — never translate them.** Write `support`, `liquidity`, `break of structure`, `stop loss`, `pip`, `swing high` as-is, in Latin script, even inside Bengali sentences (`দাম support-এ ধাক্কা খায়`). Never transliterate (`সাপোর্ট`) or replace with a Bengali coinage. The Bengali gloss on first use _explains_ the term; it does not _replace_ it. Applies to titles, headings, tables, callouts and chart captions.
10. **Use the Rule of Three** where natural: 3 steps, 3 signs, 3 mistakes.
11. **Ask the reader questions** occasionally: `এই চার্টে আপনি হলে কোথায় entry নিতেন?`
12. **Address misconceptions explicitly:** `অনেকে মনে করেন X, কিন্তু আসলে Y।`
13. **Tone:** friendly mentor, confident but honest. Light humour is fine; hype is not.
14. **Cut filler.** For every sentence ask: "If I delete this, does the reader lose anything?" If no, delete it.
15. **Consistent terminology.** Once you call something "swing high", don't switch to "peak" or "top" later in the same article.
16. **Length:** 1,200–2,500 words for standard topics. Never pad to hit a word count; never cut clarity to stay short.

---

## 6. Formatting Rules

1. Use `##` for main sections, `###` for sub-sections. Never skip heading levels. Only one `#` (the title, set via frontmatter).
2. Headings must be meaningful on their own — a reader skimming only headings should understand the article flow.
3. Use **bold** for key terms and the single most important sentence of a section. Don't overuse.
4. Use tables for comparisons (e.g. Support vs Resistance, Market order vs Limit order).
5. Use numbered lists for sequences, bullets for unordered items.
6. Use callout components (Section 11.3) for tips, warnings, and notes — max 1 callout per ~300 words.
7. No walls of text. If a section has 5+ paragraphs with no visual break, add a list, table, chart, or callout.

---

## 7. Chart & Visual Rules

1. **Every core concept needs at least one chart.** Minimum 2 charts per article, ideally 3–5.
2. Charts must be **annotated**: arrows, circles, labels, horizontal lines — the reader must know exactly where to look.
3. Use this placeholder syntax when a real image is not available yet:

   **First choice:** build a chart JSON in `content/charts/{id}.json` (copy `trendline-breakdown-01.json` for the format: candles, annotations of type trendline/zone/hline/marker, bn+en caption/explanation) and embed `<Chart id="{id}" height={420} caption="..." />`. Set `"mode": "synthetic"` or `"real"` honestly.
   **Fallback** when no data is available yet:

   ```mdx
   <ChartPlaceholder
     id="sr-01"
     symbol="EURUSD"
     timeframe="4H"
     period="2025-03-01 to 2025-04-15"
     annotations="Mark 3 touches of support at 1.0750 with green circles; arrow showing bounce"
     caption="EUR/USD 4H — দাম তিনবার 1.0750 support থেকে উপরে উঠেছে"
   />
   ```

4. Every chart has a **caption** explaining what it shows in one sentence.
5. Before/after charts are encouraged: "setup forming" → "what happened next".
6. Diagrams (flowcharts, decision trees) are good for processes like "should I take this trade?".
7. Always state symbol, timeframe, and date range for real-market charts.

---

## 8. Example Rules

1. **Every article has at least one real-market example** (real symbol, timeframe, approximate date). Use well-known, verifiable market moves. If real OHLC data is not available, say so: label the example `(কাল্পনিক/শিক্ষামূলক উদাহরণ)`, set the chart JSON `"mode": "synthetic"`, and list it in the delivery note as `NEEDS_REAL_EXAMPLE`. Never present synthetic data as a real trade. Levels quoted from a video/book count as real only when attributed to that source.
2. **Every article has at least one failing example** (real, or clearly labeled illustrative) — where the setup looked valid but failed — and explains why. This builds honesty and trust.
3. Walk through examples **step by step**: what was visible at the time → decision → result → lesson.
4. Use the **same example** throughout one section; don't jump between 5 different charts to explain one idea.
5. Everyday-life analogies are mandatory for abstract concepts (liquidity, leverage, spread, etc.).
6. If you include a hypothetical trade, label it clearly: `(উদাহরণস্বরূপ, কাল্পনিক trade)`.
7. Never present cherry-picked winners as typical results.

---

## 9. Trading-Specific Rules

1. **Risk management in every strategy article.** If you teach an entry, you must teach stop-loss placement and position sizing (or link to it).
2. **No guarantees.** Never write "100% কাজ করে", "নিশ্চিত profit", "never loses", or similar.
3. **No personal financial advice.** Teach concepts; never tell the reader to buy/sell a specific asset now.
4. **Mention limitations.** Every indicator/strategy section must include "কখন এটা কাজ করে না".
5. **Label difficulty level** in frontmatter: `beginner`, `intermediate`, or `advanced`.
6. **Disclaimer** — end every article with exactly:

   ```mdx
   <Disclaimer>
     এই লেখাটি শুধুমাত্র শিক্ষামূলক উদ্দেশ্যে। এটি কোনো financial advice নয়।
     Trading-এ উল্লেখযোগ্য আর্থিক ঝুঁকি রয়েছে এবং আপনি আপনার বিনিয়োগের পুরোটাই
     হারাতে পারেন। Real money দিয়ে trade করার আগে demo account-এ অনুশীলন করুন।
   </Disclaimer>
   ```

---

## 10. Keyword Linking Rules

### 10.1 What to link

- Every trading term, concept, indicator, pattern, or tool that has its own page — on **first mention only** in the article.
- Do not link the same keyword twice in one article.
- Do not link the article's own main topic to itself.
- Do not link inside headings.

### 10.2 Link priority (follow strictly)

1. **Internal link first** — if the keyword exists in the Link Map (10.4) with an internal URL, use it.
2. **Third-party link second** — only if there is no internal page. Use only trusted domains:
   `investopedia.com`, `babypips.com`, `cmegroup.com`, `tradingview.com`, `bis.org`, `federalreserve.gov`, `ecb.europa.eu`, `cftc.gov`, `oanda.com`, `ig.com`.
3. **Unknown** — if you cannot confirm a real, working URL, **do not guess or invent a URL.** Write the keyword with a marker instead:
   `[Fibonacci Retracement](LINK_NEEDED)`
   and list it in your delivery note.

### 10.3 Link formatting

- Internal: `[Support Level](/bn/learn/05-support-resistance/01-levels-vs-zones)` (relative path with `/bn` language prefix, same tab). Only link to files that exist in `content/learn/`.
- External: `<ExternalLink href="https://www.investopedia.com/...">Leverage</ExternalLink>` (component opens in new tab with `rel="noopener noreferrer"`)
- Link text = the natural keyword, never "এখানে ক্লিক করুন".
- Density: max ~1 link per 100 words. Prioritise terms a beginner is most likely not to know.
- Internal links to related articles also go in the "Next steps" section.

### 10.4 Link Map

> **Authoritative URLs: `docs/CURRICULUM.md`** (generated from the files; never link to a path that is not listed there). The rows below are keyword → lesson shortcuts only. Keep them in sync when a lesson is renamed. Keywords match case-insensitively and include listed aliases (English and Bengali). Rename/move a lesson only via a script or global search-replace of its full `folder/slug` path, then run `npm run curriculum`.

| Keyword                                        | Aliases                            | Internal URL                                                     |
| ---------------------------------------------- | ---------------------------------- | ---------------------------------------------------------------- |
| Pip, Lot, Leverage, Margin                     | pips, লট, লিভারেজ                  | `/bn/learn/01-foundations/03-pips-lots-leverage-margin`          |
| Spread, Swap                                   | স্প্রেড                            | `/bn/learn/01-foundations/04-spread-commission-swap`             |
| Trading Session                                | London, New York                   | `/bn/learn/01-foundations/05-trading-sessions`                   |
| Order Types                                    | limit, stop order                  | `/bn/learn/02-broker-platform-setup/04-order-types`              |
| Market Structure (chapter)                     | overview, মার্কেট স্ট্রাকচার       | `/bn/learn/03-market-structure/00-overview`                      |
| Swing High / Swing Low                         | swing, pivot, fractal              | `/bn/learn/03-market-structure/01-swing-high-low`                |
| Trend, Range                                   | HH, HL, LH, LL, uptrend, downtrend | `/bn/learn/03-market-structure/02-trend-range-hhhl`              |
| BOS / CHoCH                                    | Break of Structure                 | `/bn/learn/03-market-structure/03-break-of-structure`            |
| Liquidity                                      | stop hunt                          | `/bn/learn/03-market-structure/04-liquidity-stop-hunts`          |
| Candlestick                                    | candle                             | `/bn/learn/04-candlesticks/01-anatomy-of-a-candle`               |
| Support, Resistance                            | S/R, level, zone                   | `/bn/learn/05-support-resistance/01-levels-vs-zones`             |
| Role Reversal                                  | flip                               | `/bn/learn/05-support-resistance/02-role-reversal`               |
| Supply & Demand                                | order block                        | `/bn/learn/05-support-resistance/03-supply-demand`               |
| Trendline, Channel                             | ট্রেন্ডলাইন                        | `/bn/learn/05-support-resistance/04-trendlines-channels`         |
| Fibonacci                                      | retracement                        | `/bn/learn/05-support-resistance/05-fibonacci-basics`            |
| Moving Average                                 | MA, EMA, SMA                       | `/bn/learn/07-technical-indicators/01-moving-averages-crossover` |
| RSI, Divergence                                |                                    | `/bn/learn/07-technical-indicators/02-rsi-divergence`            |
| Position Sizing                                | lot size calc                      | `/bn/learn/08-risk-management/02-position-sizing`                |
| Risk Reward                                    | R:R, RR                            | `/bn/learn/08-risk-management/03-risk-reward`                    |
| Stop Loss                                      | SL                                 | `/bn/learn/10-trade-management-execution/01-stop-loss-placement` |
| _add a row whenever a lesson is marked `done`_ |                                    |                                                                  |

> **Note:** A linked lesson may still be a stub (`status: draft`). Linking to it is fine; it becomes useful when written. For terms with no page at all, use a trusted external link (10.2) or `LINK_NEEDED`.

---

## 11. Output Format (Next.js MDX)

### 11.1 Frontmatter (required)

```yaml
---
title: "Trendlines & Channels: প্রাইসের ঢাল পড়ার সহজ গাইড"
description: "Trendline কীভাবে আঁকবেন, কখন ভ্যালিড, কখন ভাঙে — chart example সহ।" # 120-160 chars
level: beginner # beginner | intermediate | advanced
tags: [trendline, channel]
instruments: [EURUSD] # optional
timeframes: [H1, H4] # optional
status: done # draft | in-progress | done  (schema-enforced)
sources: # schema: type = youtube | pdf | book | blog | other
  - type: blog
    title: "..."
    url: "https://..."
updated: 2026-11-05
---
```

> Only these fields are allowed by `source.config.ts`. Reading time, prerequisites and next-lessons are NOT frontmatter: put prerequisites in "Why this matters" and next lessons in the "Next steps" section. Order comes from `meta.json`.

### 11.2 Description rules

- 120–160 characters, includes the main keyword, states the benefit.

### 11.3 Components to use

```mdx
<Callout type="tip">...</Callout>        // Pro tip
<Callout type="warning">...</Callout>    // Danger / common loss cause
<Callout type="note">...</Callout>       // Extra info
<KeyTakeaways>...</KeyTakeaways>         // Summary box
<ChartPlaceholder ... />                 // See Section 7
<ExternalLink href="...">...</ExternalLink>
<Disclaimer />                          // exact text built in; or pass children
<Chart id="..." />                      // real chart JSON (Section 7)
<TradeSetup direction pair entry stop target />
<Compare leftLabel rightLabel left right /> // good vs bad
<Checklist items={[...]} />
<Steps>### Step</Steps>
<YouTube id start />
```

Quiz answers (do NOT use a numbered list inside `<details>`: Prettier indents `</details>` and the MDX build breaks. Use bold labels separated by blank lines):

```mdx
<details>
<summary>উত্তর দেখুন</summary>

**১.** B — কারণ ...

**২.** ...

</details>
```

---

## 12. Forbidden

- ❌ Copying or closely paraphrasing any source sentence
- ❌ Invented statistics, quotes, studies, or URLs
- ❌ "Guaranteed profit", "100% accurate", "never loses"
- ❌ Specific buy/sell recommendations for current markets
- ❌ Starting with a dictionary definition or "এই আর্টিকেলে আমরা আলোচনা করব…"
- ❌ Using a term before explaining or linking it
- ❌ Mixing `আপনি` and `তুমি`
- ❌ Walls of text with no visual break
- ❌ Only winning examples
- ❌ Teaching an entry strategy without stop-loss / risk management
- ❌ Linking the same keyword more than once

---

## 13. Self-Check (run before delivering — every item must be YES)

**Content**

- [ ] Does the article cover exactly ONE core idea?
- [ ] Could a complete beginner explain the concept after reading?
- [ ] Is "why" explained before "what" and "how"?
- [ ] Is there at least one everyday analogy?
- [ ] Is there at least one real-market example AND one failing example?
- [ ] Are limitations ("when it doesn't work") covered?
- [ ] Is risk management included or linked?
- [ ] Does it add something original that typical articles miss?

**Accuracy**

- [ ] Is every fact cross-checked in 2+ reliable sources?
- [ ] Zero invented numbers, quotes, or URLs?
- [ ] Zero copied sentences?

**Structure & style**

- [ ] All 16 template sections present, in order?
- [ ] Hook in the first 2–4 lines?
- [ ] Paragraphs ≤ 4 lines, sentences mostly < 20 words?
- [ ] Consistent `আপনি` and consistent terminology?
- [ ] Every jargon term defined on first use?

**Visuals & links**

- [ ] At least 2 annotated charts with captions?
- [ ] Every key term linked on first mention, internal first?
- [ ] No duplicate links, no links in headings?
- [ ] All unknown links marked `LINK_NEEDED`?

**Output**

- [ ] Valid frontmatter with all required fields?
- [ ] Disclaimer at the end with exact text?
- [ ] Delivery note lists sources, `LINK_NEEDED` items, and chart placeholders?
- [ ] Chapter has `00-overview.mdx`, lesson prefixes are unique and gapless, `npm run curriculum` was run, and the overview's reading-order table matches the files?
- [ ] Every internal link exists in `docs/CURRICULUM.md`?

If any item is NO → fix it before delivering.
