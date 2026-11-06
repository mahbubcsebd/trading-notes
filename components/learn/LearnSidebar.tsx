"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  Menu,
  X,
  BookOpen,
  Sparkles,
} from "lucide-react";

export interface LessonItem {
  id: string;
  title: string;
  url: string;
  slugPath: string;
  level?: string;
  status?: string;
  description?: string;
}

export interface ModuleGroup {
  id: string;
  title: { en: string; bn: string };
  order: number;
  lessons: LessonItem[];
}

interface LearnSidebarProps {
  modules: ModuleGroup[];
  currentSlugPath: string;
  lang: "en" | "bn";
  className?: string;
}

export function LearnSidebar({
  modules,
  currentSlugPath,
  lang,
  className = "",
}: LearnSidebarProps) {
  const isEn = lang === "en";
  const [mobileOpen, setMobileOpen] = React.useState(false);

  // Identify current module based on slug path (e.g. '01-foundations')
  const currentModuleId = useMemo(() => {
    const parts = currentSlugPath.split("/");
    return parts[0] || "01-foundations";
  }, [currentSlugPath]);

  const currentModuleIndex = useMemo(() => {
    const idx = modules.findIndex((m) => m.id === currentModuleId);
    return idx >= 0 ? idx : 0;
  }, [modules, currentModuleId]);

  const currentModule = modules[currentModuleIndex] || modules[0];

  const prevModule =
    currentModuleIndex > 0 ? modules[currentModuleIndex - 1] : null;
  const nextModule =
    currentModuleIndex < modules.length - 1
      ? modules[currentModuleIndex + 1]
      : null;

  // Active lesson index within current module
  const activeLessonIndex = useMemo(() => {
    if (!currentModule) return 0;
    const idx = currentModule.lessons.findIndex(
      (l) => l.slugPath === currentSlugPath || currentSlugPath.endsWith(l.id),
    );
    return idx >= 0 ? idx : 0;
  }, [currentModule, currentSlugPath]);

  const activeLessonRef = React.useRef<HTMLAnchorElement>(null);

  // Auto-scroll the active lesson item into view
  React.useEffect(() => {
    if (activeLessonRef.current) {
      activeLessonRef.current.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [currentSlugPath]);

  const sidebarContent = (
    <div className="bg-card border-border flex h-full flex-col overflow-hidden rounded-2xl border">
      {/* ─── Top Chapter Header (Module info & Back link) ──────────── */}
      <div className="border-border relative space-y-2.5 border-b p-4">
        {/* Chapter progress bar */}
        <div className="bg-border/60 absolute inset-x-0 bottom-0 h-0.5">
          <div
            className="bg-gold h-full transition-all"
            style={{
              width: `${((activeLessonIndex + 1) / Math.max(currentModule?.lessons.length || 1, 1)) * 100}%`,
            }}
          />
        </div>
        <div className="flex items-center justify-between text-[11px]">
          <Link
            href={`/${lang}#curriculum`}
            className="text-muted-foreground hover:text-gold inline-flex items-center gap-1.5 font-mono transition-colors"
          >
            <ArrowLeft size={13} />
            <span>{isEn ? "All Modules" : "সকল কারিকুলাম"}</span>
          </Link>

          <span className="bg-muted text-muted-foreground rounded-full px-2 py-0.5 font-mono text-[10px] tabular-nums">
            {isEn
              ? `Lesson ${activeLessonIndex + 1} of ${currentModule?.lessons.length || 0}`
              : `পাঠ ${activeLessonIndex + 1} / ${currentModule?.lessons.length || 0}`}
          </span>
        </div>

        {/* Current Module Title */}
        <div className="pt-1">
          <div className="text-gold flex items-center gap-1 font-mono text-[10px] font-semibold tracking-wider uppercase">
            <BookOpen size={11} className="text-gold" />
            <span>
              {isEn
                ? `Module ${currentModuleIndex + 1}`
                : `অধ্যায় ${currentModuleIndex + 1}`}
            </span>
          </div>
          <h2 className="text-foreground mt-1.5 text-base leading-snug tracking-tight">
            {currentModule?.title[lang]}
          </h2>
          <div className="text-muted-foreground mt-1 font-mono text-[11px]">
            {currentModule?.lessons.length}{" "}
            {isEn ? "Lessons in this chapter" : "টি পাঠ রয়েছে এই অধ্যায়ে"}
          </div>
        </div>
      </div>

      {/* ─── Direct Lessons List: Flat, No Rounded Corners ──────────── */}
      <div className="min-h-0 flex-1 [scrollbar-width:thin] space-y-1 overflow-y-auto overscroll-contain p-2">
        {currentModule?.lessons.map((lesson, idx) => {
          const isLessonActive =
            currentSlugPath === lesson.slugPath ||
            currentSlugPath.endsWith(lesson.id);
          const num = String(idx + 1).padStart(2, "0");

          return (
            <Link
              key={lesson.slugPath}
              ref={isLessonActive ? activeLessonRef : null}
              href={lesson.url}
              onClick={() => setMobileOpen(false)}
              aria-current={isLessonActive ? "page" : undefined}
              className={`group flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors ${
                isLessonActive
                  ? "bg-accent text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/60"
              }`}
            >
              {/* Index */}
              <span
                className={`mt-px w-5 shrink-0 font-mono text-[11px] tabular-nums ${
                  isLessonActive
                    ? "text-gold font-medium"
                    : "text-muted-foreground/60 group-hover:text-foreground"
                }`}
              >
                {num}
              </span>

              {/* Title & Description */}
              <div className="min-w-0 flex-1">
                <div
                  className={`line-clamp-2 text-[13px] leading-snug ${
                    isLessonActive
                      ? "text-foreground font-medium"
                      : "group-hover:text-foreground"
                  }`}
                >
                  {lesson.title}
                </div>
                {lesson.description && (
                  <div className="text-muted-foreground/75 mt-0.5 line-clamp-1 text-[11px] leading-relaxed font-normal">
                    {lesson.description}
                  </div>
                )}
              </div>

              {/* Active Dot Indicator */}
              {isLessonActive && (
                <span className="bg-gold mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" />
              )}
            </Link>
          );
        })}
      </div>

      {/* ─── Bottom Navigation: Next Chapter Quick Link ────────────── */}
      <div className="border-border space-y-1.5 border-t p-3">
        {nextModule && (
          <Link
            href={
              nextModule.lessons[0]?.url || `/${lang}/learn/${nextModule.id}`
            }
            onClick={() => setMobileOpen(false)}
            className="text-muted-foreground hover:text-foreground hover:bg-accent group flex items-center justify-between rounded-lg px-3 py-2 text-xs transition-colors"
          >
            <div className="min-w-0 pr-2">
              <div className="text-gold flex items-center gap-1 font-mono text-[10px]">
                <span>{isEn ? "Next Module" : "পরবর্তী অধ্যায়"}</span>
                <ArrowRight
                  size={11}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </div>
              <div className="text-foreground mt-0.5 truncate text-xs font-semibold">
                {nextModule.title[lang]}
              </div>
            </div>
            <span className="text-muted-foreground shrink-0 font-mono text-[10px]">
              {nextModule.lessons.length} {isEn ? "lessons" : "টি পাঠ"}
            </span>
          </Link>
        )}

        {/* Quick Hub Links */}
        <div className="text-muted-foreground border-border/40 flex items-center justify-between border-t pt-1 text-[11px]">
          <Link
            href={`/${lang}/patterns`}
            className="hover:text-gold flex items-center gap-1 transition-colors"
          >
            <Sparkles size={11} className="text-gold" />
            <span>{isEn ? "Candlesticks" : "ক্যান্ডেলস্টিক"}</span>
          </Link>
          <Link
            href={`/${lang}/tools/risk-calculator`}
            className="hover:text-gold transition-colors"
          >
            {isEn ? "Risk Calc" : "ক্যালকুলেটর"}
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside className={`hidden lg:block ${className}`}>
        <div className="sticky top-[4.5rem] h-[calc(100vh-5.5rem)]">
          {sidebarContent}
        </div>
      </aside>

      {/* Mobile Trigger & Drawer */}
      <div className="mb-4 lg:hidden">
        <button
          onClick={() => setMobileOpen(true)}
          className="bg-card border-border text-foreground hover:border-foreground/25 flex w-full items-center justify-between rounded-xl border px-4 py-3 text-sm font-medium transition-colors"
        >
          <div className="flex min-w-0 items-center gap-2 pr-2">
            <Menu size={16} className="text-gold shrink-0" />
            <span className="truncate">{currentModule?.title[lang]}</span>
          </div>
          <span className="bg-muted text-muted-foreground shrink-0 rounded-full px-2 py-0.5 font-mono text-[10px] tabular-nums">
            {isEn
              ? `Lesson ${activeLessonIndex + 1}/${currentModule?.lessons.length}`
              : `পাঠ ${activeLessonIndex + 1}/${currentModule?.lessons.length}`}
          </span>
        </button>

        {mobileOpen && (
          <div className="fixed inset-0 z-50 flex">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
              onClick={() => setMobileOpen(false)}
            />

            {/* Slide-over Drawer */}
            <div className="bg-background relative z-10 flex h-full w-4/5 max-w-sm flex-col p-3">
              <div className="border-border mb-2 flex items-center justify-between border-b pb-2">
                <span className="text-foreground text-xs font-bold">
                  {currentModule?.title[lang]}
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="text-muted-foreground hover:text-foreground hover:bg-panel p-1"
                >
                  <X size={16} />
                </button>
              </div>
              <div className="flex-1 overflow-hidden">{sidebarContent}</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
