import type { ReactNode } from "react";

export interface PageStat {
  value: ReactNode;
  label: string;
}

interface PageHeaderProps {
  eyebrow: string;
  title: ReactNode;
  desc?: ReactNode;
  stats?: PageStat[];
  /** Actions or jump links rendered under the description. */
  children?: ReactNode;
  /** Optional right-hand slot (visual, actions) on large screens. */
  aside?: ReactNode;
}

/**
 * Top-of-page header for index pages (patterns, charts, glossary, tools, notes, journal).
 * TradeNotes design: gold mono eyebrow, display-serif title, muted lead,
 * hairline stat row. Flat surface, no decoration.
 */
export function PageHeader({
  eyebrow,
  title,
  desc,
  stats,
  children,
  aside,
}: PageHeaderProps) {
  return (
    <header className="border-line border-b">
      <div
        className={`wrap grid items-end gap-10 pt-12 pb-10 md:pt-16 md:pb-14 ${
          aside ? "lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)]" : ""
        }`}
      >
        <div className="max-w-3xl">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-3 text-[clamp(40px,6vw,64px)] leading-[1.05] tracking-tight">
            {title}
          </h1>
          {desc && (
            <p className="text-fg2 mt-4 max-w-2xl text-[19px] leading-relaxed">
              {desc}
            </p>
          )}
          {children && <div className="mt-8">{children}</div>}
          {stats && stats.length > 0 && (
            <dl className="border-line mt-9 flex flex-wrap gap-x-9 gap-y-4 border-t pt-5">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="text-mute font-mono text-[11px] font-medium tracking-[0.08em] uppercase">
                    {s.label}
                  </dt>
                  <dd className="font-display mt-1.5 text-[34px] leading-tight tabular-nums">
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>
        {aside && <div className="relative">{aside}</div>}
      </div>
    </header>
  );
}

/** Pill-style in-page jump links used under a PageHeader. */
export function JumpLinks({
  links,
}: {
  links: { href: string; label: string; index?: string }[];
}) {
  return (
    <nav className="flex flex-wrap gap-2" aria-label="On this page">
      {links.map((l) => (
        <a key={l.href} href={l.href} className="chip group">
          {l.index && (
            <span className="text-mute group-hover:text-gold tabular-nums transition-colors">
              {l.index}
            </span>
          )}
          {l.label}
        </a>
      ))}
    </nav>
  );
}
