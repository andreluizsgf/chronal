/**
 * Sets specific units of a date to new values, returning a new Date object.
 * Does not mutate the original date.
 *
 * @param date - The date to modify
 * @param opt - Object with units to set (years, months, days, hours, minutes, seconds, milliseconds)
 * @returns A new Date with the specified units set
 *
 * @example
 * ```typescript
 * const date = new Date("2024-06-15T14:30:45Z");
 *
 * setUnit(date, { years: 2025 }); // 2025-06-15T14:30:45Z
 * setUnit(date, { months: 0 }); // 2024-01-15T14:30:45Z (January)
 * setUnit(date, { days: 20 }); // 2024-06-20T14:30:45Z
 * setUnit(date, { hours: 10, minutes: 0 }); // 2024-06-15T10:00:45Z
 * ```
 */
type SetUnitOptions = {
  year?: number;
  month?: number;
  day?: number;
  hour?: number;
  minute?: number;
  second?: number;
  millisecond?: number;
};

export function setUnit(
  date: Date,
  opt: SetUnitOptions,
): Date {
  const result = new Date(date.getTime());

  if (opt.year !== undefined) result.setUTCFullYear(opt.year);
  if (opt.month !== undefined) result.setUTCMonth(opt.month);
  if (opt.day !== undefined) result.setUTCDate(opt.day);
  if (opt.hour !== undefined) result.setUTCHours(opt.hour);
  if (opt.minute !== undefined) result.setUTCMinutes(opt.minute);
  if (opt.second !== undefined) result.setUTCSeconds(opt.second);
  if (opt.millisecond !== undefined) result.setUTCMilliseconds(opt.millisecond);

  return result;
}
