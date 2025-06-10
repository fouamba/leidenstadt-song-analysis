
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { PageLayout } from '@/components/layout/PageLayout';

const Seance3 = () => {
  const [currentScreen, setCurrentScreen] = useState(1);
  const TOTAL_SCREENS = 5; // Exemple de nombre total d'écrans

  const nextScreen = () => {
    if (currentScreen < TOTAL_SCREENS) {
      setCurrentScreen(currentScreen + 1);
    }
  };

  const prevScreen = () => {
    if (currentScreen > 1) {
      setCurrentScreen(currentScreen - 1);
    }
  };

  // Définition des écrans (composants)
  const Screen1 = () => (
    <Card>
      <CardHeader>
        <CardTitle>Introduction au Conditionnel</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Le conditionnel est utilisé pour exprimer des hypothèses, des souhaits ou des actions qui dépendent d'une condition.</p>
        <Button onClick={nextScreen}>Suivant</Button>
      </CardContent>
    </Card>
  );

  const Screen2 = () => (
    <Card>
      <CardHeader>
        <CardTitle>Formes du Conditionnel</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Explorez les différentes formes du conditionnel : présent et passé.</p>
        <Button onClick={nextScreen}>Suivant</Button>
      </CardContent>
    </Card>
  );

  const Screen3 = () => (
    <Card>
      <CardHeader>
        <CardTitle>Exercice : Identification</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Identifiez les phrases au conditionnel dans le texte.</p>
        <Button onClick={nextScreen}>Suivant</Button>
      </CardContent>
    </Card>
  );

  const Screen4 = () => (
    <Card>
      <CardHeader>
        <CardTitle>Atelier d'écriture</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Écrivez un court paragraphe en utilisant le conditionnel.</p>
        <Button onClick={nextScreen}>Suivant</Button>
      </CardContent>
    </Card>
  );

  const Screen5 = () => (
    <Card>
      <CardHeader>
        <CardTitle>Conclusion</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Récapitulation des concepts clés du conditionnel.</p>
        <Button onClick={() => setCurrentScreen(1)}>Recommencer</Button>
      </CardContent>
    </Card>
  );

  const screens = [
    { id: 1, component: <Screen1 /> },
    { id: 2, component: <Screen2 /> },
    { id: 3, component: <Screen3 /> },
    { id: 4, component: <Screen4 /> },
    { id: 5, component: <Screen5 /> },
  ];

  const progressPercentage = (currentScreen / TOTAL_SCREENS) * 100;

  return (
    <PageLayout
      heroTitle="Séance 3 : L'expression du possible et de l'hypothétique"
      heroDescription="Maîtrisez le mode conditionnel à travers des activités interactives"
    >
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <Progress value={progressPercentage} className="h-2 mb-2" />
          <div className="text-sm text-gray-600">
            Écran {currentScreen} / {TOTAL_SCREENS}
          </div>
        </div>
        
        {screens.find(screen => screen.id === currentScreen)?.component}
      </div>
    </PageLayout>
  );
};

export default Seance3;
