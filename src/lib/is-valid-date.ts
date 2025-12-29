/**
 * Checks if a Date object is valid (not Invalid Date).
 * 
 * @param date - The date to check
 * @returns true if the date is valid
 * 
 * @example
 * ```typescript
 * isValidDate(new Date("2024-06-15")); // true
 * isValidDate(new Date("invalid")); // false
 * isValidDate(new Date(NaN)); // false
 * ```
 */
export function isValidDate(date: Date): boolean {
  return !isNaN(date.getTime());
}
