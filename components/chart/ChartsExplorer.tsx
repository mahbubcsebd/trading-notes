'use client';

import React, { useState, useMemo } from 'react';
import { ChartData, getLocalizedText } from '@/lib/chart-types';
import { ChartThumbnail } from './ChartThumbnail';
import { ChartDetailModal } from './ChartDetailModal';
import { TVWidget } from './TVWidget';
import Link from 'next/link';
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
} from 'lucide-react';

interface ChartsExplorerProps {
  charts: ChartData[];
  lang?: 'en' | 'bn';
  dict: any;
}

export function ChartsExplorer({ charts, lang = 'en', dict }: ChartsExplorerProps) {
  const isDev = process.env.NODE_ENV === 'development';

  // Collection tabs
  const [activeCollection, setActiveCollection] = useState<string>('ALL');

  // Search and Filters state
  const [search, setSearch] = useState('');
  const [selectedSymbol, setSelectedSymbol] = useState('ALL');
  const [selectedTimeframe, setSelectedTimeframe] = useState('ALL');
  const [selectedType, setSelectedType] = useState('ALL');
  const [selectedBias, setSelectedBias] = useState('ALL');
  const [selectedOutcome, setSelectedOutcome] = useState('ALL');
  const [selectedModule, setSelectedModule] = useState('ALL');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Sort and view mode
  const [sortBy, setSortBy] = useState<'newest' | 'edited' | 'alphabetical' | 'mostUsed'>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Modal detail view
  const [selectedChartIndex, setSelectedChartIndex] = useState<number | null>(null);

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
    if (activeCollection === 'LIVE') return [];

    return charts.filter((c) => {
      // 1. Collection Tab Filter
      if (activeCollection === 'PATTERNS' && c.type !== 'pattern') return false;
      if (activeCollection === 'REAL' && c.type !== 'real') return false;
      if (activeCollection === 'SETUPS' && c.type !== 'trade-setup') return false;
      if (activeCollection === 'REVIEWS' && c.type !== 'trade-review') return false;
      if (activeCollection === 'CONCEPTS' && c.type !== 'concept') return false;

      // 2. Specific Select Filters
      if (selectedSymbol !== 'ALL' && c.symbol !== selectedSymbol) return false;
      if (selectedTimeframe !== 'ALL' && c.timeframe !== selectedTimeframe) return false;
      if (selectedType !== 'ALL' && c.type !== selectedType) return false;
      if (selectedBias !== 'ALL' && c.bias !== selectedBias) return false;
      if (selectedOutcome !== 'ALL' && c.outcome !== selectedOutcome) return false;
      if (selectedModule !== 'ALL' && c.module !== selectedModule) return false;
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
      if (sortBy === 'newest' || sortBy === 'edited') {
        return (b.updatedAt || '').localeCompare(a.updatedAt || '');
      }
      if (sortBy === 'alphabetical') {
        return getLocalizedText(a.title, lang).localeCompare(getLocalizedText(b.title, lang));
      }
      if (sortBy === 'mostUsed') {
        return (b.lessonSlugs?.length || 0) - (a.lessonSlugs?.length || 0);
      }
      return 0;
    });
  }, [filteredCharts, sortBy, lang]);

  const handleClearFilters = () => {
    setSearch('');
    setSelectedSymbol('ALL');
    setSelectedTimeframe('ALL');
    setSelectedType('ALL');
    setSelectedBias('ALL');
    setSelectedOutcome('ALL');
    setSelectedModule('ALL');
    setSelectedTag(null);
  };

  const hasActiveFilters =
    Boolean(search) ||
    selectedSymbol !== 'ALL' ||
    selectedTimeframe !== 'ALL' ||
    selectedType !== 'ALL' ||
    selectedBias !== 'ALL' ||
    selectedOutcome !== 'ALL' ||
    selectedModule !== 'ALL' ||
    selectedTag !== null;

  const currentModalChart =
    selectedChartIndex !== null && sortedCharts[selectedChartIndex]
      ? sortedCharts[selectedChartIndex]
      : null;

  return (
    <div className="space-y-8">
      {/* Top Header: Title, Count, Search & New Chart Dev Button */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
              {dict.title}
            </h1>
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold font-mono bg-gold/15 text-gold border border-gold/30">
              {charts.length} {dict.chartsCount}
            </span>
          </div>
          <p className="text-sm sm:text-base text-muted-foreground mt-1 max-w-2xl">
            {dict.desc}
          </p>
        </div>

        {/* Right tools (Search & New Chart) */}
        <div className="flex items-center gap-3">
          {isDev && (
            <Link
              href="/studio/chart-lab"
              className="px-4 py-2.5 rounded-xl bg-gold text-black font-semibold text-xs sm:text-sm hover:bg-gold/90 transition-colors shadow-sm flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>{dict.newChart}</span>
            </Link>
          )}
        </div>
      </div>

      {/* Collection Tabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-b border-border/70">
        {[
          { id: 'ALL', label: dict.collections.all, icon: BarChart3 },
          { id: 'PATTERNS', label: dict.collections.patterns },
          { id: 'REAL', label: dict.collections.real },
          { id: 'SETUPS', label: dict.collections.setups },
          { id: 'REVIEWS', label: dict.collections.reviews },
          { id: 'CONCEPTS', label: dict.collections.concepts },
          { id: 'LIVE', label: dict.collections.live, icon: Radio },
        ].map((tab) => {
          const isActive = activeCollection === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveCollection(tab.id)}
              className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-semibold transition-all shrink-0 flex items-center gap-2 border-b-2 ${
                isActive
                  ? 'border-gold text-gold bg-gold/5'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/30'
              }`}
            >
              {Icon && <Icon className="w-4 h-4" />}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* If Live Tab selected, show TVWidget directly */}
      {activeCollection === 'LIVE' ? (
        <TVWidget />
      ) : (
        <>
          {/* Search and Filters Card */}
          <div className="rounded-2xl border border-border/80 bg-card p-4 sm:p-5 shadow-lg space-y-4">
            {/* Search Input Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={dict.searchPlaceholder}
                className="w-full bg-background border border-border/70 rounded-xl pl-11 pr-10 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition-all"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted/50 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Filter Dropdowns Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 text-xs">
              {/* Symbol */}
              <div>
                <label className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider block mb-1">
                  {dict.filters.symbol}
                </label>
                <select
                  value={selectedSymbol}
                  onChange={(e) => setSelectedSymbol(e.target.value)}
                  className="w-full bg-background border border-border/70 rounded-lg px-2.5 py-1.5 text-foreground focus:outline-none focus:border-gold font-mono"
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
                <label className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider block mb-1">
                  {dict.filters.timeframe}
                </label>
                <select
                  value={selectedTimeframe}
                  onChange={(e) => setSelectedTimeframe(e.target.value)}
                  className="w-full bg-background border border-border/70 rounded-lg px-2.5 py-1.5 text-foreground focus:outline-none focus:border-gold font-mono"
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
                <label className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider block mb-1">
                  {dict.filters.type}
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full bg-background border border-border/70 rounded-lg px-2.5 py-1.5 text-foreground focus:outline-none focus:border-gold capitalize"
                >
                  <option value="ALL">{dict.all}</option>
                  {types.map((t) => (
                    <option key={t} value={t}>
                      {t.replace(/-/g, ' ')}
                    </option>
                  ))}
                </select>
              </div>

              {/* Bias */}
              <div>
                <label className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider block mb-1">
                  {dict.filters.bias}
                </label>
                <select
                  value={selectedBias}
                  onChange={(e) => setSelectedBias(e.target.value)}
                  className="w-full bg-background border border-border/70 rounded-lg px-2.5 py-1.5 text-foreground focus:outline-none focus:border-gold capitalize"
                >
                  <option value="ALL">{dict.all}</option>
                  <option value="bullish">Bullish</option>
                  <option value="bearish">Bearish</option>
                  <option value="neutral">Neutral</option>
                </select>
              </div>

              {/* Outcome */}
              <div>
                <label className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider block mb-1">
                  {dict.filters.outcome}
                </label>
                <select
                  value={selectedOutcome}
                  onChange={(e) => setSelectedOutcome(e.target.value)}
                  className="w-full bg-background border border-border/70 rounded-lg px-2.5 py-1.5 text-foreground focus:outline-none focus:border-gold capitalize"
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
                <label className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider block mb-1">
                  {dict.filters.module}
                </label>
                <select
                  value={selectedModule}
                  onChange={(e) => setSelectedModule(e.target.value)}
                  className="w-full bg-background border border-border/70 rounded-lg px-2.5 py-1.5 text-foreground focus:outline-none focus:border-gold truncate"
                >
                  <option value="ALL">{dict.all}</option>
                  {modules.map((m) => (
                    <option key={m} value={m}>
                      {m.replace(/^\d+-/, '').replace(/-/g, ' ')}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Tags Pills Filter */}
            {allTags.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-border/50">
                <span className="text-[11px] font-mono text-muted-foreground mr-1 flex items-center gap-1">
                  <Tag className="w-3 h-3 text-gold" />
                  <span>Tags:</span>
                </span>
                {allTags.map(([tag, count]) => {
                  const isSelected = selectedTag === tag;
                  return (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(isSelected ? null : tag)}
                      className={`px-2 py-0.5 rounded-md text-[11px] font-mono transition-all flex items-center gap-1 ${
                        isSelected
                          ? 'bg-gold text-black font-bold'
                          : 'bg-muted/50 text-muted-foreground hover:text-foreground border border-border/60 hover:bg-muted'
                      }`}
                    >
                      <span>#{tag}</span>
                      <span className="opacity-60 text-[9px]">({count})</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Results Bar: Filter Count, Clear Button, Sort & View Mode */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <span className="text-muted-foreground">
                Showing <strong className="text-foreground">{sortedCharts.length}</strong> of{' '}
                {charts.length} charts
              </span>
              {hasActiveFilters && (
                <button
                  onClick={handleClearFilters}
                  className="text-gold hover:underline font-semibold"
                >
                  {dict.filters.clearAll}
                </button>
              )}
            </div>

            <div className="flex items-center gap-3">
              {/* Sort Dropdown */}
              <div className="flex items-center gap-1.5">
                <span className="text-muted-foreground hidden sm:inline">{dict.sort.label}:</span>
                <select
                  value={sortBy}
                  onChange={(e: any) => setSortBy(e.target.value)}
                  className="bg-card border border-border/70 rounded-lg px-2.5 py-1 text-foreground focus:outline-none focus:border-gold font-medium"
                >
                  <option value="newest">{dict.sort.newest}</option>
                  <option value="edited">{dict.sort.edited}</option>
                  <option value="alphabetical">{dict.sort.alphabetical}</option>
                  <option value="mostUsed">{dict.sort.mostUsed}</option>
                </select>
              </div>

              {/* View Toggle */}
              <div className="flex items-center bg-card border border-border/70 rounded-lg p-0.5">
                <button
                  onClick={() => setViewMode('grid')}
                  title={dict.view.grid}
                  className={`p-1 rounded ${
                    viewMode === 'grid'
                      ? 'bg-gold text-black shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  title={dict.view.list}
                  className={`p-1 rounded ${
                    viewMode === 'list'
                      ? 'bg-gold text-black shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <List className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Empty State */}
          {sortedCharts.length === 0 && (
            <div className="text-center py-20 px-4 bg-card/60 rounded-3xl border border-dashed border-border/80 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-muted/60 flex items-center justify-center mx-auto text-muted-foreground">
                <BarChart3 className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-foreground">{dict.empty.title}</h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                {dict.empty.desc}
              </p>
              <button
                onClick={handleClearFilters}
                className="px-4 py-2 bg-gold text-black rounded-xl text-sm font-semibold hover:bg-gold/90 transition-colors"
              >
                {dict.empty.clearButton}
              </button>
            </div>
          )}

          {/* Cards Display (Grid View) */}
          {viewMode === 'grid' && sortedCharts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedCharts.map((chart, idx) => {
                const biasBadgeColor =
                  chart.bias === 'bullish'
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    : chart.bias === 'bearish'
                    ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                    : 'bg-muted/40 text-muted-foreground border-border/60';

                const outcomeColor =
                  chart.outcome === 'win'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : chart.outcome === 'loss'
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                    : 'bg-amber-500/20 text-amber-300 border-amber-500/40';

                const formattedDate = chart.updatedAt
                  ? new Date(chart.updatedAt).toLocaleDateString(lang === 'bn' ? 'bn-BD' : 'en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })
                  : null;

                return (
                  <div
                    key={chart.id}
                    onClick={() => setSelectedChartIndex(idx)}
                    className="group rounded-2xl border border-border/80 bg-card overflow-hidden shadow-md hover:shadow-xl hover:border-gold/50 transition-all duration-200 cursor-pointer flex flex-col"
                  >
                    {/* Thumbnail */}
                    <div className="relative border-b border-border/60 overflow-hidden">
                      <ChartThumbnail
                        candles={chart.candles}
                        annotations={chart.annotations}
                      />
                      {/* Overlay badge on top right */}
                      <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border capitalize backdrop-blur-md ${biasBadgeColor}`}>
                          {chart.bias}
                        </span>
                        {chart.outcome && (
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase border backdrop-blur-md ${outcomeColor}`}>
                            {chart.outcome}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        {/* Symbol and Timeframe Badges */}
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-gold px-2 py-0.5 rounded bg-gold/10 border border-gold/30">
                            {chart.symbol}
                          </span>
                          <span className="font-mono text-[11px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                            {chart.timeframe}
                          </span>
                          <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-mono ml-auto">
                            {chart.type.replace(/-/g, ' ')}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="font-bold text-foreground text-base group-hover:text-gold transition-colors line-clamp-2">
                          {getLocalizedText(chart.title, lang)}
                        </h3>

                        {/* Caption if exists */}
                        {chart.caption && (
                          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                            {getLocalizedText(chart.caption, lang)}
                          </p>
                        )}
                      </div>

                      <div className="space-y-3 pt-2 border-t border-border/40 text-xs">
                        {/* Tags */}
                        {chart.tags && chart.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {chart.tags.slice(0, 3).map((t) => (
                              <span
                                key={t}
                                className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-muted/50 text-muted-foreground"
                              >
                                #{t}
                              </span>
                            ))}
                            {chart.tags.length > 3 && (
                              <span className="text-[10px] font-mono text-muted-foreground opacity-60">
                                +{chart.tags.length - 3}
                              </span>
                            )}
                          </div>
                        )}

                        {/* Footer: Lesson links & Updated Date */}
                        <div className="flex items-center justify-between text-[11px] text-muted-foreground font-mono pt-1">
                          {chart.lessonSlugs && chart.lessonSlugs.length > 0 ? (
                            <span className="flex items-center gap-1 text-gold/90 truncate max-w-[170px]">
                              <BookOpen className="w-3 h-3 shrink-0" />
                              <span className="truncate">{chart.lessonSlugs[0]}</span>
                            </span>
                          ) : (
                            <span className="opacity-60">{dict.card.notUsed}</span>
                          )}

                          {formattedDate && (
                            <span className="flex items-center gap-1 opacity-70 shrink-0">
                              <Clock className="w-3 h-3" />
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
          {viewMode === 'list' && sortedCharts.length > 0 && (
            <div className="space-y-3">
              {sortedCharts.map((chart, idx) => {
                const biasBadgeColor =
                  chart.bias === 'bullish'
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    : chart.bias === 'bearish'
                    ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                    : 'bg-muted/40 text-muted-foreground border-border/60';

                const itemTitle = getLocalizedText(chart.title, lang);
                const itemCaption = getLocalizedText(chart.caption, lang) || getLocalizedText(chart.notes, lang);

                return (
                  <div
                    key={chart.id}
                    onClick={() => setSelectedChartIndex(idx)}
                    className="group rounded-xl border border-border/80 bg-card p-3 sm:p-4 hover:border-gold/50 shadow-sm transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      {/* Mini indicator */}
                      <span className="w-9 h-9 rounded-lg bg-gold/10 border border-gold/30 text-gold flex items-center justify-center font-mono font-bold text-xs shrink-0">
                        {chart.symbol.slice(0, 3)}
                      </span>

                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-foreground text-sm group-hover:text-gold transition-colors">
                            {itemTitle}
                          </h4>
                          <span className={`text-[10px] px-2 py-0.2 rounded-full font-semibold border capitalize ${biasBadgeColor}`}>
                            {chart.bias}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                          {itemCaption || `${chart.symbol} ${chart.timeframe} chart`}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-xs font-mono shrink-0">
                      <span className="bg-muted px-2 py-0.5 rounded text-[11px] text-muted-foreground">
                        {chart.timeframe}
                      </span>
                      {chart.lessonSlugs && chart.lessonSlugs.length > 0 && (
                        <span className="text-gold flex items-center gap-1 text-[11px]">
                          <BookOpen className="w-3 h-3" />
                          <span>{chart.lessonSlugs.length} lessons</span>
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* Modal Detail View */}
      {currentModalChart && (
        <ChartDetailModal
          chart={currentModalChart}
          onClose={() => setSelectedChartIndex(null)}
          onNext={() =>
            setSelectedChartIndex((prev) =>
              prev !== null && prev < sortedCharts.length - 1 ? prev + 1 : prev
            )
          }
          onPrev={() =>
            setSelectedChartIndex((prev) =>
              prev !== null && prev > 0 ? prev - 1 : prev
            )
          }
          hasNext={selectedChartIndex !== null && selectedChartIndex < sortedCharts.length - 1}
          hasPrev={selectedChartIndex !== null && selectedChartIndex > 0}
          lang={lang}
          dict={dict}
        />
      )}
    </div>
  );
}
