"use client";

import { env } from "@/lib/env";
import { fadeInUp, staggerContainer } from "@/utils/motionEffect.util";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { FC, useState } from "react";
import VideoShareModal from "../shared/videoModal.shared.component";

const CallComponent: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/5 to-[#0f0f0f]/90">
        <div className="absolute inset-0 bg-[url('/boxing-pattern.svg')] opacity-5 mix-blend-overlay"></div>
      </div>

      <div className="absolute right-0 bottom-0 w-1/3 h-2/3 opacity-10">
        <div className="w-full h-full bg-[url('/boxing-gloves.svg')] bg-no-repeat bg-contain bg-right-bottom"></div>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
        className="max-w-7xl mx-auto relative z-10"
      >
        <div className="text-center">
          <motion.div variants={fadeInUp} className="mb-6 inline-block">
            <span className="inline-block px-6 py-2 rounded-full border-2 border-primary text-primary font-oswald text-sm tracking-widest">
              EMPIEZA HOY
            </span>
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="font-bebas text-5xl md:text-7xl text-white mb-8 leading-tight"
          >
            ¿LISTO PARA{" "}
            <span className="text-primary relative inline-block">
              SUBIR AL RING
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-primary/30"></span>
            </span>
            ?
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="font-montserrat text-accent-light text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Prueba una clase gratuita y experimenta la energía, la intensidad y
            la comunidad que hacen de RUMBLE BOXING un lugar único para
            transformar tu cuerpo y mente.
          </motion.p>
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link
              href={`https://wa.me/${
                env.NEXT_PUBLIC_PHONE
              }?text=${encodeURIComponent(env.NEXT_PUBLIC_MESSAGE)}`}
              target="_blank"
              className="bg-primary hover:bg-primary-dark transition-all duration-300 font-oswald text-xl uppercase tracking-wider py-4 px-10 rounded-full text-white shadow-xl shadow-primary/20 hover:shadow-primary/40 transform hover:translate-y-[-2px]"
            >
              PROGRAMA TU CLASE GRATIS
            </Link>
            <button
              onClick={openModal}
              className="inline-flex items-center justify-center gap-2 font-oswald text-white hover:text-primary transition-colors"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M10 8L16 12L10 16V8Z" fill="currentColor" />
              </svg>
              <span>VER VIDEO INTRODUCTORIO</span>
            </button>
          </motion.div>
        </div>

        <AnimatePresence>
          {isModalOpen && <VideoShareModal setIsModalOpen={setIsModalOpen} />}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-20 max-w-4xl mx-auto bg-gradient-to-r from-accent-dark/80 to-[#0f0f0f]/80 p-8 rounded-2xl backdrop-blur-sm border border-accent-dark/30"
        >
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-full bg-accent-medium flex-shrink-0 overflow-hidden">
              {/* User avatar would go here */}
              <div className="w-full h-full flex items-center justify-center">
                <span className="font-bebas text-sm">FOTO</span>
              </div>
            </div>
            <div>
              <div className="flex mb-2">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 text-primary"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
              <p className="font-montserrat text-accent-light italic mb-2 text-sm">
                &ldquo;Desde que me uní a RUMBLE BOXING, mi condición física ha
                mejorado enormemente. Los entrenadores son excelentes y la
                comunidad es increíblemente motivadora. ¡Totalmente
                recomendado!&rdquo;
              </p>
              <div>
                <p className="font-oswald text-white">ALEJANDRA TORRES</p>
                <p className="font-montserrat text-accent-medium text-xs">
                  Miembro desde hace 8 meses
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-6 gap-1">
            <button className="w-8 h-2 bg-primary rounded-full"></button>
            <button className="w-2 h-2 bg-accent-medium/50 rounded-full"></button>
            <button className="w-2 h-2 bg-accent-medium/50 rounded-full"></button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CallComponent;
