const rtfCache = new Map<string, Intl.RelativeTimeFormat>();

export function getRTF(locale: string, numeric: "auto" | "always") {
  const key = locale + "|" + numeric;
  let rtf = rtfCache.get(key);
  if (!rtf) {
    rtf = new Intl.RelativeTimeFormat(locale, { numeric });
    rtfCache.set(key, rtf);
  }
  return rtf;
}
