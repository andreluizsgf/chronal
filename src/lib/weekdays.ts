const daysCache = new Map<string, string[]>();

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
