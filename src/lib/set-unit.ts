/**
 * Sets a specific unit of a date to a new value, returning a new Date object.
 * Does not mutate the original date.
 * 
 * @param date - The date to modify
 * @param unit - The unit to set ('year', 'month', 'day', 'hour', 'minute', 'second', 'millisecond')
 * @param value - The new value for the unit
 * @returns A new Date with the specified unit set
 * 
 * @example
 * ```typescript
 * const date = new Date("2024-06-15T14:30:45Z");
 * 
 * setUnit(date, "year", 2025); // 2025-06-15T14:30:45Z
 * setUnit(date, "month", 0); // 2024-01-15T14:30:45Z (January)
 * setUnit(date, "day", 20); // 2024-06-20T14:30:45Z
 * setUnit(date, "hour", 10); // 2024-06-15T10:30:45Z
 * ```
 */
export function setUnit(
  date: Date,
  unit: "year" | "month" | "day" | "hour" | "minute" | "second" | "millisecond",
  value: number
): Date {
  const result = new Date(date.getTime());
  
  switch (unit) {
    case "year":
      result.setUTCFullYear(value);
      break;
    case "month":
      result.setUTCMonth(value);
      break;
    case "day":
      result.setUTCDate(value);
      break;
    case "hour":
      result.setUTCHours(value);
      break;
    case "minute":
      result.setUTCMinutes(value);
      break;
    case "second":
      result.setUTCSeconds(value);
      break;
    case "millisecond":
      result.setUTCMilliseconds(value);
      break;
  }
  
  return result;
}
