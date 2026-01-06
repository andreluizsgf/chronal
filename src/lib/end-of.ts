import type { Unit } from "../types/unit.ts";
import { config } from "./config.ts";
import { startOf } from "./start-of.ts";

type EndOfOptions = {
  tz?: string;
};
/**
 * Returns the end of the specified time unit for the given date.
 *
 * @param date - The original date.
 * @param unit - The time unit to get the end of ('year' | 'month' | 'day' | 'hour' | 'minute' | 'second').
 * @param timezone - Optional IANA timezone string (e.g., 'America/Sao_Paulo', 'Europe/London'). Defaults to 'UTC'.
 * @returns A new Date object set to the end of the specified unit (last millisecond).
 * @example
 * // UTC timezone (default)
 * const date = new Date('2024-06-15T14:35:22.500Z');
 * const endOfDay = endOf(date, 'day');
 * console.log(endOfDay.toISOString()); // '2024-06-15T23:59:59.999Z'
 *
 * @example
 * // With timezone
 * const date = new Date('2024-06-15T14:35:22.500Z');
 * const endOfDay = endOf(date, 'day', 'America/Sao_Paulo'); // GMT-3
 * console.log(endOfDay.toISOString()); // '2024-06-16T02:59:59.999Z' (23:59:59.999 in Sao Paulo)
 */

export function endOf(date: Date, unit: Unit, opt: EndOfOptions = {}): Date {
  const timezone = opt.tz || config.timezone;

  if (timezone === "UTC") {
    // Original UTC-based logic
    const time = new Date(date.getTime());

    switch (unit) {
      case "year": {
        time.setUTCMonth(11, 31);
        time.setUTCHours(23, 59, 59, 999);
        break;
      }
      case "month": {
        const month = time.getUTCMonth();
        time.setUTCMonth(month + 1, 1);
        time.setUTCHours(0, 0, 0, 0);
        time.setTime(time.getTime() - 1);
        break;
      }
      case "week": {
        const day = time.getUTCDay();
        const diff = (day === 0 ? 0 : 7) - day;
        time.setUTCDate(time.getUTCDate() + diff);
        time.setUTCHours(23, 59, 59, 999);
        break;
      }
      case "day": {
        time.setUTCHours(23, 59, 59, 999);
        break;
      }
      case "hour": {
        time.setUTCMinutes(59, 59, 999);
        break;
      }
      case "minute": {
        time.setUTCSeconds(59, 999);
        break;
      }
      case "second": {
        time.setUTCMilliseconds(999);
        break;
      }
    }

    return time;
  } else {
    // Get the start of the current unit
    const start = startOf(date, unit, { tz: timezone });

    // Calculate the next unit boundary
    let nextBoundary: Date;

    switch (unit) {
      case "year": {
        // Add 1 year
        const formatter = new Intl.DateTimeFormat("en-US", {
          timeZone: timezone,
          year: "numeric",
        });
        const year = parseInt(formatter.format(start));
        const nextYear = new Date(start);
        nextYear.setUTCFullYear(year + 1);
        nextBoundary = startOf(nextYear, "year", { tz: timezone });
        break;
      }
      case "month": {
        // Add 1 month
        const nextMonth = new Date(start.getTime() + 32 * 24 * 60 * 60 * 1000);
        nextBoundary = startOf(nextMonth, "month", { tz: timezone });
        break;
      }
      case "week": {
        // Add 7 days
        const nextWeek = new Date(start.getTime() + 7 * 24 * 60 * 60 * 1000);
        nextBoundary = startOf(nextWeek, "week", { tz: timezone });
        break;
      }
      case "day": {
        // Add 1 day
        const nextDay = new Date(start.getTime() + 25 * 60 * 60 * 1000);
        nextBoundary = startOf(nextDay, "day", { tz: timezone });
        break;
      }
      case "hour": {
        // Add 1 hour
        nextBoundary = new Date(start.getTime() + 60 * 60 * 1000);
        break;
      }
      case "minute": {
        // Add 1 minute
        nextBoundary = new Date(start.getTime() + 60 * 1000);
        break;
      }
      case "second": {
        // Add 1 second
        nextBoundary = new Date(start.getTime() + 1000);
        break;
      }
    }

    // Return 1ms before the next boundary
    return new Date(nextBoundary.getTime() - 1);
  }
}
