import { assertEquals } from "@std/assert";
import { closestTo } from "./closest-to.ts";

Deno.test("closestTo function - finds closest date", () => {
  const target = new Date("2024-06-15");
  const dates = [
    new Date("2024-06-10"),
    new Date("2024-06-20"),
    new Date("2024-06-14"),
  ];
  
  const result = closestTo(target, dates);
  assertEquals(result?.getTime(), new Date("2024-06-14").getTime());
});

Deno.test("closestTo function - exact match", () => {
  const target = new Date("2024-06-15");
  const dates = [
    new Date("2024-06-10"),
    new Date("2024-06-15"),
    new Date("2024-06-20"),
  ];
  
  const result = closestTo(target, dates);
  assertEquals(result?.getTime(), new Date("2024-06-15").getTime());
});

Deno.test("closestTo function - single date", () => {
  const target = new Date("2024-06-15");
  const dates = [new Date("2024-06-10")];
  
  const result = closestTo(target, dates);
  assertEquals(result?.getTime(), new Date("2024-06-10").getTime());
});

Deno.test("closestTo function - empty array returns null", () => {
  const target = new Date("2024-06-15");
  const dates: Date[] = [];
  
  const result = closestTo(target, dates);
  assertEquals(result, null);
});

Deno.test("closestTo function - multiple dates same distance (returns first)", () => {
  const target = new Date("2024-06-15T12:00:00Z");
  const dates = [
    new Date("2024-06-14T12:00:00Z"), // 1 day before
    new Date("2024-06-16T12:00:00Z"), // 1 day after
  ];
  
  const result = closestTo(target, dates);
  assertEquals(result?.getTime(), new Date("2024-06-14T12:00:00Z").getTime());
});

Deno.test("closestTo function - dates in different years", () => {
  const target = new Date("2024-01-01");
  const dates = [
    new Date("2023-12-25"),
    new Date("2024-01-10"),
    new Date("2025-01-01"),
  ];
  
  const result = closestTo(target, dates);
  assertEquals(result?.getTime(), new Date("2023-12-25").getTime());
});

Deno.test("closestTo function - finds closest in past", () => {
  const target = new Date("2024-06-15");
  const dates = [
    new Date("2024-06-01"),
    new Date("2024-06-05"),
    new Date("2024-06-10"),
  ];
  
  const result = closestTo(target, dates);
  assertEquals(result?.getTime(), new Date("2024-06-10").getTime());
});

Deno.test("closestTo function - finds closest in future", () => {
  const target = new Date("2024-06-15");
  const dates = [
    new Date("2024-06-20"),
    new Date("2024-06-25"),
    new Date("2024-06-30"),
  ];
  
  const result = closestTo(target, dates);
  assertEquals(result?.getTime(), new Date("2024-06-20").getTime());
});
