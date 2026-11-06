"use client";

import Link from "next/link";
import { chapters, pad, totalLessons } from "@/lib/curriculum";
import { lessonId } from "@/lib/lesson-id";
import { useProgress } from "@/lib/progress";

export function ContinueStrip() {
  const { done } = useProgress();
  const flat = chapters.flatMap((c) => c.lessons.map((l) => ({ c, l })));
  const doneCount = flat.filter((x) => done.includes(lessonId(x.c.n, x.l.slug))).length;
  const next = flat.find((x) => !done.includes(lessonId(x.c.n, x.l.slug))) ?? flat[0];
  const pct = Math.round((doneCount / totalLessons) * 100);
  const started = doneCount > 0;

  return (
    <div className="grid items-center gap-6 rounded-2xl border border-line bg-bg2 px-6 py-5 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_auto]">
      <div>
        <div className="eyebrow">{started ? "Continue learning" : "Start here"}</div>
        <h3 className="mt-2 text-[22px] leading-snug">
          Chapter {pad(next.c.n)} · {next.l.title}
        </h3>
        <p className="mt-0.5 text-sm text-fg2">
          Lesson {next.l.n} of {next.c.lessons.length} in {next.c.title}
        </p>
      </div>
      <div>
        <div className="h-1.5 overflow-hidden rounded-full bg-line" role="progressbar" aria-valuemin={0} aria-valuemax={totalLessons} aria-valuenow={doneCount}>
          <i className="block h-full rounded-full bg-gold transition-[width] duration-300" style={{ width: `${pct}%` }} />
        </div>
        <div className="mt-2.5 flex justify-between font-mono text-xs tabular-nums text-mute">
          <span>
            {doneCount} of {totalLessons} lessons done
          </span>
          <span>{pct}%</span>
        </div>
        <p className="mt-2 font-mono text-[11px] text-mute">Progress is saved in this browser.</p>
      </div>
      <Link href={`/learn/${next.c.slug}/${next.l.slug}`} className="btn btn-gold btn-sm">
        {started ? "Continue lesson" : "Start lesson 1"}
      </Link>
    </div>
  );
}
