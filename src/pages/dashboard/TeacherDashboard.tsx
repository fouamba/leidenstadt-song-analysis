
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

// Types for student data
interface Student {
  id: string;
  name: string;
  email: string;
  progress: number;
  lastActive: string;
  avatar?: string;
}

// Mock data for students
const students: Student[] = [
  {
    id: "1",
    name: "Emma Dupont",
    email: "emma.d@example.com",
    progress: 78,
    lastActive: "Aujourd'hui",
    avatar: "https://i.pravatar.cc/150?img=1"
  },
  {
    id: "2",
    name: "Lucas Martin",
    email: "lucas.m@example.com",
    progress: 45,
    lastActive: "Hier",
    avatar: "https://i.pravatar.cc/150?img=2"
  },
  {
    id: "3",
    name: "Chloé Bernard",
    email: "chloe.b@example.com",
    progress: 92,
    lastActive: "Aujourd'hui",
    avatar: "https://i.pravatar.cc/150?img=3"
  },
  {
    id: "4",
    name: "Hugo Petit",
    email: "hugo.p@example.com",
    progress: 29,
    lastActive: "Il y a 3 jours",
    avatar: "https://i.pravatar.cc/150?img=4"
  },
  {
    id: "5",
    name: "Léa Dubois",
    email: "lea.d@example.com",
    progress: 65,
    lastActive: "Hier",
    avatar: "https://i.pravatar.cc/150?img=5"
  }
];

// Types for analytics data
interface AnalyticsData {
  category: string;
  value: number;
}

// Mock data for analytics
const progressStats: AnalyticsData[] = [
  { category: "0-25%", value: 5 },
  { category: "26-50%", value: 8 },
  { category: "51-75%", value: 12 },
  { category: "76-100%", value: 7 }
];

const activityStats: AnalyticsData[] = [
  { category: "Lundi", value: 28 },
  { category: "Mardi", value: 32 },
  { category: "Mercredi", value: 24 },
  { category: "Jeudi", value: 40 },
  { category: "Vendredi", value: 35 }
];

const TeacherDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("students");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b px-6 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img 
              src="/Renouveau-Pedagogique.png" 
              alt="Logo" 
              className="h-10 w-auto"
            />
            <h1 className="text-2xl font-bold">Tableau de bord enseignant</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Mail className="h-4 w-4 mr-1" /> Messages
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-1" /> Paramètres
            </Button>
            <Avatar>
              <AvatarImage src="https://i.pravatar.cc/150?img=12" alt="Enseignant" />
              <AvatarFallback>MV</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <div className="container mx-auto px-6 py-8 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-2">
                  <Button 
                    variant={activeTab === "students" ? "default" : "ghost"} 
                    className="w-full justify-start" 
                    onClick={() => setActiveTab("students")}
                  >
                    <Users className="h-4 w-4 mr-2" /> Élèves
                  </Button>
                  <Button 
                    variant={activeTab === "analytics" ? "default" : "ghost"} 
                    className="w-full justify-start" 
                    onClick={() => setActiveTab("analytics")}
                  >
                    <BarChart className="h-4 w-4 mr-2" /> Analytiques
                  </Button>
                  <Button 
                    variant={activeTab === "calendar" ? "default" : "ghost"} 
                    className="w-full justify-start" 
                    onClick={() => setActiveTab("calendar")}
                  >
                    <Calendar className="h-4 w-4 mr-2" /> Calendrier
                  </Button>
                  <Button 
                    variant={activeTab === "resources" ? "default" : "ghost"} 
                    className="w-full justify-start" 
                    onClick={() => setActiveTab("resources")}
                  >
                    <PieChart className="h-4 w-4 mr-2" /> Ressources
                  </Button>
                  <Button 
                    variant={activeTab === "messages" ? "default" : "ghost"} 
                    className="w-full justify-start" 
                    onClick={() => setActiveTab("messages")}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" /> Messages
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Séance en cours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold">Né en 17 à Leidenstadt</h3>
                    <p className="text-sm text-gray-500">Jean-Jacques Goldman</p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progression moyenne</span>
                      <span>62%</span>
                    </div>
                    <Progress value={62} className="h-2" />
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span>Date de début: 15/09/2023</span>
                    <span>28/32 élèves</span>
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    Voir détails
                  </Button>
                </div>
              </CardContent>
            </Card>
          </aside>
          
          {/* Main content area */}
          <main className="lg:col-span-3 space-y-6">
            
            {/* Students Tab */}
            {activeTab === "students" && (
              <div className="space-y-6">
                {/* Search and Filter */}
                <Card>
                  <CardContent className="p-4">
                    <div className="flex flex-wrap gap-4 items-center">
                      <div className="relative flex-grow">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                        <Input 
                          placeholder="Rechercher un élève..." 
                          className="pl-8" 
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                      <Select defaultValue="all">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Filtrer par classe" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Toutes les classes</SelectItem>
                          <SelectItem value="4eme">4ème</SelectItem>
                          <SelectItem value="3eme">3ème</SelectItem>
                          <SelectItem value="seconde">Seconde</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select defaultValue="progress">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Trier par" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="name">Nom</SelectItem>
                          <SelectItem value="progress">Progression</SelectItem>
                          <SelectItem value="activity">Activité récente</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Students List */}
                <Card>
                  <CardHeader>
                    <CardTitle>Liste des élèves</CardTitle>
                    <CardDescription>
                      {filteredStudents.length} élèves au total
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nom</TableHead>
                          <TableHead>Progression</TableHead>
                          <TableHead>Dernière activité</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredStudents.map((student) => (
                          <TableRow key={student.id}>
                            <TableCell className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={student.avatar} />
                                <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{student.name}</p>
                                <p className="text-sm text-gray-500">{student.email}</p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Progress value={student.progress} className="h-2 w-20" />
                                <span className="text-sm">{student.progress}%</span>
                              </div>
                            </TableCell>
                            <TableCell>{student.lastActive}</TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button variant="ghost" size="icon">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
                
                {/* Progress Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Compétences linguistiques</CardTitle>
                      <CardDescription>
                        Moyenne des performances sur les dernières évaluations
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span>Compréhension écrite</span>
                            <span>76%</span>
                          </div>
                          <Progress value={76} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span>Expression écrite</span>
                            <span>68%</span>
                          </div>
                          <Progress value={68} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span>Grammaire et vocabulaire</span>
                            <span>82%</span>
                          </div>
                          <Progress value={82} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span>Analyse littéraire</span>
                            <span>59%</span>
                          </div>
                          <Progress value={59} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Signalements à surveiller</CardTitle>
                      <CardDescription>
                        Élèves nécessitant une attention particulière
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-start space-x-4 p-3 bg-red-50 rounded-md">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src="https://i.pravatar.cc/150?img=4" />
                            <AvatarFallback>HP</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold">Hugo Petit</h4>
                            <p className="text-sm text-gray-600">Inactif depuis 3 jours</p>
                            <p className="text-sm text-gray-600">Progression : 29%</p>
                            <Button variant="outline" size="sm" className="mt-2">
                              Contacter
                            </Button>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-4 p-3 bg-yellow-50 rounded-md">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src="https://i.pravatar.cc/150?img=2" />
                            <AvatarFallback>LM</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold">Lucas Martin</h4>
                            <p className="text-sm text-gray-600">Difficulté avec le module 3</p>
                            <p className="text-sm text-gray-600">3 tentatives échouées</p>
                            <Button variant="outline" size="sm" className="mt-2">
                              Assigner des ressources supplémentaires
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
            
            {/* Analytics Tab */}
            {activeTab === "analytics" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Analytiques de performance</CardTitle>
                    <CardDescription>Vue d'ensemble de la progression des élèves</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="progress">
                      <TabsList className="mb-4">
                        <TabsTrigger value="progress">Progression</TabsTrigger>
                        <TabsTrigger value="activity">Activité</TabsTrigger>
                        <TabsTrigger value="competencies">Compétences</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="progress" className="space-y-4">
                        <div className="h-80 bg-slate-50 rounded-lg flex items-center justify-center">
                          [Graphique de progression - Représentation visuelle des données]
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          {progressStats.map((stat) => (
                            <Card key={stat.category}>
                              <CardContent className="p-4">
                                <div className="text-2xl font-bold">{stat.value}</div>
                                <div className="text-sm text-gray-500">{stat.category} de progression</div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="activity" className="space-y-4">
                        <div className="h-80 bg-slate-50 rounded-lg flex items-center justify-center">
                          [Graphique d'activité - Représentation visuelle des données]
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                          {activityStats.map((stat) => (
                            <Card key={stat.category}>
                              <CardContent className="p-4">
                                <div className="text-2xl font-bold">{stat.value}</div>
                                <div className="text-sm text-gray-500">{stat.category}</div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="competencies">
                        <div className="space-y-4">
                          <div className="h-80 bg-slate-50 rounded-lg flex items-center justify-center">
                            [Graphique de compétences - Représentation visuelle des données]
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <Card>
                              <CardContent className="p-4">
                                <div className="text-2xl font-bold">76%</div>
                                <div className="text-sm text-gray-500">Compréhension écrite</div>
                              </CardContent>
                            </Card>
                            <Card>
                              <CardContent className="p-4">
                                <div className="text-2xl font-bold">68%</div>
                                <div className="text-sm text-gray-500">Expression écrite</div>
                              </CardContent>
                            </Card>
                            <Card>
                              <CardContent className="p-4">
                                <div className="text-2xl font-bold">82%</div>
                                <div className="text-sm text-gray-500">Grammaire</div>
                              </CardContent>
                            </Card>
                            <Card>
                              <CardContent className="p-4">
                                <div className="text-2xl font-bold">59%</div>
                                <div className="text-sm text-gray-500">Analyse</div>
                              </CardContent>
                            </Card>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Rapport détaillé</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold mb-2">Temps moyen passé par séquence</h3>
                        <div className="space-y-2">
                          <div>
                            <div className="flex justify-between mb-1">
                              <span>Séquence 1 - Découverte du texte</span>
                              <span>18 min</span>
                            </div>
                            <Progress value={70} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span>Séquence 2 - Analyse des temps verbaux</span>
                              <span>24 min</span>
                            </div>
                            <Progress value={90} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span>Séquence 3 - Contexte historique</span>
                              <span>15 min</span>
                            </div>
                            <Progress value={60} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span>Séquence 4 - Quiz final</span>
                              <span>12 min</span>
                            </div>
                            <Progress value={50} className="h-2" />
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold mb-2">Taux de réussite par activité</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <Card>
                            <CardContent className="p-4">
                              <div className="text-3xl font-bold text-green-600">85%</div>
                              <div className="text-sm">Compréhension de texte</div>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardContent className="p-4">
                              <div className="text-3xl font-bold text-yellow-600">62%</div>
                              <div className="text-sm">Analyse linguistique</div>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardContent className="p-4">
                              <div className="text-3xl font-bold text-blue-600">78%</div>
                              <div className="text-sm">Quiz contextuel</div>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            
            {/* Calendar Tab - Placeholder */}
            {activeTab === "calendar" && (
              <Card>
                <CardHeader>
                  <CardTitle>Calendrier des cours</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-96 bg-slate-50 rounded-md flex items-center justify-center">
                    [Contenu du calendrier]
                  </div>
                </CardContent>
              </Card>
            )}
            
            {/* Resources Tab - Placeholder */}
            {activeTab === "resources" && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Ressources pédagogiques</CardTitle>
                    <CardDescription>Gérez et partagez vos ressources avec les élèves</CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>Ajouter une ressource</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Ajouter une nouvelle ressource</DialogTitle>
                        <DialogDescription>
                          Créez une nouvelle ressource à partager avec vos élèves.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div>
                          <Label htmlFor="title">Titre</Label>
                          <Input id="title" />
                        </div>
                        <div>
                          <Label htmlFor="type">Type de ressource</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner un type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="document">Document PDF</SelectItem>
                              <SelectItem value="video">Vidéo</SelectItem>
                              <SelectItem value="quiz">Quiz</SelectItem>
                              <SelectItem value="assignment">Devoir</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="description">Description</Label>
                          <Textarea id="description" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Enregistrer</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Analyse du poème</CardTitle>
                        <CardDescription>Document PDF</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-500">Guide d'analyse détaillée des figures de style et du contexte historique.</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge>Français</Badge>
                          <Badge variant="outline">3ème</Badge>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline" size="sm">Aperçu</Button>
                        <Button size="sm">Partager</Button>
                      </CardFooter>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Vidéo explicative</CardTitle>
                        <CardDescription>Ressource vidéo</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-500">Explication des temps verbaux utilisés dans le poème de Jean-Jacques Goldman.</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge>Grammaire</Badge>
                          <Badge variant="outline">4ème-3ème</Badge>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline" size="sm">Aperçu</Button>
                        <Button size="sm">Partager</Button>
                      </CardFooter>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Quiz interactif</CardTitle>
                        <CardDescription>Évaluation</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-500">Quiz pour tester la compréhension des élèves sur les thèmes abordés.</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge>Évaluation</Badge>
                          <Badge variant="outline">3ème</Badge>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline" size="sm">Aperçu</Button>
                        <Button size="sm">Partager</Button>
                      </CardFooter>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {/* Messages Tab - Placeholder */}
            {activeTab === "messages" && (
              <Card>
                <CardHeader>
                  <CardTitle>Centre de messages</CardTitle>
                  <CardDescription>Communiquez avec vos élèves</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-96 bg-slate-50 rounded-md flex items-center justify-center">
                    [Contenu des messages]
                  </div>
                </CardContent>
              </Card>
            )}
          </main>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="border-t bg-white py-4">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">© 2023 CEREDIS - Plateforme pédagogique</p>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">Aide</Button>
              <Button variant="ghost" size="sm">Conditions d'utilisation</Button>
              <Button variant="ghost" size="sm">Confidentialité</Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TeacherDashboard;
