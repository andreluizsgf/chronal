import { assertEquals, assertExists } from "@std/assert";
import { chronal } from "./chronal.ts";

Deno.test("chronal - initialization", async (t) => {
  await t.step("creates instance with current date by default", () => {
    const c = chronal();
    assertExists(c.date);
    assertEquals(c.date instanceof Date, true);
  });

  await t.step("creates instance from Date object", () => {
    const date = new Date("2024-06-15T12:00:00Z");
    const c = chronal(date);
    assertEquals(c.date.toISOString(), "2024-06-15T12:00:00.000Z");
  });

  await t.step("creates instance from string", () => {
    const c = chronal("2024-06-15T12:00:00Z");
    assertEquals(c.date.toISOString(), "2024-06-15T12:00:00.000Z");
  });

  await t.step("creates instance from timestamp", () => {
    const timestamp = new Date("2024-06-15T12:00:00Z").getTime();
    const c = chronal(timestamp);
    assertEquals(c.date.toISOString(), "2024-06-15T12:00:00.000Z");
  });
});

Deno.test("chronal - manipulation methods", async (t) => {
  await t.step("add() adds time units", () => {
    const c = chronal("2024-06-15T12:00:00Z");
    const result = c.add({ days: 5, hours: 3 });

    assertEquals(result.date.toISOString(), "2024-06-20T15:00:00.000Z");
    // Original should not be mutated
    assertEquals(c.date.toISOString(), "2024-06-15T12:00:00.000Z");
  });

  await t.step("subtract() subtracts time units", () => {
    const c = chronal("2024-06-15T12:00:00Z");
    const result = c.subtract({ months: 1, days: 5 });

    assertEquals(result.date.toISOString(), "2024-05-10T12:00:00.000Z");
    assertEquals(c.date.toISOString(), "2024-06-15T12:00:00.000Z");
  });

  await t.step("startOf() returns start of time unit", () => {
    const c = chronal("2024-06-15T12:30:45Z");

    assertEquals(
      c.startOf("year").date.toISOString(),
      "2024-01-01T00:00:00.000Z",
    );
    assertEquals(
      c.startOf("month").date.toISOString(),
      "2024-06-01T00:00:00.000Z",
    );
    assertEquals(
      c.startOf("day").date.toISOString(),
      "2024-06-15T00:00:00.000Z",
    );
    assertEquals(
      c.startOf("hour").date.toISOString(),
      "2024-06-15T12:00:00.000Z",
    );
  });

  await t.step("endOf() returns end of time unit", () => {
    const c = chronal("2024-06-15T12:30:45Z");

    assertEquals(
      c.endOf("year").date.toISOString(),
      "2024-12-31T23:59:59.999Z",
    );
    assertEquals(
      c.endOf("month").date.toISOString(),
      "2024-06-30T23:59:59.999Z",
    );
    assertEquals(c.endOf("day").date.toISOString(), "2024-06-15T23:59:59.999Z");
    assertEquals(
      c.endOf("hour").date.toISOString(),
      "2024-06-15T12:59:59.999Z",
    );
  });

  await t.step("set() sets specific units", () => {
    const c = chronal("2024-06-15T12:30:45Z");
    const result = c.set({
      year: 2025,
      month: 0,
      day: 1,
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
    });

    assertEquals(result.date.toISOString(), "2025-01-01T00:00:00.000Z");
    assertEquals(c.date.toISOString(), "2024-06-15T12:30:45.000Z");
  });

  await t.step("clamp() clamps date between bounds", () => {
    const c = chronal("2024-06-15");
    const min = new Date("2024-06-10");
    const max = new Date("2024-06-20");

    // Within bounds
    assertEquals(c.clamp(min, max).date.getUTCDate(), 15);

    // Before min
    const early = chronal("2024-06-05");
    assertEquals(early.clamp(min, max).date.getUTCDate(), 10);

    // After max
    const late = chronal("2024-06-25");
    assertEquals(late.clamp(min, max).date.getUTCDate(), 20);
  });
});

