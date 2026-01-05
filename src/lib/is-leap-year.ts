/**
 * Checks if the year of the given date is a leap year.
 *
 * A leap year is:
 * - Divisible by 4, except
 * - Not divisible by 100, unless
 * - Also divisible by 400
 *
 * @param date - The date to check
 * @returns true if the year is a leap year
 *
 * @example
 * ```typescript
 * isLeapYear(new Date("2024-01-01")); // true
 * isLeapYear(new Date("2023-01-01")); // false
 * isLeapYear(new Date("2000-01-01")); // true (divisible by 400)
 * isLeapYear(new Date("1900-01-01")); // false (divisible by 100 but not 400)
 * ```
 */
export function isLeapYear(date: Date): boolean {
  const year = date.getUTCFullYear();
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}
