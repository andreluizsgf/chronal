import { isSame as _isSame } from "../lib/is-same.ts";
import type { Chronal } from "./chronal.ts";

/**
 * Checks if this date is in the same time unit as another date (year, month, day, etc.).
 * 
 * @param date - The date to compare against (can be Date or Chronal)
 * @param unit - The unit to compare ('year' | 'month' | 'week' | 'day' | 'hour' | 'minute' | 'second')
 * @returns True if both dates are in the same unit, false otherwise
 * @example
 * ```typescript
 * const c = chronal('2024-06-15T14:30:00Z');
 * c.isSame(new Date('2024-06-15T18:45:00Z'), 'day'); // true (same day)
 * c.isSame(new Date('2024-06-15T18:45:00Z'), 'hour'); // false (different hours)
 * ```
 */
export function isSame(this: Chronal, date: Date | Chronal, unit: Parameters<typeof _isSame>[2]): boolean {
  const compareDate = date instanceof Date ? date : date.date;
  return _isSame(this.date, compareDate, unit);
}
