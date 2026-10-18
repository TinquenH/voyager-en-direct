const integerFormatter = new Intl.NumberFormat("fr-FR", {
  maximumFractionDigits: 0,
});

const decimalFormatter = new Intl.NumberFormat("fr-FR", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const formatInteger = (num) => {
  return integerFormatter.format(num);
};

export const formatDecimal = (num) => {
  return decimalFormatter.format(num);
};

export const formatDuration = (seconds) => {
  const minutes = Math.round(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const minutesLeft = minutes % 60;

  return `${hours} h ${String(minutesLeft).padStart(2, "0")} min`;
};
