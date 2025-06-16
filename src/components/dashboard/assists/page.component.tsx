"use client";

import { FC, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import StatisticsComponent from "./statistics.component";
import FilterAssistComponent from "./filterAssist.component";
import TableAssistComponent from "./tableAssist.component";

// Interfaces para la gestión de asistencias
interface Clase {
  id: string;
  nombre: string;
  instructor: string;
  hora: string;
  fecha: string;
  duracion: string;
  capacidad: number;
  asistentes: number;
  nivel: "principiante" | "intermedio" | "avanzado";
  categoria: "boxing" | "hiit" | "tecnica" | "cardio";
}

interface Asistencia {
  id: string;
  claseId: string;
  usuarioId: string;
  fecha: string;
  usuario: {
    nombre: string;
    avatar: string;
    plan: {
      nombre: string;
      color: string;
    };
  };
  estado: "pendiente" | "asistio" | "no-asistio";
}

const PageAssistsComponent: FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedAsistencia, setSelectedAsistencia] =
    useState<Asistencia | null>(null);
  const [asistenciaEditada, setAsistenciaEditada] = useState<Asistencia | null>(
    null
  );

  // Datos simulados de clases
  const clases: Clase[] = [
    {
      id: "c1",
      nombre: "Boxing Fundamentals",
      instructor: "Alex Rodríguez",
      hora: "10:00",
      fecha: "31/05/2025",
      duracion: "60 min",
      capacidad: 20,
      asistentes: 15,
      nivel: "principiante",
      categoria: "boxing",
    },
    {
      id: "c2",
      nombre: "HIIT Boxing",
      instructor: "María Gómez",
      hora: "18:00",
      fecha: "31/05/2025",
      duracion: "45 min",
      capacidad: 15,
      asistentes: 12,
      nivel: "intermedio",
      categoria: "hiit",
    },
    {
      id: "c3",
      nombre: "Advanced Techniques",
      instructor: "Carlos Menéndez",
      hora: "19:00",
      fecha: "31/05/2025",
      duracion: "75 min",
      capacidad: 10,
      asistentes: 8,
      nivel: "avanzado",
      categoria: "tecnica",
    },
    {
      id: "c4",
      nombre: "Cardio Boxing",
      instructor: "Laura Sánchez",
      hora: "12:00",
      fecha: "01/06/2025",
      duracion: "60 min",
      capacidad: 20,
      asistentes: 10,
      nivel: "intermedio",
      categoria: "cardio",
    },
  ];

  // Datos simulados de asistencias
  const [asistencias, setAsistencias] = useState<Asistencia[]>([
    {
      id: "a1",
      claseId: "c1",
      usuarioId: "u1",
      fecha: "31/05/2025",
      usuario: {
        nombre: "Carlos Méndez",
        avatar: "/default-avatar.png",
        plan: {
          nombre: "Elite",
          color: "bg-primary",
        },
      },
      estado: "asistio",
    },
    {
      id: "a2",
      claseId: "c1",
      usuarioId: "u2",
      fecha: "31/05/2025",
      usuario: {
        nombre: "Laura Jiménez",
        avatar: "/default-avatar.png",
        plan: {
          nombre: "Premium",
          color: "bg-purple-500",
        },
      },
      estado: "pendiente",
    },
    {
      id: "a3",
      claseId: "c2",
      usuarioId: "u3",
      fecha: "31/05/2025",
      usuario: {
        nombre: "Ricardo Torres",
        avatar: "/default-avatar.png",
        plan: {
          nombre: "Básico",
          color: "bg-blue-500",
        },
      },
      estado: "no-asistio",
    },
    {
      id: "a4",
      claseId: "c3",
      usuarioId: "u4",
      fecha: "31/05/2025",
      usuario: {
        nombre: "Ana García",
        avatar: "/default-avatar.png",
        plan: {
          nombre: "Anual",
          color: "bg-secondary",
        },
      },
      estado: "asistio",
    },
    {
      id: "a5",
      claseId: "c4",
      usuarioId: "u1",
      fecha: "01/06/2025",
      usuario: {
        nombre: "Carlos Méndez",
        avatar: "/default-avatar.png",
        plan: {
          nombre: "Elite",
          color: "bg-primary",
        },
      },
      estado: "pendiente",
    },
  ]);

  // Obtener una clase por su ID
  const getClaseById = (id: string): Clase | undefined => {
    return clases.find((clase) => clase.id === id);
  };

  // Guardar cambios de asistencia
  const handleSaveAsistencia = () => {
    if (!asistenciaEditada) return;

    setAsistencias(
      asistencias.map((asistencia) =>
        asistencia.id === asistenciaEditada.id ? asistenciaEditada : asistencia
      )
    );

    setShowModal(false);
    setSelectedAsistencia(null);
    setAsistenciaEditada(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
        <h1 className="font-bebas text-white text-xl sm:text-knockout sm:text-4xl mb-1 sm:mb-0 tracking-wider">
          CONTROL DE ASISTENCIAS
        </h1>
      </div>
      <StatisticsComponent />
      <FilterAssistComponent />

      {/* Tabla de asistencias */}
      <div className="bg-gradient-to-br from-accent-dark/80 to-[#1a1a1a] rounded-xl border border-accent-dark/30 shadow-xl backdrop-blur-sm overflow-hidden">
        <div className="overflow-x-auto">
          <TableAssistComponent />
        </div>
      </div>

      {/* Modal para editar asistencia */}
      <AnimatePresence>
        {showModal && asistenciaEditada && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-xl border border-accent-dark/30 shadow-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bebas text-white text-2xl">
                  EDITAR ASISTENCIA
                </h3>
                <button
                  className="text-accent-medium hover:text-white transition-colors"
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

              <div className="space-y-4">
                <div className="flex items-center mb-4">
                  <Image
                    src={asistenciaEditada.usuario.avatar}
                    alt={asistenciaEditada.usuario.nombre}
                    width={48}
                    height={48}
                    className="rounded-full mr-3"
                  />
                  <div>
                    <div className="font-oswald text-white text-lg">
                      {asistenciaEditada.usuario.nombre}
                    </div>
                    <div className="flex items-center">
                      <span
                        className={`w-2 h-2 rounded-full ${asistenciaEditada.usuario.plan.color} mr-1`}
                      ></span>
                      <span className="text-accent-medium font-montserrat text-xs">
                        {asistenciaEditada.usuario.plan.nombre}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-accent-medium font-montserrat text-xs mb-1">
                    Clase
                  </label>
                  <select
                    value={asistenciaEditada.claseId}
                    onChange={(e) =>
                      setAsistenciaEditada({
                        ...asistenciaEditada,
                        claseId: e.target.value,
                        fecha:
                          getClaseById(e.target.value)?.fecha ||
                          asistenciaEditada.fecha,
                      })
                    }
                    className="w-full bg-accent-dark/40 rounded-lg border border-accent-dark/40 text-white p-2 font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    {clases.map((clase) => (
                      <option key={clase.id} value={clase.id}>
                        {clase.nombre} - {clase.fecha} {clase.hora}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-accent-medium font-montserrat text-xs mb-1">
                    Estado
                  </label>
                  <select
                    value={asistenciaEditada.estado}
                    onChange={(e) =>
                      setAsistenciaEditada({
                        ...asistenciaEditada,
                        estado: e.target.value as
                          | "pendiente"
                          | "asistio"
                          | "no-asistio",
                      })
                    }
                    className="w-full bg-accent-dark/40 rounded-lg border border-accent-dark/40 text-white p-2 font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="pendiente">Pendiente</option>
                    <option value="asistio">Asistió</option>
                    <option value="no-asistio">No asistió</option>
                  </select>
                </div>

                <div className="border-t border-accent-dark/40 pt-4 mt-6 flex justify-end space-x-3">
                  <button
                    onClick={() => setShowModal(false)}
                    className="bg-accent-dark/60 hover:bg-accent-dark text-white py-2 px-4 rounded-md text-sm font-oswald uppercase tracking-wider transition-all duration-300"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSaveAsistencia}
                    className="bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-md text-sm font-oswald uppercase tracking-wider transition-all duration-300"
                  >
                    Guardar Cambios
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PageAssistsComponent;
