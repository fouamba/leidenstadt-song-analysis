
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { X, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WordCloudProps {
  question: string;
  placeholder?: string;
  maxWords?: number;
  collaborative?: boolean;
  onWordsChange?: (words: string[]) => void;
  initialWords?: string[];
}

export const WordCloudActivity: React.FC<WordCloudProps> = ({
  question,
  placeholder = "Tapez un mot-clé...",
  maxWords = 20,
  collaborative = false,
  onWordsChange,
  initialWords = []
}) => {
  const [words, setWords] = useState<string[]>(initialWords);
  const [currentWord, setCurrentWord] = useState('');
  const [collaborativeWords, setCollaborativeWords] = useState<string[]>([]);

  // Simuler des mots collaboratifs (en réalité, cela viendrait d'un WebSocket ou API)
  useEffect(() => {
    if (collaborative) {
      const timer = setTimeout(() => {
        const newCollaborativeWords = [
          'guerre', 'histoire', 'destin', 'contexte', 'naissance',
          'époque', 'violence', 'identité', 'choix', 'société'
        ];
        setCollaborativeWords(newCollaborativeWords);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [collaborative]);

  // Notifier les changements
  useEffect(() => {
    if (onWordsChange) {
      onWordsChange([...words, ...collaborativeWords]);
    }
  }, [words, collaborativeWords, onWordsChange]);

  const addWord = () => {
    const trimmedWord = currentWord.trim().toLowerCase();
    
    if (trimmedWord && 
        !words.includes(trimmedWord) && 
        !collaborativeWords.includes(trimmedWord) &&
        words.length < maxWords) {
      setWords(prev => [...prev, trimmedWord]);
      setCurrentWord('');
    }
  };

  const removeWord = (wordToRemove: string) => {
    setWords(prev => prev.filter(word => word !== wordToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addWord();
    }
  };

  // Fonction pour obtenir une taille de police aléatoire basée sur la position
  const getWordSize = (index: number, total: number) => {
    const sizes = ['text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl'];
    return sizes[index % sizes.length];
  };

  // Fonction pour obtenir une couleur aléatoire
  const getWordColor = (index: number) => {
    const colors = [
      'bg-blue-100 text-blue-800',
      'bg-green-100 text-green-800', 
      'bg-purple-100 text-purple-800',
      'bg-pink-100 text-pink-800',
      'bg-yellow-100 text-yellow-800',
      'bg-indigo-100 text-indigo-800',
      'bg-red-100 text-red-800',
      'bg-orange-100 text-orange-800'
    ];
    return colors[index % colors.length];
  };

  const allWords = [...words, ...collaborativeWords];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{question}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Interface d'ajout de mots */}
        <div className="flex gap-2">
          <Input
            value={currentWord}
            onChange={(e) => setCurrentWord(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            disabled={words.length >= maxWords}
            className="flex-1"
          />
          <Button
            onClick={addWord}
            disabled={!currentWord.trim() || words.length >= maxWords}
            size="sm"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {/* Indicateur de limite */}
        <div className="text-sm text-muted-foreground">
          {words.length} / {maxWords} mots ajoutés
          {collaborative && collaborativeWords.length > 0 && (
            <span className="ml-2">
              (+{collaborativeWords.length} mots collaboratifs)
            </span>
          )}
        </div>

        {/* Nuage de mots */}
        {allWords.length > 0 && (
          <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-dashed">
            <CardContent className="p-6">
              <div className="flex flex-wrap gap-2 items-center justify-center min-h-32">
                {allWords.map((word, index) => {
                  const isUserWord = words.includes(word);
                  const isCollaborative = collaborativeWords.includes(word);
                  
                  return (
                    <div
                      key={`${word}-${index}`}
                      className={cn(
                        "relative inline-flex items-center gap-1 px-3 py-1 rounded-full transition-all duration-300 hover:scale-110",
                        getWordSize(index, allWords.length),
                        getWordColor(index),
                        isCollaborative && "ring-2 ring-orange-300"
                      )}
                      style={{
                        transform: `rotate(${(index % 3 - 1) * 5}deg)`,
                        animationDelay: `${index * 100}ms`
                      }}
                    >
                      <span className="font-medium">{word}</span>
                      
                      {isUserWord && (
                        <button
                          onClick={() => removeWord(word)}
                          className="ml-1 text-current opacity-60 hover:opacity-100 transition-opacity"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      )}
                      
                      {isCollaborative && (
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Message d'encouragement si pas de mots */}
        {allWords.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <div className="mb-2">💭</div>
            <p>Commencez à ajouter des mots-clés pour créer votre nuage !</p>
          </div>
        )}

        {/* Légende pour le mode collaboratif */}
        {collaborative && collaborativeWords.length > 0 && (
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-blue-100 border-2 border-blue-300" />
              <span>Vos mots</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-orange-100 border-2 border-orange-300" />
              <span>Mots collaboratifs</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WordCloudActivity;
