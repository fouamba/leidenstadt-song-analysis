
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X } from 'lucide-react';
import { useVoicePreferences } from '@/contexts/VoicePreferencesContext';
import { VoiceInstruction } from '@/components/audio/VoiceInstruction';

// Props pour l'écran 1.1
interface Screen1_1Props {
  onComplete: () => void;
  onNext: () => void;
}

const Screen1_1: React.FC<Screen1_1Props> = ({ onComplete, onNext }) => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [wordInput, setWordInput] = useState('');
  const [wordCloud, setWordCloud] = useState<string[]>([]);
  const [isInputActive, setIsInputActive] = useState(false);
  const { voiceEnabled } = useVoicePreferences();
  
  // Texte de l'introduction à lire
  const introText = "Bienvenue dans cette séquence d'apprentissage. Vous allez découvrir la chanson 'Né en 17 à Leidenstadt' de Jean-Jacques Goldman et apprendre à l'analyser pour en comprendre le sens profond. Commençons par réfléchir à ce que ce titre peut évoquer pour vous.";
  
  // Activer le bouton Continuer une fois la vidéo terminée
  const handleVideoEnded = () => {
    setVideoLoaded(true);
    onComplete();
  };
  
  // Ajouter un mot au nuage de mots
  const handleAddWord = (e: React.FormEvent) => {
    e.preventDefault();
    if (wordInput.trim() && !wordCloud.includes(wordInput.trim())) {
      setWordCloud([...wordCloud, wordInput.trim()]);
      setWordInput('');
    }
  };
  
  // Supprimer un mot du nuage
  const handleRemoveWord = (word: string) => {
    setWordCloud(wordCloud.filter(w => w !== word));
  };

  // Vérifier si l'écran est complété
  useEffect(() => {
    if (videoLoaded && wordCloud.length > 0) {
      onComplete();
    }
  }, [videoLoaded, wordCloud, onComplete]);
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Introduction et mise en situation</h2>
      
      {/* Message d'introduction */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
        <p className="text-blue-800 flex items-start">
          {introText}
          {voiceEnabled && (
            <span className="ml-2">
              <VoiceInstruction text={introText} visuallyHidden={true} />
            </span>
          )}
        </p>
      </div>
      
      {/* Vidéo d'accueil - Utilisons YouTube Embed */}
      <div className="aspect-video mb-6">
        <iframe 
          className="w-full h-64 rounded-lg"
          src="https://www.youtube.com/embed/ttw1KeiF9mA?enablejsapi=1"
          title="Présentation de la séquence"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onLoad={() => setVideoLoaded(true)}
        ></iframe>
      </div>
      
      {/* Question d'accroche interactive */}
      <Card className="p-4 border border-gray-200">
        <h3 className="font-medium mb-3">Que vous évoque le titre "Né en 17 à Leidenstadt" ?</h3>
        
        <form onSubmit={handleAddWord} className="mb-4 flex gap-2">
          <Input
            type="text"
            value={wordInput}
            onChange={(e) => setWordInput(e.target.value)}
            placeholder="Entrez un mot-clé..."
            className="flex-1"
            onFocus={() => setIsInputActive(true)}
            onBlur={() => setIsInputActive(false)}
          />
          <Button type="submit" disabled={!wordInput.trim()}>
            Ajouter
          </Button>
        </form>
        
        {/* Nuage de mots collectif */}
        <div className="min-h-20 p-3 bg-gray-50 rounded-md">
          {wordCloud.length === 0 ? (
            <p className="text-gray-400 text-center">
              {isInputActive ? "Tapez un mot et appuyez sur Ajouter" : "Ajoutez des mots-clés pour créer votre nuage de mots"}
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {wordCloud.map((word, index) => (
                <Badge key={index} className="px-2 py-1 flex items-center gap-1">
                  {word}
                  <button 
                    onClick={() => handleRemoveWord(word)}
                    className="ml-1 text-gray-500 hover:text-gray-700"
                    aria-label={`Supprimer ${word}`}
                  >
                    <X size={12} />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>
      </Card>
      
      {/* Bouton pour commencer la découverte */}
      <div className="flex justify-end">
        <Button 
          onClick={onNext}
          size="lg"
          disabled={!videoLoaded || wordCloud.length === 0}
        >
          Commencer la découverte
        </Button>
      </div>
    </div>
  );
};

export default Screen1_1;
