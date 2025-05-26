"use client";

import { fadeInUp, staggerContainer } from "@/utils/motionEffect.util";
import { motion } from "framer-motion";
import { FC } from "react";

const TrainersComponent: FC = () => {
  return (
    <section
      id="trainers"
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
        className="text-center mb-16"
      >
        <motion.div
          variants={fadeInUp}
          className="inline-block px-6 py-2 bg-primary/10 rounded-full mb-4"
        >
          <span className="font-oswald text-primary text-sm tracking-widest">
            EQUIPO
          </span>
        </motion.div>
        <motion.h2
          variants={fadeInUp}
          className="font-bebas text-5xl md:text-6xl text-white mb-4 relative inline-block"
        >
          ENTRENADORES PROFESIONALES
          <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-primary"></span>
        </motion.h2>
        <motion.p
          variants={fadeInUp}
          className="font-montserrat text-accent-medium max-w-3xl mx-auto mt-6"
        >
          Nuestro equipo de entrenadores certificados cuenta con años de
          experiencia en boxeo competitivo y fitness de alto rendimiento.
        </motion.p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10"
      >
        <motion.div
          variants={fadeInUp}
          whileHover={{ y: -10 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-2xl overflow-hidden group shadow-lg shadow-black/30 border border-accent-dark/30"
        >
          <div className="h-[300px] bg-accent-medium relative overflow-hidden">
            {/* Trainer image would go here */}
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:scale-110 transition-transform duration-700">
              <p className="text-accent-dark font-bebas text-xl">
                [FOTO ENTRENADOR]
              </p>
            </div>

            <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-primary transition-colors"
              >
                <span className="text-white text-sm">IG</span>
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-primary transition-colors"
              >
                <span className="text-white text-sm">FB</span>
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-primary transition-colors"
              >
                <span className="text-white text-sm">TW</span>
              </a>
            </div>
          </div>
          <div className="p-8">
            <h3 className="font-oswald text-2xl mb-1 group-hover:text-primary transition-colors duration-300">
              CARLOS MENDOZA
            </h3>
            <p className="font-montserrat text-primary mb-4 text-sm">
              Head Coach & Ex-Campeón Nacional
            </p>
            <p className="font-montserrat text-accent-medium text-sm leading-relaxed">
              Especialista en técnica avanzada con más de 15 años de experiencia
              competitiva.
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          whileHover={{ y: -10 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-2xl overflow-hidden group shadow-lg shadow-black/30 border border-accent-dark/30"
        >
          <div className="h-[300px] bg-accent-medium relative overflow-hidden">
            {/* Trainer image would go here */}
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:scale-110 transition-transform duration-700">
              <p className="text-accent-dark font-bebas text-xl">
                [FOTO ENTRENADORA]
              </p>
            </div>

            <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-primary transition-colors"
              >
                <span className="text-white text-sm">IG</span>
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-primary transition-colors"
              >
                <span className="text-white text-sm">FB</span>
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-primary transition-colors"
              >
                <span className="text-white text-sm">YT</span>
              </a>
            </div>
          </div>
          <div className="p-8">
            <h3 className="font-oswald text-2xl mb-1 group-hover:text-primary transition-colors duration-300">
              LAURA SÁNCHEZ
            </h3>
            <p className="font-montserrat text-primary mb-4 text-sm">
              HIIT Boxing & Fitness Coach
            </p>
            <p className="font-montserrat text-accent-medium text-sm leading-relaxed">
              Experta en acondicionamiento físico y entrenamiento de alta
              intensidad.
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          whileHover={{ y: -10 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-2xl overflow-hidden group shadow-lg shadow-black/30 border border-accent-dark/30"
        >
          <div className="h-[300px] bg-accent-medium relative overflow-hidden">
            {/* Trainer image would go here */}
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:scale-110 transition-transform duration-700">
              <p className="text-accent-dark font-bebas text-xl">
                [FOTO ENTRENADOR]
              </p>
            </div>

            <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-primary transition-colors"
              >
                <span className="text-white text-sm">IG</span>
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-primary transition-colors"
              >
                <span className="text-white text-sm">FB</span>
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-primary transition-colors"
              >
                <span className="text-white text-sm">TW</span>
              </a>
            </div>
          </div>
          <div className="p-8">
            <h3 className="font-oswald text-2xl mb-1 group-hover:text-primary transition-colors duration-300">
              MIGUEL TORRES
            </h3>
            <p className="font-montserrat text-primary mb-4 text-sm">
              Boxing Técnico & Sparring
            </p>
            <p className="font-montserrat text-accent-medium text-sm leading-relaxed">
              Especialista en defensa y contraataque con experiencia en
              entrenamiento olímpico.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default TrainersComponent;
