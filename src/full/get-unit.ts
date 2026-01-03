import { getUnit as _getUnit } from "../lib/get-unit.ts";
import type { Chronal } from "./chronal.ts";
import type { Unit } from "../types/unit.ts";

export function getUnit(this: Chronal, unit: Omit<Unit, 'week'>): number {
  return _getUnit(this.date, unit);
}
