import { source } from '@/lib/source';
import { ModuleGroup, LessonItem } from '@/components/learn/LearnSidebar';

export const MODULE_DEFINITIONS: Record<
  string,
  { en: string; bn: string; order: number }
> = {
  '01-foundations': {
    en: '1. Market Foundations',
    bn: '১. মার্কেট ভিত্তি ও পরিচিতি',
    order: 1,
  },
  '02-broker-platform-setup': {
    en: '2. Broker & Platform Setup',
    bn: '২. ব্রোকার ও প্ল্যাটফর্ম সেটআপ',
    order: 2,
  },
  '03-market-structure': {
    en: '3. Market Structure',
    bn: '৩. মার্কেট স্ট্রাকচার',
    order: 3,
  },
  '04-candlesticks': {
    en: '4. Candlestick Anatomy',
    bn: '৪. ক্যান্ডেলস্টিক অ্যানাটমি',
    order: 4,
  },
  '05-support-resistance': {
    en: '5. Support & Resistance',
    bn: '৫. সাপোর্ট ও রেজিস্ট্যান্স',
    order: 5,
  },
  '06-trend-chart-patterns': {
    en: '6. Trend & Chart Patterns',
    bn: '৬. চার্ট ও ট্রেন্ড প্যাটার্ন',
    order: 6,
  },
  '07-technical-indicators': {
    en: '7. Technical Indicators',
    bn: '৭. টেকনিক্যাল ইন্ডিকেটরস',
    order: 7,
  },
  '09-price-action-entries-strategies': {
    en: '9. Price Action Entries',
    bn: '৯. প্রাইস অ্যাকশন ও এন্ট্রি কৌশল',
    order: 9,
  },
  '08-risk-management': {
    en: '8. Risk Management',
    bn: '৮. রিস্ক ম্যানেজমেন্ট',
    order: 8,
  },
  '10-trade-management-execution': {
    en: '10. Trade Execution & Management',
    bn: '১০. ট্রেড ম্যানেজমেন্ট ও এক্সিকিউশন',
    order: 10,
  },
  '11-fundamental-intermarket-analysis': {
    en: '11. Fundamental Analysis',
    bn: '১১. ফান্ডামেন্টাল অ্যানালাইসিস',
    order: 11,
  },
  '12-trading-psychology': {
    en: '12. Trading Psychology',
    bn: '১২. ট্রেডিং সাইকোলজি',
    order: 12,
  },
  '13-gold-xauusd': {
    en: '13. Gold (XAUUSD) Special',
    bn: '১৩. গোল্ড (XAUUSD) স্পেশাল',
    order: 13,
  },
  '14-trading-plan-system': {
    en: '14. Trading Plan & System',
    bn: '১৪. ট্রেডিং প্ল্যান ও সিস্টেম',
    order: 14,
  },
  '15-backtesting-journal': {
    en: '15. Backtesting & Journal',
    bn: '১৫. ব্যাকটেস্টিং ও জার্নাল',
    order: 15,
  },
  '16-trading-methodologies': {
    en: '16. Trading Methodologies',
    bn: '১৬. Trading Methodology',
    order: 16,
  },
  '17-case-studies-trade-reviews': {
    en: '17. Trade Reviews & Cases',
    bn: '১৭. ট্রেড রিভিউ ও কেস স্টাডি',
    order: 17,
  },
  '18-notes-library': {
    en: '18. Notes & Cheat Sheets',
    bn: '১৮. নোটস ও চিটশিট লাইব্রেরি',
    order: 18,
  },
  '19-smc-ict': {
    en: '19. SMC / ICT in Depth',
    bn: '১৯. SMC / ICT গভীরে',
    order: 19,
  },
};

export function getLearnModules(lang: 'en' | 'bn'): ModuleGroup[] {
  const allPages = source.getPages(lang);
  const moduleMap = new Map<string, LessonItem[]>();

  for (const page of allPages) {
    if (!page.slugs || page.slugs.length === 0) continue;
    // Skip the root index.mdx if slugs is empty
    if (page.slugs.length === 1 && page.slugs[0] === 'index') continue;

    const moduleId = page.slugs[0];
    const lessonId = page.slugs[page.slugs.length - 1];

    let targetUrl = page.url;
    if (!targetUrl.startsWith(`/${lang}`)) {
      targetUrl = `/${lang}${targetUrl.startsWith('/') ? '' : '/'}${targetUrl}`;
    }

    const item: LessonItem = {
      id: lessonId,
      title: page.data.title || lessonId,
      url: targetUrl,
      slugPath: page.slugs.join('/'),
      level: (page.data as any).level,
      status: (page.data as any).status,
      description: page.data.description,
    };

    if (!moduleMap.has(moduleId)) {
      moduleMap.set(moduleId, []);
    }
    moduleMap.get(moduleId)!.push(item);
  }

  // Sort lessons within each module
  const modules: ModuleGroup[] = [];

  for (const [moduleId, lessons] of moduleMap.entries()) {
    // Sort lessons by slugPath / filename order (01-, 02-, etc.)
    lessons.sort((a, b) => a.slugPath.localeCompare(b.slugPath));

    const def = MODULE_DEFINITIONS[moduleId] || {
      en: moduleId.replace(/^\d+-/, '').replace(/-/g, ' '),
      bn: moduleId.replace(/^\d+-/, '').replace(/-/g, ' '),
      order: 99,
    };

    modules.push({
      id: moduleId,
      title: { en: def.en, bn: def.bn },
      order: def.order,
      lessons,
    });
  }

  // Sort modules by order
  modules.sort((a, b) => a.order - b.order);

  return modules;
}
