# ARCHITECTURE DE BASE DE DONNÉES POUR L'APPLICATION D'APPRENTISSAGE

## BESOINS EN PERSISTANCE DE DONNÉES

### Données à stocker absolument
- **Profils utilisateurs** (élèves, enseignants, administrateurs)
- **Progression des élèves** dans la séquence pédagogique
- **Résultats des activités** et évaluations à chaque étape
- **Productions écrites** des élèves (commentaires, exercices)
- **Paramètres de personnalisation** des parcours par enseignant
- **Historique des interactions** pour analyser les difficultés
- **Forums et contributions collaboratives**
- **Badges et certifications** débloqués

### Données métier complexes
- **Scores détaillés** par compétence et savoir-faire
- **Temps passé** sur chaque activité/écran
- **Parcours de navigation** pour optimiser l'expérience
- **Feedbacks personnalisés** des enseignants
- **Groupes/classes** et leurs configurations
- **Contenus créés** par les enseignants (exercices supplémentaires)

## SOLUTION TECHNIQUE RECOMMANDÉE

### Stack recommandée pour Vercel
```
Frontend: Next.js (déployé sur Vercel)
Base de données: Neon PostgreSQL
ORM: Prisma
Authentification: NextAuth.js ou Clerk
Cache: Redis (Upstash pour Vercel)
Storage fichiers: Vercel Blob ou Cloudinary
```

### Pourquoi Neon + Prisma ?
- **Neon** : PostgreSQL serverless parfaitement compatible avec Vercel
- **Scaling automatique** : S'adapte à la charge sans configuration
- **Latence optimisée** : Edge computing pour des temps de réponse rapides
- **Prisma** : ORM type-safe qui simplifie les requêtes complexes
- **Migrations faciles** : Évolution du schéma de base simplifiée
- **Intégration native** avec TypeScript/Next.js

## SCHÉMA DE BASE DE DONNÉES PROPOSÉ

### Tables principales

