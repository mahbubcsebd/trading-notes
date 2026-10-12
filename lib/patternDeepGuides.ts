/**
 * patternDeepGuides.ts
 *
 * Bearish Engulfing master guide: reviewed, corrected and re-ordered as a learning sequence.
 *
 * Section order (read top to bottom, this is the lesson flow):
 *  1. Identity        id, name, tagline, badge, meta
 *  2. Quick facts     stats
 *  3. Summary
 *  4. Anatomy         strict identification rules
 *  5. Variations      reversal / continuation / outside bar / weak versions
 *  6. Psychology      why it happens (one common interpretation)
 *  7. Context         high-probability vs low-probability locations
 *  8. Confirmation & invalidation
 *  9. Execution       3 entry strategies
 * 10. Chart walkthrough (with chart data for Chart Lab / CandleChart)
 * 11. Trade management
 * 12. Position sizing (gold worked example)
 * 13. Pro tips
 * 14. Common mistakes
 * 15. Pre-trade checklist
 * 16. Backtest template
 * 17. FAQ
 * 18. Quiz
 * 19. Related patterns, sources, disclaimer
 *
 * NOTE: If PatternDeepGuide is already defined elsewhere in your project,
 * delete the types below and import yours, then add the new optional fields to it.
 * Every NEW field is optional, so existing UI keeps compiling.
 */

export type Localized = { en: string; bn: string };

export interface PatternDeepGuide {
  id: string;
  name: Localized;
  tagline: Localized;
  badge: Localized;
  meta?: {
    level: 'beginner' | 'intermediate' | 'advanced';
    status: 'draft' | 'in-progress' | 'done';
    updated: string;
    module: string;
    chartId?: string;
  };
  stats: {
    category: Localized;
    winrate: Localized;
    bestTimeframes: string[];
    riskReward: string;
    maxRiskPerTrade: string;
    bestLocation: Localized;
  };
  summary: Localized;
  anatomy: {
    title: Localized;
    desc: Localized;
    rules: { title: Localized; detail: Localized; highlight?: boolean }[];
  };
  variations?: {
    title: Localized;
    desc: Localized;
    quality: 'high' | 'medium' | 'low';
  }[];
  psychology: {
    title: Localized;
    subtitle: Localized;
    note?: Localized;
    phases: {
      step: number;
      title: Localized;
      desc: Localized;
      role: Localized;
    }[];
  };
  probabilityMatrix: {
    title: Localized;
    highProbability: { factor: Localized; explanation: Localized }[];
    lowProbability: { factor: Localized; explanation: Localized }[];
  };
  confirmation?: {
    title: Localized;
    confirmations: { title: Localized; detail: Localized }[];
    invalidation: Localized;
    timeStop: Localized;
  };
  executionStrategies: {
    type: 'conservative' | 'aggressive' | 'sniper';
    title: Localized;
    subtitle: Localized;
    recommended: boolean;
    entry: Localized;
    stopLoss: Localized;
    takeProfit: Localized;
    pros: Localized;
    cons: Localized;
  }[];
  chartWalkthrough: {
    title: Localized;
    symbol: string;
    timeframe: string;
    illustrative?: boolean;
    note?: Localized;
    points: {
      step: string;
      label: Localized;
      description: Localized;
      focusIndex?: number;
    }[];
    chartData?: {
      mode: 'synthetic';
      candles: { i: number; o: number; h: number; l: number; c: number }[];
      annotations: Array<
        | { type: 'hline'; price: number; label: string; color: string; style?: 'solid' | 'dashed' }
        | { type: 'zone'; from: { i: number; price: number }; to: { i: number; price: number }; label: string; color: string }
        | { type: 'marker'; i: number; position: 'aboveBar' | 'belowBar'; shape: 'arrowUp' | 'arrowDown' | 'circle'; text: string }
      >;
    };
  };
  tradeManagement?: {
    title: Localized;
    steps: { title: Localized; detail: Localized }[];
  };
  positionSizing?: {
    title: Localized;
    formula: string;
    note: Localized;
    examples: {
      label: Localized;
      account: number;
      riskPercent: number;
      stopDistance: number;
      contractSize: number;
      rawLots: number;
      usedLots: number;
      actualRisk: number;
      comment: Localized;
    }[];
  };
  proTips: { title: Localized; content: Localized }[];
  commonMistakes: { mistake: Localized; fix: Localized }[];
  checklist: { id: string; group?: Localized; text: Localized }[];
  backtestTemplate?: {
    title: Localized;
    intro: Localized;
    columns: string[];
    metrics: { name: Localized; formula: Localized }[];
    minSample: Localized;
  };
  faq?: { q: Localized; a: Localized }[];
  quiz?: {
    id: string;
    question: Localized;
    options: Localized[];
    correctIndex: number;
    explanation: Localized;
  }[];
  relatedPatterns?: string[];
  sources?: { title: string; author: string; note: Localized }[];
  disclaimer?: Localized;
}

