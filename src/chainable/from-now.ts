import { fromNow as _fromNow } from "../lib/from-now.ts";
import type { Chronal } from "./chronal.ts";

/**
 * Returns a string representing how long ago the date was from now.
 *
 * @param locale - The locale to use for formatting (default: en-US)
 * @returns A human-readable relative time string
 * @example
 * ```typescript
 * const fiveMinutesAgo = chronal(Date.now() - 300000);
 * fiveMinutesAgo.fromNow(); // "5 minutes ago"
 * fiveMinutesAgo.fromNow("pt-BR"); // "há 5 minutos"
 * ```
 */
export function fromNow(this: Chronal, locale?: string): string {
  return _fromNow(this.date, locale);
}