Deno.test("chronal - display methods", async (t) => {
  await t.step("format() formats date", () => {
    const c = chronal("2024-06-15T12:30:45Z");

    assertEquals(c.format("YYYY-MM-DD"), "2024-06-15");
    assertEquals(c.format("DD/MM/YYYY HH:mm"), "15/06/2024 12:30");
    assertEquals(c.format("MMMM D, YYYY"), "June 15, 2024");
  });

  await t.step("format() supports locale", () => {
    const c = chronal("2024-06-15T12:30:45Z");

    assertEquals(c.format("MMMM", { locale: "pt-BR" }), "junho");
    assertEquals(c.format("MMMM", { locale: "es-ES" }), "junio");
  });

  await t.step("fromNow() returns relative time", () => {
    const yesterday = new Date(Date.now() - 86400000);
    const c = chronal(yesterday);

    assertEquals(c.fromNow(), "1 day ago");
  });

  await t.step("toNow() returns relative time", () => {
    const yesterday = new Date(Date.now() - 86400000);
    const c = chronal(yesterday);

    assertEquals(c.toNow(), "1 day ago");
  });
});

Deno.test("chronal - query methods", async (t) => {
  await t.step("diff() calculates difference", () => {
    const c1 = chronal("2024-06-15");
    const c2 = chronal("2024-06-20");

    assertEquals(c1.diff(c2, "days"), -5);
    assertEquals(c2.diff(c1, "days"), 5);
  });

  await t.step("isAfter() checks if after", () => {
    const c1 = chronal("2024-06-15");
    const c2 = chronal("2024-06-20");

    assertEquals(c1.isAfter(c2), false);
    assertEquals(c2.isAfter(c1), true);
  });

  await t.step("isBefore() checks if before", () => {
    const c1 = chronal("2024-06-15");
    const c2 = chronal("2024-06-20");

    assertEquals(c1.isBefore(c2), true);
    assertEquals(c2.isBefore(c1), false);
  });

  await t.step("isBetween() checks if between dates", () => {
    const c = chronal("2024-06-15");
    const start = new Date("2024-06-10");
    const end = new Date("2024-06-20");

    assertEquals(c.isBetween(start, end), true);

    const early = chronal("2024-06-05");
    assertEquals(early.isBetween(start, end), false);
  });

  await t.step("isEqual() checks equality", () => {
    const c1 = chronal("2024-06-15T12:00:00Z");
    const c2 = chronal("2024-06-15T12:00:00Z");
    const c3 = chronal("2024-06-15T12:00:01Z");

    assertEquals(c1.isEqual(c2.date), true);
    assertEquals(c1.isEqual(c3.date), false);
  });

  await t.step("isSame() checks same time unit", () => {
    const c1 = chronal("2024-06-15T12:00:00Z");
    const c2 = chronal("2024-06-20T15:30:00Z");

    assertEquals(c1.isSame(c2.date, "year"), true);
    assertEquals(c1.isSame(c2.date, "month"), true);
    assertEquals(c1.isSame(c2.date, "day"), false);
  });

  await t.step("isToday() checks if today", () => {
    const today = chronal();
    const yesterday = chronal(new Date(Date.now() - 86400000));

    assertEquals(today.isToday(), true);
    assertEquals(yesterday.isToday(), false);
  });

  await t.step("isTomorrow() checks if tomorrow", () => {
    const tomorrow = chronal(new Date(Date.now() + 86400000));
    const today = chronal();

    assertEquals(tomorrow.isTomorrow(), true);
    assertEquals(today.isTomorrow(), false);
  });

  await t.step("isYesterday() checks if yesterday", () => {
    const yesterday = chronal(new Date(Date.now() - 86400000));
    const today = chronal();

    assertEquals(yesterday.isYesterday(), true);
    assertEquals(today.isYesterday(), false);
  });

  await t.step("isLeapYear() checks leap year", () => {
    assertEquals(chronal("2024-06-15").isLeapYear(), true);
    assertEquals(chronal("2023-06-15").isLeapYear(), false);
    assertEquals(chronal("2000-01-01").isLeapYear(), true);
    assertEquals(chronal("1900-01-01").isLeapYear(), false);
  });

  await t.step("isValid() checks if date is valid", () => {
    assertEquals(chronal("2024-06-15").isValid(), true);
    assertEquals(chronal(new Date("invalid")).isValid(), false);
  });
});

