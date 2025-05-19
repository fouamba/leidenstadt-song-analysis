
export interface Seance {
  id: number;
  title: string;
  duration: string;
  objectives: {
    skill: string;
    knowledge: string;
  };
  phases: {
    id: number;
    title: string;
    duration: string;
    content: string[];
  }[];
  assessment: string;
  extension: string;
}
