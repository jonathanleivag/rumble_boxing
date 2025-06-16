"use client";

import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { FC, useEffect } from "react";
import Image from "next/image";
import { getAllStudents } from "@/lib/db/actions/student.action";
import { initialStudents } from "@/lib/redux/features/student/student.slice";

const TableAssistComponent: FC = () => {
  const dispatch = useAppDispatch();
  const students = useAppSelector((state) => state.student.students);

  useEffect(() => {
    const dataFetch = async () => {
      const data = await getAllStudents(1, 5);
      console.log("🚀 ~ dataFetch ~ data:", data);
      dispatch(initialStudents(data));
    };
    void dataFetch();
    return () => {};
  }, [dispatch]);

  return (
    <table className="w-full">
      <thead>
        <tr className="bg-accent-dark/60 text-accent-medium font-oswald tracking-wide text-xs uppercase">
          <th className="py-3 px-4 text-left">Usuario</th>
          <th className="py-3 px-4 text-left">Clase</th>
          <th className="py-3 px-4 text-center">Cantidad</th>
          <th className="py-3 px-4 text-center">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {students.docs.length > 0 ? (
          students.docs.map((asistencia) => {
            return (
              <tr
                key={asistencia._id.toString()}
                className="border-t border-accent-dark/30 hover:bg-accent-dark/20 transition-colors"
              >
                <td className="py-3 px-4">
                  <div className="flex items-center">
                    <Image
                      src={asistencia.avatar!}
                      alt={asistencia.name}
                      width={32}
                      height={32}
                      className="rounded-full mr-3"
                    />
                    <div>
                      <div className="font-oswald text-white text-sm">
                        {asistencia.name}
                      </div>
                      <div className="flex items-center">
                        <span className={`w-2 h-2 rounded-full mr-1`}></span>
                        <span className="text-accent-medium font-montserrat text-xs">
                          {asistencia.plan.name}
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="text-white font-montserrat text-sm">
                    {asistencia.plan.description}
                  </div>
                </td>
                <td className="py-3 px-4 text-center">
                  <div className="text-white font-montserrat text-sm">
                    {asistencia.plan.class} / {asistencia.assistance}
                  </div>
                </td>

                <td className="py-3 px-4 text-center">
                  <div className="flex space-x-1 justify-center">
                    {asistencia.status === "activo" && (
                      <button
                        // onClick={() =>
                        //   handleEstadoChange(asistencia.id, "asistio")
                        // }
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
                    <button
                      // onClick={() => openAsistenciaModal(asistencia)}
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
  );
};

export default TableAssistComponent;
