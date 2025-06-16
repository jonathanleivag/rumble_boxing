"use server";

import { IPriceData, IStudentData, IStudentDTO, StudentQuery } from "@/type";
import { connectToMongoDB } from "../mongoose";
import { Student } from "../models/student.model";
import { getPriceById } from "./price.action";
import { PaginateResult } from "mongoose";
import { createAssist, getAssistById } from "./assist.action";
import { addFinance, getFinanceById } from "./finance.action";
import { getRemainingDaysToEndOfMonth } from "@/utils/getRemainingDaysToEndOfMonth.util";
import { calculatePricePerClass } from "@/utils/calculatePricePerClass.util";
import { calculateProportionalClasses } from "@/utils/calculateProportionalClasses.util";
import { getEndDateByPlanType } from "@/utils/getEndDateByPlanType.util";
import { getRemainingDaysToEndOfYear } from "@/utils/getRemainingDaysToEndOfYear.util";

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

  const totalDaysInMonth =
    plan.type === "personalizado"
      ? data.personalizedDays === "anual"
        ? 365
        : 30
      : plan.type === "mensual"
      ? 30
      : 365;

  const assistId = await createAssist(
    data.createDate,
    totalDaysInMonth,
    data.assistance
  );

  if (!assistId) {
    throw new Error("Error al crear la asistencia del estudiante");
  }

  const assist = await getAssistById(assistId);

  const remainingDays =
    plan.type === "personalizado"
      ? data.personalizedDays === "anual"
        ? getRemainingDaysToEndOfYear(data.createDate)
        : getRemainingDaysToEndOfMonth(data.createDate)
      : plan.type === "mensual"
      ? getRemainingDaysToEndOfMonth(data.createDate)
      : getRemainingDaysToEndOfYear(data.createDate);

  const totalClassesInMonth =
    plan.class === "ilimitado" ? totalDaysInMonth : plan.class;

  const daysProportional = calculateProportionalClasses(
    totalDaysInMonth,
    totalClassesInMonth,
    remainingDays
  );

  const pricePerClass =
    calculatePricePerClass(
      plan.type !== "personalizado" ? plan.price : data.price!,
      totalClassesInMonth
    ) *
    (totalClassesInMonth - daysProportional);

  const dateEnd =
    plan.type === "personalizado"
      ? data.personalizedDays === "anual"
        ? getEndDateByPlanType(data.createDate, "anual")
        : getEndDateByPlanType(data.createDate, "mensual")
      : plan.type === "mensual"
      ? getEndDateByPlanType(data.createDate, "mensual")
      : getEndDateByPlanType(data.createDate, "anual");

  const financeId = await addFinance(
    data.createDate,
    dateEnd,
    pricePerClass,
    data.description || ""
  );

  if (!financeId) {
    throw new Error("Error al crear la finanza del estudiante");
  }

  const finance = await getFinanceById(financeId);

  const newStudent = new Student({
    ...data,
    assist: [assist],
    plan,
    finance,
  });

  await newStudent.save();

  return {
    name: newStudent.name,
    email: newStudent.email,
    rut: newStudent.rut,
    phone: newStudent.phone,
    createDate: newStudent.createDate,
    plan: {
      _id: (newStudent.plan as IPriceData)._id.toString?.(),
      id: (newStudent.plan as IPriceData)._id.toString?.(),
      name: (newStudent.plan as IPriceData).name,
      price: (newStudent.plan as IPriceData).price,
      type: (newStudent.plan as IPriceData).type,
      class: (newStudent.plan as IPriceData).class,
      description: (newStudent.plan as IPriceData).description,
      characteristics: (newStudent.plan as IPriceData).characteristics,
      active: (newStudent.plan as IPriceData).active,
      createdAt:
        (newStudent.plan as IPriceData).createdAt?.toString?.() ?? null,
      updatedAt:
        (newStudent.plan as IPriceData).updatedAt?.toString?.() ?? null,
      isPopular: (newStudent.plan as IPriceData).isPopular,
    },
    assist: newStudent.assist.map((assist) => ({
      _id: assist._id.toString(),
      assist: assist.assist,
      days: assist.days,
      createdAt: assist.createdAt?.toString() ?? null,
      updatedAt: assist.updatedAt?.toString() ?? null,
    })),
    finance: {
      _id: newStudent.finance._id.toString(),
      dateStart: newStudent.finance.dateStart,
      dateEnd: newStudent.finance.dateEnd,
      price: newStudent.finance.price,
      matricula: newStudent.finance.matricula,
      total: newStudent.finance.total,
      status: newStudent.finance.status,
      description: newStudent.finance.description,
      createdAt: newStudent.finance.createdAt?.toString() ?? null,
      updatedAt: newStudent.finance.updatedAt?.toString() ?? null,
    },
    assistance: newStudent.assistance,
    updateAssistance: newStudent.updateAssistance,
    status: newStudent.status,
    avatar: newStudent.avatar,
    _id: newStudent._id.toString(),
    createdAt: newStudent.createdAt?.toString?.() ?? null,
    updatedAt: newStudent.updatedAt?.toString?.() ?? null,
  };
};

