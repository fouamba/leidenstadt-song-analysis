
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useSpeech } from "@/hooks/useSpeech";
import { Play, Pause, Volume2 } from 'lucide-react';
import VideoPlayer from '@/components/media/VideoPlayer';
import WordCloudActivity from '@/components/activities/WordCloudActivity';

interface Screen1_1Props {
  onComplete: () => void;
  onNext: () => void;
}

const Screen1_1: React.FC<Screen1_1Props> = ({ onComplete, onNext }) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [wordCloudWords, setWordCloudWords] = useState<string[]>([]);
  const [impressions, setImpressions] = useState('');
  const [videoWatched, setVideoWatched] = useState(false);
  const { speak } = useSpeech();

  const instructions = "Bienvenue dans cette séquence pédagogique sur la chanson 'Né en 17 à Leidenstadt' de Jean-Jacques Goldman. Regardez d'abord la vidéo de présentation, puis partagez vos premières impressions sur le titre.";

  useEffect(() => {
    speak(instructions);
  }, []);

  // Vérifier si les conditions de complétion sont remplies
  useEffect(() => {
    if (videoWatched && wordCloudWords.length >= 3 && impressions.length > 20) {
      setIsCompleted(true);
      onComplete();
    }
  }, [videoWatched, wordCloudWords, impressions, onComplete]);

  const handleVideoEnd = () => {
    setVideoWatched(true);
  };

  const handleWordsChange = (words: string[]) => {
    setWordCloudWords(words);
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
          <VideoPlayer
            src="/Comprendre la chanson _Né en 17 à Leidenstadt_.mp4"
            title="Introduction à la séquence"
            duration="1:00"
            poster="/leidenstadt_accueil.jpg"
            onEnd={handleVideoEnd}
            className="mb-4"
          />
          <p className="text-sm text-gray-600">
            Regardez cette présentation pour comprendre les objectifs de notre séquence d'apprentissage.
          </p>
          {videoWatched && (
            <div className="mt-2 flex items-center gap-2 text-green-600">
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                ✓ Vidéo visionnée
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Word cloud activity */}
      <WordCloudActivity
        question="Que vous évoque le titre 'Né en 17 à Leidenstadt' ?"
        placeholder="Tapez un mot-clé..."
        maxWords={15}
        collaborative={true}
        onWordsChange={handleWordsChange}
        initialWords={[]}
      />

      {/* Impressions textarea */}
      <Card>
        <CardHeader>
          <CardTitle>Vos premières impressions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="font-medium">Notez vos premières impressions :</label>
            <Textarea
              placeholder="Qu'est-ce que ce titre vous inspire ? Quelles images ou émotions vous viennent à l'esprit ?"
              value={impressions}
              onChange={(e) => setImpressions(e.target.value)}
              className="min-h-20"
            />
            <div className="text-sm text-muted-foreground">
              {impressions.length} caractères (minimum 100 requis)
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress indicators */}
      <Card className="bg-blue-50">
        <CardContent className="p-4">
          <h4 className="font-semibold mb-3">Votre progression :</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant={videoWatched ? "default" : "outline"}>
                {videoWatched ? "✓" : "○"} Vidéo visionnée
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={wordCloudWords.length >= 3 ? "default" : "outline"}>
                {wordCloudWords.length >= 3 ? "✓" : "○"} Au moins 3 mots-clés ajoutés ({wordCloudWords.length}/3)
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={impressions.length > 20 ? "default" : "outline"}>
                {impressions.length > 20 ? "✓" : "○"} Impressions rédigées
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-end">
        <Button onClick={onNext} disabled={!isCompleted} size="lg">
          Commencer la découverte
        </Button>
      </div>
    </div>
  );
};

export default Screen1_1;
