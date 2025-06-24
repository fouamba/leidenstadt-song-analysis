
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { AlertCircle, Play, Pause, CheckCircle, X, MapPin } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useSpeechSynthesis } from '../../hooks/useSpeechSynthesis';

interface Screen1_6Props {
  onComplete: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

interface ContextCompletionState {
  allemagne: boolean;
  belfast: boolean;
  johannesburg: boolean;
}

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

interface Context {
  title: string;
  description: string;
  videoUrl: string;
  mapPosition: { top: string; left: string };
  quiz: QuizQuestion[];
}

export default function Screen1_6({ onComplete, onNext, onPrevious }: Screen1_6Props) {
  const [activeContext, setActiveContext] = useState('allemagne');
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [videoDuration, setVideoDuration] = useState(120); // 2 minutes = 120 seconds
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [contextCompleted, setContextCompleted] = useState<ContextCompletionState>({
    allemagne: false,
    belfast: false,
    johannesburg: false
  });
  const videoRef = useRef<HTMLVideoElement>(null);
  const { speak } = useSpeechSynthesis();
  
  const instructions = "Explorez les trois contextes historiques évoqués dans la chanson. Pour chaque lieu, regardez la capsule vidéo puis répondez au quiz pour tester votre compréhension. Vous devez compléter les trois contextes pour continuer.";

  useEffect(() => {
    speak(instructions);
  }, []);

  const contexts: Record<string, Context> = {
    allemagne: {
      title: "L'Allemagne après 1917",
      description: "L'Allemagne suite à la Première Guerre mondiale et la montée du nazisme",
      videoUrl: "https://youtu.be/xBU8UNbZQyY?si=dnLjFJRUdsLkzbxc",
      mapPosition: { top: "30%", left: "50%" },
      quiz: [
        {
          question: "Quel traité a imposé de lourdes sanctions à l'Allemagne après la Première Guerre mondiale ?",
          options: [
            "Le Traité de Versailles",
            "Le Traité de Rome",
            "Le Traité de Westphalie",
            "Le Pacte de Munich"
          ],
          correctAnswer: "Le Traité de Versailles",
          explanation: "Le Traité de Versailles, signé en 1919, imposait à l'Allemagne de lourdes réparations de guerre et des restrictions militaires, créant un sentiment d'humiliation nationale."
        },
        {
          question: "Quelle crise économique majeure a frappé l'Allemagne au début des années 1920 ?",
          options: [
            "L'hyperinflation",
            "La Grande Dépression",
            "Le krach boursier",
            "La crise pétrolière"
          ],
          correctAnswer: "L'hyperinflation",
          explanation: "L'hyperinflation de 1923 a vu le mark allemand perdre toute valeur, appauvrissant la population et créant un terreau favorable aux idéologies extrémistes."
        },
        {
          question: "Quelle était la position dominante de la population allemande face à la montée du nazisme ?",
          options: [
            "Une adhésion progressive mêlée de résignation",
            "Une résistance massive et organisée",
            "Une indifférence totale",
            "Un refus unanime"
          ],
          correctAnswer: "Une adhésion progressive mêlée de résignation",
          explanation: "La majorité des Allemands a progressivement adhéré ou s'est résignée au régime nazi, voyant en lui une solution aux crises successives, tandis qu'une minorité s'y opposait activement."
        }
      ]
    },
    belfast: {
      title: "Les docklands de Belfast",
      description: "Le conflit nord-irlandais et les tensions entre catholiques et protestants",
      videoUrl: "https://youtu.be/vpIPmNrVoak?si=DBbIcPXrQ4RVUmYT",
      mapPosition: { top: "20%", left: "35%" },
      quiz: [
        {
          question: "Comment appelle-t-on la période de conflit en Irlande du Nord (1968-1998) ?",
          options: [
            "Les Troubles",
            "La Guerre civile irlandaise",
            "La Résistance ulstérienne",
            "Le Conflit sectaire"
          ],
          correctAnswer: "Les Troubles",
          explanation: "Cette période de conflit, connue sous le nom de 'The Troubles' en anglais, a fait environ 3 500 morts dans un affrontement entre républicains (majoritairement catholiques) et unionistes (majoritairement protestants)."
        },
        {
          question: "Quelle était la revendication principale des nationalistes catholiques ?",
          options: [
            "La réunification de l'Irlande du Nord avec la République d'Irlande",
            "L'indépendance totale de l'Irlande du Nord",
            "L'obtention de la majorité au Parlement nord-irlandais",
            "La création d'un État religieux catholique"
          ],
          correctAnswer: "La réunification de l'Irlande du Nord avec la République d'Irlande",
          explanation: "Les nationalistes, majoritairement catholiques, souhaitaient que l'Irlande du Nord quitte le Royaume-Uni pour rejoindre la République d'Irlande, formant ainsi une île irlandaise unifiée."
        },
        {
          question: "Quel accord a mis fin aux 'Troubles' en 1998 ?",
          options: [
            "L'Accord du Vendredi Saint",
            "Le Traité anglo-irlandais",
            "L'Accord de Stormont",
            "Le Pacte de Dublin"
          ],
          correctAnswer: "L'Accord du Vendredi Saint",
          explanation: "L'Accord du Vendredi Saint (ou Accord de Belfast) a établi un gouvernement partagé entre unionistes et nationalistes, et a posé les bases d'une paix durable en Irlande du Nord."
        }
      ]
    },
    johannesburg: {
      title: "Johannesburg sous l'apartheid",
      description: "Le système de ségrégation raciale en Afrique du Sud",
      videoUrl: "https://youtu.be/r7x0qRzCcog?si=dsoCka9Vb2EGNlpO",
      mapPosition: { top: "70%", left: "55%" },
      quiz: [
        {
          question: "Pendant quelle période l'apartheid a-t-il été officiellement en vigueur en Afrique du Sud ?",
          options: [
            "1948-1991",
            "1912-1960",
            "1961-1994",
            "1930-1980"
          ],
          correctAnswer: "1948-1991",
          explanation: "L'apartheid a été institutionnalisé en 1948 par le Parti national et a été progressivement démantelé entre 1990 et 1991, menant aux premières élections multiraciales en 1994."
        },
        {
          question: "Quel acte symbolique marquait la ségrégation dans la vie quotidienne ?",
          options: [
            "Le port obligatoire d'un laissez-passer pour les non-Blancs",
            "L'interdiction de vote pour les Noirs",
            "L'obligation de s'incliner devant les Blancs",
            "Le marquage des vêtements selon la race"
          ],
          correctAnswer: "Le port obligatoire d'un laissez-passer pour les non-Blancs",
          explanation: "Les Sud-Africains noirs devaient porter un 'pass-book' (livret de circulation) pour se déplacer dans les zones réservées aux Blancs, sous peine d'arrestation."
        },
        {
          question: "Qui a été le premier président noir d'Afrique du Sud, symbole de la fin de l'apartheid ?",
          options: [
            "Nelson Mandela",
            "Desmond Tutu",
            "Steve Biko",
            "Walter Sisulu"
          ],
          correctAnswer: "Nelson Mandela",
          explanation: "Après 27 ans d'emprisonnement pour sa lutte contre l'apartheid, Nelson Mandela est devenu le premier président noir d'Afrique du Sud lors des élections multiraciales de 1994."
        }
      ]
    }
  };

  useEffect(() => {
    // Verify if all contexts are completed to mark the screen as complete
    if (allContextsCompleted()) {
      onComplete();
    }
  }, [contextCompleted]);

  useEffect(() => {
    // Reset quiz state when changing context
    setShowQuiz(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    
    // Reset video progress
    setVideoProgress(0);
    setVideoPlaying(false);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.pause();
    }
  }, [activeContext]);

  const handlePlayPause = () => {
    if (!videoRef.current) return;
    
    if (videoPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setVideoPlaying(!videoPlaying);
  };

  const handleVideoProgress = () => {
    if (!videoRef.current) return;
    
    const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
    setVideoProgress(progress);
    
    // If video is complete, show the quiz
    if (videoRef.current.currentTime >= videoRef.current.duration - 0.5) {
      setShowQuiz(true);
      setVideoPlaying(false);
    }
  };

  const handleVideoEnd = () => {
    setVideoPlaying(false);
    setShowQuiz(true);
  };

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setShowFeedback(true);
  };

  const handleNextQuestion = () => {
    const currentQuiz = contexts[activeContext].quiz;
    
    if (currentQuestionIndex < currentQuiz.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      // Quiz completed for this context
      setContextCompleted(prev => ({
        ...prev,
        [activeContext]: true
      }));
      
      // Reset quiz state
      setShowQuiz(false);
      setCurrentQuestionIndex(0);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  };

  const isCorrectAnswer = (answer: string | null) => {
    if (!answer) return false;
    return answer === contexts[activeContext].quiz[currentQuestionIndex].correctAnswer;
  };

  const allContextsCompleted = () => {
    return contextCompleted.allemagne && contextCompleted.belfast && contextCompleted.johannesburg;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="flex flex-col h-full gap-6">
      <h2 className="text-xl font-semibold">Exploration des contextes historiques</h2>
      
      <Alert className="bg-blue-50">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Instructions</AlertTitle>
        <AlertDescription>{instructions}</AlertDescription>
      </Alert>
      
      <div className="flex flex-col md:flex-row gap-6 h-full">
        <div className="w-full md:w-1/3">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Carte interactive</CardTitle>
              <CardDescription>Cliquez sur un lieu pour explorer son contexte historique</CardDescription>
            </CardHeader>
            <CardContent className="relative">
              <div className="relative aspect-[4/3] bg-slate-100 rounded-lg overflow-hidden">
                <img 
                  src="/placeholder.svg" 
                  alt="Carte du monde" 
                  className="w-full h-full object-cover"
                />
                
                {Object.entries(contexts).map(([key, context]) => (
                  <Button
                    key={key}
                    variant={activeContext === key ? "default" : "outline"}
                    size="sm"
                    className={`absolute rounded-full flex items-center justify-center ${
                      contextCompleted[key as keyof ContextCompletionState] ? "bg-green-500 hover:bg-green-600" : ""
                    }`}
                    style={{
                      top: context.mapPosition.top,
                      left: context.mapPosition.left,
                      transform: "translate(-50%, -50%)"
                    }}
                    onClick={() => setActiveContext(key)}
                  >
                    {contextCompleted[key as keyof ContextCompletionState] ? <CheckCircle className="h-4 w-4" /> : <MapPin className="h-4 w-4" />}
                  </Button>
                ))}
              </div>
              
              <div className="mt-4 space-y-2">
                {Object.entries(contexts).map(([key, context]) => (
                  <Button
                    key={key}
                    variant={activeContext === key ? "default" : "outline"}
                    className={`w-full justify-start ${
                      contextCompleted[key as keyof ContextCompletionState] ? "bg-green-100 text-green-800 hover:bg-green-200" : ""
                    }`}
                    onClick={() => setActiveContext(key)}
                  >
                    {context.title}
                    {contextCompleted[key as keyof ContextCompletionState] && <CheckCircle className="ml-auto h-4 w-4" />}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="w-full md:w-2/3">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>{contexts[activeContext].title}</CardTitle>
              <CardDescription>{contexts[activeContext].description}</CardDescription>
            </CardHeader>
            <CardContent>
              {!showQuiz ? (
                <div className="space-y-4">
                  <div className="aspect-video bg-black relative rounded-md overflow-hidden">
                    <video
                      ref={videoRef}
                      src={contexts[activeContext].videoUrl}
                      className="w-full h-full"
                      onTimeUpdate={handleVideoProgress}
                      onEnded={handleVideoEnd}
                    />
                    
                    {!videoPlaying && (
                      <Button 
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full w-16 h-16"
                        onClick={handlePlayPause}
                      >
                        <Play className="h-8 w-8" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{videoRef.current ? formatTime(videoRef.current.currentTime) : "0:00"}</span>
                      <span>{formatTime(videoDuration)}</span>
                    </div>
                    <Progress value={videoProgress} className="w-full" />
                    
                    <div className="flex justify-center gap-4 mt-2">
                      <Button onClick={handlePlayPause}>
                        {videoPlaying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                        {videoPlaying ? "Pause" : "Lecture"}
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle>Quiz: {contexts[activeContext].title}</CardTitle>
                    <CardDescription>
                      Question {currentQuestionIndex + 1} sur {contexts[activeContext].quiz.length}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-lg font-medium">
                        {contexts[activeContext].quiz[currentQuestionIndex].question}
                      </p>
                      
                      <RadioGroup value={selectedAnswer || ""} className="space-y-2">
                        {contexts[activeContext].quiz[currentQuestionIndex].options.map((option, index) => (
                          <div key={index} className={`
                            flex items-center space-x-2 p-3 rounded-md border-2 
                            ${!showFeedback ? "hover:bg-slate-50 cursor-pointer" : ""}
                            ${showFeedback && selectedAnswer === option && isCorrectAnswer(option) ? "bg-green-50 border-green-500" : ""}
                            ${showFeedback && selectedAnswer === option && !isCorrectAnswer(option) ? "bg-red-50 border-red-500" : ""}
                            ${showFeedback && option === contexts[activeContext].quiz[currentQuestionIndex].correctAnswer ? "bg-green-50 border-green-500" : ""}
                          `}
                            onClick={() => !showFeedback && handleAnswer(option)}
                          >
                            <RadioGroupItem 
                              value={option} 
                              id={`option-${index}`} 
                              disabled={showFeedback} 
                            />
                            <Label htmlFor={`option-${index}`} className="flex-grow cursor-pointer">
                              {option}
                            </Label>
                            {showFeedback && option === contexts[activeContext].quiz[currentQuestionIndex].correctAnswer && (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            )}
                            {showFeedback && selectedAnswer === option && !isCorrectAnswer(option) && (
                              <X className="h-5 w-5 text-red-500" />
                            )}
                          </div>
                        ))}
                      </RadioGroup>
                      
                      {showFeedback && (
                        <Alert className={isCorrectAnswer(selectedAnswer) ? "bg-green-50" : "bg-amber-50"}>
                          <AlertTitle>
                            {isCorrectAnswer(selectedAnswer) ? "Bonne réponse !" : "Réponse incorrecte"}
                          </AlertTitle>
                          <AlertDescription>
                            {contexts[activeContext].quiz[currentQuestionIndex].explanation}
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    {showFeedback && (
                      <Button onClick={handleNextQuestion}>
                        {currentQuestionIndex < contexts[activeContext].quiz.length - 1 ? "Question suivante" : "Terminer"}
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex items-center gap-2">
                {Object.entries(contextCompleted).map(([key, completed]) => (
                  <div key={key} className={`w-3 h-3 rounded-full ${completed ? "bg-green-500" : "bg-gray-300"}`}></div>
                ))}
              </div>
              
              <div className="flex gap-4">
                <Button variant="outline" onClick={onPrevious}>
                  Retour
                </Button>
                <Button onClick={onNext} disabled={!allContextsCompleted()}>
                  {allContextsCompleted() ? "Continuer" : "Complétez les trois contextes pour continuer"}
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
