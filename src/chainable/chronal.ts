import { add } from "./add.ts";
import { subtract } from "./subtract.ts";
import { format } from "./format.ts";
import { startOf } from "./start-of.ts";
import { endOf } from "./end-of.ts";
import { setUnit } from "./set-unit.ts";
import { diff } from "./diff.ts";
import { fromNow } from "./from-now.ts";
import { toNow } from "./to-now.ts";
import { isAfter } from "./is-after.ts";
import { isBefore } from "./is-before.ts";
import { isBetween } from "./is-between.ts";
import { isEqual } from "./is-equal.ts";
import { isSame } from "./is-same.ts";
import { isToday } from "./is-today.ts";
import { isTomorrow } from "./is-tomorrow.ts";
import { isYesterday } from "./is-yesterday.ts";
import { isLeapYear } from "./is-leap-year.ts";
import { isValid } from "./is-valid.ts";
import { getUnit } from "./get-unit.ts";
import { getQuarter } from "./get-quarter.ts";
import { daysInMonth } from "./days-in-month.ts";
import { weekOfYear } from "./week-of-year.ts";
import { clamp } from "./clamp.ts";
import { until } from "./dates-until.ts";
import { parseDate } from "../lib/parse-date.ts";
import { setChronalConfig } from "../lib/config.ts";

/**
 * Chronal object that wraps a Date and provides chainable date manipulation methods.
 * Similar to Day.js API but built on native Date objects with immutable operations.
 */
export type Chronal = {
  /** The underlying Date object */
  date: Date;
  /** The timezone for this instance (optional, defaults to config.timezone) */
  timezone?: string;

  // Manipulation
  /** Adds time units to this date */
  add: typeof add;
  /** Subtracts time units from this date */
  subtract: typeof subtract;
  /** Returns the start of a time unit */
  startOf: typeof startOf;
  /** Returns the end of a time unit */
  endOf: typeof endOf;
  /** Sets specific date units */
  set: typeof setUnit;
  /** Clamps date between min and max bounds */
  clamp: typeof clamp;

  // Display
  /** Formats the date as a string */
  format: typeof format;
  /** Returns relative time from now (e.g., "5 minutes ago") */
  fromNow: typeof fromNow;
  /** Returns relative time to now (e.g., "in 5 minutes") */
  toNow: typeof toNow;

  // Query
  /** Calculates difference between dates */
  diff: typeof diff;
  /** Checks if after another date */
  isAfter: typeof isAfter;
  /** Checks if before another date */
  isBefore: typeof isBefore;
  /** Checks if between two dates */
  isBetween: typeof isBetween;
  /** Checks if equal to another date */
  isEqual: typeof isEqual;
  /** Checks if in same time unit as another date */
  isSame: typeof isSame;
  /** Checks if date is today */
  isToday: typeof isToday;
  /** Checks if date is tomorrow */
  isTomorrow: typeof isTomorrow;
  /** Checks if date is yesterday */
  isYesterday: typeof isYesterday;
  /** Checks if year is a leap year */
  isLeapYear: typeof isLeapYear;
  /** Checks if date is valid */
  isValid: typeof isValid;

  // Get
  /** Gets a specific date unit value */
  get: typeof getUnit;
  /** Gets the quarter of the year (1-4) */
  quarter: typeof getQuarter;
  /** Gets the number of days in the month */
  daysInMonth: typeof daysInMonth;
  /** Gets the week number of the year */
  week: typeof weekOfYear;

  // Utilities
  /** Generates an array of dates between this date and end date */
  until: typeof until;
};

/**
 * Creates a Chronal object with chainable date manipulation methods.
 * All methods return new instances, preserving immutability.
 *
 * @param date - Optional Date, string, or timestamp. Defaults to current date/time
 * @param options - Optional configuration including timezone
 * @returns A Chronal object with the date and chainable methods
 *
 * @example
 * ```typescript
 * // Create from current time
 * const now = chronal();
 *
 * // Create from Date
 * const c = chronal(new Date('2024-06-15'));
 *
 * // Create from string (respects config.timezone)
 * const c2 = chronal('2024-06-15T12:00:00Z');
 *
 * // Create with specific timezone
 * const c3 = chronal('2024-06-15', { tz: 'America/Sao_Paulo' });
 *
 * // Chain operations
 * chronal('2024-01-15')
 *   .add({ months: 2, days: 10 })
 *   .startOf('day')
 *   .format('YYYY-MM-DD'); // '2024-03-25'
 * ```
 */

type ChronalOptions = {
  tz?: string;
};

type ChronalFactory = {
  (date?: Date | string | number | null, options?: ChronalOptions): Chronal;
  config: typeof setChronalConfig;
};

export const chronal: ChronalFactory = (
  date?: Date | string | number | null,
  options?: ChronalOptions,
): Chronal => {
  let d: Date;
  const timezone = options?.tz;

  if (date === null || date === undefined) {
    d = new Date();
  } else if (typeof date === "string") {
    // Parse string with timezone awareness from options or config
    d = parseDate(date, { tz: timezone });
  } else {
    d = new Date(date);
  }

  const instance = {
    date: d,
    timezone,
    add,
    subtract,
    startOf,
    endOf,
    set: setUnit,
    clamp,
    format,
    fromNow,
    toNow,
    diff,
    isAfter,
    isBefore,
    isBetween,
    isEqual,
    isSame,
    isToday,
    isTomorrow,
    isYesterday,
    isLeapYear,
    isValid,
    get: getUnit,
    quarter: getQuarter,
    daysInMonth,
    week: weekOfYear,
    until,
  };
  
  return instance;
};

chronal.config = setChronalConfig;
