import { isTomorrow as _isTomorrow } from "../lib/is-tomorrow.ts";
import type { Chronal } from "./chronal.ts";

/**
 * Checks if this date is tomorrow (in UTC).
 * 
 * @returns true if this date is tomorrow
 * @example
 * ```typescript
 * const tomorrow = chronal(Date.now() + 86400000); // +1 day
 * tomorrow.isTomorrow(); // true
 * ```
 */
export function isTomorrow(this: Chronal): boolean {
  return _isTomorrow(this.date);
}
