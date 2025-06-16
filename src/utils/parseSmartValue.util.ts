export const parseSmartValue = (input: string): number | string => {
  const trimmed = input.trim();

  const isNumeric = /^-?\d+(\.\d+)?$/.test(trimmed);

  return isNumeric ? Number(trimmed) : trimmed;
};
