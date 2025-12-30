import { assertEquals } from "@std/assert";
import { setUnit } from "./set-unit.ts";

Deno.test("setUnit function - set year", () => {
  const date = new Date("2024-06-15T14:30:45Z");
  const result = setUnit(date, { years: 2025 });
  
  assertEquals(result.getUTCFullYear(), 2025);
  assertEquals(result.getUTCMonth(), 5); // June
  assertEquals(result.getUTCDate(), 15);
});

Deno.test("setUnit function - set month", () => {
  const date = new Date("2024-06-15T14:30:45Z");
  const result = setUnit(date, { months: 8 }); // September (0-indexed)
  
  assertEquals(result.getUTCFullYear(), 2024);
  assertEquals(result.getUTCMonth(), 8);
  assertEquals(result.getUTCDate(), 15);
});

Deno.test("setUnit function - set day", () => {
  const date = new Date("2024-06-15T14:30:45Z");
  const result = setUnit(date, { days: 25 });
  
  assertEquals(result.getUTCFullYear(), 2024);
  assertEquals(result.getUTCMonth(), 5);
  assertEquals(result.getUTCDate(), 25);
});

Deno.test("setUnit function - set hour", () => {
  const date = new Date("2024-06-15T14:30:45Z");
  const result = setUnit(date, { hours: 20 });
  
  assertEquals(result.getUTCHours(), 20);
  assertEquals(result.getUTCMinutes(), 30);
  assertEquals(result.getUTCSeconds(), 45);
});

Deno.test("setUnit function - set minute", () => {
  const date = new Date("2024-06-15T14:30:45Z");
  const result = setUnit(date, { minutes: 15 });
  
  assertEquals(result.getUTCHours(), 14);
  assertEquals(result.getUTCMinutes(), 15);
  assertEquals(result.getUTCSeconds(), 45);
});

Deno.test("setUnit function - set second", () => {
  const date = new Date("2024-06-15T14:30:45Z");
  const result = setUnit(date, { seconds: 10 });
  
  assertEquals(result.getUTCHours(), 14);
  assertEquals(result.getUTCMinutes(), 30);
  assertEquals(result.getUTCSeconds(), 10);
});

Deno.test("setUnit function - doesn't mutate original", () => {
  const date = new Date("2024-06-15T14:30:45Z");
  const originalTime = date.getTime();
  
  setUnit(date, { years: 2025 });
  
  assertEquals(date.getTime(), originalTime);
});

Deno.test("setUnit function - set month handles boundaries", () => {
  const date = new Date("2024-01-31T12:00:00Z");
  const result = setUnit(date, { months: 1 }); // February (0-indexed)
  
  // February 31 doesn't exist, should adjust to March
  assertEquals(result.getUTCMonth() >= 1, true);
});

Deno.test("setUnit function - set to zero values", () => {
  const date = new Date("2024-06-15T14:30:45Z");
  const result = setUnit(date, { hours: 0 });
  
  assertEquals(result.getUTCHours(), 0);
});

Deno.test("setUnit function - set millisecond", () => {
  const date = new Date("2024-06-15T14:30:45.123Z");
  const result = setUnit(date, { milliseconds: 500 });
  
  assertEquals(result.getUTCMilliseconds(), 500);
});

Deno.test("setUnit function - set multiple units", () => {
  const date = new Date("2024-06-15T14:30:45Z");
  const result = setUnit(date, { years: 2025, months: 0, days: 1, hours: 0 });
  
  assertEquals(result.getUTCFullYear(), 2025);
  assertEquals(result.getUTCMonth(), 0); // January
  assertEquals(result.getUTCDate(), 1);
  assertEquals(result.getUTCHours(), 0);
});
