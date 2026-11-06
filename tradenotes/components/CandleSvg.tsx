import type { Candle } from "@/lib/patterns";

export function CandleSvg({ candles, label, className = "" }: { candles: Candle[]; label: string; className?: string }) {
  const gap = 46;
  const w = candles.length * gap + 16;
  const y = (p: number) => 8 + (100 - p) * 0.84;
  return (
    <svg viewBox={`0 0 ${w} 100`} className={className} role="img" aria-label={label}>
      {candles.map((c, i) => {
        const cx = 8 + gap / 2 + i * gap;
        const up = c.c >= c.o;
        const cls = up ? "c-up" : "c-dn";
        const top = y(Math.max(c.o, c.c));
        const bh = Math.max(2, Math.abs(y(c.o) - y(c.c)));
        return (
          <g key={i}>
            <line className={cls} strokeWidth={2} x1={cx} x2={cx} y1={y(c.h)} y2={y(c.l)} />
            <rect className={cls} x={cx - 9} y={top} width={18} height={bh} rx={1.5} />
          </g>
        );
      })}
    </svg>
  );
}
