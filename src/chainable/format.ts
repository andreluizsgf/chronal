import type { Chronal } from "./chronal.ts";
import { formatDate } from "../lib/format-date.ts";

/**
 * Formats the date into a string using the specified format pattern.
 *
 * @param fmt - The format string with tokens (YYYY, MM, DD, HH, mm, ss, etc.)
 * @param options - Optional formatting options (locale and timezone)
 * @returns The formatted date string
 * @example
 * ```typescript
 * const c = chronal('2024-06-15T14:35:22Z');
 * c.format('YYYY-MM-DD'); // '2024-06-15'
 * c.format('YYYY-MM-DD HH:mm:ss'); // '2024-06-15 14:35:22'
 * c.format('DD/MM/YYYY [at] HH:mm'); // '15/06/2024 at 14:35'
 * c.format('MMMM D, YYYY', { locale: 'en-US' }); // 'June 15, 2024'
 * ```
 */
export function format(
  this: Chronal,
  fmt: Parameters<typeof formatDate>[1],
  options: Parameters<typeof formatDate>[2] = {},
): string {
  if (!options.tz) {
    options.tz = this.timezone;
  }
  return formatDate(this.date, fmt, options);
}
