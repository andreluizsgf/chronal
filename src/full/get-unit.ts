import { getUnit as _getUnit } from "../lib/get-unit.ts";
import type { Chronal } from "./chronal.ts";

export function getUnit(this: Chronal, unit: Parameters<typeof _getUnit>[1]): number {
  return _getUnit(this.date, unit);
}
