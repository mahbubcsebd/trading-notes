import { describe, expect, it } from "vitest";
import {
  computeStats,
  parseTrades,
  rMultiple,
  toCsv,
  type Trade,
} from "./core";

const trade = (over: Partial<Trade>): Trade => ({
  id: "t",
  date: "2026-01-05",
  pair: "XAUUSD",
  direction: "long",
  setup: "Order block",
  session: "London",
  entry: 100,
  stop: 98,
  exit: 104,
  checklist: [],
  followedPlan: true,
  emotion: "Calm",
  mistake: "None",
  notes: "",
  ...over,
});

describe("rMultiple", () => {
  it("measures a winning long in R", () => {
    expect(rMultiple(trade({}))).toBe(2);
  });

  it("measures a winning short in R", () => {
    expect(
      rMultiple(trade({ direction: "short", entry: 100, stop: 102, exit: 96 })),
    ).toBe(2);
  });

  it("returns null when the stop is on the wrong side", () => {
    expect(rMultiple(trade({ stop: 101 }))).toBeNull();
  });
});

describe("computeStats", () => {
  it("groups closed trades by month, newest first", () => {
    const stats = computeStats([
      trade({ id: "a", date: "2026-01-05" }),
      trade({ id: "b", date: "2026-02-03", exit: 97 }),
    ]);
    expect(stats.byMonth.map((g) => g.key)).toEqual(["2026-02", "2026-01"]);
    expect(stats.byMonth[0].totalR).toBe(-1.5);
  });
});

describe("noteSlug", () => {
  it("survives an import round trip and lands in the CSV", () => {
    const [parsed] = parseTrades([trade({ noteSlug: "fair-value-gap" })]);
    expect(parsed.noteSlug).toBe("fair-value-gap");
    expect(toCsv([parsed])).toContain("fair-value-gap");
  });

  it("drops an empty noteSlug", () => {
    const [parsed] = parseTrades([trade({ noteSlug: "" })]);
    expect(parsed.noteSlug).toBeUndefined();
  });
});
