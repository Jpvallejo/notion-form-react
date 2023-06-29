export const monthOptions = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

export const useYears = () => {
  const currentYear = new Date().getFullYear();

  return [currentYear, currentYear + 1, currentYear + 2];
};

export const categories = [
    "Alquiler",
    "Expensas",
    "Cochera",
    "Metrogas",
    "Edenor",
    "Agip"
]
