import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Types pour les ressources
export interface Resource {
  id: string;
  title: string;
  description: string;
  type: "document" | "glossary" | "summary";
  tags: string[];
  content: string;
  createdAt: Date;
  fileUrl?: string;
}

// Interface du contexte
interface ResourceContextType {
  resources: Resource[];
  addResource: (resource: Omit<Resource, 'id' | 'createdAt'>) => void;
  removeResource: (id: string) => void;
  favoriteResources: string[];
  toggleFavorite: (id: string) => void;
  recentlyViewed: string[];
  markAsViewed: (id: string) => void;
}

// Données d'exemple pour les ressources
const initialResources: Resource[] = [
  // Documents complémentaires
  {
    id: "doc-1",
    title: "Contexte historique : L'Allemagne en 1917",
    description: "Document détaillant la situation politique et sociale de l'Allemagne à l'époque mentionnée dans la chanson.",
    type: "document",
    tags: ["histoire", "allemagne", "première guerre mondiale"],
    content: "Contenu détaillé sur l'Allemagne en 1917...",
    createdAt: new Date("2025-01-15"),
    fileUrl: "/resources/allemagne-1917.pdf"
  },
  {
    id: "doc-2",
    title: "Le conflit nord-irlandais",
    description: "Aperçu historique des tensions à Belfast évoquées dans la chanson.",
    type: "document",
    tags: ["histoire", "irlande", "conflit"],
    content: "Présentation du conflit nord-irlandais...",
    createdAt: new Date("2025-01-20"),
    fileUrl: "/resources/conflit-irlandais.pdf"
  },
  {
    id: "doc-3",
    title: "L'apartheid en Afrique du Sud",
    description: "Étude du système d'apartheid à Johannesburg mentionné dans la chanson.",
    type: "document",
    tags: ["histoire", "afrique du sud", "apartheid"],
    content: "Analyse détaillée de l'apartheid...",
    createdAt: new Date("2025-01-25"),
    fileUrl: "/resources/apartheid.pdf"
  },
  // Glossaire
  {
    id: "gloss-1",
    title: "Imparfait",
    description: "Temps verbal de l'indicatif exprimant une action passée inachevée.",
    type: "glossary",
    tags: ["grammaire", "temps", "indicatif"],
    content: "L'imparfait est un temps du passé de l'indicatif qui exprime une action ou un état en cours dans le passé, sans précision sur son début ou sa fin. Il est souvent utilisé pour décrire le contexte, les habitudes passées ou les actions en cours.",
    createdAt: new Date("2025-02-05")
  },
  {
    id: "gloss-2",
    title: "Plus-que-parfait",
    description: "Temps verbal de l'indicatif exprimant une action antérieure à une autre action passée.",
    type: "glossary",
    tags: ["grammaire", "temps", "indicatif"],
    content: "Le plus-que-parfait est un temps composé de l'indicatif qui exprime une action qui s'est déroulée avant une autre action passée. Il se forme avec l'auxiliaire être ou avoir à l'imparfait suivi du participe passé du verbe.",
    createdAt: new Date("2025-02-10")
  },
  {
    id: "gloss-3",
    title: "Conditionnel",
    description: "Mode verbal exprimant une action soumise à une condition ou une hypothèse.",
    type: "glossary",
    tags: ["grammaire", "mode"],
    content: "Le conditionnel est un mode verbal qui exprime une action dont la réalisation dépend d'une condition. Il peut exprimer l'éventualité, le souhait, l'hypothèse, la politesse ou rapporter une information incertaine.",
    createdAt: new Date("2025-02-15")
  },
  // Fiches de synthèse
  {
    id: "summ-1",
    title: "L'expression du passé par les temps de l'indicatif",
    description: "Synthèse des valeurs et emplois des temps du passé.",
    type: "summary",
    tags: ["grammaire", "temps", "indicatif"],
    content: "Cette fiche résume les différentes valeurs des temps du passé de l'indicatif analysés dans la chanson 'Né en 17 à Leidenstadt'...",
    createdAt: new Date("2025-03-05"),
    fileUrl: "/resources/synthese-temps-passe.pdf"
  },
  {
    id: "summ-2",
    title: "L'expression du possible et de l'hypothétique",
    description: "Synthèse sur l'utilisation du conditionnel dans différents contextes.",
    type: "summary",
    tags: ["grammaire", "mode", "conditionnel"],
    content: "Cette fiche présente les différentes valeurs du conditionnel et son emploi pour exprimer l'hypothèse...",
    createdAt: new Date("2025-03-10"),
    fileUrl: "/resources/synthese-conditionnel.pdf"
  },
  {
    id: "summ-3",
    title: "Analyse thématique de 'Né en 17 à Leidenstadt'",
    description: "Synthèse des principaux thèmes abordés dans la chanson.",
    type: "summary",
    tags: ["analyse", "thèmes", "chanson"],
    content: "Cette fiche résume les principaux thèmes de la chanson : déterminisme historique, liberté individuelle...",
    createdAt: new Date("2025-03-15"),
    fileUrl: "/resources/synthese-thematique.pdf"
  }
];

