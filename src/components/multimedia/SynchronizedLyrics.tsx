
import React, { useState, useEffect, useRef } from "react";
import { LyricLine } from "../../models/types";

interface SynchronizedLyricsProps {
  lyrics: LyricLine[];
  currentTime: number; // Temps actuel de la lecture en secondes
  onLineClick?: (line: LyricLine) => void;
  highlightVerbs?: boolean;
}

export const SynchronizedLyrics: React.FC<SynchronizedLyricsProps> = ({
  lyrics,
  currentTime,
  onLineClick,
  highlightVerbs = false,
}) => {
  const [activeLine, setActiveLine] = useState<number>(-1);
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Mettre à jour la ligne active en fonction du temps actuel
  useEffect(() => {
    const newActiveLine = lyrics.findIndex(
      (line) => currentTime >= line.startTime && currentTime <= line.endTime
    );

    if (newActiveLine !== -1 && newActiveLine !== activeLine) {
      setActiveLine(newActiveLine);

      // Faire défiler vers la ligne active
      if (lineRefs.current[newActiveLine]) {
        lineRefs.current[newActiveLine]?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  }, [currentTime, lyrics, activeLine]);

  // Fonction pour mettre en évidence les temps verbaux dans une ligne
  const highlightVerbTenses = (text: string, verbTenses?: string[]) => {
    if (!highlightVerbs || !verbTenses || verbTenses.length === 0) {
      return text;
    }

    // Cette fonction est simplifiée - dans une implémentation réelle,
    // nous aurions besoin d'une analyse linguistique plus sophistiquée
    const words = text.split(" ");
    
    return (
      <>
        {words.map((word, index) => {
          // Simulation simple: considérer certains mots comme des verbes
          // Dans une implémentation réelle, cette logique serait plus complexe
          const isImparfait = word.match(/étais|avais|était|avait|fallait/i);
          const isConditionnel = word.match(/aurais|serait|serions/i);
          const isPlusQueParfait = word.match(/avais été|était né/i);
          
          let className = "";
          if (isImparfait) className = "text-blue-600 font-medium";
          else if (isConditionnel) className = "text-red-600 font-medium";
          else if (isPlusQueParfait) className = "text-green-600 font-medium";
          
          return (
            <React.Fragment key={index}>
              <span className={className}>
                {word}
              </span>
              {index < words.length - 1 ? " " : ""}
            </React.Fragment>
          );
        })}
      </>
    );
  };

  return (
    <div className="lyrics-container max-h-96 overflow-y-auto p-4 bg-white rounded-lg border border-slate-200">
      {lyrics.map((line, index) => (
        <div
          key={index}
          ref={(el) => (lineRefs.current[index] = el)}
          className={`py-2 px-3 my-1 transition-all duration-300 ease-in-out rounded cursor-pointer ${
            activeLine === index
              ? "bg-primary/10 border-l-4 border-primary"
              : "hover:bg-slate-50"
          }`}
          onClick={() => onLineClick && onLineClick(line)}
        >
          <div className="text-md">
            {highlightVerbs && line.analysis?.verbTenses
              ? highlightVerbTenses(line.text, line.analysis.verbTenses)
              : line.text}
          </div>
          {line.analysis && activeLine === index && (
            <div className="mt-2 text-xs text-slate-500">
              {line.analysis.verbTenses && (
                <div className="mb-1">
                  <span className="font-medium">Temps verbaux: </span>
                  {line.analysis.verbTenses.join(", ")}
                </div>
              )}
              {line.analysis.syntaxStructure && (
                <div className="mb-1">
                  <span className="font-medium">Structure: </span>
                  {line.analysis.syntaxStructure}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
