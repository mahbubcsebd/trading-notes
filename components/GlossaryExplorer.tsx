"use client";

import React, { useState, useMemo } from "react";
import { Search, X, Link2, Check } from "lucide-react";
import { glossaryAnchorHash, glossaryAnchorId } from "@/lib/glossary";

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
  lang: "en" | "bn";
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

const ALL = "ALL";
const COPIED_RESET_MS = 2000;

const CHIP = "chip focus-visible:ring-gold/40 focus-visible:ring-2 focus-visible:outline-none";

export default function GlossaryExplorer({
  items,
  lang,
  dict,
}: GlossaryExplorerProps) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>(ALL);
  const [copiedTerm, setCopiedTerm] = useState<string | null>(null);

  const isEn = lang === "en";

  const categories = useMemo(() => {
    const counts = new Map<string, { en: string; bn: string; count: number }>();
    for (const item of items) {
      const prev = counts.get(item.category);
      counts.set(item.category, {
        en: item.category,
        bn: item.categoryBn,
        count: (prev?.count ?? 0) + 1,
      });
    }
    return Array.from(counts.values());
  }, [items]);

  const filteredItems = useMemo(() => {
    const q = search.trim().toLowerCase();
    return items.filter((item) => {
      if (selectedCategory !== ALL && item.category !== selectedCategory)
        return false;
      if (!q) return true;
      const haystack = isEn
        ? [item.term, item.en, item.exampleEn, item.category]
        : [item.term, item.bn, item.exampleBn, item.example, item.categoryBn];
      return haystack.some((s) => s?.toLowerCase().includes(q));
    });
  }, [items, search, selectedCategory, isEn]);

  const groupedByLetter = useMemo(() => {
    const groups: Record<string, GlossaryItem[]> = {};
    for (const item of filteredItems) {
      const firstChar = item.term.charAt(0).toUpperCase();
      const letter = /^[A-Z]$/.test(firstChar) ? firstChar : "#";
      groups[letter] = [...(groups[letter] ?? []), item];
    }
    return groups;
  }, [filteredItems]);

  const activeLetters = useMemo(
    () => Object.keys(groupedByLetter).sort(),
    [groupedByLetter],
  );

  const handleCopyLink = async (term: string) => {
    const url = `${window.location.origin}${window.location.pathname}#${glossaryAnchorHash(term)}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopiedTerm(term);
      setTimeout(() => setCopiedTerm(null), COPIED_RESET_MS);
    } catch (err) {
      console.error("Glossary: copy link failed", err);
    }
  };

  const handleReset = () => {
    setSearch("");
    setSelectedCategory(ALL);
  };

  const isFiltered = search !== "" || selectedCategory !== ALL;
  const summaryText = dict.showingResults
    .replace("{count}", String(filteredItems.length))
    .replace("{total}", String(items.length));

  return (
    <div className="space-y-10">
      {/* Search + category filter */}
      <div className="space-y-5">
        <div className="relative max-w-xl">
          <Search className="text-mute pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={dict.searchPlaceholder}
            aria-label={dict.searchPlaceholder}
            className="border-line bg-bg2 text-fg placeholder:text-mute focus:border-gold h-11 w-full rounded-full border pr-11 pl-11 text-[15px] transition-colors outline-none"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="text-mute hover:text-fg absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-1.5 transition-colors"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label={dict.filterCategory}
        >
          <button
            onClick={() => setSelectedCategory(ALL)}
            aria-pressed={selectedCategory === ALL}
            className={CHIP}
          >
            {dict.allCategories}
            <span className="font-mono text-[11px] tabular-nums opacity-80">
              {items.length}
            </span>
          </button>
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.en;
            return (
              <button
                key={cat.en}
                onClick={() => setSelectedCategory(isSelected ? ALL : cat.en)}
                aria-pressed={isSelected}
                className={CHIP}
              >
                {isEn ? cat.en : cat.bn}
                <span className="font-mono text-[11px] tabular-nums opacity-80">
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="text-mute flex items-center justify-between font-mono text-xs">
          <span aria-live="polite">{summaryText}</span>
          {isFiltered && (
            <button
              onClick={handleReset}
              className="hover:text-gold underline-offset-4 transition-colors hover:underline"
            >
              {dict.resetFilter}
            </button>
          )}
        </div>
      </div>

      {/* A–Z jump bar */}
      {activeLetters.length > 0 && (
        <nav
          aria-label="A–Z"
          className="border-line bg-bg sticky top-16 z-20 -mx-4 flex flex-wrap gap-0.5 border-y px-4 py-2 sm:mx-0"
        >
          {activeLetters.map((letter) => (
            <a
              key={letter}
              href={`#letter-${letter}`}
              className="text-mute hover:text-gold flex h-8 w-8 items-center justify-center rounded-full font-mono text-xs transition-colors"
            >
              {letter}
            </a>
          ))}
        </nav>
      )}

      {filteredItems.length === 0 && (
        <div className="border-line space-y-3 border-t py-12">
          <h3 className="text-lg tracking-tight">
            {dict.noResults}
          </h3>
          <p className="text-mute max-w-md text-sm">
            {isEn
              ? "Try different keywords, or reset filters to browse the full glossary."
              : "অন্য কোনো শব্দ দিয়ে চেষ্টা করুন, অথবা ফিল্টার রিসেট করে সম্পূর্ণ শব্দকোষ দেখুন।"}
          </p>
          <button onClick={handleReset} className="btn btn-sm">
            {dict.resetFilter}
          </button>
        </div>
      )}

      {/* Dictionary index */}
      <div className="space-y-14">
        {activeLetters.map((letter) => (
          <section
            key={letter}
            id={`letter-${letter}`}
            className="grid scroll-mt-32 gap-4 md:grid-cols-[5rem_minmax(0,1fr)] md:gap-8"
          >
            <div className="md:sticky md:top-32 md:self-start">
              <p className="font-display text-gold text-5xl leading-none">
                {letter}
              </p>
              <p className="text-mute mt-2 font-mono text-[11px]">
                {groupedByLetter[letter].length} {dict.termsUnit}
              </p>
            </div>

            <dl className="border-line border-t">
              {groupedByLetter[letter].map((item) => (
                <GlossaryEntry
                  key={item.term}
                  item={item}
                  isEn={isEn}
                  exampleLabel={dict.exampleLabel}
                  isCopied={copiedTerm === item.term}
                  onCopy={handleCopyLink}
                />
              ))}
            </dl>
          </section>
        ))}
      </div>
    </div>
  );
}

