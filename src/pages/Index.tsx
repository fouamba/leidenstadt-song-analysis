
import { NavigationBar } from "@/components/NavigationBar";
import { seances, sequenceInfo } from "@/lib/data";
import { SeanceCard } from "@/components/SeanceCard";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavigationBar />
      
      <main className="flex-grow">
        {/* Hero section */}
        <section className="bg-gradient-to-b from-slate-800 to-slate-900 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-4">Né en 17 à Leidenstadt</h1>
              <p className="text-xl mb-8">Une approche pédagogique par situations (APS) autour de la chanson de Jean-Jacques Goldman</p>
              
              <div className="mt-8 mb-10">
                <div className="aspect-video rounded-md overflow-hidden bg-gray-100 relative">
                  <video
                    src="/Comprendre la chanson _Né en 17 à Leidenstadt_.mp4"
                    controls
                    className="w-full h-full object-cover"
                    poster="/leidenstadt_accueil.jpg"
                  >
                    Votre navigateur ne supporte pas la lecture vidéo.
                  </video>
                </div>
              </div>
              
              <div className="mt-6 inline-block bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                <h2 className="text-xl font-semibold mb-3">Présentation de la séquence</h2>
                <p className="text-white/90 mb-4">
                  {sequenceInfo.globalLearningContext}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left text-sm">
                  <div>
                    <p className="font-semibold">Niveau: <span className="font-normal">{sequenceInfo.level}</span></p>
                    <p className="font-semibold">Discipline: <span className="font-normal">{sequenceInfo.subject}</span></p>
                    <p className="font-semibold">Durée: <span className="font-normal">{sequenceInfo.duration}</span></p>
                  </div>
                  <div>
                    <p className="font-semibold">Support principal:</p>
                    <p className="font-normal">{sequenceInfo.mainSupport}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Objectifs section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Objectifs de la séquence</h2>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-3">Objectif de compétence (terminal)</h3>
                <p className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
                  {sequenceInfo.skillObjective}
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3">Objectifs de savoirs (intermédiaires)</h3>
                <ul className="space-y-2 pl-4">
                  {sequenceInfo.knowledgeObjectives.map((objective, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-500 font-bold mr-2">•</span>
                      <span>{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        {/* Séances section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-10 text-center">Les 4 séances de la séquence</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {seances.map((seance) => (
                <SeanceCard key={seance.id} seance={seance} />
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-slate-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p>Application éducative basée sur les compétences - Chanson "Né en 17 à Leidenstadt" de Jean-Jacques Goldman</p>
            <p className="mt-2 text-slate-400 text-sm">© 2025 - Approche par situations (APS)</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
