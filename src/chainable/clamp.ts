import { clampDate } from "../lib/clamp-date.ts";
import { type Chronal, chronal } from "./chronal.ts";

/**
 * Clamps the date between minimum and maximum bounds.
 * If the date is before min, returns min. If after max, returns max.
 *
 * @param min - The minimum allowed date
 * @param max - The maximum allowed date
 * @returns A new Chronal instance with the date clamped between the bounds
 * @example
 * ```typescript
 * const c = chronal('2024-07-15');
 * const min = new Date('2024-06-01');
 * const max = new Date('2024-06-30');
 * c.clamp(min, max); // June 30 (clamped to max)
 * ```
 */
export function clamp(
  this: Chronal,
  min: Date | Chronal,
  max: Date | Chronal,
): Chronal {
  const minDate = min instanceof Date ? min : min.date;
  const maxDate = max instanceof Date ? max : max.date;
  const newDate = clampDate(this.date, minDate, maxDate);
  return chronal(newDate, { tz: this.timezone });
}
