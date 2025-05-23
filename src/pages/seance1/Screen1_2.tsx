import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { AlertCircle, Pause, Play } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useVoicePreferences } from '@/contexts/VoicePreferencesContext';
import { VoiceInstruction } from '@/components/audio/VoiceInstruction';
import { YouTubeEmbed } from '@/components/YouTube';

// Props pour l'écran 1.2
interface Screen1_2Props {
  onComplete: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

const Screen1_2: React.FC<Screen1_2Props> = ({ onComplete, onNext, onPrevious }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasListened, setHasListened] = useState(false);
  const [journalContent, setJournalContent] = useState('');
  const [showLyricsAttempt, setShowLyricsAttempt] = useState(false);
  const { voiceEnabled } = useVoicePreferences();
  
  // Texte de consigne
  const consigneText = "Écoutez attentivement cette chanson sans lire les paroles. Notez vos premières impressions dans le journal de bord ci-dessous.";
  
  // ID réelle de la vidéo YouTube de la chanson "Né en 17 à Leidenstadt"
  const youtubeVideoId = "ttw1KeiF9mA";
  
  // Fonction pour gérer la fin de la vidéo
  const handleVideoEnded = () => {
    setIsPlaying(false);
    setHasListened(true);
  };
  
  // Vérifier si l'écran est complété
  useEffect(() => {
    if (hasListened && journalContent.length >= 50) {
      onComplete();
    }
  }, [hasListened, journalContent, onComplete]);
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Première écoute</h2>
      
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
      
      {/* Lecteur vidéo YouTube */}
      <div className="aspect-video relative">
        <YouTubeEmbed videoId={youtubeVideoId} title="Jean-Jacques Goldman - Né en 17 à Leidenstadt" onEnd={handleVideoEnded} />
      </div>
      
      {/* Alerte si tentative d'afficher les paroles */}
      {showLyricsAttempt && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Pour cette première découverte, veuillez écouter la chanson sans lire les paroles. Vous pourrez y accéder plus tard.
          </AlertDescription>
        </Alert>
      )}
      
      {/* Bouton (désactivé) pour afficher les paroles */}
      <div className="flex justify-center">
        <Button 
          variant="outline" 
          size="sm" 
          className="mb-4"
          onClick={() => setShowLyricsAttempt(true)}
        >
          Afficher les paroles
        </Button>
      </div>
      
      {/* Journal de bord numérique */}
      <Card className="p-4 border border-gray-200">
        <h3 className="font-medium mb-3">Journal de bord</h3>
        <Textarea
          placeholder="Notez vos premières impressions, les émotions ressenties, les thèmes que vous percevez..."
          className="min-h-32"
          value={journalContent}
          onChange={(e) => setJournalContent(e.target.value)}
        />
        <p className="text-sm text-gray-500 mt-2">
          {journalContent.length < 50 ? 
            `Encore ${50 - journalContent.length} caractères minimum...` : 
            "Vous pouvez continuer à enrichir vos impressions ou passer à la suite."
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
          disabled={!hasListened || journalContent.length < 50}
        >
          Continuer
        </Button>
      </div>
    </div>
  );
};

export default Screen1_2;
