"use client";

import { ButtonClassComponentProps } from "@/type";
import { motion } from "framer-motion";
import Link from "next/link";
import { FC } from "react";

const ButtonClassComponent: FC<ButtonClassComponentProps> = ({
  setIsCreateModalOpen,
  setIsGroupModalOpen,
  countClass,
  countGroup,
  totalClasses,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9, duration: 0.3 }}
      className="bg-gradient-to-br from-accent-dark/80 to-[#1a1a1a] rounded-xl border border-accent-dark/30 shadow-xl backdrop-blur-sm p-6 mt-10"
    >
      <div className="mb-6">
        <h2 className="font-oswald text-white text-2xl mb-2 text-center">
          GESTIÓN DE CLASES
        </h2>
        <p className="text-accent-medium font-montserrat text-center mb-6">
          Esta sección está en desarrollo. Mientras tanto, puedes gestionar las
          asistencias a las clases.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <Link
            href="/dashboard/asistencias"
            className="w-full md:w-auto bg-primary hover:bg-primary-dark text-white py-3 px-6 rounded-lg text-sm font-oswald uppercase tracking-wider transition-all duration-300 flex items-center justify-center shadow-lg shadow-primary/20"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 mr-2"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            Control de Asistencias
          </Link>
          <button
            onClick={() => setIsGroupModalOpen(true)}
            className="cursor-pointer w-full md:w-auto bg-secondary hover:bg-secondary/90 text-white py-3 px-6 rounded-lg text-sm font-oswald uppercase tracking-wider transition-all duration-300 flex items-center justify-center shadow-lg shadow-secondary/20"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 mr-2"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Crear Horarios
          </button>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="cursor-pointer w-full md:w-auto bg-accent-dark hover:bg-accent-dark/90 text-white py-3 px-6 rounded-lg text-sm font-oswald uppercase tracking-wider transition-all duration-300 flex items-center justify-center shadow-lg shadow-accent-dark/20"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 mr-2"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            Crear Clase
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 bg-accent-dark/20 p-4 rounded-lg border border-accent-dark/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 text-primary"
            >
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
            </svg>
          </div>
          <div className="text-white font-oswald">
            {countClass}
            <div className="text-xs text-accent-medium font-montserrat">
              Clases en total
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 text-secondary"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
          <div>
            <div className="text-white font-oswald"> {countGroup} </div>
            <div className="text-xs text-accent-medium font-montserrat">
              Grupos de clases
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-accent-dark/40 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 text-accent-medium"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          </div>
          <div>
            <div className="text-white font-oswald">{totalClasses} min</div>
            <div className="text-xs text-accent-medium font-montserrat">
              Tiempo total de clases
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ButtonClassComponent;
