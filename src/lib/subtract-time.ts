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
 * const newDate = subtract(date, { years: 1, months: 1 });
 * console.log(newDate.toISOString()); // '2023-02-28T12:00:00.000Z'
 */

export function subtractTime(date: Date, opt: SubOptions): Date {
  return addTime(date, {
    years: opt.years ? -opt.years : undefined,
    months: opt.months ? -opt.months : undefined,
    weeks: opt.weeks ? -opt.weeks : undefined,
    days: opt.days ? -opt.days : undefined,
    hours: opt.hours ? -opt.hours : undefined,
    minutes: opt.minutes ? -opt.minutes : undefined,
    seconds: opt.seconds ? -opt.seconds : undefined,
    milliseconds: opt.milliseconds ? -opt.milliseconds : undefined,
  });
}
