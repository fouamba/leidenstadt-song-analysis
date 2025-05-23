// src/models/activity.ts
export type ActivityType = 
  | 'quiz' 
  | 'dragAndDrop' 
  | 'textAnalysis'
  | 'writing'
  | 'interactiveReading'
  | 'collaboration'
  | 'evaluation';

export enum ActivityStatus {
  NOT_STARTED = 'not_started',
  IN_PROGRESS = 'in_progress',
  SUBMITTED = 'submitted',
  EVALUATED = 'evaluated',
  COMPLETED = 'completed'
}

export enum CompetenceLevel {
  NOT_ACQUIRED = 'non-acquis',
  IN_PROGRESS = 'en-cours',
  ACQUIRED = 'acquis',
  MASTERED = 'maîtrisé'
}

export interface Competence {
  id: string;
  name: string;
  description: string;
  level: CompetenceLevel;
}

export interface ActivityConfig {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  instructions: string;
  duration: number; // En minutes
  difficulty: 1 | 2 | 3; // 1=facile, 2=moyen, 3=difficile
  competences: string[]; // IDs des compétences travaillées
  prerequisiteActivities?: string[]; // Activités qui doivent être complétées avant
  adaptative?: boolean; // Si l'activité s'adapte au niveau de l'élève
  isOptional?: boolean;
  resources?: {
    id: string;
    type: 'audio' | 'video' | 'text' | 'image';
    url: string;
  }[];
}

export interface ActivityProgress {
  activityId: string;
  status: ActivityStatus;
  startedAt?: Date;
  submittedAt?: Date;
  completedAt?: Date;
  attempts: number;
  score?: number; // 0-100
  feedback?: string;
  data?: any; // Données spécifiques à l'activité
}
