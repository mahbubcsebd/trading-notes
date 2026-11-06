import { fmtR } from "@/lib/journal";

export function EquityCurve({ points }: { points: { date: string; cum: number }[] }) {
  if (points.length < 2) {
    return <div className="grid h-48 place-items-center rounded-xl border border-dashed border-line text-sm text-mute">Log at least two closed trades to see your curve.</div>;
  }
  const W = 720, H = 220, L = 44, R = 12, T = 14, B = 24;
  const vals = [0, ...points.map((p) => p.cum)];
  const min = Math.min(...vals), max = Math.max(...vals);
  const span = max - min || 1;
  const x = (i: number) => L + (i / (points.length - 1)) * (W - L - R);
  const y = (v: number) => T + (1 - (v - min) / span) * (H - T - B);
  const d = points.map((p, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(p.cum).toFixed(1)}`).join(" ");
  const area = `${d} L${x(points.length - 1)},${y(0)} L${x(0)},${y(0)} Z`;
  const last = points[points.length - 1].cum;
  const ticks = [min, (min + max) / 2, max];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={`Equity curve, ending at ${fmtR(last)}`}>
      {ticks.map((t) => (
        <g key={t}>
          <line className="g-line" x1={L} x2={W - R} y1={y(t)} y2={y(t)} />
          <text className="g-txt" x={L - 6} y={y(t) + 3} textAnchor="end">{t.toFixed(1)}R</text>
        </g>
      ))}
      <line x1={L} x2={W - R} y1={y(0)} y2={y(0)} stroke="var(--mute)" strokeDasharray="4 4" />
      <path d={area} fill={last >= 0 ? "var(--up)" : "var(--down)"} opacity="0.12" />
      <path d={d} fill="none" stroke={last >= 0 ? "var(--up)" : "var(--down)"} strokeWidth="2" strokeLinejoin="round" />
      <text className="g-txt" x={L} y={H - 6}>{points[0].date}</text>
      <text className="g-txt" x={W - R} y={H - 6} textAnchor="end">{points[points.length - 1].date}</text>
    </svg>
  );
}
