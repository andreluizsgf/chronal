import { setUnit as _setUnit } from "../lib/set-unit.ts";
import { type Chronal, chronal } from "./chronal.ts";

/**
 * Sets specific units of the date to new values.
 *
 * @param opt - Object with units to set (year, month, day, hour, minute, second, millisecond). Note: months are 0-indexed (0-11)
 * @returns A new Chronal instance with the specified units set
 * @example
 * ```typescript
 * const c = chronal('2024-06-15T14:30:45Z');
 * c.set({ year: 2025, month: 0, day: 1 }); // '2025-01-15T14:30:45Z'
 * ```
 */
export function setUnit(
  this: Chronal,
  opt: Parameters<typeof _setUnit>[1],
): Chronal {
  const newDate = _setUnit(this.date, opt);
  return chronal(newDate, { tz: this.timezone });
}