export const getAllStudents = async (
  page: number = 1,
  limit: number = 7,
  query: StudentQuery = {}
): Promise<PaginateResult<IStudentData>> => {
  await connectToMongoDB();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filter: any = {};

  if (query.search) {
    const regex = {
      $or: [
        { name: new RegExp(query.search, "i") },
        { email: new RegExp(query.search, "i") },
        { rut: new RegExp(query.search, "i") },
      ],
    };
    filter.$or = regex.$or;
  }

  if (query.plan) {
    filter.plan = query.plan;
  }

  if (query.status) {
    filter.status = query.status;
  }

  const sortField = query.sortBy ?? "createDate";
  const sortOrder = query.sortOrder === "asc" ? 1 : -1;

  const students = await Student.paginate(filter, {
    page,
    limit,
    populate: [{ path: "plan" }, { path: "assist" }, { path: "finance" }],
    sort: { [sortField]: sortOrder },
  });

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
    assist: student.assist.map((assist) => ({
      _id: assist._id.toString(),
      assist: assist.assist,
      days: assist.days,
      createdAt: assist.createdAt?.toString() ?? null,
      updatedAt: assist.updatedAt?.toString() ?? null,
    })),
    finance: student.finance
      ? {
          _id: student.finance._id.toString(),
          dateStart: student.finance.dateStart,
          dateEnd: student.finance.dateEnd,
          price: student.finance.price,
          description: student.finance.description,
          createdAt: student.finance.createdAt?.toString() ?? null,
          updatedAt: student.finance.updatedAt?.toString() ?? null,
        }
      : null,
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
  const finance = await getFinanceById(student.finance._id.toString());

  const updateStudent = await Student.findByIdAndUpdate(
    id,
    {
      ...data,
      plan,
      finance,
    },
    { new: true, runValidators: true }
  );

  if (!updateStudent) {
    throw new Error("Error al actualizar el estudiante");
  }

  const studentData = await Student.findById(updateStudent.id)
    .populate("plan")
    .populate("assist")
    .populate("finance");

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
    assist: studentData.assist.map((assist) => ({
      _id: assist._id.toString(),
      assist: assist.assist,
      days: assist.days,
      createdAt: assist.createdAt?.toString() ?? null,
      updatedAt: assist.updatedAt?.toString() ?? null,
    })),
    finance: {
      _id: studentData.finance?._id.toString() ?? "",
      dateStart: studentData.finance?.dateStart ?? "",
      dateEnd: studentData.finance?.dateEnd ?? "",
      price: studentData.finance?.price ?? 0,
      status: studentData.finance?.status ?? "pending",
      description: studentData.finance?.description ?? "",
      createdAt: studentData.finance?.createdAt?.toString() ?? null,
      updatedAt: studentData.finance?.updatedAt?.toString() ?? null,
    },
    assistance: studentData.assistance,
    updateAssistance: studentData.updateAssistance,
    status: studentData.status,
    avatar: studentData.avatar,
    createdAt: studentData.createdAt?.toString?.() ?? null,
    updatedAt: studentData.updatedAt?.toString?.() ?? null,
  };
};
