'use client';

import React, { useState, useEffect } from 'react';
import { ChartData, getLocalizedText } from '@/lib/chart-types';
import { CandleChart } from './CandleChart';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Copy,
  Check,
  ExternalLink,
  BookOpen,
  Edit3,
  Lightbulb,
  Target,
  ShieldAlert,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  Scale,
  BrainCircuit,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';

interface ChartDetailModalProps {
  chart: ChartData | null;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  hasNext?: boolean;
  hasPrev?: boolean;
  lang?: 'en' | 'bn';
  dict: any;
}

export function ChartDetailModal({
  chart,
  onClose,
  onNext,
  onPrev,
  hasNext = false,
  hasPrev = false,
  lang = 'en',
  dict,
}: ChartDetailModalProps) {
  const [copiedMdx, setCopiedMdx] = useState(false);
  const isDev = process.env.NODE_ENV === 'development';
  const isEn = lang === 'en';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && hasNext && onNext) onNext();
      if (e.key === 'ArrowLeft' && hasPrev && onPrev) onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev, hasNext, hasPrev]);

  if (!chart) return null;

  const titleText = getLocalizedText(chart.title, lang);
  const captionText = getLocalizedText(chart.caption, lang);
  const notesText = getLocalizedText(chart.notes, lang);
  const explanationText = chart.explanation ? chart.explanation[lang] || chart.explanation.en : '';

  const mdxSnippet = `<Chart id="${chart.id}" height={420} caption="${captionText || titleText}" />`;

  const handleCopyMdx = () => {
    navigator.clipboard.writeText(mdxSnippet);
    setCopiedMdx(true);
    setTimeout(() => setCopiedMdx(false), 2000);
  };

  const biasColor =
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-card border border-border/80 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Modal Top Bar */}
        <div className="px-5 py-4 border-b border-border/70 bg-panel/60 flex items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 min-w-0">
            <span className="font-mono text-xs font-bold text-gold px-2.5 py-0.5 rounded-lg bg-gold/10 border border-gold/30 shrink-0">
              {chart.symbol} · {chart.timeframe}
            </span>
            <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium border capitalize shrink-0 ${biasColor}`}>
              {chart.bias}
            </span>
            {chart.outcome && (
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase border shrink-0 ${outcomeColor}`}>
                {chart.outcome}
              </span>
            )}
            <h2 className="text-base sm:text-lg font-bold text-foreground truncate max-w-md">
              {titleText}
            </h2>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Prev / Next buttons */}
            {hasPrev && (
              <button
                onClick={onPrev}
                title={dict.detail?.prevChart || 'Previous'}
                className="p-1.5 rounded-lg border border-border/60 text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}
            {hasNext && (
              <button
                onClick={onNext}
                title={dict.detail?.nextChart || 'Next'}
                className="p-1.5 rounded-lg border border-border/60 text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={onClose}
              title={dict.detail?.close || 'Close'}
              className="p-1.5 rounded-lg border border-border/60 text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Caption banner if available */}
          {captionText && (
            <div className="px-4 py-2.5 rounded-xl bg-panel/70 border border-border/60 text-sm text-foreground/90 font-medium leading-relaxed flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-gold shrink-0" />
              <span>{captionText}</span>
            </div>
          )}

          {/* Interactive Chart */}
          <CandleChart
            id={chart.id}
            symbol={chart.symbol}
            timeframe={chart.timeframe}
            candles={chart.candles}
            annotations={chart.annotations}
            caption={captionText}
            height={460}
          />

          {/* Trade Setup Parameters Bar (Entry, SL, TP, R:R) */}
          {(chart.entry !== undefined || chart.stopLoss !== undefined || chart.takeProfit !== undefined || chart.rr) && (
            <div className="rounded-2xl border border-border/80 bg-panel/70 p-4 sm:p-5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-gold font-bold">
                <Target className="w-4 h-4" />
                <span>{dict.detail?.tradeSetup || 'Trade Parameters'}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {chart.entry !== undefined && (
                  <div className="p-3 rounded-xl bg-card border border-border/70">
                    <div className="text-[10px] font-mono text-muted-foreground uppercase">
                      {dict.detail?.entry || 'Entry Price'}
                    </div>
                    <div className="text-sm font-mono font-bold text-amber-400 mt-0.5">
                      {chart.entry}
                    </div>
                  </div>
                )}
                {chart.stopLoss !== undefined && (
                  <div className="p-3 rounded-xl bg-card border border-border/70">
                    <div className="text-[10px] font-mono text-muted-foreground uppercase">
                      {dict.detail?.stopLoss || 'Stop Loss'}
                    </div>
                    <div className="text-sm font-mono font-bold text-rose-400 mt-0.5">
                      {chart.stopLoss}
                    </div>
                  </div>
                )}
                {chart.takeProfit !== undefined && (
                  <div className="p-3 rounded-xl bg-card border border-border/70">
                    <div className="text-[10px] font-mono text-muted-foreground uppercase">
                      {dict.detail?.takeProfit || 'Take Profit'}
                    </div>
                    <div className="text-sm font-mono font-bold text-emerald-400 mt-0.5">
                      {chart.takeProfit}
                    </div>
                  </div>
                )}
                {chart.rr && (
                  <div className="p-3 rounded-xl bg-card border border-border/70">
                    <div className="text-[10px] font-mono text-muted-foreground uppercase">
                      {dict.detail?.rr || 'Risk:Reward'}
                    </div>
                    <div className="text-sm font-mono font-bold text-gold mt-0.5">
                      1:{chart.rr}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Deep Institutional Explanation */}
          {explanationText && (
            <div className="rounded-2xl border border-border/80 bg-card p-5 sm:p-6 space-y-3 shadow-lg">
              <div className="flex items-center gap-2 text-foreground font-bold text-base">
                <BrainCircuit className="w-5 h-5 text-gold" />
                <span>{dict.detail?.deepExplanation || 'Institutional Analysis & Narrative'}</span>
              </div>
              <p className="text-sm text-foreground/90 leading-relaxed font-sans whitespace-pre-line">
                {explanationText}
              </p>
            </div>
          )}

          {/* Key Actionable Takeaways */}
          {chart.keyTakeaways && chart.keyTakeaways.length > 0 && (
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.04] p-5 sm:p-6 space-y-3 shadow-lg">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-base">
                <CheckCircle2 className="w-5 h-5" />
                <span>{dict.detail?.keyTakeaways || 'Key Rules & Actionable Takeaways'}</span>
              </div>
              <ul className="space-y-2.5 pt-1">
                {chart.keyTakeaways.map((takeaway, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground/90 leading-relaxed">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/15 text-emerald-400 font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span>{takeaway[lang] || takeaway.en}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Author Note / Trader Log */}
          {notesText && (
            <div className="rounded-2xl border border-gold/30 bg-gold/5 p-4 sm:p-5 space-y-2">
              <div className="flex items-center gap-2 text-gold font-semibold text-sm">
                <Lightbulb className="w-4 h-4" />
                <span>{dict.detail?.authorNote || 'Author Note'}</span>
              </div>
              <p className="text-sm text-foreground/90 leading-relaxed font-sans whitespace-pre-line">
                {notesText}
              </p>
            </div>
          )}

          {/* Used in lessons */}
          {chart.lessonSlugs && chart.lessonSlugs.length > 0 && (
            <div className="space-y-2.5">
              <span className="text-xs font-semibold text-muted-foreground font-mono uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-gold" />
                {dict.detail?.usedInLessons || 'Used in Lessons'} ({chart.lessonSlugs.length})
              </span>
              <div className="flex flex-wrap gap-2">
                {chart.lessonSlugs.map((slug) => {
                  const lessonUrl = chart.module
                    ? `/${lang}/learn/${chart.module}/${slug}`
                    : `/${lang}/learn/${slug}`;
                  return (
                    <Link
                      key={slug}
                      href={lessonUrl}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border/70 bg-panel text-xs text-foreground hover:text-gold hover:border-gold/50 transition-all font-mono"
                    >
                      <span>{slug}</span>
                      <ExternalLink className="w-3 h-3 opacity-60" />
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Dev-Mode Tools */}
          {isDev && (
            <div className="pt-4 border-t border-border/60 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 font-mono text-muted-foreground">
                <span className="text-gold font-bold">DEV TOOLS:</span>
                <span className="bg-muted px-2 py-0.5 rounded text-[11px]">{chart.id}.json</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyMdx}
                  className="px-3 py-1.5 rounded-lg border border-border/70 bg-panel text-xs font-mono text-foreground hover:text-gold hover:border-gold/50 flex items-center gap-1.5 transition-colors"
                >
                  {copiedMdx ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{dict.detail?.copiedMdx || 'Copied!'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{dict.detail?.copyMdx || 'Copy MDX'}</span>
                    </>
                  )}
                </button>

                <Link
                  href={`/studio/chart-lab?id=${chart.id}`}
                  className="px-3 py-1.5 rounded-lg bg-gold/15 text-gold border border-gold/30 hover:bg-gold/25 flex items-center gap-1.5 transition-colors font-medium"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>{dict.detail?.editInLab || 'Edit in Lab'}</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
