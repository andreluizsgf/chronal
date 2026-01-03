import { isEqual as _isEqual } from "../lib/is-equal.ts";
import type { Chronal } from "./chronal.ts";

export function isEqual(this: Chronal, date: Date | Chronal): boolean {
  const compareDate = date instanceof Date ? date : date.date;
  return _isEqual(this.date, compareDate);
}
