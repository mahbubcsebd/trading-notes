import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "TradeNotes is educational content only and is not financial advice.",
};

export default function DisclaimerPage() {
  return (
    <div className="wrap py-12 md:py-16">
      <div className="max-w-[720px]">
        <div className="eyebrow">Legal</div>
        <h1 className="mt-3 text-[clamp(40px,6vw,64px)] leading-[1.05] tracking-tight">Disclaimer</h1>
        <div className="mt-8 grid gap-5 text-[18px] leading-[1.7] text-fg2">
          <p>
            TradeNotes is educational content. Nothing on this site is financial, investment or trading advice, and nothing is a recommendation to buy or sell any instrument.
          </p>
          <p>
            Trading foreign exchange, gold and other leveraged products carries a high risk of loss. You can lose more than you expect, and leverage increases that risk. Only trade with money you can afford to lose.
          </p>
          <p>
            Past performance does not indicate future results. Charts on this site are synthetic examples made to illustrate an idea. They are not real market data and are not trade ideas.
          </p>
          <p>
            Figures, formulas and examples are simplified for learning. Contract sizes, margin rules, swaps and costs differ between brokers, so check the terms of yours. The author takes no responsibility for losses arising from the use of this material.
          </p>
          <p>
            If you are unsure whether trading is suitable for you, speak to a qualified, independent financial adviser in your country.
          </p>
        </div>
      </div>
    </div>
  );
}
