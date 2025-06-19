import { ModalFinanceComponentProps } from "@/type";
import { motion } from "framer-motion";
import { FC } from "react";
import { Plan } from "./change-plan.component";

const plans: Plan[] = [
  {
    id: 1,
    nombre: "Mensual Básico",
    precio: "$65,000",
    clases: 8,
    duracion: "1 mes",
  },
  {
    id: 2,
    nombre: "Mensual Premium",
    precio: "$85,000",
    clases: 12,
    duracion: "1 mes",
  },
  {
    id: 3,
    nombre: "Trimestral",
    precio: "$210,000",
    clases: 36,
    duracion: "3 meses",
  },
  {
    id: 4,
    nombre: "Semestral",
    precio: "$390,000",
    clases: 72,
    duracion: "6 meses",
  },
  {
    id: 5,
    nombre: "Anual",
    precio: "$650,000",
    clases: 144,
    duracion: "12 meses",
  },
  {
    id: 6,
    nombre: "Pack 5 clases",
    precio: "$60,000",
    clases: 5,
    duracion: "2 meses",
  },
  {
    id: 7,
    nombre: "Pack 10 clases",
    precio: "$120,000",
    clases: 10,
    duracion: "3 meses",
  },
];

const ModalFinanceComponent: FC<ModalFinanceComponentProps> = ({
  setShowModal,
  setSelectedStudent,
  selectedPlan,
  setSelectedPlan,
  showSuccess,
  setShowSuccess,
  selectedStudent,
}: ModalFinanceComponentProps) => {
  const handleChangePlan = () => {
    // En una aplicación real, aquí se enviaría la información al backend
    console.log("Cambiando plan:", {
      estudiante: selectedStudent,
      nuevoPlan: selectedPlan,
    });

    // Mostrar mensaje de éxito y cerrar el modal
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setShowModal(false);
      setSelectedStudent(null);
      setSelectedPlan(null);
    }, 2000);
  };
  return (
    <div
      className="z-50 fixed inset-0 bg-black/70 flex items-center justify-center p-4"
      onClick={() => setShowModal(false)}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#1a1a1a] rounded-xl border border-accent-dark/30 shadow-2xl max-w-2xl w-full p-4 overflow-y-auto max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-3 pb-2 border-b border-accent-dark/30">
          <h3 className="font-bebas text-xl text-white tracking-wider">
            CAMBIAR PLAN DE {selectedStudent?.nombre.toUpperCase()}{" "}
            {selectedStudent?.apellido.toUpperCase()}
          </h3>
          <button
            onClick={() => setShowModal(false)}
            className="text-gray-400 hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {showSuccess ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-emerald-500/20 border border-emerald-500/30 rounded-md p-4 text-center"
          >
            <div className="text-emerald-300 text-lg mb-2">
              ¡Plan cambiado con éxito!
            </div>
            <p className="text-white">
              El plan de {selectedStudent?.nombre} ha sido actualizado a{" "}
              {selectedPlan?.nombre}.
            </p>
          </motion.div>
        ) : (
          <>
            <div className="mb-4">
              <div className="mb-4 bg-accent-dark/30 p-3 rounded-md">
                <h4 className="text-accent-medium text-sm">Plan Actual:</h4>
                <p className="text-white font-medium text-lg">
                  {selectedStudent?.planActual}
                </p>
                <div className="mt-1 text-xs">
                  <span className="text-accent-medium">
                    Periodo: {selectedStudent?.fechaInicio} -{" "}
                    {selectedStudent?.fechaFin}
                  </span>
                </div>
              </div>

              <h4 className="text-white font-medium mb-3">
                Selecciona el nuevo plan:
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {plans.map((plan) => (
                  <div
                    key={plan.id}
                    onClick={() => setSelectedPlan(plan)}
                    className={`p-2.5 rounded-md border cursor-pointer transition-all ${
                      selectedPlan?.id === plan.id
                        ? "border-primary bg-primary/10"
                        : "border-accent-dark/30 bg-accent-dark/20 hover:bg-accent-dark/30"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <h5 className="font-medium text-white">{plan.nombre}</h5>
                      <span
                        className={`font-bebas text-lg ${
                          selectedPlan?.id === plan.id
                            ? "text-primary"
                            : "text-amber-500"
                        }`}
                      >
                        {plan.precio}
                      </span>
                    </div>
                    <div className="mt-1 text-xs text-accent-medium">
                      <div>Duración: {plan.duracion}</div>
                      <div>{plan.clases} clases</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-3 border-t border-accent-dark/30 pt-3 mt-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-1.5 rounded-md bg-accent-dark/50 text-white hover:bg-accent-dark/70 transition-colors text-sm font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={handleChangePlan}
                disabled={!selectedPlan}
                className={`px-4 py-1.5 rounded-md transition-colors text-sm font-medium ${
                  selectedPlan
                    ? "bg-primary text-white hover:bg-primary/90"
                    : "bg-accent-dark/30 text-accent-medium cursor-not-allowed"
                }`}
              >
                Confirmar Cambio
              </button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default ModalFinanceComponent;
