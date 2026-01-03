import { weekOfYear as _weekOfYear } from "../lib/week-of-year.ts";
import type { Chronal } from "./chronal.ts";

export function weekOfYear(this: Chronal): number {
  return _weekOfYear(this.date);
}
