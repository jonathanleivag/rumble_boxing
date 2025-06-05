"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FC, useEffect, useState } from "react";
import Image from "next/image";
import FormUserComponent from "./formUser.component";
import { IPriceData, IStudentData } from "@/type";
import { Types } from "mongoose";
import { getPrices } from "@/lib/db/actions/price.action";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { getAllStudents } from "@/lib/db/actions/student.action";
import { initialStudents } from "@/lib/redux/features/student/student.slice";

const UserPageComponent: FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPlan, setFilterPlan] = useState("");
  const [filterEstado, setFilterEstado] = useState("");
  const [sortBy, setSortBy] = useState("nombre");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IStudentData | null>(null);
  const [usuarioEditado, setUsuarioEditado] = useState<IStudentData | null>(
    null
  );
  const [planes, setPlanes] = useState<IPriceData[]>([]);
  const students = useAppSelector((state) => state.student.students);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchPlanes = async () => {
      const data = JSON.parse(await getPrices()) as IPriceData[];
      const dataPlanes = data.map((plan) => ({
        ...plan,
        id: plan._id.toString(),
      }));
      setPlanes(dataPlanes);
    };
    void fetchPlanes();

    return () => {};
  }, []);

  useEffect(() => {
    const fetchStudents = async () => {
      setIsLoading(true);
      const data = await getAllStudents(currentPage, pageSize);
      dispatch(initialStudents(data));
      setIsLoading(false);
    };
    void fetchStudents();
    return () => {};
  }, [dispatch, currentPage, pageSize]);

  const usuarios: IStudentData[] = [
    {
      name: "",
      email: "",
      rut: "",
      phone: "",
      createDate: "",
      plan: {
        name: "Básico",
        type: "mensual",
        price: 0,
        class: 8,
        description: "Plan básico mensual",
        characteristics: [],
        active: true,
        isPopular: false,
        _id: new Types.ObjectId(),
        createdAt: "",
        updatedAt: "",
        id: "",
      },
      assistance: 0,
      status: "activo",
      avatar: "",
      _id: new Types.ObjectId(),
      createdAt: "",
      updatedAt: "",
    },
  ];

  const filteredUsuarios = usuarios
    .filter((usuario) => {
      const matchesSearch =
        usuario.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        usuario.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        usuario.rut.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesPlan = filterPlan ? usuario.plan.id === filterPlan : true;
      const matchesEstado = filterEstado
        ? usuario.status === filterEstado
        : true;

      return matchesSearch && matchesPlan && matchesEstado;
    })
    .sort((a, b) => {
      if (sortBy === "nombre") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "fechaRegistro") {
        const dateA = new Date(a.createDate.split("/").reverse().join("-"));
        const dateB = new Date(b.createDate.split("/").reverse().join("-"));
        return dateB.getTime() - dateA.getTime();
      } else if (sortBy === "asistencias") {
        return b.assistance - a.assistance;
      }
      return 0;
    });

  const openUserModal = (user: IStudentData) => {
    setSelectedUser(user);
    setUsuarioEditado({ ...user });
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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getPageNumbers = () => {
    const totalPages = students.totalPages || 1;
    const currentPageNum = students.page || 1;
    const pageNumbers: number[] = [];

    // Always show first page
    if (currentPageNum > 3) {
      pageNumbers.push(1);
      // Add ellipsis if there's a gap
      if (currentPageNum > 4) {
        pageNumbers.push(-1); // -1 represents ellipsis
      }
    }

    // Show previous page if not first page
    if (currentPageNum > 1) {
      pageNumbers.push(currentPageNum - 1);
    }

    // Current page
    pageNumbers.push(currentPageNum);

    // Show next page if not last page
    if (currentPageNum < totalPages) {
      pageNumbers.push(currentPageNum + 1);
    }

    // Add ellipsis and last page if needed
    if (currentPageNum < totalPages - 2) {
      if (currentPageNum < totalPages - 3) {
        pageNumbers.push(-1);
      }
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
        <h1 className="font-bebas text-white text-xl sm:text-knockout sm:text-4xl mb-1 sm:mb-0 tracking-wider">
          USUARIOS
        </h1>
        {planes.length > 0 && (
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-md text-sm font-oswald uppercase tracking-wider transition-all duration-300 flex items-center justify-center cursor-pointer"
          >
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
        )}
      </div>

      {planes.length > 0 && (
        <FormUserComponent
          showAddForm={showAddForm}
          setShowAddForm={setShowAddForm}
          planes={planes}
        />
      )}

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
              placeholder="Nombre, email o RUT"
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
                  {plan.name}
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
              {students.docs.map((user) => (
                <tr
                  key={user._id.toString()}
                  className="border-t border-accent-dark/30 hover:bg-accent-dark/20 transition-colors"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
                        <Image
                          src={
                            user.avatar ||
                            "https://res.cloudinary.com/dq8fpb695/image/upload/v1748900421/rumble/yfwwjdnhstzsmx2nuazq.webp"
                          }
                          alt={user.name}
                          width={32}
                          height={32}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div>
                        <div className="font-oswald text-white text-sm">
                          {user.name}
                        </div>
                        <div className="text-accent-medium font-montserrat text-xs truncate max-w-[150px]">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <span className={`w-3 h-3 rounded-full mr-2`}></span>
                      <span className="font-montserrat text-white text-sm">
                        {user.plan.type}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 hidden sm:table-cell">
                    <div className="text-accent-medium font-montserrat text-xs">
                      {user.phone}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="font-oswald text-white text-lg">
                      {user.assistance}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-montserrat text-white capitalize ${getEstadoColor(
                        user.status
                      )}`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => openUserModal(user)}
                        className="bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white p-2 rounded-lg text-sm transition-all duration-300 shadow-sm hover:shadow-md"
                        title="Ver detalles"
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
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredUsuarios.length === 0 && (
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

        {/* Pagination Controls */}
        {students.totalPages > 1 && (
          <div className="p-4 border-t border-accent-dark/30 bg-gradient-to-b from-transparent to-accent-dark/20">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-accent-medium font-montserrat text-xs">
                Mostrando{" "}
                <span className="text-white font-semibold">
                  {students.docs.length}
                </span>{" "}
                de{" "}
                <span className="text-white font-semibold">
                  {students.totalDocs}
                </span>{" "}
                usuarios | Página{" "}
                <span className="text-white font-semibold">
                  {students.page}
                </span>{" "}
                de{" "}
                <span className="text-white font-semibold">
                  {students.totalPages}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => handlePageChange(1)}
                  disabled={students.page === 1}
                  className={`p-2 rounded-md ${
                    students.page === 1
                      ? "text-accent-medium/40 cursor-not-allowed"
                      : "text-accent-medium hover:bg-accent-dark/40 hover:text-white"
                  } transition-colors`}
                  title="Primera página"
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
                    <polyline points="11 17 6 12 11 7"></polyline>
                    <polyline points="18 17 13 12 18 7"></polyline>
                  </svg>
                </button>
                <button
                  onClick={() => handlePageChange(students.prevPage || 1)}
                  disabled={!students.hasPrevPage}
                  className={`p-2 rounded-md ${
                    !students.hasPrevPage
                      ? "text-accent-medium/40 cursor-not-allowed"
                      : "text-accent-medium hover:bg-accent-dark/40 hover:text-white"
                  } transition-colors`}
                  title="Página anterior"
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
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </button>

                {/* Page numbers */}
                <div className="flex items-center space-x-1">
                  {getPageNumbers().map((pageNum) =>
                    pageNum === -1 ? (
                      <span
                        key={`ellipsis-${pageNum}`}
                        className="w-8 h-8 flex items-center justify-center text-accent-medium"
                      >
                        ...
                      </span>
                    ) : (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`w-8 h-8 flex items-center justify-center rounded-md text-xs font-montserrat transition-colors ${
                          pageNum === students.page
                            ? "bg-gradient-to-r from-primary to-primary-dark text-white"
                            : "text-accent-medium hover:bg-accent-dark/40 hover:text-white"
                        }`}
                      >
                        {pageNum}
                      </button>
                    )
                  )}
                </div>

                <button
                  onClick={() =>
                    handlePageChange(students.nextPage || students.totalPages)
                  }
                  disabled={!students.hasNextPage}
                  className={`p-2 rounded-md ${
                    !students.hasNextPage
                      ? "text-accent-medium/40 cursor-not-allowed"
                      : "text-accent-medium hover:bg-accent-dark/40 hover:text-white"
                  } transition-colors`}
                  title="Página siguiente"
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
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
                <button
                  onClick={() => handlePageChange(students.totalPages)}
                  disabled={students.page === students.totalPages}
                  className={`p-2 rounded-md ${
                    students.page === students.totalPages
                      ? "text-accent-medium/40 cursor-not-allowed"
                      : "text-accent-medium hover:bg-accent-dark/40 hover:text-white"
                  } transition-colors`}
                  title="Última página"
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
                    <polyline points="13 17 18 12 13 7"></polyline>
                    <polyline points="6 17 11 12 6 7"></polyline>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal para editar usuario */}
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
                    className="bg-accent-dark/60 hover:bg-accent-dark text-white py-2.5 px-6 rounded-md text-sm font-oswald uppercase tracking-wider transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    Cerrar
                  </button>
                  <button
                    onClick={handleSaveUser}
                    className="bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white py-2.5 px-6 rounded-md text-sm font-oswald uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg"
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

export default UserPageComponent;
