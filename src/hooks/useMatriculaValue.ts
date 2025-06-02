import { useState, useEffect } from "react";

export const useMatriculaValue = () => {
  const [matricula, setMatricula] = useState({
    value: 0,
    description: "",
    isLoading: true,
    error: null as string | null,
  });

  useEffect(() => {
    const fetchMatricula = async () => {
      try {
        const response = await fetch("/api/matricula");

        if (!response.ok) {
          throw new Error("Error al cargar el valor de la matrícula");
        }

        const data = await response.json();

        if (data && data.data) {
          setMatricula({
            value: data.data.value || 0,
            description: data.data.description || "",
            isLoading: false,
            error: null,
          });
        } else {
          setMatricula({
            value: 0,
            description: "",
            isLoading: false,
            error: null,
          });
        }
      } catch (error) {
        console.error("Error fetching matricula:", error);
        setMatricula((prev) => ({
          ...prev,
          isLoading: false,
          error: "No se pudo cargar el valor de la matrícula",
        }));
      }
    };

    fetchMatricula();
  }, []);

  return matricula;
};
