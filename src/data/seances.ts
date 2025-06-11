import { StaticImageData } from "next/image";

export type Seance = {
    id: number;
    title: string;
    objectives: {
        skill: string;
        knowledge: string;
        competence: string;
    };
    duration: string;
    materials: string[];
    image?: StaticImageData;
    screens: number;
}

export const seances: Seance[] = [
  {
    id: 1,
    title: "Découverte et compréhension globale de l'œuvre",
    objectives: {
      skill: "Comprendre et analyser une chanson engagée dans son contexte historique",
      knowledge: "Contexte historique de l'Allemagne post-1918, structure narrative de la chanson",
      competence: "Compréhension de l'oral, analyse littéraire"
    },
    duration: "2h30",
    materials: ["Audio de la chanson", "Texte intégral", "Documents historiques"],
    screens: 9
  },
  {
    id: 2,
    title: "L'expression du passé par les temps de l'indicatif",
    objectives: {
      skill: "Maîtriser l'emploi des temps du passé dans l'expression de l'irréel",
      knowledge: "Imparfait, plus-que-parfait, passé composé : valeurs et emplois",
      competence: "Grammaire, expression écrite"
    },
    duration: "2h00",
    materials: ["Extraits du texte", "Tableaux de conjugaison", "Exercices"],
    screens: 8
  },
  {
    id: 3,
    title: "L'expression du possible et de l'hypothétique",
    objectives: {
      skill: "Analyser les structures conditionnelles et leur valeur stylistique",
      knowledge: "Mode conditionnel, subordonnées conditionnelles, hypothèse irréelle",
      competence: "Analyse grammaticale, stylistique"
    },
    duration: "2h15",
    materials: ["Corpus de phrases", "Schémas syntaxiques", "Textes de comparaison"],
    screens: 7
  },
  {
    id: 4,
    title: "La phrase complexe et la communication artistique",
    objectives: {
      skill: "Analyser la dimension artistique et philosophique de l'œuvre",
      knowledge: "Phrase complexe, figures de style, argumentaire philosophique",
      competence: "Analyse littéraire, expression écrite, débat argumenté"
    },
    duration: "2h30",
    materials: ["Texte intégral", "Outils d'analyse stylistique", "Forum de discussion"],
    screens: 8
  }
];
