"use client";

import Link from "next/link";
import { useProgress } from "@/lib/progress";
import { useLang } from "./LangProvider";

type Nav = { href: string; label: string } | null;

export function LessonBar({ id, prev, next }: { id: string; prev: Nav; next: Nav }) {
  const { isDone, toggle } = useProgress();
  const { t } = useLang();
  const done = isDone(id);

  return (
    <div className="sticky bottom-[env(safe-area-inset-bottom,0px)] z-30 mt-14 border-t border-line bg-bg py-3.5">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0 sm:max-w-[34%]">
          {prev && (
            <Link href={prev.href} className="group flex flex-col gap-0.5 text-sm text-fg2">
              <small className="font-mono text-[11px] uppercase tracking-wider text-mute">{t("lesson.prev")}</small>
              <span className="hidden truncate group-hover:text-gold sm:block">{prev.label}</span>
            </Link>
          )}
        </div>
        <button type="button" onClick={() => toggle(id)} className={`btn btn-sm ${done ? "" : "btn-gold"}`} aria-pressed={done}>
          {done ? t("lesson.completed") : t("lesson.complete")}
        </button>
        <div className="min-w-0 text-right sm:max-w-[34%]">
          {next && (
            <Link href={next.href} className="group flex flex-col items-end gap-0.5 text-sm text-fg2">
              <small className="font-mono text-[11px] uppercase tracking-wider text-mute">{t("lesson.next")}</small>
              <span className="hidden max-w-full truncate group-hover:text-gold sm:block">{next.label}</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
