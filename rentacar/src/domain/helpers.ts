export const d = (iso: string) => new Date(iso);

export const toDate = (s: string | null): Date | undefined => {
  if (!s) return undefined;
  const d = new Date(s); // "YYYY-MM-DDTHH:mm" -> local time
  return isNaN(d.getTime()) ? undefined : d;
};
