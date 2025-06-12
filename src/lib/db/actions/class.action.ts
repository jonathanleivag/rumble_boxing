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

  const allClass = await ClassFormDataModel.find();
  const classCount = allClass.length;
  if (classCount >= 6) {
    throw new Error("No se pueden crear más de 6 clases");
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

export const getAllClass = async (): Promise<ClassDocumentData[]> => {
  await connectToMongoDB();
  const classes = await ClassFormDataModel.find();

  return classes.map((classData) => ({
    _id: classData._id.toString(),
    name: classData.name,
    duration: classData.duration,
    difficulty: classData.difficulty,
    description: classData.description,
    createdAt: classData.createdAt.toString(),
    updatedAt: classData.updatedAt.toString(),
  }));
};

export const deleteClass = async (id: string): Promise<string> => {
  await connectToMongoDB();
  const classData = await ClassFormDataModel.findById(id);

  if (!classData) {
    throw new Error("Clase no encontrada");
  }

  await ClassFormDataModel.deleteOne({ _id: id });
  return id;
};

export const updateClass = async (
  id: string,
  data: ClassFormData
): Promise<ClassDocumentData> => {
  await connectToMongoDB();
  const classData = await ClassFormDataModel.findById(id);

  if (!classData) {
    throw new Error("Clase no encontrada");
  }

  if (data.duration <= 0) {
    throw new Error("La duración debe ser mayor a 0");
  }

  classData.name = data.name;
  classData.duration = data.duration;
  classData.difficulty = data.difficulty;
  classData.description = data.description;

  await classData.save();

  return {
    _id: classData._id.toString(),
    name: classData.name,
    duration: classData.duration,
    difficulty: classData.difficulty,
    description: classData.description,
    createdAt: classData.createdAt.toString(),
    updatedAt: classData.updatedAt.toString(),
  };
};
