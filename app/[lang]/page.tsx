import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { dictionaries, Locale } from "@/lib/dictionaries";
import { getIndexChapters, STAGE_RANGES } from "@/lib/learn-index";
import { ContinueStrip } from "@/components/learn/ContinueStrip";
import { HeroChart } from "@/components/home/HeroChart";
import {
  AboutTeaser,
  Faq,
  SectionHead,
  Toolkit,
  Workspace,
} from "@/components/home/HomeSections";
import { pageMetadata } from "@/lib/seo";

const LANGUAGE_COUNT = 2;

/** Lessons surfaced on the home page ("Start with these"). */
const FEATURED_SLUG_PATHS = [
  "01-foundations/01-what-is-forex",
  "03-market-structure/03-break-of-structure",
  "08-risk-management/02-position-sizing",
  "13-gold-xauusd/01-why-gold-moves",
];

const STAGE_LEVEL = {
  en: ["Beginner", "Intermediate", "Advanced"],
  bn: ["শুরুর স্তর", "মধ্যম স্তর", "অ্যাডভান্সড"],
} as const;

const HOME_META = {
  bn: {
    title: "TradeNotes — Forex ও Gold Trading শেখার প্ল্যাটফর্ম",
    description:
      "Forex ও Gold trading এর জন্য structured learning notes, candlestick pattern library ও tools — Bengali ও English এ।",
  },
  en: {
    title: "TradeNotes — Personal Trading Learning Platform",
    description:
      "Structured Forex and Gold (XAUUSD) trading course, candlestick pattern library and tools — in Bengali and English.",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang?: string }>;
}): Promise<Metadata> {
  const { lang = "bn" } = await params;
  const meta = HOME_META[lang === "en" ? "en" : "bn"];
  return {
    ...pageMetadata({ lang, path: "", ...meta }),
    title: { absolute: meta.title },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang?: string }>;
}) {
  const { lang = "bn" } = await params;
  const locale = (lang === "en" ? "en" : "bn") as Locale;
  const t = dictionaries[locale].home;
  const moduleTitles = t.modules as Record<string, string>;

  const isEn = locale === "en";
  const chapters = getIndexChapters(locale, moduleTitles);
  const totalLessons = chapters.reduce((sum, c) => sum + c.lessons.length, 0);
  const stages = STAGE_RANGES.map(([from, to], i) => {
    const inStage = chapters.filter((c) => c.number >= from && c.number <= to);
    return {
      ...t.stages[i],
      level: STAGE_LEVEL[locale][i],
      range: `${String(from).padStart(2, "0")}–${String(to).padStart(2, "0")}`,
      chapterCount: inStage.length,
      lessonCount: inStage.reduce((sum, c) => sum + c.lessons.length, 0),
      href: inStage[0]?.href ?? `/${lang}/learn`,
    };
  });
  const featured = FEATURED_SLUG_PATHS.flatMap((slugPath) => {
    const chapter = chapters.find((c) => slugPath.startsWith(c.id));
    const lesson = chapter?.lessons.find((l) => l.slugPath === slugPath);
    return chapter && lesson ? [{ chapter, lesson }] : [];
  });

  return (
    <div>
      <Hero
        lang={lang}
        t={t}
        stats={[
          { value: chapters.length, label: t.chapters },
          { value: totalLessons, label: t.lessons },
          { value: LANGUAGE_COUNT, label: t.languages },
        ]}
      />

      <div className="wrap pb-6">
        <ContinueStrip chapters={chapters} isEn={isEn} />
      </div>

      {/* Pick the level */}
      <section className="sec">
        <div className="wrap">
          <SectionHead
            eyebrow={isEn ? "Start" : "শুরু করুন"}
            title={isEn ? "Pick the level that fits you" : "তোমার স্তর বেছে নাও"}
            action={
              <Link href={`/${lang}/learn`} className="btn">
                {t.curriculum}
              </Link>
            }
          />
          <div className="grid gap-10 md:grid-cols-3">
            {stages.map((s) => (
              <div key={s.range} className="border-fg2 border-t pt-5">
                <span className="eyebrow block">
                  {s.level} · {isEn ? "Chapters" : "চ্যাপ্টার"} {s.range}
                </span>
                <h3 className="mt-3 mb-2.5 text-[28px]">{s.title}</h3>
                <p className="text-fg2 max-w-[26em] text-[15px]">{s.desc}</p>
                <div className="text-mute mt-[18px] flex gap-3.5 font-mono text-xs tabular-nums">
                  <span>
                    {s.lessonCount} {t.lessons}
                  </span>
                  <span>
                    {s.chapterCount} {t.chapters}
                  </span>
                </div>
                <Link
                  href={s.href}
                  className="text-gold mt-[18px] inline-flex items-center gap-2 text-sm font-medium hover:underline hover:underline-offset-4"
                >
                  {isEn ? `Open ${s.title}` : `${s.title} খুলুন`}
                  <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Start with these */}
      <section className="sec">
        <div className="wrap">
          <SectionHead
            eyebrow={isEn ? "Start with these" : "এখান থেকে শুরু"}
            title={isEn ? "Latest lessons" : "বাছাই করা পাঠ"}
            action={
              <Link href={`/${lang}/learn`} className="btn">
                {t.viewAll}
              </Link>
            }
          />
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map(({ chapter, lesson }) => (
              <Link
                key={lesson.slugPath}
                href={lesson.url}
                className="group border-line flex flex-col gap-3 border-t pt-[18px]"
              >
                <span className="eyebrow">
                  {chapter.title} · {isEn ? "Ch" : "চ্যা."}{" "}
                  {String(chapter.number).padStart(2, "0")}
                </span>
                <h3 className="group-hover:text-gold text-[21px] leading-tight transition-colors">
                  {lesson.title.split(":")[0]}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Toolkit lang={locale} t={t} />
      <Workspace lang={locale} />
      <AboutTeaser lang={locale} />
      <Faq lang={locale} />
    </div>
  );
}

type HomeDict = (typeof dictionaries)[Locale]["home"];

function Hero({
  lang,
  t,
  stats,
}: {
  lang: string;
  t: HomeDict;
  stats: { value: number; label: string }[];
}) {
  return (
    <section className="wrap grid items-center gap-9 py-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] md:gap-14 md:py-[72px]">
      <div>
        <p className="eyebrow">{t.heroSub}</p>
        <h1 className="mt-[18px] mb-[22px] text-[clamp(56px,9vw,104px)] leading-[0.95] tracking-[-0.03em]">
          {t.heroTitle}
          <em className="text-gold italic">{t.heroTitleHighlight}</em>
        </h1>
        <p className="text-fg2 max-w-[30em] text-[19px] leading-relaxed">
          {t.heroDesc}
        </p>
        <div className="mt-7 flex flex-wrap gap-2.5">
          <Link
            href={`/${lang}/learn/01-foundations/01-what-is-forex`}
            className="btn btn-gold group"
          >
            {t.startLearning}
            <ArrowRight
              size={14}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
          <Link href={`/${lang}/tools/risk-calculator`} className="btn">
            {t.riskCalc}
          </Link>
        </div>
        <dl className="border-line mt-10 flex flex-wrap gap-9 border-t pt-[22px]">
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="text-mute font-mono text-[11px] font-medium tracking-[0.08em] uppercase">
                {s.label}
              </dt>
              <dd className="font-display mt-1.5 text-[34px] leading-tight tabular-nums">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div>
        <HeroChart label={t.illustrative} />
        <p className="text-mute px-1 pt-2 font-mono text-[11px]">
          {t.heroTags}
        </p>
      </div>
    </section>
  );
}
