import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CandleSvg } from "@/components/CandleSvg";
import { getPattern, patterns } from "@/lib/patterns";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return patterns.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getPattern(slug);
  return p ? { title: p.name, description: p.summary } : {};
}

export default async function PatternPage({ params }: Props) {
  const { slug } = await params;
  const p = getPattern(slug);
  if (!p) notFound();
  const i = patterns.findIndex((x) => x.slug === slug);
  const prev = patterns[(i - 1 + patterns.length) % patterns.length];
  const next = patterns[(i + 1) % patterns.length];
  const pill = p.signal === "bullish" ? "pill-up" : p.signal === "bearish" ? "pill-down" : "pill-gold";

  const rows: [string, string][] = [
    ["How it forms", p.formation],
    ["How to read it", p.reading],
    ["Where it matters", p.context],
    ["Where it fails", p.caution],
  ];

  return (
    <div className="wrap py-10 md:py-14">
      <nav aria-label="Breadcrumb" className="flex flex-wrap gap-2 font-mono text-xs text-mute">
        <Link href="/patterns" className="hover:text-fg">Candlestick patterns</Link>
        <span>/</span>
        <span>{p.name}</span>
      </nav>
      <div className="mt-8 grid items-start gap-10 md:grid-cols-[minmax(0,1fr)_340px] md:gap-14">
        <div className="max-w-[680px]">
          <div className="flex flex-wrap gap-2.5">
            <span className={`pill ${pill}`}>{p.signal}</span>
            <span className="pill">{p.size}</span>
          </div>
          <h1 className="mt-4 text-[clamp(38px,6vw,60px)] leading-[1.05] tracking-tight">{p.name}</h1>
          <p className="mt-3.5 text-lg leading-relaxed text-fg2">{p.summary}</p>
          <dl className="mt-10 border-t border-line">
            {rows.map(([k, v]) => (
              <div key={k} className="grid gap-1 border-b border-line py-5 sm:grid-cols-[150px_minmax(0,1fr)] sm:gap-6">
                <dt className="eyebrow pt-1">{k}</dt>
                <dd className="m-0 text-[17px] leading-relaxed">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-sm text-mute">
            Educational example, not a signal. Patterns fail often, so decide the stop and the size before any trade. See{" "}
            <Link href="/learn/candlesticks" className="link">the Candlesticks chapter</Link> for context.
          </p>
        </div>
        <div className="card md:sticky md:top-[calc(env(safe-area-inset-top,0px)+88px)]">
          <div className="grid h-64 place-items-center rounded-xl bg-bg2">
            <CandleSvg candles={p.candles} label={`${p.name} diagram`} className="h-52 w-auto" />
          </div>
          <p className="mt-3 font-mono text-[11px] text-mute">Illustrative diagram. Green candles close higher, red close lower.</p>
        </div>
      </div>
      <div className="mt-14 flex justify-between gap-4 border-t border-line pt-6 text-sm">
        <Link href={`/patterns/${prev.slug}`} className="group flex flex-col gap-0.5 text-fg2">
          <small className="font-mono text-[11px] uppercase tracking-wider text-mute">Previous</small>
          <span className="group-hover:text-gold">{prev.name}</span>
        </Link>
        <Link href={`/patterns/${next.slug}`} className="group flex flex-col items-end gap-0.5 text-fg2">
          <small className="font-mono text-[11px] uppercase tracking-wider text-mute">Next</small>
          <span className="group-hover:text-gold">{next.name}</span>
        </Link>
      </div>
    </div>
  );
}
