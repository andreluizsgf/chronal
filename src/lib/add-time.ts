type AddOptions = {
  years?: number;
  months?: number;
  weeks?: number;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
  milliseconds?: number;
};

/**
 * Adds specified time units to the given date.
 *
 * @param date - The original date.
 * @param opt - The time units to add.
 * @returns A new Date object with the specified time units added.
 * @example
 * const date = new Date('2024-01-31T12:00:00Z');
 * const newDate = addTime(date, { years: 1, months: 2, days: 3 });
 * console.log(newDate.toISOString()); // '2025-04-03T12:00:00.000Z'
 */

export function addTime(date: Date, opt: AddOptions): Date {
  let d = new Date(date.getTime());

  // ===== calendar-based (UTC-safe) =====
  if (opt.years || opt.months) {
    const years = opt.years ?? 0;
    const months = opt.months ?? 0;
    const year = d.getUTCFullYear();
    const month = d.getUTCMonth();
    const day = d.getUTCDate();

    // target year/month (allow overflow, normalize manually)
    let targetMonth = month + months;
    const targetYear = year + years + Math.floor(targetMonth / 12);
    targetMonth = ((targetMonth % 12) + 12) % 12;

    // last valid day of target month
    const safeDay = Math.min(day, new Date(Date.UTC(targetYear, targetMonth + 1, 0)).getUTCDate());

    d = new Date(Date.UTC(
      targetYear,
      targetMonth,
      safeDay,
      d.getUTCHours(),
      d.getUTCMinutes(),
      d.getUTCSeconds(),
      d.getUTCMilliseconds(),
    ));
  }

  // ===== time-based =====
  let delta = 0;
  if (opt.milliseconds) delta += opt.milliseconds;
  if (opt.seconds) delta += opt.seconds * 1_000;
  if (opt.minutes) delta += opt.minutes * 60_000;
  if (opt.hours) delta += opt.hours * 3_600_000;
  if (opt.days) delta += opt.days * 86_400_000;
  if (opt.weeks) delta += opt.weeks * 604_800_000;

  if (delta) d = new Date(d.getTime() + delta);

  return d;
}
