import { describe, expect, it } from "vitest";
import { buildIndex, makeSnippet, search, type SearchEntry } from "./engine";
import { highlightParts } from "./highlight";
import { tokenize } from "./tokenize";

const page = (
  pageUrl: string,
  pageTitle: string,
  section: SearchEntry["section"] = "learn",
): Omit<SearchEntry, "url" | "kind" | "text"> => ({
  pageUrl,
  pageTitle,
  section,
});

const entries: SearchEntry[] = [
  {
    ...page("/bn/learn/risk", "Risk Management"),
    url: "/bn/learn/risk",
    kind: "page",
    text: "",
  },
  {
    ...page("/bn/learn/risk", "Risk Management"),
    url: "/bn/learn/risk#stop",
    kind: "heading",
    text: "Stop Loss",
  },
  {
    ...page("/bn/learn/risk", "Risk Management"),
    url: "/bn/learn/risk#stop",
    kind: "text",
    heading: "Stop Loss",
    text: "প্রতিটি ট্রেডে ঝুঁকির পরিমাণ আগে ঠিক করুন।",
  },
  {
    ...page("/bn/patterns/hammer", "Hammer", "patterns"),
    url: "/bn/patterns/hammer",
    kind: "page",
    text: "Bullish reversal candle",
  },
  {
    ...page("/bn/patterns/hammer", "Hammer", "patterns"),
    url: "/bn/patterns/hammer#entry",
    kind: "text",
    text: "Entry above the hammer high with a stop loss below the wick.",
  },
];

const index = buildIndex(entries);

describe("tokenize", () => {
  it("keeps Bangla words whole, including marks and zero-width joiners", () => {
    expect(tokenize("ঝুঁকি‌র পরিমাণ")).toEqual(["ঝুঁকির", "পরিমাণ"]);
  });

  it("lowercases and splits Latin text on punctuation", () => {
    expect(tokenize("Stop-Loss, R:R")).toEqual(["stop", "loss", "r", "r"]);
  });
});

describe("search", () => {
  it("finds Bangla text by word prefix", () => {
    const [result] = search(index, "ঝুঁকি");
    expect(result.url).toBe("/bn/learn/risk");
    expect(result.hits[0]).toMatchObject({
      url: "/bn/learn/risk#stop",
      heading: "Stop Loss",
    });
  });

  it("ranks a page title match first and returns its section", () => {
    const results = search(index, "hammer");
    expect(results[0]).toMatchObject({
      url: "/bn/patterns/hammer",
      section: "patterns",
    });
    expect(results[0].description).toBe("Bullish reversal candle");
  });

  it("requires every query token, allowing the page title to satisfy one", () => {
    expect(search(index, "hammer wick").map((r) => r.url)).toEqual([
      "/bn/patterns/hammer",
    ]);
    expect(search(index, "hammer ঝুঁকি")).toEqual([]);
  });

  it("returns nothing for blank or unknown queries and respects the limit", () => {
    expect(search(index, "   ")).toEqual([]);
    expect(search(index, "zzzz")).toEqual([]);
    expect(search(index, "stop", 1)).toHaveLength(1);
  });
});

describe("makeSnippet / highlightParts", () => {
  it("centres the snippet on the first match with ellipses", () => {
    const text = `${"a ".repeat(100)}target ${"b ".repeat(100)}`;
    const snippet = makeSnippet(text, ["target"]);
    expect(snippet.startsWith("…")).toBe(true);
    expect(snippet.endsWith("…")).toBe(true);
    expect(snippet).toContain("target");
  });

  it("marks query tokens case-insensitively", () => {
    expect(highlightParts("Stop Loss rules", "stop")).toEqual([
      { text: "Stop", isMatch: true },
      { text: " Loss rules", isMatch: false },
    ]);
  });
});
