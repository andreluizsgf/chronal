import { dateDiff } from "../lib/date-diff.ts";
import type { Chronal } from "./chronal.ts";

type DiffUnit = 'years' | 'months' | 'weeks' | 'days' | 'hours' | 'minutes' | 'seconds';

export function diff(this: Chronal, date: Date | Chronal, unit: DiffUnit): number {
  const compareDate = date instanceof Date ? date : date.date;
  return dateDiff(this.date, compareDate, unit);
}
