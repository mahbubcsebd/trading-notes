import type { Metadata } from 'next';
import glossary from '@/content/glossary.json';
import { dictionaries, Locale } from '@/lib/dictionaries';
import GlossaryExplorer, { GlossaryItem } from '@/components/GlossaryExplorer';
import { Sparkles, BookOpen } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang?: string }>;
}): Promise<Metadata> {
  const { lang = 'bn' } = await params;
  const isBn = lang === 'bn';
  return {
    title: isBn ? 'ট্রেডিং শব্দকোষ ও পরিভাষা | TradeNotes' : 'Trading Glossary & Terminology | TradeNotes',
    description: isBn
      ? 'ফরেক্স, গোল্ড, এসএমসি ও প্রাইস অ্যাকশনের গুরুত্বপূর্ণ ট্রেডিং পরিভাষার সহজ ও প্রফেশনাল বাংলা গাইড।'
      : 'Comprehensive institutional and retail trading glossary with technical definitions, mechanics, and practical trading rules.',
  };
}

export default async function GlossaryPage({ params }: { params: Promise<{ lang?: string }> }) {
  const { lang = 'bn' } = await params;
  const locale: Locale = lang === 'en' ? 'en' : 'bn';
  const t = dictionaries[locale].glossary;
  const items = glossary as GlossaryItem[];

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Page Header */}
        <header className="relative overflow-hidden rounded-3xl border border-border/80 bg-gradient-to-b from-card via-card to-background p-6 sm:p-10 shadow-2xl">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 space-y-4 max-w-3xl">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gold/15 text-gold border border-gold/30">
                <Sparkles className="w-3.5 h-3.5" />
                {items.length} {t.termsCount}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-muted/60 text-muted-foreground border border-border">
                <BookOpen className="w-3.5 h-3.5 text-foreground" />
                {t.editionBadge}
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

        {/* Interactive Glossary Explorer */}
        <main>
          <GlossaryExplorer items={items} lang={locale} dict={t} />
        </main>
      </div>
    </div>
  );
}