function GlossaryEntry({
  item,
  isEn,
  exampleLabel,
  isCopied,
  onCopy,
}: {
  item: GlossaryItem;
  isEn: boolean;
  exampleLabel: string;
  isCopied: boolean;
  onCopy: (term: string) => void;
}) {
  const langAttr = isEn ? "en" : "bn";
  const definition = isEn ? item.en : item.bn;
  const example = isEn
    ? item.exampleEn || item.example
    : item.exampleBn || item.example;

  return (
    <div
      id={glossaryAnchorId(item.term)}
      className="border-line group target:bg-surface scroll-mt-32 grid gap-1 border-b py-5 md:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] md:gap-8"
    >
      <dt className="flex flex-col items-start gap-1.5">
        <span className="text-fg text-lg font-medium">{item.term}</span>
        <span className="flex items-center gap-1">
          <span className="text-mute font-mono text-[11px]">
            {isEn ? item.category : item.categoryBn}
          </span>
          <button
            type="button"
            onClick={() => onCopy(item.term)}
            title="Copy link to term"
            aria-label="Copy direct link"
            className="text-mute hover:text-gold rounded-full p-1.5 opacity-100 transition-all md:opacity-0 md:group-hover:opacity-100 md:focus-visible:opacity-100"
          >
            {isCopied ? (
              <Check className="text-up h-3.5 w-3.5" />
            ) : (
              <Link2 className="h-3.5 w-3.5" />
            )}
          </button>
        </span>
      </dt>
      <dd className="m-0 max-w-[68ch] space-y-3">
        <p
          className="text-fg2 text-[15px] leading-[1.85]"
          lang={langAttr}
        >
          {definition}
        </p>
        {example && (
          <p
            className="text-fg2 border-gold border-l-2 pl-4 text-sm leading-relaxed"
            lang={langAttr}
          >
            <span className="text-gold mr-1.5 font-mono text-[11px] uppercase">
              {exampleLabel}
            </span>
            {example}
          </p>
        )}
      </dd>
    </div>
  );
}
