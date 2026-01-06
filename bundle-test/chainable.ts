// Test file: importing the chainable API
import { chronal } from "../src/mod.ts";

const date = chronal("2024-06-15T14:35:22Z");

console.log(date.format("YYYY-MM-DD"));
console.log(date.add({ days: 5 }).date);
console.log(date.subtract({ months: 1 }).date);
console.log(date.startOf("month").date);
console.log(date.endOf("day").date);