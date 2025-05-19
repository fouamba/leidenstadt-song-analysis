
import { Link } from "react-router-dom";
import { NavigationBar } from "@/components/NavigationBar";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavigationBar />
      
      <div className="flex-grow flex items-center justify-center">
        <div className="text-center max-w-md p-6">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Page non trouvée</h1>
          <p className="text-slate-600 mb-8">
            La page que vous recherchez n'existe pas ou a été déplacée.
          </p>
          <Link
            to="/"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
      
      <footer className="bg-slate-900 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">Application éducative basée sur les compétences - "Né en 17 à Leidenstadt"</p>
        </div>
      </footer>
    </div>
  );
};

export default NotFound;
