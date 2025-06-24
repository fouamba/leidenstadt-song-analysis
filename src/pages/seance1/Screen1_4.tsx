import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { AlertCircle, Play, Pause, SkipBack, SkipForward, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useSpeechSynthesis } from '../../hooks/useSpeechSynthesis';
import { cn } from '@/lib/utils';

// Define the component props
interface Screen1_4Props {
  onComplete: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

export default function Screen1_4({ onComplete, onNext, onPrevious }: Screen1_4Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const audioRef = useRef(null);
  const { speak } = useSpeechSynthesis();

  const instructions = "Écoutez attentivement la chanson et analysez sa structure musicale. Vous devrez ensuite répondre à un quiz pour démontrer votre compréhension. Pour avancer à l'écran suivant, vous devez obtenir un score parfait au quiz.";

  useEffect(() => {
    speak(instructions);
  }, []);

  const quizQuestions = [
    {
      question: "Combien de couplets comporte la chanson ?",
      options: ["2 couplets", "3 couplets", "4 couplets", "5 couplets"],
      correctAnswer: "5 couplets"
    },
    {
      question: "Quelle est la structure principale de la chanson ?",
      options: [
        "Couplet - Refrain - Couplet - Refrain - Couplet - Refrain", 
        "Introduction - Couplet - Refrain - Couplet - Pont - Refrain",
        "Introduction - Couplet - Couplet - Couplet - couplet - Refrain - Pont - Couplet - Final",		
        "Couplet - Pont - Couplet - Pont - Couplet - Conclusion",
        "Introduction - Couplet - Pont - Couplet - Pont - Couplet - Conclusion"
      ],
      correctAnswer: "Introduction - Couplet - Couplet - Couplet - couplet - Refrain - Pont - Couplet - Final"
    },
    {
      question: "Quel instrument est prédominant dans l'introduction ?",
      options: ["Batterie", "Piano", "Guitare acoustique", "Synthétiseur"],
      correctAnswer: "Piano"
    },
    {
      question: "Comment évolue l'intensité musicale au cours de la chanson ?",
      options: [
        "Elle reste constante du début à la fin", 
        "Elle diminue progressivement", 
        "Elle augmente progressivement avec un pic à la fin du refrain suivi par une tonalité apaisée",
        "Elle alterne entre forte et douce"
      ],
      correctAnswer: "Elle augmente progressivement avec un pic à la fin du refrain suivi par une tonalité apaisée"
    },
    {
      question: "Comment se termine musicalement la chanson ?",
      options: [
        "Par une note de piano solo", 
        "Par un fondu progressif", 
        "Par un accord final suivi d'un silence",
        "Par la voix a cappella"
      ],
      correctAnswer: "Par un fondu progressif"
    },
    // Ajout de nouvelles questions pédagogiques
    {
      question: "Quel est le schéma de rimes dominant dans les couplets ?",
      options: [
        "AABB", "ABAB", "ABBA", "AABB"
      ],
      correctAnswer: "AABB"
    },
    {
      question: "Quel élément rythmique marque le refrain ?",
      options: [
        "Un changement de tempo", "Une accentuation de la batterie", "Un silence marqué", "Un retour du piano solo"
      ],
      correctAnswer: "Une accentuation de la batterie"
    },
    {
      question: "Comment la voix du chanteur évolue-t-elle dans le refrain ?",
      options: [
        "Elle reste douce et posée", "Elle devient plus puissante et expressive", "Elle disparaît au profit des chœurs", "Elle est parlée"
      ],
      correctAnswer: "Elle devient plus puissante et expressive"
    },
    {
      question: "Quel effet est utilisé pour souligner certains mots importants dans la chanson ?",
      options: [
        "Un écho sonore", "Un silence soudain", "Une montée de volume", "Un effet de réverbération"
      ],
      correctAnswer: "Une montée de volume"
    },
    {
      question: "À quel moment la chanson change-t-elle de tonalité ou d’ambiance ?",
      options: [
        "Au début du deuxième couplet", "Au début du pont musical", "Juste avant la conclusion", "Il n’y a pas de changement notable"
      ],
      correctAnswer: "Au début du pont musical"
    },
    {
      question: "Quel est le rôle du pont musical dans la chanson ?",
      options: [
        "Introduire un nouveau thème musical", "Créer une rupture et relancer l’attention", "Servir de transition vers le refrain final", "Mettre en avant un solo d'instrument"
      ],
      correctAnswer: "Créer une rupture et relancer l’attention"
    },
    {
      question: "Quel mot ou expression revient le plus souvent dans le refrain ?",
      options: [
        "Leidenstadt", "Si j’étais né", "Différent", "Guerre"
      ],
      correctAnswer: "Si j’étais né"
    },
    {
      question: "Quel sentiment la mélodie du refrain cherche-t-elle à transmettre ?",
      options: [
        "La joie", "La nostalgie", "L’empathie et la réflexion", "La colère"
      ],
      correctAnswer: "L’empathie et la réflexion"
    }
  ];

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSkipBack = () => {
    audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 10);
  };

