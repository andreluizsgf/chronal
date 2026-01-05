const dtfCache = new Map<string, Intl.DateTimeFormat>();

export function getDTF(locale: string, tz: string) {
  const key = `${locale}|${tz}`;
  let dtf = dtfCache.get(key);
  if (!dtf) {
    dtf = new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: tz,
    });
    dtfCache.set(key, dtf);
  }
  return dtf;
}
