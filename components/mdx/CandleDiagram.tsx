import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Static, theme-aware candle drawing for MDX (pattern shapes, strong vs weak, look-alikes).
 * Prices are arbitrary units: the diagram auto-scales to the candles' high/low.
 * Not market data: use <Chart> for price history.
 */

export interface DiagramCandle {
  o: number;
  h: number;
  l: number;
  c: number;
  /** Text under the candle (e.g. "১", "Hammer"). */
  label?: string;
  /** Text above the candle (e.g. "লম্বা wick"). */
  note?: string;
  /** Draw faded: context candles before/after the pattern. */
  dim?: boolean;
}

export interface DiagramLevel {
  price: number;
  label: string;
  tone?: "support" | "resistance" | "neutral";
}

interface CandleDiagramProps {
  candles: DiagramCandle[];
  levels?: DiagramLevel[];
  title?: string;
  /** Optional verdict badge: good = bull tone, bad = bear tone. */
  verdict?: "good" | "bad";
  verdictLabel?: string;
  caption?: string;
  className?: string;
}

const STEP_X = 34;
const BODY_W = 16;
const PAD_X = 22;
const PAD_TOP = 26;
const PAD_BOTTOM = 26;
const PLOT_H = 150;
const MIN_BODY_PX = 1.5;

const LEVEL_COLOR: Record<NonNullable<DiagramLevel["tone"]>, string> = {
  support: "var(--bull)",
  resistance: "var(--bear)",
  neutral: "var(--muted-foreground)",
};

function candleColor(candle: DiagramCandle): string {
  if (candle.c > candle.o) return "var(--bull)";
  if (candle.c < candle.o) return "var(--bear)";
  return "var(--foreground)";
}

function makeScale(candles: DiagramCandle[], levels: DiagramLevel[]) {
  const prices = [
    ...candles.flatMap((k) => [k.h, k.l]),
    ...levels.map((lv) => lv.price),
  ];
  const max = Math.max(...prices);
  const min = Math.min(...prices);
  const span = max - min || 1;
  return (price: number) => PAD_TOP + ((max - price) / span) * PLOT_H;
}

function isValidCandle(k: DiagramCandle): boolean {
  return (
    [k.o, k.h, k.l, k.c].every(Number.isFinite) &&
    k.h >= Math.max(k.o, k.c) &&
    k.l <= Math.min(k.o, k.c)
  );
}

export function CandleDiagram({
  candles,
  levels = [],
  title,
  verdict,
  verdictLabel,
  caption,
  className,
}: CandleDiagramProps) {
  const valid =
    Array.isArray(candles) &&
    candles.length > 0 &&
    candles.every(isValidCandle);
  if (!valid) {
    return (
      <p className="text-bear my-4 font-mono text-xs">
        CandleDiagram: invalid candles (need h ≥ max(o,c) and l ≤ min(o,c)).
      </p>
    );
  }

  const y = makeScale(candles, levels);
  const width = PAD_X * 2 + STEP_X * (candles.length - 1) + BODY_W;
  const height = PAD_TOP + PLOT_H + PAD_BOTTOM;
  const ariaLabel =
    [title, caption].filter(Boolean).join(" — ") || "Candle diagram";

  return (
    <figure className={cn("not-prose my-6", className)}>
      <div className="border-border bg-panel rounded-xl border px-3 pt-3 pb-2">
        {(title || verdict) && (
          <div className="mb-1 flex items-center justify-between gap-2 px-1">
            {title && (
              <span className="text-foreground text-sm font-semibold tracking-tight">
                {title}
              </span>
            )}
            {verdict && (
              <span
                className={cn(
                  "rounded-full border px-2 py-0.5 font-mono text-[10px] font-semibold tracking-wider uppercase",
                  verdict === "good"
                    ? "border-bull/40 text-bull"
                    : "border-bear/40 text-bear",
                )}
              >
                {verdictLabel ?? (verdict === "good" ? "✓" : "✕")}
              </span>
            )}
          </div>
        )}
        <svg
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label={ariaLabel}
          className="mx-auto block h-auto w-full"
          style={{ maxWidth: Math.max(width * 1.6, 220), maxHeight: 280 }}
        >
          {levels.map((lv, idx) => (
            <DiagramLevelLine
              key={`lv-${idx}`}
              level={lv}
              y={y(lv.price)}
              width={width}
            />
          ))}
          {candles.map((k, idx) => (
            <DiagramCandleShape
              key={idx}
              candle={k}
              x={PAD_X + idx * STEP_X}
              y={y}
            />
          ))}
        </svg>
      </div>
      {caption && (
        <figcaption className="text-muted-foreground mt-2 text-center text-xs leading-relaxed">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

function DiagramLevelLine({
  level,
  y,
  width,
}: {
  level: DiagramLevel;
  y: number;
  width: number;
}) {
  const color = LEVEL_COLOR[level.tone ?? "neutral"];
  return (
    <g>
      <line
        x1={4}
        x2={width - 4}
        y1={y}
        y2={y}
        stroke={color}
        strokeWidth={1}
        strokeDasharray="4 3"
        opacity={0.8}
      />
      <text
        x={width - 4}
        y={y - 3}
        textAnchor="end"
        fontSize={8}
        fontFamily="var(--font-mono)"
        fill={color}
      >
        {level.label}
      </text>
    </g>
  );
}

function DiagramCandleShape({
  candle,
  x,
  y,
}: {
  candle: DiagramCandle;
  x: number;
  y: (p: number) => number;
}) {
  const color = candleColor(candle);
  const top = y(Math.max(candle.o, candle.c));
  const bottom = y(Math.min(candle.o, candle.c));
  const bodyH = Math.max(bottom - top, MIN_BODY_PX);
  const cx = x + BODY_W / 2;
  return (
    <g opacity={candle.dim ? 0.35 : 1}>
      <line
        x1={cx}
        x2={cx}
        y1={y(candle.h)}
        y2={y(candle.l)}
        stroke={color}
        strokeWidth={1.5}
      />
      <rect x={x} y={top} width={BODY_W} height={bodyH} rx={1.5} fill={color} />
      {candle.note && (
        <DiagramText x={cx} y={y(candle.h) - 6}>
          {candle.note}
        </DiagramText>
      )}
      {candle.label && (
        <DiagramText x={cx} y={y(candle.l) + 13}>
          {candle.label}
        </DiagramText>
      )}
    </g>
  );
}

function DiagramText({
  x,
  y,
  children,
}: {
  x: number;
  y: number;
  children: ReactNode;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      fontSize={8.5}
      fontFamily="var(--font-sans)"
      fill="var(--muted-foreground)"
    >
      {children}
    </text>
  );
}

/** Lays 2–3 diagrams side by side (stacks on mobile). */
export function DiagramRow({ children }: { children: ReactNode }) {
  return (
    <div className="not-prose my-6 grid grid-cols-1 gap-4 sm:grid-cols-2 [&>figure]:my-0">
      {children}
    </div>
  );
}
