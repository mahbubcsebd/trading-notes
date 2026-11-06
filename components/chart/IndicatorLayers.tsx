import type { IndicatorPane, IndicatorSeries } from "@/lib/chart-types";

const DEFAULT_COLORS = ["#38bdf8", "#f59e0b", "#a78bfa", "#f472b6"];
const DASH: Record<string, string | undefined> = {
  dashed: "4 3",
  dotted: "2 2",
  solid: undefined,
};

function seriesColor(s: IndicatorSeries, idx: number) {
  return s.color || DEFAULT_COLORS[idx % DEFAULT_COLORS.length];
}

function buildPath(
  values: (number | null)[],
  count: number,
  xOf: (i: number) => number,
  yOf: (v: number) => number,
) {
  let d = "";
  let pen = false;
  for (let i = 0; i < Math.min(values.length, count); i++) {
    const v = values[i];
    if (v === null || v === undefined || Number.isNaN(v)) {
      pen = false;
      continue;
    }
    d += `${pen ? "L" : "M"}${xOf(i).toFixed(1)},${yOf(v).toFixed(1)} `;
    pen = true;
  }
  return d;
}

interface OverlayProps {
  overlays: IndicatorSeries[];
  count: number;
  xOf: (i: number) => number;
  yOf: (v: number) => number;
}

/** Lines on the price pane. */
export function OverlayLines({ overlays, count, xOf, yOf }: OverlayProps) {
  return (
    <g className="pointer-events-none">
      {overlays.map((s, idx) => (
        <path
          key={`ov-${idx}`}
          d={buildPath(s.values, count, xOf, yOf)}
          fill="none"
          stroke={seriesColor(s, idx)}
          strokeWidth="1.6"
          strokeDasharray={DASH[s.style ?? "solid"]}
          strokeLinejoin="round"
        />
      ))}
    </g>
  );
}

/** Legend row of overlay + pane series, drawn top-left inside the price pane. */
export function IndicatorLegend({
  items,
}: {
  items: { label: string; color: string }[];
}) {
  if (items.length === 0) return null;
  return (
    <g className="pointer-events-none">
      {items.map((it, idx) => (
        <g key={it.label} transform={`translate(${8 + idx * 96}, 14)`}>
          <line
            x1="0"
            y1="-3"
            x2="12"
            y2="-3"
            stroke={it.color}
            strokeWidth="2"
          />
          <text
            x="16"
            y="0"
            fill={it.color}
            className="font-mono text-[10px] font-semibold"
          >
            {it.label}
          </text>
        </g>
      ))}
    </g>
  );
}

interface PaneProps {
  pane: IndicatorPane;
  count: number;
  top: number;
  height: number;
  plotWidth: number;
  axisWidth: number;
  xOf: (i: number) => number;
  barWidth: number;
}

/** Sub-pane (RSI / MACD / ATR) stacked under price. */
export function IndicatorPaneLayer({
  pane,
  count,
  top,
  height,
  plotWidth,
  axisWidth,
  xOf,
  barWidth,
}: PaneProps) {
  const inner = height - 24;
  const innerTop = top + 20;

  let min = pane.range?.[0] ?? Infinity;
  let max = pane.range?.[1] ?? -Infinity;
  if (!pane.range) {
    for (const s of pane.series) {
      for (const v of s.values.slice(0, count)) {
        if (v === null || v === undefined || Number.isNaN(v)) continue;
        if (v < min) min = v;
        if (v > max) max = v;
      }
    }
    if (pane.series.some((s) => s.kind === "histogram")) {
      min = Math.min(min, 0);
      max = Math.max(max, 0);
    }
    if (!Number.isFinite(min) || !Number.isFinite(max) || min === max) {
      min = 0;
      max = 1;
    }
    const pad = (max - min) * 0.1;
    min -= pad;
    max += pad;
  }
  const yOf = (v: number) =>
    innerTop + inner - ((v - min) / (max - min)) * inner;
  const guides = [...(pane.levels ?? [])];
  const zeroY = min < 0 && max > 0 ? yOf(0) : null;

  return (
    <g>
      <rect
        x="0"
        y={top}
        width={plotWidth + axisWidth}
        height={height}
        fill="rgba(255,255,255,0.025)"
      />
      <line
        x1="0"
        y1={top}
        x2={plotWidth + axisWidth}
        y2={top}
        stroke="rgba(255,255,255,0.14)"
      />
      <text
        x="8"
        y={top + 14}
        className="font-mono text-[10px] font-bold"
        fill="#94a3b8"
      >
        {pane.title}
      </text>
      {pane.series.map((s, idx) => (
        <g
          key={`pl-${idx}`}
          transform={`translate(${8 + idx * 90 + pane.title.length * 6.5 + 12}, ${top + 14})`}
        >
          <line
            x1="0"
            y1="-3"
            x2="10"
            y2="-3"
            stroke={seriesColor(s, idx)}
            strokeWidth="2"
          />
          <text
            x="14"
            y="0"
            fill={seriesColor(s, idx)}
            className="font-mono text-[9px]"
          >
            {s.label}
          </text>
        </g>
      ))}
      {guides.map((g) => (
        <g key={`g-${g}`}>
          <line
            x1="0"
            y1={yOf(g)}
            x2={plotWidth}
            y2={yOf(g)}
            stroke="rgba(255,255,255,0.22)"
            strokeDasharray="3 3"
          />
          <text
            x={plotWidth + 8}
            y={yOf(g) + 3}
            fill="#94a3b8"
            className="font-mono text-[10px]"
          >
            {g}
          </text>
        </g>
      ))}
      {zeroY !== null && (
        <line
          x1="0"
          y1={zeroY}
          x2={plotWidth}
          y2={zeroY}
          stroke="rgba(255,255,255,0.22)"
        />
      )}
      {pane.series.map((s, idx) => {
        const color = seriesColor(s, idx);
        if (s.kind === "histogram") {
          const base = yOf(zeroY !== null ? 0 : min);
          return (
            <g key={`ps-${idx}`}>
              {s.values.slice(0, count).map((v, i) => {
                if (v === null || v === undefined || Number.isNaN(v))
                  return null;
                const y = yOf(v);
                return (
                  <rect
                    key={i}
                    x={xOf(i) - barWidth / 2}
                    y={Math.min(y, base)}
                    width={barWidth}
                    height={Math.max(1, Math.abs(base - y))}
                    fill={s.color ?? (v >= 0 ? "#22c55e" : "#ef4444")}
                    fillOpacity="0.65"
                  />
                );
              })}
            </g>
          );
        }
        return (
          <path
            key={`ps-${idx}`}
            d={buildPath(s.values, count, xOf, yOf)}
            fill="none"
            stroke={color}
            strokeWidth="1.5"
            strokeDasharray={DASH[s.style ?? "solid"]}
            strokeLinejoin="round"
          />
        );
      })}
    </g>
  );
}
