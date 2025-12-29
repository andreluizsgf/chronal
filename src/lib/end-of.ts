import type { Unit } from "../types/unit.ts";

/**
 * Returns the end of the specified time unit for the given date.
 * 
 * @param date - The original date.
 * @param unit - The time unit to get the end of ('year' | 'month' | 'day' | 'hour' | 'minute' | 'second').
 * @returns A new Date object set to the end of the specified unit (last millisecond).
 * @example
 * const date = new Date('2024-06-15T14:35:22.500Z');
 * const endOfDay = endOf(date, 'day');
 * console.log(endOfDay.toISOString()); // '2024-06-15T23:59:59.999Z'
 */

export function endOf(date: Date, unit: Unit): Date {
  const time = new Date(date.getTime());

  switch (unit) {
    case 'year': {
      time.setUTCMonth(11, 31);
      time.setUTCHours(23, 59, 59, 999);
      break;
    }
    case 'month': {
      // Set to next month's first day, then subtract 1 millisecond
      const month = time.getUTCMonth();
      time.setUTCMonth(month + 1, 1);
      time.setUTCHours(0, 0, 0, 0);
      time.setTime(time.getTime() - 1);
      break;
    }
    case 'week': {
      const day = time.getUTCDay();
      const diff = (day === 0 ? 0 : 7) - day; // Adjust when day is Sunday
      time.setUTCDate(time.getUTCDate() + diff);
      time.setUTCHours(23, 59, 59, 999);
      break;
    }
    case 'day': {
      time.setUTCHours(23, 59, 59, 999);
      break;
    }
    case 'hour': {
      time.setUTCMinutes(59, 59, 999);
      break;
    }
    case 'minute': {
      time.setUTCSeconds(59, 999);
      break;
    }
    case 'second': {
      time.setUTCMilliseconds(999);
      break;
    }
  }

  return time;
}