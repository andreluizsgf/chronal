/**
 * Returns the earliest date from the given dates.
 *
 * @param dates - One or more dates to compare.
 * @returns The minimum (earliest) date.
 * @throws Error if no dates are provided.
 * @example
 * const date1 = new Date('2024-01-15T12:00:00Z');
 * const date2 = new Date('2024-01-20T12:00:00Z');
 * const date3 = new Date('2024-01-10T12:00:00Z');
 * const earliest = minDate(date1, date2, date3);
 * console.log(earliest.toISOString()); // '2024-01-10T12:00:00.000Z'
 */

export function minDate(...dates: Date[]): Date {
  if (dates.length === 0) {
    throw new Error("minDate requires at least one date");
  }

  let minDate = dates[0];
  let minTime = minDate.getTime();

  for (let i = 1; i < dates.length; i++) {
    const time = dates[i].getTime();
    if (time < minTime) {
      minTime = time;
      minDate = dates[i];
    }
  }

  return minDate;
}
