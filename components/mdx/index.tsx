import { cn } from '@/lib/utils';
import { ChartLoader } from '@/components/chart/ChartLoader';

/**
 * Numbered steps container.
 * @param {{ children: React.ReactNode }} props
 */
export function Steps({ children }) {
  return (
    <div className="my-6 space-y-0 [&>h3]:relative [&>h3]:pl-10 [&>h3]:mb-2 [counter-reset:steps]">
      <div className="steps-container [&>h3]:before:content-[counter(steps)] [&>h3]:before:[counter-increment:steps] [&>h3]:before:absolute [&>h3]:before:left-0 [&>h3]:before:top-0 [&>h3]:before:w-7 [&>h3]:before:h-7 [&>h3]:before:rounded-full [&>h3]:before:bg-gold [&>h3]:before:text-background [&>h3]:before:text-sm [&>h3]:before:font-bold [&>h3]:before:flex [&>h3]:before:items-center [&>h3]:before:justify-center">
        {children}
      </div>
    </div>
  );
}

/**
 * Compare two items side by side.
 * @param {{ left: string, right: string, leftLabel?: string, rightLabel?: string }} props
 */
export function Compare({ left, right, leftLabel = 'Good ✅', rightLabel = 'Bad ❌' }) {
  function renderContent(content) {
    if (!content) return null;
    return content.split('\n').filter(Boolean).map((line, i) => (
      <li key={i} className="text-sm leading-relaxed">
        {line.startsWith('- ') ? line.slice(2) : line}
      </li>
    ));
  }

  return (
    <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="rounded-xl border border-bull/30 bg-bull/5 overflow-hidden">
        <div className="px-3 py-2 border-b border-bull/20 bg-bull/10">
          <span className="text-sm font-semibold text-bull">{leftLabel}</span>
        </div>
        <ul className="p-3 space-y-1.5 list-none">{renderContent(left)}</ul>
      </div>
      <div className="rounded-xl border border-bear/30 bg-bear/5 overflow-hidden">
        <div className="px-3 py-2 border-b border-bear/20 bg-bear/10">
          <span className="text-sm font-semibold text-bear">{rightLabel}</span>
        </div>
        <ul className="p-3 space-y-1.5 list-none">{renderContent(right)}</ul>
      </div>
    </div>
  );
}

/**
 * Lazy-loaded YouTube embed (click-to-load pattern).
 * @param {{ id: string, start?: number }} props
 */
export function YouTube({ id, start = 0 }) {
  return (
    <div className="my-6 rounded-xl overflow-hidden border border-border aspect-video">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}${start ? `?start=${start}` : ''}`}
        title="YouTube video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
        loading="lazy"
      />
    </div>
  );
}

/**
 * TradeSetup card showing entry/stop/target with RR.
 * @param {{ direction: 'long'|'short', pair: string, entry: number, stop: number, target: number }} props
 */
export function TradeSetup({ direction = 'long', pair = 'XAUUSD', entry, stop, target }) {
  const risk = Math.abs(entry - stop);
  const reward = target ? Math.abs(target - entry) : null;
  const rr = reward && risk > 0 ? (reward / risk).toFixed(2) : null;
  const isBull = direction === 'long';

  return (
    <div className="my-6 rounded-xl border border-border bg-panel overflow-hidden">
      <div className={cn('px-4 py-2.5 border-b border-border flex items-center gap-2', isBull ? 'bg-bull/10' : 'bg-bear/10')}>
        <span className={cn('font-mono text-sm font-bold', isBull ? 'text-bull' : 'text-bear')}>
          {isBull ? '▲ LONG' : '▼ SHORT'}
        </span>
        <span className="text-sm text-muted-foreground">{pair}</span>
        {rr && <span className="ml-auto text-xs text-muted-foreground">RR: <strong className="text-foreground">{rr}</strong></span>}
      </div>
      <div className="grid grid-cols-3 divide-x divide-border text-center">
        <div className="py-3">
          <p className="text-xs text-muted-foreground mb-1">Entry</p>
          <p className="font-mono font-semibold">{entry}</p>
        </div>
        <div className="py-3">
          <p className="text-xs text-muted-foreground mb-1">Stop Loss</p>
          <p className="font-mono font-semibold text-bear">{stop}</p>
        </div>
        <div className="py-3">
          <p className="text-xs text-muted-foreground mb-1">Target</p>
          <p className="font-mono font-semibold text-bull">{target ?? '—'}</p>
        </div>
      </div>
    </div>
  );
}

/**
 * Placeholder for PatternCard — renders in Phase 2.
 * @param {{ name: string }} props
 */
export function PatternCard({ name }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-card text-sm text-muted-foreground my-1">
      <span className="w-3 h-3 rounded-sm bg-muted" />
      {name}
      <span className="text-xs opacity-50">(Phase 2)</span>
    </div>
  );
}

/**
 * Interactive Chart component.
 * @param {{ id: string, height?: number, caption?: string }} props
 */
export function Chart({ id, height = 420, caption }) {
  return <ChartLoader id={id} height={height} caption={caption} />;
}
