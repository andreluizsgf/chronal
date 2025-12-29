/**
 * Checks if a date is tomorrow (in UTC).
 * 
 * @param date - The date to check
 * @returns true if the date is tomorrow
 * 
 * @example
 * ```typescript
 * const tomorrow = new Date(Date.now() + 86400000); // +1 day
 * isTomorrow(tomorrow); // true
 * isTomorrow(new Date()); // false
 * ```
 */
export function isTomorrow(date: Date): boolean {
  const now = new Date();
  const tomorrow = new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate() + 1
  ));
  
  return date.getUTCFullYear() === tomorrow.getUTCFullYear() &&
         date.getUTCMonth() === tomorrow.getUTCMonth() &&
         date.getUTCDate() === tomorrow.getUTCDate();
}
