import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle, Play, Pause, SkipBack, SkipForward, Info } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSpeechSynthesis } from '../../hooks/useSpeechSynthesis';

interface Screen1_5Props {
  onComplete: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

export default function Screen1_5({ onComplete, onNext, onPrevious }: Screen1_5Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentCouplet, setCurrentCouplet] = useState(0);
  const [highlightedLine, setHighlightedLine] = useState(-1);
  const [userAnnotations, setUserAnnotations] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState('lyrics');
  const [screenCompleted, setScreenCompleted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { speak } = useSpeechSynthesis(); 

  const instructions = "Découvrez maintenant le texte complet de la chanson. Écoutez attentivement en suivant les paroles qui sont surlignées au fur et à mesure. Vous pouvez surligner des passages qui vous intéressent et consulter des informations supplémentaires sur certains termes.";

  useEffect(() => {
    speak(instructions);
  }, []);

  // Timestamps (en secondes) correspondant au début de chaque ligne
  const lineTimestamps = [
    // Couplet 1
    0, 8, 16, 24, 32, 40, 48, 56,
    // Pont
    64, 72, 80,
    // Couplet 2
    88, 96, 104, 112, 120, 128, 136, 144,
    // Pont
    152, 160, 168,
    // Couplet 3
    176, 184, 192, 200, 208, 216, 224, 232,
    // Conclusion
    240, 248, 256, 264
  ];

  const lyricsWithInfo = [
    {
      title: "Couplet 1",
      lines: [
        { text: "Et si j'étais né en 17 à Leidenstadt", info: "Leidenstadt est une ville fictive d'Allemagne. '17' fait référence à l'année 1917, durant la Première Guerre mondiale." },
        { text: "Sur les ruines d'un champ de bataille", info: "Évocation de la Première Guerre mondiale qui a ravagé l'Europe de 1914 à 1918." },
        { text: "Aurais-je été meilleur ou pire que ces gens", info: null },
        { text: "Si j'avais été allemand ?", info: "Question centrale de la chanson: serions-nous différents si nous étions nés ailleurs?" },
        { text: "Bercé d'humiliation, de haine et d'ignorance", info: "Référence au contexte historique de l'Allemagne après la Première Guerre mondiale et le Traité de Versailles." },
        { text: "Nourri de rêves de revanche", info: "Évocation de l'état d'esprit allemand après la défaite de 1918 et les conditions du Traité de Versailles." },
        { text: "Aurais-je été de ces improbables consciences", info: null },
        { text: "Larmes au milieu d'un torrent ?", info: "Métaphore des personnes qui ont résisté au nazisme, minoritaires face au courant dominant." }
      ]
    },
    {
      title: "Pont",
      lines: [
        { text: "Si j'avais grandi dans les docklands de Belfast", info: "Zone portuaire de Belfast, en Irlande du Nord, théâtre de violents affrontements entre catholiques et protestants." },
        { text: "Soldat d'une foi, d'une caste", info: "Référence au conflit nord-irlandais, opposition entre catholiques et protestants." },
        { text: "Aurais-je eu la force envers et contre les miens", info: "Question sur la capacité à s'opposer à son propre camp, à sa propre communauté." }
      ]
    },
    {
      title: "Couplet 2",
      lines: [
        { text: "De trahir: tendre une main ?", info: "L'acte de tendre la main à l'adversaire est vu comme une trahison par sa propre communauté." },
        { text: "Si j'étais née blanche et riche à Johannesburg", info: "Johannesburg est la plus grande ville d'Afrique du Sud, pays marqué par l'apartheid jusqu'en 1991." },
        { text: "Entre le pouvoir et la peur", info: "Les Blancs sous l'apartheid vivaient dans la crainte d'une révolte, tout en bénéficiant du système." },
        { text: "Aurais-je entendu ces cris portés par le vent", info: null },
        { text: "Rien ne sera comme avant ?", info: "Référence aux changements sociaux et à la fin de l'apartheid." },
        { text: "Chaque matin en prière, récitant les litanies", info: "Évocation de la religiosité et du conservatisme." },
        { text: "D'une société qui s'épure", info: "L'apartheid visait à 'purifier' la société en séparant les races." },
        { text: "Aurais-je été complice ou bourreau? Ou victime", info: "Question sur les choix moraux face à un système injuste." }
      ]
    },
    {
      title: "Pont",
      lines: [
        { text: "Des travaux obscurs de l'Histoire ?", info: "L'Histoire est présentée comme une force qui agit de façon souterraine, manipulant les individus." },
        { text: "Et si j'étais né en 43 à Varsovie", info: "Année et lieu évoquant le ghetto de Varsovie et la Shoah en Pologne." },
        { text: "Au cœur du nid de la haine", info: "Référence à l'occupation nazie en Pologne, particulièrement violente." }
      ]
    },
    {
      title: "Couplet 3",
      lines: [
        { text: "Aurais-je été de ceux qui ont courbé la tête", info: "Évocation de la soumission face à l'oppression." },
        { text: "Ou l'aurais-je révoltée ?", info: "Allusion possible à l'insurrection du ghetto de Varsovie en 1943." },
        { text: "Si j'avais grandi les mains nues dans la misère", info: "Évocation de la pauvreté et du dénuement." },
        { text: "Si j'avais dû voler pour survivre", info: "'Volar' signifie 'voler' en espagnol, référence aux actes de survie dans la pauvreté." },
        { text: "Aurais-je eu le cœur assez libre pour aimer", info: "Question sur la capacité à maintenir son humanité dans des conditions difficiles." },
        { text: "Mon prochain comme moi-même ?", info: "Référence au commandement biblique 'Tu aimeras ton prochain comme toi-même'." },
        { text: "Et si j'étais née, et si j'étais né", info: "Le passage du féminin au masculin souligne l'universalité du questionnement." },
        { text: "Désarmé dans un monde en colère", info: "Métaphore du monde comme lieu violent où l'individu est vulnérable." }
      ]
    },
    {
      title: "Conclusion",
      lines: [
        { text: "Aurais-je eu l'âme d'une mère ou d'un soldat", info: "Opposition entre la figure nourricière (mère) et destructrice (soldat)." },
        { text: "Ou les deux à la fois ?", info: "Suggestion que chacun peut porter en soi cette dualité." },
        { text: "J'aime mieux croiser le fer que de croiser mes bras", info: "Métaphore exprimant la préférence pour l'action plutôt que la passivité." },
        { text: "Et ce monde qu'on déshonore", info: "Évocation de la responsabilité collective face aux injustices du monde." }
      ]
    }
  ];

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSkipBack = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 10);
  };

  const handleSkipForward = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.min(duration, audioRef.current.currentTime + 10);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    
    const currentTime = audioRef.current.currentTime;
    setCurrentTime(currentTime);
    
    // Déterminer quelle ligne doit être surlignée
    let lineIndex = -1;
    for (let i = lineTimestamps.length - 1; i >= 0; i--) {
      if (currentTime >= lineTimestamps[i]) {
        lineIndex = i;
        break;
      }
    }
    setHighlightedLine(lineIndex);
    
    // Déterminer le couplet actuel
    let coupletIndex = 0;
    if (lineIndex >= 26) coupletIndex = 5;
    else if (lineIndex >= 23) coupletIndex = 4;
    else if (lineIndex >= 20) coupletIndex = 3;
    else if (lineIndex >= 11) coupletIndex = 2;
    else if (lineIndex >= 8) coupletIndex = 1;
    setCurrentCouplet(coupletIndex);
    
    // Check if the user has listened to at least 80% of the song
    if (currentTime > duration * 0.8 && !screenCompleted) {
      setScreenCompleted(true);
      onComplete();
    }
  };

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return;
    setDuration(audioRef.current.duration);
  };

  const handleAnnotation = (coupletIndex: number, lineIndex: number) => {
    const key = `${coupletIndex}-${lineIndex}`;
    setUserAnnotations({
      ...userAnnotations,
      [key]: !userAnnotations[key]
    });
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Calcul de l'index global de la ligne à partir du couplet et de l'index dans le couplet
  const getGlobalLineIndex = (coupletIndex: number, lineIndex: number) => {
    let globalIndex = lineIndex;
    for (let i = 0; i < coupletIndex; i++) {
      globalIndex += lyricsWithInfo[i].lines.length;
    }
    return globalIndex;
  };

  return (
    <div className="flex flex-col h-full gap-6">
      <h2 className="text-xl font-semibold">Découverte du texte</h2>
      
      <Alert className="bg-blue-50">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Instructions</AlertTitle>
        <AlertDescription>{instructions}</AlertDescription>
      </Alert>
      
      <div className="flex flex-col gap-4">
        <audio 
          ref={audioRef}
          src="https://example.com/ne-en-17-a-leidenstadt.mp3" 
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
        />
        
        <div className="w-full">
          <div className="flex justify-between text-sm mb-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          <Progress value={(currentTime / duration) * 100} className="w-full" />
        </div>
        
        <div className="flex gap-4 justify-center">
          <Button variant="outline" onClick={handleSkipBack}>
            <SkipBack className="h-4 w-4" />
          </Button>
          <Button onClick={handlePlayPause}>
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button variant="outline" onClick={handleSkipForward}>
            <SkipForward className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="lyrics">Paroles</TabsTrigger>
          <TabsTrigger value="annotations">Mes annotations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="lyrics" className="space-y-4">
          {lyricsWithInfo.map((section, sectionIndex) => (
            <Card key={sectionIndex} className={`overflow-hidden transition-all ${currentCouplet === sectionIndex ? 'border-blue-500 shadow-lg' : ''}`}>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-2">{section.title}</h3>
                <div className="space-y-2">
                  {section.lines.map((line, lineIndex) => {
                    const globalLineIndex = getGlobalLineIndex(sectionIndex, lineIndex);
                    const isHighlighted = globalLineIndex === highlightedLine;
                    const isAnnotated = userAnnotations[`${sectionIndex}-${lineIndex}`];
                    
                    return (
                      <div 
                        key={lineIndex} 
                        className={`flex items-center p-2 rounded-md transition-all cursor-pointer ${
                          isHighlighted ? 'bg-yellow-200' : 
                          isAnnotated ? 'bg-green-100' : ''
                        }`}
                        onClick={() => handleAnnotation(sectionIndex, lineIndex)}
                      >
                        <span className="flex-grow">{line.text}</span>
                        {line.info && (
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <Info className="h-4 w-4" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-80 p-4">
                              <p>{line.info}</p>
                            </PopoverContent>
                          </Popover>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="annotations">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-bold text-lg mb-4">Vos passages surlignés</h3>
              {Object.keys(userAnnotations).filter(key => userAnnotations[key]).length > 0 ? (
                <div className="space-y-2">
                  {Object.keys(userAnnotations)
                    .filter(key => userAnnotations[key])
                    .map(key => {
                      const [sectionIndex, lineIndex] = key.split('-').map(Number);
                      return (
                        <div key={key} className="p-2 bg-green-100 rounded-md">
                          <p className="font-semibold">{lyricsWithInfo[sectionIndex].title}</p>
                          <p>{lyricsWithInfo[sectionIndex].lines[lineIndex].text}</p>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="mt-2"
                            onClick={() => handleAnnotation(sectionIndex, lineIndex)}
                          >
                            Retirer l'annotation
                          </Button>
                        </div>
                      );
                    })}
                </div>
              ) : (
                <p className="text-gray-500 italic">Aucun passage n'a été surligné pour le moment. Retournez à l'onglet "Paroles" et cliquez sur une ligne pour l'annoter.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-between mt-4">
        <Button variant="outline" onClick={onPrevious}>
          Retour
        </Button>
        <Button onClick={onNext} disabled={!screenCompleted}>
          Continuer
        </Button>
      </div>
    </div>
  );
}
