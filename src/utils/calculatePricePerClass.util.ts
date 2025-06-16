export const calculatePricePerClass = (
  monthlyPrice: number,
  totalAllowedDays: number
): number => {
  if (totalAllowedDays <= 0) {
    throw new Error("Total allowed days must be greater than 0");
  }

  return Math.round(monthlyPrice / totalAllowedDays);
};
