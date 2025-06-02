"use server";

import { IPriceDocument } from "@/type";
import mongoose, { Schema, models } from "mongoose";

const PriceSchema = new Schema<IPriceDocument>(
  {
    name: {
      type: String,
      required: [true, "El nombre del plan es obligatorio"],
    },
    type: {
      type: String,
      enum: ["mensual", "anual", "personalizado"],
      required: [true, "El tipo de plan es obligatorio"],
    },
    price: {
      type: Number,
      required: [true, "El precio es obligatorio"],
      min: [0, "El precio no puede ser negativo"],
    },
    class: {
      type: Schema.Types.Mixed,
      required: [true, "El número de clases es obligatorio"],
    },
    description: {
      type: String,
      required: [true, "La descripción es obligatoria"],
    },
    characteristics: {
      type: [String],
      required: [true, "Las características son obligatorias"],
    },
    active: {
      type: Boolean,
      default: true,
    },
    isPopular: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Price =
  models.Price || mongoose.model<IPriceDocument>("Price", PriceSchema);
