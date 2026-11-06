import { tokenize } from "./tokenize";

export interface TextPart {
  text: string;
  isMatch: boolean;
}

const escapeRegExp = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Split `text` into plain/matched parts for every query token (prefix-style, case-insensitive). */
export function highlightParts(text: string, query: string): TextPart[] {
  const tokens = [...new Set(tokenize(query))].sort(
    (a, b) => b.length - a.length,
  );
  if (tokens.length === 0 || !text) return [{ text, isMatch: false }];

  const pattern = new RegExp(`(${tokens.map(escapeRegExp).join("|")})`, "giu");
  return text
    .split(pattern)
    .filter((part) => part.length > 0)
    .map((part) => ({
      text: part,
      isMatch: tokens.includes(part.toLowerCase()),
    }));
}
