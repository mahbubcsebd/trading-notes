import type { Metadata } from 'next';
import { dictionaries, Locale } from '@/lib/dictionaries';
import { patternsData, patternGroups, patternReadingRules, Candle } from '@/lib/patterns-data';
import { patternsSource } from '@/lib/source';
import { getChartById } from '@/lib/charts';
import { ChartThumbnail } from '@/components/chart/ChartThumbnail';
import Link from 'next/link';
import { ArrowRight, Sparkles, BookOpen, Compass, CheckCircle2, ShieldAlert, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang?: string }>;
}): Promise<Metadata> {
  const { lang = 'bn' } = await params;
  const isBn = lang === 'bn';
  return {
    title: isBn ? 'ক্যান্ডেলস্টিক প্যাটার্ন লাইব্রেরি | TradeNotes' : 'Candlestick Pattern Library | TradeNotes',
    description: isBn
      ? '২৮টি প্রাইস অ্যাকশন ক্যান্ডেলস্টিক প্যাটার্ন — রিয়েল চার্ট ভিজ্যুয়াল, মার্কেট সাইকোলজি এবং প্রফেশনাল এক্সিকিউশন গাইড।'
      : 'Comprehensive 28-pattern candlestick curriculum with interactive charts, institutional psychology, and execution rules.',
  };
}

// Map pattern id to corresponding chart id in content/charts
const PATTERN_CHART_MAP: Record<string, string> = {
  'bullish-engulfing': 'bullish-engulfing-01',
  'bearish-engulfing': 'bearish-engulfing-01',
  'hammer': 'hammer-01',
  'shooting-star': 'shooting-star-01',
  'doji': 'doji-indecision-01',
  'morning-star': 'morning-star-01',
  'evening-star': 'evening-star-01',
  'inverted-hammer': 'inverted-hammer-01',
  'hanging-man': 'hanging-man-01',
  'tweezer-bottom': 'tweezer-bottom-01',
  'tweezer-top': 'tweezer-top-01',
  'three-white-soldiers': 'three-white-soldiers-01',
  'three-black-crows': 'three-black-crows-01',
  'bullish-harami': 'bullish-harami-01',
  'bearish-harami': 'bearish-harami-01',
  'marubozu': 'marubozu-01',
};

