import { SlideCandlePattern } from './types';

export const slidePatternsData: SlideCandlePattern[] = [
  // ─── 1. MOMENTUM & INDECISION ──────────────────────────────────────────
  {
    id: 'marubozu',
    slideNumber: '1',
    title: {
      en: 'Marubozu (Full Body Momentum)',
      bn: 'মারুবোজু ক্যান্ডেল (Marubozu Candle)',
    },
    category: 'structure',
    type: 'reversal',
    badge: {
      en: 'Single Candle · Momentum',
      bn: 'একক ক্যান্ডেল · মোমেন্টাম',
    },
    condition: [
      {
        en: '# Condition : No wick',
        bn: '# শর্ত : কোনো উইক বা শ্যাডো নেই (অথবা অতি নগণ্য)',
      },
    ],
    meaning: [
      {
        en: '# Meaning : One sided dominance',
        bn: '# অর্থ : একপাক্ষিক চরম আধিপত্য (One sided dominance)',
      },
    ],
    significance: [
      {
        en: 'Indicates strong momentum in the direction of the candle. Bullish Marubozu means buyers dominated from open to close. Bearish Marubozu indicates absolute seller control.',
        bn: 'ক্যান্ডেলের দিকে চরম গতি প্রকাশ করে। বুলিশ মারুবোজুতে শুরু থেকে শেষ পর্যন্ত ক্রেতাদের আধিপত্য থাকে। বেয়ারিশ মারুবোজুতে বিক্রেতারা মার্কেট সম্পূর্ণ নিয়ন্ত্রণে রাখে।',
      },
    ],
    psychology: {
      en: 'Zero wicks prove that price never traded above the close or below the open. This represents full institutional volume with zero opposition.',
      bn: 'উইক না থাকা প্রমাণ করে প্রাইস ওপেনের নিচে বা ক্লোজের ওপরে যেতে পারেনি। এটি বিরোধিতাহীন প্রাতিষ্ঠানিক শক্তির প্রমাণ।',
    },
    actionTip: {
      en: 'Trade in the direction of the Marubozu during breakout confirmations. Avoid fading into a fresh Marubozu.',
      bn: 'ব্রেকআউটে মারুবোজুর দিকে ট্রেড নিন। সদ্য গঠিত মারুবোজুর বিপরীতে ট্রেড নেওয়া থেকে বিরত থাকুন।',
    },
    candles: [
      {
        open: 15,
        close: 85,
        high: 85,
        low: 15,
        color: 'bull',
        label: 'Bullish',
        topAnnotation: 'Closing = High',
        bottomAnnotation: 'Opening = Low',
        bodyAnnotation: 'Full Dominance',
      },
      {
        open: 85,
        close: 15,
        high: 85,
        low: 15,
        color: 'bear',
        label: 'Bearish',
        topAnnotation: 'Opening = High',
        bottomAnnotation: 'Closing = Low',
        bodyAnnotation: 'Full Dominance',
      },
    ],
    arrows: [
      { candleIndex: 0, direction: 'up', label: 'Upward Pressure', color: '#22c55e' },
      { candleIndex: 1, direction: 'down', label: 'Downward Pressure', color: '#ef4444' },
    ],
    deepLinkId: 'marubozu',
  },

  {
    id: 'spinning-top',
    slideNumber: '2',
    title: {
      en: 'Spinning Top Candle',
      bn: 'স্পিনিং টপ ক্যান্ডেল (Spinning Top)',
    },
    category: 'structure',
    type: 'neutral',
    badge: {
      en: 'Single Candle · Indecision',
      bn: 'একক ক্যান্ডেল · সিদ্ধান্তহীনতা',
    },
    condition: [
      {
        en: 'Condition : Wicks 2x/3x larger than Body',
        bn: 'শর্ত : উইকসমূহ বডির চেয়ে ২ থেকে ৩ গুণ বড়',
      },
    ],
    meaning: [
      {
        en: 'Meaning : 50-50 Dominance',
        bn: 'অর্থ : ৫০-৫০ আধিপত্য (উভয় পক্ষের সমানে সমান লড়াই)',
      },
    ],
    significance: [
      {
        en: 'Significance : Trend Reversal',
        bn: 'তাৎপর্য : ট্রেন্ড রিভার্সাল (বর্তমান ট্রেন্ডের সমাপ্তির সংকেত)',
      },
    ],
    psychology: {
      en: 'Buyers pushed up to High, sellers pushed down to Low, but price closed near open. Neither side won the auction, signaling hesitation in the existing trend.',
      bn: 'ক্রেতারা প্রাইসকে হাই পর্যন্ত নিয়ে গিয়েছিল, বিক্রেতারা লো পর্যন্ত ঠেলেছিল, কিন্তু সমাপ্তি ঘটে ওপেনের কাছাকাছি। কেউ জয়ী হতে না পারায় ট্রেন্ড দুর্বল হয়ে পড়ে।',
    },
    actionTip: {
      en: 'Wait for the subsequent candle to confirm breakout above the high or below the low before taking an entry.',
      bn: 'পরবর্তী ক্যান্ডেলের হাই বা লো ব্রেকআউটের নিশ্চিতকরণ পর্যন্ত অপেক্ষা করুন।',
    },
    candles: [
      {
        open: 42,
        close: 58,
        high: 95,
        low: 5,
        color: 'bull',
        label: 'Bullish',
        topAnnotation: 'High',
        bottomAnnotation: 'Low',
        bodyAnnotation: 'Small Body',
      },
      {
        open: 58,
        close: 42,
        high: 95,
        low: 5,
        color: 'bear',
        label: 'Bearish',
        topAnnotation: 'High',
        bottomAnnotation: 'Low',
        bodyAnnotation: 'Small Body',
      },
    ],
    deepLinkId: 'spinning-top',
  },

  {
    id: 'doji',
    slideNumber: '3',
    title: {
      en: 'Doji (Standard Cross)',
      bn: 'ডোজি ক্যান্ডেল (Doji Candle)',
    },
    category: 'structure',
    type: 'neutral',
    badge: {
      en: 'Single Candle · Neutral Cross',
      bn: 'একক ক্যান্ডেল · নিউট্রাল ক্রস',
    },
    condition: [
      {
        en: 'Condition : After up or down trend',
        bn: 'শর্ত : আপট্রেন্ড বা ডাউনট্রেন্ডের পর গঠিত হয়',
      },
    ],
    meaning: [
      {
        en: 'Meaning : Price can reverse',
        bn: 'অর্থ : প্রাইস রিভার্স করতে পারে (সম্ভাব্য দিক পরিবর্তন)',
      },
    ],
    significance: [
      {
        en: 'Significance : Trend reversal',
        bn: 'তাৎপর্য : ট্রেন্ড রিভার্সাল',
      },
    ],
    psychology: {
      en: 'Doji represents the ultimate balance where Open = Close. Equal upper and lower shadows show total stalemate between buyers and sellers.',
      bn: 'ডোজিতে ওপেন ও ক্লোজ প্রায় একই থাকে। উভয় পাশের সমান উইক ক্রেতা ও বিক্রেতার পূর্ণ সমতা নির্দেশ করে।',
    },
    actionTip: {
      en: 'A Doji alone is not an entry signal. Wait for the next candle to confirm direction.',
      bn: 'শুধু একটি ডোজি দেখে ট্রেড নেবেন না। পরবর্তী ক্যান্ডেলের দিক নিশ্চিতকরণ পর্যন্ত অপেক্ষা করুন।',
    },
    candles: [
      {
        open: 50,
        close: 50,
        high: 95,
        low: 5,
        color: 'neutral',
        label: 'Standard Doji (+)',
        topAnnotation: 'High',
        bottomAnnotation: 'Low',
        bodyAnnotation: 'Open = Close',
      },
    ],
    deepLinkId: 'doji',
  },

  {
    id: 'dragonfly-doji',
    slideNumber: '3b',
    title: {
      en: 'Dragonfly Doji',
      bn: 'ড্রাগনফ্লাই ডোজি (Dragonfly Doji)',
    },
    category: 'structure',
    type: 'bullish',
    badge: {
      en: 'Single Candle · Bullish Reversal',
      bn: 'একক ক্যান্ডেল · বুলিশ রিভার্সাল',
    },
    condition: [
      {
        en: 'Condition : After down trend (T-shape)',
        bn: 'শর্ত : ডাউনট্রেন্ডের পর গঠিত হতে হবে (T-আকৃতি)',
      },
    ],
    meaning: [
      {
        en: 'Meaning : Price can go up',
        bn: 'অর্থ : প্রাইস ওপরে যাওয়ার প্রবল সম্ভাবনা',
      },
    ],
    significance: [
      {
        en: 'Significance : Bearish trend reversal (reverses down-move)',
        bn: 'তাৎপর্য : বেয়ারিশ ট্রেন্ড সমাপ্ত হয়ে বুলিশ রিভার্সাল',
      },
    ],
    psychology: {
      en: 'Sellers tried aggressively to make fresh lows, but buyers absorbed all selling pressure and pushed price all the way back to close at the high.',
      bn: 'সেলাররা তীব্র গতিতে দাম কমাতে চেয়েছিল কিন্তু বায়াররা এসে সমস্ত সেল শোষণ করে প্রাইস ফিরিয়ে হাইতে নিয়ে গিয়ে ক্লোজ করায়।',
    },
    actionTip: {
      en: 'Buy on next candle break above the high. Stop Loss below the long lower shadow.',
      bn: 'পরবর্তী ক্যান্ডেল হাই ব্রেক করলে বাই এন্ট্রি নিন। স্টপ লস লম্বা লোয়ার উইকের নিচে দিন।',
    },
    contextTrend: 'downtrend',
    candles: [
      {
        open: 90,
        close: 90,
        high: 94,
        low: 8,
        color: 'bull',
        label: 'Dragonfly Doji (T)',
        topAnnotation: 'Open=High=Close',
        bottomAnnotation: 'Low (Heavy Rejection)',
        bodyAnnotation: 'Long Lower Wick',
      },
    ],
    arrows: [
      { candleIndex: 0, direction: 'up', label: 'Price Reversal Up', color: '#22c55e' },
    ],
    deepLinkId: 'dragonfly-doji',
  },

  {
    id: 'gravestone-doji',
    slideNumber: '3c',
    title: {
      en: 'Gravestone Doji',
      bn: 'গ্রেভস্টোন ডোজি (Gravestone Doji)',
    },
    category: 'structure',
    type: 'bearish',
    badge: {
      en: 'Single Candle · Bearish Reversal',
      bn: 'একক ক্যান্ডেল · বেয়ারিশ রিভার্সাল',
    },
    condition: [
      {
        en: 'Condition : After up trend (Inverted T-shape)',
        bn: 'শর্ত : আপট্রেন্ডের পর গঠিত হতে হবে (উল্টো T-আকৃতি)',
      },
    ],
    meaning: [
      {
        en: 'Meaning : Price can go down',
        bn: 'অর্থ : প্রাইস নিচে নামার প্রবল সম্ভাবনা',
      },
    ],
    significance: [
      {
        en: 'Significance : Bullish trend reversal (reverses up-move)',
        bn: 'তাৎপর্য : বুলিশ ট্রেন্ড সমাপ্ত হয়ে বেয়ারিশ রিভার্সাল',
      },
    ],
    psychology: {
      en: 'Buyers tried to push to new highs, but institutional sellers stepped in and hammered price all the way back down to close at the open/low.',
      bn: 'বায়াররা নতুন হাই তৈরি করতে চেয়েছিল, কিন্তু রেজিস্ট্যান্স থেকে সেলাররা আক্রমণ করে প্রাইস নিচে নামিয়ে ওপেন/লোতে ক্লোজ করায়।',
    },
    actionTip: {
      en: 'Sell on next candle break below the low. Stop Loss above the upper shadow peak.',
      bn: 'পরবর্তী ক্যান্ডেল লো ব্রেক করলে শর্ট সেল করুন। স্টপ লস আপার উইকের শীর্ষের ওপরে সেট করুন।',
    },
    contextTrend: 'uptrend',
    candles: [
      {
        open: 12,
        close: 12,
        high: 92,
        low: 8,
        color: 'bear',
        label: 'Gravestone Doji (⊥)',
        topAnnotation: 'High (Heavy Rejection)',
        bottomAnnotation: 'Open=Low=Close',
        bodyAnnotation: 'Long Upper Wick',
      },
    ],
    arrows: [
      { candleIndex: 0, direction: 'down', label: 'Price Reversal Down', color: '#ef4444' },
    ],
    deepLinkId: 'gravestone-doji',
  },

  {
    id: 'long-legged-doji',
    slideNumber: '3d',
    title: {
      en: 'Long-Legged Doji',
      bn: 'লং-লেগড ডোজি (Long-Legged Doji)',
    },
    category: 'structure',
    type: 'neutral',
    badge: {
      en: 'Single Candle · High Volatility',
      bn: 'একক ক্যান্ডেল · তীব্র ভোলাটিলিটি',
    },
    condition: [
      {
        en: 'Condition : Dramatic upper and lower wicks with centered body',
        bn: 'শর্ত : উভয় দিকে অত্যন্ত দীর্ঘ উইক এবং কেন্দ্রে অতি ক্ষুদ্র বডি',
      },
    ],
    meaning: [
      {
        en: 'Meaning : Extreme equilibrium & liquidity fight',
        bn: 'অর্থ : তীব্র ভোলাটিলিটি এবং দুই পক্ষের তুমুল সমতা',
      },
    ],
    significance: [
      {
        en: 'Significance : Large trend continuation or impending reversal',
        bn: 'তাৎপর্য : ট্রেন্ড সমাপ্তি অথবা বিস্ফোরক ব্রেকআউট',
      },
    ],
    psychology: {
      en: 'Huge expansion in both directions during high-impact news, closing in dead center.',
      bn: 'হাই ইম্প্যাক্ট নিউজের সময় উভয় দিকে বড় ধরণের স্পাইক দিয়ে মাঝামাঝি ক্লোজ হয়।',
    },
    actionTip: {
      en: 'Avoid trading during the candle; place straddle stop orders outside the range.',
      bn: 'ক্যান্ডেল চলার সময় ট্রেড করবেন না; রেঞ্জের বাইরে ব্রেকআউটের জন্য অপেক্ষা করুন।',
    },
    candles: [
      {
        open: 50,
        close: 50,
        high: 98,
        low: 2,
        color: 'neutral',
        label: 'Long-Legged Doji',
        topAnnotation: 'Extreme High',
        bottomAnnotation: 'Extreme Low',
        bodyAnnotation: 'Zero Net Move',
      },
    ],
    deepLinkId: 'long-legged-doji',
  },

  // ─── 2. REJECTION / PIN BAR FAMILY ────────────────────────────────────
  {
    id: 'hammer',
    slideNumber: '4',
    title: {
      en: 'Hammer Candle',
      bn: 'হ্যামার ক্যান্ডেল (Hammer Candle)',
    },
    category: 'structure',
    type: 'bullish',
    badge: {
      en: 'Single Candle · Bullish Reversal',
      bn: 'একক ক্যান্ডেল · বুলিশ রিভার্সাল',
    },
    condition: [
      {
        en: 'Condition : Wick larger than Body (Lower wick 2x-3x Body)',
        bn: 'শর্ত : লোয়ার উইক বডির চেয়ে অন্তত ২ থেকে ৩ গুণ বড়',
      },
    ],
    meaning: [
      {
        en: 'Meaning : Bearish trend reversal (Price Rejection)',
        bn: 'অর্থ : বেয়ারিশ ট্রেন্ড সমাপ্তির সংকেত (প্রাইস রিজেকশন)',
      },
    ],
    significance: [
      {
        en: 'Significance : After down trend, Price can go up',
        bn: 'তাৎপর্য : ডাউনট্রেন্ডের পর গঠিত হলে প্রাইস ওপরে যাওয়ার জোরালো সম্ভাবনা',
      },
    ],
    psychology: {
      en: 'Sellers tried aggressively to make fresh lows, but buyers stepped in at key demand, absorbing supply and pushing price back near the highs.',
      bn: 'বিক্রেতারা নতুন লো তৈরি করতে চেয়েছিল, কিন্তু ডিমান্ড জোনে ক্রেতারা বিপুল বাই অর্ডার দিয়ে প্রাইস ফিরিয়ে আনে।',
    },
    actionTip: {
      en: 'Best traded at support zones. Place Stop Loss safely below the hammer tail.',
      bn: 'সাপোর্ট জোনে হ্যামার সবচেয়ে কার্যকর। স্টপ লস হ্যামারের লোয়ার উইকের নিচে রাখুন।',
    },
    contextTrend: 'downtrend',
    candles: [
      {
        open: 72,
        close: 92,
        high: 94,
        low: 10,
        color: 'bull',
        label: 'Bullish Hammer',
        topAnnotation: 'High / Close',
        bottomAnnotation: 'Low',
        bodyAnnotation: 'Small Body at Top',
      },
      {
        open: 92,
        close: 72,
        high: 94,
        low: 10,
        color: 'bear',
        label: 'Bearish Hammer',
        topAnnotation: 'High / Open',
        bottomAnnotation: 'Low',
        bodyAnnotation: 'Wick 2x-3x Body',
      },
    ],
    guideLines: [
      { yValue: 94, label: 'High', style: 'dashed', color: '#94a3b8' },
      { yValue: 10, label: 'Low', style: 'dashed', color: '#94a3b8' },
    ],
    deepLinkId: 'hammer',
  },

  {
    id: 'hanging-man',
    slideNumber: '4b',
    title: {
      en: 'Hanging Man',
      bn: 'হ্যাংগিং ম্যান (Hanging Man)',
    },
    category: 'structure',
    type: 'bearish',
    badge: {
      en: 'Single Candle · Bearish Exhaustion',
      bn: 'একক ক্যান্ডেল · বেয়ারিশ ক্লান্তি',
    },
    condition: [
      {
        en: 'Condition : Hammer shape appearing at the top of an uptrend',
        bn: 'শর্ত : আপট্রেন্ডের শীর্ষে হ্যামারের মতো আকৃতি তৈরি হওয়া',
      },
    ],
    meaning: [
      {
        en: 'Meaning : Heavy selling pressure has entered the market',
        bn: 'অর্থ : বাজারে গভীর সেল প্রেসার ঢুকতে শুরু করেছে',
      },
    ],
    significance: [
      {
        en: 'Significance : After up-trend, price can go down (Requires confirmation)',
        bn: 'তাৎপর্য : আপট্রেন্ড শেষ হয়ে প্রাইস নিচে নামতে পারে (কনফার্মেশন জরুরি)',
      },
    ],
    psychology: {
      en: 'Although buyers managed to pull price back up by the close, the deep intraday sell-off proves bulls are losing control.',
      bn: 'দিনশেষে প্রাইস কিছুটা রিকভার করলেও সেশনের মাঝে হওয়া গভীর পতন প্রমাণ করে বায়ারদের দম ফুরিয়ে এসেছে।',
    },
    actionTip: {
      en: 'Never short blindly on Hanging Man. Wait for the next candle to close below its low.',
      bn: 'হ্যাংগিং ম্যান দেখে তাৎক্ষণিক শর্ট করবেন না; পরবর্তী ক্যান্ডেলের লো ব্রেক নিশ্চিত করুন।',
    },
    contextTrend: 'uptrend',
    candles: [
      {
        open: 88,
        close: 75,
        high: 90,
        low: 18,
        color: 'bear',
        label: 'Hanging Man',
        topAnnotation: 'Top Peak',
        bottomAnnotation: 'Warning Low',
        bodyAnnotation: 'Vulnerable Top',
      },
    ],
    arrows: [
      { candleIndex: 0, direction: 'down', label: 'Potential Reversal Down', color: '#ef4444' },
    ],
    deepLinkId: 'hanging-man',
  },

  {
    id: 'inverted-hammer',
    slideNumber: '5',
    title: {
      en: 'Inverted Hammer',
      bn: 'ইনভার্টেড হ্যামার (Inverted Hammer)',
    },
    category: 'structure',
    type: 'bullish',
    badge: {
      en: 'Single Candle · Bullish Reversal at Bottom',
      bn: 'একক ক্যান্ডেল · বটমে বুলিশ রিভার্সাল',
    },
    condition: [
      {
        en: 'Condition : Wick larger than Body (Upper wick 2x-3x Body)',
        bn: 'শর্ত : আপার উইক বডির চেয়ে অন্তত ২ থেকে ৩ গুণ বড়',
      },
      {
        en: 'Condition : Should appear after a downtrend',
        bn: 'শর্ত : ডাউনট্রেন্ডের পর সাপোর্ট জোনে আসতে হবে',
      },
    ],
    meaning: [
      {
        en: 'Meaning : Bullish Reversal (Buyers testing higher prices)',
        bn: 'অর্থ : বুলিশ রিভার্সাল (ক্রেতারা উচ্চমূল্য পরীক্ষা করছে)',
      },
    ],
    significance: [
      {
        en: 'Significance : After down-trend price can go up',
        bn: 'তাৎপর্য : ডাউনট্রেন্ডের পর প্রাইস ওপরে যাওয়ার সংকেত',
      },
    ],
    psychology: {
      en: 'Buyers showed early aggression by driving price up. Although price gave back gains, the presence of buying volume hints at a bottom.',
      bn: 'বায়াররা হঠাৎ বিপুল গতিতে প্রাইস ওপরে তুলে শক্তির জানান দেয়। এটি বটম টেস্ট করার স্পষ্ট লক্ষণ।',
    },
    actionTip: {
      en: 'Enter long once the next candle breaks above the high of the Inverted Hammer.',
      bn: 'পরবর্তী ক্যান্ডেল ইনভার্টেড হ্যামারের হাই ব্রেক করলে বাই এন্ট্রি নিন।',
    },
    contextTrend: 'downtrend',
    candles: [
      {
        open: 12,
        close: 32,
        high: 95,
        low: 10,
        color: 'bull',
        label: 'Inverted Hammer',
        topAnnotation: 'High Test',
        bottomAnnotation: 'Low Base',
        bodyAnnotation: 'Body at Bottom',
      },
    ],
    arrows: [
      { candleIndex: 0, direction: 'up', label: 'Bounce Signal', color: '#22c55e' },
    ],
    deepLinkId: 'inverted-hammer',
  },

  {
    id: 'shooting-star',
    slideNumber: '5b',
    title: {
      en: 'Shooting Star',
      bn: 'শুটিং স্টার (Shooting Star)',
    },
    category: 'structure',
    type: 'bearish',
    badge: {
      en: 'Single Candle · Bearish Reversal at Peak',
      bn: 'একক ক্যান্ডেল · শীর্ষে বেয়ারিশ রিভার্সাল',
    },
    condition: [
      {
        en: 'Condition : Upper wick 2x-3x larger than Body after an uptrend',
        bn: 'শর্ত : আপট্রেন্ডের পর আপার উইক বডির চেয়ে ২ থেকে ৩ গুণ বড়',
      },
    ],
    meaning: [
      {
        en: 'Meaning : Bullish exhaustion followed by aggressive rejection',
        bn: 'অর্থ : ক্রেতাদের চরম ব্যর্থতা ও প্রাতিষ্ঠানিক রিজেকশন',
      },
    ],
    significance: [
      {
        en: 'Significance : After up-trend price can go down',
        bn: 'তাৎপর্য : আপট্রেন্ড শেষ হয়ে প্রাইস দ্রুত নিচে নামতে পারে',
      },
    ],
    psychology: {
      en: 'Bulls attempted a new breakout high, but sellers violently overwhelmed them and trapped late breakout buyers at the very peak.',
      bn: 'বায়াররা নতুন হাই ভাঙার চেষ্টা করলেও সেলাররা প্রতিরোধ গড়ে তোলে এবং শীর্ষে থাকা সকল রিটেইল বায়ারকে ট্র্যাপ করে।',
    },
    actionTip: {
      en: 'Sell on break below the low. Stop Loss 2-3 pips above the shooting star peak wick.',
      bn: 'ক্যান্ডেলের লো ভাঙলে শর্ট করুন। স্টপ লস উইকের শীর্ষের ২-৩ পিপস ওপরে রাখুন।',
    },
    contextTrend: 'uptrend',
    candles: [
      {
        open: 32,
        close: 14,
        high: 96,
        low: 10,
        color: 'bear',
        label: 'Shooting Star',
        topAnnotation: 'Rejection High',
        bottomAnnotation: 'Low Close',
        bodyAnnotation: 'Upper Wick > 2x',
      },
    ],
    arrows: [
      { candleIndex: 0, direction: 'down', label: 'Price Reversal Down', color: '#ef4444' },
    ],
    deepLinkId: 'shooting-star',
  },

  // ─── 3. TWO-CANDLE REVERSALS ──────────────────────────────────────────
  {
    id: 'bullish-engulfing',
    slideNumber: '6',
    title: {
      en: 'Bullish Engulfing Pattern',
      bn: 'বুলিশ এনগালফিং প্যাটার্ন (Bullish Engulfing)',
    },
    category: 'multi-candle',
    type: 'bullish',
    badge: {
      en: 'Two Candles · Powerful Reversal',
      bn: 'দুই ক্যান্ডেল · শক্তিশালী বুলিশ রিভার্সাল',
    },
    bodyRule: [
      {
        en: 'Body : 1st Candle covered by the 2nd candle fully with body',
        bn: 'বডি : ১ম ক্যান্ডেলটি ২য় ক্যান্ডেলের সম্পূর্ণ বডি দ্বারা আবৃত বা গ্রাসকৃত',
      },
    ],
    condition: [
      {
        en: 'Condition : Should come after downtrend',
        bn: 'শর্ত : ডাউনট্রেন্ডের পর সাপোর্ট জোনে আসতে হবে',
      },
    ],
    meaning: [
      {
        en: 'Meaning : Bearish trend reversal pattern',
        bn: 'অর্থ : বেয়ারিশ ট্রেন্ড রিভার্সাল প্যাটার্ন (ডাউনট্রেন্ড সমাপ্তি)',
      },
    ],
    significance: [
      {
        en: 'Significance : Price can go up',
        bn: 'তাৎপর্য : প্রাইস ওপরে যাওয়ার প্রবল সম্ভাবনা',
      },
    ],
    psychology: {
      en: 'Sellers held control on Candle 1. Candle 2 opened lower, but massive institutional buyers flooded the market, completely consuming the prior red body.',
      bn: '১ম ক্যান্ডেলে সেলারদের নিয়ন্ত্রণ থাকলেও ২য় ক্যান্ডেলে বায়াররা বিপুল ভলিউম নিয়ে ঢুকে পূর্বের সমস্ত ক্ষতি পুষিয়ে ওপরে ক্লোজ দেয়।',
    },
    actionTip: {
      en: 'Enter on Candle 2 close or on a 50% pullback. Stop Loss below the engulfing low.',
      bn: '২য় ক্যান্ডেল ক্লোজে বা ৫০% পুলব্যাকে বাই করুন। স্টপ লস ২য় ক্যান্ডেলের লো এর নিচে রাখুন।',
    },
    contextTrend: 'downtrend',
    candles: [
      {
        open: 58,
        close: 36,
        high: 68,
        low: 26,
        color: 'bear',
        label: '1st Candle',
        topAnnotation: 'Open',
        bottomAnnotation: 'Close',
        bodyAnnotation: 'Smaller Body',
      },
      {
        open: 30,
        close: 78,
        high: 86,
        low: 24,
        color: 'bull',
        label: '2nd Candle',
        topAnnotation: 'Close (Higher)',
        bottomAnnotation: 'Open (Lower)',
        bodyAnnotation: 'Engulfs 1st Body',
      },
    ],
    arrows: [
      { candleIndex: 1, direction: 'up', label: 'Price Reversal Up', color: '#22c55e' },
    ],
    deepLinkId: 'bullish-engulfing',
  },

  {
    id: 'bearish-engulfing',
    slideNumber: '6b',
    title: {
      en: 'Bearish Engulfing Pattern',
      bn: 'বেয়ারিশ এনগালফিং প্যাটার্ন (Bearish Engulfing)',
    },
    category: 'multi-candle',
    type: 'bearish',
    badge: {
      en: 'Two Candles · Powerful Bearish Reversal',
      bn: 'দুই ক্যান্ডেল · শক্তিশালী বেয়ারিশ রিভার্সাল',
    },
    bodyRule: [
      {
        en: 'Body : 1st Candle covered by the 2nd candle fully with body',
        bn: 'বডি : ১ম বুলিশ ক্যান্ডেলকে ২য় বেয়ারিশ ক্যান্ডেল সম্পূর্ণ বডি দিয়ে গ্রাস করে',
      },
    ],
    condition: [
      {
        en: 'Condition : Should come after uptrend',
        bn: 'শর্ত : আপট্রেন্ডের পর রেজিস্ট্যান্স জোনে আসতে হবে',
      },
    ],
    meaning: [
      {
        en: 'Meaning : Bullish trend reversal pattern (Reversal to Downside)',
        bn: 'অর্থ : বুলিশ ট্রেন্ড রিভার্সাল প্যাটার্ন (ডাউনসাইড রিভার্সাল)',
      },
    ],
    significance: [
      {
        en: 'Significance : Price can go down',
        bn: 'তাৎপর্য : প্রাইস নিচে নামার প্রবল সম্ভাবনা',
      },
    ],
    psychology: {
      en: 'Buyers looked strong on Candle 1. Candle 2 opened higher, but aggressive sellers overpowered buyers completely, pushing price well below Candle 1 open.',
      bn: '১ম ক্যান্ডেলে ক্রেতারা মার্কেট নিয়ন্ত্রণ রাখলেও ২য় ক্যান্ডেলে বড় বড় সেলাররা মার্কেট ডাম্প করে সমস্ত গেইন মুছে দেয়।',
    },
    actionTip: {
      en: 'Enter short below the low of the 2nd candle. Stop Loss above the high of Candle 2.',
      bn: '২য় ক্যান্ডেলের লো ভাঙলে শর্ট সেল করুন। স্টপ লস ২য় ক্যান্ডেলের হাইয়ের ওপরে রাখুন।',
    },
    contextTrend: 'uptrend',
    candles: [
      {
        open: 42,
        close: 64,
        high: 72,
        low: 34,
        color: 'bull',
        label: '1st Candle',
        topAnnotation: 'Close',
        bottomAnnotation: 'Open',
        bodyAnnotation: 'Smaller Body',
      },
      {
        open: 70,
        close: 22,
        high: 78,
        low: 14,
        color: 'bear',
        label: '2nd Candle',
        topAnnotation: 'Open (Higher)',
        bottomAnnotation: 'Close (Lower)',
        bodyAnnotation: 'Engulfs 1st Body',
      },
    ],
    arrows: [
      { candleIndex: 1, direction: 'down', label: 'Price Reversal Down', color: '#ef4444' },
    ],
    deepLinkId: 'bearish-engulfing',
  },

  {
    id: 'tweezer-bottom',
    slideNumber: '7',
    title: {
      en: 'Tweezer Bottom Pattern',
      bn: 'টুইজার বটম প্যাটার্ন (Tweezer Bottom)',
    },
    category: 'multi-candle',
    type: 'bullish',
    badge: {
      en: 'Two Candles · Support Reversal',
      bn: 'দুই ক্যান্ডেল · সাপোর্ট রিভার্সাল',
    },
    bodyRule: [
      {
        en: 'Body / Lows : Body bottoms or lower wicks should be on the same horizontal line',
        bn: 'বডি / লো : ক্যান্ডেলদ্বয়ের লোয়ার উইক বা বডির বটম একই সমান্তরাল লাইনে থাকতে হবে',
      },
    ],
    condition: [
      {
        en: 'Condition : Should come after downtrend',
        bn: 'শর্ত : ডাউনট্রেন্ডের পর সাপোর্ট জোনে আসতে হবে',
      },
    ],
    meaning: [
      {
        en: 'Meaning : Bearish trend reversal pattern',
        bn: 'অর্থ : বেয়ারিশ ট্রেন্ড রিভার্সাল প্যাটার্ন (ডাউনট্রেন্ড সমাপ্তি)',
      },
    ],
    significance: [
      {
        en: 'Significance : Price can go up',
        bn: 'তাৎপর্য : প্রাইস ওপরে যাওয়ার জোরালো সম্ভাবনা',
      },
    ],
    psychology: {
      en: 'Price tested the exact same price level twice and failed both times to push lower. The level acts as an impenetrable rock wall of institutional buy orders.',
      bn: 'প্রাইস একই লেভেলে পরপর দুবার টেস্ট করে ব্যর্থ হয়েছে। এই লেভেলে প্রাতিষ্ঠানিক ক্রেতাদের পাথরের মতো শক্ত সাপোর্ট রয়েছে।',
    },
    actionTip: {
      en: 'Buy on break of the high of Candle 2. Stop Loss just under the twin bottoms.',
      bn: '২য় ক্যান্ডেলের হাই ব্রেক করলে বাই করুন, স্টপ লস টুইন বটমের নিচে।',
    },
    contextTrend: 'downtrend',
    candles: [
      {
        open: 70,
        close: 35,
        high: 78,
        low: 15,
        color: 'bear',
        label: '1st Candle',
        topAnnotation: 'Open',
        bottomAnnotation: 'Close',
        bodyAnnotation: 'Tested Low',
      },
      {
        open: 36,
        close: 68,
        high: 75,
        low: 15,
        color: 'bull',
        label: '2nd Candle',
        topAnnotation: 'Close',
        bottomAnnotation: 'Open',
        bodyAnnotation: 'Tested Same Low',
      },
    ],
    guideLines: [
      { yValue: 15, label: 'Matching Lows on Same Line', style: 'dashed', color: '#38bdf8' },
    ],
    arrows: [
      { candleIndex: 1, direction: 'up', label: 'Bounce from Support', color: '#22c55e' },
    ],
    deepLinkId: 'tweezer-bottom',
  },

  {
    id: 'tweezer-top',
    slideNumber: '8',
    title: {
      en: 'Tweezer Tops Pattern',
      bn: 'টুইজার টপ প্যাটার্ন (Tweezer Tops)',
    },
    category: 'multi-candle',
    type: 'bearish',
    badge: {
      en: 'Two Candles · Resistance Reversal',
      bn: 'দুই ক্যান্ডেল · রেজিস্ট্যান্স রিভার্সাল',
    },
    bodyRule: [
      {
        en: 'Body / Highs : Body tops or upper wicks should be on an equal line',
        bn: 'বডি / হাই : ক্যান্ডেলদ্বয়ের আপার উইক বা বডির টপ একই সমান্তরাল লাইনে থাকতে হবে',
      },
    ],
    condition: [
      {
        en: 'Condition : Should come after up-trend',
        bn: 'শর্ত : আপট্রেন্ডের পর রেজিস্ট্যান্স জোনে আসতে হবে',
      },
    ],
    meaning: [
      {
        en: 'Meaning : Bullish trend reversal pattern',
        bn: 'অর্থ : বুলিশ ট্রেন্ড রিভার্সাল প্যাটার্ন (আপট্রেন্ডের সমাপ্তি)',
      },
    ],
    significance: [
      {
        en: 'Significance : Price can go down',
        bn: 'তাৎপর্য : প্রাইস নিচে নামার জোরালো সম্ভাবনা',
      },
    ],
    psychology: {
      en: 'Bulls pushed price to a high on Candle 1. On Candle 2, bulls tried again but hit the identical resistance barrier, causing a double-top rejection.',
      bn: '১ম ক্যান্ডেলে বায়াররা হাই তৈরি করে। ২য় ক্যান্ডেলে বায়াররা পুনরায় সেই হাই ভাঙার চেষ্টা করে একই রেজিস্ট্যান্স থেকে রিজেক্টেড হয়।',
    },
    actionTip: {
      en: 'Sell on break below the low of Candle 2. Stop Loss 2-3 pips above the twin highs.',
      bn: '২য় ক্যান্ডেলের লো ব্রেক করলে সেল ট্রেড ওপেন করুন। স্টপ লস টুইন হাইয়ের ২-৩ পিপস ওপরে দিন।',
    },
    contextTrend: 'uptrend',
    candles: [
      {
        open: 30,
        close: 68,
        high: 88,
        low: 22,
        color: 'bull',
        label: '1st Candle',
        topAnnotation: 'Close',
        bottomAnnotation: 'Open',
        bodyAnnotation: 'Hit High',
      },
      {
        open: 66,
        close: 32,
        high: 88,
        low: 24,
        color: 'bear',
        label: '2nd Candle',
        topAnnotation: 'Open',
        bottomAnnotation: 'Close',
        bodyAnnotation: 'Hit Same High',
      },
    ],
    guideLines: [
      { yValue: 88, label: 'Matching Highs on Equal Line', style: 'dashed', color: '#f43f5e' },
    ],
    arrows: [
      { candleIndex: 1, direction: 'down', label: 'Rejection from Resistance', color: '#ef4444' },
    ],
    deepLinkId: 'tweezer-top',
  },

  {
    id: 'piercing-line',
    slideNumber: '11',
    title: {
      en: 'Piercing Line Pattern',
      bn: 'পিয়ার্সিং লাইন প্যাটার্ন (Piercing Line)',
    },
    category: 'multi-candle',
    type: 'bullish',
    badge: {
      en: 'Two Candles · 50% Penetration Reversal',
      bn: 'দুই ক্যান্ডেল · ৫০% বডি পেনিট্রেশন',
    },
    bodyRule: [
      {
        en: 'Body : 2nd candle penetrates and closes above the 50% midpoint of 1st candle',
        bn: 'বডি : ২য় বুলিশ ক্যান্ডেল ১ম বেয়ারিশ ক্যান্ডেলের ৫০% মিডপয়েন্টের ওপরে গিয়ে ক্লোজ দেয়',
      },
    ],
    condition: [
      {
        en: 'Condition : Forms at key support after an extended downtrend',
        bn: 'শর্ত : দীর্ঘ ডাউনট্রেন্ডের পর সাপোর্ট জোনে গঠিত হতে হবে',
      },
    ],
    meaning: [
      {
        en: 'Meaning : Bullish revival (Bears lose grip)',
        bn: 'অর্থ : ক্রেতাদের শক্তিশালী প্রত্যাবর্তন (বিক্রেতাদের নিয়ন্ত্রণ হারানো)',
      },
    ],
    significance: [
      {
        en: 'Significance : Price reverses and heads upward',
        bn: 'তাৎপর্য : ডাউনট্রেন্ড ঘুরে গিয়ে ঊর্ধ্বমুখী মুভমেন্ট শুরু হওয়া',
      },
    ],
    psychology: {
      en: 'Bears opened lower but buyers aggressively absorbed supply and shoved price into the upper half of the prior day body.',
      bn: 'সেলাররা নিচে ওপেন করালেও বায়াররা অর্ধেক বা তার বেশি ক্ষতি রিকভার করে বুলিশ শক্তি প্রমাণ করে।',
    },
    actionTip: {
      en: 'Enter long on Candle 2 close. Stop Loss below the low of Candle 2.',
      bn: '২য় ক্যান্ডেল ক্লোজে বাই এন্ট্রি নিন। স্টপ লস ২য় ক্যান্ডেলের লো এর নিচে রাখুন।',
    },
    contextTrend: 'downtrend',
    candles: [
      {
        open: 75,
        close: 30,
        high: 80,
        low: 25,
        color: 'bear',
        label: '1st (Bearish)',
        topAnnotation: 'Open',
        bottomAnnotation: 'Close',
        bodyAnnotation: 'Prior Downtrend',
      },
      {
        open: 20,
        close: 62,
        high: 68,
        low: 16,
        color: 'bull',
        label: '2nd (Bullish)',
        topAnnotation: 'Close > 50%',
        bottomAnnotation: 'Gap Open',
        bodyAnnotation: '>50% Retracement',
      },
    ],
    guideLines: [
      { yValue: 52.5, label: '50% Body Midpoint', style: 'dashed', color: '#f5b301' },
    ],
    arrows: [
      { candleIndex: 1, direction: 'up', label: 'Bullish Reversal', color: '#22c55e' },
    ],
    deepLinkId: 'piercing-line',
  },

  {
    id: 'dark-cloud-cover',
    slideNumber: '12',
    title: {
      en: 'Dark Cloud Cover',
      bn: 'ডার্ক ক্লাউড কভার (Dark Cloud Cover)',
    },
    category: 'multi-candle',
    type: 'bearish',
    badge: {
      en: 'Two Candles · 50% Penetration Reversal',
      bn: 'দুই ক্যান্ডেল · ৫০% বডি পেনিট্রেশন',
    },
    bodyRule: [
      {
        en: 'Body : 2nd candle penetrates and closes below the 50% midpoint of 1st candle',
        bn: 'বডি : ২য় বেয়ারিশ ক্যান্ডেল ১ম বুলিশ ক্যান্ডেলের ৫০% মিডপয়েন্টের নিচে ক্লোজ দেয়',
      },
    ],
    condition: [
      {
        en: 'Condition : Forms at key resistance after an extended uptrend',
        bn: 'শর্ত : দীর্ঘ আপট্রেন্ডের পর রেজিস্ট্যান্স জোনে গঠিত হতে হবে',
      },
    ],
    meaning: [
      {
        en: 'Meaning : Bearish takeover (Bulls trapped at high)',
        bn: 'অর্থ : বিক্রেতাদের নিয়ন্ত্রণ প্রতিষ্ঠা (শীর্ষে ক্রেতাদের ফাঁদ)',
      },
    ],
    significance: [
      {
        en: 'Significance : Price reverses and heads downward',
        bn: 'তাৎপর্য : আপট্রেন্ড শেষ হয়ে নিম্নমুখী যাত্রা শুরু হওয়া',
      },
    ],
    psychology: {
      en: 'Bulls opened higher with enthusiasm, but sellers swarmed the market and pushed price deeply into the prior green candle.',
      bn: 'বায়াররা উপরে ওপেন করে উল্লসিত হলেও সেলাররা আঘাত হেনে পূর্বের অর্ধেকের বেশি গেইন মুছে দেয়।',
    },
    actionTip: {
      en: 'Enter short on Candle 2 close. Stop Loss above the high of Candle 2.',
      bn: '২য় ক্যান্ডেল ক্লোজে সেল করুন। স্টপ লস ২য় ক্যান্ডেলের হাইয়ের ওপরে রাখুন।',
    },
    contextTrend: 'uptrend',
    candles: [
      {
        open: 28,
        close: 75,
        high: 80,
        low: 22,
        color: 'bull',
        label: '1st (Bullish)',
        topAnnotation: 'Close',
        bottomAnnotation: 'Open',
        bodyAnnotation: 'Prior Uptrend',
      },
      {
        open: 84,
        close: 42,
        high: 88,
        low: 36,
        color: 'bear',
        label: '2nd (Bearish)',
        topAnnotation: 'Open Higher',
        bottomAnnotation: 'Close < 50%',
        bodyAnnotation: '<50% Retracement',
      },
    ],
    guideLines: [
      { yValue: 51.5, label: '50% Body Midpoint', style: 'dashed', color: '#f5b301' },
    ],
    arrows: [
      { candleIndex: 1, direction: 'down', label: 'Bearish Reversal', color: '#ef4444' },
    ],
    deepLinkId: 'dark-cloud-cover',
  },

  {
    id: 'bullish-harami',
    slideNumber: '13',
    title: {
      en: 'Bullish Harami',
      bn: 'বুলিশ হারামি (Bullish Harami)',
    },
    category: 'multi-candle',
    type: 'bullish',
    badge: {
      en: 'Two Candles · Inside Conception',
      bn: 'দুই ক্যান্ডেল · ইনসাইড বডি',
    },
    bodyRule: [
      {
        en: 'Body : 2nd candle body is completely enclosed inside the 1st candle body',
        bn: 'বডি : ২য় ছোট ক্যান্ডেলটি ১ম বড় ক্যান্ডেলের বডির সম্পূর্ণ ভেতরে অবস্থান করে',
      },
    ],
    condition: [
      {
        en: 'Condition : Appears after an aggressive downtrend',
        bn: 'শর্ত : তীব্র ডাউনট্রেন্ডের পর সাপোর্ট জোনে আসতে হবে',
      },
    ],
    meaning: [
      {
        en: 'Meaning : Selling momentum has ground to a complete halt',
        bn: 'অর্থ : সেলারদের শক্তিক্ষয় এবং বিক্রয় গতির আকস্মিক সমাপ্তি',
      },
    ],
    significance: [
      {
        en: 'Significance : Trend pause or bullish trend reversal',
        bn: 'তাৎপর্য : ট্রেন্ড বিরতি অথবা ঊর্ধ্বমুখী রিভার্সাল',
      },
    ],
    psychology: {
      en: 'The market was falling hard on Candle 1. On Candle 2, sellers failed to make a lower low and trading contracted tightly inside the prior body.',
      bn: '১ম ক্যান্ডেলে পতন হলেও ২য় ক্যান্ডেলে সেলাররা আর নতুন লো বানাতে পারেনি। ভলিউম সংকুচিত হয়ে বায়ারদের উপস্থিতির জানান দেয়।',
    },
    actionTip: {
      en: 'Wait for Candle 3 to break above the high of the mother candle before entering long.',
      bn: 'মাদার ক্যান্ডেলের হাই ভাঙলে তবেই বাই এন্ট্রি নিন।',
    },
    contextTrend: 'downtrend',
    candles: [
      {
        open: 78,
        close: 26,
        high: 84,
        low: 20,
        color: 'bear',
        label: 'Mother Candle',
        topAnnotation: 'Open',
        bottomAnnotation: 'Close',
        bodyAnnotation: 'Large Range',
      },
      {
        open: 38,
        close: 58,
        high: 64,
        low: 34,
        color: 'bull',
        label: 'Baby Candle',
        topAnnotation: 'Close',
        bottomAnnotation: 'Open',
        bodyAnnotation: 'Inside Body',
      },
    ],
    arrows: [
      { candleIndex: 1, direction: 'up', label: 'Pause / Reversal', color: '#22c55e' },
    ],
    deepLinkId: 'bullish-harami',
  },

  {
    id: 'bearish-harami',
    slideNumber: '14',
    title: {
      en: 'Bearish Harami',
      bn: 'বেয়ারিশ হারামি (Bearish Harami)',
    },
    category: 'multi-candle',
    type: 'bearish',
    badge: {
      en: 'Two Candles · Inside Conception',
      bn: 'দুই ক্যান্ডেল · ইনসাইড বডি',
    },
    bodyRule: [
      {
        en: 'Body : 2nd candle body is completely enclosed inside the 1st candle body',
        bn: 'বডি : ২য় ছোট ক্যান্ডেলটি ১ম বড় বুলিশ ক্যান্ডেলের বডির সম্পূর্ণ ভেতরে অবস্থান করে',
      },
    ],
    condition: [
      {
        en: 'Condition : Appears after an aggressive uptrend',
        bn: 'শর্ত : তীব্র আপট্রেন্ডের পর রেজিস্ট্যান্স জোনে আসতে হবে',
      },
    ],
    meaning: [
      {
        en: 'Meaning : Buying momentum has ground to a complete halt',
        bn: 'অর্থ : বায়ারদের শক্তিক্ষয় এবং ক্রয়ের আকস্মিক সমাপ্তি',
      },
    ],
    significance: [
      {
        en: 'Significance : Trend pause or bearish trend reversal',
        bn: 'তাৎপর্য : ট্রেন্ড বিরতি অথবা নিম্নমুখী রিভার্সাল',
      },
    ],
    psychology: {
      en: 'Bulls rallied on Candle 1. Candle 2 failed to make a higher high, closing weakly inside the mother bar range.',
      bn: '১ম ক্যান্ডেলে বড় উত্থানের পর ২য় ক্যান্ডেলে বায়াররা কোনো নতুন হাই বানাতে অক্ষম হয়।',
    },
    actionTip: {
      en: 'Wait for Candle 3 to break below the low of the mother candle before going short.',
      bn: 'মাদার ক্যান্ডেলের লো ভাঙলে তবেই শর্ট এন্ট্রি নিন।',
    },
    contextTrend: 'uptrend',
    candles: [
      {
        open: 26,
        close: 78,
        high: 84,
        low: 20,
        color: 'bull',
        label: 'Mother Candle',
        topAnnotation: 'Close',
        bottomAnnotation: 'Open',
        bodyAnnotation: 'Large Range',
      },
      {
        open: 64,
        close: 42,
        high: 68,
        low: 38,
        color: 'bear',
        label: 'Baby Candle',
        topAnnotation: 'Open',
        bottomAnnotation: 'Close',
        bodyAnnotation: 'Inside Body',
      },
    ],
    arrows: [
      { candleIndex: 1, direction: 'down', label: 'Pause / Reversal', color: '#ef4444' },
    ],
    deepLinkId: 'bearish-harami',
  },

  {
    id: 'inside-bar',
    slideNumber: '15',
    title: {
      en: 'Inside Bar (Compression)',
      bn: 'ইনসাইড বার (Inside Bar)',
    },
    category: 'multi-candle',
    type: 'neutral',
    badge: {
      en: 'Two Candles · Volatility Compression',
      bn: 'দুই ক্যান্ডেল · ভোলাটিলিটি কমপ্রেশন',
    },
    bodyRule: [
      {
        en: 'Range : High and Low of Candle 2 completely inside High and Low of Candle 1',
        bn: 'রেঞ্জ : ২য় ক্যান্ডেলের সম্পূর্ণ হাই এবং লো ১ম মাদার ক্যান্ডেলের ভেতরে অবস্থান করে',
      },
    ],
    condition: [
      {
        en: 'Condition : Forms during trend pause or consolidation',
        bn: 'শর্ত : ট্রেন্ডের মাঝে বিরতিতে বা কনসলিডেশনে তৈরি হয়',
      },
    ],
    meaning: [
      {
        en: 'Meaning : Volatility coil / Market energy storage',
        bn: 'অর্থ : স্প্রিংয়ের মতো শক্তি সঞ্চয় (ব্রেকআউটের পূর্বলক্ষণ)',
      },
    ],
    significance: [
      {
        en: 'Significance : Explosive breakout in direction of the break',
        bn: 'তাৎপর্য : যেদিকে হাই বা লো ব্রেক করবে সেদিকে জোরালো মুভ',
      },
    ],
    psychology: {
      en: 'Market enters a temporary pause where neither buyers nor sellers are willing to commit at current prices.',
      bn: 'মার্কেট সাময়িক বিশ্রামে চলে যায় এবং উভয় পক্ষ পরবর্তী বড় মুভমেন্টের জন্য প্রস্তুতি নেয়।',
    },
    actionTip: {
      en: 'Trade the breakout of the mother bar extreme in the direction of the dominant trend.',
      bn: 'মূল ট্রেন্ডের দিকে মাদার বারের হাই অথবা লো ব্রেকআউটে ট্রেড নিন।',
    },
    candles: [
      {
        open: 30,
        close: 72,
        high: 86,
        low: 18,
        color: 'bull',
        label: 'Mother Bar',
        topAnnotation: 'Mother High',
        bottomAnnotation: 'Mother Low',
        bodyAnnotation: 'Range Container',
      },
      {
        open: 60,
        close: 45,
        high: 68,
        low: 38,
        color: 'bear',
        label: 'Inside Bar',
        topAnnotation: 'Lower High',
        bottomAnnotation: 'Higher Low',
        bodyAnnotation: 'Contained Range',
      },
    ],
    guideLines: [
      { yValue: 86, label: 'Mother High Breakout Level', style: 'dashed', color: '#22c55e' },
      { yValue: 18, label: 'Mother Low Breakdown Level', style: 'dashed', color: '#ef4444' },
    ],
    deepLinkId: 'inside-bar',
  },

  {
    id: 'outside-bar',
    slideNumber: '16',
    title: {
      en: 'Outside Bar (Engulfing Range)',
      bn: 'আউটসাইড বার (Outside Bar)',
    },
    category: 'multi-candle',
    type: 'reversal',
    badge: {
      en: 'Two Candles · Volatility Expansion',
      bn: 'দুই ক্যান্ডেল · ভোলাটিলিটি এক্সপ্যানশন',
    },
    bodyRule: [
      {
        en: 'Range : Candle 2 creates both a higher high and lower low than Candle 1',
        bn: 'রেঞ্জ : ২য় ক্যান্ডেল ১ম ক্যান্ডেলের চেয়েও বেশি হাই এবং লো তৈরি করে সম্পূর্ণ গ্রাস করে',
      },
    ],
    condition: [
      {
        en: 'Condition : Follows a narrow range bar or key support/resistance sweep',
        bn: 'শর্ত : ছোট রেঞ্জের পর অথবা লিকুইডিটি সুইপ করার পর তৈরি হয়',
      },
    ],
    meaning: [
      {
        en: 'Meaning : Extreme volatility expansion / stop hunt',
        bn: 'অর্থ : তীব্র অস্থিরতা এবং দুই পাশের স্টপ লস হান্টিং',
      },
    ],
    significance: [
      {
        en: 'Significance : Follow-through in the direction of the close',
        bn: 'তাৎপর্য : ক্যান্ডেলটি যেদিকে ক্লোজ হয় সেদিকে ট্রেন্ডের ধারাবাহিকতা',
      },
    ],
    psychology: {
      en: 'Whales sweep liquidity on both sides of the previous bar, then drive price aggressively into the close.',
      bn: 'বড় প্রাতিষ্ঠানিক প্লেয়াররা আগের বারের দুই পাশের লিকুইডিটি নিয়ে নিয়ে এক প্রান্তে জোরপূর্বক ক্লোজ দেয়।',
    },
    actionTip: {
      en: 'Trade in the direction of the close if it closes near its extreme.',
      bn: 'ক্যান্ডেলের ক্লোজ যদি শীর্ষ বা তলদেশের কাছে হয়, তবে সেই দিকে ট্রেড নিন।',
    },
    candles: [
      {
        open: 42,
        close: 58,
        high: 65,
        low: 35,
        color: 'bull',
        label: 'Inside Range',
        topAnnotation: 'Prior High',
        bottomAnnotation: 'Prior Low',
        bodyAnnotation: 'Small Range',
      },
      {
        open: 64,
        close: 18,
        high: 88,
        low: 12,
        color: 'bear',
        label: 'Outside Bar',
        topAnnotation: 'Higher High',
        bottomAnnotation: 'Lower Low',
        bodyAnnotation: 'Engulfs High & Low',
      },
    ],
    arrows: [
      { candleIndex: 1, direction: 'down', label: 'Expansion Drive', color: '#ef4444' },
    ],
    deepLinkId: 'outside-bar',
  },

  // ─── 4. THREE CANDLE FORMATIONS ───────────────────────────────────────
  {
    id: 'morning-star',
    slideNumber: '9',
    title: {
      en: 'Morning Star Pattern',
      bn: 'মর্নিং স্টার প্যাটার্ন (Morning Star)',
    },
    category: 'multi-candle',
    type: 'bullish',
    badge: {
      en: 'Three Candles · High Probability Bullish Reversal',
      bn: 'তিন ক্যান্ডেল · হাই প্রোবাবিলিটি বুলিশ রিভার্সাল',
    },
    bodyRule: [
      {
        en: '3-Candle Sequence : Large Bearish -> Small Indecision / Star -> Large Bullish (>50% penetration)',
        bn: '৩-ক্যান্ডেল সিকোয়েন্স : বড় বেয়ারিশ -> ছোট ইনডিসিশন স্টার -> বড় বুলিশ (>৫০% পেনাট্রেশন)',
      },
    ],
    condition: [
      {
        en: 'Condition : Appears at the bottom of a prolonged downtrend',
        bn: 'শর্ত : দীর্ঘস্থায়ী ডাউনট্রেন্ডের একদম তলদেশে গঠিত হতে হবে',
      },
    ],
    meaning: [
      {
        en: 'Meaning : Complete shift in market control from bears to bulls',
        bn: 'অর্থ : বিক্রেতাদের হাত থেকে ক্রেতাদের হাতে মার্কেট নিয়ন্ত্রণের সম্পূর্ণ হস্তান্তর',
      },
    ],
    significance: [
      {
        en: 'Significance : Price reverses and heads upward with high momentum',
        bn: 'তাৎপর্য : প্রাইস নিশ্চিতভাবে ঘুরে দাঁড়িয়ে শক্তিশালী ঊর্ধ্বমুখী যাত্রা শুরু করে',
      },
    ],
    psychology: {
      en: 'Candle 1 confirms panic selling. Candle 2 shows bears losing steam (indecision). Candle 3 shows bulls flooding the market, confirming a bottom.',
      bn: '১ম ক্যান্ডেলে আতঙ্কিত সেল হয়। ২য় ক্যান্ডেলে সেলারদের শক্তি ফুরিয়ে যায় (ছোট স্টার)। ৩য় ক্যান্ডেলে বায়াররা এসে অর্ধেক বা তার চেয়ে বেশি রিকভারি করে রিভার্সাল কনফার্ম করে।',
    },
    actionTip: {
      en: 'Enter long on the close of Candle 3. Place Stop Loss below the star low.',
      bn: '৩য় ক্যান্ডেল ক্লোজের সাথে সাথে বাই এন্ট্রি নিন। স্টপ লস ২য় ক্যান্ডেল (স্টার)-এর লো এর নিচে দিন।',
    },
    contextTrend: 'downtrend',
    candles: [
      {
        open: 78,
        close: 38,
        high: 84,
        low: 32,
        color: 'bear',
        label: '1st (Bearish)',
        topAnnotation: 'Open',
        bottomAnnotation: 'Close',
        bodyAnnotation: 'Bearish Momentum',
      },
      {
        open: 26,
        close: 28,
        high: 34,
        low: 14,
        color: 'neutral',
        label: '2nd (Star)',
        topAnnotation: 'Star High',
        bottomAnnotation: 'Star Low',
        bodyAnnotation: 'Indecision',
      },
      {
        open: 32,
        close: 72,
        high: 78,
        low: 28,
        color: 'bull',
        label: '3rd (Bullish)',
        topAnnotation: 'Close > 50%',
        bottomAnnotation: 'Open',
        bodyAnnotation: 'Bullish Confirmation',
      },
    ],
    arrows: [
      { candleIndex: 2, direction: 'up', label: 'Sunrise Reversal Up', color: '#22c55e' },
    ],
    deepLinkId: 'morning-star',
  },

  {
    id: 'evening-star',
    slideNumber: '10',
    title: {
      en: 'Evening Star Pattern',
      bn: 'ইভনিং স্টার প্যাটার্ন (Evening Star)',
    },
    category: 'multi-candle',
    type: 'bearish',
    badge: {
      en: 'Three Candles · High Probability Bearish Reversal',
      bn: 'তিন ক্যান্ডেল · হাই প্রোবাবিলিটি বেয়ারিশ রিভার্সাল',
    },
    bodyRule: [
      {
        en: '3-Candle Sequence : Large Bullish -> Small Star at Top -> Large Bearish (>50% penetration)',
        bn: '৩-ক্যান্ডেল সিকোয়েন্স : বড় বুলিশ -> শীর্ষে ছোট স্টার -> বড় বেয়ারিশ (>৫০% রিট্রেসমেন্ট)',
      },
    ],
    condition: [
      {
        en: 'Condition : Appears at the peak of an extended uptrend',
        bn: 'শর্ত : দীর্ঘ আপট্রেন্ডের চূড়ায় রেজিস্ট্যান্সের কাছে গঠিত হতে হবে',
      },
    ],
    meaning: [
      {
        en: 'Meaning : Bullish exhaustion followed by institutional selloff',
        bn: 'অর্থ : ক্রেতাদের ক্লান্তি এবং প্রাতিষ্ঠানিক বিক্রেতাদের বড় ধরণের সেল প্রেসার',
      },
    ],
    significance: [
      {
        en: 'Significance : Price reverses and heads downward',
        bn: 'তাৎপর্য : আপট্রেন্ড শেষ হয়ে নিম্নমুখী ট্রেন্ড শুরু হওয়ার সংকেত',
      },
    ],
    psychology: {
      en: 'Candle 1 looks confident for bulls. Candle 2 stalls at highs. Candle 3 plunges deeply into Candle 1, trapping late retail breakout buyers.',
      bn: '১ম ক্যান্ডেল বায়ারদের উল্লাস দেখায়। ২য় ক্যান্ডেল হাইতে আটকে যায়। ৩য় ক্যান্ডেল তীব্র গতিতে ভেঙে পড়ে দেরিতে আসা রিটেইল বায়ারদের ট্র্যাপ করে।',
    },
    actionTip: {
      en: 'Enter short on Candle 3 close. Stop Loss above the star peak.',
      bn: '৩য় ক্যান্ডেল ক্লোজের সাথে সাথে শর্ট সেল করুন। স্টপ লস স্টার এর হাইয়ের সামান্য ওপরে রাখুন।',
    },
    contextTrend: 'uptrend',
    candles: [
      {
        open: 24,
        close: 68,
        high: 72,
        low: 18,
        color: 'bull',
        label: '1st (Bullish)',
        topAnnotation: 'Close',
        bottomAnnotation: 'Open',
        bodyAnnotation: 'Bullish Momentum',
      },
      {
        open: 74,
        close: 76,
        high: 92,
        low: 70,
        color: 'neutral',
        label: '2nd (Star)',
        topAnnotation: 'Star Peak',
        bottomAnnotation: 'Star Low',
        bodyAnnotation: 'Exhaustion',
      },
      {
        open: 72,
        close: 30,
        high: 74,
        low: 22,
        color: 'bear',
        label: '3rd (Bearish)',
        topAnnotation: 'Open',
        bottomAnnotation: 'Close < 50%',
        bodyAnnotation: 'Bearish Confirmation',
      },
    ],
    arrows: [
      { candleIndex: 2, direction: 'down', label: 'Sunset Reversal Down', color: '#ef4444' },
    ],
    deepLinkId: 'evening-star',
  },

  {
    id: 'three-white-soldiers',
    slideNumber: '17',
    title: {
      en: 'Three White Soldiers',
      bn: 'থ্রি হোয়াইট সোলজার্স (Three White Soldiers)',
    },
    category: 'multi-candle',
    type: 'bullish',
    badge: {
      en: 'Three Candles · Unstoppable Bullish Advance',
      bn: 'তিন ক্যান্ডেল · অপরাজেয় বুলিশ অগ্রযাত্রা',
    },
    bodyRule: [
      {
        en: 'Body : 3 consecutive long green candles, each opening within the prior body and closing at higher highs',
        bn: 'বডি : পরপর ৩টি দীর্ঘ সবুজ ক্যান্ডেল, প্রতিটি আগের বডির ভেতর ওপেন হয়ে নতুন হাইতে ক্লোজ দেয়',
      },
    ],
    condition: [
      {
        en: 'Condition : Forms at bottom of downtrend or breakout of consolidation',
        bn: 'শর্ত : ডাউনট্রেন্ডের তলদেশে বা দীর্ঘ কনসলিডেশন ব্রেকআউটে তৈরি হয়',
      },
    ],
    meaning: [
      {
        en: 'Meaning : Unstoppable institutional accumulation',
        bn: 'অর্থ : বাঁধভাঙা প্রাতিষ্ঠানিক ক্রয়চাপ',
      },
    ],
    significance: [
      {
        en: 'Significance : Strong sustained bullish trend initiation',
        bn: 'তাৎপর্য : শক্তিশালী ও দীর্ঘস্থায়ী আপট্রেন্ড শুরু হওয়ার ইঙ্গিত',
      },
    ],
    psychology: {
      en: 'Bulls take ground session after session without letting bears pull back. Wicks remain small, confirming persistent aggressive market buying.',
      bn: 'প্রতিটি সেশনে বায়াররা মার্কেট দখলে রাখে। উইক অতি ক্ষুদ্র হওয়ায় প্রমাণ হয় কোনো রিট্রেসমেন্ট ছাড়াই একপাক্ষিক বাই হয়েছে।',
    },
    actionTip: {
      en: 'Buy on pullbacks to the high of Candle 2 or 3. Do not chase extended candles.',
      bn: '২য় বা ৩য় ক্যান্ডেলের হাইতে রিটেস্টে বাই করুন। অতিরিক্ত প্রসারিত হলে পেছনে ছুটবেন না।',
    },
    contextTrend: 'downtrend',
    candles: [
      {
        open: 20,
        close: 45,
        high: 48,
        low: 16,
        color: 'bull',
        label: 'Soldier 1',
        topAnnotation: 'Close',
        bottomAnnotation: 'Open',
        bodyAnnotation: 'Initial Thrust',
      },
      {
        open: 40,
        close: 68,
        high: 72,
        low: 38,
        color: 'bull',
        label: 'Soldier 2',
        topAnnotation: 'Higher Close',
        bottomAnnotation: 'Open in Body',
        bodyAnnotation: 'Follow-Through',
      },
      {
        open: 64,
        close: 92,
        high: 96,
        low: 62,
        color: 'bull',
        label: 'Soldier 3',
        topAnnotation: 'Highest Close',
        bottomAnnotation: 'Open in Body',
        bodyAnnotation: 'Expansion',
      },
    ],
    arrows: [
      { candleIndex: 2, direction: 'up', label: 'Rally Upward', color: '#22c55e' },
    ],
    deepLinkId: 'three-white-soldiers',
  },

  {
    id: 'three-black-crows',
    slideNumber: '18',
    title: {
      en: 'Three Black Crows',
      bn: 'থ্রি ব্ল্যাক ক্রোজ (Three Black Crows)',
    },
    category: 'multi-candle',
    type: 'bearish',
    badge: {
      en: 'Three Candles · Unstoppable Bearish Breakdown',
      bn: 'তিন ক্যান্ডেল · অপরাজেয় বেয়ারিশ পতন',
    },
    bodyRule: [
      {
        en: 'Body : 3 consecutive long red candles, each opening within the prior body and closing at lower lows',
        bn: 'বডি : পরপর ৩টি দীর্ঘ লাল ক্যান্ডেল, প্রতিটি আগের বডির ভেতর ওপেন হয়ে নতুন লোতে ক্লোজ দেয়',
      },
    ],
    condition: [
      {
        en: 'Condition : Forms at peak of uptrend or breakdown of support',
        bn: 'শর্ত : আপট্রেন্ডের চূড়ায় অথবা শক্ত সাপোর্ট ভেঙে নিচে নামার সময় তৈরি হয়',
      },
    ],
    meaning: [
      {
        en: 'Meaning : Unstoppable institutional distribution & panic selloff',
        bn: 'অর্থ : বাঁধভাঙা প্রাতিষ্ঠানিক বিক্রয় এবং ব্যাপক প্যানিক সেল',
      },
    ],
    significance: [
      {
        en: 'Significance : Strong sustained bearish trend initiation',
        bn: 'তাৎপর্য : শক্তিশালী ও দীর্ঘস্থায়ী ডাউনট্রেন্ড শুরু হওয়ার ইঙ্গিত',
      },
    ],
    psychology: {
      en: 'Bears drive price down relentlessly. Buyers have completely retreated, leaving an order book void filled only by sell market orders.',
      bn: 'বিক্রেতারা নির্দয়ভাবে প্রাইস নামিয়ে দেয়। বায়াররা পুরোপুরি সরে যাওয়ায় মার্কেট একটানা পতন ঘটায়।',
    },
    actionTip: {
      en: 'Short on small bounces towards Candle 2 or 3 breakdown level. Stop Loss above Candle 1.',
      bn: '২য় বা ৩য় ক্যান্ডেলের লেভেলে ছোট বাউন্সে শর্ট সেল করুন। স্টপ লস ১ম ক্যান্ডেলের ওপরে।',
    },
    contextTrend: 'uptrend',
    candles: [
      {
        open: 92,
        close: 68,
        high: 96,
        low: 64,
        color: 'bear',
        label: 'Crow 1',
        topAnnotation: 'Open',
        bottomAnnotation: 'Close',
        bodyAnnotation: 'Initial Plunge',
      },
      {
        open: 72,
        close: 44,
        high: 74,
        low: 40,
        color: 'bear',
        label: 'Crow 2',
        topAnnotation: 'Open in Body',
        bottomAnnotation: 'Lower Close',
        bodyAnnotation: 'Heavy Selling',
      },
      {
        open: 48,
        close: 18,
        high: 50,
        low: 14,
        color: 'bear',
        label: 'Crow 3',
        topAnnotation: 'Open in Body',
        bottomAnnotation: 'Lowest Close',
        bodyAnnotation: 'Dump',
      },
    ],
    arrows: [
      { candleIndex: 2, direction: 'down', label: 'Plunge Downward', color: '#ef4444' },
    ],
    deepLinkId: 'three-black-crows',
  },

  {
    id: 'three-inside-up',
    slideNumber: '19',
    title: {
      en: 'Three Inside Up',
      bn: 'থ্রি ইনসাইড আপ (Three Inside Up)',
    },
    category: 'multi-candle',
    type: 'bullish',
    badge: {
      en: 'Three Candles · Harami Confirmation',
      bn: 'তিন ক্যান্ডেল · হারামি কনফার্মেশন',
    },
    bodyRule: [
      {
        en: 'Sequence : Bearish Mother Bar -> Bullish Inside Bar (Harami) -> Bullish Bar closing above Mother High',
        bn: 'সিকোয়েন্স : বেয়ারিশ মাদার বার -> বুলিশ ইনসাইড বার (হারামি) -> মাদার বারের হাইয়ের ওপরে ৩য় বুলিশ ক্লোজ',
      },
    ],
    condition: [
      {
        en: 'Condition : After extended downtrend at major support',
        bn: 'শর্ত : দীর্ঘ ডাউনট্রেন্ডের পর প্রধান সাপোর্ট জোনে গঠিত হতে হবে',
      },
    ],
    meaning: [
      {
        en: 'Meaning : Validated bullish reversal (Harami breakout)',
        bn: 'অর্থ : নিশ্চিত ও ভ্যালিড বুলিশ রিভার্সাল',
      },
    ],
    significance: [
      {
        en: 'Significance : High-probability upward continuation',
        bn: 'তাৎপর্য : উচ্চ সফলতার সম্ভাবনা নিয়ে ঊর্ধ্বমুখী যাত্রা',
      },
    ],
    psychology: {
      en: 'Harami paused the downtrend; Candle 3 explodes above the mother bar, destroying all remaining bear resistance.',
      bn: 'হারামি পতন থামিয়ে দিয়েছিল; ৩য় ক্যান্ডেলটি মাদার বারের হাই ভেঙে সব সেলারদের স্টপ আউট করে দেয়।',
    },
    actionTip: {
      en: 'Enter long on Candle 3 close. Stop Loss below the lowest point of the 3 candles.',
      bn: '৩য় ক্যান্ডেল ক্লোজের সাথে সাথে বাই করুন। স্টপ লস ৩টি ক্যান্ডেলের সর্বনিম্ন পয়েন্টের নিচে।',
    },
    contextTrend: 'downtrend',
    candles: [
      {
        open: 78,
        close: 32,
        high: 82,
        low: 26,
        color: 'bear',
        label: '1st (Bear)',
        topAnnotation: 'Mother Open',
        bottomAnnotation: 'Mother Close',
        bodyAnnotation: 'Downtrend',
      },
      {
        open: 40,
        close: 60,
        high: 64,
        low: 36,
        color: 'bull',
        label: '2nd (Inside)',
        topAnnotation: 'Close',
        bottomAnnotation: 'Open',
        bodyAnnotation: 'Harami Baby',
      },
      {
        open: 58,
        close: 88,
        high: 94,
        low: 54,
        color: 'bull',
        label: '3rd (Breakout)',
        topAnnotation: 'Close > High',
        bottomAnnotation: 'Open',
        bodyAnnotation: 'Confirmation',
      },
    ],
    guideLines: [
      { yValue: 82, label: 'Mother High Breakout Level', style: 'dashed', color: '#22c55e' },
    ],
    arrows: [
      { candleIndex: 2, direction: 'up', label: 'Confirmed Rally', color: '#22c55e' },
    ],
    deepLinkId: 'three-inside-up',
  },

  {
    id: 'three-inside-down',
    slideNumber: '20',
    title: {
      en: 'Three Inside Down',
      bn: 'থ্রি ইনসাইড ডাউন (Three Inside Down)',
    },
    category: 'multi-candle',
    type: 'bearish',
    badge: {
      en: 'Three Candles · Harami Confirmation',
      bn: 'তিন ক্যান্ডেল · হারামি কনফার্মেশন',
    },
    bodyRule: [
      {
        en: 'Sequence : Bullish Mother Bar -> Bearish Inside Bar (Harami) -> Bearish Bar closing below Mother Low',
        bn: 'সিকোয়েন্স : বুলিশ মাদার বার -> বেয়ারিশ ইনসাইড বার (হারামি) -> মাদার বারের লো এর নিচে ৩য় বেয়ারিশ ক্লোজ',
      },
    ],
    condition: [
      {
        en: 'Condition : After extended uptrend at major resistance',
        bn: 'শর্ত : দীর্ঘ আপট্রেন্ডের পর প্রধান রেজিস্ট্যান্স জোনে গঠিত হতে হবে',
      },
    ],
    meaning: [
      {
        en: 'Meaning : Validated bearish reversal (Harami breakdown)',
        bn: 'অর্থ : নিশ্চিত ও ভ্যালিড বেয়ারিশ রিভার্সাল',
      },
    ],
    significance: [
      {
        en: 'Significance : High-probability downward continuation',
        bn: 'তাৎপর্য : উচ্চ সফলতার সম্ভাবনা নিয়ে নিম্নমুখী পতন',
      },
    ],
    psychology: {
      en: 'Harami stalled the bull rally; Candle 3 plunges below the mother bar, trapping breakout buyers.',
      bn: 'হারামি বায়ারদের উত্থান থামিয়ে দিয়েছিল; ৩য় ক্যান্ডেলটি মাদার বারের লো ভেঙে নিম্নমুখী পতন নিশ্চিত করে।',
    },
    actionTip: {
      en: 'Enter short on Candle 3 close. Stop Loss above the highest point of the 3 candles.',
      bn: '৩য় ক্যান্ডেল ক্লোজের সাথে সাথে শর্ট করুন। স্টপ লস ৩টি ক্যান্ডেলের সর্বোচ্চ পয়েন্টের ওপরে।',
    },
    contextTrend: 'uptrend',
    candles: [
      {
        open: 32,
        close: 78,
        high: 84,
        low: 28,
        color: 'bull',
        label: '1st (Bull)',
        topAnnotation: 'Mother Close',
        bottomAnnotation: 'Mother Open',
        bodyAnnotation: 'Uptrend',
      },
      {
        open: 68,
        close: 48,
        high: 72,
        low: 44,
        color: 'bear',
        label: '2nd (Inside)',
        topAnnotation: 'Open',
        bottomAnnotation: 'Close',
        bodyAnnotation: 'Harami Baby',
      },
      {
        open: 50,
        close: 20,
        high: 52,
        low: 14,
        color: 'bear',
        label: '3rd (Breakdown)',
        topAnnotation: 'Open',
        bottomAnnotation: 'Close < Low',
        bodyAnnotation: 'Confirmation',
      },
    ],
    guideLines: [
      { yValue: 28, label: 'Mother Low Breakdown Level', style: 'dashed', color: '#ef4444' },
    ],
    arrows: [
      { candleIndex: 2, direction: 'down', label: 'Confirmed Dump', color: '#ef4444' },
    ],
    deepLinkId: 'three-inside-down',
  },

  // ─── 5. CONTINUATION PATTERNS ─────────────────────────────────────────
  {
    id: 'rising-three-methods',
    slideNumber: '21',
    title: {
      en: 'Rising Three Methods',
      bn: 'রাইজিং থ্রি মেথডস (Rising Three Methods)',
    },
    category: 'multi-candle',
    type: 'bullish',
    badge: {
      en: 'Five Candles · Trend Continuation',
      bn: 'পাঁচ ক্যান্ডেল · ট্রেন্ড কন্টিনিউয়েশন',
    },
    bodyRule: [
      {
        en: 'Sequence : Strong Green Bar -> 3 small resting red bars inside range -> Powerful Green breakout',
        bn: 'সিকোয়েন্স : শক্তিশালী সবুজ বার -> ৩টি ছোট লাল রেস্টিং বার বডির ভেতরে -> শক্তিশালী সবুজ ব্রেকআউট',
      },
    ],
    condition: [
      {
        en: 'Condition : Occurs inside an established bullish trend',
        bn: 'শর্ত : চলমান শক্তিশালী আপট্রেন্ডের মাঝে গঠিত হতে হবে',
      },
    ],
    meaning: [
      {
        en: 'Meaning : Temporary pullback / healthy breath before next leg up',
        bn: 'অর্থ : স্বাস্থ্যকর সাময়িক বিরতি যার পর ট্রেন্ডের পরবর্তী রকেট মুভ শুরু হয়',
      },
    ],
    significance: [
      {
        en: 'Significance : Strong upward trend continuation',
        bn: 'তাৎপর্য : আপট্রেন্ডের অপ্রতিরোধ্য ধারাবাহিকতা',
      },
    ],
    psychology: {
      en: 'The 3 pullback candles are small and low volume, proving bears have no real strength. The 5th candle explodes to new highs.',
      bn: 'মাঝের ৩টি লাল ক্যান্ডেল ছোট ও দুর্বল ভলিউমের, যা প্রমাণ করে বিক্রেতাদের কোনো শক্তি নেই। ৫ম ক্যান্ডেলে বায়াররা পুনরায় ব্রেকআউট দেয়।',
    },
    actionTip: {
      en: 'Enter long on the close of Candle 5. Stop Loss below Candle 1 low.',
      bn: '৫ম ক্যান্ডেল ক্লোজে বাই এন্ট্রি নিন। স্টপ লস ১ম ক্যান্ডেলের লো এর নিচে।',
    },
    contextTrend: 'uptrend',
    candles: [
      { open: 20, close: 70, high: 75, low: 16, color: 'bull', label: '1st', topAnnotation: 'Drive' },
      { open: 66, close: 54, high: 68, low: 52, color: 'bear', label: 'Rest 1' },
      { open: 56, close: 44, high: 58, low: 42, color: 'bear', label: 'Rest 2' },
      { open: 46, close: 36, high: 48, low: 34, color: 'bear', label: 'Rest 3' },
      { open: 40, close: 88, high: 92, low: 38, color: 'bull', label: '5th', topAnnotation: 'New High' },
    ],
    arrows: [
      { candleIndex: 4, direction: 'up', label: 'Trend Continuation', color: '#22c55e' },
    ],
    deepLinkId: 'rising-three-methods',
  },

  {
    id: 'falling-three-methods',
    slideNumber: '22',
    title: {
      en: 'Falling Three Methods',
      bn: 'ফলিং থ্রি মেথডস (Falling Three Methods)',
    },
    category: 'multi-candle',
    type: 'bearish',
    badge: {
      en: 'Five Candles · Trend Continuation',
      bn: 'পাঁচ ক্যান্ডেল · ট্রেন্ড কন্টিনিউয়েশন',
    },
    bodyRule: [
      {
        en: 'Sequence : Strong Red Bar -> 3 small resting green bars inside range -> Powerful Red breakdown',
        bn: 'সিকোয়েন্স : শক্তিশালী লাল বার -> ৩টি ছোট সবুজ রেস্টিং বার বডির ভেতরে -> শক্তিশালী লাল ব্রেকডাউন',
      },
    ],
    condition: [
      {
        en: 'Condition : Occurs inside an established bearish downtrend',
        bn: 'শর্ত : চলমান শক্তিশালী ডাউনট্রেন্ডের মাঝে গঠিত হতে হবে',
      },
    ],
    meaning: [
      {
        en: 'Meaning : Bear flag / dead cat bounce before next leg down',
        bn: 'অর্থ : সাময়িক বাউন্স যার পর পরবর্তী বড় দরপতন শুরু হয়',
      },
    ],
    significance: [
      {
        en: 'Significance : Strong downward trend continuation',
        bn: 'তাৎপর্য : ডাউনট্রেন্ডের অপ্রতিরোধ্য ধারাবাহিকতা',
      },
    ],
    psychology: {
      en: 'The 3 bounce candles fail to exceed Candle 1 open. On Candle 5, bears reassert total dominance and dump price to new lows.',
      bn: 'মাঝের ৩টি সবুজ ক্যান্ডেল ১ম বারের ওপেন ভাঙতে সম্পূর্ণ ব্যর্থ হয়। ৫ম ক্যান্ডেলে বিক্রেতারা পুনরায় নিয়ন্ত্রণ নিয়ে বড় পতন ঘটায়।',
    },
    actionTip: {
      en: 'Enter short on the close of Candle 5. Stop Loss above Candle 1 high.',
      bn: '৫ম ক্যান্ডেল ক্লোজে শর্ট সেল করুন। স্টপ লস ১ম ক্যান্ডেলের হাইয়ের ওপরে।',
    },
    contextTrend: 'downtrend',
    candles: [
      { open: 80, close: 30, high: 84, low: 26, color: 'bear', label: '1st', topAnnotation: 'Plunge' },
      { open: 34, close: 46, high: 48, low: 32, color: 'bull', label: 'Bounce 1' },
      { open: 44, close: 56, high: 58, low: 42, color: 'bull', label: 'Bounce 2' },
      { open: 54, close: 64, high: 66, low: 52, color: 'bull', label: 'Bounce 3' },
      { open: 60, close: 12, high: 62, low: 8, color: 'bear', label: '5th', topAnnotation: 'New Low' },
    ],
    arrows: [
      { candleIndex: 4, direction: 'down', label: 'Trend Continuation', color: '#ef4444' },
    ],
    deepLinkId: 'falling-three-methods',
  },
];

/** Lookup helper to find a slide pattern brief by pattern id */
export function getPatternBriefById(id: string): SlideCandlePattern | null {
  return slidePatternsData.find((p) => p.id === id || p.deepLinkId === id) || null;
}
