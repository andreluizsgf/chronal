// import dayjs from "npm:dayjs@1.11.13";
// import utc from "npm:dayjs@1.11.13/plugin/utc.js";
// import {
//   add as datefnsAdd,
//   sub as datefnsSub,
//   isAfter as datefnsIsAfter,
//   isBefore as datefnsIsBefore,
//   isEqual as datefnsIsEqual,
//   format as datefnsFormat
// } from "npm:date-fns@4.1.0";

// // Your lib imports
// import { add } from "./src/lib/add.ts";
// import { sub } from "./src/lib/sub.ts";
// import { startOf } from "./src/lib/start-of.ts";
// import { endOf } from "./src/lib/end-of.ts";
// import { isAfter } from "./src/lib/is-after.ts";
// import { isBefore } from "./src/lib/is-before.ts";
// import { format } from "./src/lib/format.ts";

// dayjs.extend(utc);

// // Test utilities
// let passed = 0;
// let failed = 0;

// function assert(condition: boolean, message: string) {
//   if (condition) {
//     passed++;
//     console.log(`✅ ${message}`);
//   } else {
//     failed++;
//     console.log(`❌ ${message}`);
//   }
// }

// function assertEqual(actual: any, expected: any, message: string) {
//   const match = JSON.stringify(actual) === JSON.stringify(expected);
//   if (match) {
//     passed++;
//     console.log(`✅ ${message}`);
//   } else {
//     failed++;
//     console.log(`❌ ${message}`);
//     console.log(`   Expected: ${JSON.stringify(expected)}`);
//     console.log(`   Got:      ${JSON.stringify(actual)}`);
//   }
// }

// console.log("\n=== Testing ADD function ===\n");

// // Test 1: Add days
// const date1 = new Date('2024-01-15T12:30:45Z');
// const yourAdd1 = add(date1, { days: 5 });
// const datefnsAdd1 = datefnsAdd(date1, { days: 5 });
// assertEqual(yourAdd1.toISOString(), datefnsAdd1.toISOString(), "Add 5 days");

// // Test 2: Add months
// const date2 = new Date('2024-01-31T12:00:00Z');
// const yourAdd2 = add(date2, { months: 1 });
// const datefnsAdd2 = datefnsAdd(date2, { months: 1 });
// assertEqual(yourAdd2.toISOString(), datefnsAdd2.toISOString(), "Add 1 month to Jan 31 (should be Feb 29, 2024)");

// // Test 3: Add years + months
// const date3 = new Date('2024-01-15T12:00:00Z');
// const yourAdd3 = add(date3, { years: 1, months: 2 });
// const datefnsAdd3 = datefnsAdd(date3, { years: 1, months: 2 });
// assertEqual(yourAdd3.toISOString(), datefnsAdd3.toISOString(), "Add 1 year + 2 months");

// // Test 4: Add hours + minutes
// const date4 = new Date('2024-01-15T12:00:00Z');
// const yourAdd4 = add(date4, { hours: 5, minutes: 30 });
// const datefnsAdd4 = datefnsAdd(date4, { hours: 5, minutes: 30 });
// assertEqual(yourAdd4.toISOString(), datefnsAdd4.toISOString(), "Add 5 hours + 30 minutes");

// console.log("\n=== Testing SUB function ===\n");

// // Test 5: Subtract days
// const yourSub1 = sub(date1, { days: 5 });
// const datefnsSub1 = datefnsSub(date1, { days: 5 });
// assertEqual(yourSub1.toISOString(), datefnsSub1.toISOString(), "Subtract 5 days");

// // Test 6: Subtract months
// const date5 = new Date('2024-03-31T12:00:00Z');
// const yourSub2 = sub(date5, { months: 1 });
// const datefnsSub2 = datefnsSub(date5, { months: 1 });
// assertEqual(yourSub2.toISOString(), datefnsSub2.toISOString(), "Subtract 1 month from Mar 31");

// console.log("\n=== Testing START OF function ===\n");

