import { normalize, tokenize } from "./tokenize";

export type SearchSection = "learn" | "patterns" | "glossary" | "notes";
export type EntryKind = "page" | "heading" | "text";

/** One indexable unit: a page (title + description), a heading, or a paragraph. */
export interface SearchEntry {
  pageUrl: string;
  pageTitle: string;
  section: SearchSection;
  url: string;
  kind: EntryKind;
  /** Heading the entry sits under (for context and weighting). */
  heading?: string;
  text: string;
}

export interface SearchHit {
  url: string;
  kind: EntryKind;
  heading?: string;
  snippet: string;
}

export interface SearchResult {
  url: string;
  title: string;
  section: SearchSection;
  description?: string;
  hits: SearchHit[];
}

export interface SearchIndex {
  readonly entries: readonly SearchEntry[];
  readonly entryPage: readonly number[];
  readonly pageEntry: readonly number[];
  readonly vocab: readonly string[];
  readonly titlePostings: ReadonlyMap<string, ReadonlySet<number>>;
  readonly entryPostings: ReadonlyMap<string, ReadonlyMap<number, number>>;
}

const WEIGHT_TITLE = 10;
const WEIGHT_HEADING = 4;
const WEIGHT_BODY = 1;
const PREFIX_FACTOR = 0.6;
const PHRASE_BONUS = 3;
const MAX_QUERY_TOKENS = 8;
const MAX_PREFIX_EXPANSIONS = 300;
const MAX_HITS_PER_PAGE = 3;
const SNIPPET_RADIUS = 70;
export const DEFAULT_RESULT_LIMIT = 10;

const SECTION_ORDER: Record<SearchSection, number> = {
  learn: 0,
  patterns: 1,
  glossary: 2,
  notes: 3,
};

const compare = (a: string, b: string) => (a < b ? -1 : a > b ? 1 : 0);

export function buildIndex(entries: readonly SearchEntry[]): SearchIndex {
  const pageIds = new Map<string, number>();
  const pageEntry: number[] = [];
  const entryPage = entries.map((entry, i) => {
    const known = pageIds.get(entry.pageUrl);
    if (known !== undefined) return known;
    const id = pageIds.size;
    pageIds.set(entry.pageUrl, id);
    pageEntry.push(i);
    return id;
  });

  const titlePostings = new Map<string, Set<number>>();
  const entryPostings = new Map<string, Map<number, number>>();

  entries.forEach((entry, i) => {
    if (entry.kind === "page") {
      for (const token of tokenize(entry.pageTitle)) {
        const pages = titlePostings.get(token) ?? new Set<number>();
        pages.add(entryPage[i]);
        titlePostings.set(token, pages);
      }
    }
    const weighted: [string, number][] = [
      ...tokenize(entry.heading ?? "").map((t): [string, number] => [
        t,
        WEIGHT_HEADING,
      ]),
      ...tokenize(entry.text).map((t): [string, number] => [
        t,
        entry.kind === "heading" ? WEIGHT_HEADING : WEIGHT_BODY,
      ]),
    ];
    for (const [token, weight] of weighted) {
      const docs = entryPostings.get(token) ?? new Map<number, number>();
      docs.set(i, Math.max(docs.get(i) ?? 0, weight));
      entryPostings.set(token, docs);
    }
  });

  const vocab = [
    ...new Set([...titlePostings.keys(), ...entryPostings.keys()]),
  ].sort(compare);

  return { entries, entryPage, pageEntry, vocab, titlePostings, entryPostings };
}

/** Vocabulary terms starting with `prefix` (binary search on the sorted vocab). */
function expand(vocab: readonly string[], prefix: string): string[] {
  let lo = 0;
  let hi = vocab.length;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (vocab[mid] < prefix) lo = mid + 1;
    else hi = mid;
  }
  const out: string[] = [];
  for (
    let i = lo;
    i < vocab.length && out.length < MAX_PREFIX_EXPANSIONS;
    i++
  ) {
    if (!vocab[i].startsWith(prefix)) break;
    out.push(vocab[i]);
  }
  return out;
}

interface TokenMatch {
  pages: Map<number, number>;
  entries: Map<number, number>;
}

