
import React from 'react';
import { useVoicePreferences } from '../../contexts/VoicePreferencesContext';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Volume } from "lucide-react";

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
      <CardHeader>
        <CardTitle className="flex items-center">
          <Volume className="mr-2 h-5 w-5" /> Paramètres de la voix
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="voice-toggle">Activer les instructions vocales</Label>
          <Switch
            id="voice-toggle"
            checked={voiceEnabled}
            onCheckedChange={setVoiceEnabled}
          />
        </div>
        
        {voiceEnabled && (
          <>
            <div className="space-y-1">
              <Label htmlFor="voice-select">Choisir une voix:</Label>
              <Select value={selectedVoice || 'default'} onValueChange={setSelectedVoice}>
                <SelectTrigger id="voice-select">
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
            
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <Label htmlFor="rate-slider">Vitesse de lecture</Label>
                <span className="text-sm text-slate-500">{rate.toFixed(1)}</span>
              </div>
              <Slider
                id="rate-slider"
                min={0.5}
                max={2}
                step={0.1}
                value={[rate]}
                onValueChange={(values) => setRate(values[0])}
              />
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <Label htmlFor="pitch-slider">Hauteur de la voix</Label>
                <span className="text-sm text-slate-500">{pitch.toFixed(1)}</span>
              </div>
              <Slider
                id="pitch-slider"
                min={0.5}
                max={2}
                step={0.1}
                value={[pitch]}
                onValueChange={(values) => setPitch(values[0])}
              />
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <Label htmlFor="volume-slider">Volume</Label>
                <span className="text-sm text-slate-500">{(volume * 100).toFixed(0)}%</span>
              </div>
              <Slider
                id="volume-slider"
                min={0}
                max={1}
                step={0.1}
                value={[volume]}
                onValueChange={(values) => setVolume(values[0])}
              />
            </div>
            
            <Button 
              onClick={handleTestVoice}
              variant="outline"
              className="w-full"
            >
              Tester la voix
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};
