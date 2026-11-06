import { getChartById } from "@/lib/charts";
import { CandleChart } from "./CandleChart";

interface ChartBlockProps {
  id: string;
  height?: number;
  caption?: string;
}

const DEFAULT_HEIGHT = 420;

/**
 * MDX <Chart>: reads chart JSON on the server so the SVG chart is in the
 * initial HTML (no client fetch, no loading placeholder, no layout shift).
 */
export function ChartBlock({
  id,
  height = DEFAULT_HEIGHT,
  caption,
}: ChartBlockProps) {
  const chart = getChartById(id);

  if (!chart?.candles?.length) {
    return (
      <div className="border-border bg-card my-6 space-y-2 rounded-2xl border p-6 text-center">
        <p className="text-foreground font-mono text-sm">Chart: {id}</p>
        <p className="text-muted-foreground text-xs">
          {caption || "No chart data available"}
        </p>
      </div>
    );
  }

  return (
    <div className="my-6">
      <CandleChart
        id={chart.id}
        symbol={chart.symbol}
        timeframe={chart.timeframe}
        candles={chart.candles}
        annotations={chart.annotations}
        overlays={chart.overlays}
        pane={chart.pane}
        caption={caption || chart.caption}
        height={height}
      />
    </div>
  );
}
