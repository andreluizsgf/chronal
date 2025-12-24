const monthsCache = new Map<string, string[]>();

export function months(
  locale = "en-US",
  format: "long" | "short" | "narrow" = "long"
): string[] {
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
