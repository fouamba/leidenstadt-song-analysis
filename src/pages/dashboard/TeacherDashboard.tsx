import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { BarChart, PieChart, Calendar, Users, MessageCircle, Settings, Search, ChevronDown, Mail, Edit, Eye } from 'lucide-react';
import { AlertTriangle, AlertCircle, Info, CheckCircle } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

// Types
interface Student {
  id: string;
  name: string;
  avatar?: string;
  lastConnection: Date;
  overallProgress: number;
  currentSession: number;
  alertLevel: 'none' | 'low' | 'medium' | 'high';
  performances: {
    [key: string]: number;
  };
}

interface Session {
  id: number;
  name: string;
  screens: {
    id: string;
    title: string;
    type: 'discovery' | 'exercise' | 'evaluation' | 'theory';
    isEnabled: boolean;
    duration: number;
    isRequired: boolean;
  }[];
}

interface Feedback {
  id: string;
  studentId: string;
  studentName: string;
  date: Date;
  content: string;
  read: boolean;
  activityId?: string;
  activityName?: string;
}

interface ClassAnalytics {
  averageProgress: number;
  sessionCompletionRates: {
    sessionId: number;
    name: string;
    rate: number;
  }[];
  skillAverages: {
    skillId: string;
    name: string;
    average: number;
  }[];
  activityCompletionTimes: {
    activityId: string;
    name: string;
    averageTime: number;
  }[];
}

// Mock data
const mockStudents: Student[] = [
  {
    id: 'student1',
    name: 'Marie Dupont',
    avatar: '/avatars/student1.png',
    lastConnection: new Date('2025-05-20T09:15:00'),
    overallProgress: 65,
    currentSession: 2,
    alertLevel: 'none',
    performances: {
      'comprehension': 82,
      'grammar': 75,
      'writing': 68,
      'analysis': 72
    }
  },
  {
    id: 'student2',
    name: 'Thomas Martin',
    avatar: '/avatars/student2.png',
    lastConnection: new Date('2025-05-19T14:30:00'),
    overallProgress: 45,
    currentSession: 2,
    alertLevel: 'low',
    performances: {
      'comprehension': 65,
      'grammar': 58,
      'writing': 62,
      'analysis': 55
    }
  },
  {
    id: 'student3',
    name: 'Léa Mercier',
    avatar: '/avatars/student3.png',
    lastConnection: new Date('2025-05-18T10:05:00'),
    overallProgress: 30,
    currentSession: 1,
    alertLevel: 'high',
    performances: {
      'comprehension': 45,
      'grammar': 40,
      'writing': 52,
      'analysis': 38
    }
  },
  {
    id: 'student4',
    name: 'Lucas Bernard',
    avatar: '/avatars/student4.png',
    lastConnection: new Date('2025-05-20T08:45:00'),
    overallProgress: 80,
    currentSession: 3,
    alertLevel: 'none',
    performances: {
      'comprehension': 88,
      'grammar': 92,
      'writing': 78,
      'analysis': 85
    }
  },
  {
    id: 'student5',
    name: 'Emma Petit',
    avatar: '/avatars/student5.png',
    lastConnection: new Date('2025-05-17T16:20:00'),
    overallProgress: 25,
    currentSession: 1,
    alertLevel: 'medium',
    performances: {
      'comprehension': 58,
      'grammar': 42,
      'writing': 50,
      'analysis': 42
    }
  }
];

const mockSessions: Session[] = [
  {
    id: 1,
    name: "Découverte et compréhension globale de l'œuvre",
    screens: [
      { id: '1.1', title: 'Introduction et mise en situation', type: 'discovery', isEnabled: true, duration: 10, isRequired: true },
      { id: '1.2', title: 'Première écoute', type: 'discovery', isEnabled: true, duration: 15, isRequired: true },
      { id: '1.3', title: 'Recueil des impressions', type: 'exercise', isEnabled: true, duration: 20, isRequired: true },
      { id: '1.4', title: 'Découverte du texte', type: 'discovery', isEnabled: true, duration: 15, isRequired: true },
      { id: '1.5', title: 'Exploration des contextes historiques', type: 'theory', isEnabled: true, duration: 20, isRequired: true },
      { id: '1.6', title: 'Analyse linguistique guidée', type: 'exercise', isEnabled: true, duration: 25, isRequired: false },
      { id: '1.7', title: 'Synthèse collaborative', type: 'exercise', isEnabled: true, duration: 20, isRequired: true },
      { id: '1.8', title: 'Évaluation formative', type: 'evaluation', isEnabled: true, duration: 30, isRequired: true },
      { id: '1.9', title: 'Préparation à la séance 2', type: 'discovery', isEnabled: true, duration: 10, isRequired: false }
    ]
  },
  {
    id: 2,
    name: "L'expression du passé par les temps de l'indicatif",
    screens: [
      { id: '2.1', title: 'Activation des connaissances', type: 'discovery', isEnabled: true, duration: 15, isRequired: true },
      { id: '2.2', title: 'Exploration ciblée', type: 'discovery', isEnabled: true, duration: 20, isRequired: true },
      { id: '2.3', title: 'Construction du savoir linguistique', type: 'theory', isEnabled: true, duration: 25, isRequired: true },
      { id: '2.4', title: "Exercices d'application", type: 'exercise', isEnabled: true, duration: 30, isRequired: true },
      { id: '2.5', title: 'Approfondissement stylistique', type: 'theory', isEnabled: true, duration: 20, isRequired: false },
      { id: '2.6', title: "Atelier d'écriture guidé", type: 'exercise', isEnabled: true, duration: 30, isRequired: true },
      { id: '2.7', title: 'Synthèse des savoirs', type: 'discovery', isEnabled: true, duration: 15, isRequired: true },
      { id: '2.8', title: 'Évaluation formative', type: 'evaluation', isEnabled: true, duration: 30, isRequired: true },
      { id: '2.9', title: 'Préparation à la séance 3', type: 'discovery', isEnabled: true, duration: 10, isRequired: false }
    ]
  }
];

