/**
 * patternsData.ts
 *
 * Candlestick pattern library (28 patterns), ordered as a LEARNING SEQUENCE:
 *   1. Momentum & Indecision  (Marubozu, Spinning Top, Doji family)
 *   2. Rejection              (Hammer, Hanging Man, Inverted Hammer, Shooting Star)
 *   3. Two-Candle Reversals   (Engulfing, Piercing / Dark Cloud, Harami, Tweezer)
 *   4. Inside & Outside Bars  (price action range bars)
 *   5. Three-Candle Reversals (Stars, Soldiers / Crows, Three Inside)
 *   6. Continuation           (Rising / Falling Three Methods)
 *
 * New optional fields on every pattern: `group` and `level`, so the UI can group and badge them.
 * Existing fields are unchanged, so your current page keeps working.
 *
 * Candle visuals use Tailwind step units (1 step = 4px). For each candle:
 *   candle top = offset (mt-N), body top = offset + topW, body bottom = body top + bodyH,
 *   candle bottom = body bottom + botW. A smaller number is HIGHER on the chart.
 *   bull = opens at body bottom, closes at body top. bear = opens at body top, closes at body bottom.
 */

export type PatternType = 'bullish' | 'bearish' | 'neutral' | 'reversal';
export type PatternLevel = 'essential' | 'intermediate' | 'advanced';
export type PatternGroupId =
  | 'momentum-indecision'
  | 'rejection'
  | 'two-candle'
  | 'range-bars'
  | 'three-candle'
  | 'continuation';

export type Localized = { en: string; bn: string };

export interface PatternCandle {
  color: 'bull' | 'bear' | 'neutral';
  bodyH: string;
  topW: string;
  botW: string;
  offset: string;
}

export interface Pattern {
  id: string;
  type: PatternType;
  group: PatternGroupId;
  level: PatternLevel;
  name: Localized;
  desc: Localized;
  psychology: Localized;
  howToTrade: Localized;
  candles: PatternCandle[];
}

export const patternGroups: {
  id: PatternGroupId;
  order: number;
  name: Localized;
  desc: Localized;
}[] = [
  {
    id: 'momentum-indecision',
    order: 1,
    name: { en: '1. Momentum & Indecision', bn: '১. মোমেন্টাম ও সিদ্ধান্তহীনতা' },
    desc: {
      en: 'Single candles that show strong one-sided pressure (Marubozu) or a standoff (Spinning Top, Doji family). Learn these first: they teach you how to read one candle.',
      bn: 'একক ক্যান্ডেল যা একপাক্ষিক শক্তি (মারুবোজু) বা টানাটানি (স্পিনিং টপ, ডোজি ফ্যামিলি) দেখায়। আগে এগুলো শিখুন: এগুলো একটি ক্যান্ডেল পড়তে শেখায়।',
    },
  },
  {
    id: 'rejection',
    order: 2,
    name: { en: '2. Rejection (Pin Bar Family)', bn: '২. রিজেকশন (পিন বার ফ্যামিলি)' },
    desc: {
      en: 'Single candles with a long wick showing one side was rejected. The same shape means different things depending on the trend and location.',
      bn: 'লম্বা উইকওয়ালা একক ক্যান্ডেল, যা একটি পক্ষ প্রত্যাখ্যাত হয়েছে বোঝায়। একই আকার ট্রেন্ড ও লোকেশন অনুযায়ী ভিন্ন অর্থ দেয়।',
    },
  },
  {
    id: 'two-candle',
    order: 3,
    name: { en: '3. Two-Candle Reversals', bn: '৩. টু-ক্যান্ডেল রিভার্সাল' },
    desc: {
      en: 'Patterns where the second candle reverses or challenges the first. Engulfing is the most important in this group.',
      bn: 'যেসব প্যাটার্নে দ্বিতীয় ক্যান্ডেল প্রথমটিকে উল্টে দেয় বা চ্যালেঞ্জ করে। এই গ্রুপে এনগালফিং সবচেয়ে গুরুত্বপূর্ণ।',
    },
  },
  {
    id: 'range-bars',
    order: 4,
    name: { en: '4. Inside & Outside Bars', bn: '৪. ইনসাইড ও আউটসাইড বার' },
    desc: {
      en: 'Price action range bars that compare the full high-low range of two candles. Core tools for breakout and compression trading.',
      bn: 'প্রাইস অ্যাকশন রেঞ্জ বার, যা দুটি ক্যান্ডেলের পুরো হাই-লো রেঞ্জ তুলনা করে। ব্রেকআউট ও কমপ্রেশন ট্রেডিংয়ের মূল টুল।',
    },
  },
  {
    id: 'three-candle',
    order: 5,
    name: { en: '5. Three-Candle Reversals', bn: '৫. থ্রি-ক্যান্ডেল রিভার্সাল' },
    desc: {
      en: 'Slower but usually more reliable reversal stories told over three candles.',
      bn: 'তিনটি ক্যান্ডেলে বলা ধীর কিন্তু সাধারণত বেশি নির্ভরযোগ্য রিভার্সাল গল্প।',
    },
  },
  {
    id: 'continuation',
    order: 6,
    name: { en: '6. Continuation Patterns', bn: '৬. কন্টিনিউয়েশন প্যাটার্ন' },
    desc: {
      en: 'Patterns that suggest a pause inside a trend rather than a reversal.',
      bn: 'যেসব প্যাটার্ন রিভার্সাল নয়, ট্রেন্ডের ভেতরে বিরতি নির্দেশ করে।',
    },
  },
];

/** Show these at the top of the /patterns page. */
export const patternReadingRules: { title: Localized; detail: Localized }[] = [
  {
    title: { en: 'Location first', bn: 'আগে লোকেশন' },
    detail: {
      en: 'A pattern matters at support, resistance or a supply/demand zone. In the middle of nowhere it is mostly noise.',
      bn: 'প্যাটার্ন গুরুত্বপূর্ণ সাপোর্ট, রেজিস্ট্যান্স বা সাপ্লাই/ডিমান্ড জোনে। মাঝখানে কোথাও হলে সেটি বেশিরভাগ নয়েজ।',
    },
  },
  {
    title: { en: 'Trend context', bn: 'ট্রেন্ড কনটেক্সট' },
    detail: {
      en: 'A reversal pattern needs something to reverse. Bullish reversals belong after a decline, bearish ones after a rally.',
      bn: 'রিভার্সাল প্যাটার্নের জন্য উল্টানোর মতো কিছু থাকতে হবে। বুলিশ রিভার্সাল পতনের পর, বিয়ারিশ রিভার্সাল র‍্যালির পর।',
    },
  },
  {
    title: { en: 'Wait for the close', bn: 'ক্লোজের জন্য অপেক্ষা' },
    detail: {
      en: 'A candle is not a pattern until it closes. A signal can disappear in the last seconds.',
      bn: 'ক্লোজ না হওয়া পর্যন্ত ক্যান্ডেল প্যাটার্ন নয়। শেষ কয়েক সেকেন্ডে সিগন্যাল মিলিয়ে যেতে পারে।',
    },
  },
  {
    title: { en: 'Confirm weak patterns', bn: 'দুর্বল প্যাটার্ন কনফার্ম করুন' },
    detail: {
      en: 'Single-candle and small patterns (Doji, Hammer, Hanging Man) need a confirming candle or a lower-timeframe break before entry.',
      bn: 'একক ও ছোট প্যাটার্ন (ডোজি, হ্যামার, হ্যাংগিং ম্যান) এন্ট্রির আগে কনফার্মিং ক্যান্ডেল বা লোয়ার টাইমফ্রেম ব্রেক চায়।',
    },
  },
  {
    title: { en: 'Stop beyond the pattern, risk 1%', bn: 'স্টপ প্যাটার্নের বাইরে, ঝুঁকি ১%' },
    detail: {
      en: 'Place the stop beyond the pattern extreme with a small buffer, and size the position so the loss is about 1% of the account.',
      bn: 'ছোট বাফার সহ প্যাটার্নের প্রান্তের বাইরে স্টপ বসান, এবং পজিশন সাইজ এমন রাখুন যাতে লস অ্যাকাউন্টের প্রায় ১% হয়।',
    },
  },
  {
    title: { en: 'Forex and Gold rarely gap', bn: 'ফরেক্স ও গোল্ডে গ্যাপ কম' },
    detail: {
      en: 'Classic definitions that need a gap (Piercing Line, Dark Cloud) are adapted here: treat the open as close to the previous close and judge by where the candle closes.',
      bn: 'গ্যাপ-নির্ভর ক্লাসিক সংজ্ঞা (পিয়ার্সিং লাইন, ডার্ক ক্লাউড) এখানে মানিয়ে নেওয়া হয়েছে: ওপেনকে আগের ক্লোজের কাছাকাছি ধরুন এবং ক্যান্ডেল কোথায় ক্লোজ হলো তা দেখে বিচার করুন।',
    },
  },
];

