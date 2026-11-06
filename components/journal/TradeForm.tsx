"use client";

import { useState } from "react";
import {
  CHECKLIST,
  EMOTIONS,
  MISTAKES,
  PAIRS,
  SESSIONS,
  SETUPS,
  fmtR,
  newId,
  rMultiple,
  type Direction,
  type Trade,
} from "@/lib/journal/core";
import type { JournalCopy } from "@/lib/journal/copy";

export interface NoteOption {
  slug: string;
  title: string;
}

interface TradeFormProps {
  initial?: Trade;
  copy: JournalCopy;
  notes: NoteOption[];
  onSave: (t: Trade) => void;
  onCancel?: () => void;
}

const today = () => new Date().toISOString().slice(0, 10);

const blank = (): Trade => ({
  id: newId(),
  date: today(),
  pair: "XAUUSD",
  direction: "long",
  setup: SETUPS[0],
  session: SESSIONS[1],
  entry: NaN,
  stop: NaN,
  exit: NaN,
  checklist: [],
  followedPlan: true,
  emotion: EMOTIONS[0],
  mistake: MISTAKES[0],
  notes: "",
});

const labelCls =
  "mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-mute";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      {children}
    </div>
  );
}

function Select({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <select
      className="input"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

const plain = (list: string[]) => list.map((v) => ({ value: v, label: v }));

export function TradeForm({
  initial,
  copy,
  notes,
  onSave,
  onCancel,
}: TradeFormProps) {
  const f = copy.form;
  const [t, setT] = useState<Trade>(initial ?? blank());
  const [err, setErr] = useState("");
  const set = <K extends keyof Trade>(k: K, v: Trade[K]) =>
    setT((p) => ({ ...p, [k]: v }));
  const num = (k: "entry" | "stop" | "exit", v: string) =>
    set(k, v === "" ? NaN : Number(v));
  const r = rMultiple(t);
  const ready = !isNaN(t.entry) && !isNaN(t.stop) && !isNaN(t.exit);
  const val = (n: number) => (isNaN(n) ? "" : String(n));

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!ready) return setErr(f.errMissing);
    if (r === null)
      return setErr(t.direction === "long" ? f.errLong : f.errShort);
    setErr("");
    onSave(t);
    if (!initial) setT(blank());
  }

  const noteOptions = [
    { value: "", label: f.noNote },
    ...notes.map((n) => ({ value: n.slug, label: n.title })),
  ];

  return (
    <form onSubmit={submit} className="card grid gap-5">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Field label={f.date}>
          <input
            className="input"
            type="date"
            value={t.date}
            onChange={(e) => set("date", e.target.value)}
            required
          />
        </Field>
        <Field label={f.pair}>
          <Select
            value={t.pair}
            onChange={(v) => set("pair", v)}
            options={plain(PAIRS.includes(t.pair) ? PAIRS : [t.pair, ...PAIRS])}
          />
        </Field>
        <div>
          <span className={labelCls}>{f.direction}</span>
          <div className="flex gap-1.5">
            {(["long", "short"] as Direction[]).map((d) => (
              <button
                key={d}
                type="button"
                className="chip flex-1 justify-center capitalize"
                aria-pressed={t.direction === d}
                onClick={() => set("direction", d)}
              >
                {f[d]}
              </button>
            ))}
          </div>
        </div>
        <Field label={f.session}>
          <Select
            value={t.session}
            onChange={(v) => set("session", v)}
            options={plain(SESSIONS)}
          />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Field label={f.setup}>
          <Select
            value={t.setup}
            onChange={(v) => set("setup", v)}
            options={plain(SETUPS)}
          />
        </Field>
        {(["entry", "stop", "exit"] as const).map((k) => (
          <Field key={k} label={f[k]}>
            <input
              className="input"
              type="number"
              step="any"
              inputMode="decimal"
              value={val(t[k])}
              onChange={(e) => num(k, e.target.value)}
            />
          </Field>
        ))}
      </div>

      <div className="border-line bg-bg2 flex items-center justify-between rounded-xl border px-4 py-3">
        <span className="text-mute font-mono text-xs tracking-wider uppercase">
          {f.result}
        </span>
        <span
          className={`font-display text-2xl tabular-nums ${r === null ? "text-mute" : r >= 0 ? "text-up" : "text-down"}`}
        >
          {r === null ? "–" : fmtR(r)}
        </span>
      </div>

      <fieldset>
        <legend className={labelCls}>
          {f.checklist} ({t.checklist.length}/{CHECKLIST.length})
        </legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {CHECKLIST.map((c) => (
            <label key={c.id} className="flex items-center gap-2.5 text-[15px]">
              <input
                type="checkbox"
                className="size-4 accent-[var(--gold)]"
                checked={t.checklist.includes(c.id)}
                onChange={(e) =>
                  set(
                    "checklist",
                    e.target.checked
                      ? [...t.checklist, c.id]
                      : t.checklist.filter((x) => x !== c.id),
                  )
                }
              />
              {c.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-4 sm:grid-cols-3">
        <Field label={f.emotion}>
          <Select
            value={t.emotion}
            onChange={(v) => set("emotion", v)}
            options={plain(EMOTIONS)}
          />
        </Field>
        <Field label={f.mistake}>
          <Select
            value={t.mistake}
            onChange={(v) => set("mistake", v)}
            options={plain(MISTAKES)}
          />
        </Field>
        <label className="flex items-end gap-2.5 pb-2.5 text-[15px]">
          <input
            type="checkbox"
            className="size-4 accent-[var(--gold)]"
            checked={t.followedPlan}
            onChange={(e) => set("followedPlan", e.target.checked)}
          />
          {f.plan}
        </label>
      </div>

      {notes.length > 0 && (
        <Field label={f.linkNote}>
          <Select
            value={t.noteSlug ?? ""}
            onChange={(v) => set("noteSlug", v || undefined)}
            options={noteOptions}
          />
        </Field>
      )}

      <Field label={f.notes}>
        <textarea
          className="input h-auto min-h-24 py-2.5"
          value={t.notes}
          onChange={(e) => set("notes", e.target.value)}
          placeholder={f.notesPlaceholder}
        />
      </Field>

      {err && (
        <p role="alert" className="text-down text-sm">
          {err}
        </p>
      )}
      <div className="flex gap-2.5">
        <button className="btn btn-gold" type="submit">
          {initial ? f.save : f.add}
        </button>
        {onCancel && (
          <button type="button" className="btn" onClick={onCancel}>
            {f.cancel}
          </button>
        )}
      </div>
    </form>
  );
}
