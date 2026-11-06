import type { Metadata } from "next";
import Link from "next/link";
import { CandleSvg } from "@/components/CandleSvg";
import { patterns, type Signal } from "@/lib/patterns";

export const metadata: Metadata = {
  title: "Candlestick Patterns",
  description: "Twelve candlestick patterns with diagrams, how each one forms, how to read it and where it fails.",
};

const sections: { signal: Signal; title: string; blurb: string }[] = [
  { signal: "bullish", title: "Bullish patterns", blurb: "Often read as buyers taking control after a decline." },
  { signal: "bearish", title: "Bearish patterns", blurb: "Often read as sellers taking control after an advance." },
  { signal: "neutral", title: "Indecision", blurb: "Neither side wins the period. The next candle matters." },
];

const pillFor = (s: Signal) => (s === "bullish" ? "pill-up" : s === "bearish" ? "pill-down" : "pill-gold");

export default function PatternsPage() {
  return (
    <div className="wrap py-12 md:py-16">
      <div className="mb-12 max-w-2xl">
        <div className="eyebrow">{patterns.length} patterns</div>
        <h1 className="mt-3 text-[clamp(40px,6vw,64px)] leading-[1.05] tracking-tight">Candlestick patterns</h1>
        <p className="mt-4 text-[19px] leading-relaxed text-fg2">
          Each pattern is a clue about who controlled a period, not a signal on its own. Read it together with the trend and the level it appears at.
        </p>
      </div>
      <div className="grid gap-14">
        {sections.map((s) => (
          <section key={s.signal} aria-labelledby={`h-${s.signal}`}>
            <div className="mb-5 flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <h2 id={`h-${s.signal}`} className="text-[30px]">{s.title}</h2>
              <p className="text-sm text-mute">{s.blurb}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {patterns
                .filter((p) => p.signal === s.signal)
                .map((p) => (
                  <Link key={p.slug} href={`/patterns/${p.slug}`} className="card group flex flex-col gap-4 transition-colors hover:border-mute">
                    <div className="grid h-28 place-items-center rounded-xl bg-bg2">
                      <CandleSvg candles={p.candles} label={`${p.name} diagram`} className="h-24 w-auto" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-[22px] transition-colors group-hover:text-gold">{p.name}</h3>
                        <span className={`pill ${pillFor(p.signal)}`}>{p.size}</span>
                      </div>
                      <p className="mt-1.5 text-sm text-fg2">{p.summary}</p>
                    </div>
                  </Link>
                ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
