"use client";
import { FC, useState } from "react";
import { motion } from "framer-motion";

interface Student {
  id: number;
  nombre: string;
  apellido: string;
  plan: string;
  montoCuota: string;
  fechaVencimiento: string;
  estado: "Pagado" | "Pendiente" | "Atrasado";
}

interface StudentPaymentProps {
  initialStudents?: Student[];
  delay?: number;
}

const StudentPaymentSection: FC<StudentPaymentProps> = ({
  initialStudents = [],
  delay = 0.6,
}) => {
  const defaultStudents: Student[] = [
    {
      id: 1,
      nombre: "Carlos",
      apellido: "Rodríguez",
      plan: "Mensual Premium",
      montoCuota: "$85,000",
      fechaVencimiento: "20 Jun 2025",
      estado: "Pendiente",
    },
    {
      id: 2,
      nombre: "Ana",
      apellido: "Martínez",
      plan: "Trimestral",
      montoCuota: "$210,000",
      fechaVencimiento: "05 Jul 2025",
      estado: "Pendiente",
    },
    {
      id: 3,
      nombre: "Juan",
      apellido: "Pérez",
      plan: "Mensual Básico",
      montoCuota: "$65,000",
      fechaVencimiento: "18 Jun 2025",
      estado: "Atrasado",
    },
    {
      id: 4,
      nombre: "María",
      apellido: "González",
      plan: "Anual",
      montoCuota: "$650,000",
      fechaVencimiento: "30 Jun 2025",
      estado: "Pagado",
    },
    {
      id: 5,
      nombre: "Diego",
      apellido: "López",
      plan: "Pack 10 clases",
      montoCuota: "$120,000",
      fechaVencimiento: "15 Jun 2025",
      estado: "Atrasado",
    },
  ];

  const [students, setStudents] = useState<Student[]>(
    initialStudents.length > 0 ? initialStudents : defaultStudents
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState<{
    id: number;
    show: boolean;
  } | null>(null);

  const handlePaymentToggle = (studentId: number) => {
    setStudents(
      students.map((student) => {
        if (student.id === studentId) {
          const newStatus =
            student.estado === "Pagado" ? "Pendiente" : "Pagado";

          if (newStatus === "Pagado") {
            setShowSuccessMessage({ id: studentId, show: true });
            setTimeout(() => setShowSuccessMessage(null), 3000);
          }

          return {
            ...student,
            estado: newStatus,
          };
        }
        return student;
      })
    );
  };

  const filteredStudents = students.filter(
    (student) =>
      student.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.apellido.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-gradient-to-br from-accent-dark/80 to-[#1a1a1a] rounded-xl border border-accent-dark/30 shadow-xl backdrop-blur-sm p-4 sm:p-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
        <h2 className="font-bebas text-xl text-white">
          GESTIÓN DE PAGOS DE ALUMNOS
        </h2>
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
                Plan
              </th>
              <th className="pb-2 font-medium text-accent-medium text-sm">
                Monto
              </th>
              <th className="pb-2 font-medium text-accent-medium text-sm">
                Vencimiento
              </th>
              <th className="pb-2 font-medium text-accent-medium text-sm">
                Estado
              </th>
              <th className="pb-2 font-medium text-accent-medium text-sm">
                Acción
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-accent-dark/20">
            {filteredStudents.map((student) => (
              <tr key={student.id} className="hover:bg-accent-dark/10 relative">
                <td className="py-3 text-white font-medium">
                  {student.nombre} {student.apellido}
                </td>
                <td className="py-3 text-accent-medium">{student.plan}</td>
                <td className="py-3 text-white">{student.montoCuota}</td>
                <td className="py-3 text-accent-medium">
                  {student.fechaVencimiento}
                </td>
                <td className="py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      student.estado === "Pagado"
                        ? "bg-emerald-500/20 text-emerald-300"
                        : student.estado === "Pendiente"
                        ? "bg-amber-500/20 text-amber-300"
                        : "bg-rose-500/20 text-rose-300"
                    }`}
                  >
                    {student.estado}
                  </span>
                </td>
                <td className="py-3">
                  <button
                    onClick={() => handlePaymentToggle(student.id)}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                      student.estado === "Pagado"
                        ? "bg-gray-600/30 text-gray-300 hover:bg-gray-600/50"
                        : "bg-primary/80 text-white hover:bg-primary"
                    }`}
                  >
                    {student.estado === "Pagado"
                      ? "Marcar No Pagado"
                      : "Registrar Pago"}
                  </button>

                  {/* Success message */}
                  {showSuccessMessage?.id === student.id &&
                    showSuccessMessage.show && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="absolute -top-2 left-0 right-0 mx-auto w-max bg-emerald-500/90 text-white text-xs font-medium py-1 px-3 rounded-md shadow-lg"
                      >
                        ¡Pago registrado con éxito!
                      </motion.div>
                    )}
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

export default StudentPaymentSection;
