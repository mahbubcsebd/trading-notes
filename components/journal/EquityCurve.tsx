import { fmtR } from "@/lib/journal/core";

interface EquityCurveProps {
  points: { date: string; cum: number }[];
  emptyLabel: string;
}

const W = 720;
const H = 220;
const PAD = { l: 44, r: 12, t: 14, b: 24 };

export function EquityCurve({ points, emptyLabel }: EquityCurveProps) {
  if (points.length < 2) {
    return (
      <div className="border-line text-mute grid h-48 place-items-center rounded-xl border border-dashed text-sm">
        {emptyLabel}
      </div>
    );
  }
  const vals = [0, ...points.map((p) => p.cum)];
  const min = Math.min(...vals);
  const max = Math.max(...vals);
  const span = max - min || 1;
  const x = (i: number) =>
    PAD.l + (i / (points.length - 1)) * (W - PAD.l - PAD.r);
  const y = (v: number) => PAD.t + (1 - (v - min) / span) * (H - PAD.t - PAD.b);
  const d = points
    .map((p, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(p.cum).toFixed(1)}`)
    .join(" ");
  const area = `${d} L${x(points.length - 1)},${y(0)} L${x(0)},${y(0)} Z`;
  const last = points[points.length - 1].cum;
  const tone = last >= 0 ? "var(--up)" : "var(--down)";
  const ticks = [min, (min + max) / 2, max];

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full"
      role="img"
      aria-label={`Equity curve, ending at ${fmtR(last)}`}
    >
      {ticks.map((t) => (
        <g key={t}>
          <line
            className="g-line"
            x1={PAD.l}
            x2={W - PAD.r}
            y1={y(t)}
            y2={y(t)}
          />
          <text className="g-txt" x={PAD.l - 6} y={y(t) + 3} textAnchor="end">
            {t.toFixed(1)}R
          </text>
        </g>
      ))}
      <line
        x1={PAD.l}
        x2={W - PAD.r}
        y1={y(0)}
        y2={y(0)}
        stroke="var(--mute)"
        strokeDasharray="4 4"
      />
      <path d={area} fill={tone} opacity="0.12" />
      <path
        d={d}
        fill="none"
        stroke={tone}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <text className="g-txt" x={PAD.l} y={H - 6}>
        {points[0].date}
      </text>
      <text className="g-txt" x={W - PAD.r} y={H - 6} textAnchor="end">
        {points[points.length - 1].date}
      </text>
    </svg>
  );
}
