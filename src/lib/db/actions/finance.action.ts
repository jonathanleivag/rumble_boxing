"use server";

import Finance from "../models/finance.model";
import { GetFinance, GetIncomeDistribution, IFinanceData } from "@/type";
import { getMatricula, getValueMatricula } from "./matricula.action";
import {
  getTotalDelinquentStudents,
  getTotalStudents,
  getTotalStudentsPaidByPlan,
} from "./student.action";
import { isSameMonth } from "date-fns";
import { connectToMongoDB } from "../mongoose";

export const addFinance = async (
  dateStart: string,
  dateEnd: string,
  price: number = 0,
  description: string = ""
): Promise<string> => {
  await connectToMongoDB();
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
  await connectToMongoDB();

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

export const getFinance = async (): Promise<GetFinance> => {
  await connectToMongoDB();

  const finances = await Finance.find();
  const currentMonthFinances = finances.filter((finance) =>
    isSameMonth(new Date(finance.updatedAt), new Date())
  );
  const financesPaid = currentMonthFinances.filter(
    (finance) => finance.status === "paid"
  );
  const income: number = financesPaid.reduce(
    (acc, finance) => acc + finance.total,
    0
  );

  const totalStudent = await getTotalStudents();
  const totalDelinquentStudents = await getTotalDelinquentStudents();
  const valueMatricula = await getValueMatricula();

  return {
    income,
    totalStudent,
    totalDelinquentStudents,
    valueMatricula,
  };
};

export const getIncomeDistribution =
  async (): Promise<GetIncomeDistribution> => {
    await connectToMongoDB();
    const [mensual, anual, personalizado] = await Promise.all([
      getTotalStudentsPaidByPlan("mensual"),
      getTotalStudentsPaidByPlan("anual"),
      getTotalStudentsPaidByPlan("personalizado"),
    ]);

    const total = mensual + anual + personalizado;

    if (total === 0) {
      return {
        mensualidades: 0,
        anuales: 0,
        personalizadas: 0,
      };
    }

    return {
      mensualidades: Math.round((mensual / total) * 100),
      anuales: Math.round((anual / total) * 100),
      personalizadas: Math.round((personalizado / total) * 100),
    };
  };
