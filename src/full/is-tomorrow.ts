import { isTomorrow as _isTomorrow } from "../lib/is-tomorrow.ts";
import type { Chronal } from "./chronal.ts";

export function isTomorrow(this: Chronal): boolean {
  return _isTomorrow(this.date);
}
