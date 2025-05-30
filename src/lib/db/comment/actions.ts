"use server";

import { ICommentData, ICommentDocument, TestimonialComment } from "@/type";
import { connectToMongoDB } from "../mongoose";
import Comment from "@/lib/db/models/comment.model";

export const addComment = async (
  data: TestimonialComment
): Promise<ICommentData> => {
  await connectToMongoDB();
  try {
    const testimonial = new Comment(data);
    await testimonial.save();
    return {
      _id: testimonial.id.toString(),
      name: testimonial.name,
      email: testimonial.email,
      quote: testimonial.quote,
      createdAt: new Date(testimonial.createdAt).toISOString(),
      updatedAt: new Date(testimonial.updatedAt).toISOString(),
      image: testimonial.image || "",
      rating: testimonial.rating,
      textRating: testimonial.textRating || "",
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error al crear el comentario:", error.message);
    }
    throw new Error("Error al crear el comentario");
  }
};

export const getComments = async () => {
  await connectToMongoDB();
  try {
    const commentsData: ICommentDocument[] = await Comment.find();

    const comments: ICommentData[] = commentsData.map(
      (comment: ICommentDocument) => ({
        _id: comment.id.toString(),
        name: comment.name,
        email: comment.email,
        quote: comment.quote,
        createdAt: new Date(comment.createdAt).toISOString(),
        updatedAt: new Date(comment.updatedAt).toISOString(),
        image: comment.image || "",
        rating: comment.rating,
        textRating: comment.textRating || "",
      })
    );

    return comments;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error al obtener los comentarios:", error.message);
      throw new Error("Error al obtener los comentarios");
    }
    return [];
  }
};

export const oneComment = async (
  email: string
): Promise<ICommentData | null> => {
  await connectToMongoDB();
  try {
    const comment = await Comment.findOne({ email });
    if (!comment) {
      return null;
    }

    return {
      _id: comment.id.toString(),
      name: comment.name,
      email: comment.email,
      quote: comment.quote,
      createdAt: new Date(comment.createdAt).toISOString(),
      updatedAt: new Date(comment.updatedAt).toISOString(),
      image: comment.image || "",
      rating: comment.rating,
      textRating: comment.textRating || "",
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error al obtener el comentario:", error.message);
      throw new Error("Error al obtener el comentario");
    }
    return null;
  }
};

export const editComment = async (
  email: string,
  data: TestimonialComment
): Promise<ICommentData> => {
  await connectToMongoDB();
  try {
    const comment = await Comment.findOneAndUpdate(
      { email },
      { ...data },
      { new: true }
    );

    if (!comment) {
      throw new Error("Comentario no encontrado");
    }

    return {
      _id: comment.id.toString(),
      name: comment.name,
      email: comment.email,
      quote: comment.quote,
      createdAt: new Date(comment.createdAt).toISOString(),
      updatedAt: new Date(comment.updatedAt).toISOString(),
      image: comment.image || "",
      rating: comment.rating,
      textRating: comment.textRating || "",
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error al editar el comentario:", error.message);
    }
    throw new Error("Error al editar el comentario");
  }
};
