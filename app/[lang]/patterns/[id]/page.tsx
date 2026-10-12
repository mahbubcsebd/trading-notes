import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import {
  ArrowLeft,
  Target,
  ShieldAlert,
  Brain,
  Sparkles,
  BookOpen,
  CheckCircle,
  XCircle,
  TrendingDown,
  TrendingUp,
  Layers,
  Flame,
  Award,
  Zap,
  Calculator,
  Compass,
  Sliders,
  CheckCircle2,
  Clock,
  FileSpreadsheet,
  HelpCircle,
  Library,
  AlertTriangle,
} from 'lucide-react';
import { patternsSource } from '@/lib/source';
import { patternsData, Candle } from '@/lib/patterns-data';
import { getChartById } from '@/lib/charts';
import { CandleChart } from '@/components/chart/CandleChart';
import { getPatternDeepGuide } from '@/lib/pattern-deep-data';
import { PatternChecklist } from '@/components/patterns/PatternChecklist';
import { PatternQuiz } from '@/components/patterns/PatternQuiz';
import { cn } from '@/lib/utils';

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

export async function generateStaticParams() {
  const pages = patternsSource.getPages();
  const params: { lang: string; id: string }[] = [];

  for (const page of pages) {
    const slug = page.slugs[0];
    if (slug) {
      params.push({ lang: page.locale || 'bn', id: slug });
    }
  }

  for (const p of patternsData) {
    params.push({ lang: 'bn', id: p.id });
    params.push({ lang: 'en', id: p.id });
  }

  const seen = new Set<string>();
  return params.filter((item) => {
    const key = `${item.lang}-${item.id}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang?: string; id: string }>;
}): Promise<Metadata> {
  const { lang = 'bn', id } = await params;
  const currentLang = (lang === 'en' ? 'en' : 'bn') as 'en' | 'bn';

  const mdxPage = patternsSource.getPage([id], currentLang);
  const pattern = patternsData.find((p) => p.id === id);
  const deepGuide = getPatternDeepGuide(id);

  if (!pattern && !mdxPage) return {};

  const title = deepGuide
    ? deepGuide.name[currentLang]
    : mdxPage?.data?.title || pattern?.name[currentLang] || id;

  const description = deepGuide
    ? deepGuide.tagline[currentLang]
    : mdxPage?.data?.description || pattern?.desc[currentLang] || '';

  return {
    title: `${title} | TradeNotes`,
    description,
  };
}

export default async function PatternDetailsPage({
  params,
}: {
  params: Promise<{ lang?: string; id: string }>;
}) {
  const { lang = 'bn', id } = await params;
  const currentLang = (lang === 'en' ? 'en' : 'bn') as 'en' | 'bn';

  const mdxPage = patternsSource.getPage([id], currentLang);
  const pattern = patternsData.find((p) => p.id === id);

  if (!pattern && !mdxPage) return notFound();

  const mdxData = mdxPage?.data as any;
  const chartId = mdxData?.chartId || PATTERN_CHART_MAP[id] || `${id}-01`;
  const chart = chartId ? getChartById(chartId) : null;
  const deep = getPatternDeepGuide(id);

  const isEn = currentLang === 'en';

  const title = deep
    ? deep.name[currentLang]
    : mdxData?.title || pattern?.name[currentLang] || id;

  const tagline = deep
    ? deep.tagline[currentLang]
    : mdxData?.description || pattern?.desc[currentLang] || '';

  const summary = deep
    ? deep.summary[currentLang]
    : pattern?.psychology?.[currentLang] || '';

  const patternType = mdxData?.type || pattern?.type || 'reversal';
  const MDXContent = mdxData?.body;

  // Custom components to pass to Fumadocs MDX runner
  const mdxComponents = {
    ...defaultMdxComponents,
    Candle,
    CandleChart,
    PatternChecklist,
    PatternQuiz,
    Target,
    Brain,
    ShieldAlert,
    Zap,
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between">
        <Link
          href={`/${currentLang}/patterns`}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors font-medium"
        >
          <ArrowLeft size={16} />
          {isEn ? 'Back to Pattern Library' : 'প্যাটার্ন লাইব্রেরিতে ফিরে যান'}
        </Link>

        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
          <Link href={`/${currentLang}/charts`} className="hover:text-gold transition-colors">
            {isEn ? 'Chart Gallery' : 'চার্ট গ্যালারি'}
          </Link>
          <span>·</span>
          <Link href={`/${currentLang}/glossary`} className="hover:text-gold transition-colors">
            {isEn ? 'Glossary' : 'শব্দকোষ'}
          </Link>
          <span>·</span>
          <Link href={`/${currentLang}/tools/risk-calculator`} className="hover:text-gold transition-colors">
            {isEn ? 'Risk Calculator' : 'রিস্ক ক্যালকুলেটর'}
          </Link>
        </div>
      </div>

      {/* Hero Header */}
      <header className="relative overflow-hidden rounded-3xl border border-border/80 bg-gradient-to-br from-card via-card to-background p-6 sm:p-10 shadow-2xl space-y-6">
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4 max-w-4xl">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={cn(
                'px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full border flex items-center gap-1.5',
                patternType === 'bearish'
                  ? 'text-rose-400 border-rose-500/30 bg-rose-500/10'
                  : 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10'
              )}
            >
              {patternType === 'bearish' ? <TrendingDown size={14} /> : <TrendingUp size={14} />}
              {deep ? deep.badge[currentLang] : patternType}
            </span>

            {chart && (
              <span className="font-mono text-xs font-bold text-gold px-3 py-1 rounded-full bg-gold/10 border border-gold/30">
                {chart.symbol} · {chart.timeframe}
              </span>
            )}

            <span className="text-xs font-mono text-muted-foreground px-2.5 py-1 rounded-full bg-panel border border-border">
              {isEn ? 'Institutional Price Action' : 'প্রাতিষ্ঠানিক প্রাইস অ্যাকশন'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
            {title}
          </h1>

          {tagline && (
            <p className="text-lg sm:text-xl text-gold font-medium leading-relaxed">
              {tagline}
            </p>
          )}

          {summary && (
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-3xl">
              {summary}
            </p>
          )}
        </div>

        {/* Key Strategy Metrics Grid */}
        {deep ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-6 border-t border-border/60">
            <div className="p-3.5 rounded-xl bg-panel/70 border border-border/80">
              <div className="text-[11px] font-mono uppercase text-muted-foreground">
                {isEn ? 'Pattern Type' : 'প্যাটার্ন টাইপ'}
              </div>
              <div className="text-sm font-bold text-foreground mt-1">{deep.stats.category[currentLang]}</div>
            </div>

            <div className="p-3.5 rounded-xl bg-panel/70 border border-border/80">
              <div className="text-[11px] font-mono uppercase text-muted-foreground">
                {isEn ? 'Confluence Winrate' : 'উইনরেট (কনফ্লুয়েন্স)'}
              </div>
              <div className="text-sm font-bold text-emerald-400 mt-1">{deep.stats.winrate[currentLang]}</div>
            </div>

            <div className="p-3.5 rounded-xl bg-panel/70 border border-border/80">
              <div className="text-[11px] font-mono uppercase text-muted-foreground">
                {isEn ? 'Best Timeframes' : 'সেরা টাইমফ্রেম'}
              </div>
              <div className="text-sm font-bold text-gold mt-1">{deep.stats.bestTimeframes.join(', ')}</div>
            </div>

            <div className="p-3.5 rounded-xl bg-panel/70 border border-border/80">
              <div className="text-[11px] font-mono uppercase text-muted-foreground">
                {isEn ? 'Target R:R' : 'টার্গেট R:R'}
              </div>
              <div className="text-sm font-bold text-foreground mt-1">{deep.stats.riskReward}</div>
            </div>

            <div className="p-3.5 rounded-xl bg-panel/70 border border-border/80">
              <div className="text-[11px] font-mono uppercase text-muted-foreground">
                {isEn ? 'Max Risk / Trade' : 'সর্বোচ্চ রিস্ক / ট্রেড'}
              </div>
              <div className="text-sm font-bold text-rose-400 mt-1">{deep.stats.maxRiskPerTrade}</div>
            </div>

            <div className="p-3.5 rounded-xl bg-panel/70 border border-border/80">
              <div className="text-[11px] font-mono uppercase text-muted-foreground">
                {isEn ? 'Key Location' : 'আদর্শ লোকেশন'}
              </div>
              <div className="text-xs font-semibold text-foreground mt-1 leading-snug">
                {deep.stats.bestLocation[currentLang]}
              </div>
            </div>
          </div>
        ) : (
          mdxData?.winrate && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-border/60">
              <div className="p-3.5 rounded-xl bg-panel/70 border border-border/80">
                <div className="text-[11px] font-mono uppercase text-muted-foreground">
                  {isEn ? 'Winrate' : 'উইনরেট'}
                </div>
                <div className="text-sm font-bold text-emerald-400 mt-1">{mdxData.winrate}</div>
              </div>
              <div className="p-3.5 rounded-xl bg-panel/70 border border-border/80">
                <div className="text-[11px] font-mono uppercase text-muted-foreground">
                  {isEn ? 'Target R:R' : 'টার্গেট R:R'}
                </div>
                <div className="text-sm font-bold text-foreground mt-1">{mdxData.riskReward || '1:2+'}</div>
              </div>
              <div className="p-3.5 rounded-xl bg-panel/70 border border-border/80">
                <div className="text-[11px] font-mono uppercase text-muted-foreground">
                  {isEn ? 'Max Risk' : 'সর্বোচ্চ রিস্ক'}
                </div>
                <div className="text-sm font-bold text-rose-400 mt-1">{mdxData.maxRisk || '1% - 2%'}</div>
              </div>
              <div className="p-3.5 rounded-xl bg-panel/70 border border-border/80">
                <div className="text-[11px] font-mono uppercase text-muted-foreground">
                  {isEn ? 'Best Location' : 'আদর্শ স্থান'}
                </div>
                <div className="text-xs font-semibold text-foreground mt-1">{mdxData.bestLocation || 'Key S/R'}</div>
              </div>
            </div>
          )
        )}
      </header>

      {/* Anatomy & Strict Rules (if deep guide exists) */}
      {deep && (
        <section className="rounded-3xl border border-border/80 bg-card p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 pb-4 border-b border-border/60">
            <div className="w-10 h-10 rounded-xl bg-gold/15 text-gold flex items-center justify-center font-bold">
              <Layers size={20} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">{deep.anatomy.title[currentLang]}</h2>
              <p className="text-sm text-muted-foreground">{deep.anatomy.desc[currentLang]}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {deep.anatomy.rules.map((rule, idx) => (
              <div
                key={idx}
                className={cn(
                  'p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between space-y-3',
                  rule.highlight
                    ? 'bg-rose-500/10 border-rose-500/40 shadow-sm'
                    : 'bg-panel/60 border-border/80 hover:border-border'
                )}
              >
                <div>
                  <h3
                    className={cn(
                      'text-base font-bold',
                      rule.highlight ? 'text-rose-300' : 'text-foreground'
                    )}
                  >
                    {rule.title[currentLang]}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-2">
                    {rule.detail[currentLang]}
                  </p>
                </div>
                {rule.highlight && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono uppercase text-rose-400 font-semibold bg-rose-500/10 px-2 py-0.5 rounded w-max">
                    ★ {isEn ? 'Crucial Filter' : 'অপরিহার্য ফিল্টার'}
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Variations & Form Grades (Section 5) */}
      {deep?.variations && deep.variations.length > 0 && (
        <section className="rounded-3xl border border-border/80 bg-card p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 pb-4 border-b border-border/60">
            <div className="w-10 h-10 rounded-xl bg-gold/15 text-gold flex items-center justify-center font-bold">
              <Sliders size={20} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                {isEn ? 'Pattern Variations & Structural Quality' : 'প্যাটার্ন ভ্যারিয়েশন ও স্ট্রাকচারাল কোয়ালিটি'}
              </h2>
              <p className="text-sm text-muted-foreground">
                {isEn
                  ? 'Identify high-conviction versions versus weak trap variations.'
                  : 'উচ্চ সাফল্যের শক্তিশালী রূপ ও দুর্বল ফাঁদগুলোর মধ্যে পার্থক্য বুঝুন।'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {deep.variations.map((v, idx) => {
              const badgeStyle =
                v.quality === 'high'
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  : v.quality === 'medium'
                  ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                  : 'bg-rose-500/10 text-rose-400 border-rose-500/30';
              return (
                <div key={idx} className="p-5 rounded-2xl border border-border/80 bg-panel/60 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-foreground">{v.title[currentLang]}</h3>
                    <span className={cn('text-[10px] font-mono uppercase px-2 py-0.5 rounded-full border font-bold', badgeStyle)}>
                      {v.quality} {isEn ? 'quality' : 'মান'}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {v.desc[currentLang]}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Interactive Chart Case Study & Walkthrough */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-gold font-semibold">
              <Sparkles className="w-4 h-4" />
              {isEn ? 'Interactive Real-Market Case Study' : 'বাস্তব মার্কেট ইন্টারেক্টিভ কেস স্টাডি'}
            </div>
            <h2 className="text-2xl font-bold text-foreground mt-1">
              {deep ? deep.chartWalkthrough.title[currentLang] : (isEn ? 'Interactive Chart' : 'ইন্টারেক্টিভ চার্ট')}
            </h2>
          </div>

          {chart && (
            <Link
              href={`/${currentLang}/charts`}
              className="text-xs text-gold hover:underline font-mono inline-flex items-center gap-1"
            >
              {isEn ? 'Open in Full Chart Lab →' : 'সম্পূর্ণ চার্ট ল্যাবে দেখুন →'}
            </Link>
          )}
        </div>

        {chart ? (
          <div className="space-y-4">
            <CandleChart
              id={chart.id}
              symbol={chart.symbol}
              timeframe={chart.timeframe}
              candles={chart.candles}
              annotations={chart.annotations}
              caption={chart.caption}
              height={500}
            />

            {/* Step-by-step points explaining the chart */}
            {deep && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                {deep.chartWalkthrough.points.map((pt) => (
                  <div
                    key={pt.step}
                    className="p-4 rounded-2xl border border-border/80 bg-card/70 hover:bg-card transition-colors space-y-2"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-gold/15 text-gold font-mono font-bold text-xs flex items-center justify-center">
                        {pt.step}
                      </span>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
                        {pt.label[currentLang]}
                      </h4>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {pt.description[currentLang]}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="rounded-2xl border border-border/80 bg-card p-12 text-center text-muted-foreground text-sm font-mono">
            {isEn ? 'No chart configured for this pattern' : 'এই প্যাটার্নের জন্য কোনো চার্ট যুক্ত নেই'}
          </div>
        )}
      </section>

      {/* Rich MDX Content Guide Section (rendered directly from .bn.mdx or .en.mdx) */}
      {MDXContent && (
        <section className="rounded-3xl border border-border/80 bg-card/90 p-6 sm:p-10 shadow-xl space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-border/60">
            <div className="w-10 h-10 rounded-xl bg-gold/15 text-gold flex items-center justify-center font-bold">
              <BookOpen size={20} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                {isEn ? 'Pattern Breakdown & Comprehensive MDX Guide' : 'প্যাটার্ন বিশ্লেষণ ও বিশদ MDX গাইড'}
              </h2>
              <p className="text-sm text-muted-foreground">
                {isEn
                  ? 'Official localized handbook documentation with formulas, anatomy, and strategies.'
                  : 'অফিসিয়াল লোকালাইজড হ্যান্ডবুক গাইড — সূত্র, ক্যান্ডেল অ্যানাটমি ও কৌশলসহ।'}
              </p>
            </div>
          </div>

          <div className="prose prose-invert prose-base max-w-none
                prose-headings:text-foreground prose-headings:font-bold prose-headings:tracking-tight
                prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-4 prose-h2:border-b prose-h2:border-border/60 prose-h2:pb-2
                prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-2
                prose-p:text-foreground/90 prose-p:leading-[1.85]
                prose-li:text-foreground/90 prose-li:leading-[1.75]
                prose-strong:text-foreground prose-strong:font-bold
                prose-blockquote:border-gold prose-blockquote:bg-gold/5 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-xl">
            <MDXContent components={mdxComponents} />
          </div>
        </section>
      )}

      {/* Institutional Psychology & Mechanics (if deep guide exists) */}
      {deep && (
        <section className="rounded-3xl border border-border/80 bg-card p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 pb-4 border-b border-border/60">
            <div className="w-10 h-10 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center font-bold">
              <Brain size={20} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">{deep.psychology.title[currentLang]}</h2>
              <p className="text-sm text-muted-foreground">{deep.psychology.subtitle[currentLang]}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {deep.psychology.phases.map((ph) => (
              <div
                key={ph.step}
                className="relative rounded-2xl border border-border/80 bg-panel/70 p-6 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-gold px-2.5 py-0.5 rounded bg-gold/10 border border-gold/30">
                      Phase 0{ph.step}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{ph.title[currentLang]}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{ph.desc[currentLang]}</p>
                </div>

                <div className="pt-3 border-t border-border/50 text-xs font-medium text-rose-400">
                  {ph.role[currentLang]}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* High Probability vs Low Probability Comparison Matrix */}
      {deep && (
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">{deep.probabilityMatrix.title[currentLang]}</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {isEn
                ? 'Filter out 80% of losing trades by checking these environmental conditions before clicking Sell.'
                : 'সেল বাটনে ক্লিক করার আগে এই পরিবেশগত শর্তগুলো মিলিয়ে ৮০% ভুল ট্রেড এড়িয়ে চলুন।'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* High Probability Column */}
            <div className="rounded-3xl border border-emerald-500/30 bg-emerald-500/[0.04] p-6 sm:p-8 space-y-4 shadow-lg">
              <div className="flex items-center gap-2.5 text-emerald-400 font-bold text-lg pb-3 border-b border-emerald-500/20">
                <CheckCircle size={22} />
                <h3>{isEn ? 'A+ High Probability Setups (Look For)' : 'A+ হাই-প্রোবাবিলিটি সেটআপ (যেগুলো খুঁজবেন)'}</h3>
              </div>

              <div className="space-y-4">
                {deep.probabilityMatrix.highProbability.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                      ✓
                    </span>
                    <div>
                      <div className="text-sm font-bold text-foreground">{item.factor[currentLang]}</div>
                      <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                        {item.explanation[currentLang]}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Low Probability Column */}
            <div className="rounded-3xl border border-rose-500/30 bg-rose-500/[0.04] p-6 sm:p-8 space-y-4 shadow-lg">
              <div className="flex items-center gap-2.5 text-rose-400 font-bold text-lg pb-3 border-b border-rose-500/20">
                <XCircle size={22} />
                <h3>{isEn ? 'F-Grade Traps & Fakeouts (AVOID)' : 'ফাঁদ ও ফেকআউট (যেখানে ট্রেড নেওয়া নিষিদ্ধ)'}</h3>
              </div>

              <div className="space-y-4">
                {deep.probabilityMatrix.lowProbability.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-400 text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                      ✕
                    </span>
                    <div>
                      <div className="text-sm font-bold text-foreground">{item.factor[currentLang]}</div>
                      <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                        {item.explanation[currentLang]}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Confirmation & Hard Invalidation (Section 8) */}
      {deep?.confirmation && (
        <section className="rounded-3xl border border-border/80 bg-card p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 pb-4 border-b border-border/60">
            <div className="w-10 h-10 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center font-bold">
              <ShieldAlert size={20} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">{deep.confirmation.title[currentLang]}</h2>
              <p className="text-sm text-muted-foreground">
                {isEn
                  ? 'Objective triggers to confirm entry and clear rules when the thesis is proven false.'
                  : 'এন্ট্রি নিশ্চিত করার সুনির্দিষ্ট মাপকাঠি এবং সেটআপ বাতিলের সুস্পষ্ট শর্তাবলী।'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-3">
              <h3 className="text-xs font-mono uppercase text-emerald-400 font-bold flex items-center gap-2">
                <CheckCircle2 size={16} />
                {isEn ? 'Confirmation Triggers' : 'কনফার্মেশন মাপকাঠি'}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {deep.confirmation.confirmations.map((c, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-panel/70 border border-border/80 space-y-1">
                    <div className="text-xs font-bold text-foreground">{c.title[currentLang]}</div>
                    <div className="text-xs text-muted-foreground leading-relaxed">{c.detail[currentLang]}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 space-y-1.5">
                <div className="text-xs font-mono uppercase text-rose-400 font-bold flex items-center gap-1.5">
                  <XCircle size={15} />
                  {isEn ? 'Hard Invalidation' : 'কঠোর ইনভ্যালিডেশন'}
                </div>
                <p className="text-xs text-rose-200/90 leading-relaxed">
                  {deep.confirmation.invalidation[currentLang]}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-1.5">
                <div className="text-xs font-mono uppercase text-amber-400 font-bold flex items-center gap-1.5">
                  <Clock size={15} />
                  {isEn ? 'Time Stop' : 'টাইম স্টপ'}
                </div>
                <p className="text-xs text-amber-200/90 leading-relaxed">
                  {deep.confirmation.timeStop[currentLang]}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3 Step-by-Step Profitable Execution Strategies */}
      {deep && (
        <section className="space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-gold font-semibold">
              <Target className="w-4 h-4" />
              {isEn ? 'Execution Blueprint' : 'ট্রেড এক্সিকিউশন ব্লুপ্রিন্ট'}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mt-1">
              {isEn ? '3 Proven Ways to Trade This Pattern Profitably' : 'এই প্যাটার্নটি ট্রেড করার ৩টি প্রমাণিত লাভজনক কৌশল'}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {isEn
                ? 'Choose the entry method that best matches your risk tolerance and trading personality.'
                : 'আপনার ট্রেডিং সাইকোলজি ও রিস্ক টলারেন্সের সাথে মিল রেখে সেরা কৌশলটি বেছে নিন।'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {deep.executionStrategies.map((strat, idx) => (
              <div
                key={idx}
                className={cn(
                  'rounded-3xl border p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-xl transition-all duration-200',
                  strat.recommended
                    ? 'border-gold/50 bg-gradient-to-b from-card to-panel shadow-gold/5'
                    : 'border-border/80 bg-card hover:border-border'
                )}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase px-2.5 py-1 rounded-full bg-panel border border-border text-muted-foreground">
                      {strat.type}
                    </span>
                    {strat.recommended && (
                      <span className="font-mono text-xs font-bold text-gold px-2.5 py-1 rounded-full bg-gold/15 border border-gold/40 flex items-center gap-1">
                        <Award size={12} />
                        {isEn ? 'Pro Pick' : 'সেরা পছন্দ'}
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-foreground leading-snug">{strat.title[currentLang]}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{strat.subtitle[currentLang]}</p>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-border/60 text-xs">
                    <div className="p-3 rounded-xl bg-panel/70 border border-border/80 space-y-1">
                      <div className="font-mono font-bold uppercase text-amber-400">
                        {isEn ? 'Entry Trigger' : 'এন্ট্রি পয়েন্ট'}
                      </div>
                      <p className="text-foreground/90 leading-relaxed">{strat.entry[currentLang]}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-panel/70 border border-border/80 space-y-1">
                      <div className="font-mono font-bold uppercase text-rose-400">
                        {isEn ? 'Stop Loss' : 'স্টপ লস'}
                      </div>
                      <p className="text-foreground/90 leading-relaxed">{strat.stopLoss[currentLang]}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-panel/70 border border-border/80 space-y-1">
                      <div className="font-mono font-bold uppercase text-emerald-400">
                        {isEn ? 'Take Profit' : 'টেক প্রফিট'}
                      </div>
                      <p className="text-foreground/90 leading-relaxed">{strat.takeProfit[currentLang]}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border/60 grid grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-300">
                    <span className="font-bold block uppercase font-mono">{isEn ? 'Advantage' : 'সুবিধা'}:</span>
                    {strat.pros[currentLang]}
                  </div>
                  <div className="p-2 rounded-lg bg-rose-500/10 text-rose-300">
                    <span className="font-bold block uppercase font-mono">{isEn ? 'Tradeoff' : 'অসুবিধা'}:</span>
                    {strat.cons[currentLang]}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Trade Management: Breakeven, Scaling, Trailing Stop (Section 11) */}
      {deep?.tradeManagement && (
        <section className="rounded-3xl border border-border/80 bg-card p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 pb-4 border-b border-border/60">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center font-bold">
              <Target size={20} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">{deep.tradeManagement.title[currentLang]}</h2>
              <p className="text-sm text-muted-foreground">
                {isEn
                  ? 'Dynamic trade management rules: scaling out, breakeven moves, and trailing stops.'
                  : 'ডায়নামিক ট্রেড ম্যানেজমেন্ট — প্রফিট বুকিং, ব্রেক-ইভেন ও ট্রেইলিং স্টপ লস কৌশল।'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {deep.tradeManagement.steps.map((st, idx) => (
              <div key={idx} className="p-5 rounded-2xl border border-border/80 bg-panel/60 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 font-mono font-bold text-xs flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <h3 className="text-sm font-bold text-foreground">{st.title[currentLang]}</h3>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed pl-8">
                  {st.detail[currentLang]}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Position Sizing Worked Example (Section 12) */}
      {deep?.positionSizing && (
        <section className="rounded-3xl border border-border/80 bg-gradient-to-br from-card via-panel/60 to-card p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/60">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gold/15 text-gold flex items-center justify-center font-bold">
                <Calculator size={20} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">{deep.positionSizing.title[currentLang]}</h2>
                <p className="text-sm text-muted-foreground">{deep.positionSizing.note[currentLang]}</p>
              </div>
            </div>
            <div className="px-4 py-2 rounded-xl bg-gold/10 border border-gold/30 font-mono text-xs font-bold text-gold">
              {deep.positionSizing.formula}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {deep.positionSizing.examples.map((ex, idx) => (
              <div key={idx} className="p-6 rounded-2xl border border-border/80 bg-panel/70 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-foreground">{ex.label[currentLang]}</h3>
                  <span className="font-mono text-xs text-gold font-bold bg-gold/10 px-2.5 py-0.5 rounded border border-gold/20">
                    {ex.riskPercent}% {isEn ? 'Risk' : 'ঝুঁকি'}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-card border border-border/70">
                    <div className="text-[10px] font-mono text-muted-foreground uppercase">{isEn ? 'Account' : 'অ্যাকাউন্ট'}</div>
                    <div className="font-bold text-foreground mt-0.5">${ex.account}</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-card border border-border/70">
                    <div className="text-[10px] font-mono text-muted-foreground uppercase">{isEn ? 'Stop Dist.' : 'স্টপ দূরত্ব'}</div>
                    <div className="font-bold text-rose-400 mt-0.5">${ex.stopDistance}</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-card border border-border/70">
                    <div className="text-[10px] font-mono text-muted-foreground uppercase">{isEn ? 'Lot Size' : 'সঠিক লট'}</div>
                    <div className="font-bold text-emerald-400 mt-0.5">{ex.usedLots} lot</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-card border border-border/70">
                    <div className="text-[10px] font-mono text-muted-foreground uppercase">{isEn ? 'Dollar Risk' : 'প্রকৃত রিস্ক'}</div>
                    <div className="font-bold text-foreground mt-0.5">${ex.actualRisk}</div>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed pt-2 border-t border-border/60">
                  {ex.comment[currentLang]}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Pro Tips & Secret Insights */}
      {deep && (
        <section className="rounded-3xl border border-border/80 bg-gradient-to-br from-card via-panel/50 to-card p-6 sm:p-10 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 pb-4 border-b border-border/60">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center font-bold">
              <Zap size={20} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                {isEn ? 'Pro Tips for Long-Term Profitability' : 'ট্রেডিংয়ে ধারাবাহিকভাবে লাভবান হওয়ার প্রো টিপস'}
              </h2>
              <p className="text-sm text-muted-foreground">
                {isEn
                  ? 'Key nuances that separate profitable traders from retail gamblers.'
                  : 'যে কৌশলগুলো একজন সাধারণ ট্রেডার ও প্রফেশনাল ফান্ড ম্যানেজারের মধ্যে পার্থক্য গড়ে তোলে।'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {deep.proTips.map((tip, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-border/80 bg-card hover:border-gold/40 transition-colors space-y-2.5"
              >
                <h3 className="text-base font-bold text-gold flex items-center gap-2">
                  <Flame size={16} className="text-amber-400" />
                  {tip.title[currentLang]}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {tip.content[currentLang]}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Common Mistakes & How to Fix Them */}
      {deep && (
        <section className="rounded-3xl border border-border/80 bg-card p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 pb-4 border-b border-border/60">
            <div className="w-10 h-10 rounded-xl bg-rose-500/15 text-rose-400 flex items-center justify-center font-bold">
              <ShieldAlert size={20} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                {isEn ? 'Top Mistakes Retail Traders Make' : 'যে ভুলগুলোতে ৯০% রিটেইল ট্রেডার লস করে'}
              </h2>
              <p className="text-sm text-muted-foreground">
                {isEn
                  ? 'Fix these execution mistakes to immediately protect your capital.'
                  : 'এই মারাত্মক ভুলগুলো শুধরে নিলে আপনার মূলধন তাৎক্ষণিকভাবে সুরক্ষিত থাকবে।'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {deep.commonMistakes.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border border-border/80 bg-panel/60 space-y-3"
              >
                <div className="flex items-start gap-2 text-rose-400 font-semibold text-sm">
                  <XCircle size={18} className="shrink-0 mt-0.5" />
                  <div>
                    <span className="font-mono text-xs uppercase opacity-70 block">
                      {isEn ? 'Mistake' : 'ভুল'} #{idx + 1}
                    </span>
                    {item.mistake[currentLang]}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 leading-relaxed">
                  <strong className="block text-emerald-400 uppercase font-mono mb-1">
                    ✓ {isEn ? 'Pro Solution' : 'সঠিক সমাধান'}:
                  </strong>
                  {item.fix[currentLang]}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Interactive Confluence Checklist */}
      {deep && (
        <section className="space-y-4">
          <PatternChecklist items={deep.checklist} lang={currentLang} />
        </section>
      )}

      {/* Backtest Template (Section 16) */}
      {deep?.backtestTemplate && (
        <section className="rounded-3xl border border-border/80 bg-card p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 pb-4 border-b border-border/60">
            <div className="w-10 h-10 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center font-bold">
              <FileSpreadsheet size={20} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">{deep.backtestTemplate.title[currentLang]}</h2>
              <p className="text-sm text-muted-foreground">{deep.backtestTemplate.intro[currentLang]}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="text-xs font-mono text-muted-foreground uppercase mb-2">
                {isEn ? 'Recommended Spreadsheet Columns' : 'স্প্রেডশিটের জন্য প্রয়োজনীয় কলামসমূহ'}
              </div>
              <div className="flex flex-wrap gap-2">
                {deep.backtestTemplate.columns.map((col, idx) => (
                  <span key={idx} className="font-mono text-xs px-2.5 py-1 rounded-lg bg-panel border border-border text-foreground">
                    {col}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {deep.backtestTemplate.metrics.map((m, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-panel/70 border border-border/80 flex items-center justify-between text-xs">
                  <span className="font-bold text-foreground">{m.name[currentLang]}</span>
                  <span className="font-mono text-gold bg-gold/10 px-2 py-0.5 rounded border border-gold/20">
                    {m.formula[currentLang]}
                  </span>
                </div>
              ))}
            </div>

            <div className="p-3.5 rounded-xl bg-gold/10 border border-gold/20 text-xs text-gold flex items-center gap-2">
              <Award size={16} className="shrink-0" />
              <span>{deep.backtestTemplate.minSample[currentLang]}</span>
            </div>
          </div>
        </section>
      )}

      {/* FAQ (Section 17) */}
      {deep?.faq && deep.faq.length > 0 && (
        <section className="rounded-3xl border border-border/80 bg-card p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 pb-4 border-b border-border/60">
            <div className="w-10 h-10 rounded-xl bg-gold/15 text-gold flex items-center justify-center font-bold">
              <HelpCircle size={20} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                {isEn ? 'Frequently Asked Questions' : 'সাধারণ জিজ্ঞাসা ও উত্তর (FAQ)'}
              </h2>
              <p className="text-sm text-muted-foreground">
                {isEn
                  ? 'Clear answers to common questions about executing this pattern.'
                  : 'এই প্যাটার্নটি কার্যকর করার সময় ট্রেডারদের সচরাচর মনে ওঠা প্রশ্নের সরাসরি উত্তর।'}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {deep.faq.map((item, idx) => (
              <div key={idx} className="p-5 rounded-2xl border border-border/80 bg-panel/60 space-y-2">
                <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                  <span className="text-gold font-mono font-bold">Q:</span>
                  {item.q[currentLang]}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed pl-6">
                  {item.a[currentLang]}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Interactive Mastery Quiz (Section 18) */}
      {deep?.quiz && deep.quiz.length > 0 && (
        <section>
          <PatternQuiz questions={deep.quiz} lang={currentLang} />
        </section>
      )}

      {/* Sources, Disclaimer & Related Patterns (Section 19) */}
      {deep && (deep.sources || deep.disclaimer || deep.relatedPatterns) && (
        <section className="rounded-3xl border border-border/80 bg-panel/60 p-6 sm:p-8 space-y-6">
          {/* Related Patterns */}
          {deep.relatedPatterns && deep.relatedPatterns.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-mono uppercase text-muted-foreground tracking-wider">
                {isEn ? 'Related Candlestick Patterns' : 'সম্পর্কিত ক্যান্ডেলস্টিক প্যাটার্নসমূহ'}
              </h3>
              <div className="flex flex-wrap gap-2">
                {deep.relatedPatterns.map((relId) => (
                  <Link
                    key={relId}
                    href={`/${currentLang}/patterns/${relId}`}
                    className="px-3 py-1.5 rounded-xl bg-card border border-border text-xs text-foreground hover:border-gold/50 hover:text-gold transition-colors font-mono"
                  >
                    {relId} →
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Sources */}
          {deep.sources && deep.sources.length > 0 && (
            <div className="space-y-3 pt-4 border-t border-border/60">
              <h3 className="text-xs font-mono uppercase text-muted-foreground tracking-wider flex items-center gap-2">
                <Library size={14} className="text-gold" />
                {isEn ? 'Academic & Professional References' : 'প্রাতিষ্ঠানিক ও তাত্ত্বিক রেফারেন্স'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {deep.sources.map((src, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-card border border-border/80 space-y-1 text-xs">
                    <div className="font-bold text-foreground">
                      {src.title} <span className="font-normal text-muted-foreground">— {src.author}</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{src.note[currentLang]}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Disclaimer */}
          {deep.disclaimer && (
            <div className="p-4 rounded-xl bg-card/60 border border-border/60 text-xs text-muted-foreground leading-relaxed flex items-start gap-3">
              <AlertTriangle size={16} className="text-amber-400 shrink-0 mt-0.5" />
              <p>{deep.disclaimer[currentLang]}</p>
            </div>
          )}
        </section>
      )}

      {/* Bottom Action Footer & Resources */}
      <div className="rounded-3xl border border-border/80 bg-panel p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="text-lg font-bold text-foreground">
            {isEn ? 'Ready to calculate your lot size?' : 'সঠিক লট সাইজ নির্ধারণ করতে প্রস্তুত?'}
          </h4>
          <p className="text-sm text-muted-foreground">
            {isEn
              ? 'Calculate exact position size for Gold/Forex based on your Stop Loss.'
              : 'আপনার স্টপ লস ও ক্যাপিটালের উপর ভিত্তি করে নিখুঁত লট সাইজ বের করুন।'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href={`/${currentLang}/tools/risk-calculator`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gold text-zinc-950 font-bold text-sm hover:brightness-110 transition-all shadow-md"
          >
            <Calculator size={16} />
            {isEn ? 'Open Risk Calculator' : 'রিস্ক ক্যালকুলেটর খুলুন'}
          </Link>
          <Link
            href={`/${currentLang}/charts`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-card border border-border/80 text-foreground font-semibold text-sm hover:border-gold/50 transition-all"
          >
            <Compass size={16} />
            {isEn ? 'Explore All Charts' : 'সব চার্ট এক্সপ্লোর করুন'}
          </Link>
        </div>
      </div>
    </div>
  );
}
