import { endOf as _endOf } from "../lib/end-of.ts";
import { chronal, type Chronal } from "./chronal.ts";
import type { Unit } from "../types/unit.ts";

export function endOf(this: Chronal, unit: Unit): Chronal {
  const newDate = _endOf(this.date, unit);
  return chronal(newDate);
}
