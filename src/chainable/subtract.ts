import { subtractTime as _subtract } from "../lib/subtract-time.ts";
import { type Chronal, chronal } from "./chronal.ts";

/**
 * Subtracts specified time units from the date.
 *
 * @param opt - The time units to subtract (years, months, weeks, days, hours, minutes, seconds, milliseconds)
 * @returns A new Chronal instance with the specified time units subtracted
 * @example
 * ```typescript
 * const c = chronal('2024-03-31T12:00:00Z');
 * c.subtract({ years: 1, months: 1 }); // '2023-02-28T12:00:00.000Z'
 * ```
 */
export function subtract(
  this: Chronal,
  opt: Parameters<typeof _subtract>[1],
): Chronal {
  const newDate = _subtract(this.date, opt);
  return chronal(newDate);
}
