"use server";

import mongoose, { Schema } from "mongoose";
import { IClassDocument } from "@/type";

const classSchema = new Schema<IClassDocument>(
  {
    name: {
      type: String,
      required: [true, "El nombre de la clase es obligatorio"],
      trim: true,
      unique: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ["essential", "intermediate", "advanced"],
      required: [true, "La dificultad es obligatoria"],
    },
    description: {
      type: String,
      required: [true, "La descripción es obligatoria"],
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const ClassFormData =
  mongoose.models.ClassFormData ||
  mongoose.model<IClassDocument>("ClassFormData", classSchema);
