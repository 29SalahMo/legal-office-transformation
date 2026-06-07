import { ArrowRight } from "lucide-react";
import article1 from "@/assets/article-1.jpg";
import article2 from "@/assets/article-2.jpg";
import article3 from "@/assets/article-3.jpg";

const articles = [
  {
    image: article1,
    author: "Richard E. Hamilton",
    date: "January 15, 2026",
    title: "Navigating Legal Innovation in the Digital Age",
    description:
      "How modern law firms are leveraging technology to deliver superior client outcomes while maintaining the personal touch that defines excellence.",
  },
  {
    image: article2,
    author: "Victoria S. Chen",
    date: "January 10, 2026",
    title: "Corporate Growth Through Strategic M&A",
    description:
      "Key considerations for executives planning acquisitions in today's dynamic market environment and regulatory landscape.",
  },
  {
    image: article3,
    author: "Legal Insights Team",
    date: "January 5, 2026",
    title: "Building a Global Legal Strategy",
    description:
      "Cross-border transactions require sophisticated planning. Learn how to structure deals that succeed across jurisdictions.",
  },
];

const ArticlesSection = () => {
  return (
    <section className="py-24 lg:py-32 bg-card">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-gold uppercase tracking-widest text-sm font-medium mb-4">
            Insights
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
            Articles & Insights
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto" />
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <article
              key={article.title}
              className="group bg-background rounded-lg overflow-hidden shadow-elegant hover:shadow-hover transition-all duration-500 hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Content */}
              <div className="p-6 lg:p-8">
                {/* Meta */}
                <div className="flex items-center text-sm text-muted-foreground mb-4">
                  <span className="font-medium text-primary">{article.author}</span>
                  <span className="mx-2">•</span>
                  <span>{article.date}</span>
                </div>

                {/* Title */}
                <h3 className="font-serif text-xl text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  {article.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {article.description}
                </p>

                {/* Read More */}
                <button className="inline-flex items-center text-primary text-sm font-medium uppercase tracking-wider group/btn">
                  Read More
                  <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArticlesSection;