Deno.test("chronal - get methods", async (t) => {
  await t.step("get() retrieves unit values", () => {
    const c = chronal("2024-06-15T12:30:45Z");

    assertEquals(c.get("year"), 2024);
    assertEquals(c.get("month"), 5); // 0-indexed
    assertEquals(c.get("day"), 15);
    assertEquals(c.get("hour"), 12);
    assertEquals(c.get("minute"), 30);
    assertEquals(c.get("second"), 45);
  });

  await t.step("quarter() returns quarter", () => {
    assertEquals(chronal("2024-01-15").quarter(), 1);
    assertEquals(chronal("2024-04-15").quarter(), 2);
    assertEquals(chronal("2024-07-15").quarter(), 3);
    assertEquals(chronal("2024-10-15").quarter(), 4);
  });

  await t.step("daysInMonth() returns days in month", () => {
    assertEquals(chronal("2024-01-15").daysInMonth(), 31);
    assertEquals(chronal("2024-02-15").daysInMonth(), 29); // leap year
    assertEquals(chronal("2023-02-15").daysInMonth(), 28);
    assertEquals(chronal("2024-04-15").daysInMonth(), 30);
  });

  await t.step("week() returns week of year", () => {
    const c = chronal("2024-06-15");
    const week = c.week();

    assertEquals(typeof week, "number");
    assertEquals(week > 0 && week <= 53, true);
  });
});

Deno.test("chronal - method chaining", async (t) => {
  await t.step("chains manipulation methods", () => {
    const result = chronal("2024-01-15")
      .add({ months: 6 })
      .add({ days: 10 })
      .startOf("month")
      .add({ days: 5 })
      .format("YYYY-MM-DD");

    assertEquals(result, "2024-07-06");
  });

  await t.step("chains multiple operations", () => {
    const result = chronal("2024-06-15T12:30:45Z")
      .add({ days: 5 })
      .subtract({ hours: 2 })
      .set({ minute: 0, second: 0 })
      .format("YYYY-MM-DD HH:mm:ss");

    assertEquals(result, "2024-06-20 10:00:00");
  });

  await t.step("preserves immutability in chains", () => {
    const original = chronal("2024-01-01");
    const modified = original
      .add({ months: 1 })
      .add({ days: 5 });

    assertEquals(original.format("YYYY-MM-DD"), "2024-01-01");
    assertEquals(modified.format("YYYY-MM-DD"), "2024-02-06");
  });
});

Deno.test("chronal - edge cases", async (t) => {
  await t.step("handles invalid dates gracefully", () => {
    const invalid = chronal(new Date("invalid"));
    assertEquals(invalid.isValid(), false);
  });

  await t.step("handles month boundaries correctly", () => {
    const jan31 = chronal("2024-01-31");
    const result = jan31.add({ months: 1 });

    // Should handle Feb 31 -> Mar 2/3 (since Feb has 29 days in 2024)
    assertEquals(result.get("month") >= 1, true);
  });

  await t.step("works with both Date objects and Chronal instances", () => {
    const c1 = chronal("2024-06-15");
    const c2 = chronal("2024-06-20");
    const date = new Date("2024-06-20");

    // Should work with both
    assertEquals(c1.diff(c2, "days"), c1.diff(date, "days"));
    assertEquals(c1.isAfter(c2.date), c1.isAfter(date));
  });

  await t.step("handles timezone consistently (UTC)", () => {
    const c = chronal("2024-06-15T23:59:59Z");
    const result = c.add({ seconds: 2 });

    assertEquals(result.format("YYYY-MM-DD"), "2024-06-16");
  });
});

