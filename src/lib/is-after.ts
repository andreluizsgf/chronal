/**
 * Checks if the first date is after the second date.
 * 
 * @param dateLeft - The date to compare.
 * @param dateRight - The date to compare against.
 * @returns True if dateLeft is after dateRight, false otherwise.
 * @example
 * const date1 = new Date('2024-01-20T12:00:00Z');
 * const date2 = new Date('2024-01-15T12:00:00Z');
 * console.log(isAfter(date1, date2)); // true
 */

export function isAfter(dateLeft: Date, dateRight: Date): boolean {
  return dateLeft.getTime() > dateRight.getTime();
};