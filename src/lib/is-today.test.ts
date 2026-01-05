import { assertEquals } from "@std/assert";
import { isToday } from "./is-today.ts";

Deno.test("isToday function - date is today", () => {
  const now = new Date();
  assertEquals(isToday(now), true);
});

Deno.test("isToday function - date is today at midnight", () => {
  const now = new Date();
  const midnight = new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    0,
    0,
    0,
    0,
  ));
  assertEquals(isToday(midnight), true);
});

Deno.test("isToday function - date is today at end of day", () => {
  const now = new Date();
  const endOfDay = new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    23,
    59,
    59,
    999,
  ));
  assertEquals(isToday(endOfDay), true);
});

Deno.test("isToday function - date is yesterday", () => {
  const now = new Date();
  const yesterday = new Date(now.getTime() - 86400000);
  assertEquals(isToday(yesterday), false);
});

Deno.test("isToday function - date is tomorrow", () => {
  const now = new Date();
  const tomorrow = new Date(now.getTime() + 86400000);
  assertEquals(isToday(tomorrow), false);
});

Deno.test("isToday function - date is in different month", () => {
  const now = new Date();
  const differentMonth = new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth() + 1,
    now.getUTCDate(),
    12,
    0,
    0,
    0,
  ));
  assertEquals(isToday(differentMonth), false);
});

Deno.test("isToday function - date is in different year", () => {
  const now = new Date();
  const differentYear = new Date(Date.UTC(
    now.getUTCFullYear() + 1,
    now.getUTCMonth(),
    now.getUTCDate(),
    12,
    0,
    0,
    0,
  ));
  assertEquals(isToday(differentYear), false);
});
