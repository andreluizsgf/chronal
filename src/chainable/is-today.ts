import { isToday as _isToday } from "../lib/is-today.ts";
import type { Chronal } from "./chronal.ts";

/**
 * Checks if this date is today in the instance's timezone.
 *
 * @returns true if this date is today
 * @example
 * ```typescript
 * chronal().isToday(); // true
 * chronal('2024-01-01').isToday(); // false (unless today is Jan 1, 2024)
 * 
 * // With timezone
 * chronal('2024-01-12', { tz: 'America/Sao_Paulo' }).isToday(); // Checks in São Paulo time
 * ```
 */
export function isToday(this: Chronal): boolean {
  return _isToday(this.date, { tz: this.timezone });
}
