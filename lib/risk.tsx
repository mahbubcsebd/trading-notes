/**
 * Risk calculator for Forex/XAUUSD position sizing.
 * Pure functions — no side effects, no imports.
 */

/**
 * Contract sizes per instrument (units per 1.0 standard lot)
 * @type {Record<string, number>}
 */
export const CONTRACT_SIZES = {
  XAUUSD: 100,       // 100 troy oz per lot → $1 move = $100/lot
  EURUSD: 100000,
  GBPUSD: 100000,
  USDJPY: 100000,
  AUDUSD: 100000,
  USDCAD: 100000,
  USDCHF: 100000,
  NZDUSD: 100000,
};

/**
 * Calculate pip value in account currency (USD) for a given lot.
 * For JPY pairs the pip is 0.01, for others 0.0001.
 * @param {string} pair
 * @param {number} lots
 * @param {number} [currentPrice] - required for JPY pairs
 * @returns {number} pip value per lot in USD
 */
export function pipValue(pair, lots = 1, currentPrice = 1) {
  const isJPY = pair.endsWith('JPY');
  const pipSize = isJPY ? 0.01 : 0.0001;
  const contractSize = CONTRACT_SIZES[pair] ?? 100000;

  if (pair === 'XAUUSD') {
    // Gold: 1 pip = $0.01 move; 1.0 lot = 100 oz; pip value = 100 * 0.01 = $1
    return lots * 100 * 0.01;
  }

  if (pair.startsWith('USD')) {
    // Quote currency IS USD → pip value = pipSize × contractSize / price
    return (pipSize / currentPrice) * contractSize * lots;
  }

  // Base is NOT USD and quote IS USD (EURUSD, GBPUSD, AUDUSD, etc.)
  return pipSize * contractSize * lots;
}

/**
 * Calculate lot size given risk parameters.
 * @param {{
 *   accountBalance: number,
 *   riskPercent: number,
 *   entry: number,
 *   stopLoss: number,
 *   pair: string,
 *   contractSize?: number,
 *   lotStep?: number,
 * }} params
 * @returns {{
 *   riskAmount: number,
 *   stopDistancePips: number,
 *   stopDistancePrice: number,
 *   lots: number,
 *   lotsRounded: number,
 *   pipValuePerLot: number,
 * }}
 */
export function calculatePosition({
  accountBalance,
  riskPercent,
  entry,
  stopLoss,
  pair = 'XAUUSD',
  contractSize,
  lotStep = 0.01,
}) {
  const riskAmount = (accountBalance * riskPercent) / 100;
  const stopDistancePrice = Math.abs(entry - stopLoss);

  const isJPY = pair.endsWith('JPY');
  const pipSize = isJPY ? 0.01 : (pair === 'XAUUSD' ? 0.01 : 0.0001);
  const stopDistancePips = stopDistancePrice / pipSize;

  const cs = contractSize ?? (CONTRACT_SIZES[pair] ?? 100000);
  // lots = riskAmount / (stopDistanceInPrice × contractSize)
  const lots = riskAmount / (stopDistancePrice * cs);
  const lotsRounded = Math.floor(lots / lotStep) * lotStep;
  const pipValuePerLot = pipValue(pair, 1, entry);

  return {
    riskAmount: Math.round(riskAmount * 100) / 100,
    stopDistancePips: Math.round(stopDistancePips * 10) / 10,
    stopDistancePrice: Math.round(stopDistancePrice * 100) / 100,
    lots: Math.round(lots * 10000) / 10000,
    lotsRounded: Math.round(lotsRounded * 10000) / 10000,
    pipValuePerLot: Math.round(pipValuePerLot * 100) / 100,
  };
}

/**
 * Calculate Risk:Reward ratio.
 * @param {number} entry
 * @param {number} stopLoss
 * @param {number} target
 * @returns {{ risk: number, reward: number, rr: string }}
 */
export function calcRR(entry, stopLoss, target) {
  const risk = Math.abs(entry - stopLoss);
  const reward = Math.abs(target - entry);
  const rr = risk > 0 ? reward / risk : 0;
  return {
    risk: Math.round(risk * 100) / 100,
    reward: Math.round(reward * 100) / 100,
    rr: rr.toFixed(2),
  };
}
