"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { NoteMeta } from "@/lib/notes";
import { notesCopy } from "@/lib/notes-copy";
import type { Locale } from "@/lib/dictionaries";

interface NotesListProps {
  notes: NoteMeta[];
  tags: { tag: string; count: number }[];
  lang: Locale;
  /** Dates are pre-formatted on the server so the client needs no locale logic. */
  dates: Record<string, string>;
}

export function NotesList({
  notes,
  tags,
  lang,
  dates,
}: NotesListProps) {
  const copy = notesCopy[lang];
  const [tag, setTag] = useState("all");
  const [q, setQ] = useState("");

  // Page is prerendered statically, so the ?tag= deep link is applied after mount.
  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get("tag");
    if (fromUrl && tags.some((t) => t.tag === fromUrl)) setTag(fromUrl);
  }, [tags]);

  const rows = useMemo(() => {
    const term = q.trim().toLowerCase();
    return notes.filter(
      (n) =>
        (tag === "all" || n.tags.includes(tag)) &&
        (!term ||
          n.title.toLowerCase().includes(term) ||
          n.summary.toLowerCase().includes(term) ||
          n.tags.some((t) => t.toLowerCase().includes(term))),
    );
  }, [notes, tag, q]);

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center gap-2.5">
        <div
          className="flex flex-wrap gap-1.5"
          role="group"
          aria-label={copy.filterLabel}
        >
          <button
            type="button"
            className="chip"
            aria-pressed={tag === "all"}
            onClick={() => setTag("all")}
          >
            {copy.all} <span className="text-mute">{notes.length}</span>
          </button>
          {tags.map((t) => (
            <button
              key={t.tag}
              type="button"
              className="chip"
              aria-pressed={tag === t.tag}
              onClick={() => setTag(t.tag)}
            >
              {t.tag} <span className="text-mute">{t.count}</span>
            </button>
          ))}
        </div>
        <input
          className="border-line bg-bg2 placeholder:text-mute focus:border-gold h-[34px] w-52 max-w-full rounded-full border px-3.5 text-[13px] outline-none"
          type="search"
          placeholder={copy.searchPlaceholder}
          aria-label={copy.searchPlaceholder}
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      <ul className="border-line grid border-t">
        {rows.length === 0 && (
          <li className="border-line text-mute border-b px-1 py-7">
            {copy.empty}
          </li>
        )}
        {rows.map((n) => (
          <li key={n.slug}>
            <Link
              href={`/${lang}/notes/${n.slug}`}
              className="group border-line grid gap-1.5 border-b px-1 py-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-x-8"
            >
              <div>
                <h2 className="group-hover:text-gold text-[22px] leading-snug transition-colors">
                  {n.pinned && (
                    <span className="text-gold mr-2 font-mono text-xs">
                      {copy.pinned}
                    </span>
                  )}
                  {n.title}
                  {n.fallback && (
                    <span className="pill ml-2 align-middle">
                      {copy.englishOnly}
                    </span>
                  )}
                </h2>
                {n.summary && <p className="text-fg2 mt-1.5">{n.summary}</p>}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {n.tags.map((t) => (
                    <span key={t} className="pill pill-gold">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-mute font-mono text-xs tabular-nums sm:text-right">
                <div>{dates[n.slug]}</div>
                <div className="mt-1">{copy.minRead(n.minutes)}</div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
