'use client';

import React, { useState } from 'react';
import { DynamicCandle, DynamicArrow, DynamicGuideLine } from './types';
import { Play, RotateCcw } from 'lucide-react';

interface DynamicCandleSvgProps {
  candles: DynamicCandle[];
  arrows?: DynamicArrow[];
  guideLines?: DynamicGuideLine[];
  contextTrend?: 'downtrend' | 'uptrend' | 'indecision';
  showAnnotations?: boolean;
  className?: string;
  height?: number;
  interactive?: boolean;
}

export function DynamicCandleSvg({
  candles,
  arrows = [],
  guideLines = [],
  contextTrend,
  showAnnotations = true,
  className = '',
  height = 280,
  interactive = true,
}: DynamicCandleSvgProps) {
  const [hoveredCandleIdx, setHoveredCandleIdx] = useState<number | null>(null);
  const [animKey, setAnimKey] = useState<number>(0);

  // SVG coordinate system
  const svgWidth = 480;
  const svgHeight = 260;
  const paddingY = 40;
  const usableHeight = svgHeight - paddingY * 2;

  // Convert 0..100 value to SVG Y coordinate (100 is at top, 0 is at bottom)
  const toY = (val: number) => {
    const clamped = Math.max(0, Math.min(100, val));
    return svgHeight - paddingY - (clamped / 100) * usableHeight;
  };

  // Calculate candle X positions
  const numCandles = candles.length;
  // If we have context trend candles, allocate space on the left
  const hasContextTrend = Boolean(contextTrend && contextTrend !== 'indecision');
  const startX = hasContextTrend ? 180 : 100;
  const availableWidth = svgWidth - startX - 60;
  const candleSpacing = numCandles > 1 ? availableWidth / (numCandles - 1) : 0;
  const candlePositions = candles.map((_, i) =>
    numCandles === 1 ? svgWidth / 2 + (hasContextTrend ? 30 : 0) : startX + i * candleSpacing
  );

  const getBullColor = 'var(--up)'; // emerald-500
  const getBearColor = 'var(--down)'; // rose-500
  const getNeutralColor = 'var(--mute)'; // slate-400

  const getCandleColor = (color?: 'bull' | 'bear' | 'neutral') => {
    if (color === 'bull') return getBullColor;
    if (color === 'bear') return getBearColor;
    return getNeutralColor;
  };

  const restartAnimation = () => {
    setAnimKey((prev) => prev + 1);
  };

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      {/* Controls Overlay */}
      <div className="absolute top-2 right-2 z-10 flex items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity">
        <button
          onClick={restartAnimation}
          title="Replay formation animation"
          className="p-1.5 rounded-lg bg-card/80 border border-border/80 text-muted-foreground hover:text-gold hover:border-gold/50 transition-colors"
        >
          <RotateCcw size={13} />
        </button>
      </div>

      <svg
        key={animKey}
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        className="w-full h-auto max-h-[300px] overflow-visible rounded-2xl bg-panel/70 border border-border/70"
        style={{ minHeight: `${height}px` }}
      >
        <defs>
          {/* Subtle Grid Pattern */}
          <pattern id="gridPattern" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-border/30" />
          </pattern>

          {/* Glow Filters */}
          <filter id="bullGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="bearGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Arrow markers */}
          <marker id="arrowUp" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 10 L 5 0 L 10 10 z" fill="var(--up)" />
          </marker>
          <marker id="arrowDown" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 0 L 5 10 z" fill="var(--down)" />
          </marker>
        </defs>

        {/* Background Grid */}
        <rect width={svgWidth} height={svgHeight} fill="url(#gridPattern)" rx="16" />

        {/* Watermark Logo / Title */}
        <text
          x={svgWidth - 14}
          y={svgHeight - 14}
          textAnchor="end"
          className="fill-muted-foreground/30 text-[9px] font-mono tracking-widest uppercase pointer-events-none"
        >
          Dynamic Candle Engine · TradeNotes
        </text>

        {/* ─── Prior Trend Context Candles (if applicable) ────────────── */}
        {hasContextTrend && contextTrend === 'downtrend' && (
          <g className="opacity-40 transition-opacity hover:opacity-75">
            {/* Downtrend Arrow indicator */}
            <path
              d="M 40 50 L 130 115"
              stroke="var(--down)"
              strokeWidth="2"
              strokeDasharray="4 3"
              markerEnd="url(#arrowDown)"
              fill="none"
            />
            <text x="50" y="42" fill="var(--down)" className="text-[10px] font-mono font-bold">
              Prior Downtrend
            </text>

            {/* Candle 1 */}
            <line x1="55" y1={toY(80)} x2="55" y2={toY(45)} stroke={getBearColor} strokeWidth="1.5" />
            <rect x="47" y={toY(75)} width="16" height={toY(50) - toY(75)} fill={getBearColor} rx="1.5" />

            {/* Candle 2 */}
            <line x1="85" y1={toY(68)} x2="85" y2={toY(35)} stroke={getBearColor} strokeWidth="1.5" />
            <rect x="77" y={toY(64)} width="16" height={toY(40) - toY(64)} fill={getBearColor} rx="1.5" />

            {/* Candle 3 */}
            <line x1="115" y1={toY(55)} x2="115" y2={toY(22)} stroke={getBearColor} strokeWidth="1.5" />
            <rect x="107" y={toY(50)} width="16" height={toY(28) - toY(50)} fill={getBearColor} rx="1.5" />
          </g>
        )}

        {hasContextTrend && contextTrend === 'uptrend' && (
          <g className="opacity-40 transition-opacity hover:opacity-75">
            {/* Uptrend Arrow indicator */}
            <path
              d="M 40 180 L 130 100"
              stroke="var(--up)"
              strokeWidth="2"
              strokeDasharray="4 3"
              markerEnd="url(#arrowUp)"
              fill="none"
            />
            <text x="50" y="195" fill="var(--up)" className="text-[10px] font-mono font-bold">
              Prior Uptrend
            </text>

            {/* Candle 1 */}
            <line x1="55" y1={toY(45)} x2="55" y2={toY(15)} stroke={getBullColor} strokeWidth="1.5" />
            <rect x="47" y={toY(40)} width="16" height={toY(20) - toY(40)} fill={getBullColor} rx="1.5" />

            {/* Candle 2 */}
            <line x1="85" y1={toY(62)} x2="85" y2={toY(32)} stroke={getBullColor} strokeWidth="1.5" />
            <rect x="77" y={toY(58)} width="16" height={toY(36) - toY(58)} fill={getBullColor} rx="1.5" />

            {/* Candle 3 */}
            <line x1="115" y1={toY(80)} x2="115" y2={toY(50)} stroke={getBullColor} strokeWidth="1.5" />
            <rect x="107" y={toY(75)} width="16" height={toY(55) - toY(75)} fill={getBullColor} rx="1.5" />
          </g>
        )}

        {/* ─── Guide Lines (Tweezer bottoms, highs, etc.) ─────────────── */}
        {guideLines.map((gl, i) => {
          const y = toY(gl.yValue);
          const color = gl.color || 'var(--link)';
          return (
            <g key={`gl-${i}`} className="animate-in fade-in duration-500">
              <line
                x1={startX - 30}
                y1={y}
                x2={svgWidth - 25}
                y2={y}
                stroke={color}
                strokeWidth="1.5"
                strokeDasharray={gl.style === 'solid' ? undefined : '5 4'}
              />
              <rect
                x={svgWidth - 190}
                y={y - 10}
                width="165"
                height="19"
                rx="4"
                stroke={color}
                strokeWidth="0.8"
                className="fill-card opacity-95 shadow-sm"
              />
              <text
                x={svgWidth - 108}
                y={y + 3}
                fill={color}
                textAnchor="middle"
                className="text-[10px] font-mono font-semibold"
              >
                {gl.label}
              </text>
            </g>
          );
        })}

        {/* ─── Main Dynamic Candlesticks ──────────────────────────────── */}
        {candles.map((candle, idx) => {
          const x = candlePositions[idx];
          const isBull = candle.close >= candle.open;
          const colorType = candle.color || (isBull ? 'bull' : 'bear');
          const candleColor = getCandleColor(colorType);

          const highY = toY(candle.high);
          const lowY = toY(candle.low);
          const openY = toY(candle.open);
          const closeY = toY(candle.close);

          const bodyTopY = Math.min(openY, closeY);
          const bodyBottomY = Math.max(openY, closeY);
          const bodyHeight = Math.max(2, bodyBottomY - bodyTopY); // Min 2px for doji
          const bodyWidth = 28;

          const isHovered = hoveredCandleIdx === idx;

          return (
            <g
              key={`candle-${idx}`}
              className="cursor-pointer group"
              onMouseEnter={() => setHoveredCandleIdx(idx)}
              onMouseLeave={() => setHoveredCandleIdx(null)}
            >
              {/* Animation wrapper */}
              <animateTransform
                attributeName="transform"
                type="translate"
                from={`0, ${bodyHeight / 2}`}
                to="0, 0"
                dur="0.4s"
                begin={`${idx * 0.15}s`}
                fill="freeze"
              />

              {/* Hover Highlight halo */}
              {isHovered && (
                <rect
                  x={x - bodyWidth - 8}
                  y={highY - 14}
                  width={(bodyWidth + 8) * 2}
                  height={lowY - highY + 28}
                  rx="10"
                  fill={candleColor}
                  fillOpacity="0.08"
                  stroke={candleColor}
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />
              )}

              {/* Upper Wick */}
              <line
                x1={x}
                y1={highY}
                x2={x}
                y2={bodyTopY}
                stroke={candleColor}
                strokeWidth={isHovered ? '3' : '2.5'}
                strokeLinecap="round"
                className="transition-all duration-200"
              />

              {/* Lower Wick */}
              <line
                x1={x}
                y1={bodyBottomY}
                x2={x}
                y2={lowY}
                stroke={candleColor}
                strokeWidth={isHovered ? '3' : '2.5'}
                strokeLinecap="round"
                className="transition-all duration-200"
              />

              {/* Real Body */}
              <rect
                x={x - bodyWidth / 2}
                y={bodyTopY}
                width={bodyWidth}
                height={bodyHeight}
                fill={candleColor}
                stroke={isHovered ? 'var(--fg)' : candleColor}
                strokeWidth={isHovered ? '1.5' : '1'}
                rx={bodyHeight > 4 ? 3 : 0}
                className="transition-all duration-200 drop-shadow-sm"
              />

              {/* Candle Label below (e.g. "1st", "2nd", "Bullish") */}
              {candle.label && (
                <text
                  x={x}
                  y={lowY + 22}
                  textAnchor="middle"
                  fill="currentColor"
                  className="fill-foreground font-mono text-[11px] font-bold tracking-wide"
                >
                  {candle.label}
                </text>
              )}

              {/* ─── Annotations matching slide images ────────────────── */}
              {showAnnotations && (
                <>
                  {/* Top Annotation (e.g. Closing = High, High, Open) */}
                  {candle.topAnnotation && (
                    <g>
                      <line
                        x1={x}
                        y1={highY - 2}
                        x2={x}
                        y2={highY - 12}
                        stroke={candleColor}
                        strokeWidth="1"
                        strokeDasharray="2 2"
                      />
                      <rect
                        x={x - 48}
                        y={highY - 27}
                        width="96"
                        height="16"
                        rx="3"
                        stroke={candleColor}
                        strokeWidth="0.8"
                        className="fill-card opacity-95 shadow-sm"
                      />
                      <text
                        x={x}
                        y={highY - 16}
                        textAnchor="middle"
                        fill={candleColor}
                        className="text-[9px] font-mono font-bold"
                      >
                        {candle.topAnnotation}
                      </text>
                    </g>
                  )}

                  {/* Bottom Annotation (e.g. Opening = Low, Low, Close) */}
                  {candle.bottomAnnotation && (
                    <g>
                      <line
                        x1={x}
                        y1={lowY + 2}
                        x2={x}
                        y2={lowY + 8}
                        stroke={candleColor}
                        strokeWidth="1"
                        strokeDasharray="2 2"
                      />
                      <rect
                        x={x - 48}
                        y={lowY + 8}
                        width="96"
                        height="16"
                        rx="3"
                        stroke={candleColor}
                        strokeWidth="0.8"
                        className="fill-card opacity-95 shadow-sm"
                      />
                      <text
                        x={x}
                        y={lowY + 19}
                        textAnchor="middle"
                        fill={candleColor}
                        className="text-[9px] font-mono font-bold"
                      >
                        {candle.bottomAnnotation}
                      </text>
                    </g>
                  )}

                  {/* Body Annotation (e.g. "Real Body", "Small Body") */}
                  {candle.bodyAnnotation && isHovered && (
                    <g className="animate-in fade-in duration-200">
                      <rect
                        x={x + bodyWidth / 2 + 8}
                        y={bodyTopY + bodyHeight / 2 - 10}
                        width="85"
                        height="20"
                        rx="4"
                        stroke="var(--gold)"
                        strokeWidth="1"
                        className="fill-card"
                      />
                      <text
                        x={x + bodyWidth / 2 + 50}
                        y={bodyTopY + bodyHeight / 2 + 3}
                        textAnchor="middle"
                        fill="var(--gold)"
                        className="text-[9px] font-mono font-semibold"
                      >
                        {candle.bodyAnnotation}
                      </text>
                    </g>
                  )}
                </>
              )}
            </g>
          );
        })}

        {/* ─── Arrows (Pressure / Direction Indicator from Slides) ────── */}
        {arrows.map((arr, i) => {
          const x = candlePositions[arr.candleIndex];
          const isUp = arr.direction === 'up';
          const arrowColor = arr.color || (isUp ? 'var(--up)' : 'var(--down)');
          const arrowX = numCandles > 1 ? x + 44 : x + 50;
          const arrowYStart = isUp ? toY(25) : toY(80);
          const arrowYEnd = isUp ? toY(85) : toY(20);

          return (
            <g key={`arrow-${i}`} className="animate-in fade-in duration-700">
              <line
                x1={arrowX}
                y1={arrowYStart}
                x2={arrowX}
                y2={arrowYEnd}
                stroke={arrowColor}
                strokeWidth="2.5"
                markerEnd={isUp ? 'url(#arrowUp)' : 'url(#arrowDown)'}
              />
              {arr.label && (
                <text
                  x={arrowX + 8}
                  y={(arrowYStart + arrowYEnd) / 2}
                  fill={arrowColor}
                  className="text-[10px] font-mono font-bold"
                  style={{ writingMode: 'vertical-rl' }}
                >
                  {arr.label}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {/* Interactive OHLC Live HUD on Hover */}
      {interactive && hoveredCandleIdx !== null && candles[hoveredCandleIdx] && (
        <div className="mt-3 flex flex-wrap items-center justify-center gap-3 px-4 py-1.5 rounded-full bg-card/90 border border-border/80 text-xs font-mono animate-in fade-in duration-150">
          <span className="text-muted-foreground font-semibold">
            {candles[hoveredCandleIdx].label || `Candle ${hoveredCandleIdx + 1}`}:
          </span>
          <span className="text-foreground">
            O: <strong className="text-gold">{candles[hoveredCandleIdx].open}</strong>
          </span>
          <span className="text-foreground">
            H: <strong className="text-up">{candles[hoveredCandleIdx].high}</strong>
          </span>
          <span className="text-foreground">
            L: <strong className="text-down">{candles[hoveredCandleIdx].low}</strong>
          </span>
          <span className="text-foreground">
            C: <strong className="text-gold">{candles[hoveredCandleIdx].close}</strong>
          </span>
          <span className="text-muted-foreground text-[10px] pl-2 border-l border-border">
            Range: {candles[hoveredCandleIdx].high - candles[hoveredCandleIdx].low} pts
          </span>
        </div>
      )}
    </div>
  );
}
