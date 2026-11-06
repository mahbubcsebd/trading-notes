import { getLearnModules } from "@/lib/learn-modules";

const OVERVIEW_PREFIX = "00-";
/** Chapter ranges per stage, by chapter number (inclusive). */
export const STAGE_RANGES: readonly [number, number][] = [
  [1, 5],
  [6, 11],
  [12, 18],
];

export interface IndexLesson {
  slugPath: string;
  title: string;
  url: string;
}

export interface IndexChapter {
  id: string;
  number: number;
  stage: number;
  title: string;
  lessons: IndexLesson[];
  /** Chapter page = its 00-overview lesson (falls back to the first lesson). */
  href: string;
}

const stageOf = (n: number) =>
  Math.max(
    0,
    STAGE_RANGES.findIndex(([from, to]) => n >= from && n <= to),
  );

export function getIndexChapters(
  lang: "en" | "bn",
  moduleTitles: Record<string, string>,
): IndexChapter[] {
  return getLearnModules(lang).map((m, i) => {
    const number = i + 1;
    const lessons = m.lessons
      .filter((l) => !l.id.startsWith(OVERVIEW_PREFIX))
      .map(({ slugPath, title, url }) => ({ slugPath, title, url }));
    return {
      id: m.id,
      number,
      stage: stageOf(number),
      title: moduleTitles[m.id] ?? m.title[lang].replace(/^\d+\.\s*/, ""),
      lessons,
      href: m.lessons[0]?.url ?? `/${lang}/learn`,
    };
  });
}
