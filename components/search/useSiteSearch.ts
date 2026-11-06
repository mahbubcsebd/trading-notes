"use client";

import { useEffect, useState } from "react";
import type { SearchResult } from "@/lib/search/engine";

const DEBOUNCE_MS = 150;

export type SearchStatus = "idle" | "loading" | "success" | "error";

interface SearchState {
  status: SearchStatus;
  results: SearchResult[];
  /** `lang:query` the results belong to (avoids flashing "no results" for a stale query). */
  key: string;
}

const IDLE: SearchState = { status: "idle", results: [], key: "" };

function isSearchResponse(
  value: unknown,
): value is { results: SearchResult[] } {
  return (
    typeof value === "object" &&
    value !== null &&
    Array.isArray((value as { results?: unknown }).results)
  );
}

export function useSiteSearch(query: string, lang: string): SearchState {
  const [state, setState] = useState<SearchState>(IDLE);
  const trimmed = query.trim();
  const key = `${lang}:${trimmed}`;

  useEffect(() => {
    if (!trimmed) return;
    const controller = new AbortController();

    const timer = window.setTimeout(async () => {
      try {
        const params = new URLSearchParams({ q: trimmed, lang });
        const res = await fetch(`/api/search?${params}`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(`Search request failed: ${res.status}`);
        const body: unknown = await res.json();
        if (!isSearchResponse(body))
          throw new Error("Malformed search response");
        setState({ status: "success", results: body.results, key });
      } catch (error) {
        if (controller.signal.aborted) return;
        console.error("[search]", error);
        setState({ status: "error", results: [], key });
      }
    }, DEBOUNCE_MS);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [trimmed, lang, key]);

  if (!trimmed) return IDLE;
  // Keep previous results on screen while the new query is in flight.
  if (state.key !== key) return { ...state, status: "loading" };
  return state;
}
