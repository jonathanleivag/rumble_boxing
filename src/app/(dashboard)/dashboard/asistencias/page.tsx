"use client";
import { FC, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

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

const AsistenciasPage: FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterClase, setFilterClase] = useState("");
  const [filterFecha, setFilterFecha] = useState("");
  const [filterEstado, setFilterEstado] = useState("");
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

  // Filtrar asistencias
  const filteredAsistencias = asistencias.filter((asistencia) => {
    const matchesSearch =
      asistencia.usuario.nombre
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      getClaseById(asistencia.claseId)
        ?.nombre.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      false;

    const matchesClase = filterClase
      ? asistencia.claseId === filterClase
      : true;
    const matchesFecha = filterFecha ? asistencia.fecha === filterFecha : true;
    const matchesEstado = filterEstado
      ? asistencia.estado === filterEstado
      : true;

    return matchesSearch && matchesClase && matchesFecha && matchesEstado;
  });

  // Actualizar estado de asistencia
  const handleEstadoChange = (
    id: string,
    nuevoEstado: "pendiente" | "asistio" | "no-asistio"
  ) => {
    setAsistencias(
      asistencias.map((asistencia) =>
        asistencia.id === id
          ? { ...asistencia, estado: nuevoEstado }
          : asistencia
      )
    );
  };

  // Modal para editar asistencia
  const openAsistenciaModal = (asistencia: Asistencia) => {
    setSelectedAsistencia(asistencia);
    setAsistenciaEditada({ ...asistencia });
    setShowModal(true);
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

  // Obtener color según estado
  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "asistio":
        return "bg-green-500";
      case "pendiente":
        return "bg-yellow-500";
      case "no-asistio":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  // Obtener texto del estado
  const getEstadoText = (estado: string) => {
    switch (estado) {
      case "asistio":
        return "Asistió";
      case "pendiente":
        return "Pendiente";
      case "no-asistio":
        return "No asistió";
      default:
        return "Desconocido";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
        <h1 className="font-bebas text-white text-xl sm:text-knockout sm:text-4xl mb-1 sm:mb-0 tracking-wider">
          CONTROL DE ASISTENCIAS
        </h1>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-accent-dark/80 to-[#1a1a1a] rounded-xl border border-accent-dark/30 shadow-xl backdrop-blur-sm p-4 flex flex-col items-center">
          <div className="bg-primary/20 rounded-full p-3 mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6 text-primary"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
          <h3 className="font-oswald text-white text-lg">
            {asistencias.length}
          </h3>
          <p className="text-accent-medium font-montserrat text-sm">
            Total Reservas
          </p>
        </div>

        <div className="bg-gradient-to-br from-accent-dark/80 to-[#1a1a1a] rounded-xl border border-accent-dark/30 shadow-xl backdrop-blur-sm p-4 flex flex-col items-center">
          <div className="bg-green-500/20 rounded-full p-3 mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6 text-green-400"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <h3 className="font-oswald text-white text-lg">
            {asistencias.filter((a) => a.estado === "asistio").length}
          </h3>
          <p className="text-accent-medium font-montserrat text-sm">
            Asistencias
          </p>
        </div>

        <div className="bg-gradient-to-br from-accent-dark/80 to-[#1a1a1a] rounded-xl border border-accent-dark/30 shadow-xl backdrop-blur-sm p-4 flex flex-col items-center">
          <div className="bg-yellow-500/20 rounded-full p-3 mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6 text-yellow-400"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          </div>
          <h3 className="font-oswald text-white text-lg">
            {asistencias.filter((a) => a.estado === "pendiente").length}
          </h3>
          <p className="text-accent-medium font-montserrat text-sm">
            Pendientes
          </p>
        </div>

        <div className="bg-gradient-to-br from-accent-dark/80 to-[#1a1a1a] rounded-xl border border-accent-dark/30 shadow-xl backdrop-blur-sm p-4 flex flex-col items-center">
          <div className="bg-red-500/20 rounded-full p-3 mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6 text-red-400"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </div>
          <h3 className="font-oswald text-white text-lg">
            {asistencias.filter((a) => a.estado === "no-asistio").length}
          </h3>
          <p className="text-accent-medium font-montserrat text-sm">
            No Asistieron
          </p>
        </div>
      </div>

      {/* Filtros y búsqueda */}
      <div className="bg-gradient-to-br from-accent-dark/80 to-[#1a1a1a] rounded-xl border border-accent-dark/30 shadow-xl backdrop-blur-sm p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label
              htmlFor="search"
              className="block text-accent-medium font-montserrat text-xs mb-1"
            >
              Buscar
            </label>
            <div className="relative">
              <input
                id="search"
                type="text"
                placeholder="Nombre o clase"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-accent-dark/40 rounded-lg border border-accent-dark/40 text-white p-2 pl-10 font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 text-accent-medium absolute left-3 top-1/2 transform -translate-y-1/2"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
          </div>

          <div>
            <label
              htmlFor="filterClase"
              className="block text-accent-medium font-montserrat text-xs mb-1"
            >
              Clase
            </label>
            <select
              id="filterClase"
              value={filterClase}
              onChange={(e) => setFilterClase(e.target.value)}
              className="w-full bg-accent-dark/40 rounded-lg border border-accent-dark/40 text-white p-2 font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="">Todas las clases</option>
              {clases.map((clase) => (
                <option key={clase.id} value={clase.id}>
                  {clase.nombre} - {clase.fecha} {clase.hora}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="filterFecha"
              className="block text-accent-medium font-montserrat text-xs mb-1"
            >
              Fecha
            </label>
            <select
              id="filterFecha"
              value={filterFecha}
              onChange={(e) => setFilterFecha(e.target.value)}
              className="w-full bg-accent-dark/40 rounded-lg border border-accent-dark/40 text-white p-2 font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="">Todas las fechas</option>
              {Array.from(new Set(asistencias.map((a) => a.fecha))).map(
                (fecha) => (
                  <option key={fecha} value={fecha}>
                    {fecha}
                  </option>
                )
              )}
            </select>
          </div>

          <div>
            <label
              htmlFor="filterEstado"
              className="block text-accent-medium font-montserrat text-xs mb-1"
            >
              Estado
            </label>
            <select
              id="filterEstado"
              value={filterEstado}
              onChange={(e) => setFilterEstado(e.target.value)}
              className="w-full bg-accent-dark/40 rounded-lg border border-accent-dark/40 text-white p-2 font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="">Todos los estados</option>
              <option value="asistio">Asistió</option>
              <option value="pendiente">Pendiente</option>
              <option value="no-asistio">No asistió</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabla de asistencias */}
      <div className="bg-gradient-to-br from-accent-dark/80 to-[#1a1a1a] rounded-xl border border-accent-dark/30 shadow-xl backdrop-blur-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-accent-dark/60 text-accent-medium font-oswald tracking-wide text-xs uppercase">
                <th className="py-3 px-4 text-left">Usuario</th>
                <th className="py-3 px-4 text-left">Clase</th>
                <th className="py-3 px-4 text-center">Fecha</th>
                <th className="py-3 px-4 text-center">Estado</th>
                <th className="py-3 px-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredAsistencias.length > 0 ? (
                filteredAsistencias.map((asistencia) => {
                  const clase = getClaseById(asistencia.claseId);
                  return (
                    <tr
                      key={asistencia.id}
                      className="border-t border-accent-dark/30 hover:bg-accent-dark/20 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <Image
                            src={asistencia.usuario.avatar}
                            alt={asistencia.usuario.nombre}
                            width={32}
                            height={32}
                            className="rounded-full mr-3"
                          />
                          <div>
                            <div className="font-oswald text-white text-sm">
                              {asistencia.usuario.nombre}
                            </div>
                            <div className="flex items-center">
                              <span
                                className={`w-2 h-2 rounded-full ${asistencia.usuario.plan.color} mr-1`}
                              ></span>
                              <span className="text-accent-medium font-montserrat text-xs">
                                {asistencia.usuario.plan.nombre}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-oswald text-white text-sm">
                          {clase?.nombre}
                        </div>
                        <div className="text-accent-medium font-montserrat text-xs">
                          {clase?.instructor} · {clase?.duracion}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="text-white font-montserrat text-sm">
                          {asistencia.fecha}
                        </div>
                        <div className="text-accent-medium font-montserrat text-xs">
                          {clase?.hora}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span
                          className={`inline-block rounded-full px-3 py-1 text-xs font-montserrat text-white capitalize ${getEstadoColor(
                            asistencia.estado
                          )}`}
                        >
                          {getEstadoText(asistencia.estado)}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex space-x-1 justify-center">
                          {asistencia.estado !== "asistio" && (
                            <button
                              onClick={() =>
                                handleEstadoChange(asistencia.id, "asistio")
                              }
                              className="bg-green-500/20 hover:bg-green-500/40 text-green-400 p-1.5 rounded-md transition-all duration-300"
                              title="Marcar como asistió"
                            >
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
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                            </button>
                          )}

                          {asistencia.estado !== "no-asistio" && (
                            <button
                              onClick={() =>
                                handleEstadoChange(asistencia.id, "no-asistio")
                              }
                              className="bg-red-500/20 hover:bg-red-500/40 text-red-400 p-1.5 rounded-md transition-all duration-300"
                              title="Marcar como no asistió"
                            >
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
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                              </svg>
                            </button>
                          )}

                          <button
                            onClick={() => openAsistenciaModal(asistencia)}
                            className="bg-accent-medium/20 hover:bg-accent-medium/40 text-accent-medium p-1.5 rounded-md transition-all duration-300"
                            title="Editar asistencia"
                          >
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
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="py-6 text-center text-accent-medium font-montserrat"
                  >
                    No se encontraron asistencias con los filtros seleccionados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
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

export default AsistenciasPage;
