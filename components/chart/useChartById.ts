"use client";

import { useEffect, useState } from "react";
import type { ChartData } from "@/lib/chart-types";

type FetchState =
  | { id: string; status: "ok"; chart: ChartData }
  | { id: string; status: "error" };

// Charts are static files: keep fetched ones for the session so prev/next is instant.
const cache = new Map<string, ChartData>();

/**
 * Full chart (all candles, annotations, indicators, explanation) for the
 * detail modal. Returns `undefined` while loading and `null` on failure.
 */
export function useChartById(id: string | null): ChartData | null | undefined {
  const [state, setState] = useState<FetchState | null>(null);

  useEffect(() => {
    if (!id || cache.has(id)) return;
    const controller = new AbortController();
    fetch(`/api/charts/${encodeURIComponent(id)}`, {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<ChartData>;
      })
      .then((chart) => {
        cache.set(id, chart);
        setState({ id, status: "ok", chart });
      })
      .catch((err: unknown) => {
        if (controller.signal.aborted) return;
        console.error(`[charts] failed to load chart "${id}"`, err);
        setState({ id, status: "error" });
      });
    return () => controller.abort();
  }, [id]);

  if (!id) return null;
  const cached = cache.get(id);
  if (cached) return cached;
  if (state?.id !== id) return undefined;
  return state.status === "ok" ? state.chart : null;
}
