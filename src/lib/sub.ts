import { add } from "./add.ts";

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
 * 
 * @param date 
 * @param opt - The time units to subtract.
 * @returns A new Date object with the specified time units subtracted.
 * @example
 * const date = new Date('2024-01-31T12:00:00Z');
 * const newDate = sub(date, { years: 1, months: 2, days: 3 });
 * console.log(newDate.toISOString()); // '2023-11-28T12:00:00.000Z'
 */

export function sub(date: Date, opt: SubOptions): Date {
  const out: SubOptions = {};

  if (opt.years)        out.years        = -opt.years;
  if (opt.months)       out.months       = -opt.months;
  if (opt.weeks)        out.weeks        = -opt.weeks;
  if (opt.days)         out.days         = -opt.days;
  if (opt.hours)        out.hours        = -opt.hours;
  if (opt.minutes)     out.minutes     = -opt.minutes;
  if (opt.seconds)     out.seconds     = -opt.seconds;
  if (opt.milliseconds)out.milliseconds= -opt.milliseconds;

  return add(date, out);
}