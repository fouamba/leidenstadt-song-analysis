
class SpeechService {
  private static instance: SpeechService;
  private synthesis: SpeechSynthesis;
  private voices: SpeechSynthesisVoice[] = [];
  private defaultVoice: SpeechSynthesisVoice | null = null;
  private defaultLang: string = 'fr-FR';
  private volume: number = 1.0;
  private rate: number = 1.0;
  private pitch: number = 1.0;
  
  private constructor() {
    this.synthesis = window.speechSynthesis;
    this.loadVoices();
    // Recharger les voix si elles sont chargées de manière asynchrone
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = this.loadVoices.bind(this);
    }
  }
  
  public static getInstance(): SpeechService {
    if (!SpeechService.instance) {
      SpeechService.instance = new SpeechService();
    }
    return SpeechService.instance;
  }
  
  private loadVoices(): void {
    this.voices = this.synthesis.getVoices();
    // Sélectionner une voix française par défaut
    this.defaultVoice = this.voices.find(voice => 
      voice.lang.startsWith(this.defaultLang) && voice.localService
    ) || null;
  }
  
  public speak(text: string, options?: {
    voice?: SpeechSynthesisVoice,
    rate?: number,
    pitch?: number,
    volume?: number,
    onStart?: () => void,
    onEnd?: () => void,
    onError?: (event: SpeechSynthesisErrorEvent) => void
  }): void {
    if (!this.synthesis) {
      console.error("La synthèse vocale n'est pas disponible dans ce navigateur");
      return;
    }
    
    // Créer l'utterance
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Appliquer les options
    utterance.voice = options?.voice || this.defaultVoice;
    utterance.rate = options?.rate || this.rate;
    utterance.pitch = options?.pitch || this.pitch;
    utterance.volume = options?.volume || this.volume;
    utterance.lang = utterance.voice?.lang || this.defaultLang;
    
    // Gérer les événements
    if (options?.onStart) utterance.onstart = options.onStart;
    if (options?.onEnd) utterance.onend = options.onEnd;
    if (options?.onError) utterance.onerror = options.onError;
    
    // Parler
    this.synthesis.speak(utterance);
  }
  
  public pause(): void {
    if (this.synthesis.speaking) {
      this.synthesis.pause();
    }
  }
  
  public resume(): void {
    if (this.synthesis.paused) {
      this.synthesis.resume();
    }
  }
  
  public cancel(): void {
    this.synthesis.cancel();
  }
  
  public getVoices(): SpeechSynthesisVoice[] {
    return this.voices;
  }
  
  public getFrenchVoices(): SpeechSynthesisVoice[] {
    return this.voices.filter(voice => voice.lang.startsWith('fr'));
  }
  
  public setDefaultVoice(voice: SpeechSynthesisVoice): void {
    this.defaultVoice = voice;
  }
  
  public setRate(rate: number): void {
    this.rate = Math.max(0.1, Math.min(10, rate));
  }
  
  public setPitch(pitch: number): void {
    this.pitch = Math.max(0, Math.min(2, pitch));
  }
  
  public setVolume(volume: number): void {
    this.volume = Math.max(0, Math.min(1, volume));
  }
}

export default SpeechService;
