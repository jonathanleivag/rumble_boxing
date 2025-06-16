import { connectToMongoDB } from "../mongoose";
import { IAssist, IAssistData, IAssistDocument } from "@/type";
import Assist from "../models/assist.model";

export const createAssist = async (
  classTotal: number,
  assist: number
): Promise<string> => {
  await connectToMongoDB();

  const data: IAssist = {
    assist,
    days: classTotal,
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
