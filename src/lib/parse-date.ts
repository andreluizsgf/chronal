import { getDTF } from "../core/dtf.ts";
import { config } from "./config.ts";

type ParseDateOptions = {
  format?: string;
  tz?: string;
};

/**
 * Parses a date string into a Date object using an optional format pattern.
 * If timezone is specified, the string is interpreted as local time in that timezone.
 *
 * @param dateString - The date string to parse
 * @param options - Optional format pattern and/or timezone
 * @returns A Date object
 * @throws Error if the date string is invalid or doesn't match the format
 *
 * @example
 * ```typescript
 * parseDate("2024-06-15"); // Uses native Date parser in UTC
 * parseDate("15/06/2024", { format: "DD/MM/YYYY" }); // Parses with custom format
 * parseDate("2024-06-15 14:30:00", { format: "YYYY-MM-DD HH:mm:ss" });
 * parseDate("2025-04-01", { tz: "America/Sao_Paulo" }); // Parse as São Paulo time
 * ```
 */
export function parseDate(
  dateString: string,
  options?: string | ParseDateOptions,
): Date {
  // Backward compatibility: if second arg is a string, it's the format
  const opt = typeof options === "string" ? { format: options } : options || {};
  const format = opt.format;
  const timezone = opt.tz || config.timezone;

  if (!format) {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date");
    }

    // If the string has explicit timezone (Z or offset like +03:00), respect it
    // Only apply config.timezone for date strings without timezone info
    const hasExplicitTimezone = /Z|[+-]\d{2}:\d{2}$/.test(dateString);

    if (!hasExplicitTimezone && timezone !== "UTC") {
      return parseDateInTimezone(date, timezone);
    }

    return date;
  }

  // Build regex by finding and replacing tokens in order
  const tokenOrder: string[] = [];
  let pattern = "";
  let i = 0;

  while (i < format.length) {
    if (format.startsWith("YYYY", i)) {
      pattern += "(\\d{4})";
      tokenOrder.push("YYYY");
      i += 4;
    } else if (format.startsWith("MM", i)) {
      pattern += "(\\d{2})";
      tokenOrder.push("MM");
      i += 2;
    } else if (format.startsWith("DD", i)) {
      pattern += "(\\d{2})";
      tokenOrder.push("DD");
      i += 2;
    } else if (format.startsWith("HH", i)) {
      pattern += "(\\d{2})";
      tokenOrder.push("HH");
      i += 2;
    } else if (format.startsWith("mm", i)) {
      pattern += "(\\d{2})";
      tokenOrder.push("mm");
      i += 2;
    } else if (format.startsWith("ss", i)) {
      pattern += "(\\d{2})";
      tokenOrder.push("ss");
      i += 2;
    } else {
      // Escape special regex character
      const char = format[i];
      if (/[.*+?^${}()|[\]\\]/.test(char)) {
        pattern += "\\" + char;
      } else {
        pattern += char;
      }
      i++;
    }
  }

  const regex = new RegExp(`^${pattern}$`);
  const match = dateString.match(regex);

  if (!match) {
    throw new Error("Invalid date");
  }

  // Extract values in order - cache indices for efficiency
  const getIdx = (t: string) => tokenOrder.indexOf(t);
  const getVal = (t: string) => {
    const i = getIdx(t);
    return i !== -1 ? parseInt(match[i + 1], 10) : 0;
  };

  // Create date (months are 0-indexed)
  const date = new Date(Date.UTC(
    getVal("YYYY") || 1970,
    (getVal("MM") || 1) - 1,
    getVal("DD") || 1,
    getVal("HH"),
    getVal("mm"),
    getVal("ss"),
  ));

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date");
  }

  return date;
}

/**
 * Helper function to parse a date string as local time in a specific timezone.
 * Uses binary search to find the UTC timestamp that produces the desired local time.
 */
function parseDateInTimezone(parsed: Date, timezone: string): Date {
  const formatter = getDTF("en-US", timezone);

  // Extract the intended local time components from the UTC interpretation
  const year = parsed.getUTCFullYear();
  const month = parsed.getUTCMonth() + 1;
  const day = parsed.getUTCDate();
  const hour = parsed.getUTCHours();
  const minute = parsed.getUTCMinutes();
  const second = parsed.getUTCSeconds();
  const ms = parsed.getUTCMilliseconds();

  // Binary search to find UTC time that gives us this local time
  let low = parsed.getTime() - 24 * 60 * 60 * 1000;
  let high = parsed.getTime() + 24 * 60 * 60 * 1000;

  while (high - low > 1) {
    const mid = Math.floor((low + high) / 2);
    const midDate = new Date(mid);
    const midParts = formatter.formatToParts(midDate);

    const midYear = parseInt(
      midParts.find((p) => p.type === "year")?.value || "0",
    );
    const midMonth = parseInt(
      midParts.find((p) => p.type === "month")?.value || "0",
    );
    const midDay = parseInt(
      midParts.find((p) => p.type === "day")?.value || "0",
    );
    const midHour = parseInt(
      midParts.find((p) => p.type === "hour")?.value || "0",
    );
    const midMinute = parseInt(
      midParts.find((p) => p.type === "minute")?.value || "0",
    );
    const midSecond = parseInt(
      midParts.find((p) => p.type === "second")?.value || "0",
    );

    const midTime = midYear * 1e10 + midMonth * 1e8 + midDay * 1e6 +
      midHour * 1e4 + midMinute * 100 + midSecond;
    const targetTime = year * 1e10 + month * 1e8 + day * 1e6 + hour * 1e4 +
      minute * 100 + second;

    if (midTime < targetTime) {
      low = mid;
    } else {
      high = mid;
    }
  }

  const result = new Date(high);
  result.setUTCMilliseconds(ms);
  return result;
}
