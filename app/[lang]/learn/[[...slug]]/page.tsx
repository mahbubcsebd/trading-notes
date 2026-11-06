// @ts-nocheck
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { i18n } from "@/lib/i18n";
import { source } from "@/lib/source";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  CheckCircle2,
  BookOpen,
  ArrowLeft,
  ArrowRight,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import defaultMdxComponents from "fumadocs-ui/mdx";
import { components as customMdxComponents } from "@/mdx-components";
import { TocSidebar } from "@/components/TocSidebar";
import { ChapterHero } from "@/components/learn/ChapterHero";
import { LessonBar } from "@/components/learn/LessonBar";
import { ContinueStrip } from "@/components/learn/ContinueStrip";
import { CurriculumIndex } from "@/components/learn/CurriculumIndex";
import { PageHeader } from "@/components/layout/PageHeader";
import { dictionaries } from "@/lib/dictionaries";
import { getIndexChapters } from "@/lib/learn-index";
import { getLearnModules } from "@/lib/learn-modules";
import { ShareButtons } from "@/components/share/ShareButtons";
import { DownloadPdfButton } from "@/components/pdf/DownloadPdfButton";

export async function generateStaticParams() {
  return source.generateParams();
}

export const instant = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[]; lang?: string }>;
}): Promise<Metadata> {
  const { slug = [], lang } = await params;
  const page = source.getPage(slug, lang);
  if (!page) return {};

  // hreflang only for locales that really have this lesson.
  const available = i18n.languages.filter((l) => source.getPage(slug, l));

  return pageMetadata({
    lang,
    path: slug.length ? `/learn/${slug.join("/")}` : "/learn",
    title: page.data.title,
    description:
      page.data.description ||
      "Professional trading curriculum for Forex and Gold.",
    type: "article",
    available,
  });
}

