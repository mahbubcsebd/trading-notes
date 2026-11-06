"use client";

import { useState } from "react";
import type { QuizItem } from "@/lib/types";

export function Quiz({ items }: { items: QuizItem[] }) {
  const [picked, setPicked] = useState<(number | null)[]>(() => items.map(() => null));
  const answered = picked.filter((p) => p !== null).length;
  const correct = picked.filter((p, i) => p === items[i].answer).length;

  function pick(qi: number, oi: number) {
    setPicked((cur) => (cur[qi] !== null ? cur : cur.map((v, i) => (i === qi ? oi : v))));
  }

  return (
    <div className="grid gap-6">
      {items.map((it, qi) => {
        const p = picked[qi];
        return (
          <div key={qi} className="border-t border-line pt-5">
            <p className="text-[17px] font-medium leading-snug">{it.q}</p>
            <div className="mt-3 grid gap-2">
              {it.options.map((o, oi) => {
                const state = p === null ? "" : oi === it.answer ? "right" : oi === p ? "wrong" : "";
                const cls =
                  state === "right"
                    ? "border-up bg-up/10"
                    : state === "wrong"
                      ? "border-down bg-down/10"
                      : "border-line hover:border-mute";
                return (
                  <button
                    key={oi}
                    type="button"
                    onClick={() => pick(qi, oi)}
                    className={`rounded-[10px] border px-3.5 py-3 text-left text-[15px] leading-snug transition-colors ${cls}`}
                  >
                    {o}
                  </button>
                );
              })}
            </div>
            {p !== null && (
              <p className="mt-2.5 text-sm text-fg2" role="status">
                {p === it.answer ? "Correct. " : "Not quite. "}
                {it.why}
              </p>
            )}
          </div>
        );
      })}
      {answered === items.length && (
        <div className="flex flex-wrap items-center gap-3.5 font-mono text-[13px] font-medium text-gold">
          <span>
            {correct} of {items.length} correct
          </span>
          <button type="button" className="chip" onClick={() => setPicked(items.map(() => null))}>
            Try again
          </button>
        </div>
      )}
    </div>
  );
}
