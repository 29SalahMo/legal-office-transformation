import { Award, Lightbulb, Globe } from "lucide-react";

const differentiators = [
  {
    icon: Award,
    title: "25+ Years of Expertise",
    description:
      "A proven track record of excellence in legal practice, representing Fortune 500 companies and high-net-worth individuals with distinction.",
  },
  {
    icon: Lightbulb,
    title: "Innovative Legal Solutions",
    description:
      "Pioneering approaches that combine traditional legal expertise with cutting-edge technology and creative problem-solving strategies.",
  },
  {
    icon: Globe,
    title: "Global Network",
    description:
      "Strategic partnerships with leading law firms worldwide, enabling seamless cross-border representation and international deal execution.",
  },
];

const WhatSetsUsApartSection = () => {
  return (
    <section className="py-24 lg:py-32 bg-card">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-gold uppercase tracking-widest text-sm font-medium mb-4">
            Our Distinction
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
            What Sets Us Apart
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto" />
        </div>

        {/* Three Columns */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-16">
          {differentiators.map((item, index) => (
            <div
              key={item.title}
              className="text-center group"
            >
              {/* Icon Circle */}
              <div className="w-20 h-20 mx-auto mb-8 relative">
                <div className="absolute inset-0 bg-primary/10 rounded-full group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-2 bg-background rounded-full flex items-center justify-center">
                  <item.icon className="w-8 h-8 text-primary" />
                </div>
              </div>

              {/* Content */}
              <h3 className="font-serif text-xl lg:text-2xl text-foreground mb-4">
                {item.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed max-w-sm mx-auto">
                {item.description}
              </p>

              {/* Gold underline on hover */}
              <div className="w-0 h-0.5 bg-gold mx-auto mt-6 group-hover:w-16 transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatSetsUsApartSection;
