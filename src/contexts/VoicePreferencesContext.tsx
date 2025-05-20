
import React, { createContext, useContext, useState, useEffect } from 'react';
import SpeechService from '../services/SpeechService';

interface VoicePreferencesContextType {
  voiceEnabled: boolean;
  setVoiceEnabled: (enabled: boolean) => void;
  selectedVoice: string | null;
  setSelectedVoice: (voiceName: string) => void;
  rate: number;
  setRate: (rate: number) => void;
  pitch: number;
  setPitch: (pitch: number) => void;
  volume: number;
  setVolume: (volume: number) => void;
  availableVoices: SpeechSynthesisVoice[];
}

const defaultContextValue: VoicePreferencesContextType = {
  voiceEnabled: true,
  setVoiceEnabled: () => {},
  selectedVoice: null,
  setSelectedVoice: () => {},
  rate: 1.0,
  setRate: () => {},
  pitch: 1.0,
  setPitch: () => {},
  volume: 1.0,
  setVolume: () => {},
  availableVoices: []
};

const VoicePreferencesContext = createContext<VoicePreferencesContextType>(defaultContextValue);

export const useVoicePreferences = () => useContext(VoicePreferencesContext);

export const VoicePreferencesProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(
    localStorage.getItem('voiceEnabled') !== 'false'
  );
  const [selectedVoice, setSelectedVoice] = useState<string | null>(
    localStorage.getItem('selectedVoice')
  );
  const [rate, setRate] = useState<number>(
    parseFloat(localStorage.getItem('voiceRate') || '1.0')
  );
  const [pitch, setPitch] = useState<number>(
    parseFloat(localStorage.getItem('voicePitch') || '1.0')
  );
  const [volume, setVolume] = useState<number>(
    parseFloat(localStorage.getItem('voiceVolume') || '1.0')
  );
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [speechService] = useState(() => new SpeechService());
  
  // Initialiser le service
  useEffect(() => {
    setAvailableVoices(speechService.getVoices());
    
    // Vérifier si la voix sélectionnée existe encore
    if (selectedVoice) {
      const voice = speechService.getVoices().find(v => v.name === selectedVoice);
      if (voice) {
        speechService.setDefaultVoice(voice);
      }
    }
    
    // Appliquer les préférences
    speechService.setRate(rate);
    speechService.setPitch(pitch);
    speechService.setVolume(volume);
    
    // Écouter les changements de voix
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = () => {
        setAvailableVoices(speechService.getVoices());
      };
    }
  }, [speechService, selectedVoice, rate, pitch, volume]);
  
  // Persister les préférences
  useEffect(() => {
    localStorage.setItem('voiceEnabled', voiceEnabled.toString());
  }, [voiceEnabled]);
  
  useEffect(() => {
    if (selectedVoice) {
      localStorage.setItem('selectedVoice', selectedVoice);
    }
  }, [selectedVoice]);
  
  useEffect(() => {
    localStorage.setItem('voiceRate', rate.toString());
    speechService.setRate(rate);
  }, [rate, speechService]);
  
  useEffect(() => {
    localStorage.setItem('voicePitch', pitch.toString());
    speechService.setPitch(pitch);
  }, [pitch, speechService]);
  
  useEffect(() => {
    localStorage.setItem('voiceVolume', volume.toString());
    speechService.setVolume(volume);
  }, [volume, speechService]);
  
  return (
    <VoicePreferencesContext.Provider
      value={{
        voiceEnabled,
        setVoiceEnabled,
        selectedVoice,
        setSelectedVoice,
        rate,
        setRate,
        pitch,
        setPitch,
        volume,
        setVolume,
        availableVoices
      }}
    >
      {children}
    </VoicePreferencesContext.Provider>
  );
};
