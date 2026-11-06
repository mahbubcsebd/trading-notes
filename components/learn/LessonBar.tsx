"use client";

import Link from "next/link";
import { useProgress } from "@/lib/use-progress";

type Nav = { href: string; label: string } | null;

export function LessonBar({
  id,
  prev,
  next,
  isEn,
}: {
  id: string;
  prev: Nav;
  next: Nav;
  isEn: boolean;
}) {
  const { isDone, toggle } = useProgress();
  const done = isDone(id);
  const doneLabel = isEn ? "Completed ✓" : "সম্পন্ন ✓";
  const todoLabel = isEn ? "Mark complete" : "সম্পন্ন করুন";

  return (
    <div className="border-line bg-bg no-print sticky bottom-[env(safe-area-inset-bottom,0px)] z-30 mt-14 border-t py-3.5">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0 sm:max-w-[34%]">
          {prev && (
            <Link
              href={prev.href}
              className="group text-fg2 flex flex-col gap-0.5 text-sm"
            >
              <small className="text-mute font-mono text-[11px] tracking-wider uppercase">
                {isEn ? "Previous" : "পূর্ববর্তী"}
              </small>
              <span className="group-hover:text-gold hidden truncate sm:block">
                {prev.label}
              </span>
            </Link>
          )}
        </div>
        <button
          type="button"
          onClick={() => toggle(id)}
          className={`btn btn-sm ${done ? "" : "btn-gold"}`}
          aria-pressed={done}
        >
          {done ? doneLabel : todoLabel}
        </button>
        <div className="min-w-0 text-right sm:max-w-[34%]">
          {next && (
            <Link
              href={next.href}
              className="group text-fg2 flex flex-col items-end gap-0.5 text-sm"
            >
              <small className="text-mute font-mono text-[11px] tracking-wider uppercase">
                {isEn ? "Next" : "পরবর্তী"}
              </small>
              <span className="group-hover:text-gold hidden max-w-full truncate sm:block">
                {next.label}
              </span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
