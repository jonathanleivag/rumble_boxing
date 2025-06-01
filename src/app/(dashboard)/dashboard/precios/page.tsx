"use client";

import { FC, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IPrice, IPriceData } from "@/type";
import {
  createPrice,
  deletePrice,
  getPrices,
  patchPrice,
  putPrice,
} from "@/lib/db/actions/price.action";

const PriceFormModal: FC<{
  isOpen: boolean;
  onClose: () => void;
  initialData?: IPrice;
  onSubmit: (data: IPrice) => void;
}> = ({ isOpen, onClose, initialData, onSubmit }) => {
  const [formData, setFormData] = useState<IPrice>({
    name: "",
    type: "mensual",
    price: 0,
    class: "",
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
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: Number(value),
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
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-gradient-to-br from-[#101010] to-[#0a0a0a] border border-accent-dark/40 rounded-xl shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-white text-2xl font-oswald">
              {initialData ? "Editar Plan" : "Nuevo Plan"}
            </h2>
            <button
              onClick={onClose}
              className="text-accent-medium hover:text-white"
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

              <div>
                <label className="block text-accent-medium mb-1 font-montserrat text-sm">
                  Precio
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleNumberChange}
                  min="0"
                  required
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
                  Puede ser un número o texto como &quot;Ilimitadas&quot;
                </p>
              </div>

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
                          className="bg-red-900/20 hover:bg-red-900/40 text-red-500 p-2 rounded-md"
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
                    className="bg-primary/20 hover:bg-primary/30 text-primary-light p-2 rounded-md text-sm flex items-center gap-1"
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
                className="bg-transparent border border-accent-dark/60 hover:border-accent-medium text-accent-medium hover:text-white py-2 px-4 rounded-md text-sm font-oswald uppercase tracking-wider transition-all duration-300"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-md text-sm font-oswald uppercase tracking-wider transition-all duration-300"
              >
                {initialData ? "Actualizar" : "Crear"}
              </button>
            </div>
          </form>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const ConfirmModal: FC<{
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}> = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-gradient-to-br from-[#101010] to-[#0a0a0a] border border-accent-dark/40 rounded-xl shadow-xl p-6 w-full max-w-md"
        >
          <h2 className="text-white text-xl font-oswald mb-2">{title}</h2>
          <p className="text-accent-medium font-montserrat mb-6">{message}</p>
          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              className="bg-transparent border border-accent-dark/60 hover:border-accent-medium text-accent-medium hover:text-white py-2 px-4 rounded-md text-sm font-oswald uppercase tracking-wider transition-all duration-300"
            >
              Cancelar
            </button>
            <button
              onClick={onConfirm}
              className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md text-sm font-oswald uppercase tracking-wider transition-all duration-300"
            >
              Confirmar
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const PriceCard: FC<{
  price: IPriceData;
  onEdit: () => void;
  onDelete: () => void;
  onToggleActive: () => void;
  onTogglePopular: () => void;
}> = ({ price, onEdit, onDelete, onToggleActive, onTogglePopular }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`relative bg-gradient-to-br from-[#101010] to-[#050505] border ${
        price.isPopular
          ? "border-primary/50 shadow-[0_0_15px_rgba(234,85,80,0.15)]"
          : "border-accent-dark/30"
      } rounded-xl overflow-hidden`}
    >
      {price.isPopular && (
        <div className="absolute top-0 right-0 bg-primary text-white text-xs py-1 px-2 font-oswald tracking-wider uppercase">
          Popular
        </div>
      )}

      <div className="p-5">
        <div className="flex justify-between items-center mb-4">
          <h3
            className={`font-oswald text-2xl ${
              price.active ? "text-white" : "text-accent-medium"
            }`}
          >
            {price.name}
          </h3>
          <span
            className={`text-xs px-2 py-1 rounded-full font-montserrat ${
              price.active
                ? "bg-green-900/20 text-green-500"
                : "bg-red-900/20 text-red-500"
            }`}
          >
            {price.active ? "Activo" : "Inactivo"}
          </span>
        </div>

        <div
          className={`text-3xl font-oswald mb-2 ${
            price.active ? "text-white" : "text-accent-medium"
          }`}
        >
          ${price.price}{" "}
          <span className="text-accent-medium text-sm font-montserrat">
            {price.type}
          </span>
        </div>

        <div
          className={`mb-4 text-sm ${
            price.active ? "text-accent-light" : "text-accent-medium"
          }`}
        >
          {typeof price.class === "number"
            ? `${price.class} clases`
            : price.class}
        </div>

        <p className="text-accent-medium font-montserrat text-sm mb-4">
          {price.description}
        </p>

        <div className="border-t border-accent-dark/30 pt-3 space-y-2">
          {price.characteristics.map((characteristics, index) => (
            <div
              key={index}
              className="flex items-center gap-2 text-accent-light text-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4 text-primary flex-shrink-0"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
              {characteristics}
            </div>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <button
            onClick={onEdit}
            className="bg-accent-dark/40 hover:bg-accent-dark/60 text-white py-2 px-3 rounded-md text-xs font-oswald uppercase tracking-wider transition-all duration-300 flex items-center gap-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
              <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
            </svg>
            Editar
          </button>
          <button
            onClick={onToggleActive}
            className={`${
              price.active
                ? "bg-red-900/20 hover:bg-red-900/40 text-red-500"
                : "bg-green-900/20 hover:bg-green-900/40 text-green-500"
            } py-2 px-3 rounded-md text-xs font-oswald uppercase tracking-wider transition-all duration-300 flex items-center gap-1`}
          >
            {price.active ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                    clipRule="evenodd"
                  />
                </svg>
                Desactivar
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
                Activar
              </>
            )}
          </button>
          <button
            onClick={onTogglePopular}
            className={`${
              price.isPopular
                ? "bg-purple-900/20 hover:bg-purple-900/40 text-purple-500"
                : "bg-accent-dark/40 hover:bg-accent-dark/60 text-accent-light"
            } py-2 px-3 rounded-md text-xs font-oswald uppercase tracking-wider transition-all duration-300 flex items-center gap-1`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                clipRule="evenodd"
              />
            </svg>
            {price.isPopular ? "Quitar destacado" : "Destacar"}
          </button>
          <button
            onClick={onDelete}
            className="bg-red-900/20 hover:bg-red-900/40 text-red-500 py-2 px-3 rounded-md text-xs font-oswald uppercase tracking-wider transition-all duration-300 flex items-center gap-1"
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
            Eliminar
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// Componente principal de la página
const PreciosPage: FC = () => {
  const [price, setPrice] = useState<IPriceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState<IPriceData | null>(null);
  const [confirmModal, setConfirmModal] = useState({
    show: false,
    id: "",
    title: "",
    message: "",
    action: "" as "delete" | "toggleActive" | "togglePopular",
  });
  const [filterActive, setFilterActive] = useState<string>("todos");
  const [filterType, setFilterType] = useState<string>("todos");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchPrice();
  }, []);

  const fetchPrice = async () => {
    setLoading(true);
    try {
      const data: IPriceData[] = JSON.parse(await getPrices());
      setPrice(data);
    } catch (error) {
      console.error("Error:", error);
      setError("No se pudieron cargar los precios. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const filteredPrecios = price.filter((price) => {
    const matchSearch =
      searchTerm === "" ||
      price.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      price.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchActivo =
      filterActive === "todos" ||
      (filterActive === "activos" && price.active) ||
      (filterActive === "inactivos" && !price.active);

    const matchTipo = filterType === "todos" || price.type === filterType;

    return matchSearch && matchActivo && matchTipo;
  });

  const handleCreatePrice = async (data: IPrice) => {
    try {
      setShowModal(false);
      const dataFetch = await createPrice(data);
      setPrice((prev) => [...prev, dataFetch]);
    } catch (error) {
      console.error("Error:", error);
      setError("No se pudo crear el precio. Intenta de nuevo.");
    }
  };

  const handleUpdatePrice = async (data: IPrice) => {
    if (!selectedPrice?._id) return;

    try {
      const dataFetch = JSON.parse(
        await putPrice(selectedPrice._id.toString(), data)
      );
      setShowModal(false);
      setPrice((prev) =>
        prev.map((price) =>
          price._id === selectedPrice._id ? dataFetch : price
        )
      );
      setSelectedPrice(null);
    } catch (error) {
      console.error("Error:", error);
      setError("No se pudo actualizar el precio. Intenta de nuevo.");
    }
  };

  const handleDeletePrecio = async () => {
    const id = confirmModal.id;
    try {
      const data = await deletePrice(id);
      setPrice((prev) => prev.filter((price) => price._id.toString() !== data));
      setConfirmModal({ ...confirmModal, show: false });
    } catch (error) {
      console.error("Error:", error);
      setError("No se pudo eliminar el precio. Intenta de nuevo.");
    }
  };

  const handleToggleActive = async () => {
    const id = confirmModal.id;
    try {
      await patchPrice(id, "toggleActive");
      await fetchPrice();
      setConfirmModal({ ...confirmModal, show: false });
    } catch (error) {
      console.error("Error:", error);
      setError("No se pudo cambiar el estado del precio. Intenta de nuevo.");
    }
  };

  const handleTogglePopular = async () => {
    const id = confirmModal.id;
    try {
      await patchPrice(id, "togglePopular");
      await fetchPrice();
      setConfirmModal({ ...confirmModal, show: false });
    } catch (error) {
      console.error("Error:", error);
      setError(
        "No se pudo cambiar el estado destacado del precio. Intenta de nuevo."
      );
    }
  };

  const handleConfirmAction = () => {
    switch (confirmModal.action) {
      case "delete":
        handleDeletePrecio();
        break;
      case "toggleActive":
        handleToggleActive();
        break;
      case "togglePopular":
        handleTogglePopular();
        break;
    }
  };

  const openEditModal = (price: IPriceData) => {
    setSelectedPrice(price);
    setShowModal(true);
  };

  const showDeleteConfirm = (price: IPriceData) => {
    setConfirmModal({
      show: true,
      id: price._id.toString(),
      title: "Eliminar Plan",
      message: `¿Estás seguro de que quieres eliminar el plan "${price.name}"? Esta acción no se puede deshacer.`,
      action: "delete",
    });
  };

  const showToggleActiveConfirm = (price: IPriceData) => {
    setConfirmModal({
      show: true,
      id: price._id.toString(),
      title: price.active ? "Desactivar Plan" : "Activar Plan",
      message: price.active
        ? `¿Estás seguro de que quieres desactivar el plan "${price.name}"?`
        : `¿Estás seguro de que quieres activar el plan "${price.name}"?`,
      action: "toggleActive",
    });
  };

  const showTogglePopularConfirm = (price: IPriceData) => {
    setConfirmModal({
      show: true,
      id: price._id.toString(),
      title: price.isPopular ? "Quitar Destacado" : "Destacar Plan",
      message: price.isPopular
        ? `¿Estás seguro de que quieres quitar el destacado al plan "${price.name}"?`
        : `¿Estás seguro de que quieres destacar el plan "${price.name}"? Esto quitará el destacado de cualquier otro plan.`,
      action: "togglePopular",
    });
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-knockout text-white text-4xl">PLANES Y PRECIOS</h1>
        <p className="text-accent-medium font-montserrat mt-2">
          Gestiona los planes de membresía y precios de Rumble Boxing
        </p>
      </motion.div>

      <div className="bg-gradient-to-br from-accent-dark/80 to-[#1a1a1a] rounded-xl border border-accent-dark/30 shadow-xl backdrop-blur-sm p-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar planes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-[#0f0f0f] border border-accent-dark/50 rounded-md py-2 pl-10 pr-4 text-white focus:border-primary outline-none w-full sm:w-64"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 text-accent-medium absolute left-3 top-1/2 transform -translate-y-1/2"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>

            <div className="flex gap-2">
              <select
                value={filterActive}
                onChange={(e) => setFilterActive(e.target.value)}
                className="bg-[#0f0f0f] border border-accent-dark/50 rounded-md py-2 px-4 text-white focus:border-primary outline-none"
              >
                <option value="todos">Todos los estados</option>
                <option value="activos">Solo activos</option>
                <option value="inactivos">Solo inactivos</option>
              </select>

              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="bg-[#0f0f0f] border border-accent-dark/50 rounded-md py-2 px-4 text-white focus:border-primary outline-none"
              >
                <option value="todos">Todos los tipos</option>
                <option value="mensual">Mensual</option>
                <option value="anual">Anual</option>
                <option value="personalizado">Personalizado</option>
              </select>
            </div>
          </div>

          <button
            onClick={() => {
              setSelectedPrice(null);
              setShowModal(true);
            }}
            className="bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-md text-sm font-oswald uppercase tracking-wider transition-all duration-300 flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 mr-2"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Nuevo Plan
          </button>
        </div>
      </div>

      {loading && (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-900/20 border border-red-900/30 text-red-500 p-4 rounded-md">
          {error}
          <button
            onClick={() => {
              setError(null);
              fetchPrice();
            }}
            className="ml-2 underline"
          >
            Reintentar
          </button>
        </div>
      )}

      {!loading && !error && (
        <>
          {filteredPrecios.length === 0 ? (
            <div className="text-center py-10">
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
                <circle cx="12" cy="12" r="10" />
                <line x1="8" y1="12" x2="16" y2="12" />
              </svg>
              <h3 className="text-white text-xl font-oswald mb-2">
                No hay planes disponibles
              </h3>
              <p className="text-accent-medium">
                No se encontraron planes con los filtros seleccionados. Intenta
                con otros filtros o{" "}
                <button
                  onClick={() => {
                    setSelectedPrice(null);
                    setShowModal(true);
                  }}
                  className="text-primary hover:underline"
                >
                  crea un nuevo plan
                </button>
                .
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPrecios.map((price) => (
                <PriceCard
                  key={price._id.toString()}
                  price={price}
                  onEdit={() => openEditModal(price)}
                  onDelete={() => showDeleteConfirm(price)}
                  onToggleActive={() => showToggleActiveConfirm(price)}
                  onTogglePopular={() => showTogglePopularConfirm(price)}
                />
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="bg-gradient-to-br from-[#101010] to-[#050505] border border-accent-dark/30 rounded-xl p-5">
              <h3 className="text-accent-medium font-montserrat text-sm mb-1">
                Total de planes
              </h3>
              <div className="text-white text-3xl font-oswald">
                {price.length}
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#101010] to-[#050505] border border-accent-dark/30 rounded-xl p-5">
              <h3 className="text-accent-medium font-montserrat text-sm mb-1">
                Planes activos
              </h3>
              <div className="text-white text-3xl font-oswald">
                {price.filter((p) => p.active).length}
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#101010] to-[#050505] border border-accent-dark/30 rounded-xl p-5">
              <h3 className="text-accent-medium font-montserrat text-sm mb-1">
                Planes destacados
              </h3>
              <div className="text-white text-3xl font-oswald">
                {price.filter((p) => p.isPopular).length}
              </div>
            </div>
          </div>
        </>
      )}

      <PriceFormModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedPrice(null);
        }}
        initialData={selectedPrice || undefined}
        onSubmit={selectedPrice ? handleUpdatePrice : handleCreatePrice}
      />

      <ConfirmModal
        isOpen={confirmModal.show}
        onClose={() => setConfirmModal({ ...confirmModal, show: false })}
        onConfirm={handleConfirmAction}
        title={confirmModal.title}
        message={confirmModal.message}
      />
    </div>
  );
};

export default PreciosPage;
