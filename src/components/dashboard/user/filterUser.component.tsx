'use client";';

import { FilterUserComponentProps } from "@/type";
import { FC, useEffect, useState } from "react";

const FilterUserComponent: FC<FilterUserComponentProps> = ({
  setCurrentPage,
  planes,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPlan, setFilterPlan] = useState("");
  const [filterEstado, setFilterEstado] = useState("");
  const [sortBy, setSortBy] = useState("nombre");

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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full bg-accent-dark/40 rounded-lg border border-accent-dark/40 text-white p-2 font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="nombre">Nombre</option>
            <option value="fechaRegistro">Fecha de registro</option>
            <option value="asistencias">Asistencias</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterUserComponent;
