import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  BarChart2, 
  Clock, 
  Award, 
  MessageSquare, 
  BookMarked,
  ChevronRight
} from "lucide-react";
import VoiceInstruction from "@/components/audio/VoiceInstruction"; // Assurez-vous que le chemin est correct

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  
  // Mock data for sessions progress
  const sessions = [
    { 
      id: 1, 
      title: "Découverte et compréhension globale de l'œuvre", 
      status: "completed", 
      progress: 100,
      duration: "45 minutes" 
    },
    { 
      id: 2, 
      title: "L'expression du passé par les temps de l'indicatif", 
      status: "in-progress", 
      progress: 30,
      duration: "50 minutes" 
    },
    { 
      id: 3, 
      title: "L'expression du possible et de l'hypothétique avec le mode conditionnel", 
      status: "locked", 
      progress: 0,
      duration: "55 minutes" 
    },
    { 
      id: 4, 
      title: "La phrase complexe et la communication artistique", 
      status: "locked", 
      progress: 0,
      duration: "60 minutes" 
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <img 
              src="/ceredis.png" // Correction: favicon par défaut ou adapte le chemin si besoin
              alt="CEREDIS Logo" 
              className="h-12 w-auto" 
              style={{ objectFit: 'contain' }}
            />
          </div>
          <nav className="flex items-center gap-6">
            <Button variant="ghost" onClick={() => navigate("/")}>Accueil</Button>
            <Button variant="ghost" onClick={() => navigate("/seance1")}>Séance 1</Button>
            <Button variant="ghost" onClick={() => navigate("/dashboard")}>Tableau de bord</Button>
            <Button variant="ghost" onClick={() => navigate("/resources")}>Ressources</Button>
            <Button variant="ghost" onClick={() => navigate("/aide")}>Aide</Button>
            <Button variant="outline" onClick={() => navigate("/login")}>Connexion</Button>
          </nav>
        </div>
      </header>

      {/* Hero section */}
      <section className="relative h-64 overflow-hidden bg-black">
        <img
          src="/leidenstadt_accueil.jpg"
          alt="Jean-Jacques Goldman - Né en 17 à Leidenstadt"
          className="absolute inset-0 w-full h-full object-cover opacity-70"
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-blue-700/30"></div>
        <div className="container relative h-full flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Né en 17 à Leidenstadt
          </h1>
          <p className="text-xl text-white/90 max-w-2xl">
            Une séquence pédagogique interactive pour explorer l'œuvre de Jean-Jacques Goldman
          </p>
        </div>
      </section>

      {/* Main content */}
      <main className="container py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column */}
        <div className="col-span-2 space-y-6">
          {/* Introduction */}
          <Card>
            <CardHeader>
              <CardTitle>Présentation de la séquence</CardTitle>
              <CardDescription>
                Découvrez une approche pédagogique innovante
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-xl bg-blue-50 border border-blue-200 px-4 py-3 flex-1 text-slate-800 text-base shadow-sm">
                    Cette séquence pédagogique structurée en 4 sessions explore l'œuvre "Né en 17 à Leidenstadt" de Jean-Jacques Goldman, une chanson qui aborde des thématiques universelles et permet d'approfondir vos connaissances linguistiques et historiques.
                  </div>
                  <div className="mt-1">
                    {/* Bouton audio synthèse vocale */}
                    <VoiceInstruction text="Cette séquence pédagogique structurée en 4 sessions explore l'œuvre Né en 17 à Leidenstadt de Jean-Jacques Goldman, une chanson qui aborde des thématiques universelles et permet d'approfondir vos connaissances linguistiques et historiques." />
                  </div>
                </div>
                <div className="aspect-video rounded-md overflow-hidden bg-gray-100 relative">
                  <video
                    src="/Comprendre la chanson _Né en 17 à Leidenstadt_.mp4"
                    controls
                    className="w-full h-full object-cover"
                    poster="/leidenstadt_accueil.jpg"
                  >
                    Votre navigateur ne supporte pas la lecture vidéo.
                  </video>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Objectif principal */}
          <Card>
            <CardHeader>
              <CardTitle>Objectif principal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-blue-50 border border-blue-200 px-4 py-3 flex-1 text-slate-800 text-base shadow-sm">
                  Analyser un extrait d'œuvre poétique/littéraire à l'aide d'outils linguistiques et développer les procédés linguistiques qui accompagnent la notion d'engagement, pour en percevoir les composantes principales.
                </div>
                <div className="mt-1">
                  <VoiceInstruction text="Analyser un extrait d'œuvre poétique ou littéraire à l'aide d'outils linguistiques et développer les procédés linguistiques qui accompagnent la notion d'engagement, pour en percevoir les composantes principales." />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sessions list */}
          <Card>
            <CardHeader>
              <CardTitle>Programme des séances</CardTitle>
              <CardDescription>
                Progression séquentielle avec déblocage au fur et à mesure
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {sessions.map((session) => (
                <div key={session.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center">
                      <Badge 
                        variant={
                          session.status === "completed" ? "default" : 
                          session.status === "in-progress" ? "secondary" : "outline"
                        }
                        className="mr-3"
                      >
                        {session.status === "completed" ? "Terminé" : 
                         session.status === "in-progress" ? "En cours" : "Verrouillé"}
                      </Badge>
                      <span className="font-medium">Séance {session.id}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock size={16} />
                      <span>{session.duration}</span>
                    </div>
                  </div>
                  <h3 className="font-medium text-lg mb-2">{session.title}</h3>
                  <Progress value={session.progress} className="h-2 mb-3" />
                  <div className="flex justify-end">
                    <Button 
                      variant={session.status === "locked" ? "outline" : "default"} 
                      size="sm"
                      disabled={session.status === "locked"}
                      onClick={() => {
                        if(session.id === 1) navigate("/seance1");
                        else navigate(`/session/${session.id}`);
                      }}
                      className="gap-1"
                    >
                      {session.status === "completed" ? "Revoir" : 
                       session.status === "in-progress" ? "Continuer" : "Commencer"}
                      <ChevronRight size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right sidebar */}
        <div className="space-y-6">
          {/* Student dashboard */}
          <Card>
            <CardHeader>
              <CardTitle>Tableau de bord</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">Progression globale</div>
                <div className="font-medium">32%</div>
              </div>
              <Progress value={32} className="h-2" />
              
              <div className="pt-4 space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <BarChart2 size={16} className="text-blue-500" />
                    <span>Activités complétées</span>
                  </div>
                  <span className="font-medium">7/22</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Award size={16} className="text-amber-500" />
                    <span>Badges débloqués</span>
                  </div>
                  <span className="font-medium">1/4</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => navigate("/dashboard")}>Voir mon tableau de bord complet</Button>
            </CardFooter>
          </Card>

          {/* Resources */}
          <Card>
            <CardHeader>
              <CardTitle>Bibliothèque de ressources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start gap-2">
                <BookMarked size={16} />
                Paroles de la chanson
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <BookMarked size={16} />
                Contexte historique
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <BookMarked size={16} />
                Glossaire linguistique
              </Button>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full" onClick={() => navigate("/resources")}>Explorer toutes les ressources</Button>
            </CardFooter>
          </Card>

          {/* Forum */}
          <Card>
            <CardHeader>
              <CardTitle>Forum de discussion</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-4">
                <MessageSquare size={32} className="mx-auto mb-2 text-gray-400" />
                <p className="text-gray-500 mb-4">
                  Échangez avec les autres élèves et posez vos questions
                </p>
                <Button onClick={() => navigate("/forum")}>Accéder au forum</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t py-6 bg-gray-50">
        <div className="container">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <img src="/Renouveau-Pedagogique.png" alt="Renouveau Pédagogique Logo" className="h-8" />
              <span className="text-sm text-gray-500">© 2025 CEREDIS - L'éducation à l'ère du numérique</span>
            </div>
            <div className="flex gap-4">
              <Button variant="ghost" size="sm">Mentions légales</Button>
              <Button variant="ghost" size="sm">Politique de confidentialité</Button>
              <Button variant="ghost" size="sm">Contact</Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
