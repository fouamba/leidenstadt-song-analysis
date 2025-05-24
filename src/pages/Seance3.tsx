import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Award,
  Lightbulb,
  Users,
  BookOpen,
  Check,
  X,
  Star,
  Shuffle,
  Edit3,
  MessageCircle,
  BarChart3,
  Eye,
  Volume2,
  Video,
  HelpCircle,
  FileText
} from 'lucide-react';

// === Début du composant principal Séance 3 ===
const Seance3Conditionnel = () => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [userResponses, setUserResponses] = useState(Array(4).fill(''));
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [timer, setTimer] = useState(30);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const screens = [
    {
      id: 1,
      content: (
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Bienvenue dans la Séance 3</h2>
          <p>
            Dans cette séance, nous allons explorer le conditionnel en français. Êtes-vous prêt
            à commencer?
          </p>
        </div>
      )
    },
    {
      id: 2,
      content: (
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Le Conditionnel Présent</h2>
          <p>
            Le conditionnel présent est utilisé pour exprimer un fait qui pourrait se produire
            sous certaines conditions. Par exemple, "Si j'avais de l'argent, je voyagerais
            autour du monde."
          </p>
        </div>
      )
    },
    {
      id: 3,
      content: (
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Exercice 1</h2>
          <p>Complétez la phrase avec la bonne forme du verbe au conditionnel:</p>
          <p>
            Si j'étais riche, je {''}
            <Input
              value={userResponses[0]}
              onChange={(e) => handleResponseChange(e, 0)}
              placeholder="verbe au conditionnel"
            />
            autour du monde.
          </p>
        </div>
      )
    },
    {
      id: 4,
      content: (
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Résultats</h2>
          <p>Votre score: {score} / 1</p>
          <Button onClick={handleRestart}>Recommencer</Button>
        </div>
      )
    }
  ];

  const handleResponseChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newResponses = [...userResponses];
    newResponses[index] = e.target.value;
    setUserResponses(newResponses);
  };

  const handleNextScreen = () => {
    if (currentScreen < screens.length - 1) {
      setCurrentScreen(currentScreen + 1);
    }
  };

  const handlePrevScreen = () => {
    if (currentScreen > 0) {
      setCurrentScreen(currentScreen - 1);
    }
  };

  const handleSubmit = () => {
    // Logique de soumission des réponses
    const calculatedScore = userResponses.filter((response) => response !== '').length;
    setScore(calculatedScore);
    setShowResults(true);
  };

  const handleRestart = () => {
    setCurrentScreen(0);
    setUserResponses(Array(4).fill(''));
    setScore(0);
    setShowResults(false);
    setTimer(30);
    setIsPaused(false);
  };

  useEffect(() => {
    if (timer === 0) {
      setIsPaused(true);
      // Logique à exécuter lorsque le temps est écoulé
    }
  }, [timer]);

  useEffect(() => {
    if (isPaused) return;

    intervalRef.current = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused]);

  const renderScreen = () => {
    if (showResults) {
      return (
        <Card>
          <CardHeader>
            <CardTitle>Résultats</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Votre score: {score} / 1</p>
            <Button onClick={handleRestart}>Recommencer</Button>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card>
        <CardHeader>
          <CardTitle>{`Écran ${currentScreen + 1}`}</CardTitle>
        </CardHeader>
        <CardContent>
          {screens[currentScreen].content}
          <div className="flex justify-between mt-4">
            <Button
              disabled={currentScreen === 0}
              onClick={handlePrevScreen}
              variant="outline"
            >
              Précédent
            </Button>
            <Button
              onClick={
                currentScreen === screens.length - 1 ? handleSubmit : handleNextScreen
              }
            >
              {currentScreen === screens.length - 1 ? 'Soumettre' : 'Suivant'}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-extrabold mb-4">Séance 3: Le Conditionnel</h1>
      <Progress value={(currentScreen / screens.length) * 100} className="mb-4" />
      {renderScreen()}
      <div className="mt-4">
        <Badge>{`Temps restant: ${timer} secondes`}</Badge>
      </div>
    </div>
  );
};

const Seance3 = Seance3Conditionnel;

export default Seance3;
