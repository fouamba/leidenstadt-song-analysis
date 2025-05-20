
export class VocalFeedbackGenerator {
  private static positiveFeedbacks = [
    "Excellente réponse !",
    "Très bien ! Tu as parfaitement compris.",
    "Bravo pour cette réponse pertinente !",
    "C'est exactement ça !",
    "Parfait ! Tu maîtrises bien ce concept."
  ];
  
  private static encouragementFeedbacks = [
    "Tu es sur la bonne voie, mais essaie d'approfondir.",
    "Pas mal, mais il y a encore un élément à trouver.",
    "C'est un bon début, continue !",
    "Tu t'approches de la réponse correcte.",
    "Cette réponse contient une partie de la vérité."
  ];
  
  private static redirectionFeedbacks = [
    "Pas tout à fait, réfléchis au rapport avec le contexte historique.",
    "Essaie de repenser à l'utilisation des temps dans la chanson.",
    "Revois les paroles du deuxième couplet pour t'aider.",
    "N'oublie pas de considérer le point de vue du narrateur.",
    "Regarde attentivement la construction des phrases conditionnelles."
  ];
  
  static generateFeedback(score: number, context?: 'grammar' | 'history' | 'analysis'): string {
    let feedbacks;
    
    if (score >= 0.8) {
      feedbacks = this.positiveFeedbacks;
    } else if (score >= 0.5) {
      feedbacks = this.encouragementFeedbacks;
    } else {
      feedbacks = this.redirectionFeedbacks;
    }
    
    // Sélectionner un feedback aléatoire
    const randomIndex = Math.floor(Math.random() * feedbacks.length);
    let feedback = feedbacks[randomIndex];
    
    // Ajouter un conseil contextuel si nécessaire
    if (context && score < 0.8) {
      feedback += ' ' + this.getContextualHint(context);
    }
    
    return feedback;
  }
  
  private static getContextualHint(context: 'grammar' | 'history' | 'analysis'): string {
    switch (context) {
      case 'grammar':
        return "Fais attention aux temps verbaux utilisés et à leur valeur.";
      case 'history':
        return "Rappelle-toi des événements historiques mentionnés dans la chanson.";
      case 'analysis':
        return "Pense au message global que l'auteur veut transmettre.";
      default:
        return "";
    }
  }
  
  static generateProgressFeedback(progress: number): string {
    if (progress >= 0.9) {
      return "Félicitations ! Tu as presque terminé cette partie avec excellence !";
    } else if (progress >= 0.7) {
      return "Tu avances très bien dans ton apprentissage. Continue sur cette lancée !";
    } else if (progress >= 0.5) {
      return "Tu progresses régulièrement. Ne te décourage pas, tu es à mi-chemin !";
    } else if (progress >= 0.3) {
      return "Tu as commencé ton parcours. Avec de la persévérance, tu vas y arriver !";
    } else {
      return "Bienvenue dans ce parcours d'apprentissage. Chaque étape compte, prends ton temps.";
    }
  }
}
