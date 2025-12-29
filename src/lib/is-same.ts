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
    case 'month': {
      const yl = dateLeft.getUTCFullYear();
      const yr = dateRight.getUTCFullYear();
      return yl === yr && dateLeft.getUTCMonth() === dateRight.getUTCMonth();
    }
    case 'week': {
      // Calculate week start by getting days since Sunday
      const dayLeft = dateLeft.getUTCDay();
      const dayRight = dateRight.getUTCDay();
      
      // Get timestamp at start of each date (midnight UTC)
      const msLeft = Date.UTC(
        dateLeft.getUTCFullYear(),
        dateLeft.getUTCMonth(),
        dateLeft.getUTCDate()
      );
      const msRight = Date.UTC(
        dateRight.getUTCFullYear(),
        dateRight.getUTCMonth(),
        dateRight.getUTCDate()
      );
      
      // Calculate start of week (Sunday) for each date
      const weekStartLeft = msLeft - (dayLeft * 86400000);
      const weekStartRight = msRight - (dayRight * 86400000);
      
      return weekStartLeft === weekStartRight;
    }
    case 'day': {
      const yl = dateLeft.getUTCFullYear();
      const yr = dateRight.getUTCFullYear();
      if (yl !== yr) return false;
      const ml = dateLeft.getUTCMonth();
      const mr = dateRight.getUTCMonth();
      return ml === mr && dateLeft.getUTCDate() === dateRight.getUTCDate();
    }
    case 'hour': {
      const yl = dateLeft.getUTCFullYear();
      const yr = dateRight.getUTCFullYear();
      if (yl !== yr) return false;
      const ml = dateLeft.getUTCMonth();
      const mr = dateRight.getUTCMonth();
      if (ml !== mr) return false;
      const dl = dateLeft.getUTCDate();
      const dr = dateRight.getUTCDate();
      return dl === dr && dateLeft.getUTCHours() === dateRight.getUTCHours();
    }
    case 'minute': {
      const yl = dateLeft.getUTCFullYear();
      const yr = dateRight.getUTCFullYear();
      if (yl !== yr) return false;
      const ml = dateLeft.getUTCMonth();
      const mr = dateRight.getUTCMonth();
      if (ml !== mr) return false;
      const dl = dateLeft.getUTCDate();
      const dr = dateRight.getUTCDate();
      if (dl !== dr) return false;
      const hl = dateLeft.getUTCHours();
      const hr = dateRight.getUTCHours();
      return hl === hr && dateLeft.getUTCMinutes() === dateRight.getUTCMinutes();
    }
    case 'second': {
      const yl = dateLeft.getUTCFullYear();
      const yr = dateRight.getUTCFullYear();
      if (yl !== yr) return false;
      const ml = dateLeft.getUTCMonth();
      const mr = dateRight.getUTCMonth();
      if (ml !== mr) return false;
      const dl = dateLeft.getUTCDate();
      const dr = dateRight.getUTCDate();
      if (dl !== dr) return false;
      const hl = dateLeft.getUTCHours();
      const hr = dateRight.getUTCHours();
      if (hl !== hr) return false;
      const minl = dateLeft.getUTCMinutes();
      const minr = dateRight.getUTCMinutes();
      return minl === minr && dateLeft.getUTCSeconds() === dateRight.getUTCSeconds();
    }
    default:
      return false;
  }
}