import { getDTF } from "../core/dtf.ts";
import { DEFAULT_LOCALE } from "./set-default-locale.ts";
import { months } from "./months.ts";

type FormatOptions = {
  tz?: string;
  locale?: string;
};

type Parts = {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
};

type TokenResolver = (p: Parts, locale: string) => string;

// Pre-compute pad functions to avoid repeated padStart calls
const pad2 = (n: number) => n < 10 ? "0" + n : String(n);

const tokenMap: Record<string, TokenResolver> = {
  YYYY: (p) => String(p.year),
  YY: (p) => String(p.year).slice(-2),

  M: (p) => String(p.month),
  MM: (p) => pad2(p.month),
  MMM: (p, l) => months("short", { locale: l })[p.month - 1],
  MMMM: (p, l) => months("long", { locale: l })[p.month - 1],

  D: (p) => String(p.day),
  DD: (p) => pad2(p.day),

  H: (p) => String(p.hour),
  HH: (p) => pad2(p.hour),

  m: (p) => String(p.minute),
  mm: (p) => pad2(p.minute),

  s: (p) => String(p.second),
  ss: (p) => pad2(p.second),
};

const tokenRegex = /YYYY|MMMM|MMM|YY|MM|M|DD|D|HH|H|mm|m|ss|s/g;

// Cache parsed format strings to avoid repeated regex operations
type CompiledFormat = {
  hasLiterals: boolean;
  parts: Array<{ type: "token" | "literal"; value: string }>;
};

const formatCache = new Map<string, CompiledFormat>();

function compileFormat(fmt: string): CompiledFormat {
  const cached = formatCache.get(fmt);
  if (cached) return cached;

  const hasLiterals = fmt.includes("[");
  const parts: Array<{ type: "token" | "literal"; value: string }> = [];

  if (!hasLiterals) {
    // Fast path: no literals, just parse tokens
    let lastIndex = 0;
    tokenRegex.lastIndex = 0;
    let match;

    while ((match = tokenRegex.exec(fmt)) !== null) {
      if (match.index > lastIndex) {
        parts.push({
          type: "literal",
          value: fmt.slice(lastIndex, match.index),
        });
      }
      parts.push({ type: "token", value: match[0] });
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < fmt.length) {
      parts.push({ type: "literal", value: fmt.slice(lastIndex) });
    }
  } else {
    // Slow path: handle escaped literals
    let i = 0;
    let currentLiteral = "";
    let inBracket = false;

    while (i < fmt.length) {
      if (fmt[i] === "[" && !inBracket) {
        if (currentLiteral) {
          // Process current literal for tokens
          let lastIndex = 0;
          tokenRegex.lastIndex = 0;
          let match;

          while ((match = tokenRegex.exec(currentLiteral)) !== null) {
            if (match.index > lastIndex) {
              parts.push({
                type: "literal",
                value: currentLiteral.slice(lastIndex, match.index),
              });
            }
            parts.push({ type: "token", value: match[0] });
            lastIndex = match.index + match[0].length;
          }

          if (lastIndex < currentLiteral.length) {
            parts.push({
              type: "literal",
              value: currentLiteral.slice(lastIndex),
            });
          }
          currentLiteral = "";
        }
        inBracket = true;
        i++;
      } else if (fmt[i] === "]" && inBracket) {
        // Escaped literal content - add as-is
        if (currentLiteral) {
          parts.push({ type: "literal", value: currentLiteral });
          currentLiteral = "";
        }
        inBracket = false;
        i++;
      } else {
        currentLiteral += fmt[i];
        i++;
      }
    }

    if (currentLiteral) {
      let lastIndex = 0;
      tokenRegex.lastIndex = 0;
      let match;

      while ((match = tokenRegex.exec(currentLiteral)) !== null) {
        if (match.index > lastIndex) {
          parts.push({
            type: "literal",
            value: currentLiteral.slice(lastIndex, match.index),
          });
        }
        parts.push({ type: "token", value: match[0] });
        lastIndex = match.index + match[0].length;
      }

      if (lastIndex < currentLiteral.length) {
        parts.push({ type: "literal", value: currentLiteral.slice(lastIndex) });
      }
    }
  }

  const compiled = { hasLiterals, parts };
  formatCache.set(fmt, compiled);
  return compiled;
}

// Fast UTC date parts extraction
function getUTCParts(date: Date): Parts {
  return {
    year: date.getUTCFullYear(),
    month: date.getUTCMonth() + 1,
    day: date.getUTCDate(),
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
    hour: 0,
    minute: 0,
    second: 0,
  };

  for (const part of partsRaw) {
    switch (part.type) {
      case "year":
        p.year = +part.value;
        break;
      case "month":
        p.month = +part.value;
        break;
      case "day":
        p.day = +part.value;
        break;
      case "hour":
        p.hour = +part.value;
        break;
      case "minute":
        p.minute = +part.value;
        break;
      case "second":
        p.second = +part.value;
        break;
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
  const locale = options.locale ?? DEFAULT_LOCALE;
  const tz = options.tz ?? "UTC";

  // Get compiled format (cached)
  const compiled = compileFormat(fmt);

  // Fast path for UTC
  const p = tz === "UTC" ? getUTCParts(date) : getPartsWithTZ(date, locale, tz);

  // Build result string from compiled parts
  let result = "";
  for (const part of compiled.parts) {
    if (part.type === "literal") {
      result += part.value;
    } else {
      result += tokenMap[part.value](p, locale);
    }
  }

  return result;
}
