import type { PluralUnit } from "../types/unit.ts";

/**
 * Calculates the difference between two dates in the specified unit.
 * 
 * @param dateLeft - The first date.
 * @param dateRight - The second date to subtract from the first.
 * @param unit - The unit to express the difference in ('years' | 'months' | 'weeks' | 'days' | 'hours' | 'minutes' | 'seconds').
 * @returns The difference as a number (can be negative if dateLeft is before dateRight).
 * @example
 * const date1 = new Date('2024-01-20T12:00:00Z');
 * const date2 = new Date('2024-01-15T12:00:00Z');
 * console.log(dateDiff(date1, date2, 'days')); // 5
 */

export function dateDiff(dateLeft: Date, dateRight: Date, unit: PluralUnit): number {
  const delta = dateLeft.getTime() - dateRight.getTime();

  switch (unit) {
    case 'years': {
      const yearDiff = dateLeft.getUTCFullYear() - dateRight.getUTCFullYear();
      const adjustedDateRight = new Date(Date.UTC(
        dateRight.getUTCFullYear() + yearDiff,
        dateRight.getUTCMonth(),
        dateRight.getUTCDate(),
        dateRight.getUTCHours(),
        dateRight.getUTCMinutes(),
        dateRight.getUTCSeconds(),
        dateRight.getUTCMilliseconds()
      ));
      if (adjustedDateRight > dateLeft) {
        return yearDiff - 1;
      }
      return yearDiff;
    }
    case 'months': {
      const yearDiff = dateLeft.getUTCFullYear() - dateRight.getUTCFullYear();
      const monthDiff = dateLeft.getUTCMonth() - dateRight.getUTCMonth();
      let totalMonths = yearDiff * 12 + monthDiff;

      const adjustedDateRight = new Date(Date.UTC(
        dateRight.getUTCFullYear() + Math.floor(totalMonths / 12),
        (dateRight.getUTCMonth() + (totalMonths % 12) + 12) % 12,
        dateRight.getUTCDate(),
        dateRight.getUTCHours(),
        dateRight.getUTCMinutes(),
        dateRight.getUTCSeconds(),
        dateRight.getUTCMilliseconds()
      ));
      if (adjustedDateRight > dateLeft) {
        totalMonths -= 1;
      }
      return totalMonths;
    }
    case 'weeks':
      return Math.floor(delta / 604800000); // 7 * 24 * 60 * 60 * 1000
    case 'days':
      return Math.floor(delta / 86400000); // 24 * 60 * 60 * 1000
    case 'hours':
      return Math.floor(delta / 3600000); // 60 * 60 * 1000
    case 'minutes':
      return Math.floor(delta / 60000); // 60 * 1000
    case 'seconds':
      return Math.floor(delta / 1000);
    default:
      throw new Error(`Unsupported unit: ${unit}`);
  }
}