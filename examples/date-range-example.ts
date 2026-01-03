import { dateRange, chronal } from "../src/mod.ts";

console.log("=== Date Range Examples ===\n");

// Example 1: Daily range (functional API)
console.log("1. Daily range (default):");
const start1 = new Date("2024-01-01");
const end1 = new Date("2024-01-05");
const daily = dateRange(start1, end1);
daily.forEach(date => console.log("  ", date.toISOString().split('T')[0]));

// Example 2: Weekly range (functional API)
console.log("\n2. Weekly range:");
const start2 = new Date("2024-01-01");
const end2 = new Date("2024-01-31");
const weekly = dateRange(start2, end2, { weeks: 1 });
weekly.forEach(date => console.log("  ", date.toISOString().split('T')[0]));

// Example 3: Monthly range (functional API)
console.log("\n3. Monthly range:");
const start3 = new Date("2024-01-15");
const end3 = new Date("2024-06-15");
const monthly = dateRange(start3, end3, { months: 1 });
monthly.forEach(date => console.log("  ", date.toISOString().split('T')[0]));

// Example 4: Custom step (every 3 days)
console.log("\n4. Every 3 days:");
const start4 = new Date("2024-01-01");
const end4 = new Date("2024-01-10");
const every3days = dateRange(start4, end4, { days: 3 });
every3days.forEach(date => console.log("  ", date.toISOString().split('T')[0]));

// Example 5: Chainable API
console.log("\n5. Chainable API - Monthly range:");
const start5 = chronal("2024-01-31");
const end5 = chronal("2024-05-31");
const chainable = start5.range(end5, { months: 1 });
chainable.forEach(c => console.log("  ", c.format("YYYY-MM-DD")));

// Example 6: Chain operations on range results
console.log("\n6. Format dates in range:");
const start6 = chronal("2024-06-01");
const end6 = chronal("2024-06-07");
start6.range(end6)
  .map(c => c.format("dddd, MMMM D", { locale: "en-US" }))
  .forEach(formatted => console.log("  ", formatted));

// Example 7: Hourly range
console.log("\n7. Hourly range:");
const start7 = new Date("2024-01-01T09:00:00Z");
const end7 = new Date("2024-01-01T17:00:00Z");
const hourly = dateRange(start7, end7, { hours: 2 });
hourly.forEach(date => console.log("  ", date.toISOString()));

// Example 8: Yearly range
console.log("\n8. Yearly range:");
const start8 = new Date("2020-01-01");
const end8 = new Date("2025-01-01");
const yearly = dateRange(start8, end8, { years: 1 });
yearly.forEach(date => console.log("  ", date.getUTCFullYear()));
