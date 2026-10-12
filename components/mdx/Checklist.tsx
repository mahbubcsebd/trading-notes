'use client';

import { useState, useEffect } from 'react';
import { CheckSquare, Square } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Interactive checklist that persists state to localStorage.
 * @param {{ items: string[], id: string }} props
 */
export function Checklist({ items, id }) {
  const storageKey = `tradenotes:checklist:${id}`;
  const [checked, setChecked] = useState([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) setChecked(JSON.parse(saved));
    } catch {}
  }, [storageKey]);

  function toggle(index) {
    const next = checked.includes(index)
      ? checked.filter((i) => i !== index)
      : [...checked, index];
    setChecked(next);
    localStorage.setItem(storageKey, JSON.stringify(next));
  }

  const allDone = items.length > 0 && checked.length === items.length;

  return (
    <div className="my-4 rounded-xl border border-border bg-panel overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-card/50">
        <span className="text-sm font-semibold text-foreground">Entry Checklist</span>
        <span className="text-xs text-muted-foreground">
          {checked.length}/{items.length}
          {allDone && <span className="ml-2 text-bull">✓ Ready</span>}
        </span>
      </div>
      <ul className="p-2" role="list">
        {items.map((item, i) => {
          const isChecked = checked.includes(i);
          return (
            <li key={i}>
              <button
                onClick={() => toggle(i)}
                className={cn(
                  'w-full flex items-start gap-3 p-2 rounded-lg text-left text-sm transition-colors',
                  isChecked
                    ? 'text-muted-foreground line-through'
                    : 'text-foreground hover:bg-accent'
                )}
                role="checkbox"
                aria-checked={isChecked}
              >
                {isChecked ? (
                  <CheckSquare size={16} className="text-bull shrink-0 mt-0.5" aria-hidden="true" />
                ) : (
                  <Square size={16} className="text-muted-foreground shrink-0 mt-0.5" aria-hidden="true" />
                )}
                {item}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
