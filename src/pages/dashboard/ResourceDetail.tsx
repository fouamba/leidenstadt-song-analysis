
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { FileText, Book, BookOpen, Download, Star, StarOff, X, ExternalLink, Share2 } from "lucide-react";
import { Resource } from './ResourceProvider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface ResourceDetailProps {
  resource: Resource | null;
  isFavorite: boolean;
  onFavoriteToggle: () => void;
  onClose: () => void;
}

export const ResourceDetail: React.FC<ResourceDetailProps> = ({ resource, isFavorite, onFavoriteToggle, onClose }) => {
  if (!resource) return null;
  
  // Déterminer l'icône pour chaque type de ressource
  const getResourceIcon = (type: string) => {
    switch (type) {
      case "document":
        return <FileText className="h-6 w-6 text-blue-500" />;
      case "glossary":
        return <Book className="h-6 w-6 text-green-500" />;
      case "summary":
        return <BookOpen className="h-6 w-6 text-purple-500" />;
      default:
        return <FileText className="h-6 w-6" />;
    }
  };

  const getResourceTypeLabel = (type: string) => {
    switch (type) {
      case "document":
        return "Document complémentaire";
      case "glossary":
        return "Glossaire";
      case "summary":
        return "Fiche de synthèse";
      default:
        return type;
    }
  };

  // Télécharger la ressource si un URL de fichier est disponible
  const downloadResource = () => {
    if (resource.fileUrl) {
      console.log(`Téléchargement de la ressource: ${resource.fileUrl}`);
      window.open(resource.fileUrl, '_blank');
    }
  };

  // Partager la ressource (simulé)
  const shareResource = () => {
    const shareText = `Ressource pédagogique: ${resource.title}`;
    if (navigator.share) {
      navigator.share({
        title: resource.title,
        text: shareText,
        url: window.location.href
      }).catch(err => {
        console.log('Erreur lors du partage:', err);
      });
    } else {
      // Fallback si l'API Web Share n'est pas disponible
      console.log('Partage de la ressource (simulé):', shareText);
      alert('Fonctionnalité de partage non disponible dans votre navigateur');
    }
  };

  // Simuler l'ajout de notes personnelles
  const [notes, setNotes] = React.useState('');

  return (
    <>
      <DialogHeader className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          {getResourceIcon(resource.type)}
          <div>
            <DialogTitle className="text-xl">{resource.title}</DialogTitle>
            <DialogDescription>
              {getResourceTypeLabel(resource.type)} • {resource.createdAt.toLocaleDateString()}
            </DialogDescription>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onFavoriteToggle}
            title={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
          >
            {isFavorite ? 
              <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" /> :
              <StarOff className="h-5 w-5 text-gray-400" />
            }
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      </DialogHeader>
      
      <div className="flex flex-wrap gap-1 mb-4">
        {resource.tags.map((tag, index) => (
          <Badge key={index} variant="outline">
            {tag}
          </Badge>
        ))}
      </div>
      
      <Tabs defaultValue="content" className="flex-1 flex flex-col">
        <TabsList>
          <TabsTrigger value="content">Contenu</TabsTrigger>
          <TabsTrigger value="notes">Mes notes</TabsTrigger>
          {resource.type === "document" && (
            <TabsTrigger value="related">Ressources liées</TabsTrigger>
          )}
        </TabsList>
        
        <TabsContent value="content" className="flex-1 flex flex-col mt-4">
          <ScrollArea className="flex-1 border rounded-md p-4 bg-gray-50">
            <div className="prose max-w-none">
              {resource.content.split('\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="notes" className="flex-1 flex flex-col mt-4">
          <div className="mb-2">
            <p className="text-sm text-gray-500">Prenez des notes personnelles sur cette ressource</p>
          </div>
          <textarea
            className="flex-1 p-3 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Écrivez vos notes ici..."
          />
        </TabsContent>
        
        {resource.type === "document" && (
          <TabsContent value="related" className="flex-1 mt-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="border rounded-md p-4">
                <h3 className="text-lg font-medium mb-2">Ressources suggérées</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Book className="h-4 w-4 text-green-500" />
                    <span className="text-blue-600 hover:underline cursor-pointer">Glossaire associé</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-purple-500" />
                    <span className="text-blue-600 hover:underline cursor-pointer">Fiche de synthèse recommandée</span>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>
        )}
      </Tabs>
      
      <DialogFooter className="gap-2 mt-4">
        <div className="flex items-center gap-2 mr-auto">
          <Button 
            variant="outline" 
            size="sm"
            onClick={shareResource}
          >
            <Share2 className="h-4 w-4 mr-1" />
            Partager
          </Button>
          {resource.fileUrl && (
            <Button 
              variant="outline"
              size="sm"
              onClick={downloadResource}
            >
              <Download className="h-4 w-4 mr-1" />
              Télécharger
            </Button>
          )}
        </div>
        <Button 
          variant="default"
          onClick={onClose}
        >
          Fermer
        </Button>
      </DialogFooter>
    </>
  );
};
