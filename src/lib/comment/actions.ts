"use server";

import { TestimonialComment } from "@/type";
import { connectToMongoDB } from "../mongoose";
import Comment from "@/models/comment.model";

export const addComment = async (data: TestimonialComment) => {
  await connectToMongoDB();
  try {
    const testimonial = new Comment(data);
    await testimonial.save();
    return { success: true, message: "Comentario creado exitosamente" };
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error al crear el comentario:", error.message);
    }
    return { success: false, message: "Error al crear el comentario" };
  }
};