function matchToken(index: SearchIndex, token: string): TokenMatch {
  const pages = new Map<number, number>();
  const entries = new Map<number, number>();
  for (const term of expand(index.vocab, token)) {
    const factor = term === token ? 1 : PREFIX_FACTOR;
    for (const page of index.titlePostings.get(term) ?? []) {
      pages.set(page, Math.max(pages.get(page) ?? 0, WEIGHT_TITLE * factor));
    }
    for (const [entry, weight] of index.entryPostings.get(term) ?? []) {
      entries.set(entry, Math.max(entries.get(entry) ?? 0, weight * factor));
    }
  }
  return { pages, entries };
}

export function makeSnippet(text: string, tokens: readonly string[]): string {
  const lower = text.toLowerCase();
  const positions = tokens.map((t) => lower.indexOf(t)).filter((p) => p >= 0);
  const at = positions.length ? Math.min(...positions) : 0;
  const start = Math.max(0, at - SNIPPET_RADIUS);
  const end = Math.min(text.length, at + SNIPPET_RADIUS * 2);
  const body = text.slice(start, end).trim();
  return `${start > 0 ? "…" : ""}${body}${end < text.length ? "…" : ""}`;
}

interface ScoredEntry {
  entry: number;
  total: number;
  own: number;
}

function scoreCandidates(
  index: SearchIndex,
  matches: readonly TokenMatch[],
  phrase: string,
): ScoredEntry[] {
  const candidates = new Set<number>();
  for (const m of matches) {
    for (const e of m.entries.keys()) candidates.add(e);
    for (const p of m.pages.keys()) candidates.add(index.pageEntry[p]);
  }

  const scored: ScoredEntry[] = [];
  for (const entry of candidates) {
    const page = index.entryPage[entry];
    let total = 0;
    let own = 0;
    let isMatch = true;
    for (const m of matches) {
      const ownScore = m.entries.get(entry) ?? 0;
      const best = Math.max(ownScore, m.pages.get(page) ?? 0);
      if (best === 0) {
        isMatch = false;
        break;
      }
      total += best;
      own += ownScore;
    }
    if (!isMatch) continue;
    const e = index.entries[entry];
    if (
      matches.length > 1 &&
      normalize(`${e.heading ?? ""} ${e.text}`).includes(phrase)
    ) {
      total += PHRASE_BONUS;
      own += PHRASE_BONUS;
    }
    scored.push({ entry, total, own });
  }
  return scored;
}

export function search(
  index: SearchIndex,
  query: string,
  limit: number = DEFAULT_RESULT_LIMIT,
): SearchResult[] {
  const tokens = [...new Set(tokenize(query))].slice(0, MAX_QUERY_TOKENS);
  if (tokens.length === 0) return [];

  const matches = tokens.map((t) => matchToken(index, t));
  const scored = scoreCandidates(index, matches, tokens.join(" "));

  const byPage = new Map<number, ScoredEntry[]>();
  for (const s of scored) {
    const page = index.entryPage[s.entry];
    byPage.set(page, [...(byPage.get(page) ?? []), s]);
  }

  const ranked = [...byPage.entries()].map(([page, list]) => {
    const pageEntry = index.entries[index.pageEntry[page]];
    const hits = list
      .filter((s) => s.own > 0 && index.entries[s.entry].kind !== "page")
      .sort((a, b) => b.own - a.own || a.entry - b.entry)
      .slice(0, MAX_HITS_PER_PAGE);
    const score =
      Math.max(...list.map((s) => s.total)) + Math.min(list.length, 10) * 0.05;
    return { pageEntry, hits, score };
  });

  return ranked
    .sort(
      (a, b) =>
        b.score - a.score ||
        SECTION_ORDER[a.pageEntry.section] -
          SECTION_ORDER[b.pageEntry.section] ||
        compare(a.pageEntry.pageTitle, b.pageEntry.pageTitle),
    )
    .slice(0, limit)
    .map(({ pageEntry, hits }) => ({
      url: pageEntry.pageUrl,
      title: pageEntry.pageTitle,
      section: pageEntry.section,
      description: pageEntry.text || undefined,
      hits: hits.map(({ entry }) => {
        const e = index.entries[entry];
        return {
          url: e.url,
          kind: e.kind,
          heading: e.heading,
          snippet: makeSnippet(e.text, tokens),
        };
      }),
    }));
}
