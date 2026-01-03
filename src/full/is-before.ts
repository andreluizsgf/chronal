import { isBefore as _isBefore } from "../lib/is-before.ts";
import type { Chronal } from "./chronal.ts";

export function isBefore(this: Chronal, date: Date | Chronal): boolean {
  const compareDate = date instanceof Date ? date : date.date;
  return _isBefore(this.date, compareDate);
}
