import { PriceCardComponentProps } from "@/type";
import { fadeInUp } from "@/utils/motionEffect.util";
import { motion } from "framer-motion";
import { FC } from "react";

const PriceCard: FC<PriceCardComponentProps> = ({
  item,
  isPopular = false,
  showConsultButton = false,
}) => {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -10 }}
      transition={{ type: "spring", stiffness: 300 }}
      className={`bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-2xl p-8
        ${
          isPopular
            ? "border-2 border-primary relative md:scale-105 shadow-xl shadow-primary/10 z-10"
            : "border border-accent-dark/50 hover:border-primary/50 transition-all duration-300 shadow-lg shadow-black/20"
        }`}
    >
      {isPopular && (
        <div className="absolute -top-5 left-0 right-0 mx-auto w-max">
          <div className="bg-primary text-white font-oswald text-center py-1 px-4 rounded-full text-sm shadow-lg shadow-primary/30">
            MÁS POPULAR
          </div>
        </div>
      )}
      <div className="text-center mb-4 mt-2">
        <span
          className={`font-oswald inline-block px-4 py-1 rounded-full ${
            isPopular
              ? "bg-primary/20 text-primary"
              : "bg-accent-dark/80 text-accent-light"
          } text-sm`}
        >
          {item.type.toUpperCase()}
        </span>
      </div>
      <div className="text-center mb-6">
        <div className="font-bebas text-6xl text-primary mb-2 flex justify-center items-start">
          {!showConsultButton && (
            <>
              <span className="text-2xl mr-1 mt-2">$</span>
              {item.price}
              <span className="text-lg text-accent-medium self-end mb-2">
                /{item.name}
              </span>
            </>
          )}
          {showConsultButton && <>{item.name}</>}
        </div>
        <p className="font-montserrat text-accent-medium text-sm">
          {item.description}
        </p>
      </div>
      <ul className="font-montserrat text-accent-light space-y-4 mb-8 text-sm">
        {item.characteristics.map((char: string) => (
          <li key={char} className="flex items-start">
            <span className="text-primary mr-2 mt-0.5 flex-shrink-0">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 12L10 17L19 8"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span>{char}</span>
          </li>
        ))}
      </ul>
      <button
        className={`w-full font-oswald text-lg uppercase ${
          isPopular
            ? "bg-primary hover:bg-primary-dark text-white shadow-lg shadow-primary/30"
            : "bg-transparent border-2 border-primary hover:bg-primary/10"
        } transition-all duration-300 tracking-wider py-3 px-8 rounded-full`}
      >
        {showConsultButton ? "CONSULTAR" : "ELEGIR PLAN"}
      </button>
    </motion.div>
  );
};

export default PriceCard;
