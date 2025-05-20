
import { useParams, Link } from "react-router-dom";
import { NavigationBar } from "@/components/NavigationBar";
import { seances } from "@/lib/data";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { VoiceInstruction } from "@/components/audio/VoiceInstruction";
import { useVoicePreferences } from "@/contexts/VoicePreferencesContext";

const Seance = () => {
  const { id } = useParams<{ id: string }>();
  const seanceId = parseInt(id || "1");
  const seance = seances.find(s => s.id === seanceId);
  const { voiceEnabled } = useVoicePreferences();

  // Navigation vers la séance précédente/suivante
  const prevSeance = seances.find(s => s.id === seanceId - 1);
  const nextSeance = seances.find(s => s.id === seanceId + 1);

  if (!seance) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <NavigationBar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Séance non trouvée</h1>
          <p className="mb-6">La séance que vous recherchez n'existe pas.</p>
          <Link to="/" className="text-blue-600 hover:underline">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  const introductionText = `Bienvenue à la séance ${seance.id}: ${seance.title}. 
    Cette séance dure ${seance.duration} et vise à ${seance.objectives.skill}. 
    Explorez les différentes phases et suivez les instructions pour progresser dans votre apprentissage.`;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavigationBar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <header className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center text-sm text-slate-500">
                <Clock className="w-4 h-4 mr-1" />
                <span>{seance.duration}</span>
              </div>
              <div className="flex space-x-2">
                {prevSeance && (
                  <Link 
                    to={`/seance/${prevSeance.id}`}
                    className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Séance précédente
                  </Link>
                )}
                {nextSeance && (
                  <Link 
                    to={`/seance/${nextSeance.id}`}
                    className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
                  >
                    Séance suivante
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                )}
              </div>
            </div>
            
            <h1 className="text-3xl font-bold flex items-center">
              Séance {seance.id}: {seance.title}
              {voiceEnabled && (
                <div className="ml-2">
                  <VoiceInstruction text={introductionText} visuallyHidden={true} />
                </div>
              )}
            </h1>
          </header>
          
          <section className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Objectifs spécifiques</h2>
            <div className="space-y-3 pl-4">
              <div className="flex">
                <span className="font-medium min-w-36">Objectif de savoir:</span>
                <span>{seance.objectives.knowledge}</span>
              </div>
              <div className="flex">
                <span className="font-medium min-w-36">Objectif de compétence:</span>
                <span>{seance.objectives.skill}</span>
              </div>
            </div>
          </section>
          
          <section className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-6">Déroulement de la séance ({seance.duration})</h2>
            
            <div className="space-y-8">
              {seance.phases.map((phase) => (
                <div key={phase.id} className="border-l-4 border-blue-500 pl-4 py-1">
                  <h3 className="text-lg font-medium mb-2 flex items-center">
                    Phase {phase.id}: {phase.title} ({phase.duration})
                    {voiceEnabled && (
                      <div className="ml-2">
                        <VoiceInstruction 
                          text={`Phase ${phase.id}: ${phase.title}. ${phase.content.join('. ')}`} 
                          visuallyHidden={true} 
                        />
                      </div>
                    )}
                  </h3>
                  <ul className="space-y-2 pl-5 list-disc">
                    {phase.content.map((item, index) => (
                      <li key={index} className={item.startsWith("-") ? "ml-4 list-none" : ""}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Évaluation</h2>
              <p className="text-slate-700">{seance.assessment}</p>
            </section>
            
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Prolongement</h2>
              <p className="text-slate-700">{seance.extension}</p>
            </section>
          </div>
          
          <div className="flex justify-between mt-8">
            <Link to="/" className="text-blue-600 hover:text-blue-800">
              Retour à l'accueil
            </Link>
            
            <div className="flex space-x-4">
              {prevSeance && (
                <Link 
                  to={`/seance/${prevSeance.id}`}
                  className="inline-flex items-center text-blue-600 hover:text-blue-800"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Séance {prevSeance.id}
                </Link>
              )}
              {nextSeance && (
                <Link 
                  to={`/seance/${nextSeance.id}`}
                  className="inline-flex items-center text-blue-600 hover:text-blue-800"
                >
                  Séance {nextSeance.id}
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-slate-900 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">Application éducative basée sur les compétences - "Né en 17 à Leidenstadt"</p>
        </div>
      </footer>
    </div>
  );
};

export default Seance;
