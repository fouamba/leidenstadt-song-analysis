
import React, { useState, useEffect } from "react";
import { useSpeech } from "@/hooks/useSpeech";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Screen1_7Props {
  onComplete: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

interface Verb {
  id: string;
  text: string;
  tense: string;
  correctTense: string;
}

const verbTenses = [
  { id: "present", name: "Présent" },
  { id: "imparfait", name: "Imparfait" },
  { id: "passe-compose", name: "Passé composé" },
  { id: "conditionnel", name: "Conditionnel" },
  { id: "futur", name: "Futur" },
];

// Liste des verbes extraits de la chanson
const songVerbs: Verb[] = [
  { id: "v1", text: "est né", tense: "", correctTense: "passe-compose" },
  { id: "v2", text: "aurais", tense: "", correctTense: "conditionnel" },
  { id: "v3", text: "fait", tense: "", correctTense: "present" },
  { id: "v4", text: "aurait pu", tense: "", correctTense: "conditionnel" },
  { id: "v5", text: "est", tense: "", correctTense: "present" },
  { id: "v6", text: "serai", tense: "", correctTense: "futur" },
  { id: "v7", text: "vivais", tense: "", correctTense: "imparfait" },
  { id: "v8", text: "ont été", tense: "", correctTense: "passe-compose" },
  { id: "v9", text: "crois", tense: "", correctTense: "present" },
  { id: "v10", text: "suis", tense: "", correctTense: "present" },
];

// Texte de la chanson avec balises pour les verbes
const songLyrics = `
Je <span class="verb-highlight present">suis</span> né en 17 à Leidenstadt
On <span class="verb-highlight passe-compose">est né</span> quelque part
Quand je <span class="verb-highlight passe-compose">suis né</span> j'<span class="verb-highlight conditionnel">aurais</span> bien aimé le savoir

Je <span class="verb-highlight conditionnel">serais</span> peut-être pas resté là
Au temps des guerres et des privations
Et je <span class="verb-highlight conditionnel">serais</span> devenu sûrement un autre homme

Je <span class="verb-highlight present">crois</span> que le destin <span class="verb-highlight present">fait</span> bien les choses
Il <span class="verb-highlight conditionnel">aurait pu</span> me faire naître ailleurs
Loin de ma terre, de mes amours

Dans un pays où j'<span class="verb-highlight imparfait">aurais eu</span> peur
Où j'<span class="verb-highlight conditionnel">aurais été</span> l'étranger
Celui qui <span class="verb-highlight present">est</span> d'une autre couleur...
`;

const Screen1_7: React.FC<Screen1_7Props> = ({ onComplete, onNext, onPrevious }) => {
  const [verbs, setVerbs] = useState<Verb[]>(() => {
    return songVerbs.map((verb) => ({ ...verb }));
  });
  const [selectedTense, setSelectedTense] = useState<string | null>(null);
  const [selectedVerb, setSelectedVerb] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const speech = useSpeech({ autoInit: true });

  useEffect(() => {
    // Instruction au chargement de l'écran
    speech.speak("Analysez les temps verbaux utilisés dans la chanson. Sélectionnez un temps, puis cliquez sur les verbes correspondants pour les identifier.");
  }, []);

  const handleTenseSelect = (tenseId: string) => {
    setSelectedTense(tenseId);
    setSelectedVerb(null);
  };

  const handleVerbSelect = (verbId: string) => {
    if (!selectedTense) return;
    
    const updatedVerbs = verbs.map(verb => 
      verb.id === verbId 
        ? { ...verb, tense: selectedTense }
        : verb
    );
    
    setVerbs(updatedVerbs);
    setSelectedVerb(verbId);
    
    // Vérifier si le verbe est maintenant correctement identifié
    const verb = updatedVerbs.find(v => v.id === verbId);
    if (verb && verb.tense === verb.correctTense) {
      speech.speak("Correct!");
    } else {
      speech.speak("Essayez encore.");
    }
  };

  const checkAnswers = () => {
    let correct = 0;
    verbs.forEach(verb => {
      if (verb.tense === verb.correctTense) {
        correct++;
      }
    });
    
    setCorrectCount(correct);
    setShowFeedback(true);
    
    if (correct === verbs.length) {
      setIsComplete(true);
      onComplete();
      speech.speak("Félicitations ! Vous avez correctement identifié tous les temps verbaux.");
    } else {
      speech.speak(`Vous avez correctement identifié ${correct} verbes sur ${verbs.length}. Continuez à travailler.`);
    }
  };

  const resetActivity = () => {
    setVerbs(songVerbs.map(verb => ({ ...verb })));
    setSelectedTense(null);
    setSelectedVerb(null);
    setShowFeedback(false);
  };

  // Fonction pour obtenir la classe CSS en fonction de l'état du verbe
  const getVerbClass = (verb: Verb) => {
    if (!showFeedback) {
      return verb.tense 
        ? "bg-blue-100 border-blue-300" 
        : "bg-white border-gray-300";
    }
    
    if (verb.tense === verb.correctTense) {
      return "bg-green-100 border-green-500";
    }
    
    return "bg-red-100 border-red-300";
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Analyse linguistique guidée</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Colonne de gauche: texte de la chanson */}
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Texte de la chanson</CardTitle>
          </CardHeader>
          <CardContent>
            <div 
              className="prose prose-lg"
              dangerouslySetInnerHTML={{ __html: songLyrics }}
            />
          </CardContent>
        </Card>
        
        {/* Colonne de droite: explication de l'activité */}
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Analyse des temps verbaux</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Identifiez les temps verbaux utilisés dans la chanson. Cette activité vous permet de comprendre comment
              l'utilisation des différents temps contribue au message de l'œuvre.
            </p>
            
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Progression :</span>
                <span>{correctCount}/{songVerbs.length} verbes</span>
              </div>
              <Progress value={(correctCount / songVerbs.length) * 100} className="h-2" />
            </div>
            
            {showFeedback && (
              <Alert className={`mb-4 ${isComplete ? "bg-green-100" : "bg-yellow-100"}`}>
                <AlertDescription className={isComplete ? "text-green-800" : "text-yellow-800"}>
                  {isComplete
                    ? "Félicitations ! Vous avez correctement identifié tous les temps verbaux."
                    : `Vous avez correctement identifié ${correctCount} verbes sur ${songVerbs.length}. Continuez votre analyse !`
                  }
                </AlertDescription>
              </Alert>
            )}
            
            <div className="flex space-x-2 mt-4">
              <Button onClick={checkAnswers}>Vérifier mes réponses</Button>
              <Button variant="outline" onClick={resetActivity}>Recommencer</Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Sélection des temps verbaux */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Sélectionnez un temps verbal:</h3>
        <div className="flex flex-wrap gap-2">
          {verbTenses.map((tense) => (
            <TooltipProvider key={tense.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={selectedTense === tense.id ? "default" : "outline"}
                    onClick={() => handleTenseSelect(tense.id)}
                    className={selectedTense === tense.id ? "bg-blue-500" : ""}
                  >
                    {tense.name}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="w-64">
                    {tense.id === "present" && "Le présent exprime une action qui se déroule au moment où l'on parle."}
                    {tense.id === "imparfait" && "L'imparfait exprime une action passée, souvent longue ou habituelle."}
                    {tense.id === "passe-compose" && "Le passé composé exprime une action passée, ponctuelle et achevée."}
                    {tense.id === "conditionnel" && "Le conditionnel exprime une action soumise à condition ou hypothétique."}
                    {tense.id === "futur" && "Le futur exprime une action qui se déroulera plus tard."}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </div>
      
      {/* Liste des verbes à identifier */}
      <Card>
        <CardHeader>
          <CardTitle>Verbes à identifier</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {verbs.map((verb) => (
              <Badge
                key={verb.id}
                className={`px-3 py-2 cursor-pointer text-base border-2 ${getVerbClass(verb)} ${
                  selectedVerb === verb.id ? "ring-2 ring-blue-500" : ""
                }`}
                onClick={() => handleVerbSelect(verb.id)}
              >
                {verb.text}
                {showFeedback && (
                  <span className={verb.tense === verb.correctTense ? "text-green-600 ml-2" : "text-red-600 ml-2"}>
                    {verb.tense === verb.correctTense ? "✓" : "✗"}
                  </span>
                )}
              </Badge>
            ))}
          </div>
          
          {selectedTense && (
            <p className="mt-4 text-sm text-gray-600">
              Cliquez sur les verbes qui correspondent au temps verbal "{verbTenses.find(t => t.id === selectedTense)?.name}".
            </p>
          )}
        </CardContent>
      </Card>
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrevious}>
          Retour
        </Button>
        <Button onClick={onNext} disabled={!isComplete}>
          Continuer
        </Button>
      </div>
    </div>
  );
};

export default Screen1_7;
