import type { Unit } from "../types/unit.ts";

/**
 * Checks if two dates are in the same time unit (year, month, day, etc.).
 * 
 * @param dateLeft - The first date to compare.
 * @param dateRight - The second date to compare.
 * @param unit - The unit to compare ('year' | 'month' | 'week' | 'day' | 'hour' | 'minute' | 'second').
 * @returns True if both dates are in the same unit, false otherwise.
 * @example
 * const date1 = new Date('2024-06-15T14:30:00Z');
 * const date2 = new Date('2024-06-15T18:45:00Z');
 * console.log(isSame(date1, date2, 'day')); // true (same day)
 * console.log(isSame(date1, date2, 'hour')); // false (different hours)
 */

export function isSame(dateLeft: Date, dateRight: Date, unit: Unit): boolean {
  switch (unit) {
    case 'year':
      return dateLeft.getUTCFullYear() === dateRight.getUTCFullYear();
    case 'month':
      return dateLeft.getUTCFullYear() === dateRight.getUTCFullYear() &&
             dateLeft.getUTCMonth() === dateRight.getUTCMonth();
    case 'week': {
      const startOfWeekLeft = new Date(dateLeft);
      startOfWeekLeft.setUTCDate(dateLeft.getUTCDate() - dateLeft.getUTCDay());
      startOfWeekLeft.setUTCHours(0, 0, 0, 0);

      const startOfWeekRight = new Date(dateRight);
      startOfWeekRight.setUTCDate(dateRight.getUTCDate() - dateRight.getUTCDay());
      startOfWeekRight.setUTCHours(0, 0, 0, 0);

      return startOfWeekLeft.getTime() === startOfWeekRight.getTime();
    }
    case 'day':
      return dateLeft.getUTCFullYear() === dateRight.getUTCFullYear() &&
             dateLeft.getUTCMonth() === dateRight.getUTCMonth() &&
             dateLeft.getUTCDate() === dateRight.getUTCDate();
    case 'hour':
      return dateLeft.getUTCFullYear() === dateRight.getUTCFullYear() &&
             dateLeft.getUTCMonth() === dateRight.getUTCMonth() &&
             dateLeft.getUTCDate() === dateRight.getUTCDate() &&
             dateLeft.getUTCHours() === dateRight.getUTCHours();
    case 'minute':
      return dateLeft.getUTCFullYear() === dateRight.getUTCFullYear() &&
             dateLeft.getUTCMonth() === dateRight.getUTCMonth() &&
             dateLeft.getUTCDate() === dateRight.getUTCDate() &&
             dateLeft.getUTCHours() === dateRight.getUTCHours() &&
             dateLeft.getUTCMinutes() === dateRight.getUTCMinutes();
    case 'second':
      return dateLeft.getUTCFullYear() === dateRight.getUTCFullYear() &&
             dateLeft.getUTCMonth() === dateRight.getUTCMonth() &&
             dateLeft.getUTCDate() === dateRight.getUTCDate() &&
             dateLeft.getUTCHours() === dateRight.getUTCHours() &&
             dateLeft.getUTCMinutes() === dateRight.getUTCMinutes() &&
             dateLeft.getUTCSeconds() === dateRight.getUTCSeconds();
    default:
      return false;
  }
}