import { datesUntil as _datesUntil } from "../lib/dates-until.ts";
import { type Chronal, chronal } from "./chronal.ts";

/**
 * Generates an array of Chronal objects between this date and an end date with a specified step.
 *
 * @param end - The end date (inclusive, can be Date or Chronal)
 * @param step - The step increment (default: { days: 1 })
 * @returns An array of Chronal objects from this date to end
 *
 * @example
 * ```typescript
 * const start = chronal("2024-01-01");
 * const end = new Date("2024-01-05");
 *
 * start.until(end); // Array of 5 Chronal objects (Jan 1-5)
 * start.until(end, { days: 2 }); // Array of 3 Chronal objects (Jan 1, 3, 5)
 *
 * // Weekly range
 * chronal("2024-01-01").until(new Date("2024-01-31"), { weeks: 1 });
 * ```
 */
export function until(
  this: Chronal,
  end: Date | Chronal,
  step?: Parameters<typeof _datesUntil>[2],
): Chronal[] {
  const endDate = end instanceof Date ? end : end.date;
  const dates = _datesUntil(this.date, endDate, step);
  return dates.map((date) => chronal(date, { tz: this.timezone }));
}
