
// src/models/activity.ts

export interface Activity {
  id: string;
  title: string;
  type: ActivityType;
  config: ActivityConfig;
  data?: any;
}

export enum ActivityType {
  QUIZ = 'quiz',
  TEXT_ANALYSIS = 'text_analysis',
  AUDIO_SYNC = 'audio_sync',
  WORD_CLOUD = 'word_cloud',
  FORUM = 'forum',
  WRITING = 'writing'
}

export enum ActivityStatus {
  NOT_STARTED = 'not_started',
  IN_PROGRESS = 'in_progress',
  SUBMITTED = 'submitted',
  EVALUATED = 'evaluated',
  COMPLETED = 'completed'
}

export interface ActivityConfig {
  id: string;
  title: string;
  type: ActivityType;
  description: string;
  instructions: string;
  duration: number;
  difficulty: number;
  competences?: string[];
}

export interface ActivityProgress {
  activityId: string;
  status: ActivityStatus;
  attempts: number;
  startedAt?: Date;
  submittedAt?: Date;
  completedAt?: Date;
  score?: number;
  feedback?: string;
  data: any;
}
