"use server";

import {
  CountStatusComments,
  ICommentData,
  ICommentDocument,
  StatusComment,
  TestimonialComment,
} from "@/type";
import { connectToMongoDB } from "../mongoose";
import Comment from "@/lib/db/models/comment.model";
import { PaginateResult } from "mongoose";

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
      status: testimonial.status,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error al crear el comentario:", error.message);
    }
    throw new Error("Error al crear el comentario");
  }
};

export const getComments = async (
  status?: StatusComment,
  page: number = 1,
  limit: number = 5
): Promise<PaginateResult<ICommentData>> => {
  await connectToMongoDB();
  try {
    let commentsData: PaginateResult<ICommentDocument>;

    if (status) {
      commentsData = await Comment.paginate({ status }, { limit, page });
    } else {
      commentsData = await Comment.paginate({}, { limit, page });
    }

    const serializedDocs: ICommentData[] = commentsData.docs.map((comment) => ({
      _id: comment._id.toString(),
      name: comment.name,
      email: comment.email,
      quote: comment.quote,
      createdAt: comment.createdAt?.toString?.() ?? "",
      updatedAt: comment.updatedAt?.toString?.() ?? "",
      image: comment.image || "",
      rating: comment.rating,
      textRating: comment.textRating || "",
      status: comment.status,
    })) as unknown as ICommentData[];

    return {
      docs: serializedDocs,
      totalDocs: commentsData.totalDocs,
      limit: commentsData.limit,
      hasPrevPage: commentsData.hasPrevPage,
      hasNextPage: commentsData.hasNextPage,
      page: commentsData.page,
      totalPages: commentsData.totalPages,
      offset: commentsData.offset,
      prevPage: commentsData.prevPage ?? null,
      nextPage: commentsData.nextPage ?? null,
      pagingCounter: commentsData.pagingCounter,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error al obtener los comentarios:", error.message);
      throw new Error("Error al obtener los comentarios");
    }
    return {
      docs: [],
      totalDocs: 0,
      limit: 0,
      hasPrevPage: false,
      hasNextPage: false,
      page: 1,
      totalPages: 0,
      offset: 0,
      prevPage: null,
      nextPage: null,
      pagingCounter: 0,
    };
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

export const countStatusComments = async (): Promise<CountStatusComments> => {
  await connectToMongoDB();
  try {
    const approvedCount = await Comment.countDocuments({ status: "approved" });
    const pendingCount = await Comment.countDocuments({ status: "pending" });
    const rejectedCount = await Comment.countDocuments({ status: "rejected" });

    return {
      approved: approvedCount,
      pending: pendingCount,
      rejected: rejectedCount,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error al contar los comentarios:", error.message);
      throw new Error("Error al contar los comentarios");
    }
    return { approved: 0, pending: 0, rejected: 0 };
  }
};
