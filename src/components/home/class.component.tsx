"use client";
import { fadeInUp, staggerContainer } from "@/utils/motionEffect.util";
import { motion } from "framer-motion";
import { FC } from "react";

const ClassComponent: FC = () => {
  const scheduleData = {
    morning: [
      { start: "10:00 AM", end: "11:00 AM", class: "Boxeo Básico" },
      { start: "11:00 AM", end: "12:00 PM", class: "HIIT Boxing" },
      { start: "12:00 PM", end: "01:00 PM", class: "Sparring Técnico" },
    ],
    evening: [
      { start: "05:00 PM", end: "06:00 PM", class: "Boxeo Básico" },
      { start: "06:00 PM", end: "07:00 PM", class: "HIIT Boxing" },
      { start: "07:00 PM", end: "08:00 PM", class: "Sparring Técnico" },
      { start: "08:00 PM", end: "09:00 PM", class: "Boxeo Básico" },
    ],
    saturday: [
      { start: "10:00 AM", end: "11:00 AM", class: "Boxeo Básico" },
      { start: "11:00 AM", end: "12:00 PM", class: "HIIT Boxing" },
      { start: "12:00 PM", end: "01:00 PM", class: "Sparring Técnico" },
    ],
    days: [
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
      "Domingo",
    ],
    isClosed: [false, false, false, false, false, false, true],
  };

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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {/* Lunes a Viernes - Horario de mañana */}
          <motion.div
            variants={fadeInUp}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-2xl overflow-hidden shadow-lg shadow-black/30 border border-accent-dark/30"
          >
            <div className="p-4 bg-primary/10 border-b border-accent-dark/30">
              <h3 className="font-oswald text-white text-xl text-center">
                LUNES A VIERNES
              </h3>
              <p className="text-center text-primary font-oswald text-sm mt-1">
                MAÑANA
              </p>
            </div>
            <div className="p-6">
              {scheduleData.morning.map((timeSlot, index) => (
                <div
                  key={index}
                  className="mb-4 pb-4 border-b border-accent-dark/10 last:border-0 last:mb-0 last:pb-0"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-oswald text-white">
                      {timeSlot.class}
                    </span>
                    <div className="flex items-center gap-2">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-primary"
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
                      <span className="font-montserrat text-accent-medium text-sm">
                        {timeSlot.start} - {timeSlot.end}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-2xl overflow-hidden shadow-lg shadow-black/30 border border-accent-dark/30"
          >
            <div className="p-4 bg-primary/10 border-b border-accent-dark/30">
              <h3 className="font-oswald text-white text-xl text-center">
                LUNES A VIERNES
              </h3>
              <p className="text-center text-primary font-oswald text-sm mt-1">
                TARDE
              </p>
            </div>
            <div className="p-6">
              {scheduleData.evening.map((timeSlot, index) => (
                <div
                  key={index}
                  className="mb-4 pb-4 border-b border-accent-dark/10 last:border-0 last:mb-0 last:pb-0"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-oswald text-white">
                      {timeSlot.class}
                    </span>
                    <div className="flex items-center gap-2">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-primary"
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
                      <span className="font-montserrat text-accent-medium text-sm">
                        {timeSlot.start} - {timeSlot.end}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-2xl overflow-hidden shadow-lg shadow-black/30 border border-accent-dark/30"
          >
            <div className="p-4 bg-primary/10 border-b border-accent-dark/30">
              <h3 className="font-oswald text-white text-xl text-center">
                SÁBADO
              </h3>
              <p className="text-center text-primary font-oswald text-sm mt-1">
                MAÑANA
              </p>
            </div>
            <div className="p-6">
              {scheduleData.saturday.map((timeSlot, index) => (
                <div
                  key={index}
                  className="mb-4 pb-4 border-b border-accent-dark/10 last:border-0 last:mb-0 last:pb-0"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-oswald text-white">
                      {timeSlot.class}
                    </span>
                    <div className="flex items-center gap-2">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-primary"
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
                      <span className="font-montserrat text-accent-medium text-sm">
                        {timeSlot.start} - {timeSlot.end}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="bg-gradient-to-br from-[#1a1a1a]/70 to-[#0f0f0f]/70 rounded-2xl overflow-hidden shadow-lg shadow-black/30 border border-accent-dark/20 md:col-span-3 lg:col-span-3"
          >
            <div className="p-8 flex flex-col items-center justify-center">
              <h3 className="font-oswald text-accent-medium/70 text-xl mb-2">
                DOMINGO
              </h3>
              <div className="bg-accent-dark/30 w-16 h-16 rounded-full flex items-center justify-center mb-3">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-accent-medium/50"
                >
                  <path
                    d="M18 6L6 18M6 6l12 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="font-montserrat text-accent-medium/70 text-center">
                No hay clases programadas para este día.
                <br />
                ¡Te esperamos el resto de la semana!
              </p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
        >
          <motion.div
            variants={fadeInUp}
            className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-xl p-4 flex items-center border border-accent-dark/30"
          >
            <div className="bg-primary/80 backdrop-blur-sm px-3 py-1 rounded-full mr-3">
              <span className="text-white font-oswald text-xs">
                PRINCIPIANTE
              </span>
            </div>
            <div>
              <h3 className="font-oswald text-lg text-white">BOXEO BÁSICO</h3>
              <p className="font-montserrat text-accent-medium text-xs">
                60 minutos • Técnica y fundamentos
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-xl p-4 flex items-center border border-accent-dark/30"
          >
            <div className="bg-accent-dark/80 backdrop-blur-sm px-3 py-1 rounded-full mr-3">
              <span className="text-white font-oswald text-xs">INTERMEDIO</span>
            </div>
            <div>
              <h3 className="font-oswald text-lg text-white">HIIT BOXING</h3>
              <p className="font-montserrat text-accent-medium text-xs">
                45 minutos • Alta intensidad
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-xl p-4 flex items-center border border-accent-dark/30"
          >
            <div className="bg-secondary/80 backdrop-blur-sm px-3 py-1 rounded-full mr-3">
              <span className="text-white font-oswald text-xs">AVANZADO</span>
            </div>
            <div>
              <h3 className="font-oswald text-lg text-white">
                SPARRING TÉCNICO
              </h3>
              <p className="font-montserrat text-accent-medium text-xs">
                90 minutos • Combate controlado
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Botón de inscripción */}
        <motion.div variants={fadeInUp} className="flex justify-center mt-12">
          <button className="font-bebas bg-primary hover:bg-primary-dark px-8 py-4 rounded-full text-white text-lg transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-primary/40">
            INSCRÍBETE A UNA CLASE
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default ClassComponent;
