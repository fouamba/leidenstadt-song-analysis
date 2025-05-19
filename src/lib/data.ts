
import { Seance } from "./types";

export const lyrics = `Et si j'étais né en 17 à Leidenstadt
Sur les ruines d'un champ de bataille
Aurais-je été meilleur ou pire que ces gens
Si j'avais été allemand?

Bercé d'humiliation, de haine et d'ignorance
Nourri de rêves de revanche
Aurais-je été de ces improbables consciences
Larmes au milieu d'un torrent

Si j'avais grandi dans les docklands de Belfast
Soldat d'une foi, d'une caste
Aurais-je eu la force envers et contre les miens
De trahir, tendre une main

Si j'étais née blanche et riche à Johannesburg
Entre le pouvoir et la peur
Aurais-je entendu ces cris portés par le vent
Rien ne sera comme avant

On saura jamais ce qu'on a vraiment dans nos ventres
Caché derrière nos apparences
L'âme d'un brave ou d'un complice ou d'un bourreau?
Ou le pire, ou le plus beau?
Serions-nous de ceux qui résistent ou bien les moutons d'un troupeau
S'il fallait plus que des mots?

Et si j'étais né en 17 à Leidenstadt
Sur les ruines d'un champ de bataille
Aurais-je été meilleur ou pire que ces gens
Si j'avais été allemand?
Mais qu'on nous épargne à toi et moi si possible très longtemps
D'avoir à choisir un camp`;

export const historicalContext = `Jean-Jacques Goldman, auteur-compositeur-interprète français né en 1951, est d'origine juive polonaise par son père et allemande par sa mère. Cette double origine a probablement nourri sa réflexion sur les déterminismes historiques et les choix moraux individuels.

La chanson "Né en 17 à Leidenstadt" fait partie de l'album "Fredericks Goldman Jones" paru en 1990, fruit de la collaboration entre Jean-Jacques Goldman, Carole Fredericks (chanteuse américaine) et Michael Jones (guitariste gallois).

"Leidenstadt" est une ville imaginaire dont le nom est formé des mots allemands "Leiden" (souffrance) et "Stadt" (ville). Cette "ville de la souffrance" symbolise les lieux marqués par l'Histoire et les conflits.

Les trois situations évoquées dans la chanson correspondent aux origines des trois interprètes :
- L'Allemagne d'après-guerre (Goldman, d'origine allemande par sa mère)
- L'Irlande du Nord (Jones, britannique du Pays de Galles)
- L'Afrique du Sud de l'apartheid (Fredericks, afro-américaine)`;

export const syntaxStructure = `Structure type : Proposition subordonnée conditionnelle + Proposition principale interrogative

Si + Sujet + Verbe à l'imparfait/plus-que-parfait + Complément
↓
Sujet + Verbe au conditionnel présent/passé + Complément + ?

Exemple :
Si j'étais né en 17 à Leidenstadt
↓
Aurais-je été meilleur ou pire que ces gens ?`;

