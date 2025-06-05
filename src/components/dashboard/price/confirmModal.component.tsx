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
    <div className="fixed inset-0 bg-black/40 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-gradient-to-br from-[#101010] to-[#0a0a0a] border border-accent-dark/40 rounded-xl shadow-xl p-6 w-full max-w-md"
        >
          <h2 className="text-white text-xl font-oswald mb-2 flex items-center">
            <span className="text-primary mr-2">•</span>
            {title}
          </h2>
          <p className="text-accent-medium font-montserrat mb-6">{message}</p>
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="bg-accent-dark/60 hover:bg-accent-dark text-white py-2.5 px-6 rounded-md text-sm font-oswald uppercase tracking-wider transition-all duration-300 shadow-sm hover:shadow-md"
            >
              Cancelar
            </button>
            <button
              onClick={onConfirm}
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-600 text-white py-2.5 px-6 rounded-md text-sm font-oswald uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg"
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
