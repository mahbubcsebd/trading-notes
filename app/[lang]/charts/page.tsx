import type { Metadata } from 'next';
import { dictionaries, Locale } from '@/lib/dictionaries';
import { getAllCharts } from '@/lib/charts';
import { ChartsExplorer } from '@/components/chart/ChartsExplorer';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang?: string }>;
}): Promise<Metadata> {
  const { lang = 'bn' } = await params;
  const isBn = lang === 'bn';
  return {
    title: isBn ? 'চার্ট লাইব্রেরি ও গ্যালারি | TradeNotes' : 'Chart Library & Gallery | TradeNotes',
    description: isBn
      ? 'ফরেক্স, গোল্ড, এসএমসি ও প্রাইস অ্যাকশনের সংরক্ষিত অ্যানোটেটেড ট্রেডিং চার্টসমূহ — ফিল্টার, রিভাইজ ও রিপ্লে করুন।'
      : 'Comprehensive repository of annotated trading charts for Forex, Gold, SMC, and Price Action with interactive replay and filters.',
  };
}

export default async function ChartsPage({ params }: { params: Promise<{ lang?: string }> }) {
  const { lang = 'bn' } = await params;
  const locale: Locale = lang === 'en' ? 'en' : 'bn';
  const t = dictionaries[locale].charts;
  const charts = getAllCharts();

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <ChartsExplorer charts={charts} lang={locale} dict={t} />
      </div>
    </div>
  );
}
