"use client";

import { FilterUserComponentProps } from "@/type";
import { FC, useEffect, useState, useCallback } from "react";

const FilterUserComponent: FC<FilterUserComponentProps> = ({
  setCurrentPage,
  planes,
  searchTerm,
  setSearchTerm,
  setFilterPlan,
  filterPlan,
  setFilterEstado,
  filterEstado,
  setSortBy,
  sortBy,
}) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  const debouncedSearch = useCallback(
    (value: string) => {
      const timer = setTimeout(() => {
        setSearchTerm(value);
      }, 500);

      return () => {
        clearTimeout(timer);
      };
    },
    [setSearchTerm]
  );

  useEffect(() => {
    const cleanup = debouncedSearch(localSearchTerm);
    return cleanup;
  }, [localSearchTerm, debouncedSearch]);

  useEffect(() => {
    if (searchTerm || filterPlan || filterEstado) {
      setCurrentPage(1);
    }
  }, [searchTerm, filterPlan, filterEstado, setCurrentPage]);

  return (
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
            value={localSearchTerm}
            onChange={(e) => setLocalSearchTerm(e.target.value)}
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
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="w-full bg-accent-dark/40 rounded-lg border border-accent-dark/40 text-white p-2 font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="createdAt">fecha de creación</option>
            <option value="name">Nombre</option>
            <option value="createDate">Fecha de ingreso</option>
            <option value="assistance">Asistencias</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterUserComponent;
