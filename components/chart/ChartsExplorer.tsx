"use client";

import React, { useState, useMemo } from "react";
import {
  type ChartSummary,
  type OhlcTuple,
  getLocalizedText,
} from "@/lib/chart-types";
import { ChartThumbnail } from "./ChartThumbnail";
import { ChartDetailModal } from "./ChartDetailModal";
import { useChartById } from "./useChartById";
import { TVWidget } from "./TVWidget";
import Link from "next/link";
import {
  Search,
  X,
  LayoutGrid,
  List,
  Filter,
  Plus,
  Clock,
  BookOpen,
  ArrowUpDown,
  Tag,
  Radio,
  BarChart3,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from "lucide-react";

const BIAS_CLASS: Record<string, string> = {
  bullish: "pill-up",
  bearish: "pill-down",
};
const OUTCOME_CLASS: Record<string, string> = {
  win: "pill-up",
  loss: "pill-down",
};
const NEUTRAL_BADGE = "pill-gold";

interface ChartsExplorerProps {
  charts: ChartSummary[];
  lang?: "en" | "bn";
  dict: any;
}

const PAGE_SIZE = 24;

const toCandles = (thumb: OhlcTuple[]) =>
  thumb.map(([o, h, l, c]) => ({ o, h, l, c }));

export function ChartsExplorer({
  charts,
  lang = "en",
  dict,
}: ChartsExplorerProps) {
  const isDev = process.env.NODE_ENV === "development";

  // Collection tabs
  const [activeCollection, setActiveCollection] = useState<string>("ALL");

  // Search and Filters state
  const [search, setSearch] = useState("");
  const [selectedSymbol, setSelectedSymbol] = useState("ALL");
  const [selectedTimeframe, setSelectedTimeframe] = useState("ALL");
  const [selectedType, setSelectedType] = useState("ALL");
  const [selectedBias, setSelectedBias] = useState("ALL");
  const [selectedOutcome, setSelectedOutcome] = useState("ALL");
  const [selectedModule, setSelectedModule] = useState("ALL");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Sort and view mode
  const [sortBy, setSortBy] = useState<
    "newest" | "edited" | "alphabetical" | "mostUsed"
  >("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Modal detail view
  const [selectedChartIndex, setSelectedChartIndex] = useState<number | null>(
    null,
  );

  // Dynamic filter options extracted from data
  const symbols = useMemo(() => {
    const set = new Set<string>();
    charts.forEach((c) => c.symbol && set.add(c.symbol));
    return Array.from(set).sort();
  }, [charts]);

  const timeframes = useMemo(() => {
    const set = new Set<string>();
    charts.forEach((c) => c.timeframe && set.add(c.timeframe));
    return Array.from(set).sort();
  }, [charts]);

  const types = useMemo(() => {
    const set = new Set<string>();
    charts.forEach((c) => c.type && set.add(c.type));
    return Array.from(set).sort();
  }, [charts]);

  const modules = useMemo(() => {
    const set = new Set<string>();
    charts.forEach((c) => c.module && set.add(c.module));
    return Array.from(set).sort();
  }, [charts]);

  const allTags = useMemo(() => {
    const map = new Map<string, number>();
    charts.forEach((c) => {
      c.tags?.forEach((t) => {
        map.set(t, (map.get(t) || 0) + 1);
      });
    });
    return Array.from(map.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 16);
  }, [charts]);

  // Filtering logic
  const filteredCharts = useMemo(() => {
    if (activeCollection === "LIVE") return [];

    return charts.filter((c) => {
      // 1. Collection Tab Filter
      if (activeCollection === "PATTERNS" && c.type !== "pattern") return false;
      if (activeCollection === "REAL" && c.type !== "real") return false;
      if (activeCollection === "SETUPS" && c.type !== "trade-setup")
        return false;
      if (activeCollection === "REVIEWS" && c.type !== "trade-review")
        return false;
      if (activeCollection === "CONCEPTS" && c.type !== "concept") return false;

      // 2. Specific Select Filters
      if (selectedSymbol !== "ALL" && c.symbol !== selectedSymbol) return false;
      if (selectedTimeframe !== "ALL" && c.timeframe !== selectedTimeframe)
        return false;
      if (selectedType !== "ALL" && c.type !== selectedType) return false;
      if (selectedBias !== "ALL" && c.bias !== selectedBias) return false;
      if (selectedOutcome !== "ALL" && c.outcome !== selectedOutcome)
        return false;
      if (selectedModule !== "ALL" && c.module !== selectedModule) return false;
      if (selectedTag && !c.tags?.includes(selectedTag)) return false;

      // 3. Search text
      if (search.trim()) {
        const q = search.toLowerCase();
        const title = getLocalizedText(c.title, lang).toLowerCase();
        const notes = getLocalizedText(c.notes, lang).toLowerCase();
        const caption = getLocalizedText(c.caption, lang).toLowerCase();
        const matches =
          title.includes(q) ||
          caption.includes(q) ||
          notes.includes(q) ||
          c.id?.toLowerCase().includes(q) ||
          c.symbol?.toLowerCase().includes(q) ||
          c.tags?.some((t) => t.toLowerCase().includes(q));
        if (!matches) return false;
      }

      return true;
    });
  }, [
    charts,
    activeCollection,
    selectedSymbol,
    selectedTimeframe,
    selectedType,
    selectedBias,
    selectedOutcome,
    selectedModule,
    selectedTag,
    search,
    lang,
  ]);

  // Sorting logic
  const sortedCharts = useMemo(() => {
    return [...filteredCharts].sort((a, b) => {
      if (sortBy === "newest" || sortBy === "edited") {
        return (b.updatedAt || "").localeCompare(a.updatedAt || "");
      }
      if (sortBy === "alphabetical") {
        return getLocalizedText(a.title, lang).localeCompare(
          getLocalizedText(b.title, lang),
        );
      }
      if (sortBy === "mostUsed") {
        return (b.lessonSlugs?.length || 0) - (a.lessonSlugs?.length || 0);
      }
      return 0;
    });
  }, [filteredCharts, sortBy, lang]);

  // Render cards in pages: all ~250 SVG thumbnails at once blocked the main
  // thread for seconds. Paging resets whenever the filter/sort result changes.
  const resultKey = useMemo(
    () => sortedCharts.map((c) => c.id).join("|"),
    [sortedCharts],
  );
  const [paging, setPaging] = useState({ key: resultKey, limit: PAGE_SIZE });
  const visibleLimit = paging.key === resultKey ? paging.limit : PAGE_SIZE;
  const visibleCharts = sortedCharts.slice(0, visibleLimit);
  const hiddenCount = sortedCharts.length - visibleCharts.length;

  const handleClearFilters = () => {
    setSearch("");
    setSelectedSymbol("ALL");
    setSelectedTimeframe("ALL");
    setSelectedType("ALL");
    setSelectedBias("ALL");
    setSelectedOutcome("ALL");
    setSelectedModule("ALL");
    setSelectedTag(null);
  };

  const hasActiveFilters =
    Boolean(search) ||
    selectedSymbol !== "ALL" ||
    selectedTimeframe !== "ALL" ||
    selectedType !== "ALL" ||
    selectedBias !== "ALL" ||
    selectedOutcome !== "ALL" ||
    selectedModule !== "ALL" ||
    selectedTag !== null;

  const currentModalChart =
    selectedChartIndex !== null && sortedCharts[selectedChartIndex]
      ? sortedCharts[selectedChartIndex]
      : null;
  // Gallery data is a light summary; the modal needs the full chart.
  const modalChart = useChartById(currentModalChart?.id ?? null);
  const closeModal = () => setSelectedChartIndex(null);

  return (
    <div className="space-y-8">
      {/* Dev-only shortcut; page title lives in PageHeader */}
      {isDev && (
        <div className="flex justify-end">
          <Link
            href={`/${lang}/studio/chart-lab`}
            className="btn btn-sm"
          >
            <Plus className="h-4 w-4" />
            <span>{dict.newChart}</span>
          </Link>
        </div>
      )}

      {/* Collection Tabs Bar */}
      <div className="flex scrollbar-none flex-wrap items-center gap-2">
        {[
          { id: "ALL", label: dict.collections.all, icon: BarChart3 },
          { id: "PATTERNS", label: dict.collections.patterns },
          { id: "REAL", label: dict.collections.real },
          { id: "SETUPS", label: dict.collections.setups },
          { id: "REVIEWS", label: dict.collections.reviews },
          { id: "CONCEPTS", label: dict.collections.concepts },
          { id: "LIVE", label: dict.collections.live, icon: Radio },
        ].map((tab) => {
          const isActive = activeCollection === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveCollection(tab.id)}
              aria-pressed={isActive}
              className="chip"
            >
              {Icon && <Icon className="h-4 w-4" />}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* If Live Tab selected, show TVWidget directly */}
      {activeCollection === "LIVE" ? (
        <TVWidget />
      ) : (
        <>
          {/* Search and Filters Card */}
          <div className="card space-y-4">
            {/* Search Input Bar */}
            <div className="relative">
              <Search className="text-mute absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={dict.searchPlaceholder}
                className="input pr-10 pl-11"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="text-mute hover:text-fg hover:bg-bg2 absolute top-1/2 right-3.5 -translate-y-1/2 rounded-full p-1 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Filter Dropdowns Grid */}
            <div className="grid grid-cols-2 gap-2.5 text-xs sm:grid-cols-3 lg:grid-cols-6">
              {/* Symbol */}
              <div>
                <label htmlFor="chart-filter-symbol" className="text-mute mb-1 block font-mono text-[10px] tracking-wider uppercase">
                  {dict.filters.symbol}
                </label>
                <select id="chart-filter-symbol"
                  value={selectedSymbol}
                  onChange={(e) => setSelectedSymbol(e.target.value)}
                  className="bg-bg2 border-line text-fg focus:border-gold w-full rounded-lg border px-2.5 py-1.5 font-mono focus:outline-none"
                >
                  <option value="ALL">{dict.all}</option>
                  {symbols.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* Timeframe */}
              <div>
                <label htmlFor="chart-filter-timeframe" className="text-mute mb-1 block font-mono text-[10px] tracking-wider uppercase">
                  {dict.filters.timeframe}
                </label>
                <select id="chart-filter-timeframe"
                  value={selectedTimeframe}
                  onChange={(e) => setSelectedTimeframe(e.target.value)}
                  className="bg-bg2 border-line text-fg focus:border-gold w-full rounded-lg border px-2.5 py-1.5 font-mono focus:outline-none"
                >
                  <option value="ALL">{dict.all}</option>
                  {timeframes.map((tf) => (
                    <option key={tf} value={tf}>
                      {tf}
                    </option>
                  ))}
                </select>
              </div>

              {/* Type */}
              <div>
                <label htmlFor="chart-filter-type" className="text-mute mb-1 block font-mono text-[10px] tracking-wider uppercase">
                  {dict.filters.type}
                </label>
                <select id="chart-filter-type"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="bg-bg2 border-line text-fg focus:border-gold w-full rounded-lg border px-2.5 py-1.5 capitalize focus:outline-none"
                >
                  <option value="ALL">{dict.all}</option>
                  {types.map((t) => (
                    <option key={t} value={t}>
                      {t.replace(/-/g, " ")}
                    </option>
                  ))}
                </select>
              </div>

              {/* Bias */}
              <div>
                <label htmlFor="chart-filter-bias" className="text-mute mb-1 block font-mono text-[10px] tracking-wider uppercase">
                  {dict.filters.bias}
                </label>
                <select id="chart-filter-bias"
                  value={selectedBias}
                  onChange={(e) => setSelectedBias(e.target.value)}
                  className="bg-bg2 border-line text-fg focus:border-gold w-full rounded-lg border px-2.5 py-1.5 capitalize focus:outline-none"
                >
                  <option value="ALL">{dict.all}</option>
                  <option value="bullish">Bullish</option>
                  <option value="bearish">Bearish</option>
                  <option value="neutral">Neutral</option>
                </select>
              </div>

              {/* Outcome */}
              <div>
                <label htmlFor="chart-filter-outcome" className="text-mute mb-1 block font-mono text-[10px] tracking-wider uppercase">
                  {dict.filters.outcome}
                </label>
                <select id="chart-filter-outcome"
                  value={selectedOutcome}
                  onChange={(e) => setSelectedOutcome(e.target.value)}
                  className="bg-bg2 border-line text-fg focus:border-gold w-full rounded-lg border px-2.5 py-1.5 capitalize focus:outline-none"
                >
                  <option value="ALL">{dict.all}</option>
                  <option value="win">Win</option>
                  <option value="loss">Loss</option>
                  <option value="breakeven">Breakeven</option>
                  <option value="no-trade">No Trade</option>
                </select>
              </div>

              {/* Module */}
              <div>
                <label htmlFor="chart-filter-module" className="text-mute mb-1 block font-mono text-[10px] tracking-wider uppercase">
                  {dict.filters.module}
                </label>
                <select id="chart-filter-module"
                  value={selectedModule}
                  onChange={(e) => setSelectedModule(e.target.value)}
                  className="bg-bg2 border-line text-fg focus:border-gold w-full truncate rounded-lg border px-2.5 py-1.5 focus:outline-none"
                >
                  <option value="ALL">{dict.all}</option>
                  {modules.map((m) => (
                    <option key={m} value={m}>
                      {m.replace(/^\d+-/, "").replace(/-/g, " ")}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Tags Pills Filter */}
            {allTags.length > 0 && (
              <div className="border-line flex flex-wrap items-center gap-1.5 border-t pt-2">
                <span className="text-mute mr-1 flex items-center gap-1 font-mono text-[11px]">
                  <Tag className="text-gold h-3 w-3" />
                  <span>Tags:</span>
                </span>
                {allTags.map(([tag, count]) => {
                  const isSelected = selectedTag === tag;
                  return (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(isSelected ? null : tag)}
                      className={`flex items-center gap-1 rounded-full px-2.5 py-0.5 font-mono text-[11px] transition-colors ${
                        isSelected
                          ? "bg-gold text-gold-ink"
                          : "text-mute hover:text-fg border-line hover:border-mute border"
                      }`}
                    >
                      <span>#{tag}</span>
                      <span className="text-[10px]">({count})</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Results Bar: Filter Count, Clear Button, Sort & View Mode */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <span className="text-mute">
                Showing{" "}
                <strong className="text-fg">
                  {sortedCharts.length}
                </strong>{" "}
                of {charts.length} charts
              </span>
              {hasActiveFilters && (
                <button
                  onClick={handleClearFilters}
                  className="text-fg font-medium underline-offset-4 hover:underline"
                >
                  {dict.filters.clearAll}
                </button>
              )}
            </div>

            <div className="flex items-center gap-3">
              {/* Sort Dropdown */}
              <div className="flex items-center gap-1.5">
                <span className="text-mute hidden sm:inline">
                  {dict.sort.label}:
                </span>
                <select
                  aria-label={dict.sort.label}
                  value={sortBy}
                  onChange={(e: any) => setSortBy(e.target.value)}
                  className="bg-surface border-line text-fg focus:border-gold rounded-lg border px-2.5 py-1 font-medium focus:outline-none"
                >
                  <option value="newest">{dict.sort.newest}</option>
                  <option value="edited">{dict.sort.edited}</option>
                  <option value="alphabetical">{dict.sort.alphabetical}</option>
                  <option value="mostUsed">{dict.sort.mostUsed}</option>
                </select>
              </div>

              {/* View Toggle */}
              <div className="bg-surface border-line flex items-center rounded-full border p-0.5">
                <button
                  onClick={() => setViewMode("grid")}
                  title={dict.view.grid}
                  className={`rounded-full p-1.5 ${
                    viewMode === "grid"
                      ? "bg-gold text-gold-ink"
                      : "text-mute hover:text-fg"
                  }`}
                >
                  <LayoutGrid className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  title={dict.view.list}
                  className={`rounded-full p-1.5 ${
                    viewMode === "list"
                      ? "bg-gold text-gold-ink"
                      : "text-mute hover:text-fg"
                  }`}
                >
                  <List className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Empty State */}
          {sortedCharts.length === 0 && (
            <div className="card space-y-4 border-dashed px-4 py-20 text-center">
              <div className="bg-bg2 text-mute mx-auto flex h-14 w-14 items-center justify-center rounded-2xl">
                <BarChart3 className="h-7 w-7" />
              </div>
              <h2 className="text-fg text-lg">
                {dict.empty.title}
              </h2>
              <p className="text-mute mx-auto max-w-md text-sm">
                {dict.empty.desc}
              </p>
              <button
                onClick={handleClearFilters}
                className="btn btn-gold btn-sm"
              >
                {dict.empty.clearButton}
              </button>
            </div>
          )}

          {/* Cards Display (Grid View) */}
          {viewMode === "grid" && sortedCharts.length > 0 && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {visibleCharts.map((chart, idx) => {
                const biasBadgeColor = BIAS_CLASS[chart.bias ?? ""] ?? NEUTRAL_BADGE;
                const outcomeColor =
                  OUTCOME_CLASS[chart.outcome ?? ""] ?? NEUTRAL_BADGE;

                const formattedDate = chart.updatedAt
                  ? new Date(chart.updatedAt).toLocaleDateString(
                      lang === "bn" ? "bn-BD" : "en-US",
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      },
                    )
                  : null;

                return (
                  <div
                    key={chart.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => setSelectedChartIndex(idx)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelectedChartIndex(idx);
                      }
                    }}
                    className="card group hover:border-mute focus-visible:border-gold flex cursor-pointer flex-col gap-4 transition-colors focus-visible:outline-none"
                  >
                    {/* Thumbnail */}
                    <div className="bg-bg2 relative overflow-hidden rounded-xl">
                      <ChartThumbnail
                        candles={toCandles(chart.thumb)}
                        annotations={chart.thumbAnnotations}
                      />
                      {/* Overlay badge on top right */}
                      <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
                        <span
                          className={`pill ${biasBadgeColor}`}
                        >
                          {chart.bias}
                        </span>
                        {chart.outcome && (
                          <span
                            className={`pill uppercase ${outcomeColor}`}
                          >
                            {chart.outcome}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="flex flex-1 flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        {/* Symbol and Timeframe Badges */}
                        <div className="flex items-center gap-2">
                          <span className="text-gold font-mono text-xs font-medium">
                            {chart.symbol}
                          </span>
                          <span className="text-mute bg-bg2 rounded px-1.5 py-0.5 font-mono text-[11px]">
                            {chart.timeframe}
                          </span>
                          <span className="text-mute ml-auto font-mono text-[10px] tracking-wider uppercase">
                            {chart.type.replace(/-/g, " ")}
                          </span>
                        </div>

                        {/* Title */}
                        <h2 className="group-hover:text-gold line-clamp-2 text-[20px] leading-snug transition-colors">
                          {getLocalizedText(chart.title, lang)}
                        </h2>

                        {/* Caption if exists */}
                        {chart.caption && (
                          <p className="text-fg2 line-clamp-2 text-sm">
                            {getLocalizedText(chart.caption, lang)}
                          </p>
                        )}
                      </div>

                      <div className="border-line space-y-3 border-t pt-3 text-xs">
                        {/* Tags */}
                        {chart.tags && chart.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {chart.tags.slice(0, 3).map((t) => (
                              <span
                                key={t}
                                className="bg-bg2 text-mute rounded px-1.5 py-0.5 font-mono text-[10px]"
                              >
                                #{t}
                              </span>
                            ))}
                            {chart.tags.length > 3 && (
                              <span className="text-mute font-mono text-[10px] opacity-60">
                                +{chart.tags.length - 3}
                              </span>
                            )}
                          </div>
                        )}

                        {/* Footer: Lesson links & Updated Date */}
                        <div className="text-mute flex items-center justify-between pt-1 font-mono text-[11px]">
                          {chart.lessonSlugs && chart.lessonSlugs.length > 0 ? (
                            <span className="text-fg2 flex max-w-[170px] items-center gap-1 truncate">
                              <BookOpen className="h-3 w-3 shrink-0" />
                              <span className="truncate">
                                {chart.lessonSlugs[0]}
                              </span>
                            </span>
                          ) : (
                            <span className="opacity-60">
                              {dict.card.notUsed}
                            </span>
                          )}

                          {formattedDate && (
                            <span className="flex shrink-0 items-center gap-1 opacity-70">
                              <Clock className="h-3 w-3" />
                              <span>{formattedDate}</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Cards Display (List View) */}
          {viewMode === "list" && sortedCharts.length > 0 && (
            <div className="border-line border-t">
              {visibleCharts.map((chart, idx) => {
                const biasBadgeColor = BIAS_CLASS[chart.bias ?? ""] ?? NEUTRAL_BADGE;

                const itemTitle = getLocalizedText(chart.title, lang);
                const itemCaption =
                  getLocalizedText(chart.caption, lang) ||
                  getLocalizedText(chart.notes, lang);

                return (
                  <div
                    key={chart.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => setSelectedChartIndex(idx)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelectedChartIndex(idx);
                      }
                    }}
                    className="group border-line hover:bg-surface focus-visible:ring-gold/40 flex cursor-pointer flex-col items-start justify-between gap-4 border-b px-1 py-4 transition-colors focus-visible:ring-2 focus-visible:outline-none sm:flex-row sm:items-center"
                  >
                    <div className="flex items-center gap-3">
                      {/* Mini indicator */}
                      <span className="text-mute w-12 shrink-0 font-mono text-xs">
                        {chart.symbol.slice(0, 3)}
                      </span>

                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-fg text-sm font-medium tracking-tight">
                            {itemTitle}
                          </h4>
                          <span
                            className={`py-0.5 rounded-full border px-2 text-[10px] font-semibold capitalize ${biasBadgeColor}`}
                          >
                            {chart.bias}
                          </span>
                        </div>
                        <p className="text-mute mt-0.5 line-clamp-1 text-xs">
                          {itemCaption ||
                            `${chart.symbol} ${chart.timeframe} chart`}
                        </p>
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-3 font-mono text-xs">
                      <span className="bg-bg2 text-mute rounded px-2 py-0.5 text-[11px]">
                        {chart.timeframe}
                      </span>
                      {chart.lessonSlugs && chart.lessonSlugs.length > 0 && (
                        <span className="text-mute flex items-center gap-1 text-[11px]">
                          <BookOpen className="h-3 w-3" />
                          <span>{chart.lessonSlugs.length} lessons</span>
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {hiddenCount > 0 && (
            <div className="flex justify-center">
              <button
                type="button"
                className="btn"
                onClick={() =>
                  setPaging({ key: resultKey, limit: visibleLimit + PAGE_SIZE })
                }
              >
                {lang === "bn"
                  ? `আরও দেখুন (${hiddenCount})`
                  : `Show more (${hiddenCount})`}
              </button>
            </div>
          )}
        </>
      )}

      {/* Modal Detail View */}
      {currentModalChart && !modalChart && (
        <div
          className="bg-bg/80 fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={getLocalizedText(currentModalChart.title, lang)}
          onClick={closeModal}
        >
          <p className="card text-fg2 font-mono text-sm" role="status">
            {modalChart === null
              ? lang === "bn"
                ? "চার্ট লোড করা যায়নি।"
                : "Could not load this chart."
              : lang === "bn"
                ? "চার্ট লোড হচ্ছে…"
                : "Loading chart…"}
          </p>
        </div>
      )}
      {currentModalChart && modalChart && (
        <ChartDetailModal
          chart={modalChart}
          onClose={closeModal}
          onNext={() =>
            setSelectedChartIndex((prev) =>
              prev !== null && prev < sortedCharts.length - 1 ? prev + 1 : prev,
            )
          }
          onPrev={() =>
            setSelectedChartIndex((prev) =>
              prev !== null && prev > 0 ? prev - 1 : prev,
            )
          }
          hasNext={
            selectedChartIndex !== null &&
            selectedChartIndex < sortedCharts.length - 1
          }
          hasPrev={selectedChartIndex !== null && selectedChartIndex > 0}
          lang={lang}
          dict={dict}
        />
      )}
    </div>
  );
}
