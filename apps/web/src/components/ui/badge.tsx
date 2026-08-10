"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-lg border px-2.5 py-0.5 text-xs font-semibold w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1.5 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] transition-all duration-300 overflow-hidden relative backdrop-blur-md",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[#ACFCCC] text-black font-bold shadow-md shadow-[#ACFCCC]/25 hover:bg-[#ACFCCC]/90 hover:scale-105",
        secondary:
          "border-transparent bg-[#8FC5FF] text-black font-bold shadow-md shadow-[#8FC5FF]/25 hover:bg-[#8FC5FF]/90 hover:scale-105",
        destructive:
          "border-transparent bg-destructive/90 text-white font-semibold hover:bg-destructive shadow-md hover:scale-105",
        outline:
          "border-white/20 bg-white/5 text-foreground hover:bg-white/10 hover:scale-105",
        glass:
          "border-white/15 bg-white/10 text-foreground backdrop-blur-md hover:bg-white/20 hover:scale-105",
        mint:
          "border-[#ACFCCC]/40 bg-[#ACFCCC]/15 text-[#ACFCCC] font-bold shadow-sm shadow-[#ACFCCC]/10 hover:scale-105",
        ice:
          "border-[#8FC5FF]/40 bg-[#8FC5FF]/15 text-[#8FC5FF] font-bold shadow-sm shadow-[#8FC5FF]/10 hover:scale-105",
        success:
          "border-[#ACFCCC]/40 bg-[#ACFCCC]/15 text-[#ACFCCC] font-bold shadow-sm shadow-[#ACFCCC]/10 hover:scale-105",
        warning:
          "border-amber-400/40 bg-amber-400/15 text-amber-300 font-bold shadow-sm hover:scale-105",
        info:
          "border-[#8FC5FF]/40 bg-[#8FC5FF]/15 text-[#8FC5FF] font-bold shadow-sm hover:scale-105",
        active:
          "border-[#ACFCCC]/50 bg-[#ACFCCC]/20 text-[#ACFCCC] font-bold hover:scale-105",
        inactive: "border-white/10 bg-white/5 text-muted-foreground",
        soft: "border-transparent bg-white/10 text-foreground hover:bg-white/15",
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
