import { assertEquals } from "@std/assert";
import { add } from "./add.ts";

Deno.test("add function", () => {
  const date = new Date('2024-01-31T12:00:00Z');

  // Test adding years
  let result = add(date, { years: 1 });
  assertEquals(result.toISOString(), '2025-01-31T12:00:00.000Z');

  // Test adding months
  result = add(date, { months: 1 });
  assertEquals(result.toISOString(), '2024-02-29T12:00:00.000Z'); // Leap year handling

  // Test adding days
  result = add(date, { days: 10 });
  assertEquals(result.toISOString(), '2024-02-10T12:00:00.000Z');

  // Test adding hours
  result = add(date, { hours: 5 });
  assertEquals(result.toISOString(), '2024-01-31T17:00:00.000Z');

  // Test adding minutes
  result = add(date, { minutes: 30 });
  assertEquals(result.toISOString(), '2024-01-31T12:30:00.000Z');

  // Test adding seconds
  result = add(date, { seconds: 45 });
  assertEquals(result.toISOString(), '2024-01-31T12:00:45.000Z');

  // Test adding milliseconds
  result = add(date, { milliseconds: 500 });
  assertEquals(result.toISOString(), '2024-01-31T12:00:00.500Z');

  // Test adding multiple units
  result = add(date, { years: 1, months: 2, days: 3, hours: 4, minutes: 5, seconds: 6, milliseconds: 7 });
  assertEquals(result.toISOString(), '2025-04-03T16:05:06.007Z');
});