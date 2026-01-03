import { isLeapYear as _isLeapYear } from "../lib/is-leap-year.ts";
import type { Chronal } from "./chronal.ts";

/**
 * Checks if the year of this date is a leap year.
 * 
 * A leap year is:
 * - Divisible by 4, except
 * - Not divisible by 100, unless
 * - Also divisible by 400
 * 
 * @returns true if the year is a leap year
 * @example
 * ```typescript
 * chronal('2024-01-01').isLeapYear(); // true
 * chronal('2023-01-01').isLeapYear(); // false
 * chronal('2000-01-01').isLeapYear(); // true (divisible by 400)
 * ```
 */
export function isLeapYear(this: Chronal): boolean {
  return _isLeapYear(this.date);
}
