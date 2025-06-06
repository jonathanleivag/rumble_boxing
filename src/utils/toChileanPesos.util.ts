export const toChileanPesos = (value: number): string => {
  return value.toLocaleString("es-CL", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};
