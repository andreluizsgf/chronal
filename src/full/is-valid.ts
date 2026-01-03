import { isValidDate } from "../lib/is-valid-date.ts";
import type { Chronal } from "./chronal.ts";

/**
 * Checks if this date is valid (not Invalid Date).
 * 
 * @returns true if the date is valid
 * @example
 * ```typescript
 * chronal('2024-06-15').isValid(); // true
 * chronal('invalid').isValid(); // false
 * ```
 */
export function isValid(this: Chronal): boolean {
  return isValidDate(this.date);
}
