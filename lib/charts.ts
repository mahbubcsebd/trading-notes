import fs from 'fs';
import path from 'path';
import { ChartData } from './chart-types';

export * from './chart-types';

export function getAllCharts(): ChartData[] {
  const chartsDir = path.join(process.cwd(), 'content', 'charts');
  if (!fs.existsSync(chartsDir)) return [];

  const fileNames = fs.readdirSync(chartsDir).filter((f) => f.endsWith('.json'));

  const charts: ChartData[] = fileNames.map((fileName) => {
    const fullPath = path.join(chartsDir, fileName);
    const content = fs.readFileSync(fullPath, 'utf8');
    const data = JSON.parse(content);
    return {
      id: data.id || fileName.replace(/\.json$/, ''),
      title: data.title || fileName,
      symbol: data.symbol || 'XAUUSD',
      timeframe: data.timeframe || 'H4',
      mode: data.mode || 'synthetic',
      type: data.type || 'pattern',
      bias: data.bias || 'neutral',
      outcome: data.outcome ?? null,
      tags: Array.isArray(data.tags) ? data.tags : [],
      module: data.module || '',
      lessonSlugs: Array.isArray(data.lessonSlugs) ? data.lessonSlugs : [],
      caption: data.caption || '',
      notes: data.notes || '',
      explanation: data.explanation || undefined,
      keyTakeaways: Array.isArray(data.keyTakeaways) ? data.keyTakeaways : undefined,
      entry: data.entry !== undefined ? data.entry : undefined,
      stopLoss: data.stopLoss !== undefined ? data.stopLoss : undefined,
      takeProfit: data.takeProfit !== undefined ? data.takeProfit : undefined,
      rr: data.rr || undefined,
      updatedAt: data.updatedAt || '2026-10-10T00:00:00Z',
      candles: Array.isArray(data.candles) ? data.candles : [],
      annotations: Array.isArray(data.annotations) ? data.annotations : [],
    };
  });

  return charts.sort((a, b) => (b.updatedAt || '').localeCompare(a.updatedAt || ''));
}

export function getChartById(id: string): ChartData | null {
  const charts = getAllCharts();
  return charts.find((c) => c.id === id) || null;
}
