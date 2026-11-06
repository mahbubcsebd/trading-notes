"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { CONTRACT_SIZES, calculatePosition, calcRR } from "@/lib/risk";
import { dictionaries, type Locale } from "@/lib/dictionaries";

const INSTRUMENTS = Object.keys(CONTRACT_SIZES);
const DEFAULT_CONTRACT_SIZE = 100000;
const GOOD_RR = 2;

type RiskDict = (typeof dictionaries)[Locale]["riskCalc"];
type Position = ReturnType<typeof calculatePosition>;
type Result = Position & { rr: ReturnType<typeof calcRR> | null };

interface FormState {
  accountBalance: string;
  riskPercent: string;
  entry: string;
  stopLoss: string;
  target: string;
  pair: string;
  contractSize: string;
  lotStep: string;
}

const INITIAL_FORM: FormState = {
  accountBalance: "10000",
  riskPercent: "1",
  entry: "",
  stopLoss: "",
  target: "",
  pair: "XAUUSD",
  contractSize: "",
  lotStep: "0.01",
};

const inputClass = "input placeholder:text-mute font-mono text-sm tabular-nums";

function validate(form: FormState, isEn: boolean): string | null {
  const nums = [
    form.accountBalance,
    form.riskPercent,
    form.entry,
    form.stopLoss,
    form.lotStep,
  ].map(Number);
  if (nums.some((n) => !Number.isFinite(n) || n <= 0)) {
    return isEn
      ? "Fill every required field with a positive number."
      : "প্রতিটি দরকারি ঘরে positive সংখ্যা দিন।";
  }
  if (Number(form.entry) === Number(form.stopLoss)) {
    return isEn
      ? "Entry and stop loss cannot be the same price."
      : "Entry আর stop loss একই price হতে পারে না।";
  }
  if (form.contractSize && !(Number(form.contractSize) > 0)) {
    return isEn
      ? "Contract size must be positive."
      : "Contract size positive হতে হবে।";
  }
  return null;
}

export function RiskCalculator({ lang }: { lang: Locale }) {
  const t: RiskDict = dictionaries[lang].riskCalc;
  const isEn = lang === "en";
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);

  const update = (field: keyof FormState, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  function calculate(e: FormEvent) {
    e.preventDefault();
    const problem = validate(form, isEn);
    setError(problem);
    if (problem) {
      setResult(null);
      return;
    }
    const entry = Number(form.entry);
    const stopLoss = Number(form.stopLoss);
    const position = calculatePosition({
      accountBalance: Number(form.accountBalance),
      riskPercent: Number(form.riskPercent),
      entry,
      stopLoss,
      pair: form.pair,
      contractSize: form.contractSize ? Number(form.contractSize) : undefined,
      lotStep: Number(form.lotStep),
    });
    const rr = form.target
      ? calcRR(entry, stopLoss, Number(form.target))
      : null;
    setResult({ ...position, rr });
  }

  const contractPlaceholder = String(
    CONTRACT_SIZES[form.pair] ?? DEFAULT_CONTRACT_SIZE,
  );

  return (
    <div className="border-line bg-surface grid overflow-hidden rounded-[20px] border lg:grid-cols-[minmax(0,1fr)_24rem]">
      <form onSubmit={calculate} className="space-y-8 p-6 sm:p-8" noValidate>
        <Fieldset index="01" title={t.account}>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={t.balance}>
              <input
                type="number"
                inputMode="decimal"
                value={form.accountBalance}
                onChange={(e) => update("accountBalance", e.target.value)}
                className={inputClass}
                min="1"
                step="100"
                required
              />
            </Field>
            <Field label={t.risk}>
              <input
                type="number"
                inputMode="decimal"
                value={form.riskPercent}
                onChange={(e) => update("riskPercent", e.target.value)}
                className={inputClass}
                min="0.1"
                max="10"
                step="0.1"
                required
              />
            </Field>
          </div>
        </Fieldset>

        <Fieldset index="02" title={t.tradeDetails}>
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label={t.entry}>
              <input
                type="number"
                inputMode="decimal"
                value={form.entry}
                onChange={(e) => update("entry", e.target.value)}
                placeholder={form.pair === "XAUUSD" ? "2300.00" : "1.08500"}
                className={inputClass}
                step="any"
                required
              />
            </Field>
            <Field label={t.sl} accent="bear">
              <input
                type="number"
                inputMode="decimal"
                value={form.stopLoss}
                onChange={(e) => update("stopLoss", e.target.value)}
                className={inputClass}
                step="any"
                required
              />
            </Field>
            <Field label={t.target} accent="bull">
              <input
                type="number"
                inputMode="decimal"
                value={form.target}
                onChange={(e) => update("target", e.target.value)}
                className={inputClass}
                step="any"
              />
            </Field>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <Field label={t.instrument}>
              <select
                value={form.pair}
                onChange={(e) => update("pair", e.target.value)}
                className={inputClass}
              >
                {INSTRUMENTS.map((inst) => (
                  <option key={inst} value={inst}>
                    {inst}
                  </option>
                ))}
                <option value="CUSTOM">CUSTOM</option>
              </select>
            </Field>
            <Field label={t.contractSize}>
              <input
                type="number"
                inputMode="decimal"
                value={form.contractSize}
                onChange={(e) => update("contractSize", e.target.value)}
                placeholder={contractPlaceholder}
                className={inputClass}
                step="1"
              />
            </Field>
            <Field label={t.lotStep}>
              <input
                type="number"
                inputMode="decimal"
                value={form.lotStep}
                onChange={(e) => update("lotStep", e.target.value)}
                className={inputClass}
                step="0.01"
                min="0.01"
              />
            </Field>
          </div>
          <p className="text-mute mt-4 text-[13px] leading-relaxed">
            {t.contractWarning}
          </p>
        </Fieldset>

        <div className="flex flex-wrap items-center gap-4">
          <button
            type="submit"
            className="btn btn-gold focus-visible:ring-gold/40 focus-visible:ring-2 focus-visible:outline-none"
          >
            {t.calculate}
          </button>
          {error && (
            <p role="alert" className="text-warn text-[13px]">
              {error}
            </p>
          )}
        </div>
      </form>

      <ResultPanel t={t} result={result} />
    </div>
  );
}

