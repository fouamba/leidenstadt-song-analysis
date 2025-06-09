// QuizSystem.tsx
import React, { useState, useEffect, useContext } from 'react';
import { ProgressContext } from './ProgressContext';
import { Button, Card, RadioGroup, Radio, Checkbox, Alert, Badge } from './UIComponents';

// Types pour les questions de quiz
export type QuestionType = 'multiple-choice' | 'single-choice' | 'matching' | 'fill-blank' | 'drag-drop';

export interface QuizQuestion {
  id: string;
  type: QuestionType;
  question: string;
  options?: string[];
  correctAnswer: string | string[] | Record<string, string>;
  explanation?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  tags?: string[]; // Tags pour catégoriser les questions (ex: "imparfait", "conditionnel", etc.)
}

export interface QuizProps {
  id: string;
  title: string;
  description?: string;
  questions: QuizQuestion[];
  timeLimit?: number; // en secondes, optionnel
  minimumPassScore?: number; // score minimum requis pour valider
  onComplete: (score: number, passed: boolean, answers: Record<string, any>) => void;
  adaptiveMode?: boolean; // si true, le quiz s'adapte en fonction des réponses
  showExplanations?: boolean; // montrer les explications après chaque question ou à la fin
  shuffleQuestions?: boolean; // mélanger l'ordre des questions
  shuffleOptions?: boolean; // mélanger l'ordre des options
  theme?: 'light' | 'dark' | 'colorful';
}

