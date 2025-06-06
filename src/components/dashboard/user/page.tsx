"use client";

import { FC, useEffect, useState } from "react";
import Image from "next/image";
import FormUserComponent from "./formUser.component";
import { IPriceData, IStudentData, sortByType } from "@/type";
import { getPrices } from "@/lib/db/actions/price.action";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { getAllStudents } from "@/lib/db/actions/student.action";
import { initialStudents } from "@/lib/redux/features/student/student.slice";
import ModalEditUserComponent from "./modalEditUser.component";
import PaginationUserComponent from "./paginationUser.component";
import FilterUserComponent from "./filterUser.component";

const UserPageComponent: FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [usuarioEditado, setUsuarioEditado] = useState<IStudentData | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterPlan, setFilterPlan] = useState<string>("");
  const [filterEstado, setFilterEstado] = useState<sortByType>("");
  const [sortBy, setSortBy] = useState("createdAt");

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

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const filter: any = {};

      if (searchTerm && searchTerm.trim() !== "") {
        filter.search = searchTerm;
      }

      if (filterPlan && filterPlan.trim() !== "") {
        filter.plan = filterPlan;
      }

      if (filterEstado && filterEstado.trim() !== "") {
        filter.status = filterEstado;
      }

      if (sortBy && sortBy.trim() !== "") {
        filter.sortBy = sortBy;
        console.log("Sorting by:", sortBy);
      }

      const data = await getAllStudents(currentPage, 7, filter);
      dispatch(initialStudents(data));
      setIsLoading(false);
    };
    void fetchStudents();
    return () => {};
  }, [dispatch, currentPage, searchTerm, filterPlan, filterEstado, sortBy]);

  const openUserModal = (user: IStudentData) => {
    console.log("Opening user modal for:", user);

    setUsuarioEditado({ ...user });
    setShowModal(true);
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
      <FilterUserComponent
        setCurrentPage={setCurrentPage}
        planes={planes}
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
        setFilterPlan={setFilterPlan}
        filterPlan={filterPlan}
        setFilterEstado={setFilterEstado}
        filterEstado={filterEstado}
        setSortBy={setSortBy}
        sortBy={sortBy}
      />
      <div className="bg-gradient-to-br from-accent-dark/80 to-[#1a1a1a] rounded-xl border border-accent-dark/30 shadow-xl backdrop-blur-sm overflow-hidden">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin mb-4"></div>
            <p className="text-accent-medium font-montserrat text-sm">
              Cargando usuarios...
            </p>
          </div>
        ) : (
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
                            src={user.avatar as string}
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
                          className="cursor-pointer bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white p-2 rounded-lg text-sm transition-all duration-300 shadow-sm hover:shadow-md"
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

                {students.docs.length === 0 && !isLoading && (
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
        )}

        <PaginationUserComponent
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>

      <ModalEditUserComponent
        setShowModal={setShowModal}
        usuarioEditado={usuarioEditado}
        showModal={showModal}
        setUsuarioEditado={setUsuarioEditado}
        planes={planes}
      />
    </div>
  );
};

export default UserPageComponent;
