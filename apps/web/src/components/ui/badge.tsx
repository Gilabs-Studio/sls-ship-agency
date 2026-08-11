"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-lg border px-2.5 py-0.5 text-xs font-semibold w-fit shrink-0 [&>svg]:size-3 gap-1.5 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] transition-all duration-200",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground font-bold shadow-xs hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground font-bold shadow-xs hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground font-bold shadow-xs hover:bg-destructive/90",
        outline:
          "border-border bg-background/50 text-foreground hover:bg-accent",
        glass:
          "border-border/60 bg-card/60 text-foreground backdrop-blur-md hover:bg-accent/40",
        mint:
          "border-[hsl(var(--mint-border))] bg-[hsl(var(--mint-bg))] text-[hsl(var(--mint-text))] font-bold shadow-xs",
        ice:
          "border-[hsl(var(--ice-border))] bg-[hsl(var(--ice-bg))] text-[hsl(var(--ice-text))] font-bold shadow-xs",
        success:
          "border-[hsl(var(--success-border))] bg-[hsl(var(--success-bg))] text-[hsl(var(--success-text))] font-bold shadow-xs",
        warning:
          "border-[hsl(var(--warning-border))] bg-[hsl(var(--warning-bg))] text-[hsl(var(--warning-text))] font-bold shadow-xs",
        rose:
          "border-[hsl(var(--rose-border))] bg-[hsl(var(--rose-bg))] text-[hsl(var(--rose-text))] font-bold shadow-xs",
        info:
          "border-[hsl(var(--ice-border))] bg-[hsl(var(--ice-bg))] text-[hsl(var(--ice-text))] font-bold shadow-xs",
        active:
          "border-[hsl(var(--mint-border))] bg-[hsl(var(--mint-bg))] text-[hsl(var(--mint-text))] font-bold shadow-xs",
        inactive: "border-border bg-muted/50 text-muted-foreground",
        soft: "border-transparent bg-secondary/50 text-foreground hover:bg-secondary/80",
        dot: "border-transparent bg-transparent text-foreground px-1 gap-1.5 shadow-none",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
