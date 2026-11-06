export type Localized = {
  en: string;
  bn: string;
};

export interface DynamicCandle {
  open: number;
  high: number;
  low: number;
  close: number;
  color?: 'bull' | 'bear' | 'neutral';
  label?: string; // e.g. "1st", "2nd", "Bullish", "Bearish"
  topAnnotation?: string; // e.g. "Closing = High", "High"
  bottomAnnotation?: string; // e.g. "Opening = Low", "Low"
  bodyAnnotation?: string; // e.g. "Real Body"
}

export interface DynamicArrow {
  candleIndex: number;
  direction: 'up' | 'down';
  label?: string;
  color?: string;
}

export interface DynamicGuideLine {
  yValue: number; // 0 to 100 relative price level
  label: string;
  style?: 'dashed' | 'solid';
  color?: string;
}

export interface SlideCandlePattern {
  id: string;
  slideNumber: string;
  title: Localized;
  category: 'structure' | 'multi-candle';
  type: 'bullish' | 'bearish' | 'neutral' | 'reversal';
  badge: Localized;
  condition: Localized[];
  meaning: Localized[];
  significance: Localized[];
  bodyRule?: Localized[];
  psychology: Localized;
  actionTip: Localized;
  candles: DynamicCandle[];
  arrows?: DynamicArrow[];
  guideLines?: DynamicGuideLine[];
  contextTrend?: 'downtrend' | 'uptrend' | 'indecision';
  miniChartCandles?: { open: number; high: number; low: number; close: number }[];
  deepLinkId?: string;
}
