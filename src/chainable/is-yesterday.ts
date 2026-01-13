import { isYesterday as _isYesterday } from "../lib/is-yesterday.ts";
import type { Chronal } from "./chronal.ts";

/**
 * Checks if this date is yesterday in the instance's timezone.
 *
 * @returns true if this date is yesterday
 * @example
 * ```typescript
 * const yesterday = chronal(Date.now() - 86400000); // -1 day
 * yesterday.isYesterday(); // true
 * 
 * // With timezone
 * chronal('2024-01-11', { tz: 'America/Sao_Paulo' }).isYesterday(); // Checks in São Paulo time
 * ```
 */
export function isYesterday(this: Chronal): boolean {
  return _isYesterday(this.date, { tz: this.timezone });
}
