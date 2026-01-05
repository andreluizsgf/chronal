import { assertEquals } from "@std/assert";
import { isAfter } from "./is-after.ts";

Deno.test("isAfter function", () => {
  const date1 = new Date("2024-01-15T12:00:00Z");
  const date2 = new Date("2024-01-20T12:00:00Z");
  const date3 = new Date("2024-01-15T12:00:00Z");

  // date2 is after date1
  assertEquals(isAfter(date2, date1), true);

  // date1 is not after date2
  assertEquals(isAfter(date1, date2), false);

  // date1 is not after date3 (same time)
  assertEquals(isAfter(date1, date3), false);

  // Test with milliseconds difference
  const dateA = new Date("2024-01-15T12:00:00.000Z");
  const dateB = new Date("2024-01-15T12:00:00.001Z");
  assertEquals(isAfter(dateB, dateA), true);
  assertEquals(isAfter(dateA, dateB), false);
});
