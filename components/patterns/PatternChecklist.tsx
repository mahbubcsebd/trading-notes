'use client';

import React, { useState } from 'react';
import { CheckCircle2, Circle, AlertCircle, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChecklistItem {
  id: string;
  text: {
    en: string;
    bn: string;
  };
}

interface PatternChecklistProps {
  items: ChecklistItem[];
  lang: 'en' | 'bn';
}

export function PatternChecklist({ items, lang }: PatternChecklistProps) {
  const [checkedIds, setCheckedIds] = useState<Record<string, boolean>>({});

  const toggle = (id: string) => {
    setCheckedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const total = items.length;
  const checkedCount = Object.values(checkedIds).filter(Boolean).length;
  const scorePct = Math.round((checkedCount / total) * 100);

  const isReady = scorePct >= 80;

  return (
    <div className="rounded-2xl border border-border/80 bg-card/90 p-6 sm:p-8 space-y-6 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/60">
        <div>
          <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-gold" />
            {lang === 'en' ? 'Pre-Execution Confluence Checklist' : 'ট্রেড নেওয়ার পূর্বশর্ত যাচাই চেকলিস্ট'}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {lang === 'en'
              ? 'Tick off all items before entering your order. Never execute with less than 80% alignment.'
              : 'অর্ডার প্লেস করার আগে প্রতিটি পয়েন্ট মিলিয়ে দেখুন। ৮০% কনফ্লুয়েন্স ছাড়া কখনোই ট্রেড নেবেন না।'}
          </p>
        </div>

        {/* Score indicator */}
        <div className="flex items-center gap-3 bg-panel/80 px-4 py-2.5 rounded-xl border border-border/80 shrink-0">
          <div className="text-right">
            <div className="text-xs font-mono text-muted-foreground uppercase">
              {lang === 'en' ? 'Confluence Score' : 'কনফ্লুয়েন্স স্কোর'}
            </div>
            <div className="text-lg font-mono font-bold text-foreground">
              {checkedCount} / {total} ({scorePct}%)
            </div>
          </div>
          <div
            className={cn(
              'w-3 h-3 rounded-full animate-pulse',
              isReady ? 'bg-emerald-500 shadow-[0_0_8px_#22c55e]' : 'bg-amber-500 shadow-[0_0_8px_#f59e0b]'
            )}
          />
        </div>
      </div>

      {/* Checklist list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {items.map((item, idx) => {
          const isChecked = !!checkedIds[item.id];
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => toggle(item.id)}
              className={cn(
                'flex items-start gap-3 p-3.5 rounded-xl text-left border transition-all duration-200 select-none group',
                isChecked
                  ? 'bg-emerald-500/10 border-emerald-500/40 text-foreground shadow-sm'
                  : 'bg-panel/40 border-border/60 text-muted-foreground hover:bg-panel hover:text-foreground'
              )}
            >
              <div className="shrink-0 mt-0.5">
                {isChecked ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : (
                  <Circle className="w-5 h-5 text-muted-foreground group-hover:text-gold transition-colors" />
                )}
              </div>
              <span className={cn('text-sm leading-snug', isChecked && 'font-medium')}>
                <span className="font-mono text-xs opacity-60 mr-1.5">{idx + 1}.</span>
                {item.text[lang]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Status banner */}
      <div
        className={cn(
          'p-4 rounded-xl border flex items-center gap-3 text-sm transition-colors',
          isReady
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
            : 'bg-amber-500/10 border-amber-500/30 text-amber-200'
        )}
      >
        <AlertCircle className="w-5 h-5 shrink-0" />
        <div className="leading-relaxed">
          {isReady
            ? lang === 'en'
              ? 'High Confluence Confirmed! Setup meets institutional criteria. Stick to your risk plan.'
              : 'হাই-কনফ্লুয়েন্স ভ্যালিডেশন সফল! সেটআপটি প্রাতিষ্ঠানিক মানদণ্ড পূরণ করেছে। আপনার রিস্ক প্ল্যান মেনে চলুন।'
            : lang === 'en'
            ? `Warning: Only ${checkedCount} of ${total} criteria confirmed. Wait for further confirmation or pass this setup.`
            : `সতর্কতা: ${total}টির মধ্যে মাত্র ${checkedCount}টি শর্ত পূরণ হয়েছে। আরও কনফার্মেশনের জন্য অপেক্ষা করুন অথবা এই ট্রেডটি বাতিল করুন।`}
        </div>
      </div>
    </div>
  );
}
