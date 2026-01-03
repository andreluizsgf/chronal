import { isYesterday as _isYesterday } from "../lib/is-yesterday.ts";
import type { Chronal } from "./chronal.ts";

export function isYesterday(this: Chronal): boolean {
  return _isYesterday(this.date);
}
