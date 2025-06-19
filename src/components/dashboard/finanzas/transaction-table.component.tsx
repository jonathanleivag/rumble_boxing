"use client";
import { FC } from "react";
import { motion } from "framer-motion";

interface Transaction {
  id: number;
  nombre: string;
  concepto: string;
  monto: string;
  fecha: string;
  estado: string;
}

interface TransactionTableProps {
  transactions: Transaction[];
  delay?: number;
}

const TransactionTable: FC<TransactionTableProps> = ({
  transactions,
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-gradient-to-br from-accent-dark/80 to-[#1a1a1a] rounded-xl border border-accent-dark/30 shadow-xl backdrop-blur-sm p-4 sm:p-6"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bebas text-xl text-white">ÚLTIMAS TRANSACCIONES</h2>
        <button className="text-primary text-sm hover:text-primary/80 transition-colors">
          Ver todas
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-accent-dark/30 text-left">
              <th className="pb-2 font-medium text-accent-medium text-sm">
                Cliente
              </th>
              <th className="pb-2 font-medium text-accent-medium text-sm">
                Concepto
              </th>
              <th className="pb-2 font-medium text-accent-medium text-sm">
                Monto
              </th>
              <th className="pb-2 font-medium text-accent-medium text-sm">
                Fecha
              </th>
              <th className="pb-2 font-medium text-accent-medium text-sm">
                Estado
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-accent-dark/20">
            {transactions.map((tx) => (
              <tr key={tx.id} className="hover:bg-accent-dark/10">
                <td className="py-3 text-white font-medium">{tx.nombre}</td>
                <td className="py-3 text-accent-medium">{tx.concepto}</td>
                <td className="py-3 text-white">{tx.monto}</td>
                <td className="py-3 text-accent-medium">{tx.fecha}</td>
                <td className="py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      tx.estado === "Completado"
                        ? "bg-emerald-500/20 text-emerald-300"
                        : tx.estado === "Pendiente"
                        ? "bg-amber-500/20 text-amber-300"
                        : "bg-rose-500/20 text-rose-300"
                    }`}
                  >
                    {tx.estado}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default TransactionTable;
