import type { Unit } from "../types/unit.ts";

/**
 * Compares two dates to see if they are the same in the given unit.
 * 
 * @param dateLeft 
 * @param dateRight 
 * @param unit 
 * 
 * @returns boolean indicating whether the two dates are the same in the given unit
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