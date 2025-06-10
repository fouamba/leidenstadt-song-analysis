
import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { useSpeech } from "@/hooks/useSpeech";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';

interface Screen1_2Props {
  onComplete: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

const Screen1_2: React.FC<Screen1_2Props> = ({ onComplete, onNext, onPrevious }) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [listeningComplete, setListeningComplete] = useState(false);
  const [journalEntry, setJournalEntry] = useState('');
  const audioRef = useRef<HTMLAudioElement>(null);
  const { speak } = useSpeech();

  const instructions = "Écoutez attentivement la chanson dans son intégralité pour une première découverte. Notez vos impressions, émotions et questions qui vous viennent à l'esprit pendant l'écoute.";

  useEffect(() => {
    speak(instructions);
  }, []);

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    
    const currentTime = audioRef.current.currentTime;
    setCurrentTime(currentTime);
    
    // Mark listening as complete when 80% of the song is heard
    if (currentTime > duration * 0.8 && !listeningComplete) {
      setListeningComplete(true);
      speak("Vous avez écouté la majorité de la chanson. Vous pouvez maintenant noter vos impressions.");
    }
  };

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return;
    setDuration(audioRef.current.duration);
  };

  const handleJournalChange = (value: string) => {
    setJournalEntry(value);
    if (value.length > 50 && listeningComplete) {
      setIsCompleted(true);
      onComplete();
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-center">Première écoute de découverte</h2>
      
      {/* Audio player */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Volume2 className="h-5 w-5" />
            "Né en 17 à Leidenstadt" - Jean-Jacques Goldman
          </CardTitle>
        </CardHeader>
        <CardContent>
          <audio 
            ref={audioRef}
            src="/Ne-en-17-a-Leidenstadt.mp3"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => {
              setIsPlaying(false);
              setListeningComplete(true);
            }}
          />
          
          <div className="space-y-4">
            <div className="w-full">
              <div className="flex justify-between text-sm mb-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
              <Progress value={(currentTime / duration) * 100} className="w-full" />
            </div>
            
            <div className="flex gap-4 justify-center">
              <Button variant="outline" onClick={() => {
                if (audioRef.current) {
                  audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 10);
                }
              }}>
                <SkipBack className="h-4 w-4" />
              </Button>
              <Button onClick={handlePlayPause} size="lg">
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              <Button variant="outline" onClick={() => {
                if (audioRef.current) {
                  audioRef.current.currentTime = Math.min(duration, audioRef.current.currentTime + 10);
                }
              }}>
                <SkipForward className="h-4 w-4" />
              </Button>
            </div>
            
            {listeningComplete && (
              <div className="text-center">
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  Écoute terminée !
                </Badge>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Journal entry */}
      <Card>
        <CardHeader>
          <CardTitle>Journal d'écoute</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600">
            Notez vos premières impressions, émotions, questions ou réflexions suscitées par cette première écoute :
          </p>
          
          <Textarea
            placeholder="• Quelles émotions cette chanson évoque-t-elle ?
• Quels mots ou phrases vous ont marqué ?
• Quelle atmosphère se dégage de cette chanson ?
• Quelles questions vous posez-vous sur le sens du texte ?"
            value={journalEntry}
            onChange={(e) => handleJournalChange(e.target.value)}
            className="min-h-32"
            disabled={!listeningComplete}
          />
          
          <div className="text-sm text-gray-500">
            {journalEntry.length > 0 && (
              <span>{journalEntry.length} caractères - </span>
            )}
            {!listeningComplete ? "Écoutez d'abord la chanson pour débloquer la saisie" : 
             journalEntry.length < 50 ? "Développez vos impressions (minimum 50 caractères)" : "Parfait !"}
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrevious}>
          Retour
        </Button>
        <Button onClick={onNext} disabled={!isCompleted}>
          Continuer vers l'analyse
        </Button>
      </div>
    </div>
  );
};

export default Screen1_2;
