
// src/hooks/useActivity.ts
import { useState, useEffect } from 'react';
import { ActivityConfig, ActivityProgress, ActivityStatus } from '../models/activity';

interface UseActivityProps {
  config: ActivityConfig;
  onComplete?: (progress: ActivityProgress) => void;
  onStatusChange?: (status: ActivityStatus) => void;
}

export function useActivity({ config, onComplete, onStatusChange }: UseActivityProps) {
  const [progress, setProgress] = useState<ActivityProgress>(() => {
    // For now, we'll use localStorage instead of context
    const saved = localStorage.getItem(`activity_${config.id}`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // If parsing fails, return default
      }
    }
    return {
      activityId: config.id,
      status: ActivityStatus.NOT_STARTED,
      attempts: 0,
      data: {}
    };
  });

  // Save to localStorage whenever progress changes
  useEffect(() => {
    localStorage.setItem(`activity_${config.id}`, JSON.stringify(progress));
  }, [progress, config.id]);

  // Démarrer l'activité
  const startActivity = () => {
    const updatedProgress = {
      ...progress,
      status: ActivityStatus.IN_PROGRESS,
      startedAt: progress.startedAt || new Date(),
      attempts: progress.attempts + (progress.status === ActivityStatus.NOT_STARTED ? 0 : 1)
    };
    setProgress(updatedProgress);
    if (onStatusChange) onStatusChange(ActivityStatus.IN_PROGRESS);
  };

  // Soumettre l'activité
  const submitActivity = (data: any) => {
    const updatedProgress = {
      ...progress,
      status: ActivityStatus.SUBMITTED,
      submittedAt: new Date(),
      data
    };
    setProgress(updatedProgress);
    if (onStatusChange) onStatusChange(ActivityStatus.SUBMITTED);
    return updatedProgress;
  };

  // Compléter l'activité (avec évaluation)
  const completeActivity = (score: number, feedback?: string) => {
    const updatedProgress = {
      ...progress,
      status: ActivityStatus.COMPLETED,
      completedAt: new Date(),
      score,
      feedback
    };
    setProgress(updatedProgress);
    if (onStatusChange) onStatusChange(ActivityStatus.COMPLETED);
    if (onComplete) onComplete(updatedProgress);
    return updatedProgress;
  };

  // Sauvegarder l'état en cours de l'activité
  const saveActivityState = (data: any) => {
    const updatedProgress = {
      ...progress,
      data: {
        ...progress.data,
        ...data
      }
    };
    setProgress(updatedProgress);
    return updatedProgress;
  };

  return {
    config,
    progress,
    startActivity,
    submitActivity,
    completeActivity,
    saveActivityState,
  };
}
