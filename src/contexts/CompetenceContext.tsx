
import React, { createContext, useContext, useState, ReactNode } from "react";
import { Competence, Badge } from "../models/types";
import { competencies, badges as initialBadges } from "../data/competencies";

interface CompetenceContextType {
  competences: Competence[];
  badges: Badge[];
  updateCompetence: (id: string, progress: number) => void;
  getCompetenceLevel: (id: string) => string;
}

const defaultContext: CompetenceContextType = {
  competences: [],
  badges: [],
  updateCompetence: () => {},
  getCompetenceLevel: () => "non-acquis",
};

const CompetenceContext = createContext<CompetenceContextType>(defaultContext);

export const useCompetence = () => useContext(CompetenceContext);

export const CompetenceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [competences, setCompetences] = useState<Competence[]>(competencies);
  const [badges, setBadges] = useState<Badge[]>(initialBadges);

  // Mettre à jour la progression d'une compétence
  const updateCompetence = (id: string, newProgress: number) => {
    setCompetences((prev) =>
      prev.map((comp) => {
        if (comp.id === id) {
          // Déterminer le nouveau niveau en fonction de la progression
          let level: "non-acquis" | "en-cours" | "acquis" | "maîtrisé" = "non-acquis";
          if (newProgress >= 80) level = "maîtrisé";
          else if (newProgress >= 60) level = "acquis";
          else if (newProgress >= 30) level = "en-cours";

          return {
            ...comp,
            progress: newProgress,
            level,
          };
        }
        return comp;
      })
    );

    // Après mise à jour des compétences, vérifier et mettre à jour les badges
    updateBadges();
  };

  // Vérifier et mettre à jour le statut de tous les badges
  const updateBadges = () => {
    setBadges((prevBadges) =>
      prevBadges.map((badge) => {
        const totalRequirements = badge.requiredCompetences.length;
        let metRequirements = 0;

        badge.requiredCompetences.forEach((req) => {
          const userCompetence = competences.find((c) => c.id === req.id);
          if (userCompetence) {
            const levels = ["non-acquis", "en-cours", "acquis", "maîtrisé"];
            const userLevel = levels.indexOf(userCompetence.level);
            const requiredLevel = levels.indexOf(req.minLevel);

            if (userLevel >= requiredLevel) {
              metRequirements++;
            }
          }
        });

        const progress = (metRequirements / totalRequirements) * 100;
        const unlocked = progress === 100;

        return { ...badge, progress, unlocked };
      })
    );
  };

  // Récupérer le niveau d'une compétence par son ID
  const getCompetenceLevel = (id: string): string => {
    const competence = competences.find((c) => c.id === id);
    return competence ? competence.level : "non-acquis";
  };

  return (
    <CompetenceContext.Provider
      value={{
        competences,
        badges,
        updateCompetence,
        getCompetenceLevel,
      }}
    >
      {children}
    </CompetenceContext.Provider>
  );
};
