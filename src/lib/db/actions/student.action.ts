"use server";

import { IPriceData, IStudentData, IStudentDTO } from "@/type";
import { connectToMongoDB } from "../mongoose";
import { Student } from "../models/student.model";
import { getPriceById } from "./price.action";
import { PaginateResult, Types } from "mongoose";

export const crearStudent = async (
  data: IStudentDTO
): Promise<IStudentData> => {
  await connectToMongoDB();

  const student = await Student.findOne({ rut: data.rut });

  if (student) {
    throw new Error("El estudiante ya existe");
  }

  const plan = await getPriceById(data.plan.toString());
  console.log("🚀 ~ data.plan:", data.plan);

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
  limit: number = 7
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

export const updateStudent = async (
  id: string,
  data: IStudentDTO
): Promise<IStudentData> => {
  await connectToMongoDB();
  const student = await Student.findById(id).populate("plan");
  if (!student) {
    throw new Error("Estudiante no encontrado");
  }

  const plan = await getPriceById(data.plan!.toString());

  const updateStudent = await Student.findByIdAndUpdate(
    id,
    {
      ...data,
      plan,
    },
    { new: true, runValidators: true }
  );

  if (!updateStudent) {
    throw new Error("Error al actualizar el estudiante");
  }

  const studentData = await Student.findById(updateStudent.id).populate("plan");

  if (!studentData) {
    throw new Error("Estudiante no encontrado después de la actualización");
  }

  return {
    _id: studentData._id,
    name: studentData.name,
    email: studentData.email,
    rut: studentData.rut,
    phone: studentData.phone,
    createDate: studentData.createDate,
    plan: {
      _id: (studentData.plan as IPriceData)._id,
      id: (studentData.plan as IPriceData)._id.toString?.(),
      name: (studentData.plan as IPriceData).name,
      price: (studentData.plan as IPriceData).price,
      type: (studentData.plan as IPriceData).type,
      class: (studentData.plan as IPriceData).class,
      description: (studentData.plan as IPriceData).description,
      characteristics: (studentData.plan as IPriceData).characteristics,
      active: (studentData.plan as IPriceData).active,
      createdAt:
        (studentData.plan as IPriceData).createdAt?.toString?.() ?? null,
      updatedAt:
        (studentData.plan as IPriceData).updatedAt?.toString?.() ?? null,
      isPopular: (studentData.plan as IPriceData).isPopular,
    },
    assistance: studentData.assistance,
    status: studentData.status,
    avatar: studentData.avatar,
    createdAt: studentData.createdAt?.toString?.() ?? null,
    updatedAt: studentData.updatedAt?.toString?.() ?? null,
  };
};
