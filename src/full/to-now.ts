import { toNow as _toNow } from "../lib/to-now.ts";
import type { Chronal } from "./chronal.ts";

export function toNow(this: Chronal, locale?: string): string {
  return _toNow(this.date, locale);
}
