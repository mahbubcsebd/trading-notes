import type { Metadata } from "next";
import { dictionaries, type Locale } from "@/lib/dictionaries";
import { PageHeader } from "@/components/layout/PageHeader";
import { RiskCalculator } from "@/components/tools/RiskCalculator";
import { pageMetadata } from "@/lib/seo";

const toLocale = (lang?: string): Locale => (lang === "en" ? "en" : "bn");

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang?: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const t = dictionaries[toLocale(lang)].riskCalc;
  return pageMetadata({
    lang: toLocale(lang),
    path: "/tools/risk-calculator",
    title: t.title,
    description: t.desc,
  });
}

export default async function RiskCalculatorPage({
  params,
}: {
  params: Promise<{ lang?: string }>;
}) {
  const { lang } = await params;
  const locale = toLocale(lang);
  const t = dictionaries[locale].riskCalc;

  return (
    <div className="min-h-screen">
      <PageHeader
        eyebrow={
          locale === "en" ? "Tool · Position size" : "Tool · Position size"
        }
        title={t.title}
        desc={t.desc}
      />
      <div className="wrap py-12 md:py-16">
        <RiskCalculator lang={locale} />
      </div>
    </div>
  );
}
