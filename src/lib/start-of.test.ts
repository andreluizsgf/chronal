import { assertEquals } from "@std/assert";
import { startOf } from "./start-of.ts";

Deno.test("startOf function", () => {
  const date = new Date("2024-06-15T14:35:22.500Z");

  // Test start of year
  let result = startOf(date, "year");
  assertEquals(result.toISOString(), "2024-01-01T00:00:00.000Z");

  // Test start of month
  result = startOf(date, "month");
  assertEquals(result.toISOString(), "2024-06-01T00:00:00.000Z");

  // Test start of day
  result = startOf(date, "day");
  assertEquals(result.toISOString(), "2024-06-15T00:00:00.000Z");

  // Test start of hour
  result = startOf(date, "hour");
  assertEquals(result.toISOString(), "2024-06-15T14:00:00.000Z");

  // Test start of minute
  result = startOf(date, "minute");
  assertEquals(result.toISOString(), "2024-06-15T14:35:00.000Z");

  // Test start of second
  result = startOf(date, "second");
  assertEquals(result.toISOString(), "2024-06-15T14:35:22.000Z");
});

Deno.test("startOf does not mutate original date", () => {
  const original = new Date("2024-06-15T14:35:22.500Z");
  const originalTime = original.getTime();

  startOf(original, "day");

  assertEquals(
    original.getTime(),
    originalTime,
    "Original date should not be mutated",
  );
});

Deno.test("startOf with timezone", () => {
  // Test with America/Sao_Paulo (GMT-3)
  const date = new Date("2024-06-15T14:35:22.500Z");

  // Start of day in Sao Paulo (00:00 local = 03:00 UTC)
  let result = startOf(date, "day", { tz: "America/Sao_Paulo" });
  assertEquals(result.toISOString(), "2024-06-15T03:00:00.000Z");

  // Start of hour in Sao Paulo
  result = startOf(date, "hour", { tz: "America/Sao_Paulo" });
  assertEquals(result.toISOString(), "2024-06-15T14:00:00.000Z");

  // Test with Europe/London (GMT+1 in summer)
  const summerDate = new Date("2024-06-15T14:35:22.500Z");
  result = startOf(summerDate, "day", { tz: "Europe/London" });
  // June 15 is BST (British Summer Time, UTC+1)
  // So 00:00 London time = 23:00 previous day UTC
  assertEquals(result.toISOString(), "2024-06-14T23:00:00.000Z");

  // Test with Asia/Tokyo (GMT+9)
  result = startOf(date, "day", { tz: "Asia/Tokyo" });
  // 00:00 Tokyo = 15:00 previous day UTC
  assertEquals(result.toISOString(), "2024-06-14T15:00:00.000Z");
});
