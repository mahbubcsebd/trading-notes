import type { Metadata } from "next";
import { dictionaries, Locale } from "@/lib/dictionaries";
import { getAllCharts, toChartSummary } from "@/lib/charts";
import { ChartsExplorer } from "@/components/chart/ChartsExplorer";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/layout/PageHeader";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang?: string }>;
}): Promise<Metadata> {
  const { lang = "bn" } = await params;
  const isBn = lang === "bn";
  return pageMetadata({
    lang,
    path: "/charts",
    title: isBn ? "চার্ট লাইব্রেরি ও গ্যালারি" : "Chart Library & Gallery",
    description: isBn
      ? "ফরেক্স, গোল্ড, এসএমসি ও প্রাইস অ্যাকশনের সংরক্ষিত অ্যানোটেটেড ট্রেডিং চার্টসমূহ — ফিল্টার, রিভাইজ ও রিপ্লে করুন।"
      : "Comprehensive repository of annotated trading charts for Forex, Gold, SMC, and Price Action with interactive replay and filters.",
  });
}

export default async function ChartsPage({
  params,
}: {
  params: Promise<{ lang?: string }>;
}) {
  const { lang = "bn" } = await params;
  const locale: Locale = lang === "en" ? "en" : "bn";
  const isEn = locale === "en";
  const t = dictionaries[locale].charts;
  const charts = getAllCharts();
  const fmt = (n: number) => n.toLocaleString(isEn ? "en-US" : "bn-BD");
  const symbolCount = new Set(charts.map((c) => c.symbol)).size;

  return (
    <>
      <PageHeader
        eyebrow="Chart library"
        title={t.title}
        desc={`${t.desc} ${
          isEn
            ? "Most charts are synthetic teaching examples and are labelled as such."
            : "বেশিরভাগ চার্ট synthetic teaching example — সেভাবেই label করা আছে।"
        }`}
        stats={[
          { value: fmt(charts.length), label: isEn ? "Examples" : "Example" },
          { value: fmt(symbolCount), label: isEn ? "Symbols" : "Symbol" },
        ]}
      />
      <div className="wrap py-12 md:py-16">
        <ChartsExplorer
          charts={charts.map((c) => toChartSummary(c, locale))}
          lang={locale}
          dict={t}
        />
      </div>
    </>
  );
}