```sql
-- Utilisateurs
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role ENUM('student', 'teacher', 'admin') NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Classes/Groupes
CREATE TABLE classes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    teacher_id UUID REFERENCES users(id),
    academic_year VARCHAR(20),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Association élèves-classes
CREATE TABLE class_enrollments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES users(id),
    class_id UUID REFERENCES classes(id),
    enrolled_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(student_id, class_id)
);

-- Séquences pédagogiques
CREATE TABLE sequences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(200) NOT NULL,
    description TEXT,
    total_sessions INTEGER NOT NULL,
    estimated_duration INTEGER, -- en minutes
    difficulty_level ENUM('beginner', 'intermediate', 'advanced'),
    created_by UUID REFERENCES users(id),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Séances de la séquence
CREATE TABLE sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sequence_id UUID REFERENCES sequences(id),
    session_number INTEGER NOT NULL,
    title VARCHAR(200) NOT NULL,
    learning_objectives JSONB, -- Objectifs de savoir et compétence
    estimated_duration INTEGER,
    prerequisites JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Activités/Écrans de chaque séance
CREATE TABLE activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES sessions(id),
    activity_number INTEGER NOT NULL,
    title VARCHAR(200) NOT NULL,
    activity_type ENUM('video', 'quiz', 'text_production', 'interactive', 'evaluation'),
    content JSONB, -- Configuration spécifique de l'activité
    evaluation_criteria JSONB,
    max_points INTEGER DEFAULT 0,
    is_mandatory BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Progression des élèves
CREATE TABLE student_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES users(id),
    sequence_id UUID REFERENCES sequences(id),
    current_session INTEGER DEFAULT 1,
    current_activity INTEGER DEFAULT 1,
    completion_percentage DECIMAL(5,2) DEFAULT 0,
    started_at TIMESTAMP,
    completed_at TIMESTAMP,
    total_time_spent INTEGER DEFAULT 0, -- en secondes
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(student_id, sequence_id)
);

-- Résultats détaillés par activité
CREATE TABLE activity_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES users(id),
    activity_id UUID REFERENCES activities(id),
    score DECIMAL(5,2),
    max_score DECIMAL(5,2),
    time_spent INTEGER, -- en secondes
    attempts_count INTEGER DEFAULT 1,
    response_data JSONB, -- Réponses détaillées de l'élève
    feedback_data JSONB, -- Feedback automatique ou enseignant
    status ENUM('not_started', 'in_progress', 'completed', 'needs_review'),
    completed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Productions écrites des élèves
CREATE TABLE student_productions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES users(id),
    activity_id UUID REFERENCES activities(id),
    title VARCHAR(200),
    content TEXT NOT NULL,
    word_count INTEGER,
    draft_data JSONB, -- Versions brouillons
    evaluation_score DECIMAL(5,2),
    teacher_feedback TEXT,
    peer_reviews JSONB,
    status ENUM('draft', 'submitted', 'evaluated', 'published'),
    submitted_at TIMESTAMP,
    evaluated_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Compétences et savoirs
CREATE TABLE competencies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(50) UNIQUE NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    competency_type ENUM('savoir', 'competence'),
    domain VARCHAR(100), -- Grammaire, Communication, etc.
    level_expected ENUM('initiation', 'apprentissage', 'maitrise'),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Évaluation des compétences par élève
CREATE TABLE competency_assessments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES users(id),
    competency_id UUID REFERENCES competencies(id),
    activity_id UUID REFERENCES activities(id),
    assessment_level ENUM('non_acquis', 'en_cours', 'acquis', 'expert'),
    evidence_data JSONB, -- Preuves de la maîtrise
    assessed_by UUID REFERENCES users(id), -- Évaluateur
    assessed_at TIMESTAMP DEFAULT NOW(),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Forums et discussions
CREATE TABLE forum_topics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sequence_id UUID REFERENCES sequences(id),
    session_id UUID REFERENCES sessions(id),
    title VARCHAR(200) NOT NULL,
    description TEXT,
    created_by UUID REFERENCES users(id),
    is_pinned BOOLEAN DEFAULT false,
    is_locked BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE forum_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    topic_id UUID REFERENCES forum_topics(id),
    author_id UUID REFERENCES users(id),
    content TEXT NOT NULL,
    parent_post_id UUID REFERENCES forum_posts(id), -- Pour les réponses
    upvotes INTEGER DEFAULT 0,
    is_teacher_response BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Badges et certifications
CREATE TABLE badges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(50) UNIQUE NOT NULL,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    icon_url VARCHAR(500),
    criteria JSONB, -- Conditions d'obtention
    rarity ENUM('common', 'uncommon', 'rare', 'epic'),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE student_badges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES users(id),
    badge_id UUID REFERENCES badges(id),
    earned_at TIMESTAMP DEFAULT NOW(),
    evidence_data JSONB,
    UNIQUE(student_id, badge_id)
);

-- Configuration des parcours par enseignant
CREATE TABLE teacher_configurations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    teacher_id UUID REFERENCES users(id),
    sequence_id UUID REFERENCES sequences(id),
    class_id UUID REFERENCES classes(id),
    custom_settings JSONB, -- Paramètres personnalisés
    start_date DATE,
    end_date DATE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW()
);
```

## CONFIGURATION PRISMA

### Fichier `schema.prisma`
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String   @id @default(cuid())
  email         String   @unique
  passwordHash  String?  @map("password_hash")
  firstName     String   @map("first_name")
  lastName      String   @map("last_name")
  role          Role
  createdAt     DateTime @default(now()) @map("created_at")
  updatedAt     DateTime @updatedAt @map("updated_at")

  // Relations
  teachingClasses     Class[]                   @relation("TeacherClasses")
  studentEnrollments  ClassEnrollment[]
  studentProgress     StudentProgress[]
  activityResults     ActivityResult[]
  studentProductions  StudentProduction[]
  competencyAssessments CompetencyAssessment[] @relation("StudentAssessments")
  teacherAssessments  CompetencyAssessment[]   @relation("TeacherAssessments")
  forumPosts          ForumPost[]
  studentBadges       StudentBadge[]
  teacherConfigurations TeacherConfiguration[]
  createdSequences    Sequence[]

  @@map("users")
}

