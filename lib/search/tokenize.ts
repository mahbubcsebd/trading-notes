// Unicode-aware tokenizer. Works for Bangla (letters + combining marks like
// hasanta/matra/chandrabindu) and Latin alike. Default Orama tokenizer drops
// non-Latin scripts, which made every Bangla query return nothing.

// Zero-width joiner / non-joiner appear inside Bangla conjuncts; they are not
// letters, so they would split one word into two if left in place.
const ZERO_WIDTH = /[​-‍⁠﻿]/g;
const TOKEN = /[\p{L}\p{M}\p{N}]+/gu;

export function normalize(text: string): string {
  return text.normalize("NFC").replace(ZERO_WIDTH, "").toLowerCase();
}

export function tokenize(text: string): string[] {
  return normalize(text).match(TOKEN) ?? [];
}
