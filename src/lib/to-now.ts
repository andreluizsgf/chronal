import { getRTF } from "../core/rtf.ts";
import { config } from "./config.ts";

/**
 * Returns a string representing the time from now to the date.
 * This is the inverse of fromNow() - it shows how long until/since a date from the perspective of looking forward to it.
 *
 * @param date - The date to compare with now
 * @param locale - The locale to use for formatting (default: config.locale)
 * @returns A human-readable relative time string
 *
 * @example
 * ```typescript
 * const inFiveMinutes = new Date(Date.now() + 300000);
 * toNow(inFiveMinutes); // "in 5 minutes"
 * toNow(inFiveMinutes, "pt-BR"); // "em 5 minutos"
 *
 * const twoHoursAgo = new Date(Date.now() - 7200000);
 * toNow(twoHoursAgo); // "2 hours ago"
 * toNow(twoHoursAgo, "es-ES"); // "hace 2 horas"
 * ```
 */
export function toNow(date: Date, locale: string = config.locale): string {
  const diff = date.getTime() - Date.now();
  const absDiff = Math.abs(diff);
  const seconds = Math.floor(absDiff / 1000);

  // Use auto for "now", always for everything else
  if (seconds < 60) {
    return getRTF(locale, "auto").format(0, "second");
  }

  const rtf = getRTF(locale, "always");
  const sign = diff > 0 ? 1 : -1;

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return rtf.format(sign * minutes, "minute");
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return rtf.format(sign * hours, "hour");
  }

  const days = Math.floor(hours / 24);
  if (days < 7) {
    return rtf.format(sign * days, "day");
  }

  const weeks = Math.floor(days / 7);
  if (days < 30) {
    return rtf.format(sign * weeks, "week");
  }

  const months = Math.floor(days / 30);
  if (months < 12) {
    return rtf.format(sign * months, "month");
  }

  const years = Math.floor(days / 365);
  return rtf.format(sign * years, "year");
}
