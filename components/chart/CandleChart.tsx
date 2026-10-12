'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Candle, Annotation, LocalizedField, getLocalizedText } from '@/lib/chart-types';
import { Eye, EyeOff, Play, Pause, SkipForward, SkipBack, RotateCcw, Maximize2, Minimize2, Download, Copy, Check } from 'lucide-react';

interface CandleChartProps {
  id?: string;
  symbol?: string;
  timeframe?: string;
  candles: Candle[];
  annotations?: Annotation[];
  height?: number;
  caption?: LocalizedField;
  showControls?: boolean;
  className?: string;
}

export function CandleChart({
  id = 'chart',
  symbol = 'XAUUSD',
  timeframe = 'H4',
  candles = [],
  annotations = [],
  height = 420,
  caption,
  showControls = true,
  className = '',
}: CandleChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [showAnnotations, setShowAnnotations] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isReplaying, setIsReplaying] = useState(false);
  const [replayIndex, setReplayIndex] = useState(candles.length);
  const [hoveredCandle, setHoveredCandle] = useState<Candle | null>(null);
  const [hoveredPos, setHoveredPos] = useState<{ x: number; y: number } | null>(null);

  // Set replay limit when candles change
  useEffect(() => {
    setReplayIndex(candles.length);
    setIsReplaying(false);
  }, [candles.length]);

  // Handle replay auto-play
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isReplaying) {
      interval = setInterval(() => {
        setReplayIndex((prev) => {
          if (prev >= candles.length) {
            setIsReplaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 700);
    }
    return () => clearInterval(interval);
  }, [isReplaying, candles.length]);

  // Current active visible candles based on replay state
  const activeCandles = useMemo(() => {
    return candles.slice(0, Math.max(1, replayIndex));
  }, [candles, replayIndex]);

  // Active annotations limited to current replay index if tied to bar index
  const activeAnnotations = useMemo(() => {
    if (!showAnnotations) return [];
    return annotations.filter((a) => {
      if (a.i !== undefined) return a.i < replayIndex;
      if (a.from?.i !== undefined) return a.from.i < replayIndex;
      return true;
    });
  }, [annotations, showAnnotations, replayIndex]);

  // Calculate scales
  const chartMetrics = useMemo(() => {
    if (activeCandles.length === 0) return { min: 0, max: 100, range: 100 };
    let min = Infinity;
    let max = -Infinity;

    activeCandles.forEach((c) => {
      if (c.l < min) min = c.l;
      if (c.h > max) max = c.h;
    });

    // Also consider hline annotations in scale
    activeAnnotations.forEach((a) => {
      if (a.type === 'hline' && a.price !== undefined) {
        if (a.price < min) min = a.price;
        if (a.price > max) max = a.price;
      }
    });

    if (min === max) {
      min -= 1;
      max += 1;
    }

    const padding = (max - min) * 0.1;
    return {
      min: min - padding,
      max: max + padding,
      range: max - min + padding * 2,
    };
  }, [activeCandles, activeAnnotations]);

  const chartWidth = 800;
  const chartHeight = isFullscreen ? 600 : height;
  const rightAxisWidth = 65;
  const plotWidth = chartWidth - rightAxisWidth;
  const plotHeight = chartHeight - 35;

  const candleCount = candles.length;
  const step = plotWidth / (candleCount + 1);
  const candleWidth = Math.max(4, Math.min(18, step * 0.7));

  const getY = (price: number) => {
    return plotHeight - ((price - chartMetrics.min) / chartMetrics.range) * plotHeight;
  };

  const getPriceAtY = (y: number) => {
    return chartMetrics.max - (y / plotHeight) * chartMetrics.range;
  };

  // Price Grid intervals
  const gridPrices = useMemo(() => {
    const steps = 5;
    const items: number[] = [];
    for (let i = 0; i <= steps; i++) {
      items.push(chartMetrics.min + (chartMetrics.range / steps) * i);
    }
    return items;
  }, [chartMetrics]);

  // Download chart as PNG
  const handleDownloadPng = () => {
    const svgEl = svgRef.current;
    if (!svgEl) return;

    // Clone the SVG so we can augment attributes cleanly without affecting DOM
    const clone = svgEl.cloneNode(true) as SVGSVGElement;
    clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    clone.setAttribute('width', chartWidth.toString());
    clone.setAttribute('height', chartHeight.toString());

    const svgData = new XMLSerializer().serializeToString(clone);
    const canvas = document.createElement('canvas');
    const scale = 2; // High-DPI 2x retina export
    canvas.width = chartWidth * scale;
    canvas.height = chartHeight * scale;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const blobURL = window.URL.createObjectURL(svgBlob);

    const renderAndDownload = (sourceImg: HTMLImageElement) => {
      // Background matching dark theme
      ctx.fillStyle = '#0b0f19';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw chart
      ctx.drawImage(sourceImg, 0, 0, canvas.width, canvas.height);

      // Clean up blob URL if used
      try {
        window.URL.revokeObjectURL(blobURL);
      } catch (e) {}

      // Trigger download
      const a = document.createElement('a');
      a.download = `${id || symbol}-${timeframe}-chart.png`;
      a.href = canvas.toDataURL('image/png');
      a.click();
    };

    const img = new Image();
    img.onload = () => {
      renderAndDownload(img);
    };

    img.onerror = () => {
      // Fallback with base64 data URI if blob fails
      const fallbackImg = new Image();
      fallbackImg.onload = () => {
        renderAndDownload(fallbackImg);
      };
      fallbackImg.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
    };

    img.src = blobURL;
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (x <= plotWidth && y <= plotHeight) {
      setHoveredPos({ x, y });
      const barIdx = Math.round(x / step) - 1;
      if (barIdx >= 0 && barIdx < activeCandles.length) {
        setHoveredCandle(activeCandles[barIdx]);
      } else {
        setHoveredCandle(null);
      }
    } else {
      setHoveredPos(null);
      setHoveredCandle(null);
    }
  };

  const handleMouseLeave = () => {
    setHoveredPos(null);
    setHoveredCandle(null);
  };

  const lastCandle = activeCandles[activeCandles.length - 1];
  const displayedCandle = hoveredCandle || lastCandle;

  return (
    <div
      ref={containerRef}
      className={`rounded-2xl border border-border/80 bg-card/95 shadow-xl overflow-hidden flex flex-col ${
        isFullscreen ? 'fixed inset-4 z-50 bg-background/98 border-gold/40' : ''
      } ${className}`}
    >
      {/* Top Header Bar & OHLC Legend */}
      <div className="px-4 py-3 border-b border-border/70 bg-panel/40 flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Symbol, Timeframe & Current Values */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-mono">
            <span className="font-bold text-sm text-foreground">{symbol}</span>
            <span className="px-1.5 py-0.5 rounded bg-muted text-[10px] text-gold font-semibold">
              {timeframe}
            </span>
          </div>

          {displayedCandle && (
            <div className="hidden sm:flex items-center gap-2.5 font-mono text-[11px]">
              <span className="text-muted-foreground">
                O: <strong className="text-foreground">{displayedCandle.o.toFixed(2)}</strong>
              </span>
              <span className="text-muted-foreground">
                H: <strong className="text-foreground">{displayedCandle.h.toFixed(2)}</strong>
              </span>
              <span className="text-muted-foreground">
                L: <strong className="text-foreground">{displayedCandle.l.toFixed(2)}</strong>
              </span>
              <span className="text-muted-foreground">
                C:{' '}
                <strong
                  className={
                    displayedCandle.c >= displayedCandle.o ? 'text-emerald-400' : 'text-rose-400'
                  }
                >
                  {displayedCandle.c.toFixed(2)}
                </strong>
              </span>
            </div>
          )}
        </div>

        {/* Action Controls */}
        {showControls && (
          <div className="flex items-center gap-1.5">
            {/* Annotation toggle */}
            <button
              onClick={() => setShowAnnotations(!showAnnotations)}
              title={showAnnotations ? 'Hide annotations' : 'Show annotations'}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium border flex items-center gap-1.5 transition-all ${
                showAnnotations
                  ? 'bg-gold/10 text-gold border-gold/30'
                  : 'bg-muted/40 text-muted-foreground border-border/60 hover:text-foreground'
              }`}
            >
              {showAnnotations ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">Notes</span>
            </button>

            {/* PNG Export */}
            <button
              onClick={handleDownloadPng}
              title="Download PNG"
              className="p-1.5 rounded-lg border border-border/60 text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
            </button>

            {/* Fullscreen toggle */}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
              className="p-1.5 rounded-lg border border-border/60 text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
            >
              {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        )}
      </div>

      {/* SVG Chart Main Viewport */}
      <div className="relative flex-1 bg-background/50 overflow-hidden select-none">
        <svg
          ref={svgRef}
          className="w-full h-full cursor-crosshair"
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          preserveAspectRatio="none"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Grids */}
          {gridPrices.map((p, idx) => {
            const y = getY(p);
            return (
              <g key={idx}>
                <line
                  x1="0"
                  y1={y}
                  x2={plotWidth}
                  y2={y}
                  stroke="rgba(255, 255, 255, 0.08)"
                  strokeDasharray="2 3"
                />
                <text
                  x={plotWidth + 8}
                  y={y + 3}
                  fill="#94a3b8"
                  className="font-mono text-[10px]"
                >
                  {p.toFixed(2)}
                </text>
              </g>
            );
          })}

          {/* Zones */}
          {activeAnnotations
            .filter((a) => a.type === 'zone' && a.from && a.to)
            .map((a, idx) => {
              const y1 = getY(Math.max(a.from!.price, a.to!.price));
              const y2 = getY(Math.min(a.from!.price, a.to!.price));
              const x1 = Math.max(0, (a.from!.i ?? 0) * step);
              const x2 = Math.min(plotWidth, ((a.to!.i ?? candleCount - 1) + 1) * step);
              const color = a.color || '#22c55e';
              return (
                <g key={`zone-${idx}`}>
                  <rect
                    x={x1}
                    y={y1}
                    width={Math.max(10, x2 - x1)}
                    height={Math.max(6, y2 - y1)}
                    fill={color}
                    fillOpacity="0.12"
                    stroke={color}
                    strokeOpacity="0.5"
                    strokeWidth="1"
                    rx="3"
                  />
                  {a.label && (
                    <text
                      x={x1 + 6}
                      y={y1 + 14}
                      fill={color}
                      className="font-mono text-[10px] font-semibold"
                    >
                      {a.label}
                    </text>
                  )}
                </g>
              );
            })}

          {/* Horizontal Level Lines */}
          {activeAnnotations
            .filter((a) => a.type === 'hline' && a.price !== undefined)
            .map((a, idx) => {
              const y = getY(a.price!);
              const color = a.color || '#d4af37';
              return (
                <g key={`hline-${idx}`}>
                  <line
                    x1="0"
                    y1={y}
                    x2={plotWidth}
                    y2={y}
                    stroke={color}
                    strokeWidth="1.2"
                    strokeDasharray={a.style === 'dashed' ? '4 3' : a.style === 'dotted' ? '2 2' : undefined}
                    strokeOpacity="0.85"
                  />
                  {/* Label pill on the line */}
                  <rect
                    x={plotWidth - (a.label ? a.label.length * 7 + 16 : 50)}
                    y={y - 9}
                    width={a.label ? a.label.length * 7 + 12 : 46}
                    height="18"
                    fill={color}
                    fillOpacity="0.2"
                    stroke={color}
                    strokeWidth="0.8"
                    rx="3"
                  />
                  <text
                    x={plotWidth - (a.label ? a.label.length * 7 + 10 : 44)}
                    y={y + 3}
                    fill={color}
                    className="font-mono text-[9px] font-bold"
                  >
                    {a.label || a.price?.toFixed(2)}
                  </text>
                </g>
              );
            })}

          {/* Candles */}
          {activeCandles.map((c, i) => {
            const x = (i + 1) * step;
            const isBull = c.c >= c.o;
            const openY = getY(c.o);
            const closeY = getY(c.c);
            const highY = getY(c.h);
            const lowY = getY(c.l);

            const bodyTop = Math.min(openY, closeY);
            const bodyHeight = Math.max(1.8, Math.abs(closeY - openY));
            const color = isBull ? '#22c55e' : '#ef4444';

            return (
              <g key={`candle-${i}`}>
                {/* Wick */}
                <line
                  x1={x}
                  y1={highY}
                  x2={x}
                  y2={lowY}
                  stroke={color}
                  strokeWidth="1.2"
                />
                {/* Body */}
                <rect
                  x={x - candleWidth / 2}
                  y={bodyTop}
                  width={candleWidth}
                  height={bodyHeight}
                  fill={color}
                  stroke={color}
                  strokeWidth="0.5"
                  rx="1"
                />
              </g>
            );
          })}

          {/* Markers & Text Annotations */}
          {activeAnnotations
            .filter((a) => a.type === 'marker' && a.i !== undefined)
            .map((a, idx) => {
              const candle = activeCandles[a.i!];
              if (!candle) return null;
              const x = (a.i! + 1) * step;
              const isAbove = a.position === 'aboveBar';
              const y = isAbove ? getY(candle.h) - 16 : getY(candle.l) + 16;
              const color = a.color || (isAbove ? '#ef4444' : '#22c55e');

              return (
                <g key={`marker-${idx}`} className="animate-fade-in">
                  {/* Arrow polygon */}
                  <polygon
                    points={
                      isAbove
                        ? `${x},${y + 8} ${x - 4},${y} ${x + 4},${y}`
                        : `${x},${y - 8} ${x - 4},${y} ${x + 4},${y}`
                    }
                    fill={color}
                  />
                  {a.text && (
                    <text
                      x={x}
                      y={isAbove ? y - 4 : y + 12}
                      textAnchor="middle"
                      fill={color}
                      className="font-mono text-[9px] font-semibold"
                    >
                      {a.text}
                    </text>
                  )}
                </g>
              );
            })}

          {/* Free Text Annotations */}
          {activeAnnotations
            .filter((a) => a.type === 'text' && a.p)
            .map((a, idx) => {
              const x = ((a.p!.i ?? 0) + 1) * step;
              const y = getY(a.p!.price);
              return (
                <text
                  key={`text-${idx}`}
                  x={x}
                  y={y}
                  fill="#d4af37"
                  className="font-mono text-[10px] font-bold"
                >
                  {a.text}
                </text>
              );
            })}

          {/* Interactive Crosshair */}
          {hoveredPos && (
            <g className="pointer-events-none">
              <line
                x1="0"
                y1={hoveredPos.y}
                x2={plotWidth}
                y2={hoveredPos.y}
                stroke="#d4af37"
                strokeWidth="0.8"
                strokeDasharray="3 3"
              />
              <line
                x1={hoveredPos.x}
                y1="0"
                x2={hoveredPos.x}
                y2={plotHeight}
                stroke="#d4af37"
                strokeWidth="0.8"
                strokeDasharray="3 3"
              />
              {/* Floating Crosshair Price Badge */}
              <rect
                x={plotWidth}
                y={hoveredPos.y - 8}
                width={rightAxisWidth}
                height="16"
                fill="#d4af37"
                rx="2"
              />
              <text
                x={plotWidth + 4}
                y={hoveredPos.y + 4}
                fill="#000"
                className="font-mono text-[9px] font-bold"
              >
                {getPriceAtY(hoveredPos.y).toFixed(2)}
              </text>
            </g>
          )}

          {/* Axis Separator Line */}
          <line
            x1={plotWidth}
            y1="0"
            x2={plotWidth}
            y2={chartHeight}
            stroke="rgba(255, 255, 255, 0.12)"
          />
        </svg>
      </div>

      {/* Bottom Replay Toolbar */}
      {showControls && (
        <div className="px-4 py-2.5 border-t border-border/70 bg-panel/30 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Replay Controls */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-muted-foreground mr-1">Replay:</span>
            <button
              onClick={() => setIsReplaying(!isReplaying)}
              title={isReplaying ? 'Pause replay' : 'Play replay'}
              className="p-1.5 rounded-lg bg-gold text-black hover:bg-gold/90 transition-colors font-semibold"
            >
              {isReplaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={() => setReplayIndex((prev) => Math.max(1, prev - 1))}
              disabled={replayIndex <= 1}
              title="Previous candle"
              className="p-1.5 rounded-lg border border-border/60 text-muted-foreground hover:text-foreground disabled:opacity-40 transition-colors"
            >
              <SkipBack className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setReplayIndex((prev) => Math.min(candles.length, prev + 1))}
              disabled={replayIndex >= candles.length}
              title="Next candle"
              className="p-1.5 rounded-lg border border-border/60 text-muted-foreground hover:text-foreground disabled:opacity-40 transition-colors"
            >
              <SkipForward className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => {
                setIsReplaying(false);
                setReplayIndex(candles.length);
              }}
              title="Reset to full chart"
              className="p-1.5 rounded-lg border border-border/60 text-muted-foreground hover:text-foreground transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Candle Step Slider */}
          <div className="flex items-center gap-2 flex-1 max-w-xs">
            <input
              type="range"
              min="1"
              max={candles.length}
              value={replayIndex}
              onChange={(e) => {
                setIsReplaying(false);
                setReplayIndex(Number(e.target.value));
              }}
              className="w-full accent-gold h-1.5 bg-muted rounded-lg cursor-pointer"
            />
            <span className="font-mono text-[11px] text-muted-foreground shrink-0">
              {replayIndex}/{candles.length}
            </span>
          </div>
        </div>
      )}

      {/* Caption footer if provided */}
      {caption && (
        <div className="px-4 py-2 border-t border-border/40 bg-panel/10 text-xs text-muted-foreground">
          {typeof caption === 'string' ? caption : getLocalizedText(caption)}
        </div>
      )}
    </div>
  );
}
