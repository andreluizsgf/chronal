import { config } from "./config.ts";

type WeekdaysOptions = {
  locale?: string;
};

const daysCache = new Map<string, string[]>();

/**
 * Returns an array of weekday names for the specified locale and format.
 *
 * @param locale - The locale to use (default: 'en-US').
 * @param format - The format of weekday names: 'long', 'short', or 'narrow' (default: 'long').
 * @returns An array of 7 weekday names starting from Sunday.
 * @example
 * console.log(weekdays('en-US', 'long')); // ['Sunday', 'Monday', 'Tuesday', ...]
 * console.log(weekdays('en-US', 'short')); // ['Sun', 'Mon', 'Tue', ...]
 * console.log(weekdays('pt-BR', 'long')); // ['domingo', 'segunda-feira', 'terça-feira', ...]
 */

export function weekdays(
  format: "long" | "short" | "narrow" = "long",
  opt: WeekdaysOptions = {},
): string[] {
  const locale = opt.locale ?? config.locale;
  const key = `${locale}|${format}`;

  const cached = daysCache.get(key);
  if (cached) return cached;

  const fmt = new Intl.DateTimeFormat(locale, {
    weekday: format,
    timeZone: "UTC",
  });

  const result = Array.from(
    { length: 7 },
    (_, i) => fmt.format(new Date(Date.UTC(2017, 0, i + 1))).replace(/\.$/, ""),
  );

  daysCache.set(key, result);
  return result;
}
