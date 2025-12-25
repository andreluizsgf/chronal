import type { Unit } from "../types/unit.ts";

export function startOf(date: Date, unit: Unit): Date {
  const time = new Date(date.getTime());

  switch (unit) {
    case 'year': {
      time.setUTCMonth(0, 1);
      time.setUTCHours(0, 0, 0, 0);
      break;
    }
    case 'month': {
      time.setUTCDate(1);
      time.setUTCHours(0, 0, 0, 0);
      break;
    }
    case 'week': {
      const day = time.getUTCDay();
      const diff = (day === 0 ? -6 : 1) - day; // Adjust when day is Sunday
      time.setUTCDate(time.getUTCDate() + diff);
      time.setUTCHours(0, 0, 0, 0);
      break;
    }
    case 'day': {
      time.setUTCHours(0, 0, 0, 0);
      break;
    }
    case 'hour': {
      time.setUTCMinutes(0, 0, 0);
      break;
    }
    case 'minute': {
      time.setUTCSeconds(0, 0);
      break;
    }
    case 'second': {
      time.setUTCMilliseconds(0);
      break;
    }
  }

  return time;
}