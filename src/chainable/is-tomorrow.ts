import { isTomorrow as _isTomorrow } from "../lib/is-tomorrow.ts";
import type { Chronal } from "./chronal.ts";

/**
 * Checks if this date is tomorrow in the instance's timezone.
 *
 * @returns true if this date is tomorrow
 * @example
 * ```typescript
 * const tomorrow = chronal(Date.now() + 86400000); // +1 day
 * tomorrow.isTomorrow(); // true
 * 
 * // With timezone
 * chronal('2024-01-13', { tz: 'America/Sao_Paulo' }).isTomorrow(); // Checks in São Paulo time
 * ```
 */
export function isTomorrow(this: Chronal): boolean {
  return _isTomorrow(this.date, { tz: this.timezone });
}
