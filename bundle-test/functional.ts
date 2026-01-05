// Test file: importing only specific functional API functions
import { formatDate, addTime, subTime, startOf, endOf } from "../src/mod.ts";

const date = new Date("2024-06-15T14:35:22Z");

console.log(formatDate(date, "YYYY-MM-DD"));
console.log(addTime(date, { days: 5 }));
console.log(subTime(date, { months: 1 }));
console.log(startOf(date, "month"));
console.log(endOf(date, "day"));
