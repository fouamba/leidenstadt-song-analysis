
import React, { ReactNode } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NavigationBar } from "../components/NavigationBar";
import { seances } from "../data/seances";
import { useProgress } from "../contexts/ProgressContext";
import { Link, useLocation } from "react-router-dom";

interface MainLayoutProps {
  children: ReactNode;
  title?: string;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  title = "Né en 17 à Leidenstadt",
}) => {
  const { getSeanceProgress } = useProgress();
  const location = useLocation();
  
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <NavigationBar />
      
      <header className="bg-white border-b border-slate-200 py-6 px-4 shadow-sm">
        <div className="container mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">{title}</h1>
        </div>
      </header>
      
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="seance1" className="mb-8">
          <TabsList className="w-full sm:w-auto justify-start overflow-x-auto p-0 bg-transparent space-x-2">
            {seances.map((seance) => {
              const progress = getSeanceProgress(seance.id);
              const isActive = location.pathname.includes(`/seance/${seance.id}`);
              
              return (
                <Link key={seance.id} to={`/seance/${seance.id}`}>
                  <TabsTrigger 
                    value={`seance${seance.id}`}
                    className={`relative px-4 py-2 ${isActive ? "bg-primary text-white" : "bg-white"}`}
                  >
                    <div className="flex items-center space-x-2">
                      <span>Séance {seance.id}</span>
                      {progress > 0 && (
                        <span className="inline-flex h-5 w-5 rounded-full bg-green-100 text-green-600 items-center justify-center text-xs">
                          {progress}%
                        </span>
                      )}
                    </div>
                  </TabsTrigger>
                </Link>
              );
            })}
          </TabsList>
        </Tabs>
        
        <main>{children}</main>
      </div>
      
      <footer className="mt-auto bg-white border-t border-slate-200 py-4 px-4">
        <div className="container mx-auto text-center text-sm text-slate-500">
          <p>© 2025 - Application pédagogique "Né en 17 à Leidenstadt"</p>
        </div>
      </footer>
    </div>
  );
};
