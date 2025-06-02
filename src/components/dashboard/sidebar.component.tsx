"use client";
import { FC, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

interface SidebarProps {
  isMobile?: boolean;
}

const Sidebar: FC<SidebarProps> = ({ isMobile = false }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    {
      name: "Dashboard",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </svg>
      ),
      href: "/dashboard",
    },
    {
      name: "Clases",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
      href: "/dashboard/clases",
    },
    {
      name: "Asistencias",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      ),
      href: "/dashboard/asistencias",
    },
    {
      name: "Comentarios",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      ),
      href: "/dashboard/comentarios",
    },
    {
      name: "Precios",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <line x1="12" y1="1" x2="12" y2="23"></line>
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
        </svg>
      ),
      href: "/dashboard/precios",
    },
    {
      name: "Matrícula",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
        </svg>
      ),
      href: "/dashboard/matricula",
    },
    {
      name: "Usuarios",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      href: "/dashboard/usuarios",
    },
    {
      name: "Perfil",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
      href: "/dashboard/perfil",
    },
    {
      name: "Configuración",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      ),
      href: "/dashboard/configuracion",
    },
  ];

  // Para la versión móvil
  if (isMobile) {
    return (
      <>
        {/* Barra de navegación fija en la parte inferior */}
        <div className="fixed bottom-0 left-0 right-0 bg-[#0f0f0f] border-t border-accent-dark/40 py-3 px-1 z-50 shadow-lg shadow-black/50">
          <div className="flex justify-around items-center">
            {/* Mostrar solo los primeros 5 elementos en la barra inferior */}
            {menuItems.slice(0, 5).map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex flex-col items-center justify-center ${
                  pathname === item.href ? "text-primary" : "text-accent-medium"
                }`}
              >
                <div
                  className={`${
                    pathname === item.href
                      ? "bg-primary/10 p-2 rounded-full"
                      : "p-2"
                  }`}
                >
                  {item.icon}
                </div>
                <span className="text-[10px] font-oswald tracking-wide text-center mt-1">
                  {item.name}
                </span>
              </Link>
            ))}

            {/* Botón para más opciones */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`flex flex-col items-center justify-center ${
                isMobileMenuOpen ? "text-primary" : "text-accent-medium"
              }`}
            >
              <div
                className={`${
                  isMobileMenuOpen ? "bg-primary/10 p-2 rounded-full" : "p-2"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="19" cy="12" r="1" />
                  <circle cx="5" cy="12" r="1" />
                </svg>
              </div>
              <span className="text-[10px] font-oswald tracking-wide text-center mt-1">
                Más
              </span>
            </button>
          </div>
        </div>

        {/* Menú desplegable con opciones adicionales */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              className="fixed bottom-24 left-2 right-2 bg-[#1a1a1a] border border-accent-dark/40 rounded-xl shadow-2xl shadow-black/50 pb-4 pt-4 px-4 z-40"
            >
              <div className="flex justify-between items-center mb-3 pb-2 border-b border-accent-dark/40">
                <div className="flex items-center">
                  <Image
                    src="/logo.webp"
                    alt="Rumble Boxing"
                    width={32}
                    height={32}
                    className="filter drop-shadow-[0_0_8px_rgba(224,32,32,0.6)]"
                  />
                  <span className="font-bebas text-white text-lg ml-2 tracking-wider">
                    RUMBLE BOXING
                  </span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 bg-accent-dark/60 rounded-full text-white flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              <div className="space-y-2">
                {/* Mostrar todas las opciones del menú completo, con estilos más grandes y claros */}
                {menuItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center p-3 rounded-xl transition-all duration-300 ${
                      pathname === item.href
                        ? "bg-primary text-white shadow-md shadow-primary/30"
                        : "text-accent-medium hover:text-white hover:bg-accent-dark/40"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="mr-3">{item.icon}</div>
                    <span className="font-oswald tracking-wide">
                      {item.name}
                    </span>
                  </Link>
                ))}

                {/* Botón de salir */}
                <Link
                  href="/"
                  className="flex items-center p-3 rounded-xl transition-all duration-300 text-accent-medium hover:text-white hover:bg-accent-dark/40 mt-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5 mr-3"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  <span className="font-oswald tracking-wide">Salir</span>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  // Para la versión desktop
  return (
    <div
      className={`h-screen bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a] border-r border-accent-dark/40 transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      } flex flex-col fixed left-0 top-0 z-50`}
    >
      <div className="p-4 flex items-center justify-between border-b border-accent-dark/40">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.webp"
            alt="Rumble Boxing"
            width={40}
            height={40}
            className="filter drop-shadow-[0_0_8px_rgba(224,32,32,0.6)]"
          />
          {!isCollapsed && (
            <span className="font-bebas text-white text-2xl ml-2 tracking-wider">
              RUMBLE BOXING
            </span>
          )}
        </Link>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 bg-accent-dark/60 rounded-full text-white flex items-center justify-center"
        >
          {isCollapsed ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
            >
              <polyline points="13 17 18 12 13 7" />
              <polyline points="6 17 11 12 6 7" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
            >
              <polyline points="11 17 6 12 11 7" />
              <polyline points="18 17 13 12 18 7" />
            </svg>
          )}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-2">
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center ${
                isCollapsed ? "justify-center" : "justify-start"
              } py-3 px-4 rounded-xl transition-all duration-300 ${
                pathname === item.href
                  ? "bg-primary text-white shadow-md shadow-primary/30"
                  : "text-accent-medium hover:text-white hover:bg-accent-dark/40"
              }`}
            >
              <div className={isCollapsed ? "" : "mr-3"}>{item.icon}</div>
              {!isCollapsed && (
                <span className="font-oswald tracking-wide">{item.name}</span>
              )}
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-accent-dark/40">
        <Link
          href="/"
          className={`flex items-center ${
            isCollapsed ? "justify-center" : "justify-start"
          } py-2 px-3 rounded-xl transition-all duration-300 text-accent-medium hover:text-white hover:bg-accent-dark/40`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`w-5 h-5 ${isCollapsed ? "" : "mr-3"}`}
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          {!isCollapsed && (
            <span className="font-oswald tracking-wide">Salir</span>
          )}
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
