/**
 * Returns the latest date from the given dates.
 * 
 * @param dates - One or more dates to compare.
 * @returns The maximum (latest) date.
 * @throws Error if no dates are provided.
 * @example
 * const date1 = new Date('2024-01-15T12:00:00Z');
 * const date2 = new Date('2024-01-20T12:00:00Z');
 * const date3 = new Date('2024-01-10T12:00:00Z');
 * const latest = maxDate(date1, date2, date3);
 * console.log(latest.toISOString()); // '2024-01-20T12:00:00.000Z'
 */

export function maxDate(...dates: Date[]): Date {
  if (dates.length === 0) {
    throw new Error("maxDate requires at least one date");
  }

  let maxDate = dates[0];
  let maxTime = maxDate.getTime();

  for (let i = 1; i < dates.length; i++) {
    const time = dates[i].getTime();
    if (time > maxTime) {
      maxTime = time;
      maxDate = dates[i];
    }
  }

  return maxDate;
}