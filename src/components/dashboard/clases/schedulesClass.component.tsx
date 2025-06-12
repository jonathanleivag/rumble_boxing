'use client";';

import { motion } from "framer-motion";
import { FC } from "react";
import toast from "react-hot-toast";
import { SchedulesClassComponentProps } from "@/type";

interface ClassInfo {
  start: string;
  end: string;
  class: string;
  duration: string;
  description: string;
}

interface GroupClass {
  id: string;
  name: string;
  description: string;
  color: string;
  class: ClassInfo[];
}

const SchedulesClassComponent: FC<SchedulesClassComponentProps> = ({
  setIsCreateModalOpen,
  setFormData,
}) => {
  const initialScheduleData: GroupClass[] = [
    {
      id: "group-1",
      name: "Entrenamiento Regular",
      description: "Clases regulares semanales",
      color: "#E02020",
      class: [
        {
          start: "10:00 AM",
          end: "11:00 AM",
          class: "Boxeo Básico",
          duration: "60 minutos",
          description: "Técnica y fundamentos",
        },
        {
          start: "05:00 PM",
          end: "06:00 PM",
          class: "HIIT Boxing",
          duration: "60 minutos",
          description: "Alta intensidad",
        },
        {
          start: "07:00 PM",
          end: "08:00 PM",
          class: "Sparring Técnico",
          duration: "60 minutos",
          description: "Combate controlado",
        },
      ],
    },
    {
      id: "group-2",
      name: "Clases Especiales",
      description: "Sesiones especiales y eventos",
      color: "#F97316",
      class: [
        {
          start: "10:00 AM",
          end: "11:00 AM",
          class: "Boxeo Básico",
          duration: "60 minutos",
          description: "Técnica y fundamentos",
        },
        {
          start: "05:00 PM",
          end: "06:00 PM",
          class: "HIIT Boxing",
          duration: "60 minutos",
          description: "Alta intensidad",
        },
        {
          start: "07:00 PM",
          end: "08:00 PM",
          class: "Sparring Técnico",
          duration: "60 minutos",
          description: "Combate controlado",
        },
      ],
    },
    {
      id: "group-3",
      name: "Técnica Avanzada",
      description: "Entrenamiento para boxeadores experimentados",
      color: "#6366F1",
      class: [],
    },
  ];

  const handleEditGroup = (groupId: string) => {
    // const groupToEdit = classGroups.find((g) => g.id === groupId);
    // if (groupToEdit) {
    //   setGroupFormData({
    //     name: groupToEdit.name,
    //     description: groupToEdit.description,
    //     color: groupToEdit.color,
    //   });
    //   setSelectedGroupId(groupId);
    //   setIsEditGroupModalOpen(true);
    // }
  };

  // Función para eliminar un grupo
  const handleDeleteGroup = (groupId: string) => {
    toast(
      (t) => (
        <div className="text-white font-montserrat text-sm space-y-2">
          <p>¿Estás seguro de que deseas eliminar este grupo?</p>
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => {
                toast.dismiss(t.id);
                console.log(`Eliminando grupo: ${groupId}`);
                toast.success("Grupo eliminado correctamente");
              }}
              className="cursor-pointer bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs font-oswald"
            >
              Eliminar
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="cursor-pointer bg-accent-dark/40 hover:bg-accent-dark/60 text-white px-3 py-1 rounded text-xs font-oswald"
            >
              Cancelar
            </button>
          </div>
        </div>
      ),
      { duration: 10000, position: "top-center" }
    );
    return;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {initialScheduleData.map((data, groupIndex) => {
        if (data.class.length === 0) {
          return (
            <motion.div
              key={data.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * groupIndex, duration: 0.3 }}
              className="bg-gradient-to-br from-accent-dark/80 to-[#1a1a1a] rounded-xl border border-accent-dark/30 shadow-xl backdrop-blur-sm overflow-hidden"
            >
              <div
                className="p-4 border-b border-accent-dark/30"
                style={{ background: `${data.color}1a` }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditGroup(data.name);
                      }}
                      className="cursor-pointer text-accent-medium hover:text-white transition-colors"
                      title="Editar grupo"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 19.5h15"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteGroup(data.name);
                      }}
                      className="cursor-pointer text-primary hover:text-red-500 transition-colors"
                      title="Eliminar grupo"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>
                  <div
                    className="w-5 h-5 rounded-full"
                    style={{ backgroundColor: data.color }}
                    title="Color del grupo"
                  ></div>
                </div>
                <h3 className="font-oswald text-white text-xl text-center">
                  {data.name.toUpperCase()}
                </h3>
                <p className="text-center text-white/70 font-montserrat text-xs mt-1">
                  {data.description}
                </p>
              </div>
              <div className="p-6 flex flex-col items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-accent-dark/40 flex items-center justify-center mb-4 relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-10 h-10 text-accent-medium"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                  <div className="absolute inset-0 border-2 border-accent-dark/30 rounded-full animate-ping opacity-40"></div>
                </div>
                <p className="text-accent-medium font-montserrat text-center">
                  No hay clases programadas para este grupo.
                </p>
                <button
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      groupId: data.name,
                    }));
                    setIsCreateModalOpen(true);
                  }}
                  className="cursor-pointer mt-4 bg-accent-dark/30 hover:bg-accent-dark/50 text-white py-2 px-4 rounded-md text-sm font-oswald uppercase tracking-wider transition-colors duration-200 border border-accent-dark/20 flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4 mr-2"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                  Crear Primera Clase
                </button>
              </div>
            </motion.div>
          );
        }
        // Para los grupos con clases programadas
        return (
          <motion.div
            key={data.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * groupIndex, duration: 0.3 }}
            className="bg-gradient-to-br from-accent-dark/80 to-[#1a1a1a] rounded-xl border border-accent-dark/30 shadow-xl backdrop-blur-sm overflow-hidden"
          >
            <div
              className="p-4 border-b border-accent-dark/30"
              style={{ background: `${data.color}1a` }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditGroup(data.name);
                    }}
                    className="cursor-pointer text-accent-medium hover:text-white transition-colors"
                    title="Editar grupo"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 19.5h15"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteGroup(data.name);
                    }}
                    className="cursor-pointer text-primary hover:text-red-500 transition-colors"
                    title="Eliminar grupo"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
                <div
                  className="w-5 h-5 rounded-full"
                  style={{ backgroundColor: data.color }}
                  title="Color del grupo"
                ></div>
              </div>
              <h3 className="font-oswald text-white text-xl text-center">
                {data.name.toUpperCase()}
              </h3>
              <p className="text-center text-white/70 font-montserrat text-xs mt-1">
                {data.description}
              </p>
              <div className="flex justify-center mt-2">
                <button
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      groupId: data.name,
                    }));
                    setIsCreateModalOpen(true);
                  }}
                  className="cursor-pointer bg-accent-dark/30 hover:bg-accent-dark/50 text-white text-xs font-oswald px-3 py-1 rounded-full transition-colors duration-200 border border-accent-dark/20 flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-3 h-3 mr-1"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                  AGREGAR CLASE
                </button>
              </div>
            </div>
            <div className="p-5">
              {data.class.map((timeSlot, index) => (
                <div
                  key={`${data.name}-${index}`}
                  className="mb-4 pb-4 border-b border-accent-dark/30 last:border-0 last:mb-0 last:pb-0"
                >
                  <div className="flex items-center mb-1">
                    <span className="font-oswald text-white text-lg">
                      {timeSlot.class}
                    </span>
                    {data.name}
                    <div className="ml-auto flex items-center gap-2">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-primary"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="9"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <path
                          d="M12 7V12L15 15"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="font-montserrat text-accent-medium text-sm">
                        {timeSlot.start} - {timeSlot.end}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className={` px-3 py-1 rounded-full`}>
                      <span className="text-white font-oswald text-xs">
                        data-aqui
                      </span>
                    </div>
                    <span className="text-accent-medium font-montserrat text-xs">
                      {timeSlot.description}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default SchedulesClassComponent;
