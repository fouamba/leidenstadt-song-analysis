
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BadgeCheck, FileText, BookOpen, Play, Info, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { YouTubePlayer } from "../components/multimedia/YouTubePlayer";
import { useProgress } from "../contexts/ProgressContext";
import { useCompetence } from "../contexts/CompetenceContext";
import { ProgressBar } from "../components/ui/ProgressBar";
import { Badge as UIBadge } from "@/components/ui/badge";  // Import shadcn Badge with alias
import { Badge } from "@/components/ui/Badge";  // Import the custom Badge component with its original name
import { seances } from "../data/seances";

const HomePage: React.FC = () => {
  const { getSeanceProgress } = useProgress();
  const { badges, competences } = useCompetence();
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            "Né en 17 à Leidenstadt"
          </h1>
          <p className="text-lg text-slate-600 mb-6">
            Environnement d'Apprentissage Interactif
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link to="/seance/1">
              <Button className="w-full md:w-auto">
                <Play className="mr-2 h-4 w-4" />
                Commencer l'apprentissage
              </Button>
            </Link>
            <Link to="/contexte-historique">
              <Button variant="outline" className="w-full md:w-auto">
                <Info className="mr-2 h-4 w-4" />
                Contexte historique
              </Button>
            </Link>
            <Link to="/paroles">
              <Button variant="outline" className="w-full md:w-auto">
                <FileText className="mr-2 h-4 w-4" />
                Paroles complètes
              </Button>
            </Link>
          </div>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="mr-2 h-5 w-5" /> Présentation de la séquence
            </CardTitle>
            <CardDescription>
              Découvrez cette séquence pédagogique autour de la chanson de Jean-Jacques Goldman
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600 mb-4">
              Cette séquence pédagogique, structurée en 4 séances de 2 heures chacune, 
              vous propose un apprentissage progressif de l'analyse de texte à travers 
              la chanson "Né en 17 à Leidenstadt" de Jean-Jacques Goldman.
            </p>

            {!showVideo ? (
              <div 
                className="relative aspect-video bg-slate-100 rounded-lg flex items-center justify-center cursor-pointer group overflow-hidden"
                onClick={() => setShowVideo(true)}
              >
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("https://img.youtube.com/vi/ttw1KeiF9mA/maxresdefault.jpg")' }}></div>
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors"></div>
                <Button className="relative z-10" variant="secondary">
                  <Play className="mr-2 h-4 w-4" />
                  Regarder la vidéo
                </Button>
              </div>
            ) : (
              <YouTubePlayer videoId="ttw1KeiF9mA" className="rounded-lg overflow-hidden" />
            )}

            <h3 className="font-semibold mt-6 mb-2">Objectif principal:</h3>
            <p className="text-slate-600 mb-4">
              Analyser un texte de chanson à portée historique et philosophique en identifiant 
              les procédés linguistiques qui véhiculent son message et en interprétant les 
              valeurs exprimées, pour en produire un commentaire personnel argumenté.
            </p>

            <div className="mt-4">
              <h3 className="font-semibold mb-3">Programme des séances:</h3>
              <div className="space-y-3">
                {seances.map((seance) => {
                  const progress = getSeanceProgress(seance.id);
                  
                  return (
                    <div key={seance.id} className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-slate-500" />
                          <h4 className="font-medium">
                            Séance {seance.id}: {seance.title}
                          </h4>
                        </div>
                        <span className="text-xs text-slate-500">{seance.duration}</span>
                      </div>
                      
                      <ProgressBar progress={progress} className="mt-2" />
                      
                      <div className="mt-3">
                        <Link to={`/seance/${seance.id}`}>
                          <Button 
                            variant={progress > 0 ? "default" : "outline"} 
                            size="sm" 
                            className="w-full sm:w-auto"
                          >
                            {progress > 0 ? "Continuer" : "Commencer"}
                          </Button>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BadgeCheck className="mr-2 h-5 w-5" /> Vos badges
              </CardTitle>
              <CardDescription>Suivez votre progression avec les badges obtenus</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {badges.slice(0, 3).map((badge) => (
                  <Badge key={badge.id} badge={badge} />
                ))}
                
                {badges.filter(b => b.unlocked).length === 0 && (
                  <p className="text-sm text-slate-500 italic">
                    Aucun badge débloqué pour le moment. Commencez les séances pour gagner des badges!
                  </p>
                )}
                
                <Button variant="link" className="w-full mt-2">
                  Voir tous les badges
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="mr-2 h-5 w-5" /> Compétences
              </CardTitle>
              <CardDescription>Progression de vos compétences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {competences.map((comp) => (
                  <div key={comp.id} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{comp.name}</span>
                      <span className="font-medium">{comp.level}</span>
                    </div>
                    <ProgressBar progress={comp.progress} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
