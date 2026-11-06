import type { Metadata } from "next";
import { JournalApp } from "@/components/JournalApp";

export const metadata: Metadata = {
  title: "Journal",
  description: "Log trades, track R, win rate, drawdown and plan discipline.",
};

export default function JournalPage() {
  return (
    <div className="wrap py-12 md:py-16">
      <div className="mb-10 max-w-2xl">
        <div className="eyebrow">Trade journal</div>
        <h1 className="mt-3 text-[clamp(40px,6vw,64px)] leading-[1.05] tracking-tight">Journal</h1>
        <p className="mt-4 text-[19px] leading-relaxed text-fg2">
          Log each trade, tick the checklist, and let the numbers show what is working. Results are measured in R, so lot size does not matter. Data stays in this browser; export it any time.
        </p>
      </div>
      <JournalApp />
    </div>
  );
}
