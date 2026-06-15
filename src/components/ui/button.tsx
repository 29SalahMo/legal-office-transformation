import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-burgundy to-burgundy-light text-white hover:opacity-95 rounded-full shadow-[0_0_20px_rgba(82,11,16,0.25)] hover:shadow-[0_0_30px_rgba(170,124,17,0.3)] transition-all duration-300 gold-shimmer-sweep",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-md",
        outline: "border border-burgundy/30 text-white bg-white/5 hover:bg-burgundy/15 hover:border-burgundy/50 rounded-full backdrop-blur-sm transition-all duration-300 hover:shadow-[0_0_20px_rgba(170,124,17,0.15)]",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-full",
        ghost: "hover:bg-burgundy/15 hover:text-white rounded-md text-white/80",
        link: "text-burgundy-light underline-offset-4 hover:underline relative hover:text-white transition-colors duration-300 after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-gold-light after:to-gold after:transition-all after:duration-300 hover:after:w-full",
        heroPrimary: "bg-gradient-to-r from-burgundy to-burgundy-light text-white hover:opacity-95 rounded-full font-semibold tracking-wide shadow-[0_0_30px_rgba(82,11,16,0.3)] hover:shadow-[0_0_40px_rgba(170,124,17,0.4)] transition-all duration-300 gold-shimmer-sweep",
        heroSecondary: "bg-transparent border border-burgundy/30 text-white hover:bg-burgundy/10 rounded-full font-semibold tracking-wide backdrop-blur-sm transition-all duration-300",
        gold: "bg-gradient-to-r from-burgundy to-burgundy-light text-white hover:opacity-95 rounded-full font-semibold shadow-[0_0_24px_rgba(82,11,16,0.25)] hover:shadow-[0_0_35px_rgba(170,124,17,0.35)] transition-all duration-300 gold-shimmer-sweep",
        elegant: "text-burgundy-light hover:text-white font-medium tracking-wide uppercase text-xs underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-full px-3",
        lg: "h-12 px-8 py-3",
        xl: "h-14 px-10 py-4",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