export const seances: Seance[] = [
  {
    id: 1,
    title: "Découverte et compréhension globale de l'œuvre",
    duration: "120 minutes",
    objectives: {
      skill: "Comprendre le message global de la chanson et son contexte historique",
      knowledge: "Identifier les temps verbaux dominants dans la chanson"
    },
    phases: [
      {
        id: 1,
        title: "Mise en situation",
        duration: "30 min",
        content: [
          "Écoute intégrale de la chanson sans le texte (2 fois)",
          "Recueil des premières impressions des élèves (émotions ressenties, thèmes perçus)",
          "Discussion guidée sur le titre : \"Que peut signifier 'Né en 17 à Leidenstadt' ?\"",
          "Présentation succincte du contexte de création et des auteurs-interprètes"
        ]
      },
      {
        id: 2,
        title: "Découverte du texte",
        duration: "45 min",
        content: [
          "Distribution du texte et relecture collective",
          "Identification des principaux champs lexicaux (guerre, souffrance, choix moral)",
          "Repérage des trois situations historiques évoquées :",
          "- L'Allemagne post-Première Guerre mondiale et la montée du nazisme",
          "- Le conflit nord-irlandais entre catholiques et protestants",
          "- L'apartheid en Afrique du Sud",
          "Explication des références historiques nécessaires à la compréhension"
        ]
      },
      {
        id: 3,
        title: "Premier niveau d'analyse linguistique",
        duration: "30 min",
        content: [
          "Repérage collectif des principaux temps et modes verbaux utilisés",
          "Activité en groupes : souligner dans le texte avec des couleurs différentes :",
          "- Les verbes à l'imparfait (bleu)",
          "- Les verbes au conditionnel présent (rouge)",
          "- Les verbes au conditionnel passé (vert)",
          "- Les constructions \"si + imparfait/plus-que-parfait\" (jaune)",
          "Mise en commun et première observation sur la structure récurrente \"Si j'étais/j'avais... aurais-je...\""
        ]
      },
      {
        id: 4,
        title: "Synthèse et évaluation",
        duration: "15 min",
        content: [
          "Élaboration collective d'une première interprétation du message de la chanson",
          "Évaluation formative : Rédaction individuelle d'un court paragraphe répondant à la question : \"Quel est, selon vous, le message principal que Jean-Jacques Goldman souhaite transmettre dans cette chanson ?\""
        ]
      }
    ],
    assessment: "Rédaction individuelle d'un court paragraphe répondant à la question : \"Quel est, selon vous, le message principal que Jean-Jacques Goldman souhaite transmettre dans cette chanson ?\"",
    extension: "Recherche documentaire pour la prochaine séance : trouver des informations sur l'un des trois contextes historiques évoqués dans la chanson."
  },
  {
    id: 2,
    title: "L'expression du passé par les temps de l'indicatif",
    duration: "120 minutes",
    objectives: {
      skill: "Comprendre comment les temps du passé participent à la construction du sens dans un texte narratif",
      knowledge: "Maîtriser l'emploi et les valeurs de l'imparfait et du plus-que-parfait de l'indicatif"
    },
    phases: [
      {
        id: 1,
        title: "Rappel et mise en situation",
        duration: "20 min",
        content: [
          "Retour sur les observations de la séance précédente",
          "Écoute ciblée du premier couplet de la chanson",
          "Questionnement : \"Pourquoi l'auteur utilise-t-il l'imparfait dans 'Si j'étais né en 17 à Leidenstadt' et non le présent ?\""
        ]
      },
      {
        id: 2,
        title: "Construction des savoirs",
        duration: "50 min",
        content: [
          "Travail sur corpus : extraction de toutes les phrases avec l'imparfait et le plus-que-parfait",
          "- \"Et si j'étais né en 17 à Leidenstadt\"",
          "- \"Si j'avais été allemand\"",
          "- \"Si j'avais grandi dans les docklands de Belfast\"",
          "- \"Si j'étais née blanche et riche à Johannesburg\"",
          "Activité guidée : classement des différentes valeurs de l'imparfait et du plus-que-parfait",
          "- Valeur d'irréel du présent (imparfait)",
          "- Valeur d'irréel du passé (plus-que-parfait)",
          "- Antériorité relative (plus-que-parfait)",
          "Exercices d'application : transformation de phrases au présent vers l'imparfait et analyse du changement de sens"
        ]
      },
      {
        id: 3,
        title: "Approfondissement",
        duration: "35 min",
        content: [
          "Étude des effets stylistiques produits par l'utilisation de ces temps",
          "Réflexion guidée : \"Comment l'utilisation de l'imparfait dans 'si j'étais né' crée-t-elle une distanciation avec le réel ?\"",
          "Exercice de production : réécriture d'un passage de la chanson en changeant les temps verbaux et analyse des modifications de sens"
        ]
      },
      {
        id: 4,
        title: "Synthèse et évaluation",
        duration: "15 min",
        content: [
          "Construction collective d'une fiche synthétique sur les valeurs de l'imparfait et du plus-que-parfait",
          "Évaluation formative : Exercice individuel d'identification et d'explication des valeurs de l'imparfait et du plus-que-parfait dans un extrait d'un autre texte"
        ]
      }
    ],
    assessment: "Exercice individuel d'identification et d'explication des valeurs de l'imparfait et du plus-que-parfait dans un extrait d'un autre texte",
    extension: "Relevé d'expressions ou extraits d'autres chansons ou poèmes utilisant l'imparfait et le plus-que-parfait à valeur hypothétique."
  },
  {
    id: 3,
    title: "L'expression du possible et de l'hypothétique avec le mode conditionnel",
    duration: "120 minutes",
    objectives: {
      skill: "Analyser comment le conditionnel contribue à exprimer des questionnements philosophiques et moraux",
      knowledge: "Maîtriser l'emploi et les valeurs du conditionnel présent et passé"
    },
    phases: [
      {
        id: 1,
        title: "Rappel et mise en situation",
        duration: "20 min",
        content: [
          "Retour sur les temps de l'indicatif étudiés précédemment",
          "Écoute ciblée des passages de la chanson au conditionnel",
          "Questionnement : \"Pourquoi l'auteur utilise-t-il le conditionnel dans 'Aurais-je été meilleur ou pire que ces gens' ?\""
        ]
      },
      {
        id: 2,
        title: "Construction des savoirs",
        duration: "50 min",
        content: [
          "Travail sur corpus : extraction de toutes les phrases au conditionnel",
          "- \"Aurais-je été meilleur ou pire que ces gens\"",
          "- \"Aurais-je été de ces improbables consciences\"",
          "- \"Aurais-je eu la force envers et contre les miens\"",
          "- \"Aurais-je entendu ces cris portés par le vent\"",
          "- \"Serions-nous de ceux qui résistent ou bien les moutons d'un troupeau\"",
          "Activité guidée : classement des différentes valeurs du conditionnel",
          "- Valeur d'hypothèse (conditionnel présent et passé)",
          "- Valeur de potentiel (conditionnel présent)",
          "- Valeur d'irréel (conditionnel passé)",
          "Exercices d'application : transformation de phrases pour exprimer différents degrés de probabilité"
        ]
      },
      {
        id: 3,
        title: "Approfondissement",
        duration: "35 min",
        content: [
          "Analyse de l'effet rhétorique des questions au conditionnel",
          "Étude du lien entre la forme interrogative et le conditionnel dans la chanson",
          "Exercice de production : rédaction de questions au conditionnel sur le modèle de la chanson, exprimant des dilemmes moraux contemporains"
        ]
      },
      {
        id: 4,
        title: "Synthèse et évaluation",
        duration: "15 min",
        content: [
          "Construction collective d'une fiche synthétique sur les valeurs du conditionnel présent et passé",
          "Évaluation formative : À partir d'un fait historique récent, rédaction d'un court paragraphe utilisant le conditionnel pour exprimer un questionnement moral similaire à ceux de la chanson"
        ]
      }
    ],
    assessment: "À partir d'un fait historique récent, rédaction d'un court paragraphe utilisant le conditionnel pour exprimer un questionnement moral similaire à ceux de la chanson",
    extension: "Recherche d'autres textes littéraires ou chansons utilisant le conditionnel pour exprimer des questionnements éthiques."
  },
  {
    id: 4,
    title: "La phrase complexe et la communication artistique",
    duration: "120 minutes",
    objectives: {
      skill: "Produire un commentaire composé sur la chanson, intégrant l'analyse linguistique et l'interprétation du message",
      knowledge: "Analyser la structure syntaxique des phrases complexes avec proposition conditionnelle"
    },
    phases: [
      {
        id: 1,
        title: "Rappel et mise en situation",
        duration: "15 min",
        content: [
          "Synthèse des acquis des séances précédentes",
          "Écoute intégrale de la chanson avec une attention particulière à la structure des phrases"
        ]
      },
      {
        id: 2,
        title: "Construction des savoirs",
        duration: "45 min",
        content: [
          "Analyse structurelle des phrases complexes de la chanson",
          "Étude du système hypothétique : \"si + imparfait/plus-que-parfait → conditionnel présent/passé\"",
          "Schématisation au tableau des structures syntaxiques récurrentes",
          "Exercice de manipulation : transformation des structures pour mesurer l'effet sur le sens"
        ]
      },
      {
        id: 3,
        title: "Interprétation globale de l'œuvre",
        duration: "30 min",
        content: [
          "Discussion guidée sur les dimensions philosophiques de la chanson :",
          "- Le déterminisme historique et social",
          "- La responsabilité individuelle",
          "- L'universalité des questionnements moraux",
          "Mise en relation de la forme (structures syntaxiques, temps verbaux) avec le fond (message philosophique)",
          "Analyse du dernier couplet comme synthèse et ouverture"
        ]
      },
      {
        id: 4,
        title: "Production et évaluation finale",
        duration: "30 min",
        content: [
          "Évaluation sommative : Rédaction individuelle d'un commentaire composé sur la chanson, comprenant :",
          "- Une analyse des procédés linguistiques (temps, modes, structures syntaxiques)",
          "- Une interprétation du message et des valeurs véhiculées",
          "- Une réflexion personnelle sur la portée contemporaine de ce message",
          "Le commentaire devra montrer la capacité de l'élève à :",
          "- Identifier et expliquer les choix linguistiques de l'auteur",
          "- Comprendre comment ces choix véhiculent le message de la chanson",
          "- Porter un regard critique et personnel sur l'œuvre"
        ]
      }
    ],
    assessment: "Rédaction individuelle d'un commentaire composé sur la chanson, comprenant une analyse linguistique, une interprétation du message et une réflexion personnelle.",
    extension: "Proposition d'un projet créatif : écriture d'un couplet supplémentaire sur le même modèle syntaxique, évoquant un autre contexte historique ou contemporain de conflit moral."
  }
];

