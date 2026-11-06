/**
 * Decorative hero chart. Candles are generated from a fixed formula
 * (synthetic, not market data) and labelled as such in the UI.
 */
const CANDLE_COUNT = 30;
const VIEW_W = 560;
const VIEW_H = 280;
const PAD_Y = 24;
const MA_PERIOD = 5;
const TONE = {
  bull: { stroke: "stroke-bull", fill: "fill-bull" },
  bear: { stroke: "stroke-bear", fill: "fill-bear" },
} as const;

interface Candle {
  o: number;
  h: number;
  l: number;
  c: number;
}

function buildCandles(): Candle[] {
  return Array.from({ length: CANDLE_COUNT }, (_, i) => {
    const close = (k: number) => 50 + k * 1.15 + 7 * Math.sin(k / 2.2);
    const o = i === 0 ? 48 : close(i - 1);
    const c = close(i);
    const wick = 1 + ((i * 7) % 5) * 0.6;
    return { o, c, h: Math.max(o, c) + wick, l: Math.min(o, c) - wick * 0.8 };
  });
}

function movingAverage(values: number[], period: number): (number | null)[] {
  return values.map((_, i) =>
    i < period - 1
      ? null
      : values.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0) / period,
  );
}

export function HeroChart({ label }: { label: string }) {
  const candles = buildCandles();
  const max = Math.max(...candles.map((k) => k.h));
  const min = Math.min(...candles.map((k) => k.l));
  const y = (v: number) =>
    PAD_Y + ((max - v) / (max - min)) * (VIEW_H - PAD_Y * 2);
  const step = VIEW_W / CANDLE_COUNT;
  const x = (i: number) => i * step + step / 2;
  const bodyW = step * 0.56;

  const ma = movingAverage(
    candles.map((k) => k.c),
    MA_PERIOD,
  );
  const maPath = ma
    .map((v, i) =>
      v === null ? null : `${x(i).toFixed(1)},${y(v).toFixed(1)}`,
    )
    .filter(Boolean)
    .join(" ");
  const levelY = y(candles[11].h);
  const last = candles[CANDLE_COUNT - 1];

  return (
    <figure className="border-line bg-surface relative overflow-hidden rounded-2xl border">
      <figcaption className="text-mute flex flex-wrap justify-between gap-3 px-4 pt-3.5 pb-2.5 font-mono text-[11px] font-medium">
        <b className="text-gold font-medium">XAUUSD · H1</b>
        <span>{label}</span>
      </figcaption>

      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        className="block h-auto w-full"
        role="img"
        aria-label={label}
      >
        {[0.25, 0.5, 0.75].map((f) => (
          <line
            key={f}
            x1="0"
            x2={VIEW_W}
            y1={VIEW_H * f}
            y2={VIEW_H * f}
            className="stroke-border"
            strokeDasharray="2 6"
          />
        ))}
        <line
          x1={x(11)}
          x2={VIEW_W}
          y1={levelY}
          y2={levelY}
          className="stroke-gold"
          strokeDasharray="5 5"
          strokeWidth="1"
        />
        {candles.map((k, i) => {
          const isBull = k.c >= k.o;
          const tone = isBull ? TONE.bull : TONE.bear;
          const top = y(Math.max(k.o, k.c));
          const height = Math.max(Math.abs(y(k.o) - y(k.c)), 1.5);
          return (
            <g
              key={i}
              className="hero-candle"
              style={{ animationDelay: `${i * 28}ms` }}
            >
              <line
                x1={x(i)}
                x2={x(i)}
                y1={y(k.h)}
                y2={y(k.l)}
                className={tone.stroke}
                strokeWidth="1.2"
              />
              <rect
                x={x(i) - bodyW / 2}
                y={top}
                width={bodyW}
                height={height}
                rx="1.5"
                className={tone.fill}
              />
            </g>
          );
        })}
        <polyline
          points={maPath}
          fill="none"
          className="stroke-foreground/40"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <circle
          cx={x(CANDLE_COUNT - 1)}
          cy={y(last.c)}
          r="3.5"
          className="fill-gold"
        />
        <circle
          cx={x(CANDLE_COUNT - 1)}
          cy={y(last.c)}
          r="3.5"
          className="fill-gold hero-ping"
        />
      </svg>
    </figure>
  );
}
