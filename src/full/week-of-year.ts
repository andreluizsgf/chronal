import { weekOfYear as _weekOfYear } from "../lib/week-of-year.ts";
import type { Chronal } from "./chronal.ts";

/**
 * Returns the week number of the year for this date (1-53).
 * Uses Sunday as the start of the week (US convention).
 * 
 * @returns The week number (1-53)
 * @example
 * ```typescript
 * chronal('2024-01-01').week(); // 1
 * chronal('2024-01-08').week(); // 2
 * ```
 */
export function weekOfYear(this: Chronal): number {
  return _weekOfYear(this.date);
}
