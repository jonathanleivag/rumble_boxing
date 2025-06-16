"use server";
import { IFinanceDocument } from "@/type";
import mongoose, { Model } from "mongoose";

const financeSchema = new mongoose.Schema<IFinanceDocument>(
  {
    price: {
      type: Number,
      required: [true, "El precio es obligatorio"],
      min: [0, "El precio no puede ser negativo"],
    },
    dateStart: {
      type: String,
      required: [true, "La fecha de inicio es obligatoria"],
    },
    dateEnd: {
      type: String,
      required: [true, "La fecha de fin es obligatoria"],
    },
    status: {
      type: String,
      enum: ["pending", "paid", "overdue"],
      default: "pending",
    },
    description: {
      type: String,
      required: false,
      default: "",
    },
    matricula: {
      type: Number,
      required: [true, "La matrícula es obligatoria"],
      min: [0, "La matrícula no puede ser negativa"],
      default: 0,
    },
    total: {
      type: Number,
      required: [true, "El total es obligatorio"],
      min: [0, "El total no puede ser negativo"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Finance: Model<IFinanceDocument> =
  mongoose.models.Finance || mongoose.model("Finance", financeSchema);

export default Finance;
