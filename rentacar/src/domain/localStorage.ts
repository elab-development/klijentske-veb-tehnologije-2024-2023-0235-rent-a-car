export const STORAGE_KEY = 'cars:filters';

export type Stored = {
  pickup?: string;
  return?: string;
  start?: string;
  end?: string;
};

export function readStored(): Stored {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}
