import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-xs font-semibold transition-all duration-300 cursor-pointer disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-[#ACFCCC]/50 relative overflow-hidden active:scale-95",
  {
    variants: {
      variant: {
        default:
          "bg-[#ACFCCC] text-black font-bold hover:bg-[#ACFCCC]/90 shadow-lg shadow-[#ACFCCC]/20 hover:-translate-y-0.5 active:translate-y-0 border border-[#ACFCCC]/30",
        secondary:
          "bg-[#8FC5FF] text-black font-bold hover:bg-[#8FC5FF]/90 shadow-lg shadow-[#8FC5FF]/20 hover:-translate-y-0.5 active:translate-y-0 border border-[#8FC5FF]/30",
        destructive:
          "bg-destructive/90 text-white font-semibold hover:bg-destructive hover:shadow-lg hover:shadow-destructive/20 hover:-translate-y-0.5 active:translate-y-0 border border-destructive/30",
        outline:
          "border border-white/15 bg-white/5 text-foreground hover:bg-white/10 hover:border-[#ACFCCC]/40 hover:-translate-y-0.5 active:translate-y-0 backdrop-blur-md",
        glass:
          "border border-white/15 bg-white/10 text-foreground hover:bg-white/20 hover:-translate-y-0.5 active:translate-y-0 backdrop-blur-lg shadow-sm",
        ghost:
          "hover:bg-white/10 hover:text-foreground text-foreground/80",
        link: "text-[#ACFCCC] underline-offset-4 hover:underline hover:text-[#ACFCCC]/80",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
