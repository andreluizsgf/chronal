/**
 * Returns a string representing how long ago the date was from now.
 * 
 * @param date - The date to compare with now
 * @returns A human-readable relative time string
 * 
 * @example
 * ```typescript
 * const fiveMinutesAgo = new Date(Date.now() - 300000);
 * fromNow(fiveMinutesAgo); // "5 minutes ago"
 * 
 * const inTwoHours = new Date(Date.now() + 7200000);
 * fromNow(inTwoHours); // "in 2 hours"
 * ```
 */
export function fromNow(date: Date): string {
  const now = Date.now();
  const diff = now - date.getTime();
  const absDiff = Math.abs(diff);
  
  const seconds = Math.floor(absDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);
  
  const isFuture = diff < 0;
  
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
