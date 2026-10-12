'use client';

import React from 'react';
import { Candle, Annotation } from '@/lib/chart-types';

interface ChartThumbnailProps {
  candles: Candle[];
  annotations?: Annotation[];
  className?: string;
}

export function ChartThumbnail({ candles, annotations = [], className = '' }: ChartThumbnailProps) {
  if (!candles || candles.length === 0) {
    return (
      <div className={`w-full h-44 bg-card flex items-center justify-center text-xs text-muted-foreground ${className}`}>
        No candle data
      </div>
    );
  }

  // Calculate min and max price with padding
  let minPrice = Infinity;
  let maxPrice = -Infinity;

  candles.forEach((c) => {
    if (c.l < minPrice) minPrice = c.l;
    if (c.h > maxPrice) maxPrice = c.h;
  });

  if (minPrice === maxPrice) {
    minPrice -= 1;
    maxPrice += 1;
  }

  const padding = (maxPrice - minPrice) * 0.12;
  const low = minPrice - padding;
  const high = maxPrice + padding;
  const range = high - low;

  const width = 360;
  const height = 160;

  const candleCount = candles.length;
  const step = width / (candleCount + 1);
  const candleWidth = Math.max(4, Math.min(14, step * 0.65));

  const getY = (val: number) => {
    return height - ((val - low) / range) * height;
  };

  return (
    <div className={`relative w-full h-44 bg-panel/60 overflow-hidden flex items-center justify-center ${className}`}>
      {/* Background Subtle Grid Lines */}
      <svg className="w-full h-full" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
        <defs>
          <linearGradient id="bullGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#16a34a" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="bearGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#dc2626" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        {/* 3 Horizontal Grid lines */}
        <line x1="0" y1={height * 0.25} x2={width} y2={height * 0.25} stroke="currentColor" className="text-border/20" strokeDasharray="3 3" />
        <line x1="0" y1={height * 0.5} x2={width} y2={height * 0.5} stroke="currentColor" className="text-border/20" strokeDasharray="3 3" />
        <line x1="0" y1={height * 0.75} x2={width} y2={height * 0.75} stroke="currentColor" className="text-border/20" strokeDasharray="3 3" />

        {/* Render Zones from Annotations */}
        {annotations
          .filter((a) => a.type === 'zone' && a.from && a.to)
          .map((a, idx) => {
            const y1 = getY(Math.max(a.from!.price, a.to!.price));
            const y2 = getY(Math.min(a.from!.price, a.to!.price));
            const x1 = Math.max(0, (a.from!.i ?? 0) * step);
            const x2 = Math.min(width, ((a.to!.i ?? candleCount - 1) + 1) * step);
            const color = a.color || '#22c55e';
            return (
              <rect
                key={idx}
                x={x1}
                y={y1}
                width={Math.max(10, x2 - x1)}
                height={Math.max(4, y2 - y1)}
                fill={color}
                fillOpacity="0.15"
                stroke={color}
                strokeOpacity="0.4"
                strokeWidth="0.8"
                rx="2"
              />
            );
          })}

        {/* Render Horizontal Levels */}
        {annotations
          .filter((a) => a.type === 'hline' && a.price !== undefined)
          .map((a, idx) => {
            const y = getY(a.price!);
            const color = a.color || '#d4af37';
            return (
              <line
                key={idx}
                x1="0"
                y1={y}
                x2={width}
                y2={y}
                stroke={color}
                strokeWidth="1.2"
                strokeDasharray={a.style === 'dashed' ? '4 3' : a.style === 'dotted' ? '2 2' : undefined}
                strokeOpacity="0.75"
              />
            );
          })}

        {/* Render Candles */}
        {candles.map((c, i) => {
          const x = (i + 1) * step;
          const isBull = c.c >= c.o;
          const openY = getY(c.o);
          const closeY = getY(c.c);
          const highY = getY(c.h);
          const lowY = getY(c.l);

          const bodyTop = Math.min(openY, closeY);
          const bodyHeight = Math.max(1.5, Math.abs(closeY - openY));
          const color = isBull ? '#22c55e' : '#ef4444';

          return (
            <g key={i}>
              {/* Upper & Lower Wick */}
              <line
                x1={x}
                y1={highY}
                x2={x}
                y2={lowY}
                stroke={color}
                strokeWidth="1.2"
              />
              {/* Candle Body */}
              <rect
                x={x - candleWidth / 2}
                y={bodyTop}
                width={candleWidth}
                height={bodyHeight}
                fill={isBull ? 'url(#bullGrad)' : 'url(#bearGrad)'}
                rx="1"
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
