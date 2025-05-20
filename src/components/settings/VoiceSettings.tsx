
import React from 'react';
import { useVoicePreferences } from '../../contexts/VoicePreferencesContext';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Volume, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const VoiceSettings: React.FC = () => {
  const {
    voiceEnabled,
    setVoiceEnabled,
    selectedVoice,
    setSelectedVoice,
    rate,
    setRate,
    pitch,
    setPitch,
    volume,
    setVolume,
    availableVoices
  } = useVoicePreferences();
  
  // Filtrer pour n'obtenir que les voix françaises
  const frenchVoices = availableVoices.filter(
    voice => voice.lang.startsWith('fr')
  );
  
  const handleTestVoice = () => {
    const speech = new SpeechSynthesisUtterance("Bonjour ! Je suis la voix qui vous guidera tout au long de votre apprentissage.");
    
    // Appliquer les paramètres
    if (selectedVoice) {
      const voice = availableVoices.find(v => v.name === selectedVoice);
      if (voice) speech.voice = voice;
    }
    
    speech.rate = rate;
    speech.pitch = pitch;
    speech.volume = volume;
    
    window.speechSynthesis.speak(speech);
  };
  
  return (
    <Card className="voice-settings panel">
      <CardHeader className="pb-3 border-b">
        <CardTitle className="flex items-center gap-2">
          <Volume className="h-5 w-5" /> 
          Paramètres de la voix
          <Badge variant="outline" className="ml-auto text-xs font-normal">
            Accessibilité
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Label htmlFor="voice-toggle" className="text-sm font-medium">
              Activer les instructions vocales
            </Label>
            <div className="text-xs text-muted-foreground flex items-center gap-1" title="La synthèse vocale permet d'écouter les instructions et textes importants.">
              <Info className="h-3 w-3" />
              <span>Aide à l'apprentissage</span>
            </div>
          </div>
          <Switch
            id="voice-toggle"
            checked={voiceEnabled}
            onCheckedChange={setVoiceEnabled}
          />
        </div>
        
        {voiceEnabled && (
          <>
            <div className="space-y-2 pt-2">
              <Label htmlFor="voice-select" className="text-sm font-medium">Choisir une voix:</Label>
              <Select value={selectedVoice || 'default'} onValueChange={setSelectedVoice}>
                <SelectTrigger id="voice-select" className="w-full">
                  <SelectValue placeholder="Voix par défaut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Voix par défaut</SelectItem>
                  {frenchVoices.map(voice => (
                    <SelectItem key={voice.name} value={voice.name}>
                      {voice.name} ({voice.lang})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-1 pt-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="rate-slider" className="text-sm font-medium">Vitesse de lecture</Label>
                <span className="text-sm text-slate-500">{rate.toFixed(1)}</span>
              </div>
              <Slider
                id="rate-slider"
                min={0.5}
                max={2}
                step={0.1}
                value={[rate]}
                onValueChange={(values) => setRate(values[0])}
                className="py-2"
              />
            </div>
            
            <div className="space-y-1 pt-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="pitch-slider" className="text-sm font-medium">Hauteur de la voix</Label>
                <span className="text-sm text-slate-500">{pitch.toFixed(1)}</span>
              </div>
              <Slider
                id="pitch-slider"
                min={0.5}
                max={2}
                step={0.1}
                value={[pitch]}
                onValueChange={(values) => setPitch(values[0])}
                className="py-2"
              />
            </div>
            
            <div className="space-y-1 pt-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="volume-slider" className="text-sm font-medium">Volume</Label>
                <span className="text-sm text-slate-500">{(volume * 100).toFixed(0)}%</span>
              </div>
              <Slider
                id="volume-slider"
                min={0}
                max={1}
                step={0.1}
                value={[volume]}
                onValueChange={(values) => setVolume(values[0])}
                className="py-2"
              />
            </div>
            
            <Button 
              onClick={handleTestVoice}
              variant="outline"
              className="w-full mt-2"
              size="sm"
            >
              Tester la voix
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};
