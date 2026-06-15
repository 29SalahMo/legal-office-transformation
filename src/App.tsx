import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { GlobalMotionProvider } from "@/contexts/GlobalMotionContext";
import PageTransition from "@/components/motion/PageTransition";
import PremiumCursor from "@/components/motion/PremiumCursor";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Team from "./pages/Team";
import TeamMember from "./pages/TeamMember";
import Insights from "./pages/Insights";
import InsightArticle from "./pages/InsightArticle";
import AllArticles from "./pages/AllArticles";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";

import NotFound from "./pages/NotFound";
import AdminLayout from "./components/admin/AdminLayout";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminProtectedRoute from "./components/admin/AdminProtectedRoute";
import AdminOverview from "./pages/admin/AdminOverview";
import AdminPosts from "./pages/admin/AdminPosts";
import AdminPages from "./pages/admin/AdminPages";
import AdminMedia from "./pages/admin/AdminMedia";
import AdminInsights from "./pages/admin/AdminInsights";
import AdminCareers from "./pages/admin/AdminCareers";
import AdminTeam from "./pages/admin/AdminTeam";
import AdminTestimonials from "./pages/admin/AdminTestimonials";
import AdminNews from "./pages/admin/AdminNews";
import AdminLegalUpdates from "./pages/admin/AdminLegalUpdates";
import AdminContacts from "./pages/admin/AdminContacts";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  const routes = (
    <Routes location={location}>
      <Route path="/" element={<Index />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/team" element={<Team />} />
      <Route path="/team/:id" element={<TeamMember />} />
      <Route path="/insights" element={<Insights />} />
      <Route path="/insights/all" element={<AllArticles />} />
      <Route path="/insights/:slug" element={<InsightArticle />} />
      <Route path="/careers" element={<Careers />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminProtectedRoute><AdminLayout /></AdminProtectedRoute>}>
        <Route index element={<AdminOverview />} />
        <Route path="posts" element={<AdminPosts />} />
        <Route path="pages" element={<AdminPages />} />
        <Route path="insights" element={<AdminInsights />} />
        <Route path="news" element={<AdminNews />} />
        <Route path="legal-updates" element={<AdminLegalUpdates />} />
        <Route path="media" element={<AdminMedia />} />
        <Route path="careers" element={<AdminCareers />} />
        <Route path="team" element={<AdminTeam />} />
        <Route path="testimonials" element={<AdminTestimonials />} />
        <Route path="contacts" element={<AdminContacts />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );

  if (isAdmin) return routes;

  return (
    <AnimatePresence mode="wait">
      <PageTransition key={location.pathname}>{routes}</PageTransition>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <GlobalMotionProvider>
          <PremiumCursor />
          <ScrollToTop />
          <AnimatedRoutes />
        </GlobalMotionProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
