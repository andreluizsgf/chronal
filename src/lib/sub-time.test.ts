import { assertEquals } from "@std/assert";
import { subTime } from "./sub-time.ts";

Deno.test("subTime function", () => {
  const date = new Date('2024-03-31T12:00:00Z');

  // Test subtracting years
  let result = subTime(date, { years: 1 });
  assertEquals(result.toISOString(), '2023-03-31T12:00:00.000Z');

  // Test subtracting months
  result = subTime(date, { months: 1 });
  assertEquals(result.toISOString(), '2024-02-29T12:00:00.000Z'); // Leap year handling

  // Test subtracting days
  result = subTime(date, { days: 10 });
  assertEquals(result.toISOString(), '2024-03-21T12:00:00.000Z');

  // Test subtracting hours
  result = subTime(date, { hours: 5 });
  assertEquals(result.toISOString(), '2024-03-31T07:00:00.000Z');

  // Test subtracting minutes
  result = subTime(date, { minutes: 30 });
  assertEquals(result.toISOString(), '2024-03-31T11:30:00.000Z');

  // Test subtracting seconds
  result = subTime(date, { seconds: 45 });
  assertEquals(result.toISOString(), '2024-03-31T11:59:15.000Z');

  // Test subtracting milliseconds
  result = subTime(date, { milliseconds: 500 });
  assertEquals(result.toISOString(), '2024-03-31T11:59:59.500Z');

  // Test subtracting multiple units
  result = subTime(date, { years: 1, months: 1, days: 5 });
  assertEquals(result.toISOString(), '2023-02-23T12:00:00.000Z');

  // Test subtracting weeks
  result = subTime(date, { weeks: 2 });
  assertEquals(result.toISOString(), '2024-03-17T12:00:00.000Z');
});
