// import dayjs from "dayjs";
// import { add as addfns, differenceInDays, differenceInHours, differenceInMinutes, differenceInMonths, differenceInSeconds, differenceInWeeks, differenceInYears, endOfDay, isAfter, isAfter as isAfterfns } from 'date-fns';

// import { bench } from "./benchmark.ts";
// import { format } from "./src/lib/format.ts";
// import { add } from "./src/lib/add.ts";
// import { sub } from "./src/lib/sub.ts";
// import { difference } from "./src/lib/difference.ts";

// // dayjs.extend(utc);

// const d1 = new Date("2025-12-19T23:59:00Z");

// function testFormat() {
//   bench("your-lib", () => {
//     format(d1, "YYYY-MM-DD HH:mm:ss");
//     format(d1, "MM-DD HH");
//     format(d1, "MMM D, YYYY [at] H:mm");
//     format(d1, "[Year:] YYYY, [Month:] MMMM, [Day:] DD");
//     format(d1, "YYYY/MM/DD");
//     format(d1, "DD-MM-YYYY HH:mm:ss.SSS");
//     format(d1, "HH:mm:ss on MMMM D, YYYY");
//   });

//   bench("dayjs", () => {
//     dayjs(d1).format("YYYY-MM-DD HH:mm:ss");
//     dayjs(d1).format("MM-DD HH");
//     dayjs(d1).format("MMM D, YYYY [at] H:mm");
//     dayjs(d1).format("[Year:] YYYY, [Month:] MMMM, [Day:] DD");
//     dayjs(d1).format("YYYY/MM/DD");
//     dayjs(d1).format("DD-MM-YYYY HH:mm:ss.SSS");
//     dayjs(d1).format("HH:mm:ss on MMMM D, YYYY");
//   });
// }

// function testAdd() {
//   console.info("Testing Add Functionality");
//   bench("your-lib", () => {
//     let d = d1;
//     d = add(d, { years: 1 });
//     d = add(d, { months: 2 });
//     d = add(d, { days: 10 });
//     d = add(d, { hours: 5 });
//     d = add(d, { minutes: 30 });
//     d = add(d, { seconds: 45 });
//     // d = add1(d, { milliseconds: 500 });
//   });

//   bench("dayjs", () => {
//     let d = dayjs(d1);
//     d = d.add(1, "year");
//     d = d.add(2, "month");
//     d = d.add(10, "day");
//     d = d.add(5, "hour");
//     d = d.add(30, "minute");
//     d = d.add(45, "second");
//     // d = d.add(500, "millisecond");
//   });

//   bench("date-fns", () => {
//     let d = d1;
//     d = addfns(d, { years: 1 });
//     d = addfns(d, { months: 2 });
//     d = addfns(d, { days: 10 });
//     d = addfns(d, { hours: 5 });
//     d = addfns(d, { minutes: 30 });
//     d = addfns(d, { seconds: 45 });
//   })
// }

// function testSub() {
//   bench("your-lib", () => {
//     let d = d1;
//     d = sub(d, { years: 1 });
//     d = sub(d, { months: 2 });
//     d = sub(d, { days: 10 });
//     d = sub(d, { hours: 5 });
//     d = sub(d, { minutes: 30 });
//     d = sub(d, { seconds: 45 });
//     d = sub(d, { milliseconds: 500 });
//   });

//   bench("dayjs", () => {
//     let d = dayjs(d1);
//     d = d.subtract(1, "year");
//     d = d.subtract(2, "month");
//     d = d.subtract(10, "day");
//     d = d.subtract(5, "hour");
//     d = d.subtract(30, "minute");
//     d = d.subtract(45, "second");
//     d = d.subtract(500, "millisecond");
//   });
// }

// function testEndOf() {
//   bench("your-lib", () => {
//     endOfDay(d1);
//   });

//   bench("dayjs", () => {
//     dayjs(d1).endOf("day");
//   });

//   bench("date-fns", () => {
//     endOfDay(d1);
//   });
// }

// function testIsAfter() {
//   const d2 = new Date("2026-01-01T00:00:00Z");

//   bench("your-lib", () => {
//     isAfter(d1, d2);
//   });

//   bench("dayjs", () => {
//     dayjs(d1).isAfter(dayjs(d2));
//   });

//   bench("date-fns", () => {
//     isAfterfns(d1, d2);
//   });
// }

// function testDifference() {
//   const d2 = new Date("2026-01-01T00:00:00Z");

//   bench("your-lib", () => {
//     difference(d2, d1, 'days');
//     difference(d2, d1, 'hours');
//     difference(d2, d1, 'minutes');
//     difference(d2, d1, 'seconds');
//     difference(d2, d1, 'months');
//     difference(d2, d1, 'weeks');
//     difference(d2, d1, 'years');

//   });

//   bench("dayjs", () => {
//     dayjs(d2).diff(dayjs(d1), 'days');
//     dayjs(d2).diff(dayjs(d1), 'hours');
//     dayjs(d2).diff(dayjs(d1), 'minutes');
//     dayjs(d2).diff(dayjs(d1), 'seconds');
//     dayjs(d2).diff(dayjs(d1), 'months');
//     dayjs(d2).diff(dayjs(d1), 'weeks');
//     dayjs(d2).diff(dayjs(d1), 'years');
//   });

//   bench("date-fns", () => {
//     differenceInDays(d2, d1);
//     differenceInHours(d2, d1);
//     differenceInMinutes(d2, d1);
//     differenceInSeconds(d2, d1);
//     differenceInMonths(d2, d1);
//     differenceInWeeks(d2, d1);
//     differenceInYears(d2, d1);
//   });
// }

// // testFormat();
// // testIsAfter();

// testDifference();
// // testAdd()
