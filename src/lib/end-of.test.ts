import { assertEquals } from "@std/assert";
import { endOf } from "./end-of.ts";

Deno.test("endOf function", () => {
  const date = new Date('2024-06-15T14:35:22.500Z');

  // Test end of year
  let result = endOf(date, 'year');
  assertEquals(result.toISOString(), '2024-12-31T23:59:59.999Z');

  // Test end of month
  result = endOf(date, 'month');
  assertEquals(result.toISOString(), '2024-06-30T23:59:59.999Z');

  // Test end of month (February in leap year)
  const feb = new Date('2024-02-15T12:00:00Z');
  result = endOf(feb, 'month');
  assertEquals(result.toISOString(), '2024-02-29T23:59:59.999Z');

  // Test end of month (February in non-leap year)
  const feb2023 = new Date('2023-02-15T12:00:00Z');
  result = endOf(feb2023, 'month');
  assertEquals(result.toISOString(), '2023-02-28T23:59:59.999Z');

  // Test end of day
  result = endOf(date, 'day');
  assertEquals(result.toISOString(), '2024-06-15T23:59:59.999Z');

  // Test end of hour
  result = endOf(date, 'hour');
  assertEquals(result.toISOString(), '2024-06-15T14:59:59.999Z');

  // Test end of minute
  result = endOf(date, 'minute');
  assertEquals(result.toISOString(), '2024-06-15T14:35:59.999Z');

  // Test end of second
  result = endOf(date, 'second');
  assertEquals(result.toISOString(), '2024-06-15T14:35:22.999Z');
});

Deno.test("endOf does not mutate original date", () => {
  const original = new Date('2024-06-15T14:35:22.500Z');
  const originalTime = original.getTime();
  
  endOf(original, 'day');
  
  assertEquals(original.getTime(), originalTime, "Original date should not be mutated");
});
