"use client";
import { FC, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface Plan {
  id: string;
  nombre: string;
  color: string;
  clases: number;
  duracion: string;
}

interface Usuario {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  fechaRegistro: string;
  plan: Plan;
  asistencias: number;
  estado: "activo" | "inactivo" | "suspendido";
  avatar: string;
}

const UsuariosPage: FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPlan, setFilterPlan] = useState("");
  const [filterEstado, setFilterEstado] = useState("");
  const [sortBy, setSortBy] = useState("nombre");
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Usuario | null>(null);
  const [usuarioEditado, setUsuarioEditado] = useState<Usuario | null>(null);

  // Datos simulados de planes
  const planes: Plan[] = [
    {
      id: "basic",
      nombre: "Básico",
      color: "bg-blue-500",
      clases: 8,
      duracion: "Mensual",
    },
    {
      id: "premium",
      nombre: "Premium",
      color: "bg-purple-500",
      clases: 16,
      duracion: "Mensual",
    },
    {
      id: "elite",
      nombre: "Elite",
      color: "bg-primary",
      clases: 30,
      duracion: "Mensual",
    },
    {
      id: "annual",
      nombre: "Anual",
      color: "bg-secondary",
      clases: "Ilimitadas",
      duracion: "12 meses",
    },
  ];

  // Datos simulados de usuarios
  const usuarios: Usuario[] = [
    {
      id: "u1",
      nombre: "Carlos Méndez",
      email: "carlos.mendez@email.com",
      telefono: "+52 555 123 4567",
      fechaRegistro: "15/02/2025",
      plan: planes[2], // Elite
      asistencias: 12,
      estado: "activo",
      avatar: "/default-avatar.png",
    },
    {
      id: "u2",
      nombre: "Laura Jiménez",
      email: "laura.jimenez@email.com",
      telefono: "+52 555 987 6543",
      fechaRegistro: "03/03/2025",
      plan: planes[1], // Premium
      asistencias: 7,
      estado: "activo",
      avatar: "/default-avatar.png",
    },
    {
      id: "u3",
      nombre: "Ricardo Torres",
      email: "ricardo.torres@email.com",
      telefono: "+52 555 456 7890",
      fechaRegistro: "20/01/2025",
      plan: planes[0], // Básico
      asistencias: 3,
      estado: "inactivo",
      avatar: "/default-avatar.png",
    },
    {
      id: "u4",
      nombre: "Ana García",
      email: "ana.garcia@email.com",
      telefono: "+52 555 234 5678",
      fechaRegistro: "10/04/2025",
      plan: planes[3], // Anual
      asistencias: 28,
      estado: "activo",
      avatar: "/default-avatar.png",
    },
    {
      id: "u5",
      nombre: "Miguel López",
      email: "miguel.lopez@email.com",
      telefono: "+52 555 876 5432",
      fechaRegistro: "05/03/2025",
      plan: planes[0], // Básico
      asistencias: 6,
      estado: "suspendido",
      avatar: "/default-avatar.png",
    },
    {
      id: "u6",
      nombre: "Sofía Ramírez",
      email: "sofia.ramirez@email.com",
      telefono: "+52 555 345 6789",
      fechaRegistro: "22/02/2025",
      plan: planes[1], // Premium
      asistencias: 9,
      estado: "activo",
      avatar: "/default-avatar.png",
    },
  ];

  // Filtrar y ordenar usuarios
  const filteredUsuarios = usuarios
    .filter((usuario) => {
      const matchesSearch =
        usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        usuario.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesPlan = filterPlan ? usuario.plan.id === filterPlan : true;
      const matchesEstado = filterEstado
        ? usuario.estado === filterEstado
        : true;

      return matchesSearch && matchesPlan && matchesEstado;
    })
    .sort((a, b) => {
      if (sortBy === "nombre") {
        return a.nombre.localeCompare(b.nombre);
      } else if (sortBy === "fechaRegistro") {
        const dateA = new Date(a.fechaRegistro.split("/").reverse().join("-"));
        const dateB = new Date(b.fechaRegistro.split("/").reverse().join("-"));
        return dateB.getTime() - dateA.getTime(); // Más recientes primero
      } else if (sortBy === "asistencias") {
        return b.asistencias - a.asistencias; // Mayor asistencia primero
      }
      return 0;
    });

  const openUserModal = (usuario: Usuario) => {
    setSelectedUser(usuario);
    setUsuarioEditado({ ...usuario });
    setShowModal(true);
  };

  const handleSaveUser = () => {
    // Aquí iría la lógica para guardar los cambios del usuario
    console.log("Guardando usuario:", usuarioEditado);
    setShowModal(false);
    // En una implementación real, aquí se actualizaría la base de datos
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "activo":
        return "bg-green-500";
      case "inactivo":
        return "bg-yellow-500";
      case "suspendido":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
        <h1 className="font-bebas text-white text-xl sm:text-knockout sm:text-4xl mb-1 sm:mb-0 tracking-wider">
          USUARIOS
        </h1>
        <button className="bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-md text-sm font-oswald uppercase tracking-wider transition-all duration-300 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4 mr-2"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Nuevo Usuario
        </button>
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
            <input
              id="search"
              type="text"
              placeholder="Nombre o email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-accent-dark/40 rounded-lg border border-accent-dark/40 text-white p-2 font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          <div>
            <label
              htmlFor="filterPlan"
              className="block text-accent-medium font-montserrat text-xs mb-1"
            >
              Plan
            </label>
            <select
              id="filterPlan"
              value={filterPlan}
              onChange={(e) => setFilterPlan(e.target.value)}
              className="w-full bg-accent-dark/40 rounded-lg border border-accent-dark/40 text-white p-2 font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="">Todos los planes</option>
              {planes.map((plan) => (
                <option key={plan.id} value={plan.id}>
                  {plan.nombre}
                </option>
              ))}
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
              <option value="">Todos</option>
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
              <option value="suspendido">Suspendido</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="sortBy"
              className="block text-accent-medium font-montserrat text-xs mb-1"
            >
              Ordenar por
            </label>
            <select
              id="sortBy"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-accent-dark/40 rounded-lg border border-accent-dark/40 text-white p-2 font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="nombre">Nombre</option>
              <option value="fechaRegistro">Fecha de registro</option>
              <option value="asistencias">Asistencias</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabla de usuarios */}
      <div className="bg-gradient-to-br from-accent-dark/80 to-[#1a1a1a] rounded-xl border border-accent-dark/30 shadow-xl backdrop-blur-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-accent-dark/60 text-accent-medium font-oswald tracking-wide text-xs uppercase">
                <th className="py-3 px-4 text-left">Usuario</th>
                <th className="py-3 px-4 text-left">Plan</th>
                <th className="py-3 px-4 text-left hidden sm:table-cell">
                  Contacto
                </th>
                <th className="py-3 px-4 text-center">Asistencias</th>
                <th className="py-3 px-4 text-center">Estado</th>
                <th className="py-3 px-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsuarios.length > 0 ? (
                filteredUsuarios.map((usuario) => (
                  <tr
                    key={usuario.id}
                    className="border-t border-accent-dark/30 hover:bg-accent-dark/20 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <Image
                          src={usuario.avatar}
                          alt={usuario.nombre}
                          width={32}
                          height={32}
                          className="rounded-full mr-3"
                        />
                        <div>
                          <div className="font-oswald text-white text-sm">
                            {usuario.nombre}
                          </div>
                          <div className="text-accent-medium font-montserrat text-xs truncate max-w-[150px]">
                            {usuario.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <span
                          className={`w-3 h-3 rounded-full ${usuario.plan.color} mr-2`}
                        ></span>
                        <span className="font-montserrat text-white text-sm">
                          {usuario.plan.nombre}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 hidden sm:table-cell">
                      <div className="text-accent-medium font-montserrat text-xs">
                        {usuario.telefono}
                        <br />
                        Desde: {usuario.fechaRegistro}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="font-oswald text-white text-lg">
                        {typeof usuario.plan.clases === "string" ? (
                          <span className="text-sm text-primary font-semibold">
                            {usuario.asistencias}
                          </span>
                        ) : (
                          <span>
                            <span className="text-primary font-semibold">
                              {usuario.asistencias}
                            </span>
                            <span className="text-xs text-accent-medium">
                              /{usuario.plan.clases}
                            </span>
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-xs font-montserrat text-white capitalize ${getEstadoColor(
                          usuario.estado
                        )}`}
                      >
                        {usuario.estado}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => openUserModal(usuario)}
                        className="bg-accent-dark/60 hover:bg-accent-dark/80 text-white p-2 rounded-lg text-sm transition-all duration-300"
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
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="py-6 text-center text-accent-medium font-montserrat"
                  >
                    No se encontraron usuarios con los filtros seleccionados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal para editar usuario */}
      <AnimatePresence>
        {showModal && usuarioEditado && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-xl border border-accent-dark/30 shadow-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bebas text-white text-2xl">
                  EDITAR USUARIO
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
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <Image
                      src={usuarioEditado.avatar}
                      alt={usuarioEditado.nombre}
                      width={80}
                      height={80}
                      className="rounded-full border-2 border-primary"
                    />
                    <button className="absolute bottom-0 right-0 bg-primary text-white p-1 rounded-full">
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-accent-medium font-montserrat text-xs mb-1">
                      Nombre
                    </label>
                    <input
                      type="text"
                      value={usuarioEditado.nombre}
                      onChange={(e) =>
                        setUsuarioEditado({
                          ...usuarioEditado,
                          nombre: e.target.value,
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
                      value={usuarioEditado.telefono}
                      onChange={(e) =>
                        setUsuarioEditado({
                          ...usuarioEditado,
                          telefono: e.target.value,
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
                      value={usuarioEditado.estado}
                      onChange={(e) =>
                        setUsuarioEditado({
                          ...usuarioEditado,
                          estado: e.target.value as
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
                          {plan.nombre} - {plan.clases} clases
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
                      value={usuarioEditado.asistencias}
                      onChange={(e) =>
                        setUsuarioEditado({
                          ...usuarioEditado,
                          asistencias: parseInt(e.target.value) || 0,
                        })
                      }
                      className="w-full bg-accent-dark/40 rounded-lg border border-accent-dark/40 text-white p-2 font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </div>

                <div className="border-t border-accent-dark/40 pt-4 mt-6 flex justify-end space-x-3">
                  <button
                    onClick={() => setShowModal(false)}
                    className="bg-accent-dark/60 hover:bg-accent-dark text-white py-2 px-4 rounded-md text-sm font-oswald uppercase tracking-wider transition-all duration-300"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSaveUser}
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

export default UsuariosPage;
