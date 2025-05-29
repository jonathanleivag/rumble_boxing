export const textRating = (rating: number): string => {
  switch (rating) {
    case 1:
      return "Muy malo";
    case 2:
      return "Malo";
    case 3:
      return "Regular";
    case 4:
      return "Bueno";
    case 5:
      return "Excelente";
    default:
      return "No calificado";
  }
};
