import type { Locale } from "@/lib/dictionaries";

export interface NotesCopy {
  eyebrow: (notes: number, tags: number) => string;
  title: string;
  lead: string;
  all: string;
  searchPlaceholder: string;
  filterLabel: string;
  empty: string;
  pinned: string;
  minRead: (n: number) => string;
  englishOnly: string;
  breadcrumb: string;
  related: string;
  onPage: string;
  copyLink: string;
  linkCopied: string;
  copyFailed: string;
  addTitle: string;
  addBody: string;
  addBnHint: string;
}

const en: NotesCopy = {
  eyebrow: (n, t) => `${n} notes · ${t} tags`,
  title: "Notes",
  lead: "My own write-ups on ICT, SMC, price action, gold and psychology. Everything here is a note to myself, not advice.",
  all: "All",
  searchPlaceholder: "Search notes",
  filterLabel: "Filter by tag",
  empty: "No notes match. Try another tag or a shorter word.",
  pinned: "PINNED",
  minRead: (n) => `${n} min read`,
  englishOnly: "EN",
  breadcrumb: "Notes",
  related: "Related notes",
  onPage: "On this page",
  copyLink: "Copy link",
  linkCopied: "Link copied",
  copyFailed: "Copy failed. Copy the address from your browser bar.",
  addTitle: "Add a note",
  addBody:
    "Create a file in content/notes/ named like my-note.md. Start it with a short header and write in Markdown. It shows up here after a rebuild.",
  addBnHint:
    "For a Bangla version, add my-note.bn.md next to it. Without one, the English note is shown on the Bangla site.",
};

const bn: NotesCopy = {
  eyebrow: (n, t) => `${n}টি নোট · ${t}টি ট্যাগ`,
  title: "নোটস",
  lead: "ICT, SMC, price action, gold আর psychology নিয়ে আমার নিজের লেখা। এখানে সবকিছু নিজের জন্য নোট, কোনো পরামর্শ নয়।",
  all: "সব",
  searchPlaceholder: "নোট খুঁজুন",
  filterLabel: "ট্যাগ দিয়ে ফিল্টার",
  empty: "কোনো নোট মেলেনি। অন্য ট্যাগ বা ছোট শব্দ চেষ্টা করুন।",
  pinned: "পিন করা",
  minRead: (n) => `${n} মিনিটের পড়া`,
  englishOnly: "EN",
  breadcrumb: "নোটস",
  related: "সম্পর্কিত নোট",
  onPage: "এই পেজে",
  copyLink: "লিংক কপি",
  linkCopied: "লিংক কপি হয়েছে",
  copyFailed: "কপি হয়নি। ব্রাউজারের অ্যাড্রেস বার থেকে কপি করুন।",
  addTitle: "নোট যোগ করুন",
  addBody:
    "content/notes/ ফোল্ডারে my-note.md নামে একটি ফাইল বানান। শুরুতে ছোট একটি হেডার দিয়ে Markdown-এ লিখুন। rebuild-এর পর এখানে দেখা যাবে।",
  addBnHint:
    "বাংলা সংস্করণের জন্য পাশে my-note.bn.md যোগ করুন। না থাকলে বাংলা সাইটে ইংরেজি নোটটিই দেখানো হয়।",
};

export const notesCopy: Record<Locale, NotesCopy> = { en, bn };
