"use client";

import { useState } from "react";
import { instruments, positionSize, type InstrumentId } from "@/lib/risk";

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
const num = new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 });

function parse(v: string) {
  return parseFloat(v.replace(/,/g, ""));
}

export function RiskCalculator() {
  const [inst, setInst] = useState<InstrumentId>("XAUUSD");
  const [balance, setBalance] = useState("1000");
  const [risk, setRisk] = useState("1");
  const [stop, setStop] = useState(String(instruments.XAUUSD.defaultStop));
  const [rr, setRr] = useState("2");
  const [price, setPrice] = useState("150");

  const cfg = instruments[inst];
  const res = positionSize({
    instrument: inst,
    balance: parse(balance),
    riskPct: parse(risk),
    stop: parse(stop),
    rr: parse(rr),
    price: cfg.needsPrice ? parse(price) : undefined,
  });

  function choose(id: InstrumentId) {
    setInst(id);
    setStop(String(instruments[id].defaultStop));
    if (instruments[id].defaultPrice) setPrice(String(instruments[id].defaultPrice));
  }

  let note = "";
  if (res.ok) {
    if (res.belowMin) note = "This risk is below the usual 0.01 minimum lot. Widen the risk or tighten the stop.";
    else if (parse(risk) > 2) note = "Many risk rules keep a single trade near 1 to 2 percent of the account.";
  }

  return (
    <div className="grid overflow-hidden rounded-[20px] border border-line bg-surface md:grid-cols-2">
      <form className="flex flex-col gap-5 p-6 sm:p-8" onSubmit={(e) => e.preventDefault()} noValidate>
        <div className="inline-flex flex-wrap self-start rounded-full border border-line p-[3px]" role="group" aria-label="Instrument">
          {(Object.keys(instruments) as InstrumentId[]).map((id) => (
            <button
              key={id}
              type="button"
              aria-pressed={inst === id}
              onClick={() => choose(id)}
              className={`h-8 rounded-full px-4 font-mono text-xs font-medium ${inst === id ? "bg-gold text-gold-ink" : "text-fg2"}`}
            >
              {id}
            </button>
          ))}
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field id="bal" label="Account balance (USD)" value={balance} onChange={setBalance} />
          <Field id="risk" label="Risk per trade (%)" value={risk} onChange={setRisk} />
          <Field id="stop" label={cfg.stopLabel} value={stop} onChange={setStop} />
          <Field id="rr" label="Reward to risk (R)" value={rr} onChange={setRr} />
          {cfg.needsPrice && <Field id="price" label="Current USDJPY price" value={price} onChange={setPrice} />}
        </div>
        <p className="text-[13px] text-mute">{cfg.hint}</p>
        <p className="min-h-5 text-[13px] text-warn" role="alert">
          {res.ok ? note : res.error}
        </p>
      </form>
      <div className="flex flex-col gap-5 border-t border-line bg-bg2 p-6 sm:p-8 md:border-l md:border-t-0">
        <div>
          <div className="eyebrow">Position size</div>
          <div className="mt-2 font-display text-[clamp(64px,9vw,96px)] leading-none tracking-tight text-gold tabular-nums">
            {res.ok ? res.lots.toFixed(2) : "0.00"}
            <small className="ml-2 font-mono text-base tracking-normal text-mute">lots</small>
          </div>
        </div>
        <dl className="m-0">
          <Row dt="Amount at risk" dd={res.ok ? money.format(res.riskAmount) : "$0.00"} />
          <Row dt="Position" dd={res.ok ? `${num.format(res.units)} ${cfg.unitName}` : `0 ${cfg.unitName}`} />
          <Row dt={`Target at ${num.format(parse(rr) > 0 ? parse(rr) : 0)}R`} dd={res.ok ? money.format(res.reward) : "$0.00"} />
        </dl>
        <p className="text-xs leading-relaxed text-mute">
          Lot sizes are rounded down to 0.01. Contract size and minimum lot vary by broker, so check yours. Educational use only, not financial advice.
        </p>
      </div>
    </div>
  );
}

function Field({ id, label, value, onChange }: { id: string; label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[13px] text-fg2">
        {label}
      </label>
      <input id={id} className="input" inputMode="decimal" value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

function Row({ dt, dd }: { dt: string; dd: string }) {
  return (
    <div className="flex justify-between gap-4 border-t border-line py-3 text-sm">
      <dt className="text-fg2">{dt}</dt>
      <dd className="m-0 font-mono text-sm font-medium tabular-nums">{dd}</dd>
    </div>
  );
}
