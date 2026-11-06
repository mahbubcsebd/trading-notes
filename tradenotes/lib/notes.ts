import fs from "node:fs";
import path from "node:path";
import { Marked } from "marked";

/**
 * Markdown-driven notes. Every file in content/notes/*.md becomes a page at /notes/<filename>.
 *
 * Frontmatter (all optional except title):
 *   title: Order block basics
 *   date: 2026-11-06
 *   tags: [SMC, ICT]
 *   summary: One line shown in lists and search.
 *   pinned: true
 *
 * Notes are authored by you, so the HTML is trusted. If you ever accept notes from other people,
 * sanitise the output of renderNote() first.
 */

export type NoteMeta = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  summary: string;
  pinned: boolean;
  minutes: number;
};

export type Note = NoteMeta & { html: string; headings: { id: string; title: string }[] };

const DIR = path.join(process.cwd(), "content", "notes");

function parseFile(raw: string): { data: Record<string, string>; body: string } {
  const m = raw.replace(/^﻿/, "").match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
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

function readAll(): Note[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const { data, body } = parseFile(fs.readFileSync(path.join(DIR, file), "utf8"));
      const headings: { id: string; title: string }[] = [];
      const marked = new Marked({
        renderer: {
          heading({ tokens, depth }) {
            const inner = this.parser.parseInline(tokens);
            const id = slugify(inner);
            if (depth === 2) headings.push({ id, title: inner.replace(/<[^>]+>/g, "") });
            return `<h${depth} id="${id}">${inner}</h${depth}>\n`;
          },
        },
      });
      const html = marked.parse(body, { async: false }) as string;
      const words = body.split(/\s+/).filter(Boolean).length;
      return {
        slug,
        title: data.title || slug,
        date: data.date || "",
        tags: parseTags(data.tags),
        summary: data.summary || "",
        pinned: data.pinned === "true",
        minutes: Math.max(1, Math.round(words / 200)),
        html,
        headings,
      };
    })
    .sort((a, b) => Number(b.pinned) - Number(a.pinned) || b.date.localeCompare(a.date) || a.title.localeCompare(b.title));
}

export function getAllNotes(): Note[] {
  return readAll();
}

export function getNoteMetas(): NoteMeta[] {
  return readAll().map(({ html: _h, headings: _hd, ...meta }) => meta);
}

export function getNote(slug: string): Note | undefined {
  return readAll().find((n) => n.slug === slug);
}

export function getTags(): { tag: string; count: number }[] {
  const map = new Map<string, number>();
  for (const n of readAll()) for (const t of n.tags) map.set(t, (map.get(t) ?? 0) + 1);
  return [...map.entries()].map(([tag, count]) => ({ tag, count })).sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

export function relatedNotes(slug: string, limit = 3): NoteMeta[] {
  const all = getNoteMetas();
  const me = all.find((n) => n.slug === slug);
  if (!me) return [];
  return all
    .filter((n) => n.slug !== slug)
    .map((n) => ({ n, score: n.tags.filter((t) => me.tags.includes(t)).length }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.n);
}

export const fmtDate = (d: string) =>
  d ? new Date(d + "T00:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }) : "";
