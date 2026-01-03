type RangeStep = {
  years?: number;
  months?: number;
  weeks?: number;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
  milliseconds?: number;
};

/**
 * Generates an array of dates between start and end dates with a specified step.
 * 
 * @param start - The start date (inclusive)
 * @param end - The end date (inclusive)
 * @param step - The step increment (default: { days: 1 })
 * @returns An array of Date objects from start to end
 * 
 * @example
 * ```typescript
 * const start = new Date("2024-01-01");
 * const end = new Date("2024-01-05");
 * 
 * dateRange(start, end); // Array of 5 dates (Jan 1-5)
 * dateRange(start, end, { days: 2 }); // Array of 3 dates (Jan 1, 3, 5)
 * 
 * // Weekly range
 * const weekStart = new Date("2024-01-01");
 * const weekEnd = new Date("2024-01-31");
 * dateRange(weekStart, weekEnd, { weeks: 1 }); // Array of 5 dates (every Monday)
 * ```
 */
export function dateRange(
  start: Date,
  end: Date,
  step: RangeStep = { days: 1 }
): Date[] {
  const result: Date[] = [];
  const startTime = start.getTime();
  const endTime = end.getTime();
  
  // Calculate step in milliseconds
  let stepMs = 0;
  
  // For simple time-based steps (not calendar-based)
  if (!step.years && !step.months) {
    stepMs += (step.weeks ?? 0) * 7 * 24 * 60 * 60 * 1000;
    stepMs += (step.days ?? 0) * 24 * 60 * 60 * 1000;
    stepMs += (step.hours ?? 0) * 60 * 60 * 1000;
    stepMs += (step.minutes ?? 0) * 60 * 1000;
    stepMs += (step.seconds ?? 0) * 1000;
    stepMs += (step.milliseconds ?? 0);
    
    if (stepMs === 0) {
      stepMs = 24 * 60 * 60 * 1000; // Default to 1 day
    }
    
    // Generate dates using timestamp arithmetic
    let currentTime = startTime;
    while (currentTime <= endTime) {
      result.push(new Date(currentTime));
      currentTime += stepMs;
    }
  } else {
    // For calendar-based steps (years/months), use Date arithmetic
    let current = new Date(start.getTime());
    const originalDay = start.getUTCDate(); // Preserve the original day
    let iterationCount = 0;
    
    while (current.getTime() <= endTime) {
      result.push(new Date(current.getTime()));
      
      iterationCount++;
      
      // Apply calendar-based increments
      if (step.years || step.months) {
        const years = step.years ?? 0;
        const months = step.months ?? 0;
        
        const startYear = start.getUTCFullYear();
        const startMonth = start.getUTCMonth();
        
        // Calculate target year and month based on original start date
        let targetMonth = startMonth + (months * iterationCount);
        const targetYear = startYear + (years * iterationCount) + Math.floor(targetMonth / 12);
        targetMonth = ((targetMonth % 12) + 12) % 12;
        
        const lastDayOfTargetMonth = new Date(Date.UTC(targetYear, targetMonth + 1, 0)).getUTCDate();
        const safeDay = Math.min(originalDay, lastDayOfTargetMonth);
        
        current = new Date(Date.UTC(
          targetYear,
          targetMonth,
          safeDay,
          start.getUTCHours(),
          start.getUTCMinutes(),
          start.getUTCSeconds(),
          start.getUTCMilliseconds()
        ));
      }
      
      // Apply time-based increments
      if (step.weeks || step.days || step.hours || step.minutes || step.seconds || step.milliseconds) {
        let additionalMs = 0;
        additionalMs += (step.weeks ?? 0) * 7 * 24 * 60 * 60 * 1000;
        additionalMs += (step.days ?? 0) * 24 * 60 * 60 * 1000;
        additionalMs += (step.hours ?? 0) * 60 * 60 * 1000;
        additionalMs += (step.minutes ?? 0) * 60 * 1000;
        additionalMs += (step.seconds ?? 0) * 1000;
        additionalMs += (step.milliseconds ?? 0);
        
        current = new Date(current.getTime() + additionalMs);
      }
    }
  }
  
  return result;
}