export default async function PatternsPage({ params }: { params: Promise<{ lang?: string }> }) {
  const { lang = 'bn' } = await params;
  const currentLang = (lang === 'en' ? 'en' : 'bn') as 'en' | 'bn';
  const isEn = currentLang === 'en';
  const t = dictionaries[currentLang].patterns;

  // Merge patternsData with any patterns discovered via patternsSource
  const mdxPages = patternsSource.getPages(currentLang);
  const patternMap = new Map<string, {
    id: string;
    group: string;
    level: string;
    name: string;
    desc: string;
    type: string;
    candles: any[];
    chart: any;
  }>();

  for (const p of patternsData) {
    const chartId = PATTERN_CHART_MAP[p.id] || `${p.id}-01`;
    const chart = getChartById(chartId);
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
    const chartId = mdxData?.chartId || PATTERN_CHART_MAP[slug] || `${slug}-01`;
    const chart = getChartById(chartId) || existing?.chart || null;

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
        group: 'momentum-indecision',
        level: 'intermediate',
        name: mdxData?.title || slug,
        desc: mdxData?.description || '',
        type: mdxData?.type || 'reversal',
        candles: [],
        chart,
      });
    }
  }

  const allPatterns = Array.from(patternMap.values());

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <header className="relative overflow-hidden rounded-3xl border border-border/80 bg-gradient-to-b from-card via-card to-background p-6 sm:p-10 shadow-2xl">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-4 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gold/15 text-gold border border-gold/30">
                <Sparkles className="w-3.5 h-3.5" />
                {allPatterns.length} {isEn ? 'Patterns Master Curriculum' : 'টি প্যাটার্ন মাস্টার কারিকুলাম'}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-muted/60 text-muted-foreground border border-border">
                <BookOpen className="w-3.5 h-3.5 text-foreground" />
                {isEn ? 'English Edition' : 'বাংলা সংস্করণ'}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-panel text-muted-foreground border border-border">
                <Layers className="w-3.5 h-3.5 text-gold" />
                {patternGroups.length} {isEn ? 'Learning Modules' : 'টি লার্নিং মডিউল'}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight">
              {t.title}
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              {t.desc}
            </p>
          </div>
        </header>

        {/* 6 Core Candlestick Reading Rules Banner */}
        <section className="rounded-3xl border border-border/80 bg-card p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 pb-4 border-b border-border/60">
            <div className="w-10 h-10 rounded-xl bg-gold/15 text-gold flex items-center justify-center font-bold">
              <Compass size={20} />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                {isEn ? '6 Golden Rules of Candlestick Reading' : 'ক্যান্ডেলস্টিক রিডিংয়ের ৬টি মৌলিক নিয়ম'}
              </h2>
              <p className="text-sm text-muted-foreground">
                {isEn
                  ? 'Professional price action criteria to prevent retail fakeouts and low-probability traps.'
                  : 'প্রাইস অ্যাকশন ট্রেডিংয়ে ভুল ফাঁদে পা না দিয়ে উচ্চ সফলতার সেটআপ চেনার শর্তাবলি।'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {patternReadingRules.map((rule, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border border-border/80 bg-panel/60 hover:border-gold/40 transition-colors space-y-2"
              >
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-gold/15 text-gold font-mono font-bold text-xs flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <h3 className="text-sm font-bold text-foreground">
                    {rule.title[currentLang]}
                  </h3>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed pl-8">
                  {rule.detail[currentLang]}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Curriculum by Learning Groups */}
        <div className="space-y-12">
          {patternGroups.map((group) => {
            const groupPatterns = allPatterns.filter((p) => p.group === group.id);
            if (groupPatterns.length === 0) return null;

            return (
              <section key={group.id} className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-3 border-b border-border/60">
                  <div>
                    <div className="text-xs font-mono font-semibold text-gold uppercase tracking-wider">
                      Module 0{group.order}
                    </div>
                    <h2 className="text-2xl font-bold text-foreground mt-0.5">
                      {group.name[currentLang]}
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      {group.desc[currentLang]}
                    </p>
                  </div>
                  <span className="text-xs font-mono text-muted-foreground bg-panel px-3 py-1 rounded-full border border-border/80 shrink-0">
                    {groupPatterns.length} {isEn ? 'patterns' : 'টি প্যাটার্ন'}
                  </span>
                </div>

                {/* Pattern Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {groupPatterns.map((pattern) => {
                    const chart = pattern.chart;
                    const biasColor =
                      pattern.type === 'bullish'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        : pattern.type === 'bearish'
                        ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                        : 'bg-muted/40 text-muted-foreground border-border/60';

                    const levelBadge =
                      pattern.level === 'essential'
                        ? 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10'
                        : pattern.level === 'advanced'
                        ? 'text-purple-400 border-purple-500/30 bg-purple-500/10'
                        : 'text-amber-400 border-amber-500/30 bg-amber-500/10';

                    return (
                      <Link
                        href={`/${currentLang}/patterns/${pattern.id}`}
                        key={pattern.id}
                        className="group relative flex flex-col rounded-2xl border border-border/80 bg-card overflow-hidden shadow-md hover:shadow-xl hover:border-gold/50 transition-all duration-200"
                      >
                        {/* Visual Thumbnail Area (Real Chart or Crisp Candlestick Miniature) */}
                        <div className="relative border-b border-border/60 overflow-hidden bg-panel/70">
                          {chart ? (
                            <ChartThumbnail
                              candles={chart.candles}
                              annotations={chart.annotations}
                              className="h-44"
                            />
                          ) : pattern.candles && pattern.candles.length > 0 ? (
                            <div className="h-44 w-full flex items-center justify-center relative overflow-hidden bg-zinc-950/60">
                              <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_14px]" />
                              <div className="flex items-center justify-center gap-2 relative z-10">
                                {pattern.candles.map((c: any, i: number) => (
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
                            </div>
                          ) : (
                            <div className="h-44 w-full flex items-center justify-center text-xs text-muted-foreground font-mono">
                              {isEn ? 'Pattern Visual' : 'প্যাটার্ন ভিজ্যুয়াল'}
                            </div>
                          )}

                          {/* Badges on top-right of visual */}
                          <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5">
                            {chart && (
                              <span className="font-mono text-[10px] font-bold text-gold px-2 py-0.5 rounded-full bg-background/80 backdrop-blur-md border border-gold/30">
                                {chart.symbol} · {chart.timeframe}
                              </span>
                            )}
                            <span
                              className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full backdrop-blur-md border ${biasColor}`}
                            >
                              {pattern.type}
                            </span>
                          </div>

                          {/* Level badge on top-left of visual */}
                          {pattern.level && (
                            <div className="absolute top-3 left-3 z-10">
                              <span
                                className={`px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider rounded-full backdrop-blur-md border ${levelBadge}`}
                              >
                                {pattern.level}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Content Area */}
                        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                          <div className="space-y-2">
                            <h3 className="text-lg font-bold text-foreground group-hover:text-gold transition-colors">
                              {pattern.name}
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                              {pattern.desc}
                            </p>
                          </div>

                          <div className="pt-3 border-t border-border/50 flex items-center justify-between text-xs font-medium text-gold group-hover:translate-x-0.5 transition-transform">
                            <span>{t.viewDetails}</span>
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
