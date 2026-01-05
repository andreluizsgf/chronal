import { getUnit as _getUnit } from "../lib/get-unit.ts";
import type { Chronal } from "./chronal.ts";

/**
 * Extracts a specific unit value from this date.
 *
 * @param unit - The unit to extract ('year', 'month', 'day', 'hour', 'minute', 'second'). Note: 'week' is not supported
 * @returns The numeric value of the specified unit. Note: months are 0-indexed (0-11)
 * @example
 * ```typescript
 * const c = chronal('2024-03-15T12:34:56Z');
 * c.get('year');   // 2024
 * c.get('month');  // 2 (0-indexed, March)
 * c.get('day');    // 15
 * ```
 */
export function getUnit(
  this: Chronal,
  unit: Parameters<typeof _getUnit>[1],
): number {
  return _getUnit(this.date, unit);
}
