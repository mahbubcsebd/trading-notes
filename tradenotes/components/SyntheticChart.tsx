import type { ChartExample } from "@/lib/charts";
import { genCandles } from "@/lib/synth";

const W = 720;
const H = 360;
const PAD_L = 14;
const PAD_R = 16;
const PAD_T = 24;
const PAD_B = 20;
const N = 60;

export function SyntheticChart({ chart }: { chart: ChartExample }) {
  const d = genCandles(chart.waypoints, N, chart.seed, 1.3, 1.6);
  const prices = [
    ...d.flatMap((k) => [k.h, k.l]),
    ...(chart.levels ?? []).map((l) => l.price),
    ...(chart.marks ?? []).map((m) => m.price),
    ...(chart.zone ? [chart.zone.low, chart.zone.high] : []),
  ];
  const mn = Math.min(...prices) - 3;
  const mx = Math.max(...prices) + 3;
  const y = (v: number) => PAD_T + ((mx - v) / (mx - mn)) * (H - PAD_T - PAD_B);
  const x = (i: number) => PAD_L + (i * (W - PAD_L - PAD_R)) / (N - 1);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label={`${chart.title}. ${chart.blurb}`}>
      {chart.zone && (
        <g>
          <rect
            x={x(chart.zone.from)}
            y={y(chart.zone.high)}
            width={x(chart.zone.to) - x(chart.zone.from)}
            height={y(chart.zone.low) - y(chart.zone.high)}
            fill="var(--gold)"
            fillOpacity={0.12}
            stroke="var(--gold)"
            strokeOpacity={0.5}
            strokeDasharray="4 4"
          />
          <text className="f-tg" x={x(chart.zone.from) + 6} y={y(chart.zone.high) - 6}>{chart.zone.label}</text>
        </g>
      )}
      {(chart.levels ?? []).map((l) => (
        <g key={l.label}>
          <line className="lvl-line" x1={PAD_L} x2={W - PAD_R} y1={y(l.price)} y2={y(l.price)} />
          <text className="f-tg" x={W - PAD_R} y={y(l.price) - 6} textAnchor="end">{l.label}</text>
        </g>
      ))}
      {d.map((k, i) => {
        const up = k.c >= k.o;
        const cls = up ? "c-up" : "c-dn";
        const cx = x(i);
        const top = y(Math.max(k.o, k.c));
        const bh = Math.max(2, Math.abs(y(k.o) - y(k.c)));
        return (
          <g key={i}>
            <line className={cls} strokeWidth={1.3} x1={cx} x2={cx} y1={y(k.h)} y2={y(k.l)} />
            <rect className={cls} x={cx - 3.2} y={top} width={6.4} height={bh} rx={1} />
          </g>
        );
      })}
      {(chart.marks ?? []).map((m) => (
        <g key={m.label + m.i}>
          <circle cx={x(m.i)} cy={y(m.price)} r={3.5} fill="var(--gold)" />
          <text className="f-tg" x={x(m.i)} y={y(m.price) - 10} textAnchor="middle">{m.label}</text>
        </g>
      ))}
    </svg>
  );
}
