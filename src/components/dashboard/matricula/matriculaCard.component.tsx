"use client";

import { FC } from "react";
import { motion } from "framer-motion";

interface MatriculaCardProps {
  value: number;
  description?: string;
  isActive?: boolean;
}

const MatriculaCard: FC<MatriculaCardProps> = ({
  value,
  description = "Pago único de inscripción",
  isActive = true,
}) => {
  if (value <= 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className={`mb-3 px-3 py-2 bg-[#0d0d0d] rounded-md border border-primary/10`}
    >
      <h4 className="text-primary text-sm font-montserrat font-medium mb-1">
        Matrícula
      </h4>
      <div
        className={`font-oswald ${
          isActive ? "text-white" : "text-accent-medium"
        }`}
      >
        <span className="text-2xl">${value}</span>
        <span className="text-accent-medium text-xs ml-1">pago único</span>
      </div>
      {description && (
        <p className="text-accent-medium text-xs mt-1">{description}</p>
      )}
    </motion.div>
  );
};

export default MatriculaCard;
