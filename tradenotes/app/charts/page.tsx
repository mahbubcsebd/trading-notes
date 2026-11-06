import type { Metadata } from "next";
import { SyntheticChart } from "@/components/SyntheticChart";
import { chartExamples } from "@/lib/charts";

export const metadata: Metadata = {
  title: "Charts",
  description: "Annotated example charts: market structure, role reversal, double tops, flags and liquidity sweeps.",
};

export default function ChartsPage() {
  return (
    <div className="wrap py-12 md:py-16">
      <div className="mb-12 max-w-2xl">
        <div className="eyebrow">{chartExamples.length} examples</div>
        <h1 className="mt-3 text-[clamp(40px,6vw,64px)] leading-[1.05] tracking-tight">Chart gallery</h1>
        <p className="mt-4 text-[19px] leading-relaxed text-fg2">
          Annotated examples of the ideas in the lessons. Every chart is synthetic, drawn to make one idea easy to see, and none is a trade recommendation.
        </p>
      </div>
      <div className="grid gap-12">
        {chartExamples.map((c) => (
          <article key={c.slug} id={c.slug} className="grid scroll-mt-24 items-start gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-10">
            <div className="rounded-2xl border border-line bg-surface px-3.5 pb-3 pt-3.5">
              <div className="flex flex-wrap justify-between gap-3 px-1 pb-2.5 font-mono text-[11px] font-medium text-mute">
                <b className="font-medium text-gold">{c.title}</b>
                <span>Illustrative · synthetic data</span>
              </div>
              <SyntheticChart chart={c} />
            </div>
            <div>
              <div className="flex flex-wrap gap-2">
                {c.tags.map((t) => (
                  <span key={t} className="pill">{t}</span>
                ))}
              </div>
              <h2 className="mt-3.5 text-[32px] leading-tight">{c.title}</h2>
              <p className="mt-2.5 text-fg2">{c.blurb}</p>
              <h3 className="eyebrow mb-2.5 mt-6 !font-mono">What to notice</h3>
              <ul className="grid list-disc gap-2 pl-5 text-[15px] marker:text-gold">
                {c.notice.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
