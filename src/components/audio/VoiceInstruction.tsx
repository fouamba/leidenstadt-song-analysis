
import React, { useEffect } from 'react';
import { useSpeech } from '../../hooks/useSpeech';
import { Button } from "@/components/ui/button";
import { Volume, VolumeX, Play, Pause, Square } from "lucide-react";

interface VoiceInstructionProps {
  text: string;
  autoPlay?: boolean;
  onComplete?: () => void;
  rate?: number;
  pitch?: number;
  volume?: number;
  voiceName?: string;
  visuallyHidden?: boolean;
  children?: React.ReactNode;
}

export const VoiceInstruction: React.FC<VoiceInstructionProps> = ({
  text,
  autoPlay = false,
  onComplete,
  rate,
  pitch,
  volume,
  voiceName,
  visuallyHidden = false,
  children
}) => {
  const { speak, isSpeaking, isPaused, availableVoices, stop, pause, resume } = useSpeech({ autoInit: true });
  
  useEffect(() => {
    if (autoPlay && text) {
      handleSpeak();
    }
    
    return () => {
      stop();
    };
  }, [text, autoPlay]);
  
  const handleSpeak = () => {
    const options: any = {};
    
    if (rate) options.rate = rate;
    if (pitch) options.pitch = pitch;
    if (volume) options.volume = volume;
    
    if (voiceName && availableVoices.length > 0) {
      const voice = availableVoices.find(v => v.name === voiceName);
      if (voice) {
        options.voice = voice;
      }
    }
    
    speak(text, {
      ...options,
      onEnd: onComplete
    });
  };
  
  const handleToggle = () => {
    if (isSpeaking) {
      if (isPaused) {
        resume();
      } else {
        pause();
      }
    } else {
      handleSpeak();
    }
  };
  
  // Styles pour les instructions visuellement cachées mais accessibles
  const hiddenStyle = visuallyHidden ? {
    position: 'absolute' as const,
    height: '1px',
    width: '1px',
    overflow: 'hidden',
    clip: 'rect(1px, 1px, 1px, 1px)',
    whiteSpace: 'nowrap' as const
  } : {};
  
  return (
    <div className="voice-instruction flex items-center space-x-2">
      {children || (
        <div className="instruction-container flex items-center space-x-2">
          <p className={visuallyHidden ? "sr-only" : ""}>
            {visuallyHidden ? text : ""}
          </p>
          <Button 
            onClick={handleToggle}
            aria-label={isSpeaking && !isPaused ? "Mettre en pause la lecture" : isPaused ? "Reprendre la lecture" : "Lire les instructions"}
            variant="outline"
            size="sm"
          >
            {isSpeaking && !isPaused ? (
              <Pause className="h-4 w-4" />
            ) : isPaused ? (
              <Play className="h-4 w-4" />
            ) : (
              <Volume className="h-4 w-4" />
            )}
          </Button>
          {isSpeaking && (
            <Button 
              onClick={stop}
              aria-label="Arrêter la lecture"
              variant="outline"
              size="sm"
            >
              <Square className="h-4 w-4" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
