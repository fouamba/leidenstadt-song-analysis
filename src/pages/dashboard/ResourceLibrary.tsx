import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, BookOpen, Star, Clock, Search, X } from "lucide-react";
import { ResourceProvider, useResources, Resource } from "./ResourceProvider";
import { ResourceCard } from "./ResourceCard";
import { ResourceDetail } from "./ResourceDetail";
import { ResourceFilters } from "./ResourceFilters";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

// Composant principal d'emballage qui fournit le contexte
export default function ResourceLibraryWrapper() {
  return (
    <ResourceProvider>
      <ResourceLibraryMain />
    </ResourceProvider>
  );
}

// Composant principal qui contient la logique de la bibliothèque
function ResourceLibraryMain() {
  const { resources, favoriteResources, recentlyViewed, addToFavorites, removeFromFavorites, markAsViewed } = useResources();
  // Harmonisation des filtres
  const allTags = Array.from(new Set(resources.flatMap(r => r.tags)));
  const [filters, setFilters] = useState({
    types: [],
    tags: [],
    sortBy: 'date',
    searchTerm: '',
  });
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);
  const [currentTab, setCurrentTab] = useState<string>("all");

  // Fonction de filtrage harmonisée
  const getFilteredResources = (resourceList: Resource[]) => {
    let filtered = resourceList.filter((resource) => {
      // Recherche texte
      const matchesSearch =
        !filters.searchTerm ||
        resource.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(filters.searchTerm.toLowerCase());
      // Types
      const matchesType =
        filters.types.length === 0 || filters.types.includes(resource.type);
      // Tags
      const matchesTags =
        filters.tags.length === 0 || filters.tags.every(tag => resource.tags.includes(tag));
      return matchesSearch && matchesType && matchesTags;
    });
    // Tri
    if (filters.sortBy === 'title') {
      filtered = filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (filters.sortBy === 'date') {
      filtered = filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }
    return filtered;
  };

  const filteredResources = getFilteredResources(resources);
  const filteredFavorites = getFilteredResources(resources.filter(r => favoriteResources.includes(r.id)));
  const filteredRecentlyViewed = getFilteredResources(resources.filter(r => recentlyViewed.includes(r.id)));

  const handleResourceClick = (resource: Resource) => {
    setSelectedResource(resource);
    setIsDetailOpen(true);
    markAsViewed(resource.id);
  };

  return (
    <div className="container mx-auto py-6 px-4 max-w-7xl">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Bibliothèque de ressources</h1>
            <Link to="/" className="text-blue-600 hover:underline text-base font-medium">
              ← Retour à l'accueil
            </Link>
          </div>
          <p className="text-muted-foreground">
            Accédez aux documents complémentaires, au glossaire et aux fiches de synthèse pour enrichir votre apprentissage.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filtres */}
          <div className="w-full md:w-1/4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Filtres</CardTitle>
              </CardHeader>
              <CardContent>
                <ResourceFilters
                  searchTerm={filters.searchTerm}
                  setSearchTerm={val => setFilters(f => ({ ...f, searchTerm: val }))}
                  activeFilters={filters}
                  setActiveFilters={f => setFilters(old => ({ ...old, ...f }))}
                  availableTags={allTags}
                />
              </CardContent>
            </Card>
          </div>
          {/* Onglets */}
          <div className="w-full md:w-3/4">
            <Tabs defaultValue="all" value={currentTab} onValueChange={setCurrentTab} className="w-full">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="all" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span>Toutes les ressources</span>
                </TabsTrigger>
                <TabsTrigger value="favorites" className="flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  <span>Favoris</span>
                  {filteredFavorites.length > 0 && (
                    <Badge variant="secondary" className="ml-1">{filteredFavorites.length}</Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="recent" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>Consultés récemment</span>
                  {filteredRecentlyViewed.length > 0 && (
                    <Badge variant="secondary" className="ml-1">{filteredRecentlyViewed.length}</Badge>
                  )}
                </TabsTrigger>
              </TabsList>
              <TabsContent value="all">
                {filteredResources.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredResources.map((resource) => (
                      <ResourceCard
                        key={resource.id}
                        resource={resource}
                        isFavorite={favoriteResources.includes(resource.id)}
                        onCardClick={handleResourceClick}
                        onFavoriteToggle={() => {}}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-60 text-center">
                    <FileText className="h-16 w-16 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">Aucune ressource ne correspond à vos critères de recherche.</h3>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="favorites">
                {filteredFavorites.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredFavorites.map((resource) => (
                      <ResourceCard
                        key={resource.id}
                        resource={resource}
                        isFavorite={true}
                        onCardClick={handleResourceClick}
                        onFavoriteToggle={() => {}}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-60 text-center">
                    <FileText className="h-16 w-16 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">Aucun favori ne correspond à vos critères de recherche.</h3>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="recent">
                {filteredRecentlyViewed.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredRecentlyViewed.map((resource) => (
                      <ResourceCard
                        key={resource.id}
                        resource={resource}
                        isFavorite={favoriteResources.includes(resource.id)}
                        onCardClick={handleResourceClick}
                        onFavoriteToggle={() => {}}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-60 text-center">
                    <FileText className="h-16 w-16 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">Aucune ressource récente ne correspond à vos critères de recherche.</h3>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      {/* Modale de détail */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="sm:max-w-3xl max-h-screen overflow-hidden flex flex-col">
          {selectedResource && (
            <ResourceDetail
              resource={selectedResource}
              isFavorite={favoriteResources.includes(selectedResource.id)}
              onFavoriteToggle={() => {}}
              onClose={() => setIsDetailOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
