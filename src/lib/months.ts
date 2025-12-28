import { DEFAULT_LOCALE } from "./set-default-locale.ts";

type MonthsOptions = {
  tz?: string;
  locale?: string;
};

const monthsCache = new Map<string, string[]>();

/**
 * Returns an array of month names for the specified locale and format.
 * 
 * @param locale - The locale to use (default: 'en-US').
 * @param format - The format of month names: 'long', 'short', or 'narrow' (default: 'long').
 * @returns An array of 12 month names starting from January.
 * @example
 * console.log(months('en-US', 'long')); // ['January', 'February', 'March', ...]
 * console.log(months('en-US', 'short')); // ['Jan', 'Feb', 'Mar', ...]
 * console.log(months('pt-BR', 'long')); // ['janeiro', 'fevereiro', 'março', ...]
 */

export function months(
  format: "long" | "short" | "narrow" = "long",
  opt: MonthsOptions = {}
): string[] {
  const locale = opt.locale ?? DEFAULT_LOCALE;
  const key = `${locale}|${format}`;

  const cached = monthsCache.get(key);
  if (cached) return cached;

  const fmt = new Intl.DateTimeFormat(locale, {
    month: format,
    timeZone: "UTC",
  });

  const result = Array.from({ length: 12 }, (_, i) =>
    fmt.format(new Date(Date.UTC(2024, i, 1)))
  );

  monthsCache.set(key, result);
  return result;
}
