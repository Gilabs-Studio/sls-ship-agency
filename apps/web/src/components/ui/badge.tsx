"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-lg border px-2.5 py-0.5 text-xs font-semibold w-fit shrink-0 [&>svg]:size-3 gap-1.5 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] transition-all duration-200 backdrop-blur-md",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground font-bold shadow-xs hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground font-bold shadow-xs hover:bg-secondary/90",
        destructive:
          "border-destructive/30 bg-destructive/10 text-destructive font-semibold hover:bg-destructive/20 shadow-xs",
        outline:
          "border-border bg-background/50 text-foreground hover:bg-accent",
        glass:
          "border-border/60 bg-card/60 text-foreground backdrop-blur-md hover:bg-accent/40",
        mint:
          "border-emerald-600/30 bg-emerald-50 text-emerald-800 font-bold dark:border-[#ACFCCC]/40 dark:bg-[#ACFCCC]/15 dark:text-[#ACFCCC] shadow-xs",
        ice:
          "border-sky-600/30 bg-sky-50 text-sky-800 font-bold dark:border-[#8FC5FF]/40 dark:bg-[#8FC5FF]/15 dark:text-[#8FC5FF] shadow-xs",
        success:
          "border-emerald-600/30 bg-emerald-50 text-emerald-800 font-bold dark:border-[#ACFCCC]/40 dark:bg-[#ACFCCC]/15 dark:text-[#ACFCCC] shadow-xs",
        warning:
          "border-amber-500/40 bg-amber-50 text-amber-800 dark:bg-amber-400/15 dark:text-amber-300 font-bold shadow-xs",
        info:
          "border-sky-600/30 bg-sky-50 text-sky-800 font-bold dark:border-[#8FC5FF]/40 dark:bg-[#8FC5FF]/15 dark:text-[#8FC5FF] shadow-xs",
        active:
          "border-emerald-600/30 bg-emerald-50 text-emerald-800 font-bold dark:border-[#ACFCCC]/50 dark:bg-[#ACFCCC]/20 dark:text-[#ACFCCC]",
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
