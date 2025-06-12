'use client";';

import { CardTypeComponentProps, Difficulty } from "@/type";
import { motion } from "framer-motion";
import { FC } from "react";

const CardTypeComponent: FC<CardTypeComponentProps> = ({
  classData,
  index,
}) => {
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
    console.log(`Difficulty: ${difficulty}`);

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.3 }}
      whileHover={{
        y: -5,
        boxShadow: "0 10px 25px -5px rgba(224,32,32,0.2)",
      }}
      className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-xl p-5 border border-accent-dark/30 transition-all duration-300"
    >
      <div className="flex items-center mb-3">
        <div
          className={`backdrop-blur-sm px-3 py-1 rounded-full mr-3 ${getColorByDifficulty(
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
