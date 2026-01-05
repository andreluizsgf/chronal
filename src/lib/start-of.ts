import { getDTF } from "../core/dtf.ts";
import type { Unit } from "../types/unit.ts";
import { config } from "./config.ts";

type StartOfOptions = {
  tz?: string;
}

/**
 * Returns the start of the specified time unit for the given date.
 *
 * @param date - The original date.
 * @param unit - The time unit to get the start of ('year' | 'month' | 'day' | 'hour' | 'minute' | 'second').
 * @param timezone - Optional IANA timezone string (e.g., 'America/Sao_Paulo', 'Europe/London'). Defaults to 'UTC'.
 * @returns A new Date object set to the start of the specified unit.
 * @example
 * // UTC timezone (default)
 * const date = new Date('2024-06-15T14:35:22.500Z');
 * const startOfDay = startOf(date, 'day');
 * console.log(startOfDay.toISOString()); // '2024-06-15T00:00:00.000Z'
 * 
 * @example
 * // With timezone
 * const date = new Date('2024-06-15T14:35:22.500Z');
 * const startOfDay = startOf(date, 'day', 'America/Sao_Paulo'); // GMT-3
 * console.log(startOfDay.toISOString()); // '2024-06-15T03:00:00.000Z' (00:00 in Sao Paulo)
 */

export function startOf(date: Date, unit: Unit, opt: StartOfOptions = {}): Date {
  const timezone = opt.tz || config.timezone;
  const time = new Date(date.getTime());

  if (timezone === "UTC") {
    // Original UTC-based logic
    switch (unit) {
      case "year": {
        time.setUTCMonth(0, 1);
        time.setUTCHours(0, 0, 0, 0);
        break;
      }
      case "month": {
        time.setUTCDate(1);
        time.setUTCHours(0, 0, 0, 0);
        break;
      }
      case "week": {
        const day = time.getUTCDay();
        const diff = (day === 0 ? -6 : 1) - day;
        time.setUTCDate(time.getUTCDate() + diff);
        time.setUTCHours(0, 0, 0, 0);
        break;
      }
      case "day": {
        time.setUTCHours(0, 0, 0, 0);
        break;
      }
      case "hour": {
        time.setUTCMinutes(0, 0, 0);
        break;
      }
      case "minute": {
        time.setUTCSeconds(0, 0);
        break;
      }
      case "second": {
        time.setUTCMilliseconds(0);
        break;
      }
    }
  } else {
    // Timezone-aware logic using Intl.DateTimeFormat
    const formatter = getDTF("en-US", timezone);

    const parts = formatter.formatToParts(time);
    const getPart = (type: string) =>
      parts.find((p) => p.type === type)?.value || "0";

    let year = parseInt(getPart("year"));
    let month = parseInt(getPart("month"));
    let day = parseInt(getPart("day"));
    let hour = parseInt(getPart("hour"));
    let minute = parseInt(getPart("minute"));
    let second = parseInt(getPart("second"));

    // Adjust values based on unit
    switch (unit) {
      case "year":
        month = 1;
        day = 1;
        hour = 0;
        minute = 0;
        second = 0;
        break;
      case "month":
        day = 1;
        hour = 0;
        minute = 0;
        second = 0;
        break;
      case "week": {
        // Need to find start of week
        const localDate = new Date(year, month - 1, day);
        const dayOfWeek = localDate.getDay();
        const diff = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek;
        localDate.setDate(day + diff);
        year = localDate.getFullYear();
        month = localDate.getMonth() + 1;
        day = localDate.getDate();
        hour = 0;
        minute = 0;
        second = 0;
        break;
      }
      case "day":
        hour = 0;
        minute = 0;
        second = 0;
        break;
      case "hour":
        minute = 0;
        second = 0;
        break;
      case "minute":
        second = 0;
        break;
      case "second":
        // seconds and milliseconds are already handled
        break;
    }

    // Convert local time to UTC
    // We need to find the UTC timestamp that represents this local time
    const targetStr = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}T${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:${String(second).padStart(2, "0")}`;
    
    // Binary search for the correct UTC time
    // We use a rough estimate to start the search window
    const testDate = new Date(targetStr);

    let low = testDate.getTime() - 24 * 60 * 60 * 1000;
    let high = testDate.getTime() + 24 * 60 * 60 * 1000;

    while (high - low > 1) {
      const mid = Math.floor((low + high) / 2);
      const midDate = new Date(mid);
      const midParts = formatter.formatToParts(midDate);
      
      const midYear = parseInt(midParts.find(p => p.type === "year")?.value || "0");
      const midMonth = parseInt(midParts.find(p => p.type === "month")?.value || "0");
      const midDay = parseInt(midParts.find(p => p.type === "day")?.value || "0");
      const midHour = parseInt(midParts.find(p => p.type === "hour")?.value || "0");
      const midMinute = parseInt(midParts.find(p => p.type === "minute")?.value || "0");
      const midSecond = parseInt(midParts.find(p => p.type === "second")?.value || "0");
      
      const midTime = midYear * 1e10 + midMonth * 1e8 + midDay * 1e6 + midHour * 1e4 + midMinute * 100 + midSecond;
      const targetTime = year * 1e10 + month * 1e8 + day * 1e6 + hour * 1e4 + minute * 100 + second;
      
      if (midTime < targetTime) {
        low = mid;
      } else {
        high = mid;
      }
    }
    
    time.setTime(high);
    time.setUTCMilliseconds(0);
  }

  return time;
}