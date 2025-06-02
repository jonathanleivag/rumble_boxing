import mongoose, { Schema } from "mongoose";
import { IMatriculaDocument } from "@/type";

const matriculaSchema = new Schema<IMatriculaDocument>(
  {
    value: {
      type: Number,
      required: [true, "El valor de la matrícula es requerido"],
      default: 0,
    },
    description: {
      type: String,
      required: [true, "La descripción de la matrícula es requerida"],
      default: "Pago único de inscripción",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Matricula =
  mongoose.models.Matricula ||
  mongoose.model<IMatriculaDocument>("Matricula", matriculaSchema);
