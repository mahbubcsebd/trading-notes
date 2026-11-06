import { cn } from '@/lib/utils';
import { AlertCircle, Lightbulb, AlertTriangle, XCircle, BookOpen } from 'lucide-react';

const calloutConfig = {
  note: {
    icon: AlertCircle,
    className: 'border-link/25 bg-link/5',
    iconClass: 'text-link',
    label: 'Note',
  },
  tip: {
    icon: Lightbulb,
    className: 'border-bull/25 bg-bull/5',
    iconClass: 'text-bull',
    label: 'Tip',
  },
  warning: {
    icon: AlertTriangle,
    className: 'border-gold/30 bg-gold/5',
    iconClass: 'text-gold',
    label: 'Warning',
  },
  mistake: {
    icon: XCircle,
    className: 'border-bear/25 bg-bear/5',
    iconClass: 'text-bear',
    label: 'Common Mistake',
  },
  rule: {
    icon: BookOpen,
    className: 'border-keynote/30 bg-keynote/5',
    iconClass: 'text-gold',
    label: 'Rule',
  },
};

/**
 * @param {{ type?: 'note'|'tip'|'warning'|'mistake'|'rule', children: React.ReactNode }} props
 */
export function Callout({ type = 'note', children }) {
  const config = calloutConfig[type] ?? calloutConfig.note;
  const Icon = config.icon;

  return (
    <div
      className={cn(
        'my-5 rounded-xl border p-4 flex gap-3 text-foreground/90',
        config.className
      )}
      role="note"
      aria-label={config.label}
    >
      <Icon size={16} className={cn('shrink-0 mt-0.5', config.iconClass)} aria-hidden="true" />
      <div className="text-sm leading-relaxed [&>p]:m-0 [&>p:not(:last-child)]:mb-2">{children}</div>
    </div>
  );
}
