"use client";
import { FC, useEffect, useState } from "react";
import { motion } from "framer-motion";
import FinancialCard from "@/components/dashboard/finanzas/financial-card.component";
import IncomeDistribution from "@/components/dashboard/finanzas/income-distribution.component";
import StudentPaymentSection from "@/components/dashboard/finanzas/student-payment.component";
import ChangePlanSection, {
  Plan,
  Student,
} from "@/components/dashboard/finanzas/change-plan.component";
import ModalFinanceComponent from "./modalFinance.component";
import { ResumeFinance } from "@/type";
import { getFinance } from "@/lib/db/actions/finance.action";
import { format } from "date-fns";

const FinancePageComponent: FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [resumeFinance, setResumeFinance] = useState<ResumeFinance[]>([
    {
      titulo: "Ingresos Totales",
      valor: "$0",
      icono: "💰",
      color: "bg-emerald-600",
    },
    {
      titulo: "Total de alumnos",
      valor: "$0",
      icono: "📉",
      color: "bg-rose-600",
    },
    {
      titulo: "Alumnos morosos",
      valor: "$0",
      icono: "📈",
      color: "bg-amber-600",
    },
    {
      titulo: "valor matriculas",
      valor: "$0",
      icono: "🔄",
      color: "bg-blue-600",
    },
  ]);

  useEffect(() => {
    const fetchFinanceData = async () => {
      const data = await getFinance();
      setResumeFinance((item) => {
        return item.map((resumeItem) => {
          switch (resumeItem.titulo) {
            case "Ingresos Totales":
              return {
                ...resumeItem,
                valor: `$${data.income.toLocaleString()}`,
              };
            case "Total de alumnos":
              return { ...resumeItem, valor: `${data.totalStudent}` };
            case "Alumnos morosos":
              return {
                ...resumeItem,
                valor: `${data.totalDelinquentStudents}`,
              };
            case "valor matriculas":
              return {
                ...resumeItem,
                valor: `$${data.valueMatricula.toLocaleString()}`,
              };
            default:
              return resumeItem;
          }
        });
      });
    };
    void fetchFinanceData();
    return () => {};
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
        <h1 className="font-bebas text-white text-2xl sm:text-knockout sm:text-4xl mb-1 sm:mb-0 tracking-wider uppercase">
          finanzas de este mes
        </h1>
        <p className="text-accent-medium font-montserrat text-sm">
          {format(new Date(), "dd-MM-yyyy")}
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-2"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {resumeFinance.map((item, index) => (
            <FinancialCard
              key={item.titulo}
              title={item.titulo}
              value={item.valor}
              icon={item.icono}
              colorClass={item.color}
              delay={0.1 + index * 0.1}
              animationDuration={1.2}
            />
          ))}
        </div>
        <div className="grid grid-cols-1 gap-4 sm:gap-6">
          <IncomeDistribution delay={0.4} />
        </div>
      </motion.div>

      <ChangePlanSection
        delay={0.6}
        setShowModal={setShowModal}
        setSelectedStudent={setSelectedStudent}
      />

      <StudentPaymentSection delay={0.7} />

      {showModal && (
        <ModalFinanceComponent
          showSuccess={showSuccess}
          selectedPlan={selectedPlan}
          setShowSuccess={setShowSuccess}
          setShowModal={setShowModal}
          setSelectedStudent={setSelectedStudent}
          setSelectedPlan={setSelectedPlan}
          selectedStudent={selectedStudent}
        />
      )}
    </div>
  );
};

export default FinancePageComponent;
