
import React, { createContext, useContext, useState, ReactNode } from "react";
import { Progress } from "../models/types";

interface ProgressContextType {
  progress: Progress[];
  updateProgress: (seanceId: number, screenId: number, completed: boolean) => void;
  getSeanceProgress: (seanceId: number) => number;
  isScreenCompleted: (seanceId: number, screenId: number) => boolean;
}

const defaultContext: ProgressContextType = {
  progress: [],
  updateProgress: () => {},
  getSeanceProgress: () => 0,
  isScreenCompleted: () => false,
};

const ProgressContext = createContext<ProgressContextType>(defaultContext);

export const useProgress = () => useContext(ProgressContext);

export const ProgressProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<Progress[]>([
    // Exemple de données initiales pour un utilisateur
    {
      userId: "user1",
      seanceId: 1,
      screenId: 1,
      completed: false,
      lastAccessed: new Date(),
      activities: [],
    },
  ]);

  const updateProgress = (seanceId: number, screenId: number, completed: boolean) => {
    setProgress((prev) => {
      // Rechercher si un enregistrement de progression existe déjà pour cette séance/écran
      const existingProgressIndex = prev.findIndex(
        (p) => p.seanceId === seanceId && p.screenId === screenId
      );

      if (existingProgressIndex >= 0) {
        // Mettre à jour l'entrée existante
        const updatedProgress = [...prev];
        updatedProgress[existingProgressIndex] = {
          ...updatedProgress[existingProgressIndex],
          completed,
          lastAccessed: new Date(),
        };
        return updatedProgress;
      } else {
        // Créer une nouvelle entrée
        return [
          ...prev,
          {
            userId: "user1", // Pour l'instant un ID fixe
            seanceId,
            screenId,
            completed,
            lastAccessed: new Date(),
            activities: [],
          },
        ];
      }
    });
  };

  const getSeanceProgress = (seanceId: number): number => {
    // Calculer le pourcentage d'écrans complétés pour une séance donnée
    const seanceScreens = progress.filter((p) => p.seanceId === seanceId);
    if (seanceScreens.length === 0) return 0;

    const completedScreens = seanceScreens.filter((p) => p.completed).length;
    return Math.round((completedScreens / seanceScreens.length) * 100);
  };

  const isScreenCompleted = (seanceId: number, screenId: number): boolean => {
    const screen = progress.find(
      (p) => p.seanceId === seanceId && p.screenId === screenId
    );
    return screen ? screen.completed : false;
  };

  return (
    <ProgressContext.Provider
      value={{
        progress,
        updateProgress,
        getSeanceProgress,
        isScreenCompleted,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};
