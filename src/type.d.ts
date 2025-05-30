import { ReactNode, Dispatch, SetStateAction } from "react";
import { Document, Types } from "mongoose";

export interface ChildrenProps {
  children: ReactNode;
}

export interface CuerdaSharedComponentProps {
  src: string;
}

export interface VideoShareModalProps {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

export type TestimonialComment = Omit<Testimonial, "id" | "duration">;

export interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (commentData: ICommentData) => void;
  quote: string;
  rating: number;
  edit: boolean;
}

export interface IComment {
  name: string;
  quote: string;
  image?: string;
  textRating: string;
  email: string;
  rating: number;
}

export interface ICommentData extends IComment {
  _id: Types.ObjectId;
  createdAt: string;
  updatedAt: string;
}

export interface ICommentSlice {
  comments: ICommentData[];
}

export interface ICommentDocument extends ICommentData, Document {}
