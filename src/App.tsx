
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./providers/AuthProvider";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import AuthCallback from "./components/auth/AuthCallback";
import Dashboard from "./pages/Dashboard";
import Builder from "./pages/Builder";
import Preview from "./pages/Preview";
import Referral from "./pages/Referral";
import About from "./pages/About";
import Templates from "./pages/Templates";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import RequireAuth from "./components/RequireAuth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path="/dashboard" element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            } />
            <Route path="/builder/:id" element={
              <RequireAuth>
                <Builder />
              </RequireAuth>
            } />
            <Route path="/website/:id/preview" element={
              <RequireAuth>
                <Preview />
              </RequireAuth>
            } />
            <Route path="/referral" element={
              <RequireAuth>
                <Referral />
              </RequireAuth>
            } />
            <Route path="/about" element={<About />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/settings" element={
              <RequireAuth>
                <Settings />
              </RequireAuth>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
