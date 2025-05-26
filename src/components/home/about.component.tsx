"use client";

import { fadeInUp, staggerContainer } from "@/utils/motionEffect.util";
import { motion, AnimatePresence } from "framer-motion";
import { FC, useState, useRef } from "react";
import Image from "next/image";

const AboutComponent: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
    // Restaurar scroll
    document.body.style.overflow = "auto";
  };

  return (
    <section
      id="about"
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
        className="grid md:grid-cols-2 gap-16 items-center"
      >
        <motion.div variants={fadeInUp}>
          <div className="inline-block px-6 py-2 bg-primary/10 rounded-full mb-4">
            <span className="font-oswald text-primary text-sm tracking-wider">
              SOBRE NOSOTROS
            </span>
          </div>
          <h2 className="font-bebas text-[#e02020] text-5xl md:text-6xl mb-6">
            BIENVENIDO AL RING
          </h2>
          <p className="font-montserrat text-lg mb-6 text-accent-light">
            En{" "}
            <span className="text-punch relative after:content-[''] after:absolute after:w-full after:h-1 after:bg-primary/30 after:bottom-0 after:left-0">
              RUMBLE BOXING
            </span>{" "}
            ofrecemos entrenamiento de alta intensidad para todos los niveles,
            desde principiantes hasta boxeadores experimentados.
          </p>
          <p className="font-montserrat text-accent-medium mb-8 leading-relaxed">
            Nuestro enfoque único combina técnicas auténticas de boxeo con
            entrenamiento cardiovascular y de fuerza, creando una experiencia de
            fitness completa que transforma cuerpo y mente.
          </p>
          <div className="flex gap-6 mb-8">
            <div className="bg-gradient-to-br from-accent-dark to-accent-dark/50 p-6 rounded-2xl flex-1 backdrop-blur-sm border border-accent-dark/50 hover:border-primary/30 transition-all duration-300 transform hover:-translate-y-1">
              <h4 className="font-oswald text-2xl mb-2 text-primary">
                +10 AÑOS
              </h4>
              <p className="font-montserrat text-accent-medium">
                De experiencia
              </p>
            </div>
            <div className="bg-gradient-to-br from-accent-dark to-accent-dark/50 p-6 rounded-2xl flex-1 backdrop-blur-sm border border-accent-dark/50 hover:border-primary/30 transition-all duration-300 transform hover:-translate-y-1">
              <h4 className="font-oswald text-2xl mb-2 text-primary">+500</h4>
              <p className="font-montserrat text-accent-medium">
                Miembros activos
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              <div className="w-12 h-12 rounded-full border-2 border-primary bg-accent-dark overflow-hidden flex items-center justify-center">
                <span className="font-bebas text-xs">U1</span>
              </div>
              <div className="w-12 h-12 rounded-full border-2 border-primary bg-accent-dark overflow-hidden flex items-center justify-center">
                <span className="font-bebas text-xs">U2</span>
              </div>
              <div className="w-12 h-12 rounded-full border-2 border-primary bg-accent-dark overflow-hidden flex items-center justify-center">
                <span className="font-bebas text-xs">U3</span>
              </div>
              <div className="w-12 h-12 rounded-full border-2 border-primary bg-accent-dark overflow-hidden flex items-center justify-center">
                <span className="font-bebas text-xs">+</span>
              </div>
            </div>
            <p className="font-montserrat text-sm text-accent-medium">
              Únete a <span className="text-white">+500 miembros</span> que ya
              están transformando sus vidas
            </p>
          </div>
        </motion.div>
        <motion.div
          variants={fadeInUp}
          className="relative h-[500px] md:h-[600px] rounded-2xl overflow-hidden group shadow-xl shadow-primary/10"
        >
          <div className="absolute inset-0 bg-accent-dark overflow-hidden">
            <Image
              src="/alejandro.webp"
              alt="Boxeador entrenando en Rumble Boxing"
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-in-out"
              priority
            />
            <div className="absolute -bottom-2 -right-2 w-32 h-32 border-4 border-primary opacity-40 rounded-tr-3xl"></div>
            <div className="absolute -top-2 -left-2 w-32 h-32 border-4 border-primary opacity-40 rounded-bl-3xl"></div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f]/50 to-transparent opacity-70"></div>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center cursor-pointer hover:bg-primary transition-colors duration-300 shadow-lg shadow-primary/30"
              onClick={openModal}
            >
              <div className="w-0 h-0 border-t-8 border-t-transparent border-l-16 border-l-white border-b-8 border-b-transparent ml-1"></div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50"
              onClick={closeModal}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-4 md:inset-16 bg-[#0f0f0f] rounded-2xl overflow-hidden z-50 flex flex-col shadow-2xl border border-primary/20"
            >
              <div className="p-4 flex justify-between items-center bg-gradient-to-r from-accent-dark to-[#0f0f0f] border-b border-accent-dark/30">
                <h3 className="font-bebas text-xl text-white tracking-wider pl-2">
                  RUMBLE BOXING <span className="text-primary">EXPERIENCE</span>
                </h3>
                <button
                  onClick={closeModal}
                  className="w-10 h-10 rounded-full bg-accent-dark hover:bg-primary flex items-center justify-center transition-colors duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="flex-1 p-4 relative flex items-center justify-center bg-black/20">
                <video
                  ref={videoRef}
                  className="max-w-full max-h-full rounded-lg"
                  controls
                  controlsList="nodownload"
                  autoPlay
                  preload="auto"
                  playsInline
                  style={{
                    maxHeight: "calc(100vh - 180px)",
                    width: "auto",
                    height: "auto",
                  }}
                >
                  <source
                    src="https://res.cloudinary.com/dq8fpb695/video/upload/v1748260489/rumble/hcy5v5c2deevkaaogdi8.mp4"
                    type="video/mp4"
                  />
                  Tu navegador no soporta videos HTML5.
                </video>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default AboutComponent;
