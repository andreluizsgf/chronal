import { daysInMonth as _daysInMonth } from "../lib/days-in-month.ts";
import type { Chronal } from "./chronal.ts";

export function daysInMonth(this: Chronal): number {
  return _daysInMonth(this.date);
}
