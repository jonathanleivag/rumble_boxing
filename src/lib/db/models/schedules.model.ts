"use server";

import mongoose, { Schema } from "mongoose";
import { ISchedulesDocument } from "@/type";

const schedulesSchema = new Schema<ISchedulesDocument>(
  {
    name: {
      type: String,
      required: [true, "El nombre del horario es obligatorio"],
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    color: {
      type: String,
      required: [true, "El color del horario es obligatorio"],
      trim: true,
    },
    classes: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "ClassFormData",
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Schedules =
  mongoose.models.Schedules ||
  mongoose.model<ISchedulesDocument>("Schedules", schedulesSchema);
