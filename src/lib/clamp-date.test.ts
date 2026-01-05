import { assertEquals } from "@std/assert";
import { clampDate } from "./clamp-date.ts";

Deno.test("clampDate function - date within bounds", () => {
  const date = new Date("2024-06-15");
  const min = new Date("2024-06-01");
  const max = new Date("2024-06-30");

  const result = clampDate(date, min, max);
  assertEquals(result.getTime(), date.getTime());
});

Deno.test("clampDate function - date before min", () => {
  const date = new Date("2024-05-15");
  const min = new Date("2024-06-01");
  const max = new Date("2024-06-30");

  const result = clampDate(date, min, max);
  assertEquals(result.getTime(), min.getTime());
});

Deno.test("clampDate function - date after max", () => {
  const date = new Date("2024-07-15");
  const min = new Date("2024-06-01");
  const max = new Date("2024-06-30");

  const result = clampDate(date, min, max);
  assertEquals(result.getTime(), max.getTime());
});

Deno.test("clampDate function - date equals min", () => {
  const date = new Date("2024-06-01");
  const min = new Date("2024-06-01");
  const max = new Date("2024-06-30");

  const result = clampDate(date, min, max);
  assertEquals(result.getTime(), date.getTime());
});

Deno.test("clampDate function - date equals max", () => {
  const date = new Date("2024-06-30");
  const min = new Date("2024-06-01");
  const max = new Date("2024-06-30");

  const result = clampDate(date, min, max);
  assertEquals(result.getTime(), date.getTime());
});

Deno.test("clampDate function - same min and max", () => {
  const date = new Date("2024-06-15");
  const bound = new Date("2024-06-10");

  const result = clampDate(date, bound, bound);
  assertEquals(result.getTime(), bound.getTime());
});

Deno.test("clampDate function - far before min", () => {
  const date = new Date("2020-01-01");
  const min = new Date("2024-06-01");
  const max = new Date("2024-06-30");

  const result = clampDate(date, min, max);
  assertEquals(result.getTime(), min.getTime());
});

Deno.test("clampDate function - far after max", () => {
  const date = new Date("2030-01-01");
  const min = new Date("2024-06-01");
  const max = new Date("2024-06-30");

  const result = clampDate(date, min, max);
  assertEquals(result.getTime(), max.getTime());
});
