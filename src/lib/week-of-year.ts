/**
 * Returns the week number of the year for the given date (1-53).
 * Uses Sunday as the start of the week (US convention).
 *
 * @param date - The date to get the week number from
 * @returns The week number (1-53)
 *
 * @example
 * ```typescript
 * weekOfYear(new Date("2024-01-01")); // 1
 * weekOfYear(new Date("2024-01-08")); // 2
 * weekOfYear(new Date("2024-12-31")); // 53
 * ```
 */
export function weekOfYear(date: Date): number {
  // Get the start of the year
  const year = date.getUTCFullYear();
  const startOfYear = new Date(Date.UTC(year, 0, 1));

  // Get day of week for start of year (0 = Sunday)
  const startDay = startOfYear.getUTCDay();

  // Get the date's day of year
  const dayOfYear = Math.floor(
    (date.getTime() - startOfYear.getTime()) / 86400000,
  ) + 1;

  // Calculate week number
  // Add startDay to align with week boundaries (Sunday = start of week)
  const weekNum = Math.ceil((dayOfYear + startDay) / 7);

  return weekNum;
}
