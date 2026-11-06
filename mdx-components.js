import { Callout } from "@/components/mdx/Callout";
import { KeyTakeaways } from "@/components/mdx/KeyTakeaways";
import { Figure } from "@/components/mdx/Figure";
import { Checklist } from "@/components/mdx/Checklist";
import {
  Steps,
  Compare,
  YouTube,
  TradeSetup,
  PatternCard,
  Chart,
} from "@/components/mdx/index";
import {
  Disclaimer,
  ExternalLink,
  ChartPlaceholder,
} from "@/components/mdx/ArticleBlocks";
import { CandleDiagram, DiagramRow } from "@/components/mdx/CandleDiagram";
import { MethodCard } from "@/components/mdx/MethodCard";

/** @type {Record<string, React.ComponentType<any>>} */
const components = {
  Callout,
  KeyTakeaways,
  Figure,
  Checklist,
  Steps,
  Compare,
  YouTube,
  TradeSetup,
  PatternCard,
  Chart,
  Disclaimer,
  ExternalLink,
  ChartPlaceholder,
  CandleDiagram,
  DiagramRow,
  MethodCard,
  // Placeholder for Phase 2
  ChartInline: Chart,
  TVWidget: ({ symbol, interval }) => (
    <div className="border-border bg-panel text-muted-foreground my-6 rounded-xl border p-4 text-center text-sm">
      TradingView Widget: {symbol} ({interval}) — loads in Phase 2
    </div>
  ),
  Term: ({ children }) => (
    <abbr
      title="See glossary"
      className="decoration-gold/60 text-foreground cursor-help underline decoration-dotted"
    >
      {children}
    </abbr>
  ),
  Mermaid: ({ children }) => (
    <pre className="border-border bg-panel text-muted-foreground my-4 overflow-x-auto rounded-xl border p-4 font-mono text-sm">
      {children}
    </pre>
  ),
};

export function useMDXComponents(origComponents) {
  return {
    ...origComponents,
    ...components,
  };
}

export { components };
