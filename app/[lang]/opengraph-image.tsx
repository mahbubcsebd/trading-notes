import { ImageResponse } from "next/og";
import { OG_IMAGE_SIZE, SITE_NAME } from "@/lib/seo";

export const alt = `${SITE_NAME} — Forex & Gold trading course`;
export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

// Brand colors mirror the dark theme tokens in app/globals.css (--bg, --surface, --line, --fg, --fg-2, --gold).
const COLORS = {
  bg: "#0c1120",
  surface: "#141c31",
  line: "#243049",
  fg: "#efeadd",
  fg2: "#b9b4a7",
  gold: "#d9b77e",
  up: "#3fb68b",
  down: "#e5626a",
};

// Decorative candles: [open, high, low, close] in px from the top of the chart area.
const CANDLES: [number, number, number, number][] = [
  [210, 190, 250, 230],
  [230, 200, 260, 205],
  [205, 160, 215, 170],
  [170, 150, 200, 190],
  [190, 120, 195, 130],
  [130, 90, 145, 100],
  [100, 60, 120, 75],
];

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: COLORS.bg,
        color: COLORS.fg,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 14,
            background: COLORS.gold,
            color: COLORS.bg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 40,
          }}
        >
          T
        </div>
        <div style={{ display: "flex", fontSize: 36 }}>
          Trade<span style={{ color: COLORS.gold }}>Notes</span>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "flex-end", gap: 48 }}>
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div style={{ fontSize: 68, lineHeight: 1.1, letterSpacing: -1 }}>
            Learn Forex & Gold trading,
          </div>
          <div style={{ fontSize: 68, lineHeight: 1.1, color: COLORS.gold }}>
            step by step.
          </div>
          <div style={{ fontSize: 28, color: COLORS.fg2, marginTop: 24 }}>
            Trading course · candlestick patterns · Bangla & English
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 14,
            height: 280,
            padding: 20,
            border: `2px solid ${COLORS.line}`,
            borderRadius: 24,
            background: COLORS.surface,
          }}
        >
          {CANDLES.map(([o, h, l, c], i) => {
            const color = c < o ? COLORS.up : COLORS.down;
            return (
              <div
                key={i}
                style={{
                  position: "relative",
                  width: 22,
                  height: 240,
                  display: "flex",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    left: 10,
                    top: h - 40,
                    width: 2,
                    height: l - h,
                    background: color,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: Math.min(o, c) - 40,
                    width: 22,
                    height: Math.max(4, Math.abs(c - o)),
                    background: color,
                    borderRadius: 3,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>,
    size,
  );
}
