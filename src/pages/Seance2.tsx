
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipForward, SkipBack, CheckCircle, AlertCircle, BookOpen, PenTool, Award, BarChart3, Volume2, Eye, EyeOff } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

const Seance2 = () => {
  const [currentScreen, setCurrentScreen] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [userProgress, setUserProgress] = useState({
    screen1: { completed: false, score: 0 },
    screen2: { completed: false, score: 0 },
    screen3: { completed: false, score: 0 },
    screen4: { completed: false, score: 0 },
    screen5: { completed: false, score: 0 },
    screen6: { completed: false, score: 0 },
    screen7: { completed: false, score: 0 },
    screen8: { completed: false, score: 0 },
    screen9: { completed: false, score: 0 }
  });
  const [showLyrics, setShowLyrics] = useState(false);

  const navigation = {
    next: () => setCurrentScreen(prev => Math.min(prev + 1, 9)),
    prev: () => setCurrentScreen(prev => Math.max(prev - 1, 1)),
    goTo: (screen: number) => setCurrentScreen(screen)
  };

  const markCompleted = (screen: number, score = 100) => {
    setUserProgress(prev => ({
      ...prev,
      [`screen${screen}`]: { completed: true, score }
    }));
  };

  // Écran 2.1 : Activation des connaissances
  const Screen1 = () => {
    const [quizAnswers, setQuizAnswers] = useState<{[key: number]: number}>({});
    const [showResults, setShowResults] = useState(false);

    const questions = [
      {
        id: 1,
        question: "Quel est le thème principal de 'Né en 17 à Leidenstadt' ?",
        options: ["L'amour", "Le destin et les choix", "La guerre", "La famille"],
        correct: 1
      },
      {
        id: 2,
        question: "Dans quel contexte historique se situe la chanson ?",
        options: ["XXe siècle - conflits mondiaux", "Moyen Âge", "Renaissance", "Époque contemporaine"],
        correct: 0
      },
      {
        id: 3,
        question: "Quelle est la structure grammaticale principale utilisée ?",
        options: ["Présent de l'indicatif", "Hypothèses conditionnelles", "Futur simple", "Passé composé"],
        correct: 1
      }
    ];

    const handleSubmit = () => {
      setShowResults(true);
      const score = Object.values(quizAnswers).filter((answer, index) => 
        answer === questions[index].correct
      ).length;
      markCompleted(1, (score / questions.length) * 100);
    };

    return (
      <div className="container mx-auto p-6">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-blue-600" />
              Activation des connaissances
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
              <p className="text-blue-800">
                Commençons par vérifier vos acquis de la séance précédente. 
                Répondez aux questions suivantes pour activer vos connaissances.
              </p>
            </div>

            <div className="space-y-6">
              {questions.map((q, index) => (
                <Card key={q.id} className="border rounded-lg p-4 bg-gray-50">
                  <h3 className="font-semibold mb-3 text-gray-800">{q.question}</h3>
                  <div className="space-y-2">
                    {q.options.map((option, optIndex) => (
                      <label key={optIndex} className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer">
                        <input
                          type="radio"
                          name={`question-${q.id}`}
                          value={optIndex}
                          onChange={(e) => setQuizAnswers({...quizAnswers, [index]: parseInt(e.target.value)})}
                          className="mr-3"
                        />
                        <span className={showResults ? 
                          (optIndex === q.correct ? 'text-green-600 font-semibold' : 
                           quizAnswers[index] === optIndex ? 'text-red-600' : 'text-gray-700') 
                          : 'text-gray-700'}>
                          {option}
                        </span>
                        {showResults && optIndex === q.correct && <CheckCircle className="w-4 h-4 text-green-600 ml-2" />}
                      </label>
                    ))}
                  </div>
                </Card>
              ))}
            </div>

            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Progression : {Object.values(userProgress).filter(p => p.completed).length}/9 écrans terminés
              </div>
              {!showResults ? (
                <Button
                  onClick={handleSubmit}
                  disabled={Object.keys(quizAnswers).length < questions.length}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Valider les réponses
                </Button>
              ) : (
                <Button
                  onClick={navigation.next}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Continuer <SkipForward className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  // Écran 2.2 : Exploration ciblée
  const Screen2 = () => {
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const audioRef = useRef<HTMLAudioElement>(null);

    const lyrics = `Si j'étais né en 17 à Leidenstadt
Sur les ruines d'un champ de bataille
Aurais-je été meilleur ou pire ?
Que ce garçon né dans un lit de satin...`;

    const question = {
      question: "Dans 'Si j'étais né...', quel est l'emploi de l'imparfait ?",
      options: [
        "Action habituelle dans le passé",
        "Irréel du passé/hypothèse",
        "Description d'un état",
        "Action en cours dans le passé"
      ],
      correct: 1,
      explanation: "L'imparfait exprime ici une hypothèse irréelle sur le passé, introduite par 'Si'."
    };

    return (
      <div className="container mx-auto p-6">
        <Card className="max-w-6xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Volume2 className="w-6 h-6 text-purple-600" />
              Exploration ciblée du premier couplet
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Card className="bg-purple-50 border-purple-200">
                  <CardHeader>
                    <CardTitle className="text-lg text-purple-800">Lecteur audio ciblé</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <Button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="bg-purple-600 hover:bg-purple-700 p-3 rounded-full"
                      >
                        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                      </Button>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-600 h-2 rounded-full w-1/3"></div>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => setShowLyrics(!showLyrics)}
                        className="flex items-center text-purple-600"
                      >
                        {showLyrics ? <EyeOff className="w-4 h-4 mr-1" /> : <Eye className="w-4 h-4 mr-1" />}
                        Paroles
                      </Button>
                    </div>
                    
                    <audio ref={audioRef} src="/Ne-en-17-a-Leidenstadt.mp3" />
                    
                    {showLyrics && (
                      <Card className="bg-white p-4">
                        <pre className="text-gray-700 whitespace-pre-wrap font-serif leading-relaxed">
                          {lyrics}
                        </pre>
                      </Card>
                    )}
                  </CardContent>
                </Card>

                <Card className="bg-amber-50 border-l-4 border-amber-500">
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-amber-800 mb-2">Animation linguistique</h4>
                    <div className="space-y-2">
                      <Card className="p-2 bg-white">
                        <span className="text-blue-600 font-semibold">Si</span>
                        <span className="mx-2">+</span>
                        <span className="text-green-600 font-semibold">j'étais né</span>
                        <span className="mx-2">(imparfait)</span>
                        <span className="mx-2">→</span>
                        <span className="text-red-600 font-semibold">Hypothèse irréelle</span>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <Card className="bg-gray-50">
                  <CardHeader>
                    <CardTitle className="text-lg">Questionnement guidé</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-gray-700">{question.question}</p>
                    {question.options.map((option, index) => (
                      <label key={index} className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer">
                        <input
                          type="radio"
                          name="structure"
                          value={index}
                          onChange={(e) => setSelectedAnswer(parseInt(e.target.value))}
                          className="mr-3"
                        />
                        <span className="text-gray-700">{option}</span>
                      </label>
                    ))}

                    {selectedAnswer !== null && (
                      <Card className={`mt-4 p-4 ${selectedAnswer === question.correct ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'} border`}>
                        <div className="flex items-center mb-2">
                          {selectedAnswer === question.correct ? 
                            <CheckCircle className="w-5 h-5 text-green-600 mr-2" /> : 
                            <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                          }
                          <span className="font-semibold">
                            {selectedAnswer === question.correct ? 'Correct !' : 'Incorrect'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700">{question.explanation}</p>
                      </Card>
                    )}
                  </CardContent>
                </Card>

                {selectedAnswer === question.correct && (
                  <Button
                    onClick={() => {
                      markCompleted(2);
                      navigation.next();
                    }}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    Continuer vers l'analyse <SkipForward className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  // Navigation principale
  const NavigationBar = () => (
    <div className="bg-white shadow-sm border-b sticky top-0 z-10">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-gray-800">Séance 2 - Expression du Passé</h1>
            <div className="text-sm text-gray-600">
              Écran {currentScreen}/9
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
              <Button
                key={num}
                variant={currentScreen === num ? "default" : userProgress[`screen${num}`]?.completed ? "secondary" : "outline"}
                size="sm"
                onClick={() => navigation.goTo(num)}
                className="w-8 h-8 p-0"
              >
                {userProgress[`screen${num}`]?.completed ? <CheckCircle className="w-4 h-4" /> : num}
              </Button>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={navigation.prev}
              disabled={currentScreen === 1}
            >
              <SkipBack className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={navigation.next}
              disabled={currentScreen === 9}
            >
              <SkipForward className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <div className="mt-2">
          <Progress value={(currentScreen / 9) * 100} className="h-2" />
        </div>
      </div>
    </div>
  );

  // Écrans simplifiés pour compléter la séance
  const SimpleScreen = ({ screenNum, title, description, icon: React.ElementType, bgColor = "blue" }) => (
    <div className="container mx-auto p-6">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <icon className={`w-6 h-6 text-${bgColor}-600`} />
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          <p className="text-gray-600">{description}</p>
          <Card className="bg-gray-50 p-6">
            <p className="text-gray-700">Contenu de l'écran {screenNum} à développer...</p>
            <p className="text-sm text-gray-500 mt-2">
              Cette interface fournit la structure de base pour implémenter les fonctionnalités complètes.
            </p>
          </Card>
          <Button
            onClick={() => {
              markCompleted(screenNum);
              if (screenNum < 9) navigation.next();
            }}
            className={`bg-${bgColor}-600 hover:bg-${bgColor}-700`}
          >
            {screenNum < 9 ? 'Continuer' : 'Terminer la séance'}
            {screenNum < 9 ? <SkipForward className="w-4 h-4 ml-2" /> : <Award className="w-4 h-4 ml-2" />}
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const screens = {
    1: <Screen1 />,
    2: <Screen2 />,
    3: <SimpleScreen screenNum={3} title="Construction du savoir linguistique" description="Extraction automatique et classification des verbes" icon={BarChart3} bgColor="green" />,
    4: <SimpleScreen screenNum={4} title="Exercices d'application" description="Série d'exercices de difficulté progressive" icon={PenTool} bgColor="orange" />,
    5: <SimpleScreen screenNum={5} title="Approfondissement stylistique" description="Analyse des effets stylistiques des temps verbaux" icon={BookOpen} bgColor="indigo" />,
    6: <SimpleScreen screenNum={6} title="Atelier d'écriture guidé" description="Création guidée avec assistance d'écriture" icon={PenTool} bgColor="purple" />,
    7: <SimpleScreen screenNum={7} title="Synthèse des savoirs" description="Carte mentale interactive et quiz récapitulatif" icon={BarChart3} bgColor="green" />,
    8: <SimpleScreen screenNum={8} title="Évaluation formative" description="Analyse de texte avec annotation et feedback" icon={Award} bgColor="yellow" />,
    9: <SimpleScreen screenNum={9} title="Préparation séance 3" description="Consignes et badge 'Maître du passé'" icon={Award} bgColor="red" />
  };

  return (
    <PageLayout
      heroTitle="Séance 2 : L'expression du passé"
      heroDescription="Explorez les temps de l'indicatif à travers l'œuvre de Jean-Jacques Goldman"
    >
      <NavigationBar />
      <div className="py-8">
        {screens[currentScreen]}
      </div>
    </PageLayout>
  );
};

export default Seance2;
