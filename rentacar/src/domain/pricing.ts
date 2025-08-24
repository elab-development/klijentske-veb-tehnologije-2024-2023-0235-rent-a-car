export type PriceBreakdown = {
  hours: number; // billed hours (rounded up)
  base: number; // hours * pricePerHour
  discountRate: number; // 0..1
  discount: number; // base * discountRate
  total: number; // base - discount
  days: number; // floor(hours / 24)
  remainingHours: number; // hours % 24
};

function ceilHoursBetween(start: Date, end: Date): number {
  const ms = end.getTime() - start.getTime();
  if (ms <= 0) return 0;
  const hours = ms / (1000 * 60 * 60);
  return Math.ceil(hours);
}

function discountForHours(hours: number): number {
  if (hours >= 168) return 0.25; // 7+ days
  if (hours >= 72) return 0.15; // 3-6 days
  if (hours >= 24) return 0.1; // 1-2 days
  return 0;
}

export function calculateRentalPrice(
  startInput: Date | string,
  endInput: Date | string,
  pricePerHour: number
): PriceBreakdown {
  const start =
    typeof startInput === 'string' ? new Date(startInput) : startInput;
  const end = typeof endInput === 'string' ? new Date(endInput) : endInput;

  if (
    !(start instanceof Date) ||
    isNaN(start.getTime()) ||
    !(end instanceof Date) ||
    isNaN(end.getTime()) ||
    end <= start ||
    pricePerHour <= 0
  ) {
    return {
      hours: 0,
      base: 0,
      discountRate: 0,
      discount: 0,
      total: 0,
      days: 0,
      remainingHours: 0,
    };
  }

  const hours = ceilHoursBetween(start, end);
  const base = hours * pricePerHour;
  const discountRate = discountForHours(hours);
  const discount = +(base * discountRate).toFixed(2);
  const total = +(base - discount).toFixed(2);

  return {
    hours,
    base,
    discountRate,
    discount,
    total,
    days: Math.floor(hours / 24),
    remainingHours: hours % 24,
  };
}

// Currency

export type CurrencyMap = Record<string, string>;

export async function fetchCurrencies(): Promise<CurrencyMap> {
  const res = await fetch('https://api.frankfurter.dev/v1/currencies');
  if (!res.ok) throw new Error(`Currencies HTTP ${res.status}`);
  return res.json();
}

export async function fetchRate(base: string, target: string): Promise<number> {
  if (base === target) return 1;
  const url = `https://api.frankfurter.dev/v1/latest?base=${encodeURIComponent(
    base
  )}&symbols=${encodeURIComponent(target)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Rates HTTP ${res.status}`);
  const data = (await res.json()) as { rates: Record<string, number> };
  const rate = data.rates[target];
  if (typeof rate !== 'number') throw new Error(`No rate for ${target}`);
  return rate;
}

export function convertWithRate(amount: number, rate: number): number {
  return Math.round((amount * rate + Number.EPSILON) * 100) / 100;
}

export function formatCurrency(amount: number, code: string): string {
  try {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: code,
    }).format(amount);
  } catch {
    return `${code} ${amount.toFixed(2)}`;
  }
}
