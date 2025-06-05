"use client";
import { FC, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface Comentario {
  id: number;
  usuario: {
    nombre: string;
    avatar: string;
    rol: string;
  };
  contenido: string;
  fecha: string;
  clase?: string;
  rating?: number;
  estado: "aprobado" | "pendiente" | "rechazado";
}

interface NuevoComentario {
  contenido: string;
  clase?: string;
  rating: number;
  estado?: "aprobado" | "pendiente" | "rechazado";
}

const ComentariosPage: FC = () => {
  const [activeTab, setActiveTab] = useState("todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterEstado, setFilterEstado] = useState("");
  const [filterRating, setFilterRating] = useState("");
  const [selectedComment, setSelectedComment] = useState<Comentario | null>(
    null
  );
  const [editMode, setEditMode] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nuevoComentario, setNuevoComentario] = useState<NuevoComentario>({
    contenido: "",
    clase: "",
    rating: 5,
    estado: "pendiente",
  });

  // Datos simulados de comentarios
  const [comentarios, setComentarios] = useState<Comentario[]>([
    {
      id: 1,
      usuario: {
        nombre: "Juan Pérez",
        avatar: "/default-avatar.png",
        rol: "Miembro desde 2024",
      },
      contenido:
        "La clase de boxeo fue increíble. El instructor explicó muy bien las técnicas y me sentí desafiado durante toda la sesión.",
      fecha: "30/05/2025",
      clase: "Boxing Fundamentals",
      rating: 5,
      estado: "aprobado",
    },
    {
      id: 2,
      usuario: {
        nombre: "María González",
        avatar: "/default-avatar.png",
        rol: "Miembro desde 2023",
      },
      contenido:
        "Me encantó la energía en la clase de HIIT Boxing. La música estaba perfecta y el ritmo fue ideal para mantenerme motivada.",
      fecha: "29/05/2025",
      clase: "HIIT Boxing",
      rating: 4,
      estado: "aprobado",
    },
    {
      id: 3,
      usuario: {
        nombre: "Carlos Rodríguez",
        avatar: "/default-avatar.png",
        rol: "Miembro desde 2025",
      },
      contenido:
        "La instalación siempre está limpia y el equipo en buen estado. Definitivamente recomendaría este gimnasio a cualquiera que busque mejorar su técnica de boxeo.",
      fecha: "28/05/2025",
      rating: 5,
      estado: "pendiente",
    },
    {
      id: 4,
      usuario: {
        nombre: "Laura Martínez",
        avatar: "/default-avatar.png",
        rol: "Miembro desde 2024",
      },
      contenido:
        "Creo que podrían mejorar la ventilación en el área de entrenamiento, especialmente durante las clases más concurridas.",
      fecha: "27/05/2025",
      rating: 3,
      estado: "rechazado",
    },
    {
      id: 5,
      usuario: {
        nombre: "Miguel Sánchez",
        avatar: "/default-avatar.png",
        rol: "Miembro desde 2023",
      },
      contenido:
        "Los entrenadores son muy profesionales y atentos. Me han ayudado mucho a mejorar mi técnica en poco tiempo.",
      fecha: "26/05/2025",
      clase: "Advanced Techniques",
      rating: 5,
      estado: "pendiente",
    },
  ]);

  const filteredComentarios = comentarios.filter((comentario) => {
    // Filtrar por término de búsqueda
    const matchesSearch =
      comentario.usuario.nombre
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      comentario.contenido.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (comentario.clase &&
        comentario.clase.toLowerCase().includes(searchTerm.toLowerCase()));

    // Filtrar por estado
    const matchesEstado = filterEstado
      ? comentario.estado === filterEstado
      : true;

    // Filtrar por rating
    const matchesRating = filterRating
      ? comentario.rating === parseInt(filterRating)
      : true;

    // Filtrar por pestaña activa
    const matchesTab =
      activeTab === "todos"
        ? true
        : activeTab === "clases"
        ? !!comentario.clase
        : activeTab === "instalaciones"
        ? !comentario.clase
        : true;

    return matchesSearch && matchesEstado && matchesRating && matchesTab;
  });

  const renderRating = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={index < rating ? "currentColor" : "none"}
            stroke="currentColor"
            className={`w-4 h-4 ${
              index < rating ? "text-primary" : "text-accent-medium"
            }`}
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        ))}
      </div>
    );
  };

  // Cambiar el estado de un comentario (aprobar/rechazar)
  const handleEstadoChange = (
    id: number,
    nuevoEstado: "aprobado" | "pendiente" | "rechazado"
  ) => {
    setComentarios(
      comentarios.map((comment) =>
        comment.id === id ? { ...comment, estado: nuevoEstado } : comment
      )
    );
  };

  const handleDeleteComment = (id: number) => {
    setComentarios(comentarios.filter((comment) => comment.id !== id));
  };

  const openEditModal = (comentario: Comentario) => {
    setSelectedComment(comentario);
    setEditMode(true);
    setIsModalOpen(true);
  };

  const handleSaveEdit = () => {
    if (!selectedComment) return;

    setComentarios(
      comentarios.map((comment) =>
        comment.id === selectedComment.id ? selectedComment : comment
      )
    );

    setIsModalOpen(false);
    setSelectedComment(null);
    setEditMode(false);
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "aprobado":
        return "bg-green-500/20 text-green-400";
      case "pendiente":
        return "bg-yellow-500/20 text-yellow-400";
      case "rechazado":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  const getEstadoText = (estado: string) => {
    switch (estado) {
      case "aprobado":
        return "Aprobado";
      case "pendiente":
        return "Pendiente";
      case "rechazado":
        return "Rechazado";
      default:
        return "Desconocido";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
        <h1 className="font-bebas text-white text-xl sm:text-knockout sm:text-4xl mb-1 sm:mb-0 tracking-wider">
          COMENTARIOS
        </h1>
      </div>

      {/* Filtros y búsqueda */}
      <div className="bg-gradient-to-br from-accent-dark/80 to-[#1a1a1a] rounded-xl border border-accent-dark/30 shadow-xl backdrop-blur-sm p-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="search"
              className="block text-accent-medium font-montserrat text-sm mb-1"
            >
              Buscar
            </label>
            <div className="relative">
              <input
                type="text"
                id="search"
                className="w-full bg-accent-dark/40 rounded-lg border border-accent-dark/40 text-white p-3 pl-10 font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Buscar en comentarios..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
              htmlFor="estado"
              className="block text-accent-medium font-montserrat text-sm mb-1"
            >
              Filtrar por estado
            </label>
            <select
              id="estado"
              className="w-full bg-accent-dark/40 rounded-lg border border-accent-dark/40 text-white p-3 font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              value={filterEstado}
              onChange={(e) => setFilterEstado(e.target.value)}
            >
              <option value="">Todos los estados</option>
              <option value="aprobado">Aprobados</option>
              <option value="pendiente">Pendientes</option>
              <option value="rechazado">Rechazados</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="rating"
              className="block text-accent-medium font-montserrat text-sm mb-1"
            >
              Filtrar por calificación
            </label>
            <select
              id="rating"
              className="w-full bg-accent-dark/40 rounded-lg border border-accent-dark/40 text-white p-3 font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value)}
            >
              <option value="">Todas las calificaciones</option>
              <option value="5">5 estrellas</option>
              <option value="4">4 estrellas</option>
              <option value="3">3 estrellas</option>
              <option value="2">2 estrellas</option>
              <option value="1">1 estrella</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-green-500/10 to-[#1a1a1a] rounded-xl border border-accent-dark/30 shadow-xl backdrop-blur-sm p-4 flex flex-col items-center">
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
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <h3 className="font-oswald text-white text-lg">
            {comentarios.filter((c) => c.estado === "aprobado").length}
          </h3>
          <p className="text-accent-medium font-montserrat text-sm">
            Comentarios Aprobados
          </p>
        </div>

        <div className="bg-gradient-to-br from-yellow-500/10 to-[#1a1a1a] rounded-xl border border-accent-dark/30 shadow-xl backdrop-blur-sm p-4 flex flex-col items-center">
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
            {comentarios.filter((c) => c.estado === "pendiente").length}
          </h3>
          <p className="text-accent-medium font-montserrat text-sm">
            Comentarios Pendientes
          </p>
        </div>

        <div className="bg-gradient-to-br from-red-500/10 to-[#1a1a1a] rounded-xl border border-accent-dark/30 shadow-xl backdrop-blur-sm p-4 flex flex-col items-center">
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
            {comentarios.filter((c) => c.estado === "rechazado").length}
          </h3>
          <p className="text-accent-medium font-montserrat text-sm">
            Comentarios Rechazados
          </p>
        </div>
      </div>

      {/* Tabs de filtrado */}
      <div className="flex border-b border-accent-dark/40 mb-4 overflow-x-auto hide-scrollbar">
        <button
          className={`py-2 px-4 font-oswald tracking-wide text-sm transition-all duration-300 ${
            activeTab === "todos"
              ? "text-primary border-b-2 border-primary"
              : "text-accent-medium hover:text-white"
          }`}
          onClick={() => setActiveTab("todos")}
        >
          Todos
        </button>
        <button
          className={`py-2 px-4 font-oswald tracking-wide text-sm transition-all duration-300 ${
            activeTab === "clases"
              ? "text-primary border-b-2 border-primary"
              : "text-accent-medium hover:text-white"
          }`}
          onClick={() => setActiveTab("clases")}
        >
          Clases
        </button>
        <button
          className={`py-2 px-4 font-oswald tracking-wide text-sm transition-all duration-300 ${
            activeTab === "instalaciones"
              ? "text-primary border-b-2 border-primary"
              : "text-accent-medium hover:text-white"
          }`}
          onClick={() => setActiveTab("instalaciones")}
        >
          Instalaciones
        </button>
      </div>

      {/* Lista de comentarios */}
      <div className="space-y-4">
        {filteredComentarios.length > 0 ? (
          filteredComentarios.map((comentario) => (
            <motion.div
              key={comentario.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-accent-dark/80 to-[#1a1a1a] rounded-xl border border-accent-dark/30 shadow-xl backdrop-blur-sm p-4"
            >
              <div className="flex items-start">
                <Image
                  src={comentario.usuario.avatar}
                  alt={comentario.usuario.nombre}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div className="ml-3 flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <div>
                      <h3 className="font-oswald text-white text-sm sm:text-base">
                        {comentario.usuario.nombre}
                      </h3>
                      <p className="text-accent-medium font-montserrat text-xs">
                        {comentario.usuario.rol}
                      </p>
                    </div>
                    <div className="flex items-center mt-1 sm:mt-0">
                      {renderRating(comentario.rating || 0)}
                      <span className="text-accent-medium font-montserrat text-xs ml-2">
                        {comentario.fecha}
                      </span>
                    </div>
                  </div>
                  <p className="text-white font-montserrat text-sm mb-2">
                    {comentario.contenido}
                  </p>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-2">
                      {comentario.clase && (
                        <div className="inline-block bg-accent-dark/60 rounded-full px-3 py-1">
                          <span className="text-accent-medium font-montserrat text-xs">
                            Clase: {comentario.clase}
                          </span>
                        </div>
                      )}
                      <div
                        className={`inline-block rounded-full px-3 py-1 ${getEstadoColor(
                          comentario.estado
                        )}`}
                      >
                        <span className="font-montserrat text-xs">
                          {getEstadoText(comentario.estado)}
                        </span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      {comentario.estado !== "aprobado" && (
                        <button
                          onClick={() =>
                            handleEstadoChange(comentario.id, "aprobado")
                          }
                          className="bg-green-500/20 hover:bg-green-500/40 text-green-400 p-1.5 rounded-md transition-all duration-300"
                          title="Aprobar comentario"
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

                      {comentario.estado !== "rechazado" && (
                        <button
                          onClick={() =>
                            handleEstadoChange(comentario.id, "rechazado")
                          }
                          className="bg-red-500/20 hover:bg-red-500/40 text-red-400 p-1.5 rounded-md transition-all duration-300"
                          title="Rechazar comentario"
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
                        onClick={() => openEditModal(comentario)}
                        className="bg-accent-medium/20 hover:bg-accent-medium/40 text-accent-medium p-1.5 rounded-md transition-all duration-300"
                        title="Editar comentario"
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

                      <button
                        onClick={() => handleDeleteComment(comentario.id)}
                        className="bg-accent-dark/60 hover:bg-accent-dark text-white p-1.5 rounded-md transition-all duration-300"
                        title="Eliminar comentario"
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
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          <line x1="10" y1="11" x2="10" y2="17"></line>
                          <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-12 h-12 text-accent-dark mx-auto mb-4"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <p className="text-accent-medium font-montserrat">
              No hay comentarios que coincidan con los filtros aplicados
            </p>
          </div>
        )}
      </div>

      {/* Modal de edición */}
      <AnimatePresence>
        {isModalOpen && selectedComment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gradient-to-br from-accent-dark to-[#1a1a1a] rounded-xl border border-accent-dark/30 shadow-xl w-full max-w-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-5">
                <h2 className="font-oswald text-white text-xl mb-4 flex justify-between items-center">
                  Editar Comentario
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-accent-medium hover:text-white transition-colors"
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
                </h2>

                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="edit-contenido"
                      className="block text-accent-medium font-montserrat text-sm mb-1"
                    >
                      Contenido
                    </label>
                    <textarea
                      id="edit-contenido"
                      rows={4}
                      className="w-full bg-accent-dark/40 rounded-lg border border-accent-dark/40 text-white p-3 font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                      value={selectedComment.contenido}
                      onChange={(e) =>
                        setSelectedComment({
                          ...selectedComment,
                          contenido: e.target.value,
                        })
                      }
                    ></textarea>
                  </div>

                  <div>
                    <label
                      htmlFor="edit-clase"
                      className="block text-accent-medium font-montserrat text-sm mb-1"
                    >
                      Clase
                    </label>
                    <select
                      id="edit-clase"
                      className="w-full bg-accent-dark/40 rounded-lg border border-accent-dark/40 text-white p-3 font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                      value={selectedComment.clase || ""}
                      onChange={(e) =>
                        setSelectedComment({
                          ...selectedComment,
                          clase: e.target.value,
                        })
                      }
                    >
                      <option value="">Sin clase (comentario general)</option>
                      <option value="Boxing Fundamentals">
                        Boxing Fundamentals
                      </option>
                      <option value="HIIT Boxing">HIIT Boxing</option>
                      <option value="Advanced Techniques">
                        Advanced Techniques
                      </option>
                      <option value="Boxing for Beginners">
                        Boxing for Beginners
                      </option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-accent-medium font-montserrat text-sm mb-1">
                        Calificación
                      </label>
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() =>
                              setSelectedComment({
                                ...selectedComment,
                                rating: star,
                              })
                            }
                            className="focus:outline-none"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill={
                                star <= (selectedComment.rating || 0)
                                  ? "currentColor"
                                  : "none"
                              }
                              stroke="currentColor"
                              className={`w-6 h-6 ${
                                star <= (selectedComment.rating || 0)
                                  ? "text-primary"
                                  : "text-accent-medium"
                              }`}
                            >
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="edit-estado"
                        className="block text-accent-medium font-montserrat text-sm mb-1"
                      >
                        Estado
                      </label>
                      <select
                        id="edit-estado"
                        className="w-full bg-accent-dark/40 rounded-lg border border-accent-dark/40 text-white p-3 font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                        value={selectedComment.estado}
                        onChange={(e) =>
                          setSelectedComment({
                            ...selectedComment,
                            estado: e.target.value as
                              | "aprobado"
                              | "pendiente"
                              | "rechazado",
                          })
                        }
                      >
                        <option value="aprobado">Aprobado</option>
                        <option value="pendiente">Pendiente</option>
                        <option value="rechazado">Rechazado</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="bg-accent-dark/60 hover:bg-accent-dark text-white py-2 px-4 rounded-md text-sm font-oswald uppercase tracking-wider transition-all duration-300"
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      onClick={handleSaveEdit}
                      className="bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-md text-sm font-oswald uppercase tracking-wider transition-all duration-300"
                    >
                      Guardar Cambios
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Estadísticas de comentarios */}
    </div>
  );
};

export default ComentariosPage;
