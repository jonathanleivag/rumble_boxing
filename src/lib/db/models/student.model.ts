"use server";

import { IStudentDocument } from "@/type";
import mongoose, { Schema, models, PaginateModel } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const StudentSchema = new Schema<IStudentDocument>(
  {
    name: {
      type: String,
      required: [true, "El nombre del estudiante es obligatorio"],
    },
    email: {
      type: String,
      required: [true, "El correo electrónico es obligatorio"],
      lowercase: true,
      trim: true,
    },
    rut: {
      type: String,
      required: [true, "El RUT es obligatorio"],
      unique: true,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "El número de teléfono es obligatorio"],
    },
    createDate: {
      type: String,
      default: new Date().toISOString(),
      required: [true, "La fecha de creación es obligatoria"],
    },
    plan: {
      type: Schema.Types.ObjectId,
      ref: "Price",
      required: [true, "El plan es obligatorio"],
    },
    assistance: {
      type: Number,
      default: 0,
    },
    assist: [
      {
        type: Schema.Types.ObjectId,
        ref: "Assist",
      },
    ],
    finance: {
      type: Schema.Types.ObjectId,
      ref: "Finance",
      required: [true, "La información financiera es obligatoria"],
    },
    status: {
      type: String,
      enum: ["activo", "inactivo", "suspendido"],
      default: "activo",
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/dq8fpb695/image/upload/v1748900421/rumble/yfwwjdnhstzsmx2nuazq.webp",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

StudentSchema.plugin(mongoosePaginate);

export const Student =
  (models.Student as PaginateModel<IStudentDocument>) ||
  mongoose.model<IStudentDocument, PaginateModel<IStudentDocument>>(
    "Student",
    StudentSchema
  );
