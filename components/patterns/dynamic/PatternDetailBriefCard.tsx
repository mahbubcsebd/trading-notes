'use client';

import React, { useState } from 'react';
import { getPatternBriefById } from './slidePatternsData';
import { DynamicCandleSvg } from './DynamicCandleSvg';
import {
  Sparkles,
  Eye,
  EyeOff,
  CheckCircle2,
  Info,
  ShieldCheck,
  Layers,
  Activity,
} from 'lucide-react';

interface PatternDetailBriefCardProps {
  patternId: string;
  lang: 'en' | 'bn';
}

export function PatternDetailBriefCard({ patternId, lang }: PatternDetailBriefCardProps) {
  const [showAnnotations, setShowAnnotations] = useState(true);
  const isEn = lang === 'en';

  const brief = getPatternBriefById(patternId);
  if (!brief) return null;

  const biasColor =
    brief.type === 'bullish'
      ? 'text-up bg-up/10 border-up/30'
      : brief.type === 'bearish'
      ? 'text-down bg-down/10 border-down/30'
      : 'text-gold bg-gold/10 border-gold/30';

  return (
    <section className="relative overflow-hidden rounded-2xl border border-line bg-surface p-6 sm:p-8 space-y-6">

      {/* ─── Top Header ────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border/60">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs font-bold text-gold px-2.5 py-0.5 rounded-full bg-gold/15 border border-gold/30 flex items-center gap-1.5">
              <Sparkles size={13} />
              {isEn ? 'Quick Brief & Specs' : 'সংক্ষিপ্ত চিত্র ও স্পেসিফিকেশন'}
            </span>
            <span className={`text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full border ${biasColor}`}>
              {brief.badge[lang]}
            </span>
            <span className="text-[11px] font-mono text-muted-foreground px-2 py-0.5 rounded-full bg-panel border border-border">
              {isEn ? 'Dynamic Vector Candle' : 'ডায়নামিক ভেক্টর ক্যান্ডেল'}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl text-foreground tracking-tight pt-1">
            {brief.title[lang]}
          </h2>
        </div>

        {/* Toggle annotations */}
        <button
          onClick={() => setShowAnnotations(!showAnnotations)}
          className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono text-muted-foreground hover:text-foreground bg-panel border border-border hover:border-gold/40 transition-colors shrink-0"
          title={showAnnotations ? 'Hide labels & annotations' : 'Show labels & annotations'}
        >
          {showAnnotations ? <Eye size={14} className="text-gold" /> : <EyeOff size={14} />}
          <span>{showAnnotations ? (isEn ? 'Labels On' : 'লেবেল চালু') : (isEn ? 'Labels Off' : 'লেবেল বন্ধ')}</span>
        </button>
      </div>

      {/* ─── Two-Column Layout: Visual + Specifications ────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left: Dynamic SVG Vector Candlestick */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 rounded-2xl bg-panel/70 border border-border/80">
          <DynamicCandleSvg
            candles={brief.candles}
            arrows={brief.arrows}
            guideLines={brief.guideLines}
            contextTrend={brief.contextTrend}
            showAnnotations={showAnnotations}
            className="w-full max-w-sm"
            height={240}
          />
        </div>

        {/* Right: Exact Specifications from Image Slides */}
        <div className="lg:col-span-7 space-y-3.5">
          {/* Body Rule (if multi-candle) */}
          {brief.bodyRule && brief.bodyRule.length > 0 && (
            <div className="p-3.5 rounded-xl bg-gold/10 border border-gold/30 text-xs space-y-1">
              <span className="font-mono font-bold text-gold uppercase tracking-wider block">
                {isEn ? 'Body Specification' : 'বডি সংক্রান্ত নিয়ম'}
              </span>
              {brief.bodyRule.map((r, i) => (
                <p key={i} className="font-semibold text-foreground/95">
                  {r[lang]}
                </p>
              ))}
            </div>
          )}

          {/* Condition Box */}
          <div className="p-3.5 rounded-xl bg-panel/70 border border-border/80 text-xs space-y-1">
            <span className="font-mono font-bold text-link uppercase tracking-wider block">
              {isEn ? 'Condition' : 'ছবির মূল শর্তাবলী'}
            </span>
            {brief.condition.map((c, i) => (
              <p key={i} className="text-foreground/90 font-medium">
                {c[lang]}
              </p>
            ))}
          </div>

          {/* Meaning & Significance Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-panel/50 border border-border/70 space-y-1">
              <span className="font-mono font-bold text-up uppercase tracking-wider block">
                {isEn ? 'Meaning' : 'অর্থ ও তাৎপর্য'}
              </span>
              {brief.meaning.map((m, i) => (
                <p key={i} className="text-muted-foreground leading-relaxed">
                  {m[lang]}
                </p>
              ))}
            </div>

            <div className="p-3.5 rounded-xl bg-panel/50 border border-border/70 space-y-1">
              <span className="font-mono font-bold text-title uppercase tracking-wider block">
                {isEn ? 'Significance' : 'মার্কেট প্রতিক্রিয়া'}
              </span>
              {brief.significance.map((s, i) => (
                <p key={i} className="text-muted-foreground leading-relaxed">
                  {s[lang]}
                </p>
              ))}
            </div>
          </div>

          {/* Institutional Psychology & Execution Tip */}
          <div className="pt-2 border-t border-border/50 text-xs space-y-2">
            <div className="flex items-start gap-2 text-muted-foreground">
              <Info size={14} className="text-gold shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong className="text-foreground">{isEn ? 'Psychology: ' : 'সাইকোলজি: '}</strong>
                {brief.psychology[lang]}
              </p>
            </div>
            <div className="flex items-start gap-2 text-muted-foreground">
              <ShieldCheck size={14} className="text-up shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong className="text-foreground">{isEn ? 'Execution Tip: ' : 'ট্রেডিং টিপ: '}</strong>
                {brief.actionTip[lang]}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
