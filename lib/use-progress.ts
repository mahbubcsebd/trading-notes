"use client";

import { useCallback, useSyncExternalStore } from "react";

// Same key/shape as lib/progress.tsx (JSON array of lesson slugPaths).
const KEY = "tradenotes:completed";
const EVENT = "tn-progress-change";
const EMPTY = "[]";

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

function read(): string {
  try {
    return localStorage.getItem(KEY) ?? EMPTY;
  } catch {
    return EMPTY;
  }
}

function parse(raw: string): string[] {
  try {
    const v: unknown = JSON.parse(raw);
    return Array.isArray(v)
      ? v.filter((x): x is string => typeof x === "string")
      : [];
  } catch {
    return [];
  }
}

export function useProgress() {
  const raw = useSyncExternalStore(subscribe, read, () => EMPTY);
  const done = parse(raw);

  const toggle = useCallback((id: string) => {
    const cur = parse(read());
    const next = cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id];
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* storage blocked: progress lasts for this page view only */
    }
    window.dispatchEvent(new Event(EVENT));
  }, []);

  return { done, isDone: (id: string) => done.includes(id), toggle };
}
