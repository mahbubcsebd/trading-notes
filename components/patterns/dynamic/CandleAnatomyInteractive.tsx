'use client';

import React, { useState } from 'react';
import { BookOpen, HelpCircle, ArrowUpRight, ArrowDownRight, Compass, Sparkles, CheckCircle2 } from 'lucide-react';

interface CandleAnatomyInteractiveProps {
  lang: 'en' | 'bn';
}

export function CandleAnatomyInteractive({ lang }: CandleAnatomyInteractiveProps) {
  const isEn = lang === 'en';
  const [activeTab, setActiveTab] = useState<'bull' | 'bear'>('bull');
  const [hoveredPart, setHoveredPart] = useState<'high' | 'body' | 'low' | 'upperWick' | 'lowerWick' | null>(null);

  return (
    <section id="definition" className="rounded-2xl border border-border/80 bg-card p-6 sm:p-10 space-y-8">
      {/* ─── Top Definition Header ──────────────────────────────────── */}
      <div className="space-y-3 pb-6 border-b border-border/60">
        <div className="flex items-center gap-2 text-xs font-mono font-semibold text-gold uppercase tracking-wider">
          <BookOpen size={15} />
          <span>{isEn ? 'Foundations & Anatomy' : 'ভিত্তি ও অ্যানাটমি'}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl text-foreground tracking-tight">
          {isEn
            ? 'What is a Candlestick Pattern? Definition & Anatomy'
            : 'ক্যান্ডেলস্টিক প্যাটার্ন কী? সংজ্ঞা ও পূর্ণাঙ্গ অ্যানাটমি'}
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-4xl">
          {isEn
            ? 'A Japanese Candlestick is a financial charting tool that displays the Open, High, Low, and Close (OHLC) prices of an asset over a specified timeframe. Unlike simple line charts, candlesticks tell the chronological story of the fierce battle between buyers (bulls) and sellers (bears).'
            : 'জাপানি ক্যান্ডেলস্টিক হলো একটি প্রাইস অ্যাকশন চার্টিং মেথড, যা নির্দিষ্ট টাইমফ্রেমে কোনো অ্যাসেটের ওপেন (Open), হাই (High), লো (Low) এবং ক্লোজ (Close) নির্দেশ করে। সাধারণ লাইন চার্টের বিপরীতে ক্যান্ডেলস্টিক ক্রেতা (বুল) এবং বিক্রেতা (বেয়ার)-দের মধ্যকার তীব্র লড়াইয়ের গল্প ফুটিয়ে তোলে।'}
        </p>
      </div>

      {/* ─── Interactive Candlestick Anatomy Visualizer ─────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Dynamic Vector Candle Interactive SVG */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center p-6 rounded-2xl bg-panel/70 border border-border/80">
          <div className="flex items-center gap-2 mb-4">
            <button
              onClick={() => setActiveTab('bull')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'bull'
                  ? 'bg-bull/15 text-bull border border-bull/40 shadow-sm font-bold'
                  : 'text-muted-foreground hover:text-foreground bg-panel border border-border'
              }`}
            >
              <ArrowUpRight size={14} />
              {isEn ? 'Bullish Candle (Green)' : 'বুলিশ ক্যান্ডেল (সবুজ)'}
            </button>
            <button
              onClick={() => setActiveTab('bear')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'bear'
                  ? 'bg-bear/15 text-bear border border-bear/40 shadow-sm font-bold'
                  : 'text-muted-foreground hover:text-foreground bg-panel border border-border'
              }`}
            >
              <ArrowDownRight size={14} />
              {isEn ? 'Bearish Candle (Red)' : 'বেয়ারিশ ক্যান্ডেল (লাল)'}
            </button>
          </div>

          {/* SVG Candle with interactive hit-zones */}
          <svg viewBox="0 0 340 320" className="w-full max-w-[320px] h-auto overflow-visible select-none">
            {/* Guide Grid */}
            <line x1="40" y1="50" x2="300" y2="50" stroke="currentColor" className="text-border/60" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="40" y1="110" x2="300" y2="110" stroke="currentColor" className="text-border/60" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="40" y1="210" x2="300" y2="210" stroke="currentColor" className="text-border/60" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="40" y1="270" x2="300" y2="270" stroke="currentColor" className="text-border/60" strokeWidth="1" strokeDasharray="3 3" />

            {/* Labels on Left */}
            <text x="35" y="54" textAnchor="end" className="text-[10px] font-mono fill-muted-foreground">
              High
            </text>
            <text x="35" y="114" fill={activeTab === 'bull' ? 'var(--up)' : 'var(--down)'} textAnchor="end" className="text-[10px] font-mono font-bold">
              {activeTab === 'bull' ? 'Close' : 'Open'}
            </text>
            <text x="35" y="214" fill={activeTab === 'bull' ? 'var(--up)' : 'var(--down)'} textAnchor="end" className="text-[10px] font-mono font-bold">
              {activeTab === 'bull' ? 'Open' : 'Close'}
            </text>
            <text x="35" y="274" textAnchor="end" className="text-[10px] font-mono fill-muted-foreground">
              Low
            </text>

            {/* Candle Center X = 170 */}
            {/* Upper Wick */}
            <g
              className="cursor-pointer"
              onMouseEnter={() => setHoveredPart('upperWick')}
              onMouseLeave={() => setHoveredPart(null)}
            >
              <line
                x1="170"
                y1="50"
                x2="170"
                y2="110"
                stroke={activeTab === 'bull' ? 'var(--up)' : 'var(--down)'}
                strokeWidth={hoveredPart === 'upperWick' ? '5' : '3'}
                strokeLinecap="round"
                className="transition-all"
              />
              <rect x="155" y="50" width="30" height="60" fill="transparent" />
            </g>

            {/* Real Body */}
            <g
              className="cursor-pointer"
              onMouseEnter={() => setHoveredPart('body')}
              onMouseLeave={() => setHoveredPart(null)}
            >
              <rect
                x="142"
                y="110"
                width="56"
                height="100"
                rx="4"
                fill={activeTab === 'bull' ? 'var(--up)' : 'var(--down)'}
                stroke={hoveredPart === 'body' ? 'var(--fg)' : activeTab === 'bull' ? 'var(--up)' : 'var(--down)'}
                strokeWidth={hoveredPart === 'body' ? '2.5' : '1.5'}
                className="transition-all drop-shadow-md"
              />
            </g>

            {/* Lower Wick */}
            <g
              className="cursor-pointer"
              onMouseEnter={() => setHoveredPart('lowerWick')}
              onMouseLeave={() => setHoveredPart(null)}
            >
              <line
                x1="170"
                y1="210"
                x2="170"
                y2="270"
                stroke={activeTab === 'bull' ? 'var(--up)' : 'var(--down)'}
                strokeWidth={hoveredPart === 'lowerWick' ? '5' : '3'}
                strokeLinecap="round"
                className="transition-all"
              />
              <rect x="155" y="210" width="30" height="60" fill="transparent" />
            </g>

            {/* Annotation Badges on Right */}
            {/* Upper Shadow Badge */}
            <g className="transition-opacity duration-200">
              <path d="M 185 80 L 220 80" stroke="currentColor" className="text-muted-foreground/60" strokeWidth="1" strokeDasharray="2 2" />
              <text x="226" y="84" className="text-[11px] font-mono fill-muted-foreground">
                {isEn ? 'Upper Shadow / Wick' : 'আপার শ্যাডো / উইক'}
              </text>
            </g>

            {/* Real Body Badge */}
            <g className="transition-opacity duration-200">
              <path d="M 205 160 L 225 160" stroke="var(--gold)" strokeWidth="1" strokeDasharray="2 2" />
              <text x="230" y="164" fill="var(--gold)" className="text-[11px] font-mono font-bold">
                {isEn ? 'Real Body (Range)' : 'রিয়েল বডি (বডি)'}
              </text>
            </g>

            {/* Lower Shadow Badge */}
            <g className="transition-opacity duration-200">
              <path d="M 185 240 L 220 240" stroke="currentColor" className="text-muted-foreground/60" strokeWidth="1" strokeDasharray="2 2" />
              <text x="226" y="244" className="text-[11px] font-mono fill-muted-foreground">
                {isEn ? 'Lower Shadow / Wick' : 'লোয়ার শ্যাডো / উইক'}
              </text>
            </g>
          </svg>

          {/* Hover Status Feedback */}
          <div className="w-full text-center mt-2 min-h-[30px] text-xs font-mono text-gold bg-gold/10 py-1.5 px-3 rounded-lg border border-gold/20">
            {hoveredPart === 'upperWick'
              ? isEn
                ? 'Upper Wick: Shows price rejection from higher levels.'
                : 'আপার উইক: সর্বোচ্চ হাই থেকে সেলারদের রিজেকশন নির্দেশ করে।'
              : hoveredPart === 'body'
              ? isEn
                ? 'Real Body: Shows the net dominance between Open and Close.'
                : 'রিয়েল বডি: ওপেন ও ক্লোজের মধ্যবর্তী আসল আধিপত্য বা ভলিউম।'
              : hoveredPart === 'lowerWick'
              ? isEn
                ? 'Lower Wick: Shows buying support pushing price up from lows.'
                : 'লোয়ার উইক: সর্বনিম্ন লো থেকে বায়ারদের সাপোর্ট ও পুশ নির্দেশ করে।'
              : isEn
              ? 'Hover over wicks or body to inspect price action mechanics.'
              : 'উইক অথবা বডির ওপর মাউস নিয়ে মেকানিক্স পরীক্ষা করুন।'}
          </div>
        </div>

        {/* Right: Key 4 Anatomical Elements Explanation */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-4 rounded-2xl bg-panel/70 border border-border/80 space-y-1.5">
            <div className="flex items-center gap-2 text-sm font-bold text-foreground">
              <span className="w-6 h-6 rounded-md bg-gold/20 text-gold flex items-center justify-center font-mono text-xs">
                1
              </span>
              <span>{isEn ? 'The Real Body (রিয়েল বডি)' : 'রিয়েল বডি (The Real Body)'}</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed pl-8">
              {isEn
                ? 'The colored block between Open and Close. A green body means Close > Open (buyers won the session). A red body means Open > Close (sellers won). The height of the body reveals the magnitude of institutional dominance.'
                : 'ওপেন এবং ক্লোজের মধ্যবর্তী রঙিন অংশ। সবুজ বডি মানে বায়ারদের বিজয় (Close > Open)। লাল বডি মানে সেলারদের বিজয় (Open > Close)। বডির আকার প্রাতিষ্ঠানিক শক্তির পরিমাণ নির্দেশ করে।'}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-panel/70 border border-border/80 space-y-1.5">
            <div className="flex items-center gap-2 text-sm font-bold text-foreground">
              <span className="w-6 h-6 rounded-md bg-link/20 text-link flex items-center justify-center font-mono text-xs">
                2
              </span>
              <span>{isEn ? 'Upper Wick / Shadow (আপার উইক)' : 'আপার উইক (Upper Shadow)'}</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed pl-8">
              {isEn
                ? 'The thin line extending above the real body to the highest price traded. A long upper wick proves buyers tried to rally but aggressive sellers rejected them and drove price back down.'
                : 'বডির ওপর থেকে সর্বোচ্চ হাই পর্যন্ত অংশ। দীর্ঘ আপার উইক প্রমাণ করে বায়াররা প্রাইস ওপরে নেওয়ার চেষ্টা করলেও বিক্রেতারা রিজেক্ট করে নিচে নামিয়ে দিয়েছে।'}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-panel/70 border border-border/80 space-y-1.5">
            <div className="flex items-center gap-2 text-sm font-bold text-foreground">
              <span className="w-6 h-6 rounded-md bg-bull/20 text-bull flex items-center justify-center font-mono text-xs">
                3
              </span>
              <span>{isEn ? 'Lower Wick / Shadow (লোয়ার উইক)' : 'লোয়ার উইক (Lower Shadow)'}</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed pl-8">
              {isEn
                ? 'The thin line below the body to the lowest price traded. A long lower wick proves sellers tried to dump price but institutional buyers absorbed the sell-off and drove price upward.'
                : 'বডির নিচ থেকে সর্বনিম্ন লো পর্যন্ত অংশ। দীর্ঘ লোয়ার উইক প্রমাণ করে সেলাররা ডাম্প করার চেষ্টা করলেও ডিমান্ড জোনে বড় বড় বায়াররা সমস্ত সেল শোষণ করে প্রাইসকে ওপরে তুলেছে।'}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-panel/70 border border-border/80 space-y-1.5">
            <div className="flex items-center gap-2 text-sm font-bold text-foreground">
              <span className="w-6 h-6 rounded-md bg-muted text-foreground flex items-center justify-center font-mono text-xs">
                4
              </span>
              <span>{isEn ? 'Total High-Low Range (রেঞ্জ)' : 'টোটাল রেঞ্জ (High-Low Spread)'}</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed pl-8">
              {isEn
                ? 'The entire vertical distance from High to Low. Represents the volatility, liquidity, and liquidity depth during that candle’s duration.'
                : 'হাই থেকে লো পর্যন্ত পুরো দূরত্ব হলো রেঞ্জ। এটি ওই নির্দিষ্ট সময়ের ভোলাটিলিটি এবং লিকুইডিটি নির্দেশ করে।'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
