import type { Unit } from "../types/unit.ts";

/**
 * Returns the start of the specified time unit for the given date.
 * 
 * @param date - The original date.
 * @param unit - The time unit to get the start of ('year' | 'month' | 'day' | 'hour' | 'minute' | 'second').
 * @returns A new Date object set to the start of the specified unit.
 * @example
 * const date = new Date('2024-06-15T14:35:22.500Z');
 * const startOfDay = startOf(date, 'day');
 * console.log(startOfDay.toISOString()); // '2024-06-15T00:00:00.000Z'
 */

export function startOf(date: Date, unit: Unit): Date {
  const time = new Date(date.getTime());

  switch (unit) {
    case 'year': {
      time.setUTCMonth(0, 1);
      time.setUTCHours(0, 0, 0, 0);
      break;
    }
    case 'month': {
      time.setUTCDate(1);
      time.setUTCHours(0, 0, 0, 0);
      break;
    }
    case 'week': {
      const day = time.getUTCDay();
      const diff = (day === 0 ? -6 : 1) - day; // Adjust when day is Sunday
      time.setUTCDate(time.getUTCDate() + diff);
      time.setUTCHours(0, 0, 0, 0);
      break;
    }
    case 'day': {
      time.setUTCHours(0, 0, 0, 0);
      break;
    }
    case 'hour': {
      time.setUTCMinutes(0, 0, 0);
      break;
    }
    case 'minute': {
      time.setUTCSeconds(0, 0);
      break;
    }
    case 'second': {
      time.setUTCMilliseconds(0);
      break;
    }
  }

  return time;
}