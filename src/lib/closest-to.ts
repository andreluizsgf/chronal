/**
 * Finds the date in an array that is closest to the target date.
 *
 * @param target - The target date to compare against
 * @param dates - Array of dates to search through
 * @returns The closest date, or null if the array is empty
 *
 * @example
 * ```typescript
 * const target = new Date("2024-06-15");
 * const dates = [
 *   new Date("2024-06-10"),
 *   new Date("2024-06-14"),
 *   new Date("2024-06-20"),
 * ];
 * closestTo(target, dates); // Returns date for June 14
 * ```
 */
export function closestTo(target: Date, dates: Date[]): Date | null {
  if (dates.length === 0) {
    return null;
  }

  const targetTime = target.getTime();
  let closest: Date | null = null;
  let minDiff = Infinity;

  for (const date of dates) {
    const diff = Math.abs(date.getTime() - targetTime);
    if (diff < minDiff) {
      minDiff = diff;
      closest = date;
    }
  }

  return closest;
}
