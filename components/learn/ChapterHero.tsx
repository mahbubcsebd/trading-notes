import Link from "next/link";
import { ChapterProgress } from "@/components/learn/ChapterProgress";
import type { ModuleGroup } from "@/components/learn/LearnSidebar";

interface Props {
  module: ModuleGroup;
  nextModule: ModuleGroup | null;
  lang: "en" | "bn";
  title: string;
  description?: string;
  level?: string;
}

const LEVEL_PILL: Record<string, string> = {
  beginner: "pill-up",
  intermediate: "pill-gold",
  advanced: "pill-down",
};

export function ChapterHero({
  module,
  nextModule,
  lang,
  title,
  description,
  level,
}: Props) {
  const isEn = lang === "en";
  const lessons = module.lessons.filter((l) => !l.id.startsWith("00-"));
  const chapterNo = String(module.order).padStart(2, "0");
  const first = lessons[0];

  return (
    <section
      aria-label={isEn ? "Chapter overview" : "চ্যাপ্টার ওভারভিউ"}
      className="not-prose"
    >
      <div className="max-w-[760px]">
        <p className="eyebrow">
          {isEn ? "Chapter" : "চ্যাপ্টার"} {chapterNo} ·{" "}
          {module.title[lang].replace(/^\d+\.\s*/, "")}
        </p>
        <h1 className="mt-4 mb-[18px] text-[clamp(34px,5vw,56px)] leading-[1.06] tracking-[-0.025em]">
          {title.split(":")[0]}
        </h1>
        {description && (
          <p className="text-fg2 max-w-[34em] text-[19px] leading-relaxed">
            {description}
          </p>
        )}
        <div className="mt-[22px] flex flex-wrap gap-2.5 tabular-nums">
          {level && (
            <span className={`pill ${LEVEL_PILL[level] ?? ""}`}>{level}</span>
          )}
          <span className="pill">
            {lessons.length} {isEn ? "lessons" : "পাঠ"}
          </span>
        </div>
        {first && (
          <Link href={first.url} className="btn btn-gold mt-7">
            {isEn ? "Start lesson 1" : "পাঠ ১ শুরু করুন"}
          </Link>
        )}
      </div>

      <div className="border-line mt-12 grid items-start gap-10 border-t pt-10 md:grid-cols-[minmax(0,1fr)_260px]">
        <div>
          <h2 className="mb-5 text-[28px] leading-tight">
            {isEn ? "Lessons in this chapter" : "এই চ্যাপ্টারের পাঠসমূহ"}
          </h2>
          <ol className="border-line border-t">
            {lessons.map((l, i) => (
              <li key={l.id} className="border-line border-b">
                <Link
                  href={l.url}
                  className="group grid grid-cols-[28px_minmax(0,1fr)_auto] items-start gap-x-4 px-1 py-5"
                >
                  <span className="text-mute pt-1 font-mono text-[13px] tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="group-hover:text-gold block text-lg leading-snug font-medium transition-colors">
                      {l.title.split(":")[0]}
                    </span>
                    {l.description && (
                      <span className="text-fg2 mt-1 line-clamp-2 block text-sm">
                        {l.description}
                      </span>
                    )}
                  </span>
                  {l.level && (
                    <span
                      className={`pill mt-0.5 ${LEVEL_PILL[l.level] ?? ""}`}
                    >
                      {l.level}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ol>
        </div>

        <aside
          className="grid gap-4 md:sticky md:top-[4.5rem]"
          aria-label={isEn ? "Chapter sidebar" : "চ্যাপ্টার সাইডবার"}
        >
          <ChapterProgress
            slugPaths={lessons.map((l) => l.slugPath)}
            isEn={isEn}
          />
          {nextModule && (
            <Link
              href={nextModule.lessons[0]?.url ?? "#"}
              className="card hover:border-mute block transition-colors"
            >
              <div className="eyebrow">
                {isEn ? "Up next" : "পরের চ্যাপ্টার"}
              </div>
              <h3 className="mt-2 mb-1 text-xl">
                {nextModule.title[lang].replace(/^\d+\.\s*/, "")}
              </h3>
              <p className="text-fg2 font-mono text-[13px] tabular-nums">
                {isEn ? "Chapter" : "চ্যাপ্টার"}{" "}
                {String(nextModule.order).padStart(2, "0")}
              </p>
            </Link>
          )}
        </aside>
      </div>
    </section>
  );
}
