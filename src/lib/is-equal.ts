/**
 * Checks if two dates are equal (same exact millisecond).
 *
 * @param dateLeft - The first date to compare.
 * @param dateRight - The second date to compare.
 * @returns True if both dates represent the same point in time, false otherwise.
 * @example
 * const date1 = new Date('2024-01-15T12:00:00.000Z');
 * const date2 = new Date('2024-01-15T12:00:00.000Z');
 * console.log(isEqual(date1, date2)); // true
 */

export function isEqual(dateLeft: Date, dateRight: Date): boolean {
  return dateLeft.getTime() === dateRight.getTime();
}
