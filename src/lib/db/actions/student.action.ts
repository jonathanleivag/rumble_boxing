"use server";

import { IStudentData, IStudentDTO } from "@/type";
import { connectToMongoDB } from "../mongoose";
import { Student } from "../models/student.model";
import { getPriceById } from "./price.action";

export const crearStudent = async (
  data: IStudentDTO
): Promise<IStudentData> => {
  await connectToMongoDB();

  const student = await Student.findOne({ rut: data.rut });

  if (student) {
    throw new Error("El estudiante ya existe");
  }

  const plan = await getPriceById(data.plan.toString());

  if (data.avatar === "") delete data.avatar;

  const newStudent = new Student({
    ...data,
    plan,
  });

  await newStudent.save();

  return {
    name: newStudent.name,
    email: newStudent.email,
    rut: newStudent.rut,
    phone: newStudent.phone,
    createDate: newStudent.createDate,
    plan: newStudent.plan.toString(),
    assistance: newStudent.assistance,
    status: newStudent.status,
    avatar: newStudent.avatar,
    _id: newStudent._id.toString(),
    createdAt: newStudent.createdAt?.toString?.() ?? null,
    updatedAt: newStudent.updatedAt?.toString?.() ?? null,
  };
};
