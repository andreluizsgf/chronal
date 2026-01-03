import { setUnit as _setUnit } from "../lib/set-unit.ts";
import { chronal, type Chronal } from "./chronal.ts";

export function setUnit(this: Chronal, opt: Parameters<typeof _setUnit>[1]): Chronal {
  const newDate = _setUnit(this.date, opt);
  return chronal(newDate);
}
