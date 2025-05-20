
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Check, X, Plus } from 'lucide-react';
import { useVoicePreferences } from '@/contexts/VoicePreferencesContext';
import { VoiceInstruction } from '@/components/audio/VoiceInstruction';

// Props pour l'écran 1.3
interface Screen1_3Props {
  onComplete: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

// Données des émotions disponibles
const emotions = [
  { id: 'tristesse', label: 'Tristesse', icon: '😢' },
  { id: 'melancolie', label: 'Mélancolie', icon: '😔' },
  { id: 'colere', label: 'Colère', icon: '😠' },
  { id: 'espoir', label: 'Espoir', icon: '🌱' },
  { id: 'empathie', label: 'Empathie', icon: '🤗' },
  { id: 'reflexion', label: 'Réflexion', icon: '🤔' },
  { id: 'impuissance', label: 'Impuissance', icon: '😟' },
  { id: 'compassion', label: 'Compassion', icon: '💗' },
  { id: 'culpabilite', label: 'Culpabilité', icon: '😓' },
  { id: 'indignation', label: 'Indignation', icon: '😤' },
  { id: 'autre', label: 'Autre...', icon: '✏️' },
];

// Thèmes possibles pour le QCM
const themes = [
  "L'identité et les origines",
  "Le hasard et le destin",
  "La guerre et ses conséquences",
  "La responsabilité collective",
  "La transmission de la mémoire",
  "Le multiculturalisme",
];

// Époques possibles pour le QCM
const epoques = [
  "La Première Guerre mondiale (1914-1918)",
  "L'entre-deux-guerres (1918-1939)",
  "La Seconde Guerre mondiale (1939-1945)",
  "La Guerre froide (1947-1991)",
  "L'époque contemporaine (après 1991)",
];

const Screen1_3: React.FC<Screen1_3Props> = ({ onComplete, onNext, onPrevious }) => {
  // États pour les différentes sections
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const [customEmotion, setCustomEmotion] = useState('');
  const [themeSelectionne, setThemeSelectionne] = useState<string | null>(null);
  const [epoqueSelectionnee, setEpoqueSelectionnee] = useState<string | null>(null);
  const [motCle, setMotCle] = useState('');
  const [nuageDeMots, setNuageDeMots] = useState<string[]>([]);
  const { voiceEnabled } = useVoicePreferences();
  
  // Texte de consigne
  const consigneText = "Maintenant que vous avez écouté la chanson, partagez vos impressions en sélectionnant les émotions ressenties et en répondant aux questions.";
  
  // Vérifier si toutes les sections sont complétées
  const isComplete = () => {
    return (
      selectedEmotions.length > 0 && 
      themeSelectionne !== null && 
      epoqueSelectionnee !== null && 
      nuageDeMots.length >= 3
    );
  };
  
  // Mettre à jour l'état de complétion
  useEffect(() => {
    if (isComplete()) {
      onComplete();
    }
  }, [selectedEmotions, themeSelectionne, epoqueSelectionnee, nuageDeMots, onComplete]);
  
  // Gérer l'ajout/suppression d'émotions
  const toggleEmotion = (emotionId: string) => {
    if (selectedEmotions.includes(emotionId)) {
      setSelectedEmotions(selectedEmotions.filter(id => id !== emotionId));
    } else {
      setSelectedEmotions([...selectedEmotions, emotionId]);
    }
  };
  
  // Ajouter une émotion personnalisée
  const addCustomEmotion = () => {
    if (customEmotion.trim() && !selectedEmotions.includes('custom:' + customEmotion.trim())) {
      setSelectedEmotions([...selectedEmotions, 'custom:' + customEmotion.trim()]);
      setCustomEmotion('');
    }
  };
  
  // Ajouter un mot-clé au nuage de mots
  const ajouterMotCle = () => {
    if (motCle.trim() && !nuageDeMots.includes(motCle.trim())) {
      setNuageDeMots([...nuageDeMots, motCle.trim()]);
      setMotCle('');
    }
  };
  
  // Supprimer un mot-clé du nuage
  const supprimerMotCle = (mot: string) => {
    setNuageDeMots(nuageDeMots.filter(m => m !== mot));
  };
  
  // Afficher une émotion (standard ou personnalisée)
  const renderEmotion = (emotionId: string) => {
    if (emotionId.startsWith('custom:')) {
      const customLabel = emotionId.substring(7);
      return (
        <Badge key={emotionId} className="py-2 px-3 flex items-center gap-1">
          ✏️ {customLabel}
          <button
            onClick={() => toggleEmotion(emotionId)}
            className="ml-2 text-gray-500 hover:text-red-500"
          >
            <X size={14} />
          </button>
        </Badge>
      );
    } else {
      const emotion = emotions.find(e => e.id === emotionId);
      if (!emotion) return null;
      return (
        <Badge key={emotionId} className="py-2 px-3 flex items-center gap-1">
          {emotion.icon} {emotion.label}
          <button
            onClick={() => toggleEmotion(emotionId)}
            className="ml-2 text-gray-500 hover:text-red-500"
          >
            <X size={14} />
          </button>
        </Badge>
      );
    }
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Recueil des impressions</h2>
      
      {/* Message de consigne */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <p className="text-blue-800 flex items-start">
          {consigneText}
          {voiceEnabled && (
            <span className="ml-2">
              <VoiceInstruction text={consigneText} visuallyHidden={true} />
            </span>
          )}
        </p>
      </div>
      
      {/* Sélection des émotions */}
      <Card className="p-4 border border-gray-200">
        <h3 className="font-medium mb-3">Quelles émotions avez-vous ressenties en écoutant cette chanson ?</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
          {emotions.filter(e => e.id !== 'autre').map(emotion => (
            <Button
              key={emotion.id}
              variant={selectedEmotions.includes(emotion.id) ? "default" : "outline"}
              className={`justify-start ${selectedEmotions.includes(emotion.id) ? "bg-blue-100 text-blue-800 hover:bg-blue-200" : ""}`}
              onClick={() => toggleEmotion(emotion.id)}
            >
              <span className="mr-2">{emotion.icon}</span>
              {emotion.label}
              {selectedEmotions.includes(emotion.id) && (
                <Check size={16} className="ml-auto" />
              )}
            </Button>
          ))}
        </div>
        
        {/* Ajout d'émotions personnalisées */}
        <div className="flex gap-2 mb-4">
          <Input
            type="text"
            placeholder="Autre émotion..."
            value={customEmotion}
            onChange={(e) => setCustomEmotion(e.target.value)}
            className="flex-1"
          />
          <Button
            variant="outline"
            onClick={addCustomEmotion}
            disabled={!customEmotion.trim()}
          >
            <Plus size={16} className="mr-1" /> Ajouter
          </Button>
        </div>
        
        {/* Affichage des émotions sélectionnées */}
        {selectedEmotions.length > 0 ? (
          <div className="flex flex-wrap gap-2 mt-3">
            {selectedEmotions.map(emotionId => renderEmotion(emotionId))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 italic">Veuillez sélectionner au moins une émotion.</p>
        )}
      </Card>
      
      {/* Questionnaire à choix multiples - Thème */}
      <Card className="p-4 border border-gray-200">
        <h3 className="font-medium mb-3">Quel est selon vous le thème principal de cette chanson ?</h3>
        
        <RadioGroup
          value={themeSelectionne || ""}
          onValueChange={setThemeSelectionne}
          className="space-y-2"
        >
          {themes.map(theme => (
            <div key={theme} className="flex items-center space-x-2">
              <RadioGroupItem value={theme} id={`theme-${theme}`} />
              <Label htmlFor={`theme-${theme}`}>{theme}</Label>
            </div>
          ))}
        </RadioGroup>
      </Card>
      
      {/* Questionnaire à choix multiples - Époque */}
      <Card className="p-4 border border-gray-200">
        <h3 className="font-medium mb-3">À quelle époque fait référence le titre ?</h3>
        
        <RadioGroup
          value={epoqueSelectionnee || ""}
          onValueChange={setEpoqueSelectionnee}
          className="space-y-2"
        >
          {epoques.map(epoque => (
            <div key={epoque} className="flex items-center space-x-2">
              <RadioGroupItem value={epoque} id={`epoque-${epoque}`} />
              <Label htmlFor={`epoque-${epoque}`}>{epoque}</Label>
            </div>
          ))}
        </RadioGroup>
      </Card>
      
      {/* Nuage de mots collaboratif */}
      <Card className="p-4 border border-gray-200">
        <h3 className="font-medium mb-3">Proposez des mots-clés qui vous viennent à l'esprit</h3>
        
        <div className="flex gap-2 mb-4">
          <Input
            type="text"
            placeholder="Entrez un mot-clé..."
            value={motCle}
            onChange={(e) => setMotCle(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && ajouterMotCle()}
            className="flex-1"
          />
          <Button
            onClick={ajouterMotCle}
            disabled={!motCle.trim()}
          >
            Ajouter
          </Button>
        </div>
        
        <div className="min-h-20 p-3 bg-gray-50 rounded-md">
          {nuageDeMots.length === 0 ? (
            <p className="text-gray-400 text-center">
              Proposez au moins 3 mots-clés pour créer votre nuage de mots
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {nuageDeMots.map((mot, index) => (
                <Badge 
                  key={index} 
                  className="px-3 py-1 flex items-center gap-1 text-md"
                  style={{ fontSize: `${Math.max(1, (Math.random() * 0.5) + 0.8)}rem` }}
                >
                  {mot}
                  <button
                    onClick={() => supprimerMotCle(mot)}
                    className="ml-1 text-gray-500 hover:text-red-500"
                  >
                    <X size={12} />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>
        <p className="text-sm text-gray-500 mt-2">
          {nuageDeMots.length < 3 ? 
            `Encore ${3 - nuageDeMots.length} mot(s) minimum à ajouter...` : 
            "Vous pouvez continuer à ajouter des mots-clés ou passer à la suite."
          }
        </p>
      </Card>
      
      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrevious}>
          Retour
        </Button>
        <Button 
          onClick={onNext}
          disabled={!isComplete()}
        >
          Continuer
        </Button>
      </div>
    </div>
  );
};

export default Screen1_3;