export const patternDeepGuides: Record<string, PatternDeepGuide> = {
  'bearish-engulfing': {
    // ───────────────────────────── 1. IDENTITY ─────────────────────────────
    id: 'bearish-engulfing',
    name: {
      en: 'Bearish Engulfing Pattern (Master Guide)',
      bn: 'বিয়ারিশ এনগালফিং প্যাটার্ন (মাস্টার গাইড)',
    },
    tagline: {
      en: 'A Reversal Signal at Key Resistance: How Sellers Take Control After a Failed Push Higher',
      bn: 'কী-রেজিস্ট্যান্সে রিভার্সাল সিগন্যাল: ব্যর্থ আপমুভের পর কীভাবে সেলাররা নিয়ন্ত্রণ নেয়',
    },
    badge: {
      en: 'Bearish Reversal (Context Dependent)',
      bn: 'বিয়ারিশ রিভার্সাল (লোকেশন নির্ভর)',
    },
    meta: {
      level: 'beginner',
      status: 'in-progress',
      updated: '2026-10-12',
      module: '03-candlesticks',
      chartId: 'bearish-engulfing-01',
    },

    // ───────────────────────────── 2. QUICK FACTS ─────────────────────────────
    stats: {
      category: {
        en: 'Two-Candle Reversal Pattern',
        bn: 'টু-ক্যান্ডেল রিভার্সাল প্যাটার্ন',
      },
      // Key kept as "winrate" so your existing UI does not break.
      // No universal win rate exists: it changes with market, timeframe and location.
      winrate: {
        en: 'No fixed number. Measure it yourself with the Backtest Template below (location and trend change the result a lot).',
        bn: 'কোনো নির্দিষ্ট সংখ্যা নেই। নিচের ব্যাকটেস্ট টেমপ্লেট দিয়ে নিজে মাপুন (লোকেশন ও ট্রেন্ড ফলাফল অনেক বদলে দেয়)।',
      },
      bestTimeframes: ['H1', 'H4', 'Daily'],
      riskReward: 'Target 1:2 or better (1:2.5 to 1:4 is realistic only with a tight, structure-based stop)',
      maxRiskPerTrade: '1% (never above 2%) of capital',
      bestLocation: {
        en: 'Daily/H4 Supply Zone, HTF Resistance, Range High',
        bn: 'Daily/H4 সাপ্লাই জোন, HTF রেজিস্ট্যান্স, রেঞ্জ হাই',
      },
    },

    // ───────────────────────────── 3. SUMMARY ─────────────────────────────
    summary: {
      en: 'The Bearish Engulfing is one of the most widely used price action reversal signals. It occurs when a bearish (red) candle opens at or above the close of the prior bullish (green) candle and closes below that candle\'s open, so its real body completely engulfs the previous body. It shows that buyers lost control for that period and sellers took over. It is a signal, not a guarantee: its value comes almost entirely from WHERE it forms and what the higher timeframe is doing.',
      bn: 'বিয়ারিশ এনগালফিং সবচেয়ে বহুল ব্যবহৃত প্রাইস অ্যাকশন রিভার্সাল সিগন্যালগুলোর একটি। এটি তৈরি হয় যখন একটি লাল (বিয়ারিশ) ক্যান্ডেল আগের সবুজ (বুলিশ) ক্যান্ডেলের ক্লোজের সমান বা উপরে ওপেন হয়ে আগেরটির ওপেনের নিচে ক্লোজ হয়, ফলে আগের রিয়েল বডি পুরোপুরি ঢেকে যায়। এটি দেখায় ওই সময়ে বায়াররা নিয়ন্ত্রণ হারিয়েছে এবং সেলাররা নিয়ন্ত্রণ নিয়েছে। এটি একটি সিগন্যাল, গ্যারান্টি নয়: এর মূল্য প্রায় পুরোটাই নির্ভর করে প্যাটার্নটি কোথায় তৈরি হলো এবং হায়ার টাইমফ্রেম কী বলছে তার ওপর।',
    },

    // ───────────────────────────── 4. ANATOMY ─────────────────────────────
    anatomy: {
      title: {
        en: 'Candle Anatomy & Strict Identification Rules',
        bn: 'ক্যান্ডেল অ্যানাটমি ও সনাক্তকরণের কঠোর নিয়মাবলী',
      },
      desc: {
        en: 'Do not trade every red candle after a green one. A textbook Bearish Engulfing should satisfy these 5 criteria:',
        bn: 'সবুজ ক্যান্ডেলের পর লাল ক্যান্ডেল দেখলেই ট্রেড নেওয়া যাবে না। একটি টেক্সটবুক বিয়ারিশ এনগালফিং হতে হলে এই ৫টি শর্ত পূরণ করতে হবে:',
      },
      rules: [
        {
          title: {
            en: '1. Established Preceding Move',
            bn: '১. সুস্পষ্ট পূর্ববর্তী মুভমেন্ট (Preceding Trend)',
          },
          detail: {
            en: 'Must appear after a sustained uptrend, or after a corrective pullback up into higher-timeframe resistance. A Bearish Engulfing inside sideways consolidation is mostly noise.',
            bn: 'প্যাটার্নটি অবশ্যই একটি চলমান আপট্রেন্ডের শীর্ষে অথবা হায়ার টাইমফ্রেম রেজিস্ট্যান্সে পুলব্যাকের পর তৈরি হতে হবে। সাইডওয়ে রেঞ্জের মাঝে তৈরি হওয়া এনগালফিং বেশিরভাগ সময় নয়েজ।',
          },
        },
        {
          title: {
            en: '2. Candle 1 (Bullish, Losing Momentum)',
            bn: '২. প্রথম ক্যান্ডেল (বুলিশ, মোমেন্টাম কমছে)',
          },
          detail: {
            en: 'A bullish (green) candle, ideally smaller than the ones before it, showing buyers slowing down near the top. This is typical, not mandatory: the hard rule is that Candle 2 engulfs it.',
            bn: 'একটি বুলিশ (সবুজ) ক্যান্ডেল, যা আগের ক্যান্ডেলগুলোর চেয়ে ছোট হলে ভালো, নির্দেশ করে শীর্ষে ক্রেতাদের গতি কমছে। এটি সাধারণ বৈশিষ্ট্য, বাধ্যতামূলক নয়: আসল কঠোর শর্ত হলো দ্বিতীয় ক্যান্ডেল এটিকে এনগালফ করবে।',
          },
        },
        {
          title: {
            en: '3. Candle 2 (The Engulfing Candle)',
            bn: '৩. দ্বিতীয় ক্যান্ডেল (বিয়ারিশ এনগালফিং ক্যান্ডেল)',
          },
          detail: {
            en: 'The bearish candle must open at or above the close of Candle 1 and close at or below the open of Candle 1, so its real body completely covers the body of Candle 1. In 24-hour markets like Forex and Gold there are rarely gaps, so the open is usually almost equal to the prior close. If it also covers the wicks (Outside Bar), the signal is stronger.',
            bn: 'বিয়ারিশ ক্যান্ডেলটি প্রথম ক্যান্ডেলের ক্লোজের সমান বা উপরে ওপেন হয়ে প্রথম ক্যান্ডেলের ওপেনের সমান বা নিচে ক্লোজ হতে হবে, ফলে এর রিয়েল বডি প্রথম ক্যান্ডেলের বডি পুরোপুরি ঢেকে ফেলে। ফরেক্স ও গোল্ডের মতো ২৪ ঘণ্টার মার্কেটে গ্যাপ খুব কম হয়, তাই ওপেন সাধারণত আগের ক্লোজের প্রায় সমান থাকে। ক্যান্ডেলটি আগের উইকও কভার করলে (Outside Bar) সিগন্যাল আরও শক্তিশালী হয়।',
          },
          highlight: true,
        },
        {
          title: {
            en: '4. Strong Body, Small Lower Wick',
            bn: '৪. শক্তিশালী বডি, ছোট নিচের উইক',
          },
          detail: {
            en: 'Ideally 70 to 80% of the candle range is real body, and the lower wick is small (under about 25%). A long lower wick means buyers defended the lows before the close, which weakens the bearish case.',
            bn: 'আদর্শভাবে ক্যান্ডেলের রেঞ্জের ৭০–৮০% রিয়েল বডি হবে এবং নিচের উইক ছোট হবে (প্রায় ২৫% এর কম)। নিচে লম্বা উইক মানে ক্লোজের আগে বায়াররা নিচে সাপোর্ট দিয়েছে, যা বিয়ারিশ সিগন্যালকে দুর্বল করে।',
          },
        },
        {
          title: {
            en: '5. Activity Expansion (Volume)',
            bn: '৫. অ্যাক্টিভিটি বৃদ্ধি (ভলিউম)',
          },
          detail: {
            en: 'Higher volume on Candle 2 than on the previous 3 to 5 candles suggests stronger participation. Caution: spot Forex and spot Gold have no central exchange, so MT5 and TradingView show tick volume only, which is a rough proxy. Use it as a soft hint, not proof. Gold futures (GC) volume is more reliable.',
            bn: 'দ্বিতীয় ক্যান্ডেলের ভলিউম আগের ৩–৫টি ক্যান্ডেলের চেয়ে বেশি হলে অংশগ্রহণ বেশি বোঝায়। সতর্কতা: স্পট ফরেক্স ও স্পট গোল্ডের কোনো কেন্দ্রীয় এক্সচেঞ্জ নেই, তাই MT5 ও TradingView শুধু টিক ভলিউম দেখায়, যা একটি মোটামুটি অনুমান। এটিকে প্রমাণ নয়, হালকা ইঙ্গিত হিসেবে ধরুন। গোল্ড ফিউচার্সের (GC) ভলিউম তুলনামূলক নির্ভরযোগ্য।',
          },
        },
      ],
    },

    // ───────────────────────────── 5. VARIATIONS ─────────────────────────────
    variations: [
      {
        title: {
          en: 'Classic Reversal at the Top',
          bn: 'ক্লাসিক রিভার্সাল (আপট্রেন্ডের শীর্ষে)',
        },
        desc: {
          en: 'Forms after an extended rally into a key HTF resistance or supply zone. The most common textbook use.',
          bn: 'দীর্ঘ র‍্যালির পর হায়ার টাইমফ্রেমের গুরুত্বপূর্ণ রেজিস্ট্যান্স বা সাপ্লাই জোনে তৈরি হয়। সবচেয়ে প্রচলিত টেক্সটবুক ব্যবহার।',
        },
        quality: 'high',
      },
      {
        title: {
          en: 'Trend Continuation After a Pullback',
          bn: 'পুলব্যাকের পর ট্রেন্ড কন্টিনিউয়েশন',
        },
        desc: {
          en: 'In a downtrend, price pulls back up into resistance and prints a Bearish Engulfing, then the downtrend resumes. Often one of the cleanest uses because you trade WITH the trend.',
          bn: 'ডাউনট্রেন্ডে প্রাইস পুলব্যাক করে রেজিস্ট্যান্সে উঠে বিয়ারিশ এনগালফিং দেয়, তারপর ডাউনট্রেন্ড আবার শুরু হয়। ট্রেন্ডের পক্ষে ট্রেড হওয়ায় এটি প্রায়ই সবচেয়ে পরিষ্কার ব্যবহার।',
        },
        quality: 'high',
      },
      {
        title: {
          en: 'Outside Bar Engulfing',
          bn: 'আউটসাইড বার এনগালফিং',
        },
        desc: {
          en: 'Candle 2 engulfs the body and the wicks of Candle 1 (higher high and lower low). It often includes a liquidity sweep above the previous high, which many traders treat as a stronger signal.',
          bn: 'দ্বিতীয় ক্যান্ডেল প্রথম ক্যান্ডেলের বডি ও উইক দুটোই ঢেকে ফেলে (বেশি হাই ও কম লো)। এতে প্রায়ই আগের হাইয়ের ওপর লিকুইডিটি সুইপ থাকে, যাকে অনেক ট্রেডার শক্তিশালী সিগন্যাল ধরেন।',
        },
        quality: 'high',
      },
      {
        title: {
          en: 'Small-Body Engulfing',
          bn: 'ছোট বডির এনগালফিং',
        },
        desc: {
          en: 'Technically engulfs, but the candles are tiny compared to the recent average. Weak conviction, easily reversed.',
          bn: 'প্রযুক্তিগতভাবে এনগালফ করে, কিন্তু সাম্প্রতিক গড়ের তুলনায় ক্যান্ডেলগুলো খুব ছোট। কনভিকশন দুর্বল, সহজেই উল্টে যায়।',
        },
        quality: 'low',
      },
      {
        title: {
          en: 'Engulfing Inside a Range',
          bn: 'রেঞ্জের মাঝখানে এনগালফিং',
        },
        desc: {
          en: 'No key level nearby and no clear trend. Skip it.',
          bn: 'কাছাকাছি কোনো কী-লেভেল নেই, ট্রেন্ডও পরিষ্কার নয়। এটি এড়িয়ে যান।',
        },
        quality: 'low',
      },
    ],

    // ───────────────────────────── 6. PSYCHOLOGY ─────────────────────────────
    psychology: {
      title: {
        en: 'Market Psychology: Why the Pattern Appears',
        bn: 'মার্কেট সাইকোলজি: প্যাটার্নটি কেন তৈরি হয়',
      },
      subtitle: {
        en: 'Understanding who may be trapped and where the pressure shifts',
        bn: 'কারা ফাঁদে পড়তে পারে এবং চাপ কোথায় বদলায় তা বোঝা',
      },
      note: {
        en: 'This is one popular interpretation (Smart Money / liquidity concepts). Nobody can see real institutional orders in spot Forex, so treat the story as a mental model, not a proven fact. The pattern is traded the same way either way.',
        bn: 'এটি একটি জনপ্রিয় ব্যাখ্যা (স্মার্ট মানি / লিকুইডিটি কনসেপ্ট)। স্পট ফরেক্সে প্রকৃত প্রাতিষ্ঠানিক অর্ডার কেউ দেখতে পায় না, তাই গল্পটিকে প্রমাণিত সত্য নয়, মানসিক মডেল হিসেবে নিন। যেভাবেই ব্যাখ্যা করুন, প্যাটার্নটি একইভাবে ট্রেড হয়।',
      },
      phases: [
        {
          step: 1,
          title: {
            en: 'Phase 1: Retail FOMO & Breakout Buying',
            bn: 'ধাপ ১: রিটেইল FOMO ও ব্রেকআউট বাইং',
          },
          desc: {
            en: 'As price pushes into a known resistance, many traders see consecutive green bars and place breakout buy orders. Those buy orders give larger sellers the counterparty liquidity they need.',
            bn: 'প্রাইস যখন পরিচিত রেজিস্ট্যান্সে পৌঁছায়, অনেক ট্রেডার পরপর গ্রিন ক্যান্ডেল দেখে FOMO (Fear of Missing Out) তে ব্রেকআউট বাই অর্ডার দেয়। এই বাই অর্ডারগুলো বড় সেলারদের প্রয়োজনীয় কাউন্টারপার্টি লিকুইডিটি জোগায়।',
          },
          role: {
            en: 'Late buyers: entering near the top',
            bn: 'দেরিতে ঢোকা বায়ার: টপের কাছে এন্ট্রি',
          },
        },
        {
          step: 2,
          title: {
            en: 'Phase 2: Liquidity Sweep Above the High',
            bn: 'ধাপ ২: হাইয়ের উপরে লিকুইডিটি সুইপ',
          },
          desc: {
            en: 'Price briefly pushes just above the resistance or previous high. This triggers stop-losses of early short sellers (which are buy orders) and activates breakout buy orders, creating a pool of buy volume.',
            bn: 'প্রাইস সাময়িকভাবে রেজিস্ট্যান্স বা আগের হাইয়ের সামান্য উপরে যায়। এতে আগের শর্ট সেলারদের স্টপ লস (যা বাই অর্ডার) হিট হয় এবং ব্রেকআউট বাই অর্ডার এক্টিভেট হয়, ফলে বাই ভলিউমের একটি পুল তৈরি হয়।',
          },
          role: {
            en: 'Larger sellers: absorbing that buy liquidity',
            bn: 'বড় সেলার: ওই বাই লিকুইডিটি শোষণ করছে',
          },
        },
        {
          step: 3,
          title: {
            en: 'Phase 3: Sharp Reversal & Stop Cascade',
            bn: 'ধাপ ৩: তীব্র রিভার্সাল ও স্টপ ক্যাসকেড',
          },
          desc: {
            en: 'With sell positions filled at high prices, selling pressure dominates. Trapped longs exit and their stop-losses (sell orders) add fuel, producing the large red engulfing candle.',
            bn: 'চড়া দামে সেল পজিশন পূরণ হওয়ার পর সেলিং চাপ প্রাধান্য পায়। ফাঁদে পড়া লং ট্রেডাররা বের হয় এবং তাদের স্টপ লস (সেল অর্ডার) গতি বাড়ায়, ফলে বড় লাল এনগালফিং ক্যান্ডেল তৈরি হয়।',
          },
          role: {
            en: 'Result: sellers take control for this period',
            bn: 'ফলাফল: এই সময়ে সেলারদের নিয়ন্ত্রণ প্রতিষ্ঠিত',
          },
        },
      ],
    },

    // ───────────────────────────── 7. CONTEXT ─────────────────────────────
    probabilityMatrix: {
      title: {
        en: 'High-Probability A+ Setup vs Low-Probability Traps',
        bn: 'উচ্চ সম্ভাবনাময় A+ সেটআপ বনাম লস খাওয়ার ফাঁদসমূহ',
      },
      highProbability: [
        {
          factor: {
            en: 'Daily / H4 Major Supply Zone',
            bn: 'ডেইলি / ৪-ঘণ্টা মেজর সাপ্লাই জোন',
          },
          explanation: {
            en: 'The engulfing forms at an untested HTF supply block or key resistance level.',
            bn: 'হায়ার টাইমফ্রেমের অপরীক্ষিত সাপ্লাই জোন বা গুরুত্বপূর্ণ রেজিস্ট্যান্সে প্যাটার্নটি তৈরি হয়।',
          },
        },
        {
          factor: {
            en: 'Liquidity Sweep of Previous High',
            bn: 'আগের হাইয়ের লিকুইডিটি সুইপ',
          },
          explanation: {
            en: 'Candle 2 makes a higher high than Candle 1, then reverses and closes below the open of Candle 1.',
            bn: 'দ্বিতীয় ক্যান্ডেল প্রথম ক্যান্ডেলের হাই ছাড়িয়ে তারপর উল্টে প্রথম ক্যান্ডেলের ওপেনের নিচে ক্লোজ হয়।',
          },
        },
        {
          factor: {
            en: 'RSI / MACD Bearish Divergence',
            bn: 'RSI / MACD বিয়ারিশ ডাইভারজেন্স',
          },
          explanation: {
            en: 'Price makes an equal or higher high while RSI makes a lower high, hinting that momentum is fading.',
            bn: 'প্রাইস সমান বা নতুন হাই বানায় কিন্তু RSI নিচু হাই বানায়, যা মোমেন্টাম কমছে বলে ইঙ্গিত দেয়।',
          },
        },
        {
          factor: {
            en: 'London or New York Session Timing',
            bn: 'লন্ডন অথবা নিউ ইয়র্ক সেশন',
          },
          explanation: {
            en: 'Formed in high-liquidity hours (roughly 07:00 to 10:00 GMT London, 13:00 to 16:00 GMT New York in winter). Daylight saving shifts these by about one hour, so check your session clock.',
            bn: 'বেশি লিকুইডিটির সময়ে (শীতকালে মোটামুটি লন্ডন ০৭:০০–১০:০০ GMT, নিউ ইয়র্ক ১৩:০০–১৬:০০ GMT) গঠিত হলে। ডেইলাইট সেভিংয়ে এগুলো প্রায় এক ঘণ্টা সরে যায়, তাই সেশন ক্লক মিলিয়ে নিন।',
          },
        },
        {
          factor: {
            en: 'Higher Timeframe Bearish Trend',
            bn: 'হায়ার টাইমফ্রেমে ডাউনট্রেন্ড',
          },
          explanation: {
            en: 'The engulfing is a trend-continuation entry after a pullback into resistance, so you trade with the bigger flow.',
            bn: 'রেজিস্ট্যান্সে পুলব্যাকের পর এনগালফিং ট্রেন্ড কন্টিনিউয়েশন এন্ট্রি হয়, অর্থাৎ বড় প্রবাহের পক্ষে ট্রেড করা হয়।',
          },
        },
      ],
      lowProbability: [
        {
          factor: {
            en: "Middle of a Consolidating Range (No Man's Land)",
            bn: 'কনসলিডেশন রেঞ্জের মাঝে (No Man\'s Land)',
          },
          explanation: {
            en: 'Inside sideways chop with no key level nearby, the pattern gives little or no edge.',
            bn: 'কাছাকাছি কোনো কী-লেভেল ছাড়া সাইডওয়ে রেঞ্জের মাঝে প্যাটার্নটি প্রায় কোনো এজ দেয় না।',
          },
        },
        {
          factor: {
            en: 'Fighting a Strong Bullish Trend',
            bn: 'স্ট্রং বুলিশ ট্রেন্ডের বিরুদ্ধে',
          },
          explanation: {
            en: 'Picking a top against relentless buying without any HTF resistance is dangerous.',
            bn: 'হায়ার টাইমফ্রেম রেজিস্ট্যান্স ছাড়া প্রচণ্ড বুলিশ মোমেন্টামের বিরুদ্ধে টপ ধরার চেষ্টা বিপজ্জনক।',
          },
        },
        {
          factor: {
            en: 'Long Lower Wick on the Engulfing Candle',
            bn: 'এনগালফিং ক্যান্ডেলে লম্বা নিচের উইক',
          },
          explanation: {
            en: 'A long lower wick means buyers absorbed the sell-off before the bar closed.',
            bn: 'লম্বা নিচের উইক মানে ক্যান্ডেল ক্লোজের আগেই বায়াররা সেল-অফ শোষণ করেছে।',
          },
        },
        {
          factor: {
            en: 'Right Before High-Impact News (CPI / NFP / FOMC)',
            bn: 'হাই-ইমপ্যাক্ট নিউজের ঠিক আগে (CPI / NFP / FOMC)',
          },
          explanation: {
            en: 'Spreads widen and slippage can wreck a clean technical setup.',
            bn: 'স্প্রেড বেড়ে যায় ও স্লিপেজ হয়, যা পরিষ্কার টেকনিক্যাল সেটআপও নষ্ট করে দিতে পারে।',
          },
        },
      ],
    },

    // ───────────────────────────── 8. CONFIRMATION & INVALIDATION ─────────────────────────────
    confirmation: {
      title: {
        en: 'Confirmation, Invalidation & Time Stop',
        bn: 'কনফার্মেশন, ইনভ্যালিডেশন ও টাইম স্টপ',
      },
      confirmations: [
        {
          title: { en: 'Follow-through candle', bn: 'ফলো-থ্রু ক্যান্ডেল' },
          detail: {
            en: 'The next candle closes below the midpoint (or the low) of the engulfing candle. This costs a worse entry but filters weak signals.',
            bn: 'পরের ক্যান্ডেল এনগালফিং ক্যান্ডেলের মিডপয়েন্ট (বা লো) এর নিচে ক্লোজ হয়। এতে এন্ট্রি কিছুটা খারাপ হয়, কিন্তু দুর্বল সিগন্যাল ছাঁটাই হয়।',
          },
        },
        {
          title: { en: 'Lower-timeframe structure break', bn: 'লোয়ার টাইমফ্রেমে স্ট্রাকচার ব্রেক' },
          detail: {
            en: 'On M15 or M5, price breaks the last higher low (CHoCH / BOS). See Strategy C.',
            bn: 'M15 বা M5 তে প্রাইস শেষ হায়ার লো ভাঙে (CHoCH / BOS)। কৌশল ৩ দেখুন।',
          },
        },
        {
          title: { en: 'Rejection on the retest', bn: 'রিটেস্টে রিজেকশন' },
          detail: {
            en: 'Price retraces into the 50% area and prints a bearish rejection (upper wick, red close) instead of pushing through.',
            bn: 'প্রাইস ৫০% এলাকায় ফিরে এসে ভেদ করার বদলে বিয়ারিশ রিজেকশন (উপরের উইক, লাল ক্লোজ) দেয়।',
          },
        },
      ],
      invalidation: {
        en: 'A candle BODY closing above the high of the engulfing candle invalidates the setup. Exit and do not re-enter on hope. The stop-loss is placed just above that high for this reason.',
        bn: 'এনগালফিং ক্যান্ডেলের হাইয়ের উপরে কোনো ক্যান্ডেলের বডি ক্লোজ হলে সেটআপ বাতিল। বের হয়ে যান, আশা করে আবার ঢুকবেন না। এ কারণেই স্টপ লস ওই হাইয়ের ঠিক উপরে বসানো হয়।',
      },
      timeStop: {
        en: 'If price goes nowhere for about 5 to 6 candles on your trading timeframe after entry, the momentum thesis is weak. Consider closing at breakeven or a small loss.',
        bn: 'এন্ট্রির পর আপনার ট্রেডিং টাইমফ্রেমে প্রায় ৫–৬টি ক্যান্ডেল ধরে প্রাইস কোথাও না গেলে মোমেন্টাম থিসিস দুর্বল। ব্রেক-ইভেন বা ছোট লসে বের হওয়ার কথা ভাবুন।',
      },
    },

    // ───────────────────────────── 9. EXECUTION ─────────────────────────────
    executionStrategies: [
      {
        type: 'conservative',
        title: {
          en: 'Strategy A: 50% Retest Entry (Best Risk-to-Reward)',
          bn: 'কৌশল ১: ৫০% রিটেস্ট এন্ট্রি (সেরা রিস্ক-টু-রিওয়ার্ড)',
        },
        subtitle: {
          en: 'Tighter stop and better R:R, but you may miss the trade',
          bn: 'ছোট স্টপ ও ভালো R:R, কিন্তু ট্রেড মিস হতে পারে',
        },
        recommended: true,
        entry: {
          en: 'Draw a Fibonacci retracement from the engulfing candle low to its high. Place a Sell Limit at the 50% level (61.8% is the deeper option). If price never retraces, skip the trade. Do not chase.',
          bn: 'এনগালফিং ক্যান্ডেলের লো থেকে হাই পর্যন্ত ফিবোনাচি টানুন। ৫০% লেভেলে Sell Limit বসান (গভীর অপশন ৬১.৮%)। প্রাইস রিট্রেস না করলে ট্রেড বাদ দিন, তাড়া করবেন না।',
        },
        stopLoss: {
          en: 'Just above the engulfing candle high with a buffer: about $1 to $2 on Gold, 5 to 10 pips on Forex pairs (also cover the spread).',
          bn: 'এনগালফিং ক্যান্ডেলের হাইয়ের ঠিক উপরে বাফার সহ: গোল্ডে প্রায় $১–$২, ফরেক্স পেয়ারে ৫–১০ পিপ্স (স্প্রেডও হিসাবে ধরুন)।',
        },
        takeProfit: {
          en: 'TP1: nearest swing low or support (close part of the position, move stop to breakeven). TP2: the next HTF demand level.',
          bn: 'TP1: নিকটতম সুইং লো বা সাপোর্ট (পজিশনের একাংশ বন্ধ করুন, স্টপ ব্রেক-ইভেনে নিন)। TP2: পরবর্তী হায়ার টাইমফ্রেম ডিমান্ড লেভেল।',
        },
        pros: {
          en: 'For the same 1% risk, a tighter stop allows a larger position size and a better risk-to-reward ratio.',
          bn: 'একই ১% ঝুঁকিতে ছোট স্টপ মানে বড় পজিশন সাইজ ও ভালো রিস্ক-টু-রিওয়ার্ড।',
        },
        cons: {
          en: 'In a fast drop, price may never retrace to 50% and you miss the move.',
          bn: 'দ্রুত পতনে প্রাইস ৫০% এ ফিরেই না আসতে পারে, তখন মুভ মিস হয়।',
        },
      },
      {
        type: 'aggressive',
        title: {
          en: 'Strategy B: Market Entry on Candle Close',
          bn: 'কৌশল ২: ক্যান্ডেল ক্লোজে মার্কেট এন্ট্রি',
        },
        subtitle: {
          en: 'You will not miss a runaway move, but the stop is wider',
          bn: 'রানঅ্যাওয়ে মুভ মিস হবে না, কিন্তু স্টপ বড়',
        },
        recommended: false,
        entry: {
          en: 'Execute a Market Sell right after the engulfing candle closes.',
          bn: 'এনগালফিং ক্যান্ডেল ক্লোজ হওয়ার পরপরই মার্কেট সেল নিন।',
        },
        stopLoss: {
          en: 'Just above the engulfing candle high with the same buffer as Strategy A.',
          bn: 'এনগালফিং ক্যান্ডেলের হাইয়ের ঠিক উপরে, কৌশল ১ এর মতো বাফার সহ।',
        },
        takeProfit: {
          en: 'At least 1:2 risk-to-reward, or the next support level, whichever comes first.',
          bn: 'কমপক্ষে ১:২ রিস্ক-টু-রিওয়ার্ড অথবা পরবর্তী সাপোর্ট লেভেল, যেটি আগে আসে।',
        },
        pros: {
          en: 'The trade is almost guaranteed to fill.',
          bn: 'ট্রেড প্রায় নিশ্চিতভাবে ফিল হয়।',
        },
        cons: {
          en: 'When the candle is large, the stop is large, which cuts R:R and forces a smaller position size.',
          bn: 'ক্যান্ডেল বড় হলে স্টপ বড় হয়, ফলে R:R কমে যায় এবং পজিশন সাইজ ছোট করতে হয়।',
        },
      },
      {
        type: 'sniper',
        title: {
          en: 'Strategy C: Lower-Timeframe Structure Break (CHoCH)',
          bn: 'কৌশল ৩: লোয়ার টাইমফ্রেম স্ট্রাকচার ব্রেক (CHoCH)',
        },
        subtitle: {
          en: 'Spot the pattern on H4, execute on M15 for a tighter stop',
          bn: 'H4 এ প্যাটার্ন দেখে M15 এ এক্সিকিউশন, ছোট স্টপের জন্য',
        },
        recommended: true,
        entry: {
          en: 'When H4 prints the Bearish Engulfing at a key level, drop to M15. Wait for a Change of Character (break of the last higher low), then sell on the retest of the M15 bearish order block or breakdown level.',
          bn: 'H4 এ কী-লেভেলে বিয়ারিশ এনগালফিং হলে M15 এ যান। Change of Character (শেষ হায়ার লো ভাঙা) এর জন্য অপেক্ষা করুন, তারপর M15 বিয়ারিশ অর্ডার ব্লক বা ব্রেকডাউন লেভেলের রিটেস্টে সেল দিন।',
        },
        stopLoss: {
          en: 'Above the M15 swing high that formed before the break. On Gold this is often about $3 to $6, but check the current M15 ATR instead of using a fixed number.',
          bn: 'ব্রেকের আগে তৈরি M15 সুইং হাইয়ের উপরে। গোল্ডে এটি প্রায়ই $৩–$৬ হয়, তবে নির্দিষ্ট সংখ্যা না ধরে বর্তমান M15 ATR দেখে নিন।',
        },
        takeProfit: {
          en: 'Hold toward the H4 target support. Potential 1:4 or more, but the hit rate is usually lower than with a wider stop.',
          bn: 'H4 টার্গেট সাপোর্ট পর্যন্ত হোল্ড করুন। ১:৪ বা তার বেশি সম্ভব, তবে ছোট স্টপে হিট রেট সাধারণত কম থাকে।',
        },
        pros: {
          en: 'Small stop, clear invalidation, and a confirmation step before you risk money.',
          bn: 'ছোট স্টপ, পরিষ্কার ইনভ্যালিডেশন এবং টাকা ঝুঁকিতে ফেলার আগে একটি কনফার্মেশন ধাপ।',
        },
        cons: {
          en: 'Needs multi-timeframe skill and screen time. Tight stops get hit more often by normal noise.',
          bn: 'মাল্টি-টাইমফ্রেম দক্ষতা ও স্ক্রিন টাইম লাগে। ছোট স্টপ স্বাভাবিক নয়েজে বেশি হিট হয়।',
        },
      },
    ],

    // ───────────────────────────── 10. CHART WALKTHROUGH ─────────────────────────────
    chartWalkthrough: {
      title: {
        en: 'Annotated Chart Case Study: XAUUSD H4 (Illustrative Example)',
        bn: 'চার্ট কেস স্টাডি: XAUUSD H4 (উদাহরণমূলক)',
      },
      symbol: 'XAUUSD',
      timeframe: 'H4',
      illustrative: true,
      note: {
        en: 'This is a constructed teaching example with hypothetical prices, not a real historical trade. Replace it with your own annotated screenshot once you have a real example. Pip note: many brokers treat 1 pip on Gold as $0.10, but this varies, so this guide quotes dollars.',
        bn: 'এটি কাল্পনিক দামের একটি শিক্ষামূলক উদাহরণ, প্রকৃত ঐতিহাসিক ট্রেড নয়। বাস্তব উদাহরণ পেলে নিজের অ্যানোটেটেড স্ক্রিনশট দিয়ে এটি বদলে নিন। পিপ নোট: অনেক ব্রোকারে গোল্ডে ১ পিপ = $০.১০, কিন্তু এটি ভিন্ন হতে পারে, তাই এই গাইডে ডলারে বলা হয়েছে।',
      },
      points: [
        {
          step: '1',
          label: {
            en: 'Approach to Supply Zone (about 2330)',
            bn: 'সাপ্লাই জোনে আগমন (প্রায় ২৩৩০)',
          },
          description: {
            en: 'Gold rallies into an H4 supply zone ($2330 to $2335). The last green candle before the signal has a smaller body than the ones before it, showing buyers slowing down.',
            bn: 'গোল্ড H4 সাপ্লাই জোনে ($২৩৩০–$২৩৩৫) র‍্যালি করে পৌঁছায়। সিগন্যালের ঠিক আগের সবুজ ক্যান্ডেলের বডি আগেরগুলোর চেয়ে ছোট, যা দেখায় বায়ারদের গতি কমছে।',
          },
          focusIndex: 8,
        },
        {
          step: '2',
          label: {
            en: 'Sweep & Engulfing Candle (2334 high, 2305 close)',
            bn: 'সুইপ ও এনগালফিং ক্যান্ডেল (হাই ২৩৩৪, ক্লোজ ২৩০৫)',
          },
          description: {
            en: 'The next candle spikes to $2334 above the previous high, then reverses hard and closes at $2305 near its low ($2304). It covers the full body and wicks of the prior candle, an Outside Bar Bearish Engulfing with a tiny lower wick.',
            bn: 'পরের ক্যান্ডেল আগের হাই ছাড়িয়ে $২৩৩৪ এ স্পাইক করে, তারপর জোরে উল্টে নিচের লো ($২৩০৪) এর কাছে $২৩০৫ এ ক্লোজ হয়। এটি আগের ক্যান্ডেলের পুরো বডি ও উইক ঢেকে ফেলে, অর্থাৎ ছোট নিচের উইক সহ একটি আউটসাইড বার বিয়ারিশ এনগালফিং।',
          },
          focusIndex: 9,
        },
        {
          step: '3',
          label: {
            en: 'Retest Entry at 50% ($2319), Stop at $2336',
            bn: 'রিটেস্টে এন্ট্রি ৫০% ($২৩১৯), স্টপ $২৩৩৬',
          },
          description: {
            en: 'The engulfing candle ranges from $2304 to $2334, so its 50% level is $2319. Price retraces to about $2320 and rejects. A Sell Limit at $2319 with a stop at $2336 (the high plus $2 buffer) risks $17 per ounce.',
            bn: 'এনগালফিং ক্যান্ডেলের রেঞ্জ $২৩০৪ থেকে $২৩৩৪, তাই এর ৫০% লেভেল $২৩১৯। প্রাইস প্রায় $২৩২০ পর্যন্ত রিট্রেস করে রিজেক্ট হয়। $২৩১৯ এ Sell Limit ও $২৩৩৬ এ স্টপ (হাই + $২ বাফার) দিলে প্রতি আউন্সে ঝুঁকি $১৭।',
          },
          focusIndex: 10,
        },
        {
          step: '4',
          label: {
            en: 'Target at $2255 (about 1:3.8)',
            bn: 'টার্গেট $২২৫৫ (প্রায় ১:৩.৮)',
          },
          description: {
            en: 'Price steps down, bounces once, then reaches the support target near $2255. Reward is $64 against $17 risk, about 1:3.8. In real markets many trades will stop out instead, which is why position sizing matters.',
            bn: 'প্রাইস ধাপে ধাপে নামে, একবার বাউন্স করে, তারপর $২২৫৫ এর কাছাকাছি সাপোর্ট টার্গেটে পৌঁছায়। ঝুঁকি $১৭ এর বিপরীতে লাভ $৬৪, অর্থাৎ প্রায় ১:৩.৮। বাস্তবে অনেক ট্রেড স্টপ আউট হবে, তাই পজিশন সাইজিং গুরুত্বপূর্ণ।',
          },
          focusIndex: 16,
        },
      ],
      // Synthetic candles for CandleChart / Chart Lab. Index 9 = engulfing candle.
      chartData: {
        mode: 'synthetic',
        candles: [
          { i: 0, o: 2290, h: 2296, l: 2288, c: 2294 },
          { i: 1, o: 2294, h: 2301, l: 2292, c: 2299 },
          { i: 2, o: 2299, h: 2305, l: 2297, c: 2303 },
          { i: 3, o: 2303, h: 2306, l: 2299, c: 2301 },
          { i: 4, o: 2301, h: 2310, l: 2300, c: 2308 },
          { i: 5, o: 2308, h: 2316, l: 2306, c: 2314 },
          { i: 6, o: 2314, h: 2322, l: 2312, c: 2320 },
          { i: 7, o: 2320, h: 2328, l: 2318, c: 2326 },
          { i: 8, o: 2326, h: 2332, l: 2324, c: 2330 },
          { i: 9, o: 2331, h: 2334, l: 2304, c: 2305 },
          { i: 10, o: 2306, h: 2320, l: 2303, c: 2310 },
          { i: 11, o: 2310, h: 2312, l: 2296, c: 2298 },
          { i: 12, o: 2298, h: 2301, l: 2284, c: 2285 },
          { i: 13, o: 2285, h: 2296, l: 2283, c: 2292 },
          { i: 14, o: 2292, h: 2294, l: 2270, c: 2272 },
          { i: 15, o: 2272, h: 2276, l: 2259, c: 2260 },
          { i: 16, o: 2262, h: 2264, l: 2254, c: 2258 },
        ],
        annotations: [
          { type: 'zone', from: { i: 6, price: 2335 }, to: { i: 10, price: 2330 }, label: 'H4 Supply Zone', color: '#ef4444' },
          { type: 'hline', price: 2319, label: 'Entry (50%)', color: '#f5b301', style: 'dashed' },
          { type: 'hline', price: 2336, label: 'Stop Loss', color: '#ef4444', style: 'dashed' },
          { type: 'hline', price: 2255, label: 'Target', color: '#22c55e', style: 'dashed' },
          { type: 'marker', i: 8, position: 'aboveBar', shape: 'circle', text: 'Slowing buyers' },
          { type: 'marker', i: 9, position: 'aboveBar', shape: 'arrowDown', text: 'Bearish Engulfing' },
          { type: 'marker', i: 10, position: 'aboveBar', shape: 'arrowDown', text: 'Retest / Entry' },
        ],
      },
    },

    // ───────────────────────────── 11. TRADE MANAGEMENT ─────────────────────────────
    tradeManagement: {
      title: {
        en: 'Managing the Trade After Entry',
        bn: 'এন্ট্রির পর ট্রেড ম্যানেজমেন্ট',
      },
      steps: [
        {
          title: { en: 'Define the plan before entry', bn: 'এন্ট্রির আগেই প্ল্যান ঠিক করুন' },
          detail: {
            en: 'Write entry, stop, TP1, TP2 and the invalidation level before you click. Do not decide targets while the trade is open.',
            bn: 'ক্লিক করার আগেই এন্ট্রি, স্টপ, TP1, TP2 ও ইনভ্যালিডেশন লেভেল লিখে রাখুন। ট্রেড চলাকালীন টার্গেট ঠিক করবেন না।',
          },
        },
        {
          title: { en: 'At +1R: reduce risk', bn: '+১R এ: ঝুঁকি কমান' },
          detail: {
            en: 'Optionally close 25 to 50% and/or move the stop to breakeven once price has moved 1x your risk and structure supports it. Moving to breakeven too early lets normal noise stop you out.',
            bn: 'প্রাইস আপনার ঝুঁকির ১ গুণ সরে গেলে এবং স্ট্রাকচার সমর্থন করলে ঐচ্ছিকভাবে ২৫–৫০% বন্ধ করুন এবং/অথবা স্টপ ব্রেক-ইভেনে নিন। খুব তাড়াতাড়ি ব্রেক-ইভেনে নিলে স্বাভাবিক নয়েজে স্টপ আউট হয়ে যেতে পারে।',
          },
        },
        {
          title: { en: 'Trail with structure', bn: 'স্ট্রাকচার ধরে ট্রেইল করুন' },
          detail: {
            en: 'Trail the stop above the most recent lower high on H1 or H4, not a few pips behind price.',
            bn: 'স্টপ ট্রেইল করুন H1 বা H4 এর সাম্প্রতিক লোয়ার হাইয়ের উপরে, প্রাইসের কয়েক পিপ্স পেছনে নয়।',
          },
        },
        {
          title: { en: 'Exit rules', bn: 'এক্সিট নিয়ম' },
          detail: {
            en: 'Exit if the invalidation level breaks, if price reaches a major HTF demand zone, or before high-impact news if you do not want event risk.',
            bn: 'ইনভ্যালিডেশন লেভেল ভাঙলে, প্রাইস বড় HTF ডিমান্ড জোনে পৌঁছালে, অথবা ইভেন্ট ঝুঁকি না চাইলে হাই-ইমপ্যাক্ট নিউজের আগে বের হোন।',
          },
        },
        {
          title: { en: 'Never add to a loser', bn: 'লসিং ট্রেডে কখনো যোগ করবেন না' },
          detail: {
            en: 'Do not average up against the signal. A losing trade is closed by your stop, not by hope.',
            bn: 'সিগন্যালের বিরুদ্ধে অ্যাভারেজ করবেন না। লসিং ট্রেড আপনার স্টপ বন্ধ করে, আশা নয়।',
          },
        },
      ],
    },

    // ───────────────────────────── 12. POSITION SIZING ─────────────────────────────
    positionSizing: {
      title: {
        en: 'Position Sizing: Gold (XAUUSD) Worked Example',
        bn: 'পজিশন সাইজিং: গোল্ড (XAUUSD) ওয়ার্কড এক্সাম্পল',
      },
      formula: 'lots = (account × risk%) ÷ (stopDistanceInDollars × contractSize)',
      note: {
        en: 'Gold contract size is commonly 100 oz per 1.00 lot, so a $1 move is about $100 per lot (0.01 lot is about $1 per $1 move). Brokers differ, so verify yours. Always round lots DOWN, never up.',
        bn: 'গোল্ডের কন্ট্রাক্ট সাইজ সাধারণত ১.০০ লটে ১০০ আউন্স, অর্থাৎ $১ মুভে প্রতি লটে প্রায় $১০০ (০.০১ লটে $১ মুভে প্রায় $১)। ব্রোকারভেদে ভিন্ন হতে পারে, তাই নিজেরটা যাচাই করুন। লট সবসময় নিচের দিকে রাউন্ড করুন, উপরে নয়।',
      },
      examples: [
        {
          label: { en: 'Account $5,000, 1% risk', bn: 'অ্যাকাউন্ট $৫,০০০, ১% ঝুঁকি' },
          account: 5000,
          riskPercent: 1,
          stopDistance: 17,
          contractSize: 100,
          rawLots: 0.0294,
          usedLots: 0.02,
          actualRisk: 34,
          comment: {
            en: 'Risk budget is $50. Raw size is 0.0294 lot, so round down to 0.02 lot. Real risk is $34 (0.68%).',
            bn: 'ঝুঁকির বাজেট $৫০। কাঁচা সাইজ ০.০২৯৪ লট, তাই নিচে রাউন্ড করে ০.০২ লট। প্রকৃত ঝুঁকি $৩৪ (০.৬৮%)।',
          },
        },
        {
          label: { en: 'Account $500, 1% risk', bn: 'অ্যাকাউন্ট $৫০০, ১% ঝুঁকি' },
          account: 500,
          riskPercent: 1,
          stopDistance: 17,
          contractSize: 100,
          rawLots: 0.0029,
          usedLots: 0.01,
          actualRisk: 17,
          comment: {
            en: 'Risk budget is only $5, but the smallest lot (0.01) already risks $17, which is 3.4% of the account. This setup is too big for the account: skip it, find a tighter-stop setup, or use a cent/micro account.',
            bn: 'ঝুঁকির বাজেট মাত্র $৫, কিন্তু সবচেয়ে ছোট লটেই (০.০১) ঝুঁকি $১৭, যা অ্যাকাউন্টের ৩.৪%। এই সেটআপ অ্যাকাউন্টের জন্য বড়: বাদ দিন, ছোট স্টপের সেটআপ খুঁজুন, অথবা সেন্ট/মাইক্রো অ্যাকাউন্ট ব্যবহার করুন।',
          },
        },
      ],
    },

    // ───────────────────────────── 13. PRO TIPS ─────────────────────────────
    proTips: [
      {
        title: {
          en: 'Tip 1: Location Beats Pattern',
          bn: 'টিপ ১: প্যাটার্নের চেয়ে লোকেশন বড়',
        },
        content: {
          en: 'The same engulfing candle can be a great trade at a daily supply zone and a coin flip in the middle of a range. Mark your levels first, then wait for the pattern to come to you.',
          bn: 'একই এনগালফিং ক্যান্ডেল ডেইলি সাপ্লাই জোনে দারুণ ট্রেড হতে পারে, আবার রেঞ্জের মাঝখানে কয়েন-ফ্লিপ। আগে লেভেল মার্ক করুন, তারপর প্যাটার্নের আসার অপেক্ষা করুন।',
        },
      },
      {
        title: {
          en: 'Tip 2: The Outside Bar Advantage',
          bn: 'টিপ ২: আউটসাইড বারের সুবিধা',
        },
        content: {
          en: 'If Candle 2 engulfs the body AND the wicks (higher high and lower low than Candle 1), many traders treat it as a stronger signal because it often includes a liquidity sweep. Test this in your own backtest instead of assuming a fixed win-rate gain.',
          bn: 'দ্বিতীয় ক্যান্ডেল বডি ও উইক দুটোই ঢেকে ফেললে (প্রথম ক্যান্ডেলের চেয়ে বেশি হাই ও কম লো) অনেক ট্রেডার একে শক্তিশালী সিগন্যাল ধরেন, কারণ এতে প্রায়ই লিকুইডিটি সুইপ থাকে। নির্দিষ্ট উইনরেট বৃদ্ধি ধরে না নিয়ে নিজের ব্যাকটেস্টে যাচাই করুন।',
        },
      },
      {
        title: {
          en: 'Tip 3: Align With Session Timing',
          bn: 'টিপ ৩: সেশন টাইমিং মিলিয়ে ট্রেড করুন',
        },
        content: {
          en: 'Patterns in the quiet Asian session are less reliable on Gold and most USD pairs. Focus on the London Open (07:00 to 10:00 GMT, 1pm to 4pm Bangladesh time) and New York Open (13:00 to 16:00 GMT, 7pm to 10pm Bangladesh time) in winter. During US daylight saving time these windows shift about one hour earlier in Bangladesh time.',
          bn: 'শান্ত এশিয়ান সেশনে গোল্ড ও বেশিরভাগ USD পেয়ারে প্যাটার্ন কম নির্ভরযোগ্য। শীতকালীন সময়ে লন্ডন ওপেন (০৭:০০–১০:০০ GMT, বাংলাদেশ সময় দুপুর ১টা–৪টা) ও নিউ ইয়র্ক ওপেনে (১৩:০০–১৬:০০ GMT, বাংলাদেশ সময় সন্ধ্যা ৭টা–রাত ১০টা) ফোকাস করুন। ডেইলাইট সেভিং চলাকালে বাংলাদেশ সময়ে এই উইন্ডোগুলো প্রায় এক ঘণ্টা আগে সরে আসে।',
        },
      },
      {
        title: {
          en: 'Tip 4: Buffer Your Stop Loss',
          bn: 'টিপ ৪: স্টপ লসে বাফার দিন',
        },
        content: {
          en: 'Never place the stop exactly at the high of the engulfing candle. Spread widening and a stop-hunt wick can tag it before price falls. Add a buffer: roughly $1 to $2 on Gold, or a fraction of ATR.',
          bn: 'স্টপ লস কখনো এনগালফিং ক্যান্ডেলের হাইয়ের একদম মাথায় রাখবেন না। স্প্রেড বাড়া বা স্টপ-হান্ট উইক প্রাইস নামার আগেই স্টপ হিট করতে পারে। বাফার দিন: গোল্ডে প্রায় $১–$২, অথবা ATR এর একটি অংশ।',
        },
      },
      {
        title: {
          en: 'Tip 5: The 1% Rule',
          bn: 'টিপ ৫: ১% এর নিয়ম',
        },
        content: {
          en: 'Even the best setup fails sometimes. Do not risk more than 1% (2% maximum) per trade. After 10 consecutive 1% losses you still have about 90% of your capital, which keeps you in the game long enough for your edge to show.',
          bn: 'সেরা সেটআপও মাঝে মাঝে ফেল করে। প্রতি ট্রেডে ১% (সর্বোচ্চ ২%) এর বেশি ঝুঁকি নেবেন না। পরপর ১০টি ১% লসের পরও প্রায় ৯০% মূলধন থাকে, যা আপনার এজ প্রমাণ হওয়া পর্যন্ত আপনাকে খেলায় রাখে।',
        },
      },
    ],

    // ───────────────────────────── 14. COMMON MISTAKES ─────────────────────────────
    commonMistakes: [
      {
        mistake: {
          en: 'Trading the pattern before the candle officially closes.',
          bn: 'ক্যান্ডেল পুরোপুরি ক্লোজ হওয়ার আগেই ট্রেড নেওয়া।',
        },
        fix: {
          en: 'A candle is not an engulfing pattern until the timer hits 00:00. In the last seconds a spike can turn it into a pin bar. Wait for the official close.',
          bn: 'টাইমার ০:০০ না হওয়া পর্যন্ত ক্যান্ডেল প্যাটার্ন নয়। শেষ কয়েক সেকেন্ডেও স্পাইক এটিকে পিনবারে বদলে দিতে পারে। অফিসিয়াল ক্লোজের জন্য অপেক্ষা করুন।',
        },
      },
      {
        mistake: {
          en: 'Taking the trade away from any support or resistance.',
          bn: 'সাপোর্ট বা রেজিস্ট্যান্স ছাড়া ট্রেড নেওয়া।',
        },
        fix: {
          en: 'Context matters more than the candle shape. Only trade it at HTF supply zones, key resistance, Fibonacci confluence or range highs.',
          bn: 'ক্যান্ডেলের আকারের চেয়ে কনটেক্সট বেশি গুরুত্বপূর্ণ। শুধু HTF সাপ্লাই জোন, কী রেজিস্ট্যান্স, ফিবোনাচি কনফ্লুয়েন্স বা রেঞ্জ হাইয়ে ট্রেড নিন।',
        },
      },
      {
        mistake: {
          en: 'Moving the stop loss further away when price goes against you.',
          bn: 'ট্রেড বিপক্ষে গেলে স্টপ লস আরও দূরে সরিয়ে নেওয়া।',
        },
        fix: {
          en: 'If the stop is hit, the setup was wrong. Accept the planned loss. Moving a stop turns a small planned loss into an account-damaging one.',
          bn: 'স্টপ হিট মানে সেটআপ ভুল ছিল। পূর্বপরিকল্পিত লস মেনে নিন। স্টপ সরালে ছোট পরিকল্পিত লস অ্যাকাউন্ট-ক্ষতিকর লসে পরিণত হয়।',
        },
      },
      {
        mistake: {
          en: 'Ignoring the higher-timeframe trend.',
          bn: 'হায়ার টাইমফ্রেমের ট্রেন্ড অবহেলা করা।',
        },
        fix: {
          en: 'If Daily and Weekly are in a strong uptrend, an H1 Bearish Engulfing is often just a small pullback before buyers continue. Prefer setups that agree with the HTF direction.',
          bn: 'ডেইলি ও উইকলি শক্তিশালী আপট্রেন্ডে থাকলে H1 এর বিয়ারিশ এনগালফিং প্রায়ই বায়ারদের আবার ওঠার আগে ছোট পুলব্যাক মাত্র। HTF দিকের সাথে মেলে এমন সেটআপ বেছে নিন।',
        },
      },
      {
        mistake: {
          en: 'Using a lot size that ignores the stop distance.',
          bn: 'স্টপের দূরত্ব না দেখে লট সাইজ বেছে নেওয়া।',
        },
        fix: {
          en: 'Always size from the stop: lots = risk amount ÷ (stop distance × contract size). If even 0.01 lot risks too much, skip the trade.',
          bn: 'সবসময় স্টপ থেকে সাইজ বের করুন: লট = ঝুঁকির পরিমাণ ÷ (স্টপ দূরত্ব × কন্ট্রাক্ট সাইজ)। ০.০১ লটেও ঝুঁকি বেশি হলে ট্রেড বাদ দিন।',
        },
      },
      {
        mistake: {
          en: 'Trading every engulfing candle without any backtest data.',
          bn: 'কোনো ব্যাকটেস্ট ডেটা ছাড়াই প্রতিটি এনগালফিং ক্যান্ডেলে ট্রেড করা।',
        },
        fix: {
          en: 'Record at least 50 to 100 examples with the Backtest Template, split by location and trend, and trade only the versions that show an edge in YOUR data.',
          bn: 'ব্যাকটেস্ট টেমপ্লেট দিয়ে অন্তত ৫০–১০০টি উদাহরণ রেকর্ড করুন, লোকেশন ও ট্রেন্ড অনুযায়ী ভাগ করুন, এবং শুধু আপনার ডেটায় এজ দেখায় এমন ভার্সনই ট্রেড করুন।',
        },
      },
    ],

    // ───────────────────────────── 15. PRE-TRADE CHECKLIST ─────────────────────────────
    checklist: [
      {
        id: 'chk-1',
        group: { en: 'Context', bn: 'কনটেক্সট' },
        text: {
          en: 'Is the higher-timeframe trend or structure compatible with a sell?',
          bn: 'হায়ার টাইমফ্রেমের ট্রেন্ড বা স্ট্রাকচার কি সেলের সাথে সামঞ্জস্যপূর্ণ?',
        },
      },
      {
        id: 'chk-2',
        group: { en: 'Context', bn: 'কনটেক্সট' },
        text: {
          en: 'Is price at a validated Daily or H4 resistance / supply zone?',
          bn: 'প্রাইস কি কোনো ভ্যালিড ডেইলি বা H4 রেজিস্ট্যান্স / সাপ্লাই জোনে আছে?',
        },
      },
      {
        id: 'chk-3',
        group: { en: 'Pattern', bn: 'প্যাটার্ন' },
        text: {
          en: 'Did Candle 2 officially close and completely engulf the real body of Candle 1?',
          bn: 'দ্বিতীয় ক্যান্ডেল কি অফিসিয়ালি ক্লোজ হয়ে প্রথম ক্যান্ডেলের রিয়েল বডি সম্পূর্ণ ঢেকে ফেলেছে?',
        },
      },
      {
        id: 'chk-4',
        group: { en: 'Pattern', bn: 'প্যাটার্ন' },
        text: {
          en: 'Is Candle 2 full-bodied with a small lower wick (under about 25%) and not tiny versus recent candles?',
          bn: 'দ্বিতীয় ক্যান্ডেল কি শক্তিশালী বডির, নিচের উইক ছোট (প্রায় ২৫% এর কম) এবং সাম্প্রতিক ক্যান্ডেলের তুলনায় ছোট নয়?',
        },
      },
      {
        id: 'chk-5',
        group: { en: 'Confluence', bn: 'কনফ্লুয়েন্স' },
        text: {
          en: 'Is there extra confluence (liquidity sweep, divergence, higher tick volume, or session timing)?',
          bn: 'অতিরিক্ত কনফ্লুয়েন্স আছে কি (লিকুইডিটি সুইপ, ডাইভারজেন্স, বেশি টিক ভলিউম বা সেশন টাইমিং)?',
        },
      },
      {
        id: 'chk-6',
        group: { en: 'Plan', bn: 'প্ল্যান' },
        text: {
          en: 'Have I written entry, stop (above the high with buffer), TP1, TP2 and the invalidation level?',
          bn: 'আমি কি এন্ট্রি, স্টপ (হাইয়ের উপরে বাফার সহ), TP1, TP2 ও ইনভ্যালিডেশন লেভেল লিখে রেখেছি?',
        },
      },
      {
        id: 'chk-7',
        group: { en: 'Risk', bn: 'রিস্ক' },
        text: {
          en: 'Is the risk-to-reward at least 1:2 to the nearest major support?',
          bn: 'নিকটতম মেজর সাপোর্ট পর্যন্ত রিস্ক-টু-রিওয়ার্ড কি অন্তত ১:২?',
        },
      },
      {
        id: 'chk-8',
        group: { en: 'Risk', bn: 'রিস্ক' },
        text: {
          en: 'Is the lot size calculated from the stop distance, with total risk at 1% (max 2%) of the account?',
          bn: 'লট সাইজ কি স্টপ দূরত্ব থেকে হিসাব করা এবং মোট ঝুঁকি অ্যাকাউন্টের ১% (সর্বোচ্চ ২%) এর মধ্যে?',
        },
      },
      {
        id: 'chk-9',
        group: { en: 'News', bn: 'নিউজ' },
        text: {
          en: 'Is the next 30 minutes clear of high-impact news (CPI / NFP / FOMC / rate decisions)?',
          bn: 'আগামী ৩০ মিনিটে কোনো হাই-ইমপ্যাক্ট নিউজ (CPI / NFP / FOMC / রেট ডিসিশন) নেই তো?',
        },
      },
    ],

    // ───────────────────────────── 16. BACKTEST TEMPLATE ─────────────────────────────
    backtestTemplate: {
      title: {
        en: 'Backtest Template: Find YOUR Win Rate',
        bn: 'ব্যাকটেস্ট টেমপ্লেট: আপনার নিজের উইনরেট বের করুন',
      },
      intro: {
        en: 'Published win rates depend on the market, timeframe and rules, so use them only as a starting idea. Log every Bearish Engulfing you find on your chosen instrument and timeframe, including the ones you would have skipped.',
        bn: 'প্রকাশিত উইনরেট মার্কেট, টাইমফ্রেম ও নিয়মের ওপর নির্ভর করে, তাই এগুলোকে শুধু শুরুর ধারণা হিসেবে নিন। আপনার বেছে নেওয়া ইনস্ট্রুমেন্ট ও টাইমফ্রেমে প্রতিটি বিয়ারিশ এনগালফিং লগ করুন, যেগুলো আপনি বাদ দিতেন সেগুলোসহ।',
      },
      columns: [
        'Date',
        'Symbol',
        'Timeframe',
        'HTF trend (up / down / range)',
        'Location (supply zone / range high / none)',
        'Session',
        'Variation (classic / outside bar / small)',
        'Entry type (A / B / C)',
        'Entry',
        'Stop',
        'Target',
        'Result in R',
        'Screenshot link',
        'Notes',
      ],
      metrics: [
        {
          name: { en: 'Win rate', bn: 'উইন রেট' },
          formula: { en: 'winning trades ÷ total trades', bn: 'জেতা ট্রেড ÷ মোট ট্রেড' },
        },
        {
          name: { en: 'Average R', bn: 'গড় R' },
          formula: { en: 'sum of all R results ÷ total trades', bn: 'সব R ফলাফলের যোগফল ÷ মোট ট্রেড' },
        },
        {
          name: { en: 'Expectancy (per trade, in R)', bn: 'এক্সপেক্টেন্সি (প্রতি ট্রেডে, R এ)' },
          formula: {
            en: '(win% × average win R) − (loss% × average loss R)',
            bn: '(উইন% × গড় জেতা R) − (লস% × গড় হারা R)',
          },
        },
        {
          name: { en: 'Profit factor', bn: 'প্রফিট ফ্যাক্টর' },
          formula: { en: 'gross profit ÷ gross loss', bn: 'মোট লাভ ÷ মোট লস' },
        },
        {
          name: { en: 'Max drawdown', bn: 'ম্যাক্স ড্রডাউন' },
          formula: {
            en: 'largest peak-to-trough fall of your equity curve (in R or %)',
            bn: 'ইকুইটি কার্ভের সবচেয়ে বড় পিক থেকে ট্রফ পতন (R বা % এ)',
          },
        },
      ],
      minSample: {
        en: 'Aim for at least 50 to 100 logged trades before trusting the numbers, and split the results by location and HTF trend to see where the pattern really works. Then forward test on a demo account.',
        bn: 'সংখ্যায় ভরসা করার আগে অন্তত ৫০–১০০টি লগ করা ট্রেড রাখুন, এবং প্যাটার্নটি আসলে কোথায় কাজ করে তা দেখতে ফলাফল লোকেশন ও HTF ট্রেন্ড অনুযায়ী ভাগ করুন। তারপর ডেমো অ্যাকাউন্টে ফরওয়ার্ড টেস্ট করুন।',
      },
    },

    // ───────────────────────────── 17. FAQ ─────────────────────────────
    faq: [
      {
        q: {
          en: 'Do the wicks have to be engulfed too?',
          bn: 'উইকও কি ঢেকে ফেলতে হবে?',
        },
        a: {
          en: 'The classic definition only requires the real body to engulf the previous real body. If the wicks are engulfed as well it is an Outside Bar, which many traders prefer, but it is not required.',
          bn: 'ক্লাসিক সংজ্ঞায় শুধু রিয়েল বডি আগের রিয়েল বডি ঢাকলেই চলে। উইকও ঢাকলে সেটি আউটসাইড বার, যা অনেক ট্রেডার পছন্দ করেন, তবে বাধ্যতামূলক নয়।',
        },
      },
      {
        q: {
          en: 'Should I wait for the next candle to confirm?',
          bn: 'কনফার্মেশনের জন্য কি পরের ক্যান্ডেলের অপেক্ষা করব?',
        },
        a: {
          en: 'Waiting gives a worse entry but filters some failures. A common compromise is the 50% retest (Strategy A) or a lower-timeframe structure break (Strategy C). Test which works better in your data.',
          bn: 'অপেক্ষা করলে এন্ট্রি খারাপ হয় কিন্তু কিছু ব্যর্থতা ছাঁটাই হয়। একটি সাধারণ সমঝোতা হলো ৫০% রিটেস্ট (কৌশল ১) বা লোয়ার টাইমফ্রেম স্ট্রাকচার ব্রেক (কৌশল ৩)। আপনার ডেটায় কোনটি ভালো কাজ করে তা পরীক্ষা করুন।',
        },
      },
      {
        q: {
          en: 'Does it work on low timeframes like M1 or M5?',
          bn: 'M1 বা M5 এর মতো ছোট টাইমফ্রেমে কি কাজ করে?',
        },
        a: {
          en: 'It appears there, but noise, spread and commissions take a bigger share, so it is far less reliable. Use H1 and above for the signal, and lower timeframes only for entry timing.',
          bn: 'সেখানেও দেখা যায়, কিন্তু নয়েজ, স্প্রেড ও কমিশন বড় অংশ নেয়, তাই নির্ভরযোগ্যতা অনেক কম। সিগন্যালের জন্য H1 ও তার উপরে ব্যবহার করুন, ছোট টাইমফ্রেম শুধু এন্ট্রি টাইমিংয়ের জন্য।',
        },
      },
      {
        q: {
          en: 'What is the difference between a Bearish Engulfing and a Dark Cloud Cover?',
          bn: 'বিয়ারিশ এনগালফিং ও ডার্ক ক্লাউড কভারের পার্থক্য কী?',
        },
        a: {
          en: 'Dark Cloud Cover opens above the prior high and closes below the midpoint of the prior body but not below its open. Bearish Engulfing closes below the prior open, so it is the stronger version.',
          bn: 'ডার্ক ক্লাউড কভার আগের হাইয়ের উপরে ওপেন হয়ে আগের বডির মিডপয়েন্টের নিচে ক্লোজ হয়, কিন্তু আগের ওপেনের নিচে নয়। বিয়ারিশ এনগালফিং আগের ওপেনের নিচে ক্লোজ হয়, তাই এটি শক্তিশালী ভার্সন।',
        },
      },
    ],

    // ───────────────────────────── 18. QUIZ ─────────────────────────────
    quiz: [
      {
        id: 'q1',
        question: {
          en: 'What is the defining rule of a Bearish Engulfing?',
          bn: 'বিয়ারিশ এনগালফিংয়ের মূল শর্ত কী?',
        },
        options: [
          { en: 'Any red candle after a green candle', bn: 'সবুজ ক্যান্ডেলের পর যেকোনো লাল ক্যান্ডেল' },
          { en: 'A red candle whose real body fully covers the previous green real body', bn: 'এমন লাল ক্যান্ডেল যার রিয়েল বডি আগের সবুজ রিয়েল বডি সম্পূর্ণ ঢেকে ফেলে' },
          { en: 'A red candle with a long upper wick', bn: 'লম্বা উপরের উইকওয়ালা লাল ক্যান্ডেল' },
        ],
        correctIndex: 1,
        explanation: {
          en: 'The real body of Candle 2 must completely engulf the real body of Candle 1.',
          bn: 'দ্বিতীয় ক্যান্ডেলের রিয়েল বডি প্রথম ক্যান্ডেলের রিয়েল বডি সম্পূর্ণ ঢেকে ফেলতে হবে।',
        },
      },
      {
        id: 'q2',
        question: {
          en: 'Where does the pattern carry the most weight?',
          bn: 'প্যাটার্নটি সবচেয়ে বেশি গুরুত্ব পায় কোথায়?',
        },
        options: [
          { en: 'In the middle of a sideways range', bn: 'সাইডওয়ে রেঞ্জের মাঝখানে' },
          { en: 'At an HTF resistance or supply zone', bn: 'HTF রেজিস্ট্যান্স বা সাপ্লাই জোনে' },
          { en: 'During the quiet Asian session only', bn: 'শুধু শান্ত এশিয়ান সেশনে' },
        ],
        correctIndex: 1,
        explanation: {
          en: 'Location at a key level matters more than the candle shape itself.',
          bn: 'ক্যান্ডেলের আকারের চেয়ে কী-লেভেলে লোকেশন বেশি গুরুত্বপূর্ণ।',
        },
      },
      {
        id: 'q3',
        question: {
          en: 'What invalidates the setup?',
          bn: 'কোনটি সেটআপ বাতিল করে?',
        },
        options: [
          { en: 'A candle body closing above the engulfing candle high', bn: 'এনগালফিং ক্যান্ডেলের হাইয়ের উপরে কোনো ক্যান্ডেলের বডি ক্লোজ' },
          { en: 'The next candle being green and small', bn: 'পরের ক্যান্ডেল ছোট সবুজ হওয়া' },
          { en: 'The spread widening by 1 pip', bn: 'স্প্রেড ১ পিপ বাড়া' },
        ],
        correctIndex: 0,
        explanation: {
          en: 'A body close above the high means buyers recovered the whole move, so the thesis is wrong.',
          bn: 'হাইয়ের উপরে বডি ক্লোজ মানে বায়াররা পুরো মুভ ফিরিয়ে এনেছে, অর্থাৎ থিসিস ভুল।',
        },
      },
      {
        id: 'q4',
        question: {
          en: 'Account $5,000, 1% risk, stop distance $17 on Gold (100 oz contract). Which lot size is correct?',
          bn: 'অ্যাকাউন্ট $৫,০০০, ১% ঝুঁকি, গোল্ডে স্টপ দূরত্ব $১৭ (১০০ আউন্স কন্ট্রাক্ট)। সঠিক লট সাইজ কোনটি?',
        },
        options: [
          { en: '0.02 lot (rounded down)', bn: '০.০২ লট (নিচে রাউন্ড করা)' },
          { en: '0.05 lot', bn: '০.০৫ লট' },
          { en: '0.50 lot', bn: '০.৫০ লট' },
        ],
        correctIndex: 0,
        explanation: {
          en: '$50 ÷ ($17 × 100) = 0.0294 lot. Round down to 0.02 lot, real risk $34.',
          bn: '$৫০ ÷ ($১৭ × ১০০) = ০.০২৯৪ লট। নিচে রাউন্ড করে ০.০২ লট, প্রকৃত ঝুঁকি $৩৪।',
        },
      },
    ],

    // ───────────────────────────── 19. RELATED / SOURCES / DISCLAIMER ─────────────────────────────
    relatedPatterns: [
      'bullish-engulfing',
      'evening-star',
      'shooting-star',
      'dark-cloud-cover',
      'inside-bar',
      'pin-bar',
    ],
    sources: [
      {
        title: 'Japanese Candlestick Charting Techniques',
        author: 'Steve Nison',
        note: {
          en: 'The classic reference for candlestick definitions and context.',
          bn: 'ক্যান্ডেলস্টিক সংজ্ঞা ও কনটেক্সটের ক্লাসিক রেফারেন্স।',
        },
      },
      {
        title: 'Encyclopedia of Candlestick Charts',
        author: 'Thomas Bulkowski',
        note: {
          en: 'Statistical tests of candlestick patterns on historical data. Read the methodology before using any number.',
          bn: 'ঐতিহাসিক ডেটায় ক্যান্ডেলস্টিক প্যাটার্নের পরিসংখ্যানগত পরীক্ষা। কোনো সংখ্যা ব্যবহারের আগে পদ্ধতি পড়ুন।',
        },
      },
    ],
    disclaimer: {
      en: 'Educational notes only. Not financial advice. Trading Forex and Gold involves a high risk of loss. Practice on a demo account first.',
      bn: 'শুধু শিক্ষামূলক নোট। আর্থিক পরামর্শ নয়। ফরেক্স ও গোল্ড ট্রেডিংয়ে ক্ষতির ঝুঁকি বেশি। আগে ডেমো অ্যাকাউন্টে অনুশীলন করুন।',
    },
  },
};

export function getPatternDeepGuide(id: string): PatternDeepGuide | null {
  return patternDeepGuides[id] || null;
}

