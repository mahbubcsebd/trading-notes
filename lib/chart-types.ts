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
  type: 'hline' | 'zone' | 'marker' | 'text' | 'box' | 'trendline' | 'fib';
  price?: number;
  from?: { i?: number; t?: number; price: number };
  to?: { i?: number; t?: number; price: number };
  p?: { i?: number; t?: number; price: number };
  i?: number;
  t?: number;
  label?: string;
  text?: string;
  color?: string;
  style?: 'solid' | 'dashed' | 'dotted';
  position?: 'aboveBar' | 'belowBar' | 'inBar';
  shape?: 'arrowUp' | 'arrowDown' | 'circle';
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
  mode: 'synthetic' | 'real';
  type: 'pattern' | 'real' | 'trade-setup' | 'trade-review' | 'concept' | 'diagram';
  bias: 'bullish' | 'bearish' | 'neutral';
  outcome?: 'win' | 'loss' | 'breakeven' | 'no-trade' | null;
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
}

export function getLocalizedText(field: LocalizedField | undefined, lang: 'en' | 'bn' = 'en'): string {
  if (!field) return '';
  if (typeof field === 'string') return field;
  return field[lang] || field.en || '';
}
