import { subTime as _subTime } from "../lib/sub-time.ts";
import { chronal, type Chronal } from "./chronal.ts";

export function sub(this: Chronal, opt: Parameters<typeof _subTime>[1]): Chronal {
  const newDate = _subTime(this.date, opt);
  return chronal(newDate);
}
