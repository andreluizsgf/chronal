import { assertEquals } from "@std/assert";
import { isLeapYear } from "./is-leap-year.ts";

Deno.test("isLeapYear function - 2024 is a leap year", () => {
  const date = new Date("2024-01-01");
  assertEquals(isLeapYear(date), true);
});

Deno.test("isLeapYear function - 2023 is not a leap year", () => {
  const date = new Date("2023-01-01");
  assertEquals(isLeapYear(date), false);
});

Deno.test("isLeapYear function - 2000 is a leap year (century)", () => {
  const date = new Date("2000-01-01");
  assertEquals(isLeapYear(date), true);
});

Deno.test("isLeapYear function - 1900 is not a leap year (century)", () => {
  const date = new Date("1900-01-01");
  assertEquals(isLeapYear(date), false);
});

Deno.test("isLeapYear function - 2100 is not a leap year (century)", () => {
  const date = new Date("2100-01-01");
  assertEquals(isLeapYear(date), false);
});

Deno.test("isLeapYear function - 2020 is a leap year", () => {
  const date = new Date("2020-01-01");
  assertEquals(isLeapYear(date), true);
});

Deno.test("isLeapYear function - 2019 is not a leap year", () => {
  const date = new Date("2019-01-01");
  assertEquals(isLeapYear(date), false);
});

Deno.test("isLeapYear function - 2400 is a leap year (400-year rule)", () => {
  const date = new Date("2400-01-01");
  assertEquals(isLeapYear(date), true);
});

Deno.test("isLeapYear function - 1996 is a leap year", () => {
  const date = new Date("1996-01-01");
  assertEquals(isLeapYear(date), true);
});

Deno.test("isLeapYear function - 1997 is not a leap year", () => {
  const date = new Date("1997-01-01");
  assertEquals(isLeapYear(date), false);
});
