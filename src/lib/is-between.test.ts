import { assertEquals } from "@std/assert";
import { isBetween } from "./is-between.ts";

Deno.test("isBetween function - date is between (inclusive)", () => {
  const date = new Date("2024-06-15T12:00:00Z");
  const start = new Date("2024-06-01T00:00:00Z");
  const end = new Date("2024-06-30T23:59:59Z");

  assertEquals(isBetween(date, start, end), true);
});

Deno.test("isBetween function - date equals start (inclusive)", () => {
  const date = new Date("2024-06-15T12:00:00Z");
  const start = new Date("2024-06-15T12:00:00Z");
  const end = new Date("2024-06-30T23:59:59Z");

  assertEquals(isBetween(date, start, end), true);
});

Deno.test("isBetween function - date equals end (inclusive)", () => {
  const date = new Date("2024-06-15T12:00:00Z");
  const start = new Date("2024-06-01T00:00:00Z");
  const end = new Date("2024-06-15T12:00:00Z");

  assertEquals(isBetween(date, start, end), true);
});

Deno.test("isBetween function - date before range", () => {
  const date = new Date("2024-05-15T12:00:00Z");
  const start = new Date("2024-06-01T00:00:00Z");
  const end = new Date("2024-06-30T23:59:59Z");

  assertEquals(isBetween(date, start, end), false);
});

Deno.test("isBetween function - date after range", () => {
  const date = new Date("2024-07-15T12:00:00Z");
  const start = new Date("2024-06-01T00:00:00Z");
  const end = new Date("2024-06-30T23:59:59Z");

  assertEquals(isBetween(date, start, end), false);
});

Deno.test("isBetween function - exclusive mode", () => {
  const date = new Date("2024-06-15T12:00:00Z");
  const start = new Date("2024-06-15T12:00:00Z");
  const end = new Date("2024-06-30T23:59:59Z");

  assertEquals(isBetween(date, start, end, "()"), false);
});

Deno.test("isBetween function - exclusive end [)", () => {
  const date = new Date("2024-06-30T23:59:59Z");
  const start = new Date("2024-06-01T00:00:00Z");
  const end = new Date("2024-06-30T23:59:59Z");

  assertEquals(isBetween(date, start, end, "[)"), false);
});

Deno.test("isBetween function - exclusive start (]", () => {
  const date = new Date("2024-06-01T00:00:00Z");
  const start = new Date("2024-06-01T00:00:00Z");
  const end = new Date("2024-06-30T23:59:59Z");

  assertEquals(isBetween(date, start, end, "(]"), false);
});

Deno.test("isBetween function - handles reversed bounds", () => {
  const date = new Date("2024-06-15T12:00:00Z");
  const start = new Date("2024-06-30T23:59:59Z");
  const end = new Date("2024-06-01T00:00:00Z");

  // Should still work when bounds are reversed
  assertEquals(isBetween(date, start, end), true);
});
