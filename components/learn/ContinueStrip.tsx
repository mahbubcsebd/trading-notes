"use client";

import Link from "next/link";
import { useProgress } from "@/lib/use-progress";
import type { IndexChapter } from "@/lib/learn-index";

export function ContinueStrip({
  chapters,
  isEn,
}: {
  chapters: IndexChapter[];
  isEn: boolean;
}) {
  const { done } = useProgress();
  const flat = chapters.flatMap((c) =>
    c.lessons.map((l, i) => ({ c, l, n: i + 1 })),
  );
  if (flat.length === 0) return null;

  const doneCount = flat.filter((x) => done.includes(x.l.slugPath)).length;
  const next = flat.find((x) => !done.includes(x.l.slugPath)) ?? flat[0];
  const pct = Math.round((doneCount / flat.length) * 100);
  const started = doneCount > 0;
  const chNo = String(next.c.number).padStart(2, "0");

  const eyebrow = started
    ? isEn
      ? "Continue learning"
      : "চালিয়ে যান"
    : isEn
      ? "Start here"
      : "এখান থেকে শুরু";
  const cta = started
    ? isEn
      ? "Continue lesson"
      : "পাঠ চালিয়ে যান"
    : isEn
      ? "Start lesson 1"
      : "পাঠ ১ শুরু করুন";

  return (
    <div className="border-line bg-bg2 grid items-center gap-6 rounded-2xl border px-6 py-5 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_auto]">
      <div>
        <div className="eyebrow">{eyebrow}</div>
        <h2 className="mt-2 text-[22px] leading-snug">
          {isEn ? "Chapter" : "চ্যাপ্টার"} {chNo} · {next.l.title.split(":")[0]}
        </h2>
        <p className="text-fg2 mt-0.5 text-sm">
          {isEn
            ? `Lesson ${next.n} of ${next.c.lessons.length} in ${next.c.title}`
            : `${next.c.title} — পাঠ ${next.n}/${next.c.lessons.length}`}
        </p>
      </div>
      <div>
        <div
          className="bg-line h-1.5 overflow-hidden rounded-full"
          role="progressbar"
          aria-label={isEn ? "Course progress" : "কোর্সের অগ্রগতি"}
          aria-valuemin={0}
          aria-valuemax={flat.length}
          aria-valuenow={doneCount}
        >
          <i
            className="bg-gold block h-full rounded-full transition-[width] duration-300"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="text-mute mt-2.5 flex justify-between font-mono text-xs tabular-nums">
          <span>
            {doneCount} / {flat.length} {isEn ? "lessons done" : "পাঠ শেষ"}
          </span>
          <span>{pct}%</span>
        </div>
        <p className="text-mute mt-2 font-mono text-[11px]">
          {isEn
            ? "Progress is saved in this browser."
            : "অগ্রগতি এই ব্রাউজারে সংরক্ষিত।"}
        </p>
      </div>
      <Link href={next.l.url} className="btn btn-gold btn-sm">
        {cta}
      </Link>
    </div>
  );
}
