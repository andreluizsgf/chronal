import { isToday as _isToday } from "../lib/is-today.ts";
import type { Chronal } from "./chronal.ts";

/**
 * Checks if this date is today (in UTC).
 * 
 * @returns true if this date is today
 * @example
 * ```typescript
 * chronal().isToday(); // true
 * chronal('2024-01-01').isToday(); // false (unless today is Jan 1, 2024)
 * ```
 */
export function isToday(this: Chronal): boolean {
  return _isToday(this.date);
}
