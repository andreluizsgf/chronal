import { isSame as _isSame } from "../lib/is-same.ts";
import type { Chronal } from "./chronal.ts";
import type { Unit } from "../types/unit.ts";

export function isSame(this: Chronal, date: Date | Chronal, unit: Unit): boolean {
  const compareDate = date instanceof Date ? date : date.date;
  return _isSame(this.date, compareDate, unit);
}
