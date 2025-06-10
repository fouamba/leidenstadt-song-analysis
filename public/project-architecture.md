# Architecture du projet "Né en 17 à Leidenstadt"

```
src/
├── app/                    # Organisation basée sur les routes/pages
│   ├── accueil/
│   ├── tableau-de-bord/
│   ├── seance-1/
│   │   ├── page.tsx        # Page principale
│   │   ├── ecran-1-1/      # Sous-composants pour chaque écran
│   │   ├── ecran-1-2/
│   │   └── ...
│   ├── seance-2/
│   ├── seance-3/
│   ├── seance-4/
│   ├── ressources/
│   ├── enseignant/
│   └── layout.tsx          # Layout commun
│
├── components/             # Composants réutilisables
│   ├── ui/                 # Composants d'UI (shadcn)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── ...
│   ├── audio-player/
│   ├── quiz/
│   ├── text-annotation/
│   ├── drag-drop/
│   ├── progress-tracker/
│   └── ...
│
├── contexts/               # Contextes React pour état global
│   ├── AuthContext.tsx     # Gestion de l'authentification
│   ├── ProgressContext.tsx # Suivi de la progression
│   ├── UserContext.tsx     # Données utilisateur
│   └── ...
│
├── hooks/                  # Hooks personnalisés
│   ├── useAudio.ts
│   ├── useProgress.ts
│   ├── useQuiz.ts
│   └── ...
│
├── lib/                    # Logique métier et utilitaires
│   ├── api/                # Client API
│   │   ├── auth.ts
│   │   ├── progress.ts
│   │   └── ...
│   ├── utils/              # Fonctions utilitaires
│   │   ├── text-analysis.ts
│   │   ├── language-tools.ts
│   │   └── ...
│   └── data/               # Données statiques
│       ├── chanson.ts      # Paroles et métadonnées
│       ├── quiz-data.ts    # Questions et réponses
│       └── ...
│
├── services/               # Services externes
│   ├── audio-service.ts
│   ├── analytics-service.ts
│   ├── storage-service.ts
│   └── ...
│
├── styles/                 # Styles globaux
│   ├── globals.css         # Styles Tailwind
│   └── ...
│
├── types/                  # Types TypeScript
│   ├── user.ts
│   ├── progress.ts
│   ├── quiz.ts
│   └── ...
│
├── main.tsx                # Point d'entrée
└── App.tsx                 # Composant racine
```
