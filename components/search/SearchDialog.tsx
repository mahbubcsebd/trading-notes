"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Dialog } from "@base-ui/react/dialog";
import { AlignLeft, ArrowUpRight, Hash, Loader2, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { highlightParts } from "@/lib/search/highlight";
import type {
  SearchHit,
  SearchResult,
  SearchSection,
} from "@/lib/search/engine";
import { useSiteSearch } from "./useSiteSearch";

export interface SearchLabels {
  search: string;
  searchPlaceholder: string;
  searchEmpty: string;
  searchError: string;
  searchQuickLinks: string;
  searchNavigate: string;
  searchOpen: string;
  searchClose: string;
  learn: string;
  patterns: string;
  charts: string;
  glossary: string;
  riskCalc: string;
  notes: string;
  journal: string;
}

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lang: string;
  labels: SearchLabels;
}

const LIST_ID = "site-search-list";
const optionId = (i: number) => `site-search-option-${i}`;

function Highlighted({ text, query }: { text: string; query: string }) {
  return (
    <>
      {highlightParts(text, query).map((part, i) =>
        part.isMatch ? (
          <mark
            key={i}
            className="text-foreground decoration-gold/70 bg-transparent font-semibold underline decoration-2 underline-offset-2"
          >
            {part.text}
          </mark>
        ) : (
          <span key={i}>{part.text}</span>
        ),
      )}
    </>
  );
}

interface OptionProps {
  index: number;
  isActive: boolean;
  href: string;
  onSelect: () => void;
  onHover: (index: number) => void;
  className?: string;
  children: React.ReactNode;
}

function Option({
  index,
  isActive,
  href,
  onSelect,
  onHover,
  className,
  children,
}: OptionProps) {
  return (
    <Link
      id={optionId(index)}
      role="option"
      aria-selected={isActive}
      href={href}
      tabIndex={-1}
      onClick={onSelect}
      onMouseMove={() => !isActive && onHover(index)}
      className={cn(
        "relative block rounded-xl px-3 transition-colors outline-none",
        isActive ? "bg-accent text-foreground" : "text-foreground/90",
        className,
      )}
    >
      {isActive && (
        <span
          aria-hidden
          className="bg-gold absolute top-2 bottom-2 left-0 w-0.5 rounded-full"
        />
      )}
      {children}
    </Link>
  );
}

function HitBody({ hit, query }: { hit: SearchHit; query: string }) {
  const Icon = hit.kind === "heading" ? Hash : AlignLeft;
  return (
    <span className="border-border/70 ml-1.5 flex gap-2.5 border-l py-1.5 pl-4">
      <Icon
        size={13}
        className="text-muted-foreground mt-[3px] shrink-0"
        aria-hidden
      />
      <span className="min-w-0">
        {hit.heading && hit.kind === "text" && (
          <span className="text-muted-foreground block truncate font-mono text-[11px]">
            {hit.heading}
          </span>
        )}
        <span
          className={cn(
            "line-clamp-2 text-[13px] leading-relaxed",
            hit.kind === "heading"
              ? "text-foreground font-medium"
              : "text-muted-foreground",
          )}
        >
          <Highlighted text={hit.snippet} query={query} />
        </span>
      </span>
    </span>
  );
}

function ResultTitle({
  result,
  query,
  sectionLabel,
}: {
  result: SearchResult;
  query: string;
  sectionLabel: string;
}) {
  return (
    <span className="flex items-baseline gap-3 py-2.5">
      <span className="text-muted-foreground w-20 shrink-0 truncate font-mono text-[10px] tracking-wider uppercase">
        {sectionLabel}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[15px] font-medium tracking-tight">
          <Highlighted text={result.title} query={query} />
        </span>
        {result.description && (
          <span className="text-muted-foreground mt-0.5 line-clamp-1 text-[13px]">
            {result.description}
          </span>
        )}
      </span>
    </span>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="border-border bg-muted inline-flex h-5 min-w-5 items-center justify-center rounded-md border px-1.5 font-mono text-[10px] font-medium">
      {children}
    </kbd>
  );
}

