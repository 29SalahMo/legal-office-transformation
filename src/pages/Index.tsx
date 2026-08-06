import Header from "@/components/Header";
import SEOHead from "@/components/SEOHead";
import HeroSection from "@/components/HeroSection";
import IntakeSection from "@/components/IntakeSection";
import AboutBentoSection from "@/components/AboutBentoSection";
import TrustCredibilitySection from "@/components/TrustCredibilitySection";
import ClientsSection from "@/components/ClientsSection";
import ServicesSection from "@/components/ServicesSection";
import CaseProcessTimeline from "@/components/CaseProcessTimeline";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import LeadershipSection from "@/components/LeadershipSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";
import LuxuryPageShell from "@/components/LuxuryPageShell";
import JusticeBeamNav from "@/components/justice-beam/JusticeBeamNav";

const Index = () => {
  return (
    <LuxuryPageShell>
      <SEOHead title="Home" description="A&A Legal Advisors — a boutique law firm in Egypt offering first-class, creative, and business-aware legal solutions with over 25 years of experience." />
      <JusticeBeamNav />
      <Header />
      <main id="main-content" className="relative z-10 overflow-x-hidden w-full max-w-[100vw]">
        <HeroSection />
        <IntakeSection />
        <AboutBentoSection />
        <TrustCredibilitySection />
        <ClientsSection />
        <ServicesSection />
        <CaseProcessTimeline />
        <CaseStudiesSection />
        <LeadershipSection />
        <TestimonialsSection />
        <NewsletterSection />
      </main>
      <Footer />
    </LuxuryPageShell>
  );
};

export default Index;
