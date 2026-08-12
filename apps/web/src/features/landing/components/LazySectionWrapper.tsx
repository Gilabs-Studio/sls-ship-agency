"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { LandingLoader } from "./LandingLoader";

interface LazySectionWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
  minHeight?: string;
  className?: string;
  rootMargin?: string;
}

export function LazySectionWrapper({
  children,
  fallback,
  minHeight = "400px",
  className = "",
  rootMargin = "250px",
}: LazySectionWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isVisible) return;
    const element = containerRef.current;
    if (!element) return;

    if (typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin,
        threshold: 0.01,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [isVisible, rootMargin]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${className}`}
      style={{ minHeight: isVisible ? undefined : minHeight }}
    >
      {isVisible ? (
        children
      ) : (
        fallback || <LandingLoader fullScreen={false} message="Loading Section..." />
      )}
    </div>
  );
}
