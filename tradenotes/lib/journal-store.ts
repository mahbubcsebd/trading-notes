"use client";

import { useCallback, useSyncExternalStore } from "react";
import { parseTrades, type Trade } from "./journal";

/**
 * Browser storage for the demo. To make the journal permanent and multi-device, replace the
 * three functions below (read, write) with calls to your own API or database. The hook's
 * shape (trades, add, update, remove, replace) can stay the same, so the UI needs no changes.
 */
const KEY = "tn-journal-v1";
const EVENT = "tn-journal-change";

let cacheRaw: string | null = null;
let cacheVal: Trade[] = [];
const EMPTY: Trade[] = [];

function read(): Trade[] {
  let raw = "[]";
  try {
    raw = localStorage.getItem(KEY) ?? "[]";
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

export function useJournal() {
  const trades = useSyncExternalStore(subscribe, read, () => EMPTY);
  const add = useCallback((t: Trade) => write([...read(), t]), []);
  const update = useCallback((t: Trade) => write(read().map((x) => (x.id === t.id ? t : x))), []);
  const remove = useCallback((id: string) => write(read().filter((x) => x.id !== id)), []);
  const replace = useCallback((list: Trade[]) => write(list), []);
  return { trades, add, update, remove, replace };
}
