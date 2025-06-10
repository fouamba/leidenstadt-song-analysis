
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useSpeech } from "@/hooks/useSpeech";
import { Play, Pause, Volume2 } from 'lucide-react';

interface Screen1_1Props {
  onComplete: () => void;
  onNext: () => void;
}

const Screen1_1: React.FC<Screen1_1Props> = ({ onComplete, onNext }) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [wordCloudWords, setWordCloudWords] = useState<string[]>([]);
  const [currentWord, setCurrentWord] = useState('');
  const [impressions, setImpressions] = useState('');
  const [videoPlaying, setVideoPlaying] = useState(false);
  const { speak } = useSpeech();

  const instructions = "Bienvenue dans cette séquence pédagogique sur la chanson 'Né en 17 à Leidenstadt' de Jean-Jacques Goldman. Regardez d'abord la vidéo de présentation, puis partagez vos premières impressions sur le titre.";

  useEffect(() => {
    speak(instructions);
  }, []);

  const handleAddWord = () => {
    if (currentWord.trim() && !wordCloudWords.includes(currentWord.trim().toLowerCase())) {
      setWordCloudWords([...wordCloudWords, currentWord.trim().toLowerCase()]);
      setCurrentWord('');
      
      if (wordCloudWords.length >= 2 && impressions.length > 20) {
        setIsCompleted(true);
        onComplete();
      }
    }
  };

  const handleVideoToggle = () => {
    setVideoPlaying(!videoPlaying);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-center">Introduction et mise en situation</h2>
      
      {/* Video presentation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Play className="h-5 w-5" />
            Présentation de la séquence
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="aspect-video rounded-md overflow-hidden bg-gray-100 relative mb-4">
            <video
              src="/Comprendre la chanson _Né en 17 à Leidenstadt_.mp4"
              controls
              className="w-full h-full object-cover"
              poster="/leidenstadt_accueil.jpg"
              onPlay={() => setVideoPlaying(true)}
              onPause={() => setVideoPlaying(false)}
            >
              Votre navigateur ne supporte pas la lecture vidéo.
            </video>
          </div>
          <p className="text-sm text-gray-600">
            Regardez cette présentation pour comprendre les objectifs de notre séquence d'apprentissage.
          </p>
        </CardContent>
      </Card>

      {/* Word cloud activity */}
      <Card>
        <CardHeader>
          <CardTitle>Nuage de mots</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="font-medium">Que vous évoque le titre "Né en 17 à Leidenstadt" ?</p>
          
          <div className="flex gap-2">
            <Input
              placeholder="Tapez un mot-clé..."
              value={currentWord}
              onChange={(e) => setCurrentWord(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddWord()}
            />
            <Button onClick={handleAddWord} disabled={!currentWord.trim()}>
              Ajouter
            </Button>
          </div>

          {wordCloudWords.length > 0 && (
            <div className="flex flex-wrap gap-2 p-4 bg-blue-50 rounded-lg">
              {wordCloudWords.map((word, index) => (
                <Badge key={index} variant="secondary" className="text-sm">
                  {word}
                </Badge>
              ))}
            </div>
          )}

          <div className="space-y-2">
            <label className="font-medium">Notez vos premières impressions :</label>
            <Textarea
              placeholder="Qu'est-ce que ce titre vous inspire ? Quelles images ou émotions vous viennent à l'esprit ?"
              value={impressions}
              onChange={(e) => setImpressions(e.target.value)}
              className="min-h-20"
            />
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-end">
        <Button onClick={onNext} disabled={!isCompleted}>
          Commencer la découverte
        </Button>
      </div>
    </div>
  );
};

export default Screen1_1;
