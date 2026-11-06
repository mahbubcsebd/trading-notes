import type { Metadata } from "next";
import Link from "next/link";
import { RiskCalculator } from "@/components/RiskCalculator";

export const metadata: Metadata = {
  title: "Risk Calculator",
  description: "Work out a position size from your account balance, the percentage you risk and your stop loss. Gold and major pairs.",
};

export default function RiskPage() {
  return (
    <div className="wrap py-12 md:py-16">
      <div className="mb-10 max-w-2xl">
        <div className="eyebrow">Toolkit</div>
        <h1 className="mt-3 text-[clamp(40px,6vw,64px)] leading-[1.05] tracking-tight">Risk calculator</h1>
        <p className="mt-4 text-[19px] leading-relaxed text-fg2">
          Decide how much you are willing to lose, set the stop, and get the lot size that matches. Size is calculated from risk, never the other way round.
        </p>
      </div>
      <RiskCalculator />
      <div className="mt-12 grid max-w-3xl gap-4 text-[17px] leading-relaxed text-fg2">
        <h2 className="text-[28px] text-fg">How it works</h2>
        <p>
          Amount at risk = balance × risk percent. Lot size = amount at risk ÷ (stop distance × value of one unit of distance per lot). A wider stop gives a smaller lot size, so the dollar risk stays the same.
        </p>
        <p>
          For more on the reasoning, read the <Link href="/learn/risk-management" className="link">Risk Management chapter</Link>.
        </p>
      </div>
    </div>
  );
}
