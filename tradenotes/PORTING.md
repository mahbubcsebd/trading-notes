# Porting into your existing project

This demo is a skeleton. Each feature is isolated so you can copy it over and connect your own data.

## 1. Notes (markdown, tags, search)

Copy: `lib/notes.ts`, `components/NotesList.tsx`, `app/notes/**`, the `.md` block at the end of `app/globals.css`, `content/notes/`.
Install: `npm i marked@15`.

- Notes are files: `content/notes/<slug>.md` with frontmatter (`title`, `date`, `tags: [A, B]`, `summary`, `pinned`).
- Put images in `public/notes/` and use `![alt](/notes/shot.png)`.
- Search: `lib/search-index.ts` adds notes to the Ctrl+K palette.
- To move notes into a database or CMS, replace only the body of `readAll()` in `lib/notes.ts`. Keep the `Note` type and nothing else changes.
- Notes HTML is trusted (you write it). Sanitise it if other users can write notes.

## 2. Journal (trade log + stats)

Copy: `lib/journal.ts` (pure logic), `lib/journal-store.ts`, `components/JournalApp.tsx`, `TradeForm.tsx`, `EquityCurve.tsx`, `app/journal/page.tsx`.

- Stats, R maths, CSV and demo data live in `lib/journal.ts` and need no browser APIs, so you can reuse them in API routes.
- Storage is localStorage in `lib/journal-store.ts`. To make it permanent and multi-device, change `read`/`write` to call your API (e.g. `GET/PUT /api/trades`). The hook returns `trades, add, update, remove, replace`; the UI does not change.
- Edit the dropdowns (pairs, setups, sessions, emotions, mistakes) and the pre-trade checklist at the top of `lib/journal.ts`.

## 3. Learning content

Curriculum: `lib/curriculum.ts`. Lesson text and quizzes: `lib/lesson-bodies.ts`, keyed `<chapter 2 digits>-<slug>`. Chapter 1 is the full reference.

## Ideas to build next

- Link a journal trade to a note (`noteSlug` field) and show linked trades on the note page.
- Screenshot upload per trade (needs storage: S3, GCS or Supabase).
- Auth and per-user data (NextAuth/Clerk + a database).
- Tag pages `/notes/tag/[tag]`, notes RSS, spaced-repetition flashcards from glossary and quizzes.
- Economic calendar and session clock widget (needs an external data source).
- Backtest log with a separate table from live trades.
