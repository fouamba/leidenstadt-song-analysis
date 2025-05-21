import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, X, Tag, Filter } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

// Type pour les filtres disponibles
interface ResourceFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  activeFilters: {
    types: string[];
    tags: string[];
    sortBy: 'date' | 'title' | 'relevance';
  };
  setActiveFilters: (filters: {
    types: string[];
    tags: string[];
    sortBy: 'date' | 'title' | 'relevance';
  }) => void;
  availableTags: string[];
}

export const ResourceFilters: React.FC<ResourceFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  activeFilters,
  setActiveFilters,
  availableTags
}) => {
  // Gérer le changement de recherche
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Gérer le changement de type de ressource
  const handleTypeToggle = (type: string) => {
    const updatedTypes = activeFilters.types.includes(type)
      ? activeFilters.types.filter(t => t !== type)
      : [...activeFilters.types, type];
    
    setActiveFilters({
      ...activeFilters,
      types: updatedTypes
    });
  };

  // Gérer le changement de tag
  const handleTagToggle = (tag: string) => {
    const updatedTags = activeFilters.tags.includes(tag)
      ? activeFilters.tags.filter(t => t !== tag)
      : [...activeFilters.tags, tag];
    
    setActiveFilters({
      ...activeFilters,
      tags: updatedTags
    });
  };

  // Gérer le changement de tri
  const handleSortChange = (value: string) => {
    setActiveFilters({
      ...activeFilters,
      sortBy: value as 'date' | 'title' | 'relevance'
    });
  };

  // Effacer tous les filtres
  const clearAllFilters = () => {
    setActiveFilters({
      types: [],
      tags: [],
      sortBy: 'date'
    });
    setSearchTerm('');
  };

  // Retirer un tag spécifique
  const removeTag = (tag: string) => {
    setActiveFilters({
      ...activeFilters,
      tags: activeFilters.tags.filter(t => t !== tag)
    });
  };

  // Retirer un type spécifique
  const removeType = (type: string) => {
    setActiveFilters({
      ...activeFilters,
      types: activeFilters.types.filter(t => t !== type)
    });
  };

  // Calculer si des filtres sont actifs
  const hasActiveFilters = activeFilters.types.length > 0 || 
                          activeFilters.tags.length > 0 || 
                          activeFilters.sortBy !== 'date' ||
                          searchTerm.trim() !== '';

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Rechercher des ressources..."
            className="pl-10"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1 h-8 w-8"
              onClick={() => setSearchTerm('')}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex gap-2">
                <Filter className="h-4 w-4" />
                <span>Filtres</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Types de ressources</h4>
                  <div className="grid gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="type-document" 
                        checked={activeFilters.types.includes('document')}
                        onCheckedChange={() => handleTypeToggle('document')}
                      />
                      <Label htmlFor="type-document">Documents complémentaires</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="type-glossary" 
                        checked={activeFilters.types.includes('glossary')}
                        onCheckedChange={() => handleTypeToggle('glossary')}
                      />
                      <Label htmlFor="type-glossary">Glossaire</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="type-summary" 
                        checked={activeFilters.types.includes('summary')}
                        onCheckedChange={() => handleTypeToggle('summary')}
                      />
                      <Label htmlFor="type-summary">Fiches de synthèse</Label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Tags principaux</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {availableTags.slice(0, 6).map(tag => (
                      <div key={tag} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`tag-${tag}`} 
                          checked={activeFilters.tags.includes(tag)}
                          onCheckedChange={() => handleTagToggle(tag)}
                        />
                        <Label htmlFor={`tag-${tag}`} className="truncate">{tag}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Tri</h4>
                  <Select value={activeFilters.sortBy} onValueChange={handleSortChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Trier par" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="date">Date (plus récent)</SelectItem>
                      <SelectItem value="title">Titre (A-Z)</SelectItem>
                      <SelectItem value="relevance">Pertinence</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full"
                  onClick={clearAllFilters}
                >
                  Effacer tous les filtres
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          <Select value={activeFilters.sortBy} onValueChange={handleSortChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Trier par" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Date (plus récent)</SelectItem>
              <SelectItem value="title">Titre (A-Z)</SelectItem>
              <SelectItem value="relevance">Pertinence</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Afficher les filtres actifs */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-gray-500">Filtres actifs:</span>
          
          {searchTerm && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <span>Recherche: {searchTerm}</span>
              <X 
                className="h-3 w-3 cursor-pointer ml-1" 
                onClick={() => setSearchTerm('')}
              />
            </Badge>
          )}
          
          {activeFilters.types.map(type => (
            <Badge key={type} variant="secondary" className="flex items-center gap-1">
              <span>
                {type === 'document' && 'Documents'}
                {type === 'glossary' && 'Glossaire'}
                {type === 'summary' && 'Fiches de synthèse'}
              </span>
              <X 
                className="h-3 w-3 cursor-pointer ml-1" 
                onClick={() => removeType(type)}
              />
            </Badge>
          ))}
          
          {activeFilters.tags.map(tag => (
            <Badge key={tag} variant="secondary" className="flex items-center gap-1">
              <Tag className="h-3 w-3 mr-1" />
              <span>{tag}</span>
              <X 
                className="h-3 w-3 cursor-pointer ml-1" 
                onClick={() => removeTag(tag)}
              />
            </Badge>
          ))}
          
          {activeFilters.sortBy !== 'date' && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <span>Tri: {
                activeFilters.sortBy === 'title' ? 'Titre (A-Z)' : 
                activeFilters.sortBy === 'relevance' ? 'Pertinence' : 
                'Date'
              }</span>
              <X 
                className="h-3 w-3 cursor-pointer ml-1" 
                onClick={() => handleSortChange('date')}
              />
            </Badge>
          )}
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-7 px-2 text-xs"
            onClick={clearAllFilters}
          >
            Effacer tout
          </Button>
        </div>
      )}
    </div>
  );
};
