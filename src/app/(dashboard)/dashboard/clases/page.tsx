"use client";
import { FC } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const ClasesPage: FC = () => {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-knockout text-white text-4xl">
          CLASES DISPONIBLES
        </h1>
        <p className="text-accent-medium font-montserrat mt-2">
          Explora y reserva tus clases favoritas
        </p>
      </motion.div>

      <div className="bg-gradient-to-br from-accent-dark/80 to-[#1a1a1a] rounded-xl border border-accent-dark/30 shadow-xl backdrop-blur-sm p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-oswald text-white text-xl mb-2">
              Gestión de Clases
            </h2>
            <p className="text-accent-medium font-montserrat">
              Esta sección está en desarrollo. Mientras tanto, puedes gestionar
              las asistencias a las clases.
            </p>
          </div>
          <Link
            href="/dashboard/asistencias"
            className="bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-md text-sm font-oswald uppercase tracking-wider transition-all duration-300 flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 mr-2"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            Control de Asistencias
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ClasesPage;
