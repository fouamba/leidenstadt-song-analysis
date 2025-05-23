// src/components/ActivityModule.tsx
import React, { useState, useEffect } from 'react';
import { useActivity } from '../hooks/useActivity';
import { ActivityConfig, ActivityStatus } from '../models/activity';
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/card';
import { Badge } from './ui/badge';

interface ActivityModuleProps {
  config: ActivityConfig;
  children: React.ReactNode;
  renderControls?: (controls: {
    start: () => void;
    submit: (data: any) => void;
    save: (data: any) => void;
    status: ActivityStatus;
  }) => React.ReactNode;
  onComplete?: (score: number, feedback?: string) => void;
}

export const ActivityModule: React.FC<ActivityModuleProps> = ({
  config,
  children,
  renderControls,
  onComplete
}) => {
  const {
    progress,
    startActivity,
    submitActivity,
    completeActivity,
    saveActivityState
  } = useActivity({
    config,
    onComplete: (p) => {
      if (onComplete && p.score !== undefined) {
        onComplete(p.score, p.feedback);
      }
    }
  });

  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (progress.status === ActivityStatus.NOT_STARTED) {
      setIsExpanded(false);
    }
  }, [progress.status]);

  const handleStart = () => {
    startActivity();
    setIsExpanded(true);
  };

  const handleSubmit = (data: any) => {
    submitActivity(data);
    setTimeout(() => {
      const mockScore = Math.floor(Math.random() * 30) + 70; // Score fictif
      completeActivity(mockScore, "Bonne compréhension générale!");
    }, 1000);
  };

  const controls = {
    start: handleStart,
    submit: handleSubmit,
    save: saveActivityState,
    status: progress.status
  };

  return (
    <Card className="activity-module">
      <div className="activity-header cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <h3>{config.title}</h3>
        <div className="activity-meta flex gap-2 items-center">
          <Badge variant={config.difficulty === 1 ? "success" : config.difficulty === 2 ? "warning" : "danger"}>
            {config.difficulty === 1 ? "Facile" : config.difficulty === 2 ? "Moyen" : "Difficile"}
          </Badge>
          <span className="duration">{config.duration} min</span>
          <Badge variant={
            progress.status === ActivityStatus.COMPLETED ? "success" : 
            progress.status === ActivityStatus.IN_PROGRESS ? "info" : 
            "secondary"
          }>
            {progress.status === ActivityStatus.NOT_STARTED ? "À faire" : 
             progress.status === ActivityStatus.IN_PROGRESS ? "En cours" : 
             progress.status === ActivityStatus.SUBMITTED ? "Soumis" : 
             progress.status === ActivityStatus.EVALUATED ? "Évalué" : 
             "Terminé"}
          </Badge>
        </div>
      </div>
      {isExpanded && (
        <div className="activity-content">
          {progress.status === ActivityStatus.NOT_STARTED && (
            <div className="activity-start">
              <p>{config.description}</p>
              <Button onClick={handleStart}>Commencer</Button>
            </div>
          )}
          {progress.status !== ActivityStatus.NOT_STARTED && (
            <>
              <div className="activity-instructions">
                <p>{config.instructions}</p>
              </div>
              <div className="activity-body">
                {children}
              </div>
              <div className="activity-controls">
                {renderControls ? renderControls(controls) : (
                  <div className="default-controls">
                    {progress.status === ActivityStatus.IN_PROGRESS && (
                      <Button onClick={() => handleSubmit({})} variant="primary">Soumettre</Button>
                    )}
                    {progress.status === ActivityStatus.COMPLETED && progress.score !== undefined && (
                      <div className="activity-feedback">
                        <h4>Résultat: {progress.score}/100</h4>
                        {progress.feedback && <p>{progress.feedback}</p>}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </Card>
  );
};
