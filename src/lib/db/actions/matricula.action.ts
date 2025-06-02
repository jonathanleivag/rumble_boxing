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

    return matricula as unknown as IMatriculaData;
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
    return savedMatricula.toObject() as IMatriculaData;
  } catch (error) {
    console.error("Error en createMatricula:", error);
    throw new Error("Error al crear el valor de la matrícula");
  }
}

export async function updateMatricula(
  id: string,
  matriculaData: Partial<IMatriculaData>
): Promise<IMatriculaData | null> {
  try {
    await connectToMongoDB();

    const updatedMatricula = await Matricula.findByIdAndUpdate(
      id,
      {
        value: matriculaData.value,
        description: matriculaData.description,
      },
      { new: true, runValidators: true }
    ).lean();

    return updatedMatricula as unknown as IMatriculaData;
  } catch (error) {
    console.error("Error en updateMatricula:", error);
    throw new Error("Error al actualizar el valor de la matrícula");
  }
}