export default async function LearnPage({ params }) {
  const { slug = [], lang } = await params;
  const currentLang = (lang === "en" ? "en" : "bn") as "en" | "bn";
  const isEn = currentLang === "en";
  // /[lang]/learn root = curriculum index (continue strip, stage filter, chapter list)
  if (!slug || slug.length === 0) {
    const t = dictionaries[currentLang].home;
    const chapters = getIndexChapters(
      currentLang,
      t.modules as Record<string, string>,
    );
    const lessonTotal = chapters.reduce((s, c) => s + c.lessons.length, 0);
    return (
      <>
        <PageHeader
          eyebrow={`${chapters.length} ${t.chapters} · ${lessonTotal} ${t.lessons}`}
          title={t.curriculum}
          desc={
            isEn
              ? "Work through the chapters in order, or jump to the one you need. Chapters 1 to 5 are the foundation for everything after them."
              : "চ্যাপ্টারগুলো ক্রমানুসারে শেখো, অথবা যেটা দরকার সেটায় সরাসরি যাও। ১ থেকে ৫ নম্বর চ্যাপ্টার পরের সবকিছুর ভিত্তি।"
          }
        />
        <div className="wrap space-y-10 py-10 md:py-12">
          <ContinueStrip chapters={chapters} isEn={isEn} />
          <CurriculumIndex
            chapters={chapters}
            stageTitles={t.stages.map((s) => s.title)}
            isEn={isEn}
          />
        </div>
      </>
    );
  }

  const page = source.getPage(slug, currentLang);

  // If page was not found for exact slug, check if this is a module directory (e.g. /learn/01-foundations)
  if (!page) {
    const allPages = source.getPages(currentLang);
    const slugPath = slug.join("/");

    // Find child pages within this folder
    const childPages = allPages
      .filter((p) => p.file.path.replace(/\\/g, "/").startsWith(slugPath))
      .sort((a, b) => a.file.path.localeCompare(b.file.path));

    // Automatically redirect to the first lesson in this chapter
    if (childPages.length > 0) {
      let targetUrl = childPages[0].url;
      if (!targetUrl.startsWith(`/${currentLang}`)) {
        targetUrl = `/${currentLang}${targetUrl.startsWith("/") ? "" : "/"}${targetUrl}`;
      }
      return redirect(targetUrl);
    }

    notFound();
  }

  const { body: MDXContent, toc } = page.data;
  const { title, description, level, tags, status, updated, sources } =
    page.data;

  // Retrieve full hierarchical modules and lessons
  const modules = getLearnModules(currentLang);
  const currentSlugPath = slug.join("/");

  // Find previous and next lessons across all chapters
  const flatLessons = modules.flatMap((m) => m.lessons);
  const currentIndex = flatLessons.findIndex(
    (l) => l.slugPath === currentSlugPath || currentSlugPath.endsWith(l.id),
  );
  const prevLesson = currentIndex > 0 ? flatLessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex >= 0 && currentIndex < flatLessons.length - 1
      ? flatLessons[currentIndex + 1]
      : null;

  const levelColors = {
    beginner: "text-bull border-bull/30",
    intermediate: "text-gold border-gold/30",
    advanced: "text-title border-title/30",
  };

  // Find current chapter name for breadcrumbs
  const currentModule = modules.find((m) =>
    m.lessons.some(
      (l) => l.slugPath === currentSlugPath || currentSlugPath.startsWith(m.id),
    ),
  );

  const lessonIndexInModule = currentModule
    ? currentModule.lessons.findIndex(
        (l) => l.slugPath === currentSlugPath || currentSlugPath.endsWith(l.id),
      )
    : -1;
  const lessonNumberStr =
    lessonIndexInModule >= 0
      ? String(lessonIndexInModule + 1).padStart(2, "0")
      : null;

  const isOverview = slug[slug.length - 1].startsWith("00-overview");
  const nextModule = currentModule
    ? (modules[modules.indexOf(currentModule) + 1] ?? null)
    : null;

  return (
    <div className="wrap pt-8 pb-10">
      {/* Lesson layout (tradenotes): article + right TOC */}
      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-16">
        {/* Lesson Content Article */}
        <article
          id="main-lesson-article"
          className="w-full max-w-[820px] min-w-0"
        >
          {/* Top Breadcrumb */}
          <nav
            className="text-mute no-print flex flex-wrap items-center gap-2 font-mono text-xs"
            data-pdf-exclude="true"
            aria-label="Breadcrumb"
          >
            <Link
              href={`/${currentLang}/learn`}
              className="hover:text-foreground transition-colors"
            >
              {isEn ? "Learn" : "শিখুন"}
            </Link>
            {currentModule && (
              <>
                <span className="text-muted-foreground/40">/</span>
                <Link
                  href={
                    currentModule.lessons[0]?.url ?? `/${currentLang}/learn`
                  }
                  className="hover:text-foreground transition-colors"
                >
                  {isEn ? "Chapter" : "চ্যাপ্টার"}{" "}
                  {String(currentModule.order).padStart(2, "0")}
                </Link>
              </>
            )}
            <span className="text-muted-foreground/40">/</span>
            <span>
              {lessonNumberStr
                ? `${isEn ? "Lesson" : "পাঠ"} ${Number(lessonNumberStr)}`
                : title}
            </span>
          </nav>

          {isOverview && currentModule ? (
            <ChapterHero
              module={currentModule}
              nextModule={nextModule}
              lang={currentLang}
              title={title}
              description={description}
              level={level}
            />
          ) : (
            <header>
              {status === "draft" && (
                <div className="border-warn/30 bg-warn/10 text-warn inline-flex items-center gap-2 rounded-md border px-3 py-1 text-xs font-medium">
                  ⚠ Draft —{" "}
                  {isEn
                    ? "This lesson is under construction"
                    : "এই পাঠটি সম্পূর্ণ প্রস্তুত হচ্ছে"}
                </div>
              )}

              {lessonNumberStr && currentModule && (
                <p className="eyebrow mt-7 tabular-nums">
                  {isEn
                    ? `Lesson ${Number(lessonNumberStr)} of ${currentModule.lessons.length}`
                    : `পাঠ ${Number(lessonNumberStr)} / ${currentModule.lessons.length}`}
                  {level ? ` · ${level}` : ""}
                </p>
              )}
              <h1 className="mt-3.5 mb-3 text-[clamp(34px,5vw,52px)] leading-[1.06] tracking-[-0.025em]">
                {title}
              </h1>
              {description && (
                <p className="text-fg2 text-lg leading-relaxed">
                  {description}
                </p>
              )}

              <div
                className="mt-5 flex flex-wrap items-center gap-2 text-xs print:hidden"
                data-pdf-exclude="true"
              >
                {level && (
                  <span
                    className={`pill ${
                      level === "beginner"
                        ? "pill-up"
                        : level === "intermediate"
                          ? "pill-gold"
                          : "pill-down"
                    }`}
                  >
                    {level}
                  </span>
                )}
                {tags?.map((tag) => (
                  <Link
                    key={tag}
                    href={`/${currentLang}/tags/${tag}`}
                    className="pill hover:border-mute transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
                {updated && (
                  <span className="text-muted-foreground flex items-center gap-1 text-xs">
                    <Clock size={12} />
                    {new Date(updated).toLocaleDateString(
                      isEn ? "en-US" : "bn-BD",
                    )}
                  </span>
                )}

                {/* Actions: PDF Download & Share Dropdown */}
                <div className="ml-auto flex items-center gap-2">
                  <DownloadPdfButton title={title} lang={currentLang} />
                  <ShareButtons
                    variant="dropdown"
                    title={title}
                    description={description}
                    lang={currentLang}
                  />
                </div>
              </div>
            </header>
          )}

          {isOverview && (
            <h2 className="eyebrow border-line border-t pt-8">
              {isEn ? "Chapter guide" : "চ্যাপ্টার গাইড"}
            </h2>
          )}
          {/* MDX Content Area */}
          <div
            id="lesson-mdx-content"
            className="lesson-prose mt-8 max-w-none [&>h1:first-child]:hidden"
          >
            <MDXContent
              components={{
                ...defaultMdxComponents,
                ...customMdxComponents,
                Disclaimer: (props: any) => (
                  <customMdxComponents.Disclaimer
                    {...props}
                    lang={currentLang}
                  />
                ),
                KeyTakeaways: ({ children }: any) => (
                  <div className="border-line bg-surface not-prose my-6 space-y-2 rounded-2xl border p-6">
                    <h3 className="eyebrow flex items-center gap-2">
                      <CheckCircle2 size={14} />
                      {isEn
                        ? "Key Takeaways & Mentorship Rules"
                        : "মূল শিক্ষণীয় বিষয় (Key Takeaways)"}
                    </h3>
                    <div className="text-foreground/90 space-y-2 text-sm leading-relaxed">
                      {children}
                    </div>
                  </div>
                ),
                Callout: defaultMdxComponents.Callout,
              }}
            />
          </div>

          {/* Share Section Bar at the end of the lesson */}
          <div data-pdf-exclude="true" className="no-print">
            <ShareButtons
              variant="bar"
              title={title}
              description={description}
              lang={currentLang}
            />
          </div>

          {/* Mark complete + prev/next (sticky). Chapter pages use their own CTA. */}
          {!isOverview && (
            <LessonBar
              id={currentSlugPath}
              isEn={isEn}
              prev={
                prevLesson
                  ? { href: prevLesson.url, label: prevLesson.title }
                  : null
              }
              next={
                nextLesson
                  ? { href: nextLesson.url, label: nextLesson.title }
                  : null
              }
            />
          )}

          {/* Sources Footnote */}
          {sources && sources.length > 0 && (
            <div
              data-pdf-exclude="true"
              className="border-border/60 mt-8 border-t pt-6 print:hidden"
            >
              <h4 className="text-foreground mb-3 text-sm font-semibold">
                {isEn ? "Sources & Citations" : "উৎস ও রেফারেন্স"}
              </h4>
              <ul className="space-y-1.5 text-xs">
                {sources.map((src, i) => (
                  <li
                    key={i}
                    className="text-muted-foreground flex items-start gap-2.5"
                  >
                    <span className="bg-panel border-border rounded border px-1.5 py-0.5 font-mono text-[10px] uppercase">
                      {src.type}
                    </span>
                    <div>
                      {src.url ? (
                        <a
                          href={src.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-link hover:underline"
                        >
                          {src.title}
                        </a>
                      ) : (
                        <span className="text-foreground">{src.title}</span>
                      )}
                      {src.note && (
                        <span className="text-muted-foreground/80 ml-1">
                          — {src.note}
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </article>

        {/* 3. RIGHT COLUMN: Dynamic TOC Sidebar ("On this page") */}
        <TocSidebar toc={toc} />
      </div>
    </div>
  );
}
