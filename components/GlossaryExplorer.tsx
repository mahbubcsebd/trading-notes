'use client';

import React, { useState, useMemo } from 'react';
import { Search, X, BookOpen, Lightbulb, BookmarkCheck, Share2, Layers, Check } from 'lucide-react';

export interface GlossaryItem {
  term: string;
  category: string;
  categoryBn: string;
  en: string;
  bn: string;
  exampleEn?: string;
  exampleBn?: string;
  example?: string;
}

interface GlossaryExplorerProps {
  items: GlossaryItem[];
  lang: 'en' | 'bn';
  dict: {
    title: string;
    desc: string;
    searchPlaceholder: string;
    allCategories: string;
    filterCategory: string;
    noResults: string;
    resetFilter: string;
    termsCount: string;
    definitionLabel: string;
    exampleLabel: string;
    editionBadge: string;
    showingResults: string;
    termsUnit: string;
  };
}

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  'Forex Basics': { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30' },
  'Order Types': { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30' },
  'SMC & Structure': { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30' },
  'Price Action': { bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500/30' },
  'Candlesticks': { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/30' },
  'Indicators': { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/30' },
  'Risk Management': { bg: 'bg-rose-500/10', text: 'text-rose-400', border: 'border-rose-500/30' },
  'Psychology': { bg: 'bg-pink-500/10', text: 'text-pink-400', border: 'border-pink-500/30' },
  'Macro & Sessions': { bg: 'bg-indigo-500/10', text: 'text-indigo-400', border: 'border-indigo-500/30' },
};

export default function GlossaryExplorer({ items, lang, dict }: GlossaryExplorerProps) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [copiedTerm, setCopiedTerm] = useState<string | null>(null);

  const isEn = lang === 'en';

  // Extract categories with counts
  const categories = useMemo(() => {
    const map = new Map<string, { en: string; bn: string; count: number }>();
    for (const item of items) {
      const catKey = item.category;
      if (!map.has(catKey)) {
        map.set(catKey, { en: item.category, bn: item.categoryBn, count: 0 });
      }
      map.get(catKey)!.count += 1;
    }
    return Array.from(map.values());
  }, [items]);

  // Filter items based on search and category
  const filteredItems = useMemo(() => {
    const q = search.trim().toLowerCase();
    return items.filter((item) => {
      const matchesCategory = selectedCategory === 'ALL' || item.category === selectedCategory;
      if (!matchesCategory) return false;

      if (!q) return true;

      if (isEn) {
        return (
          item.term.toLowerCase().includes(q) ||
          item.en.toLowerCase().includes(q) ||
          (item.exampleEn && item.exampleEn.toLowerCase().includes(q)) ||
          item.category.toLowerCase().includes(q)
        );
      } else {
        return (
          item.term.toLowerCase().includes(q) ||
          item.bn.toLowerCase().includes(q) ||
          (item.exampleBn && item.exampleBn.toLowerCase().includes(q)) ||
          (item.example && item.example.toLowerCase().includes(q)) ||
          item.categoryBn.toLowerCase().includes(q)
        );
      }
    });
  }, [items, search, selectedCategory, isEn]);

  // Group by alphabetical letters
  const groupedByLetter = useMemo(() => {
    const groups: Record<string, GlossaryItem[]> = {};
    for (const item of filteredItems) {
      const firstChar = item.term.charAt(0).toUpperCase();
      const letter = /^[A-Z]$/.test(firstChar) ? firstChar : '#';
      if (!groups[letter]) groups[letter] = [];
      groups[letter].push(item);
    }
    return groups;
  }, [filteredItems]);

  const activeLetters = useMemo(() => {
    return Object.keys(groupedByLetter).sort();
  }, [groupedByLetter]);

  const handleCopyLink = (term: string) => {
    const url = `${window.location.origin}${window.location.pathname}#term-${encodeURIComponent(
      term.toLowerCase()
    )}`;
    navigator.clipboard.writeText(url);
    setCopiedTerm(term);
    setTimeout(() => setCopiedTerm(null), 2000);
  };

  const handleReset = () => {
    setSearch('');
    setSelectedCategory('ALL');
  };

  const summaryText = dict.showingResults
    .replace('{count}', String(filteredItems.length))
    .replace('{total}', String(items.length));

  return (
    <div className="space-y-8">
      {/* Search and Category Filter Toolbar */}
      <div className="bg-card border border-border/80 rounded-2xl p-5 shadow-lg backdrop-blur-sm space-y-4">
        {/* Search input */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={dict.searchPlaceholder}
            className="w-full bg-background border border-border/70 rounded-xl pl-12 pr-10 py-3.5 text-sm sm:text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition-all"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted/50 transition-colors"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <button
            onClick={() => setSelectedCategory('ALL')}
            className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5 ${
              selectedCategory === 'ALL'
                ? 'bg-gold text-black font-semibold shadow-sm'
                : 'bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground border border-border/60'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{dict.allCategories}</span>
            <span
              className={`text-xs px-1.5 py-0.2 rounded-full ${
                selectedCategory === 'ALL' ? 'bg-black/20 text-black' : 'bg-background/80 text-muted-foreground'
              }`}
            >
              {items.length}
            </span>
          </button>

          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.en;
            const badgeColor = CATEGORY_COLORS[cat.en] || {
              bg: 'bg-muted/40',
              text: 'text-foreground',
              border: 'border-border',
            };
            const categoryLabel = isEn ? cat.en : cat.bn;

            return (
              <button
                key={cat.en}
                onClick={() => setSelectedCategory(isSelected ? 'ALL' : cat.en)}
                className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-gold text-black font-semibold shadow-sm ring-1 ring-gold'
                    : `${badgeColor.bg} ${badgeColor.text} hover:opacity-90 border ${badgeColor.border}`
                }`}
              >
                <span>{categoryLabel}</span>
                <span
                  className={`text-[11px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? 'bg-black/20 text-black' : 'bg-background/60 text-muted-foreground'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Quick Result Summary */}
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border/40">
          <div className="flex items-center gap-2">
            <BookmarkCheck className="w-3.5 h-3.5 text-gold" />
            <span>{summaryText}</span>
          </div>
          {(search || selectedCategory !== 'ALL') && (
            <button
              onClick={handleReset}
              className="text-gold hover:underline font-medium cursor-pointer"
            >
              {dict.resetFilter}
            </button>
          )}
        </div>
      </div>

      {/* Alphabet Jump Bar */}
      {activeLetters.length > 0 && (
        <div className="sticky top-16 z-20 bg-background/95 backdrop-blur-md border border-border/70 rounded-xl p-2.5 shadow-md flex flex-wrap items-center gap-1 sm:gap-1.5">
          <span className="text-xs text-muted-foreground font-mono px-2 hidden sm:inline">A-Z:</span>
          {activeLetters.map((letter) => (
            <a
              key={letter}
              href={`#letter-${letter}`}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-card border border-border/80 flex items-center justify-center text-xs font-mono font-semibold text-muted-foreground hover:text-gold hover:border-gold/60 hover:bg-gold/5 transition-all"
            >
              {letter}
            </a>
          ))}
        </div>
      )}

      {/* Zero State */}
      {filteredItems.length === 0 && (
        <div className="text-center py-16 px-4 bg-card/60 rounded-2xl border border-dashed border-border/80 space-y-4">
          <BookOpen className="w-12 h-12 text-muted-foreground/50 mx-auto" />
          <h3 className="text-lg font-semibold text-foreground">{dict.noResults}</h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            {isEn
              ? 'Try searching with different keywords, or reset filters to browse the complete glossary.'
              : 'অন্য কোনো শব্দ বা বানান দিয়ে চেষ্টা করুন, অথবা ফিল্টার রিসেট করে সম্পূর্ণ শব্দকোষ দেখুন।'}
          </p>
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-gold text-black rounded-lg text-sm font-semibold hover:bg-gold/90 transition-colors"
          >
            {dict.resetFilter}
          </button>
        </div>
      )}

      {/* Grouped Terms List */}
      <div className="space-y-12">
        {activeLetters.map((letter) => (
          <section key={letter} id={`letter-${letter}`} className="scroll-mt-32 space-y-4">
            <div className="flex items-center gap-3 pb-2 border-b border-border/70">
              <span className="w-8 h-8 rounded-lg bg-gold/10 border border-gold/30 text-gold flex items-center justify-center font-mono font-bold text-sm">
                {letter}
              </span>
              <span className="text-xs text-muted-foreground font-mono">
                {groupedByLetter[letter].length} {dict.termsUnit}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {groupedByLetter[letter].map((item) => {
                const badgeColor = CATEGORY_COLORS[item.category] || {
                  bg: 'bg-muted/40',
                  text: 'text-foreground',
                  border: 'border-border',
                };
                const termSlug = item.term.toLowerCase();
                const isCopied = copiedTerm === item.term;

                // Select purely localized content based on current active language
                const definitionText = isEn ? item.en : item.bn;
                const exampleText = isEn
                  ? item.exampleEn || item.example
                  : item.exampleBn || item.example;
                const categoryBadgeLabel = isEn ? item.category : item.categoryBn;

                return (
                  <div
                    key={item.term}
                    id={`term-${termSlug}`}
                    className="group relative rounded-2xl border border-border/80 bg-card p-5 sm:p-6 transition-all duration-200 hover:border-gold/40 hover:shadow-md hover:shadow-gold/5"
                  >
                    {/* Header: Term Title + Category + Share Button */}
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold font-mono text-foreground tracking-tight group-hover:text-gold transition-colors">
                          {item.term}
                        </h3>
                      </div>

                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs px-2.5 py-1 rounded-full font-medium border ${badgeColor.bg} ${badgeColor.text} ${badgeColor.border}`}
                        >
                          {categoryBadgeLabel}
                        </span>

                        <button
                          onClick={() => handleCopyLink(item.term)}
                          title="Copy link to term"
                          className="p-1.5 rounded-lg border border-border/60 text-muted-foreground hover:text-gold hover:border-gold/50 bg-background/50 hover:bg-background transition-all"
                          aria-label="Copy direct link"
                        >
                          {isCopied ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Share2 className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Content Section: 100% Localized */}
                    <div className="space-y-3.5">
                      {/* Definition Box */}
                      <div className="bg-background/60 rounded-xl p-4 border border-border/50 space-y-1.5">
                        <span className="text-xs font-semibold text-gold font-mono uppercase tracking-wider block">
                          {dict.definitionLabel}
                        </span>
                        <p
                          className={`text-sm sm:text-base text-foreground leading-[1.8]`}
                          lang={isEn ? 'en' : 'bn'}
                        >
                          {definitionText}
                        </p>
                      </div>

                      {/* Practical Application / Example Box */}
                      {exampleText && (
                        <div className="bg-gold/5 border border-gold/25 rounded-xl p-4 flex items-start gap-3">
                          <Lightbulb className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                          <div className="text-xs sm:text-sm text-foreground/90 leading-relaxed">
                            <span className="font-semibold text-gold mr-1.5">
                              {dict.exampleLabel}:
                            </span>
                            <span lang={isEn ? 'en' : 'bn'}>{exampleText}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
