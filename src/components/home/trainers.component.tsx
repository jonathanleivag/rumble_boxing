"use client";

import { motion } from "framer-motion";
import { FC } from "react";
import Image from "next/image";

const TrainersComponent: FC = () => {
  return (
    <section
      id="trainers"
      className="py-24 px-4 sm:px-6 lg:px-8 overflow-hidden relative"
    >
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-primary/5 blur-[100px] rounded-full"></div>

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] bg-accent-medium relative overflow-hidden rounded-3xl z-10">
              <Image
                src="/alejandro.webp"
                alt="Alejandro Lupcke - Entrenador Federado de Boxeo Profesional"
                fill
                priority
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>

              <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                <h3 className="font-bebas text-4xl text-white mb-1 tracking-wider">
                  ALEJANDRO <span className="text-primary">Lupcke</span>
                </h3>
                <p className="font-oswald text-white/90 text-sm inline-block border-b border-primary pb-1">
                  Entrenador Federado de Boxeo Profesional
                </p>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 w-24 h-24 border-2 border-primary rounded-full z-0 opacity-50"></div>
            <div className="absolute -top-6 -right-6 w-32 h-32 border border-primary/30 rounded-full z-0"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="inline-block px-6 py-2 bg-primary/10 rounded-full mb-4">
              <span className="font-oswald text-primary text-sm tracking-widest">
                NUESTRO EQUIPO
              </span>
            </div>

            <h2 className="font-bebas text-5xl md:text-6xl text-white mb-6 leading-tight">
              ENTRENADOR <span className="text-primary">PROFESIONAL</span>
            </h2>

            <p className="font-montserrat text-accent-medium text-base leading-relaxed mb-8 max-w-xl">
              Especialista en técnica avanzada con más de 15 años de experiencia
              competitiva. Carlos ha entrenado a boxeadores profesionales y
              ahora dedica su experiencia a transformar la condición física de
              nuestros miembros.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="col-span-2 relative overflow-hidden bg-gradient-to-r from-primary/20 to-black/40 p-6 rounded-2xl backdrop-blur-sm border border-primary/20 mb-2">
                <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-primary/10 blur-xl"></div>
                <div className="flex items-center gap-4">
                  <div className="bg-primary/20 p-3 rounded-full">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-primary"
                    >
                      <path
                        d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                        fill="currentColor"
                      />
                      <path
                        d="M20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12Z"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-primary font-oswald text-lg tracking-wide">
                      &ldquo;¡RITMO DE COMBATE!&rdquo;
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden bg-gradient-to-br from-accent-dark/40 to-black/40 p-6 rounded-2xl backdrop-blur-sm border border-accent-dark/10">
                <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-primary/10 blur-xl"></div>
                <div className="text-primary font-bebas text-4xl mb-1">15+</div>
                <div className="text-white/70 font-oswald text-sm tracking-wide">
                  AÑOS DE EXPERIENCIA
                </div>
              </div>
              <div className="relative overflow-hidden bg-gradient-to-br from-accent-dark/40 to-black/40 p-6 rounded-2xl backdrop-blur-sm border border-accent-dark/10">
                <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-primary/10 blur-xl"></div>
                <div className="text-primary font-bebas text-4xl mb-1">60+</div>
                <div className="text-white/70 font-oswald text-sm tracking-wide">
                  ALUMNOS ENTRENADOS
                </div>
              </div>
              <div className="relative overflow-hidden bg-gradient-to-br from-accent-dark/40 to-black/40 p-6 rounded-2xl backdrop-blur-sm border border-accent-dark/10">
                <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-primary/10 blur-xl"></div>
                <div className="text-primary font-bebas text-4xl mb-1">12</div>
                <div className="text-white/70 font-oswald text-sm tracking-wide">
                  CERTIFICACIONES
                </div>
              </div>
              <div className="relative overflow-hidden bg-gradient-to-br from-accent-dark/40 to-black/40 p-6 rounded-2xl backdrop-blur-sm border border-accent-dark/10">
                <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-primary/10 blur-xl"></div>
                <div className="text-primary font-bebas text-4xl mb-1">3</div>
                <div className="text-white/70 font-oswald text-sm tracking-wide">
                  TÍTULOS NACIONALES
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-primary/10 to-transparent border-l-4 border-primary p-6 rounded-r-2xl">
              <p className="text-white/80 font-montserrat italic text-sm leading-relaxed">
                &ldquo;El boxeo no solo es sobre golpear, es sobre disciplina,
                resistencia y superación personal. Mi objetivo es que cada
                persona que entrene conmigo descubra su verdadero
                potencial.&rdquo;
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TrainersComponent;
