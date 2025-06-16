import { StatusFinance } from "@/type";

export const getTextSpanishStatusFinance = (status: StatusFinance): string => {
  switch (status) {
    case "pending":
      return "Pendiente";
    case "paid":
      return "Pagado";
    case "overdue":
      return "Vencido";
    default:
      return "Estado desconocido";
  }
};

export const getColorSpanishStatusFinance = (status: StatusFinance): string => {
  switch (status) {
    case "pending":
      return "text-yellow-500";
    case "paid":
      return "text-green-500";
    case "overdue":
      return "text-red-500";
    default:
      return "text-gray-500";
  }
};
