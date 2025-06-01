"use client";

import { ConfirmModalProps } from "@/type";
import { AnimatePresence, motion } from "framer-motion";
import { FC } from "react";

const ConfirmModal: FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}) => {
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

export default ConfirmModal;
