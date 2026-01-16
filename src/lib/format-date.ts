import { getDTF } from "../core/dtf.ts";
import { months } from "./months.ts";
import { weekdays } from "./weekdays.ts";
import { config } from "./config.ts";

type FormatOptions = {
  tz?: string;
  locale?: string;
};

type Parts = {
  year: number;
  month: number;
  day: number;
  dayOfWeek: number;
  hour: number;
  minute: number;
  second: number;
};

type TokenResolver = (p: Parts, locale: string) => string;

// Inline pad function - smaller minified output
const pad2 = (n: number) => (n < 10 ? "0" + n : "" + n);

const tokenMap: Record<string, TokenResolver> = {
  YYYY: (p) => "" + p.year,
  YY: (p) => ("" + p.year).slice(-2),
  M: (p) => "" + p.month,
  MM: (p) => pad2(p.month),
  MMM: (p, l) => months("short", { locale: l })[p.month - 1],
  MMMM: (p, l) => months("long", { locale: l })[p.month - 1],
  D: (p) => "" + p.day,
  DD: (p) => pad2(p.day),
  ddd: (p, l) => weekdays("short", { locale: l })[p.dayOfWeek],
  dddd: (p, l) => weekdays("long", { locale: l })[p.dayOfWeek],
  H: (p) => "" + p.hour,
  HH: (p) => pad2(p.hour),
  m: (p) => "" + p.minute,
  mm: (p) => pad2(p.minute),
  s: (p) => "" + p.second,
  ss: (p) => pad2(p.second),
};

const tokenRegex = /YYYY|MMMM|MMM|YY|MM|M|dddd|ddd|DD|D|HH|H|mm|m|ss|s/g;

// Cache parsed format strings - store functions/strings directly
type CompiledFormat = Array<string | TokenResolver>;

const formatCache = new Map<string, CompiledFormat>();

function compileFormat(fmt: string): CompiledFormat {
  const cached = formatCache.get(fmt);
  if (cached) return cached;

  const parts: CompiledFormat = [];
  
  // Handle escaped literals by replacing them first
  let processed = fmt;
  const literals: string[] = [];
  
  // Extract literals [text] and replace with placeholders
  if (fmt.includes("[")) {
    processed = fmt.replace(/\[([^\]]+)\]/g, (_, text) => {
      const idx = literals.length;
      literals.push(text);
      return `\x00${idx}\x00`; // Use null bytes as placeholder
    });
  }

  let lastIndex = 0;
  tokenRegex.lastIndex = 0;
  let match;

  while ((match = tokenRegex.exec(processed)) !== null) {
    if (match.index > lastIndex) {
      // Add literal segment (restoring escaped literals)
      let literal = processed.slice(lastIndex, match.index);
      if (literals.length) {
        literal = literal.replace(/\x00(\d+)\x00/g, (_, idx) => literals[+idx]);
      }
      parts.push(literal);
    }
    // Add token resolver function
    parts.push(tokenMap[match[0]]);
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < processed.length) {
    let literal = processed.slice(lastIndex);
    if (literals.length) {
      literal = literal.replace(/\x00(\d+)\x00/g, (_, idx) => literals[+idx]);
    }
    parts.push(literal);
  }

  formatCache.set(fmt, parts);
  return parts;
}

// Fast UTC date parts extraction
function getUTCParts(date: Date): Parts {
  return {
    year: date.getUTCFullYear(),
    month: date.getUTCMonth() + 1,
    day: date.getUTCDate(),
    dayOfWeek: date.getUTCDay(),
    hour: date.getUTCHours(),
    minute: date.getUTCMinutes(),
    second: date.getUTCSeconds(),
  };
}

// Fallback for non-UTC timezones
function getPartsWithTZ(date: Date, locale: string, tz: string): Parts {
  const partsRaw = getDTF(locale, tz).formatToParts(date);
  const p: Parts = {
    year: 0,
    month: 0,
    day: 0,
    dayOfWeek: date.getDay(),
    hour: 0,
    minute: 0,
    second: 0,
  };

  for (const part of partsRaw) {
    const val = +part.value;
    switch (part.type) {
      case "year": p.year = val; break;
      case "month": p.month = val; break;
      case "day": p.day = val; break;
      case "hour": p.hour = val; break;
      case "minute": p.minute = val; break;
      case "second": p.second = val; break;
    }
  }

  return p;
}

/**
 * Formats a date into a string using the specified format pattern.
 *
 * @param date - The date to format.
 * @param fmt - The format string with tokens (YYYY, MM, DD, HH, mm, ss, etc.).
 * @param options - Optional formatting options (locale and timezone).
 * @returns The formatted date string.
 * @example
 * const date = new Date('2024-06-15T14:35:22Z');
 * console.log(formatDate(date, 'YYYY-MM-DD')); // '2024-06-15'
 * console.log(formatDate(date, 'YYYY-MM-DD HH:mm:ss')); // '2024-06-15 14:35:22'
 * console.log(formatDate(date, 'DD/MM/YYYY [at] HH:mm')); // '15/06/2024 at 14:35'
 * console.log(formatDate(date, 'MMMM D, YYYY', { locale: 'en-US' })); // 'June 15, 2024'
 */

export function formatDate(
  date: Date,
  fmt: string,
  options: FormatOptions = {},
): string {
  const locale = options.locale ?? config.locale;
  const tz = options.tz ?? config.timezone;

  const compiled = compileFormat(fmt);
  const p = tz === "UTC" ? getUTCParts(date) : getPartsWithTZ(date, locale, tz);

  let result = "";
  for (const part of compiled) {
    result += typeof part === "string" ? part : part(p, locale);
  }

  return result;
}
