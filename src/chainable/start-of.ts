import { startOf as _startOf } from "../lib/start-of.ts";
import { type Chronal, chronal } from "./chronal.ts";

/**
 * Returns the start of the specified time unit.
 *
 * @param unit - The time unit ('year' | 'month' | 'day' | 'hour' | 'minute' | 'second')
 * @returns A new Chronal instance set to the start of the specified unit
 * @example
 * ```typescript
 * const c = chronal('2024-06-15T14:35:22.500Z');
 * c.startOf('day'); // '2024-06-15T00:00:00.000Z'
 * ```
 */
export function startOf(
  this: Chronal,
  unit: Parameters<typeof _startOf>[1],
): Chronal {
  const newDate = _startOf(this.date, unit);
  return chronal(newDate);
}
