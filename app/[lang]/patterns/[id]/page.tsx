import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import type { ComponentType } from "react";
import type { TOCItemType } from "fumadocs-core/toc";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Calculator } from "lucide-react";
import defaultMdxComponents from "fumadocs-ui/mdx";
import { components as customMdxComponents } from "@/mdx-components";
import { patternsSource } from "@/lib/source";
import {
  patternsData,
  patternGroups,
  Candle,
  type Pattern,
} from "@/lib/patterns-data";
import { TocSidebar } from "@/components/TocSidebar";
import { PatternDetailBriefCard } from "@/components/patterns/dynamic/PatternDetailBriefCard";
import { ShareButtons } from "@/components/share/ShareButtons";
import { DownloadPdfButton } from "@/components/pdf/DownloadPdfButton";
import { cn } from "@/lib/utils";

type Lang = "en" | "bn";
type PatternParams = Promise<{ lang?: string; id: string }>;

interface PatternFrontmatter {
  title?: string;
  description?: string;
  type?: "bullish" | "bearish" | "neutral";
  level?: "beginner" | "intermediate" | "advanced";
  candleCount?: number;
  signal?: "reversal" | "continuation" | "indecision";
  body?: ComponentType<{ components?: Record<string, unknown> }>;
  toc?: TOCItemType[];
}

const SIGNAL_LABEL: Record<
  NonNullable<PatternFrontmatter["signal"]>,
  Record<Lang, string>
> = {
  reversal: { en: "Reversal", bn: "Reversal" },
  continuation: { en: "Continuation", bn: "Continuation" },
  indecision: { en: "Indecision", bn: "Indecision" },
};

const TYPE_TONE: Record<string, string> = {
  bullish: "text-bull border-bull/30",
  bearish: "text-bear border-bear/30",
  neutral: "text-muted-foreground border-border",
};

function toLang(lang: string | undefined): Lang {
  return lang === "en" ? "en" : "bn";
}

function loadPattern(id: string, lang: Lang) {
  const mdxPage = patternsSource.getPage([id], lang);
  const pattern = patternsData.find((p) => p.id === id) ?? null;
  const data = (mdxPage?.data ?? null) as PatternFrontmatter | null;
  return { pattern, data };
}

export async function generateStaticParams() {
  const ids = new Set<string>(patternsData.map((p) => p.id));
  for (const page of patternsSource.getPages()) {
    if (page.slugs[0]) ids.add(page.slugs[0]);
  }
  return [...ids].flatMap((id) => [
    { lang: "bn", id },
    { lang: "en", id },
  ]);
}

export async function generateMetadata({
  params,
}: {
  params: PatternParams;
}): Promise<Metadata> {
  const { lang, id } = await params;
  const currentLang = toLang(lang);
  const { pattern, data } = loadPattern(id, currentLang);
  if (!pattern && !data) return {};

  return pageMetadata({
    lang: currentLang,
    path: `/patterns/${id}`,
    title: data?.title ?? pattern?.name[currentLang] ?? id,
    description: data?.description ?? pattern?.desc[currentLang] ?? "",
    type: "article",
  });
}

