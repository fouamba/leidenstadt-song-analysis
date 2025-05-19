
import { Seance } from "@/lib/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { Link } from "react-router-dom";

interface SeanceCardProps {
  seance: Seance;
}

export function SeanceCard({ seance }: SeanceCardProps) {
  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-start gap-2">
          <span>Séance {seance.id}: {seance.title}</span>
        </CardTitle>
        <CardDescription className="flex items-center text-sm mt-1">
          <Clock className="w-4 h-4 mr-1" />
          <span>{seance.duration}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="grow">
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-sm mb-1">Objectifs :</h4>
            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
              <li><span className="font-medium">Compétence:</span> {seance.objectives.skill}</li>
              <li><span className="font-medium">Savoir:</span> {seance.objectives.knowledge}</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-sm mb-1">Phases principales :</h4>
            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
              {seance.phases.map((phase) => (
                <li key={phase.id}>
                  {phase.title} ({phase.duration})
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2 border-t flex justify-end">
        <Link 
          to={`/seance/${seance.id}`}
          className="text-blue-600 hover:text-blue-800 font-medium text-sm"
        >
          Voir le détail
        </Link>
      </CardFooter>
    </Card>
  );
}
