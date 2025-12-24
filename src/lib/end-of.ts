export function endOf(date: Date, unit: 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second'): Date {
  const time = new Date(date.getTime());

  switch (unit) {
    case 'year': {
      time.setUTCMonth(11, 31);
      time.setUTCHours(23, 59, 59, 999);
      break;
    }
    case 'month': {
      const year = time.getUTCFullYear();
      const month = time.getUTCMonth();
      const lastDay = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
      time.setUTCDate(lastDay);
      time.setUTCHours(23, 59, 59, 999);
      break;
    }
    case 'day': {
      time.setUTCHours(23, 59, 59, 999);
      break;
    }
    case 'hour': {
      time.setUTCMinutes(59, 59, 999);
      break;
    }
    case 'minute': {
      time.setUTCSeconds(59, 999);
      break;
    }
    case 'second': {
      time.setUTCMilliseconds(999);
      break;
    }
  }

  return time;
}