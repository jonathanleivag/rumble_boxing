"use client";

import { fadeInUp, staggerContainer } from "@/utils/motionEffect.util";
import { motion } from "framer-motion";
import { FC } from "react";

const PricingComponent: FC = () => {
  return (
    <section
      id="pricing"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0f0f0f] via-accent-dark/60 to-[#0f0f0f] relative"
    >
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-5 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 border-8 border-primary rounded-full"></div>
        <div className="absolute -bottom-20 -left-20 w-60 h-60 border-8 border-primary rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
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
                  MEMBRESÍAS
                </span>
              </div>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="font-bebas text-5xl md:text-6xl text-white mb-4 relative"
            >
              PLANES DE MEMBRESÍA
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-primary"></span>
            </motion.h2>
          </motion.div>
          <motion.p
            variants={fadeInUp}
            className="font-montserrat text-accent-medium max-w-3xl mx-auto mt-6"
          >
            Elige el plan que mejor se adapte a tus objetivos y horario. Todas
            las membresías incluyen acceso a nuestras instalaciones de primer
            nivel.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-8 lg:gap-10"
        >
          <motion.div
            variants={fadeInUp}
            whileHover={{ y: -10 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-2xl p-8 border border-accent-dark/50 hover:border-primary/50 transition-all duration-300 shadow-lg shadow-black/20"
          >
            <div className="text-center mb-4">
              <span className="font-oswald inline-block px-4 py-1 rounded-full bg-accent-dark/80 text-accent-light text-sm">
                BÁSICO
              </span>
            </div>
            <div className="text-center mb-6">
              <div className="font-bebas text-6xl text-primary mb-2 flex justify-center items-start">
                <span className="text-2xl mr-1 mt-2">$</span>89
                <span className="text-lg text-accent-medium self-end mb-2">
                  /mes
                </span>
              </div>
              <p className="font-montserrat text-accent-medium text-sm">
                Ideal para principiantes que buscan iniciarse en el mundo del
                boxeo.
              </p>
            </div>
            <ul className="font-montserrat text-accent-light space-y-4 mb-8 text-sm">
              <li className="flex items-start">
                <span className="text-primary mr-2 mt-0.5 flex-shrink-0">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 12L10 17L19 8"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span>8 clases mensuales</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2 mt-0.5 flex-shrink-0">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 12L10 17L19 8"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span>Acceso a área de pesas</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2 mt-0.5 flex-shrink-0">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 12L10 17L19 8"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span>Evaluación inicial</span>
              </li>
            </ul>
            <button className="w-full font-oswald text-lg uppercase bg-transparent border-2 border-primary hover:bg-primary/10 transition-all duration-300 tracking-wider py-3 px-8 rounded-full">
              ELEGIR PLAN
            </button>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            whileHover={{ y: -10 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-2xl p-8 border-2 border-primary relative md:scale-105 shadow-xl shadow-primary/10 z-10"
          >
            <div className="absolute -top-5 left-0 right-0 mx-auto w-max">
              <div className="bg-primary text-white font-oswald text-center py-1 px-4 rounded-full text-sm shadow-lg shadow-primary/30">
                MÁS POPULAR
              </div>
            </div>
            <div className="text-center mb-4 mt-2">
              <span className="font-oswald inline-block px-4 py-1 rounded-full bg-primary/20 text-primary text-sm">
                PREMIUM
              </span>
            </div>
            <div className="text-center mb-6">
              <div className="font-bebas text-6xl text-primary mb-2 flex justify-center items-start">
                <span className="text-2xl mr-1 mt-2">$</span>149
                <span className="text-lg text-accent-medium self-end mb-2">
                  /mes
                </span>
              </div>
              <p className="font-montserrat text-accent-medium text-sm">
                Perfecto para quienes buscan un entrenamiento regular y
                completo.
              </p>
            </div>
            <ul className="font-montserrat text-accent-light space-y-4 mb-8 text-sm">
              <li className="flex items-start">
                <span className="text-primary mr-2 mt-0.5 flex-shrink-0">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 12L10 17L19 8"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span>Clases ilimitadas</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2 mt-0.5 flex-shrink-0">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 12L10 17L19 8"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span>Acceso total a instalaciones</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2 mt-0.5 flex-shrink-0">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 12L10 17L19 8"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span>1 sesión privada mensual</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2 mt-0.5 flex-shrink-0">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 12L10 17L19 8"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span>Plan de nutrición básico</span>
              </li>
            </ul>
            <button className="w-full font-oswald text-lg uppercase bg-primary hover:bg-primary-dark transition-all duration-300 tracking-wider py-3 px-8 rounded-full text-white shadow-lg shadow-primary/30">
              ELEGIR PLAN
            </button>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            whileHover={{ y: -10 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-2xl p-8 border border-accent-dark/50 hover:border-primary/50 transition-all duration-300 shadow-lg shadow-black/20"
          >
            <div className="text-center mb-4">
              <span className="font-oswald inline-block px-4 py-1 rounded-full bg-accent-dark/80 text-accent-light text-sm">
                ELITE
              </span>
            </div>
            <div className="text-center mb-6">
              <div className="font-bebas text-6xl text-primary mb-2 flex justify-center items-start">
                <span className="text-2xl mr-1 mt-2">$</span>249
                <span className="text-lg text-accent-medium self-end mb-2">
                  /mes
                </span>
              </div>
              <p className="font-montserrat text-accent-medium text-sm">
                Para boxeadores serios que buscan entrenamiento de élite y
                atención personalizada.
              </p>
            </div>
            <ul className="font-montserrat text-accent-light space-y-4 mb-8 text-sm">
              <li className="flex items-start">
                <span className="text-primary mr-2 mt-0.5 flex-shrink-0">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 12L10 17L19 8"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span>Clases ilimitadas</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2 mt-0.5 flex-shrink-0">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 12L10 17L19 8"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span>4 sesiones privadas mensuales</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2 mt-0.5 flex-shrink-0">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 12L10 17L19 8"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span>Plan nutricional personalizado</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2 mt-0.5 flex-shrink-0">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 12L10 17L19 8"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span>Acceso prioritario a eventos</span>
              </li>
            </ul>
            <button className="w-full font-oswald text-lg uppercase bg-transparent border-2 border-primary hover:bg-primary/10 transition-all duration-300 tracking-wider py-3 px-8 rounded-full">
              ELEGIR PLAN
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center mt-12 border-t border-accent-dark/50 pt-8"
        >
          <p className="font-montserrat text-accent-medium mb-2 text-sm">
            ¿Tienes dudas sobre nuestros planes?
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-2 font-oswald text-primary hover:underline"
          >
            <span>CONSULTA NUESTRAS PREGUNTAS FRECUENTES</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 12H19M19 12L12 5M19 12L12 19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingComponent;
