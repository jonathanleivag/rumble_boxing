"use server";
import { IAssistDocument, IUserDocument } from "@/type";
import mongoose, { Model } from "mongoose";

const assistSchema = new mongoose.Schema<IAssistDocument>(
  {
    assist: {
      type: Number,
      required: true,
      default: 0,
    },
    days: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
      default: "ilimitado",
      validate: {
        validator: function (value: string | number) {
          return (
            value === "ilimitado" || (typeof value === "number" && value > 0)
          );
        },
        message:
          "El campo 'days' debe ser un número positivo o la cadena 'ilimitado'",
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Assist: Model<IUserDocument> =
  mongoose.models.Assist || mongoose.model("Assist", assistSchema);

export default Assist;
