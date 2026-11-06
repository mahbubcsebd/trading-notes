"use client";

import { useCallback, useSyncExternalStore } from "react";

const KEY = "tn-progress-v1";
const EVENT = "tn-progress-change";

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

function getSnapshot(): string {
  try {
    return localStorage.getItem(KEY) ?? "[]";
  } catch {
    return "[]";
  }
}

function getServerSnapshot(): string {
  return "[]";
}

function parse(raw: string): string[] {
  try {
    const v = JSON.parse(raw);
    return Array.isArray(v) ? v.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

export function useProgress() {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const done = parse(raw);

  const toggle = useCallback((id: string) => {
    const cur = parse(getSnapshot());
    const next = cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id];
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* storage can be blocked; progress then lasts for this page view only */
    }
    window.dispatchEvent(new Event(EVENT));
  }, []);

  const isDone = useCallback((id: string) => done.includes(id), [done]);
  return { done, isDone, toggle };
}
