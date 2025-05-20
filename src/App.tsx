
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ProgressProvider } from "./contexts/ProgressContext";
import { CompetenceProvider } from "./contexts/CompetenceContext";
import { VoicePreferencesProvider } from "./contexts/VoicePreferencesContext";

import HomePage from "./pages/Home";
import NotFound from "./pages/NotFound";
import Seance from "./pages/Seance";
import HistoricalContext from "./pages/HistoricalContext";
import Lyrics from "./pages/Lyrics";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ProgressProvider>
        <CompetenceProvider>
          <VoicePreferencesProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/seance/:id" element={<Seance />} />
                <Route path="/contexte-historique" element={<HistoricalContext />} />
                <Route path="/paroles" element={<Lyrics />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </VoicePreferencesProvider>
        </CompetenceProvider>
      </ProgressProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
