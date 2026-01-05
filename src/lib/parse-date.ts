/**
 * Parses a date string into a Date object using an optional format pattern.
 *
 * @param dateString - The date string to parse
 * @param format - Optional format pattern (e.g., "YYYY-MM-DD", "DD/MM/YYYY")
 * @returns A Date object
 * @throws Error if the date string is invalid or doesn't match the format
 *
 * @example
 * ```typescript
 * parseDate("2024-06-15"); // Uses native Date parser
 * parseDate("15/06/2024", "DD/MM/YYYY"); // Parses with custom format
 * parseDate("2024-06-15 14:30:00", "YYYY-MM-DD HH:mm:ss");
 * ```
 */
export function parseDate(dateString: string, format?: string): Date {
  if (!format) {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date");
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

  // Extract values in order
  const getValue = (token: string): number => {
    const index = tokenOrder.indexOf(token);
    return index !== -1 ? parseInt(match[index + 1], 10) : 0;
  };

  // Create date (months are 0-indexed)
  const date = new Date(Date.UTC(
    getValue("YYYY") || 1970,
    (getValue("MM") || 1) - 1,
    getValue("DD") || 1,
    getValue("HH"),
    getValue("mm"),
    getValue("ss"),
  ));

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date");
  }

  return date;
}
