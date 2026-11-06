import Link from "next/link";
import { getNoteMetas } from "@/lib/notes";
import { HeroChart } from "@/components/HeroChart";
import { ContinueStrip } from "@/components/ContinueStrip";
import { CandleSvg } from "@/components/CandleSvg";
import { T } from "@/components/LangProvider";
import { chapters, getLesson, groups, lessonHref, pad, totalLessons } from "@/lib/curriculum";
import { patterns } from "@/lib/patterns";

const arrow = (
  <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
    <path d="M2 7h10M8 3l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const featured = [
  getLesson("foundations", "what-is-forex"),
  getLesson("market-structure", "break-of-structure"),
  getLesson("risk-management", "position-sizing"),
  getLesson("gold-xauusd", "what-moves-gold"),
].filter((x): x is NonNullable<typeof x> => Boolean(x));

const faqs = [
  { q: "Is this financial advice?", a: "No. These are educational notes. Trading involves a significant risk of loss, and past performance does not indicate future results." },
  { q: "Do I need any experience?", a: "No. Chapters 01 to 05 start from how the market works and build up to reading structure and key levels." },
  { q: "Are the charts real?", a: "The charts on this site are synthetic examples, marked as such, built to show an idea. They are not recommendations." },
  { q: "Which languages are available?", a: "English and Bengali. Use the language switch in the header. The glossary shows both languages side by side." },
];

