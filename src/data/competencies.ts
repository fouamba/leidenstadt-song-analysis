
import { Competence, Badge } from "../models/types";

export const competencies: Competence[] = [
  {
    id: "comp-1",
    name: "Analyse des temps verbaux",
    description: "Capacité à identifier et comprendre l'emploi des temps verbaux dans un texte",
    level: "non-acquis",
    progress: 0,
  },
  {
    id: "comp-2",
    name: "Utilisation du conditionnel",
    description: "Maîtrise du mode conditionnel pour exprimer l'hypothèse et le possible",
    level: "non-acquis",
    progress: 0,
  },
  {
    id: "comp-3",
    name: "Analyse syntaxique",
    description: "Capacité à analyser la structure syntaxique de phrases complexes",
    level: "non-acquis",
    progress: 0,
  },
  {
    id: "comp-4",
    name: "Interprétation artistique",
    description: "Compétence en interprétation d'une œuvre artistique et de son message",
    level: "non-acquis",
    progress: 0,
  },
  {
    id: "comp-5",
    name: "Production argumentée",
    description: "Capacité à produire un commentaire personnel argumenté",
    level: "non-acquis",
    progress: 0,
  },
];

export const badges: Badge[] = [
  {
    id: "badge-1",
    name: "Découvreur",
    description: "A terminé la première séance d'exploration de l'œuvre",
    imageUrl: "/badges/badge-decouverte.svg",
    requiredCompetences: [
      { id: "comp-4", minLevel: "en-cours" as const },
    ],
    unlocked: false,
    progress: 0,
  },
  {
    id: "badge-2",
    name: "Maître du passé",
    description: "Maîtrise l'emploi et les valeurs des temps du passé",
    imageUrl: "/badges/badge-passe.svg",
    requiredCompetences: [
      { id: "comp-1", minLevel: "acquis" as const },
    ],
    unlocked: false,
    progress: 0,
  },
  {
    id: "badge-3",
    name: "Maître de l'hypothèse",
    description: "Expert dans l'analyse et l'utilisation du mode conditionnel",
    imageUrl: "/badges/badge-conditionnel.svg",
    requiredCompetences: [
      { id: "comp-2", minLevel: "acquis" as const },
    ],
    unlocked: false,
    progress: 0,
  },
  {
    id: "badge-4",
    name: "Analyste artistique",
    description: "A complété l'intégralité de la séquence d'apprentissage",
    imageUrl: "/badges/badge-analyste.svg",
    requiredCompetences: [
      { id: "comp-1", minLevel: "acquis" as const },
      { id: "comp-2", minLevel: "acquis" as const },
      { id: "comp-3", minLevel: "acquis" as const },
      { id: "comp-4", minLevel: "acquis" as const },
      { id: "comp-5", minLevel: "acquis" as const },
    ],
    unlocked: false,
    progress: 0,
  },
];
