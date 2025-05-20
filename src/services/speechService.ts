
import { useState, useEffect } from 'react';

// Type pour le statut de la synthèse vocale
type SpeechStatus = 'idle' | 'speaking' | 'error';

// Fonction pour lire un texte à voix haute
export const speakText = (text: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!('speechSynthesis' in window)) {
      console.error('La synthèse vocale n\'est pas supportée par votre navigateur.');
      reject(new Error('Speech synthesis not supported'));
      return;
    }

    // Annuler toute synthèse en cours
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'fr-FR'; // Définir la langue en français
    utterance.rate = 0.9; // Vitesse légèrement ralentie pour une meilleure compréhension

    utterance.onend = () => {
      resolve();
    };

    utterance.onerror = (event) => {
      console.error('Erreur de synthèse vocale:', event);
      reject(new Error('Speech synthesis error'));
    };

    window.speechSynthesis.speak(utterance);
  });
};

// Hook React pour utiliser la synthèse vocale
export const useSpeech = (text: string, autoPlay: boolean = false): [SpeechStatus, () => void] => {
  const [status, setStatus] = useState<SpeechStatus>('idle');

  // Fonction pour démarrer la lecture
  const speak = () => {
    setStatus('speaking');
    speakText(text)
      .then(() => setStatus('idle'))
      .catch(() => setStatus('error'));
  };

  // Lecture automatique si autoPlay est true
  useEffect(() => {
    if (autoPlay) {
      speak();
    }
    
    // Nettoyage à la destruction du composant
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        setStatus('idle');
      }
    };
  }, [autoPlay, text]);

  return [status, speak];
};

export default useSpeech;
