import { isBetween as _isBetween } from "../lib/is-between.ts";
import type { Chronal } from "./chronal.ts";

/**
 * Checks if this date is between two other dates.
 *
 * @param start - The start of the range (can be Date or Chronal)
 * @param end - The end of the range (can be Date or Chronal)
 * @param inclusivity - The inclusivity of the bounds (default: "[]")
 *   - "[]" - inclusive on both ends
 *   - "()" - exclusive on both ends
 *   - "[)" - inclusive start, exclusive end
 *   - "(]" - exclusive start, inclusive end
 * @returns true if this date is between start and end
 * @example
 * ```typescript
 * const c = chronal('2024-06-15');
 * const start = new Date('2024-06-01');
 * const end = new Date('2024-06-30');
 * c.isBetween(start, end); // true
 * ```
 */
export function isBetween(
  this: Chronal,
  start: Date | Chronal,
  end: Date | Chronal,
  inclusivity: "[]" | "()" | "[)" | "(]" = "[]",
): boolean {
  const startDate = start instanceof Date ? start : start.date;
  const endDate = end instanceof Date ? end : end.date;
  return _isBetween(this.date, startDate, endDate, inclusivity);
}
