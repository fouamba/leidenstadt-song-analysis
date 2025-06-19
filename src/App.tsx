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
import Seance1 from "./pages/Seance1";
import Seance2 from "./pages/Seance2";
import Seance3 from "./pages/Seance3";
import Seance4 from "./pages/Seance4";
import HistoricalContext from "./pages/HistoricalContext";
import Lyrics from "./pages/Lyrics";
import ResourceLibraryWrapper from "./pages/dashboard/ResourceLibrary";
import TeacherDashboard from "./pages/dashboard/TeacherDashboard";
import StudentDashboard from "./pages/dashboard/StudentDashboard";
import Login from "./pages/Login";

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
                <Route path="/seance1" element={<Seance1 />} />
                <Route path="/seance2" element={<Seance2 />} />
                <Route path="/seance3" element={<Seance3 />} />
                <Route path="/seance4" element={<Seance4 />} />
                <Route path="/contexte-historique" element={<HistoricalContext />} />
                <Route path="/paroles" element={<Lyrics />} />
                <Route path="/dashboard" element={<StudentDashboard />} />
                <Route path="/resources" element={<ResourceLibraryWrapper />} />
                <Route path="/teacher" element={<TeacherDashboard />} />
                <Route path="/login" element={<Login />} />
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
