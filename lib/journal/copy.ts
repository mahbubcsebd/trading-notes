import type { Locale } from "@/lib/dictionaries";

/** UI strings for the journal. Trading terms (R, Win rate, Expectancy...) stay in English in Bangla. */
export interface JournalCopy {
  eyebrow: string;
  title: string;
  lead: string;
  addTrade: string;
  closeForm: string;
  loadDemo: string;
  demoNotice: string;
  exportJson: string;
  exportCsv: string;
  importJson: string;
  clearAll: string;
  confirmClear: string;
  cleared: string;
  importNone: string;
  importBad: string;
  imported: (n: number) => string;
  emptyTitle: string;
  emptyBody: string;
  stats: {
    total: string;
    closed: (n: number) => string;
    winRate: string;
    winsLosses: (w: number, l: number) => string;
    expectancy: string;
    avgRPerTrade: string;
    profitFactor: string;
    profitFactorHint: string;
    avgWin: string;
    avgLoss: string;
    maxDrawdown: string;
    peakToTrough: string;
    streak: string;
    bestWorst: (b: string, w: string) => string;
  };
  skipped: (n: number) => string;
  equity: string;
  equityEmpty: string;
  discipline: string;
  disciplineLead: string;
  followed: string;
  broke: string;
  disciplineLine: (n: number, win: string, avg: string) => string;
  checklistAvg: (avg: string, total: number) => string;
  breakdown: {
    mistake: string;
    setup: string;
    session: string;
    pair: string;
    month: string;
    noData: string;
    trades: string;
    win: string;
    total: string;
  };
  log: {
    title: string;
    cols: string[];
    offPlan: string;
    edit: string;
    remove: string;
    all: string;
    filterPair: string;
    filterResult: string;
    wins: string;
    losses: string;
    offPlanOnly: string;
    none: string;
    linkedNote: string;
  };
  form: {
    date: string;
    pair: string;
    direction: string;
    long: string;
    short: string;
    session: string;
    setup: string;
    entry: string;
    stop: string;
    exit: string;
    result: string;
    checklist: string;
    emotion: string;
    mistake: string;
    plan: string;
    notes: string;
    notesPlaceholder: string;
    linkNote: string;
    noNote: string;
    save: string;
    add: string;
    cancel: string;
    errMissing: string;
    errLong: string;
    errShort: string;
  };
  linked: { title: string; none: string; open: string };
}

