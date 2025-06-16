"use server";

import { connectToMongoDB } from "../mongoose";
import { Matricula } from "../models/matricula.model";
import { IMatriculaData } from "@/type";

export async function getMatricula(): Promise<IMatriculaData | null> {
  try {
    await connectToMongoDB();
    const matricula = await Matricula.findOne({})
      .sort({ createdAt: -1 })
      .lean();

    if (!matricula || Array.isArray(matricula)) return null;

    return {
      _id: matricula._id?.toString?.() ?? "",
      value: matricula.value,
      description: matricula.description,
      createdAt: matricula.createdAt?.toString?.() ?? null,
      updatedAt: matricula.updatedAt?.toString?.() ?? null,
    } as unknown as IMatriculaData;
  } catch (error) {
    console.error("Error en getMatricula:", error);
    throw new Error("Error al obtener el valor de la matrícula");
  }
}

export async function createMatricula(
  matriculaData: Partial<IMatriculaData>
): Promise<IMatriculaData> {
  try {
    await connectToMongoDB();

    const newMatricula = new Matricula({
      value: matriculaData.value || 0,
      description: matriculaData.description || "Pago único de inscripción",
    });

    const savedMatricula = await newMatricula.save();
    return {
      _id: savedMatricula._id.toString(),
      value: savedMatricula.value,
      description: savedMatricula.description,
      createdAt: savedMatricula.createdAt?.toString() ?? null,
      updatedAt: savedMatricula.updatedAt?.toString() ?? null,
    };
  } catch (error) {
    console.error("Error en createMatricula:", error);
    throw new Error("Error al crear el valor de la matrícula");
  }
}

export async function updateMatricula(
  id: string,
  matriculaData: Partial<IMatriculaData>
): Promise<IMatriculaData> {
  await connectToMongoDB();

  await Matricula.findByIdAndUpdate(
    id,
    {
      value: matriculaData.value,
      description: matriculaData.description,
    },
    { new: true, runValidators: true }
  ).lean();

  const matricula: IMatriculaData = (await Matricula.findById(
    id
  )) as IMatriculaData;

  return {
    _id: matricula._id.toString(),
    value: matricula.value,
    description: matricula.description,
    createdAt: matricula.createdAt?.toString() ?? null,
    updatedAt: matricula.updatedAt?.toString() ?? null,
  };
}
