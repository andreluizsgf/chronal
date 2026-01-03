import { DEFAULT_LOCALE } from "./set-default-locale.ts";

/**
 * Returns a string representing how long ago the date was from now.
 * 
 * @param date - The date to compare with now
 * @param locale - The locale to use for formatting (default: DEFAULT_LOCALE)
 * @returns A human-readable relative time string
 * 
 * @example
 * ```typescript
 * const fiveMinutesAgo = new Date(Date.now() - 300000);
 * fromNow(fiveMinutesAgo); // "5 minutes ago"
 * fromNow(fiveMinutesAgo, "pt-BR"); // "há 5 minutos"
 * 
 * const inTwoHours = new Date(Date.now() + 7200000);
 * fromNow(inTwoHours); // "in 2 hours"
 * fromNow(inTwoHours, "es-ES"); // "dentro de 2 horas"
 * ```
 */
export function fromNow(date: Date, locale: string = DEFAULT_LOCALE): string {
  const now = Date.now();
  const diff = now - date.getTime();
  const absDiff = Math.abs(diff);
  
  const seconds = Math.floor(absDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);
  
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
  
  if (seconds < 60) {
    return rtf.format(0, "second");
  }
  
  if (minutes < 60) {
    return rtf.format(diff < 0 ? minutes : -minutes, "minute");
  }
  
  if (hours < 24) {
    return rtf.format(diff < 0 ? hours : -hours, "hour");
  }
  
  if (days < 30) {
    return rtf.format(diff < 0 ? days : -days, "day");
  }
  
  if (months < 12) {
    return rtf.format(diff < 0 ? months : -months, "month");
  }
  
  return rtf.format(diff < 0 ? years : -years, "year");
}
