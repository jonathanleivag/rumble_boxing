"use client";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { motion } from "framer-motion";

export interface Plan {
  id: number;
  nombre: string;
  precio: string;
  clases: number;
  duracion: string;
}

export interface Student {
  id: number;
  nombre: string;
  apellido: string;
  planActual: string;
  fechaInicio: string;
  fechaFin: string;
}

interface ChangePlanProps {
  delay?: number;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  setSelectedStudent: Dispatch<SetStateAction<Student | null>>;
}

export const students: Student[] = [
  {
    id: 1,
    nombre: "Carlos",
    apellido: "Rodríguez",
    planActual: "Mensual Premium",
    fechaInicio: "01 Jun 2025",
    fechaFin: "01 Jul 2025",
  },
  {
    id: 2,
    nombre: "Ana",
    apellido: "Martínez",
    planActual: "Trimestral",
    fechaInicio: "15 Abr 2025",
    fechaFin: "15 Jul 2025",
  },
  {
    id: 3,
    nombre: "Juan",
    apellido: "Pérez",
    planActual: "Mensual Básico",
    fechaInicio: "20 May 2025",
    fechaFin: "20 Jun 2025",
  },
  {
    id: 4,
    nombre: "María",
    apellido: "González",
    planActual: "Anual",
    fechaInicio: "10 Ene 2025",
    fechaFin: "10 Ene 2026",
  },
  {
    id: 5,
    nombre: "Diego",
    apellido: "López",
    planActual: "Pack 10 clases",
    fechaInicio: "05 Jun 2025",
    fechaFin: "05 Sep 2025",
  },
];

const ChangePlanSection: FC<ChangePlanProps> = ({
  delay = 0.7,
  setSelectedStudent,
  setShowModal,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStudents = students.filter(
    (student) =>
      (student.nombre + " " + student.apellido)
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      student.planActual.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-gradient-to-br from-accent-dark/80 to-[#1a1a1a] rounded-xl border border-accent-dark/30 shadow-xl backdrop-blur-sm p-4 sm:p-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
        <h2 className="font-bebas text-xl text-white">CAMBIO DE PLAN</h2>
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Buscar alumno..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-2 px-3 bg-accent-dark/40 border border-accent-dark/50 rounded-md text-white placeholder-accent-medium/70 focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-accent-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-accent-dark/30 text-left">
              <th className="pb-2 font-medium text-accent-medium text-sm">
                Nombre
              </th>
              <th className="pb-2 font-medium text-accent-medium text-sm">
                Plan Actual
              </th>
              <th className="pb-2 font-medium text-accent-medium text-sm">
                Fecha Inicio
              </th>
              <th className="pb-2 font-medium text-accent-medium text-sm">
                Fecha Fin
              </th>
              <th className="pb-2 font-medium text-accent-medium text-sm">
                Acción
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-accent-dark/20">
            {filteredStudents.map((student) => (
              <tr key={student.id} className="hover:bg-accent-dark/10">
                <td className="py-3 text-white font-medium">
                  {student.nombre} {student.apellido}
                </td>
                <td className="py-3 text-accent-medium">
                  {student.planActual}
                </td>
                <td className="py-3 text-white">{student.fechaInicio}</td>
                <td className="py-3 text-accent-medium">{student.fechaFin}</td>
                <td className="py-3">
                  <button
                    onClick={() => {
                      setSelectedStudent(student);
                      setShowModal(true);
                    }}
                    className="px-3 py-1.5 rounded-md text-xs font-medium transition-colors bg-primary/80 text-white hover:bg-primary"
                  >
                    Cambiar Plan
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-between items-center border-t border-accent-dark/30 pt-4">
        <div className="text-accent-medium text-sm">
          Mostrando {filteredStudents.length} de {students.length} alumnos
        </div>
      </div>
    </motion.div>
  );
};

export default ChangePlanSection;
