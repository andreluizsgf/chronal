import { fromNow as _fromNow } from "../lib/from-now.ts";
import type { Chronal } from "./chronal.ts";

export function fromNow(this: Chronal, locale?: string): string {
  return _fromNow(this.date, locale);
}
