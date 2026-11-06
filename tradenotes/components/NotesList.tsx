"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { NoteMeta } from "@/lib/notes";

const fmt = (d: string) =>
  d ? new Date(d + "T00:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }) : "";

export function NotesList({ notes, tags, initialTag = "all" }: { notes: NoteMeta[]; tags: { tag: string; count: number }[]; initialTag?: string }) {
  const [tag, setTag] = useState(initialTag);
  const [q, setQ] = useState("");

  const rows = useMemo(() => {
    const term = q.trim().toLowerCase();
    return notes.filter(
      (n) =>
        (tag === "all" || n.tags.includes(tag)) &&
        (!term || n.title.toLowerCase().includes(term) || n.summary.toLowerCase().includes(term) || n.tags.some((t) => t.toLowerCase().includes(term))),
    );
  }, [notes, tag, q]);

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center gap-2.5">
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by tag">
          <button type="button" className="chip" aria-pressed={tag === "all"} onClick={() => setTag("all")}>
            All <span className="text-mute">{notes.length}</span>
          </button>
          {tags.map((t) => (
            <button key={t.tag} type="button" className="chip" aria-pressed={tag === t.tag} onClick={() => setTag(t.tag)}>
              {t.tag} <span className="text-mute">{t.count}</span>
            </button>
          ))}
        </div>
        <input
          className="h-[34px] w-52 max-w-full rounded-full border border-line bg-bg2 px-3.5 text-[13px] outline-none placeholder:text-mute focus:border-gold"
          type="search"
          placeholder="Search notes"
          aria-label="Search notes"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      <ul className="grid border-t border-line">
        {rows.length === 0 && <li className="border-b border-line px-1 py-7 text-mute">No notes match. Try another tag or a shorter word.</li>}
        {rows.map((n) => (
          <li key={n.slug}>
            <Link href={`/notes/${n.slug}`} className="group grid gap-1.5 border-b border-line px-1 py-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-x-8">
              <div>
                <h2 className="text-[22px] leading-snug transition-colors group-hover:text-gold">
                  {n.pinned && <span className="mr-2 font-mono text-xs text-gold">PINNED</span>}
                  {n.title}
                </h2>
                {n.summary && <p className="mt-1.5 text-fg2">{n.summary}</p>}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {n.tags.map((t) => (
                    <span key={t} className="pill pill-gold">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="font-mono text-xs tabular-nums text-mute sm:text-right">
                <div>{fmt(n.date)}</div>
                <div className="mt-1">{n.minutes} min read</div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
