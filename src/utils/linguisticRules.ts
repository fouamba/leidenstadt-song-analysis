
// Règles linguistiques pour l'analyse des textes

// Types de temps verbaux
export const verbTenses = {
  PRESENT: "présent",
  IMPARFAIT: "imparfait",
  PASSE_COMPOSE: "passé composé",
  PLUS_QUE_PARFAIT: "plus-que-parfait",
  FUTUR_SIMPLE: "futur simple",
  CONDITIONNEL_PRESENT: "conditionnel présent",
  CONDITIONNEL_PASSE: "conditionnel passé",
  SUBJONCTIF_PRESENT: "subjonctif présent",
  SUBJONCTIF_PASSE: "subjonctif passé",
};

// Patterns simplifiés pour détecter les temps verbaux
// Note: Une analyse linguistique complète nécessiterait des outils plus sophistiqués
export const verbPatterns = {
  [verbTenses.IMPARFAIT]: /\b(étais|était|avais|avait|avions|aviez|avaient|étions|étiez|étaient|fallait)\b/i,
  [verbTenses.PLUS_QUE_PARFAIT]: /\b(avais été|était né|avait eu|avions eu|aviez eu|avaient eu)\b/i,
  [verbTenses.CONDITIONNEL_PRESENT]: /\b(serais|serait|serions|seriez|seraient|aurais|aurait|aurions|auriez|auraient)\b/i,
  [verbTenses.CONDITIONNEL_PASSE]: /\b(aurais été|aurait été|aurions été|auriez été|auraient été)\b/i,
  [verbTenses.FUTUR_SIMPLE]: /\b(sera|serons|serez|seront|aura|aurons|aurez|auront|saura)\b/i,
  [verbTenses.SUBJONCTIF_PRESENT]: /\b(soit|soient|ait|aient|épargne)\b/i,
};

// Détecter les temps verbaux dans un texte
export const detectVerbTenses = (text: string): string[] => {
  const detectedTenses: string[] = [];
  
  // Pour chaque pattern de temps verbal
  Object.entries(verbPatterns).forEach(([tense, pattern]) => {
    if (pattern.test(text)) {
      detectedTenses.push(tense);
    }
  });
  
  return detectedTenses;
};

// Types de structures syntaxiques
export const syntaxStructures = {
  PROPOSITION_CONDITIONNELLE: "proposition conditionnelle",
  PROPOSITION_PRINCIPALE: "proposition principale",
  PROPOSITION_INTERROGATIVE: "proposition interrogative",
};

// Détecter les structures syntaxiques (simplifié)
export const detectSyntaxStructure = (text: string): string | null => {
  if (text.toLowerCase().startsWith("si ")) {
    return syntaxStructures.PROPOSITION_CONDITIONNELLE;
  } else if (text.includes("?")) {
    return syntaxStructures.PROPOSITION_INTERROGATIVE;
  } else if (text.match(/^(aurais-je|serions-nous|aurait-il)/i)) {
    return syntaxStructures.PROPOSITION_INTERROGATIVE;
  }
  
  return null;
};
