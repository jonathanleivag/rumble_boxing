"use client";
import { FC } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const PerfilPage: FC = () => {
  return (
    <div className="space-y-4 sm:space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-knockout text-white text-2xl sm:text-4xl">
          MI PERFIL
        </h1>
        <p className="text-accent-medium font-montserrat mt-1 sm:mt-2 text-sm sm:text-base">
          Información personal y preferencias
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-accent-dark/80 to-[#1a1a1a] rounded-xl border border-accent-dark/30 shadow-xl backdrop-blur-sm p-4 sm:p-6 lg:col-span-1"
        >
          <div className="flex flex-col items-center">
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 mb-3 sm:mb-4 rounded-full overflow-hidden border-3 sm:border-4 border-primary">
              <Image
                src="/default-avatar.png"
                alt="Avatar"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <h2 className="font-oswald text-lg sm:text-xl text-white mb-1">
              Usuario de Prueba
            </h2>
            <p className="text-accent-medium font-montserrat text-xs sm:text-sm mb-3 sm:mb-4">
              usuario@ejemplo.com
            </p>
            <button className="bg-accent-dark hover:bg-[#2a2a2a] text-white py-1.5 sm:py-2 px-3 sm:px-4 rounded-full text-xs sm:text-sm font-oswald uppercase tracking-wider transition-all duration-300 w-full text-center mb-2">
              Editar Perfil
            </button>
            <button className="bg-primary hover:bg-primary-dark text-white py-1.5 sm:py-2 px-3 sm:px-4 rounded-full text-xs sm:text-sm font-oswald uppercase tracking-wider transition-all duration-300 w-full text-center">
              Cambiar Contraseña
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-accent-dark/80 to-[#1a1a1a] rounded-xl border border-accent-dark/30 shadow-xl backdrop-blur-sm p-4 sm:p-6 lg:col-span-2"
        >
          <h2 className="font-bebas text-xl sm:text-2xl text-white mb-3 sm:mb-4">
            INFORMACIÓN PERSONAL
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block font-oswald text-white text-sm sm:text-base mb-1 sm:mb-2">
                NOMBRE
              </label>
              <input
                type="text"
                value="Usuario de Prueba"
                disabled
                className="w-full bg-accent-dark/40 border border-accent-dark/50 rounded-lg p-2 sm:p-3 text-white font-montserrat text-sm"
              />
            </div>
            <div>
              <label className="block font-oswald text-white text-sm sm:text-base mb-1 sm:mb-2">
                EMAIL
              </label>
              <input
                type="email"
                value="usuario@ejemplo.com"
                disabled
                className="w-full bg-accent-dark/40 border border-accent-dark/50 rounded-lg p-2 sm:p-3 text-white font-montserrat text-sm"
              />
            </div>
            <div>
              <label className="block font-oswald text-white text-sm sm:text-base mb-1 sm:mb-2">
                TELÉFONO
              </label>
              <input
                type="tel"
                value="+1 234 567 8900"
                disabled
                className="w-full bg-accent-dark/40 border border-accent-dark/50 rounded-lg p-2 sm:p-3 text-white font-montserrat text-sm"
              />
            </div>
            <div>
              <label className="block font-oswald text-white text-sm sm:text-base mb-1 sm:mb-2">
                FECHA DE NACIMIENTO
              </label>
              <input
                type="text"
                value="01/01/1990"
                disabled
                className="w-full bg-accent-dark/40 border border-accent-dark/50 rounded-lg p-2 sm:p-3 text-white font-montserrat text-sm"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PerfilPage;
