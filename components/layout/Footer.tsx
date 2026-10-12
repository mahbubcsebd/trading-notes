import Link from 'next/link';
import { dictionaries, Locale } from '@/lib/dictionaries';

export function Footer({ lang = 'bn' }: { lang?: string }) {
  const t = dictionaries[lang as Locale].footer;

  return (
    <footer className="border-t border-border bg-panel mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="text-gold font-mono">▲</span>
          <span>TradeNotes</span>
        </div>

        <p className="text-center text-xs max-w-md">
          {t.disclaimer}
        </p>

        <div className="flex items-center gap-4 text-xs">
          <Link href={`/${lang}/glossary`} className="hover:text-foreground transition-colors">
            {t.glossary}
          </Link>
          <Link href={`/${lang}/tools/risk-calculator`} className="hover:text-foreground transition-colors">
            {t.riskCalc}
          </Link>
          <span>© 2026</span>
        </div>
      </div>
    </footer>
  );
}
