import type { Car } from '../domain/rentals';

export type CountMap = Record<string, number>;

export function countBookingsPerModel(cars: Car[]): CountMap {
  const acc: CountMap = {};
  for (const c of cars) {
    const k = c.model;
    acc[k] = (acc[k] || 0) + c.bookings.length;
  }
  return acc;
}

export function countBookingsPerMake(cars: Car[]): CountMap {
  const acc: CountMap = {};
  for (const c of cars) {
    acc[c.make] = (acc[c.make] || 0) + c.bookings.length;
  }
  return acc;
}

export function countBookingsPerTransmission(cars: Car[]): CountMap {
  const acc: CountMap = {};
  for (const c of cars) {
    const k = c.transmission;
    acc[k] = (acc[k] || 0) + c.bookings.length;
  }
  return acc;
}

export function countBookingsByMonth(cars: Car[]): CountMap {
  const acc: CountMap = {};
  for (const c of cars) {
    for (const b of c.bookings) {
      const d = b.start instanceof Date ? b.start : new Date(b.start);
      const y = d.getUTCFullYear();
      const m = String(d.getUTCMonth() + 1).padStart(2, '0');
      const key = `${y}-${m}`;
      acc[key] = (acc[key] || 0) + 1;
    }
  }
  return acc;
}

export function topN(counts: CountMap, n: number): [string, number][] {
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n);
}

export const BLUE = '#3b82f6';
export const SKY = '#0ea5e9';
export const INDIGO = '#6366f1';
export const EMERALD = '#10b981';
export const AMBER = '#f59e0b';
export const ROSE = '#f43f5e';
export const TEAL = '#14b8a6';
export const VIOLET = '#8b5cf6';

export const PIE_COLORS = [
  BLUE,
  EMERALD,
  AMBER,
  ROSE,
  SKY,
  TEAL,
  VIOLET,
  INDIGO,
];
