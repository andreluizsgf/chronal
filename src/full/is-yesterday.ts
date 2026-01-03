import { isYesterday as _isYesterday } from "../lib/is-yesterday.ts";
import type { Chronal } from "./chronal.ts";

/**
 * Checks if this date is yesterday (in UTC).
 * 
 * @returns true if this date is yesterday
 * @example
 * ```typescript
 * const yesterday = chronal(Date.now() - 86400000); // -1 day
 * yesterday.isYesterday(); // true
 * ```
 */
export function isYesterday(this: Chronal): boolean {
  return _isYesterday(this.date);
}
