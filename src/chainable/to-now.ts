import { toNow as _toNow } from "../lib/to-now.ts";
import type { Chronal } from "./chronal.ts";

/**
 * Returns a string representing the time from now to the date.
 * This is the inverse of fromNow() - it shows how long until/since a date from the perspective of looking forward to it.
 *
 * @param locale - The locale to use for formatting (default: en-US)
 * @returns A human-readable relative time string
 * @example
 * ```typescript
 * const inFiveMinutes = chronal(Date.now() + 300000);
 * inFiveMinutes.toNow(); // "in 5 minutes"
 * inFiveMinutes.toNow("pt-BR"); // "em 5 minutos"
 * ```
 */
export function toNow(this: Chronal, locale?: string): string {
  return _toNow(this.date, locale);
}
