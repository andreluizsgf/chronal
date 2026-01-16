/**
 * Checks if a date is between two other dates.
 *
 * @param date - The date to check
 * @param start - The start of the range
 * @param end - The end of the range
 * @param inclusivity - The inclusivity of the bounds (default: "[]")
 *   - "[]" - inclusive on both ends
 *   - "()" - exclusive on both ends
 *   - "[)" - inclusive start, exclusive end
 *   - "(]" - exclusive start, inclusive end
 * @returns true if date is between start and end
 *
 * @example
 * ```typescript
 * const date = new Date("2024-06-15");
 * const start = new Date("2024-06-01");
 * const end = new Date("2024-06-30");
 *
 * isBetween(date, start, end); // true
 * isBetween(date, start, end, "()"); // true
 * isBetween(start, start, end, "()"); // false (exclusive)
 * ```
 */
export function isBetween(
  date: Date,
  start: Date,
  end: Date,
  inclusivity: "[]" | "()" | "[)" | "(]" = "[]",
): boolean {
  const time = date.getTime();
  const startTime = start.getTime();
  const endTime = end.getTime();

  // Handle reversed bounds
  const [min, max] = startTime < endTime ? [startTime, endTime] : [endTime, startTime];

  switch (inclusivity) {
    case "[]":
      return time >= min && time <= max;
    case "()":
      return time > min && time < max;
    case "[)":
      return time >= min && time < max;
    case "(]":
      return time > min && time <= max;
  }
}
