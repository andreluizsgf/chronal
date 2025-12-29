import { assertEquals } from "@std/assert";
import { daysInMonth } from "./days-in-month.ts";

Deno.test("daysInMonth function - January has 31 days", () => {
  const date = new Date("2024-01-15");
  assertEquals(daysInMonth(date), 31);
});

Deno.test("daysInMonth function - February non-leap year has 28 days", () => {
  const date = new Date("2023-02-15");
  assertEquals(daysInMonth(date), 28);
});

Deno.test("daysInMonth function - February leap year has 29 days", () => {
  const date = new Date("2024-02-15");
  assertEquals(daysInMonth(date), 29);
});

Deno.test("daysInMonth function - March has 31 days", () => {
  const date = new Date("2024-03-15");
  assertEquals(daysInMonth(date), 31);
});

Deno.test("daysInMonth function - April has 30 days", () => {
  const date = new Date("2024-04-15");
  assertEquals(daysInMonth(date), 30);
});

Deno.test("daysInMonth function - May has 31 days", () => {
  const date = new Date("2024-05-15");
  assertEquals(daysInMonth(date), 31);
});

Deno.test("daysInMonth function - June has 30 days", () => {
  const date = new Date("2024-06-15");
  assertEquals(daysInMonth(date), 30);
});

Deno.test("daysInMonth function - July has 31 days", () => {
  const date = new Date("2024-07-15");
  assertEquals(daysInMonth(date), 31);
});

Deno.test("daysInMonth function - August has 31 days", () => {
  const date = new Date("2024-08-15");
  assertEquals(daysInMonth(date), 31);
});

Deno.test("daysInMonth function - September has 30 days", () => {
  const date = new Date("2024-09-15");
  assertEquals(daysInMonth(date), 30);
});

Deno.test("daysInMonth function - October has 31 days", () => {
  const date = new Date("2024-10-15");
  assertEquals(daysInMonth(date), 31);
});

Deno.test("daysInMonth function - November has 30 days", () => {
  const date = new Date("2024-11-15");
  assertEquals(daysInMonth(date), 30);
});

Deno.test("daysInMonth function - December has 31 days", () => {
  const date = new Date("2024-12-15");
  assertEquals(daysInMonth(date), 31);
});

Deno.test("daysInMonth function - century non-leap year", () => {
  const date = new Date("1900-02-15");
  assertEquals(daysInMonth(date), 28);
});

Deno.test("daysInMonth function - century leap year", () => {
  const date = new Date("2000-02-15");
  assertEquals(daysInMonth(date), 29);
});
