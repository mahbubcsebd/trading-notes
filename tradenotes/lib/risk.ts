export type InstrumentId = "XAUUSD" | "EURUSD" | "GBPUSD" | "USDJPY";

export type InstrumentConfig = {
  id: InstrumentId;
  stopLabel: string;
  stopStep: number;
  defaultStop: number;
  unitName: string;
  unitsPerLot: number;
  needsPrice: boolean;
  defaultPrice?: number;
  hint: string;
};

export const instruments: Record<InstrumentId, InstrumentConfig> = {
  XAUUSD: {
    id: "XAUUSD", stopLabel: "Stop loss distance ($)", stopStep: 0.5, defaultStop: 5, unitName: "oz", unitsPerLot: 100, needsPrice: false,
    hint: "Gold: 1 lot = 100 oz, so a $1 move = $100 per lot.",
  },
  EURUSD: {
    id: "EURUSD", stopLabel: "Stop loss (pips)", stopStep: 1, defaultStop: 20, unitName: "units", unitsPerLot: 100000, needsPrice: false,
    hint: "EURUSD: 1 pip = $10 per standard lot.",
  },
  GBPUSD: {
    id: "GBPUSD", stopLabel: "Stop loss (pips)", stopStep: 1, defaultStop: 20, unitName: "units", unitsPerLot: 100000, needsPrice: false,
    hint: "GBPUSD: 1 pip = $10 per standard lot.",
  },
  USDJPY: {
    id: "USDJPY", stopLabel: "Stop loss (pips)", stopStep: 1, defaultStop: 20, unitName: "units", unitsPerLot: 100000, needsPrice: true, defaultPrice: 150,
    hint: "USDJPY: 1 pip = 1,000 yen per standard lot, converted to dollars at the current price.",
  },
};

export type RiskInput = {
  instrument: InstrumentId;
  balance: number;
  riskPct: number;
  stop: number;
  rr: number;
  price?: number;
};

export type RiskResult =
  | { ok: false; error: string }
  | { ok: true; riskAmount: number; rawLots: number; lots: number; units: number; reward: number; belowMin: boolean };

/** Dollar value of a one-unit stop move on one standard lot. */
export function valuePerLot(id: InstrumentId, price?: number): number | undefined {
  switch (id) {
    case "XAUUSD":
      return 100;
    case "EURUSD":
    case "GBPUSD":
      return 10;
    case "USDJPY":
      return price && price > 0 ? 1000 / price : undefined;
  }
}

export function positionSize(i: RiskInput): RiskResult {
  const { balance, riskPct, stop, rr } = i;
  if (!(balance > 0 && riskPct > 0 && stop > 0 && rr > 0)) {
    return { ok: false, error: "Enter a positive number in every field." };
  }
  const v = valuePerLot(i.instrument, i.price);
  if (v === undefined) return { ok: false, error: "Enter the current USDJPY price." };
  const riskAmount = (balance * riskPct) / 100;
  const rawLots = riskAmount / (stop * v);
  const lots = Math.floor(rawLots * 100 + 1e-9) / 100; // round down to 0.01
  const units = lots * instruments[i.instrument].unitsPerLot;
  return { ok: true, riskAmount, rawLots, lots, units, reward: riskAmount * rr, belowMin: lots < 0.01 };
}
