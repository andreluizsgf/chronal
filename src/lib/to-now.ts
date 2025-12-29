/**
 * Returns a string representing the time from now to the date.
 * This is the inverse of fromNow() - it shows how long until/since a date from the perspective of looking forward to it.
 * 
 * @param date - The date to compare with now
 * @returns A human-readable relative time string
 * 
 * @example
 * ```typescript
 * const inFiveMinutes = new Date(Date.now() + 300000);
 * toNow(inFiveMinutes); // "in 5 minutes"
 * 
 * const twoHoursAgo = new Date(Date.now() - 7200000);
 * toNow(twoHoursAgo); // "2 hours ago"
 * ```
 */
export function toNow(date: Date): string {
  const now = Date.now();
  const diff = date.getTime() - now;
  const absDiff = Math.abs(diff);
  
  const seconds = Math.floor(absDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);
  
  const isFuture = diff > 0;
  
  if (seconds < 60) {
    return "just now";
  }
  
  if (minutes < 60) {
    const unit = minutes === 1 ? "minute" : "minutes";
    return isFuture ? `in ${minutes} ${unit}` : `${minutes} ${unit} ago`;
  }
  
  if (hours < 24) {
    const unit = hours === 1 ? "hour" : "hours";
    return isFuture ? `in ${hours} ${unit}` : `${hours} ${unit} ago`;
  }
  
  if (days < 30) {
    const unit = days === 1 ? "day" : "days";
    return isFuture ? `in ${days} ${unit}` : `${days} ${unit} ago`;
  }
  
  if (months < 12) {
    const unit = months === 1 ? "month" : "months";
    return isFuture ? `in ${months} ${unit}` : `${months} ${unit} ago`;
  }
  
  const unit = years === 1 ? "year" : "years";
  return isFuture ? `in ${years} ${unit}` : `${years} ${unit} ago`;
}
