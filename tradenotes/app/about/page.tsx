import type { Metadata } from "next";
import Link from "next/link";
import { chapters, totalLessons } from "@/lib/curriculum";

export const metadata: Metadata = {
  title: "About",
  description: "What TradeNotes is, who it is for and how it is written.",
};

export default function AboutPage() {
  return (
    <div className="wrap py-12 md:py-16">
      <div className="max-w-[720px]">
        <div className="eyebrow">About</div>
        <h1 className="mt-3 text-[clamp(40px,6vw,64px)] leading-[1.05] tracking-tight">Notes from someone still learning</h1>
        <div className="mt-8 grid gap-5 text-[19px] leading-[1.7] text-fg2">
          <p>
            TradeNotes is a personal learning journal for Forex and Gold trading. It started as private notes and became a structured set of {chapters.length} chapters and {totalLessons} lessons, written in English and Bengali.
          </p>
          <p>
            The aim is to explain one idea at a time, show it on a chart, and write down where it goes wrong. The rules come with the mistakes next to them, because that is what a beginner needs most.
          </p>
          <h2 className="mt-6 text-[28px] text-fg">What you will find here</h2>
          <ul className="grid list-disc gap-2.5 pl-5 marker:text-gold">
            <li>A <Link href="/learn" className="link">curriculum</Link> that runs from market basics to building your own system.</li>
            <li>A <Link href="/patterns" className="link">candlestick pattern library</Link> and annotated <Link href="/charts" className="link">example charts</Link>.</li>
            <li>A bilingual <Link href="/glossary" className="link">glossary</Link>.</li>
            <li>A <Link href="/risk-calculator" className="link">risk calculator</Link> for position sizing.</li>
          </ul>
          <h2 className="mt-6 text-[28px] text-fg">What this is not</h2>
          <p>
            It is not a signal service, and nothing here tells you what to buy or sell. Read the <Link href="/disclaimer" className="link">disclaimer</Link> before you trade real money.
          </p>
        </div>
      </div>
    </div>
  );
}
