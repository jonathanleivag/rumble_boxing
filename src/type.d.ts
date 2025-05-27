import { ReactNode, Dispatch, SetStateAction } from "react";

export interface ChildrenProps {
  children: ReactNode;
}

export interface CuerdaSharedComponentProps {
  src: string;
}

export interface VideoShareModalProps {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

export interface Testimonial {
  id: number;
  name: string;
  quote: string;
  duration: string;
  image?: string;
}

export interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (commentData: { rating: number; comment: string }) => void;
}
