import { addTime as _addTime } from "../lib/add-time.ts";
import { type Chronal, chronal } from "./chronal.ts";

/**
 * Adds specified time units to the given date.
 *
 * @param opt - The time units to add.
 * @returns A new Chronal object with the specified time units added.
 * @example
 * const date = chronal(new Date('2024-01-31T12:00:00Z'));
 * const newDate = date.add({ years: 1, months: 2, days: 3 });
 * console.log(newDate.date.toISOString()); // '2025-04-03T12:00:00.000Z'
 */

export function add(
  this: Chronal,
  opt: Parameters<typeof _addTime>[1],
): Chronal {
  const newDate = _addTime(this.date, opt);
  return chronal(newDate);
}
