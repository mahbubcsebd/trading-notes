'use client';

import { useState, use } from 'react';
import { CONTRACT_SIZES, calculatePosition, calcRR } from '@/lib/risk';
import { dictionaries, Locale } from '@/lib/dictionaries';

const INSTRUMENTS = Object.keys(CONTRACT_SIZES);

export default function RiskCalculatorPage({ params }: { params: Promise<{ lang?: string }> }) {
  const { lang = 'bn' } = use(params);
  const t = dictionaries[lang as Locale].riskCalc;

  const [form, setForm] = useState({
    accountBalance: 10000,
    riskPercent: 1,
    entry: '',
    stopLoss: '',
    target: '',
    pair: 'XAUUSD',
    contractSize: '',
    lotStep: 0.01,
  });

  const [result, setResult] = useState<any>(null);

  function update(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function calculate(e: React.FormEvent) {
    e.preventDefault();
    const res = calculatePosition({
      accountBalance: Number(form.accountBalance),
      riskPercent: Number(form.riskPercent),
      entry: Number(form.entry),
      stopLoss: Number(form.stopLoss),
      pair: form.pair,
      contractSize: form.contractSize ? Number(form.contractSize) : undefined,
      lotStep: Number(form.lotStep),
    });

    const rr = form.target
      ? calcRR(Number(form.entry), Number(form.stopLoss), Number(form.target))
      : null;

    setResult({ ...res, rr });
  }

  const cs = form.contractSize || CONTRACT_SIZES[form.pair] || 100000;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">{t.title}</h1>
        <p className="text-muted-foreground text-sm">
          {t.desc}
        </p>
      </div>

      <form onSubmit={calculate} className="space-y-5">
        <div className="rounded-xl border border-border bg-card p-5 space-y-4">
          <h2 className="text-sm font-semibold text-foreground">{t.account}</h2>
          <div className="grid grid-cols-2 gap-4">
            <label className="block">
              <span className="text-xs text-muted-foreground mb-1 block">{t.balance}</span>
              <input
                type="number"
                value={form.accountBalance}
                onChange={(e) => update('accountBalance', e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-mono text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                min="1"
                step="100"
                required
              />
            </label>
            <label className="block">
              <span className="text-xs text-muted-foreground mb-1 block">{t.risk}</span>
              <input
                type="number"
                value={form.riskPercent}
                onChange={(e) => update('riskPercent', e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-mono text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                min="0.1"
                max="10"
                step="0.1"
                required
              />
            </label>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-5 space-y-4">
          <h2 className="text-sm font-semibold text-foreground">{t.tradeDetails}</h2>
          <div className="grid grid-cols-3 gap-4">
            <label className="block">
              <span className="text-xs text-muted-foreground mb-1 block">{t.entry}</span>
              <input
                type="number"
                value={form.entry}
                onChange={(e) => update('entry', e.target.value)}
                placeholder={form.pair === 'XAUUSD' ? '2300.00' : '1.08500'}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-mono text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                step="any"
                required
              />
            </label>
            <label className="block">
              <span className="text-xs text-muted-foreground mb-1 block">{t.sl}</span>
              <input
                type="number"
                value={form.stopLoss}
                onChange={(e) => update('stopLoss', e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-mono text-bear focus:outline-none focus:ring-1 focus:ring-ring"
                step="any"
                required
              />
            </label>
            <label className="block">
              <span className="text-xs text-muted-foreground mb-1 block">{t.target}</span>
              <input
                type="number"
                value={form.target}
                onChange={(e) => update('target', e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-mono text-bull focus:outline-none focus:ring-1 focus:ring-ring"
                step="any"
              />
            </label>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <label className="block">
              <span className="text-xs text-muted-foreground mb-1 block">{t.instrument}</span>
              <select
                value={form.pair}
                onChange={(e) => update('pair', e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-mono text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              >
                {INSTRUMENTS.map((inst) => (
                  <option key={inst} value={inst}>{inst}</option>
                ))}
                <option value="CUSTOM">CUSTOM</option>
              </select>
            </label>
            <label className="block">
              <span className="text-xs text-muted-foreground mb-1 block">{t.contractSize}</span>
              <input
                type="number"
                value={form.contractSize}
                onChange={(e) => update('contractSize', e.target.value)}
                placeholder={String(cs)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-mono text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                step="1"
              />
            </label>
            <label className="block">
              <span className="text-xs text-muted-foreground mb-1 block">{t.lotStep}</span>
              <input
                type="number"
                value={form.lotStep}
                onChange={(e) => update('lotStep', e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-mono text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                step="0.01"
                min="0.01"
              />
            </label>
          </div>

          <p className="text-xs text-muted-foreground">
            {t.contractWarning}
          </p>
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-gold text-background font-semibold text-sm hover:bg-gold/90 transition-colors"
        >
          {t.calculate}
        </button>
      </form>

      {/* Results */}
      {result && (
        <div className="mt-6 rounded-xl border border-gold/30 bg-gold/5 overflow-hidden">
          <div className="px-5 py-3 border-b border-gold/20 bg-gold/10">
            <p className="text-sm font-semibold text-gold">{t.results}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
            {[
              { label: t.riskAmount, value: `$${result.riskAmount}`, color: 'text-bear' },
              { label: t.stopDistance, value: `${result.stopDistancePips} pips`, color: 'text-foreground' },
              { label: t.lotSize, value: result.lotsRounded, color: 'text-gold font-bold' },
              { label: t.exactLots, value: result.lots, color: 'text-muted-foreground' },
              { label: t.pipValue, value: `$${result.pipValuePerLot}`, color: 'text-foreground' },
              {
                label: t.rr,
                value: result.rr ? `1:${result.rr.rr}` : '—',
                color: result.rr && Number(result.rr.rr) >= 2 ? 'text-bull' : 'text-muted-foreground',
              },
            ].map(({ label, value, color }) => (
              <div key={label} className="px-5 py-4 text-center">
                <p className="text-xs text-muted-foreground mb-1">{label}</p>
                <p className={`font-mono font-semibold text-lg ${color}`}>{value}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
