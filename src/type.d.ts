import { ReactNode, Dispatch, SetStateAction } from "react";
import { Document, ObjectId } from "mongoose";

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
  onSubmit: (commentData: { rating: number; comment: string }) => void;
}

export interface IComment {
  name: string;
  quote: string;
  image?: string;
  textRating: string;
  email: string;
}

export interface ICommentDocument extends IComment, Document {
  id: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