const QuizSystem: React.FC<QuizProps> = ({
  id,
  title,
  description,
  questions,
  timeLimit,
  minimumPassScore = 70,
  onComplete,
  adaptiveMode = false,
  showExplanations = true,
  shuffleQuestions = false,
  shuffleOptions = false,
  theme = 'light',
}) => {
  const { updateProgress } = useContext(ProgressContext);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, any>>({});
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [remainingTime, setRemainingTime] = useState(timeLimit || 0);
  const [questionOrder, setQuestionOrder] = useState<number[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Préparation initiale du quiz
  useEffect(() => {
    // Mélanger l'ordre des questions si demandé
    if (shuffleQuestions) {
      const order = Array.from(Array(questions.length).keys());
      setQuestionOrder(shuffleArray(order));
    } else {
      setQuestionOrder(Array.from(Array(questions.length).keys()));
    }

    // Configurer le timer si nécessaire
    if (timeLimit) {
      const timer = setInterval(() => {
        setRemainingTime(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            if (!quizCompleted) finishQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [questions.length, shuffleQuestions, timeLimit]);

  // Fonction utilitaire pour mélanger un tableau
  const shuffleArray = (array: any[]) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // Récupérer la question actuelle
  const getCurrentQuestion = () => {
    if (questionOrder.length === 0) return null;
    return questions[questionOrder[currentQuestionIndex]];
  };

  // Gérer la soumission d'une réponse
  const handleAnswerSubmit = (answer: any) => {
    const currentQuestion = getCurrentQuestion();
    if (!currentQuestion) return;

    // Sauvegarder la réponse
    const newUserAnswers = { ...userAnswers };
    newUserAnswers[currentQuestion.id] = answer;
    setUserAnswers(newUserAnswers);

    // Vérifier si la réponse est correcte
    let isCorrect = false;
    if (Array.isArray(currentQuestion.correctAnswer)) {
      // Pour les questions à choix multiples
      if (Array.isArray(answer)) {
        isCorrect = 
          answer.length === currentQuestion.correctAnswer.length && 
          answer.every(a => currentQuestion.correctAnswer.includes(a));
      }
    } else if (typeof currentQuestion.correctAnswer === 'object') {
      // Pour les questions de type matching
      isCorrect = Object.keys(answer).every(
        key => answer[key] === currentQuestion.correctAnswer[key]
      );
    } else {
      // Pour les questions à choix unique
      isCorrect = answer === currentQuestion.correctAnswer;
    }

    // Mettre à jour le score
    if (isCorrect) {
      setScore(prev => prev + currentQuestion.points);
      setFeedback("Correct ! " + (currentQuestion.explanation || ""));
    } else {
      setFeedback("Incorrect. " + (currentQuestion.explanation || ""));
    }

    // Passer à la question suivante après un délai
    setTimeout(() => {
      setFeedback(null);
      if (currentQuestionIndex < questionOrder.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        finishQuiz();
      }
    }, showExplanations ? 3000 : 1000);
  };

  // Terminer le quiz
  const finishQuiz = () => {
    setQuizCompleted(true);
    const totalPossibleScore = questions.reduce((sum, q) => sum + q.points, 0);
    const percentageScore = (score / totalPossibleScore) * 100;
    const passed = percentageScore >= minimumPassScore;

    // Mettre à jour la progression
    updateProgress(id, {
      completed: true,
      score: percentageScore,
      passed
    });

    // Appeler le callback de fin
    onComplete(percentageScore, passed, userAnswers);
  };

  // Afficher les composants du quiz en fonction du type de question
  const renderQuestion = () => {
    const currentQuestion = getCurrentQuestion();
    if (!currentQuestion) return null;

    switch (currentQuestion.type) {
      case 'single-choice':
        return (
          <SingleChoiceQuestion
            question={currentQuestion}
            onSubmit={handleAnswerSubmit}
            shuffleOptions={shuffleOptions}
          />
        );
      case 'multiple-choice':
        return (
          <MultipleChoiceQuestion
            question={currentQuestion}
            onSubmit={handleAnswerSubmit}
            shuffleOptions={shuffleOptions}
          />
        );
      case 'drag-drop':
        return (
          <DragDropQuestion
            question={currentQuestion}
            onSubmit={handleAnswerSubmit}
          />
        );
      // Autres types à implémenter...
      default:
        return <p>Type de question non pris en charge</p>;
    }
  };

  // Composant pour le résultat du quiz
  const QuizResults = () => {
    const totalPossibleScore = questions.reduce((sum, q) => sum + q.points, 0);
    const percentageScore = (score / totalPossibleScore) * 100;
    const passed = percentageScore >= minimumPassScore;

    return (
      <div className="quiz-results">
        <h2>Résultats du Quiz</h2>
        <div className="score-display">
          <p>Votre score: {score}/{totalPossibleScore} ({percentageScore.toFixed(1)}%)</p>
          <Badge color={passed ? "success" : "error"}>
            {passed ? "Réussi" : "Échec"}
          </Badge>
        </div>
        
        {showExplanations && (
          <div className="question-review">
            <h3>Révision des Questions</h3>
            {questions.map((q, idx) => (
              <div key={q.id} className="question-review-item">
                <p><strong>Question {idx + 1}:</strong> {q.question}</p>
                <p>Votre réponse: {JSON.stringify(userAnswers[q.id])}</p>
                <p>Réponse correcte: {JSON.stringify(q.correctAnswer)}</p>
                {q.explanation && <p className="explanation">{q.explanation}</p>}
              </div>
            ))}
          </div>
        )}
        
        <Button onClick={() => window.location.reload()}>Recommencer le Quiz</Button>
      </div>
    );
  };

  // Sous-composants pour les différents types de questions
  const SingleChoiceQuestion: React.FC<{
    question: QuizQuestion;
    onSubmit: (answer: string) => void;
    shuffleOptions?: boolean;
  }> = ({ question, onSubmit, shuffleOptions }) => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [options, setOptions] = useState<string[]>(question.options || []);

    useEffect(() => {
      if (shuffleOptions && question.options) {
        setOptions(shuffleArray(question.options));
      } else {
        setOptions(question.options || []);
      }
    }, [question, shuffleOptions]);

    return (
      <div className="question single-choice">
        <h3>{question.question}</h3>
        <RadioGroup
          value={selectedOption || ""}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          {options.map((option, idx) => (
            <Radio key={idx} value={option}>
              {option}
            </Radio>
          ))}
        </RadioGroup>
        <Button 
          onClick={() => selectedOption && onSubmit(selectedOption)}
          disabled={!selectedOption}
        >
          Valider
        </Button>
      </div>
    );
  };

  const MultipleChoiceQuestion: React.FC<{
    question: QuizQuestion;
    onSubmit: (answer: string[]) => void;
    shuffleOptions?: boolean;
  }> = ({ question, onSubmit, shuffleOptions }) => {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [options, setOptions] = useState<string[]>(question.options || []);

    useEffect(() => {
      if (shuffleOptions && question.options) {
        setOptions(shuffleArray(question.options));
      } else {
        setOptions(question.options || []);
      }
    }, [question, shuffleOptions]);

    const handleCheckboxChange = (option: string) => {
      setSelectedOptions(prev =>
        prev.includes(option)
          ? prev.filter(item => item !== option)
          : [...prev, option]
      );
    };

    return (
      <div className="question multiple-choice">
        <h3>{question.question}</h3>
        {options.map((option, idx) => (
          <Checkbox
            key={idx}
            checked={selectedOptions.includes(option)}
            onChange={() => handleCheckboxChange(option)}
          >
            {option}
          </Checkbox>
        ))}
        <Button 
          onClick={() => onSubmit(selectedOptions)}
          disabled={selectedOptions.length === 0}
        >
          Valider
        </Button>
      </div>
    );
  };

  const DragDropQuestion: React.FC<{
    question: QuizQuestion;
    onSubmit: (answer: Record<string, string>) => void;
  }> = ({ question, onSubmit }) => {
    // Cette implémentation est simplifiée et devrait être remplacée
    // par un vrai système de drag and drop (React DnD, react-beautiful-dnd, etc.)
    const [matches, setMatches] = useState<Record<string, string>>({});
    
    // À implémenter avec une vraie bibliothèque de drag and drop
    return (
      <div className="question drag-drop">
        <h3>{question.question}</h3>
        <p>Fonctionnalité de glisser-déposer à implémenter</p>
        <Button onClick={() => onSubmit(matches)}>Valider</Button>
      </div>
    );
  };

  // Rendu principal du composant
  return (
    <Card className={`quiz-container theme-${theme}`}>
      <div className="quiz-header">
        <h2>{title}</h2>
        {description && <p>{description}</p>}
        
        {timeLimit && (
          <div className="timer">
            Temps restant: {Math.floor(remainingTime / 60)}:{(remainingTime % 60).toString().padStart(2, '0')}
          </div>
        )}
        
        <div className="progress-indicator">
          Question {currentQuestionIndex + 1} / {questionOrder.length}
        </div>
      </div>

      {feedback && (
        <Alert 
          type={feedback.startsWith("Correct") ? "success" : "error"}
          message={feedback}
        />
      )}

      {quizCompleted ? (
        <QuizResults />
      ) : (
        <div className="question-container">
          {renderQuestion()}
        </div>
      )}
    </Card>
  );
};

export default QuizSystem;