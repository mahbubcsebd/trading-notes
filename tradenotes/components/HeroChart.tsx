import { genCandles } from "@/lib/synth";

const W = 640;
const H = 320;
const PAD_R = 52;
const PAD_T = 18;
const PAD_B = 18;
const N = 46;

export function HeroChart() {
  const d = genCandles(
    [[0, 2318], [9, 2300], [17, 2309], [30, 2382], [37, 2354], [45, 2396]],
    N,
    11,
    3.2,
    3,
  );
  const mn = Math.min(...d.map((k) => k.l));
  const mx = Math.max(...d.map((k) => k.h));
  const y = (v: number) => PAD_T + ((mx - v) / (mx - mn)) * (H - PAD_T - PAD_B);
  const x = (i: number) => 10 + (i * (W - PAD_R - 24)) / (N - 1);
  const levelY = y(d[17].c);
  const ma = d
    .map((_, i) => {
      const a = Math.max(0, i - 7);
      const slice = d.slice(a, i + 1);
      const avg = slice.reduce((s, k) => s + k.c, 0) / slice.length;
      return `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(avg).toFixed(1)}`;
    })
    .join("");
  const ticks = [0, 1, 2, 3].map((t) => mn + ((mx - mn) * t) / 3);
  const last = d[N - 1];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label="Synthetic gold candlestick chart: a dip, a rally, a pullback and a second rally above a dashed level">
      {ticks.map((v) => (
        <g key={v}>
          <line className="g-line" x1={0} x2={W - PAD_R + 8} y1={y(v)} y2={y(v)} />
          <text className="g-txt" x={W - PAD_R + 14} y={y(v) + 3}>{Math.round(v)}</text>
        </g>
      ))}
      <line className="lvl-line" x1={0} x2={W - PAD_R + 8} y1={levelY} y2={levelY} />
      <path className="ma" d={ma} />
      {d.map((k, i) => {
        const up = k.c >= k.o;
        const cls = up ? "c-up" : "c-dn";
        const cx = x(i);
        const top = y(Math.max(k.o, k.c));
        const bh = Math.max(2, Math.abs(y(k.o) - y(k.c)));
        return (
          <g key={i}>
            <line className={cls} strokeWidth={1.4} x1={cx} x2={cx} y1={y(k.h)} y2={y(k.l)} />
            <rect className={cls} x={cx - 3.5} y={top} width={7} height={bh} rx={1} />
          </g>
        );
      })}
      <circle cx={x(N - 1)} cy={y(last.c)} r={4} fill="none" stroke="var(--gold)" strokeWidth={1.5} />
    </svg>
  );
}
