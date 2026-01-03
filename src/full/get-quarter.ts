import { getQuarter as _getQuarter } from "../lib/get-quarter.ts";
import type { Chronal } from "./chronal.ts";

export function getQuarter(this: Chronal): 1 | 2 | 3 | 4 {
  return _getQuarter(this.date);
}
