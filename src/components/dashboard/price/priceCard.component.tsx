import { PriceCardProps } from "@/type";
import { motion } from "framer-motion";
import { FC } from "react";
import { useMatriculaValue } from "@/hooks/useMatriculaValue";
import { toChileanPesos } from "@/utils/toChileanPesos.util";

const PriceCard: FC<PriceCardProps> = ({
  price,
  onEdit,
  onDelete,
  onToggleActive,
  onTogglePopular,
}) => {
  const { value: matriculaValue, description: matriculaDescription } =
    useMatriculaValue();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`relative bg-gradient-to-br from-[#101010] to-[#050505] border ${
        price.isPopular
          ? "border-primary/50 shadow-[0_0_15px_rgba(234,85,80,0.15)]"
          : "border-accent-dark/30"
      } rounded-xl overflow-hidden`}
    >
      {price.isPopular && (
        <div className="absolute top-0 right-0 bg-primary text-white text-xs py-1 px-2 font-oswald tracking-wider uppercase">
          Popular
        </div>
      )}

      <div className="p-5">
        <div className="flex justify-between items-center mb-4">
          <h3
            className={`font-oswald text-2xl ${
              price.active ? "text-white" : "text-accent-medium"
            }`}
          >
            {price.name}
          </h3>
          <span
            className={`text-xs px-2 py-1 rounded-full font-montserrat ${
              price.active
                ? "bg-green-900/20 text-green-500"
                : "bg-red-900/20 text-red-500"
            }`}
          >
            {price.active ? "Activo" : "Inactivo"}
          </span>
        </div>

        <div
          className={`text-3xl font-oswald mb-2 ${
            price.active ? "text-white" : "text-accent-medium"
          }`}
        >
          ${toChileanPesos(price.price)}{" "}
          <span className="text-accent-medium text-sm font-montserrat">
            {price.type}
          </span>
        </div>

        {matriculaValue > 0 && (
          <div
            className={`mb-3 px-3 py-2 bg-[#0d0d0d] rounded-md border border-primary/10`}
          >
            <h4 className="text-primary text-sm font-montserrat font-medium mb-1">
              Matrícula
            </h4>
            <div
              className={`font-oswald ${
                price.active ? "text-white" : "text-accent-medium"
              }`}
            >
              <span className="text-2xl">
                ${toChileanPesos(matriculaValue)}
              </span>
              <span className="text-accent-medium text-xs ml-1">
                pago único
              </span>
            </div>
            {matriculaDescription && (
              <p className="text-accent-medium text-xs mt-1">
                {matriculaDescription}
              </p>
            )}
          </div>
        )}

        <div
          className={`mb-4 text-sm ${
            price.active ? "text-accent-light" : "text-accent-medium"
          }`}
        >
          {typeof price.class === "number"
            ? `${price.class} clases`
            : price.class}
        </div>

        <p className="text-accent-medium font-montserrat text-sm mb-4">
          {price.description}
        </p>

        <div className="border-t border-accent-dark/30 pt-3 space-y-2">
          {price.characteristics.map((characteristics, index) => (
            <div
              key={index}
              className="flex items-center gap-2 text-accent-light text-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4 text-primary flex-shrink-0"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
              {characteristics}
            </div>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <button
            onClick={onEdit}
            className="bg-accent-dark/40 hover:bg-accent-dark/60 text-white py-2 px-3 rounded-md text-xs font-oswald uppercase tracking-wider transition-all duration-300 flex items-center gap-1 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
              <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
            </svg>
            Editar
          </button>
          <button
            onClick={onToggleActive}
            className={`${
              price.active
                ? "bg-red-900/20 hover:bg-red-900/40 text-red-500"
                : "bg-green-900/20 hover:bg-green-900/40 text-green-500"
            } py-2 px-3 rounded-md text-xs font-oswald uppercase tracking-wider transition-all duration-300 flex items-center gap-1 cursor-pointer`}
          >
            {price.active ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                    clipRule="evenodd"
                  />
                </svg>
                Desactivar
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
                Activar
              </>
            )}
          </button>
          <button
            onClick={onTogglePopular}
            className={`${
              price.isPopular
                ? "bg-purple-900/20 hover:bg-purple-900/40 text-purple-500"
                : "bg-accent-dark/40 hover:bg-accent-dark/60 text-accent-light"
            } py-2 px-3 rounded-md text-xs font-oswald uppercase tracking-wider transition-all duration-300 flex items-center gap-1 cursor-pointer`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                clipRule="evenodd"
              />
            </svg>
            {price.isPopular ? "Quitar destacado" : "Destacar"}
          </button>
          <button
            onClick={onDelete}
            className="bg-red-900/20 hover:bg-red-900/40 text-red-500 py-2 px-3 rounded-md text-xs font-oswald uppercase tracking-wider transition-all duration-300 flex items-center gap-1 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                clipRule="evenodd"
              />
            </svg>
            Eliminar
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PriceCard;
