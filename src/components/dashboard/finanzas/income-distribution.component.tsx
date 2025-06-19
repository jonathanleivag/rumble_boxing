"use client";
import { FC, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { DistributionItem, IncomeDistributionProps } from "@/type";
import { getIncomeDistribution } from "@/lib/db/actions/finance.action";

const IncomeDistribution: FC<IncomeDistributionProps> = ({ delay = 0 }) => {
  const [items, setItems] = useState<DistributionItem[]>([
    { label: "Mensualidades", percentage: 0, color: "bg-emerald-500" },
    { label: "Anuales", percentage: 0, color: "bg-blue-500" },
    { label: "Personalizadas", percentage: 0, color: "bg-amber-500" },
  ]);

  useEffect(() => {
    const dataFetch = async () => {
      const data = await getIncomeDistribution();
      if (data) {
        setItems((prevItems) =>
          prevItems.map((item) => {
            const key = item.label
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "") as keyof typeof data;
            return {
              ...item,
              percentage: data[key] ?? 0,
            };
          })
        );
      }
    };

    void dataFetch();
    return () => {};
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-gradient-to-br from-accent-dark/80 to-[#1a1a1a] rounded-xl border border-accent-dark/30 shadow-xl backdrop-blur-sm p-4 sm:p-6"
    >
      <h2 className="font-bebas text-xl text-white mb-4">
        DISTRIBUCIÓN DE INGRESOS
      </h2>

      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={item.label}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-accent-medium">{item.label}</span>
              <span className="text-white">{item.percentage}%</span>
            </div>
            <div className="w-full bg-accent-dark/30 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${item.percentage}%` }}
                transition={{ duration: 0.5, delay: delay + index * 0.1 }}
                className={`${item.color} h-2 rounded-full`}
              ></motion.div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default IncomeDistribution;
