
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';

interface PageLayoutProps {
  children: React.ReactNode;
  heroTitle: string;
  heroDescription: string;
  showNavigation?: boolean;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ 
  children, 
  heroTitle, 
  heroDescription,
  showNavigation = true 
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <img 
              src="/ceredis.png"
              alt="CEREDIS Logo" 
              className="h-12 w-auto" 
              style={{ objectFit: 'contain' }}
            />
          </div>
          {showNavigation && (
            <nav className="flex items-center gap-6">
              <Button variant="ghost" onClick={() => navigate("/")}>Accueil</Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost">Séances</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => navigate("/seance1")}>Séance 1</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/seance2")}>Séance 2</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/seance3")}>Séance 3</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/seance4")}>Séance 4</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="ghost" onClick={() => navigate("/dashboard")}>Tableau de bord</Button>
              <Button variant="ghost" onClick={() => navigate("/resources")}>Ressources</Button>
              <Button variant="ghost" onClick={() => navigate("/aide")}>Aide</Button>
              <Button variant="outline" onClick={() => navigate("/login")}>Connexion</Button>
            </nav>
          )}
        </div>
      </header>

      {/* Hero section */}
      <section className="relative h-64 overflow-hidden bg-black">
        <img
          src="/leidenstadt_accueil.jpg"
          alt="Jean-Jacques Goldman - Né en 17 à Leidenstadt"
          className="absolute inset-0 w-full h-full object-cover opacity-70"
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-blue-700/30"></div>
        <div className="container relative h-full flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            {heroTitle}
          </h1>
          <p className="text-xl text-white/90 max-w-2xl">
            {heroDescription}
          </p>
        </div>
      </section>

      {/* Main content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t py-6 bg-gray-50">
        <div className="container">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <img src="/Renouveau-Pedagogique.png" alt="Renouveau Pédagogique Logo" className="h-8" />
              <span className="text-sm text-gray-500">© 2025 CEREDIS - L'éducation à l'ère du numérique</span>
            </div>
            <div className="flex gap-4">
              <Button variant="ghost" size="sm">Mentions légales</Button>
              <Button variant="ghost" size="sm">Politique de confidentialité</Button>
              <Button variant="ghost" size="sm">Contact</Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
