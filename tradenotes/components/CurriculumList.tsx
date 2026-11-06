"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { chapters, groups, pad } from "@/lib/curriculum";
import { lessonId } from "@/lib/lesson-id";
import { useProgress } from "@/lib/progress";
import type { Group } from "@/lib/types";

export function CurriculumList({ initialGroup = "all" }: { initialGroup?: Group | "all" }) {
  const [group, setGroup] = useState<Group | "all">(initialGroup);
  const [q, setQ] = useState("");
  const { done } = useProgress();

  const rows = useMemo(() => {
    const term = q.trim().toLowerCase();
    return chapters.filter(
      (c) =>
        (group === "all" || c.group === group) &&
        (!term || c.title.toLowerCase().includes(term) || c.lessons.some((l) => l.title.toLowerCase().includes(term))),
    );
  }, [group, q]);

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center gap-2.5">
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter chapters">
          <button type="button" className="chip" aria-pressed={group === "all"} onClick={() => setGroup("all")}>
            All
          </button>
          {groups.map((g) => (
            <button key={g.id} type="button" className="chip" aria-pressed={group === g.id} onClick={() => setGroup(g.id)}>
              {g.label}
            </button>
          ))}
        </div>
        <input
          className="h-[34px] w-52 max-w-full rounded-full border border-line bg-bg2 px-3.5 text-[13px] outline-none placeholder:text-mute focus:border-gold"
          type="search"
          placeholder="Search chapters and lessons"
          aria-label="Search chapters and lessons"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>
      <ul className="grid border-t border-line md:grid-cols-2 md:gap-x-12">
        {rows.length === 0 && <li className="col-span-full border-b border-line px-1 py-7 text-mute">No chapters match that search. Try a shorter word.</li>}
        {rows.map((c) => {
          const count = c.lessons.filter((l) => done.includes(lessonId(c.n, l.slug))).length;
          return (
            <li key={c.slug}>
              <Link href={`/learn/${c.slug}`} className="group grid grid-cols-[36px_minmax(0,1fr)_auto_20px] items-center gap-3 border-b border-line px-1 py-[18px]">
                <span className="font-mono text-xs text-mute">{pad(c.n)}</span>
                <span className="text-[17px] font-medium transition-colors group-hover:text-gold">{c.title}</span>
                <span className="whitespace-nowrap font-mono text-xs tabular-nums text-mute">
                  {count > 0 ? `${count}/${c.lessons.length}` : `${c.lessons.length} lessons`}
                </span>
                <svg className="text-mute transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold" width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                  <path d="M4 10l6-6M5 4h5v5" fill="none" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
