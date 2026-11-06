# Trading Knowledge

Bilingual (en/bn) trading course + candlestick pattern library. /learn = chapter-by-chapter lessons beginner→pro.

## Stack

Next.js 16.4 (App Router), React 19.3, TS, Tailwind v4, fumadocs (core/mdx/ui), lightweight-charts, shadcn/base-ui, zod, zustand, npm.

## Commands

- dev: npm run dev
- build: npm run build
- typecheck: npm run typecheck
- lint: npx eslint <files>
- test (one file): npm run test -- <path>
- new lesson: npm run new:lesson
- curriculum: npm run curriculum (syncs chapter meta.json + docs/CURRICULUM.md; run after any lesson add/rename/delete)

## Structure

- app/[lang]/ — routes (learn, patterns), i18n via lib/i18n.ts
- content/learn/NN-module/ — lesson MDX; content/patterns/ — pattern MDX (.en/.bn); content/charts/ — chart JSON
- components/mdx/ — MDX blocks (Callout, Figure, ArticleBlocks...); components/chart/ — CandleChart
- docs/CURRICULUM.md — generated chapter/lesson map + URLs (link source of truth)
- Each chapter starts with 00-overview.mdx (not a lesson); lesson prefixes unique + gapless
- lib/search/ — own search engine (Unicode tokenizer for Bangla, prefix inverted index, per-lang index of learn + patterns + glossary); API `GET /api/search?q=&lang=` → `{results}`
- lib/learn-modules.ts — module order/definitions (sidebar sorts by filename + this)
- Notes: content/notes/<slug>.md (+ optional <slug>.bn.md; missing bn falls back to en) → lib/notes.ts (marked), routes app/[lang]/notes. Journal: lib/journal/{core,store,copy}.ts + components/journal (browser localStorage, trades can link a note via noteSlug; empty storage = demo trades shown, first real trade replaces them). Also app/[lang]/{about,disclaimer}; copy in lib/{site,notes,home}-copy.ts, journal/copy.ts
- tradenotes/ = reference design prototype (excluded from tsconfig); the app follows its design, see docs/DESIGN.md
- SEO: locale in URL (/bn, /en). Every page's generateMetadata uses `pageMetadata({lang, path, title, description})` from lib/seo.ts (canonical + hreflang + x-default + OG); title without "| TradeNotes" (layout template adds it). app/sitemap.ts + app/robots.ts; env NEXT_PUBLIC_SITE_URL (absolute URLs), NEXT_PUBLIC_INDEXABLE=true to allow indexing

## Conventions

- Lesson rules: ARTICLE_WRITING_RULES.md (16-section template, frontmatter per source.config.ts)
- Pattern pages: docs/PATTERN_ARTICLE_PLAN.md (18-section field-guide template, charts `{id}-win-01`/`{id}-fail-01`, no win-rate stats). Chart generator: scripts/chartgen/patgen.py + p_{id}.py (`PYTHONIOENCODING=utf8 python p_hammer.py`; asserts OHLC + trade outcome). Check: `node scripts/chartgen/mdxcheck.mjs <mdx files>` (compile, links, chart ids, duplicate links)
- No numbered list inside <details> (Prettier breaks MDX)
- Charts: synthetic vs real must be labelled honestly
- Ch19 `19-smc-ict` = SMC/ICT deep-dive (overview + 8 lessons, BN+EN); charts via scripts/chartgen/smc_series.py (`smc-*` ids, H1 synthetic). Ch16 `06-smc-ict` stays the overview-level lesson
- Read node_modules/next/dist/docs before using unsure Next APIs

@AGENTS.md
@docs/DESIGN.md

<!-- claude-kit:setup v1 -->
