import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info, Check, BookOpen, AlertTriangle } from 'lucide-react';

// Structure pour les critères d'auto-évaluation
interface EvaluationCriteria {
  id: string;
  label: string;
  description: string;
  achieved: boolean;
}

// Structure pour les suggestions de vocabulaire
interface VocabSuggestion {
  category: string;
  words: string[];
}

const Screen1_9 = () => {
  const [essay, setEssay] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [textFeedback, setTextFeedback] = useState('');
  const [showHelp, setShowHelp] = useState(false);
  const [criteria, setCriteria] = useState<EvaluationCriteria[]>([
    { id: 'c1', label: 'Compréhension du message', description: 'Vous avez identifié le message principal de la chanson', achieved: false },
    { id: 'c2', label: 'Justification', description: 'Vous justifiez votre interprétation avec des éléments du texte', achieved: false },
    { id: 'c3', label: 'Structure', description: 'Votre paragraphe est bien structuré (intro, développement, conclusion)', achieved: false },
    { id: 'c4', label: 'Lexique', description: 'Vous utilisez un vocabulaire riche et adapté', achieved: false },
    { id: 'c5', label: 'Cohérence', description: 'Votre texte est cohérent et fluide', achieved: false }
  ]);

  const vocabularySuggestions: VocabSuggestion[] = [
    {
      category: 'Mots pour exprimer le thème',
      words: ['histoire', 'guerre', 'conflit', 'choix', 'engagement', 'humanité', 'conscience']
    },
    {
      category: 'Connecteurs logiques',
      words: ['cependant', 'néanmoins', 'par conséquent', 'ainsi', 'en effet', 'donc', 'car', 'puisque']
    },
    {
      category: 'Verbes d\'analyse',
      words: ['illustrer', 'symboliser', 'exprimer', 'évoquer', 'suggérer', 'représenter', 'dénoncer']
    }
  ];

  // Effet pour compter les mots
  useEffect(() => {
    if (essay.trim() === '') {
      setWordCount(0);
      return;
    }
    const words = essay.trim().split(/\s+/);
    setWordCount(words.length);
    
    // Analyse basique du texte
    analyzeText(essay);
  }, [essay]);

  // Fonction pour analyser le texte et fournir un retour
  const analyzeText = (text: string) => {
    // Mise à jour des critères
    const newCriteria = [...criteria];
    
    // Critère de longueur
    if (wordCount >= 50) {
      newCriteria[2].achieved = true;
    } else {
      newCriteria[2].achieved = false;
    }
    
    // Critère de lexique (vérification basique de la richesse lexicale)
    const uniqueWords = new Set(text.toLowerCase().split(/\s+/).filter(word => word.length > 2));
    if (uniqueWords.size > wordCount * 0.7) {
      newCriteria[3].achieved = true;
    } else {
      newCriteria[3].achieved = false;
    }
    
    // Recherche de connecteurs logiques pour la cohérence
    const connectorsPresent = vocabularySuggestions[1].words.some(connector => 
      text.toLowerCase().includes(connector.toLowerCase())
    );
    if (connectorsPresent && wordCount > 30) {
      newCriteria[4].achieved = true;
    } else {
      newCriteria[4].achieved = false;
    }
    
    // Analyse de contenu pour les critères 1 et 2 (simplifiée pour cet exemple)
    // Ces critères nécessiteraient une analyse plus complexe dans un cas réel
    if (text.length > 100) {
      newCriteria[0].achieved = true;
      if (text.includes('chanson') && text.includes('message')) {
        newCriteria[1].achieved = true;
      }
    }
    
    setCriteria(newCriteria);
    
    // Génération de feedback
    let feedback = '';
    if (wordCount < 20) {
      feedback = 'Votre réponse est trop courte. Développez davantage votre analyse.';
    } else if (wordCount > 50 && wordCount < 100) {
      feedback = 'Bonne longueur. Continuez à enrichir votre analyse avec des exemples précis.';
    } else if (wordCount >= 100) {
      feedback = 'Excellente longueur. Assurez-vous que chaque idée est bien développée.';
    }
    
    setTextFeedback(feedback);
  };

  // Calcul du score global
  const completionScore = criteria.filter(c => c.achieved).length / criteria.length * 100;

  // Fonction pour la synthèse vocale
  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'fr-FR';
      window.speechSynthesis.speak(utterance);
    }
  };

  // Effet pour la lecture vocale des consignes au chargement
  useEffect(() => {
    const instruction = "Rédigez un paragraphe analysant le message principal de la chanson. Utilisez les critères affichés pour vous guider.";
    speakText(instruction);
  }, []);

  return (
    <div className="container mx-auto p-4 flex flex-col h-full">
      <h1 className="text-2xl font-bold mb-4">Séance 1 - Écran 9: Évaluation formative</h1>
      {/* ...le reste du code fourni... */}
    </div>
  );
};

export default Screen1_9;
