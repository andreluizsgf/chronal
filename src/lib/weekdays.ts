const daysCache = new Map<string, string[]>();

/**
 * Returns an array of weekday names for the specified locale and format.
 * 
 * @param locale - The locale to use (default: 'en-US').
 * @param format - The format of weekday names: 'long', 'short', or 'narrow' (default: 'long').
 * @returns An array of 7 weekday names starting from Monday.
 * @example
 * console.log(weekdays('en-US', 'long')); // ['Monday', 'Tuesday', 'Wednesday', ...]
 * console.log(weekdays('en-US', 'short')); // ['Mon', 'Tue', 'Wed', ...]
 * console.log(weekdays('pt-BR', 'long')); // ['segunda-feira', 'terça-feira', ...]
 */

export function weekdays(
  locale = "en-US",
  format: "long" | "short" | "narrow" = "long"
): string[] {
  const key = `${locale}|${format}`;

  const cached = daysCache.get(key);
  if (cached) return cached;

  const fmt = new Intl.DateTimeFormat(locale, {
    weekday: format,
    timeZone: "UTC",
  });

  const result = Array.from({ length: 7 }, (_, i) =>
    fmt.format(new Date(Date.UTC(2024, 0, i + 1)))
  );

  daysCache.set(key, result);
  return result;
}
