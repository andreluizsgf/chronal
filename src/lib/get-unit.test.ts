import { assertEquals } from "@std/assert";
import { getUnit } from "./get-unit.ts";

Deno.test("getUnit function - year", () => {
  const date = new Date("2024-03-15T12:34:56.789Z");
  assertEquals(getUnit(date, "year"), 2024);
});

Deno.test("getUnit function - month", () => {
  const date1 = new Date("2024-01-15T12:34:56Z");
  assertEquals(getUnit(date1, "month"), 0);

  const date2 = new Date("2024-12-15T12:34:56Z");
  assertEquals(getUnit(date2, "month"), 11);

  const date3 = new Date("2024-06-15T12:34:56Z");
  assertEquals(getUnit(date3, "month"), 5);
});

Deno.test("getUnit function - date", () => {
  const date1 = new Date("2024-03-01T12:34:56Z");
  assertEquals(getUnit(date1, "date"), 1);

  const date2 = new Date("2024-03-15T12:34:56Z");
  assertEquals(getUnit(date2, "date"), 15);

  const date3 = new Date("2024-03-31T12:34:56Z");
  assertEquals(getUnit(date3, "date"), 31);
});

Deno.test("getUnit function - day", () => {
  const date1 = new Date("2024-03-01T12:34:56Z");

  assertEquals(getUnit(date1, "day"), 5);

  const date2 = new Date("2024-03-15T12:34:56Z");
  assertEquals(getUnit(date2, "day"), 5);

  const date3 = new Date("2024-03-31T12:34:56Z");
  assertEquals(getUnit(date3, "day"), 0);
});

Deno.test("getUnit function - hour", () => {
  const date1 = new Date("2024-03-15T00:34:56Z");
  assertEquals(getUnit(date1, "hour"), 0);

  const date2 = new Date("2024-03-15T12:34:56Z");
  assertEquals(getUnit(date2, "hour"), 12);

  const date3 = new Date("2024-03-15T23:34:56Z");
  assertEquals(getUnit(date3, "hour"), 23);
});

Deno.test("getUnit function - minute", () => {
  const date1 = new Date("2024-03-15T12:00:56Z");
  assertEquals(getUnit(date1, "minute"), 0);

  const date2 = new Date("2024-03-15T12:34:56Z");
  assertEquals(getUnit(date2, "minute"), 34);

  const date3 = new Date("2024-03-15T12:59:56Z");
  assertEquals(getUnit(date3, "minute"), 59);
});

Deno.test("getUnit function - second", () => {
  const date1 = new Date("2024-03-15T12:34:00Z");
  assertEquals(getUnit(date1, "second"), 0);

  const date2 = new Date("2024-03-15T12:34:56Z");
  assertEquals(getUnit(date2, "second"), 56);

  const date3 = new Date("2024-03-15T12:34:59Z");
  assertEquals(getUnit(date3, "second"), 59);
});

Deno.test("getUnit function - leap year February", () => {
  const date = new Date("2024-02-29T12:34:56Z");
  assertEquals(getUnit(date, "year"), 2024);
  assertEquals(getUnit(date, "month"), 1);
  assertEquals(getUnit(date, "day"), 4);
});

Deno.test("getUnit function - all units from same date", () => {
  const date = new Date("2024-03-15T12:34:56Z");

  assertEquals(getUnit(date, "year"), 2024);
  assertEquals(getUnit(date, "month"), 2);
  assertEquals(getUnit(date, "date"), 15);
  assertEquals(getUnit(date, "day"), 5);
  assertEquals(getUnit(date, "hour"), 12);
  assertEquals(getUnit(date, "minute"), 34);
  assertEquals(getUnit(date, "second"), 56);
});

Deno.test("getUnit function - edge case midnight", () => {
  const date = new Date("2024-01-01T00:00:00Z");

  assertEquals(getUnit(date, "year"), 2024);
  assertEquals(getUnit(date, "month"), 0);
  assertEquals(getUnit(date, "day"), 1);
  assertEquals(getUnit(date, "hour"), 0);
  assertEquals(getUnit(date, "minute"), 0);
  assertEquals(getUnit(date, "second"), 0);
});

Deno.test("getUnit function - edge case end of year", () => {
  const date = new Date("2024-12-31T23:59:59Z");

  assertEquals(getUnit(date, "year"), 2024);
  assertEquals(getUnit(date, "month"), 11);
  assertEquals(getUnit(date, "day"), 2);
  assertEquals(getUnit(date, "date"), 31);
  assertEquals(getUnit(date, "hour"), 23);
  assertEquals(getUnit(date, "minute"), 59);
  assertEquals(getUnit(date, "second"), 59);
});
