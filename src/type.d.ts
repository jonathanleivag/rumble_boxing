import { ReactNode, Dispatch, SetStateAction } from "react";
import { Document, Types, PaginateResult } from "mongoose";

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
  _id: Types.ObjectId | string;
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

export interface IClassSlice {
  class: ClassDocumentData[];
  edit: ClassDocumentData | false;
}

export interface IScheduleSlice {
  schedules: ISchedulesData[];
  edit: boolean;
  nameEdit: string;
  idEdit: string;
}

export interface ICommentDocument extends ICommentData, Document {}

export interface IUser {
  name: string;
  email: string;
  password: string;
}

export interface IUserData extends IData, IUser {}
export interface IUserDocument extends IUserData, Document {}

export interface IAssist {
  assist: number;
  days: number | "ilimitado";
}

export interface IAssistData extends IData, IAssist {}
export interface IAssistDocument extends IAssistData, Document {}

export type StatusFinance = "pending" | "paid" | "overdue";
export interface IFinance {
  price: number;
  dateStart: string;
  dateEnd: string;
  status: StatusFinance;
  description?: string;
  matricula: number;
  total: number;
}

export interface IFinanceData extends IData, IFinance {}
export interface IFinanceDocument extends IFinanceData, Document {}

export interface IMatricula {
  value: number;
  description: string;
}

export interface IMatriculaData extends IData, IMatricula {}
export interface IMatriculaDocument extends IMatriculaData, Document {}

export type PlanType = "mensual" | "anual" | "personalizado";
export type planTypePersonalizado = "mensual" | "anual";
export interface IPrice {
  name: string;
  type: PlanType;
  price: number;
  class: number | string;
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
  assist: IAssistData[];
  finance: IFinanceData;
  updateAssistance?: Date;
  status: StatusStudent;
  avatar?: string;
}

export type IStudentDTO = Omit<IStudent, "plan" | "assist" | "finance"> & {
  plan: Types.ObjectId | string;
  price?: number;
  personalizedDays: planTypePersonalizado;
  description?: string;
  assist?: Types.ObjectId[];
  finance?: Types.ObjectId;
};

export type IStudentDTOOmit = Omit<IStudentDTO, "plan" | "assist" | "finance">;
export interface IIStudentFrontDTO extends IStudent, IStudentDTOOmit {}

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

export interface ButtonClassComponentProps {
  setIsCreateModalOpen: Dispatch<SetStateAction<boolean>>;
  setIsGroupModalOpen: Dispatch<SetStateAction<boolean>>;
  countClass: number;
  countGroup: number;
  totalClasses: number;
}

export type Difficulty = "essential" | "intermediate" | "advanced";

export interface ClassFormData {
  name: string;
  duration: number;
  difficulty: Difficulty;
  description: string;
}

export interface IClassDocument extends ClassFormData, Document {}

export interface ClassDocumentData extends IData, ClassFormData {}

export interface Classes {
  class: {
    _id: Types.ObjectId | string;
    name: string;
    duration: number;
    difficulty: Difficulty;
    description: string;
    createdAt: string;
    updatedAt: string;
  };
  startTime: string;
  endTime: string;
}
export interface Schedules {
  name: string;
  description: string;
  color: string;
  classes: Classes[];
}

export interface ISchedulesDocument extends Schedules, Document {}
export interface ISchedulesData extends IData, Schedules {}

export type CreateSchedule = Omit<ISchedulesData, "_id"> & { _id: string };

export interface SchedulesClassComponentProps {
  setIsCreateModalOpen: Dispatch<SetStateAction<boolean>>;
  setFormData: Dispatch<SetStateAction<GroupFormData>>;
}

export interface ModalClassComponentProps {
  setFormData: Dispatch<SetStateAction<ClassFormData>>;
  formData: ClassFormData;
  formErrors: Partial<Record<keyof ClassFormData, string>>;
  setFormErrors: Dispatch<
    SetStateAction<Partial<Record<keyof ClassFormData, string>>>
  >;
}

export interface ModalCreateClassComponentProps
  extends ModalClassComponentProps {
  setIsCreateModalOpen: Dispatch<SetStateAction<boolean>>;
}

export interface ModalSchedulesClassComponentProps {
  setIsGroupModalOpen: Dispatch<SetStateAction<boolean>>;
  setGroupFormData: Dispatch<SetStateAction<GroupFormData>>;
  groupFormData: GroupFormData;
}

export interface CardTypeComponentProps {
  classData: ClassDocumentData;
  index: number;
  setIsCreateModalOpen: Dispatch<SetStateAction<boolean>>;
  setFormData: Dispatch<SetStateAction<ClassFormData>>;
}

export interface ConfirmOptions {
  message: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

export interface ClassSchedule {
  startTime: string;
}

export interface TimeInputRefs {
  [classId: string]: HTMLInputElement | null;
}

export interface GroupFormData {
  name: string;
  description: string;
  color: string;
  selectedClasses: string[];
  classSchedules: Record<string, ClassSchedule>;
}

export interface ModalFinanceComponentProps {
  showSuccess: boolean;
  selectedPlan: Plan | null;
  setShowSuccess: Dispatch<SetStateAction<boolean>>;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  setSelectedStudent: Dispatch<SetStateAction<Student | null>>;
  setSelectedPlan: Dispatch<SetStateAction<Plan | null>>;
  selectedStudent: Student | null;
}

export interface ResumeFinance {
  titulo: string;
  valor: string;
  icono: string;
  color: string;
}

export interface GetFinance {
  income: number;
  totalStudent: number;
  totalDelinquentStudents: number;
  valueMatricula: number;
}

export interface DistributionItem {
  label: string;
  percentage: number;
  color: string;
}

export interface IncomeDistributionProps {
  delay?: number;
}

export interface GetIncomeDistribution {
  mensualidades: number;
  anuales: number;
  personalizadas: number;
}
