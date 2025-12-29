import { assertEquals } from "@std/assert";
import { getQuarter } from "./get-quarter.ts";

Deno.test("getQuarter function - Q1 January", () => {
  const date = new Date("2024-01-15");
  assertEquals(getQuarter(date), 1);
});

Deno.test("getQuarter function - Q1 February", () => {
  const date = new Date("2024-02-15");
  assertEquals(getQuarter(date), 1);
});

Deno.test("getQuarter function - Q1 March", () => {
  const date = new Date("2024-03-15");
  assertEquals(getQuarter(date), 1);
});

Deno.test("getQuarter function - Q2 April", () => {
  const date = new Date("2024-04-15");
  assertEquals(getQuarter(date), 2);
});

Deno.test("getQuarter function - Q2 May", () => {
  const date = new Date("2024-05-15");
  assertEquals(getQuarter(date), 2);
});

Deno.test("getQuarter function - Q2 June", () => {
  const date = new Date("2024-06-15");
  assertEquals(getQuarter(date), 2);
});

Deno.test("getQuarter function - Q3 July", () => {
  const date = new Date("2024-07-15");
  assertEquals(getQuarter(date), 3);
});

Deno.test("getQuarter function - Q3 August", () => {
  const date = new Date("2024-08-15");
  assertEquals(getQuarter(date), 3);
});

Deno.test("getQuarter function - Q3 September", () => {
  const date = new Date("2024-09-15");
  assertEquals(getQuarter(date), 3);
});

Deno.test("getQuarter function - Q4 October", () => {
  const date = new Date("2024-10-15");
  assertEquals(getQuarter(date), 4);
});

Deno.test("getQuarter function - Q4 November", () => {
  const date = new Date("2024-11-15");
  assertEquals(getQuarter(date), 4);
});

Deno.test("getQuarter function - Q4 December", () => {
  const date = new Date("2024-12-15");
  assertEquals(getQuarter(date), 4);
});
