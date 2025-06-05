"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FC } from "react";
import Image from "next/image";
import { ModalEditUserComponentProps } from "@/type";

const ModalEditUserComponent: FC<ModalEditUserComponentProps> = ({
  setShowModal,
  usuarioEditado,
  showModal,
  setUsuarioEditado,
  planes,
}) => {
  const handleSaveUser = () => {
    console.log("Guardando usuario:", usuarioEditado);
    setShowModal(false);
  };

  return (
    <AnimatePresence>
      {showModal && usuarioEditado && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-xl border border-accent-dark/30 shadow-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bebas text-white text-2xl flex items-center">
                <span className="text-primary mr-2">•</span>
                DETALLES DE USUARIO
              </h3>
              <button
                className="text-accent-medium hover:text-white transition-colors cursor-pointer"
                onClick={() => setShowModal(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="space-y-5">
              <div className="flex justify-center mb-8">
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-primary-dark rounded-full opacity-70 blur-sm group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Image
                    src={
                      usuarioEditado.avatar ||
                      "https://res.cloudinary.com/dq8fpb695/image/upload/v1748900421/rumble/yfwwjdnhstzsmx2nuazq.webp"
                    }
                    alt={usuarioEditado.name}
                    width={100}
                    height={100}
                    className="rounded-full border-2 border-primary object-cover relative z-10"
                  />
                  <button className="absolute bottom-0 right-0 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white p-1.5 rounded-full z-20 transition-colors duration-300 shadow-lg hover:shadow-xl">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4"
                    >
                      <path d="M21 14h-6.35a1 1 0 0 0-.713.293l-.354.353a1 1 0 0 1-1.412 0l-.354-.353a1 1 0 0 0-.713-.293H5a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1z" />
                      <path d="M10.39 13.39l4.2-4.2a1 1 0 0 1 1.4 0l.6.6a1 1 0 0 1 0 1.4l-4.2 4.2a1 1 0 0 1-.7.3H9a1 1 0 0 1-1-1v-2.69a1 1 0 0 1 .29-.71z" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gradient-to-br from-accent-dark/30 to-accent-dark/10 p-5 rounded-lg border border-accent-dark/30 shadow-inner">
                <div>
                  <label className="block text-accent-medium font-montserrat text-xs mb-1">
                    Nombre
                  </label>
                  <input
                    type="text"
                    value={usuarioEditado.name}
                    onChange={(e) =>
                      setUsuarioEditado({
                        ...usuarioEditado,
                        name: e.target.value,
                      })
                    }
                    className="w-full bg-accent-dark/40 rounded-lg border border-accent-dark/40 text-white p-2 font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                <div>
                  <label className="block text-accent-medium font-montserrat text-xs mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={usuarioEditado.email}
                    onChange={(e) =>
                      setUsuarioEditado({
                        ...usuarioEditado,
                        email: e.target.value,
                      })
                    }
                    className="w-full bg-accent-dark/40 rounded-lg border border-accent-dark/40 text-white p-2 font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                <div>
                  <label className="block text-accent-medium font-montserrat text-xs mb-1">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    value={usuarioEditado.phone}
                    onChange={(e) =>
                      setUsuarioEditado({
                        ...usuarioEditado,
                        phone: e.target.value,
                      })
                    }
                    className="w-full bg-accent-dark/40 rounded-lg border border-accent-dark/40 text-white p-2 font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                <div>
                  <label className="block text-accent-medium font-montserrat text-xs mb-1">
                    RUT
                  </label>
                  <input
                    type="text"
                    value={usuarioEditado.rut}
                    onChange={(e) =>
                      setUsuarioEditado({
                        ...usuarioEditado,
                        rut: e.target.value,
                      })
                    }
                    className="w-full bg-accent-dark/40 rounded-lg border border-accent-dark/40 text-white p-2 font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                <div>
                  <label className="block text-accent-medium font-montserrat text-xs mb-1">
                    Estado
                  </label>
                  <select
                    value={usuarioEditado.status}
                    onChange={(e) =>
                      setUsuarioEditado({
                        ...usuarioEditado,
                        status: e.target.value as
                          | "activo"
                          | "inactivo"
                          | "suspendido",
                      })
                    }
                    className="w-full bg-accent-dark/40 rounded-lg border border-accent-dark/40 text-white p-2 font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="activo">Activo</option>
                    <option value="inactivo">Inactivo</option>
                    <option value="suspendido">Suspendido</option>
                  </select>
                </div>

                <div>
                  <label className="block text-accent-medium font-montserrat text-xs mb-1">
                    Plan
                  </label>
                  <select
                    value={usuarioEditado.plan.id}
                    onChange={(e) => {
                      const selectedPlan = planes.find(
                        (p) => p.id === e.target.value
                      );
                      if (selectedPlan) {
                        setUsuarioEditado({
                          ...usuarioEditado,
                          plan: selectedPlan,
                        });
                      }
                    }}
                    className="w-full bg-accent-dark/40 rounded-lg border border-accent-dark/40 text-white p-2 font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    {planes.map((plan) => (
                      <option key={plan.id} value={plan.id}>
                        {plan.name} - {plan.class} clases
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-accent-medium font-montserrat text-xs mb-1">
                    Asistencias
                  </label>
                  <input
                    type="number"
                    value={usuarioEditado.assistance}
                    onChange={(e) =>
                      setUsuarioEditado({
                        ...usuarioEditado,
                        assistance: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full bg-accent-dark/40 rounded-lg border border-accent-dark/40 text-white p-2 font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                <div>
                  <label className="block text-accent-medium font-montserrat text-xs mb-1">
                    Fecha de Creación
                  </label>
                  <div className="w-full bg-accent-dark/40 rounded-lg border border-accent-dark/40 text-white p-2 font-montserrat text-sm">
                    {new Date(usuarioEditado.createdAt).toLocaleDateString(
                      "es-ES",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-accent-dark/30">
                <h4 className="font-oswald text-white text-lg mb-4 flex items-center">
                  <div className="w-1.5 h-6 bg-gradient-to-b from-primary to-primary-dark rounded-sm mr-2"></div>
                  Historial de Actividad
                </h4>
                <div className="bg-gradient-to-br from-accent-dark/40 to-accent-dark/20 rounded-lg p-4 max-h-48 overflow-y-auto shadow-inner border border-accent-dark/40">
                  <div className="space-y-3">
                    <div className="flex items-center text-accent-medium font-montserrat text-xs hover:bg-accent-dark/30 p-2 rounded transition-colors">
                      <span className="w-2 h-2 bg-gradient-to-r from-primary to-primary-dark rounded-full mr-2"></span>
                      <span className="font-semibold mr-2 text-white/80">
                        {new Date().toLocaleDateString("es-ES")}
                      </span>
                      <span>Usuario registrado en el sistema</span>
                    </div>
                    <div className="flex items-center text-accent-medium font-montserrat text-xs hover:bg-accent-dark/30 p-2 rounded transition-colors">
                      <span className="w-2 h-2 bg-gradient-to-r from-primary to-primary-dark rounded-full mr-2"></span>
                      <span className="font-semibold mr-2 text-white/80">
                        {new Date().toLocaleDateString("es-ES")}
                      </span>
                      <span>Plan {usuarioEditado.plan.name} asignado</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-accent-dark/30">
                <h4 className="font-oswald text-white text-lg mb-4 flex items-center">
                  <div className="w-1.5 h-6 bg-primary rounded-sm mr-2"></div>
                  Detalles del Plan
                </h4>
                <div className="bg-gradient-to-br from-accent-dark/40 to-accent-dark/20 rounded-lg p-5 shadow-lg border border-accent-dark/40">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-white font-oswald text-lg">
                      {usuarioEditado.plan.name}
                    </span>
                    <span className="bg-gradient-to-r from-primary to-primary-dark text-white text-xs px-3 py-1 rounded-full font-oswald shadow-sm">
                      {usuarioEditado.plan.type.toUpperCase()}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="bg-accent-dark/30 p-3 rounded-lg text-center">
                      <div className="text-accent-medium font-montserrat text-xs mb-1">
                        Total
                      </div>
                      <div className="text-white font-oswald text-lg">
                        {usuarioEditado.plan.class}
                      </div>
                    </div>
                    <div className="bg-accent-dark/30 p-3 rounded-lg text-center">
                      <div className="text-accent-medium font-montserrat text-xs mb-1">
                        Usadas
                      </div>
                      <div className="text-white font-oswald text-lg">
                        {usuarioEditado.assistance}
                      </div>
                    </div>
                    <div className="bg-accent-dark/30 p-3 rounded-lg text-center">
                      <div className="text-accent-medium font-montserrat text-xs mb-1">
                        Restantes
                      </div>
                      <div className="text-white font-oswald text-lg">
                        {usuarioEditado.plan.class === "ilimitado"
                          ? "∞"
                          : Math.max(
                              0,
                              Number(usuarioEditado.plan.class) -
                                usuarioEditado.assistance
                            )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="relative w-full h-3 bg-accent-dark/60 rounded-full overflow-hidden">
                      <div
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-primary-dark"
                        style={{
                          width:
                            usuarioEditado.plan.class === "ilimitado"
                              ? "100%"
                              : `${Math.min(
                                  100,
                                  (usuarioEditado.assistance /
                                    Number(usuarioEditado.plan.class)) *
                                    100
                                )}%`,
                        }}
                      ></div>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <div className="text-xs text-accent-medium">0%</div>
                      <div className="text-xs font-semibold text-primary">
                        {usuarioEditado.plan.class === "ilimitado"
                          ? "∞"
                          : Math.min(
                              100,
                              Math.round(
                                (usuarioEditado.assistance /
                                  Number(usuarioEditado.plan.class)) *
                                  100
                              )
                            )}
                        % utilizado
                      </div>
                      <div className="text-xs text-accent-medium">100%</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-accent-dark/40 pt-6 mt-8 flex justify-end space-x-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="cursor-pointer bg-accent-dark/60 hover:bg-accent-dark text-white py-2.5 px-6 rounded-md text-sm font-oswald uppercase tracking-wider transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  Cerrar
                </button>
                <button
                  onClick={handleSaveUser}
                  className="cursor-pointer bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white py-2.5 px-6 rounded-md text-sm font-oswald uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Guardar Cambios
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ModalEditUserComponent;
