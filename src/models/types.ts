
// Types et interfaces de base pour l'application

export interface Seance {
  id: number;
  title: string;
  duration: string;
  objectives: {
    skill: string;
    knowledge: string;
  };
  phases: {
    id: number;
    title: string;
    duration: string;
    content: string[];
  }[];
  assessment: string;
  extension: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  requiredCompetences: Array<{
    id: string;
    minLevel: "en-cours" | "acquis" | "maîtrisé";
  }>;
  unlocked: boolean;
  progress: number; // 0-100
}

export interface Competence {
  id: string;
  name: string;
  description: string;
  level: "non-acquis" | "en-cours" | "acquis" | "maîtrisé";
  progress: number; // 0-100
}

export interface Progress {
  userId: string;
  seanceId: number;
  screenId: number;
  completed: boolean;
  score?: number;
  lastAccessed: Date;
  activities: {
    id: string;
    completed: boolean;
    score?: number;
  }[];
}

export interface User {
  id: string;
  name: string;
  role: "student" | "teacher";
  progress: Progress[];
  competences: Competence[];
  badges: Badge[];
}

export interface LyricLine {
  text: string;
  startTime: number;
  endTime: number;
  translation?: string;
  analysis?: {
    verbTenses?: string[];
    syntaxStructure?: string;
    keywords?: string[];
  };
}
