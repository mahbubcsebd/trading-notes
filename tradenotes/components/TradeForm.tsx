"use client";

import { useState } from "react";
import { CHECKLIST, EMOTIONS, MISTAKES, PAIRS, SESSIONS, SETUPS, fmtR, newId, rMultiple, type Direction, type Trade } from "@/lib/journal";

const today = () => new Date().toISOString().slice(0, 10);

const blank = (): Trade => ({
  id: newId(), date: today(), pair: "XAUUSD", direction: "long", setup: SETUPS[0], session: SESSIONS[1],
  entry: NaN, stop: NaN, exit: NaN, checklist: [], followedPlan: true, emotion: EMOTIONS[0], mistake: MISTAKES[0], notes: "",
});

const label = "mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-mute";

function Select({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <select className="input" value={value} onChange={(e) => onChange(e.target.value)}>
      {options.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
  );
}

export function TradeForm({ initial, onSave, onCancel }: { initial?: Trade; onSave: (t: Trade) => void; onCancel?: () => void }) {
  const [t, setT] = useState<Trade>(initial ?? blank());
  const [err, setErr] = useState("");
  const set = <K extends keyof Trade>(k: K, v: Trade[K]) => setT((p) => ({ ...p, [k]: v }));
  const num = (k: "entry" | "stop" | "exit", v: string) => set(k, v === "" ? NaN : Number(v));
  const r = rMultiple(t);
  const ready = !isNaN(t.entry) && !isNaN(t.stop) && !isNaN(t.exit);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!ready) return setErr("Enter entry, stop and exit.");
    if (r === null) return setErr(t.direction === "long" ? "For a long, the stop must be below entry." : "For a short, the stop must be above entry.");
    setErr("");
    onSave(t);
    if (!initial) setT(blank());
  }

  const val = (n: number) => (isNaN(n) ? "" : String(n));

  return (
    <form onSubmit={submit} className="card grid gap-5">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div><label className={label}>Date</label><input className="input" type="date" value={t.date} onChange={(e) => set("date", e.target.value)} required /></div>
        <div><label className={label}>Pair</label><Select value={t.pair} onChange={(v) => set("pair", v)} options={PAIRS.includes(t.pair) ? PAIRS : [t.pair, ...PAIRS]} /></div>
        <div>
          <label className={label}>Direction</label>
          <div className="flex gap-1.5">
            {(["long", "short"] as Direction[]).map((d) => (
              <button key={d} type="button" className="chip flex-1 justify-center capitalize" aria-pressed={t.direction === d} onClick={() => set("direction", d)}>{d}</button>
            ))}
          </div>
        </div>
        <div><label className={label}>Session</label><Select value={t.session} onChange={(v) => set("session", v)} options={SESSIONS} /></div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div><label className={label}>Setup</label><Select value={t.setup} onChange={(v) => set("setup", v)} options={SETUPS} /></div>
        <div><label className={label}>Entry</label><input className="input" type="number" step="any" inputMode="decimal" value={val(t.entry)} onChange={(e) => num("entry", e.target.value)} /></div>
        <div><label className={label}>Stop loss</label><input className="input" type="number" step="any" inputMode="decimal" value={val(t.stop)} onChange={(e) => num("stop", e.target.value)} /></div>
        <div><label className={label}>Exit</label><input className="input" type="number" step="any" inputMode="decimal" value={val(t.exit)} onChange={(e) => num("exit", e.target.value)} /></div>
      </div>

      <div className="flex items-center justify-between rounded-xl border border-line bg-bg2 px-4 py-3">
        <span className="font-mono text-xs uppercase tracking-wider text-mute">Result</span>
        <span className={`font-display text-2xl tabular-nums ${r === null ? "text-mute" : r >= 0 ? "text-up" : "text-down"}`}>{r === null ? "–" : fmtR(r)}</span>
      </div>

      <fieldset>
        <legend className={label}>Pre-trade checklist ({t.checklist.length}/{CHECKLIST.length})</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {CHECKLIST.map((c) => (
            <label key={c.id} className="flex items-center gap-2.5 text-[15px]">
              <input type="checkbox" className="size-4 accent-[var(--gold)]" checked={t.checklist.includes(c.id)}
                onChange={(e) => set("checklist", e.target.checked ? [...t.checklist, c.id] : t.checklist.filter((x) => x !== c.id))} />
              {c.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-4 sm:grid-cols-3">
        <div><label className={label}>Emotion</label><Select value={t.emotion} onChange={(v) => set("emotion", v)} options={EMOTIONS} /></div>
        <div><label className={label}>Mistake</label><Select value={t.mistake} onChange={(v) => set("mistake", v)} options={MISTAKES} /></div>
        <label className="flex items-end gap-2.5 pb-2.5 text-[15px]">
          <input type="checkbox" className="size-4 accent-[var(--gold)]" checked={t.followedPlan} onChange={(e) => set("followedPlan", e.target.checked)} />
          I followed my plan
        </label>
      </div>

      <div><label className={label}>Notes</label><textarea className="input h-auto min-h-24 py-2.5" value={t.notes} onChange={(e) => set("notes", e.target.value)} placeholder="What did you see? What would you change?" /></div>

      {err && <p role="alert" className="text-sm text-down">{err}</p>}
      <div className="flex gap-2.5">
        <button className="btn btn-gold" type="submit">{initial ? "Save changes" : "Add trade"}</button>
        {onCancel && <button type="button" className="btn" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
}
