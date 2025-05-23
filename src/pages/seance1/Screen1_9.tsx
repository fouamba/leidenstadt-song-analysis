
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSpeech } from "@/hooks/useSpeech";

interface Screen1_9Props {
  onComplete: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

const Screen1_9: React.FC<Screen1_9Props> = ({ onComplete, onNext, onPrevious }) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const { speak } = useSpeech();

  useEffect(() => {
    speak("Bienvenue à l'écran 9 de la séance 1.");
    // Mark as complete for demonstration
    setIsCompleted(true);
    onComplete();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Écran 9</h2>
      
      <Card className="p-4">
        <p>Contenu de l'écran 9</p>
      </Card>
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrevious}>
          Retour
        </Button>
        <Button onClick={onNext} disabled={!isCompleted}>
          Continuer
        </Button>
      </div>
    </div>
  );
};

export default Screen1_9;
