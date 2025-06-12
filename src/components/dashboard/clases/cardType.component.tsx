'use client";';

import { motion } from "framer-motion";
import { FC } from "react";

const CardTypeComponent: FC = () => {
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
        <div className="bg-primary/80 backdrop-blur-sm px-3 py-1 rounded-full mr-3">
          <span className="text-white font-oswald text-xs">PRINCIPIANTE</span>
        </div>
        <div className="ml-auto">
          <span className="text-primary font-bebas text-2xl">01</span>
        </div>
      </div>
      <h3 className="font-oswald text-xl text-white mb-2">BOXEO BÁSICO</h3>
      <p className="font-montserrat text-accent-medium text-xs mb-3">
        60 minutos • Técnica y fundamentos
      </p>
      <p className="text-white/70 font-montserrat text-xs leading-relaxed">
        Clase enfocada en técnica básica de boxeo. Aprenderás postura,
        desplazamientos, golpes básicos y defensas mientras mejoras tu condición
        física.
      </p>
    </motion.div>
  );
};

export default CardTypeComponent;