const en: JournalCopy = {
  eyebrow: "Trade journal",
  title: "Journal",
  lead: "Log each trade, tick the checklist, and let the numbers show what is working. Results are measured in R, so lot size does not matter. Data stays in this browser; export it any time.",
  addTrade: "Add trade",
  closeForm: "Close form",
  loadDemo: "Load demo data",
  demoNotice:
    "You are looking at demo trades. Your first real trade replaces them, or clear the journal to start empty.",
  exportJson: "Export JSON",
  exportCsv: "Export CSV",
  importJson: "Import JSON",
  clearAll: "Clear all",
  confirmClear: "Delete all trades from this browser?",
  cleared: "Journal cleared.",
  importNone: "No valid trades found in that file.",
  importBad: "That file is not valid JSON.",
  imported: (n) => `Imported ${n} trades.`,
  emptyTitle: "Your journal is empty",
  emptyBody:
    "Add your first trade, or load demo data to see how the stats, equity curve and breakdowns look.",
  stats: {
    total: "Total",
    closed: (n) => `${n} closed trades`,
    winRate: "Win rate",
    winsLosses: (w, l) => `${w} wins · ${l} losses`,
    expectancy: "Expectancy",
    avgRPerTrade: "Average R per trade",
    profitFactor: "Profit factor",
    profitFactorHint: "Gross win ÷ gross loss",
    avgWin: "Avg win",
    avgLoss: "Avg loss",
    maxDrawdown: "Max drawdown",
    peakToTrough: "Peak to trough",
    streak: "Current streak",
    bestWorst: (b, w) => `Best ${b} · Worst ${w}`,
  },
  skipped: (n) =>
    `${n} trade(s) have a stop on the wrong side of entry and are left out of the stats. Edit them to fix.`,
  equity: "Equity curve (R)",
  equityEmpty: "Log at least two closed trades to see your curve.",
  discipline: "Plan discipline",
  disciplineLead:
    "Do the trades where you followed your plan actually do better?",
  followed: "Followed plan",
  broke: "Broke plan",
  disciplineLine: (n, win, avg) => `${n} trades · ${win} win · avg ${avg}`,
  checklistAvg: (avg, total) => `Average checklist score: ${avg} of ${total}`,
  breakdown: {
    mistake: "By mistake",
    setup: "By setup",
    session: "By session",
    pair: "By pair",
    month: "By month",
    noData: "No data yet.",
    trades: "Trades",
    win: "Win",
    total: "Total",
  },
  log: {
    title: "Trade log",
    cols: [
      "Date",
      "Pair",
      "Side",
      "Setup",
      "Session",
      "Checklist",
      "Result",
      "",
    ],
    offPlan: "off-plan",
    edit: "Edit",
    remove: "Delete",
    all: "All",
    filterPair: "Pair",
    filterResult: "Result",
    wins: "Wins",
    losses: "Losses",
    offPlanOnly: "Off-plan",
    none: "No trades match this filter.",
    linkedNote: "Note",
  },
  form: {
    date: "Date",
    pair: "Pair",
    direction: "Direction",
    long: "long",
    short: "short",
    session: "Session",
    setup: "Setup",
    entry: "Entry",
    stop: "Stop loss",
    exit: "Exit",
    result: "Result",
    checklist: "Pre-trade checklist",
    emotion: "Emotion",
    mistake: "Mistake",
    plan: "I followed my plan",
    notes: "Notes",
    notesPlaceholder: "What did you see? What would you change?",
    linkNote: "Linked note",
    noNote: "None",
    save: "Save changes",
    add: "Add trade",
    cancel: "Cancel",
    errMissing: "Enter entry, stop and exit.",
    errLong: "For a long, the stop must be below entry.",
    errShort: "For a short, the stop must be above entry.",
  },
  linked: {
    title: "Trades linked to this note",
    none: "No trades linked yet. Pick this note in the journal's trade form.",
    open: "Open journal",
  },
};

