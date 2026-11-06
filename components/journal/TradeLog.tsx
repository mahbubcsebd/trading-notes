"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CHECKLIST, fmtR, type Closed } from "@/lib/journal/core";
import type { JournalCopy } from "@/lib/journal/copy";

type ResultFilter = "all" | "win" | "loss" | "off";

interface TradeLogProps {
  rows: Closed[];
  copy: JournalCopy;
  lang: string;
  noteTitles: Record<string, string>;
  onEdit: (t: Closed) => void;
  onRemove: (id: string) => void;
}

export function TradeLog({
  rows,
  copy,
  lang,
  noteTitles,
  onEdit,
  onRemove,
}: TradeLogProps) {
  const c = copy.log;
  const [pair, setPair] = useState("all");
  const [result, setResult] = useState<ResultFilter>("all");

  const pairs = useMemo(() => [...new Set(rows.map((t) => t.pair))], [rows]);
  const visible = rows.filter(
    (t) =>
      (pair === "all" || t.pair === pair) &&
      (result === "all" ||
        (result === "win" && t.r > 0) ||
        (result === "loss" && t.r < 0) ||
        (result === "off" && !t.followedPlan)),
  );

  const resultOptions: { id: ResultFilter; label: string }[] = [
    { id: "all", label: c.all },
    { id: "win", label: c.wins },
    { id: "loss", label: c.losses },
    { id: "off", label: c.offPlanOnly },
  ];

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl">{c.title}</h2>
        <div
          className="flex flex-wrap gap-1.5"
          role="group"
          aria-label={c.filterResult}
        >
          {resultOptions.map((o) => (
            <button
              key={o.id}
              type="button"
              className="chip"
              aria-pressed={result === o.id}
              onClick={() => setResult(o.id)}
            >
              {o.label}
            </button>
          ))}
          {pairs.length > 1 && (
            <select
              aria-label={c.filterPair}
              className="chip bg-transparent"
              value={pair}
              onChange={(e) => setPair(e.target.value)}
            >
              <option value="all">
                {c.filterPair}: {c.all}
              </option>
              {pairs.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      <div className="border-line overflow-x-auto rounded-xl border">
        <table className="w-full min-w-[760px] text-left text-[14px]">
          <thead>
            <tr className="bg-bg2 text-gold font-mono text-[11px] tracking-wider uppercase">
              {c.cols.map((h, i) => (
                <th key={i} className="px-4 py-3 font-medium">
                  {h || (
                    <span className="sr-only">
                      {c.edit} / {c.remove}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visible.length === 0 && (
              <tr>
                <td colSpan={c.cols.length} className="text-mute px-4 py-6">
                  {c.none}
                </td>
              </tr>
            )}
            {visible.map((t) => (
              <tr key={t.id} className="border-line border-t">
                <td className="text-fg2 px-4 py-3 font-mono text-xs tabular-nums">
                  {t.date}
                </td>
                <td className="px-4 py-3 font-medium">{t.pair}</td>
                <td className="px-4 py-3">
                  <span
                    className={`pill ${t.direction === "long" ? "pill-up" : "pill-down"}`}
                  >
                    {t.direction}
                  </span>
                </td>
                <td className="text-fg2 px-4 py-3">
                  {t.setup}
                  {t.noteSlug && noteTitles[t.noteSlug] && (
                    <Link
                      href={`/${lang}/notes/${t.noteSlug}`}
                      className="link ml-2 text-xs"
                      title={`${c.linkedNote}: ${noteTitles[t.noteSlug]}`}
                    >
                      ↗
                    </Link>
                  )}
                </td>
                <td className="text-fg2 px-4 py-3">{t.session}</td>
                <td className="text-fg2 px-4 py-3 font-mono text-xs tabular-nums">
                  {t.checklist.length}/{CHECKLIST.length}
                  {!t.followedPlan && (
                    <span className="text-down ml-2">{c.offPlan}</span>
                  )}
                </td>
                <td
                  className={`px-4 py-3 font-mono tabular-nums ${t.r >= 0 ? "text-up" : "text-down"}`}
                >
                  {fmtR(t.r)}
                </td>
                <td className="px-4 py-3 text-right whitespace-nowrap">
                  <button
                    className="link mr-4 text-[13px]"
                    onClick={() => onEdit(t)}
                  >
                    {c.edit}
                  </button>
                  <button
                    className="text-mute hover:text-down text-[13px]"
                    onClick={() => onRemove(t.id)}
                  >
                    {c.remove}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
