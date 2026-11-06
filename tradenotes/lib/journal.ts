/** Pure journal logic: types, R maths, stats, demo data, CSV. No browser APIs, safe anywhere. */

export type Direction = "long" | "short";

export type Trade = {
  id: string;
  date: string; // yyyy-mm-dd
  pair: string;
  direction: Direction;
  setup: string;
  session: string;
  entry: number;
  stop: number;
  exit: number;
  checklist: string[]; // ids from CHECKLIST that were ticked
  followedPlan: boolean;
  emotion: string;
  mistake: string;
  notes: string;
};

export const PAIRS = ["XAUUSD", "EURUSD", "GBPUSD", "USDJPY", "GBPJPY", "BTCUSD"];
export const SETUPS = ["Order block", "Fair value gap", "Liquidity sweep", "MSS retest", "Breakout retest", "Other"];
export const SESSIONS = ["Asian", "London", "New York", "Overlap"];
export const EMOTIONS = ["Calm", "Confident", "Anxious", "FOMO", "Revenge", "Bored"];
export const MISTAKES = ["None", "Moved stop", "Early exit", "Late entry", "No confirmation", "Oversized", "Off-plan trade"];

export const CHECKLIST = [
  { id: "htf", label: "Higher timeframe bias agrees" },
  { id: "liq", label: "Liquidity was taken" },
  { id: "poi", label: "Entry at a marked zone (OB / FVG)" },
  { id: "mss", label: "Lower timeframe confirmation" },
  { id: "sl", label: "Stop placed, risk 1% or less" },
  { id: "rr", label: "Reward is at least 2R" },
  { id: "win", label: "Inside my trading window" },
];

/** Result in R. Returns null when the stop is on the wrong side or equals entry. */
export function rMultiple(t: Pick<Trade, "direction" | "entry" | "stop" | "exit">): number | null {
  const risk = t.direction === "long" ? t.entry - t.stop : t.stop - t.entry;
  if (!(risk > 0)) return null;
  const move = t.direction === "long" ? t.exit - t.entry : t.entry - t.exit;
  return move / risk;
}

export type Closed = Trade & { r: number };

export function closed(trades: Trade[]): Closed[] {
  return trades
    .map((t) => ({ t, r: rMultiple(t) }))
    .filter((x): x is { t: Trade; r: number } => x.r !== null)
    .map((x) => ({ ...x.t, r: x.r }))
    .sort((a, b) => a.date.localeCompare(b.date) || a.id.localeCompare(b.id));
}

export type Group = { key: string; trades: number; winRate: number; totalR: number; avgR: number };

export type Stats = {
  count: number;
  wins: number;
  losses: number;
  winRate: number;
  totalR: number;
  avgR: number;
  avgWin: number;
  avgLoss: number;
  profitFactor: number | null;
  expectancy: number;
  best: number;
  worst: number;
  maxDrawdown: number;
  streak: { type: "win" | "loss" | "none"; n: number };
  curve: { date: string; r: number; cum: number }[];
  bySetup: Group[];
  byPair: Group[];
  bySession: Group[];
  byMistake: Group[];
  planFollowed: { followed: Group; broke: Group };
  avgChecklist: number;
};

const sum = (a: number[]) => a.reduce((x, y) => x + y, 0);

function group(key: string, list: Closed[]): Group {
  const total = sum(list.map((t) => t.r));
  return { key, trades: list.length, winRate: list.length ? list.filter((t) => t.r > 0).length / list.length : 0, totalR: total, avgR: list.length ? total / list.length : 0 };
}

function groupBy(list: Closed[], pick: (t: Closed) => string): Group[] {
  const map = new Map<string, Closed[]>();
  for (const t of list) {
    const k = pick(t) || "Unspecified";
    map.set(k, [...(map.get(k) ?? []), t]);
  }
  return [...map.entries()].map(([k, v]) => group(k, v)).sort((a, b) => b.totalR - a.totalR);
}

export function computeStats(trades: Trade[]): Stats {
  const list = closed(trades);
  const wins = list.filter((t) => t.r > 0);
  const losses = list.filter((t) => t.r < 0);
  const grossWin = sum(wins.map((t) => t.r));
  const grossLoss = Math.abs(sum(losses.map((t) => t.r)));
  let cum = 0;
  let peak = 0;
  let maxDd = 0;
  const curve = list.map((t) => {
    cum += t.r;
    peak = Math.max(peak, cum);
    maxDd = Math.max(maxDd, peak - cum);
    return { date: t.date, r: t.r, cum };
  });
  let streak: Stats["streak"] = { type: "none", n: 0 };
  for (let i = list.length - 1; i >= 0; i--) {
    const type = list[i].r > 0 ? "win" : list[i].r < 0 ? "loss" : "none";
    if (type === "none") break;
    if (streak.type === "none") streak = { type, n: 1 };
    else if (streak.type === type) streak.n++;
    else break;
  }
  return {
    count: list.length,
    wins: wins.length,
    losses: losses.length,
    winRate: list.length ? wins.length / list.length : 0,
    totalR: cum,
    avgR: list.length ? cum / list.length : 0,
    avgWin: wins.length ? grossWin / wins.length : 0,
    avgLoss: losses.length ? -grossLoss / losses.length : 0,
    profitFactor: grossLoss > 0 ? grossWin / grossLoss : null,
    expectancy: list.length ? cum / list.length : 0,
    best: list.length ? Math.max(...list.map((t) => t.r)) : 0,
    worst: list.length ? Math.min(...list.map((t) => t.r)) : 0,
    maxDrawdown: maxDd,
    streak,
    curve,
    bySetup: groupBy(list, (t) => t.setup),
    byPair: groupBy(list, (t) => t.pair),
    bySession: groupBy(list, (t) => t.session),
    byMistake: groupBy(list, (t) => t.mistake),
    planFollowed: { followed: group("Followed plan", list.filter((t) => t.followedPlan)), broke: group("Broke plan", list.filter((t) => !t.followedPlan)) },
    avgChecklist: list.length ? sum(list.map((t) => t.checklist.length)) / list.length : 0,
  };
}