// Création du contexte
const ResourceContext = createContext<ResourceContextType | undefined>(undefined);

// Hook personnalisé pour utiliser le contexte
export const useResources = () => {
  const context = useContext(ResourceContext);
  if (context === undefined) {
    throw new Error('useResources doit être utilisé à l\'intérieur d\'un ResourceProvider');
  }
  return context;
};

// Props du provider
interface ResourceProviderProps {
  children: ReactNode;
}

// Provider component
export const ResourceProvider: React.FC<ResourceProviderProps> = ({ children }) => {
  const [resources, setResources] = useState<Resource[]>(initialResources);
  const [favoriteResources, setFavoriteResources] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('resource_favorites') || '[]');
    } catch {
      return [];
    }
  });
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('resource_recentlyViewed') || '[]');
    } catch {
      return [];
    }
  });

  // Persistance locale : sauvegarde
  useEffect(() => {
    localStorage.setItem('resource_favorites', JSON.stringify(favoriteResources));
  }, [favoriteResources]);
  useEffect(() => {
    localStorage.setItem('resource_recentlyViewed', JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  // Ajouter une ressource
  const addResource = (resource: Omit<Resource, 'id' | 'createdAt'>) => {
    const newResource: Resource = {
      ...resource,
      id: `res-${Date.now()}`, // Génère un ID unique basé sur le timestamp
      createdAt: new Date()
    };
    setResources(prev => [...prev, newResource]);
  };

  // Supprimer une ressource
  const removeResource = (id: string) => {
    setResources(prev => prev.filter(resource => resource.id !== id));
    // Supprimer également des favoris et vues récentes si nécessaire
    setFavoriteResources(prev => prev.filter(resId => resId !== id));
    setRecentlyViewed(prev => prev.filter(resId => resId !== id));
  };

  // Ajouter/retirer des favoris
  const toggleFavorite = (id: string) => {
    setFavoriteResources(prev => 
      prev.includes(id)
        ? prev.filter(resId => resId !== id)
        : [...prev, id]
    );
  };

  // Marquer comme vu récemment (et gérer l'ordre)
  const markAsViewed = (id: string) => {
    setRecentlyViewed(prev => {
      // Supprimer l'ID s'il existe déjà
      const filtered = prev.filter(resId => resId !== id);
      // Ajouter l'ID au début (le plus récent)
      return [id, ...filtered].slice(0, 10); // Limite à 10 éléments
    });
  };

  // Valeur du contexte
  const value = {
    resources,
    addResource,
    removeResource,
    favoriteResources,
    toggleFavorite,
    recentlyViewed,
    markAsViewed
  };

  return (
    <ResourceContext.Provider value={value}>
      {children}
    </ResourceContext.Provider>
  );
};

export default ResourceProvider;
