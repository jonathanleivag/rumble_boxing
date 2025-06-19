"use client";
import { FC } from "react";
import { motion } from "framer-motion";

interface MonthlyData {
  mes: string;
  valor: number;
}

interface BarChartProps {
  data: MonthlyData[];
  title: string;
  delay?: number;
}

const BarChart: FC<BarChartProps> = ({ data, title, delay = 0 }) => {
  const maxValue = Math.max(...data.map((item) => item.valor));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-gradient-to-br from-accent-dark/80 to-[#1a1a1a] rounded-xl border border-accent-dark/30 shadow-xl backdrop-blur-sm col-span-1 lg:col-span-2 p-4 sm:p-6"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bebas text-xl text-white">{title}</h2>
        <div className="flex space-x-2">
          <button className="bg-primary/20 hover:bg-primary/30 text-white px-3 py-1 rounded-md text-sm transition-colors">
            2025
          </button>
          <button className="bg-accent-dark/30 hover:bg-accent-dark/40 text-accent-medium px-3 py-1 rounded-md text-sm transition-colors">
            6 meses
          </button>
        </div>
      </div>

      {/* Gráfico de barras simplificado */}
      <div className="h-64 flex items-end space-x-4 sm:space-x-8 mt-4 px-2">
        {data.map((item, index) => (
          <div key={item.mes} className="flex flex-col items-center flex-1">
            <div className="w-full relative">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(item.valor / maxValue) * 100}%` }}
                transition={{ duration: 0.5, delay: delay + index * 0.1 }}
                className={`w-full ${
                  index === data.length - 1
                    ? "bg-primary"
                    : "bg-accent-medium/30"
                } rounded-t-md`}
              ></motion.div>
            </div>
            <span className="text-accent-medium text-sm mt-2">{item.mes}</span>
            <span className="text-white text-xs font-medium mt-1">
              ${(item.valor / 1000000).toFixed(1)}M
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default BarChart;
