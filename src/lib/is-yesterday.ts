/**
 * Checks if a date is yesterday (in UTC).
 *
 * @param date - The date to check
 * @returns true if the date is yesterday
 *
 * @example
 * ```typescript
 * const yesterday = new Date(Date.now() - 86400000); // -1 day
 * isYesterday(yesterday); // true
 * isYesterday(new Date()); // false
 * ```
 */
export function isYesterday(date: Date): boolean {
  const now = new Date();
  const yesterday = new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate() - 1,
  ));

  return date.getUTCFullYear() === yesterday.getUTCFullYear() &&
    date.getUTCMonth() === yesterday.getUTCMonth() &&
    date.getUTCDate() === yesterday.getUTCDate();
}
