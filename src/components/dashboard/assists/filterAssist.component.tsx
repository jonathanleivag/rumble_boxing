"use client";

import { useAppSelector } from "@/lib/redux/hooks";
import { FC } from "react";

const FilterAssistComponent: FC = () => {
  const classes = useAppSelector((state) => state.class.class);
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
          <div className="relative">
            <input
              id="search"
              type="text"
              placeholder="Nombre o clase"
              // value={searchTerm}
              // onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-accent-dark/40 rounded-lg border border-accent-dark/40 text-white p-2 pl-10 font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 text-accent-medium absolute left-3 top-1/2 transform -translate-y-1/2"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
        </div>

        <div>
          <label
            htmlFor="filterClase"
            className="block text-accent-medium font-montserrat text-xs mb-1"
          >
            Clase
          </label>
          <select
            id="filterClase"
            // value={filterClase}
            // onChange={(e) => setFilterClase(e.target.value)}
            className="w-full bg-accent-dark/40 rounded-lg border border-accent-dark/40 text-white p-2 font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="">Todas las clases</option>
            {classes.map((clase) => (
              <option key={clase._id.toString()} value={clase._id.toString()}>
                {clase.name} - {clase.createdAt}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="filterFecha"
            className="block text-accent-medium font-montserrat text-xs mb-1"
          >
            Fecha
          </label>
          <select
            id="filterFecha"
            // value={filterFecha}
            // onChange={(e) => setFilterFecha(e.target.value)}
            className="w-full bg-accent-dark/40 rounded-lg border border-accent-dark/40 text-white p-2 font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="">Todas las fechas</option>
            {/* {Array.from(new Set(asistencias.map((a) => a.fecha))).map(
              (fecha) => (
                <option key={fecha} value={fecha}>
                  {fecha}
                </option>
              )
            )} */}
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
            // value={filterEstado}
            // onChange={(e) => setFilterEstado(e.target.value)}
            className="w-full bg-accent-dark/40 rounded-lg border border-accent-dark/40 text-white p-2 font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="">Todos los estados</option>
            <option value="asistio">Asistió</option>
            <option value="pendiente">Pendiente</option>
            <option value="no-asistio">No asistió</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterAssistComponent;
