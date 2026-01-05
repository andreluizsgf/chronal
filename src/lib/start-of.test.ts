import { assertEquals } from "@std/assert";
import { startOf } from "./start-of.ts";

Deno.test("startOf function", () => {
  const date = new Date("2024-06-15T14:35:22.500Z");

  // Test start of year
  let result = startOf(date, "year");
  assertEquals(result.toISOString(), "2024-01-01T00:00:00.000Z");

  // Test start of month
  result = startOf(date, "month");
  assertEquals(result.toISOString(), "2024-06-01T00:00:00.000Z");

  // Test start of day
  result = startOf(date, "day");
  assertEquals(result.toISOString(), "2024-06-15T00:00:00.000Z");

  // Test start of hour
  result = startOf(date, "hour");
  assertEquals(result.toISOString(), "2024-06-15T14:00:00.000Z");

  // Test start of minute
  result = startOf(date, "minute");
  assertEquals(result.toISOString(), "2024-06-15T14:35:00.000Z");

  // Test start of second
  result = startOf(date, "second");
  assertEquals(result.toISOString(), "2024-06-15T14:35:22.000Z");
});

Deno.test("startOf does not mutate original date", () => {
  const original = new Date("2024-06-15T14:35:22.500Z");
  const originalTime = original.getTime();

  startOf(original, "day");

  assertEquals(
    original.getTime(),
    originalTime,
    "Original date should not be mutated",
  );
});
