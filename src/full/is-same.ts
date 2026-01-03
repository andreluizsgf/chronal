import { isSame as _isSame } from "../lib/is-same.ts";
import type { Chronal } from "./chronal.ts";

export function isSame(this: Chronal, date: Date | Chronal, unit: Parameters<typeof _isSame>[2]): boolean {
  const compareDate = date instanceof Date ? date : date.date;
  return _isSame(this.date, compareDate, unit);
}
