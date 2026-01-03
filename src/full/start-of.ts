import { startOf as _startOf } from "../lib/start-of.ts";
import { chronal, type Chronal } from "./chronal.ts";
import type { Unit } from "../types/unit.ts";

export function startOf(this: Chronal, unit: Unit): Chronal {
  const newDate = _startOf(this.date, unit);
  return chronal(newDate);
}