export default async function PatternDetailsPage({
  params,
}: {
  params: PatternParams;
}) {
  const { lang, id } = await params;
  const currentLang = toLang(lang);
  const isEn = currentLang === "en";
  const { pattern, data } = loadPattern(id, currentLang);
  if (!pattern && !data) notFound();

  const title = data?.title ?? pattern?.name[currentLang] ?? id;
  const description = data?.description ?? pattern?.desc[currentLang] ?? "";
  const group = patternGroups.find((g) => g.id === pattern?.group);
  const MDXContent = data?.body;
  const toc = data?.toc ?? [];

  const order = patternsData.findIndex((p) => p.id === id);
  const prev = order > 0 ? patternsData[order - 1] : null;
  const next =
    order >= 0 && order < patternsData.length - 1
      ? patternsData[order + 1]
      : null;
  const siblings = patternsData.filter(
    (p) => p.group === pattern?.group && p.id !== id,
  );

  return (
    <div className="wrap py-6 sm:py-8">
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-12">
        <article
          id="pattern-details-article"
          className="mx-auto w-full max-w-[820px] min-w-0 space-y-8"
        >
          <Breadcrumb
            lang={currentLang}
            groupName={group?.name[currentLang]}
            title={title}
          />

          <header className="border-border/60 space-y-4 border-b pb-6">
            <p className="eyebrow flex flex-wrap items-center gap-2">
              <span className="text-gold">
                {isEn ? "Pattern" : "Pattern"}
                {order >= 0 ? ` ${String(order + 1).padStart(2, "0")}` : ""}
              </span>
              {group && (
                <>
                  <span className="bg-border h-px w-6" aria-hidden="true" />
                  <span className="tracking-normal normal-case">
                    {group.name[currentLang]}
                  </span>
                </>
              )}
            </p>
            <h1 className="text-fg text-[clamp(34px,5vw,52px)] leading-[1.06] tracking-[-0.025em]">
              {title}
            </h1>
            {description && (
              <p className="text-muted-foreground text-base leading-relaxed sm:text-lg">
                {description}
              </p>
            )}
            <MetaRow
              data={data}
              pattern={pattern}
              lang={currentLang}
              title={title}
              description={description}
            />
          </header>

          <div
            id="pattern-main-content"
            className="lesson-prose prose dark:prose-invert prose-sm sm:prose-base prose-headings:font-normal prose-headings:tracking-tight prose-p:text-foreground/90 prose-p:leading-[1.8] prose-strong:text-foreground prose-ul:pl-5 prose-li:my-1 prose-table:text-sm prose-td:text-foreground/90 prose-hr:border-border max-w-none"
          >
            {MDXContent ? (
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
                  Candle,
                }}
              />
            ) : (
              <LegacyFallback id={id} pattern={pattern} lang={currentLang} />
            )}
          </div>

          <div data-pdf-exclude="true" className="no-print">
            <ShareButtons
              variant="bar"
              title={title}
              description={description}
              lang={currentLang}
            />
          </div>

          {siblings.length > 0 && (
            <section
              data-pdf-exclude="true"
              className="no-print border-border/60 space-y-3 border-t pt-6"
            >
              <h2 className="eyebrow">
                {isEn ? "Same family" : "একই পরিবারের pattern"}
              </h2>
              <div className="flex flex-wrap gap-2">
                {siblings.map((p) => (
                  <Link
                    key={p.id}
                    href={`/${currentLang}/patterns/${p.id}`}
                    className="border-border text-foreground hover:border-foreground/30 hover:bg-muted rounded-full border px-3 py-1 text-xs transition-colors"
                  >
                    {p.name[currentLang]}
                  </Link>
                ))}
              </div>
            </section>
          )}

          <PrevNext prev={prev} next={next} lang={currentLang} />

          <div
            data-pdf-exclude="true"
            className="no-print border-border bg-card flex flex-col items-start justify-between gap-4 rounded-2xl border p-5 sm:flex-row sm:items-center"
          >
            <p className="text-muted-foreground text-sm">
              {isEn
                ? "Every pattern trade needs a stop. Size it before you enter."
                : "প্রতিটি pattern trade-এ stop লাগে। Entry-র আগে position size ঠিক করুন।"}
            </p>
            <Link
              href={`/${currentLang}/tools/risk-calculator`}
              className="bg-foreground text-background inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-opacity hover:opacity-90"
            >
              <Calculator size={15} />
              {isEn ? "Risk calculator" : "Risk calculator"}
            </Link>
          </div>
        </article>

        <TocSidebar toc={toc} />
      </div>
    </div>
  );
}

function Breadcrumb({
  lang,
  groupName,
  title,
}: {
  lang: Lang;
  groupName?: string;
  title: string;
}) {
  return (
    <nav
      className="text-muted-foreground no-print flex flex-wrap items-center gap-2 text-xs"
      data-pdf-exclude="true"
      aria-label="Breadcrumb"
    >
      <Link
        href={`/${lang}/patterns`}
        className="hover:text-foreground transition-colors"
      >
        {lang === "en" ? "Pattern Library" : "Pattern Library"}
      </Link>
      {groupName && (
        <>
          <span className="text-muted-foreground/40">/</span>
          <span>{groupName}</span>
        </>
      )}
      <span className="text-muted-foreground/40">/</span>
      <span className="text-foreground max-w-[220px] truncate">{title}</span>
    </nav>
  );
}

