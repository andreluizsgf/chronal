import type { Chronal } from "./chronal.ts";

export function toDate(this: Chronal): Date {
  return new Date(this.date.getTime());
}
