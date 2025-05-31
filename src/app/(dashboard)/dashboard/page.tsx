"use client";
import { FC } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const DashboardPage: FC = () => {
  const proximasClases = [
    {
      id: 1,
      nombre: "Boxing Fundamentals",
      instructor: "Alex Rodríguez",
      fecha: "02 Jun",
      hora: "18:00",
      duracion: "60 min",
    },
    {
      id: 2,
      nombre: "HIIT Boxing",
      instructor: "María González",
      fecha: "04 Jun",
      hora: "19:30",
      duracion: "45 min",
    },
    {
      id: 3,
      nombre: "Advanced Techniques",
      instructor: "Carlos Muñoz",
      fecha: "05 Jun",
      hora: "20:15",
      duracion: "60 min",
    },
  ];

  const estadisticas = [
    { titulo: "Clases asistidas", valor: 24, icono: "🥊", color: "bg-primary" },
    {
      titulo: "Calorías quemadas",
      valor: "18.5k",
      icono: "🔥",
      color: "bg-secondary",
    },
    { titulo: "Racha actual", valor: 8, icono: "⚡", color: "bg-accent-dark" },
    {
      titulo: "Nivel",
      valor: "Intermedio",
      icono: "🏆",
      color: "bg-[#2e7d32]",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
        <h1 className="font-bebas text-white text-2xl sm:text-knockout sm:text-4xl mb-1 sm:mb-0 tracking-wider">
          DASHBOARD
        </h1>
        <p className="text-accent-medium font-montserrat text-sm">
          30 de mayo de 2025
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
      >
        {estadisticas.map((stat, index) => (
          <motion.div
            key={stat.titulo}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.1 }}
            className="bg-gradient-to-br from-accent-dark/80 to-[#1a1a1a] rounded-xl p-3 sm:p-5 border border-accent-dark/30 shadow-xl backdrop-blur-sm"
          >
            <div className="flex items-center mb-2 sm:mb-3">
              <div
                className={`w-8 h-8 sm:w-10 sm:h-10 ${stat.color} rounded-lg flex items-center justify-center text-base sm:text-lg`}
              >
                {stat.icono}
              </div>
              <span className="ml-2 sm:ml-3 text-accent-medium font-montserrat text-xs sm:text-sm">
                {stat.titulo}
              </span>
            </div>
            <div className="font-bebas text-xl sm:text-3xl text-white">
              {stat.valor}
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-accent-dark/80 to-[#1a1a1a] rounded-xl border border-accent-dark/30 shadow-xl backdrop-blur-sm col-span-1 lg:col-span-2"
        >
          <div className="p-3 sm:p-5 border-b border-accent-dark/40">
            <h2 className="font-bebas text-xl sm:text-2xl text-white">
              PRÓXIMAS CLASES
            </h2>
          </div>
          <div className="p-3 sm:p-5">
            {proximasClases.map((clase, index) => (
              <motion.div
                key={clase.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className={`flex items-center p-2 sm:p-3 ${
                  index !== proximasClases.length - 1
                    ? "border-b border-accent-dark/30"
                    : ""
                }`}
              >
                <div className="min-w-[40px] w-9 h-9 sm:w-12 sm:h-12 bg-primary/20 rounded-lg flex items-center justify-center text-primary font-bebas text-sm sm:text-lg mr-2 sm:mr-4">
                  {clase.fecha.split(" ")[0]}
                </div>
                <div className="flex-1 min-w-0 mr-2">
                  <h3 className="font-oswald text-white text-xs sm:text-base truncate">
                    {clase.nombre}
                  </h3>
                  <p className="text-accent-medium font-montserrat text-[10px] sm:text-sm truncate">
                    {clase.instructor} • {clase.hora} • {clase.duracion}
                  </p>
                </div>
                <Link
                  href={`/dashboard/clases/${clase.id}`}
                  className="bg-primary hover:bg-primary-dark text-white py-1 sm:py-2 px-2 sm:px-4 rounded-full text-[10px] sm:text-sm font-oswald uppercase tracking-wider transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 whitespace-nowrap"
                >
                  Ver
                </Link>
              </motion.div>
            ))}
            <div className="mt-4 text-center">
              <Link
                href="/dashboard/clases"
                className="inline-block text-primary hover:text-primary-dark font-oswald text-sm uppercase tracking-wider transition-colors"
              >
                Ver todas las clases →
              </Link>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-accent-dark/80 to-[#1a1a1a] rounded-xl border border-accent-dark/30 shadow-xl backdrop-blur-sm"
        >
          <div className="p-3 sm:p-5 border-b border-accent-dark/40">
            <h2 className="font-bebas text-xl sm:text-2xl text-white">
              TU PROGRESO
            </h2>
          </div>
          <div className="p-3 sm:p-5 flex flex-col items-center justify-center">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center mb-3 sm:mb-4 relative">
              <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-accent-dark/80 flex items-center justify-center">
                <span className="font-bebas text-white text-2xl sm:text-3xl">
                  75%
                </span>
              </div>
            </div>
            <p className="text-white font-oswald uppercase text-center text-sm sm:text-base mb-1">
              Objetivo mensual
            </p>
            <p className="text-accent-medium font-montserrat text-xs sm:text-sm text-center mb-3 sm:mb-4">
              9 de 12 clases completadas
            </p>
            <Link
              href="/dashboard/perfil"
              className="bg-accent-dark hover:bg-[#2a2a2a] text-white py-2 px-4 rounded-full text-xs sm:text-sm font-oswald uppercase tracking-wider transition-all duration-300 w-full text-center"
            >
              Ver detalles
            </Link>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-br from-accent-dark/80 to-[#1a1a1a] rounded-xl border border-accent-dark/30 shadow-xl backdrop-blur-sm p-3 sm:p-5"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3 sm:mb-4">
          <h2 className="font-bebas text-xl sm:text-2xl text-white">
            ENTRENADORES DESTACADOS
          </h2>
          <Link
            href="/dashboard/entrenadores"
            className="text-primary hover:text-primary-dark font-oswald text-xs sm:text-sm uppercase tracking-wider transition-colors"
          >
            Ver todos →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {[1, 2, 3, 4].map((id) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + id * 0.1 }}
              className="bg-accent-dark/40 rounded-lg overflow-hidden group hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
            >
              <div className="h-24 sm:h-40 relative overflow-hidden">
                <Image
                  src="/alejandro.webp"
                  alt="Entrenador"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  style={{ objectFit: "cover" }}
                  priority={id === 1}
                  className="group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-2 sm:p-3">
                <h3 className="font-oswald text-white text-xs sm:text-lg truncate">
                  Alejandro Torres
                </h3>
                <p className="text-accent-medium font-montserrat text-[10px] sm:text-sm truncate">
                  Especialista en técnica
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardPage;
