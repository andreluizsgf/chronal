import { addTime } from "./add-time.ts";

type SubOptions = {
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
 * Subtracts specified time units from the given date.
 * 
 * @param date - The original date.
 * @param opt - The time units to subtract.
 * @returns A new Date object with the specified time units subtracted.
 * @example
 * const date = new Date('2024-03-31T12:00:00Z');
 * const newDate = subDate(date, { years: 1, months: 1 });
 * console.log(newDate.toISOString()); // '2023-02-28T12:00:00.000Z'
 */

export function subDate(date: Date, opt: SubOptions): Date {
  const out: SubOptions = {};

  if (opt.years)        out.years        = -opt.years;
  if (opt.months)       out.months       = -opt.months;
  if (opt.weeks)        out.weeks        = -opt.weeks;
  if (opt.days)         out.days         = -opt.days;
  if (opt.hours)        out.hours        = -opt.hours;
  if (opt.minutes)     out.minutes     = -opt.minutes;
  if (opt.seconds)     out.seconds     = -opt.seconds;
  if (opt.milliseconds)out.milliseconds= -opt.milliseconds;

  return addTime(date, out);
}