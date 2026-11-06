'use client';

import React, { useState, useMemo } from 'react';
import { Sliders, Sparkles, CheckCircle2, RotateCcw } from 'lucide-react';
import { DynamicCandleSvg } from './DynamicCandleSvg';
import { DynamicCandle } from './types';

interface CandleSandboxProps {
  lang: 'en' | 'bn';
}

export function CandleSandbox({ lang }: CandleSandboxProps) {
  const isEn = lang === 'en';

  const [bodySize, setBodySize] = useState<number>(40); // 0 to 80
  const [upperWick, setUpperWick] = useState<number>(20); // 0 to 50
  const [lowerWick, setLowerWick] = useState<number>(20); // 0 to 50
  const [isBullish, setIsBullish] = useState<boolean>(true);

  // Derive pattern identification
  const detectedPattern = useMemo(() => {
    // Tolerances
    const isTinyBody = bodySize <= 8;
    const isNoUpperWick = upperWick <= 3;
    const isNoLowerWick = lowerWick <= 3;
    const isLongLowerWick = lowerWick >= 25 && lowerWick >= bodySize * 1.8;
    const isLongUpperWick = upperWick >= 25 && upperWick >= bodySize * 1.8;

    if (isNoUpperWick && isNoLowerWick && bodySize >= 35) {
      return {
        name: isEn ? 'Marubozu Candle (মারুবোজু)' : 'মারুবোজু ক্যান্ডেল (Marubozu)',
        status: isEn ? 'One-Sided Dominance: No wicks, pure institutional conviction.' : 'একপাক্ষিক আধিপত্য: কোনো উইক নেই, খাঁটি প্রাতিষ্ঠানিক গতি।',
        bias: isBullish ? 'bullish' : 'bearish',
      };
    }

    if (isTinyBody) {
      if (isNoUpperWick && lowerWick >= 25) {
        return {
          name: isEn ? 'Dragonfly Doji (ড্রাগনফ্লাই ডোজি)' : 'ড্রাগনফ্লাই ডোজি (Dragonfly Doji)',
          status: isEn ? 'T-Shape: Violent rejection of lower prices by buyers.' : 'T-আকৃতি: লোয়ার প্রাইস থেকে বায়ারদের তীব্র রিজেকশন।',
          bias: 'bullish',
        };
      }
      if (isNoLowerWick && upperWick >= 25) {
        return {
          name: isEn ? 'Gravestone Doji (গ্রেভস্টোন ডোজি)' : 'গ্রেভস্টোন ডোজি (Gravestone Doji)',
          status: isEn ? 'Inverted T: Sellers violently defeated higher prices.' : 'উল্টো T: হাই প্রাইস থেকে সেলারদের তীব্র রিজেকশন।',
          bias: 'bearish',
        };
      }
      return {
        name: isEn ? 'Standard Doji (ডোজি)' : 'স্ট্যান্ডার্ড ডোজি (Standard Doji)',
        status: isEn ? 'Open = Close: Perfect market equilibrium and hesitation.' : 'ওপেন = ক্লোজ: পারফেক্ট সমতা ও ইনডিসিশন।',
        bias: 'neutral',
      };
    }

    if (isLongLowerWick && isNoUpperWick) {
      return {
        name: isEn ? 'Hammer Candle (হ্যামার)' : 'হ্যামার ক্যান্ডেল (Hammer)',
        status: isEn ? 'Wick > 2x Body at top: Bearish trend reversal signal.' : 'বডির ওপরে ছোট অবস্থান ও লম্বা লোয়ার উইক: বুলিশ রিভার্সাল।',
        bias: 'bullish',
      };
    }

    if (isLongUpperWick && isNoLowerWick) {
      return {
        name: isEn ? 'Inverted Hammer / Shooting Star' : 'ইনভার্টেড হ্যামার / শুটিং স্টার',
        status: isEn ? 'Upper Wick > 2x Body: Long wick on top testing/rejecting highs.' : 'বডির নিচে অবস্থান ও লম্বা আপার উইক: টপে রিজেকশন বা বটমে রিভার্সাল।',
        bias: isBullish ? 'bullish' : 'bearish',
      };
    }

    if (upperWick >= 20 && lowerWick >= 20 && upperWick >= bodySize * 1.5 && lowerWick >= bodySize * 1.5) {
      return {
        name: isEn ? 'Spinning Top (স্পিনিং টপ)' : 'স্পিনিং টপ (Spinning Top)',
        status: isEn ? 'Wicks 2x/3x larger than Body: 50-50 buyer/seller standoff.' : 'উইক বডির চেয়ে দ্বিগুণ বা তিনগুণ বড়: ৫০-৫০ সমানে সমান লড়াই।',
        bias: 'neutral',
      };
    }

    return {
      name: isEn ? 'Standard Candlestick' : 'সাধারণ ক্যান্ডেলস্টিক',
      status: isEn ? 'Adjust sliders to synthesize specific pattern structures.' : 'নির্দিষ্ট প্যাটার্ন দেখতে স্লাইডার পরিবর্তন করুন।',
      bias: isBullish ? 'bullish' : 'bearish',
    };
  }, [bodySize, upperWick, lowerWick, isBullish, isEn]);

  // Convert inputs into 0..100 relative OHLC
  const simulatedCandle: DynamicCandle = useMemo(() => {
    const centerY = 50;
    const halfBody = bodySize / 2;
    const bodyTop = centerY + halfBody;
    const bodyBottom = centerY - halfBody;
    const high = bodyTop + upperWick;
    const low = Math.max(0, bodyBottom - lowerWick);

    const open = isBullish ? bodyBottom : bodyTop;
    const close = isBullish ? bodyTop : bodyBottom;

    return {
      open,
      high,
      low,
      close,
      color: isBullish ? 'bull' : 'bear',
      label: isBullish ? (isEn ? 'Bullish' : 'বুলিশ') : (isEn ? 'Bearish' : 'বেয়ারিশ'),
      topAnnotation: upperWick <= 3 ? (isBullish ? 'Closing = High' : 'Opening = High') : 'High',
      bottomAnnotation: lowerWick <= 3 ? (isBullish ? 'Opening = Low' : 'Closing = Low') : 'Low',
      bodyAnnotation: `${detectedPattern.name}`,
    };
  }, [bodySize, upperWick, lowerWick, isBullish, detectedPattern.name, isEn]);

  const presets = [
    { name: isEn ? 'Marubozu' : 'মারুবোজু', body: 75, upper: 0, lower: 0, bull: true },
    { name: isEn ? 'Spinning Top' : 'স্পিনিং টপ', body: 16, upper: 38, lower: 38, bull: true },
    { name: isEn ? 'Doji' : 'ডোজি', body: 2, upper: 42, lower: 42, bull: true },
    { name: isEn ? 'Dragonfly Doji' : 'ড্রাগনফ্লাই', body: 2, upper: 1, lower: 45, bull: true },
    { name: isEn ? 'Gravestone Doji' : 'গ্রেভস্টোন', body: 2, upper: 45, lower: 1, bull: false },
    { name: isEn ? 'Hammer' : 'হ্যামার', body: 22, upper: 2, lower: 44, bull: true },
    { name: isEn ? 'Inverted Hammer' : 'ইনভার্টেড হ্যামার', body: 22, upper: 44, lower: 2, bull: true },
  ];

  return (
    <section id="sandbox" className="rounded-2xl border border-border/80 bg-card p-6 sm:p-10 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border/60">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-gold uppercase tracking-wider">
            <Sliders size={15} />
            <span>{isEn ? 'Interactive Dynamic Sandbox' : 'ইন্টারেক্টিভ ডায়নামিক স্যান্ডবক্স'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl text-foreground tracking-tight mt-1">
            {isEn ? 'Candle Synthesizer & Real-Time Detector' : 'ক্যান্ডেল সিন্থেসাইজার ও রিয়েল-টাইম প্যাটার্ন ডিটেক্টর'}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {isEn
              ? 'Manipulate wicks and body height to watch how price action formulas identify patterns in real-time.'
              : 'স্লাইডার দিয়ে উইক এবং বডির উচ্চতা পরিবর্তন করুন এবং দেখুন কিভাবে প্যাটার্ন স্বয়ংক্রিয়ভাবে শনাক্ত হয়।'}
          </p>
        </div>

        {/* Presets Chips */}
        <div className="flex flex-wrap items-center gap-1.5">
          {presets.map((p, i) => (
            <button
              key={i}
              onClick={() => {
                setBodySize(p.body);
                setUpperWick(p.upper);
                setLowerWick(p.lower);
                setIsBullish(p.bull);
              }}
              className="px-2.5 py-1 rounded-lg text-xs font-mono font-medium bg-panel hover:bg-gold/15 text-muted-foreground hover:text-gold border border-border hover:border-gold/40 transition-colors"
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Dynamic SVG Display */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <DynamicCandleSvg
            candles={[simulatedCandle]}
            showAnnotations={true}
            className="w-full max-w-md"
            height={260}
          />

          {/* Real-time Identification Card */}
          <div className="w-full mt-4 p-4 rounded-2xl bg-panel/80 border border-gold/40 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-gold uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles size={13} />
                {isEn ? 'Detected Pattern' : 'চিহ্নিত প্যাটার্ন'}
              </span>
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                detectedPattern.bias === 'bullish'
                  ? 'text-bull bg-bull/10 border-bull/30'
                  : detectedPattern.bias === 'bearish'
                  ? 'text-bear bg-bear/10 border-bear/30'
                  : 'text-gold bg-gold/10 border-gold/30'
              }`}>
                {detectedPattern.bias.toUpperCase()}
              </span>
            </div>
            <p className="text-lg font-semibold text-foreground">{detectedPattern.name}</p>
            <p className="text-xs text-muted-foreground leading-relaxed">{detectedPattern.status}</p>
          </div>
        </div>

        {/* Right: Sliders & Controls */}
        <div className="lg:col-span-6 space-y-6 p-6 rounded-2xl bg-panel/50 border border-border/80">
          {/* Bull/Bear switch */}
          <div className="flex items-center justify-between pb-4 border-b border-border/60">
            <span className="text-sm font-semibold text-foreground">
              {isEn ? 'Candle Direction (Sentiment)' : 'ক্যান্ডেলের দিক (সেন্টিমেন্ট)'}
            </span>
            <div className="flex items-center gap-1.5 bg-card p-1 rounded-xl border border-border">
              <button
                onClick={() => setIsBullish(true)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  isBullish
                    ? 'bg-bull text-white shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {isEn ? 'Bullish (Green)' : 'বুলিশ'}
              </button>
              <button
                onClick={() => setIsBullish(false)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  !isBullish
                    ? 'bg-bear text-white shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {isEn ? 'Bearish (Red)' : 'বেয়ারিশ'}
              </button>
            </div>
          </div>

          {/* Slider 1: Real Body Height */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-foreground font-semibold">
                {isEn ? 'Real Body Height' : 'রিয়েল বডির আকার'}
              </span>
              <span className="text-gold font-bold">{bodySize} pts</span>
            </div>
            <input
              type="range"
              min="0"
              max="80"
              value={bodySize}
              aria-label={isEn ? 'Real body height' : 'রিয়েল বডির আকার'}
              onChange={(e) => setBodySize(Number(e.target.value))}
              className="w-full accent-gold cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
              <span>0 (Doji)</span>
              <span>40 (Medium)</span>
              <span>80 (Marubozu)</span>
            </div>
          </div>

          {/* Slider 2: Upper Wick / Shadow */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-foreground font-semibold">
                {isEn ? 'Upper Wick Length (Rejection from High)' : 'আপার উইকের দৈর্ঘ্য (হাই থেকে রিজেকশন)'}
              </span>
              <span className="text-link font-bold">{upperWick} pts</span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              value={upperWick}
              aria-label={isEn ? 'Upper wick length' : 'আপার উইকের দৈর্ঘ্য'}
              onChange={(e) => setUpperWick(Number(e.target.value))}
              className="w-full accent-sky-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
              <span>0 (No Wick)</span>
              <span>25 (Standard)</span>
              <span>50 (Shooting Star / Rejection)</span>
            </div>
          </div>

          {/* Slider 3: Lower Wick / Shadow */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-foreground font-semibold">
                {isEn ? 'Lower Wick Length (Support from Low)' : 'লোয়ার উইকের দৈর্ঘ্য (লো থেকে সাপোর্ট)'}
              </span>
              <span className="text-bull font-bold">{lowerWick} pts</span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              value={lowerWick}
              aria-label={isEn ? 'Lower wick length' : 'লোয়ার উইকের দৈর্ঘ্য'}
              onChange={(e) => setLowerWick(Number(e.target.value))}
              className="w-full accent-bull cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
              <span>0 (No Wick)</span>
              <span>25 (Standard)</span>
              <span>50 (Hammer / Absorption)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
