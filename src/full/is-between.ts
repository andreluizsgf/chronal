import { isBetween as _isBetween } from "../lib/is-between.ts";
import type { Chronal } from "./chronal.ts";

type Inclusivity = '[]' | '()' | '[)' | '(]';

export function isBetween(
  this: Chronal, 
  start: Date | Chronal, 
  end: Date | Chronal, 
  inclusivity: Inclusivity = '[]'
): boolean {
  const startDate = start instanceof Date ? start : start.date;
  const endDate = end instanceof Date ? end : end.date;
  return _isBetween(this.date, startDate, endDate, inclusivity);
}
