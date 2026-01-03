import type { Chronal } from "./chronal.ts";

export function valueOf(this: Chronal): number {
  return this.date.getTime();
}
