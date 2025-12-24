export function difference(dateLeft: Date, dateRight: Date, unit: 'years' | 'months' | 'weeks' | 'days' | 'hours' | 'minutes' | 'seconds'): number {
  const delta = dateLeft.getTime() - dateRight.getTime();

  switch (unit) {
    case 'years': {
      const yearDiff = dateLeft.getUTCFullYear() - dateRight.getUTCFullYear();
      const adjustedDateRight = new Date(Date.UTC(
        dateRight.getUTCFullYear() + yearDiff,
        dateRight.getUTCMonth(),
        dateRight.getUTCDate(),
        dateRight.getUTCHours(),
        dateRight.getUTCMinutes(),
        dateRight.getUTCSeconds(),
        dateRight.getUTCMilliseconds()
      ));
      if (adjustedDateRight > dateLeft) {
        return yearDiff - 1;
      }
      return yearDiff;
    }
    case 'months': {
      const yearDiff = dateLeft.getUTCFullYear() - dateRight.getUTCFullYear();
      const monthDiff = dateLeft.getUTCMonth() - dateRight.getUTCMonth();
      let totalMonths = yearDiff * 12 + monthDiff;

      const adjustedDateRight = new Date(Date.UTC(
        dateRight.getUTCFullYear() + Math.floor(totalMonths / 12),
        (dateRight.getUTCMonth() + (totalMonths % 12) + 12) % 12,
        dateRight.getUTCDate(),
        dateRight.getUTCHours(),
        dateRight.getUTCMinutes(),
        dateRight.getUTCSeconds(),
        dateRight.getUTCMilliseconds()
      ));
      if (adjustedDateRight > dateLeft) {
        totalMonths -= 1;
      }
      return totalMonths;
    }
    case 'weeks':
      return Math.floor(delta / 604800000); // 7 * 24 * 60 * 60 * 1000
    case 'days':
      return Math.floor(delta / 86400000); // 24 * 60 * 60 * 1000
    case 'hours':
      return Math.floor(delta / 3600000); // 60 * 60 * 1000
    case 'minutes':
      return Math.floor(delta / 60000); // 60 * 1000
    case 'seconds':
      return Math.floor(delta / 1000);
    default:
      throw new Error(`Unsupported unit: ${unit}`);
  }
}