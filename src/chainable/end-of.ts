import { endOf as _endOf } from "../lib/end-of.ts";
import { type Chronal, chronal } from "./chronal.ts";
import type { Unit } from "../types/unit.ts";

/**
 * Returns the end of the specified time unit.
 *
 * @param unit - The time unit ('year' | 'month' | 'day' | 'hour' | 'minute' | 'second')
 * @returns A new Chronal instance set to the end of the specified unit (last millisecond)
 * @example
 * ```typescript
 * const c = chronal('2024-06-15T14:35:22.500Z');
 * c.endOf('day'); // '2024-06-15T23:59:59.999Z'
 * ```
 */
export function endOf(this: Chronal, unit: Unit): Chronal {
  const newDate = _endOf(this.date, unit);
  return chronal(newDate);
}
