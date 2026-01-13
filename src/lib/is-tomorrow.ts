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

  const nowParts = formatter.formatToParts(now);
  const getPartValue = (parts: Intl.DateTimeFormatPart[], type: string) =>
    parts.find((p) => p.type === type)?.value || "0";

  const nowYear = parseInt(getPartValue(nowParts, "year"), 10);
  const nowMonth = parseInt(getPartValue(nowParts, "month"), 10);
  const nowDay = parseInt(getPartValue(nowParts, "day"), 10);

  // Calculate tomorrow in the target timezone
  const tomorrowDate = new Date(Date.UTC(nowYear, nowMonth - 1, nowDay + 1));
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
