import { isAfter as _isAfter } from "../lib/is-after.ts";
import type { Chronal } from "./chronal.ts";

export function isAfter(this: Chronal, date: Date | Chronal): boolean {
  const compareDate = date instanceof Date ? date : date.date;
  return _isAfter(this.date, compareDate);
}
