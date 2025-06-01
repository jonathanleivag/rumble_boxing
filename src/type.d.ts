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

export interface IData {
  _id: Types.ObjectId;
  createdAt: string;
  updatedAt: string;
}
export interface IComment {
  name: string;
  quote: string;
  image?: string;
  textRating: string;
  email: string;
  rating: number;
}

export interface ICommentData extends IData, IComment {}
export interface ICommentSlice {
  comments: ICommentData[];
}

export interface ICommentDocument extends ICommentData, Document {}

export interface IUser {
  name: string;
  email: string;
  password: string;
}

export interface IUserData extends IData, IUser {}
export interface IUserDocument extends IUserData, Document {}

export interface IPrice {
  name: string;
  type: "mensual" | "anual" | "personalizado";
  price: number;
  class: number | string;
  description: string;
  characteristics: string[];
  active: boolean;
  isPopular: boolean;
}

export interface IPriceData extends IData, IPrice {}
export interface IPriceDocument extends IPriceData, Document {}

export interface PriceFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: IPrice;
  onSubmit: (data: IPrice) => void;
}

export interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

export interface PriceCardProps {
  price: IPriceData;
  onEdit: () => void;
  onDelete: () => void;
  onToggleActive: () => void;
  onTogglePopular: () => void;
}
