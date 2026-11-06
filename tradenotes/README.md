# TradeNotes

Forex and Gold learning journal. Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS 4.

## Run

```
npm install
npm run dev            # http://localhost:3000
npm run build && npm start
```

Keep it running with PM2: `pm2 start ecosystem.config.cjs`.

## Pages

/ home, /learn, /learn/[chapter], /learn/[chapter]/[lesson], /patterns, /patterns/[slug], /charts, /glossary, /risk-calculator, /notes, /notes/[slug], /journal, /about, /disclaimer

## Editing content

- Curriculum (18 chapters, 104 lessons): `lib/curriculum.ts`
- Full lesson text and quiz: `lib/lesson-bodies.ts`, keyed `<chapter 2 digits>-<lesson-slug>` (e.g. `01-what-is-forex`). Chapter 1 is fully written and is the format reference. Lessons without a body show summary and takeaways only.
- Notes: markdown files in `content/notes/` (see /notes page for the format)
- Journal: dropdowns and checklist at the top of `lib/journal.ts`
- Porting into another project: see PORTING.md
- Glossary: `lib/glossary.ts`; candlestick patterns: `lib/patterns.ts`; chart examples: `lib/charts.ts`; calculator instruments: `lib/risk.ts`
- Colors and fonts: CSS variables in `app/globals.css` (dark default, light theme toggle). Fonts are bundled via @fontsource, so no network needed.

Progress, theme and language are stored in the browser (localStorage). Charts use synthetic, illustrative data.
