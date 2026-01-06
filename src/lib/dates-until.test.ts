import { assertEquals } from "@std/assert";
import { datesUntil } from "./dates-until.ts";

Deno.test("datesUntil - generates daily range", () => {
  const start = new Date("2024-01-01T00:00:00Z");
  const end = new Date("2024-01-05T00:00:00Z");

  const result = datesUntil(start, end);

  assertEquals(result.length, 5);
  assertEquals(result[0].toISOString(), "2024-01-01T00:00:00.000Z");
  assertEquals(result[4].toISOString(), "2024-01-05T00:00:00.000Z");
});

Deno.test("datesUntil - generates range with custom day step", () => {
  const start = new Date("2024-01-01T00:00:00.000Z");
  const end = new Date("2024-01-10T00:00:00.000Z");

  const result = datesUntil(start, end, { days: 3 });

  assertEquals(result.length, 4);
  assertEquals(result[0].toISOString(), "2024-01-01T00:00:00.000Z");
  assertEquals(result[1].toISOString(), "2024-01-04T00:00:00.000Z");
  assertEquals(result[2].toISOString(), "2024-01-07T00:00:00.000Z");
  assertEquals(result[3].toISOString(), "2024-01-10T00:00:00.000Z");
});

Deno.test("datesUntil - generates weekly range", () => {
  const start = new Date("2024-01-01T00:00:00.000Z");
  const end = new Date("2024-01-29T00:00:00.000Z");

  const result = datesUntil(start, end, { weeks: 1 });

  assertEquals(result.length, 5);
  assertEquals(result[0].toISOString(), "2024-01-01T00:00:00.000Z");
  assertEquals(result[1].toISOString(), "2024-01-08T00:00:00.000Z");
  assertEquals(result[4].toISOString(), "2024-01-29T00:00:00.000Z");
});

Deno.test("datesUntil - generates monthly range", () => {
  const start = new Date("2024-01-15T00:00:00Z");
  const end = new Date("2024-06-15T00:00:00Z");

  const result = datesUntil(start, end, { months: 1 });

  assertEquals(result.length, 6);
  assertEquals(result[0].toISOString(), "2024-01-15T00:00:00.000Z");
  assertEquals(result[1].toISOString(), "2024-02-15T00:00:00.000Z");
  assertEquals(result[5].toISOString(), "2024-06-15T00:00:00.000Z");
});

Deno.test("datesUntil - handles month boundaries correctly", () => {
  const start = new Date("2024-01-31T00:00:00Z");
  const end = new Date("2024-04-30T00:00:00Z");

  const result = datesUntil(start, end, { months: 1 });

  assertEquals(result.length, 4);
  assertEquals(result[0].toISOString(), "2024-01-31T00:00:00.000Z");
  assertEquals(result[1].toISOString(), "2024-02-29T00:00:00.000Z"); // Leap year
  assertEquals(result[2].toISOString(), "2024-03-31T00:00:00.000Z");
  assertEquals(result[3].toISOString(), "2024-04-30T00:00:00.000Z"); // April has 30 days
});

Deno.test("datesUntil - generates hourly range", () => {
  const start = new Date("2024-01-01T00:00:00.000Z");
  const end = new Date("2024-01-01T05:00:00.000Z");

  const result = datesUntil(start, end, { hours: 1 });

  assertEquals(result.length, 6);
  assertEquals(result[0].toISOString(), "2024-01-01T00:00:00.000Z");
  assertEquals(result[5].toISOString(), "2024-01-01T05:00:00.000Z");
});

Deno.test("datesUntil - generates range with mixed steps", () => {
  const start = new Date("2024-01-01T00:00:00.000Z");
  const end = new Date("2024-01-11T00:00:00.000Z");

  const result = datesUntil(start, end, { days: 2, hours: 12 });

  assertEquals(result.length, 5);
  assertEquals(result[0].toISOString(), "2024-01-01T00:00:00.000Z");
  assertEquals(result[1].toISOString(), "2024-01-03T12:00:00.000Z");
  assertEquals(result[2].toISOString(), "2024-01-06T00:00:00.000Z");
  assertEquals(result[3].toISOString(), "2024-01-08T12:00:00.000Z");
  assertEquals(result[4].toISOString(), "2024-01-11T00:00:00.000Z");
});

Deno.test("datesUntil - handles single date range", () => {
  const start = new Date("2024-01-01T00:00:00Z");
  const end = new Date("2024-01-01T00:00:00Z");

  const result = datesUntil(start, end);

  assertEquals(result.length, 1);
  assertEquals(result[0].toISOString(), "2024-01-01T00:00:00.000Z");
});

Deno.test("datesUntil - returns empty array when start is after end", () => {
  const start = new Date("2024-01-10T00:00:00Z");
  const end = new Date("2024-01-01T00:00:00Z");

  const result = datesUntil(start, end);

  assertEquals(result.length, 0);
});

Deno.test("datesUntil - generates yearly range", () => {
  const start = new Date("2020-01-01T00:00:00Z");
  const end = new Date("2025-01-01T00:00:00Z");

  const result = datesUntil(start, end, { years: 1 });

  assertEquals(result.length, 6);
  assertEquals(result[0].toISOString(), "2020-01-01T00:00:00.000Z");
  assertEquals(result[5].toISOString(), "2025-01-01T00:00:00.000Z");
});
