import type { Candle } from "./patterns";

function rng(seed: number) {
  let s = seed | 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Deterministic synthetic candles that follow a path through the given waypoints. */
export function genCandles(
  waypoints: [number, number][],
  n: number,
  seed: number,
  noise: number,
  wick: number,
): Candle[] {
  const r = rng(seed);
  const at = (i: number) => {
    for (let k = 0; k < waypoints.length - 1; k++) {
      const [x0, y0] = waypoints[k];
      const [x1, y1] = waypoints[k + 1];
      if (i >= x0 && i <= x1) return y0 + ((y1 - y0) * (i - x0)) / (x1 - x0 || 1);
    }
    return waypoints[waypoints.length - 1][1];
  };
  const out: Candle[] = [];
  let prev = at(0);
  for (let i = 0; i < n; i++) {
    const close = i === n - 1 ? at(i) : at(i) + (r() - 0.5) * noise * 2;
    const open = prev;
    const h = Math.max(open, close) + r() * wick;
    const l = Math.min(open, close) - r() * wick;
    out.push({ o: open, h, l, c: close });
    prev = close;
  }
  return out;
}
