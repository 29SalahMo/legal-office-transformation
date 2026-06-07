import Header from "@/components/Header";
import SEOHead from "@/components/SEOHead";
import HeroSection from "@/components/HeroSection";
import AboutBentoSection from "@/components/AboutBentoSection";
import ServicesSection from "@/components/ServicesSection";
import LeadershipSection from "@/components/LeadershipSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";
import LuxuryPageShell from "@/components/LuxuryPageShell";

const Index = () => {
  return (
    <LuxuryPageShell>
      <SEOHead title="Home" description="A&A Legal Advisors — a boutique law firm in Egypt offering first-class, creative, and business-aware legal solutions with over 25 years of experience." />
      <Header />
      <main className="relative z-10">
        <HeroSection />
        <AboutBentoSection />
        <ServicesSection />
        <LeadershipSection />
        <TestimonialsSection />
        <NewsletterSection />
      </main>
      <Footer />
    </LuxuryPageShell>
  );
};

export default Index;
