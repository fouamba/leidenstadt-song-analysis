
import React, { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";

interface LyricHighlighterProps {
  lyrics: string;
}

export function LyricHighlighter({ lyrics }: LyricHighlighterProps) {
  const [highlightImparfait, setHighlightImparfait] = useState(false);
  const [highlightConditionnel, setHighlightConditionnel] = useState(false);
  const [highlightConditionnelPasse, setHighlightConditionnelPasse] = useState(false);
  const [highlightSiConstruction, setHighlightSiConstruction] = useState(false);

  const lines = lyrics.split('\n');

  // Mots à mettre en évidence
  const imparfaitWords = ["étais", "avais", "était", "avait", "étions", "avions", "étiez", "aviez", "étaient", "avaient", "grandi"];
  const conditionnelWords = ["serions"];
  const conditionnelPasseWords = ["aurais", "aurait", "aurions", "auriez", "auraient"];
  const siConstructions = ["si j'étais", "si j'avais", "si j'étais née", "s'il fallait"];

  const highlightText = (text: string) => {
    let result = text;

    // Appliquer la coloration pour chaque type de mise en évidence
    if (highlightSiConstruction) {
      siConstructions.forEach(phrase => {
        const regex = new RegExp(`(${phrase})`, 'gi');
        result = result.replace(regex, '<span class="bg-yellow-200">$1</span>');
      });
    }

    if (highlightImparfait) {
      imparfaitWords.forEach(word => {
        const regex = new RegExp(`\\b(${word})\\b`, 'gi');
        result = result.replace(regex, '<span class="bg-blue-200">$1</span>');
      });
    }

    if (highlightConditionnel) {
      conditionnelWords.forEach(word => {
        const regex = new RegExp(`\\b(${word})\\b`, 'gi');
        result = result.replace(regex, '<span class="bg-red-200">$1</span>');
      });
    }

    if (highlightConditionnelPasse) {
      conditionnelPasseWords.forEach(word => {
        const regex = new RegExp(`\\b(${word})\\b`, 'gi');
        result = result.replace(regex, '<span class="bg-green-200">$1</span>');
      });
    }

    return result;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Paroles - "Né en 17 à Leidenstadt"</h2>
      
      <Collapsible className="mb-4">
        <CollapsibleTrigger className="flex items-center justify-between w-full py-2 px-4 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors">
          <span className="font-medium">Options de mise en évidence</span>
          <span className="text-sm text-slate-500">Cliquez pour afficher/masquer</span>
        </CollapsibleTrigger>
        <CollapsibleContent className="p-4 bg-slate-50 rounded-md mt-2">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="highlight-imparfait" 
                checked={highlightImparfait} 
                onCheckedChange={() => setHighlightImparfait(!highlightImparfait)} 
              />
              <label 
                htmlFor="highlight-imparfait" 
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Imparfait <span className="inline-block bg-blue-200 px-2 py-0.5 text-xs rounded">bleu</span>
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="highlight-conditionnel" 
                checked={highlightConditionnel} 
                onCheckedChange={() => setHighlightConditionnel(!highlightConditionnel)} 
              />
              <label 
                htmlFor="highlight-conditionnel" 
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Conditionnel présent <span className="inline-block bg-red-200 px-2 py-0.5 text-xs rounded">rouge</span>
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="highlight-conditionnel-passe" 
                checked={highlightConditionnelPasse} 
                onCheckedChange={() => setHighlightConditionnelPasse(!highlightConditionnelPasse)} 
              />
              <label 
                htmlFor="highlight-conditionnel-passe" 
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Conditionnel passé <span className="inline-block bg-green-200 px-2 py-0.5 text-xs rounded">vert</span>
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="highlight-si-construction" 
                checked={highlightSiConstruction} 
                onCheckedChange={() => setHighlightSiConstruction(!highlightSiConstruction)} 
              />
              <label 
                htmlFor="highlight-si-construction" 
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Constructions "si + imparfait/plus-que-parfait" <span className="inline-block bg-yellow-200 px-2 py-0.5 text-xs rounded">jaune</span>
              </label>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <div className="lyrics mt-6 whitespace-pre-line leading-relaxed">
        {lines.map((line, index) => (
          <React.Fragment key={index}>
            {line.trim() === "" ? (
              <div className="my-4"></div>
            ) : (
              <div 
                className="mb-2" 
                dangerouslySetInnerHTML={{ __html: highlightText(line) }}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
