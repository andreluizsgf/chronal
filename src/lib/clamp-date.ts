/**
 * Clamps a date between minimum and maximum bounds.
 * If the date is before min, returns min.
 * If the date is after max, returns max.
 * Otherwise returns the date unchanged.
 *
 * @param date - The date to clamp
 * @param min - The minimum allowed date
 * @param max - The maximum allowed date
 * @returns The clamped date
 *
 * @example
 * ```typescript
 * const min = new Date("2024-06-01");
 * const max = new Date("2024-06-30");
 *
 * clampDate(new Date("2024-06-15"), min, max); // June 15 (within bounds)
 * clampDate(new Date("2024-05-15"), min, max); // June 1 (clamped to min)
 * clampDate(new Date("2024-07-15"), min, max); // June 30 (clamped to max)
 * ```
 */
export function clampDate(date: Date, min: Date, max: Date): Date {
  const time = date.getTime();
  const minTime = min.getTime();
  const maxTime = max.getTime();

  if (time < minTime) {
    return min;
  }

  if (time > maxTime) {
    return max;
  }

  return date;
}
