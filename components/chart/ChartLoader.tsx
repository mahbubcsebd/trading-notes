'use client';

import React, { useState, useEffect } from 'react';
import { ChartData } from '@/lib/charts';
import { CandleChart } from './CandleChart';

interface ChartLoaderProps {
  id: string;
  height?: number;
  caption?: string;
}

export function ChartLoader({ id, height = 420, caption }: ChartLoaderProps) {
  const [chart, setChart] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    fetch(`/api/charts/${id}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (isMounted) {
          setChart(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div
        className="my-6 rounded-2xl border border-border/80 bg-card/50 flex items-center justify-center animate-pulse"
        style={{ height }}
      >
        <span className="font-mono text-xs text-muted-foreground">Loading chart: {id}...</span>
      </div>
    );
  }

  if (!chart || !chart.candles || chart.candles.length === 0) {
    return (
      <div className="my-6 rounded-2xl border border-border/80 bg-card p-6 text-center space-y-2">
        <p className="font-mono text-sm font-semibold text-foreground">Chart: {id}</p>
        <p className="text-xs text-muted-foreground">{caption || 'No chart data available'}</p>
      </div>
    );
  }

  return (
    <div className="my-6">
      <CandleChart
        id={chart.id}
        symbol={chart.symbol}
        timeframe={chart.timeframe}
        candles={chart.candles}
        annotations={chart.annotations}
        caption={caption || chart.caption}
        height={height}
      />
    </div>
  );
}
