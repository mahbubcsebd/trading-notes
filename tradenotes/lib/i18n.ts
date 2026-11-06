export type Lang = "en" | "bn";

const en = {
  "nav.learn": "Learn",
  "nav.patterns": "Candlestick Patterns",
  "nav.charts": "Charts",
  "nav.glossary": "Glossary",
  "nav.risk": "Risk Calc",
  "nav.notes": "Notes",
  "nav.journal": "Journal",
  "search.placeholder": "Search...",
  "hero.tagline": "A personal learning journal for Forex and Gold trading.",
  "hero.start": "Start learning",
  "hero.risk": "Risk calculator",
  "stat.chapters": "chapters",
  "stat.lessons": "lessons",
  "stat.languages": "languages",
  "sec.start": "Where to start",
  "sec.latest": "Featured lessons",
  "sec.curriculum": "Curriculum",
  "sec.toolkit": "Toolkit",
  "sec.faq": "Common questions",
  "common.viewAll": "View all",
  "lesson.start": "Start lesson 1",
  "lesson.next": "Next",
  "lesson.prev": "Previous",
  "lesson.complete": "Mark complete",
  "lesson.completed": "Completed",
  "lesson.takeaways": "Key takeaways",
  "lesson.onPage": "On this page",
  "footer.disclaimer":
    "Educational notes only. Not financial advice. Trading involves significant risk of loss. Past performance is not indicative of future results.",
} as const;

export type Key = keyof typeof en;

const bn: Partial<Record<Key, string>> = {
  "nav.learn": "শিখুন",
  "nav.patterns": "ক্যান্ডেলস্টিক প্যাটার্ন",
  "nav.charts": "চার্ট",
  "nav.glossary": "শব্দকোষ",
  "nav.risk": "রিস্ক ক্যালক",
  "nav.notes": "নোট",
  "nav.journal": "জার্নাল",
  "search.placeholder": "খুঁজুন...",
  "hero.tagline": "ফরেক্স ও গোল্ড ট্রেডিং শেখার আমার ব্যক্তিগত জার্নাল।",
  "hero.start": "শেখা শুরু করুন",
  "hero.risk": "রিস্ক ক্যালকুলেটর",
  "stat.chapters": "অধ্যায়",
  "stat.lessons": "পাঠ",
  "stat.languages": "ভাষা",
  "sec.start": "কোথা থেকে শুরু করবেন",
  "sec.latest": "নির্বাচিত পাঠ",
  "sec.curriculum": "পাঠ্যক্রম",
  "sec.toolkit": "টুলকিট",
  "sec.faq": "সাধারণ প্রশ্ন",
  "common.viewAll": "সব দেখুন",
  "lesson.start": "প্রথম পাঠ শুরু করুন",
  "lesson.next": "পরবর্তী",
  "lesson.prev": "আগের",
  "lesson.complete": "সম্পন্ন হিসেবে চিহ্নিত করুন",
  "lesson.completed": "সম্পন্ন",
  "lesson.takeaways": "মূল কথা",
  "lesson.onPage": "এই পাতায়",
  "footer.disclaimer":
    "এগুলো শুধু শেখার নোট, আর্থিক পরামর্শ নয়। ট্রেডিংয়ে ক্ষতির ঝুঁকি অনেক বেশি। অতীতের ফল ভবিষ্যতের নিশ্চয়তা নয়।",
};

export function translate(lang: Lang, key: Key): string {
  if (lang === "bn") return bn[key] ?? en[key];
  return en[key];
}
