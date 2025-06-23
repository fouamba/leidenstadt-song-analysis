import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Menu } from "lucide-react";

export const ImprovedHeader: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo et titre à gauche */}
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-3">
              <img 
                src="/ceredis.png" 
                alt="CEREDIS Logo" 
                className="h-10 w-auto object-contain"
              />
              <div className="hidden md:block">
                <div className="text-sm font-medium text-blue-600">CEREDIS</div>
                <div className="text-xs text-gray-500">L'éducation à l'ère du numérique</div>
              </div>
            </Link>
          </div>

          {/* Navigation principale - Desktop */}
          <nav className="hidden md:flex items-center gap-1">
            <Button 
              variant="ghost" 
              className="text-blue-700 font-medium"
              onClick={() => navigate("/")}
            >
              Accueil
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-1">
                  Séances
                  <ChevronDown size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-80">
                <DropdownMenuItem onClick={() => navigate("/seance1")} className="p-3">
                  <div>
                    <div className="font-medium">Séance 1</div>
                    <div className="text-xs text-gray-500">Découverte et compréhension globale</div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/seance2")} className="p-3">
                  <div>
                    <div className="font-medium">Séance 2</div>
                    <div className="text-xs text-gray-500">L'expression du passé</div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/seance3")} className="p-3">
                  <div>
                    <div className="font-medium">Séance 3</div>
                    <div className="text-xs text-gray-500">Le mode conditionnel</div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/seance4")} className="p-3">
                  <div>
                    <div className="font-medium">Séance 4</div>
                    <div className="text-xs text-gray-500">La phrase complexe</div>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button 
              variant="ghost"
              onClick={() => navigate("/dashboard")}
            >
              Tableau de bord
            </Button>
            
            <Button 
              variant="ghost"
              onClick={() => navigate("/resources")}
            >
              Ressources
            </Button>
            
            <Button 
              variant="ghost"
              onClick={() => navigate("/aide")}
            >
              Aide
            </Button>
          </nav>

          {/* Actions à droite */}
          <div className="flex items-center gap-3">
            <Button 
              variant="outline"
              onClick={() => navigate("/login")}
            >
              Connexion
            </Button>

            {/* Menu mobile */}
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu size={20} />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
