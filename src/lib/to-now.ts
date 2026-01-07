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
  const now = Date.now();
  const diff = date.getTime() - now;
  const absDiff = Math.abs(diff);

  const seconds = Math.floor(absDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  // Use auto for "now", always for everything else
  if (seconds < 60) {
    const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
    return rtf.format(0, "second");
  }

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "always" });

  if (minutes < 60) {
    return rtf.format(diff > 0 ? minutes : -minutes, "minute");
  }

  if (hours < 24) {
    return rtf.format(diff > 0 ? hours : -hours, "hour");
  }

  if (days < 7) {
    return rtf.format(diff > 0 ? days : -days, "day");
  }

  if (days < 30) {
    return rtf.format(diff > 0 ? weeks : -weeks, "week");
  }

  if (months < 12) {
    return rtf.format(diff > 0 ? months : -months, "month");
  }

  return rtf.format(diff > 0 ? years : -years, "year");
}
