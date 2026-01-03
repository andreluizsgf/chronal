import { dateDiff } from "../lib/date-diff.ts";
import type { Chronal } from "./chronal.ts";

/**
 * Calculates the difference between this date and another date in the specified unit.
 * 
 * @param date - The date to subtract (can be Date or Chronal)
 * @param unit - The unit to express the difference in ('years' | 'months' | 'weeks' | 'days' | 'hours' | 'minutes' | 'seconds')
 * @returns The difference as a number (can be negative if this date is before the other date)
 * @example
 * ```typescript
 * const c = chronal('2024-01-20T12:00:00Z');
 * const other = new Date('2024-01-15T12:00:00Z');
 * c.diff(other, 'days'); // 5
 * ```
 */
export function diff(this: Chronal, date: Date | Chronal, unit: Parameters<typeof dateDiff>[2]): number {
  const compareDate = date instanceof Date ? date : date.date;
  return dateDiff(this.date, compareDate, unit);
}
