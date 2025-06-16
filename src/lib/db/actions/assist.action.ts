import { differenceInDays, parseISO } from "date-fns";
import { connectToMongoDB } from "../mongoose";
import { IAssist, IAssistData, IAssistDocument } from "@/type";
import Assist from "../models/assist.model";

export const createAssist = async (
  studentCreationDate: string,
  planDays: number | "ilimitado",
  daysUsed: number = 0
): Promise<string> => {
  await connectToMongoDB();

  let days: number | "ilimitado" = "ilimitado";

  if (typeof planDays === "number" && planDays > 0) {
    const createdAt = parseISO(studentCreationDate);
    const now = new Date();
    const passedDays = differenceInDays(now, createdAt);
    const remainingDays = Math.max(planDays - passedDays, 0);
    days = remainingDays - daysUsed;
  }

  const data: IAssist = {
    assist: 0,
    days,
  };

  const newAssist = new Assist(data);
  const created = await newAssist.save();

  return created._id.toString();
};

export const getAssistById = async (id: string): Promise<IAssistData> => {
  await connectToMongoDB();

  const assist = (await Assist.findById(id)) as IAssistDocument;

  if (!assist) {
    throw new Error("Asistencia no encontrada");
  }

  return {
    _id: assist._id.toString(),
    assist: assist.assist,
    days: assist.days,
    createdAt: assist.createdAt?.toString() ?? null,
    updatedAt: assist.updatedAt?.toString() ?? null,
  };
};
