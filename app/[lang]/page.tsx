import type { Metadata } from 'next';
import Link from 'next/link';
import {
  TrendingUp,
  BarChart2,
  BookOpen,
  Calculator,
  ChevronRight,
  GraduationCap,
  Target,
  Shield,
  Brain,
} from 'lucide-react';
import { dictionaries, Locale } from '@/lib/dictionaries';

const modules = [
  { slug: '01-foundations', icon: BookOpen, lessons: 6, color: 'text-blue-400' },
  { slug: '02-broker-platform-setup', icon: Shield, lessons: 6, color: 'text-zinc-400' },
  { slug: '03-market-structure', icon: TrendingUp, lessons: 5, color: 'text-purple-400' },
  { slug: '04-candlesticks', icon: BarChart2, lessons: 5, color: 'text-emerald-400' },
  { slug: '05-support-resistance', icon: Target, lessons: 5, color: 'text-orange-400' },
  { slug: '06-trend-chart-patterns', icon: TrendingUp, lessons: 5, color: 'text-indigo-400' },
  { slug: '07-technical-indicators', icon: BarChart2, lessons: 7, color: 'text-cyan-400' },
  { slug: '08-price-action-entries-strategies', icon: Target, lessons: 6, color: 'text-rose-400' },
  { slug: '09-risk-management', icon: Shield, lessons: 5, color: 'text-red-400' },
  { slug: '10-trade-management-execution', icon: Target, lessons: 5, color: 'text-emerald-500' },
  { slug: '11-fundamental-intermarket-analysis', icon: BookOpen, lessons: 6, color: 'text-sky-400' },
  { slug: '12-trading-psychology', icon: Brain, lessons: 5, color: 'text-pink-400' },
  { slug: '13-gold-xauusd', icon: GraduationCap, lessons: 8, color: 'text-yellow-400' },
  { slug: '14-trading-plan-system', icon: BookOpen, lessons: 5, color: 'text-purple-500' },
  { slug: '15-backtesting-journal', icon: BookOpen, lessons: 5, color: 'text-cyan-500' },
  { slug: '16-advanced', icon: GraduationCap, lessons: 5, color: 'text-violet-400' },
  { slug: '17-case-studies-trade-reviews', icon: BarChart2, lessons: 3, color: 'text-orange-500' },
  { slug: '18-notes-library', icon: BookOpen, lessons: 5, color: 'text-zinc-400' },
];

export const metadata: Metadata = {
  title: 'TradeNotes — Personal Trading Learning Platform',
  description: 'Forex ও Gold trading এর জন্য structured learning notes। Bengali ও English এ।',
};

export default async function HomePage({ params }: { params: Promise<{ lang?: string }> }) {
  const { lang = 'bn' } = await params;
  const t = dictionaries[lang as Locale].home;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(245,179,1,0.1),transparent)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-28 text-center relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/30 bg-gold/10 text-gold text-xs font-medium mb-6">
            <span>▲</span> {t.heroSub}
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-4">
            {t.heroTitle}<span className="text-gold">{t.heroTitleHighlight}</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-2">
            {t.heroDesc}
          </p>
          <p className="text-sm text-muted-foreground/70 mb-10">
            {t.heroTags}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={`/${lang}/learn/01-foundations/01-what-is-forex`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-gold text-background font-semibold text-sm hover:bg-gold/90 transition-colors"
            >
              {t.startLearning}
              <ChevronRight size={16} />
            </Link>
            <Link
              href={`/${lang}/tools/risk-calculator`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-border bg-card text-foreground font-semibold text-sm hover:bg-accent transition-colors"
            >
              <Calculator size={16} />
              {t.riskCalc}
            </Link>
          </div>
        </div>
      </section>

      {/* Module Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground">{t.curriculum}</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {modules.length} {t.curriculum.toLowerCase()} · {modules.reduce((a, m) => a + m.lessons, 0)} {t.lessons}
            </p>
          </div>
          <Link
            href={`/${lang}/learn`}
            className="text-sm text-gold hover:underline flex items-center gap-1"
          >
            {t.viewAll} <ChevronRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {modules.map((mod, i) => {
            const Icon = mod.icon;
            // @ts-ignore
            const moduleTitle = t.modules[mod.slug] || mod.slug;
            return (
              <Link
                key={mod.slug}
                href={`/${lang}/learn/${mod.slug}`}
                className="group relative rounded-lg border border-border bg-card hover:border-gold/50 hover:bg-card/80 transition-all duration-200 p-4 flex flex-col gap-3"
              >
                <div className="flex items-center justify-between">
                  <div className={`w-8 h-8 rounded-md bg-muted flex items-center justify-center ${mod.color}`}>
                    <Icon size={16} />
                  </div>
                  <span className="text-xs text-muted-foreground font-mono">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm group-hover:text-gold transition-colors">
                    {moduleTitle}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{mod.lessons} {t.lessons}</p>
                </div>
                {/* Progress bar placeholder */}
                <div className="h-1 rounded-full bg-muted overflow-hidden">
                  <div className="h-full w-0 bg-gold rounded-full" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Quick links */}
      <section className="border-t border-border bg-panel">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href={`/${lang}/patterns`}
            className="group flex items-center gap-4 p-4 rounded-lg border border-border hover:border-gold/50 bg-card hover:bg-card/80 transition-all"
          >
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-emerald-400">
              <TrendingUp size={20} />
            </div>
            <div>
              <p className="font-semibold text-foreground group-hover:text-gold transition-colors">
                {t.patternTitle}
              </p>
              <p className="text-xs text-muted-foreground">{t.patternDesc}</p>
            </div>
            <ChevronRight size={16} className="ml-auto text-muted-foreground" />
          </Link>

          <Link
            href={`/${lang}/charts`}
            className="group flex items-center gap-4 p-4 rounded-lg border border-border hover:border-gold/50 bg-card hover:bg-card/80 transition-all"
          >
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-blue-400">
              <BarChart2 size={20} />
            </div>
            <div>
              <p className="font-semibold text-foreground group-hover:text-gold transition-colors">
                {t.chartTitle}
              </p>
              <p className="text-xs text-muted-foreground">{t.chartDesc}</p>
            </div>
            <ChevronRight size={16} className="ml-auto text-muted-foreground" />
          </Link>

          <Link
            href={`/${lang}/glossary`}
            className="group flex items-center gap-4 p-4 rounded-lg border border-border hover:border-gold/50 bg-card hover:bg-card/80 transition-all"
          >
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-yellow-400">
              <GraduationCap size={20} />
            </div>
            <div>
              <p className="font-semibold text-foreground group-hover:text-gold transition-colors">
                {t.glossaryTitle}
              </p>
              <p className="text-xs text-muted-foreground">{t.glossaryDesc}</p>
            </div>
            <ChevronRight size={16} className="ml-auto text-muted-foreground" />
          </Link>
        </div>
      </section>
    </div>
  );
}
