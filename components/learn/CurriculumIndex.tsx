"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useProgress } from "@/lib/use-progress";
import type { IndexChapter } from "@/lib/learn-index";

interface Props {
  chapters: IndexChapter[];
  stageTitles: string[];
  isEn: boolean;
}

export function CurriculumIndex({ chapters, stageTitles, isEn }: Props) {
  const [stage, setStage] = useState<number | "all">("all");
  const [q, setQ] = useState("");
  const { done } = useProgress();

  const rows = useMemo(() => {
    const term = q.trim().toLowerCase();
    return chapters.filter(
      (c) =>
        (stage === "all" || c.stage === stage) &&
        (!term ||
          c.title.toLowerCase().includes(term) ||
          c.lessons.some((l) => l.title.toLowerCase().includes(term))),
    );
  }, [chapters, stage, q]);

  const searchLabel = isEn
    ? "Search chapters and lessons"
    : "চ্যাপ্টার ও পাঠ খুঁজুন";
  const lessonsWord = isEn ? "lessons" : "পাঠ";

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center gap-2.5">
        <div
          className="flex flex-wrap gap-1.5"
          role="group"
          aria-label={isEn ? "Filter chapters" : "চ্যাপ্টার ফিল্টার"}
        >
          <button
            type="button"
            className="chip"
            aria-pressed={stage === "all"}
            onClick={() => setStage("all")}
          >
            {isEn ? "All" : "সব"}
          </button>
          {stageTitles.map((t, i) => (
            <button
              key={t}
              type="button"
              className="chip"
              aria-pressed={stage === i}
              onClick={() => setStage(i)}
            >
              {t}
            </button>
          ))}
        </div>
        <input
          className="border-line bg-bg2 placeholder:text-mute focus:border-gold h-[34px] w-52 max-w-full rounded-full border px-3.5 text-[13px] outline-none"
          type="search"
          placeholder={searchLabel}
          aria-label={searchLabel}
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      <ul className="border-line grid border-t md:grid-cols-2 md:gap-x-12">
        {rows.length === 0 && (
          <li className="border-line text-mute col-span-full border-b px-1 py-7">
            {isEn ? "No chapters match that search." : "কোনো চ্যাপ্টার মেলেনি।"}
          </li>
        )}
        {rows.map((c) => {
          const count = c.lessons.filter((l) =>
            done.includes(l.slugPath),
          ).length;
          return (
            <li key={c.id}>
              <Link
                href={c.href}
                className="group border-line grid grid-cols-[36px_minmax(0,1fr)_auto_20px] items-center gap-3 border-b px-1 py-[18px]"
              >
                <span className="text-mute font-mono text-xs">
                  {String(c.number).padStart(2, "0")}
                </span>
                <span className="group-hover:text-gold text-[17px] font-medium transition-colors">
                  {c.title}
                </span>
                <span className="text-mute font-mono text-xs whitespace-nowrap tabular-nums">
                  {count > 0
                    ? `${count}/${c.lessons.length}`
                    : `${c.lessons.length} ${lessonsWord}`}
                </span>
                <ArrowUpRight
                  size={14}
                  className="text-mute group-hover:text-gold transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
