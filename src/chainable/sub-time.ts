import { subTime as _subTime } from "../lib/sub-time.ts";
import { type Chronal, chronal } from "./chronal.ts";

/**
 * Subtracts specified time units from the date.
 *
 * @param opt - The time units to subtract (years, months, weeks, days, hours, minutes, seconds, milliseconds)
 * @returns A new Chronal instance with the specified time units subtracted
 * @example
 * ```typescript
 * const c = chronal('2024-03-31T12:00:00Z');
 * c.sub({ years: 1, months: 1 }); // '2023-02-28T12:00:00.000Z'
 * ```
 */
export function sub(
  this: Chronal,
  opt: Parameters<typeof _subTime>[1],
): Chronal {
  const newDate = _subTime(this.date, opt);
  return chronal(newDate);
}
