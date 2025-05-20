
import { useEffect, useState } from 'react';
import SpeechService from '../services/SpeechService';

interface UseSpeechOptions {
  autoInit?: boolean;
  defaultVoice?: string; // Identifiant de la voix
}

export function useSpeech(options: UseSpeechOptions = {}) {
  const speechService = SpeechService.getInstance();
  const [isInitialized, setIsInitialized] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  
  useEffect(() => {
    if (options.autoInit) {
      init();
    }
    
    return () => {
      // Nettoyage
      speechService.cancel();
    };
  }, [options.autoInit]);
  
  const init = () => {
    const voices = speechService.getVoices();
    setAvailableVoices(voices);
    
    // Définir la voix par défaut si spécifiée
    if (options.defaultVoice) {
      const voice = voices.find(v => v.name === options.defaultVoice);
      if (voice) {
        speechService.setDefaultVoice(voice);
      }
    }
    
    setIsInitialized(true);
  };
  
  const speak = (text: string, options?: {
    voice?: SpeechSynthesisVoice,
    rate?: number,
    pitch?: number,
    volume?: number
  }) => {
    if (!isInitialized) {
      init();
    }
    
    setIsSpeaking(true);
    setIsPaused(false);
    
    speechService.speak(text, {
      ...options,
      onStart: () => setIsSpeaking(true),
      onEnd: () => {
        setIsSpeaking(false);
        setIsPaused(false);
      },
      onError: () => {
        setIsSpeaking(false);
        setIsPaused(false);
      }
    });
  };
  
  const pause = () => {
    speechService.pause();
    setIsPaused(true);
  };
  
  const resume = () => {
    speechService.resume();
    setIsPaused(false);
  };
  
  const stop = () => {
    speechService.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
  };
  
  return {
    isInitialized,
    isSpeaking,
    isPaused,
    availableVoices,
    frenchVoices: speechService.getFrenchVoices(),
    speak,
    pause,
    resume,
    stop,
    setRate: speechService.setRate.bind(speechService),
    setPitch: speechService.setPitch.bind(speechService),
    setVolume: speechService.setVolume.bind(speechService),
    setVoice: speechService.setDefaultVoice.bind(speechService)
  };
}
