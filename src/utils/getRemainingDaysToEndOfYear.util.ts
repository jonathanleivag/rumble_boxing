import {
  addDays,
  differenceInCalendarDays,
  endOfYear,
  isAfter,
} from "date-fns";

export const getRemainingDaysToEndOfYear = (
  fromDate: Date | string,
  onlyWeekdays: boolean = false
): number => {
  const start = typeof fromDate === "string" ? new Date(fromDate) : fromDate;
  const end = endOfYear(start);

  if (!onlyWeekdays) {
    return differenceInCalendarDays(end, start);
  }

  // Count only Monday to Saturday
  let count = 0;
  let current = start;

  while (!isAfter(current, end)) {
    const day = current.getDay(); // 0 = Sunday
    if (day !== 0) {
      count++;
    }
    current = addDays(current, 1);
  }

  return count;
};
