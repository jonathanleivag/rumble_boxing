"use client";

import { IPrice, PriceFormModalProps } from "@/type";
import { AnimatePresence, motion } from "framer-motion";
import { FC, useEffect, useState } from "react";

const PriceFormModal: FC<PriceFormModalProps> = ({
  isOpen,
  onClose,
  initialData,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<IPrice>({
    name: "",
    type: "mensual",
    price: 0,
    class: 12,
    description: "",
    characteristics: [""],
    active: true,
    isPopular: false,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        characteristics: initialData.characteristics || [""],
      });
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "type" && value === "anual") {
      setFormData((prev) => ({
        ...prev,
        price: 0,
        class: "ilimitado",
      }));
    }

    if (name === "type" && value === "mensual") {
      setFormData((prev) => ({
        ...prev,
        price: 0,
        class: 12,
      }));
    }
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericValue = value === "" ? "" : Number(value);
    setFormData((prev) => ({
      ...prev,
      [name]: numericValue,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleCharacteristicsChange = (index: number, value: string) => {
    const newCharacteristics = [...formData.characteristics];
    newCharacteristics[index] = value;
    setFormData((prev) => ({
      ...prev,
      characteristics: newCharacteristics,
    }));
  };

  const addCharacteristics = () => {
    setFormData((prev) => ({
      ...prev,
      characteristics: [...prev.characteristics, ""],
    }));
  };

  const removeCharacteristics = (index: number) => {
    const newCharacteristics = [...formData.characteristics];
    newCharacteristics.splice(index, 1);
    setFormData((prev) => ({
      ...prev,
      characteristics: newCharacteristics,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanData = {
      ...formData,
      characteristics: formData.characteristics.filter(
        (c: string) => c.trim() !== ""
      ),
    };
    onSubmit(cleanData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-gradient-to-br from-[#101010] to-[#0a0a0a] border border-accent-dark/40 rounded-xl shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-white text-2xl font-oswald">
              {initialData?.name ? "Editar Plan" : "Nuevo Plan"}
            </h2>
            <button
              onClick={onClose}
              className="text-accent-medium hover:text-white cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-accent-medium mb-1 font-montserrat text-sm">
                  Nombre
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#0f0f0f] border border-accent-dark/50 rounded-md p-2 text-white focus:border-primary outline-none"
                />
              </div>

              <div>
                <label className="block text-accent-medium mb-1 font-montserrat text-sm">
                  Tipo
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#0f0f0f] border border-accent-dark/50 rounded-md p-2 text-white focus:border-primary outline-none"
                >
                  <option value="mensual">Mensual</option>
                  <option value="anual">Anual</option>
                  <option value="personalizado">Personalizado</option>
                </select>
              </div>
              {formData.type !== "personalizado" && (
                <>
                  <div>
                    <label className="block text-accent-medium mb-1 font-montserrat text-sm">
                      Precio
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleNumberChange}
                      className="w-full bg-[#0f0f0f] border border-accent-dark/50 rounded-md p-2 text-white focus:border-primary outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-accent-medium mb-1 font-montserrat text-sm">
                      Clases
                    </label>
                    <input
                      type="text"
                      name="class"
                      value={formData.class}
                      onChange={handleChange}
                      required
                      className="w-full bg-[#0f0f0f] border border-accent-dark/50 rounded-md p-2 text-white focus:border-primary outline-none"
                    />
                    <p className="text-xs text-accent-medium mt-1">
                      Puede ser un número o el texto &quot;ilimitado&quot;
                    </p>
                  </div>
                </>
              )}

              <div className="col-span-full">
                <label className="block text-accent-medium mb-1 font-montserrat text-sm">
                  Descripción
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full bg-[#0f0f0f] border border-accent-dark/50 rounded-md p-2 text-white focus:border-primary outline-none"
                ></textarea>
              </div>

              <div className="col-span-full">
                <label className="block text-accent-medium mb-1 font-montserrat text-sm">
                  Características
                </label>
                <div className="space-y-2">
                  {formData.characteristics.map(
                    (characteristics: string, index: number) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={characteristics}
                          onChange={(e) =>
                            handleCharacteristicsChange(index, e.target.value)
                          }
                          className="flex-1 bg-[#0f0f0f] border border-accent-dark/50 rounded-md p-2 text-white focus:border-primary outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => removeCharacteristics(index)}
                          className="bg-red-900/20 hover:bg-red-900/40 text-red-500 p-2 rounded-md cursor-pointer"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    )
                  )}
                  <button
                    type="button"
                    onClick={addCharacteristics}
                    className="bg-primary/20 hover:bg-primary/30 text-primary-light p-2 rounded-md text-sm flex items-center gap-1 cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                    </svg>
                    Añadir característica
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="active"
                    name="active"
                    checked={formData.active}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4 bg-[#0f0f0f] border border-accent-dark/50 rounded text-primary focus:ring-0 focus:ring-offset-0"
                  />
                  <label
                    htmlFor="active"
                    className="ml-2 text-accent-medium font-montserrat text-sm"
                  >
                    Activo
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isPopular"
                    name="isPopular"
                    checked={formData.isPopular}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4 bg-[#0f0f0f] border border-accent-dark/50 rounded text-primary focus:ring-0 focus:ring-offset-0"
                  />
                  <label
                    htmlFor="isPopular"
                    className="ml-2 text-accent-medium font-montserrat text-sm"
                  >
                    Destacado
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="bg-transparent border border-accent-dark/60 hover:border-accent-medium text-accent-medium hover:text-white py-2 px-4 rounded-md text-sm font-oswald uppercase tracking-wider transition-all duration-300 cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-md text-sm font-oswald uppercase tracking-wider transition-all duration-300 cursor-pointer"
              >
                {initialData?.name ? "Actualizar" : "Crear"}
              </button>
            </div>
          </form>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default PriceFormModal;
