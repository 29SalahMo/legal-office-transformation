import { motion } from "framer-motion";
import { Scale, Users, Globe, Award, Heart, Building2, Lightbulb, ArrowRight } from "lucide-react";
import LuxuryPageShell from "@/components/LuxuryPageShell";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import StyledAmpersand from "@/components/StyledAmpersand";
import heroImage from "@/assets/hero-lawyer-meeting.jpg";
const stats = [
  { value: "25+", label: "Years Combined Experience" },
  { value: "2", label: "Founding Partners" },
  { value: "100+", label: "Corporate Clients" },
  { value: "Egypt", label: "Based In" },
];

const About = () => {
  return (
    <LuxuryPageShell withScene={false}>
      <SEOHead title="About Us" description="Learn about A&A Legal Advisors, a boutique law firm in Egypt founded by Dr. Ahmed Abdallah and Mr. Mohamed Abu El Naga with over 25 years of experience." />
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 lg:pb-28 bg-background">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="inline-block px-4 py-2 rounded-full border border-border text-sm font-medium text-muted-foreground mb-6">
                  About Us
                </span>
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight mb-6">
                  A<StyledAmpersand />A Legal Advisors
                </h1>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  A boutique law firm based in Egypt, founded by <strong className="text-foreground">Dr. Ahmed Abdallah</strong> and <strong className="text-foreground">Mr. Mohamed Abu El Naga</strong>, bringing together over 25 years of experience gained at leading and reputable law firms in Egypt.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Our purpose is to deliver first-class legal services to our valued clients through an expert team with diverse experience across multiple legal disciplines.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
                  <img
                    src={heroImage}
                    alt="A&A Legal Advisors office"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
                </div>
                {/* Floating Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="absolute -bottom-6 -left-6 bg-card rounded-2xl p-6 shadow-card max-w-xs"
                >
                  <p className="text-sm text-muted-foreground mb-2">Our Commitment</p>
                  <p className="font-serif text-foreground">
                    Providing ingenious legal solutions that protect our clients' businesses.
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <p className="font-serif text-4xl md:text-5xl text-primary mb-2">
                    {stat.value}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="py-20 lg:py-28 bg-background">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-block px-4 py-2 rounded-full border border-border text-sm font-medium text-muted-foreground mb-6">
                  Our Vision
                </span>
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight mb-6">
                  Aspiring to be a prominent legal firm
                </h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex flex-col justify-center"
              >
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  A<StyledAmpersand />A aspires to be a prominent legal firm delivering high-quality services rooted in the achievements, experience, and proven track records of its members.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  To enhance client satisfaction, we maintain a dedicated follow-up department that ensures timely communication and responsive legal support.
                </p>
              </motion.div>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
              {/* Card 1 - Creative Approach */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-card rounded-3xl p-8 shadow-card hover:shadow-hover transition-all duration-500 group h-[280px] flex flex-col"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                  <Lightbulb className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-serif text-xl text-foreground mb-3">
                  Creative Approach
                </h3>
                <p className="text-muted-foreground leading-relaxed flex-1">
                  We adopt a creative, quality-driven, and business-aware approach to every assignment.
                </p>
              </motion.div>

              {/* Card 2 - Global Network */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-primary rounded-3xl p-8 h-[280px] flex flex-col"
              >
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                  <Globe className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-serif text-xl text-white mb-3">
                  International Partnerships
                </h3>
                <p className="text-white/80 leading-relaxed flex-1">
                  Close relationships with leading international law firms worldwide to offer innovative and pragmatic solutions.
                </p>
              </motion.div>

              {/* Card 3 - Client Focus */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-card rounded-3xl p-8 shadow-card hover:shadow-hover transition-all duration-500 group h-[280px] flex flex-col"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                  <Users className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-serif text-xl text-foreground mb-3">
                  Client Satisfaction
                </h3>
                <p className="text-muted-foreground leading-relaxed flex-1">
                  A dedicated follow-up department ensures timely communication and responsive legal support.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Distinction Section */}
        <section className="py-20 lg:py-28 bg-secondary">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="inline-block px-4 py-2 rounded-full border border-border text-sm font-medium text-muted-foreground mb-6">
                Our Distinction
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight max-w-3xl mx-auto">
                What sets us apart in the legal landscape
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Legislative Participation */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-card rounded-3xl p-8 shadow-card"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Scale className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl text-foreground mb-2">
                      Legislative Participation
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Active participation in drafting new legislation and involvement in national drafting committees established by the House of Representatives.
                    </p>
                  </div>
                </div>
                <div className="border-t border-border pt-6">
                  <p className="text-sm text-muted-foreground">
                    Drawing on extensive experience in addressing legal challenges faced by investors, we contribute to legislative improvements by proposing amendments that promote sustainable development.
                  </p>
                </div>
              </motion.div>

              {/* Regional Leadership */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-card rounded-3xl p-8 shadow-card"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl text-foreground mb-2">
                      Regional Leadership
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      As one of the emerging law firms in the region, A<StyledAmpersand />A actively participates in and sponsors legal and investment events held across Egypt.
                    </p>
                  </div>
                </div>
                <div className="border-t border-border pt-6">
                  <p className="text-sm text-muted-foreground">
                    We proudly support startup companies by providing legal guidance to establish suitable legal frameworks aligned with their business objectives.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Social Responsibility Section */}
        <section className="py-20 lg:py-28 bg-background">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <span className="inline-block px-4 py-2 rounded-full border border-border text-sm font-medium text-muted-foreground mb-6">
                  Social Responsibility
                </span>
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight mb-6">
                  Success rooted in responsibility
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  At A<StyledAmpersand />A, we firmly believe that success cannot exist independently of social responsibility. Accordingly, we provide pro bono legal services to individuals and organizations engaged in social responsibility initiatives in Egypt.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                    <p className="text-muted-foreground">
                      Legal and research papers addressing international societal issues, including refugee matters and violence against women
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                    <p className="text-muted-foreground">
                      Strong relationships with community leaders and state representatives
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                    <p className="text-muted-foreground">
                      Regular participation in national constitutional and legislative committees
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-primary rounded-3xl p-10"
              >
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-8">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-serif text-2xl text-white mb-4">
                  Our Ongoing Initiatives
                </h3>
                <p className="text-white/80 leading-relaxed mb-6">
                  We accept invitations to speak at major conferences, seminars, and dispute resolution forums. Our initiatives focus on proposing legislative reforms, particularly addressing investor-related challenges that hinder development plans.
                </p>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 text-white font-medium group"
                >
                  Get in touch
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </LuxuryPageShell>
  );
};

export default About;
