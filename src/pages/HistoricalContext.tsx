
import { NavigationBar } from "@/components/NavigationBar";
import { historicalContext, syntaxStructure } from "@/lib/data";

const HistoricalContext = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavigationBar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Contexte historique et artistique</h1>
          
          <section className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="prose max-w-none">
              {historicalContext.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
          
          <section className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Schéma de la structure syntaxique récurrente</h2>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-md font-mono text-sm whitespace-pre-line">
              {syntaxStructure}
            </div>
          </section>

          <section className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Les trois situations évoquées</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">L'Allemagne post-Première Guerre mondiale</h3>
                <p className="text-sm text-slate-700">
                  La chanson évoque la montée du nazisme dans le contexte de l'humiliation et des difficultés économiques suite au traité de Versailles.
                </p>
                <div className="mt-2 text-sm italic text-slate-600">
                  "Et si j'étais né en 17 à Leidenstadt
                  <br />
                  Sur les ruines d'un champ de bataille"
                </div>
              </div>
              
              <div className="bg-slate-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Le conflit nord-irlandais</h3>
                <p className="text-sm text-slate-700">
                  Référence aux tensions entre catholiques et protestants pendant les "Troubles" en Irlande du Nord.
                </p>
                <div className="mt-2 text-sm italic text-slate-600">
                  "Si j'avais grandi dans les docklands de Belfast
                  <br />
                  Soldat d'une foi, d'une caste"
                </div>
              </div>
              
              <div className="bg-slate-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">L'apartheid en Afrique du Sud</h3>
                <p className="text-sm text-slate-700">
                  Évocation du régime de ségrégation raciale qui a sévi en Afrique du Sud jusqu'au début des années 1990.
                </p>
                <div className="mt-2 text-sm italic text-slate-600">
                  "Si j'étais née blanche et riche à Johannesburg
                  <br />
                  Entre le pouvoir et la peur"
                </div>
              </div>
            </div>
          </section>
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

export default HistoricalContext;
