import { isBefore as _isBefore } from "../lib/is-before.ts";
import type { Chronal } from "./chronal.ts";

/**
 * Checks if this date is before another date.
 * 
 * @param date - The date to compare against (can be Date or Chronal)
 * @returns True if this date is before the other date, false otherwise
 * @example
 * ```typescript
 * const c = chronal('2024-01-15T12:00:00Z');
 * c.isBefore(new Date('2024-01-20T12:00:00Z')); // true
 * ```
 */
export function isBefore(this: Chronal, date: Date | Chronal): boolean {
  const compareDate = date instanceof Date ? date : date.date;
  return _isBefore(this.date, compareDate);
}
