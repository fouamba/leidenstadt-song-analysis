import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Award, BookOpen, BarChart, FileText } from 'lucide-react';

// Types
interface BadgeType {
  id: string;
  name: string;
  description: string;
  icon: string;
  acquired: boolean;
  acquiredDate?: Date;
}

interface Activity {
  id: string;
  title: string;
  type: 'quiz' | 'writing' | 'exercise' | 'reading';
  completed: boolean;
  score?: number;
  date: Date;
}

interface SessionProgress {
  sessionId: number;
  sessionName: string;
  progress: number;
  completed: boolean;
  activities: Activity[];
}

interface Skill {
  id: string;
  name: string;
  progress: number;
}

// Mock data
const mockSessionsProgress: SessionProgress[] = [
  {
    sessionId: 1,
    sessionName: "Découverte et compréhension globale de l'œuvre",
    progress: 100,
    completed: true,
    activities: [
      { id: '1.1', title: 'Introduction', type: 'reading', completed: true, date: new Date('2025-05-15') },
      { id: '1.2', title: 'Écoute initiale', type: 'reading', completed: true, date: new Date('2025-05-15') },
      { id: '1.3', title: 'Recueil des impressions', type: 'exercise', completed: true, score: 85, date: new Date('2025-05-15') },
      { id: '1.9', title: 'Évaluation formative', type: 'quiz', completed: true, score: 92, date: new Date('2025-05-16') }
    ]
  },
  {
    sessionId: 2,
    sessionName: "L'expression du passé par les temps de l'indicatif",
    progress: 40,
    completed: false,
    activities: [
      { id: '2.1', title: 'Activation des connaissances', type: 'quiz', completed: true, score: 78, date: new Date('2025-05-17') },
      { id: '2.2', title: 'Exploration ciblée', type: 'exercise', completed: true, date: new Date('2025-05-17') },
      { id: '2.3', title: 'Construction du savoir linguistique', type: 'exercise', completed: false, date: new Date('2025-05-17') }
    ]
  },
  {
    sessionId: 3,
    sessionName: "L'expression du possible et de l'hypothétique",
    progress: 0,
    completed: false,
    activities: []
  },
  {
    sessionId: 4,
    sessionName: "La phrase complexe et la communication artistique",
    progress: 0,
    completed: false,
    activities: []
  }
];

const mockBadges: BadgeType[] = [
  {
    id: 'badge1',
    name: 'Découvreur',
    description: 'A terminé la première séance',
    icon: 'award',
    acquired: true,
    acquiredDate: new Date('2025-05-16')
  },
  {
    id: 'badge2',
    name: 'Maître du passé',
    description: 'A maîtrisé les temps du passé',
    icon: 'clock',
    acquired: false
  },
  {
    id: 'badge3',
    name: 'Maître de l\'hypothèse',
    description: 'Expert des phrases conditionnelles',
    icon: 'help-circle',
    acquired: false
  },
  {
    id: 'badge4',
    name: 'Analyste artistique',
    description: 'A réalisé une analyse complète de l\'œuvre',
    icon: 'music',
    acquired: false
  }
];

const mockSkills: Skill[] = [
  { id: 'skill1', name: 'Compréhension de texte', progress: 85 },
  { id: 'skill2', name: 'Analyse littéraire', progress: 70 },
  { id: 'skill3', name: 'Maîtrise des temps verbaux', progress: 60 },
  { id: 'skill4', name: 'Expression écrite', progress: 75 }
];

const StudentDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState<SessionProgress[]>(mockSessionsProgress);
  const [badges, setBadges] = useState<BadgeType[]>(mockBadges);
  const [skills, setSkills] = useState<Skill[]>(mockSkills);
  const [overallProgress, setOverallProgress] = useState(0);

  useEffect(() => {
    // Calcul de la progression globale
    const completed = sessions.reduce((sum, session) => sum + session.progress, 0);
    setOverallProgress(Math.round(completed / sessions.length));
  }, [sessions]);

  const goToSession = (sessionId: number) => {
    navigate(`/sessions/${sessionId}`);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <div className="mb-4">
        <Button variant="outline" onClick={() => navigate("/")}>← Retour à l'accueil</Button>
      </div>
      <h1 className="text-3xl font-bold mb-6">Tableau de bord - Né en 17 à Leidenstadt</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Carte progression globale */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Progression globale</CardTitle>
            <CardDescription>Votre avancement dans la séquence</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <div className="relative w-36 h-36">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold">{overallProgress}%</span>
                </div>
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#e2e8f0"
                    strokeWidth="10"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="10"
                    strokeDasharray={`${overallProgress * 2.51} 251`}
                    strokeDashoffset="0"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
              </div>
              <p className="mt-4 text-sm text-gray-500">
                {overallProgress < 100 
                  ? "Continuez votre progression !" 
                  : "Félicitations, vous avez terminé la séquence !"}
              </p>
            </div>
          </CardContent>
        </Card>
        {/* Carte dernières activités */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Dernières activités</CardTitle>
            <CardDescription>Vos activités récentes</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {sessions
                .flatMap(session => session.activities)
                .sort((a, b) => b.date.getTime() - a.date.getTime())
                .slice(0, 3)
                .map(activity => (
                  <li key={activity.id} className="flex justify-between items-center p-2 border-b">
                    <div>
                      <p className="font-medium">{activity.title}</p>
                      <p className="text-sm text-gray-500">{formatDate(activity.date)}</p>
                    </div>
                    <div className="flex items-center">
                      {activity.score && (
                        <span className="mr-2 text-sm font-medium">{activity.score}%</span>
                      )}
                      {activity.completed && (
                        <Badge variant="outline" className="bg-green-100">Terminé</Badge>
                      )}
                    </div>
                  </li>
                ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" className="w-full">
              Voir toutes les activités
            </Button>
          </CardFooter>
        </Card>
        {/* Carte badges */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Badges</CardTitle>
            <CardDescription>Vos récompenses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {badges.map(badge => (
                <div 
                  key={badge.id} 
                  className={`flex flex-col items-center p-2 rounded-lg ${
                    badge.acquired ? 'bg-blue-50' : 'bg-gray-50 opacity-50'
                  }`}
                >
                  <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
                    badge.acquired ? 'bg-blue-100 text-blue-600' : 'bg-gray-200 text-gray-400'
                  }`}>
                    <Award size={24} />
                  </div>
                  <h3 className="mt-2 font-medium text-sm text-center">{badge.name}</h3>
                  {badge.acquired && badge.acquiredDate && (
                    <p className="text-xs text-gray-500 mt-1">{formatDate(badge.acquiredDate)}</p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <Tabs defaultValue="sessions" className="w-full">
        <TabsList>
          <TabsTrigger value="sessions">Séances</TabsTrigger>
          <TabsTrigger value="skills">Compétences</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
        </TabsList>
        <TabsContent value="sessions" className="pt-4">
          <div className="grid grid-cols-1 gap-4">
            {sessions.map((session) => (
              <Card key={session.sessionId} className={session.completed ? 'border-green-200' : ''}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">
                      Séance {session.sessionId} : {session.sessionName}
                    </CardTitle>
                    {session.completed && (
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        Terminé
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progression</span>
                      <span>{session.progress}%</span>
                    </div>
                    <Progress value={session.progress} className="h-2" />
                  </div>
                  {session.activities.length > 0 && (
                    <div className="mt-4">
                      <h4 className="font-medium mb-2 text-sm">Activités récentes</h4>
                      <ul className="space-y-1">
                        {session.activities.slice(0, 2).map(activity => (
                          <li key={activity.id} className="text-sm flex justify-between">
                            <span>{activity.title}</span>
                            {activity.completed && <span className="text-green-600">✓</span>}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={() => goToSession(session.sessionId)}
                    variant={session.progress > 0 ? "default" : "outline"}
                    className="w-full"
                    disabled={session.sessionId > 1 && sessions[session.sessionId - 2].progress < 100}
                  >
                    {session.progress === 0 ? 'Commencer' : 'Continuer'}
                    <ChevronRight size={16} className="ml-1" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="skills" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Mes compétences</CardTitle>
              <CardDescription>Progression dans les compétences clés</CardDescription>
            </CardHeader>
            <CardContent>
              {skills.map(skill => (
                <div key={skill.id} className="mb-6">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{skill.name}</span>
                    <span className="text-sm font-medium">{skill.progress}%</span>
                  </div>
                  <Progress value={skill.progress} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="portfolio" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Mon portfolio</CardTitle>
              <CardDescription>Vos productions et travaux</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center">
                      <FileText size={20} className="mr-2 text-blue-500" />
                      <CardTitle className="text-base">Analyse du premier couplet</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2 pt-0">
                    <p className="text-sm text-gray-600">Séance 1 - Exercice 1.8</p>
                    <p className="text-xs text-gray-500">15/05/2025</p>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button variant="ghost" size="sm">Consulter</Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center">
                      <FileText size={20} className="mr-2 text-blue-500" />
                      <CardTitle className="text-base">Exercice sur les temps verbaux</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2 pt-0">
                    <p className="text-sm text-gray-600">Séance 2 - Exercice 2.4</p>
                    <p className="text-xs text-gray-500">17/05/2025</p>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button variant="ghost" size="sm">Consulter</Button>
                  </CardFooter>
                </Card>
              </div>
              {/* Empty state */}
              {false && (
                <div className="flex flex-col items-center justify-center py-12">
                  <FileText size={48} className="text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-700">Aucune production</h3>
                  <p className="text-gray-500 text-center">
                    Vos productions apparaîtront ici une fois que vous aurez terminé des exercices.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentDashboard;
