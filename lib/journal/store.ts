"use client";

import { useCallback, useSyncExternalStore } from "react";
import { demoTrades, parseTrades, type Trade } from "./core";

/**
 * Browser storage for the demo. To make the journal permanent and multi-device, replace the
 * three functions below (read, write) with calls to your own API or database. The hook's
 * shape (trades, add, update, remove, replace) can stay the same, so the UI needs no changes.
 */
const KEY = "tn-journal-v1";
const EVENT = "tn-journal-change";
const DEMO_ID_PREFIX = "demo-";

let cacheRaw: string | null = null;
let cacheVal: Trade[] = [];
let demoRaw: string | null = null;
let demoVal: Trade[] | null = null;

/** First visit (nothing stored yet): show sample trades. Any edit or "clear" persists over it. */
const getDemoRaw = () => (demoRaw ??= JSON.stringify(demoTrades()));

/**
 * Server render = the same sample set a first-time visitor sees, so the page
 * does not jump (CLS) when the client snapshot takes over.
 */
const readServer = (): Trade[] => (demoVal ??= demoTrades());

function read(): Trade[] {
  let raw = "[]";
  try {
    raw = localStorage.getItem(KEY) ?? getDemoRaw();
  } catch {
    /* blocked storage: behave as empty */
  }
  if (raw !== cacheRaw) {
    cacheRaw = raw;
    try {
      cacheVal = parseTrades(JSON.parse(raw));
    } catch {
      cacheVal = [];
    }
  }
  return cacheVal;
}

function write(next: Trade[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new Event(EVENT));
}

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

const isDemoSet = (list: Trade[]) =>
  list.length > 0 && list.every((t) => t.id.startsWith(DEMO_ID_PREFIX));

export function useJournal() {
  const trades = useSyncExternalStore(subscribe, read, readServer);
  const add = useCallback((t: Trade) => {
    const current = read();
    // The first real trade replaces the sample set instead of mixing into its stats.
    write([...(isDemoSet(current) ? [] : current), t]);
  }, []);
  const update = useCallback(
    (t: Trade) => write(read().map((x) => (x.id === t.id ? t : x))),
    [],
  );
  const remove = useCallback(
    (id: string) => write(read().filter((x) => x.id !== id)),
    [],
  );
  const replace = useCallback((list: Trade[]) => write(list), []);
  const isDemo = isDemoSet(trades);
  return { trades, isDemo, add, update, remove, replace };
}
