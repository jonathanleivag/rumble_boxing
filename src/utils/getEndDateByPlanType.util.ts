import { planTypePersonalizado } from "@/type";
import { endOfMonth, endOfYear, format } from "date-fns";

export const getEndDateByPlanType = (
  date: Date | string,
  type: planTypePersonalizado
): string => {
  const parsed = typeof date === "string" ? new Date(date) : date;

  if (type === "mensual") return format(endOfMonth(parsed), "yyyy-MM-dd");
  if (type === "anual") return format(endOfYear(parsed), "yyyy-MM-dd");

  throw new Error("Invalid plan type. Must be 'monthly' or 'yearly'");
};
