// @ts-nocheck
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { source } from "@/lib/source";
import Link from "next/link";
import { localeAlternates } from "@/lib/seo";
import { PageHeader } from "@/components/layout/PageHeader";
import { ChevronRight } from "lucide-react";

export async function generateStaticParams() {
  const allTags = new Set();
  for (const page of source.getPages()) {
    for (const tag of page.data.tags ?? []) {
      allTags.add(tag);
    }
  }
  return [...allTags].map((tag) => ({ tag }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string; lang?: string }>;
}): Promise<Metadata> {
  const { tag, lang = "bn" } = await params;
  // Thin listing page: keep out of the index, still let crawlers follow lesson links.
  return {
    title: `#${tag}`,
    alternates: localeAlternates(lang, `/tags/${encodeURIComponent(tag)}`),
    robots: { index: false, follow: true },
  };
}

export default async function TagPage({ params }) {
  const { tag, lang } = await params;
  const pages = source.getPages(lang).filter((p) => p.data.tags?.includes(tag));
  if (!pages.length) notFound();

  const isEn = lang === "en";
  return (
    <>
      <PageHeader
        eyebrow={isEn ? "Tag" : "ট্যাগ"}
        title={`#${tag}`}
        stats={[{ value: pages.length, label: isEn ? "Lessons" : "Lesson" }]}
      />
      <div className="wrap py-12">
        <ol className="border-line border-t">
          {pages.map((page, i) => (
            <li key={page.url} className="border-line border-b">
              <Link
                href={page.url}
                className="group hover:bg-bg2 flex items-baseline gap-6 px-2 py-5 transition-colors"
              >
                <span className="text-mute group-hover:text-gold w-8 shrink-0 font-mono text-sm tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="font-display group-hover:text-gold block text-xl transition-colors">
                    {page.data.title}
                  </span>
                  {page.data.description && (
                    <span className="text-fg2 mt-1 block text-sm">
                      {page.data.description}
                    </span>
                  )}
                </span>
                <ChevronRight size={16} className="text-mute shrink-0" />
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
