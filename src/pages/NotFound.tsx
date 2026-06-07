import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import LuxuryPageShell from "@/components/LuxuryPageShell";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <LuxuryPageShell withScene={false} className="flex flex-col">
      <SEOHead title="Page Not Found" description="The page you are looking for does not exist." />
      <Header />
      
      <main className="flex-1 flex items-center justify-center py-32">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-xl mx-auto"
          >
            <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <Scale className="w-10 h-10 text-primary" />
            </div>
            
            <h1 className="font-serif text-7xl md:text-8xl text-primary mb-4">404</h1>
            
            <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-4">
              Page Not Found
            </h2>
            
            <p className="text-muted-foreground text-lg leading-relaxed mb-10">
              The page you're looking for doesn't exist or has been moved. 
              Let us help you find what you need.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="rounded-full px-8" asChild>
                <Link to="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="rounded-full px-8" asChild>
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </LuxuryPageShell>
  );
};

export default NotFound;
