import fs from "node:fs";
import path from "node:path";
import { Marked } from "marked";
import type { Locale } from "@/lib/dictionaries";

/**
 * Markdown-driven notes. content/notes/<slug>.md is the English note; an optional
 * content/notes/<slug>.bn.md is its Bangla version. A note with no Bangla file is shown
 * in English on the Bangla site (flagged with `fallback`).
 *
 * Frontmatter (all optional except title):
 *   title: Order block basics
 *   date: 2026-11-06
 *   tags: [SMC, ICT]
 *   summary: One line shown in lists and search.
 *   pinned: true
 *
 * Notes are authored by the site owner, so the HTML is trusted. If notes ever come from other
 * people, sanitise the output of renderMarkdown() first.
 */

export type NoteMeta = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  summary: string;
  pinned: boolean;
  minutes: number;
  /** True when the requested language has no file and the English note is shown instead. */
  fallback: boolean;
};

export type Note = NoteMeta & {
  html: string;
  headings: { id: string; title: string }[];
};

const DIR = path.join(process.cwd(), "content", "notes");
const WORDS_PER_MINUTE = 200;
const BN_SUFFIX = ".bn.md";

function parseFile(raw: string): {
  data: Record<string, string>;
  body: string;
} {
  const m = raw
    .replace(/^﻿/, "")
    .match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return { data: {}, body: raw };
  const data: Record<string, string> = {};
  for (const line of m[1].split(/\r?\n/)) {
    const i = line.indexOf(":");
    if (i > 0) data[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  return { data, body: m[2] };
}

function parseTags(v: string | undefined): string[] {
  if (!v) return [];
  return v
    .replace(/^\[|\]$/g, "")
    .split(",")
    .map((t) => t.trim().replace(/^["']|["']$/g, ""))
    .filter(Boolean);
}

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/[^a-z0-9ঀ-৿]+/g, "-")
    .replace(/^-|-$/g, "");

function renderMarkdown(body: string) {
  const headings: { id: string; title: string }[] = [];
  const marked = new Marked({
    renderer: {
      heading({ tokens, depth }) {
        const inner = this.parser.parseInline(tokens);
        const id = slugify(inner);
        if (depth === 2)
          headings.push({ id, title: inner.replace(/<[^>]+>/g, "") });
        return `<h${depth} id="${id}">${inner}</h${depth}>\n`;
      },
    },
  });
  return { html: marked.parse(body, { async: false }) as string, headings };
}

function readNote(file: string, slug: string, fallback: boolean): Note {
  const { data, body } = parseFile(
    fs.readFileSync(path.join(DIR, file), "utf8"),
  );
  const { html, headings } = renderMarkdown(body);
  const words = body.split(/\s+/).filter(Boolean).length;
  return {
    slug,
    title: data.title || slug,
    date: data.date || "",
    tags: parseTags(data.tags),
    summary: data.summary || "",
    pinned: data.pinned === "true",
    minutes: Math.max(1, Math.round(words / WORDS_PER_MINUTE)),
    fallback,
    html,
    headings,
  };
}

const byRank = (a: Note, b: Note) =>
  Number(b.pinned) - Number(a.pinned) ||
  b.date.localeCompare(a.date) ||
  a.title.localeCompare(b.title);

function readAll(lang: Locale): Note[] {
  if (!fs.existsSync(DIR)) return [];
  const files = fs.readdirSync(DIR).filter((f) => f.endsWith(".md"));
  const slugs = files
    .filter((f) => !f.endsWith(BN_SUFFIX))
    .map((f) => f.replace(/\.md$/, ""));
  return slugs
    .map((slug) => {
      const bnFile = `${slug}${BN_SUFFIX}`;
      if (lang === "bn" && files.includes(bnFile))
        return readNote(bnFile, slug, false);
      return readNote(`${slug}.md`, slug, lang === "bn");
    })
    .sort(byRank);
}

export function getAllNotes(lang: Locale = "en"): Note[] {
  return readAll(lang);
}

export function getNoteMetas(lang: Locale = "en"): NoteMeta[] {
  return readAll(lang).map(
    ({ html: _html, headings: _headings, ...meta }) => meta,
  );
}

export function getNote(slug: string, lang: Locale = "en"): Note | undefined {
  return readAll(lang).find((n) => n.slug === slug);
}

export function getTags(lang: Locale = "en") {
  const map = new Map<string, number>();
  for (const n of readAll(lang))
    for (const t of n.tags) map.set(t, (map.get(t) ?? 0) + 1);
  return [...map.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

export function relatedNotes(
  slug: string,
  lang: Locale = "en",
  limit = 3,
): NoteMeta[] {
  const all = getNoteMetas(lang);
  const me = all.find((n) => n.slug === slug);
  if (!me) return [];
  return all
    .filter((n) => n.slug !== slug)
    .map((n) => ({
      n,
      score: n.tags.filter((t) => me.tags.includes(t)).length,
    }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.n);
}

export const fmtDate = (d: string, lang: Locale = "en") =>
  d
    ? new Date(`${d}T00:00:00Z`).toLocaleDateString(
        lang === "bn" ? "bn-BD" : "en-GB",
        { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" },
      )
    : "";
