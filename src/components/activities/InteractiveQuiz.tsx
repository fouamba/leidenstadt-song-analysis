
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export type QuizQuestionChoice = {
  id: string;
  text: string;
  isCorrect: boolean;
};

export type QuizQuestion = {
  id: string;
  text: string;
  type: 'single' | 'multiple' | 'text';
  choices?: QuizQuestionChoice[];
  correctAnswer?: string;
  explanation: string;
  points: number;
};

export type QuizResult = {
  score: number;
  maxScore: number;
  percentageScore: number;
  answeredQuestions: number;
  correctAnswers: number;
  questionResults: Record<string, {
    isCorrect: boolean;
    points: number;
    userAnswer: string | string[];
    correctAnswer: string | string[];
  }>;
};

interface QuizProps {
  title?: string;
  description?: string;
  questions: QuizQuestion[];
  showFeedbackImmediately?: boolean;
  shuffleQuestions?: boolean;
  shuffleChoices?: boolean;
  onComplete?: (result: QuizResult) => void;
}

const InteractiveQuiz: React.FC<QuizProps> = ({
  title = 'Quiz',
  description,
  questions: initialQuestions,
  showFeedbackImmediately = true,
  shuffleQuestions = false,
  shuffleChoices = false,
  onComplete
}) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [results, setResults] = useState<QuizResult | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  
  const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };
  
  useEffect(() => {
    let processedQuestions = [...initialQuestions];
    
    if (shuffleQuestions) {
      processedQuestions = shuffleArray(processedQuestions);
    }
    
    if (shuffleChoices) {
      processedQuestions = processedQuestions.map(question => {
        if (question.choices) {
          return {
            ...question,
            choices: shuffleArray(question.choices)
          };
        }
        return question;
      });
    }
    
    setQuestions(processedQuestions);
  }, [initialQuestions, shuffleQuestions, shuffleChoices]);
  
  const currentQuestion = questions[currentQuestionIndex];
  const hasAnswered = currentQuestion && !!answers[currentQuestion.id];
  
  const handleSingleChoice = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));
  };
  
  const handleMultipleChoice = (value: string, checked: boolean) => {
    setAnswers(prev => {
      const currentAnswers = (prev[currentQuestion.id] as string[]) || [];
      
      if (checked) {
        return {
          ...prev,
          [currentQuestion.id]: [...currentAnswers, value]
        };
      } else {
        return {
          ...prev,
          [currentQuestion.id]: currentAnswers.filter(answer => answer !== value)
        };
      }
    });
  };
  
  const handleTextAnswer = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));
  };
  
  const isAnswerCorrect = (question: QuizQuestion, userAnswer: string | string[]): boolean => {
    if (question.type === 'single') {
      const correctChoice = question.choices?.find(choice => choice.isCorrect);
      return correctChoice?.id === userAnswer;
    } else if (question.type === 'multiple') {
      const correctChoices = question.choices?.filter(choice => choice.isCorrect).map(choice => choice.id) || [];
      const userAnswerArray = Array.isArray(userAnswer) ? userAnswer : [userAnswer];
      
      return correctChoices.length === userAnswerArray.length && 
             correctChoices.every(id => userAnswerArray.includes(id));
    } else if (question.type === 'text') {
      return question.correctAnswer?.toLowerCase().trim() === 
             (userAnswer as string).toLowerCase().trim();
    }
    
    return false;
  };
  
  const submitAnswer = () => {
    setIsSubmitted(true);
  };
  
  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setIsSubmitted(false);
    } else {
      completeQuiz();
    }
  };
  
  const completeQuiz = () => {
    let score = 0;
    let correctAnswers = 0;
    const maxScore = questions.reduce((sum, q) => sum + q.points, 0);
    const questionResults: QuizResult['questionResults'] = {};
    
    questions.forEach(question => {
      const userAnswer = answers[question.id];
      const isCorrect = userAnswer ? isAnswerCorrect(question, userAnswer) : false;
      const points = isCorrect ? question.points : 0;
      
      score += points;
      if (isCorrect) correctAnswers++;
      
      let correctAnswer: string | string[];
      if (question.type === 'single') {
        correctAnswer = question.choices?.find(choice => choice.isCorrect)?.id || '';
      } else if (question.type === 'multiple') {
        correctAnswer = question.choices?.filter(choice => choice.isCorrect).map(choice => choice.id) || [];
      } else {
        correctAnswer = question.correctAnswer || '';
      }
      
      questionResults[question.id] = {
        isCorrect,
        points,
        userAnswer: userAnswer || '',
        correctAnswer
      };
    });
    
    const result: QuizResult = {
      score,
      maxScore,
      percentageScore: Math.round((score / maxScore) * 100),
      answeredQuestions: Object.keys(answers).length,
      correctAnswers,
      questionResults
    };
    
    setResults(result);
    setIsCompleted(true);
    
    if (onComplete) {
      onComplete(result);
    }
  };
  
  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setIsSubmitted(false);
    setResults(null);
    setIsCompleted(false);
  };
  
  if (isCompleted && results) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-6 w-6 text-green-600" />
              Quiz terminé !
            </CardTitle>
            <CardDescription>Voici vos résultats</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary">
                  {results.percentageScore}%
                </div>
                <div className="text-sm text-muted-foreground">
                  {results.score} / {results.maxScore} points
                </div>
              </div>
              
              <Progress value={results.percentageScore} className="h-3" />
              
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-semibold text-green-600">
                    {results.correctAnswers}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Réponses correctes
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-semibold text-orange-600">
                    {results.answeredQuestions - results.correctAnswers}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Réponses incorrectes
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="justify-center space-x-2">
            <Button onClick={restartQuiz} variant="outline">
              Recommencer
            </Button>
            <Button onClick={() => window.history.back()}>
              Continuer
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
  
  if (!currentQuestion) {
    return <div>Chargement...</div>;
  }
  
  const userAnswer = answers[currentQuestion.id];
  const isCorrect = isSubmitted && userAnswer ? isAnswerCorrect(currentQuestion, userAnswer) : null;
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Question {currentQuestionIndex + 1} sur {questions.length}</span>
          <span>{Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%</span>
        </div>
        <Progress value={((currentQuestionIndex + 1) / questions.length) * 100} />
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">{currentQuestion.text}</h3>
            
            {currentQuestion.type === 'single' && currentQuestion.choices && (
              <RadioGroup
                value={userAnswer as string || ''}
                onValueChange={handleSingleChoice}
                disabled={isSubmitted}
              >
                {currentQuestion.choices.map((choice) => (
                  <div key={choice.id} className="flex items-center space-x-2">
                    <RadioGroupItem 
                      value={choice.id} 
                      id={choice.id}
                      className={cn(
                        isSubmitted && choice.isCorrect && "border-green-500",
                        isSubmitted && !choice.isCorrect && userAnswer === choice.id && "border-red-500"
                      )}
                    />
                    <Label 
                      htmlFor={choice.id}
                      className={cn(
                        "flex-1 cursor-pointer",
                        isSubmitted && choice.isCorrect && "text-green-600 font-medium",
                        isSubmitted && !choice.isCorrect && userAnswer === choice.id && "text-red-600"
                      )}
                    >
                      {choice.text}
                    </Label>
                    {isSubmitted && choice.isCorrect && (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    )}
                    {isSubmitted && !choice.isCorrect && userAnswer === choice.id && (
                      <AlertCircle className="h-4 w-4 text-red-600" />
                    )}
                  </div>
                ))}
              </RadioGroup>
            )}
            
            {currentQuestion.type === 'multiple' && currentQuestion.choices && (
              <div className="space-y-2">
                {currentQuestion.choices.map((choice) => (
                  <div key={choice.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={choice.id}
                      checked={Array.isArray(userAnswer) ? userAnswer.includes(choice.id) : false}
                      onCheckedChange={(checked) => handleMultipleChoice(choice.id, !!checked)}
                      disabled={isSubmitted}
                      className={cn(
                        isSubmitted && choice.isCorrect && "border-green-500",
                        isSubmitted && !choice.isCorrect && Array.isArray(userAnswer) && userAnswer.includes(choice.id) && "border-red-500"
                      )}
                    />
                    <Label 
                      htmlFor={choice.id}
                      className={cn(
                        "flex-1 cursor-pointer",
                        isSubmitted && choice.isCorrect && "text-green-600 font-medium",
                        isSubmitted && !choice.isCorrect && Array.isArray(userAnswer) && userAnswer.includes(choice.id) && "text-red-600"
                      )}
                    >
                      {choice.text}
                    </Label>
                    {isSubmitted && choice.isCorrect && (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    )}
                    {isSubmitted && !choice.isCorrect && Array.isArray(userAnswer) && userAnswer.includes(choice.id) && (
                      <AlertCircle className="h-4 w-4 text-red-600" />
                    )}
                  </div>
                ))}
              </div>
            )}
            
            {currentQuestion.type === 'text' && (
              <Input
                value={userAnswer as string || ''}
                onChange={(e) => handleTextAnswer(e.target.value)}
                placeholder="Tapez votre réponse..."
                disabled={isSubmitted}
                className={cn(
                  isSubmitted && isCorrect && "border-green-500",
                  isSubmitted && isCorrect === false && "border-red-500"
                )}
              />
            )}
            
            {isSubmitted && showFeedbackImmediately && (
              <div className={cn(
                "p-4 rounded-md",
                isCorrect ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
              )}>
                <div className={cn(
                  "flex items-center gap-2 font-medium mb-2",
                  isCorrect ? "text-green-700" : "text-red-700"
                )}>
                  {isCorrect ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <AlertCircle className="h-4 w-4" />
                  )}
                  {isCorrect ? "Correct !" : "Incorrect"}
                </div>
                <p className="text-sm text-gray-700">{currentQuestion.explanation}</p>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
            disabled={currentQuestionIndex === 0}
          >
            Précédent
          </Button>
          
          <div className="flex gap-2">
            {!isSubmitted ? (
              <Button 
                onClick={submitAnswer}
                disabled={!hasAnswered}
              >
                {showFeedbackImmediately ? 'Vérifier' : 'Soumettre'}
              </Button>
            ) : (
              <Button onClick={nextQuestion}>
                {currentQuestionIndex === questions.length - 1 ? 'Terminer' : 'Suivant'}
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default InteractiveQuiz;