model StudentProgress {
  id                   String    @id @default(cuid())
  studentId            String    @map("student_id")
  sequenceId           String    @map("sequence_id")
  currentSession       Int       @default(1) @map("current_session")
  currentActivity      Int       @default(1) @map("current_activity")
  completionPercentage Decimal   @default(0) @map("completion_percentage")
  startedAt            DateTime? @map("started_at")
  completedAt          DateTime? @map("completed_at")
  totalTimeSpent       Int       @default(0) @map("total_time_spent")
  createdAt            DateTime  @default(now()) @map("created_at")
  updatedAt            DateTime  @updatedAt @map("updated_at")

  // Relations
  student   User     @relation(fields: [studentId], references: [id])
  sequence  Sequence @relation(fields: [sequenceId], references: [id])

  @@unique([studentId, sequenceId])
  @@map("student_progress")
}

// ... autres modèles selon le schéma SQL ci-dessus

enum Role {
  student
  teacher
  admin
}

enum CompetencyType {
  savoir
  competence
}

enum AssessmentLevel {
  non_acquis
  en_cours
  acquis
  expert
}
```

## CONFIGURATION NEON + VERCEL

### Variables d'environnement (.env)
```bash
# Base de données Neon
DATABASE_URL="postgresql://username:password@ep-xxx.neon.tech/dbname?sslmode=require"
DIRECT_URL="postgresql://username:password@ep-xxx.neon.tech/dbname?sslmode=require"

# NextAuth (authentification)
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="https://your-app.vercel.app"

# Cache Redis (optionnel)
REDIS_URL="redis://username:password@xxx.upstash.io:6379"
```

### Package.json dependencies
```json
{
  "dependencies": {
    "@prisma/client": "^5.0.0",
    "prisma": "^5.0.0",
    "next": "^14.0.0",
    "next-auth": "^4.24.0",
    "@next-auth/prisma-adapter": "^1.0.7",
    "bcryptjs": "^2.4.3",
    "zod": "^3.22.0"
  }
}
```

## FONCTIONNALITÉS DE SUIVI AVANCÉES

### Dashboard enseignant
```typescript
// Exemple de requête Prisma pour le tableau de bord enseignant
const getClassProgress = async (classId: string) => {
  return await prisma.user.findMany({
    where: {
      studentEnrollments: {
        some: {
          classId: classId
        }
      }
    },
    include: {
      studentProgress: {
        include: {
          sequence: true
        }
      },
      activityResults: {
        orderBy: {
          createdAt: 'desc'
        }
      },
      competencyAssessments: {
        include: {
          competency: true
        }
      }
    }
  })
}
```

### Analytics de performance
```typescript
// Analyse des points de blocage
const getStuckPoints = async (sequenceId: string) => {
  return await prisma.activityResult.groupBy({
    by: ['activityId'],
    where: {
      activity: {
        session: {
          sequenceId: sequenceId
        }
      },
      attemptsCount: {
        gt: 3
      }
    },
    _count: {
      studentId: true
    },
    _avg: {
      timeSpent: true,
      score: true
    }
  })
}
```

## ALTERNATIVES ET CONSIDÉRATIONS

### Si budget limité
- **Supabase** : Alternative gratuite avec PostgreSQL + Auth intégrée
- **PlanetScale** : MySQL serverless avec branchement de schéma
- **Railway** : Solution PostgreSQL simple avec déploiement facile

### Pour les gros volumes
- **Redis** pour le cache des sessions actives
- **CDN** pour les ressources multimédia (vidéos, audio)
- **Queue system** pour les traitements lourds (analyse de texte)

### Sauvegarde et sécurité
- **Backups automatiques** via Neon
- **Chiffrement des données sensibles** (mots de passe, infos personnelles)
- **Logs d'audit** pour traçabilité des actions enseignants
- **RGPD compliance** pour protection des données élèves

## COÛTS ESTIMÉS

### Neon (PostgreSQL)
- **Gratuit** : Jusqu'à 10 Go, 1 branche
- **Pro** : 19$/mois - 100 Go, branches illimitées
- **Scale** : Usage-based pour gros volumes

### Vercel
- **Hobby** : Gratuit pour projets personnels
- **Pro** : 20$/mois pour usage commercial
- **Enterprise** : Sur devis pour institutions

La combinaison Neon + Prisma + Vercel est donc **techniquement et économiquement viable** pour votre projet, avec une scalabilité excellente et une intégration native parfaite.