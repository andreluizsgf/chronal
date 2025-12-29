/**
 * Returns the number of days in the month of the given date.
 * 
 * @param date - The date to get days in month for
 * @returns The number of days in the month (28-31)
 * 
 * @example
 * ```typescript
 * daysInMonth(new Date("2024-02-15")); // 29 (leap year)
 * daysInMonth(new Date("2023-02-15")); // 28
 * daysInMonth(new Date("2024-04-15")); // 30
 * daysInMonth(new Date("2024-01-15")); // 31
 * ```
 */
export function daysInMonth(date: Date): number {
  // Get the first day of next month, then go back one day
  // This gives us the last day of the current month
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth();
  
  // Create date for first day of next month at midnight
  const nextMonth = new Date(Date.UTC(year, month + 1, 1));
  // Go back one millisecond to get end of current month
  nextMonth.setUTCMilliseconds(-1);
  
  // Return the date which is the day of month
  return nextMonth.getUTCDate();
}