function MetaRow({
  data,
  pattern,
  lang,
  title,
  description,
}: {
  data: PatternFrontmatter | null;
  pattern: Pattern | null;
  lang: Lang;
  title: string;
  description: string;
}) {
  const type =
    data?.type ??
    (pattern?.type === "reversal" ? "neutral" : pattern?.type) ??
    "neutral";
  const chips = [
    data?.candleCount
      ? `${data.candleCount} candle${data.candleCount > 1 && lang === "en" ? "s" : ""}`
      : null,
    data?.signal ? SIGNAL_LABEL[data.signal][lang] : null,
    data?.level ?? null,
  ].filter((c): c is string => Boolean(c));

  return (
    <div
      className="flex flex-wrap items-center gap-2 pt-1 text-xs print:hidden"
      data-pdf-exclude="true"
    >
      <span
        className={cn(
          "rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-semibold tracking-wider uppercase",
          TYPE_TONE[type] ?? TYPE_TONE.neutral,
        )}
      >
        {type}
      </span>
      {chips.map((chip) => (
        <span
          key={chip}
          className="bg-muted text-muted-foreground rounded-full px-2.5 py-0.5 font-mono text-[11px]"
        >
          {chip}
        </span>
      ))}
      <div className="ml-auto flex items-center gap-2">
        <DownloadPdfButton title={title} lang={lang} />
        <ShareButtons
          variant="dropdown"
          title={title}
          description={description}
          lang={lang}
        />
      </div>
    </div>
  );
}

/** Pattern without an MDX article yet: show the quick brief and the short notes from patternsData. */
function LegacyFallback({
  id,
  pattern,
  lang,
}: {
  id: string;
  pattern: Pattern | null;
  lang: Lang;
}) {
  const isEn = lang === "en";
  return (
    <div className="not-prose space-y-6">
      <PatternDetailBriefCard patternId={id} lang={lang} />
      {pattern && (
        <div className="border-border bg-card space-y-3 rounded-2xl border p-5 text-sm leading-relaxed">
          <p className="text-foreground/90">{pattern.psychology[lang]}</p>
          <p className="text-foreground/90">{pattern.howToTrade[lang]}</p>
        </div>
      )}
      <p className="text-muted-foreground font-mono text-xs">
        {isEn
          ? "Full field guide for this pattern is being written."
          : "এই pattern-এর পূর্ণ গাইড লেখা হচ্ছে।"}
      </p>
    </div>
  );
}

function PrevNext({
  prev,
  next,
  lang,
}: {
  prev: Pattern | null;
  next: Pattern | null;
  lang: Lang;
}) {
  const isEn = lang === "en";
  const card =
    "border-border bg-card hover:border-foreground/25 hover:shadow-soft group flex flex-col justify-between space-y-1.5 rounded-xl border p-5 transition-all";
  return (
    <nav
      data-pdf-exclude="true"
      className="no-print grid grid-cols-1 gap-4 sm:grid-cols-2"
      aria-label="Pattern navigation"
    >
      {prev ? (
        <Link href={`/${lang}/patterns/${prev.id}`} className={card}>
          <span className="text-muted-foreground flex items-center gap-1 font-mono text-[11px]">
            <ArrowLeft
              size={12}
              className="text-gold transition-transform group-hover:-translate-x-1"
            />
            {isEn ? "Previous pattern" : "আগের pattern"}
          </span>
          <span className="text-foreground line-clamp-1 text-[15px] font-medium tracking-tight">
            {prev.name[lang]}
          </span>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={`/${lang}/patterns/${next.id}`}
          className={cn(card, "items-end text-right")}
        >
          <span className="text-muted-foreground flex items-center gap-1 font-mono text-[11px]">
            {isEn ? "Next pattern" : "পরের pattern"}
            <ArrowRight
              size={12}
              className="text-gold transition-transform group-hover:translate-x-1"
            />
          </span>
          <span className="text-foreground line-clamp-1 text-[15px] font-medium tracking-tight">
            {next.name[lang]}
          </span>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
