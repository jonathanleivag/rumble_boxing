import { Metadata } from "next";
import MatriculaPage from "@/components/dashboard/matricula/page.component";

export const metadata: Metadata = {
  title: "Valor de Matrícula | Rumble Boxing Dashboard",
  description: "Gestiona el valor de la matrícula para Rumble Boxing",
};

export default function Matricula() {
  return <MatriculaPage />;
}
