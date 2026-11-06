# Design

Tokens live in app/globals.css (Tailwind v4 @theme, CSS vars; light + dark).

## Tokens

- SOURCE OF TRUTH: the "TradeNotes" design (reference prototype in `tradenotes/`, excluded from tsconfig; delete when no longer needed). Flat navy/paper + gold, serif display headings, hairline borders, no glow/blur.
- Core tokens (globals.css, light `:root` / dark `.dark`): `--bg --bg-2 --surface --line --fg --fg-2 --mute --gold --gold-ink --up --down --warn` → Tailwind `bg-bg bg-bg2 bg-surface border-line text-fg text-fg2 text-mute text-gold text-up text-down text-warn`. shadcn aliases (`--background --card --border --primary(=gold) --muted-foreground(=fg-2)`...) are derived from these, so shadcn/fumadocs parts follow automatically. `--bull/--bear` = up/down.
- Direction: dark default = ink navy (#0c1120, surface #141c31, line #243049, text #efeadd, gold #d9b77e); light = cool paper (#f4f6fa, white surfaces, text #121a2e, gold #8a6a2f). Gold = signal + primary CTA (`.btn-gold`), never large decorative fills except the one hero tile (pattern library card).
- Fonts (next/font in app/[lang]/layout.tsx): `font-sans` = Hanken Grotesk + Hind Siliguri (Bangla); `font-display`/h1-h3 = Fraunces (weight 400, tight tracking, italic gold accent word in hero); `font-mono` = JetBrains Mono.
- Component classes (globals.css): `.wrap` (max 88rem container), `.sec` (hairline-top section, 4.5rem pad), `.btn/.btn-gold/.btn-sm`, `.chip` (pill control; `aria-pressed=true` = gold fill), `.pill/.pill-up/.pill-down/.pill-gold`, `.card`, `.link`, `.input`, `.eyebrow` (gold mono caps), `.md` (note markdown), SVG helpers `.g-line .g-txt .c-up .c-dn .ma .lvl-line`. Also `.bg-dots`, `.shadow-soft`, `.hero-candle/.hero-ping`.
- Shapes: pills (rounded-full) for buttons/chips/nav controls; `rounded-xl` (stat tiles), `rounded-2xl` (cards, hero chart), 20px for the gold pattern tile.
- Radius: --radius scale (sm .6x, md .8x, lg 1x, xl 1.4x, 2xl 1.8x)

- Lesson prose follows tradenotes colors (fg headings, gold links, gold table th, surface KeyTakeaways); role tokens `--link --keynote --title --table --chart --placeholder` still defined but unused in `.lesson-prose` unless asked.

- Lesson body typography: NO @tailwindcss/typography (prose-* classes are inert). `.lesson-prose` in globals.css owns base styles via `:where()` (17px/1.75, h2 28px, h3 21px, gold list markers, blockquote, code, pre, hr); `.not-prose` subtrees opt out. Headings never use font-bold (Fraunces 400). Bangla uses the same Hanken→Hind font stack (no `p:lang(bn)` font override).

## Layout

Learn flow (matches tradenotes/ prototype): home = hero → ContinueStrip → "Pick the level" (3 stages) → "Start with these" (4 lessons) → Toolkit → Workspace → About → FAQ. `/{lang}/learn` = curriculum index (PageHeader + components/learn/ContinueStrip + CurriculumIndex stage chips/search; data from lib/learn-index.ts). Chapter page = `00-overview` rendered by ChapterHero. Lesson page = breadcrumb Learn / Chapter NN / title, `.wrap` grid [1fr|220px] from lg, article max 820px, header eyebrow "Lesson n of N · level" + h1 from frontmatter (MDX h1 hidden) + right TocSidebar (`sticky top-[88px]`), sticky components/learn/LessonBar (prev · mark complete · next; progress in localStorage `tradenotes:completed` via lib/use-progress.ts). No left chapter sidebar (LearnSidebar file now only supplies types). Header/Footer/MobileNav in components/layout; nav items in `components/layout/navItems.ts` (learn, patterns, charts, glossary, risk, notes, journal; footer adds about + disclaimer). Header = flat bar, gold "T" LogoMark tile, text nav with gold underline on active (desktop from xl, MobileNav below), controls (search / language / theme) are `.chip`s. Home: hero (Fraunces title with italic gold word, stats, HeroChart), curriculum = numbered index grouped in 3 stages (sticky stage label left), then components/home/HomeSections: Toolkit (gold pattern tile + cards), Workspace (latest notes + journal), AboutTeaser, Faq (`<details>`); copy for those in lib/home-copy.ts.

Index pages (patterns, charts, glossary, tools/risk-calculator, notes, journal, about, disclaimer): `components/layout/PageHeader` (gold mono eyebrow, display h1, 19px muted lead, hairline stat row; optional `JumpLinks` chips) then content in `.wrap`. Sections use the home "sticky label left + hairline index right" grid `[16rem | 1fr]`. Active chips/tabs = `.chip[aria-pressed]` gold fill; bias/outcome badges = bull/bear tokens, neutral otherwise. Glossary = dictionary index (big letter left, hairline `dl` rows, gold left rule on examples).

## Components

- components/mdx/: Callout, Checklist, KeyTakeaways, Figure, ArticleBlocks (Disclaimer, ExternalLink, ChartPlaceholder), CandleDiagram + DiagramRow (static token-colored SVG candle shapes: `candles=[{o,h,l,c,label?,note?,dim?}]`, `levels`, `verdict good|bad`; arbitrary units, auto-scaled; chart role top border)
- Pattern detail (`app/[lang]/patterns/[id]`): lesson-style shell (breadcrumb, eyebrow "Pattern NN · group", h1 from frontmatter, meta chips, `.lesson-prose` MDX, same-family pills, prev/next by patternsData order, TOC right). No MDX yet → PatternDetailBriefCard fallback.
- components/chart/CandleChart.tsx — lightweight-charts wrapper, data from content/charts JSON
  - Indicators (chart JSON, values precomputed, aligned to candles, null = undefined): `overlays: [{label,color?,style?,values}]` lines on price pane (MA/bands/VWAP); `pane: {title,series:[{label,kind:'line'|'histogram',values}],range?,levels?}` sub-pane under price (RSI/MACD/ATR/volume). Rendered by components/chart/IndicatorLayers.tsx; types in lib/chart-types.ts.
- components/ui/ — shadcn primitives (base-nova / base-ui; dropdown-menu.jsx: pass `inset={undefined}` from TSX — untyped jsx makes it required)
- Site search: components/SearchButton (header pill, icon-only < sm; ⌘K/Ctrl+K and `/`) opens components/search/SearchDialog (base-ui Dialog, top-anchored, combobox + listbox, ↑↓/↵/esc). Result = mono section label + title, hits indented under hairline left rule; active row = accent bg + gold left bar; matches underlined gold. fumadocs search disabled in RootProvider.
- LanguageSwitcher: shadcn DropdownMenu radio group (mono code chip + native/English name, gold = active only), swaps leading /{lang} segment, keeps search+hash, pending spinner via useTransition.

## Patterns

Bull = green, bear = red, gold = highlight. Support dark mode via next-themes. Keep Bangla text legible (line-height generous).

- Chart/SVG components (CandleChart overlays, ChartThumbnail, DynamicCandleSvg, CandleAnatomyInteractive) use `var(--up|--down|--gold|--mute|--link)` instead of hex; canvas (lightweight-charts) keeps resolved colors. Dev-only /studio and /tags use PageHeader + hairline numbered list. No glow/blur/shadow-xl on surfaces; headings are Fraunces 400 (no font-bold).

## Don'ts

No default template look; no uniform card grids; don't hardcode colors, use tokens.
