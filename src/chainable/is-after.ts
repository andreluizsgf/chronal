import { isAfter as _isAfter } from "../lib/is-after.ts";
import type { Chronal } from "./chronal.ts";

/**
 * Checks if this date is after another date.
 *
 * @param date - The date to compare against (can be Date or Chronal)
 * @returns True if this date is after the other date, false otherwise
 * @example
 * ```typescript
 * const c = chronal('2024-01-20T12:00:00Z');
 * c.isAfter(new Date('2024-01-15T12:00:00Z')); // true
 * ```
 */
export function isAfter(this: Chronal, date: Date | Chronal): boolean {
  const compareDate = date instanceof Date ? date : date.date;
  return _isAfter(this.date, compareDate);
}
