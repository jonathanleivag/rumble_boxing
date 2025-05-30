"use client";

import { motion } from "framer-motion";
import { FC } from "react";

const QuestionsComponent: FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.5, duration: 0.6 }}
      className="text-center mt-12 border-t border-accent-dark/50 pt-8 my-20"
    >
      <div className="max-w-4xl mx-auto mt-8">
        <h3 className="font-bebas text-3xl text-white mb-6 relative inline-block">
          PREGUNTAS FRECUENTES
          <span className="absolute -bottom-2 left-0 right-0 mx-auto w-20 h-1 bg-primary"></span>
        </h3>

        <div className="grid gap-4 mt-8">
          {/* Pregunta 1 */}
          <div className="bg-gradient-to-r from-[#1a1a1a] to-[#121212] border border-accent-dark/30 rounded-lg overflow-hidden">
            <details className="group">
              <summary className="flex items-center justify-between p-4 cursor-pointer">
                <h4 className="font-oswald text-white text-lg">
                  ¿Necesito experiencia previa en boxeo?
                </h4>
                <span className="text-primary transition-transform duration-300 group-open:rotate-180">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19 9l-7 7-7-7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </summary>
              <div className="px-4 pb-4 font-montserrat text-accent-light text-sm">
                <p>
                  No, nuestras clases están diseñadas para todos los niveles.
                  Contamos con instructores capacitados que te guiarán desde lo
                  más básico hasta técnicas avanzadas según tu progreso.
                  Recuerda que tu primera clase es completamente GRATIS.
                </p>
              </div>
            </details>
          </div>

          {/* Pregunta 2 */}
          <div className="bg-gradient-to-r from-[#1a1a1a] to-[#121212] border border-accent-dark/30 rounded-lg overflow-hidden">
            <details className="group">
              <summary className="flex items-center justify-between p-4 cursor-pointer">
                <h4 className="font-oswald text-white text-lg">
                  ¿Qué incluye la matrícula?
                </h4>
                <span className="text-primary transition-transform duration-300 group-open:rotate-180">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19 9l-7 7-7-7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </summary>
              <div className="px-4 pb-4 font-montserrat text-accent-light text-sm">
                <p>
                  La matrícula de $50 es un pago único que cubre los gastos
                  administrativos de inscripción, tu credencial de miembro,
                  evaluación inicial y acceso a nuestra aplicación móvil para
                  reservar clases y seguir tu progreso.
                </p>
              </div>
            </details>
          </div>

          {/* Pregunta 3 */}
          <div className="bg-gradient-to-r from-[#1a1a1a] to-[#121212] border border-accent-dark/30 rounded-lg overflow-hidden">
            <details className="group">
              <summary className="flex items-center justify-between p-4 cursor-pointer">
                <h4 className="font-oswald text-white text-lg">
                  ¿Puedo cambiar de plan en cualquier momento?
                </h4>
                <span className="text-primary transition-transform duration-300 group-open:rotate-180">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19 9l-7 7-7-7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </summary>
              <div className="px-4 pb-4 font-montserrat text-accent-light text-sm">
                <p>
                  Sí, puedes actualizar tu plan en cualquier momento. Si deseas
                  cambiar de un plan mensual a anual, aplicaremos un descuento
                  proporcional. Para cambios a planes personalizados, agenda una
                  consulta con nuestro equipo.
                </p>
              </div>
            </details>
          </div>

          {/* Pregunta 4 */}
          <div className="bg-gradient-to-r from-[#1a1a1a] to-[#121212] border border-accent-dark/30 rounded-lg overflow-hidden">
            <details className="group">
              <summary className="flex items-center justify-between p-4 cursor-pointer">
                <h4 className="font-oswald text-white text-lg">
                  ¿Qué equipo necesito para las clases?
                </h4>
                <span className="text-primary transition-transform duration-300 group-open:rotate-180">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19 9l-7 7-7-7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </summary>
              <div className="px-4 pb-4 font-montserrat text-accent-light text-sm">
                <p>
                  Para comenzar solo necesitas ropa cómoda y calzado deportivo.
                  Contamos con guantes y vendas para préstamo en tus primeras
                  clases. Posteriormente, recomendamos adquirir tus propios
                  guantes y vendas, disponibles en nuestra tienda con descuento
                  para miembros.
                </p>
              </div>
            </details>
          </div>

          {/* Pregunta 5 */}
          <div className="bg-gradient-to-r from-[#1a1a1a] to-[#121212] border border-accent-dark/30 rounded-lg overflow-hidden">
            <details className="group">
              <summary className="flex items-center justify-between p-4 cursor-pointer">
                <h4 className="font-oswald text-white text-lg">
                  ¿Cómo puedo reservar mi primera clase gratis?
                </h4>
                <span className="text-primary transition-transform duration-300 group-open:rotate-180">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19 9l-7 7-7-7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </summary>
              <div className="px-4 pb-4 font-montserrat text-accent-light text-sm">
                <p>
                  Puedes reservar tu clase gratuita llamando a nuestro número, a
                  través de la página de contacto o directamente en recepción.
                  Te recomendamos llegar 15 minutos antes para completar un
                  breve formulario y conocer nuestras instalaciones.
                </p>
              </div>
            </details>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default QuestionsComponent;