export const patternsData: Pattern[] = [
  // ═══════════════════ GROUP 1: MOMENTUM & INDECISION ═══════════════════
  {
    id: 'marubozu',
    type: 'reversal',
    group: 'momentum-indecision',
    level: 'essential',
    name: {
      en: 'Marubozu (Full Body Momentum)',
      bn: 'মারুবোজু (ফুল বডি মোমেন্টাম)',
    },
    desc: {
      en: 'A massive momentum candle with virtually zero wicks, representing total and absolute directional dominance from open to close.',
      bn: 'উইক বা শ্যাডোবিহীন একটি পূর্ণাঙ্গ শক্তিশালী মোমেন্টাম ক্যান্ডেল যা ওপেন থেকে ক্লোজ পর্যন্ত সম্পূর্ণ নিয়ন্ত্রণ নির্দেশ করে।',
    },
    psychology: {
      en: 'The clearest sign of one-sided pressure. One side of the market dominated from open to close with almost no opposing interest.',
      bn: 'একপাক্ষিক চাপের সবচেয়ে পরিষ্কার চিহ্ন। ওপেন থেকে ক্লোজ পর্যন্ত এক পক্ষ প্রায় কোনো বিরোধিতা ছাড়াই মার্কেট নিয়ন্ত্রণ করেছে।',
    },
    howToTrade: {
      en: 'Entry: Place a Limit order at the 50% midpoint of the Marubozu body on the subsequent relief bounce. Stop Loss: Behind the candle extreme.',
      bn: 'এন্ট্রি: মারুবোজু ক্যান্ডেলের ৫০% রিট্রেসমেন্টে লিমিট অর্ডার দিয়ে এন্ট্রি নিন। স্টপ লস: মারুবোজুর বিপরীত প্রান্তের পেছনে।',
    },
    candles: [
      { color: 'bull', bodyH: 'h-20', topW: 'h-[1px]', botW: 'h-[1px]', offset: 'mt-2' },
      { color: 'bear', bodyH: 'h-20', topW: 'h-[1px]', botW: 'h-[1px]', offset: 'mt-2' },
    ],
  },
  {
    id: 'spinning-top',
    type: 'neutral',
    group: 'momentum-indecision',
    level: 'intermediate',
    name: {
      en: 'Spinning Top',
      bn: 'স্পিনিং টপ',
    },
    desc: {
      en: 'A small real body with upper and lower wicks of similar length, showing a tug of war between buyers and sellers.',
      bn: 'ছোট রিয়েল বডি এবং প্রায় সমান দৈর্ঘ্যের উপরের ও নিচের উইকওয়ালা ক্যান্ডেল, যা বায়ার ও সেলারদের টানাটানি দেখায়।',
    },
    psychology: {
      en: 'Both sides pushed price in each direction during the period, but neither won. After a strong move it means momentum is slowing; inside a range it is just noise.',
      bn: 'ওই সময়ে দুই পক্ষই প্রাইসকে দুই দিকে ঠেলেছে কিন্তু কেউ জেতেনি। শক্তিশালী মুভের পর এটি মোমেন্টাম কমছে বোঝায়; রেঞ্জের ভেতরে এটি শুধু নয়েজ।',
    },
    howToTrade: {
      en: 'Not a trade signal on its own. After a long trend at a key level, treat it as a warning: tighten stops or avoid new entries, and trade only after a confirming candle in the opposite direction.',
      bn: 'এটি একা ট্রেড সিগন্যাল নয়। লম্বা ট্রেন্ডের পর কী-লেভেলে এটি দেখলে সতর্কতা হিসেবে নিন: স্টপ টাইট করুন বা নতুন এন্ট্রি এড়ান, এবং বিপরীত দিকের কনফার্মিং ক্যান্ডেলের পরেই ট্রেড করুন।',
    },
    candles: [
      { color: 'bull', bodyH: 'h-10', topW: 'h-2', botW: 'h-2', offset: 'mt-6' },
      { color: 'neutral', bodyH: 'h-3', topW: 'h-8', botW: 'h-8', offset: 'mt-2' },
    ],
  },
  {
    id: 'doji',
    type: 'neutral',
    group: 'momentum-indecision',
    level: 'essential',
    name: {
      en: 'Doji (Market Indecision)',
      bn: 'ডোজি (মার্কেট ডিসিশনলেস)',
    },
    desc: {
      en: 'A neutral pattern where the open and close are almost identical, indicating market indecision and pause in trend.',
      bn: 'একটি নিউট্রাল প্যাটার্ন যেখানে ওপেন এবং ক্লোজ প্রায় একই থাকে। এটি মার্কেটের সিদ্ধান্তহীনতা নির্দেশ করে।',
    },
    psychology: {
      en: 'Neither buyers nor sellers were able to gain control. The market moved up and down during the session, but closed very near where it started. It signals a pause in the current trend and a possible reversal.',
      bn: 'বায়ার বা সেলার কেউই কন্ট্রোল নিতে পারেনি। প্রাইস উপরে ও নিচে মুভ করলেও দিনশেষে ওপেনিং প্রাইসের খুব কাছে ক্লোজ হয়েছে। এটি বর্তমান ট্রেন্ডের বিরতি এবং সম্ভাব্য রিভার্সালের সংকেত দেয়।',
    },
    howToTrade: {
      en: 'A Doji alone is not a strong signal. Wait for the next candle to confirm the direction. If it forms after a long uptrend, it might signal a bearish reversal if the next candle closes lower.',
      bn: 'শুধু একটি ডোজি ট্রেড করার জন্য যথেষ্ট নয়। পরের ক্যান্ডেল কোন দিকে যাচ্ছে তার জন্য অপেক্ষা করুন। আপট্রেন্ডের পর ডোজি হলে এবং পরের ক্যান্ডেল নিচে ক্লোজ দিলে সেটি ডাউনট্রেন্ডের সিগন্যাল।',
    },
    candles: [
      { color: 'bull', bodyH: 'h-8', topW: 'h-4', botW: 'h-4', offset: 'mt-8' },
      { color: 'neutral', bodyH: 'h-[2px]', topW: 'h-8', botW: 'h-8', offset: 'mt-8' },
      { color: 'bear', bodyH: 'h-8', topW: 'h-4', botW: 'h-4', offset: 'mt-8' },
    ],
  },
  {
    id: 'dragonfly-doji',
    type: 'bullish',
    group: 'momentum-indecision',
    level: 'intermediate',
    name: {
      en: 'Dragonfly Doji',
      bn: 'ড্রাগনফ্লাই ডোজি',
    },
    desc: {
      en: 'A doji with open, high and close at nearly the same price and a long lower wick, showing sellers were rejected at lower prices.',
      bn: 'এমন ডোজি যার ওপেন, হাই ও ক্লোজ প্রায় একই দামে এবং নিচে লম্বা উইক থাকে, যা নিচের দামে সেলাররা প্রত্যাখ্যাত হয়েছে বোঝায়।',
    },
    psychology: {
      en: 'Sellers drove price far down, but buyers pushed it all the way back to the open. The long lower wick shows rejection of lower prices, strongest after a downtrend at support.',
      bn: 'সেলাররা প্রাইস অনেক নিচে নামিয়েছিল, কিন্তু বায়াররা পুরোটা ফিরিয়ে ওপেনের কাছে নিয়ে আসে। লম্বা নিচের উইক নিচের দামের প্রত্যাখ্যান দেখায়, যা ডাউনট্রেন্ডের পর সাপোর্টে সবচেয়ে শক্তিশালী।',
    },
    howToTrade: {
      en: 'Trade only at support or after a clear downtrend. Entry: Buy when the next candle closes above the high of the doji. Stop Loss: Below the long lower wick with a small buffer.',
      bn: 'শুধু সাপোর্টে বা স্পষ্ট ডাউনট্রেন্ডের পর ট্রেড করুন। এন্ট্রি: পরের ক্যান্ডেল ডোজির হাইয়ের উপরে ক্লোজ হলে বাই। স্টপ লস: ছোট বাফার সহ লম্বা নিচের উইকের নিচে।',
    },
    candles: [
      { color: 'bear', bodyH: 'h-10', topW: 'h-2', botW: 'h-2', offset: 'mt-4' },
      { color: 'bear', bodyH: 'h-8', topW: 'h-2', botW: 'h-2', offset: 'mt-10' },
      { color: 'neutral', bodyH: 'h-[2px]', topW: 'h-[1px]', botW: 'h-14', offset: 'mt-20' },
    ],
  },
  {
    id: 'gravestone-doji',
    type: 'bearish',
    group: 'momentum-indecision',
    level: 'intermediate',
    name: {
      en: 'Gravestone Doji',
      bn: 'গ্রেভস্টোন ডোজি',
    },
    desc: {
      en: 'A doji with open, low and close at nearly the same price and a long upper wick, showing buyers were rejected at higher prices.',
      bn: 'এমন ডোজি যার ওপেন, লো ও ক্লোজ প্রায় একই দামে এবং উপরে লম্বা উইক থাকে, যা উপরের দামে বায়াররা প্রত্যাখ্যাত হয়েছে বোঝায়।',
    },
    psychology: {
      en: 'Buyers pushed price far up, but sellers drove it back to the open by the close. The long upper wick shows rejection of higher prices, strongest after an uptrend at resistance.',
      bn: 'বায়াররা প্রাইস অনেক উপরে তুলেছিল, কিন্তু ক্লোজের মধ্যে সেলাররা ওপেনের কাছে ফিরিয়ে আনে। লম্বা উপরের উইক উপরের দামের প্রত্যাখ্যান দেখায়, যা আপট্রেন্ডের পর রেজিস্ট্যান্সে সবচেয়ে শক্তিশালী।',
    },
    howToTrade: {
      en: 'Trade only at resistance or after a clear uptrend. Entry: Sell when the next candle closes below the low of the doji. Stop Loss: Above the long upper wick with a small buffer.',
      bn: 'শুধু রেজিস্ট্যান্সে বা স্পষ্ট আপট্রেন্ডের পর ট্রেড করুন। এন্ট্রি: পরের ক্যান্ডেল ডোজির লো এর নিচে ক্লোজ হলে সেল। স্টপ লস: ছোট বাফার সহ লম্বা উপরের উইকের উপরে।',
    },
    candles: [
      { color: 'bull', bodyH: 'h-10', topW: 'h-2', botW: 'h-2', offset: 'mt-20' },
      { color: 'bull', bodyH: 'h-8', topW: 'h-2', botW: 'h-2', offset: 'mt-12' },
      { color: 'neutral', bodyH: 'h-[2px]', topW: 'h-12', botW: 'h-[1px]', offset: 'mt-2' },
    ],
  },
  {
    id: 'long-legged-doji',
    type: 'neutral',
    group: 'momentum-indecision',
    level: 'intermediate',
    name: {
      en: 'Long-Legged Doji',
      bn: 'লং-লেগড ডোজি',
    },
    desc: {
      en: 'A doji with long wicks on both sides, showing big swings in both directions but no winner.',
      bn: 'এমন ডোজি যার দুই দিকেই লম্বা উইক, যা দুই দিকেই বড় দোলাচল কিন্তু কোনো বিজয়ী নেই বোঝায়।',
    },
    psychology: {
      en: 'Price swung sharply up and down but closed near the open. It is a sign of very high indecision, often seen at turning points or before big news.',
      bn: 'প্রাইস তীব্রভাবে উপরে-নিচে দুলেছে কিন্তু ওপেনের কাছে ক্লোজ হয়েছে। এটি অত্যন্ত বেশি সিদ্ধান্তহীনতার চিহ্ন, প্রায়ই টার্নিং পয়েন্টে বা বড় নিউজের আগে দেখা যায়।',
    },
    howToTrade: {
      en: 'Do not trade it alone. Mark its high and low: a candle that closes beyond either side shows the next direction. Be careful near news events because spreads widen.',
      bn: 'এটি একা ট্রেড করবেন না। এর হাই ও লো মার্ক করুন: কোনো ক্যান্ডেল যেকোনো এক পাশের বাইরে ক্লোজ হলে পরের দিক বোঝা যায়। নিউজের কাছাকাছি সতর্ক থাকুন কারণ স্প্রেড বেড়ে যায়।',
    },
    candles: [
      { color: 'bull', bodyH: 'h-8', topW: 'h-2', botW: 'h-2', offset: 'mt-12' },
      { color: 'neutral', bodyH: 'h-[2px]', topW: 'h-8', botW: 'h-10', offset: 'mt-6' },
      { color: 'bear', bodyH: 'h-8', topW: 'h-2', botW: 'h-2', offset: 'mt-14' },
    ],
  },

  // ═══════════════════ GROUP 2: REJECTION (PIN BAR FAMILY) ═══════════════════
  {
    id: 'hammer',
    type: 'bullish',
    group: 'rejection',
    level: 'essential',
    name: {
      en: 'Hammer (Bullish Pin Bar)',
      bn: 'হ্যামার (বুলিশ পিন বার)',
    },
    desc: {
      en: 'A bullish reversal pattern with a small body and a long lower wick, indicating rejection of lower prices.',
      bn: 'একটি বুলিশ রিভার্সাল প্যাটার্ন যার ছোট বডি এবং লম্বা লোয়ার উইক থাকে। এটি নিচের দিকের প্রাইস রিজেকশন নির্দেশ করে।',
    },
    psychology: {
      en: 'During the session, sellers aggressively pushed the price down, creating a long lower wick. But before the session closed, buyers stepped in strongly, rejecting the lower prices and pushing the close near the opening price. This shows strong buying interest at that level.',
      bn: 'সেশনে সেলাররা প্রাইস অনেক নিচে নামিয়েছিল, কিন্তু সেশন শেষ হওয়ার আগে বায়াররা খুব শক্তিশালীভাবে মার্কেটে ফিরে আসে এবং প্রাইসকে ওপেনিং প্রাইসের কাছাকাছি নিয়ে যায়। লম্বা উইকটি প্রমাণ করে যে নিচের প্রাইসে বায়ারদের অনেক আগ্রহ আছে।',
    },
    howToTrade: {
      en: "Trade this only at Support levels or after a clear pullback. The lower wick should be at least twice the size of the body. Entry: Buy above the hammer's high. Stop Loss: Below the long wick. The same shape at the top of an uptrend is a Hanging Man.",
      bn: 'এটি শুধুমাত্র সাপোর্ট লেভেলে বা পুলব্যাকের পর ট্রেড করবেন। নিচের উইক বডির চেয়ে অন্তত দ্বিগুণ বড় হতে হবে। এন্ট্রি: হ্যামারের হাই এর উপরে বাই করবেন। স্টপ লস: লম্বা উইকের নিচে। আপট্রেন্ডের শীর্ষে একই আকার হলে সেটি হ্যাংগিং ম্যান।',
    },
    candles: [
      { color: 'bear', bodyH: 'h-10', topW: 'h-2', botW: 'h-2', offset: 'mt-2' },
      { color: 'bear', bodyH: 'h-8', topW: 'h-2', botW: 'h-4', offset: 'mt-8' },
      { color: 'bull', bodyH: 'h-4', topW: 'h-2', botW: 'h-12', offset: 'mt-12' },
    ],
  },
  {
    id: 'hanging-man',
    type: 'bearish',
    group: 'rejection',
    level: 'intermediate',
    name: {
      en: 'Hanging Man',
      bn: 'হ্যাংগিং ম্যান',
    },
    desc: {
      en: 'A bearish reversal pattern at the top of an uptrend with a small body and a long lower shadow, revealing emerging supply.',
      bn: 'আপট্রেন্ডের শীর্ষে গঠিত একটি বিয়ারিশ রিভার্সাল ক্যান্ডেল যার বডি ছোট কিন্তু নিচের উইক দীর্ঘ, যা বায়ারদের দুর্বলতা নির্দেশ করে।',
    },
    psychology: {
      en: 'Even though price recovered near the open, the fact that sellers were able to push price down heavily during the session shows selling pressure is building at the top.',
      bn: 'আপট্রেন্ডের শীর্ষে সেশনের মধ্যে সেলাররা দাম অনেক নিচে নামাতে পেরেছিল। বায়াররা সামান্য ফিরিয়ে নিলেও স্পষ্ট হয় যে শীর্ষে সেলিং চাপ তৈরি হচ্ছে এবং রিভার্সালের সম্ভাবনা বাড়ে।',
    },
    howToTrade: {
      en: "Trade at major Resistance. Wait for confirmation. Entry: Sell when the next candle closes below the Hanging Man's low. Stop Loss: Above the candle high.",
      bn: 'রেজিস্ট্যান্সে খুঁজবেন। পরবর্তী ক্যান্ডেল হ্যাংগিং ম্যানের লো এর নিচে ক্লোজ হলে সেল এন্ট্রি নিন। স্টপ লস: ক্যান্ডেলের হাই এর উপরে।',
    },
    candles: [
      { color: 'bull', bodyH: 'h-10', topW: 'h-2', botW: 'h-2', offset: 'mt-6' },
      { color: 'bear', bodyH: 'h-4', topW: 'h-2', botW: 'h-12', offset: 'mt-2' },
    ],
  },
  {
    id: 'inverted-hammer',
    type: 'bullish',
    group: 'rejection',
    level: 'intermediate',
    name: {
      en: 'Inverted Hammer',
      bn: 'ইনভার্টেড হ্যামার',
    },
    desc: {
      en: 'A bullish reversal pattern at support with a small lower body and a long upper shadow, testing higher prices.',
      bn: 'সাপোর্টে গঠিত একটি বুলিশ রিভার্সাল ক্যান্ডেল যার বডি নিচে ছোট থাকে এবং উপরের দিকে একটি দীর্ঘ শ্যাডো (উইক) থাকে।',
    },
    psychology: {
      en: 'Sellers were driving price down, but buyers pushed up forcefully during the session to test supply. Although price retreated, it showed buyer interest at key support. It needs a confirming candle.',
      bn: 'ডাউনট্রেন্ডের পর বায়াররা সরবরাহ টেস্ট করতে প্রাইস উপরে ঠেলে দেয়। সেলাররা কিছুটা নিচে নামালেও কী-সাপোর্টে বায়ারদের আগ্রহ বোঝা যায়। এর জন্য কনফার্মিং ক্যান্ডেল দরকার, নইলে ব্রেকআউট নিশ্চিত নয়।',
    },
    howToTrade: {
      en: 'Trade at Support floors. Entry: Buy when the next candle breaks above the high of the Inverted Hammer. Stop Loss: Below the candle low.',
      bn: 'সাপোর্টে এটি খুঁজবেন। এন্ট্রি: পরবর্তী ক্যান্ডেল ইনভার্টেড হ্যামারের হাই ব্রেক করলে বাই। স্টপ লস: ক্যান্ডেলের লো এর নিচে।',
    },
    candles: [
      { color: 'bear', bodyH: 'h-10', topW: 'h-2', botW: 'h-2', offset: 'mt-4' },
      { color: 'bull', bodyH: 'h-4', topW: 'h-14', botW: 'h-2', offset: 'mt-14' },
    ],
  },
  {
    id: 'shooting-star',
    type: 'bearish',
    group: 'rejection',
    level: 'essential',
    name: {
      en: 'Shooting Star (Bearish Pin Bar)',
      bn: 'শুটিং স্টার (বিয়ারিশ পিন বার)',
    },
    desc: {
      en: 'A bearish reversal pattern with a small body and a long upper wick, indicating rejection of higher prices.',
      bn: 'একটি বিয়ারিশ রিভার্সাল প্যাটার্ন যার ছোট বডি এবং লম্বা আপার উইক থাকে। এটি উপরের দিকের প্রাইস রিজেকশন নির্দেশ করে।',
    },
    psychology: {
      en: 'Buyers tried to push the price higher, but met massive resistance from sellers who forced the price all the way back down near the open. The long upper wick shows a failure of buyers to maintain higher prices.',
      bn: 'বায়াররা প্রাইস উপরে নেয়ার চেষ্টা করেছিল, কিন্তু সেলাররা বাধা দেয় এবং প্রাইসকে আবার নিচে নামিয়ে আনে। লম্বা আপার উইক এটাই প্রমাণ করে যে বায়াররা উপরের প্রাইস ধরে রাখতে ব্যর্থ হয়েছে।',
    },
    howToTrade: {
      en: "Trade this at Resistance levels. The upper wick should be at least twice the size of the body. Entry: Sell below the shooting star's low. Stop Loss: Above the long wick.",
      bn: 'রেজিস্ট্যান্স লেভেলে এটি খুঁজবেন। আপার উইক বডির চেয়ে অন্তত দ্বিগুণ বড় হতে হবে। এন্ট্রি: শুটিং স্টারের লো এর নিচে সেল করবেন। স্টপ লস: লম্বা উইকের উপরে।',
    },
    candles: [
      { color: 'bull', bodyH: 'h-10', topW: 'h-2', botW: 'h-2', offset: 'mt-12' },
      { color: 'bull', bodyH: 'h-8', topW: 'h-4', botW: 'h-2', offset: 'mt-8' },
      { color: 'bear', bodyH: 'h-4', topW: 'h-12', botW: 'h-2', offset: 'mt-2' },
    ],
  },

  // ═══════════════════ GROUP 3: TWO-CANDLE REVERSALS ═══════════════════
  {
    id: 'bullish-engulfing',
    type: 'bullish',
    group: 'two-candle',
    level: 'essential',
    name: {
      en: 'Bullish Engulfing',
      bn: 'বুলিশ এনগালফিং',
    },
    desc: {
      en: 'A large bullish candle completely covers the real body of the previous smaller bearish candle at support.',
      bn: 'একটি বড় বুলিশ ক্যান্ডেল পূর্ববর্তী ছোট বিয়ারিশ ক্যান্ডেলকে সম্পূর্ণ ঢেকে ফেলে।',
    },
    psychology: {
      en: 'Sellers were in control during the first candle, pushing prices down. However, in the second candle, strong buying pressure completely overpowered the sellers, forcing the price up and engulfing the previous candle. This shows a massive shift in momentum from bears to bulls.',
      bn: 'প্রথম ক্যান্ডেলের সময় সেলাররা কন্ট্রোলে ছিল এবং প্রাইস নিচে নামাচ্ছিল। কিন্তু দ্বিতীয় ক্যান্ডেলে বায়াররা অনেক বেশি শক্তিশালী হয়ে ফিরে আসে এবং আগের দিনের পুরো বডিকে কভার করে ফেলে। এর মানে হলো বায়াররা এখন মার্কেট কন্ট্রোল করছে এবং প্রাইস উপরে যাওয়ার সম্ভাবনা অনেক বেশি।',
    },
    howToTrade: {
      en: 'Wait for the pattern to form at a key Support level or at the bottom of a downtrend. Entry: Buy when the next candle breaks the high of the engulfing candle. Stop Loss: Place below the low of the engulfing candle.',
      bn: 'ডাউনট্রেন্ডের নিচে অথবা কোন ইম্পর্ট্যান্ট সাপোর্ট লেভেলে এই প্যাটার্ন তৈরি হলে ট্রেড নিবেন। এন্ট্রি: প্যাটার্নের হাই ব্রেক করলে বাই এন্ট্রি নিবেন। স্টপ লস: এনগালফিং ক্যান্ডেলের নিচে বসাবেন।',
    },
    candles: [
      { color: 'bear', bodyH: 'h-8', topW: 'h-4', botW: 'h-4', offset: 'mt-12' },
      { color: 'bull', bodyH: 'h-16', topW: 'h-2', botW: 'h-2', offset: 'mt-6' },
    ],
  },
  {
    id: 'bearish-engulfing',
    type: 'bearish',
    group: 'two-candle',
    level: 'essential',
    name: {
      en: 'Bearish Engulfing',
      bn: 'বিয়ারিশ এনগালফিং',
    },
    desc: {
      en: 'A large bearish candle completely covers the real body of the previous smaller bullish candle at resistance.',
      bn: 'একটি বড় বিয়ারিশ ক্যান্ডেল পূর্ববর্তী ছোট বুলিশ ক্যান্ডেলকে সম্পূর্ণ ঢেকে ফেলে।',
    },
    psychology: {
      en: 'Buyers were in control pushing the market higher, but suddenly sellers entered with strong selling pressure. The strong red candle completely erasing the previous green candle indicates bulls are exhausted and bears are taking over.',
      bn: 'বায়াররা মার্কেট উপরে নিয়ে যাচ্ছিল, কিন্তু হঠাৎ সেলাররা প্রবল সেলিং চাপ নিয়ে মার্কেটে প্রবেশ করে। লাল ক্যান্ডেলটি আগের সবুজ ক্যান্ডেলকে পুরোপুরি গিলে ফেলার মানে হলো বায়ারদের শক্তি শেষ এবং সেলাররা মার্কেট কন্ট্রোল নিয়ে নিয়েছে।',
    },
    howToTrade: {
      en: 'Look for this pattern at a key Resistance level or the top of an uptrend. Entry: Sell when the next candle breaks the low of the engulfing candle. Stop Loss: Place above the high of the engulfing candle. (See the Master Guide for the full playbook.)',
      bn: 'আপট্রেন্ডের উপরে বা কোন ইম্পর্ট্যান্ট রেজিস্ট্যান্স লেভেলে এই প্যাটার্নটি খুঁজবেন। এন্ট্রি: প্যাটার্নের লো ব্রেক করলে সেল এন্ট্রি নিবেন। স্টপ লস: এনগালফিং ক্যান্ডেলের উপরে বসাবেন। (সম্পূর্ণ প্লেবুকের জন্য মাস্টার গাইড দেখুন।)',
    },
    candles: [
      { color: 'bull', bodyH: 'h-8', topW: 'h-4', botW: 'h-4', offset: 'mt-4' },
      { color: 'bear', bodyH: 'h-16', topW: 'h-2', botW: 'h-2', offset: 'mt-2' },
    ],
  },
  {
    id: 'piercing-line',
    type: 'bullish',
    group: 'two-candle',
    level: 'intermediate',
    name: {
      en: 'Piercing Line',
      bn: 'পিয়ার্সিং লাইন',
    },
    desc: {
      en: 'A 2-candle bullish reversal: a strong red candle followed by a green candle that opens near or below the prior close and closes above the midpoint of the red body.',
      bn: '২ ক্যান্ডেলের বুলিশ রিভার্সাল: একটি শক্তিশালী লাল ক্যান্ডেলের পর একটি সবুজ ক্যান্ডেল, যা আগের ক্লোজের কাছে বা নিচে ওপেন হয়ে লাল বডির মিডপয়েন্টের উপরে ক্লোজ হয়।',
    },
    psychology: {
      en: 'Sellers pushed price lower early in the second candle, but buyers took over and recovered more than half of the previous red candle. It is weaker than a Bullish Engulfing because it does not close above the prior open.',
      bn: 'দ্বিতীয় ক্যান্ডেলের শুরুতে সেলাররা প্রাইস নিচে নামায়, কিন্তু বায়াররা নিয়ন্ত্রণ নিয়ে আগের লাল ক্যান্ডেলের অর্ধেকের বেশি ফিরিয়ে আনে। এটি বুলিশ এনগালফিংয়ের চেয়ে দুর্বল কারণ এটি আগের ওপেনের উপরে ক্লোজ হয় না।',
    },
    howToTrade: {
      en: 'Look for it at support after a downtrend. Forex and Gold rarely gap, so judge it by the close above the 50% midpoint of the red body. Entry: Buy on the break of the green candle high. Stop Loss: Below the low of the pattern.',
      bn: 'ডাউনট্রেন্ডের পর সাপোর্টে এটি খুঁজবেন। ফরেক্স ও গোল্ডে গ্যাপ কম হয়, তাই লাল বডির ৫০% মিডপয়েন্টের উপরে ক্লোজ দেখে বিচার করুন। এন্ট্রি: সবুজ ক্যান্ডেলের হাই ব্রেক করলে বাই। স্টপ লস: প্যাটার্নের লো এর নিচে।',
    },
    candles: [
      { color: 'bear', bodyH: 'h-16', topW: 'h-2', botW: 'h-2', offset: 'mt-2' },
      { color: 'bull', bodyH: 'h-14', topW: 'h-2', botW: 'h-2', offset: 'mt-6' },
    ],
  },
  {
    id: 'dark-cloud-cover',
    type: 'bearish',
    group: 'two-candle',
    level: 'intermediate',
    name: {
      en: 'Dark Cloud Cover',
      bn: 'ডার্ক ক্লাউড কভার',
    },
    desc: {
      en: 'A 2-candle bearish reversal: a strong green candle followed by a red candle that opens near or above the prior close and closes below the midpoint of the green body.',
      bn: '২ ক্যান্ডেলের বিয়ারিশ রিভার্সাল: একটি শক্তিশালী সবুজ ক্যান্ডেলের পর একটি লাল ক্যান্ডেল, যা আগের ক্লোজের কাছে বা উপরে ওপেন হয়ে সবুজ বডির মিডপয়েন্টের নিচে ক্লোজ হয়।',
    },
    psychology: {
      en: 'Buyers pushed price higher early in the second candle, but sellers took over and erased more than half of the previous green candle. It is weaker than a Bearish Engulfing because it does not close below the prior open.',
      bn: 'দ্বিতীয় ক্যান্ডেলের শুরুতে বায়াররা প্রাইস উপরে নেয়, কিন্তু সেলাররা নিয়ন্ত্রণ নিয়ে আগের সবুজ ক্যান্ডেলের অর্ধেকের বেশি মুছে দেয়। এটি বিয়ারিশ এনগালফিংয়ের চেয়ে দুর্বল কারণ এটি আগের ওপেনের নিচে ক্লোজ হয় না।',
    },
    howToTrade: {
      en: 'Look for it at resistance after an uptrend. Judge it by the close below the 50% midpoint of the green body. Entry: Sell on the break of the red candle low. Stop Loss: Above the high of the pattern.',
      bn: 'আপট্রেন্ডের পর রেজিস্ট্যান্সে এটি খুঁজবেন। সবুজ বডির ৫০% মিডপয়েন্টের নিচে ক্লোজ দেখে বিচার করুন। এন্ট্রি: লাল ক্যান্ডেলের লো ব্রেক করলে সেল। স্টপ লস: প্যাটার্নের হাই এর উপরে।',
    },
    candles: [
      { color: 'bull', bodyH: 'h-16', topW: 'h-2', botW: 'h-2', offset: 'mt-6' },
      { color: 'bear', bodyH: 'h-14', topW: 'h-2', botW: 'h-2', offset: 'mt-4' },
    ],
  },
  {
    id: 'bullish-harami',
    type: 'bullish',
    group: 'two-candle',
    level: 'intermediate',
    name: {
      en: 'Bullish Harami',
      bn: 'বুলিশ হারামি',
    },
    desc: {
      en: 'A 2-candle pattern where a small green candle is completely contained within the real body of the preceding large red candle.',
      bn: '২টি ক্যান্ডেলের রিভার্সাল প্যাটার্ন যেখানে একটি বড় লাল ক্যান্ডেলের ভেতরে একটি ছোট সবুজ ক্যান্ডেল সম্পূর্ণ সীমাবদ্ধ থাকে।',
    },
    psychology: {
      en: 'Selling momentum contracts abruptly. The small green candle resting inside the prior large red candle shows seller exhaustion and possible quiet buying. It is a warning, not a confirmed reversal.',
      bn: 'ডাউনট্রেন্ড চলাকালীন সেলিং মোমেন্টাম হঠাৎ কমে যায়। প্রথম লাল ক্যান্ডেলের পেটের ভেতরে ছোট সবুজ ক্যান্ডেলটি সেলারদের ক্লান্তি এবং সম্ভাব্য শান্ত বাইং দেখায়। এটি সতর্কসংকেত, নিশ্চিত রিভার্সাল নয়।',
    },
    howToTrade: {
      en: 'Trade at Support. Entry: Buy when price breaks above the high of the small green candle (or the large candle, for a safer entry). Stop Loss: Below the low of the large red candle.',
      bn: 'সাপোর্টে এটি খুঁজবেন। এন্ট্রি: ছোট সবুজ ক্যান্ডেলের হাই ব্রেক হলে বাই (নিরাপদ এন্ট্রির জন্য বড় ক্যান্ডেলের হাই)। স্টপ লস: বড় লাল ক্যান্ডেলের লো এর নিচে।',
    },
    candles: [
      { color: 'bear', bodyH: 'h-16', topW: 'h-2', botW: 'h-2', offset: 'mt-2' },
      { color: 'bull', bodyH: 'h-6', topW: 'h-2', botW: 'h-2', offset: 'mt-8' },
    ],
  },
  {
    id: 'bearish-harami',
    type: 'bearish',
    group: 'two-candle',
    level: 'intermediate',
    name: {
      en: 'Bearish Harami',
      bn: 'বিয়ারিশ হারামি',
    },
    desc: {
      en: 'A 2-candle pattern where a small red candle is completely contained within the real body of the preceding large green candle.',
      bn: '২টি ক্যান্ডেলের রিভার্সাল প্যাটার্ন যেখানে একটি বড় সবুজ ক্যান্ডেলের ভেতরে একটি ছোট লাল ক্যান্ডেল সম্পূর্ণ সীমাবদ্ধ থাকে।',
    },
    psychology: {
      en: 'Buyer momentum halts at resistance. The small red candle inside the prior tall green bar shows that selling pressure is blocking further advance. It is a warning, not a confirmed reversal.',
      bn: 'আপট্রেন্ডের শীর্ষে বায়ারদের ক্লান্তি। আগের বড় সবুজ ক্যান্ডেলের পেটের ভেতরে ছোট লাল ক্যান্ডেলটি দেখায় যে সেলিং চাপ আরও উপরে ওঠা আটকে দিচ্ছে। এটি সতর্কসংকেত, নিশ্চিত রিভার্সাল নয়।',
    },
    howToTrade: {
      en: 'Trade at Resistance. Entry: Sell when price breaks below the low of the small red candle (or the large candle, for a safer entry). Stop Loss: Above the high of the large green candle.',
      bn: 'রেজিস্ট্যান্সে খুঁজবেন। এন্ট্রি: ছোট লাল ক্যান্ডেলের লো ব্রেক হলে সেল (নিরাপদ এন্ট্রির জন্য বড় ক্যান্ডেলের লো)। স্টপ লস: বড় সবুজ ক্যান্ডেলের হাই এর উপরে।',
    },
    candles: [
      { color: 'bull', bodyH: 'h-16', topW: 'h-2', botW: 'h-2', offset: 'mt-6' },
      { color: 'bear', bodyH: 'h-6', topW: 'h-2', botW: 'h-2', offset: 'mt-12' },
    ],
  },
  {
    id: 'tweezer-bottom',
    type: 'bullish',
    group: 'two-candle',
    level: 'intermediate',
    name: {
      en: 'Tweezer Bottom',
      bn: 'টুইজার বটম',
    },
    desc: {
      en: 'A 2-candle reversal pattern where two consecutive candles hit nearly the same price low at major support.',
      bn: '২টি ক্যান্ডেলের রিভার্সাল প্যাটার্ন যেখানে পরপর দুটি ক্যান্ডেল প্রায় একই সর্বনিম্ন মূল্যে (লো) সাপোর্ট পেয়ে বাউন্স করে।',
    },
    psychology: {
      en: 'Sellers attempt to push below a support level twice and are rejected at almost the same price point, suggesting strong demand at that level.',
      bn: 'সেলাররা পরপর দুটি ক্যান্ডেলে সাপোর্ট লেভেল ভাঙার চেষ্টা করে প্রায় একই লেভেল থেকে ব্যর্থ হয়, যা ওই লেভেলে শক্তিশালী ডিমান্ডের ইঙ্গিত দেয়।',
    },
    howToTrade: {
      en: 'Look for nearly identical lows at key Support. Entry: Buy on the close of the second bullish candle. Stop Loss: Just below the matching lows.',
      bn: 'মেজর সাপোর্টে প্রায় একই লো খুঁজবেন। এন্ট্রি: দ্বিতীয় বুলিশ ক্যান্ডেল ক্লোজ হলে বাই। স্টপ লস: টুইজার লো এর নিচে।',
    },
    candles: [
      { color: 'bear', bodyH: 'h-10', topW: 'h-2', botW: 'h-10', offset: 'mt-2' },
      { color: 'bull', bodyH: 'h-10', topW: 'h-2', botW: 'h-10', offset: 'mt-2' },
    ],
  },
  {
    id: 'tweezer-top',
    type: 'bearish',
    group: 'two-candle',
    level: 'intermediate',
    name: {
      en: 'Tweezer Top',
      bn: 'টুইজার টপ',
    },
    desc: {
      en: 'A 2-candle reversal pattern where two consecutive candles hit nearly the same price high at key resistance.',
      bn: '২টি ক্যান্ডেলের বিয়ারিশ রিভার্সাল প্যাটার্ন যেখানে পরপর দুটি ক্যান্ডেল প্রায় একই সর্বোচ্চ মূল্যে (হাই) বাধা পেয়ে রিভার্স করে।',
    },
    psychology: {
      en: 'Buyers hit a strong resistance wall at almost the same high twice in a row, leading to trapped longs and a reversal downward.',
      bn: 'বায়াররা পরপর দুটি ক্যান্ডেলে প্রায় একই হাই পয়েন্টে শক্তিশালী রেজিস্ট্যান্সে বাধা পায়, ফলে লং ট্রেডাররা আটকে যায় এবং প্রাইস নিচে ঘোরে।',
    },
    howToTrade: {
      en: 'Look for nearly identical highs at Resistance. Entry: Sell on the close of the second bearish candle. Stop Loss: Just above the matching highs.',
      bn: 'রেজিস্ট্যান্সে প্রায় একই হাই খুঁজবেন। এন্ট্রি: দ্বিতীয় বিয়ারিশ ক্যান্ডেল ক্লোজ হলে সেল। স্টপ লস: টুইজার হাই এর উপরে।',
    },
    candles: [
      { color: 'bull', bodyH: 'h-10', topW: 'h-10', botW: 'h-2', offset: 'mt-6' },
      { color: 'bear', bodyH: 'h-10', topW: 'h-10', botW: 'h-2', offset: 'mt-6' },
    ],
  },

  // ═══════════════════ GROUP 4: INSIDE & OUTSIDE BARS ═══════════════════
  {
    id: 'inside-bar',
    type: 'neutral',
    group: 'range-bars',
    level: 'essential',
    name: {
      en: 'Inside Bar',
      bn: 'ইনসাইড বার',
    },
    desc: {
      en: 'A candle whose entire range (high and low) sits inside the range of the previous larger candle (the mother bar), showing compression before a breakout.',
      bn: 'এমন ক্যান্ডেল যার পুরো রেঞ্জ (হাই ও লো) আগের বড় ক্যান্ডেলের (মাদার বার) রেঞ্জের ভেতরে থাকে, যা ব্রেকআউটের আগে কমপ্রেশন দেখায়।',
    },
    psychology: {
      en: 'Volatility contracts and the market pauses. The breakout direction decides who wins, which is why you trade the break of the mother bar instead of guessing the direction in advance.',
      bn: 'ভোলাটিলিটি কমে যায় ও মার্কেট থামে। ব্রেকআউটের দিকই ঠিক করে কে জিতবে, তাই আগে থেকে দিক অনুমান না করে মাদার বারের ব্রেকে ট্রেড করা হয়।',
    },
    howToTrade: {
      en: 'Works best with the trend and near a key level, with a mother bar of normal or large size. Entry: Buy above the mother bar high (or Sell below its low) in the direction of the higher-timeframe trend. Stop Loss: On the other side of the mother bar, or at its midpoint for a tighter stop. Skip tiny mother bars: the stop will be too small to survive the spread.',
      bn: 'ট্রেন্ডের পক্ষে ও কী-লেভেলের কাছে, স্বাভাবিক বা বড় মাদার বারের সাথে সবচেয়ে ভালো কাজ করে। এন্ট্রি: হায়ার টাইমফ্রেম ট্রেন্ডের দিকে মাদার বারের হাইয়ের উপরে বাই (বা লো এর নিচে সেল)। স্টপ লস: মাদার বারের উল্টো পাশে, অথবা ছোট স্টপের জন্য মিডপয়েন্টে। খুব ছোট মাদার বার এড়িয়ে চলুন: স্টপ এত ছোট হবে যে স্প্রেডেই কেটে যাবে।',
    },
    candles: [
      { color: 'bull', bodyH: 'h-16', topW: 'h-4', botW: 'h-4', offset: 'mt-4' },
      { color: 'neutral', bodyH: 'h-4', topW: 'h-2', botW: 'h-2', offset: 'mt-12' },
    ],
  },
  {
    id: 'outside-bar',
    type: 'neutral',
    group: 'range-bars',
    level: 'intermediate',
    name: {
      en: 'Outside Bar (Range Engulfing)',
      bn: 'আউটসাইড বার (রেঞ্জ এনগালফিং)',
    },
    desc: {
      en: 'A candle whose high is higher and low is lower than the previous candle, covering its entire range. The direction depends on where it closes.',
      bn: 'এমন ক্যান্ডেল যার হাই আগেরটির চেয়ে বেশি এবং লো কম, অর্থাৎ আগের পুরো রেঞ্জ ঢেকে ফেলে। দিক নির্ভর করে এটি কোথায় ক্লোজ হয়েছে তার ওপর।',
    },
    psychology: {
      en: 'Both extremes of the previous candle were broken in the same period, a sign of strong volatility. A close near the high shows buyers won; near the low shows sellers won. At a key level with a strong close, it often works like an engulfing signal.',
      bn: 'একই সময়ে আগের ক্যান্ডেলের দুই প্রান্তই ভেঙেছে, যা তীব্র ভোলাটিলিটির চিহ্ন। হাইয়ের কাছে ক্লোজ মানে বায়াররা জিতেছে; লো এর কাছে ক্লোজ মানে সেলাররা। কী-লেভেলে শক্তিশালী ক্লোজ হলে এটি প্রায়ই এনগালফিং সিগন্যালের মতো কাজ করে।',
    },
    howToTrade: {
      en: 'Needs a clear close: near the high = bullish, near the low = bearish (the example shows a bullish one). Trade it only at key levels or with the trend. Entry: Break of the outside bar high (bullish) or low (bearish). Stop Loss: Beyond the opposite extreme, or at the 50% level for a tighter stop.',
      bn: 'পরিষ্কার ক্লোজ লাগে: হাইয়ের কাছে = বুলিশ, লো এর কাছে = বিয়ারিশ (উদাহরণে একটি বুলিশ দেখানো হয়েছে)। শুধু কী-লেভেলে বা ট্রেন্ডের পক্ষে ট্রেড করুন। এন্ট্রি: আউটসাইড বারের হাই (বুলিশ) বা লো (বিয়ারিশ) ব্রেক হলে। স্টপ লস: উল্টো প্রান্তের বাইরে, অথবা ছোট স্টপের জন্য ৫০% লেভেলে।',
    },
    candles: [
      { color: 'bear', bodyH: 'h-4', topW: 'h-2', botW: 'h-2', offset: 'mt-10' },
      { color: 'bull', bodyH: 'h-14', topW: 'h-2', botW: 'h-2', offset: 'mt-6' },
    ],
  },

  // ═══════════════════ GROUP 5: THREE-CANDLE REVERSALS ═══════════════════
  {
    id: 'morning-star',
    type: 'bullish',
    group: 'three-candle',
    level: 'essential',
    name: {
      en: 'Morning Star',
      bn: 'মর্নিং স্টার',
    },
    desc: {
      en: 'A 3-candle bullish reversal pattern: a long bearish candle, a small indecision candle, and a strong bullish candle.',
      bn: 'একটি ৩-ক্যান্ডেল বুলিশ রিভার্সাল প্যাটার্ন: একটি লম্বা লাল ক্যান্ডেল, একটি ছোট ক্যান্ডেল এবং শেষে একটি স্ট্রং সবুজ ক্যান্ডেল।',
    },
    psychology: {
      en: "First candle: Bears are fully in control. Second candle: Momentum slows down completely (indecision). Third candle: Bulls take over with huge force, pushing the price more than 50% into the first candle's body.",
      bn: 'প্রথম ক্যান্ডেল: সেলাররা পুরোপুরি কন্ট্রোলে। দ্বিতীয় ক্যান্ডেল: সেলিং প্রেশার কমে যায় এবং মার্কেট সিদ্ধান্তহীনতায় ভোগে। তৃতীয় ক্যান্ডেল: বায়াররা প্রবল বেগে মার্কেট দখল করে এবং প্রথম ক্যান্ডেলের অন্তত অর্ধেক বা তার বেশি বডিতে প্রাইস তুলে দেয়।',
    },
    howToTrade: {
      en: "Look for this 3-candle combo at Support. The third candle must close at least halfway up the first red candle. Entry: Buy on the break of the third candle's high. Stop Loss: Below the lowest point of the entire pattern.",
      bn: 'সাপোর্টে এই ৩-ক্যান্ডেলের কম্বিনেশন খুঁজবেন। তৃতীয় সবুজ ক্যান্ডেলটি অবশ্যই প্রথম লাল ক্যান্ডেলের অন্তত অর্ধেক পার হতে হবে। এন্ট্রি: তৃতীয় ক্যান্ডেলের হাই ব্রেক করলে বাই। স্টপ লস: পুরো প্যাটার্নের সবচেয়ে নিচের লেভেলে।',
    },
    candles: [
      { color: 'bear', bodyH: 'h-16', topW: 'h-2', botW: 'h-2', offset: 'mt-2' },
      { color: 'neutral', bodyH: 'h-2', topW: 'h-4', botW: 'h-4', offset: 'mt-20' },
      { color: 'bull', bodyH: 'h-14', topW: 'h-3', botW: 'h-2', offset: 'mt-6' },
    ],
  },
  {
    id: 'evening-star',
    type: 'bearish',
    group: 'three-candle',
    level: 'essential',
    name: {
      en: 'Evening Star',
      bn: 'ইভনিং স্টার',
    },
    desc: {
      en: 'A 3-candle bearish reversal pattern: a long bullish candle, a small indecision candle, and a strong bearish expansion candle.',
      bn: 'একটি ৩-ক্যান্ডেল বিয়ারিশ রিভার্সাল প্যাটার্ন: একটি লম্বা সবুজ ক্যান্ডেল, একটি ছোট ক্যান্ডেল এবং শেষে একটি স্ট্রং লাল ক্যান্ডেল।',
    },
    psychology: {
      en: 'Bulls drive price up on Candle 1. On Candle 2, momentum stalls completely. On Candle 3, sellers take control aggressively, driving price down past the 50% midpoint of the first candle.',
      bn: 'বায়াররা প্রথম ক্যান্ডেলে মার্কেট উপরে নেয়, দ্বিতীয় ক্যান্ডেলে গতি থেমে যায় এবং তৃতীয় ক্যান্ডেলে সেলাররা বিপুল শক্তিতে প্রবেশ করে প্রথম ক্যান্ডেলের ৫০% এর বেশি নিচে ক্লোজ করায়।',
    },
    howToTrade: {
      en: 'Trade at Key Resistance. Entry: Sell on the close of Candle 3 or on a 50% retracement. Stop Loss: Above the high of the middle star candle.',
      bn: 'রেজিস্ট্যান্স লেভেলে এটি খুঁজবেন। এন্ট্রি: তৃতীয় ক্যান্ডেল ক্লোজ হলে বা ৫০% রিটেস্টে সেল। স্টপ লস: মাঝের স্টার ক্যান্ডেলের হাই এর উপরে।',
    },
    candles: [
      { color: 'bull', bodyH: 'h-14', topW: 'h-3', botW: 'h-2', offset: 'mt-6' },
      { color: 'neutral', bodyH: 'h-2', topW: 'h-4', botW: 'h-4', offset: 'mt-2' },
      { color: 'bear', bodyH: 'h-16', topW: 'h-2', botW: 'h-2', offset: 'mt-6' },
    ],
  },
  {
    id: 'three-white-soldiers',
    type: 'bullish',
    group: 'three-candle',
    level: 'intermediate',
    name: {
      en: 'Three White Soldiers',
      bn: 'থ্রি হোয়াইট সোলজার্স',
    },
    desc: {
      en: 'A powerful 3-candle bullish pattern with consecutive long green candles closing near their session highs.',
      bn: '৩টি শক্তিশালী দীর্ঘ বুলিশ ক্যান্ডেলের সমন্বয়ে গঠিত প্যাটার্ন যা শক্তিশালী আপট্রেন্ড বা রিভার্সাল নির্দেশ করে।',
    },
    psychology: {
      en: 'Strong buyer dominance. Three progressive green bars opening inside prior bodies and closing near the highs show relentless buying pressure with very little selling.',
      bn: 'বায়ারদের শক্তিশালী আধিপত্য। প্রতিটি ক্যান্ডেল পূর্ববর্তী ক্যান্ডেলের বডিতে ওপেন হয়ে নতুন হাই তৈরি করে ক্লোজ হয়, যা অবিরাম বাইং চাপ ও খুব কম সেলিং নির্দেশ করে।',
    },
    howToTrade: {
      en: 'Avoid FOMO at the top. Entry: Wait for a shallow pullback to the 50% retracement of Candle 3 or a break of its high. Stop Loss: Below Candle 2 low. If the candles show long upper wicks, buyers may be exhausted: skip it.',
      bn: 'শীর্ষে ফোমো এড়ান। এন্ট্রি: ৩ নম্বর ক্যান্ডেলের ৫০% পুলব্যাকে বা তার হাই ব্রেক হলে বাই দিন। স্টপ লস: ২ নম্বর ক্যান্ডেলের নিচে। ক্যান্ডেলগুলোতে লম্বা উপরের উইক থাকলে বায়াররা ক্লান্ত হতে পারে: তখন বাদ দিন।',
    },
    candles: [
      { color: 'bull', bodyH: 'h-10', topW: 'h-2', botW: 'h-2', offset: 'mt-14' },
      { color: 'bull', bodyH: 'h-12', topW: 'h-2', botW: 'h-2', offset: 'mt-8' },
      { color: 'bull', bodyH: 'h-14', topW: 'h-2', botW: 'h-2', offset: 'mt-2' },
    ],
  },
  {
    id: 'three-black-crows',
    type: 'bearish',
    group: 'three-candle',
    level: 'intermediate',
    name: {
      en: 'Three Black Crows',
      bn: 'থ্রি ব্ল্যাক ক্রোজ',
    },
    desc: {
      en: 'A powerful 3-candle bearish reversal pattern with consecutive long red candles closing near their session lows.',
      bn: '৩টি শক্তিশালী দীর্ঘ বিয়ারিশ ক্যান্ডেলের সমন্বয়ে গঠিত প্যাটার্ন যা শক্তিশালী ডাউনট্রেন্ড বা রিভার্সাল নির্দেশ করে।',
    },
    psychology: {
      en: 'Complete seller dominance. Three progressive red bars closing near their lowest ticks show an absence of buyers and aggressive selling.',
      bn: 'সেলারদের চরম আধিপত্য। পরপর ৩টি দীর্ঘ লাল ক্যান্ডেল যা পূর্ববর্তী ক্যান্ডেলের বডির ভেতর শুরু হয়ে নতুন লো তৈরি করে ক্লোজ হয়, যা বায়ারদের অনুপস্থিতি ও আগ্রাসী সেলিং নির্দেশ করে।',
    },
    howToTrade: {
      en: 'Entry: Sell the first shallow pullback to the 50% midpoint of Candle 3. Stop Loss: Above Candle 2 high. If it appears after a long fall into support, the move may already be exhausted.',
      bn: 'এন্ট্রি: ৩ নম্বর ক্যান্ডেলের ৫০% পুলব্যাকে রিটেস্টে সেল দিন। স্টপ লস: ২ নম্বর ক্যান্ডেলের হাই এর উপরে। দীর্ঘ পতনের পর সাপোর্টের কাছে এটি এলে মুভ ইতিমধ্যে ক্লান্ত হতে পারে।',
    },
    candles: [
      { color: 'bear', bodyH: 'h-14', topW: 'h-2', botW: 'h-2', offset: 'mt-2' },
      { color: 'bear', bodyH: 'h-12', topW: 'h-2', botW: 'h-2', offset: 'mt-8' },
      { color: 'bear', bodyH: 'h-10', topW: 'h-2', botW: 'h-2', offset: 'mt-14' },
    ],
  },
  {
    id: 'three-inside-up',
    type: 'bullish',
    group: 'three-candle',
    level: 'advanced',
    name: {
      en: 'Three Inside Up',
      bn: 'থ্রি ইনসাইড আপ',
    },
    desc: {
      en: 'A 3-candle bullish confirmation of the Bullish Harami: a Harami followed by a third green candle that closes above the open of the first red candle.',
      bn: 'বুলিশ হারামির ৩ ক্যান্ডেলের কনফার্মেশন: একটি হারামির পর তৃতীয় সবুজ ক্যান্ডেল, যা প্রথম লাল ক্যান্ডেলের ওপেনের উপরে ক্লোজ হয়।',
    },
    psychology: {
      en: 'The Harami shows selling slowing down, and the third candle proves buyers followed through by closing above the top of the first red body. The extra confirmation filters out weak Haramis.',
      bn: 'হারামি সেলিং কমছে দেখায়, আর তৃতীয় ক্যান্ডেল প্রথম লাল বডির উপরের প্রান্ত ছাড়িয়ে ক্লোজ করে প্রমাণ করে বায়াররা ফলো-থ্রু করেছে। এই বাড়তি কনফার্মেশন দুর্বল হারামি ছেঁকে ফেলে।',
    },
    howToTrade: {
      en: 'Trade at support after a downtrend. Entry: Buy at the close of the third candle or on a small pullback. Stop Loss: Below the lowest point of the pattern.',
      bn: 'ডাউনট্রেন্ডের পর সাপোর্টে ট্রেড করুন। এন্ট্রি: তৃতীয় ক্যান্ডেল ক্লোজ হলে বা ছোট পুলব্যাকে বাই। স্টপ লস: পুরো প্যাটার্নের সবচেয়ে নিচের লেভেলের নিচে।',
    },
    candles: [
      { color: 'bear', bodyH: 'h-16', topW: 'h-2', botW: 'h-2', offset: 'mt-10' },
      { color: 'bull', bodyH: 'h-6', topW: 'h-2', botW: 'h-2', offset: 'mt-14' },
      { color: 'bull', bodyH: 'h-8', topW: 'h-2', botW: 'h-2', offset: 'mt-6' },
    ],
  },
  {
    id: 'three-inside-down',
    type: 'bearish',
    group: 'three-candle',
    level: 'advanced',
    name: {
      en: 'Three Inside Down',
      bn: 'থ্রি ইনসাইড ডাউন',
    },
    desc: {
      en: 'A 3-candle bearish confirmation of the Bearish Harami: a Harami followed by a third red candle that closes below the open of the first green candle.',
      bn: 'বিয়ারিশ হারামির ৩ ক্যান্ডেলের কনফার্মেশন: একটি হারামির পর তৃতীয় লাল ক্যান্ডেল, যা প্রথম সবুজ ক্যান্ডেলের ওপেনের নিচে ক্লোজ হয়।',
    },
    psychology: {
      en: 'The Harami shows buying slowing down, and the third candle proves sellers followed through by closing below the bottom of the first green body. The extra confirmation filters out weak Haramis.',
      bn: 'হারামি বাইং কমছে দেখায়, আর তৃতীয় ক্যান্ডেল প্রথম সবুজ বডির নিচের প্রান্ত ছাড়িয়ে ক্লোজ করে প্রমাণ করে সেলাররা ফলো-থ্রু করেছে। এই বাড়তি কনফার্মেশন দুর্বল হারামি ছেঁকে ফেলে।',
    },
    howToTrade: {
      en: 'Trade at resistance after an uptrend. Entry: Sell at the close of the third candle or on a small pullback. Stop Loss: Above the highest point of the pattern.',
      bn: 'আপট্রেন্ডের পর রেজিস্ট্যান্সে ট্রেড করুন। এন্ট্রি: তৃতীয় ক্যান্ডেল ক্লোজ হলে বা ছোট পুলব্যাকে সেল। স্টপ লস: পুরো প্যাটার্নের সবচেয়ে উপরের লেভেলের উপরে।',
    },
    candles: [
      { color: 'bull', bodyH: 'h-16', topW: 'h-2', botW: 'h-2', offset: 'mt-6' },
      { color: 'bear', bodyH: 'h-6', topW: 'h-2', botW: 'h-2', offset: 'mt-8' },
      { color: 'bear', bodyH: 'h-10', topW: 'h-2', botW: 'h-2', offset: 'mt-14' },
    ],
  },

  // ═══════════════════ GROUP 6: CONTINUATION ═══════════════════
  {
    id: 'rising-three-methods',
    type: 'bullish',
    group: 'continuation',
    level: 'advanced',
    name: {
      en: 'Rising Three Methods',
      bn: 'রাইজিং থ্রি মেথডস',
    },
    desc: {
      en: 'A 5-candle bullish continuation: a long green candle, three small pullback candles that stay inside its range, then another strong green candle closing above the first high.',
      bn: '৫ ক্যান্ডেলের বুলিশ কন্টিনিউয়েশন: একটি লম্বা সবুজ ক্যান্ডেল, এর রেঞ্জের ভেতরে থাকা তিনটি ছোট পুলব্যাক ক্যান্ডেল, তারপর আরেকটি শক্তিশালী সবুজ ক্যান্ডেল যা প্রথমটির হাই ছাড়িয়ে ক্লোজ হয়।',
    },
    psychology: {
      en: 'The pause is only profit-taking, not a reversal: the small candles never break the range of the first candle. When buyers return with a strong candle, the uptrend resumes.',
      bn: 'এই বিরতি শুধু প্রফিট-টেকিং, রিভার্সাল নয়: ছোট ক্যান্ডেলগুলো প্রথম ক্যান্ডেলের রেঞ্জ ভাঙে না। বায়াররা শক্তিশালী ক্যান্ডেল নিয়ে ফিরলে আপট্রেন্ড আবার শুরু হয়।',
    },
    howToTrade: {
      en: 'Use only inside an established uptrend. Entry: Buy at the close of the fifth candle or on the break of its high. Stop Loss: Below the low of the three small candles (the first candle low is a wider option). If any small candle closes below the first candle low, the pattern is invalid.',
      bn: 'শুধু প্রতিষ্ঠিত আপট্রেন্ডের ভেতরে ব্যবহার করুন। এন্ট্রি: পঞ্চম ক্যান্ডেল ক্লোজ হলে বা তার হাই ব্রেক হলে বাই। স্টপ লস: তিনটি ছোট ক্যান্ডেলের লো এর নিচে (বড় স্টপের জন্য প্রথম ক্যান্ডেলের লো)। কোনো ছোট ক্যান্ডেল প্রথম ক্যান্ডেলের লো এর নিচে ক্লোজ হলে প্যাটার্ন বাতিল।',
    },
    candles: [
      { color: 'bull', bodyH: 'h-14', topW: 'h-2', botW: 'h-2', offset: 'mt-10' },
      { color: 'bear', bodyH: 'h-4', topW: 'h-2', botW: 'h-2', offset: 'mt-10' },
      { color: 'bear', bodyH: 'h-4', topW: 'h-2', botW: 'h-2', offset: 'mt-12' },
      { color: 'bear', bodyH: 'h-4', topW: 'h-2', botW: 'h-2', offset: 'mt-14' },
      { color: 'bull', bodyH: 'h-14', topW: 'h-2', botW: 'h-2', offset: 'mt-4' },
    ],
  },
  {
    id: 'falling-three-methods',
    type: 'bearish',
    group: 'continuation',
    level: 'advanced',
    name: {
      en: 'Falling Three Methods',
      bn: 'ফলিং থ্রি মেথডস',
    },
    desc: {
      en: 'A 5-candle bearish continuation: a long red candle, three small pullback candles that stay inside its range, then another strong red candle closing below the first low.',
      bn: '৫ ক্যান্ডেলের বিয়ারিশ কন্টিনিউয়েশন: একটি লম্বা লাল ক্যান্ডেল, এর রেঞ্জের ভেতরে থাকা তিনটি ছোট পুলব্যাক ক্যান্ডেল, তারপর আরেকটি শক্তিশালী লাল ক্যান্ডেল যা প্রথমটির লো ছাড়িয়ে ক্লোজ হয়।',
    },
    psychology: {
      en: 'The bounce is only a weak relief rally, not a reversal: the small candles never break the range of the first candle. When sellers return with a strong candle, the downtrend resumes.',
      bn: 'এই বাউন্স শুধু দুর্বল রিলিফ র‍্যালি, রিভার্সাল নয়: ছোট ক্যান্ডেলগুলো প্রথম ক্যান্ডেলের রেঞ্জ ভাঙে না। সেলাররা শক্তিশালী ক্যান্ডেল নিয়ে ফিরলে ডাউনট্রেন্ড আবার শুরু হয়।',
    },
    howToTrade: {
      en: 'Use only inside an established downtrend. Entry: Sell at the close of the fifth candle or on the break of its low. Stop Loss: Above the high of the three small candles (the first candle high is a wider option). If any small candle closes above the first candle high, the pattern is invalid.',
      bn: 'শুধু প্রতিষ্ঠিত ডাউনট্রেন্ডের ভেতরে ব্যবহার করুন। এন্ট্রি: পঞ্চম ক্যান্ডেল ক্লোজ হলে বা তার লো ব্রেক হলে সেল। স্টপ লস: তিনটি ছোট ক্যান্ডেলের হাই এর উপরে (বড় স্টপের জন্য প্রথম ক্যান্ডেলের হাই)। কোনো ছোট ক্যান্ডেল প্রথম ক্যান্ডেলের হাই এর উপরে ক্লোজ হলে প্যাটার্ন বাতিল।',
    },
    candles: [
      { color: 'bear', bodyH: 'h-14', topW: 'h-2', botW: 'h-2', offset: 'mt-6' },
      { color: 'bull', bodyH: 'h-4', topW: 'h-2', botW: 'h-2', offset: 'mt-14' },
      { color: 'bull', bodyH: 'h-4', topW: 'h-2', botW: 'h-2', offset: 'mt-12' },
      { color: 'bull', bodyH: 'h-4', topW: 'h-2', botW: 'h-2', offset: 'mt-10' },
      { color: 'bear', bodyH: 'h-14', topW: 'h-2', botW: 'h-2', offset: 'mt-12' },
    ],
  },
];
