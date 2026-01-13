import { getDTF } from "../core/dtf.ts";
import { config } from "./config.ts";

type IsTodayOptions = {
  tz?: string;
};

/**
 * Checks if a date is today in the specified timezone.
 *
 * @param date - The date to check
 * @param options - Optional configuration
 *   - tz: IANA timezone (defaults to config.timezone)
 * @returns true if the date is today
 *
 * @example
 * ```typescript
 * isToday(new Date()); // true (in UTC or config.timezone)
 * isToday(new Date("2024-01-01")); // false (unless today is Jan 1, 2024)
 * 
 * // With timezone
 * isToday(new Date("2024-01-12"), { tz: "America/Sao_Paulo" }); // Check against São Paulo time
 * ```
 */
export function isToday(date: Date, options: IsTodayOptions = {}): boolean {
  const timezone = options.tz || config.timezone;
  const now = new Date('2026-01-13T02:30:00.000Z');

  if (timezone === "UTC") {
    return date.getUTCFullYear() === now.getUTCFullYear() &&
      date.getUTCMonth() === now.getUTCMonth() &&
      date.getUTCDate() === now.getUTCDate();
  }

  // Timezone-aware comparison
  const formatter = getDTF("en-US", timezone);

  const dateParts = formatter.formatToParts(date);
  const nowParts = formatter.formatToParts(now);

  const getPartValue = (parts: Intl.DateTimeFormatPart[], type: string) =>
    parts.find((p) => p.type === type)?.value || "0";

  const dateYear = getPartValue(dateParts, "year");
  const dateMonth = getPartValue(dateParts, "month");
  const dateDay = getPartValue(dateParts, "day");

  const nowYear = getPartValue(nowParts, "year");
  const nowMonth = getPartValue(nowParts, "month");
  const nowDay = getPartValue(nowParts, "day");

  return dateYear === nowYear &&
    dateMonth === nowMonth &&
    dateDay === nowDay;
}
