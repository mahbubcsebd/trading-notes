"use client";

import { useMemo, useRef, useState } from "react";
import {
  CHECKLIST,
  closed,
  computeStats,
  demoTrades,
  fmtPct,
  fmtR,
  parseTrades,
  toCsv,
  type Trade,
} from "@/lib/journal/core";
import { journalCopy } from "@/lib/journal/copy";
import { useJournal } from "@/lib/journal/store";
import type { Locale } from "@/lib/dictionaries";
import { EquityCurve } from "./EquityCurve";
import { Breakdown, Stat } from "./Stat";
import { TradeForm, type NoteOption } from "./TradeForm";
import { TradeLog } from "./TradeLog";

function download(name: string, text: string, type: string) {
  const url = URL.createObjectURL(new Blob([text], { type }));
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
}

export function JournalApp({
  lang,
  notes,
}: {
  lang: Locale;
  notes: NoteOption[];
}) {
  const copy = journalCopy[lang];
  const { trades, isDemo, add, update, remove, replace } = useJournal();
  const [editing, setEditing] = useState<Trade | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [msg, setMsg] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const s = computeStats(trades);
  const rows = useMemo(() => closed(trades).reverse(), [trades]);
  const skipped = trades.length - s.count;
  const noteTitles = useMemo(
    () => Object.fromEntries(notes.map((n) => [n.slug, n.title])),
    [notes],
  );
  const st = copy.stats;

  async function onImport(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    e.target.value = "";
    if (!f) return;
    try {
      const list = parseTrades(JSON.parse(await f.text()));
      if (!list.length) return setMsg(copy.importNone);
      replace(list);
      setMsg(copy.imported(list.length));
    } catch {
      setMsg(copy.importBad);
    }
  }

  function closeForm() {
    setEditing(null);
    setShowForm(false);
  }

  return (
    <div className="grid gap-10">
      {isDemo && (
        <p className="border-gold text-fg2 border-l-2 pl-4 text-sm" role="status">
          <span className="pill pill-gold mr-2.5 align-middle">Demo</span>
          {copy.demoNotice}
        </p>
      )}
      <div className="flex flex-wrap items-center gap-2.5">
        <button
          className="btn btn-gold btn-sm"
          onClick={() => {
            setEditing(null);
            setShowForm((v) => !v);
          }}
        >
          {showForm ? copy.closeForm : copy.addTrade}
        </button>
        {trades.length === 0 && (
          <button className="btn btn-sm" onClick={() => replace(demoTrades())}>
            {copy.loadDemo}
          </button>
        )}
        <span className="bg-line mx-1 hidden h-5 w-px sm:block" />
        <button
          className="btn btn-sm"
          disabled={!trades.length}
          onClick={() =>
            download(
              "tradenotes-journal.json",
              JSON.stringify(trades, null, 2),
              "application/json",
            )
          }
        >
          {copy.exportJson}
        </button>
        <button
          className="btn btn-sm"
          disabled={!trades.length}
          onClick={() =>
            download("tradenotes-journal.csv", toCsv(trades), "text/csv")
          }
        >
          {copy.exportCsv}
        </button>
        <button className="btn btn-sm" onClick={() => fileRef.current?.click()}>
          {copy.importJson}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="application/json,.json"
          className="hidden"
          onChange={onImport}
        />
        {trades.length > 0 && (
          <button
            className="btn btn-sm ml-auto"
            onClick={() => {
              if (confirm(copy.confirmClear)) {
                replace([]);
                setMsg(copy.cleared);
              }
            }}
          >
            {copy.clearAll}
          </button>
        )}
      </div>
      {msg && (
        <p role="status" className="text-mute -mt-6 font-mono text-xs">
          {msg}
        </p>
      )}

      {(showForm || editing) && (
        <TradeForm
          key={editing?.id ?? "new"}
          initial={editing ?? undefined}
          copy={copy}
          notes={notes}
          onSave={(t) => {
            if (editing) {
              update(t);
              closeForm();
            } else add(t);
          }}
          onCancel={closeForm}
        />
      )}

      {trades.length === 0 ? (
        <div className="border-line text-fg2 rounded-2xl border border-dashed p-10 text-center">
          <p className="font-display text-fg text-2xl">{copy.emptyTitle}</p>
          <p className="mx-auto mt-2 max-w-md">{copy.emptyBody}</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <Stat
              label={st.total}
              value={fmtR(s.totalR)}
              tone={s.totalR >= 0 ? "up" : "down"}
              hint={st.closed(s.count)}
            />
            <Stat
              label={st.winRate}
              value={fmtPct(s.winRate)}
              hint={st.winsLosses(s.wins, s.losses)}
            />
            <Stat
              label={st.expectancy}
              value={fmtR(s.expectancy)}
              tone={s.expectancy >= 0 ? "up" : "down"}
              hint={st.avgRPerTrade}
            />
            <Stat
              label={st.profitFactor}
              value={s.profitFactor === null ? "–" : s.profitFactor.toFixed(2)}
              hint={st.profitFactorHint}
            />
            <Stat label={st.avgWin} value={fmtR(s.avgWin)} />
            <Stat label={st.avgLoss} value={fmtR(s.avgLoss)} />
            <Stat
              label={st.maxDrawdown}
              value={`-${s.maxDrawdown.toFixed(2)}R`}
              hint={st.peakToTrough}
            />
            <Stat
              label={st.streak}
              value={
                s.streak.type === "none"
                  ? "–"
                  : `${s.streak.n} ${s.streak.type === "win" ? "W" : "L"}`
              }
              hint={st.bestWorst(fmtR(s.best, 1), fmtR(s.worst, 1))}
            />
          </div>
          {skipped > 0 && (
            <p className="text-warn -mt-6 text-sm">{copy.skipped(skipped)}</p>
          )}

          <div className="card">
            <h2 className="mb-3 text-xl">{copy.equity}</h2>
            <EquityCurve points={s.curve} emptyLabel={copy.equityEmpty} />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="card">
              <h2 className="mb-1 text-xl">{copy.discipline}</h2>
              <p className="text-fg2 mb-4 text-sm">{copy.disciplineLead}</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { g: s.planFollowed.followed, label: copy.followed },
                  { g: s.planFollowed.broke, label: copy.broke },
                ].map(({ g, label }) => (
                  <div
                    key={g.key}
                    className="border-line bg-bg2 rounded-xl border p-4"
                  >
                    <div className="text-mute font-mono text-[11px] tracking-wider uppercase">
                      {label}
                    </div>
                    <div
                      className={`font-display mt-1.5 text-2xl tabular-nums ${g.totalR >= 0 ? "text-up" : "text-down"}`}
                    >
                      {fmtR(g.totalR, 1)}
                    </div>
                    <div className="text-mute mt-1 text-xs">
                      {copy.disciplineLine(
                        g.trades,
                        fmtPct(g.winRate),
                        fmtR(g.avgR),
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-mute mt-4 text-xs">
                {copy.checklistAvg(s.avgChecklist.toFixed(1), CHECKLIST.length)}
              </p>
            </div>
            <Breakdown
              title={copy.breakdown.mistake}
              rows={s.byMistake}
              copy={copy.breakdown}
            />
            <Breakdown
              title={copy.breakdown.setup}
              rows={s.bySetup}
              copy={copy.breakdown}
            />
            <Breakdown
              title={copy.breakdown.session}
              rows={s.bySession}
              copy={copy.breakdown}
            />
            <Breakdown
              title={copy.breakdown.pair}
              rows={s.byPair}
              copy={copy.breakdown}
            />
            <Breakdown
              title={copy.breakdown.month}
              rows={s.byMonth}
              copy={copy.breakdown}
            />
          </div>

          <TradeLog
            rows={rows}
            copy={copy}
            lang={lang}
            noteTitles={noteTitles}
            onEdit={(t) => {
              setEditing(t);
              setShowForm(true);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            onRemove={remove}
          />
        </>
      )}
    </div>
  );
}
