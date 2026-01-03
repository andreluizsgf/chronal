import { startOf as _startOf } from "../lib/start-of.ts";
import { chronal, type Chronal } from "./chronal.ts";

export function startOf(this: Chronal, unit: Parameters<typeof _startOf>[1]): Chronal {
  const newDate = _startOf(this.date, unit);
  return chronal(newDate);
}
