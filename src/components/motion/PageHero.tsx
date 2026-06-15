import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { heroItem, heroStagger } from "@/lib/motionPresets";

type PageHeroVariant = "default" | "burgundy" | "cream";

interface PageHeroProps {
  badge: string;
  title: React.ReactNode;
  subtitle?: string;
  variant?: PageHeroVariant;
  className?: string;
  children?: React.ReactNode;
}

const variantStyles: Record<PageHeroVariant, string> = {
  default: "bg-gradient-to-b from-burgundy/5 via-background to-background",
  burgundy: "bg-gradient-to-br from-burgundy via-burgundy to-burgundy-dark text-white",
  cream: "bg-background",
};

const PageHero = ({
  badge,
  title,
  subtitle,
  variant = "default",
  className,
  children,
}: PageHeroProps) => {
  const isBurgundy = variant === "burgundy";

  return (
    <section
      className={cn(
        "relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden",
        variantStyles[variant],
        className
      )}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <motion.div
          className={cn(
            "absolute -top-20 -right-20 w-[28rem] h-[28rem] rounded-full blur-3xl",
            isBurgundy ? "bg-white/10" : "bg-burgundy/8"
          )}
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className={cn(
            "absolute bottom-0 -left-16 w-80 h-80 rounded-full blur-3xl",
            isBurgundy ? "bg-white/5" : "bg-burgundy-light/6"
          )}
          animate={{ x: [0, -20, 0], y: [0, 15, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(82, 11, 16, 0.07), transparent 65%)",
          }}
        />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          className="max-w-4xl"
          variants={heroStagger}
          initial="hidden"
          animate="visible"
        >
          <motion.span
            variants={heroItem}
            className={cn(
              "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 border",
              isBurgundy
                ? "border-white/20 bg-white/10 text-white/90"
                : "border-burgundy/15 bg-burgundy/5 text-muted-foreground"
            )}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-burgundy animate-pulse" />
            {badge}
          </motion.span>

          <motion.h1
            variants={heroItem}
            className={cn(
              "font-serif text-4xl md:text-5xl lg:text-6xl leading-tight mb-6",
              isBurgundy ? "text-white" : "text-foreground"
            )}
          >
            {title}
          </motion.h1>

          {subtitle && (
            <motion.p
              variants={heroItem}
              className={cn(
                "text-lg md:text-xl leading-relaxed max-w-2xl",
                isBurgundy ? "text-white/80" : "text-muted-foreground"
              )}
            >
              {subtitle}
            </motion.p>
          )}

          {children && (
            <motion.div variants={heroItem} className="mt-8">
              {children}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default PageHero;
