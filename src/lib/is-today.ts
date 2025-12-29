/**
 * Checks if a date is today (in UTC).
 * 
 * @param date - The date to check
 * @returns true if the date is today
 * 
 * @example
 * ```typescript
 * isToday(new Date()); // true
 * isToday(new Date("2024-01-01")); // false (unless today is Jan 1, 2024)
 * ```
 */
export function isToday(date: Date): boolean {
  const now = new Date();
  return date.getUTCFullYear() === now.getUTCFullYear() &&
         date.getUTCMonth() === now.getUTCMonth() &&
         date.getUTCDate() === now.getUTCDate();
}
