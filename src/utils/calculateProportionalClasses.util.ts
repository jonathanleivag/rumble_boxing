export const calculateProportionalClasses = (
  totalDaysInMonth: number,
  totalClassesInMonth: number,
  remainingDays: number
): number => {
  if (totalDaysInMonth <= 0 || totalClassesInMonth <= 0 || remainingDays <= 0) {
    return 0;
  }

  const classesPerDay = totalClassesInMonth / totalDaysInMonth;
  const proportionalClasses = remainingDays * classesPerDay;

  return Math.round(proportionalClasses);
};
