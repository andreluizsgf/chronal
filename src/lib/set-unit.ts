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
  years?: number;
  months?: number;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
  milliseconds?: number;
};


export function setUnit(
  date: Date,
  opt: SetUnitOptions
): Date {
  const result = new Date(date.getTime());
  
  if (opt.years !== undefined) result.setUTCFullYear(opt.years);
  if (opt.months !== undefined) result.setUTCMonth(opt.months);
  if (opt.days !== undefined) result.setUTCDate(opt.days);
  if (opt.hours !== undefined) result.setUTCHours(opt.hours);
  if (opt.minutes !== undefined) result.setUTCMinutes(opt.minutes);
  if (opt.seconds !== undefined) result.setUTCSeconds(opt.seconds);
  if (opt.milliseconds !== undefined) result.setUTCMilliseconds(opt.milliseconds);
  
  return result;
}
