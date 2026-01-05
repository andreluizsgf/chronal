import { assertEquals } from "@std/assert";
import { isBefore } from "./is-before.ts";

Deno.test("isBefore function", () => {
  const date1 = new Date("2024-01-15T12:00:00Z");
  const date2 = new Date("2024-01-20T12:00:00Z");
  const date3 = new Date("2024-01-15T12:00:00Z");

  // date1 is before date2
  assertEquals(isBefore(date1, date2), true);

  // date2 is not before date1
  assertEquals(isBefore(date2, date1), false);

  // date1 is not before date3 (same time)
  assertEquals(isBefore(date1, date3), false);

  // Test with milliseconds difference
  const dateA = new Date("2024-01-15T12:00:00.000Z");
  const dateB = new Date("2024-01-15T12:00:00.001Z");
  assertEquals(isBefore(dateA, dateB), true);
  assertEquals(isBefore(dateB, dateA), false);
});
