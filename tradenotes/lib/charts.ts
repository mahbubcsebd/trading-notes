/* Annotated example charts. The candles are generated from the waypoints below, so every chart is synthetic. */
export type Level = { price: number; label: string };
export type Mark = { i: number; price: number; label: string };
export type Zone = { from: number; to: number; low: number; high: number; label: string };

export type ChartExample = {
  slug: string;
  title: string;
  tags: string[];
  blurb: string;
  notice: string[];
  seed: number;
  waypoints: [number, number][];
  levels?: Level[];
  marks?: Mark[];
  zone?: Zone;
};

export const chartExamples: ChartExample[] = [
  {
    slug: "break-of-structure",
    title: "Break of structure",
    tags: ["Structure", "Trend"],
    blurb: "An uptrend builds higher highs and higher lows until a close breaks the last higher low.",
    notice: [
      "Each swing low sits above the one before it while the trend holds.",
      "The close below the last higher low is the break.",
      "The break is information, not an entry signal on its own.",
    ],
    seed: 21,
    waypoints: [[0, 100], [8, 112], [14, 106], [24, 126], [30, 117], [40, 140], [46, 130], [52, 118], [59, 106]],
    levels: [{ price: 130, label: "Last higher low" }],
    marks: [
      { i: 24, price: 127, label: "HH" },
      { i: 30, price: 116, label: "HL" },
      { i: 40, price: 141, label: "HH" },
      { i: 46, price: 129, label: "HL" },
      { i: 52, price: 128, label: "Break" },
    ],
  },
  {
    slug: "role-reversal",
    title: "Resistance becomes support",
    tags: ["Levels", "Retest"],
    blurb: "Price is rejected at a level twice, breaks above it, then returns to test it from above.",
    notice: [
      "The level was tested from below before it broke.",
      "After the break, price comes back to the same area.",
      "The retest holding is a reason to look for a trade, not a guarantee.",
    ],
    seed: 5,
    waypoints: [[0, 92], [9, 104], [17, 110], [22, 103], [28, 110], [34, 124], [40, 118], [45, 111], [52, 122], [59, 132]],
    levels: [{ price: 110, label: "Resistance, then support" }],
    marks: [{ i: 45, price: 107, label: "Retest" }],
  },
  {
    slug: "double-top",
    title: "Double top",
    tags: ["Reversal", "Pattern"],
    blurb: "Two highs at about the same price, followed by a break of the low between them.",
    notice: [
      "The second high stalls at the level of the first.",
      "The neckline is the low between the two highs.",
      "The trigger is the break below the neckline, not the shape.",
    ],
    seed: 9,
    waypoints: [[0, 100], [12, 118], [20, 108], [32, 118], [38, 108], [44, 99], [59, 88]],
    levels: [{ price: 118, label: "Highs" }, { price: 108, label: "Neckline" }],
    marks: [{ i: 12, price: 121, label: "Top 1" }, { i: 32, price: 121, label: "Top 2" }],
  },
  {
    slug: "bull-flag",
    title: "Bull flag",
    tags: ["Continuation", "Pattern"],
    blurb: "A strong move up, a shallow pause that drifts down, then a break in the direction of the trend.",
    notice: [
      "The pole is a sharp move; the flag is a small, orderly pullback.",
      "A stop below the flag limits the risk.",
      "Flags can fail, so the stop matters more than the pattern.",
    ],
    seed: 14,
    waypoints: [[0, 100], [14, 128], [18, 124], [22, 125], [26, 120], [30, 121], [34, 117], [42, 146], [59, 160]],
    zone: { from: 14, to: 35, low: 115, high: 129, label: "Flag" },
    marks: [{ i: 38, price: 127, label: "Breakout" }],
  },
  {
    slug: "liquidity-sweep",
    title: "Liquidity sweep",
    tags: ["Liquidity", "Advanced"],
    blurb: "Price pushes just above equal highs, collects the stops resting there, then reverses.",
    notice: [
      "Equal highs mark where stop orders are likely to sit.",
      "The spike above them is quick and does not hold.",
      "Structure turning down after the sweep is the confirmation to wait for.",
    ],
    seed: 33,
    waypoints: [[0, 100], [8, 110], [14, 104], [22, 110], [28, 104], [35, 113], [38, 106], [48, 96], [59, 90]],
    levels: [{ price: 110, label: "Equal highs" }],
    marks: [{ i: 35, price: 115, label: "Sweep" }],
  },
];
