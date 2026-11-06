"use client";

import Link from "next/link";
import { pad } from "@/lib/curriculum";
import { lessonId } from "@/lib/lesson-id";
import { useProgress } from "@/lib/progress";
import type { Chapter } from "@/lib/types";

const levelClass = (l: string) => (l === "Beginner" ? "pill-up" : l === "Intermediate" ? "pill-gold" : "pill-down");

export function LessonRows({ chapter }: { chapter: Chapter }) {
  const { isDone } = useProgress();
  return (
    <div className="border-t border-line">
      {chapter.lessons.map((l) => {
        const done = isDone(lessonId(chapter.n, l.slug));
        return (
          <Link
            key={l.slug}
            href={`/learn/${chapter.slug}/${l.slug}`}
            className="group grid grid-cols-[28px_minmax(0,1fr)] items-center gap-x-4 gap-y-2 border-b border-line px-1 py-5 sm:grid-cols-[32px_minmax(0,1fr)_auto]"
          >
            <span className="font-mono text-[13px] tabular-nums text-mute">{pad(l.n)}</span>
            <div>
              <div className="text-lg font-medium leading-snug transition-colors group-hover:text-gold">{l.title}</div>
              <div className="mt-1 text-sm text-fg2">{l.summary}</div>
            </div>
            <div className="col-start-2 flex items-center gap-3.5 font-mono text-xs tabular-nums text-mute sm:col-start-3">
              <span className={`pill ${levelClass(l.level)}`}>{l.level}</span>
              <span>{l.minutes} min</span>
              <span
                aria-label={done ? "Completed" : "Not completed"}
                className={`grid size-5 flex-none place-items-center rounded-full border ${
                  done ? "border-gold bg-gold text-gold-ink" : "border-mute"
                }`}
              >
                {done && (
                  <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                    <path d="M2.5 6.3l2.4 2.4L9.5 3.6" fill="none" stroke="currentColor" strokeWidth="1.8" />
                  </svg>
                )}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export function ChapterProgress({ chapter }: { chapter: Chapter }) {
  const { done } = useProgress();
  const total = chapter.lessons.length;
  const count = chapter.lessons.filter((l) => done.includes(lessonId(chapter.n, l.slug))).length;
  const pct = Math.round((count / total) * 100);
  return (
    <div className="card">
      <h3 className="mb-3 text-xl">Your progress</h3>
      <div
        className="h-1.5 overflow-hidden rounded-full bg-line"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={count}
      >
        <i className="block h-full rounded-full bg-gold transition-[width] duration-300" style={{ width: `${pct}%` }} />
      </div>
      <div className="mt-2.5 flex justify-between font-mono text-xs tabular-nums text-mute">
        <span>
          {count} of {total} lessons
        </span>
        <span>{pct}%</span>
      </div>
      <p className="mt-3 font-mono text-[11px] text-mute">Saved in this browser.</p>
    </div>
  );
}

export function StartButton({ chapter }: { chapter: Chapter }) {
  const { done } = useProgress();
  const doneIn = chapter.lessons.filter((l) => done.includes(lessonId(chapter.n, l.slug)));
  const next = chapter.lessons.find((l) => !done.includes(lessonId(chapter.n, l.slug)));
  let label = "Start lesson 1";
  let target = chapter.lessons[0];
  if (doneIn.length > 0 && next) {
    label = `Continue with lesson ${next.n}`;
    target = next;
  } else if (doneIn.length > 0 && !next) {
    label = "Review lesson 1";
  }
  return (
    <Link href={`/learn/${chapter.slug}/${target.slug}`} className="btn btn-gold mt-7">
      {label}
    </Link>
  );
}
