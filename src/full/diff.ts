import { dateDiff } from "../lib/date-diff.ts";
import type { Chronal } from "./chronal.ts";

export function diff(this: Chronal, date: Date | Chronal, unit: Parameters<typeof dateDiff>[2]): number {
  const compareDate = date instanceof Date ? date : date.date;
  return dateDiff(this.date, compareDate, unit);
}
