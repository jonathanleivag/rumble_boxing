import { ReactNode, Dispatch, SetStateAction } from "react";
import { Document, Types, PaginateResult } from "mongoose";
import { countStatusComments } from "./lib/db/actions/comment.action";

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
  status: StatusComment | "";
}

export interface IData {
  _id: Types.ObjectId;
  createdAt: string;
  updatedAt: string;
}

export type StatusComment = "pending" | "approved" | "rejected";

export interface IComment {
  name: string;
  quote: string;
  image?: string;
  textRating: string;
  status?: StatusComment;
  email: string;
  rating: number;
}

export interface ICommentData extends IData, IComment {}
export interface ICommentSlice {
  comments: PaginateResult<ICommentData>;
  countStatusComments: CountStatusComments;
  page: number;
  limit: number;
  status: StatusComment;
}

export interface IStudentSlice {
  students: PaginateResult<IStudentData>;
}

export interface ICommentDocument extends ICommentData, Document {}

export interface IUser {
  name: string;
  email: string;
  password: string;
}

export interface IUserData extends IData, IUser {}
export interface IUserDocument extends IUserData, Document {}

export interface IMatricula {
  value: number;
  description: string;
}

export interface IMatriculaData extends IData, IMatricula {}
export interface IMatriculaDocument extends IMatriculaData, Document {}

export interface IPrice {
  name: string;
  type: "mensual" | "anual" | "personalizado";
  price: number;
  class: number | "ilimitado";
  description: string;
  characteristics: string[];
  active: boolean;
  isPopular: boolean;
}

export interface IPriceData extends IData, IPrice {
  id: string;
}
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

export interface PriceCardComponentProps {
  item: IPriceData;
  isPopular?: boolean;
  showConsultButton?: boolean;
}

export interface FormUserComponentProps {
  showAddForm?: boolean;
  setShowAddForm: Dispatch<SetStateAction<boolean>>;
  planes: IPriceData[];
}

export type StatusStudent = "activo" | "inactivo" | "suspendido";

export interface IStudent {
  name: string;
  email: string;
  rut: string;
  phone: string;
  createDate: string;
  plan: IPriceData;
  assistance: number;
  status: StatusStudent;
  avatar?: string;
}

export type IStudentDTO = Omit<IStudent, "plan"> & {
  plan: Types.ObjectId;
};

export interface IStudentData extends IData, IStudent {}
export interface IStudentDocument extends IStudentData, Document {}

export interface ModalEditUserComponentProps {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  usuarioEditado: IStudentData | null;
  showModal: boolean;
  setUsuarioEditado: Dispatch<SetStateAction<IStudentData | null>>;
  planes: IPriceData[];
}

export interface PaginationUserComponentProps {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  currentPage: number;
}

export type sortByType = "name" | "createDate" | "assistance" | "";
export interface FilterUserComponentProps {
  setCurrentPage: Dispatch<SetStateAction<number>>;
  planes: IPriceData[];
  setSearchTerm: Dispatch<SetStateAction<string>>;
  searchTerm: string;
  setFilterPlan: Dispatch<SetStateAction<string>>;
  filterPlan: string;
  setFilterEstado: Dispatch<SetStateAction<sortByType>>;
  filterEstado: sortByType;
  setSortBy: Dispatch<SetStateAction<string>>;
  sortBy: string;
}

export interface StudentQuery {
  search?: string;
  plan?: string;
  status?: string;
  sortBy?: sortByType;
  sortOrder?: "asc" | "desc";
}

export interface CountStatusComments {
  approved: number;
  pending: number;
  rejected: number;
}
