"use server";

import Finance from "../models/finance.model";
import { IFinanceData } from "@/type";
import { getMatricula } from "./matricula.action";

export const addFinance = async (
  dateStart: string,
  dateEnd: string,
  price: number = 0,
  description: string = ""
): Promise<string> => {
  const matricula = await getMatricula();
  const valueMatricula = matricula?.value || 0;

  const finance = new Finance({
    dateStart,
    dateEnd,
    price,
    description,
    matricula: valueMatricula,
    total: price + valueMatricula,
  });
  const data = await finance.save();

  return data._id.toString();
};

export const getFinanceById = async (id: string): Promise<IFinanceData> => {
  const finance = await Finance.findById(id);
  if (!finance) {
    throw new Error("Finanzas no encontrada");
  }
  return {
    _id: finance._id.toString(),
    dateStart: finance.dateStart,
    dateEnd: finance.dateEnd,
    price: finance.price,
    status: finance.status,
    matricula: finance.matricula,
    total: finance.total,
    description: finance.description,
    createdAt: finance.createdAt?.toString() ?? null,
    updatedAt: finance.updatedAt?.toString() ?? null,
  };
};
