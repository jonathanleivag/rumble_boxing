"use client";

import { createClass, updateClass } from "@/lib/db/actions/class.action";
import {
  addClass,
  editClass,
  selectEditClass,
} from "@/lib/redux/features/class/class.slice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  ClassDocumentData,
  ClassFormData,
  ModalCreateClassComponentProps,
} from "@/type";
import { motion } from "framer-motion";
import { ChangeEvent, FC, FormEvent, useState } from "react";
import toast from "react-hot-toast";

const ModalCreateClassComponent: FC<ModalCreateClassComponentProps> = ({
  setIsCreateModalOpen,
  setFormData,
  formData,
  formErrors,
  setFormErrors,
}) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const edit = useAppSelector((state) => state.class.edit);

  const validateForm = (): boolean => {
    const errors: Partial<Record<keyof ClassFormData, string>> = {};
    if (!formData.name.trim()) errors.name = "El nombre es obligatorio";
    if (!formData.description.trim())
      errors.description = "La descripción es obligatoria";
    if (!formData.duration) errors.duration = "La duración es obligatoria";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    let parsedValue: string | number = value;

    if (type === "number") {
      parsedValue = value === "" ? "" : Number(value);
    }

    setFormData((prev) => {
      const newData = {
        ...prev,
        [name]: parsedValue,
      };
      return newData;
    });

    if (formErrors[name as keyof ClassFormData]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Por favor completa todos los campos correctamente");
      return;
    }

    setIsSubmitting(true);

    try {
      const className = formData.name.toUpperCase().trim();
      const classTime = formData.duration;

      let data: ClassDocumentData;

      if (edit) {
        data = await updateClass(edit._id.toString(), {
          name: className,
          duration: classTime,
          difficulty: formData.difficulty,
          description: formData.description,
        });

        dispatch(editClass(data));
      } else {
        data = await createClass({
          name: className,
          duration: classTime,
          difficulty: formData.difficulty,
          description: formData.description,
        });

        dispatch(addClass(data));
      }

      toast.success(
        <div className="font-montserrat">
          <strong className="block font-oswald text-white">
            {edit ? "¡Clase Actualizada!" : "¡Clase creada!"}
          </strong>
          <span className="text-xs">
            {className} - {""} {classTime}
          </span>
        </div>
      );

      setIsCreateModalOpen(false);
      setFormData({
        name: "",
        duration: 0,
        description: "",
        difficulty: "essential",
      });
    } catch (e) {
      if (e instanceof Error) {
        console.error("Error al crear la clase:", e);
        toast.error(
          <div className="font-montserrat">
            <strong className="block font-oswald text-white">
              Error al {edit ? "Actualizar la clase" : "crear la clase"}
            </strong>
            <span className="text-xs">
              {e.message || "Por favor, intenta nuevamente más tarde."}
            </span>
          </div>
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditClass = () => {
    setIsCreateModalOpen(false);
    if (edit) {
      setFormData({
        name: "",
        duration: 0,
        description: "",
        difficulty: "essential",
      });
      dispatch(selectEditClass(false));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#1a1a1a] rounded-xl border border-accent-dark/30 p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="font-oswald text-white text-2xl">
              {edit ? `Editar ${edit.name}` : "Crear Nueva Clase"}
            </h2>
          </div>
          <button
            onClick={handleEditClass}
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

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-accent-medium font-montserrat text-xs mb-1">
                Nombre de la Clase
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full bg-accent-dark/40 rounded-lg border ${
                  formErrors.name ? "border-red-500" : "border-accent-dark/40"
                } text-white p-2 font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary/50`}
                placeholder="Ej: Boxeo Básico"
              />
              {formErrors.name && (
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
                  {formErrors.name}
                </p>
              )}
            </div>

            <div>
              <label className="block text-accent-medium font-montserrat text-xs mb-1">
                Duración
              </label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                className={`${
                  formErrors.name ? "border-red-500" : "border-accent-dark/40"
                } w-full bg-accent-dark/40 rounded-lg border border-accent-dark/40 text-white p-2 font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary/50`}
                placeholder="Ej: 60 minutos"
              />
              {formErrors.duration && (
                <p className="text-red-500 text-xs mt-1 flex flex-row items-center">
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
                  {formErrors.duration}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-accent-medium font-montserrat text-xs mb-1">
              Dificultad
            </label>
            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleInputChange}
              required
              className="w-full bg-accent-dark/40 border border-accent-dark/50 rounded-md p-2 text-white focus:border-primary outline-none"
            >
              <option value="essential">Básico</option>
              <option value="intermediate">Intermedio</option>
              <option value="advanced">Avanzado</option>
            </select>
          </div>

          <div>
            <label className="block text-accent-medium font-montserrat text-xs mb-1">
              Descripción
            </label>
            <div className="relative">
              <textarea
                className={`w-full bg-accent-dark/40 rounded-lg border ${
                  formErrors.description
                    ? "border-red-500"
                    : "border-accent-dark/40"
                } text-white p-2 font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[80px]`}
                placeholder="Ej: Técnica y fundamentos del boxeo para principiantes"
                value={formData.description}
                onChange={handleInputChange}
                name="description"
                maxLength={200}
              ></textarea>
              <div className="absolute bottom-2 right-2 text-xs text-accent-medium">
                {formData.description.length}/200
              </div>
            </div>
            {formErrors.description && (
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
                {formErrors.description}
              </p>
            )}
          </div>
          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-accent-dark/30">
            <button
              type="button"
              onClick={handleEditClass}
              className="cursor-pointer bg-accent-dark/60 hover:bg-accent-dark/80 text-white py-2 px-4 rounded-md text-sm font-oswald uppercase tracking-wider transition-all duration-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`cursor-pointer ${
                isSubmitting
                  ? "bg-primary/70 cursor-not-allowed"
                  : "bg-primary hover:bg-primary-dark"
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
                  <span> {edit ? "Editando" : "Creando"} clase...</span>
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
                  <span>{edit ? "Editar" : "Crear"} Clase</span>
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ModalCreateClassComponent;
