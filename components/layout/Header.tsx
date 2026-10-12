import Link from 'next/link';
import { TrendingUp, BookOpen, BarChart2, Search, Calculator, GraduationCap } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { SearchButton } from '@/components/SearchButton';
import { dictionaries, Locale } from '@/lib/dictionaries';

export function Header({ lang = 'bn' }: { lang: string }) {
  const t = dictionaries[lang as Locale].header;

  const navLinks = [
    { href: '/learn', label: t.learn, icon: BookOpen },
    { href: '/patterns', label: t.patterns, icon: TrendingUp },
    { href: '/charts', label: t.charts, icon: BarChart2 },
    { href: '/glossary', label: t.glossary, icon: GraduationCap },
    { href: '/tools/risk-calculator', label: t.riskCalc, icon: Calculator },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        {/* Left: Logo */}
        <div className="flex items-center justify-start shrink-0">
          <Link
            href={`/${lang}`}
            className="flex items-center gap-2 font-semibold text-foreground hover:text-gold transition-colors shrink-0"
          >
            <span className="text-gold font-mono text-lg leading-none">▲</span>
            <span className="text-sm tracking-wide">TradeNotes</span>
          </Link>
        </div>

        {/* Center: Nav Menu */}
        <div className="hidden md:flex flex-1 items-center justify-center gap-1 md:gap-2">
          {navLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={`/${lang}${href}`}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors whitespace-nowrap shrink-0"
            >
              <Icon size={14} />
              {label}
            </Link>
          ))}
        </div>

        {/* Right: Search + Language + Theme */}
        <div className="flex items-center justify-end gap-2 shrink-0">
          <div className="hidden sm:block">
            <SearchButton label={t.search} lang={lang} />
          </div>
          <LanguageSwitcher currentLang={lang} />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
