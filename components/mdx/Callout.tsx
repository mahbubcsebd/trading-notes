import { cn } from '@/lib/utils';
import { AlertCircle, Lightbulb, AlertTriangle, XCircle, BookOpen } from 'lucide-react';

const calloutConfig = {
  note: {
    icon: AlertCircle,
    className: 'border-blue-500/30 bg-blue-500/5 text-blue-200 dark:text-blue-300',
    iconClass: 'text-blue-400',
    label: 'Note',
  },
  tip: {
    icon: Lightbulb,
    className: 'border-emerald-500/30 bg-emerald-500/5 text-emerald-200 dark:text-emerald-300',
    iconClass: 'text-emerald-400',
    label: 'Tip',
  },
  warning: {
    icon: AlertTriangle,
    className: 'border-yellow-500/30 bg-yellow-500/5 text-yellow-200 dark:text-yellow-300',
    iconClass: 'text-yellow-400',
    label: 'Warning',
  },
  mistake: {
    icon: XCircle,
    className: 'border-red-500/30 bg-red-500/5 text-red-200 dark:text-red-300',
    iconClass: 'text-red-400',
    label: 'Common Mistake',
  },
  rule: {
    icon: BookOpen,
    className: 'border-gold/30 bg-gold/5 text-amber-200 dark:text-amber-300',
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
        'my-4 rounded-xl border p-4 flex gap-3',
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