export const sequenceInfo = {
  level: "Classes de 3ème (Collège) / Seconde (Lycée)",
  subject: "Français",
  duration: "4 séances de 2 heures chacune",
  mainSupport: "Chanson \"Né en 17 à Leidenstadt\" - Jean-Jacques Goldman (Album \"Fredericks Goldman Jones\", 1990)",
  skillObjective: "À l'issue de cette séquence, l'élève sera capable d'analyser un texte de chanson à portée historique et philosophique en identifiant les procédés linguistiques qui véhiculent son message et en interprétant les valeurs exprimées, pour en produire un commentaire personnel argumenté.",
  knowledgeObjectives: [
    "Maîtriser l'emploi et les valeurs des temps de l'indicatif (imparfait, plus-que-parfait) dans l'expression du passé",
    "Comprendre et utiliser le mode conditionnel (présent et passé) pour exprimer le possible et l'hypothétique",
    "Analyser la structure syntaxique de phrases complexes avec proposition principale et subordonnée conditionnelle",
    "Développer des compétences d'interprétation d'une œuvre artistique au croisement de la poésie et de la musique"
  ],
  prerequisites: [
    "Notions de base sur les temps et modes verbaux",
    "Capacité à distinguer proposition principale et proposition subordonnée",
    "Connaissances historiques générales sur les grands conflits du XXe siècle"
  ],
  materials: [
    "Enregistrement audio de la chanson \"Né en 17 à Leidenstadt\"",
    "Texte imprimé de la chanson pour chaque élève",
    "Tableau (noir ou blanc) et craies/marqueurs",
    "Fiches d'exercices pour chaque séance",
    "Projecteur et ordinateur (si disponible)"
  ],
  globalLearningContext: "La séquence s'organise autour d'une situation authentique de communication artistique : la découverte, l'analyse et l'interprétation d'une chanson à forte portée historique et philosophique. Les élèves sont placés dans la position de critiques musicaux devant rédiger une analyse approfondie de cette œuvre pour un magazine culturel. Cette situation englobante donne du sens aux apprentissages linguistiques qui seront développés tout au long de la séquence."
};
