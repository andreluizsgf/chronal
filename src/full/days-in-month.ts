import { daysInMonth as _daysInMonth } from "../lib/days-in-month.ts";
import type { Chronal } from "./chronal.ts";

/**
 * Returns the number of days in the month of this date.
 * 
 * @returns The number of days in the month (28-31)
 * @example
 * ```typescript
 * chronal('2024-02-15').daysInMonth(); // 29 (leap year)
 * chronal('2023-02-15').daysInMonth(); // 28
 * chronal('2024-04-15').daysInMonth(); // 30
 * ```
 */
export function daysInMonth(this: Chronal): number {
  return _daysInMonth(this.date);
}
