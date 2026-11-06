import type { Locale } from "@/lib/dictionaries";

/** Static long-form copy for /about and /disclaimer. */
export interface AboutCopy {
  eyebrow: string;
  title: string;
  intro: (chapters: number, lessons: number) => string;
  aim: string;
  findTitle: string;
  find: { href: string; before: string; link: string; after: string }[];
  notTitle: string;
  notBefore: string;
  notLink: string;
  notAfter: string;
}

export interface DisclaimerCopy {
  eyebrow: string;
  title: string;
  description: string;
  paragraphs: string[];
}

export const aboutCopy: Record<Locale, AboutCopy> = {
  en: {
    eyebrow: "About",
    title: "Notes from someone still learning",
    intro: (c, l) =>
      `TradeNotes is a personal learning journal for Forex and Gold trading. It started as private notes and became a structured set of ${c} chapters and ${l} lessons, written in English and Bengali.`,
    aim: "The aim is to explain one idea at a time, show it on a chart, and write down where it goes wrong. The rules come with the mistakes next to them, because that is what a beginner needs most.",
    findTitle: "What you will find here",
    find: [
      {
        href: "/learn",
        before: "A ",
        link: "curriculum",
        after: " that runs from market basics to building your own system.",
      },
      {
        href: "/patterns",
        before: "A ",
        link: "candlestick pattern library",
        after: " with diagrams and annotated example charts.",
      },
      {
        href: "/glossary",
        before: "A bilingual ",
        link: "glossary",
        after: ".",
      },
      {
        href: "/tools/risk-calculator",
        before: "A ",
        link: "risk calculator",
        after: " for position sizing.",
      },
      {
        href: "/notes",
        before: "Personal ",
        link: "notes",
        after: " on ICT, SMC and price action.",
      },
      {
        href: "/journal",
        before: "A trade ",
        link: "journal",
        after: " that measures results in R.",
      },
    ],
    notTitle: "What this is not",
    notBefore:
      "It is not a signal service, and nothing here tells you what to buy or sell. Read the ",
    notLink: "disclaimer",
    notAfter: " before you trade real money.",
  },
  bn: {
    eyebrow: "পরিচিতি",
    title: "যে এখনো শিখছে, তার নোট",
    intro: (c, l) =>
      `TradeNotes হলো Forex আর Gold trading শেখার একটি ব্যক্তিগত জার্নাল। শুরুটা ছিল নিজের নোট দিয়ে, এখন তা ${c}টি চ্যাপ্টার আর ${l}টি লেসনের একটি গোছানো কোর্স, ইংরেজি ও বাংলা দুই ভাষায়।`,
    aim: "লক্ষ্য হলো একবারে একটি ধারণা বোঝানো, চার্টে দেখানো, আর কোথায় ভুল হয় তা লিখে রাখা। নিয়মের পাশেই ভুলগুলো থাকে, কারণ নতুনদের সবচেয়ে বেশি দরকার সেটাই।",
    findTitle: "এখানে যা পাবেন",
    find: [
      {
        href: "/learn",
        before: "বাজারের মৌলিক ধারণা থেকে নিজের system বানানো পর্যন্ত একটি ",
        link: "কারিকুলাম",
        after: "।",
      },
      {
        href: "/patterns",
        before: "ডায়াগ্রাম ও চার্টসহ ",
        link: "ক্যান্ডেলস্টিক প্যাটার্ন লাইব্রেরি",
        after: "।",
      },
      { href: "/glossary", before: "দ্বিভাষিক ", link: "শব্দকোষ", after: "।" },
      {
        href: "/tools/risk-calculator",
        before: "position size বের করার ",
        link: "রিস্ক ক্যালকুলেটর",
        after: "।",
      },
      {
        href: "/notes",
        before: "ICT, SMC ও price action নিয়ে ব্যক্তিগত ",
        link: "নোটস",
        after: "।",
      },
      {
        href: "/journal",
        before: "R-এ ফলাফল মাপা trade ",
        link: "জার্নাল",
        after: "।",
      },
    ],
    notTitle: "যা এটি নয়",
    notBefore:
      "এটি কোনো signal সার্ভিস নয়, আর এখানকার কোনো কিছুই বলে দেয় না কী কিনবেন বা বেচবেন। আসল টাকায় trade করার আগে ",
    notLink: "ডিসক্লেইমার",
    notAfter: " পড়ে নিন।",
  },
};

export const disclaimerCopy: Record<Locale, DisclaimerCopy> = {
  en: {
    eyebrow: "Legal",
    title: "Disclaimer",
    description:
      "TradeNotes is educational content only and is not financial advice.",
    paragraphs: [
      "TradeNotes is educational content. Nothing on this site is financial, investment or trading advice, and nothing is a recommendation to buy or sell any instrument.",
      "Trading foreign exchange, gold and other leveraged products carries a high risk of loss. You can lose more than you expect, and leverage increases that risk. Only trade with money you can afford to lose.",
      "Past performance does not indicate future results. Charts on this site are synthetic examples made to illustrate an idea. They are not real market data and are not trade ideas.",
      "Figures, formulas and examples are simplified for learning. Contract sizes, margin rules, swaps and costs differ between brokers, so check the terms of yours. The author takes no responsibility for losses arising from the use of this material.",
      "If you are unsure whether trading is suitable for you, speak to a qualified, independent financial adviser in your country.",
    ],
  },
  bn: {
    eyebrow: "আইনি",
    title: "ডিসক্লেইমার",
    description:
      "TradeNotes শুধুমাত্র শিক্ষামূলক কনটেন্ট, এটি কোনো ফাইন্যান্সিয়াল অ্যাডভাইস নয়।",
    paragraphs: [
      "TradeNotes শিক্ষামূলক কনটেন্ট। এই সাইটের কোনো কিছুই ফাইন্যান্সিয়াল, বিনিয়োগ বা trading পরামর্শ নয়, এবং কোনো instrument কেনা বা বেচার সুপারিশও নয়।",
      "Forex, gold ও অন্যান্য leveraged প্রোডাক্টে trading করলে বড় ক্ষতির ঝুঁকি থাকে। আপনি ভাবনার চেয়েও বেশি হারাতে পারেন, আর leverage সেই ঝুঁকি বাড়ায়। যে টাকা হারানো সহ্য করতে পারবেন কেবল সেটাতেই trade করুন।",
      "অতীতের ফলাফল ভবিষ্যতের নিশ্চয়তা দেয় না। এই সাইটের চার্টগুলো একটি ধারণা বোঝানোর জন্য বানানো synthetic উদাহরণ। এগুলো আসল বাজারের ডেটা নয় এবং trade idea-ও নয়।",
      "সংখ্যা, ফর্মুলা ও উদাহরণ শেখার সুবিধার জন্য সরল করা। contract size, margin নিয়ম, swap ও খরচ broker ভেদে আলাদা, তাই নিজের broker-এর শর্ত দেখে নিন। এই লেখা ব্যবহারে হওয়া কোনো ক্ষতির দায় লেখক নেন না।",
      "trading আপনার জন্য উপযুক্ত কি না নিশ্চিত না হলে নিজের দেশের একজন যোগ্য, স্বাধীন ফাইন্যান্সিয়াল অ্যাডভাইজারের সাথে কথা বলুন।",
    ],
  },
};
