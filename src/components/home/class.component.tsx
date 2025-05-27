"use client";
import { fadeInUp, staggerContainer } from "@/utils/motionEffect.util";
import { motion } from "framer-motion";
import { FC } from "react";

const ClassComponent: FC = () => {
  return (
    <section
      id="classes"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0f0f0f] via-accent-dark/80 to-[#0f0f0f]"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.div className="flex flex-row justify-center items-center gap-3">
            <motion.div
              variants={fadeInUp}
              className="flex justify-center mb-4"
            >
              <div className="inline-block px-6 py-2 bg-primary/10 rounded-full">
                <span className="font-oswald text-primary text-sm tracking-widest">
                  PROGRAMAS
                </span>
              </div>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="font-bebas text-5xl md:text-6xl text-white mb-4 relative"
            >
              NUESTRAS CLASES
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-primary"></span>
            </motion.h2>
          </motion.div>
          <motion.p
            variants={fadeInUp}
            className="font-montserrat text-accent-medium max-w-3xl mx-auto mt-6"
          >
            Descubre nuestro programa completo de boxeo, cardio y
            acondicionamiento físico diseñado para desafiarte y transformar tu
            condición física.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
        >
          <motion.div
            variants={fadeInUp}
            whileHover={{ scale: 1.03, y: -5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-2xl overflow-hidden group shadow-lg shadow-black/30 border border-accent-dark/30"
          >
            <div className="h-56 bg-accent-medium relative overflow-hidden">
              {/* Class image would go here */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/60 to-transparent group-hover:scale-110 transition-transform duration-500">
                <p className="text-accent-dark font-bebas text-xl">
                  [IMAGEN BOXEO BÁSICO]
                </p>
              </div>
              <div className="absolute top-4 left-4 bg-primary/80 backdrop-blur-sm px-3 py-1 rounded-full">
                <span className="text-white font-oswald text-xs">
                  PRINCIPIANTE
                </span>
              </div>
            </div>
            <div className="p-8">
              <h3 className="font-oswald text-2xl mb-3 group-hover:text-primary transition-colors duration-300">
                BOXEO BÁSICO
              </h3>
              <p className="font-montserrat text-accent-medium mb-6 text-sm leading-relaxed">
                Aprende los fundamentos del boxeo con énfasis en la técnica
                correcta y movimientos básicos.
              </p>
              <div className="flex justify-between items-center">
                <span className="font-oswald text-primary flex items-center gap-2">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="9"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M12 7V12L15 15"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                  60 MIN
                </span>
                <button className="font-bebas bg-primary hover:bg-primary-dark px-5 py-2.5 rounded-full text-white transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-primary/40">
                  INSCRÍBETE
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            whileHover={{ scale: 1.03, y: -5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-2xl overflow-hidden group shadow-lg shadow-black/30 border border-accent-dark/30"
          >
            <div className="h-56 bg-accent-medium relative overflow-hidden">
              {/* Class image would go here */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/60 to-transparent group-hover:scale-110 transition-transform duration-500">
                <p className="text-accent-dark font-bebas text-xl">
                  [IMAGEN HIIT BOXING]
                </p>
              </div>
              <div className="absolute top-4 left-4 bg-accent-dark/80 backdrop-blur-sm px-3 py-1 rounded-full">
                <span className="text-white font-oswald text-xs">
                  INTERMEDIO
                </span>
              </div>
            </div>
            <div className="p-8">
              <h3 className="font-oswald text-2xl mb-3 group-hover:text-primary transition-colors duration-300">
                HIIT BOXING
              </h3>
              <p className="font-montserrat text-accent-medium mb-6 text-sm leading-relaxed">
                Entrenamiento de alta intensidad que combina boxeo con
                ejercicios cardiovasculares para máxima quema.
              </p>
              <div className="flex justify-between items-center">
                <span className="font-oswald text-primary flex items-center gap-2">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="9"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M12 7V12L15 15"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                  45 MIN
                </span>
                <button className="font-bebas bg-primary hover:bg-primary-dark px-5 py-2.5 rounded-full text-white transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-primary/40">
                  INSCRÍBETE
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            whileHover={{ scale: 1.03, y: -5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-2xl overflow-hidden group shadow-lg shadow-black/30 border border-accent-dark/30"
          >
            <div className="h-56 bg-accent-medium relative overflow-hidden">
              {/* Class image would go here */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/60 to-transparent group-hover:scale-110 transition-transform duration-500">
                <p className="text-accent-dark font-bebas text-xl">
                  [IMAGEN SPARRING]
                </p>
              </div>
              <div className="absolute top-4 left-4 bg-secondary/80 backdrop-blur-sm px-3 py-1 rounded-full">
                <span className="text-white font-oswald text-xs">AVANZADO</span>
              </div>
            </div>
            <div className="p-8">
              <h3 className="font-oswald text-2xl mb-3 group-hover:text-primary transition-colors duration-300">
                SPARRING TÉCNICO
              </h3>
              <p className="font-montserrat text-accent-medium mb-6 text-sm leading-relaxed">
                Práctica de combate controlado para boxeadores con experiencia
                que buscan mejorar su técnica.
              </p>
              <div className="flex justify-between items-center">
                <span className="font-oswald text-primary flex items-center gap-2">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="9"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M12 7V12L15 15"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                  90 MIN
                </span>
                <button className="font-bebas bg-primary hover:bg-primary-dark px-5 py-2.5 rounded-full text-white transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-primary/40">
                  INSCRÍBETE
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <button className="font-oswald text-lg uppercase bg-transparent border-2 border-white hover:border-primary hover:text-primary transition-all duration-300 tracking-wider py-3 px-10 rounded-full backdrop-blur-sm">
            Ver todas las clases
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default ClassComponent;
