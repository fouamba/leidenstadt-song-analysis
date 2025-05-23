// src/hooks/useActivity.ts
import { useState, useEffect, useContext } from 'react';
import { ActivityConfig, ActivityProgress, ActivityStatus } from '../models/activity';
import { ProgressContext } from '../contexts/ProgressContext';
import { CompetenceContext } from '../contexts/CompetenceContext';
// AdaptationContext à créer si besoin

interface UseActivityProps {
  config: ActivityConfig;
  onComplete?: (progress: ActivityProgress) => void;
  onStatusChange?: (status: ActivityStatus) => void;
}

export function useActivity({ config, onComplete, onStatusChange }: UseActivityProps) {
  const { saveProgress, getActivityProgress } = useContext(ProgressContext);
  const { updateCompetences } = useContext(CompetenceContext);
  // const { adaptToUser } = useContext(AdaptationContext); // à implémenter si besoin

  const [progress, setProgress] = useState<ActivityProgress>(() => {
    const saved = getActivityProgress ? getActivityProgress(config.id) : null;
    return saved || {
      activityId: config.id,
      status: ActivityStatus.NOT_STARTED,
      attempts: 0,
      data: {}
    };
  });

  // Démarrer l'activité
  const startActivity = () => {
    const updatedProgress = {
      ...progress,
      status: ActivityStatus.IN_PROGRESS,
      startedAt: progress.startedAt || new Date(),
      attempts: progress.attempts + (progress.status === ActivityStatus.NOT_STARTED ? 0 : 1)
    };
    setProgress(updatedProgress);
    if (saveProgress) saveProgress(updatedProgress);
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
    if (saveProgress) saveProgress(updatedProgress);
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
    if (saveProgress) saveProgress(updatedProgress);
    // Mise à jour des compétences basée sur le score
    if (updateCompetences && config.competences) {
      const competencesUpdate = config.competences.map(id => {
        let level = 'non-acquis';
        if (score >= 90) level = 'maîtrisé';
        else if (score >= 70) level = 'acquis';
        else if (score >= 50) level = 'en-cours';
        return { id, level };
      });
      updateCompetences(competencesUpdate);
    }
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
    if (saveProgress) saveProgress(updatedProgress);
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
