import { clampDate } from "../lib/clamp-date.ts";
import { chronal, type Chronal } from "./chronal.ts";

export function clamp(this: Chronal, min: Date | Chronal, max: Date | Chronal): Chronal {
  const minDate = min instanceof Date ? min : min.date;
  const maxDate = max instanceof Date ? max : max.date;
  const newDate = clampDate(this.date, minDate, maxDate);
  return chronal(newDate);
}
