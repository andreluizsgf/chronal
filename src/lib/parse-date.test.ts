import { assertEquals, assertThrows } from "@std/assert";
import { parseDate } from "./parse-date.ts";

Deno.test("parseDate function - ISO 8601 format", () => {
  const result = parseDate("2024-06-15T14:30:00.000Z");
  assertEquals(result.getUTCFullYear(), 2024);
  assertEquals(result.getUTCMonth(), 5); // June is month 5
  assertEquals(result.getUTCDate(), 15);
  assertEquals(result.getUTCHours(), 14);
  assertEquals(result.getUTCMinutes(), 30);
});

Deno.test("parseDate function - YYYY-MM-DD", () => {
  const result = parseDate("2024-06-15", "YYYY-MM-DD");
  assertEquals(result.getUTCFullYear(), 2024);
  assertEquals(result.getUTCMonth(), 5);
  assertEquals(result.getUTCDate(), 15);
});

Deno.test("parseDate function - DD/MM/YYYY", () => {
  const result = parseDate("15/06/2024", "DD/MM/YYYY");
  assertEquals(result.getUTCFullYear(), 2024);
  assertEquals(result.getUTCMonth(), 5);
  assertEquals(result.getUTCDate(), 15);
});

Deno.test("parseDate function - MM/DD/YYYY", () => {
  const result = parseDate("06/15/2024", "MM/DD/YYYY");
  assertEquals(result.getUTCFullYear(), 2024);
  assertEquals(result.getUTCMonth(), 5);
  assertEquals(result.getUTCDate(), 15);
});

Deno.test("parseDate function - YYYY-MM-DD HH:mm:ss", () => {
  const result = parseDate("2024-06-15 14:30:45", "YYYY-MM-DD HH:mm:ss");
  assertEquals(result.getUTCFullYear(), 2024);
  assertEquals(result.getUTCMonth(), 5);
  assertEquals(result.getUTCDate(), 15);
  assertEquals(result.getUTCHours(), 14);
  assertEquals(result.getUTCMinutes(), 30);
  assertEquals(result.getUTCSeconds(), 45);
});

Deno.test("parseDate function - DD-MM-YYYY", () => {
  const result = parseDate("15-06-2024", "DD-MM-YYYY");
  assertEquals(result.getUTCFullYear(), 2024);
  assertEquals(result.getUTCMonth(), 5);
  assertEquals(result.getUTCDate(), 15);
});

Deno.test("parseDate function - no format (uses native Date parser)", () => {
  const result = parseDate("2024-06-15");
  assertEquals(result.getUTCFullYear(), 2024);
  assertEquals(result.getUTCMonth(), 5);
  assertEquals(result.getUTCDate(), 15);
});

Deno.test("parseDate function - invalid date throws", () => {
  assertThrows(
    () => parseDate("not-a-date", "YYYY-MM-DD"),
    Error,
    "Invalid date"
  );
});

Deno.test("parseDate function - mismatched format throws", () => {
  assertThrows(
    () => parseDate("15/06/2024", "YYYY-MM-DD"),
    Error,
    "Invalid date"
  );
});
