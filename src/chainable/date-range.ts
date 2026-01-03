import { dateRange as _dateRange } from "../lib/date-range.ts";
import { chronal, type Chronal } from "./chronal.ts";

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
 * start.range(end); // Array of 5 Chronal objects (Jan 1-5)
 * start.range(end, { days: 2 }); // Array of 3 Chronal objects (Jan 1, 3, 5)
 * 
 * // Weekly range
 * chronal("2024-01-01").range(new Date("2024-01-31"), { weeks: 1 });
 * ```
 */
export function dateRange(
  this: Chronal,
  end: Date | Chronal,
  step?: Parameters<typeof _dateRange>[2]
): Chronal[] {
  const endDate = end instanceof Date ? end : end.date;
  const dates = _dateRange(this.date, endDate, step);
  return dates.map(date => chronal(date));
}
