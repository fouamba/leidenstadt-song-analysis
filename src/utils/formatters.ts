
// Fonctions de formatage pour l'application

// Formater un temps en secondes vers format mm:ss
export const formatTime = (seconds: number): string => {
  if (isNaN(seconds)) return "00:00";
  
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
};

// Formater une date
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};

// Formatter un pourcentage
export const formatPercentage = (value: number): string => {
  return `${Math.round(value)}%`;
};
