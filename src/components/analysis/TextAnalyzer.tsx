
import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

// Types pour l'analyse linguistique
export type VerbInfo = {
  verb: string;
  tense: string;
  mode: string;
  value: string;
};

export type SentenceAnalysis = {
  original: string;
  structure: {
    subject: string;
    verb: string;
    complements: string[];
  };
  verbs: VerbInfo[];
};

// Composant pour surligner du texte avec des annotations
interface HighlightTextProps {
  text: string;
  highlights: Array<{
    start: number;
    end: number;
    type: string;
    info?: string;
  }>;
  onClick?: (highlight: any, text: string) => void;
}

const HighlightText: React.FC<HighlightTextProps> = ({ text, highlights, onClick }) => {
  const sortedHighlights = [...highlights].sort((a, b) => a.start - b.start);
  
  const colorMap: Record<string, string> = {
    'subject': 'bg-blue-100 border-b-2 border-blue-500',
    'verb': 'bg-green-100 border-b-2 border-green-500',
    'complement': 'bg-amber-100 border-b-2 border-amber-500',
    'imperfect': 'bg-purple-100 border-b-2 border-purple-500',
    'pluperfect': 'bg-pink-100 border-b-2 border-pink-500',
    'conditional': 'bg-cyan-100 border-b-2 border-cyan-500',
    'conditional_past': 'bg-indigo-100 border-b-2 border-indigo-500'
  };
  
  let result: JSX.Element[] = [];
  let lastEnd = 0;
  
  sortedHighlights.forEach((highlight, index) => {
    if (highlight.start > lastEnd) {
      result.push(
        <span key={`text-${index}`}>
          {text.substring(lastEnd, highlight.start)}
        </span>
      );
    }
    
    const highlightText = text.substring(highlight.start, highlight.end);
    result.push(
      <TooltipProvider key={`highlight-${index}`}>
        <Tooltip>
          <TooltipTrigger asChild>
            <span
              className={cn(
                "cursor-pointer transition-all px-0.5 rounded-sm",
                colorMap[highlight.type] || 'bg-gray-100'
              )}
              onClick={() => onClick && onClick(highlight, highlightText)}
            >
              {highlightText}
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <p>{highlight.info || highlight.type}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
    
    lastEnd = highlight.end;
  });
  
  if (lastEnd < text.length) {
    result.push(
      <span key="text-last">
        {text.substring(lastEnd)}
      </span>
    );
  }
  
  return <div className="leading-relaxed">{result}</div>;
};

interface TextAnalyzerProps {
  text: string;
  onAnalysisComplete?: (analysis: SentenceAnalysis[]) => void;
}

const TextAnalyzer: React.FC<TextAnalyzerProps> = ({ text, onAnalysisComplete }) => {
  const [activeTab, setActiveTab] = useState('structure');
  const [sentences, setSentences] = useState<string[]>([]);
  const [analysis, setAnalysis] = useState<SentenceAnalysis[]>([]);
  const [selectedElement, setSelectedElement] = useState<any>(null);
  
  useEffect(() => {
    const splitSentences = text
      .split(/(?<=[.!?])\s+/)
      .filter(sentence => sentence.trim().length > 0);
    
    setSentences(splitSentences);
  }, [text]);
  
  const analyzeText = useCallback(() => {
    const simulatedAnalysis: SentenceAnalysis[] = sentences.map(sentence => {
      const words = sentence.split(' ');
      
      const verbPatterns = [
        { regex: /étais/i, tense: 'imparfait', mode: 'indicatif', value: 'irréel du passé' },
        { regex: /né/i, tense: 'participe passé', mode: 'participe', value: 'accompli' },
        { regex: /aurais/i, tense: 'conditionnel présent', mode: 'conditionnel', value: 'hypothétique' },
        { regex: /eu/i, tense: 'participe passé', mode: 'participe', value: 'accompli' },
      ];
      
      const verbs: VerbInfo[] = [];
      words.forEach(word => {
        for (const pattern of verbPatterns) {
          if (pattern.regex.test(word)) {
            verbs.push({
              verb: word,
              tense: pattern.tense,
              mode: pattern.mode,
              value: pattern.value
            });
            break;
          }
        }
      });
      
      return {
        original: sentence,
        structure: {
          subject: words.length > 1 ? words[0] + ' ' + words[1] : words[0] || '',
          verb: verbs.length > 0 ? verbs[0].verb : '',
          complements: words.slice(3)
        },
        verbs
      };
    });
    
    setAnalysis(simulatedAnalysis);
    if (onAnalysisComplete) {
      onAnalysisComplete(simulatedAnalysis);
    }
  }, [sentences, onAnalysisComplete]);
  
  useEffect(() => {
    if (sentences.length > 0) {
      analyzeText();
    }
  }, [sentences, analyzeText]);
  
  const getHighlights = useCallback((sentence: SentenceAnalysis) => {
    if (activeTab === 'structure') {
      const highlights = [];
      
      const subjectStart = sentence.original.indexOf(sentence.structure.subject);
      if (subjectStart >= 0) {
        highlights.push({
          start: subjectStart,
          end: subjectStart + sentence.structure.subject.length,
          type: 'subject',
          info: 'Sujet'
        });
      }
      
      const verbStart = sentence.original.indexOf(sentence.structure.verb);
      if (verbStart >= 0) {
        highlights.push({
          start: verbStart,
          end: verbStart + sentence.structure.verb.length,
          type: 'verb',
          info: 'Verbe'
        });
      }
      
      let currentPos = 0;
      sentence.structure.complements.forEach(complement => {
        const complementStart = sentence.original.indexOf(complement, currentPos);
        if (complementStart >= 0) {
          highlights.push({
            start: complementStart,
            end: complementStart + complement.length,
            type: 'complement',
            info: 'Complément'
          });
          currentPos = complementStart + complement.length;
        }
      });
      
      return highlights;
    } else if (activeTab === 'tenses') {
      return sentence.verbs.map(verb => {
        const verbStart = sentence.original.indexOf(verb.verb);
        let type = '';
        
        switch (verb.tense) {
          case 'imparfait':
            type = 'imperfect';
            break;
          case 'plus-que-parfait':
            type = 'pluperfect';
            break;
          case 'conditionnel présent':
            type = 'conditional';
            break;
          case 'conditionnel passé':
            type = 'conditional_past';
            break;
          default:
            type = 'verb';
        }
        
        return {
          start: verbStart,
          end: verbStart + verb.verb.length,
          type,
          info: `${verb.tense} (${verb.value})`
        };
      });
    }
    
    return [];
  }, [activeTab]);
  
  const handleElementClick = (highlight: any, text: string) => {
    setSelectedElement({
      text,
      type: highlight.type,
      info: highlight.info
    });
  };
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="structure" value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="structure">Structure syntaxique</TabsTrigger>
            <TabsTrigger value="tenses">Temps verbaux</TabsTrigger>
          </TabsList>
          
          <div className="flex gap-2">
            {activeTab === 'structure' && (
              <>
                <Badge variant="outline" className="bg-blue-100">Sujet</Badge>
                <Badge variant="outline" className="bg-green-100">Verbe</Badge>
                <Badge variant="outline" className="bg-amber-100">Complément</Badge>
              </>
            )}
            
            {activeTab === 'tenses' && (
              <>
                <Badge variant="outline" className="bg-purple-100">Imparfait</Badge>
                <Badge variant="outline" className="bg-pink-100">Plus-que-parfait</Badge>
                <Badge variant="outline" className="bg-cyan-100">Conditionnel</Badge>
              </>
            )}
          </div>
        </div>
        
        <TabsContent value="structure" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Analyse structurelle</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {analysis.map((sentence, index) => (
                <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
                  <HighlightText
                    text={sentence.original}
                    highlights={getHighlights(sentence)}
                    onClick={handleElementClick}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tenses" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Analyse des temps verbaux</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {analysis.map((sentence, index) => (
                <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
                  <HighlightText
                    text={sentence.original}
                    highlights={getHighlights(sentence)}
                    onClick={handleElementClick}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {selectedElement && (
        <Card>
          <CardHeader>
            <CardTitle>Détails de l'élément</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <span className="font-semibold">Texte:</span> {selectedElement.text}
              </div>
              <div>
                <span className="font-semibold">Type:</span> {selectedElement.info || selectedElement.type}
              </div>
              
              {activeTab === 'tenses' && selectedElement.type === 'imperfect' && (
                <div className="mt-4 bg-slate-50 p-4 rounded-md">
                  <h4 className="font-semibold mb-2">Valeurs de l'imparfait:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Description d'une action passée non achevée</li>
                    <li>Exprime une hypothèse irréelle</li>
                    <li>Dans "Si j'étais né..." indique une condition non réalisée</li>
                  </ul>
                </div>
              )}
              
              {activeTab === 'tenses' && selectedElement.type === 'conditional' && (
                <div className="mt-4 bg-slate-50 p-4 rounded-md">
                  <h4 className="font-semibold mb-2">Valeurs du conditionnel:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Exprime une action soumise à condition</li>
                    <li>Indique un fait hypothétique, imaginaire</li>
                    <li>S'emploie dans la principale d'un système hypothétique</li>
                  </ul>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" onClick={() => setSelectedElement(null)}>
              Fermer
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default TextAnalyzer;
