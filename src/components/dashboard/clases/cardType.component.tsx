'use client";';

import { deleteClass } from "@/lib/db/actions/class.action";
import {
  deleteClassSlice,
  selectEditClass,
} from "@/lib/redux/features/class/class.slice";
import { useAppDispatch } from "@/lib/redux/hooks";
import { CardTypeComponentProps, ClassDocumentData, Difficulty } from "@/type";
import { showConfirmToast } from "@/utils/showConfirmToast";
import { motion } from "framer-motion";
import { FC } from "react";

const CardTypeComponent: FC<CardTypeComponentProps> = ({
  classData,
  index,
  setIsCreateModalOpen,
  setFormData,
}) => {
  const dispatch = useAppDispatch();

  const getSpanishDifficulty = (difficulty: Difficulty) => {
    switch (difficulty) {
      case "essential":
        return "Básico";
      case "intermediate":
        return "Intermedio";
      case "advanced":
        return "Avanzado";
      default:
        return "Desconocido";
    }
  };

  const getColorByDifficulty = (difficulty: Difficulty) => {
    switch (difficulty) {
      case "essential":
        return "bg-green-500";
      case "intermediate":
        return "bg-yellow-500";
      case "advanced":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const handlerDeleteClass = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    showConfirmToast({
      message: "¿Estás seguro de que deseas eliminar esta clase?",
      onConfirm: async () => {
        const data = await deleteClass(id);
        dispatch(deleteClassSlice(data));
      },
    });
  };

  const handleEditClass = (e: React.MouseEvent, edit: ClassDocumentData) => {
    e.stopPropagation();
    setFormData({
      name: edit.name,
      duration: edit.duration,
      difficulty: edit.difficulty,
      description: edit.description,
    });
    dispatch(selectEditClass(edit));
    setIsCreateModalOpen(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.3 }}
      className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-xl p-5 border border-accent-dark/30 transition-all duration-300"
    >
      <div className="flex space-x-2 my-3 justify-end">
        <button
          onClick={(e) => handleEditClass(e, classData)}
          className="cursor-pointer text-accent-medium hover:text-white transition-colors"
          title="Editar clase"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 19.5h15"
            />
          </svg>
        </button>
        <button
          onClick={(e) => handlerDeleteClass(e, classData._id.toString())}
          className="cursor-pointer text-primary hover:text-red-500 transition-colors"
          title="Eliminar clase"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </button>
      </div>
      <div className="flex items-center mb-3">
        <div
          className={`backdrop-blur-sm px-3 py-1 rounded-full mr-3 flex flex-row justify-center items-center ${getColorByDifficulty(
            classData.difficulty
          )}`}
        >
          <span className={`text-white font-oswald text-xs `}>
            {getSpanishDifficulty(classData.difficulty)}
          </span>
        </div>
        <div className="ml-auto">
          <span className="text-primary font-bebas text-2xl">
            {index.toString().padStart(2, "0")}
          </span>
        </div>
      </div>
      <h3 className="font-oswald text-xl text-white mb-2">
        {classData.name.toUpperCase()}
      </h3>
      <p className="font-montserrat text-accent-medium text-xs mb-3">
        {classData.duration} minutos
      </p>
      <p className="text-white/70 font-montserrat text-xs leading-relaxed">
        {classData.description}
      </p>
    </motion.div>
  );
};

export default CardTypeComponent;
