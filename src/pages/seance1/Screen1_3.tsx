
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useSpeech } from "@/hooks/useSpeech";
import { CheckCircle, AlertCircle, Music, Users, Heart } from 'lucide-react';

interface Screen1_3Props {
  onComplete: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

const Screen1_3: React.FC<Screen1_3Props> = ({ onComplete, onNext, onPrevious }) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [responses, setResponses] = useState<{[key: string]: string}>({});
  const [reflection, setReflection] = useState('');
  const { speak } = useSpeech();

  const instructions = "Approfondissons votre compréhension de la chanson à travers une analyse guidée. Répondez aux questions pour structurer votre réflexion sur l'œuvre.";

  useEffect(() => {
    speak(instructions);
  }, []);

  const analysisQuestions = [
    {
      id: 'theme',
      title: 'Thème principal',
      icon: <Heart className="h-5 w-5" />,
      question: 'Quel est selon vous le thème principal de cette chanson ?',
      options: [
        'Le destin et les circonstances de la vie',
        'La guerre et ses conséquences',
        'L\'amour et les relations humaines',
        'La jeunesse et l\'adolescence'
      ]
    },
    {
      id: 'emotion',
      title: 'Émotion dominante',
      icon: <Music className="h-5 w-5" />,
      question: 'Quelle émotion prédomine dans cette chanson ?',
      options: [
        'La mélancolie et la nostalgie',
        'La colère et la révolte',
        'L\'espoir et l\'optimisme',
        'La peur et l\'angoisse'
      ]
    },
    {
      id: 'message',
      title: 'Message de l\'artiste',
      icon: <Users className="h-5 w-5" />,
      question: 'Quel message Jean-Jacques Goldman cherche-t-il à transmettre ?',
      options: [
        'L\'importance de la solidarité humaine',
        'La critique des conflits armés',
        'La réflexion sur les hasards de l\'existence',
        'L\'appel à la paix mondiale'
      ]
    }
  ];

  const handleResponseChange = (questionId: string, value: string) => {
    const newResponses = { ...responses, [questionId]: value };
    setResponses(newResponses);
    
    // Check if all questions are answered and reflection is written
    if (Object.keys(newResponses).length === analysisQuestions.length && reflection.length > 30) {
      setIsCompleted(true);
      onComplete();
    }
  };

  const handleReflectionChange = (value: string) => {
    setReflection(value);
    
    // Check if all questions are answered and reflection is written
    if (Object.keys(responses).length === analysisQuestions.length && value.length > 30) {
      setIsCompleted(true);
      onComplete();
    }
  };

  const nextSection = () => {
    if (currentSection < analysisQuestions.length) {
      setCurrentSection(currentSection + 1);
    }
  };

  const previousSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold">Analyse guidée de la chanson</h2>
        <p className="text-gray-600 mt-2">Approfondissons votre compréhension de l'œuvre</p>
      </div>
      
      {/* Progress indicator */}
      <div className="flex justify-center space-x-2">
        {analysisQuestions.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              index <= currentSection ? 'bg-blue-500' : 'bg-gray-300'
            }`}
          />
        ))}
        <div
          className={`w-3 h-3 rounded-full ${
            currentSection === analysisQuestions.length ? 'bg-blue-500' : 'bg-gray-300'
          }`}
        />
      </div>

      {currentSection < analysisQuestions.length ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {analysisQuestions[currentSection].icon}
              {analysisQuestions[currentSection].title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="font-medium">
              {analysisQuestions[currentSection].question}
            </p>
            
            <RadioGroup 
              value={responses[analysisQuestions[currentSection].id] || ''}
              onValueChange={(value) => handleResponseChange(analysisQuestions[currentSection].id, value)}
            >
              {analysisQuestions[currentSection].options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            
            <div className="flex justify-between pt-4">
              <Button 
                variant="outline" 
                onClick={previousSection}
                disabled={currentSection === 0}
              >
                Précédent
              </Button>
              <Button 
                onClick={nextSection}
                disabled={!responses[analysisQuestions[currentSection].id]}
              >
                Suivant
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Synthèse personnelle
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="font-medium">
              En vous basant sur vos réponses, rédigez une courte synthèse de votre compréhension de la chanson :
            </p>
            
            {/* Summary of responses */}
            <div className="bg-blue-50 p-4 rounded-lg space-y-2">
              <h4 className="font-semibold text-blue-800">Vos réponses :</h4>
              {analysisQuestions.map((question) => (
                <div key={question.id} className="text-sm">
                  <strong>{question.title}:</strong> {responses[question.id]}
                </div>
              ))}
            </div>
            
            <Textarea
              placeholder="Rédigez votre synthèse personnelle en quelques phrases. Expliquez ce que cette chanson représente pour vous et comment vos réponses s'articulent pour former une vision cohérente de l'œuvre..."
              value={reflection}
              onChange={(e) => handleReflectionChange(e.target.value)}
              className="min-h-24"
            />
            
            <div className="text-sm text-gray-500">
              {reflection.length} caractères - 
              {reflection.length < 30 ? " Développez votre réflexion (minimum 30 caractères)" : " Parfait !"}
            </div>
            
            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={previousSection}>
                Précédent
              </Button>
              <div className="text-sm text-green-600 flex items-center gap-1">
                {isCompleted && (
                  <>
                    <CheckCircle className="h-4 w-4" />
                    Analyse terminée !
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrevious}>
          Retour
        </Button>
        <Button onClick={onNext} disabled={!isCompleted}>
          Analyser la structure musicale
        </Button>
      </div>
    </div>
  );
};

export default Screen1_3;
