"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { SearchItem } from "@/lib/search";

export function SearchPalette({
  items,
  open,
  onClose,
}: {
  items: SearchItem[];
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return items.filter((i) => i.kind === "Page" || i.kind === "Chapter").slice(0, 12);
    return items
      .map((i) => {
        const t = i.title.toLowerCase();
        const h = (i.hint ?? "").toLowerCase();
        const score = t.startsWith(term) ? 3 : t.includes(term) ? 2 : h.includes(term) ? 1 : 0;
        return { i, score };
      })
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 12)
      .map((r) => r.i);
  }, [q, items]);

  useEffect(() => {
    if (open) {
      setQ("");
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  useEffect(() => setActive(0), [q]);

  if (!open) return null;

  function go(item: SearchItem | undefined) {
    if (!item) return;
    onClose();
    router.push(item.href);
  }

  function onKey(e: React.KeyboardEvent) {
    if (e.key === "Escape") onClose();
    else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      go(results[active]);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/55 px-4 pt-[12vh]"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label="Search"
    >
      <div className="w-full max-w-xl overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl" onKeyDown={onKey}>
        <input
          ref={inputRef}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search lessons, patterns, glossary..."
          className="h-14 w-full border-b border-line bg-transparent px-5 text-base outline-none placeholder:text-mute"
          aria-label="Search"
        />
        <ul className="max-h-[50vh] overflow-y-auto p-2" role="listbox">
          {results.length === 0 && <li className="px-3 py-6 text-center text-sm text-mute">Nothing matches that. Try a shorter word.</li>}
          {results.map((r, idx) => (
            <li key={r.href + r.title} role="option" aria-selected={idx === active}>
              <button
                type="button"
                onMouseEnter={() => setActive(idx)}
                onClick={() => go(r)}
                className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left ${idx === active ? "bg-bg2" : ""}`}
              >
                <span className="min-w-0">
                  <span className="block truncate text-[15px]">{r.title}</span>
                  {r.hint && <span className="block truncate text-xs text-mute">{r.hint}</span>}
                </span>
                <span className="shrink-0 font-mono text-[11px] uppercase tracking-wider text-gold">{r.kind}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
