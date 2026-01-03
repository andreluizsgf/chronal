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

export type Chronal = {
  date: Date;
  // Manipulation
  add: typeof add;
  sub: typeof sub;
  startOf: typeof startOf;
  endOf: typeof endOf;
  set: typeof setUnit;
  clamp: typeof clamp;
  // Display
  format: typeof format;
  fromNow: typeof fromNow;
  toNow: typeof toNow;
  // Query
  diff: typeof diff;
  isAfter: typeof isAfter;
  isBefore: typeof isBefore;
  isBetween: typeof isBetween;
  isEqual: typeof isEqual;
  isSame: typeof isSame;
  isToday: typeof isToday;
  isTomorrow: typeof isTomorrow;
  isYesterday: typeof isYesterday;
  isLeapYear: typeof isLeapYear;
  isValid: typeof isValid;
  // Get
  get: typeof getUnit;
  quarter: typeof getQuarter;
  daysInMonth: typeof daysInMonth;
  week: typeof weekOfYear;
};

export const chronal = (date?: Date | string | number): Chronal => {
  const d = date ? new Date(date) : new Date();
  
  return {
    date: d,
    // Manipulation
    add: function(opt) {
      return add.call(this, opt);
    },
    sub: function(opt) {
      return sub.call(this, opt);
    },
    startOf: function(unit) {
      return startOf.call(this, unit);
    },
    endOf: function(unit) {
      return endOf.call(this, unit);
    },
    set: function(opt) {
      return setUnit.call(this, opt);
    },
    clamp: function(min, max) {
      return clamp.call(this, min, max);
    },
    // Display
    format: function(fmt, options) {
      return format.call(this, fmt, options);
    },
    fromNow: function(locale) {
      return fromNow.call(this, locale);
    },
    toNow: function(locale) {
      return toNow.call(this, locale);
    },
    // Query
    diff: function(date, unit) {
      return diff.call(this, date, unit);
    },
    isAfter: function(date) {
      return isAfter.call(this, date);
    },
    isBefore: function(date) {
      return isBefore.call(this, date);
    },
    isBetween: function(start, end, inclusivity) {
      return isBetween.call(this, start, end, inclusivity);
    },
    isEqual: function(date) {
      return isEqual.call(this, date);
    },
    isSame: function(date, unit) {
      return isSame.call(this, date, unit);
    },
    isToday: function() {
      return isToday.call(this);
    },
    isTomorrow: function() {
      return isTomorrow.call(this);
    },
    isYesterday: function() {
      return isYesterday.call(this);
    },
    isLeapYear: function() {
      return isLeapYear.call(this);
    },
    isValid: function() {
      return isValid.call(this);
    },
    // Get
    get: function(unit) {
      return getUnit.call(this, unit);
    },
    quarter: function() {
      return getQuarter.call(this);
    },
    daysInMonth: function() {
      return daysInMonth.call(this);
    },
    week: function() {
      return weekOfYear.call(this);
    }
  };
};