import type { Chronal } from "./chronal.ts";
import { formatDate } from "../lib/format-date.ts";

export function format(this: Chronal, fmt: Parameters<typeof formatDate>[1], options: Parameters<typeof formatDate>[2] = {}): string {
  return formatDate(this.date, fmt, options);
}