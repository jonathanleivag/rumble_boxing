"use client";
import { FC } from "react";
import { motion } from "framer-motion";

const ConfiguracionPage: FC = () => {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-knockout text-white text-4xl">CONFIGURACIÓN</h1>
        <p className="text-accent-medium font-montserrat mt-2">
          Personaliza tu experiencia en Rumble Boxing
        </p>
      </motion.div>

      <div className="bg-gradient-to-br from-accent-dark/80 to-[#1a1a1a] rounded-xl border border-accent-dark/30 shadow-xl backdrop-blur-sm p-6">
        <p className="text-white font-montserrat">
          Esta sección está en desarrollo.
        </p>
      </div>
    </div>
  );
};

export default ConfiguracionPage;
