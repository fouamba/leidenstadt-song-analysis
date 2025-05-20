
import { useState, useEffect } from 'react';
import { useVoicePreferences } from '../contexts/VoicePreferencesContext';

type SpeechStatus = 'idle' | 'speaking' | 'paused' | 'error';

export function useSpeechSynthesis() {
  const [status, setStatus] = useState<SpeechStatus>('idle');
  const { voiceEnabled, selectedVoice, rate, pitch, volume, availableVoices } = useVoicePreferences();

  useEffect(() => {
    return () => {
      // Clean up by canceling any ongoing speech when component unmounts
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const speak = (text: string) => {
    if (!voiceEnabled || !('speechSynthesis' in window)) {
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Apply voice preferences
    if (selectedVoice) {
      const voice = availableVoices.find(v => v.name === selectedVoice);
      if (voice) utterance.voice = voice;
    }
    
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = volume;
    utterance.lang = 'fr-FR'; // Set language to French
    
    // Event handlers
    utterance.onstart = () => setStatus('speaking');
    utterance.onpause = () => setStatus('paused');
    utterance.onresume = () => setStatus('speaking');
    utterance.onend = () => setStatus('idle');
    utterance.onerror = () => setStatus('error');
    
    window.speechSynthesis.speak(utterance);
  };

  const pause = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.pause();
      setStatus('paused');
    }
  };

  const resume = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.resume();
      setStatus('speaking');
    }
  };

  const cancel = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setStatus('idle');
    }
  };

  return {
    speak,
    pause,
    resume,
    cancel,
    status,
    isSpeaking: status === 'speaking',
    isPaused: status === 'paused'
  };
}
