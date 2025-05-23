// src/factory/ActivityFactory.ts
import { Activity, ActivityType, ActivityConfig } from '../models/activity';
// Importez ici les classes d'activités spécifiques (à créer)
// import { QuizActivity } from '../components/activities/QuizActivity';
// ...

export class ActivityFactory {
  static createActivity(config: ActivityConfig, data: any): Activity {
    switch (config.type) {
      // case 'quiz':
      //   return new QuizActivity(config, data);
      // Ajoutez d'autres types d'activités ici
      default:
        throw new Error(`Activity type ${config.type} not supported`);
    }
  }
}
