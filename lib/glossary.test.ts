import { describe, expect, it } from "vitest";
import { glossaryAnchorHash, glossaryAnchorId } from "./glossary";

describe("glossaryAnchorId", () => {
  it("turns a term into a valid, space-free id", () => {
    expect(glossaryAnchorId("1% risk rule")).toBe("term-1-risk-rule");
    expect(glossaryAnchorId("Asian / Tokyo session")).toBe(
      "term-asian-tokyo-session",
    );
  });

  it("keeps Bangla letters and vowel signs intact", () => {
    expect(glossaryAnchorId("ঝুঁকি")).toBe("term-ঝুঁকি");
  });
});

describe("glossaryAnchorHash", () => {
  it("is the URL-encoded form of the id", () => {
    expect(decodeURIComponent(glossaryAnchorHash("Ask price"))).toBe(
      glossaryAnchorId("Ask price"),
    );
  });
});