// const testDate = new Date('2024-06-15T14:35:22.500Z');

// // Test 7: Start of year
// const yourStartYear = startOf(testDate, 'year');
// const dayjsStartYear = dayjs.utc(testDate).startOf('year').toDate();
// assertEqual(yourStartYear.toISOString(), dayjsStartYear.toISOString(), "Start of year");

// // Test 8: Start of month
// const yourStartMonth = startOf(testDate, 'month');
// const dayjsStartMonth = dayjs.utc(testDate).startOf('month').toDate();
// assertEqual(yourStartMonth.toISOString(), dayjsStartMonth.toISOString(), "Start of month");

// // Test 9: Start of day
// const yourStartDay = startOf(testDate, 'day');
// const dayjsStartDay = dayjs.utc(testDate).startOf('day').toDate();
// assertEqual(yourStartDay.toISOString(), dayjsStartDay.toISOString(), "Start of day");

// // Test 10: Start of hour
// const yourStartHour = startOf(testDate, 'hour');
// const dayjsStartHour = dayjs.utc(testDate).startOf('hour').toDate();
// assertEqual(yourStartHour.toISOString(), dayjsStartHour.toISOString(), "Start of hour");

// // Test 11: Start of minute
// const yourStartMinute = startOf(testDate, 'minute');
// const dayjsStartMinute = dayjs.utc(testDate).startOf('minute').toDate();
// assertEqual(yourStartMinute.toISOString(), dayjsStartMinute.toISOString(), "Start of minute");

// // Test 12: Start of second
// const yourStartSecond = startOf(testDate, 'second');
// const dayjsStartSecond = dayjs.utc(testDate).startOf('second').toDate();
// assertEqual(yourStartSecond.toISOString(), dayjsStartSecond.toISOString(), "Start of second");

// console.log("\n=== Testing END OF function ===\n");

// // Test 13: End of year
// const yourEndYear = endOf(testDate, 'year');
// const dayjsEndYear = dayjs.utc(testDate).endOf('year').toDate();
// assertEqual(yourEndYear.toISOString(), dayjsEndYear.toISOString(), "End of year");

// // Test 14: End of month
// const yourEndMonth = endOf(testDate, 'month');
// const dayjsEndMonth = dayjs.utc(testDate).endOf('month').toDate();
// assertEqual(yourEndMonth.toISOString(), dayjsEndMonth.toISOString(), "End of month");

// // Test 15: End of day
// const yourEndDay = endOf(testDate, 'day');
// const dayjsEndDay = dayjs.utc(testDate).endOf('day').toDate();
// assertEqual(yourEndDay.toISOString(), dayjsEndDay.toISOString(), "End of day");

// // Test 16: End of hour
// const yourEndHour = endOf(testDate, 'hour');
// const dayjsEndHour = dayjs.utc(testDate).endOf('hour').toDate();
// assertEqual(yourEndHour.toISOString(), dayjsEndHour.toISOString(), "End of hour");

// // Test 17: End of minute
// const yourEndMinute = endOf(testDate, 'minute');
// const dayjsEndMinute = dayjs.utc(testDate).endOf('minute').toDate();
// assertEqual(yourEndMinute.toISOString(), dayjsEndMinute.toISOString(), "End of minute");

// // Test 18: End of second
// const yourEndSecond = endOf(testDate, 'second');
// const dayjsEndSecond = dayjs.utc(testDate).endOf('second').toDate();
// assertEqual(yourEndSecond.toISOString(), dayjsEndSecond.toISOString(), "End of second");

// console.log("\n=== Testing IS AFTER/BEFORE functions ===\n");

// const dateA = new Date('2024-01-15T12:00:00Z');
// const dateB = new Date('2024-01-20T12:00:00Z');

// // Test 19: isAfter
// const yourIsAfter = isAfter(dateB, dateA);
// const datefnsIsAfter1 = datefnsIsAfter(dateB, dateA);
// assertEqual(yourIsAfter, datefnsIsAfter1, "dateB is after dateA");

