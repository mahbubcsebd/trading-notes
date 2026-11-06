import type { FigureId } from "@/lib/types";

function Pips() {
  return (
    <svg viewBox="0 0 560 160" className="block h-auto w-full" role="img" aria-label="EURUSD rises from 1.0850 to 1.0900, a move of 50 pips">
      <line className="f-dash" x1="40" y1="112" x2="420" y2="112" />
      <line className="f-dash" x1="360" y1="40" x2="420" y2="40" />
      <polyline className="f-line" points="40,112 90,100 130,108 180,82 220,90 270,58 310,64 360,40" />
      <path className="f-br" d="M420 40H430V112H420" />
      <circle cx="40" cy="112" r="4" fill="var(--gold)" />
      <circle cx="360" cy="40" r="4" fill="var(--up)" />
      <text className="f-t" x="40" y="136">Buy EURUSD at 1.0850</text>
      <text className="f-t" x="170" y="28">Price reaches 1.0900</text>
      <text className="f-tg" x="442" y="72">50 pips</text>
      <text className="f-t" x="442" y="90">0.0050</text>
    </svg>
  );
}

function Sessions() {
  const X0 = 96;
  const unit = 480 / 24;
  const px = (h: number) => X0 + h * unit;
  const rows: { name: string; ranges: [number, number][] }[] = [
    { name: "Sydney", ranges: [[21, 24], [0, 6]] },
    { name: "Tokyo", ranges: [[0, 9]] },
    { name: "London", ranges: [[8, 17]] },
    { name: "New York", ranges: [[13, 22]] },
  ];
  return (
    <svg viewBox="0 0 600 230" className="block h-auto w-full" role="img" aria-label="Approximate forex session hours in UTC with the London and New York overlap from 13:00 to 17:00">
      <rect x={px(13)} y={22} width={px(17) - px(13)} height={150} fill="var(--gold)" fillOpacity={0.14} />
      {[0, 3, 6, 9, 12, 15, 18, 21, 24].map((h) => (
        <g key={h}>
          <line className="g-line" x1={px(h)} x2={px(h)} y1={22} y2={172} />
          <text className="g-txt" x={px(h)} y={190} textAnchor="middle">{String(h % 24).padStart(2, "0")}</text>
        </g>
      ))}
      {rows.map((r, i) => (
        <g key={r.name}>
          <text className="f-t" x={0} y={50 + i * 36 + 4}>{r.name}</text>
          {r.ranges.map(([a, b], k) => (
            <rect key={k} x={px(a)} y={38 + i * 36} width={px(b) - px(a)} height={20} rx={4} fill="var(--fg-2)" fillOpacity={0.35} />
          ))}
        </g>
      ))}
      <text className="f-tg" x={(px(13) + px(17)) / 2} y={14} textAnchor="middle">Overlap</text>
      <text className="g-txt" x={X0} y={214}>Hours in UTC</text>
    </svg>
  );
}

function Anatomy() {
  const high = 30, open1 = 106, close1 = 56, low = 138;
  const labelX = (cx: number) => cx + 40;
  return (
    <svg viewBox="0 0 560 160" className="block h-auto w-full" role="img" aria-label="Anatomy of a bullish and a bearish candle showing open, high, low and close">
      <text className="f-tg" x={120} y={14} textAnchor="middle">Bullish</text>
      <text className="f-tg" x={400} y={14} textAnchor="middle">Bearish</text>
      <line className="c-up" strokeWidth={2} x1={120} x2={120} y1={high} y2={low} />
      <rect className="c-up" x={100} y={close1} width={40} height={open1 - close1} rx={2} />
      <line className="c-dn" strokeWidth={2} x1={400} x2={400} y1={high} y2={low} />
      <rect className="c-dn" x={380} y={close1} width={40} height={open1 - close1} rx={2} />
      {[
        [120, high, "High"], [120, close1, "Close"], [120, open1, "Open"], [120, low, "Low"],
        [400, high, "High"], [400, close1, "Open"], [400, open1, "Close"], [400, low, "Low"],
      ].map(([cx, yy, t], i) => (
        <g key={i}>
          <line className="f-dash" x1={Number(cx) + 22} x2={labelX(Number(cx)) + 2} y1={Number(yy)} y2={Number(yy)} />
          <text className="f-t" x={labelX(Number(cx)) + 8} y={Number(yy) + 4}>{String(t)}</text>
        </g>
      ))}
    </svg>
  );
}

export function Figure({ id, caption }: { id: FigureId; caption?: string }) {
  return (
    <figure className="my-7 rounded-2xl border border-line bg-surface p-4">
      {id === "pips" && <Pips />}
      {id === "sessions" && <Sessions />}
      {id === "anatomy" && <Anatomy />}
      {caption && <figcaption className="mt-2.5 font-mono text-xs leading-relaxed text-mute">{caption}</figcaption>}
    </figure>
  );
}