const bn: JournalCopy = {
  eyebrow: "Trade journal",
  title: "জার্নাল",
  lead: "প্রতিটি trade লগ করুন, checklist টিক দিন, আর সংখ্যাই দেখিয়ে দিক কোনটা কাজ করছে। ফলাফল মাপা হয় R-এ, তাই lot size কোনো ব্যাপার না। ডেটা এই ব্রাউজারেই থাকে; যেকোনো সময় export করতে পারবেন।",
  addTrade: "Trade যোগ করুন",
  closeForm: "ফর্ম বন্ধ করুন",
  loadDemo: "ডেমো ডেটা লোড করুন",
  demoNotice:
    "এগুলো demo trade। আপনার প্রথম আসল trade যোগ করলেই এগুলো সরে যাবে, অথবা journal clear করে খালি থেকে শুরু করুন।",
  exportJson: "JSON export",
  exportCsv: "CSV export",
  importJson: "JSON import",
  clearAll: "সব মুছুন",
  confirmClear: "এই ব্রাউজার থেকে সব trade মুছে ফেলবেন?",
  cleared: "জার্নাল খালি করা হয়েছে।",
  importNone: "ওই ফাইলে কোনো সঠিক trade পাওয়া যায়নি।",
  importBad: "ফাইলটি সঠিক JSON নয়।",
  imported: (n) => `${n}টি trade import হয়েছে।`,
  emptyTitle: "আপনার জার্নাল খালি",
  emptyBody:
    "প্রথম trade যোগ করুন, অথবা ডেমো ডেটা লোড করে দেখুন stats, equity curve আর breakdown কেমন দেখায়।",
  stats: {
    total: "Total",
    closed: (n) => `${n}টি closed trade`,
    winRate: "Win rate",
    winsLosses: (w, l) => `${w} win · ${l} loss`,
    expectancy: "Expectancy",
    avgRPerTrade: "প্রতি trade-এ গড় R",
    profitFactor: "Profit factor",
    profitFactorHint: "Gross win ÷ gross loss",
    avgWin: "Avg win",
    avgLoss: "Avg loss",
    maxDrawdown: "Max drawdown",
    peakToTrough: "Peak থেকে trough",
    streak: "বর্তমান streak",
    bestWorst: (b, w) => `Best ${b} · Worst ${w}`,
  },
  skipped: (n) =>
    `${n}টি trade-এর stop entry-র ভুল দিকে, তাই stats-এ ধরা হয়নি। ঠিক করতে edit করুন।`,
  equity: "Equity curve (R)",
  equityEmpty: "Curve দেখতে অন্তত দুটি closed trade লগ করুন।",
  discipline: "Plan discipline",
  disciplineLead: "Plan মেনে করা trade-গুলো কি সত্যিই ভালো করছে?",
  followed: "Plan মেনেছি",
  broke: "Plan ভেঙেছি",
  disciplineLine: (n, win, avg) => `${n}টি trade · ${win} win · avg ${avg}`,
  checklistAvg: (avg, total) => `গড় checklist স্কোর: ${total}-এর মধ্যে ${avg}`,
  breakdown: {
    mistake: "Mistake অনুযায়ী",
    setup: "Setup অনুযায়ী",
    session: "Session অনুযায়ী",
    pair: "Pair অনুযায়ী",
    month: "মাস অনুযায়ী",
    noData: "এখনো কোনো ডেটা নেই।",
    trades: "Trades",
    win: "Win",
    total: "Total",
  },
  log: {
    title: "Trade log",
    cols: [
      "তারিখ",
      "Pair",
      "Side",
      "Setup",
      "Session",
      "Checklist",
      "Result",
      "",
    ],
    offPlan: "off-plan",
    edit: "Edit",
    remove: "মুছুন",
    all: "সব",
    filterPair: "Pair",
    filterResult: "Result",
    wins: "Win",
    losses: "Loss",
    offPlanOnly: "Off-plan",
    none: "এই ফিল্টারে কোনো trade মেলেনি।",
    linkedNote: "নোট",
  },
  form: {
    date: "তারিখ",
    pair: "Pair",
    direction: "Direction",
    long: "long",
    short: "short",
    session: "Session",
    setup: "Setup",
    entry: "Entry",
    stop: "Stop loss",
    exit: "Exit",
    result: "Result",
    checklist: "Pre-trade checklist",
    emotion: "Emotion",
    mistake: "Mistake",
    plan: "আমি আমার plan মেনেছি",
    notes: "নোট",
    notesPlaceholder: "কী দেখলেন? কী বদলাতেন?",
    linkNote: "সংযুক্ত নোট",
    noNote: "কোনোটি নয়",
    save: "পরিবর্তন সেভ করুন",
    add: "Trade যোগ করুন",
    cancel: "বাতিল",
    errMissing: "Entry, stop আর exit দিন।",
    errLong: "Long-এর ক্ষেত্রে stop অবশ্যই entry-র নিচে হতে হবে।",
    errShort: "Short-এর ক্ষেত্রে stop অবশ্যই entry-র উপরে হতে হবে।",
  },
  linked: {
    title: "এই নোটের সাথে যুক্ত trade",
    none: "এখনো কোনো trade যুক্ত নেই। জার্নালের trade ফর্মে এই নোটটি বেছে নিন।",
    open: "জার্নাল খুলুন",
  },
};

export const journalCopy: Record<Locale, JournalCopy> = { en, bn };
