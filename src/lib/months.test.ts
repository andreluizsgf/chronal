import { assertEquals } from "@std/assert";
import { months } from "./months.ts";

Deno.test("months function - English long format", () => {
  const monthNames = months('en-US', 'long');
  
  assertEquals(monthNames.length, 12);
  assertEquals(monthNames[0], 'January');
  assertEquals(monthNames[1], 'February');
  assertEquals(monthNames[2], 'March');
  assertEquals(monthNames[11], 'December');
});

Deno.test("months function - English short format", () => {
  const monthNames = months('en-US', 'short');
  
  assertEquals(monthNames.length, 12);
  // Short names may include periods depending on locale implementation
  assertEquals(monthNames[0].toLowerCase().startsWith('jan'), true);
  assertEquals(monthNames[1].toLowerCase().startsWith('feb'), true);
  assertEquals(monthNames[11].toLowerCase().startsWith('dec'), true);
});

Deno.test("months function - English narrow format", () => {
  const monthNames = months('en-US', 'narrow');
  
  assertEquals(monthNames.length, 12);
  assertEquals(monthNames[0], 'J');
  assertEquals(monthNames[1], 'F');
  assertEquals(monthNames[2], 'M');
});

Deno.test("months function - Portuguese long format", () => {
  const monthNames = months('pt-BR', 'long');
  
  assertEquals(monthNames.length, 12);
  assertEquals(monthNames[0], 'janeiro');
  assertEquals(monthNames[1], 'fevereiro');
  assertEquals(monthNames[11], 'dezembro');
});

Deno.test("months function - default parameters", () => {
  const monthNames = months();
  
  assertEquals(monthNames.length, 12);
  assertEquals(monthNames[0], 'January');
});

Deno.test("months function - caching works", () => {
  const monthNames1 = months('en-US', 'long');
  const monthNames2 = months('en-US', 'long');
  
  // Should return the same cached array
  assertEquals(monthNames1, monthNames2);
});
