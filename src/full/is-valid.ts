import { isValidDate } from "../lib/is-valid-date.ts";
import type { Chronal } from "./chronal.ts";

export function isValid(this: Chronal): boolean {
  return isValidDate(this.date);
}
