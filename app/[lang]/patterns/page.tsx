import type { Metadata } from "next";
import { patternsData, Candle } from "@/lib/patterns-data";
import { patternsSource } from "@/lib/source";
import { getChartById } from "@/lib/charts";
import { ChartThumbnail } from "@/components/chart/ChartThumbnail";
import Link from "next/link";
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
    path: "/patterns",
    title: isBn
      ? "ক্যান্ডেলস্টিক প্যাটার্ন লাইব্রেরি ও অ্যানাটমি"
      : "Candlestick Pattern Library & Anatomy",
    description: isBn
      ? "ক্যান্ডেলস্টিকের সংজ্ঞা, অ্যানাটমি, কাঠামো ভিত্তিক একক ক্যান্ডেল, ২ ও ৩ ক্যান্ডেল প্যাটার্ন এবং ডায়নামিক প্রাইস অ্যাকশন কোড ভিজ্যুয়ালাইজার।"
      : "Comprehensive candlestick pattern curriculum with vector dynamic candles, OHLC anatomy, structure rules, and interactive charts.",
  });
}

// Index cards use the pattern's synthetic winning example; fall back to legacy chart.
const winChartId = (id: string) => `${id}-win-01`;

const SECTIONS = [
  {
    type: "bullish",
    pill: "pill-up",
    title: { en: "Bullish patterns", bn: "Bullish pattern" },
    blurb: {
      en: "Often read as buyers taking control after a decline.",
      bn: "পতনের পর buyer-দের নিয়ন্ত্রণ নেওয়ার ইঙ্গিত হিসেবে পড়া হয়।",
    },
  },
  {
    type: "bearish",
    pill: "pill-down",
    title: { en: "Bearish patterns", bn: "Bearish pattern" },
    blurb: {
      en: "Often read as sellers taking control after an advance.",
      bn: "উত্থানের পর seller-দের নিয়ন্ত্রণ নেওয়ার ইঙ্গিত হিসেবে পড়া হয়।",
    },
  },
  {
    type: "neutral",
    pill: "pill-gold",
    title: { en: "Indecision", bn: "Indecision" },
    blurb: {
      en: "Neither side wins the period. The next candle matters.",
      bn: "কোনো পক্ষই জেতে না। পরের candle-ই আসল।",
    },
  },
] as const;

export default async function PatternsPage({
  params,
}: {
  params: Promise<{ lang?: string }>;
}) {
  const { lang = "bn" } = await params;
  const currentLang = (lang === "en" ? "en" : "bn") as "en" | "bn";
  const isEn = currentLang === "en";

  // Merge patternsData with any patterns discovered via patternsSource
  const mdxPages = patternsSource.getPages(currentLang);
  const patternMap = new Map<
    string,
    {
      id: string;
      group: string;
      level: string;
      name: string;
      desc: string;
      type: string;
      candles: any[];
      chart: any;
    }
  >();

  for (const p of patternsData) {
    const chart = getChartById(winChartId(p.id)) ?? getChartById(`${p.id}-01`);
    patternMap.set(p.id, {
      id: p.id,
      group: p.group,
      level: p.level,
      name: p.name[currentLang],
      desc: p.desc[currentLang],
      type: p.type,
      candles: p.candles,
      chart,
    });
  }

  for (const page of mdxPages) {
    const slug = page.slugs[0];
    if (!slug) continue;
    const existing = patternMap.get(slug);
    const mdxData = page.data as any;
    const chart =
      getChartById(winChartId(slug)) ||
      getChartById(mdxData?.chartId ?? `${slug}-01`) ||
      existing?.chart ||
      null;

    if (existing) {
      patternMap.set(slug, {
        ...existing,
        name: mdxData?.title || existing.name,
        desc: mdxData?.description || existing.desc,
        type: mdxData?.type || existing.type,
        chart,
      });
    } else {
      patternMap.set(slug, {
        id: slug,
        group: "momentum-indecision",
        level: "intermediate",
        name: mdxData?.title || slug,
        desc: mdxData?.description || "",
        type: mdxData?.type || "reversal",
        candles: [],
        chart,
      });
    }
  }

  const allPatterns = Array.from(patternMap.values());
  const fmt = (n: number) => n.toLocaleString(isEn ? "en-US" : "bn-BD");

  const countOf = (type: string) =>
    fmt(allPatterns.filter((p) => p.type === type).length);

  return (
    <>
      <PageHeader
        eyebrow="Pattern library"
        title={isEn ? "Candlestick patterns" : "Candlestick pattern"}
        desc={
          isEn
            ? "Each pattern is a clue about who controlled a period, not a signal on its own. Read it together with the trend and the level it appears at."
            : "প্রতিটি pattern জানায় একটি সময়ে কে নিয়ন্ত্রণে ছিল — এটা একা কোনো signal না। trend আর যে level-এ তৈরি হয়েছে তার সঙ্গে মিলিয়ে পড়ো।"
        }
        stats={[
          { value: fmt(allPatterns.length), label: isEn ? "Patterns" : "Pattern" },
          ...SECTIONS.map((s) => ({ value: countOf(s.type), label: s.title[currentLang] })),
        ]}
      />
      <div className="wrap py-12 md:py-16">
      <div className="grid gap-14">
        {SECTIONS.map((s) => {
          const items = allPatterns.filter((p) => p.type === s.type);
          if (items.length === 0) return null;
          return (
            <section key={s.type} aria-labelledby={`h-${s.type}`}>
              <div className="mb-5 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <h2 id={`h-${s.type}`} className="text-[30px]">
                  {s.title[currentLang]}
                </h2>
                <p className="text-mute text-sm">{s.blurb[currentLang]}</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((p) => (
                  <Link
                    key={p.id}
                    href={`/${currentLang}/patterns/${p.id}`}
                    className="card group hover:border-mute flex flex-col gap-4 transition-colors"
                  >
                    <div className="bg-bg2 grid h-28 place-items-center overflow-hidden rounded-xl">
                      {p.chart ? (
                        <ChartThumbnail
                          candles={p.chart.candles}
                          annotations={p.chart.annotations}
                          className="h-28"
                        />
                      ) : (
                        <div className="flex items-center gap-2">
                          {p.candles.map((c: any, i: number) => (
                            <Candle
                              key={i}
                              color={c.color}
                              bodyH={c.bodyH}
                              topW={c.topW}
                              botW={c.botW}
                              offset={c.offset}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="group-hover:text-gold text-[22px] transition-colors">
                          {p.name}
                        </h3>
                        <span className={`pill ${s.pill}`}>{p.level}</span>
                      </div>
                      <p className="text-fg2 mt-1.5 line-clamp-2 text-sm">
                        {p.desc}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
      </div>
    </>
  );
}
