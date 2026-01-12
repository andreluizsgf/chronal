import type { Unit } from "../types/unit.ts";

/**
 * Extracts a specific unit value from a date.
 *
 * @param date - The date to extract from.
 * @param unit - The unit to extract ('year', 'month', 'day', 'hour', 'minute', 'second'). Note: 'week' is not supported.
 * @returns The numeric value of the specified unit.
 * @throws Error if 'week' unit is provided.
 * @example
 * const date = new Date('2024-03-15T12:34:56Z');
 * console.log(getUnit(date, 'year'));   // 2024
 * console.log(getUnit(date, 'month'));  // 2 (0-indexed, March)
 * console.log(getUnit(date, 'day'));    // 15
 */

export function getUnit(date: Date, unit: Exclude<Unit, "week"> | "date"): number {
  switch (unit) {
    case "year":
      return date.getUTCFullYear();
    case "month":
      return date.getUTCMonth();
    case 'date':
      return date.getUTCDate();
    case 'day': 
      return date.getUTCDay();
    case "hour":
      return date.getUTCHours();
    case "minute":
      return date.getUTCMinutes();
    case "second":
      return date.getUTCSeconds();
    default:
      throw new Error(`Unsupported unit: ${unit}`);
  }
}
