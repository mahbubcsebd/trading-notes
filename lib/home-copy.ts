import type { Locale } from "@/lib/dictionaries";

/** Copy for the home sections below the curriculum (workspace, about, FAQ). */
export interface HomeExtraCopy {
  workspaceEyebrow: string;
  workspaceTitle: string;
  latestNotes: string;
  allNotes: string;
  journalEyebrow: string;
  journalTitle: string;
  journalDesc: string;
  openJournal: string;
  aboutEyebrow: string;
  aboutTitle: string;
  aboutP1: string;
  aboutP2: string;
  readMore: string;
  faqEyebrow: string;
  faqTitle: string;
  faqs: { q: string; a: string }[];
}

export const homeExtraCopy: Record<Locale, HomeExtraCopy> = {
  en: {
    workspaceEyebrow: "Your workspace",
    workspaceTitle: "Notes and journal",
    latestNotes: "Latest notes",
    allNotes: "All notes",
    journalEyebrow: "Trade journal",
    journalTitle: "Log trades, measure in R",
    journalDesc:
      "Checklist, win rate, drawdown, equity curve and plan discipline. Stored in your browser, exportable any time.",
    openJournal: "Open journal",
    aboutEyebrow: "About",
    aboutTitle: "Notes from someone still learning",
    aboutP1:
      "TradeNotes is the journal I wish I had when I started: short lessons, chart examples, and the mistakes written down next to the rules.",
    aboutP2:
      "It covers Forex and Gold, in English and Bengali. Nothing here is a signal or a recommendation.",
    readMore: "Read more",
    faqEyebrow: "FAQ",
    faqTitle: "Questions",
    faqs: [
      {
        q: "Is this financial advice?",
        a: "No. These are educational notes. Trading involves a significant risk of loss, and past performance does not indicate future results.",
      },
      {
        q: "Do I need any experience?",
        a: "No. The first chapters start from how the market works and build up to reading structure and key levels.",
      },
      {
        q: "Are the charts real?",
        a: "The charts on this site are synthetic examples, marked as such, built to show an idea. They are not recommendations.",
      },
      {
        q: "Which languages are available?",
        a: "English and Bengali. Use the language switch in the header. The glossary shows both languages side by side.",
      },
    ],
  },
  bn: {
    workspaceEyebrow: "আপনার ওয়ার্কস্পেস",
    workspaceTitle: "নোটস ও জার্নাল",
    latestNotes: "সর্বশেষ নোট",
    allNotes: "সব নোট",
    journalEyebrow: "Trade journal",
    journalTitle: "Trade লগ করুন, R-এ মাপুন",
    journalDesc:
      "Checklist, win rate, drawdown, equity curve আর plan discipline। ডেটা থাকে আপনার ব্রাউজারে, যেকোনো সময় export করা যায়।",
    openJournal: "জার্নাল খুলুন",
    aboutEyebrow: "পরিচিতি",
    aboutTitle: "যে এখনো শিখছে, তার নোট",
    aboutP1:
      "শুরুতে আমার যে জার্নালটা দরকার ছিল, TradeNotes সেটাই: ছোট লেসন, চার্টের উদাহরণ, আর নিয়মের পাশে লিখে রাখা ভুলগুলো।",
    aboutP2:
      "এখানে Forex আর Gold নিয়ে ইংরেজি ও বাংলায় লেখা আছে। এখানকার কোনো কিছুই signal বা সুপারিশ নয়।",
    readMore: "আরও পড়ুন",
    faqEyebrow: "FAQ",
    faqTitle: "প্রশ্নোত্তর",
    faqs: [
      {
        q: "এটা কি financial advice?",
        a: "না। এগুলো শিক্ষামূলক নোট। trading-এ বড় ক্ষতির ঝুঁকি আছে, আর অতীতের ফলাফল ভবিষ্যতের নিশ্চয়তা দেয় না।",
      },
      {
        q: "আমার কি আগে অভিজ্ঞতা লাগবে?",
        a: "না। প্রথম চ্যাপ্টারগুলো শুরু হয় বাজার কীভাবে কাজ করে সেখান থেকে, তারপর structure আর key level পড়া পর্যন্ত যায়।",
      },
      {
        q: "চার্টগুলো কি আসল?",
        a: "এই সাইটের চার্টগুলো synthetic উদাহরণ, সেভাবেই চিহ্নিত করা, একটি ধারণা বোঝানোর জন্য বানানো। এগুলো কোনো সুপারিশ নয়।",
      },
      {
        q: "কোন কোন ভাষা আছে?",
        a: "ইংরেজি ও বাংলা। হেডারের language switch ব্যবহার করুন। শব্দকোষে দুই ভাষা পাশাপাশি দেখানো হয়।",
      },
    ],
  },
};
