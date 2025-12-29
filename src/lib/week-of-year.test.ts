import { assertEquals } from "@std/assert";
import { weekOfYear } from "./week-of-year.ts";

Deno.test("weekOfYear function - first week of 2024", () => {
  const date = new Date("2024-01-01");
  assertEquals(weekOfYear(date), 1);
});

Deno.test("weekOfYear function - second week of 2024", () => {
  const date = new Date("2024-01-08");
  assertEquals(weekOfYear(date), 2);
});

Deno.test("weekOfYear function - middle of year", () => {
  const date = new Date("2024-06-15");
  const week = weekOfYear(date);
  assertEquals(week >= 24 && week <= 25, true); // Around week 24-25
});

Deno.test("weekOfYear function - last week of year", () => {
  const date = new Date("2024-12-31");
  const week = weekOfYear(date);
  assertEquals(week >= 52 && week <= 53, true); // Week 52 or 53
});

Deno.test("weekOfYear function - leap year", () => {
  const date = new Date("2024-02-29"); // Leap day
  const week = weekOfYear(date);
  assertEquals(week >= 8 && week <= 10, true); // Around week 9
});

Deno.test("weekOfYear function - end of January", () => {
  const date = new Date("2024-01-31");
  const week = weekOfYear(date);
  assertEquals(week >= 4 && week <= 5, true); // Around week 5
});

Deno.test("weekOfYear function - year boundary", () => {
  const date = new Date("2024-01-07"); // Sunday of first full week
  const week = weekOfYear(date);
  assertEquals(week >= 1 && week <= 2, true);
});

Deno.test("weekOfYear function - consistent within same week", () => {
  // June 10-16, 2024 is a Monday-Sunday week
  const monday = new Date("2024-06-10");
  const tuesday = new Date("2024-06-11");
  const friday = new Date("2024-06-14");
  
  const mondayWeek = weekOfYear(monday);
  assertEquals(weekOfYear(tuesday), mondayWeek);
  assertEquals(weekOfYear(friday), mondayWeek);
});
