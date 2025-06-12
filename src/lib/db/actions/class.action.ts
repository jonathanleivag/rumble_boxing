"use server";

import { ClassDocumentData, ClassFormData } from "@/type";
import { connectToMongoDB } from "../mongoose";
import { ClassFormData as ClassFormDataModel } from "../models/class.model";

export const createClass = async (
  data: ClassFormData
): Promise<ClassDocumentData> => {
  await connectToMongoDB();
  const classData = await ClassFormDataModel.findOne({ name: data.name });

  if (classData) {
    throw new Error("Ya existe la clase con ese nombre");
  }

  if (data.duration <= 0) {
    throw new Error("La duración debe ser mayor a 0");
  }

  const newClass = new ClassFormDataModel(data);
  await newClass.save();
  return {
    _id: newClass._id.toString(),
    name: newClass.name,
    duration: newClass.duration,
    difficulty: newClass.difficulty,
    description: newClass.description,
    createdAt: newClass.createdAt,
    updatedAt: newClass.updatedAt,
  };
};
