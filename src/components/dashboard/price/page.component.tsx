"use client";

import { FC, useEffect, useState } from "react";
import PriceCard from "./priceCard.component";
import ConfirmModal from "./confirmModal.component";
import { IPrice, IPriceData } from "@/type";
import {
  createPrice,
  deletePrice,
  getPrices,
  patchPrice,
  putPrice,
} from "@/lib/db/actions/price.action";
import { motion } from "framer-motion";
import PriceFormModal from "./priceFormModal.component";

const PricePageComponent: FC = () => {
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

export default PricePageComponent;
