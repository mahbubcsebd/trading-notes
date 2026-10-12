import { Callout } from '@/components/mdx/Callout';
import { KeyTakeaways } from '@/components/mdx/KeyTakeaways';
import { Figure } from '@/components/mdx/Figure';
import { Checklist } from '@/components/mdx/Checklist';
import {
  Steps,
  Compare,
  YouTube,
  TradeSetup,
  PatternCard,
  Chart,
} from '@/components/mdx/index';

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
  // Placeholder for Phase 2
  ChartInline: Chart,
  TVWidget: ({ symbol, interval }) => (
    <div className="my-6 rounded-xl border border-border bg-panel p-4 text-center text-sm text-muted-foreground">
      TradingView Widget: {symbol} ({interval}) — loads in Phase 2
    </div>
  ),
  Term: ({ children }) => (
    <abbr
      title="See glossary"
      className="cursor-help underline decoration-dotted decoration-gold/60 text-foreground"
    >
      {children}
    </abbr>
  ),
  Mermaid: ({ children }) => (
    <pre className="my-4 rounded-xl border border-border bg-panel p-4 text-sm font-mono text-muted-foreground overflow-x-auto">
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
