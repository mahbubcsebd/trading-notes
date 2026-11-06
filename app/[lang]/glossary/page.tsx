import type { Metadata } from "next";
import glossary from "@/content/glossary.json";
import { dictionaries, Locale } from "@/lib/dictionaries";
import GlossaryExplorer, { GlossaryItem } from "@/components/GlossaryExplorer";
import { PageHeader } from "@/components/layout/PageHeader";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang?: string }>;
}): Promise<Metadata> {
  const { lang = "bn" } = await params;
  const isBn = lang === "bn";
  return pageMetadata({
    lang,
    path: "/glossary",
    title: isBn
      ? "ট্রেডিং শব্দকোষ ও পরিভাষা"
      : "Trading Glossary & Terminology",
    description: isBn
      ? "ফরেক্স, গোল্ড, এসএমসি ও প্রাইস অ্যাকশনের গুরুত্বপূর্ণ ট্রেডিং পরিভাষার সহজ ও প্রফেশনাল বাংলা গাইড।"
      : "Comprehensive institutional and retail trading glossary with technical definitions, mechanics, and practical trading rules.",
  });
}

export default async function GlossaryPage({
  params,
}: {
  params: Promise<{ lang?: string }>;
}) {
  const { lang = "bn" } = await params;
  const locale: Locale = lang === "en" ? "en" : "bn";
  const t = dictionaries[locale].glossary;
  const items = glossary as GlossaryItem[];
  const categoryCount = new Set(items.map((i) => i.category)).size;
  const fmt = (n: number) =>
    n.toLocaleString(locale === "en" ? "en-US" : "bn-BD");

  return (
    <div className="min-h-screen">
      <PageHeader
        eyebrow={t.editionBadge}
        title={t.title}
        desc={t.desc}
        stats={[
          { value: fmt(items.length), label: t.termsCount },
          {
            value: fmt(categoryCount),
            label: locale === "en" ? "Categories" : "Category",
          },
        ]}
      />
      <main className="wrap py-12 md:py-16">
        <GlossaryExplorer items={items} lang={locale} dict={t} />
      </main>
    </div>
  );
}
