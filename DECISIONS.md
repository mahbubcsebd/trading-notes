# DECISIONS.md — TradeNotes

This file logs every non-obvious decision made during development.

---

## D-001: App directory location
**Decision:** Keep `app/` at the project root (not `src/app/`).
**Reason:** `create-next-app` scaffolded without `src/`. The spec allows `src/` as optional. Moving it would require changing all imports. Simpler to stay at root and adjust the spec's folder diagram mentally.

## D-002: JavaScript instead of TypeScript (initial scaffolding)
**Decision:** Starting in JavaScript (as scaffolded). Will add TypeScript incrementally by renaming `.js` → `.tsx`/`.ts` and adding `tsconfig.json`.
**Reason:** `create-next-app` was run without `--typescript` flag. Spec requires strict TypeScript. Converting file-by-file is safer than a bulk rename.

## D-003: Fumadocs MDX as content engine
**Decision:** Using `fumadocs-mdx` + `fumadocs-core` + `fumadocs-ui` for the content pipeline.
**Reason:** Explicitly required by spec Section 2. Provides sidebar ordering via `meta.json`, TOC, prev/next, and search out of the box.

## D-004: next-themes for dark/light mode
**Decision:** Using `next-themes` with a `ThemeProvider` wrapper.
**Reason:** Spec Section 3 explicitly requires `next-themes`.

## D-005: Font choices mapped to next/font/google
**Decision:** `Inter` (Latin UI), `Hind_Siliguri` + `Noto_Sans_Bengali` (Bengali), `JetBrains_Mono` (mono).
**Reason:** Spec Section 3 explicitly names these fonts.

## D-006: content/ at project root
**Decision:** `content/` directory is at the project root (same level as `app/`).
**Reason:** Fumadocs typically resolves content from root. Spec folder diagram shows `content/` at root level.

## D-007: lucide-react already listed in package.json
**Decision:** lucide-react was already a dependency (v1.55.0). Re-installed to ensure latest compatible version.
**Reason:** No change needed; kept existing version.

## D-008: CSS variable naming convention
**Decision:** Added custom CSS variables `--bull`, `--bear`, `--gold`, `--bg`, `--panel`, `--border-custom`, `--muted-custom` alongside shadcn variables.
**Reason:** shadcn already uses `--border` and `--muted`, so custom trading-specific names avoid conflicts.