const mockFeedbacks: Feedback[] = [
  {
    id: 'feedback1',
    studentId: 'student3',
    studentName: 'Léa Mercier',
    date: new Date('2025-05-19T14:30:00'),
    content: 'J\'ai remarqué que vous aviez des difficultés avec l\'analyse des temps verbaux. Essayez de vous concentrer sur les exercices 2.3 et 2.4 qui devraient vous aider à progresser sur ce point.',
    read: false,
    activityId: '2.3',
    activityName: 'Construction du savoir linguistique'
  },
  {
    id: 'feedback2',
    studentId: 'student2',
    studentName: 'Thomas Martin',
    date: new Date('2025-05-18T10:15:00'),
    content: 'Vous avez bien saisi les aspects historiques de la chanson, mais votre analyse stylistique pourrait être plus approfondie. Je vous recommande de revoir les notions vues dans l\'écran 1.6.',
    read: true,
    activityId: '1.6',
    activityName: 'Analyse linguistique guidée'
  }
];

const mockAnalytics: ClassAnalytics = {
  averageProgress: 49,
  sessionCompletionRates: [
    { sessionId: 1, name: "Découverte et compréhension globale de l'œuvre", rate: 70 },
    { sessionId: 2, name: "L'expression du passé par les temps de l'indicatif", rate: 35 },
    { sessionId: 3, name: "L'expression du possible et de l'hypothétique", rate: 15 },
    { sessionId: 4, name: "La phrase complexe et la communication artistique", rate: 0 }
  ],
  skillAverages: [
    { skillId: 'comprehension', name: 'Compréhension de texte', average: 67.6 },
    { skillId: 'grammar', name: 'Maîtrise grammaticale', average: 61.4 },
    { skillId: 'writing', name: 'Expression écrite', average: 62 },
    { skillId: 'analysis', name: 'Analyse littéraire', average: 58.4 }
  ],
  activityCompletionTimes: [
    { activityId: '1.3', name: 'Recueil des impressions', averageTime: 18 },
    { activityId: '1.8', name: 'Évaluation formative', averageTime: 35 },
    { activityId: '2.4', name: "Exercices d'application", averageTime: 28 }
  ]
};

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

