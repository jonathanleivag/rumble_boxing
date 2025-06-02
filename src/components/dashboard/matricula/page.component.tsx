"use client";

import { FC, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fadeInUp } from "@/utils/motionEffect.util";
import {
  createMatricula,
  getMatricula,
  updateMatricula,
} from "@/lib/db/actions/matricula.action";
import { IMatriculaData } from "@/type";

interface MatriculaData {
  _id?: string;
  value: number;
  description: string;
}

const MatriculaPage: FC = () => {
  const [matriculaData, setMatriculaData] = useState<MatriculaData>({
    value: 0,
    description: "Pago único de inscripción",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMatriculaData = async () => {
      try {
        const data = await getMatricula();

        if (data) {
          setMatriculaData({
            _id: data._id.toString(),
            value: data.value || 0,
            description: data.description,
          });
        }
      } catch (error) {
        console.error("Error:", error);
        setError("No se pudo cargar el valor de la matrícula");
      } finally {
        setLoading(false);
      }
    };

    fetchMatriculaData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setMatriculaData((prev) => ({
      ...prev,
      [name]: name === "value" ? Number(value) : value,
    }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericValue = value === "" ? "" : Number(value);
    setMatriculaData((prev) => ({
      ...prev,
      [name]: numericValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess(false);

    try {
      if (!matriculaData._id) {
        const data = await createMatricula({
          value: matriculaData.value,
          description: matriculaData.description,
        });
        setMatriculaData({
          _id: data._id.toString(),
          value: data.value || 0,
          description: data.description,
        });
      } else {
        const data = await updateMatricula(matriculaData._id, {
          value: matriculaData.value,
          description: matriculaData.description,
        });
        if (data) {
          setMatriculaData({
            _id: data._id.toString(),
            value: data.value || 0,
            description: data.description,
          });
        }
      }

      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Error:", error);
      setError("No se pudo guardar el valor de la matrícula");
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      className="px-4 py-6 md:px-6 md:py-8"
    >
      <motion.div variants={fadeInUp} className="mb-6">
        <h1 className="text-3xl font-oswald text-white">Valor de Matrícula</h1>
        <p className="text-accent-medium mt-2">
          Establece el valor de la matrícula (pago único de inscripción) que se
          mostrará en todas las tarjetas de precios.
        </p>
      </motion.div>

      {loading ? (
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <motion.div
          variants={fadeInUp}
          className="bg-gradient-to-br from-[#101010] to-[#0a0a0a] border border-accent-dark/30 rounded-xl p-6 shadow-xl max-w-2xl"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-accent-medium mb-2 font-montserrat text-sm">
                Valor de la Matrícula
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-accent-medium text-lg">
                  $
                </span>
                <input
                  type="number"
                  name="value"
                  value={matriculaData.value}
                  onChange={handleNumberChange}
                  className="w-full bg-[#0f0f0f] border border-accent-dark/50 rounded-md py-3 pl-8 pr-3 text-white focus:border-primary outline-none text-xl font-oswald"
                  placeholder="0"
                />
              </div>
              <p className="text-xs text-accent-medium mt-2">
                Este valor se mostrará en todas las tarjetas de precios como un
                pago único.
              </p>
            </div>

            <div>
              <label className="block text-accent-medium mb-2 font-montserrat text-sm">
                Descripción
              </label>
              <textarea
                name="description"
                value={matriculaData.description}
                onChange={handleChange}
                rows={3}
                className="w-full bg-[#0f0f0f] border border-accent-dark/50 rounded-md p-3 text-white focus:border-primary outline-none font-montserrat"
                placeholder="Descripción del cobro de matrícula"
              ></textarea>
            </div>

            {error && (
              <div className="bg-red-900/20 border border-red-900/30 text-red-500 rounded-md p-3 text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-900/20 border border-green-900/30 text-green-500 rounded-md p-3 text-sm">
                ¡El valor de la matrícula se ha guardado con éxito!
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                disabled={saving}
                className={`cursor-pointer w-full bg-primary hover:bg-primary-dark text-white py-3 px-6 rounded-md text-lg font-oswald uppercase tracking-wider transition-all duration-300 ${
                  saving ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {saving ? (
                  <span className="flex items-center justify-center">
                    <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></span>
                    Guardando...
                  </span>
                ) : (
                  "Guardar Valor de Matrícula"
                )}
              </button>
            </div>

            <div className="bg-accent-dark/20 border border-accent-dark/30 rounded-md p-4 mt-6">
              <h3 className="text-white font-oswald text-lg mb-2">
                Vista previa
              </h3>
              <div className="bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 rounded-lg p-3">
                <h4 className="text-white text-sm font-oswald uppercase mb-1">
                  Matrícula
                </h4>
                <div className="flex items-center justify-center">
                  <span className="text-primary font-bebas text-2xl mr-1">
                    $
                  </span>
                  <span className="text-primary font-bebas text-3xl">
                    {matriculaData.value}
                  </span>
                  <span className="text-accent-medium text-xs self-end mb-1 ml-1">
                    (pago único)
                  </span>
                </div>
                <p className="text-accent-light text-xs text-center mt-1">
                  {matriculaData.description}
                </p>
              </div>
            </div>
          </form>
        </motion.div>
      )}
    </motion.div>
  );
};

export default MatriculaPage;