Deno.test("chronal - until method", async (t) => {
  await t.step("generates daily range", () => {
    const start = chronal("2024-01-01T00:00:00Z");
    const end = new Date("2024-01-05T00:00:00Z");

    const result = start.until(end);

    assertEquals(result.length, 5);
    assertEquals(result[0].date.toISOString(), "2024-01-01T00:00:00.000Z");
    assertEquals(result[4].date.toISOString(), "2024-01-05T00:00:00.000Z");
  });

  await t.step("generates range with custom step", () => {
    const start = chronal("2024-01-01");
    const end = chronal("2024-01-31");

    const result = start.until(end, { weeks: 1 });

    assertEquals(result.length, 5);
    assertEquals(result[0].date.toISOString(), "2024-01-01T00:00:00.000Z");
    assertEquals(result[1].date.toISOString(), "2024-01-08T00:00:00.000Z");
  });

  await t.step("works with Chronal end date", () => {
    const start = chronal("2024-01-01");
    const end = chronal("2024-01-10");

    const result = start.until(end, { days: 3 });

    assertEquals(result.length, 4);
    assertEquals(result[0].date.toISOString(), "2024-01-01T00:00:00.000Z");
    assertEquals(result[3].date.toISOString(), "2024-01-10T00:00:00.000Z");
  });

  await t.step("returns array of Chronal instances", () => {
    const start = chronal("2024-01-01");
    const end = new Date("2024-01-03");

    const result = start.until(end);

    // All items should have Chronal methods
    assertEquals(typeof result[0].format, "function");
    assertEquals(typeof result[0].add, "function");
    assertEquals(result[0].format("YYYY-MM-DD"), "2024-01-01");
  });
});

Deno.test("chronal - timezone handling", async (t) => {
  await t.step("stores timezone in instance", () => {
    const c = chronal("2024-06-15T14:30:00", { tz: "America/Sao_Paulo" });
    assertEquals(c.timezone, "America/Sao_Paulo");
  });

  await t.step("preserves timezone across manipulation methods", () => {
    const c = chronal("2024-06-15T14:30:00", { tz: "America/Sao_Paulo" });

    assertEquals(c.add({ days: 1 }).timezone, "America/Sao_Paulo");
    assertEquals(c.subtract({ hours: 2 }).timezone, "America/Sao_Paulo");
    assertEquals(c.startOf("day").timezone, "America/Sao_Paulo");
    assertEquals(c.endOf("month").timezone, "America/Sao_Paulo");
    assertEquals(c.set({ hour: 10 }).timezone, "America/Sao_Paulo");

    const min = new Date("2024-06-01");
    const max = new Date("2024-06-30");
    assertEquals(c.clamp(min, max).timezone, "America/Sao_Paulo");
  });

  await t.step("uses instance timezone for formatting", () => {
    const c = chronal("2024-06-15T17:30:00Z", { tz: "America/Sao_Paulo" });

    // São Paulo is UTC-3, so 17:30 UTC = 14:30 local
    const formatted = c.format("YYYY-MM-DD HH:mm:ss");
    assertEquals(formatted, "2024-06-15 14:30:00");
  });

  await t.step("uses instance timezone for startOf/endOf", () => {
    const c = chronal("2024-06-15T03:30:00Z", { tz: "America/Sao_Paulo" });

    // 03:30 UTC = 00:30 São Paulo (still June 15)
    // Start of day in São Paulo = midnight São Paulo = 03:00 UTC
    const startOfDay = c.startOf("day");
    assertEquals(startOfDay.date.toISOString(), "2024-06-15T03:00:00.000Z");
    assertEquals(startOfDay.timezone, "America/Sao_Paulo");
  });

  await t.step("allows timezone override per method call", () => {
    const c = chronal("2024-06-15T14:30:00Z", { tz: "America/Sao_Paulo" });

    // Format with instance timezone (São Paulo, UTC-3)
    assertEquals(c.format("YYYY-MM-DD HH:mm"), "2024-06-15 11:30");

    // Format with UTC override
    assertEquals(
      c.format("YYYY-MM-DD HH:mm", { tz: "UTC" }),
      "2024-06-15 14:30",
    );
  });

  await t.step("preserves timezone in until() generated dates", () => {
    const start = chronal("2024-01-01", { tz: "America/Sao_Paulo" });
    const end = new Date("2024-01-05");

    const result = start.until(end);

    // All generated dates should have São Paulo timezone
    assertEquals(result.length, 4); // Jan 1-4 (end is Jan 5 00:00 UTC, but start times are 03:00 UTC)
    assertEquals(result[0].timezone, "America/Sao_Paulo");
    assertEquals(result[1].timezone, "America/Sao_Paulo");
    assertEquals(result[3].timezone, "America/Sao_Paulo");
  });

  await t.step("works without timezone (uses config default)", () => {
    const c = chronal("2024-06-15T14:30:00Z");

    assertEquals(c.timezone, undefined);
    // Should use config.timezone (default: UTC)
    assertEquals(c.format("YYYY-MM-DD HH:mm"), "2024-06-15 14:30");
  });
});
