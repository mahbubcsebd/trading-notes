/**
 * scripts/enrich_charts.js
 * Comprehensive bilingual enrichment for all 30 charts in content/charts/
 */
const fs = require('fs');
const path = require('path');

const chartsDir = path.join(__dirname, '..', 'content', 'charts');

const enrichments = {
  'bearish-engulfing-01': {
    title: {
      en: 'Bearish Engulfing at Daily Supply Zone',
      bn: 'কী-রেজিস্ট্যান্স ও সাপ্লাই জোনে বিয়ারিশ এনগালফিং',
    },
    caption: {
      en: 'Institutional sellers overwhelm buyers at major 2310 resistance with heavy body engulfing.',
      bn: '২৩১০ কী-রেজিস্ট্যান্সে শক্তিশালী বডি এনগালফিংয়ের মাধ্যমে সেলাররা বায়ারদের পরাস্ত করে রিভার্সাল ঘটায়।',
    },
    notes: {
      en: 'Sellers decisively overpower buyers at a major supply level. The second candle completely covers the real body of the prior bullish candle. Enter on the break of the engulfing low with SL buffered above the high.',
      bn: 'মেজর সাপ্লাই জোনে বায়ারদের শক্তি শেষ হয়ে সেলাররা পূর্ণ নিয়ন্ত্রণ নিয়েছে। দ্বিতীয় ক্যান্ডেলের বডি আগের ক্যান্ডেলকে সম্পূর্ণ ঢেকে ফেলেছে। এনগালফিং ক্যান্ডেলের লো ব্রেক করলে কনফার্মেশন সহ এন্ট্রি নেওয়া আদর্শ।',
    },
    explanation: {
      en: 'Price rallied into a high-timeframe supply zone where institutional liquidity rested. The initial bullish push (Candle 10) was met with immediate, aggressive selling on Candle 11. The large bearish real body reflects strong displacement, trapping late breakout buyers and initiating a swift reversal downward.',
      bn: 'প্রাইস দীর্ঘ আপট্রেন্ডের পর একটি হাইয়ার টাইমফ্রেম সাপ্লাই জোনে প্রবেশ করে যেখানে প্রাতিষ্ঠানিক সেল অর্ডার রক্ষিত ছিল। দশম ক্যান্ডেলে বায়াররা ওঠার চেষ্টা করলেও একাদশ ক্যান্ডেলে আগ্রাসী সেলিং প্রেশার এসে পুরো বডি গ্রাস করে। এটি রিটেইল বায়ারদের ট্র্যাপ করে এবং নতুন ডাউনট্রেন্ড শুরু করে।',
    },
    keyTakeaways: [
      {
        en: 'Location is critical: Only trade this pattern at verified supply zones or HTF resistance.',
        bn: 'লোকেশন সবচেয়ে গুরুত্বপূর্ণ: প্যাটার্নটি কেবল ভেরিফায়েড সাপ্লাই জোন বা রেজিস্ট্যান্সে ট্রেড করুন।',
      },
      {
        en: 'Wait for the official close: Never execute mid-candle; confirmation requires Candle 2 close below Candle 1 open.',
        bn: 'ক্যান্ডেল ক্লোজের অপেক্ষা করুন: লাইভ ক্যান্ডেলে কখনোই ট্রেড নেবেন না; ক্লোজ হওয়া পর্যন্ত ধৈর্য ধরুন।',
      },
      {
        en: 'Buffer your stop loss: Add 1-2 points buffer above the highest wick to avoid liquidity sweeps.',
        bn: 'স্টপ লসে বাফার দিন: উইক সুইপ এড়াতে সর্বোচ্চ হাইয়ের কিছুটা ওপরে স্টপ লস সেট করুন।',
      },
    ],
    entry: 2300.0,
    stopLoss: 2312.0,
    takeProfit: 2265.0,
    rr: '2.9',
    type: 'pattern',
  },

  'bearish-harami-01': {
    title: {
      en: 'Bearish Harami Inside Bar at Gold Resistance',
      bn: 'গোল্ড রেজিস্ট্যান্সে বিয়ারিশ হারামি ইনসাইড বার',
    },
    caption: {
      en: 'Gold hits 2350 resistance, forming a Bearish Harami before plunging 200 pips.',
      bn: 'গোল্ড ২৩৫০ রেজিস্ট্যান্সে পৌঁছানোর পর বিয়ারিশ হারামি তৈরি করে ২০০ পিপস সেল অফ হয়।',
    },
    notes: {
      en: 'The Mother Bar pushed hard into 2350, but the subsequent Inside Bar stayed entirely within its range, signaling momentum exhaustion.',
      bn: 'মাদার বারটি ২৩৫০ লেভেলে উঠলেও পরবর্তী ইনসাইড বারটি সম্পূর্ণ তার ভেতরেই সীমাবদ্ধ থেকে বায়ারদের ক্লান্তি প্রকাশ করে।',
    },
    explanation: {
      en: 'A Bearish Harami acts as an inside-bar pause at key resistance. After an explosive green expansion candle, buyers failed to create a higher high, closing a small bearish body contained within the previous bar. When price breaks below the mother bar or inside bar low, aggressive selling cascades downward.',
      bn: 'কী-রেজিস্ট্যান্সে বিয়ারিশ হারামি মূলত একটি মোমেন্টাম পজ বা দ্বিধা নির্দেশ করে। বিশাল গ্রিন ক্যান্ডেলের পর বায়াররা আর হাই তৈরি করতে পারেনি এবং ছোট লাল বডি আগের ক্যান্ডেলের পেটে বন্দি থাকে। ইনসাইড বারের লো ভাঙার পর প্রাতিষ্ঠানিক সেলাররা সেল অফ শুরু করে।',
    },
    keyTakeaways: [
      {
        en: 'Indicates momentum deceleration rather than instant trend change; requires trigger break.',
        bn: 'এটি তাৎক্ষণিক রিভার্সালের চেয়ে মোমেন্টাম কমে যাওয়া নির্দেশ করে; তাই ট্রিগার ব্রেকের অপেক্ষা আবশ্যক।',
      },
      {
        en: 'Inside bar low break triggers conservative sell entries with tight stop loss at mother high.',
        bn: 'ইনসাইড বারের লো ব্রেক করলে মাদার বারের হাইয়ে স্টপ লস দিয়ে টাইট রিস্কে সেল ট্রেড নেওয়া যায়।',
      },
    ],
    entry: 2338.0,
    stopLoss: 2355.0,
    takeProfit: 2295.0,
    rr: '2.5',
    type: 'pattern',
  },

  'bos-choch-01': {
    title: {
      en: 'BOS into CHoCH — Institutional Market Structure Shift',
      bn: 'BOS থেকে CHoCH — প্রাতিষ্ঠানিক মার্কেট স্ট্রাকচার শিফট',
    },
    caption: {
      en: 'Consecutive BOS confirms bear trend, followed by a bullish CHoCH signaling structural trend reversal.',
      bn: 'ধারাবাহিক BOS ডাউনট্রেন্ড নিশ্চিত করে, এরপর বুলিশ CHoCH ট্রু রিভার্সালের সংকেত দেয়।',
    },
    notes: {
      en: 'After repeated Break of Structure (BOS) making Lower Lows, price decisively closes above the prior Lower High, producing a Change of Character (CHoCH).',
      bn: 'টানা লোয়ার লো তৈরি করে BOS কনফার্মেশনের পর, প্রাইস পূর্ববর্তী লোয়ার হাইয়ের উপরে বডি ক্লোজ দিয়ে প্রথমবার CHoCH তৈরি করে।',
    },
    explanation: {
      en: 'Market structure dictates the macro order flow. Downtrend continuation is verified by Break of Structure (BOS) below prior swing lows. When smart money absorbs all sell liquidity and forcefully breaks the most recent Lower High with a candle body close, the structure shifts to bullish (CHoCH). This is the earliest high-probability signal to flip your bias from short to long.',
      bn: 'মার্কেট স্ট্রাকচারই হলো স্মার্ট মানির গতিবিধি বোঝার মূল ভিত্তি। ডাউনট্রেন্ডে সুইং লো ভেঙে ক্যান্ডেল ক্লোজ দিলে তাকে BOS বলে। যখন বড় প্রতিষ্ঠানগুলো লিকুইডিটি নিয়ে সর্বশেষ লোয়ার হাইয়ের ওপরে ক্যান্ডেল ক্লোজ করায়, তখন স্ট্রাকচার বদলে যায় এবং একে CHoCH বলা হয়। এটি ডাউনট্রেন্ড শেষ হওয়ার সবচেয়ে নির্ভরযোগ্য প্রমাণ।',
    },
    keyTakeaways: [
      {
        en: 'Always demand a candle body close across the swing point; wicks are mere liquidity sweeps.',
        bn: 'সুইং হাই/লো ভাঙার ক্ষেত্রে বডি ক্লোজ বাধ্যতামূলক; শুধু উইক দিয়ে পার হলে তা লিকুইডিটি সুইপ।',
      },
      {
        en: 'Never buy immediately at the CHoCH break; wait for the pullback into the discount Order Block or FVG.',
        bn: 'CHoCH ব্রেক হওয়ার সাথে সাথে বাই করবেন না; ডিসকাউন্ট অর্ডার ব্লক বা FVG-তে রিটেস্টের অপেক্ষা করুন।',
      },
    ],
    entry: 2362.0,
    stopLoss: 2345.0,
    takeProfit: 2410.0,
    rr: '2.8',
    type: 'concept',
  },

  'bullish-engulfing-01': {
    title: {
      en: 'Bullish Engulfing at Key Demand Zone',
      bn: 'কী-ডিমান্ড জোনে ক্লাসিক বুলিশ এনগালফিং',
    },
    caption: {
      en: 'Buyers absorb all selling pressure at 2291 demand floor with an aggressive expansion candle.',
      bn: '২২৯১ ডিমান্ড ফ্লোরে বায়াররা সকল সেলিং প্রেশার শোষণ করে বড় গ্রিন ক্যান্ডেলে রিভার্সাল ঘটায়।',
    },
    notes: {
      en: 'Candles 10-11 form a textbook Bullish Engulfing pattern. Candle 10 is bearish, and Candle 11 real body completely envelops Candle 10 body at support floor 2291.',
      bn: '১০ এবং ১১ নম্বর ক্যান্ডেল মিলে একটি নিখুঁত বুলিশ এনগালফিং তৈরি করেছে। ২২৯১ সাপোর্ট লেভেলে বায়ারদের শক্তিমত্তা স্পষ্ট।',
    },
    explanation: {
      en: 'Following an extended multi-bar decline, sellers exhausted their momentum as price tagged major institutional demand. Candle 11 opened near the previous low, rejected lower prices instantly, and rallied with expanding volume to close above the prior candle high. This shows dominant institutional accumulation.',
      bn: 'টানা পতনের পর ২২৯১ সাপোর্ট জোনে পৌঁছাতেই সেলারদের মোমেন্টাম নিঃশেষ হয়ে যায়। ১১তম ক্যান্ডেলে বায়াররা ব্যাপক শক্তিতে প্রবেশ করে আগের দিনের পুরো ওপেনিং প্রাইস পার হয়ে ক্লোজ দেয়। এটি স্পষ্ট প্রমাণ করে যে স্মার্ট মানি এখন লং পজিশন নিচ্ছে।',
    },
    keyTakeaways: [
      {
        en: 'A valid bullish engulfing body must completely cover the previous candle body.',
        bn: 'বুলিশ এনগালফিং হতে হলে দ্বিতীয় ক্যান্ডেলের বডি অবশ্যই আগের ক্যান্ডেলের বডিকে পুরোটা ঢাকতে হবে।',
      },
      {
        en: 'Best risk:reward occurs when entering on the break of Candle 2 high or a 50% retest.',
        bn: 'দ্বিতীয় ক্যান্ডেলের হাই ভাঙলে কিংবা ৫০% বডিতে রিট্রেসমেন্ট এন্ট্রি নিলে সেরা R:R পাওয়া যায়।',
      },
    ],
    entry: 2307.0,
    stopLoss: 2289.0,
    takeProfit: 2345.0,
    rr: '2.1',
    type: 'pattern',
  },

  'bullish-engulfing-02': {
    title: {
      en: 'EURUSD H1 — Bullish Engulfing at Major Support',
      bn: 'EURUSD H1 — মেজর সাপোর্টে বুলিশ এনগালফিং রিভার্সাল',
    },
    caption: {
      en: 'Classic EURUSD rejection at key support resulting in a 110-pip upward surge.',
      bn: 'EURUSD-এর গুরুত্বপূর্ণ সাপোর্টে বায়ারদের রিজেকশন যা পরবর্তীতে ১১০ পিপস আপট্রেন্ড তৈরি করে।',
    },
    notes: {
      en: 'Strong buyer rejection at demand zone with full body engulfing. Ideal entry on next bar open.',
      bn: 'ডিমান্ড জোনে শক্তিশালী রিজেকশন এবং ফুল বডি এনগালফিং। পরবর্তী বারের শুরুতে এন্ট্রি নেওয়া আদর্শ।',
    },
    explanation: {
      en: 'On EURUSD H1, price descended smoothly into a prior swing low liquidity pool. Sellers attempted a continuation breakdown, but institutional buyers absorbed the liquidity, printing an outsized green candle. The failure of sellers to maintain new lows signals that the path of least resistance is now upward.',
      bn: 'EURUSD চার্টে প্রাইস একটি পুরোনো সুইং লো-এর লিকুইডিটি পুলে নেমে আসে। সেলাররা ব্রেকডাউন ঘটানোর চেষ্টা করলেও প্রাতিষ্ঠানিক বায়াররা সমস্ত সেল অর্ডার লুফে নিয়ে বড় গ্রিন ক্যান্ডেলে রূপ দেয়, যা আপট্রেন্ড কনফার্ম করে।',
    },
    keyTakeaways: [
      {
        en: 'High probability when forming directly at session opens (London / New York overlap).',
        bn: 'লন্ডন বা নিউইয়র্ক সেশন শুরুর মুহূর্তে এই প্যাটার্ন গঠিত হলে সফলতার হার সবচেয়ে বেশি থাকে।',
      },
      {
        en: 'Keep stops strictly below the engulfing candle wick with a small spread buffer.',
        bn: 'এনগালফিং ক্যান্ডেলের লো এর কিছুটা নিচে স্প্রেড বাফার রেখে স্টপ লস সেট করুন।',
      },
    ],
    entry: 1.0820,
    stopLoss: 1.0785,
    takeProfit: 1.0910,
    rr: '2.6',
    type: 'pattern',
  },

  'bullish-harami-01': {
    title: {
      en: 'Bullish Harami at EURUSD Demand Floor',
      bn: 'EURUSD ডিমান্ড ফ্লোরে বুলিশ হারামি ইনসাইড বার',
    },
    caption: {
      en: 'EURUSD contracts into a Bullish Harami at 1.0800 demand, leading to a 130-pip breakout.',
      bn: '১.০৮০০ ডিমান্ড জোনে বুলিশ হারামি তৈরি করে ভোলাটিলিটি সংকোচন, যার পর ১৩০ পিপসের ব্রেকআউট ঘটে।',
    },
    notes: {
      en: 'The large red mother candle is followed by a small green inside candle completely nestled within its body, indicating selling cessation.',
      bn: 'বড় লাল মাদার ক্যান্ডেলের পেটে ছোট সবুজ ক্যান্ডেল তৈরি হয়ে সেলারদের শক্তি ফুরিয়ে যাওয়ার সংকেত দেয়।',
    },
    explanation: {
      en: 'The Bullish Harami is a two-candle reversal pattern where an aggressive selling candle is followed by a smaller bullish candle that is completely enclosed within the previous body. This shows that despite previous aggressive selling, bears were unable to push price to new lows, and volatility is contracting before an upward release.',
      bn: 'বুলিশ হারামি প্যাটার্নে আগের বড় বিয়ারিশ ক্যান্ডেলের ভেতর পরবর্তী ছোট বুলিশ ক্যান্ডেল অবস্থান করে। এটি প্রকাশ করে যে সেলাররা শত চেষ্টা করেও প্রাইসকে আর নিচে নামাতে পারছে না। এরপর বায়াররা মোমেন্টাম নিয়ে উপরের দিকে ব্রেকআউট ঘটায়।',
    },
    keyTakeaways: [
      {
        en: 'Always wait for the high of the mother candle or inside candle to break before going long.',
        bn: 'লং এন্ট্রি নেওয়ার আগে অবশ্যই ইনসাইড ক্যান্ডেল বা মাদার ক্যান্ডেলের হাই ভাঙার অপেক্ষা করুন।',
      },
      {
        en: 'Target the nearest supply zone or prior swing high with minimum 1:2 Risk-Reward ratio.',
        bn: 'টার্গেট হিসেবে পূর্ববর্তী সুইং হাই বা সাপ্লাই জোন নির্ধারণ করুন যাতে ন্যূনতম ১:২ R:R নিশ্চিত হয়।',
      },
    ],
    entry: 1.0835,
    stopLoss: 1.0790,
    takeProfit: 1.0945,
    rr: '2.4',
    type: 'pattern',
  },

  'doji-indecision-01': {
    title: {
      en: 'Doji at Resistance — Institutional Equilibrium & Reversal',
      bn: 'রেজিস্ট্যান্সে ডোজি ক্যান্ডেল — বায়ার-সেলার দ্বিধা ও সম্ভাব্য রিভার্সাল',
    },
    caption: {
      en: 'Doji forming at major resistance after extended uptrend, signaling buyer exhaustion.',
      bn: 'দীর্ঘ আপট্রেন্ডের পর প্রধান রেজিস্ট্যান্সে ডোজি গঠন, যা বায়ারদের ক্লান্তি ও শক্তির সমতা প্রকাশ করে।',
    },
    notes: {
      en: 'A Doji at the top of a trend signals buyer exhaustion. The equal open and close proves neither bulls nor bears could maintain dominance.',
      bn: 'ট্রেন্ডের শীর্ষে ডোজি মানে বায়ারদের গতি কমে যাওয়া। ওপেন এবং ক্লোজ প্রায় সমান হওয়ায় শক্তি ভারসাম্যে চলে এসেছে।',
    },
    explanation: {
      en: 'A classic Doji forms when opening and closing prices are virtually identical. In the context of an extended rally into key resistance, a Doji demonstrates that buyers who were previously in total control are now met with an equal volume of aggressive sellers. It warns traders that momentum has stalled and a reversal or consolidation is imminent.',
      bn: 'একটি ডোজি ক্যান্ডেলে ওপেন ও ক্লোজ প্রাইস প্রায় হুবহু সমান থাকে। দীর্ঘ আপট্রেন্ডের পর যখন রেজিস্ট্যান্সে এমন ক্যান্ডেল দেখা যায়, তখন বোঝা যায় বায়াররা একা আর মার্কেট চালাতে পারছে না, সেলাররা সমান শক্তিতে বাঁধা দিচ্ছে। এর পরবর্তী ক্যান্ডেল বিয়ারিশ হলে বড় পতনের সম্ভাবনা তৈরি হয়।',
    },
    keyTakeaways: [
      {
        en: 'A Doji is an alert, NOT an execution signal on its own. It requires a confirming break.',
        bn: 'ডোজি শুধুমাত্র একটি সতর্কতা সংকেত, একা ট্রেড নেওয়ার জন্য যথেষ্ট নয়। পরবর্তী ক্যান্ডেলে কনফার্মেশন চাই।',
      },
      {
        en: 'If the subsequent candle closes below the Doji low, execute short with stops above the Doji high.',
        bn: 'পরবর্তী ক্যান্ডেল ডোজির লো এর নিচে ক্লোজ দিলে শর্ট এন্ট্রি নিন এবং স্টপ লস ডোজির হাইয়ের ওপরে রাখুন।',
      },
    ],
    entry: 154.20,
    stopLoss: 155.10,
    takeProfit: 151.80,
    rr: '2.7',
    type: 'pattern',
  },

  'evening-star-01': {
    title: {
      en: 'Evening Star 3-Candle Reversal at Daily Resistance',
      bn: 'ডেইলি রেজিস্ট্যান্সে ইভনিং স্টার — ৩-ক্যান্ডেল বিয়ারিশ রিভার্সাল',
    },
    caption: {
      en: 'Gold forms an Evening Star at key 2340 resistance, triggering an aggressive 300-pip selloff.',
      bn: 'গোল্ড ২৩৪০ রেজিস্ট্যান্সে ৩ ক্যান্ডেলের ইভনিং স্টার তৈরি করে ৩০০ পিপস বিশাল পতন ঘটায়।',
    },
    notes: {
      en: 'Three-candle masterclass: Candle 1 is large green expansion, Candle 2 is small indecision star, and Candle 3 is strong red close below Candle 1 midpoint.',
      bn: '৩ ক্যান্ডেলের মাস্টারক্লাস: ১ম ক্যান্ডেল বড় গ্রিন, ২য় ক্যান্ডেল ছোট স্টার এবং ৩য় ক্যান্ডেল ১ম ক্যান্ডেলের অর্ধেকের নিচে লাল ক্লোজ।',
    },
    explanation: {
      en: 'The Evening Star is one of the highest-probability candlestick reversal formations. Candle 1 shows strong bull momentum into resistance. Candle 2 gaps or pauses at the top, showing buyer exhaustion. Candle 3 confirms the regime shift by closing deep into the body of Candle 1, proving that bears have decisively seized control of order flow.',
      bn: 'ইভনিং স্টার সবচেয়ে শক্তিশালী বিয়ারিশ রিভার্সাল প্যাটার্নগুলোর একটি। ১ম ক্যান্ডেল বায়ারদের জোয়ার দেখায়, ২য় ক্যান্ডেল শীর্ষে দ্বিধা ও ক্লান্তি নির্দেশ করে, এবং ৩য় শক্তিশালী লাল ক্যান্ডেল ১ম ক্যান্ডেলের গভীরে ক্লোজ দিয়ে সেলারদের রাজত্ব নিশ্চিত করে।',
    },
    keyTakeaways: [
      {
        en: 'Candle 3 MUST close at least 50% below the real body of Candle 1.',
        bn: '৩য় ক্যান্ডেলটিকে অবশ্যই ১ম ক্যান্ডেলের ৫০% এর নিচে শক্তভাবে ক্লোজ হতে হবে।',
      },
      {
        en: 'Aggressive traders enter on Candle 3 close; conservative traders wait for a 38.2% pullback.',
        bn: 'অ্যাগ্রেসিভ ট্রেডাররা ৩য় ক্যান্ডেল ক্লোজে এন্ট্রি নেন; কনজারভেটিভরা কিছুটা রিট্রেসমেন্টের অপেক্ষা করেন।',
      },
    ],
    entry: 2332.0,
    stopLoss: 2346.0,
    takeProfit: 2285.0,
    rr: '3.3',
    type: 'pattern',
  },

  'fibonacci-retracement-01': {
    title: {
      en: 'Fibonacci Golden Pocket (61.8% – 65%) Retracement',
      bn: 'ফিবোনাচি গোল্ডেন পকেট (৬১.৮% – ৬৫%) রিট্রেসমেন্ট রিজেকশন',
    },
    caption: {
      en: 'Price retraces into the 61.8%–65% Golden Pocket confluence zone and launches higher.',
      bn: 'প্রাইস সুনির্দিষ্টভাবে ফিবোনাচি ৬১.৮%–৬৫% গোল্ডেন পকেটে রিট্রেস করে বড় আপওয়ার্ড বাউন্স দেয়।',
    },
    notes: {
      en: 'After a strong bullish impulse, price pulled back to the Fibonacci golden pocket (0.618–0.65) and found strong support.',
      bn: 'স্ট্রং বুলিশ ইমপালসিভ মুভের পর প্রাইস ৬১.৮%–৬৫% গোল্ডেন পকেটে পুলব্যাক করে কনফ্লুয়েন্স সাপোর্ট খুঁজে পায়।',
    },
    explanation: {
      en: 'Institutions rarely buy at the top of an impulsive move; they wait for discount pricing. By measuring the low-to-high swing of the impulse wave, the 61.8% to 65% zone represents the algorithmic "Golden Pocket" where risk-to-reward is mathematically optimized. When this zone aligns with a prior breaker or order block, reversal probability exceeds 70%.',
      bn: 'বড় প্রাতিষ্ঠানিক ফান্ডগুলো কখনোই হাই প্রাইসে কেনে না; তারা ডিসকাউন্ট বা কম দামের অপেক্ষা করে। ইমপালসিভ ওয়েভের বটম থেকে টপ পর্যন্ত ফিবোনাচি টানলে ৬১.৮% থেকে ৬৫% জোনটি হলো "গোল্ডেন পকেট", যেখানে সর্বনিম্ন রিস্কে সর্বোচ্চ রিওয়ার্ড পাওয়া যায়। পুরোনো সাপোর্ট ও অর্ডার ব্লকের সাথে এই জোনের মেলবন্ধন ঘটলে এটি অপ্রতিরোধ্য সেটআপে পরিণত হয়।',
    },
    keyTakeaways: [
      {
        en: 'Draw Fibonacci strictly from the true swing low wick to the absolute swing high wick.',
        bn: 'ফিবোনাচি সব সময় নিখুঁত সুইং লো উইক থেকে সুইং হাই উইক পর্যন্ত পরিমাপ করতে হবে।',
      },
      {
        en: 'Never blind limit order: look for candlestick rejection (Hammer, Pin Bar) inside the golden pocket.',
        bn: 'ব্লাইন্ড লিমিট অর্ডার দেবেন না; গোল্ডেন পকেটে পিনবার বা রিজেকশন ক্যান্ডেল দেখে কনফার্মেশন সহ ঢুকুন।',
      },
    ],
    entry: 2315.0,
    stopLoss: 2298.0,
    takeProfit: 2365.0,
    rr: '2.9',
    type: 'concept',
  },

  'fvg-01': {
    title: {
      en: 'Fair Value Gap (FVG) — Inefficiency Fill & Continuation',
      bn: 'ফেয়ার ভ্যালু গ্যাপ (FVG) — প্রাইস ইমব্যালান্স ফিল ও রি-লঞ্চ',
    },
    caption: {
      en: '3-candle FVG formed on strong impulse; price returns to mitigate Consequent Encroachment (50%).',
      bn: '৩ ক্যান্ডেলের তীব্র গতিতে তৈরি FVG; প্রাইস ৫০% কনসিকোয়েন্ট এনক্রোচমেন্ট ফিল করে পুনরায় ছুটতে থাকে।',
    },
    notes: {
      en: 'The gap between Candle 1 high and Candle 3 low forms an unfilled liquidity void. Price retraced precisely to the 50% midpoint before continuing.',
      bn: '১ম ক্যান্ডেলের হাই এবং ৩য় ক্যান্ডেলের লো-এর মধ্যকার ফাঁকা স্থানটিই FVG। প্রাইস ৫০% ফিল করে নতুন মুভ শুরু করেছে।',
    },
    explanation: {
      en: 'A Fair Value Gap occurs when aggressive institutional displacement creates a 3-candle imbalance where Candle 1 high does not overlap Candle 3 low. The market algorithm seeks delivery efficiency and pulls price back into this void. When price taps the Consequent Encroachment (50% of the FVG), smart money adds to their positions, driving price toward external liquidity.',
      bn: 'ফেয়ার ভ্যালু গ্যাপ তৈরি হয় যখন অতিরিক্ত প্রাতিষ্ঠানিক মোমেন্টামের কারণে ১ম ক্যান্ডেলের হাই এবং ৩য় ক্যান্ডেলের লো একে অপরকে ওভারল্যাপ করতে পারে না। মার্কেট অ্যালগরিদম প্রাইসকে ব্যালান্স করতে এই শূন্যস্থানে ফিরে আসে। বিশেষ করে গ্যাপের ৫০% লেভেল স্পর্শ করার সাথে সাথে বড় প্লেয়াররা নতুন পজিশন নিয়ে মার্কেটকে ট্রেন্ডে এগিয়ে নেয়।',
    },
    keyTakeaways: [
      {
        en: 'Mark the 50% level (Consequent Encroachment); this is the highest reaction sensitivity point.',
        bn: 'FVG-এর ৫০% মিডপয়েন্ট মার্ক করুন; এটি রিঅ্যাকশনের জন্য সবচেয়ে সংবেদনশীল জায়গা।',
      },
      {
        en: 'If candle bodies close completely through the FVG, the gap is invalidated and becomes a breaker.',
        bn: 'যদি কোনো ক্যান্ডেলের বডি FVG পার হয়ে সম্পূর্ণ বাইরে ক্লোজ দেয়, তবে সেটআপটি বাতিল হয়ে যায়।',
      },
    ],
    entry: 1.0855,
    stopLoss: 1.0830,
    takeProfit: 1.0920,
    rr: '2.6',
    type: 'concept',
  },

  'hammer-01': {
    title: {
      en: 'Bullish Hammer at Major Support Floor',
      bn: 'মেজর সাপোর্টে বুলিশ হ্যামার — আগ্রাসী রিজেকশন',
    },
    caption: {
      en: 'Textbook hammer candle at strong support level showing massive buyer rejection of the lows.',
      bn: 'শক্তিশালী সাপোর্টে ক্লাসিক হ্যামার ক্যান্ডেল যা প্রমাণ করে নিচের প্রাইসে বায়ারদের তীব্র চাহিদা তৈরি হয়েছে।',
    },
    notes: {
      en: 'Long lower wick (over 2x body height) proves sellers completely failed to hold lower prices.',
      bn: 'বডির চেয়ে দ্বিগুণেরও বড় নিচের উইক প্রমাণ করে সেলাররা প্রাইস ধরে রাখতে সম্পূর্ণ ব্যর্থ হয়েছে।',
    },
    explanation: {
      en: 'A Hammer pattern emerges at the trough of a downtrend. During the session, sellers pushed price aggressively down, but buyers stepped in forcefully, driving the price back up to close near the session high. The long lower shadow represents a liquidity sweep and wholesale rejection of lower prices.',
      bn: 'ডাউনট্রেন্ডের নিচে হ্যামার তৈরি হওয়া অত্যন্ত শক্তিশালী রিভার্সাল ইঙ্গিত। সেশনের শুরুতে সেলাররা প্রাইস অনেক নিচে নামিয়ে দিলেও শেষ পর্যন্ত বায়াররা বিপুল শক্তিতে প্রবেশ করে ওপেনিং প্রাইসের কাছাকাছি বা উপরে ক্লোজ করায়। দীর্ঘ নিচের উইকটি প্রমাণ করে বিক্রেতারা শক্তি হারিয়ে ফেলেছে।',
    },
    keyTakeaways: [
      {
        en: 'Lower wick must be at least twice the length of the real body with minimal/no upper wick.',
        bn: 'নিচের উইকটি অবশ্যই রিয়েল বডির অন্তত দ্বিগুণ লম্বা হতে হবে এবং উপরের উইক খুব ছোট বা শূন্য হতে হবে।',
      },
      {
        en: 'Enter above the hammer high with stop loss comfortably below the low wick.',
        bn: 'হ্যামারের হাই ব্রেক করলে বাই এন্ট্রি নিন এবং স্টপ লস নিচের উইকের কিছুটা নিচে নিরাপদ দূরত্বে রাখুন।',
      },
    ],
    entry: 1.2640,
    stopLoss: 1.2580,
    takeProfit: 1.2810,
    rr: '2.8',
    type: 'pattern',
  },

  'hanging-man-01': {
    title: {
      en: 'Hanging Man Reversal at Gold Swing High',
      bn: 'গোল্ড সুইং হাইয়ে হ্যাংগিং ম্যান — টপ রিভার্সাল সংকেত',
    },
    caption: {
      en: 'Gold reaches 2380 resistance, creating a Hanging Man candle before plunging 250 pips.',
      bn: 'গোল্ড ২৩৮০ রেজিস্ট্যান্সে পৌঁছে হ্যাংগিং ম্যান ক্যান্ডেল তৈরি করে এবং পরবর্তীতে ২৫০ পিপস ড্রপ করে।',
    },
    notes: {
      en: 'Identical shape to a hammer, but appearing at the TOP of an uptrend. The long lower shadow proves sellers are beginning to break through.',
      bn: 'হ্যামারের মতোই দেখতে, তবে এটি তৈরি হয় আপট্রেন্ডের শীর্ষে। লম্বা নিচের উইক প্রমাণ করে সেলারদের আগমন শুরু হয়েছে।',
    },
    explanation: {
      en: 'While structurally identical to a hammer, context determines the outcome. At the peak of an uptrend, a Hanging Man shows that heavy selling occurred during the candle before buyers rescued it. This is a critical warning sign that buyer dominance is cracking, and institutional profit-taking has commenced.',
      bn: 'দেখতে হ্যামারের মতো হলেও আপট্রেন্ডের চূড়ায় এর ভূমিকা সম্পূর্ণ বিপরীত। এটি ইঙ্গিত দেয় যে ক্যান্ডেলের চলার সময় সেলাররা ব্যাপক সেল করেছিল, বায়াররা কোনোমতে টেনে উপরে ক্লোজ করলেও তাদের নিয়ন্ত্রণ দুর্বল হয়ে পড়েছে। পরের ক্যান্ডেল লাল হলে এটি নিশ্চিত সেল সিগন্যাল।',
    },
    keyTakeaways: [
      {
        en: 'A Hanging Man requires bearish confirmation on the NEXT candle closing below its body.',
        bn: 'হ্যাংগিং ম্যান ট্রেড করার জন্য পরের ক্যান্ডেলটি অবশ্যই এর বডির নিচে লাল হয়ে ক্লোজ হতে হবে।',
      },
      {
        en: 'Never short without confirmation; an unconfirmed Hanging Man is often just a bull flag.',
        bn: 'কনফার্মেশন ছাড়া শর্ট করবেন না; অন্যথায় এটি কন্টিনিউয়েশন বুলিশ মুভে রূপ নিতে পারে।',
      },
    ],
    entry: 2368.0,
    stopLoss: 2385.0,
    takeProfit: 2320.0,
    rr: '2.8',
    type: 'pattern',
  },

  'inverted-hammer-01': {
    title: {
      en: 'Inverted Hammer at Support Floor',
      bn: 'সাপোর্ট ফ্লোরে ইনভার্টেড হ্যামার — বুলিশ প্রেশার টেস্ট',
    },
    caption: {
      en: 'EURUSD tests 1.0750 support floor, forming an Inverted Hammer before reversing 140 pips higher.',
      bn: 'EURUSD ১.০৭৫০ সাপোর্টে ইনভার্টেড হ্যামার তৈরি করে বায়ারদের উপস্থিতি পরীক্ষা করে এবং ১৪০ পিপস ওপরে ওঠে।',
    },
    notes: {
      en: 'Long upper shadow shows buyers tested higher prices. Even though price retraced, buyers successfully prevented new lows.',
      bn: 'লম্বা ওপরের উইক প্রমাণ করে বায়াররা ওপরের প্রাইস টেস্ট করেছে এবং সেলারদের নতুন লো তৈরিতে বাঁধা দিয়েছে।',
    },
    explanation: {
      en: 'The Inverted Hammer occurs at the bottom of a downtrend. It features a small lower body and a long upper shadow. This reveals that buyers made a decisive, aggressive attempt to push prices higher. Although sellers pushed price back down before the close, the inability of sellers to push price to new lows demonstrates that the selling pressure has dried up.',
      bn: 'ডাউনট্রেন্ডের নিচে ইনভার্টেড হ্যামার তৈরি হয় যার ওপরের উইক লম্বা এবং বডি নিচে ছোট থাকে। এর মানে হলো সেশনের মাঝে বায়াররা এক দফায় অনেক ওপরে দাম নিয়ে গিয়েছিল। সেলাররা শেষ মুহূর্তে কিছুটা নামালেও নতুন লো বানাতে পারেনি। পরের ক্যান্ডেল গ্রিন হলে ট্রেন্ড আপ হয়ে যায়।',
    },
    keyTakeaways: [
      {
        en: 'Upper shadow must be at least twice the real body height with minimal lower wick.',
        bn: 'ওপরের উইকটি অবশ্যই রিয়েল বডির চেয়ে অন্তত দ্বিগুণ লম্বা হতে হবে এবং নিচের উইক অতি ক্ষুদ্র হবে।',
      },
      {
        en: 'Requires a bullish candle close above the pattern high for validated entry trigger.',
        bn: 'প্যাটার্নের হাইয়ের উপরে পরবর্তী ক্যান্ডেল গ্রিন হয়ে ক্লোজ দিলে তবেই নিশ্চিত বাই এন্ট্রি পাওয়া যায়।',
      },
    ],
    entry: 1.0770,
    stopLoss: 1.0730,
    takeProfit: 1.0880,
    rr: '2.7',
    type: 'pattern',
  },

  'liquidity-sweep-01': {
    title: {
      en: 'Liquidity Sweep — Institutional Stop Hunt Below Equal Lows',
      bn: 'লিকুইডিটি সুইপ — ইকুয়াল লো-এর নিচে স্টপ হান্ট ও ভি-শেপ রিভার্সাল',
    },
    caption: {
      en: 'Smart money briefly dips below retail double bottoms to engineer liquidity before explosive expansion.',
      bn: 'স্মার্ট মানি রিটেইল ডাবল বটমের স্টপ লস সুইপ করে লিকুইডিটি সংগ্রহ করে এবং তীব্র গতিতে ঘুরে দাঁড়ায়।',
    },
    notes: {
      en: 'Price briefly dips below a key low to trigger retail stop losses (SSL sweep), then aggressively closes back above the level. High-probability entry on the close.',
      bn: 'রিটেইল ট্রেডারদের স্টপ লস হান্ট করতে প্রাইস সাময়িক সুইপ দিয়ে আবার মূল লেভেলের ওপরে ফিরে আসে।',
    },
    explanation: {
      en: 'Retail traders place obvious stop losses directly below support levels (Equal Lows / Double Bottoms). Institutional market makers require large counterparty volume to fill large buy orders. They deliberately guide price below the lows to trigger stop-market sell orders (Sell-Side Liquidity), absorb them at discount, and violently reverse price upward.',
      bn: 'অধিকাংশ রিটেইল ট্রেডার তাদের স্টপ লস স্পষ্ট সাপোর্ট লেভেল বা ডাবল বটমের ঠিক নিচে বসিয়ে রাখে। বড় ব্যাংক ও প্রাতিষ্ঠানিক ফান্ডগুলোর হাজার কোটি ডলারের বাই অর্ডার ফিল করার জন্য এই সেল লিকুইডিটির প্রয়োজন হয়। তারা জেনেশুনে দামকে ক্ষণিকের জন্য সাপোর্টের নিচে নামিয়ে রিটেইলারদের স্টপ লস হিট করায় এবং বিপুল পরিমাণ অর্ডার বাই করে মার্কেট উপরে তুলে নেয়।',
    },
    keyTakeaways: [
      {
        en: 'Look for rapid rejection: the candle should leave only a wick below the level and close firmly back inside.',
        bn: 'দ্রুত রিজেকশন লক্ষ্য করুন: লেভেলের নিচে শুধু উইক থাকবে এবং ক্যান্ডেল বডি অবশ্যই লেভেলের ওপরে ক্লোজ হতে হবে।',
      },
      {
        en: 'Target the opposite liquidity pool (Buy-Side Liquidity / Equal Highs) for asymmetrical 1:3+ reward.',
        bn: 'বিপরীত পাশের লিকুইডিটি পুল (ইকুয়াল হাই বা রেজিস্ট্যান্স) টার্গেট করে ১:৩+ রিস্ক রিওয়ার্ড নিন।',
      },
    ],
    entry: 2322.0,
    stopLoss: 2309.0,
    takeProfit: 2365.0,
    rr: '3.3',
    type: 'concept',
  },

  'london-open-01': {
    title: {
      en: 'London Open Judas Swing — Asian Range Liquidity Run',
      bn: 'লন্ডন ওপেন জুডাস সুইং — এশিয়ান রেঞ্জ লিকুইডিটি ট্র্যাপ ও এক্সপ্যানশন',
    },
    caption: {
      en: 'London open sweeps Asian session lows to trap breakout sellers, then rockets 150 pips bullish.',
      bn: 'লন্ডন সেশন খোলার সাথে সাথে এশিয়ান লো সুইপ করে ফেক ব্রেকডাউন তৈরি করে এবং পরবর্তীতে ১৫০ পিপস ওপরে ওঠে।',
    },
    notes: {
      en: 'Classic Judas Swing: The initial fake move at 07:00–08:00 GMT engineered to induce wrong-side retail traders before the true trend begins.',
      bn: 'ক্লাসিক জুডাস সুইং: লন্ডন সেশনের প্রথম ১ ঘণ্টায় ভুয়া ব্রেকডাউন তৈরি করে রিটেইলারদের ট্র্যাপ করা হয়, তারপর আসল মুভ শুরু হয়।',
    },
    explanation: {
      en: 'During the Asian session, volatility is low, establishing clear highs and lows with accumulated liquidity above and below. At the London open (07:00–08:00 GMT / 1pm–2pm BST), algorithms engineer a deceptive fake move (Judas Swing) in the opposite direction of the daily bias. Once retail breakout traders jump in and stop losses are triggered, the real institutional expansion begins.',
      bn: 'এশিয়ান সেশনে মার্কেট তুলনামূলক শান্ত থাকে এবং একটি নির্দিষ্ট রেঞ্জে বন্দি থাকে। লন্ডন ওপেনে স্মার্ট মানি ইচ্ছা করে দিনের আসল ট্রেন্ডের উল্টো দিকে একটি দ্রুত ফেক মুভ (জুডাস সুইং) তৈরি করে। রিটেইল ট্রেডাররা ব্রেকডাউন ভেবে সেল দিলে তাদের লিকুইডিটি কাজে লাগিয়ে প্রাতিষ্ঠানিক বায়াররা দিনের মূল আপট্রেন্ড চালু করে।',
    },
    keyTakeaways: [
      {
        en: 'Never chase the initial 15-minute spike at London Open; wait for the liquidity sweep and displacement.',
        bn: 'লন্ডন সেশনের প্রথম ১৫ মিনিটের ভোলাটাইল মুভে অন্ধের মতো ঢুকবেন না; সুইপ ও ডিসপ্লেসমেন্টের অপেক্ষা করুন।',
      },
      {
        en: 'Target the Asian High once the Asian Low has been swept with an impulsive bullish engulfing bar.',
        bn: 'এশিয়ান লো সুইপ হয়ে বুলিশ রিভার্সাল দিলে নিশ্চিন্তে এশিয়ান হাইকে টেক প্রফিট টার্গেট করুন।',
      },
    ],
    entry: 2318.0,
    stopLoss: 2305.0,
    takeProfit: 2355.0,
    rr: '2.8',
    type: 'concept',
  },

  'marubozu-01': {
    title: {
      en: 'Bullish Marubozu Structural Breakout on Gold',
      bn: 'গোল্ডে বুলিশ মারুবোজু — নিখুঁত স্ট্রাকচারাল ব্রেকআউট ক্যান্ডেল',
    },
    caption: {
      en: 'Gold fires a 180-pip Bullish Marubozu through key 2320 resistance, kicking off a major bull trend.',
      bn: '২৩২০ কী-রেজিস্ট্যান্স গুঁড়িয়ে ১৮০ পিপসের বুলিশ মারুবোজু তৈরি করে শক্তিশালী বুলিশ ধারা চালু করে।',
    },
    notes: {
      en: 'A Marubozu has no upper or lower wicks (or negligible ones). Price opened at the absolute low and closed at the absolute high.',
      bn: 'মারুবোজুতে কোনো ওপর বা নিচের উইক থাকে না। ওপেনিং ছিল সর্বনিম্ন পয়েন্টে এবং ক্লোজিং সর্বোচ্চ পয়েন্টে।',
    },
    explanation: {
      en: 'A Marubozu is the purest representation of directional institutional conviction. Opening at the absolute session low and closing at the absolute high means buyers dominated every single minute of the candle. When printed through major resistance, it confirms a genuine structural breakout rather than a fakeout trap.',
      bn: 'মারুবোজু হলো প্রাতিষ্ঠানিক মোমেন্টামের সবচেয়ে স্পষ্ট ও খাঁটি রূপ। ক্যান্ডেলটি একদম নিচের পয়েন্টে ওপেন হয়ে বিরতিহীনভাবে সর্বোচ্চ পয়েন্টে গিয়ে ক্লোজ হয়। কোনো উইক না থাকার অর্থ হলো পুরো সময়জুড়ে সেলারদের বিন্দুমাত্র কোনো প্রতিরোধ ছিল না। রেজিস্ট্যান্সের ওপর এমন ক্যান্ডেল ট্রু ব্রেকআউট প্রমাণ করে।',
    },
    keyTakeaways: [
      {
        en: 'Do not fade or short against a Marubozu; the directional momentum is overwhelmingly strong.',
        bn: 'মারুবোজু ক্যান্ডেলের বিপরীতে কখনোই রিভার্সাল সেল নেওয়ার চেষ্টা করবেন না; মোমেন্টাম অতি তীব্র।',
      },
      {
        en: 'Enter on a shallow pullback to the 50% midpoint of the Marubozu body with stops below its open.',
        bn: 'মারুবোজুর ৫০% বডিতে হালকা রিট্রেসমেন্ট পেলে বাই নিন এবং এর ওপেনিং পয়েন্টের নিচে স্টপ লস দিন।',
      },
    ],
    entry: 2325.0,
    stopLoss: 2310.0,
    takeProfit: 2368.0,
    rr: '2.9',
    type: 'pattern',
  },

  'morning-star-01': {
    title: {
      en: 'Morning Star 3-Candle Bullish Reversal at Key Support',
      bn: 'মেজর সাপোর্টে মর্নিং স্টার — ৩-ক্যান্ডেল বুলিশ রিভার্সাল মাস্টারক্লাস',
    },
    caption: {
      en: 'A textbook 3-candle Morning Star pattern ending a 150-pip downtrend and initiating a strong rally.',
      bn: '১৫০ পিপস ডাউনট্রেন্ড সমাপ্ত করে সাপোর্টে ৩ ক্যান্ডেলের মর্নিং স্টার গঠন ও বড় বুলিশ র‍্যালি।',
    },
    notes: {
      en: 'Candle 1 is a heavy bearish candle, Candle 2 is an indecision star at support, and Candle 3 is a surging bullish expansion confirming buyer dominance.',
      bn: '১ম ক্যান্ডেল বড় লাল, ২য় ক্যান্ডেল সাপোর্টে ছোট স্টার এবং ৩য় ক্যান্ডেল শক্তিশালী গ্রিন ক্লোজ যা বায়ারদের প্রাধান্য প্রমাণ করে।',
    },
    explanation: {
      en: 'The Morning Star is the classic bullish counterpart to the Evening Star. Candle 1 shows the final panic wave of selling. Candle 2 represents equilibrium where selling exhausts. Candle 3 acts as the confirmation catalyst, closing well above the midpoint of Candle 1, trapping sellers and triggering aggressive buy-side algorithms.',
      bn: 'মর্নিং স্টার হলো ট্রেডিংয়ের অন্যতম নির্ভরযোগ্য ৩-ক্যান্ডেল বুলিশ রিভার্সাল। ১ম ক্যান্ডেল সেলারদের শেষ ধাক্কা দেখায়, ২য় ছোট ক্যান্ডেল বোঝায় সেলাররা ক্লান্ত, এবং ৩য় বড় গ্রিন ক্যান্ডেল ১ম ক্যান্ডেলের অর্ধেকের বেশি ওপরে ক্লোজ দিয়ে নিশ্চিত করে যে বায়াররা পুরোপুরি মার্কেট নিয়ন্ত্রণ নিয়েছে।',
    },
    keyTakeaways: [
      {
        en: 'Candle 3 must close above the 50% level of Candle 1 to validate the reversal.',
        bn: '৩য় ক্যান্ডেলটিকে অবশ্যই ১ম ক্যান্ডেলের বডির ৫০% লেভেলের উপরে ক্লোজ হতে হবে।',
      },
      {
        en: 'Stop loss sits safely below the lowest point of Candle 2 with minimum 1:2 R:R target.',
        bn: 'স্টপ লস ২য় ক্যান্ডেলের সর্বনিম্ন উইকের নিচে রাখুন এবং লক্ষ্যমাত্রা অন্তত ১:২ রাখুন।',
      },
    ],
    entry: 1.0780,
    stopLoss: 1.0735,
    takeProfit: 1.0890,
    rr: '2.4',
    type: 'pattern',
  },

  'order-block-01': {
    title: {
      en: 'Bullish Order Block (OB) Mitigation & Expansion',
      bn: 'বুলিশ অর্ডার ব্লক (OB) — লিকুইডিটি মিটিগেশন ও এক্সপ্যানশন',
    },
    caption: {
      en: 'Price creates a clean Bullish OB on displacement, then retests to mitigate before explosive continuation.',
      bn: 'মার্কেট ডিসপ্লেসমেন্টের মাধ্যমে বুলিশ OB তৈরি করে এবং পরবর্তীতে তা রিটেস্ট করে রকেটের মতো ছুটে যায়।',
    },
    notes: {
      en: 'The last bearish candle before the strong bullish impulse wave is the institutional Order Block. Price retraced to mitigate it and launched.',
      bn: 'তীব্র বুলিশ ইমপালসের ঠিক আগের শেষ বিয়ারিশ ক্যান্ডেলটিই প্রাতিষ্ঠানিক অর্ডার ব্লক। প্রাইস তা নিখুঁতভাবে রিটেস্ট করেছে।',
    },
    explanation: {
      en: 'An institutional Order Block represents the footprint where smart money placed massive buy orders, temporarily absorbing sell volume before violently driving price upward (displacement). Because institutions often have unmitigated drawdown or pending limit orders inside this candle, price returns to mitigate the block before continuing the primary trend.',
      bn: 'অর্ডার ব্লক হলো সেই স্থান যেখানে বড় ব্যাংক ও ফান্ডগুলো বিশাল অঙ্কের বাই পজিশন ওপেন করেছিল, যার ফলে মার্কেটে বড় গ্রিন ক্যান্ডেল তৈরি হয়। তাদের কিছু হেজিং অর্ডার ব্রেক-ইভেনে ক্লোজ করার জন্য এবং নতুন বাই যোগ করার জন্য প্রাইস আবার এই জোনে ফিরে আসে। একে মিটিগেশন বলে, যা রিটেইল ট্রেডারদের জন্য সেরা এন্ট্রি পয়েন্ট।',
    },
    keyTakeaways: [
      {
        en: 'A valid Order Block must cause a displacement wave that breaks market structure (BOS).',
        bn: 'একটি কার্যকরী অর্ডার ব্লকের পরে অবশ্যই এমন বড় মুভ থাকতে হবে যা আগের স্ট্রাকচার ভাঙে (BOS)।',
      },
      {
        en: 'Set limit orders at the open of the OB, with stop loss safely below the OB low wick.',
        bn: 'অর্ডার ব্লকের ওপেনিং প্রাইসে এন্ট্রি লিমিট দিন এবং এর লো উইকের নিচে স্টপ লস বসান।',
      },
    ],
    entry: 2312.0,
    stopLoss: 2298.0,
    takeProfit: 2355.0,
    rr: '3.1',
    type: 'concept',
  },

  'premium-discount-01': {
    title: {
      en: 'Premium vs Discount Zones — The 50% Equilibrium Rule',
      bn: 'প্রিমিয়াম বনাম ডিসকাউন্ট জোন — ৫০% ইকুইলিব্রিয়াম নিয়ম',
    },
    caption: {
      en: 'Identifying premium (expensive) and discount (cheap) halves of an institutional dealing range.',
      bn: 'প্রাতিষ্ঠানিক ডিলিং রেঞ্জে ৫০% ইকুইলিব্রিয়াম দিয়ে সস্তা (ডিসকাউন্ট) ও দামি (প্রিমিয়াম) জোন শনাক্তকরণ।',
    },
    notes: {
      en: 'The 50% Equilibrium line divides the dealing range. Smart money only buys in discount (below 50%) and sells in premium (above 50%).',
      bn: '৫০% লাইন রেঞ্জকে দুই ভাগে ভাগ করে। স্মার্ট মানি ডিসকাউন্টে কেনে এবং প্রিমিয়ামে বিক্রি করে।',
    },
    explanation: {
      en: 'Commercial and institutional participants treat financial markets like any wholesale business: buy cheap (discount), sell expensive (premium). By identifying the dealing range high and low, the 50% equilibrium line separates the chart. Executing longs in premium or shorts in discount drastically degrades long-term profitability.',
      bn: 'বড় প্রাতিষ্ঠানিক ব্যবসায়ীরা ট্রেডিংকে পাইকারি বাজারের মতো দেখে: সস্তায় কেনা (ডিসকাউন্ট) এবং চড়া দামে বিক্রি (প্রিমিয়াম)। একটি সুইং রেঞ্জের ৫০% দাগ হলো ইকুইলিব্রিয়াম। ৫০% এর উপরে থাকা অবস্থায় বাই নেওয়া অথবা নিচে থাকা অবস্থায় সেল নেওয়া হলো রিটেইলারদের সবচেয়ে বড় ফাঁদ।',
    },
    keyTakeaways: [
      {
        en: 'Never enter long positions above the 50% equilibrium level of your trading range.',
        bn: 'ডিলিং রেঞ্জের ৫০% ইকুইলিব্রিয়ামের ওপরে থাকা অবস্থায় কখনোই নতুন বাই এন্ট্রি খুঁজবেন না।',
      },
      {
        en: 'Combine discount pricing with an Order Block or FVG for institutional grade setups.',
        bn: 'ডিসকাউন্ট জোনের ভেতরে অর্ডার ব্লক বা FVG থাকলে তা ৯০% নিখুঁত ট্রেডিং সেটআপে পরিণত হয়।',
      },
    ],
    entry: 2310.0,
    stopLoss: 2285.0,
    takeProfit: 2375.0,
    rr: '2.6',
    type: 'concept',
  },

  'real-xauusd-breakout-01': {
    title: {
      en: 'Real Market — Gold All-Time High Daily Breakout',
      bn: 'বাস্তব মার্কেট — গোল্ড অল-টাইম হাই ডেইলি ব্রেকআউট বিশ্লেষণ',
    },
    caption: {
      en: 'Gold breaking out of multi-month resistance with institutional momentum on the Daily timeframe.',
      bn: 'ডেইলি টাইমফ্রেমে গোল্ড কয়েক মাসের দীর্ঘ রেজিস্ট্যান্স ভেঙে অল-টাইম হাইয়ের নতুন যুগে প্রবেশ করে।',
    },
    notes: {
      en: 'Multi-week consolidation under $2400 ended with a decisive expansion candle closing above resistance, confirming macro continuation.',
      bn: '২৪০০ ডলারের নিচে কয়েক সপ্তাহের কনসলিডেশন সমাপ্ত করে বড় ডেইলি ক্যান্ডেল রেজিস্ট্যান্সের ওপরে ক্লোজ দিয়ে আপট্রেন্ড নিশ্চিত করে।',
    },
    explanation: {
      en: 'This real-market case study documents Gold breaking out to historic all-time highs. After accumulating liquidity between $2340 and $2400 for weeks, an expansion candle closed firmly above $2400 on massive institutional volume. Notice that the breakout candle had no hesitation, closing at its daily high to trigger macro trend-followers.',
      bn: 'এই রিয়েল-মার্কেট কেস স্টাডিতে গোল্ডের ঐতিহাসিক অল-টাইম হাই ব্রেকআউট নথিভুক্ত করা হয়েছে। কয়েক সপ্তাহ ধরে ২৩৪০ থেকে ২৪০০-এর মধ্যে লিকুইডিটি জমার পর, একটি বড় ডেইলি ক্যান্ডেল ২৪০০-এর ওপরে ক্লোজ দেয়। কোনো আপার উইক ছাড়াই ক্যান্ডেলটি ক্লোজ হওয়া নির্দেশ করে যে ম্যাক্রো ফান্ডগুলো এতে বিপুল মূলধন খাটিয়েছে।',
    },
    keyTakeaways: [
      {
        en: 'Higher timeframe daily candle closes carry 10x more weight than intraday 15-minute breakouts.',
        bn: 'ডেইলি টাইমফ্রেমের বডি ক্লোজ লোয়ার টাইমফ্রেমের ব্রেকআউটের চেয়ে ১০ গুণ বেশি শক্তিশালী ও নির্ভরযোগ্য।',
      },
      {
        en: 'In macro breakouts, avoid looking for reversals; trade strictly in alignment with the expansion trend.',
        bn: 'অল-টাইম হাই ব্রেকআউটে টপ ধরার জন্য রিভার্সাল সেল খুঁজবেন না; ট্রেন্ডের সাথে বাই করাই নিরাপদ।',
      },
    ],
    entry: 2392.0,
    stopLoss: 2360.0,
    takeProfit: 2480.0,
    rr: '2.8',
    type: 'real',
  },

  'shooting-star-01': {
    title: {
      en: 'Shooting Star at Resistance — Bearish Supply Rejection',
      bn: 'রেজিস্ট্যান্সে শুটিং স্টার — বিয়ারিশ সাপ্লাই রিজেকশন',
    },
    caption: {
      en: 'Shooting star with long upper wick at resistance level proves violent rejection of higher prices.',
      bn: 'রেজিস্ট্যান্স লেভেলে দীর্ঘ আপার উইক সহ শুটিং স্টার যা ওপরের প্রাইসে সেলারদের তীব্র বাধার প্রমাণ।',
    },
    notes: {
      en: 'Buyers pushed price up during the session, but heavy institutional supply rejected it back down near the open.',
      bn: 'সেশনের মাঝে বায়াররা দাম অনেক ওপরে উঠালেও সাপ্লাই জোনের সেলাররা একে টেনে একদম ওপেনের নিচে নামিয়ে দেয়।',
    },
    explanation: {
      en: 'A Shooting Star appears at the zenith of an uptrend or at key resistance. Price opens and rallies strongly, creating an impressive green bar during the session. However, when it encounters resting institutional sell orders, price is slammed downward to close near the low, leaving a long upper wick. This traps greedy breakout buyers at the very top.',
      bn: 'শুটিং স্টার আপট্রেন্ডের চূড়ায় বা রেজিস্ট্যান্স লেভেলে দেখা যায়। সেশনের শুরুতে বায়াররা দাম অনেক ওপরে তুলে দিলেও সাপ্লাই জোনে পৌঁছানোর সাথে সাথে প্রাতিষ্ঠানিক সেলিং প্রেশারে তা ধসে পড়ে এবং সেশনের লো-এর কাছাকাছি ক্লোজ দেয়। দীর্ঘ ওপরের উইকটি রিটেইল বায়ারদের ফাঁদে পড়ার স্মৃতিচিহ্ন।',
    },
    keyTakeaways: [
      {
        en: 'Upper wick must be at least 2 to 3 times the size of the real body, with little to no lower wick.',
        bn: 'ওপরের উইকটি অবশ্যই রিয়েল বডির ২ থেকে ৩ গুণ লম্বা হতে হবে এবং নিচের উইক প্রায় থাকবেই না।',
      },
      {
        en: 'Sell entry triggers when the following candle breaks below the Shooting Star real body.',
        bn: 'পরবর্তী ক্যান্ডেল শুটিং স্টারের বডির নিচে নামলে কনফার্মেশন সহ সেল এন্ট্রি ট্রিগার হয়।',
      },
    ],
    entry: 2348.0,
    stopLoss: 2362.0,
    takeProfit: 2312.0,
    rr: '2.6',
    type: 'pattern',
  },

  'support-flip-01': {
    title: {
      en: 'Support Becomes Resistance (S/R Flip) Breakdown',
      bn: 'সাপোর্ট রূপান্তর রেজিস্ট্যান্সে (S/R ফ্লিপ) — রিটেস্ট ও কন্টিনিউয়েশন',
    },
    caption: {
      en: 'Prior support level breaks on strong momentum and flips into impenetrable resistance.',
      bn: 'পূর্ববর্তী সাপোর্ট মোমেন্টামের সাথে ভেঙে যায় এবং পরবর্তীতে রিটেস্টে শক্তিশালী রেজিস্ট্যান্সে রূপ নেয়।',
    },
    notes: {
      en: 'Once a support level is broken with strong momentum, it flips to resistance. Any retest of that level provides a high-probability short.',
      bn: 'সাপোর্ট লেভেল ভাঙার পর তা রেজিস্ট্যান্সে পরিণত হয়। সেই লেভেলে পুনরায় রিটেস্ট পাওয়া গেলে তা সেরা সেল সেটআপ।',
    },
    explanation: {
      en: 'Price Memory is a core principle in technical analysis. When price breaks below a well-established support zone, all the traders who bought at that support are now trapped in losing positions. When price pulls back to retest that level, trapped buyers exit at breakeven (selling), while new short-sellers initiate fresh sell orders, creating an overwhelming wave of supply.',
      bn: 'প্রাইস মেমোরি হলো টেকনিক্যাল অ্যানালাইসিসের অন্যতম মৌলিক নিয়ম। একটি সুপ্রতিষ্ঠিত সাপোর্ট যখন ভেঙে যায়, তখন যারা ওই সাপোর্টে বাই করেছিল তারা বড় লসে আটকে পড়ে। পরবর্তীতে প্রাইস আবার ওই লেভেলে ফিরে এলে তারা ব্রেক-ইভেনে বাঁচার জন্য সেল দিয়ে দেয়, পাশাপাশি নতুন সেলাররাও সেল করে। ফলে পুরোনো সাপোর্টটি শক্তিশালী নতুন রেজিস্ট্যান্সে রূপ নেয়।',
    },
    keyTakeaways: [
      {
        en: 'Look for a clean displacement candle closing completely below the support floor before trading the flip.',
        bn: 'ফ্লিপ ট্রেড করার আগে নিশ্চিত হোন যে বড় ক্যান্ডেল দিয়ে সাপোর্টটি পরিষ্কারভাবে ভেঙে নিচে ক্লোজ হয়েছে।',
      },
      {
        en: 'Enter on the retest rejection with stop loss securely placed above the newly formed resistance.',
        bn: 'রিটেস্টে রিজেকশন দেখে সেল এন্ট্রি নিন এবং নতুন রেজিস্ট্যান্সের কিছুটা ওপরে স্টপ লস সেট করুন।',
      },
    ],
    entry: 1.2720,
    stopLoss: 1.2760,
    takeProfit: 1.2610,
    rr: '2.8',
    type: 'concept',
  },

  'three-black-crows-01': {
    title: {
      en: 'Three Black Crows — Institutional Trend Reversal Breakdown',
      bn: 'থ্রি ব্ল্যাক ক্রোজ — প্রাতিষ্ঠানিক বিয়ারিশ রিভার্সাল ও মোমেন্টাম ক্যাসকেড',
    },
    caption: {
      en: 'GBPUSD breaks market structure with Three Black Crows, cascading 320 pips lower.',
      bn: 'GBPUSD পরপর ৩টি শক্তিশালী বিয়ারিশ ক্যান্ডেলে মার্কেট স্ট্রাকচার ভেঙে ৩২০ পিপস নিচে নেমে যায়।',
    },
    notes: {
      en: 'Three consecutive long-bodied bearish candles, each opening within the previous body and closing lower, signaling massive sell conviction.',
      bn: 'টানা ৩টি দীর্ঘ বডির লাল ক্যান্ডেল, যার প্রতিটি আগেরটির বডির ভেতরে ওপেন হয়ে নিচে ক্লোজ দিয়ে ব্যাপক সেলিং পাওয়ার দেখায়।',
    },
    explanation: {
      en: 'The Three Black Crows is a powerful bearish reversal pattern consisting of three consecutive long-bodied red candles. Each candle opens within the body of the previous candle and closes near its absolute low. This pattern indicates complete institutional abandonment of the previous bullish trend and aggressive repricing downward.',
      bn: 'থ্রি ব্ল্যাক ক্রোজ হলো অত্যন্ত শক্তিশালী বিয়ারিশ প্যাটার্ন যা টানা ৩টি দীর্ঘ লাল ক্যান্ডেল নিয়ে গঠিত। প্রতিটি ক্যান্ডেল আগের ক্যান্ডেলের বডির ভেতর ওপেন হয় এবং কোনো লোয়ার উইক ছাড়াই প্রায় সর্বনিম্ন পয়েন্টে ক্লোজ হয়। এটি প্রমাণ করে প্রাতিষ্ঠানিক ফান্ডগুলো পুরো মার্কেট সেল মোডে নিয়ে গেছে।',
    },
    keyTakeaways: [
      {
        en: 'Do not chase the market at the low of Candle 3; wait for a healthy pullback into the Candle 2/3 zone.',
        bn: '৩য় ক্যান্ডেলের একদম নিচে অন্ধের মতো সেল দেবেন না; হালকা পুলব্যাকের অপেক্ষা করুন।',
      },
      {
        en: 'Each candle should have relatively short lower wicks, confirming that bears maintained control into every close.',
        bn: 'প্রতিটি ক্যান্ডেলের নিচের উইক ছোট হতে হবে, যা বোঝায় শেষ সেকেন্ড পর্যন্ত সেলাররা কন্ট্রোলে ছিল।',
      },
    ],
    entry: 1.2680,
    stopLoss: 1.2760,
    takeProfit: 1.2480,
    rr: '2.5',
    type: 'pattern',
  },

  'three-white-soldiers-01': {
    title: {
      en: 'Three White Soldiers — Relentless Bullish Trend Expansion',
      bn: 'থ্রি হোয়াইট সোলজার্স — অপ্রতিরোধ্য বুলিশ ট্রেন্ড এক্সপ্যানশন',
    },
    caption: {
      en: 'Gold breaks out of a 2-week consolidation with Three White Soldiers, surging over 400 pips.',
      bn: 'গোল্ড ২ সপ্তাহের রেঞ্জ ভেঙে থ্রি হোয়াইট সোলজার্স ক্যান্ডেল তৈরি করে ৪০০ পিপসেরও বেশি ওপরে ওঠে।',
    },
    notes: {
      en: 'Three consecutive large green candles, each opening within the prior body and closing near highs with small wicks.',
      bn: 'টানা ৩টি বড় গ্রিন ক্যান্ডেল, যার প্রতিটি আগের বডির ভেতরে ওপেন হয়ে শীর্ষের কাছে ক্লোজ দিয়ে বায়ারদের দাপট প্রতিষ্ঠা করে।',
    },
    explanation: {
      en: 'The bullish counterpart to Three Black Crows. Three White Soldiers manifests after an extended consolidation or bottoming phase. Each of the three candles opens within the preceding candle body and expands upward with strong momentum to close near the high. This pattern signifies that institutional smart money has initiated a sustained macro bull campaign.',
      bn: 'থ্রি হোয়াইট সোলজার্স হলো দীর্ঘ ডাউনট্রেন্ড বা কনসলিডেশন শেষের সবচেয়ে নির্ভরযোগ্য বুলিশ প্যাটার্ন। টানা ৩টি বড় সবুজ ক্যান্ডেল পরপর হাইয়ার হাই ও হাইয়ার লো তৈরি করে কোনো বড় আপার উইক ছাড়াই ক্লোজ দেয়। এটি প্রমাণ করে স্মার্ট মানি দীর্ঘমেয়াদি আপট্রেন্ডের জন্য মার্কেটকে ড্রাইভ করছে।',
    },
    keyTakeaways: [
      {
        en: 'Each candle must make progressive new highs and close near its absolute upper limit.',
        bn: 'প্রতিটি ক্যান্ডেল অবশ্যই নতুন হাই তৈরি করবে এবং তার সর্বোচ্চ পয়েন্টের কাছাকাছি ক্লোজ দেবে।',
      },
      {
        en: 'Best execution is entering on a 15-minute FVG retracement within the body of Soldier 2 or 3.',
        bn: 'লোয়ার টাইমফ্রেমে ২য় বা ৩য় ক্যান্ডেলের ভেতরের FVG-তে পুলব্যাক পেলে নিরাপদ এন্ট্রি নিশ্চিত হয়।',
      },
    ],
    entry: 2315.0,
    stopLoss: 2295.0,
    takeProfit: 2370.0,
    rr: '2.8',
    type: 'pattern',
  },

  'trade-review-loss-01': {
    title: {
      en: 'Trade Review — FOMO Premature Entry on EURUSD (Loss)',
      bn: 'ট্রেড রিভিউ — EURUSD-তে FOMO প্রিম্যাচিওর এন্ট্রি (লস ট্রেড পোস্টমর্টেম)',
    },
    caption: {
      en: 'FOMO entry before official candle close. Price swept the stop before eventually moving to target.',
      bn: 'ক্যান্ডেল ক্লোজের আগে তাড়াহুড়ো করে FOMO এন্ট্রি। প্রাইস স্টপ লস সুইপ করে পরে কাঙ্ক্ষিত টার্গেটে যায়।',
    },
    notes: {
      en: 'Entered prematurely without waiting for candle close confirmation. Price dipped into liquidity pool to tag the stop before reversing to original target. Core lesson: always wait for candle close!',
      bn: 'ক্যান্ডেল ক্লোজের অপেক্ষা না করে আগেভাগে ঢোকার মারাত্মক পরিণতি। প্রাইস স্টপ লস হান্ট করে তবেই টার্গেটে গেছে। শিক্ষা: সব সময় ক্যান্ডেল ক্লোজের অপেক্ষা করুন!',
    },
    explanation: {
      en: 'Post-mortem analysis of an execution mistake. The trader identified the correct market direction (bullish), but acted on fear of missing out (FOMO) and bought mid-candle before the 1-hour bar closed. Market makers used the last 10 minutes of the hour to sweep the low, hitting the traders stop loss before immediately rocketing 60 pips toward the planned profit target.',
      bn: 'একটি বাস্তব ভুলের ট্রেড পোস্টমর্টেম বিশ্লেষণ। ট্রেডারের মার্কেট ডিরেকশন সঠিক ছিল (বুলিশ), কিন্তু ক্যান্ডেল ক্লোজ হওয়ার আগেই FOMO-এর বশবর্তী হয়ে তাড়াহুড়ো করে বাই নেন। স্মার্ট মানি ঘণ্টার শেষ ১০ মিনিটে নিচের লিকুইডিটি পুলে ডাইভ দিয়ে ট্রেডারের স্টপ লস খেয়ে ফেলে, এবং তারপর চোখের পলকে ৬০ পিপস টার্গেটে পৌঁছে যায়।',
    },
    keyTakeaways: [
      {
        en: 'Direction alone is not enough; timing and waiting for the official candle close protects your capital.',
        bn: 'শুধু দিক ঠিক থাকলেই হয় না; নিখুঁত টাইমিং এবং ক্যান্ডেল ক্লোজের অপেক্ষা করাই আসল পুঁজি রক্ষা করে।',
      },
      {
        en: 'Always place your stop loss behind the structural liquidity pool, not right on it.',
        bn: 'স্টপ লস কখনোই স্পষ্ট সুইং পয়েন্টের ঠিক ওপরে রাখবেন না; বাফার দিয়ে কাঠামোর বাইরে রাখুন।',
      },
    ],
    entry: 1.0830,
    stopLoss: 1.0810,
    takeProfit: 1.0870,
    rr: '2.0',
    type: 'trade-review',
  },

  'trade-review-win-01': {
    title: {
      en: 'Trade Review — London Judas Swing on Gold (Win)',
      bn: 'ট্রেড রিভিউ — গোল্ডে লন্ডন জুডাস সুইং (১:৪ R:R উইন ট্রেড)',
    },
    caption: {
      en: 'London open sweeps Asian session low (SSL) and explodes 120 pips upward into target.',
      bn: 'লন্ডন সেশন ওপেনে এশিয়ান লো সুইপ করে লিকুইডিটি তুলে ১২০ পিপসের বিশাল প্রফিট টার্গেট স্পর্শ করে।',
    },
    notes: {
      en: 'Trade executed after Asian Low was swept with strong displacement. Risked 15 pips for a 60 pip TP at Asian High (1:4 RR achieved).',
      bn: 'এশিয়ান লো সুইপের পর স্ট্রং ডিসপ্লেসমেন্ট দেখে এন্ট্রি। ১৫ পিপস রিস্কে ৬০ পিপস প্রফিট বুকিং (১:৪ R:R অর্জিত)।',
    },
    explanation: {
      en: 'A flawless execution of the London Open protocol on Gold (XAUUSD). The Asian session established equal lows around 2308. At 07:15 GMT, a sharp spike swept the Asian lows by 8 pips, followed by an immediate massive displacement candle closing back inside the range. The trade was triggered on the 1-minute FVG pullback with target at the Asian High.',
      bn: 'গোল্ডে লন্ডন ওপেন স্ট্র্যাটেজির একটি নিখুঁত উইনিং এক্সিকিউশন। এশিয়ান সেশনে ২৩০৮ লেভেলে ইকুয়াল লো তৈরি হয়েছিল। লন্ডন ওপেনের পরপরই ৮ পিপসের একটি স্পাইক দিয়ে লো সুইপ করা হয় এবং সাথে সাথে বড় ক্যান্ডেল রেঞ্জের ভেতরে ক্লোজ দেয়। ১ মিনিটের FVG রিটেস্টে এন্ট্রি নিয়ে পুরো এশিয়ান হাই পর্যন্ত ১:৪ রিস্ক রিওয়ার্ডে ফুল প্রফিট বুক করা হয়।',
    },
    keyTakeaways: [
      {
        en: 'Wait for the sweep: Liquidity sweeps provide the fuel for explosive high-R:R moves.',
        bn: 'সুইপের অপেক্ষা করুন: লিকুইডিটি সুইপই বড় হাই-রিওয়ার্ড মুভের প্রধান জ্বালানি।',
      },
      {
        en: 'Take partial profits at TP1 (previous range midpoint) and move stop loss to breakeven.',
        bn: 'TP1 (রেঞ্জের ৫০%) এ পৌঁছালে পারশিয়াল প্রফিট তুলে স্টপ লস ব্রেক-ইভেনে নিয়ে আসুন।',
      },
    ],
    entry: 2311.0,
    stopLoss: 2296.0,
    takeProfit: 2371.0,
    rr: '4.0',
    type: 'trade-review',
  },

  'trade-setup-gbpusd-01': {
    title: {
      en: 'GBPUSD Trade Setup — Asian Range Sweep & Mitigation',
      bn: 'GBPUSD ট্রেড সেটআপ — এশিয়ান হাই সুইপ ও অর্ডার ব্লক মিটিগেশন',
    },
    caption: {
      en: 'GBPUSD short setup executed at London high mitigation, moved to breakeven after TP1.',
      bn: 'লন্ডন হাই মিটিগেশনে GBPUSD শর্ট এক্সিকিউশন; TP1 হিটের পর স্টপ ব্রেক-ইভেনে স্থানান্তর।',
    },
    notes: {
      en: 'Trade triggered at 1.2740 OB mitigation. Hit TP1 (+25 pips), moved stop to breakeven, and remainder was stopped out at BE during NY chop.',
      bn: '১.২৭৪০ OB মিটিগেশনে এন্ট্রি। TP1 হিটের পর (+২৫ পিপস) স্টপ ব্রেক-ইভেনে নেওয়া হয় এবং বাকি অংশ BE-তে ক্লোজ হয়।',
    },
    explanation: {
      en: 'This setup illustrates disciplined trade management on GBPUSD. Price swept the Asian Session High at the London open and printed a bearish Order Block at 1.2740. A limit sell order was executed upon mitigation. Price reached TP1 (+25 pips) at the Asian equilibrium, prompting the trader to secure 50% profits and move the stop loss to entry. When New York volatility chopped back, the remaining position exited at zero risk.',
      bn: 'GBPUSD-তে শৃঙ্খলাবদ্ধ ট্রেড ম্যানেজমেন্টের চমৎকার উদাহরণ। লন্ডন ওপেনে এশিয়ান হাই সুইপ করে ১.২৭৪০-এ বিয়ারিশ অর্ডার ব্লক তৈরি হয়। মিটিগেশনে সেল এন্ট্রি নিয়ে ২৫ পিপস লাভে ৫০% প্রফিট বুক করা হয় এবং স্টপ লস ব্রেক-ইভেনে নেওয়া হয়। পরবর্তীতে নিউ ইয়র্ক সেশনের চপিতে বাকি অংশ শূন্য ঝুঁকিতে বের হয়ে যায়।',
    },
    keyTakeaways: [
      {
        en: 'Moving stop loss to breakeven after TP1 guarantees that a winning trade can never turn into a loss.',
        bn: 'TP1 পাওয়ার পর স্টপ লস ব্রেক-ইভেনে নেওয়া নিশ্চিত করে যে লাভজনক ট্রেড কখনোই লসে রূপ নেবে না।',
      },
      {
        en: 'Breakeven exits are wins of capital preservation, never view them as failures.',
        bn: 'ব্রেক-ইভেন এক্সিট মানে মূলধন রক্ষা পাওয়া; একে কখনোই ব্যর্থতা ভাববেন না।',
      },
    ],
    entry: 1.2740,
    stopLoss: 1.2765,
    takeProfit: 1.2665,
    rr: '3.0',
    type: 'trade-setup',
  },

  'trade-setup-xauusd-01': {
    title: {
      en: 'XAUUSD H4 — Bullish Order Block Master Trade Setup',
      bn: 'XAUUSD H4 — বুলিশ অর্ডার ব্লক মাস্টার ট্রেড সেটআপ (১:৪ R:R)',
    },
    caption: {
      en: 'Full trade setup on Gold H4: OB mitigation entry at 2302 with clean 1:4 RR run to 2338.',
      bn: 'গোল্ড H4-এ পূর্ণাঙ্গ ট্রেড সেটআপ: ২৩০২ অর্ডার ব্লকে নিখুঁত এন্ট্রি এবং ২৩৩৮ টার্গেটে ১:৪ R:R অর্জন।',
    },
    notes: {
      en: 'Entered on OB mitigation at 2302 with tight SL at 2293. TP hit at 2338 for a clean 1:4 RR trade.',
      bn: '২৩০২-এ OB মিটিগেশন এন্ট্রি, টাইট স্টপ লস ২২৯৩। ২৩৩৮-এ টেক প্রফিট স্পর্শ করে ১:৪ R:R নিশ্চিত।',
    },
    explanation: {
      en: 'A high-timeframe institutional setup on Gold H4. Price formed a massive displacement move breaking market structure (BOS) above 2320, leaving behind an unmitigated Bullish Order Block between 2295 and 2304. A pending buy limit was placed at 2302. Price retraced smoothly, wicked into the block, and expanded forcefully to hit the 2338 swing high target for an exemplary 1:4 Risk-to-Reward gain.',
      bn: 'গোল্ড H4-এ একটি উচ্চমানের প্রাতিষ্ঠানিক সেটআপ। ২৩২০-এর ওপরে মার্কেট স্ট্রাকচার ব্রেক (BOS) করে প্রাইস ২২৯৫ থেকে ২৩০৪-এ একটি আনমিটিগেটেড বুলিশ অর্ডার ব্লক রেখে যায়। ২৩০২ লেভেলে বাই লিমিট দেওয়া ছিল। প্রাইস সুন্দরভাবে রিট্রেস করে ব্লকে টাচ করে এবং মুহূর্তের মধ্যে ২৩৩৮ টার্গেটে পৌঁছে যায়, যা ১:৪ রিস্ক রিওয়ার্ড এনে দেয়।',
    },
    keyTakeaways: [
      {
        en: 'High timeframe H4 Order Blocks produce the most reliable and stable reward-to-risk ratios.',
        bn: 'H4-এর মতো হাইয়ার টাইমফ্রেমের অর্ডার ব্লকগুলো সবচেয়ে বেশি নির্ভরযোগ্য ও স্থিতিশীল প্রফিট দেয়।',
      },
      {
        en: 'Calculate position size strictly based on the 9-point stop loss distance to risk only 1% of account.',
        bn: '৯ পয়েন্ট স্টপ লস দূরত্বের ওপর ভিত্তি করে লট সাইজ নির্ধারণ করুন যাতে অ্যাকাউন্টের মাত্র ১% ঝুঁকি থাকে।',
      },
    ],
    entry: 2302.0,
    stopLoss: 2293.0,
    takeProfit: 2338.0,
    rr: '4.0',
    type: 'trade-setup',
  },

  'tweezer-bottom-01': {
    title: {
      en: 'Tweezer Bottom Liquidity Rejection on GBPUSD',
      bn: 'GBPUSD-তে টুইজার বটম — ডাবল লো রিজেকশন ও বুলিশ বাউন্স',
    },
    caption: {
      en: 'GBPUSD forms matching lows at 1.2600 support, bouncing 180 pips into higher timeframe targets.',
      bn: '১.২৬০০ সাইকোলজিক্যাল সাপোর্টে টুইজার বটম তৈরি করে ১৮০ পিপসের শক্তিশালী ঊর্ধ্বমুখী রিভার্সাল।',
    },
    notes: {
      en: 'Two consecutive candles with identical lows at key support. Candle 1 is bearish; Candle 2 is bullish with identical bottom wick.',
      bn: 'কী-সাপোর্টে পরপর দুটি ক্যান্ডেলের লো পয়েন্ট হুবহু সমান। ১ম ক্যান্ডেল লাল, ২য় ক্যান্ডেল সবুজ।',
    },
    explanation: {
      en: 'A Tweezer Bottom occurs when two consecutive candles test the exact same price floor and reject it cleanly. The first candle shows sellers driving price down, while the second candle tests that exact same price level but finds immediate, overwhelming buying interest. The matching wicks prove that an impenetrable floor of institutional bids exists at this level.',
      bn: 'টুইজার বটম গঠিত হয় যখন পরপর দুটি ক্যান্ডেল হুবহু একই প্রাইস লেভেলে নেমে এসে আঘাত করে এবং শক্তভাবে ওপরে উঠে যায়। ১ম ক্যান্ডেলটিতে সেলাররা দাম নিচে নামালেও ২য় ক্যান্ডেলে একই লেভেলে বায়ারদের বিপুল অর্ডার সক্রিয় হয়ে ওঠে। দুটি সমান লো উইক প্রমাণ করে এই লেভেলে শক্তিশালী প্রাতিষ্ঠানিক বিড রয়েছে যা প্রাইসকে আর নামতে দেবে না।',
    },
    keyTakeaways: [
      {
        en: 'The matching lows must occur at a validated HTF support, round number, or demand zone.',
        bn: 'ম্যাচিং লো অবশ্যই কোনো ভ্যালিড হাইয়ার টাইমফ্রেম সাপোর্ট বা রাউন্ড নাম্বারে হতে হবে।',
      },
      {
        en: 'Enter when Candle 2 closes green, placing stop loss comfortably below the twin lows.',
        bn: '২য় ক্যান্ডেলটি গ্রিন হয়ে ক্লোজ দিলে এন্ট্রি নিন এবং টুইন লো-এর নিচে স্টপ লস সেট করুন।',
      },
    ],
    entry: 1.2625,
    stopLoss: 1.2580,
    takeProfit: 1.2760,
    rr: '3.0',
    type: 'pattern',
  },

  'tweezer-top-01': {
    title: {
      en: 'Tweezer Top Double Rejection at Resistance',
      bn: 'EURUSD রেজিস্ট্যান্সে টুইজার টপ — ডাবল হাই রিজেকশন',
    },
    caption: {
      en: 'EURUSD forms identical highs at 1.0950 resistance, triggering a 160-pip decline.',
      bn: '১.০৯৫০ কী-রেজিস্ট্যান্সে হুবহু সমান জোড়া হাই তৈরি করে ১৬০ পিপসের ডাউনট্রেন্ড শুরু করে।',
    },
    notes: {
      en: 'Two consecutive candles with identical highs at key resistance. First candle bullish, second candle bearish.',
      bn: 'রেজিস্ট্যান্সে পরপর দুটি ক্যান্ডেলের হাই সমান। ১ম ক্যান্ডেল গ্রিন, ২য় ক্যান্ডেল রেড।',
    },
    explanation: {
      en: 'A Tweezer Top is a two-candle bearish reversal formation characterized by two consecutive candles hitting the exact same ceiling price. Candle 1 rallies into resistance. Candle 2 pushes to the exact same high, but meets immediate institutional selling pressure and closes down. The inability of buyers to push even a single pip higher confirms a distribution ceiling.',
      bn: 'টুইজার টপ হলো দুই ক্যান্ডেলের বিয়ারিশ রিভার্সাল যেখানে পরপর দুটি ক্যান্ডেল হুবহু একই সর্বোচ্চ প্রাইস লেভেল টেস্ট করে। ১ম ক্যান্ডেল বায়ারদের শক্তিতে ওপরে উঠলেও ২য় ক্যান্ডেল একই হাই থেকে প্রচণ্ড সেলিং প্রেশারে নিচে নেমে লাল হয়ে ক্লোজ হয়। বায়ারদের আর ১ পিপও ওপরে তুলতে না পারা প্রমাণ করে সিলিংয়ে সেলাররা দাঁড়িয়ে আছে।',
    },
    keyTakeaways: [
      {
        en: 'Twin highs at resistance show heavy limit sell orders waiting to absorb buy momentum.',
        bn: 'রেজিস্ট্যান্সে জোড়া হাই প্রমাণ করে সেখানে বিপুল পরিমাণ লিমিট সেল অর্ডার অপেক্ষা করছিল।',
      },
      {
        en: 'Enter short on Candle 2 close with stop loss placed with a 3-pip buffer above the twin highs.',
        bn: '২য় ক্যান্ডেল ক্লোজে সেল এন্ট্রি নিন এবং টুইন হাইয়ের ৩ পিপস ওপরে স্টপ লস রাখুন।',
      },
    ],
    entry: 1.0930,
    stopLoss: 1.0965,
    takeProfit: 1.0820,
    rr: '3.1',
    type: 'pattern',
  },
};

let updatedCount = 0;

for (const [id, meta] of Object.entries(enrichments)) {
  const filePath = path.join(chartsDir, `${id}.json`);
  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${filePath}`);
    continue;
  }

  const raw = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(raw);

  data.title = meta.title;
  data.caption = meta.caption;
  data.notes = meta.notes;
  data.explanation = meta.explanation;
  data.keyTakeaways = meta.keyTakeaways;
  if (meta.entry !== undefined) data.entry = meta.entry;
  if (meta.stopLoss !== undefined) data.stopLoss = meta.stopLoss;
  if (meta.takeProfit !== undefined) data.takeProfit = meta.takeProfit;
  if (meta.rr !== undefined) data.rr = meta.rr;
  if (meta.type !== undefined) data.type = meta.type;

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  updatedCount++;
}

console.log(`Successfully enriched ${updatedCount} charts with bilingual masterclass details.`);
