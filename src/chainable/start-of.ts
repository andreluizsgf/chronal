import { startOf as _startOf } from "../lib/start-of.ts";
import { type Chronal, chronal } from "./chronal.ts";
import { config } from "../lib/config.ts";

/**
 * Returns the start of the specified time unit.
 *
 * @param unit - The time unit ('year' | 'month' | 'day' | 'hour' | 'minute' | 'second')
 * @param timezone - Optional IANA timezone string (e.g., 'America/Sao_Paulo'). Defaults to config.timezone.
 * @returns A new Chronal instance set to the start of the specified unit
 * @example
 * ```typescript
 * const c = chronal('2024-06-15T14:35:22.500Z');
 * c.startOf('day'); // Uses config.timezone
 * c.startOf('day', { tz: 'America/Sao_Paulo' }); // '2024-06-15T03:00:00.000Z'
 * ```
 */
export function startOf(
  this: Chronal,
  unit: Parameters<typeof _startOf>[1],
  opt?: Parameters<typeof _startOf>[2],
): Chronal {
  const options = opt || {};
  if (!options.tz) {
    options.tz = config.timezone;
  }
  const newDate = _startOf(this.date, unit, options);
  return chronal(newDate);
}
