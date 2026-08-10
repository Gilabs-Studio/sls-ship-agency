"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col pt-4", className)}
      {...props}
    />
  );
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "relative inline-flex h-10 items-center justify-start gap-1 p-1 bg-white/5 backdrop-blur-md rounded-lg border border-white/10",
        className,
      )}
      {...props}
    />
  );
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const [isActive, setIsActive] = React.useState(false);

  React.useEffect(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    const updateActive = () => {
      setIsActive(trigger.dataset.state === "active");
    };

    // Initial check
    updateActive();

    // Watch for data-state changes
    const observer = new MutationObserver(updateActive);
    observer.observe(trigger, {
      attributes: true,
      attributeFilter: ["data-state"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <TabsPrimitive.Trigger
      ref={triggerRef}
      data-slot="tabs-trigger"
      className={cn(
        "relative inline-flex items-center justify-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-foreground/75 transition-all hover:text-foreground cursor-pointer rounded-md disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-black data-[state=active]:font-bold",
        className,
      )}
      {...props}
    >
      {props.children}
      {isActive && (
        <motion.div
          layoutId="activeTabIndicator"
          className="absolute inset-0 bg-[#ACFCCC] rounded-md -z-10 shadow-md shadow-[#ACFCCC]/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 35,
          }}
        />
      )}
    </TabsPrimitive.Trigger>
  );
}

function TabsContents({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("relative", className)} {...props}>
      {children}
    </div>
  );
}

function TabsContent({
  className,
  value,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      value={value}
      className={cn("flex-1 outline-none", className)}
      {...props}
    >
      {props.children}
    </TabsPrimitive.Content>
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent, TabsContents };