function Fieldset({
  index,
  title,
  children,
}: {
  index: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <fieldset className="border-line border-t pt-6 first:border-t-0 first:pt-0">
      <legend className="sr-only">{title}</legend>
      <p aria-hidden="true" className="mb-5 flex items-baseline gap-3">
        <span className="text-gold font-mono text-xs">{index}</span>
        <span className="font-display text-xl">{title}</span>
      </p>
      {children}
    </fieldset>
  );
}

function Field({
  label,
  accent,
  children,
}: {
  label: string;
  accent?: "bull" | "bear";
  children: ReactNode;
}) {
  const dot =
    accent === "bull" ? "bg-up" : accent === "bear" ? "bg-down" : null;
  return (
    <label className="block">
      <span className="text-fg2 mb-1.5 flex items-center gap-1.5 text-[13px]">
        {dot && (
          <span
            className={`h-1.5 w-1.5 rounded-full ${dot}`}
            aria-hidden="true"
          />
        )}
        {label}
      </span>
      {children}
    </label>
  );
}

function ResultPanel({ t, result }: { t: RiskDict; result: Result | null }) {
  const rows = result
    ? [
        {
          label: t.riskAmount,
          value: `$${result.riskAmount}`,
          tone: "text-down",
        },
        {
          label: t.stopDistance,
          value: `${result.stopDistancePips} pips`,
          tone: "",
        },
        {
          label: t.exactLots,
          value: String(result.lots),
          tone: "text-mute",
        },
        { label: t.pipValue, value: `$${result.pipValuePerLot}`, tone: "" },
        {
          label: t.rr,
          value: result.rr ? `1:${result.rr.rr}` : "—",
          tone:
            result.rr && Number(result.rr.rr) >= GOOD_RR
              ? "text-up"
              : "text-mute",
        },
      ]
    : [];

  return (
    <aside
      aria-live="polite"
      className="border-line bg-bg2 flex flex-col border-t p-6 sm:p-8 lg:border-t-0 lg:border-l"
    >
      <p className="eyebrow">{t.results}</p>
      <p className="text-fg2 mt-5 text-[13px]">{t.lotSize}</p>
      <p
        className={`font-display mt-2 text-[clamp(64px,9vw,96px)] leading-none tracking-tight tabular-nums ${result ? "text-gold" : "text-mute"}`}
      >
        {result ? result.lotsRounded : "0.00"}
        <small className="text-mute ml-2 font-mono text-base tracking-normal">
          lots
        </small>
      </p>
      {result && (
        <dl className="mt-6">
          {rows.map((r) => (
            <div
              key={r.label}
              className="border-line flex items-baseline justify-between gap-4 border-t py-3"
            >
              <dt className="text-fg2 text-sm">{r.label}</dt>
              <dd className={`m-0 font-mono text-sm font-medium tabular-nums ${r.tone}`}>
                {r.value}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </aside>
  );
}
