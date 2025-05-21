import React, { useState, useEffect } from "react";
import { useSpeech } from "@/hooks/useSpeech";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

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
  const [verbs, setVerbs] = useState<Verb[]>(songVerbs);
  const [isCompleted, setIsCompleted] = useState(false);
  const { speak } = useSpeech();

  useEffect(() => {
    speak("Identifiez le temps de chaque verbe de la chanson. Faites glisser chaque verbe vers le temps qui convient.");
  }, []);

  // Fonction pour gérer le drag and drop
  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const verbId = result.draggableId;
    const tense = result.destination.droppableId;

    // Mettre à jour l'état des verbes
    const updatedVerbs = verbs.map((verb) =>
      verb.id === verbId ? { ...verb, tense: tense } : verb
    );
    setVerbs(updatedVerbs);

    // Vérifier si tous les verbes sont correctement placés
    const allCorrect = updatedVerbs.every(
      (verb) => verb.tense === verb.correctTense
    );
    setIsCompleted(allCorrect);
  };

  useEffect(() => {
    if (isCompleted) {
      speak("Félicitations ! Vous avez correctement identifié tous les temps des verbes. Vous pouvez passer à l'écran suivant.");
      onComplete();
    }
  }, [isCompleted, speak, onComplete]);

  return (
    <TooltipProvider>
      <div className="flex flex-col h-full p-6 gap-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center">
          Identification des temps verbaux
        </h1>
        <p className="text-gray-600 text-center">
          Faites glisser chaque verbe vers le temps qui convient.
        </p>

        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Extrait de la chanson</CardTitle>
          </CardHeader>
          <CardContent>
            <div dangerouslySetInnerHTML={{ __html: songLyrics }} />
          </CardContent>
        </Card>

        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {verbTenses.map((tense) => (
              <Droppable key={tense.id} droppableId={tense.id}>
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={`bg-gray-100 rounded-md p-4 min-h-[100px] ${snapshot.isDraggingOver ? 'bg-gray-200' : ''
                      }`}
                  >
                    <h3 className="font-semibold mb-2">{tense.name}</h3>
                    {verbs
                      .filter((verb) => verb.tense === tense.id)
                      .map((verb, index) => (
                        <Draggable key={verb.id} draggableId={verb.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`bg-white rounded-md p-2 shadow-sm mb-2 cursor-grab ${snapshot.isDragging ? 'shadow-lg' : ''
                                }`}
                            >
                              {verb.text}
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>

        {isCompleted && (
          <div className="text-center mt-4">
            <Badge variant="success">
              Tous les verbes sont correctement placés !
            </Badge>
          </div>
        )}

        <div className="flex justify-between">
          <Button variant="outline" onClick={onPrevious}>
            Retour
          </Button>
          <Button onClick={onNext} disabled={!isCompleted}>
            Continuer
          </Button>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default Screen1_7;
