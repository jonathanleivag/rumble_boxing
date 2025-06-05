"use server";

import { IPriceData, IStudentData, IStudentDTO } from "@/type";
import { connectToMongoDB } from "../mongoose";
import { Student } from "../models/student.model";
import { getPriceById } from "./price.action";
import { PaginateResult } from "mongoose";

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

export const getAllStudents = async (
  page: number = 1,
  limit: number = 5
): Promise<PaginateResult<IStudentData>> => {
  await connectToMongoDB();

  const students = await Student.paginate(
    {},
    { page, limit, populate: "plan" }
  );

  const serializedDocs = students.docs.map((student) => ({
    _id: student._id.toString(),
    name: student.name,
    email: student.email,
    rut: student.rut,
    phone: student.phone,
    createDate: student.createDate,
    plan: student.plan
      ? {
          _id: (student.plan as IPriceData)._id.toString?.(),
          name: (student.plan as IPriceData).name,
          price: (student.plan as IPriceData).price,
          type: (student.plan as IPriceData).type,
          class: (student.plan as IPriceData).class,
          description: (student.plan as IPriceData).description,
          characteristics: (student.plan as IPriceData).characteristics,
          active: (student.plan as IPriceData).active,
          createdAt:
            (student.plan as IPriceData).createdAt?.toString?.() ?? null,
          updatedAt:
            (student.plan as IPriceData).updatedAt?.toString?.() ?? null,
          isPopular: (student.plan as IPriceData).isPopular,
        }
      : null,
    assistance: student.assistance,
    status: student.status,
    avatar: student.avatar,
    createdAt: student.createdAt?.toString?.() ?? null,
    updatedAt: student.updatedAt?.toString?.() ?? null,
  })) as unknown as IStudentData[];

  return {
    ...students,
    docs: serializedDocs,
  };
};
