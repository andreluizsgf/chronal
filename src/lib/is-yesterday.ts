import { getDTF } from "../core/dtf.ts";
import { config } from "./config.ts";

type IsYesterdayOptions = {
  tz?: string;
};

/**
 * Checks if a date is yesterday in the specified timezone.
 *
 * @param date - The date to check
 * @param options - Optional configuration
 *   - tz: IANA timezone (defaults to config.timezone)
 * @returns true if the date is yesterday
 *
 * @example
 * ```typescript
 * const yesterday = new Date(Date.now() - 86400000); // -1 day
 * isYesterday(yesterday); // true
 * isYesterday(new Date()); // false
 * 
 * // With timezone
 * isYesterday(new Date("2024-01-11"), { tz: "America/Sao_Paulo" }); // Check against São Paulo time
 * ```
 */
export function isYesterday(date: Date, options: IsYesterdayOptions = {}): boolean {
  const timezone = options.tz || config.timezone;
  const now = new Date();

  if (timezone === "UTC") {
    const yesterday = new Date(Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate() - 1,
    ));

    return date.getUTCFullYear() === yesterday.getUTCFullYear() &&
      date.getUTCMonth() === yesterday.getUTCMonth() &&
      date.getUTCDate() === yesterday.getUTCDate();
  }

  // Timezone-aware comparison
  const formatter = getDTF("en-US", timezone);

  const nowParts = formatter.formatToParts(now);
  const getPartValue = (parts: Intl.DateTimeFormatPart[], type: string) =>
    parts.find((p) => p.type === type)?.value || "0";

  const nowYear = parseInt(getPartValue(nowParts, "year"), 10);
  const nowMonth = parseInt(getPartValue(nowParts, "month"), 10);
  const nowDay = parseInt(getPartValue(nowParts, "day"), 10);

  // Calculate yesterday in the target timezone
  const yesterdayDate = new Date(Date.UTC(nowYear, nowMonth - 1, nowDay - 1));
  const yesterdayParts = formatter.formatToParts(yesterdayDate);

  const yesterdayYear = getPartValue(yesterdayParts, "year");
  const yesterdayMonth = getPartValue(yesterdayParts, "month");
  const yesterdayDay = getPartValue(yesterdayParts, "day");

  const dateParts = formatter.formatToParts(date);
  const dateYear = getPartValue(dateParts, "year");
  const dateMonth = getPartValue(dateParts, "month");
  const dateDay = getPartValue(dateParts, "day");

  return dateYear === yesterdayYear &&
    dateMonth === yesterdayMonth &&
    dateDay === yesterdayDay;
}
