'use client";';

import { motion } from "framer-motion";
import { FC, MouseEvent } from "react";
import toast from "react-hot-toast";
import { ISchedulesData, SchedulesClassComponentProps } from "@/type";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { showConfirmToast } from "@/utils/showConfirmToast";
import { deleteSchedule } from "@/lib/db/actions/schedules.action";
import {
  deleteScheduleSlice,
  isEditSchedule,
} from "@/lib/redux/features/schedule/schedule.slice";

const SchedulesClassComponent: FC<SchedulesClassComponentProps> = ({
  setIsCreateModalOpen,
  setFormData,
}) => {
  const schedules = useAppSelector((state) => state.schedule.schedules);
  const dispatch = useAppDispatch();

  const handleEditGroup = (e: MouseEvent, group: ISchedulesData) => {
    e.stopPropagation();
    setFormData({
      name: group.name,
      description: group.description,
      color: group.color,
      selectedClasses: group.classes.map((cls) => cls.class._id.toString()),
      classSchedules: {
        ...group.classes.reduce((acc, cls) => {
          acc[cls.class._id.toString()] = {
            startTime: cls.startTime,
          };
          return acc;
        }, {} as Record<string, { startTime: string }>),
      },
    });
    setIsCreateModalOpen(true);
    dispatch(
      isEditSchedule({
        name: group.name,
        isEdit: true,
        id: group._id.toString(),
      })
    );
  };

  const handleDeleteGroup = (groupId: string) => {
    showConfirmToast({
      message: "¿Estás seguro de que deseas eliminar este grupo?",
      onConfirm: async () => {
        await deleteSchedule(groupId);
        toast.success("Grupo eliminado correctamente");
        dispatch(deleteScheduleSlice(groupId));
      },
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {schedules.map((data, groupIndex) => {
        if (data.classes.length === 0) {
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
                      onClick={(e) => handleEditGroup(e, data)}
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
                        handleDeleteGroup(data._id.toString());
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
                  onClick={(e) => handleEditGroup(e, data)}
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
                    onClick={(e) => handleEditGroup(e, data)}
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
                      handleDeleteGroup(data._id.toString());
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
                  onClick={(e) => handleEditGroup(e, data)}
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
              {data.classes.map((timeSlot, index) => (
                <div
                  key={`${data.name}-${index}`}
                  className="mb-4 pb-4 border-b border-accent-dark/30 last:border-0 last:mb-0 last:pb-0"
                >
                  <div className="flex items-center mb-1 text-white">
                    {timeSlot.class.name}
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
                        {timeSlot.startTime} - {timeSlot.endTime}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className={` px-3 py-1 rounded-full`}>
                      <span className="text-white font-oswald text-xs">
                        {timeSlot.class.description}
                      </span>
                    </div>
                    <span className="text-accent-medium font-montserrat text-xs">
                      {timeSlot.class.difficulty}
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
