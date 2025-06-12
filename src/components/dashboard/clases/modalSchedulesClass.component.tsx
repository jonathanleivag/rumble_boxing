'use client";';

import { ModalSchedulesClassComponentProps } from "@/type";
import { motion } from "framer-motion";
import { ChangeEvent, FC, FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useAppSelector } from "@/lib/redux/hooks";

interface ClassSchedule {
  startTime: string;
  endTime: string;
}

interface GroupFormData {
  name: string;
  description: string;
  color: string;
  selectedClasses: string[];
  classSchedules: Record<string, ClassSchedule>; // Mapa de ID de clase a horario
}

interface ClassWithSchedule {
  classId: string;
  startTime: string;
  endTime: string;
}

interface ClassGroup {
  id: string;
  name: string;
  description: string;
  color: string;
  classes: ClassWithSchedule[];
}

const ModalSchedulesClassComponent: FC<ModalSchedulesClassComponentProps> = ({
  setIsGroupModalOpen,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [groupFormData, setGroupFormData] = useState<GroupFormData>({
    name: "",
    description: "",
    color: "#E02020", // Rojo por defecto (primary)
    selectedClasses: [],
    classSchedules: {},
  });

  // Obtener las clases del estado global
  const classData = useAppSelector((state) => state.class.class);

  const [groupFormErrors, setGroupFormErrors] = useState<
    Partial<Record<keyof GroupFormData, string>>
  >({});

  const handleGroupInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setGroupFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Limpiar el error de este campo si existe
    if (groupFormErrors[name as keyof GroupFormData]) {
      setGroupFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateGroupForm = (): boolean => {
    const errors: Partial<Record<keyof GroupFormData, string>> = {};

    // Validar campos obligatorios
    if (!groupFormData.name.trim()) errors.name = "El nombre es obligatorio";

    if (!groupFormData.description.trim())
      errors.description = "La descripción es obligatoria";

    if (!groupFormData.color.trim() || !groupFormData.color.startsWith("#"))
      errors.color = "Selecciona un color válido";

    // Validar selección de al menos una clase
    if (groupFormData.selectedClasses.length === 0)
      errors.selectedClasses = "Debes seleccionar al menos una clase";

    setGroupFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleGroupSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateGroupForm()) {
      toast.error("Por favor completa todos los campos correctamente");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulación de envío a API (aquí se conectaría con la API real)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Generar un nuevo ID único
      const newGroupId = `group-${Date.now()}`;

      // Convertir los horarios de clases al formato deseado
      const classesWithSchedules: ClassWithSchedule[] =
        groupFormData.selectedClasses.map((classId) => ({
          classId,
          startTime:
            groupFormData.classSchedules[classId]?.startTime || "08:00",
          endTime: groupFormData.classSchedules[classId]?.endTime || "09:00",
        }));

      // Crear el nuevo grupo
      const newGroup: ClassGroup = {
        id: newGroupId,
        name: groupFormData.name,
        description: groupFormData.description,
        color: groupFormData.color,
        classes: classesWithSchedules,
      };

      // Actualizar la lista de grupos
      console.log(`Agregando grupo: ${newGroup.name}`);
      console.log("Detalles del grupo:", newGroup);
      console.log(classesWithSchedules);

      // Éxito
      toast.success(
        <div className="font-montserrat">
          <strong className="block font-oswald text-white">
            ¡Grupo creado!
          </strong>
          <span className="text-xs">{groupFormData.name}</span>
        </div>
      );

      // Cerrar modal y limpiar formulario
      setIsGroupModalOpen(false);
      setGroupFormData({
        name: "",
        description: "",
        color: "#E02020",
        selectedClasses: [],
        classSchedules: {},
      });
    } catch (e) {
      // Error
      console.error("Error al crear el grupo:", e);
      toast.error(
        <div className="font-montserrat">
          <strong className="block font-oswald text-white">
            Error al crear el grupo
          </strong>
          <span className="text-xs">
            Verifica tu conexión e intenta nuevamente
          </span>
        </div>
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#1a1a1a] rounded-xl border border-accent-dark/30 p-6 w-full max-w-xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="font-oswald text-white text-2xl">
              Crear Nuevo Grupo de Clases
            </h2>
            <p className="text-accent-medium font-montserrat text-xs mt-1">
              Los grupos te permiten organizar tus clases por categorías o
              propósitos
            </p>
          </div>
          <button
            onClick={() => setIsGroupModalOpen(false)}
            className="cursor-pointer text-accent-medium hover:text-white transition-colors p-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form className="space-y-6" onSubmit={handleGroupSubmit}>
          <div>
            <label className="block text-accent-medium font-montserrat text-xs mb-1">
              Nombre del Grupo
            </label>
            <input
              type="text"
              name="name"
              value={groupFormData.name}
              onChange={handleGroupInputChange}
              className={`w-full bg-accent-dark/40 rounded-lg border ${
                groupFormErrors.name
                  ? "border-red-500"
                  : "border-accent-dark/40"
              } text-white p-2 font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary/50`}
              placeholder="Ej: Entrenamiento Regular"
            />
            {groupFormErrors.name && (
              <p className="text-red-500 text-xs mt-1 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-3 h-3 mr-1"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                    clipRule="evenodd"
                  />
                </svg>
                {groupFormErrors.name}
              </p>
            )}
          </div>

          <div>
            <label className="block text-accent-medium font-montserrat text-xs mb-1">
              Descripción
            </label>
            <textarea
              name="description"
              value={groupFormData.description}
              onChange={handleGroupInputChange}
              className={`w-full bg-accent-dark/40 rounded-lg border ${
                groupFormErrors.description
                  ? "border-red-500"
                  : "border-accent-dark/40"
              } text-white p-2 font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[80px]`}
              placeholder="Ej: Clases regulares de la semana"
              maxLength={100}
            ></textarea>
            <div className="text-xs text-accent-medium text-right mt-1">
              {groupFormData.description.length}/100
            </div>
            {groupFormErrors.description && (
              <p className="text-red-500 text-xs mt-1 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-3 h-3 mr-1"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                    clipRule="evenodd"
                  />
                </svg>
                {groupFormErrors.description}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-accent-medium font-montserrat text-xs mb-1">
              Selecciona las Clases
            </label>
            <div className="bg-accent-dark/20 p-4 rounded-lg border border-accent-dark/30 max-h-48 overflow-y-auto">
              {classData && classData.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {classData.map((classItem) => (
                    <div
                      key={classItem._id.toString()}
                      className={`p-3 rounded-lg transition-all duration-200 flex items-center gap-2 ${
                        groupFormData.selectedClasses.includes(
                          classItem._id.toString()
                        )
                          ? "bg-primary/20 border border-primary/30"
                          : "bg-accent-dark/40 border border-accent-dark/30 hover:bg-accent-dark/60"
                      }`}
                    >
                      <input
                        type="checkbox"
                        id={`class-${classItem._id.toString()}`}
                        className="w-4 h-4 accent-primary"
                        checked={groupFormData.selectedClasses.includes(
                          classItem._id.toString()
                        )}
                        onChange={(e) => {
                          const classId = classItem._id.toString();
                          if (e.target.checked) {
                            // Cuando se selecciona una clase, inicializar su horario con valores por defecto
                            setGroupFormData({
                              ...groupFormData,
                              selectedClasses: [
                                ...groupFormData.selectedClasses,
                                classId,
                              ],
                              classSchedules: {
                                ...groupFormData.classSchedules,
                                [classId]: {
                                  startTime: "08:00", // Hora de inicio por defecto
                                  endTime: "09:00", // Hora de fin por defecto
                                },
                              },
                            });
                          } else {
                            // Cuando se deselecciona una clase, eliminar su horario
                            const updatedSchedules = {
                              ...groupFormData.classSchedules,
                            };
                            delete updatedSchedules[classId];

                            setGroupFormData({
                              ...groupFormData,
                              selectedClasses:
                                groupFormData.selectedClasses.filter(
                                  (id) => id !== classId
                                ),
                              classSchedules: updatedSchedules,
                            });
                          }
                        }}
                      />
                      <label
                        htmlFor={`class-${classItem._id.toString()}`}
                        className="flex-grow cursor-pointer"
                      >
                        <span className="font-oswald text-white block text-sm">
                          {classItem.name}
                        </span>
                        <span className="text-accent-medium text-xs">
                          {classItem.duration} min -{" "}
                          {classItem.difficulty === "essential"
                            ? "Básico"
                            : classItem.difficulty === "intermediate"
                            ? "Intermedio"
                            : "Avanzado"}
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-accent-medium py-4">
                  No hay clases disponibles. Por favor, crea clases primero.
                </p>
              )}
            </div>
            {groupFormErrors.selectedClasses ? (
              <p className="text-red-500 text-xs mt-1 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-3 h-3 mr-1"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                    clipRule="evenodd"
                  />
                </svg>
                {groupFormErrors.selectedClasses}
              </p>
            ) : (
              <p className="text-xs text-accent-medium mt-1 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-3 h-3 mr-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                  />
                </svg>
                Selecciona las clases que pertenecerán a este grupo
              </p>
            )}
          </div>

          <div>
            <label className="block text-accent-medium font-montserrat text-xs mb-1">
              Color del Grupo
            </label>
            <div className="grid grid-cols-4 gap-4 mb-4">
              {[
                "#E02020",
                "#F97316",
                "#6366F1",
                "#10B981",
                "#8B5CF6",
                "#EC4899",
                "#FBBF24",
                "#34D399",
              ].map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setGroupFormData({ ...groupFormData, color })}
                  className={`cursor-pointer w-full h-12 rounded-md border transition-all ${
                    groupFormData.color === color
                      ? "border-white shadow-lg scale-110"
                      : "border-accent-dark/30 opacity-70 hover:opacity-100"
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {/* Vista previa del grupo */}
          {groupFormData.name && (
            <div className="mt-4 p-4 bg-accent-dark/20 rounded-lg border border-accent-dark/30">
              <h3 className="font-oswald text-white text-sm mb-2 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 h-4 mr-1 text-primary"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                VISTA PREVIA
              </h3>
              <div className="rounded-lg overflow-hidden">
                <div
                  className="p-3 border-b border-accent-dark/30"
                  style={{ background: `${groupFormData.color}1a` }}
                >
                  <h3 className="font-oswald text-white text-lg text-center">
                    {groupFormData.name.toUpperCase()}
                  </h3>
                  <p className="text-center text-white/70 font-montserrat text-xs mt-1">
                    {groupFormData.description || "Sin descripción"}
                  </p>
                </div>
                <div className="p-3 bg-accent-dark/40">
                  {groupFormData.selectedClasses.length > 0 ? (
                    <div className="space-y-2">
                      {groupFormData.selectedClasses.map((selectedClassId) => {
                        const selectedClass = classData.find(
                          (c) => c._id.toString() === selectedClassId
                        );
                        return selectedClass ? (
                          <div
                            key={selectedClass._id.toString()}
                            className="flex flex-col py-2 px-3 bg-accent-dark/30 rounded-md border border-accent-dark/60"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <span className="text-white font-oswald text-sm block">
                                  {selectedClass.name}
                                </span>
                                <span className="text-accent-medium text-xs">
                                  {selectedClass.duration} min
                                </span>
                              </div>
                              <span
                                className={`text-xs px-2 py-1 rounded-full ${
                                  selectedClass.difficulty === "essential"
                                    ? "bg-green-500/30 text-green-400"
                                    : selectedClass.difficulty ===
                                      "intermediate"
                                    ? "bg-yellow-500/30 text-yellow-400"
                                    : "bg-red-500/30 text-red-400"
                                }`}
                              >
                                {selectedClass.difficulty === "essential"
                                  ? "Básico"
                                  : selectedClass.difficulty === "intermediate"
                                  ? "Intermedio"
                                  : "Avanzado"}
                              </span>
                            </div>

                            {/* Selección de horario para la clase */}
                            <div className="grid grid-cols-2 gap-2 mt-1 pt-2 border-t border-accent-dark/30">
                              <div>
                                <label className="block text-accent-medium font-montserrat text-xs mb-1">
                                  Hora inicio
                                </label>
                                <input
                                  type="time"
                                  value={
                                    groupFormData.classSchedules[
                                      selectedClass._id.toString()
                                    ]?.startTime || "08:00"
                                  }
                                  onChange={(e) => {
                                    const classId =
                                      selectedClass._id.toString();
                                    setGroupFormData({
                                      ...groupFormData,
                                      classSchedules: {
                                        ...groupFormData.classSchedules,
                                        [classId]: {
                                          ...groupFormData.classSchedules[
                                            classId
                                          ],
                                          startTime: e.target.value,
                                        },
                                      },
                                    });
                                  }}
                                  className="w-full bg-accent-dark/60 border border-accent-dark/50 text-white rounded-md p-1 text-xs font-montserrat focus:outline-none focus:ring-1 focus:ring-primary"
                                />
                              </div>
                              <div>
                                <label className="block text-accent-medium font-montserrat text-xs mb-1">
                                  Hora fin
                                </label>
                                <input
                                  type="time"
                                  value={
                                    groupFormData.classSchedules[
                                      selectedClass._id.toString()
                                    ]?.endTime || "09:00"
                                  }
                                  onChange={(e) => {
                                    const classId =
                                      selectedClass._id.toString();
                                    setGroupFormData({
                                      ...groupFormData,
                                      classSchedules: {
                                        ...groupFormData.classSchedules,
                                        [classId]: {
                                          ...groupFormData.classSchedules[
                                            classId
                                          ],
                                          endTime: e.target.value,
                                        },
                                      },
                                    });
                                  }}
                                  className="w-full bg-accent-dark/60 border border-accent-dark/50 text-white rounded-md p-1 text-xs font-montserrat focus:outline-none focus:ring-1 focus:ring-primary"
                                />
                              </div>
                            </div>
                          </div>
                        ) : null;
                      })}
                    </div>
                  ) : (
                    <p className="text-white/50 font-montserrat text-xs text-center">
                      No has seleccionado clases para este grupo
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-accent-dark/30">
            <button
              type="button"
              onClick={() => setIsGroupModalOpen(false)}
              className="cursor-pointer bg-accent-dark/60 hover:bg-accent-dark/80 text-white py-2 px-4 rounded-md text-sm font-oswald uppercase tracking-wider transition-all duration-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`cursor-pointer ${
                isSubmitting
                  ? "bg-secondary/70 cursor-not-allowed"
                  : "bg-secondary hover:bg-secondary/80"
              } text-white py-2 px-4 rounded-md text-sm font-oswald uppercase tracking-wider transition-all duration-300 flex items-center justify-center min-w-[140px]`}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Creando grupo...</span>
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-4 h-4 mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                  <span>Crear Grupo</span>
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ModalSchedulesClassComponent;
