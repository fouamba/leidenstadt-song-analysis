
import { NavigationBar } from "@/components/NavigationBar";
import { LyricHighlighter } from "@/components/LyricHighlighter";
import { lyrics } from "@/lib/data";

const Lyrics = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavigationBar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <LyricHighlighter lyrics={lyrics} />
          
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Analyse linguistique</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">L'emploi de l'imparfait</h3>
                <p className="text-gray-700 mb-2">
                  Dans cette chanson, l'imparfait est utilisé pour créer une distance avec la réalité et exprimer l'irréel du présent, notamment dans les propositions conditionnelles introduites par "si".
                </p>
                <p className="bg-blue-50 p-3 rounded text-sm">
                  Exemples: "si j'<span className="bg-blue-200 px-1">étais</span> né", "si j'<span className="bg-blue-200 px-1">avais</span> grandi", "si j'<span className="bg-blue-200 px-1">étais</span> née blanche"
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">L'emploi du conditionnel passé</h3>
                <p className="text-gray-700 mb-2">
                  Le conditionnel passé est utilisé dans les propositions principales pour exprimer ce qui aurait pu se produire dans un passé hypothétique, en lien avec la condition exprimée à l'imparfait.
                </p>
                <p className="bg-green-50 p-3 rounded text-sm">
                  Exemples: "<span className="bg-green-200 px-1">Aurais</span>-je été meilleur", "<span className="bg-green-200 px-1">Aurais</span>-je eu la force", "<span className="bg-green-200 px-1">Aurais</span>-je entendu ces cris"
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">La structure syntaxique récurrente</h3>
                <p className="text-gray-700 mb-2">
                  Goldman utilise de façon répétée une structure qui renforce la réflexion morale: une proposition conditionnelle suivie d'une proposition principale interrogative.
                </p>
                <p className="bg-yellow-50 p-3 rounded text-sm">
                  Structure: <span className="bg-yellow-200 px-1">Si + imparfait/plus-que-parfait</span> → <span className="bg-green-200 px-1">Conditionnel passé</span> + ?
                </p>
              </div>
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

export default Lyrics;
