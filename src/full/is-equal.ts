import { isEqual as _isEqual } from "../lib/is-equal.ts";
import type { Chronal } from "./chronal.ts";

/**
 * Checks if this date is equal to another date (same exact millisecond).
 * 
 * @param date - The date to compare against (can be Date or Chronal)
 * @returns True if both dates represent the same point in time, false otherwise
 * @example
 * ```typescript
 * const c = chronal('2024-01-15T12:00:00.000Z');
 * c.isEqual(new Date('2024-01-15T12:00:00.000Z')); // true
 * ```
 */
export function isEqual(this: Chronal, date: Date | Chronal): boolean {
  const compareDate = date instanceof Date ? date : date.date;
  return _isEqual(this.date, compareDate);
}
