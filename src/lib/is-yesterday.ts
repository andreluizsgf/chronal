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

  const getPartValue = (parts: Intl.DateTimeFormatPart[], type: string) =>
    parts.find((p) => p.type === type)?.value || "0";

  // -24h from now always lands in yesterday for any fixed-offset timezone.
  // Date.UTC(localYear, localMonth-1, localDay-1) was wrong: it creates UTC
  // midnight from local date parts, which represents the previous evening in
  // timezones behind UTC (e.g. UTC-3 São Paulo).
  const yesterdayDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
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