  const handleSkipForward = () => {
    audioRef.current.currentTime = Math.min(duration, audioRef.current.currentTime + 10);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const startQuiz = () => {
    setQuizStarted(true);
    speak("Commençons le quiz sur la structure musicale de la chanson.");
  };

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    setShowCorrectAnswer(true);
    
    if (answer === quizQuestions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
      speak("Bonne réponse !");
    } else {
      speak("Incorrect. La bonne réponse est : " + quizQuestions[currentQuestionIndex].correctAnswer);
    }
    
    setTimeout(() => {
      if (currentQuestionIndex < quizQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setShowCorrectAnswer(false);
      } else {
        setShowResult(true);
        if (score + (answer === quizQuestions[currentQuestionIndex].correctAnswer ? 1 : 0) === quizQuestions.length) {
          setQuizCompleted(true);
          speak("Félicitations ! Vous avez répondu correctement à toutes les questions. Vous pouvez maintenant passer à l'écran suivant.");
        } else {
          speak("Vous n'avez pas obtenu un score parfait. Veuillez réessayer le quiz.");
          setTimeout(() => {
            resetQuiz();
          }, 3000);
        }
      }
    }, 2000);
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setShowCorrectAnswer(false);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="flex flex-col h-full p-6 gap-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center">Analyse de la structure musicale</h1>
      
      <Alert className="bg-blue-50">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Instructions</AlertTitle>
        <AlertDescription>{instructions}</AlertDescription>
      </Alert>
      
      <div className="flex flex-col gap-4 items-center">
        <audio 
          ref={audioRef}
          src="/Ne-en-17-a-Leidenstadt.mp3" 
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
        />
        
        <div className="w-full">
          <div className="flex justify-between text-sm mb-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          <Progress value={(currentTime / duration) * 100} className="w-full" />
        </div>
        
        <div className="flex gap-4">
          <Button variant="outline" onClick={handleSkipBack}>
            <SkipBack className="h-4 w-4" />
          </Button>
          <Button onClick={handlePlayPause}>
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button variant="outline" onClick={handleSkipForward}>
            <SkipForward className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {!quizStarted ? (
        <div className="flex justify-center mt-8">
          <Button onClick={startQuiz} className="px-8 py-6 text-lg">
            Commencer le quiz
          </Button>
        </div>
      ) : (
        <Card className="w-full mt-4">
          {!showResult ? (
            <>
              <CardHeader>
                <CardTitle>Question {currentQuestionIndex + 1} sur {quizQuestions.length}</CardTitle>
                <CardDescription>Score actuel: {score}/{quizQuestions.length}</CardDescription>
              </CardHeader>
              <CardContent>
                <h3 className="text-lg font-medium mb-4">{quizQuestions[currentQuestionIndex].question}</h3>
                <div className="flex flex-col gap-2">
                  {quizQuestions[currentQuestionIndex].options.map((option, index) => {
                    const isCorrect = option === quizQuestions[currentQuestionIndex].correctAnswer;
                    const isSelected = selectedAnswer === option;
                    
                    return (
                      <Button
                        key={index}
                        variant={
                          !showCorrectAnswer ? "outline" :
                          isSelected && isCorrect ? "default" :
                          isSelected && !isCorrect ? "destructive" :
                          isCorrect ? "outline" : "outline"
                        }
                        className={cn(
                          "justify-start text-left h-auto py-3",
                          showCorrectAnswer && isCorrect && "bg-green-100 border-green-500"
                        )}
                        onClick={() => !selectedAnswer && handleAnswerSelect(option)}
                        disabled={!!selectedAnswer}
                      >
                        {option}
                        {showCorrectAnswer && isCorrect && (
                          <CheckCircle className="ml-auto h-4 w-4 text-green-500" />
                        )}
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </>
          ) : (
            <>
              <CardHeader>
                <CardTitle>Résultats du quiz</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg mb-4">Votre score: {score}/{quizQuestions.length}</p>
                {quizCompleted ? (
                  <Alert className="bg-green-50">
                    <CheckCircle className="h-4 w-4" />
                    <AlertTitle>Félicitations !</AlertTitle>
                    <AlertDescription>
                      Vous avez complété le quiz avec succès. Vous pouvez maintenant passer à l'écran suivant.
                    </AlertDescription>
                  </Alert>
                ) : (
                  <Alert className="bg-amber-50">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Score insuffisant</AlertTitle>
                    <AlertDescription>
                      Vous devez obtenir un score parfait pour continuer. Le quiz va recommencer.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </>
          )}
          <CardFooter className="flex justify-between">
            {!showResult && <div />}
            {showResult && quizCompleted && (
              <Button className="w-full" onClick={onNext}>Continuer vers l'écran suivant</Button>
            )}
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
