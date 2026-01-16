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
  // Create date for day 0 of next month, which gives last day of current month
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth();
  return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
}
