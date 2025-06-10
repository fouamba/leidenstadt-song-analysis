import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { PageLayout } from '@/components/layout/PageLayout';
import { 
  Play, 
  Pause, 
  ChevronRight, 
  ChevronLeft, 
  Award, 
  BookOpen, 
  MessageSquare, 
  PenTool,
  CheckCircle,
  Star,
  Eye,
  Download,
  Share,
  Volume2
} from 'lucide-react';

const Seance4 = () => {
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [currentScreen, setCurrentScreen] = useState(1);
  const TOTAL_SCREENS = 10;

  const screens = [
    { id: 1, component: <p>Contenu pédagogique de la Séance 4 à compléter.</p> },
    // Add more screens as needed
  ];

  return (
    <PageLayout
      heroTitle="Séance 4 : La phrase complexe et la communication artistique"
      heroDescription="Analysez la structure syntaxique et les procédés rhétoriques"
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

export default Seance4;
