export type Candle = { o: number; h: number; l: number; c: number };
export type Signal = "bullish" | "bearish" | "neutral";

export type Pattern = {
  slug: string;
  name: string;
  signal: Signal;
  size: "Single candle" | "Two candles" | "Three candles";
  summary: string;
  formation: string;
  reading: string;
  context: string;
  caution: string;
  candles: Candle[]; // drawn on a 0-100 scale, higher number = higher price
};

export const patterns: Pattern[] = [
  {
    slug: "doji", name: "Doji", signal: "neutral", size: "Single candle",
    summary: "Open and close are almost equal, which signals indecision.",
    formation: "The candle opens and closes at nearly the same price, leaving a very small body with wicks above and below.",
    reading: "Buyers and sellers pushed price in both directions and neither won the period.",
    context: "More meaningful after a strong move or at a key level than in the middle of a range.",
    caution: "A doji alone gives no direction. Wait for the next candle to show which side takes over.",
    candles: [{ o: 50, h: 80, l: 20, c: 51 }],
  },
  {
    slug: "hammer", name: "Hammer", signal: "bullish", size: "Single candle",
    summary: "A small body near the top and a long lower wick after a decline.",
    formation: "A small body in the upper part of the range with a lower wick at least about twice the body.",
    reading: "Sellers pushed price down, but buyers drove it back up before the close.",
    context: "After a decline, especially at a support level.",
    caution: "A short wick or a weak close makes it less reliable. Many traders wait for the next candle to close above the hammer's high.",
    candles: [{ o: 58, h: 64, l: 20, c: 62 }],
  },
  {
    slug: "hanging-man", name: "Hanging man", signal: "bearish", size: "Single candle",
    summary: "The hammer's shape, but appearing after an advance.",
    formation: "A small body near the top of the range with a long lower wick, found at the end of an uptrend.",
    reading: "The long wick shows sellers were active, even though buyers pushed price back up.",
    context: "After an advance, near resistance.",
    caution: "The shape alone is not enough. A bearish candle that follows is the usual confirmation.",
    candles: [{ o: 62, h: 66, l: 22, c: 58 }],
  },
  {
    slug: "shooting-star", name: "Shooting star", signal: "bearish", size: "Single candle",
    summary: "A small body near the bottom and a long upper wick after an advance.",
    formation: "A small body in the lower part of the range with an upper wick at least about twice the body.",
    reading: "Buyers pushed price up, but sellers drove it back down before the close.",
    context: "After an advance, at a resistance level.",
    caution: "Without a clear level behind it, a shooting star is just a candle with a long wick.",
    candles: [{ o: 42, h: 82, l: 36, c: 38 }],
  },
  {
    slug: "bullish-engulfing", name: "Bullish engulfing", signal: "bullish", size: "Two candles",
    summary: "A bullish body that completely covers the previous bearish body.",
    formation: "A bearish candle is followed by a bullish candle whose body is larger and covers the first body.",
    reading: "Buyers took control and erased the previous candle's move.",
    context: "After a decline, at support.",
    caution: "A very large engulfing candle puts the stop far away. Check that the risk still fits your plan.",
    candles: [{ o: 62, h: 64, l: 46, c: 48 }, { o: 44, h: 68, l: 42, c: 66 }],
  },
  {
    slug: "bearish-engulfing", name: "Bearish engulfing", signal: "bearish", size: "Two candles",
    summary: "A bearish body that completely covers the previous bullish body.",
    formation: "A bullish candle is followed by a bearish candle whose body is larger and covers the first body.",
    reading: "Sellers took control and erased the previous candle's move.",
    context: "After an advance, at resistance.",
    caution: "Like all patterns, it fails often when it appears with no level or trend behind it.",
    candles: [{ o: 46, h: 64, l: 44, c: 62 }, { o: 66, h: 68, l: 40, c: 42 }],
  },
  {
    slug: "piercing-line", name: "Piercing line", signal: "bullish", size: "Two candles",
    summary: "A bullish candle that closes above the midpoint of the previous bearish body.",
    formation: "A bearish candle is followed by a bullish candle that opens lower and closes above the midpoint of the first body, without covering it.",
    reading: "Buyers recovered more than half of the previous candle's decline.",
    context: "After a decline, at support.",
    caution: "Weaker than a full engulfing candle. Look for more evidence.",
    candles: [{ o: 70, h: 72, l: 50, c: 52 }, { o: 46, h: 66, l: 44, c: 64 }],
  },
  {
    slug: "dark-cloud-cover", name: "Dark cloud cover", signal: "bearish", size: "Two candles",
    summary: "A bearish candle that closes below the midpoint of the previous bullish body.",
    formation: "A bullish candle is followed by a bearish candle that opens higher and closes below the midpoint of the first body, without covering it.",
    reading: "Sellers took back more than half of the previous candle's advance.",
    context: "After an advance, at resistance.",
    caution: "Weaker than a full engulfing candle. Look for more evidence.",
    candles: [{ o: 50, h: 70, l: 48, c: 68 }, { o: 74, h: 76, l: 54, c: 56 }],
  },
  {
    slug: "bullish-harami", name: "Bullish harami", signal: "bullish", size: "Two candles",
    summary: "A small candle held inside the body of a large bearish candle.",
    formation: "A large bearish candle is followed by a small candle whose body sits inside the first body.",
    reading: "Selling momentum slowed. It is a pause, not yet a reversal.",
    context: "After a decline, at support.",
    caution: "One of the weaker patterns. It needs a bullish candle after it to mean much.",
    candles: [{ o: 72, h: 74, l: 48, c: 50 }, { o: 56, h: 62, l: 52, c: 60 }],
  },
  {
    slug: "bearish-harami", name: "Bearish harami", signal: "bearish", size: "Two candles",
    summary: "A small candle held inside the body of a large bullish candle.",
    formation: "A large bullish candle is followed by a small candle whose body sits inside the first body.",
    reading: "Buying momentum slowed. It is a pause, not yet a reversal.",
    context: "After an advance, at resistance.",
    caution: "One of the weaker patterns. It needs a bearish candle after it to mean much.",
    candles: [{ o: 48, h: 72, l: 46, c: 70 }, { o: 64, h: 68, l: 58, c: 60 }],
  },
  {
    slug: "morning-star", name: "Morning star", signal: "bullish", size: "Three candles",
    summary: "A bearish candle, a small candle, then a strong bullish candle.",
    formation: "A long bearish candle, then a small-bodied candle that sits below it, then a long bullish candle that closes well into the first body.",
    reading: "Selling faded in the middle candle, and buyers took over on the third.",
    context: "After a decline, at support.",
    caution: "The third candle's close is the confirmation, so the entry comes late and the stop can be wide.",
    candles: [{ o: 72, h: 74, l: 48, c: 50 }, { o: 44, h: 47, l: 40, c: 42 }, { o: 48, h: 72, l: 46, c: 70 }],
  },
  {
    slug: "evening-star", name: "Evening star", signal: "bearish", size: "Three candles",
    summary: "A bullish candle, a small candle, then a strong bearish candle.",
    formation: "A long bullish candle, then a small-bodied candle that sits above it, then a long bearish candle that closes well into the first body.",
    reading: "Buying faded in the middle candle, and sellers took over on the third.",
    context: "After an advance, at resistance.",
    caution: "The third candle's close is the confirmation, so the entry comes late and the stop can be wide.",
    candles: [{ o: 42, h: 68, l: 40, c: 66 }, { o: 70, h: 74, l: 67, c: 72 }, { o: 68, h: 70, l: 42, c: 44 }],
  },
];

export function getPattern(slug: string) {
  return patterns.find((p) => p.slug === slug);
}
