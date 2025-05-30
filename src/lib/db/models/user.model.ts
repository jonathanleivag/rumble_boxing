"use server";
import { IUserDocument } from "@/type";
import mongoose, { Model } from "mongoose";

const userSchema = new mongoose.Schema<IUserDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const User: Model<IUserDocument> =
  mongoose.models.User || mongoose.model("User", userSchema);

export default User;
