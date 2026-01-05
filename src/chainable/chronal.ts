import { add } from "./add.ts";
import { sub } from "./sub-time.ts";
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
import { dateRange } from "./date-range.ts";

/**
 * Chronal object that wraps a Date and provides chainable date manipulation methods.
 * Similar to Day.js API but built on native Date objects with immutable operations.
 */
export type Chronal = {
  /** The underlying Date object */
  date: Date;

  // Manipulation
  /** Adds time units to this date */
  add: typeof add;
  /** Subtracts time units from this date */
  sub: typeof sub;
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
  range: typeof dateRange;
};

/**
 * Creates a Chronal object with chainable date manipulation methods.
 * All methods return new instances, preserving immutability.
 *
 * @param date - Optional Date, string, or timestamp. Defaults to current date/time
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
 * // Create from string
 * const c2 = chronal('2024-06-15T12:00:00Z');
 *
 * // Chain operations
 * chronal('2024-01-15')
 *   .add({ months: 2, days: 10 })
 *   .startOf('day')
 *   .format('YYYY-MM-DD'); // '2024-03-25'
 * ```
 */
export const chronal = (date?: Date | string | number): Chronal => {
  const d = date ? new Date(date) : new Date();

  return {
    date: d,
    // Manipulation
    add: function (opt) {
      return add.call(this, opt);
    },
    sub: function (opt) {
      return sub.call(this, opt);
    },
    startOf: function (unit) {
      return startOf.call(this, unit);
    },
    endOf: function (unit) {
      return endOf.call(this, unit);
    },
    set: function (opt) {
      return setUnit.call(this, opt);
    },
    clamp: function (min, max) {
      return clamp.call(this, min, max);
    },
    // Display
    format: function (fmt, options) {
      return format.call(this, fmt, options);
    },
    fromNow: function (locale) {
      return fromNow.call(this, locale);
    },
    toNow: function (locale) {
      return toNow.call(this, locale);
    },
    // Query
    diff: function (date, unit) {
      return diff.call(this, date, unit);
    },
    isAfter: function (date) {
      return isAfter.call(this, date);
    },
    isBefore: function (date) {
      return isBefore.call(this, date);
    },
    isBetween: function (start, end, inclusivity) {
      return isBetween.call(this, start, end, inclusivity);
    },
    isEqual: function (date) {
      return isEqual.call(this, date);
    },
    isSame: function (date, unit) {
      return isSame.call(this, date, unit);
    },
    isToday: function () {
      return isToday.call(this);
    },
    isTomorrow: function () {
      return isTomorrow.call(this);
    },
    isYesterday: function () {
      return isYesterday.call(this);
    },
    isLeapYear: function () {
      return isLeapYear.call(this);
    },
    isValid: function () {
      return isValid.call(this);
    },
    // Get
    get: function (unit) {
      return getUnit.call(this, unit);
    },
    quarter: function () {
      return getQuarter.call(this);
    },
    daysInMonth: function () {
      return daysInMonth.call(this);
    },
    week: function () {
      return weekOfYear.call(this);
    },
    // Utilities
    range: function (end, step) {
      return dateRange.call(this, end, step);
    },
  };
};
