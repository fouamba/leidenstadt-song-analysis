
import { QuizQuestion } from '@/components/activities/InteractiveQuiz';

export const seance1QuizQuestions: QuizQuestion[] = [
  {
    id: 'context_identification',
    text: 'Dans quel contexte historique se déroule la chanson "Né en 17 à Leidenstadt" ?',
    type: 'single',
    choices: [
      { id: 'ww1', text: 'Première Guerre mondiale', isCorrect: false },
      { id: 'weimar', text: 'République de Weimar (Allemagne post-1918)', isCorrect: true },
      { id: 'ww2', text: 'Seconde Guerre mondiale', isCorrect: false },
      { id: 'cold_war', text: 'Guerre froide', isCorrect: false }
    ],
    explanation: 'La chanson évoque la naissance en 1917 à Leidenstadt, faisant référence à la période troublée de l\'Allemagne post-Première Guerre mondiale, marquée par l\'instabilité de la République de Weimar.',
    points: 10
  },
  {
    id: 'verb_tenses',
    text: 'Quels temps verbaux dominent dans la chanson pour exprimer l\'irréel du passé ?',
    type: 'multiple',
    choices: [
      { id: 'imparfait', text: 'Imparfait ("Si j\'étais né...")', isCorrect: true },
      { id: 'passe_compose', text: 'Passé composé', isCorrect: false },
      { id: 'plus_que_parfait', text: 'Plus-que-parfait ("avait eu")', isCorrect: true },
      { id: 'conditionnel', text: 'Conditionnel ("aurais-je été")', isCorrect: true },
      { id: 'present', text: 'Présent de l\'indicatif', isCorrect: false }
    ],
    explanation: 'La chanson utilise un système hypothétique complexe avec l\'imparfait dans la subordonnée (Si j\'étais né), le conditionnel dans la principale (aurais-je été), et le plus-que-parfait pour marquer l\'antériorité.',
    points: 15
  },
  {
    id: 'theme_analysis',
    text: 'Quel est le thème philosophique central de la chanson ?',
    type: 'single',
    choices: [
      { id: 'war_horror', text: 'L\'horreur de la guerre', isCorrect: false },
      { id: 'determinism', text: 'Le déterminisme social et historique', isCorrect: true },
      { id: 'love_story', text: 'Une histoire d\'amour impossible', isCorrect: false },
      { id: 'nostalgia', text: 'La nostalgie du passé', isCorrect: false }
    ],
    explanation: 'Goldman interroge l\'influence du contexte historique et social sur nos choix et notre destinée. La chanson questionne notre capacité à échapper au déterminisme de notre époque et notre lieu de naissance.',
    points: 10
  },
  {
    id: 'textual_analysis',
    text: 'Complétez cette phrase emblématique : "Si j\'étais né en 17 à Leidenstadt, _______________"',
    type: 'text',
    correctAnswer: 'aurais-je été plus heureux',
    explanation: 'Cette interrogation rhétorique synthétise le questionnement existentiel de la chanson sur l\'influence du contexte de naissance sur notre bonheur et notre destinée.',
    points: 5
  }
];

export const seance4QuizQuestions: QuizQuestion[] = [
  {
    id: 'syntax_structure',
    text: 'Quelle est la structure syntaxique dominante dans "Né en 17 à Leidenstadt" ?',
    type: 'single',
    choices: [
      { id: 'simple_sentences', text: 'Les phrases simples juxtaposées', isCorrect: false },
      { id: 'relative_clauses', text: 'Les propositions relatives', isCorrect: false },
      { id: 'conditional_hypothetical', text: 'Les subordonnées conditionnelles avec hypothèse irréelle', isCorrect: true },
      { id: 'exclamatory', text: 'Les phrases exclamatives', isCorrect: false }
    ],
    explanation: 'La chanson repose principalement sur des structures conditionnelles exprimant l\'irréel du passé ("Si j\'étais né..."), ce qui crée l\'effet stylistique de distance et de questionnement philosophique.',
    points: 10
  },
  {
    id: 'philosophical_responsibility',
    text: 'Selon votre analyse de la chanson, quel est le niveau de responsabilité individuelle face au déterminisme historique ?',
    type: 'single',
    choices: [
      { id: 'total_determinism', text: 'Déterminisme total : nous sommes entièrement conditionnés', isCorrect: false },
      { id: 'total_freedom', text: 'Liberté totale : le contexte n\'influence pas nos choix', isCorrect: false },
      { id: 'nuanced_view', text: 'Vision nuancée : influence forte du contexte mais liberté résiduelle', isCorrect: true },
      { id: 'no_influence', text: 'Le contexte historique n\'a aucune influence', isCorrect: false }
    ],
    explanation: 'Goldman présente une vision nuancée où le contexte historique influence fortement nos choix sans pour autant les déterminer entièrement. Le questionnement même ("aurais-je été...") suggère une part d\'incertitude et donc de liberté.',
    points: 15
  }
];
