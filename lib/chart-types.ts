export interface Candle {
  i?: number;
  t?: number;
  o: number;
  h: number;
  l: number;
  c: number;
  v?: number;
}

export interface Annotation {
  type: "hline" | "zone" | "marker" | "text" | "box" | "trendline" | "fib";
  price?: number;
  from?: { i?: number; t?: number; price: number };
  to?: { i?: number; t?: number; price: number };
  p?: { i?: number; t?: number; price: number };
  i?: number;
  t?: number;
  label?: string;
  text?: string;
  color?: string;
  style?: "solid" | "dashed" | "dotted";
  position?: "aboveBar" | "belowBar" | "inBar";
  shape?: "arrowUp" | "arrowDown" | "circle";
}

/** Precomputed indicator line; values aligned to candles, null = not yet defined. */
export interface IndicatorSeries {
  label: string;
  color?: string;
  kind?: "line" | "histogram";
  style?: "solid" | "dashed" | "dotted";
  values: (number | null)[];
}

/** Sub-pane under price (RSI, MACD, ATR, volume). */
export interface IndicatorPane {
  title: string;
  series: IndicatorSeries[];
  /** Fixed y range, e.g. [0, 100] for RSI. Auto-fit when omitted. */
  range?: [number, number];
  /** Horizontal guide values, e.g. [30, 70]. */
  levels?: number[];
}

export type LocalizedField = string | { en: string; bn: string };

export interface ChartTakeaway {
  en: string;
  bn: string;
}

export interface ChartData {
  id: string;
  title: LocalizedField;
  symbol: string;
  timeframe: string;
  mode: "synthetic" | "real";
  type:
    "pattern" | "real" | "trade-setup" | "trade-review" | "concept" | "diagram";
  bias: "bullish" | "bearish" | "neutral";
  outcome?: "win" | "loss" | "breakeven" | "no-trade" | null;
  tags: string[];
  module?: string;
  lessonSlugs?: string[];
  caption?: LocalizedField;
  notes?: LocalizedField;
  explanation?: {
    en: string;
    bn: string;
  };
  keyTakeaways?: ChartTakeaway[];
  entry?: number;
  stopLoss?: number;
  takeProfit?: number;
  rr?: string;
  updatedAt?: string;
  candles: Candle[];
  annotations?: Annotation[];
  /** Line series drawn on the price pane (moving averages, bands, VWAP). */
  overlays?: IndicatorSeries[];
  pane?: IndicatorPane;
}

export function getLocalizedText(
  field: LocalizedField | undefined,
  lang: "en" | "bn" = "en",
): string {
  if (!field) return "";
  if (typeof field === "string") return field;
  return field[lang] || field.en || "";
}

/** Compact candle for list thumbnails: [open, high, low, close]. */
export type OhlcTuple = [number, number, number, number];

/**
 * Light chart record for the /charts gallery: text in one language, thumbnail
 * data only. The detail modal loads the full ChartData from /api/charts/[id].
 */
export type ChartSummary = Omit<
  ChartData,
  | "candles"
  | "annotations"
  | "explanation"
  | "keyTakeaways"
  | "overlays"
  | "pane"
> & {
  thumb: OhlcTuple[];
  /** Only the annotation kinds ChartThumbnail draws (zone, hline). */
  thumbAnnotations: Annotation[];
};
