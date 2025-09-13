import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Lesson from "./pages/Lesson";
import CourseMap from "./pages/CourseMap";
import Managers from "./pages/Managers";
import SectorDetail from "./pages/SectorDetail";
import EmployeeProfile from "./pages/EmployeeProfile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/curso/:id" element={<CourseMap />} />
          <Route path="/aula/:id" element={<Lesson />} />
          <Route path="/gerenciadores" element={<Managers />} />
          <Route path="/gerenciadores/setor/:sectorId" element={<SectorDetail />} />
          <Route path="/gerenciadores/setor/:sectorId/colaborador/:employeeId" element={<EmployeeProfile />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
