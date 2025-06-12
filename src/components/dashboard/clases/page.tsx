"use client";

import { motion } from "framer-motion";
import { FC, useEffect, useState } from "react";
import ButtonClassComponent from "./buttonsClass.component";
import CardTypeComponent from "./cardType.component";
import { ClassFormData } from "@/type";
import SchedulesClassComponent from "./schedulesClass.component";
import ModalCreateClassComponent from "./modalCreteClass.component";
import ModalSchedulesClassComponent from "./modalSchedulesClass.component";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { getAllClass } from "@/lib/db/actions/class.action";
import { initialClass } from "@/lib/redux/features/class/class.slice";

const PageClassComponent: FC = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);

  const [formData, setFormData] = useState<ClassFormData>({
    name: "",
    duration: 0,
    difficulty: "essential",
    description: "",
  });

  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof ClassFormData, string>>
  >({});

  const dispatch = useAppDispatch();
  const classData = useAppSelector((state) => state.class.class);

  useEffect(() => {
    const dataFetch = async () => {
      const data = await getAllClass();
      dispatch(initialClass(data));
    };
    void dataFetch();
    return () => {};
  }, [dispatch]);

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-knockout text-white text-4xl">CLASES</h1>
        </div>
      </motion.div>

      <ButtonClassComponent
        setIsCreateModalOpen={setIsCreateModalOpen}
        setIsGroupModalOpen={setIsGroupModalOpen}
      />

      {/* Detalles de los tipos de clase */}
      <div className="mt-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.3 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6"
        >
          <h2 className="font-oswald text-white text-2xl">TIPOS DE CLASES</h2>
          <div className="flex gap-2 flex-wrap">
            <div className="bg-primary/10 text-primary text-xs font-oswald px-3 py-1 rounded-full border border-primary/20">
              TODOS LOS NIVELES
            </div>
            <div className="bg-accent-dark/20 text-accent-medium text-xs font-oswald px-3 py-1 rounded-full border border-accent-dark/30">
              INSTRUCTOR CERTIFICADO
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {classData.map((item, index) => (
            <CardTypeComponent
              key={item._id.toString()}
              classData={item}
              index={index + 1}
            />
          ))}
        </div>
      </div>

      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.3 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6"
        ></motion.div>
        <h2 className="font-oswald text-white text-2xl mb-6">Horarios</h2>
        <SchedulesClassComponent
          setIsCreateModalOpen={setIsCreateModalOpen}
          setFormData={setFormData}
        />
      </div>

      {isCreateModalOpen && (
        <ModalCreateClassComponent
          setIsCreateModalOpen={setIsCreateModalOpen}
          setFormData={setFormData}
          formData={formData}
          formErrors={formErrors}
          setFormErrors={setFormErrors}
        />
      )}

      {isGroupModalOpen && (
        <ModalSchedulesClassComponent
          setIsGroupModalOpen={setIsGroupModalOpen}
        />
      )}
    </div>
  );
};

export default PageClassComponent;