export function SearchDialog({
  open,
  onOpenChange,
  lang,
  labels,
}: SearchDialogProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const { status, results } = useSiteSearch(query, lang);
  const hasQuery = query.trim().length > 0;

  const sectionLabels: Record<SearchSection, string> = {
    learn: labels.learn,
    patterns: labels.patterns,
    glossary: labels.glossary,
    notes: labels.notes,
  };

  const quickLinks = useMemo(
    () => [
      { label: labels.learn, url: `/${lang}/learn` },
      { label: labels.patterns, url: `/${lang}/patterns` },
      { label: labels.charts, url: `/${lang}/charts` },
      { label: labels.glossary, url: `/${lang}/glossary` },
      { label: labels.riskCalc, url: `/${lang}/tools/risk-calculator` },
      { label: labels.notes, url: `/${lang}/notes` },
      { label: labels.journal, url: `/${lang}/journal` },
    ],
    [lang, labels],
  );

  const urls = useMemo(
    () =>
      hasQuery
        ? results.flatMap((r) => [r.url, ...r.hits.map((h) => h.url)])
        : quickLinks.map((l) => l.url),
    [hasQuery, results, quickLinks],
  );
  const activeIndex = Math.min(active, urls.length - 1);

  useEffect(() => {
    if (!open || activeIndex < 0) return;
    document
      .getElementById(optionId(activeIndex))
      ?.scrollIntoView({ block: "nearest" });
  }, [open, activeIndex]);

  const close = () => onOpenChange(false);

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (urls.length === 0) return;
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const step = e.key === "ArrowDown" ? 1 : -1;
      setActive((activeIndex + step + urls.length) % urls.length);
    } else if (e.key === "Enter" && !e.nativeEvent.isComposing) {
      e.preventDefault();
      close();
      router.push(urls[activeIndex]);
    }
  };

  let index = -1;
  const optionProps = () => {
    index += 1;
    return {
      index,
      isActive: index === activeIndex,
      onSelect: close,
      onHover: setActive,
    };
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className="data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0 fixed inset-0 z-50 bg-black/25 backdrop-blur-[2px] duration-150" />
        <Dialog.Popup
          initialFocus={inputRef}
          className="border-border bg-popover text-popover-foreground shadow-soft data-open:animate-in data-open:fade-in-0 data-open:slide-in-from-top-2 data-closed:animate-out data-closed:fade-out-0 fixed top-[10vh] left-1/2 z-50 flex max-h-[80vh] w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 flex-col overflow-hidden rounded-2xl border duration-150 outline-none"
        >
          <Dialog.Title className="sr-only">{labels.search}</Dialog.Title>

          <div className="border-border flex items-center gap-3 border-b px-4">
            {status === "loading" ? (
              <Loader2
                size={16}
                className="text-muted-foreground shrink-0 animate-spin"
                aria-hidden
              />
            ) : (
              <Search
                size={16}
                className="text-muted-foreground shrink-0"
                aria-hidden
              />
            )}
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActive(0);
              }}
              onKeyDown={onKeyDown}
              placeholder={labels.searchPlaceholder}
              maxLength={100}
              role="combobox"
              aria-label={labels.search}
              aria-expanded={urls.length > 0}
              aria-controls={LIST_ID}
              aria-autocomplete="list"
              aria-activedescendant={
                activeIndex >= 0 ? optionId(activeIndex) : undefined
              }
              autoComplete="off"
              spellCheck={false}
              className="placeholder:text-muted-foreground h-14 min-w-0 flex-1 bg-transparent text-[15px] outline-none"
            />
            <Dialog.Close className="text-muted-foreground hover:text-foreground focus-visible:ring-ring rounded-md focus-visible:ring-2 focus-visible:outline-none">
              <Kbd>esc</Kbd>
              <span className="sr-only">{labels.searchClose}</span>
            </Dialog.Close>
          </div>

          <div
            id={LIST_ID}
            role="listbox"
            aria-label={labels.search}
            className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-2"
          >
            {!hasQuery && (
              <>
                <p className="eyebrow text-muted-foreground px-3 pt-2 pb-1.5">
                  {labels.searchQuickLinks}
                </p>
                {quickLinks.map((link) => (
                  <Option
                    key={link.url}
                    href={link.url}
                    {...optionProps()}
                    className="py-2.5"
                  >
                    <span className="flex items-center justify-between gap-3 text-[15px] tracking-tight">
                      {link.label}
                      <ArrowUpRight
                        size={14}
                        className="text-muted-foreground"
                        aria-hidden
                      />
                    </span>
                  </Option>
                ))}
              </>
            )}

            {hasQuery && status === "error" && (
              <p className="text-bear px-3 py-8 text-center text-sm">
                {labels.searchError}
              </p>
            )}

            {hasQuery && status === "success" && results.length === 0 && (
              <p className="text-muted-foreground px-3 py-10 text-center text-sm">
                {labels.searchEmpty}{" "}
                <span className="text-foreground font-medium">
                  “{query.trim()}”
                </span>
              </p>
            )}

            {hasQuery &&
              results.map((result) => (
                <div
                  key={result.url}
                  className="border-border/50 border-b py-1 last:border-b-0"
                >
                  <Option href={result.url} {...optionProps()}>
                    <ResultTitle
                      result={result}
                      query={query}
                      sectionLabel={sectionLabels[result.section]}
                    />
                  </Option>
                  {result.hits.map((hit, i) => (
                    <Option
                      key={`${hit.url}-${i}`}
                      href={hit.url}
                      {...optionProps()}
                      className="pl-[6.5rem]"
                    >
                      <HitBody hit={hit} query={query} />
                    </Option>
                  ))}
                </div>
              ))}
          </div>

          <div className="border-border text-muted-foreground hidden items-center gap-4 border-t px-4 py-2.5 text-[11px] sm:flex">
            <span className="flex items-center gap-1.5">
              <Kbd>↑</Kbd>
              <Kbd>↓</Kbd>
              {labels.searchNavigate}
            </span>
            <span className="flex items-center gap-1.5">
              <Kbd>↵</Kbd>
              {labels.searchOpen}
            </span>
            <span className="flex items-center gap-1.5">
              <Kbd>esc</Kbd>
              {labels.searchClose}
            </span>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