const TeacherDashboard: React.FC = () => {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [sessions, setSessions] = useState<Session[]>(mockSessions);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>(mockFeedbacks);
  const [analytics, setAnalytics] = useState<ClassAnalytics>(mockAnalytics);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [newFeedback, setNewFeedback] = useState('');
  const [selectedSession, setSelectedSession] = useState<Session>(mockSessions[0]);

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSendFeedback = () => {
    if (selectedStudent && newFeedback.trim()) {
      const feedback: Feedback = {
        id: `feedback${feedbacks.length + 1}`,
        studentId: selectedStudent.id,
        studentName: selectedStudent.name,
        date: new Date(),
        content: newFeedback,
        read: false
      };
      setFeedbacks([feedback, ...feedbacks]);
      setNewFeedback('');
    }
  };

  const handleScreenToggle = (sessionId: number, screenId: string, enabled: boolean) => {
    setSessions(prevSessions => 
      prevSessions.map(session => 
        session.id === sessionId 
          ? {
              ...session,
              screens: session.screens.map(screen => 
                screen.id === screenId 
                  ? { ...screen, isEnabled: enabled } 
                  : screen
              )
            }
          : session
      )
    );
  };

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <div className="flex items-center gap-4 mb-4">
        <Button asChild variant="outline">
          <a href="/">Accueil</a>
        </Button>
        <h1 className="text-3xl font-bold">Module Enseignant - Né en 17 à Leidenstadt</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="bg-primary text-primary-foreground">
          <CardHeader>
            <CardTitle>Statistiques globales</CardTitle>
            <CardDescription>Vue d'ensemble des performances de la classe.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between">
                <span>Progression moyenne :</span>
                <span className="font-semibold">{analytics.averageProgress}%</span>
              </div>
              <div className="flex flex-col gap-2">
                {analytics.sessionCompletionRates.map(session => (
                  <div key={session.sessionId} className="flex justify-between">
                    <span>{session.name}</span>
                    <Progress value={session.rate} className="w-full max-w-[200px]" />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Voir le rapport complet
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Derniers retours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              {feedbacks.slice(0, 3).map(feedback => (
                <div key={feedback.id} className="p-4 border rounded-md">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{feedback.studentName}</span>
                    <span>{formatDate(feedback.date)}</span>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm">{feedback.content}</p>
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant={feedback.read ? 'default' : 'outline'} size="sm">
                      {feedback.read ? 'Lu' : 'Marquer comme lu'}
                    </Button>
                    <Button variant="outline" size="sm">
                      Répondre
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Élèves</CardTitle>
            <CardDescription>Liste des élèves et leur progression.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="flex gap-2">
                <Input 
                  placeholder="Rechercher un élève..." 
                  value={searchQuery} 
                  onChange={handleSearchChange} 
                  className="flex-1"
                />
                <Button>
                  <Search className="w-4 h-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {filteredStudents.length === 0 ? (
                  <p>Aucun élève trouvé.</p>
                ) : (
                  filteredStudents.map(student => (
                    <div key={student.id} className="p-4 border rounded-md flex flex-col gap-2">
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage src={student.avatar} alt={student.name} />
                          <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-semibold">{student.name}</h3>
                          <div className="flex gap-2 text-sm text-muted-foreground">
                            <span>Dernière connexion : {formatDate(student.lastConnection)}</span>
                            <span>Session actuelle : {student.currentSession}</span>
                          </div>
                        </div>
                        <Badge variant={student.alertLevel === 'high' ? 'destructive' : 'default'}>
                          {student.alertLevel === 'high' && <AlertTriangle className="w-4 h-4 mr-1" />}
                          {student.alertLevel === 'medium' && <AlertCircle className="w-4 h-4 mr-1" />}
                          {student.alertLevel === 'low' && <Info className="w-4 h-4 mr-1" />}
                          {student.alertLevel === 'none' && <CheckCircle className="w-4 h-4 mr-1" />}
                          {student.alertLevel.charAt(0).toUpperCase() + student.alertLevel.slice(1)}
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => {
                            setSelectedStudent(student);
                            setNewFeedback('');
                          }}
                        >
                          Donner un retour
                        </Button>
                        <Button variant="default" className="flex-1">
                          Voir le profil
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Tabs defaultValue="sessions" className="mb-6">
        <TabsList>
          <TabsTrigger value="sessions">Séances</TabsTrigger>
          <TabsTrigger value="analytics">Analytique</TabsTrigger>
        </TabsList>
        <TabsContent value="sessions">
          <div className="grid grid-cols-1 gap-4">
            {sessions.map(session => (
              <Card key={session.id}>
                <CardHeader>
                  <CardTitle>{session.name}</CardTitle>
                  <CardDescription>Gestion des écrans de la séance.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-4">
                    {session.screens.map(screen => (
                      <div key={screen.id} className="flex justify-between items-center p-4 border rounded-md">
                        <div className="flex-1">
                          <h4 className="font-semibold">{screen.title}</h4>
                          <div className="flex gap-2 text-sm text-muted-foreground">
                            <span>Type : {screen.type}</span>
                            <span>Durée : {screen.duration} min</span>
                            <span>{screen.isRequired ? 'Obligatoire' : 'Facultatif'}</span>
                          </div>
                        </div>
                        <Switch 
                          checked={screen.isEnabled} 
                          onCheckedChange={(enabled) => handleScreenToggle(session.id, screen.id, enabled)} 
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="analytics">
          <div className="grid grid-cols-1 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Analyse des compétences</CardTitle>
                <CardDescription>Performance moyenne par compétence.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4">
                  {analytics.skillAverages.map(skill => (
                    <div key={skill.skillId} className="flex justify-between p-4 border rounded-md">
                      <div className="flex-1">
                        <h4 className="font-semibold">{skill.name}</h4>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={skill.average} className="w-full max-w-[200px]" />
                        <span className="text-sm">{skill.average}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Temps de complétion des activités</CardTitle>
                <CardDescription>Temps moyen passé par activité.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4">
                  {analytics.activityCompletionTimes.map(activity => (
                    <div key={activity.activityId} className="flex justify-between p-4 border rounded-md">
                      <div className="flex-1">
                        <h4 className="font-semibold">{activity.name}</h4>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={activity.averageTime} className="w-full max-w-[200px]" />
                        <span className="text-sm">{activity.averageTime} min</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      <Dialog open={Boolean(selectedStudent)} onOpenChange={() => setSelectedStudent(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Retour à {selectedStudent?.name}</DialogTitle>
            <DialogDescription>
              Envoyer un retour à l'élève concernant sa progression.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Textarea 
              placeholder="Écrivez votre retour ici..." 
              value={newFeedback} 
              onChange={(e) => setNewFeedback(e.target.value)} 
              className="resize-none"
            />
            <div className="flex justify-end gap-2">
              <Button 
                variant="outline" 
                onClick={() => setSelectedStudent(null)}
              >
                Annuler
              </Button>
              <Button onClick={handleSendFeedback}>
                Envoyer le retour
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeacherDashboard;
