import { getDTF } from "../core/dtf.ts";
import { config } from "./config.ts";

type IsTomorrowOptions = {
  tz?: string;
};

/**
 * Checks if a date is tomorrow in the specified timezone.
 *
 * @param date - The date to check
 * @param options - Optional configuration
 *   - tz: IANA timezone (defaults to config.timezone)
 * @returns true if the date is tomorrow
 *
 * @example
 * ```typescript
 * const tomorrow = new Date(Date.now() + 86400000); // +1 day
 * isTomorrow(tomorrow); // true
 * isTomorrow(new Date()); // false
 * 
 * // With timezone
 * isTomorrow(new Date("2024-01-13"), { tz: "America/Sao_Paulo" }); // Check against São Paulo time
 * ```
 */
export function isTomorrow(date: Date, options: IsTomorrowOptions = {}): boolean {
  const timezone = options.tz || config.timezone;
  const now = new Date();

  if (timezone === "UTC") {
    const tomorrow = new Date(Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate() + 1,
    ));

    return date.getUTCFullYear() === tomorrow.getUTCFullYear() &&
      date.getUTCMonth() === tomorrow.getUTCMonth() &&
      date.getUTCDate() === tomorrow.getUTCDate();
  }

  // Timezone-aware comparison
  const formatter = getDTF("en-US", timezone);

  const getPartValue = (parts: Intl.DateTimeFormatPart[], type: string) =>
    parts.find((p) => p.type === type)?.value || "0";

  // +24h from now always lands in tomorrow for any fixed-offset timezone.
  // Date.UTC(localYear, localMonth-1, localDay+1) was wrong: it creates UTC
  // midnight from local date parts, which represents the previous evening in
  // timezones behind UTC (e.g. UTC-3 São Paulo).
  const tomorrowDate = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  const tomorrowParts = formatter.formatToParts(tomorrowDate);

  const tomorrowYear = getPartValue(tomorrowParts, "year");
  const tomorrowMonth = getPartValue(tomorrowParts, "month");
  const tomorrowDay = getPartValue(tomorrowParts, "day");

  const dateParts = formatter.formatToParts(date);
  const dateYear = getPartValue(dateParts, "year");
  const dateMonth = getPartValue(dateParts, "month");
  const dateDay = getPartValue(dateParts, "day");

  return dateYear === tomorrowYear &&
    dateMonth === tomorrowMonth &&
    dateDay === tomorrowDay;
}
