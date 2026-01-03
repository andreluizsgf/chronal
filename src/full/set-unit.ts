import { setUnit as _setUnit } from "../lib/set-unit.ts";
import { chronal, type Chronal } from "./chronal.ts";

type SetUnitOptions = {
  year?: number;
  month?: number;
  day?: number;
  hour?: number;
  minute?: number;
  second?: number;
  millisecond?: number;
};

export function setUnit(this: Chronal, opt: SetUnitOptions): Chronal {
  const newDate = _setUnit(this.date, opt);
  return chronal(newDate);
}
