"use client";

import { useScroll, useTransform, useSpring } from "framer-motion";
import type { ParallaxOptions, ParallaxTransforms } from "../types/landing.types";

export function useLandingParallax(options: ParallaxOptions = {}): ParallaxTransforms {
  const { bgFactor = 5, peopleFactor = 10 } = options;

  const { scrollY } = useScroll();

  // Smooth scroll spring config
  const smoothScrollY = useSpring(scrollY, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Parallax transform calculations:
  // Background (bgFactor = 5): Slower movement creating far background depth
  // People (peopleFactor = 10): Faster movement creating foreground pop effect
  const bgY = useTransform(smoothScrollY, [0, 1000], [0, bgFactor * 30]);
  const peopleY = useTransform(smoothScrollY, [0, 1000], [0, peopleFactor * 35]);
  const contentY = useTransform(smoothScrollY, [0, 1000], [0, bgFactor * 15]);

  // Smooth fade and subtle scale down as hero section scrolls out of view
  const heroOpacity = useTransform(smoothScrollY, [0, 600], [1, 0.2]);
  const heroScale = useTransform(smoothScrollY, [0, 600], [1, 0.96]);

  // Header background blur intensity based on scroll position
  const headerBlur = useTransform(smoothScrollY, [0, 100], [0, 20]);

  return {
    bgY,
    peopleY,
    contentY,
    heroOpacity,
    heroScale,
    headerBlur,
  };
}
