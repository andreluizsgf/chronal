import { isLeapYear as _isLeapYear } from "../lib/is-leap-year.ts";
import type { Chronal } from "./chronal.ts";

export function isLeapYear(this: Chronal): boolean {
  return _isLeapYear(this.date);
}
