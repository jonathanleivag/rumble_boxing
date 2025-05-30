"use server";
import { ICommentDocument } from "@/type";
import mongoose, { Model } from "mongoose";

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
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Comment: Model<ICommentDocument> =
  mongoose.models.Comment || mongoose.model("Comment", commentSchema);

export default Comment;
