import { isToday as _isToday } from "../lib/is-today.ts";
import type { Chronal } from "./chronal.ts";

export function isToday(this: Chronal): boolean {
  return _isToday(this.date);
}
