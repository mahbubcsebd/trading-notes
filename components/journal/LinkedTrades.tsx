"use client";

import Link from "next/link";
import { closed, fmtR } from "@/lib/journal/core";
import { journalCopy } from "@/lib/journal/copy";
import { useJournal } from "@/lib/journal/store";
import type { Locale } from "@/lib/dictionaries";

/** Trades from the browser-local journal that point at this note. Renders nothing until hydrated. */
export function LinkedTrades({ slug, lang }: { slug: string; lang: Locale }) {
  const copy = journalCopy[lang].linked;
  const { trades } = useJournal();
  const linked = closed(trades.filter((t) => t.noteSlug === slug)).reverse();
  if (trades.length === 0) return null;

  return (
    <section className="border-line mt-16 border-t pt-8">
      <h2 className="eyebrow mb-4">{copy.title}</h2>
      {linked.length === 0 ? (
        <p className="text-mute text-sm">{copy.none}</p>
      ) : (
        <ul className="grid gap-2">
          {linked.map((t) => (
            <li
              key={t.id}
              className="border-line flex items-baseline justify-between gap-4 border-b py-2 text-sm"
            >
              <span>
                <span className="text-fg2 font-mono text-xs tabular-nums">
                  {t.date}
                </span>
                <span className="ml-3 font-medium">{t.pair}</span>
                <span
                  className={`pill ml-3 ${t.direction === "long" ? "pill-up" : "pill-down"}`}
                >
                  {t.direction}
                </span>
              </span>
              <span
                className={`font-mono tabular-nums ${t.r >= 0 ? "text-up" : "text-down"}`}
              >
                {fmtR(t.r)}
              </span>
            </li>
          ))}
        </ul>
      )}
      <Link
        href={`/${lang}/journal`}
        className="link mt-4 inline-block text-sm"
      >
        {copy.open}
      </Link>
    </section>
  );
}
