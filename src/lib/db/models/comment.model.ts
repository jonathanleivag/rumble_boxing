"use server";
import { ICommentDocument } from "@/type";
import mongoose, { models, PaginateModel } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const commentSchema = new mongoose.Schema<ICommentDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    quote: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    textRating: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      required: true,
      default: "pending",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

commentSchema.plugin(mongoosePaginate);

const Comment =
  (models.Comment as PaginateModel<ICommentDocument>) ||
  mongoose.model<ICommentDocument>("Comment", commentSchema);

export default Comment;
