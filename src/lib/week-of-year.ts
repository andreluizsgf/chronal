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
  const year = date.getUTCFullYear();
  const startOfYear = new Date(Date.UTC(year, 0, 1));
  const dayOfYear = Math.floor((date.getTime() - startOfYear.getTime()) / 86400000) + 1;
  return Math.ceil((dayOfYear + startOfYear.getUTCDay()) / 7);
}
