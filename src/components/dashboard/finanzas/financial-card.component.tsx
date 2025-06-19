"use client";
import { FC, useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface FinancialCardProps {
  title: string;
  value: string;
  icon: string;
  colorClass: string;
  delay?: number;
  animationDuration?: number;
}

const FinancialCard: FC<FinancialCardProps> = ({
  title,
  value,
  icon,
  colorClass,
  delay = 0,
  animationDuration = 1.5,
}) => {
  const [animatedValue, setAnimatedValue] = useState(() => {
    if (value.includes("$")) return "$0";
    return "0";
  });
  const isAnimated = useRef(false);

  const valueUtils = useRef({
    parseOriginalValue: (val: string) => {
      if (val.includes("$")) {
        const numericValue = val.replace(/[^0-9]/g, "");
        return parseInt(numericValue, 10);
      }

      const plainNumber = val.replace(/[^0-9.]/g, "");
      return parseInt(plainNumber, 10) || 0;
    },

    formatValue: (num: number, originalValue: string): string => {
      let formattedNum: string;

      if (originalValue.includes("$")) {
        const currencyFormat = new Intl.NumberFormat("es-CL", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        });
        formattedNum = "$" + currencyFormat.format(num);
      } else if (originalValue.includes(",") || originalValue.includes(".")) {
        const formatter = new Intl.NumberFormat("es-CL", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        });
        formattedNum = formatter.format(num);
      } else {
        formattedNum = num.toString();
      }

      return formattedNum;
    },
  });

  useEffect(() => {
    const initValue = valueUtils.current.formatValue(0, value);
    setAnimatedValue(initValue);

    const finalValue = valueUtils.current.parseOriginalValue(value);

    const steps = Math.min(
      finalValue > 1000
        ? 20
        : finalValue > 100
        ? 15
        : finalValue > 10
        ? 10
        : finalValue,
      20
    );

    if (finalValue <= 5) {
      setAnimatedValue(value);
      return;
    }

    if (!isAnimated.current && finalValue > 0) {
      isAnimated.current = true;

      const increment = Math.max(1, Math.ceil(finalValue / steps));

      const timer = setTimeout(() => {
        let currentValue = 0;
        const interval = setInterval(() => {
          currentValue = Math.min(currentValue + increment, finalValue);

          if (currentValue >= finalValue) {
            clearInterval(interval);
            setAnimatedValue(value); // Set final formatted value directly
          } else {
            setAnimatedValue(
              valueUtils.current.formatValue(currentValue, value)
            );
          }

          if (currentValue >= finalValue) {
            clearInterval(interval);
          }
        }, (animationDuration * 1000) / steps);

        return () => clearInterval(interval);
      }, delay * 1000);

      return () => clearTimeout(timer);
    }
  }, [value, delay, animationDuration]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-gradient-to-br from-accent-dark/80 to-[#1a1a1a] rounded-xl p-3 sm:p-5 border border-accent-dark/30 shadow-xl backdrop-blur-sm"
    >
      <div className="flex items-center mb-2 sm:mb-3">
        <div
          className={`w-8 h-8 sm:w-10 sm:h-10 ${colorClass} rounded-lg flex items-center justify-center text-base sm:text-lg`}
        >
          {icon}
        </div>
        <span className="ml-2 sm:ml-3 text-accent-medium font-montserrat text-xs sm:text-sm">
          {title}
        </span>
      </div>
      <motion.div
        className="font-bebas text-xl sm:text-3xl text-white min-w-[80px]"
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {animatedValue}
      </motion.div>
    </motion.div>
  );
};

export default FinancialCard;
