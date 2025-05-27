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
