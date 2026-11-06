import { fmtPct, fmtR, type Group } from "@/lib/journal/core";
import type { JournalCopy } from "@/lib/journal/copy";

type Tone = "up" | "down";

const toneCls = (tone?: Tone) =>
  tone === "up" ? "text-up" : tone === "down" ? "text-down" : "";

export function Stat({
  label,
  value,
  tone,
  hint,
}: {
  label: string;
  value: string;
  tone?: Tone;
  hint?: string;
}) {
  return (
    <div className="border-line bg-surface rounded-xl border p-4">
      <div className="text-mute font-mono text-[11px] tracking-wider uppercase">
        {label}
      </div>
      <div
        className={`font-display mt-1.5 text-[28px] leading-none tabular-nums ${toneCls(tone)}`}
      >
        {value}
      </div>
      {hint && <div className="text-mute mt-1.5 text-xs">{hint}</div>}
    </div>
  );
}

export function Breakdown({
  title,
  rows,
  copy,
}: {
  title: string;
  rows: Group[];
  copy: JournalCopy["breakdown"];
}) {
  return (
    <div className="card">
      <h2 className="mb-3 text-xl">{title}</h2>
      {rows.length === 0 ? (
        <p className="text-mute text-sm">{copy.noData}</p>
      ) : (
        <table className="w-full text-left text-[14px]">
          <thead>
            <tr className="text-mute font-mono text-[11px] tracking-wider uppercase">
              <th className="pb-2 font-medium">
                <span className="sr-only">{title}</span>
              </th>
              <th className="pb-2 text-right font-medium">{copy.trades}</th>
              <th className="pb-2 text-right font-medium">{copy.win}</th>
              <th className="pb-2 text-right font-medium">{copy.total}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((g) => (
              <tr key={g.key} className="border-line border-t">
                <td className="py-2 pr-2">{g.key}</td>
                <td className="text-fg2 py-2 text-right tabular-nums">
                  {g.trades}
                </td>
                <td className="text-fg2 py-2 text-right tabular-nums">
                  {fmtPct(g.winRate)}
                </td>
                <td
                  className={`py-2 text-right font-mono tabular-nums ${g.totalR >= 0 ? "text-up" : "text-down"}`}
                >
                  {fmtR(g.totalR, 1)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
