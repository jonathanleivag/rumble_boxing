"use server";

import { IUser } from "@/type";
import User from "../models/user.model";
import bcrypt from "bcryptjs";

export const seed = async (data: IUser) => {
  try {
    const user = await User.findOne({ email: data.email });
    if (user) {
      throw new Error("User already exists");
    }
    data.password = await bcrypt.hash(data.password, 10);
    const newUser = new User(data);
    const dataUser = await newUser.save();

    return await User.findOne({ _id: dataUser._id }).select("-password");
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error seeding user: ${error.message}`);
    }
    throw new Error("An unexpected error occurred while seeding user");
  }
};