export const fmtR = (n: number, d = 2) => `${n > 0 ? "+" : ""}${n.toFixed(d)}R`;
export const fmtPct = (n: number) => `${Math.round(n * 100)}%`;

export function newId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

/** Deterministic sample trades so the demo has something to show. */
export function demoTrades(): Trade[] {
  let seed = 7;
  const rnd = () => ((seed = (seed * 1664525 + 1013904223) % 4294967296) / 4294967296);
  const out: Trade[] = [];
  const start = new Date("2026-09-14T00:00:00Z").getTime();
  for (let i = 0; i < 28; i++) {
    const day = new Date(start + Math.floor(i * 1.6) * 86400000);
    if (day.getUTCDay() === 0 || day.getUTCDay() === 6) day.setUTCDate(day.getUTCDate() + 2);
    const pair = i % 3 === 2 ? "EURUSD" : "XAUUSD";
    const gold = pair === "XAUUSD";
    const dir: Direction = rnd() > 0.45 ? "long" : "short";
    const base = gold ? 2350 + rnd() * 40 : 1.08 + rnd() * 0.02;
    const risk = gold ? 4 + rnd() * 3 : 0.0008 + rnd() * 0.0006;
    const win = rnd() < 0.52;
    const rWin = 1.6 + rnd() * 2;
    const r = win ? rWin : -(0.9 + rnd() * 0.12);
    const sgn = dir === "long" ? 1 : -1;
    const dp = gold ? 2 : 5;
    const followed = rnd() > 0.22;
    const ticked = CHECKLIST.filter(() => rnd() > (followed ? 0.12 : 0.5)).map((c) => c.id);
    out.push({
      id: `demo-${i}`,
      date: day.toISOString().slice(0, 10),
      pair,
      direction: dir,
      setup: SETUPS[Math.floor(rnd() * 4)],
      session: SESSIONS[Math.floor(rnd() * 4)],
      entry: +base.toFixed(dp),
      stop: +(base - sgn * risk).toFixed(dp),
      exit: +(base + sgn * risk * r).toFixed(dp),
      checklist: ticked,
      followedPlan: followed,
      emotion: followed ? EMOTIONS[Math.floor(rnd() * 3)] : EMOTIONS[3 + Math.floor(rnd() * 3)],
      mistake: followed ? "None" : MISTAKES[1 + Math.floor(rnd() * 6)],
      notes: "",
    });
  }
  return out;
}

const esc = (s: string) => `"${s.replace(/"/g, '""')}"`;

export function toCsv(trades: Trade[]): string {
  const head = ["date", "pair", "direction", "setup", "session", "entry", "stop", "exit", "R", "followed_plan", "checklist_ticked", "emotion", "mistake", "notes"];
  const rows = [...trades]
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((t) => {
      const r = rMultiple(t);
      return [t.date, t.pair, t.direction, t.setup, t.session, t.entry, t.stop, t.exit, r === null ? "" : r.toFixed(2), t.followedPlan ? "yes" : "no", t.checklist.length, t.emotion, t.mistake, t.notes].map((v) => esc(String(v))).join(",");
    });
  return [head.join(","), ...rows].join("\n");
}

/** Validate unknown JSON from an import file. */
export function parseTrades(raw: unknown): Trade[] {
  if (!Array.isArray(raw)) return [];
  const out: Trade[] = [];
  for (const x of raw) {
    if (!x || typeof x !== "object") continue;
    const o = x as Record<string, unknown>;
    const n = (v: unknown) => (typeof v === "number" && isFinite(v) ? v : NaN);
    const t: Trade = {
      id: typeof o.id === "string" ? o.id : newId(),
      date: typeof o.date === "string" ? o.date : "",
      pair: typeof o.pair === "string" ? o.pair : "",
      direction: o.direction === "short" ? "short" : "long",
      setup: typeof o.setup === "string" ? o.setup : "",
      session: typeof o.session === "string" ? o.session : "",
      entry: n(o.entry),
      stop: n(o.stop),
      exit: n(o.exit),
      checklist: Array.isArray(o.checklist) ? o.checklist.filter((c): c is string => typeof c === "string") : [],
      followedPlan: o.followedPlan !== false,
      emotion: typeof o.emotion === "string" ? o.emotion : "",
      mistake: typeof o.mistake === "string" ? o.mistake : "None",
      notes: typeof o.notes === "string" ? o.notes : "",
    };
    if (t.date && t.pair && !isNaN(t.entry) && !isNaN(t.stop) && !isNaN(t.exit)) out.push(t);
  }
  return out;
}
