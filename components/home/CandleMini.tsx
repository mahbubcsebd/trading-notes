/** Decorative candle glyphs for the pattern tile (engulfing / doji / hammer). Single-colour on gold. */
const GLYPHS = [
  { x: 20, wick: [20, 110], body: [40, 90], label: "Engulfing" },
  { x: 52, wick: [10, 120], body: [25, 105], label: "" },
  { x: 110, wick: [30, 100], body: [64, 66], label: "Doji" },
  { x: 168, wick: [40, 120], body: [42, 62], label: "Hammer" },
] as const;

export function CandleMini() {
  return (
    <svg
      viewBox="0 0 200 130"
      aria-hidden="true"
      className="mt-auto h-auto w-full max-w-[22rem] transition-transform duration-500 group-hover:-translate-y-1"
    >
      {GLYPHS.map((g) => (
        <g key={g.x} fill="currentColor" stroke="currentColor">
          <line
            x1={g.x + 10}
            x2={g.x + 10}
            y1={g.wick[0]}
            y2={g.wick[1]}
            strokeWidth="2"
          />
          <rect
            x={g.x}
            y={g.body[0]}
            width="20"
            height={Math.max(g.body[1] - g.body[0], 2)}
            rx="3"
          />
        </g>
      ))}
    </svg>
  );
}
