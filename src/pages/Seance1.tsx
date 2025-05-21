import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { NavigationBar } from "@/components/NavigationBar";
import { useVoicePreferences } from '@/contexts/VoicePreferencesContext';

// Importation des écrans de la Séance 1
import Screen1_1 from './seance1/Screen1_1';
import Screen1_2 from './seance1/Screen1_2';
import Screen1_3 from './seance1/Screen1_3';
import Screen1_4 from './seance1/Screen1_4';
import Screen1_5 from './seance1/Screen1_5';
import Screen1_6 from './seance1/Screen1_6';
import Screen1_7 from './seance1/Screen1_7';
import Screen1_8 from './seance1/Screen1_8';
import Screen1_9 from './seance1/Screen1_9';
import Screen1_10 from './seance1/Screen1_10';

// Types pour le suivi de progression
type ProgressionState = {
  currentScreen: number;
  totalScreens: number;
  completed: boolean;
  screenCompletion: boolean[];
};

const Seance1: React.FC = () => {
  // État pour suivre la progression
  const [progression, setProgression] = useState<ProgressionState>({
    currentScreen: 1,
    totalScreens: 10, // 10 écrans désormais
    completed: false,
    screenCompletion: Array(10).fill(false),
  });

  const navigate = useNavigate();
  const { voiceEnabled } = useVoicePreferences();

  // Calculer le pourcentage de progression
  const progressPercentage = (progression.currentScreen / progression.totalScreens) * 100;

  // Fonction pour passer à l'écran suivant
  const nextScreen = () => {
    if (progression.currentScreen < progression.totalScreens) {
      setProgression(prev => ({
        ...prev,
        currentScreen: prev.currentScreen + 1,
        screenCompletion: prev.screenCompletion.map((complete, idx) => 
          idx === prev.currentScreen - 1 ? true : complete
        )
      }));
    } else {
      // Séance terminée
      setProgression(prev => ({
        ...prev,
        completed: true,
        screenCompletion: prev.screenCompletion.map(() => true)
      }));
    }
  };

  // Fonction pour revenir à l'écran précédent
  const previousScreen = () => {
    if (progression.currentScreen > 1) {
      setProgression(prev => ({
        ...prev,
        currentScreen: prev.currentScreen - 1
      }));
    }
  };

  // Fonction pour marquer l'écran actuel comme terminé
  const completeCurrentScreen = () => {
    setProgression(prev => ({
      ...prev,
      screenCompletion: prev.screenCompletion.map((complete, idx) => 
        idx === prev.currentScreen - 1 ? true : complete
      )
    }));
  };

  // Fonction pour vérifier si l'écran actuel est terminé
  const isCurrentScreenCompleted = () => {
    return progression.screenCompletion[progression.currentScreen - 1];
  };

  // Rendu conditionnel de l'écran actuel
  const renderCurrentScreen = () => {
    switch (progression.currentScreen) {
      case 1:
        return <Screen1_1 
          onComplete={completeCurrentScreen} 
          onNext={nextScreen} 
        />;
      case 2:
        return <Screen1_2 
          onComplete={completeCurrentScreen} 
          onNext={nextScreen} 
          onPrevious={previousScreen} 
        />;
      case 3:
        return <Screen1_3 
          onComplete={completeCurrentScreen} 
          onNext={nextScreen} 
          onPrevious={previousScreen} 
        />;
      case 4:
        return <Screen1_4 
          onComplete={completeCurrentScreen} 
          onNext={nextScreen} 
          onPrevious={previousScreen} 
        />;
      case 5:
        return <Screen1_5 
          onComplete={completeCurrentScreen} 
          onNext={nextScreen} 
          onPrevious={previousScreen} 
        />;
      case 6:
        return <Screen1_6 
          onComplete={completeCurrentScreen} 
          onNext={nextScreen} 
          onPrevious={previousScreen} 
        />;
      case 7:
        return <Screen1_7 
          onComplete={completeCurrentScreen} 
          onNext={nextScreen} 
          onPrevious={previousScreen} 
        />;
      case 8:
        return <Screen1_8 
          onComplete={completeCurrentScreen} 
          onNext={nextScreen} 
          onPrevious={previousScreen} 
        />;
      case 9:
        return <Screen1_9 
          onComplete={completeCurrentScreen} 
          onNext={nextScreen} 
          onPrevious={previousScreen} 
        />;
      case 10:
        return <Screen1_10 
          onComplete={completeCurrentScreen} 
          onNext={() => navigate('/seance/2')} 
          onPrevious={previousScreen} 
        />;
      default:
        return <div>Écran non trouvé</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavigationBar />
      
      <div className="max-w-4xl mx-auto w-full flex-grow p-4">
        <h1 className="text-2xl font-bold mb-4">Séance 1 : Découverte et compréhension globale de l'œuvre</h1>
        
        {/* Barre de progression */}
        <div className="mb-6">
          <Progress value={progressPercentage} className="h-2 mb-2" />
          <div className="text-sm text-gray-600">
            Écran {progression.currentScreen} / {progression.totalScreens}
          </div>
        </div>
        
        {/* Contenu de l'écran actuel */}
        <Card className="p-6 shadow-md mb-4">
          {renderCurrentScreen()}
        </Card>
      </div>

      <footer className="bg-slate-900 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">Application éducative basée sur les compétences - "Né en 17 à Leidenstadt"</p>
        </div>
      </footer>
    </div>
  );
};

export default Seance1;
