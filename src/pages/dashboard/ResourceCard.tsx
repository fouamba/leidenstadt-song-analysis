
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Book, BookOpen, Download, Star, StarOff } from "lucide-react";
import { Resource, useResources } from './ResourceProvider';

export interface ResourceCardProps {
  resource: Resource;
  isFavorite: boolean;
  onCardClick: (resource: Resource) => void;
  onFavoriteToggle: () => void;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({ resource, onCardClick, isFavorite, onFavoriteToggle }) => {
  const { markAsViewed } = useResources();

  // Déterminer l'icône et le style pour chaque type de ressource
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

  const handleOpenResource = () => {
    markAsViewed(resource.id);
    onCardClick(resource);
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation(); // Empêcher l'ouverture du détail
    if (resource.fileUrl) {
      // Logique de téléchargement (dans une application réelle, cela serait plus élaboré)
      console.log(`Téléchargement de la ressource: ${resource.fileUrl}`);
      window.open(resource.fileUrl, '_blank');
    }
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFavoriteToggle();
  };

  return (
    <Card 
      className="hover:shadow-md transition-shadow duration-200 cursor-pointer"
      onClick={handleOpenResource}
    >
      <CardHeader className="flex flex-row items-start justify-between pb-2">
        <div className="flex items-start gap-3">
          {getResourceIcon(resource.type)}
          <div>
            <CardTitle className="text-lg">{resource.title}</CardTitle>
            <CardDescription>{getResourceTypeLabel(resource.type)}</CardDescription>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 -mt-1 -mr-2"
          onClick={handleToggleFavorite}
        >
          {isFavorite ? 
            <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" /> :
            <StarOff className="h-5 w-5 text-gray-400" />
          }
        </Button>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
          {resource.description}
        </p>
        <div className="flex flex-wrap gap-1 mt-2">
          {resource.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {resource.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{resource.tags.length - 3}
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={handleOpenResource}
        >
          Consulter
        </Button>
        {resource.fileUrl && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleDownload}
          >
            <Download className="h-4 w-4 mr-1" />
            Télécharger
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
