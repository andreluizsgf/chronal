import { endOf as _endOf } from "../lib/end-of.ts";
import { type Chronal, chronal } from "./chronal.ts";
import { config } from "../lib/config.ts";

/**
 * Returns the end of the specified time unit.
 *
 * @param unit - The time unit ('year' | 'month' | 'day' | 'hour' | 'minute' | 'second')
 * @param timezone - Optional IANA timezone string (e.g., 'America/Sao_Paulo'). Defaults to config.timezone.
 * @returns A new Chronal instance set to the end of the specified unit (last millisecond)
 * @example
 * ```typescript
 * const c = chronal('2024-06-15T14:35:22.500Z');
 * c.endOf('day'); // Uses config.timezone
 * c.endOf('day', { tz: 'America/Sao_Paulo' }); // '2024-06-16T02:59:59.999Z'
 * ```
 */
export function endOf(this: Chronal, unit: Parameters<typeof _endOf>[1], opt?: Parameters<typeof _endOf>[2]): Chronal {
  const options = opt || {};
  if (!options.tz) {
    options.tz = config.timezone;
  }
  const newDate = _endOf(this.date, unit, options);
  return chronal(newDate);
}