export default function Home() {
  const lessonsByGroup = (id: string) =>
    chapters.filter((c) => c.group === id).reduce((s, c) => s + c.lessons.length, 0);
  const countByGroup = (id: string) => chapters.filter((c) => c.group === id).length;

  return (
    <>
      <section className="wrap grid items-center gap-9 py-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] md:gap-14 md:py-[72px]">
        <div>
          <div className="eyebrow">XAUUSD · EURUSD · Forex</div>
          <h1 className="my-[18px] mb-[22px] text-[clamp(56px,9vw,104px)] leading-[0.95] tracking-[-0.03em]">
            Trade<em className="italic text-gold">Notes</em>
          </h1>
          <p className="max-w-[30em] text-[19px] leading-relaxed text-fg2">
            <T k="hero.tagline" />
          </p>
          <div className="mt-7 flex flex-wrap gap-2.5">
            <Link href="/learn" className="btn btn-gold">
              <T k="hero.start" />
              {arrow}
            </Link>
            <Link href="/risk-calculator" className="btn">
              <T k="hero.risk" />
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap gap-9 border-t border-line pt-[22px]">
            {[
              [String(chapters.length), "stat.chapters"],
              [String(totalLessons), "stat.lessons"],
              ["2", "stat.languages"],
            ].map(([n, k]) => (
              <div key={k}>
                <span className="block font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-mute">
                  <T k={k as "stat.chapters"} />
                </span>
                <b className="mt-1.5 block font-display text-[34px] font-normal leading-tight tabular-nums">{n}</b>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-line bg-surface px-3.5 pb-2.5 pt-3.5">
          <div className="flex flex-wrap justify-between gap-3 px-1 pb-2.5 font-mono text-[11px] font-medium text-mute">
            <b className="font-medium text-gold">XAUUSD · H1</b>
            <span>Illustrative · synthetic data</span>
          </div>
          <HeroChart />
          <div className="px-1 pb-0.5 pt-2 font-mono text-[11px] text-mute">Structured notes · Chart examples · Bengali and English</div>
        </div>
      </section>

      <div className="wrap pb-6">
        <ContinueStrip />
      </div>

      <section className="sec">
        <div className="wrap">
          <div className="mb-8">
            <div className="eyebrow"><T k="sec.start" /></div>
            <h2 className="mt-2.5 text-[clamp(30px,4.4vw,44px)] leading-[1.1]">Pick the level that fits you</h2>
          </div>
          <div className="grid gap-10 md:grid-cols-3">
            {groups.map((g) => (
              <div key={g.id} className="border-t border-fg2 pt-5">
                <span className="eyebrow block">
                  {g.id === "foundations" ? "Beginner" : g.id === "strategy" ? "Intermediate" : "Advanced"} · Chapters {g.range.replace(" – ", "–")}
                </span>
                <h3 className="mb-2.5 mt-3 text-[28px]">{g.label}</h3>
                <p className="max-w-[26em] text-[15px] text-fg2">{g.blurb}</p>
                <div className="mt-[18px] flex gap-3.5 font-mono text-xs tabular-nums text-mute">
                  <span>{lessonsByGroup(g.id)} lessons</span>
                  <span>{countByGroup(g.id)} chapters</span>
                </div>
                <Link href={`/learn?group=${g.id}`} className="mt-[18px] inline-flex items-center gap-2 text-sm font-medium text-gold hover:underline hover:underline-offset-4">
                  Open {g.label.toLowerCase()} {arrow}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="eyebrow">Start with these</div>
              <h2 className="mt-2.5 text-[clamp(30px,4.4vw,44px)] leading-[1.1]"><T k="sec.latest" /></h2>
            </div>
            <Link href="/learn" className="btn"><T k="common.viewAll" /></Link>
          </div>
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map(({ chapter, lesson }) => (
              <Link key={lesson.slug} href={lessonHref(chapter, lesson)} className="group flex flex-col gap-3 border-t border-line pt-[18px]">
                <span className="eyebrow">{chapter.title} · Ch {pad(chapter.n)}</span>
                <h3 className="text-[21px] leading-tight transition-colors group-hover:text-gold">{lesson.title}</h3>
                <p className="text-sm text-fg2">{lesson.summary}</p>
                <span className="mt-auto font-mono text-xs tabular-nums text-mute">{lesson.minutes} min · {lesson.level}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="mb-8">
            <div className="eyebrow"><T k="sec.toolkit" /></div>
            <h2 className="mt-2.5 text-[clamp(30px,4.4vw,44px)] leading-[1.1]">Reference and tools</h2>
          </div>
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
            <Link href="/patterns" className="flex min-h-[360px] flex-col gap-7 rounded-[20px] bg-gold p-6 text-gold-ink sm:p-8">
              <div>
                <div className="eyebrow !text-gold-ink opacity-75">Toolkit</div>
                <h3 className="mt-3 text-[clamp(32px,4.4vw,48px)] leading-[1.05]">Pattern library</h3>
                <p className="mt-2.5 max-w-[24em] text-[15px] opacity-85">Twelve candlestick patterns, each with a diagram, how it forms and where it fails.</p>
              </div>
              <div className="mt-auto grid grid-cols-4 gap-2" aria-hidden="true">
                {patterns.filter((p) => ["hammer", "bullish-engulfing", "doji", "shooting-star"].includes(p.slug)).map((p) => (
                  <div key={p.slug} className="text-center">
                    <CandleSvg candles={p.candles} label={p.name} className="mx-auto h-auto w-full max-w-16" />
                    <span className="mt-1.5 block font-mono text-[11px] font-medium opacity-85">{p.name}</span>
                  </div>
                ))}
              </div>
              <span className="inline-flex items-center gap-2 text-sm font-medium">View all patterns {arrow}</span>
            </Link>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {[
                { href: "/charts", t: "Chart gallery", d: "Annotated example charts: structure, levels, patterns and liquidity." },
                { href: "/glossary", t: "Glossary", d: "Trading terms in English and Bengali." },
                { href: "/risk-calculator", t: "Risk calculator", d: "Position size from account risk, for gold and major pairs." },
              ].map((x) => (
                <Link key={x.href} href={x.href} className="card flex flex-col gap-2 transition-colors hover:border-mute">
                  <h3 className="text-[22px]">{x.t}</h3>
                  <p className="text-sm text-fg2">{x.d}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="mb-8">
            <div className="eyebrow">Your workspace</div>
            <h2 className="mt-2.5 text-[clamp(30px,4.4vw,44px)] leading-[1.1]">Notes and journal</h2>
          </div>
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
            <div className="card">
              <div className="mb-4 flex items-baseline justify-between">
                <h3 className="text-[22px]">Latest notes</h3>
                <Link href="/notes" className="link text-sm">All notes</Link>
              </div>
              <ul className="grid">
                {getNoteMetas().slice(0, 4).map((n) => (
                  <li key={n.slug} className="border-t border-line first:border-t-0">
                    <Link href={`/notes/${n.slug}`} className="group flex flex-wrap items-baseline justify-between gap-x-4 py-3">
                      <span className="font-medium transition-colors group-hover:text-gold">{n.title}</span>
                      <span className="font-mono text-xs text-mute">{n.tags.join(" · ")}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <Link href="/journal" className="card flex flex-col gap-2 transition-colors hover:border-mute">
              <div className="eyebrow">Trade journal</div>
              <h3 className="text-[22px]">Log trades, measure in R</h3>
              <p className="text-sm text-fg2">Checklist, win rate, drawdown, equity curve and plan discipline. Stored in your browser, exportable any time.</p>
              <span className="mt-auto inline-flex items-center gap-2 pt-4 text-sm font-medium text-gold">Open journal {arrow}</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap grid items-start gap-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] md:gap-14">
          <div>
            <div className="eyebrow">About</div>
            <h2 className="mt-2.5 text-[clamp(30px,4.4vw,44px)] leading-[1.1]">Notes from someone still learning</h2>
          </div>
          <div className="text-lg leading-[1.65] text-fg2">
            <p className="max-w-[34em]">TradeNotes is the journal I wish I had when I started: short lessons, chart examples, and the mistakes written down next to the rules.</p>
            <p className="mt-4 max-w-[34em]">
              It covers Forex and Gold, in English and Bengali. Nothing here is a signal or a recommendation.{" "}
              <Link href="/about" className="link">Read more</Link>
            </p>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="mb-8">
            <div className="eyebrow">FAQ</div>
            <h2 className="mt-2.5 text-[clamp(30px,4.4vw,44px)] leading-[1.1]"><T k="sec.faq" /></h2>
          </div>
          <div className="max-w-[820px]">
            {faqs.map((f, i) => (
              <details key={f.q} className={`group border-t border-line ${i === faqs.length - 1 ? "border-b" : ""}`}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-1 py-5 text-lg font-medium [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span className="font-mono text-[22px] leading-none text-gold group-open:hidden">+</span>
                  <span className="hidden font-mono text-[22px] leading-none text-gold group-open:inline">−</span>
                </summary>
                <p className="max-w-[42em] px-1 pb-[22px] text-fg2">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
