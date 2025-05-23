import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, CheckCircle, Circle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { NavigationBar } from '@/components/NavigationBar';

const TOTAL_SCREENS = 9;

const Seance2 = () => {
  const [currentScreen, setCurrentScreen] = useState(1);
  const [progress, setProgress] = useState({ grammarPoints: 0, exercises: 0, badges: [] });
  const [userAnswers, setUserAnswers] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);

  const exerciseData = {
    recognition: [
      { sentence: "Si j'étais né en 17 à Leidenstadt", verb: "étais né", tense: "plus-que-parfait" },
      { sentence: "J'aurais eu des ancêtres grands et blonds", verb: "aurais eu", tense: "conditionnel passé" },
      { sentence: "Et je pleurais dans la langue de Goethe", verb: "pleurais", tense: "imparfait" }
    ],
    transformation: [
      { present: "Je suis né", answer: "J'étais né" },
      { present: "Il a des ancêtres", answer: "Il avait des ancêtres" },
      { present: "Nous pleurons", answer: "Nous pleurions" }
    ]
  };

  const nextScreen = () => {
    if (currentScreen < TOTAL_SCREENS) {
      setCurrentScreen(currentScreen + 1);
    }
  };

  const prevScreen = () => {
    if (currentScreen > 1) {
      setCurrentScreen(currentScreen - 1);
    }
  };

  const handleAnswer = (screenId, questionId, answer) => {
    setUserAnswers(prev => ({
      ...prev,
      [`${screenId}_${questionId}`]: answer
    }));
  };

  const checkAnswer = (correctAnswer, userAnswer) => {
    if (!correctAnswer || !userAnswer) return false;
    return correctAnswer.toLowerCase() === userAnswer.toLowerCase();
  };

  // Définition des écrans avec Card
  const screens = [
    {
      id: 1,
      component: (
        <Card>
          <CardHeader>
            <CardTitle>Bienvenue dans cette séance</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Dans cette séance, nous allons explorer le plus-que-parfait, le conditionnel passé et l'imparfait à travers des exercices interactifs.</p>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={nextScreen}>Commencer</Button>
          </CardFooter>
        </Card>
      )
    },
    {
      id: 2,
      component: (
        <Card>
          <CardHeader>
            <CardTitle>Objectifs d'apprentissage</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-1">
              <li>Comprendre le plus-que-parfait</li>
              <li>Utiliser le conditionnel passé</li>
              <li>Identifier les verbes à l'imparfait</li>
            </ul>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={nextScreen}>Suivant</Button>
          </CardFooter>
        </Card>
      )
    },
    {
      id: 3,
      component: (
        <Card>
          <CardHeader>
            <CardTitle>Leçon sur le plus-que-parfait</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Le plus-que-parfait est utilisé pour décrire une action antérieure à une autre action passée.</p>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={nextScreen}>Suivant</Button>
          </CardFooter>
        </Card>
      )
    },
    {
      id: 4,
      component: (
        <Card>
          <CardHeader>
            <CardTitle>Exercice de reconnaissance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {exerciseData.recognition.map((item, index) => (
              <div key={index} className="space-y-1">
                <p>{item.sentence}</p>
                <input type="text" onBlur={(e) => handleAnswer(4, index, e.target.value)} placeholder="Votre réponse..." aria-label={`Réponse à la question ${index + 1}`} className="input input-bordered w-full" />
              </div>
            ))}
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={nextScreen}>Vérifier les réponses</Button>
          </CardFooter>
        </Card>
      )
    },
    {
      id: 5,
      component: (
        <Card>
          <CardHeader>
            <CardTitle>Résultats de l'exercice</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {exerciseData.recognition.map((item, index) => (
              <div key={index} className="space-y-1">
                <p>{item.sentence}</p>
                <p>Votre réponse : <span className="font-semibold">{userAnswers[`4_${index}`]}</span></p>
                <p>Correct : {checkAnswer(item.verb, userAnswers[`4_${index}`]) ? <span className="text-green-600">Oui</span> : <span className="text-red-600">Non</span>}</p>
              </div>
            ))}
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={nextScreen}>Suivant</Button>
          </CardFooter>
        </Card>
      )
    },
    {
      id: 6,
      component: (
        <Card>
          <CardHeader>
            <CardTitle>Leçon sur le conditionnel passé</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Le conditionnel passé est utilisé pour exprimer une action qui aurait pu se produire dans le passé sous certaines conditions.</p>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={nextScreen}>Suivant</Button>
          </CardFooter>
        </Card>
      )
    },
    {
      id: 7,
      component: (
        <Card>
          <CardHeader>
            <CardTitle>Exercice de transformation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {exerciseData.transformation.map((item, index) => (
              <div key={index} className="space-y-1">
                <p>{item.present}</p>
                <input type="text" onBlur={(e) => handleAnswer(7, index, e.target.value)} placeholder="Votre réponse..." aria-label={`Réponse à la question de transformation ${index + 1}`} className="input input-bordered w-full" />
              </div>
            ))}
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={nextScreen}>Vérifier les réponses</Button>
          </CardFooter>
        </Card>
      )
    },
    {
      id: 8,
      component: (
        <Card>
          <CardHeader>
            <CardTitle>Résultats de l'exercice de transformation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {exerciseData.transformation.map((item, index) => (
              <div key={index} className="space-y-1">
                <p>{item.present}</p>
                <p>Votre réponse : <span className="font-semibold">{userAnswers[`7_${index}`]}</span></p>
                <p>Correct : {checkAnswer(item.answer, userAnswers[`7_${index}`]) ? <span className="text-green-600">Oui</span> : <span className="text-red-600">Non</span>}</p>
              </div>
            ))}
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={nextScreen}>Suivant</Button>
          </CardFooter>
        </Card>
      )
    },
    {
      id: 9,
      component: (
        <Card>
          <CardHeader>
            <CardTitle>Conclusion</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Félicitations ! Vous avez terminé cette séance.</p>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={() => setCurrentScreen(1)}>Recommencer</Button>
          </CardFooter>
        </Card>
      )
    }
  ];

  const progressPercentage = (currentScreen / TOTAL_SCREENS) * 100;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavigationBar />
      <div className="max-w-4xl mx-auto w-full flex-grow p-4">
        <h1 className="text-2xl font-bold mb-4">Séance 2 : Grammaire et conjugaison</h1>
        {/* Barre de progression */}
        <div className="mb-6">
          <Progress value={progressPercentage} className="h-2 mb-2" />
          <div className="text-sm text-gray-600">
            Écran {currentScreen} / {TOTAL_SCREENS}
          </div>
        </div>
        {/* Contenu de l'écran actuel */}
        {screens.find(screen => screen.id === currentScreen)?.component}
      </div>
      <footer className="bg-slate-900 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">Application éducative basée sur les compétences - "Né en 17 à Leidenstadt"</p>
        </div>
      </footer>
    </div>
  );
};

export default Seance2;
