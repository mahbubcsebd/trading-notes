import fs from "fs";
import path from "path";
import {
  ChartData,
  ChartSummary,
  getLocalizedText,
} from "./chart-types";

export * from "./chart-types";

// Chart JSON is static at build time: cache it in production so pages that look up
// many charts (pattern index, MDX <Chart>, studio) do not re-read ~250 files per call.
// In dev we always re-read so edited chart files show up without a restart.
const SHOULD_CACHE = process.env.NODE_ENV === "production";
let cachedCharts: ChartData[] | null = null;
let cachedById: Map<string, ChartData> | null = null;

export function getAllCharts(): ChartData[] {
  if (SHOULD_CACHE && cachedCharts) return cachedCharts;
  const charts = readAllCharts();
  if (SHOULD_CACHE) {
    cachedCharts = charts;
    cachedById = new Map(charts.map((c) => [c.id, c]));
  }
  return charts;
}

function readAllCharts(): ChartData[] {
  const chartsDir = path.join(process.cwd(), "content", "charts");
  if (!fs.existsSync(chartsDir)) return [];

  const fileNames = fs
    .readdirSync(chartsDir)
    .filter((f) => f.endsWith(".json"));

  const charts: ChartData[] = fileNames.map((fileName) => {
    const fullPath = path.join(chartsDir, fileName);
    const content = fs.readFileSync(fullPath, "utf8");
    const data = JSON.parse(content);
    return {
      id: data.id || fileName.replace(/\.json$/, ""),
      title: data.title || fileName,
      symbol: data.symbol || "XAUUSD",
      timeframe: data.timeframe || "H4",
      mode: data.mode || "synthetic",
      type: data.type || "pattern",
      bias: data.bias || "neutral",
      outcome: data.outcome ?? null,
      tags: Array.isArray(data.tags) ? data.tags : [],
      module: data.module || "",
      lessonSlugs: Array.isArray(data.lessonSlugs) ? data.lessonSlugs : [],
      caption: data.caption || "",
      notes: data.notes || "",
      explanation: data.explanation || undefined,
      keyTakeaways: Array.isArray(data.keyTakeaways)
        ? data.keyTakeaways
        : undefined,
      entry: data.entry !== undefined ? data.entry : undefined,
      stopLoss: data.stopLoss !== undefined ? data.stopLoss : undefined,
      takeProfit: data.takeProfit !== undefined ? data.takeProfit : undefined,
      rr: data.rr || undefined,
      updatedAt: data.updatedAt || "2026-10-10T00:00:00Z",
      candles: Array.isArray(data.candles) ? data.candles : [],
      annotations: Array.isArray(data.annotations) ? data.annotations : [],
      overlays: Array.isArray(data.overlays) ? data.overlays : undefined,
      pane: data.pane || undefined,
    };
  });

  return charts.sort((a, b) =>
    (b.updatedAt || "").localeCompare(a.updatedAt || ""),
  );
}

export function getChartById(id: string): ChartData | null {
  const charts = getAllCharts();
  if (cachedById) return cachedById.get(id) ?? null;
  return charts.find((c) => c.id === id) || null;
}

const THUMB_ANNOTATION_TYPES = new Set(["zone", "hline"]);

/** Gallery record: drops detail-only fields and the other language's text. */
export function toChartSummary(
  chart: ChartData,
  lang: "en" | "bn",
): ChartSummary {
  const {
    candles,
    annotations = [],
    explanation: _explanation,
    keyTakeaways: _keyTakeaways,
    overlays: _overlays,
    pane: _pane,
    ...meta
  } = chart;
  return {
    ...meta,
    title: getLocalizedText(chart.title, lang),
    caption: getLocalizedText(chart.caption, lang),
    notes: getLocalizedText(chart.notes, lang),
    thumb: candles.map((c) => [c.o, c.h, c.l, c.c]),
    thumbAnnotations: annotations.filter((a) =>
      THUMB_ANNOTATION_TYPES.has(a.type),
    ),
  };
}