// // Test 20: isAfter (false case)
// const yourIsAfter2 = isAfter(dateA, dateB);
// const datefnsIsAfter2 = datefnsIsAfter(dateA, dateB);
// assertEqual(yourIsAfter2, datefnsIsAfter2, "dateA is not after dateB");

// // Test 21: isBefore
// const yourIsBefore = isBefore(dateA, dateB);
// const datefnsIsBefore1 = datefnsIsBefore(dateA, dateB);
// assertEqual(yourIsBefore, datefnsIsBefore1, "dateA is before dateB");

// // Test 22: isBefore (false case)
// const yourIsBefore2 = isBefore(dateB, dateA);
// const datefnsIsBefore2 = datefnsIsBefore(dateB, dateA);
// assertEqual(yourIsBefore2, datefnsIsBefore2, "dateB is not before dateA");

// console.log("\n=== Testing FORMAT function ===\n");

// const formatDate = new Date('2024-06-15T14:35:22Z');

// // Test 23: YYYY-MM-DD
// const yourFormat1 = format(formatDate, 'YYYY-MM-DD');
// const dayjsFormat1 = dayjs.utc(formatDate).format('YYYY-MM-DD');
// assertEqual(yourFormat1, dayjsFormat1, "Format: YYYY-MM-DD");

// // Test 24: YYYY-MM-DD HH:mm:ss
// const yourFormat2 = format(formatDate, 'YYYY-MM-DD HH:mm:ss');
// const dayjsFormat2 = dayjs.utc(formatDate).format('YYYY-MM-DD HH:mm:ss');
// assertEqual(yourFormat2, dayjsFormat2, "Format: YYYY-MM-DD HH:mm:ss");

// // Test 25: D/M/YYYY
// const yourFormat3 = format(formatDate, 'D/M/YYYY');
// const dayjsFormat3 = dayjs.utc(formatDate).format('D/M/YYYY');
// assertEqual(yourFormat3, dayjsFormat3, "Format: D/M/YYYY");

// // Test 26: HH:mm
// const yourFormat4 = format(formatDate, 'HH:mm');
// const dayjsFormat4 = dayjs.utc(formatDate).format('HH:mm');
// assertEqual(yourFormat4, dayjsFormat4, "Format: HH:mm");

// // Test 27: YYYY-MM-DD [at] HH:mm
// const yourFormat5 = format(formatDate, 'YYYY-MM-DD [at] HH:mm');
// const dayjsFormat5 = dayjs.utc(formatDate).format('YYYY-MM-DD [at] HH:mm');
// assertEqual(yourFormat5, dayjsFormat5, "Format with literal: YYYY-MM-DD [at] HH:mm");

// console.log("\n=== Testing EDGE CASES ===\n");

// // Test 28: Leap year - add 1 year to Feb 29
// const leapDate = new Date('2024-02-29T12:00:00Z');
// const yourLeapAdd = add(leapDate, { years: 1 });
// const datefnsLeapAdd = datefnsAdd(leapDate, { years: 1 });
// assertEqual(yourLeapAdd.toISOString(), datefnsLeapAdd.toISOString(), "Add 1 year to Feb 29 (leap year)");

// // Test 29: Month overflow
// const date6 = new Date('2024-01-31T12:00:00Z');
// const yourOverflow = add(date6, { months: 13 });
// const datefnsOverflow = datefnsAdd(date6, { months: 13 });
// assertEqual(yourOverflow.toISOString(), datefnsOverflow.toISOString(), "Add 13 months (overflow)");

// // Test 30: Negative values
// const yourNegative = add(date1, { days: -5 });
// const datefnsNegative = datefnsAdd(date1, { days: -5 });
// assertEqual(yourNegative.toISOString(), datefnsNegative.toISOString(), "Add negative days");

// console.log("\n" + "=".repeat(50));
// console.log(`SUMMARY: ${passed} passed, ${failed} failed`);
// console.log("=".repeat(50) + "\n");

// if (failed > 0) {
//   Deno.exit(1);
// }
