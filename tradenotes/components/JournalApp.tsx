"use client";

import { useRef, useState } from "react";
import { CHECKLIST, closed, computeStats, demoTrades, fmtPct, fmtR, parseTrades, toCsv, type Group, type Trade } from "@/lib/journal";
import { useJournal } from "@/lib/journal-store";
import { EquityCurve } from "./EquityCurve";
import { TradeForm } from "./TradeForm";

function Stat({ label, value, tone, hint }: { label: string; value: string; tone?: "up" | "down"; hint?: string }) {
  return (
    <div className="rounded-xl border border-line bg-surface p-4">
      <div className="font-mono text-[11px] uppercase tracking-wider text-mute">{label}</div>
      <div className={`mt-1.5 font-display text-[28px] leading-none tabular-nums ${tone === "up" ? "text-up" : tone === "down" ? "text-down" : ""}`}>{value}</div>
      {hint && <div className="mt-1.5 text-xs text-mute">{hint}</div>}
    </div>
  );
}

function Breakdown({ title, rows }: { title: string; rows: Group[] }) {
  return (
    <div className="card">
      <h3 className="mb-3 text-xl">{title}</h3>
      {rows.length === 0 ? (
        <p className="text-sm text-mute">No data yet.</p>
      ) : (
        <table className="w-full text-left text-[14px]">
          <thead>
            <tr className="font-mono text-[11px] uppercase tracking-wider text-mute">
              <th className="pb-2 font-medium"> </th>
              <th className="pb-2 text-right font-medium">Trades</th>
              <th className="pb-2 text-right font-medium">Win</th>
              <th className="pb-2 text-right font-medium">Total</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((g) => (
              <tr key={g.key} className="border-t border-line">
                <td className="py-2 pr-2">{g.key}</td>
                <td className="py-2 text-right tabular-nums text-fg2">{g.trades}</td>
                <td className="py-2 text-right tabular-nums text-fg2">{fmtPct(g.winRate)}</td>
                <td className={`py-2 text-right font-mono tabular-nums ${g.totalR >= 0 ? "text-up" : "text-down"}`}>{fmtR(g.totalR, 1)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

function download(name: string, text: string, type: string) {
  const url = URL.createObjectURL(new Blob([text], { type }));
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
}

export function JournalApp() {
  const { trades, add, update, remove, replace } = useJournal();
  const [editing, setEditing] = useState<Trade | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [msg, setMsg] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const s = computeStats(trades);
  const rows = closed(trades).reverse();
  const skipped = trades.length - s.count;

  async function onImport(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    e.target.value = "";
    if (!f) return;
    try {
      const list = parseTrades(JSON.parse(await f.text()));
      if (!list.length) return setMsg("No valid trades found in that file.");
      replace(list);
      setMsg(`Imported ${list.length} trades.`);
    } catch {
      setMsg("That file is not valid JSON.");
    }
  }

  return (
    <div className="grid gap-10">
      <div className="flex flex-wrap items-center gap-2.5">
        <button className="btn btn-gold btn-sm" onClick={() => { setEditing(null); setShowForm((v) => !v); }}>{showForm ? "Close form" : "Add trade"}</button>
        {trades.length === 0 && <button className="btn btn-sm" onClick={() => replace(demoTrades())}>Load demo data</button>}
        <span className="mx-1 hidden h-5 w-px bg-line sm:block" />
        <button className="btn btn-sm" disabled={!trades.length} onClick={() => download("tradenotes-journal.json", JSON.stringify(trades, null, 2), "application/json")}>Export JSON</button>
        <button className="btn btn-sm" disabled={!trades.length} onClick={() => download("tradenotes-journal.csv", toCsv(trades), "text/csv")}>Export CSV</button>
        <button className="btn btn-sm" onClick={() => fileRef.current?.click()}>Import JSON</button>
        <input ref={fileRef} type="file" accept="application/json,.json" className="hidden" onChange={onImport} />
        {trades.length > 0 && (
          <button className="btn btn-sm ml-auto" onClick={() => { if (confirm("Delete all trades from this browser?")) { replace([]); setMsg("Journal cleared."); } }}>Clear all</button>
        )}
      </div>
      {msg && <p role="status" className="-mt-6 font-mono text-xs text-mute">{msg}</p>}

      {(showForm || editing) && (
        <TradeForm
          key={editing?.id ?? "new"}
          initial={editing ?? undefined}
          onSave={(t) => { if (editing) { update(t); setEditing(null); setShowForm(false); } else add(t); }}
          onCancel={() => { setEditing(null); setShowForm(false); }}
        />
      )}

      {trades.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-line p-10 text-center text-fg2">
          <p className="font-display text-2xl text-fg">Your journal is empty</p>
          <p className="mx-auto mt-2 max-w-md">Add your first trade, or load demo data to see how the stats, equity curve and breakdowns look.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <Stat label="Total" value={fmtR(s.totalR)} tone={s.totalR >= 0 ? "up" : "down"} hint={`${s.count} closed trades`} />
            <Stat label="Win rate" value={fmtPct(s.winRate)} hint={`${s.wins} wins · ${s.losses} losses`} />
            <Stat label="Expectancy" value={fmtR(s.expectancy)} tone={s.expectancy >= 0 ? "up" : "down"} hint="Average R per trade" />
            <Stat label="Profit factor" value={s.profitFactor === null ? "–" : s.profitFactor.toFixed(2)} hint="Gross win ÷ gross loss" />
            <Stat label="Avg win" value={fmtR(s.avgWin)} />
            <Stat label="Avg loss" value={fmtR(s.avgLoss)} />
            <Stat label="Max drawdown" value={`-${s.maxDrawdown.toFixed(2)}R`} hint="Peak to trough" />
            <Stat label="Current streak" value={s.streak.type === "none" ? "–" : `${s.streak.n} ${s.streak.type === "win" ? "W" : "L"}`} hint={`Best ${fmtR(s.best, 1)} · Worst ${fmtR(s.worst, 1)}`} />
          </div>
          {skipped > 0 && <p className="-mt-6 text-sm text-warn">{skipped} trade(s) have a stop on the wrong side of entry and are left out of the stats. Edit them to fix.</p>}

          <div className="card">
            <h3 className="mb-3 text-xl">Equity curve (R)</h3>
            <EquityCurve points={s.curve} />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="card">
              <h3 className="mb-1 text-xl">Plan discipline</h3>
              <p className="mb-4 text-sm text-fg2">Do the trades where you followed your plan actually do better?</p>
              <div className="grid grid-cols-2 gap-3">
                {[s.planFollowed.followed, s.planFollowed.broke].map((g) => (
                  <div key={g.key} className="rounded-xl border border-line bg-bg2 p-4">
                    <div className="font-mono text-[11px] uppercase tracking-wider text-mute">{g.key}</div>
                    <div className={`mt-1.5 font-display text-2xl tabular-nums ${g.totalR >= 0 ? "text-up" : "text-down"}`}>{fmtR(g.totalR, 1)}</div>
                    <div className="mt-1 text-xs text-mute">{g.trades} trades · {fmtPct(g.winRate)} win · avg {fmtR(g.avgR)}</div>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-mute">Average checklist score: {s.avgChecklist.toFixed(1)} of {CHECKLIST.length}</p>
            </div>
            <Breakdown title="By mistake" rows={s.byMistake} />
            <Breakdown title="By setup" rows={s.bySetup} />
            <Breakdown title="By session" rows={s.bySession} />
            <Breakdown title="By pair" rows={s.byPair} />
          </div>

          <div>
            <h3 className="mb-3 text-xl">Trade log</h3>
            <div className="overflow-x-auto rounded-xl border border-line">
              <table className="w-full min-w-[760px] text-left text-[14px]">
                <thead>
                  <tr className="bg-bg2 font-mono text-[11px] uppercase tracking-wider text-gold">
                    {["Date", "Pair", "Side", "Setup", "Session", "Checklist", "Result", ""].map((h) => (
                      <th key={h} className="px-4 py-3 font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((t) => (
                    <tr key={t.id} className="border-t border-line">
                      <td className="px-4 py-3 font-mono text-xs tabular-nums text-fg2">{t.date}</td>
                      <td className="px-4 py-3 font-medium">{t.pair}</td>
                      <td className="px-4 py-3"><span className={`pill ${t.direction === "long" ? "pill-up" : "pill-down"}`}>{t.direction}</span></td>
                      <td className="px-4 py-3 text-fg2">{t.setup}</td>
                      <td className="px-4 py-3 text-fg2">{t.session}</td>
                      <td className="px-4 py-3 font-mono text-xs tabular-nums text-fg2">{t.checklist.length}/{CHECKLIST.length}{!t.followedPlan && <span className="ml-2 text-down">off-plan</span>}</td>
                      <td className={`px-4 py-3 font-mono tabular-nums ${t.r >= 0 ? "text-up" : "text-down"}`}>{fmtR(t.r)}</td>
                      <td className="whitespace-nowrap px-4 py-3 text-right">
                        <button className="link mr-4 text-[13px]" onClick={() => { setEditing(t); setShowForm(true); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Edit</button>
                        <button className="text-[13px] text-mute hover:text-down" onClick={() => remove(t.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
