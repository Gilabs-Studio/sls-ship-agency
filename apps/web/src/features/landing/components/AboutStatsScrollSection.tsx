"use client";

import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { ArrowRight, Users, Package, Building2, ShieldCheck } from "lucide-react";
import type { LandingTranslations } from "../types/landing.types";

interface AboutStatsScrollSectionProps {
  t: LandingTranslations;
}

const TOTAL_FRAMES = 95;

/** Helper to parse a stat string like "3.000+", "4.000+", "50+", "100%" into target number and format */
function parseStatNumber(valStr: string) {
  const cleanStr = valStr.replace(/\./g, "").replace(/,/g, "");
  const numMatch = cleanStr.match(/\d+/);
  const targetNum = numMatch ? parseInt(numMatch[0], 10) : 0;

  const hasPlus = valStr.includes("+");
  const hasPercent = valStr.includes("%");
  const isDotFormatted = valStr.includes(".");

  return { targetNum, hasPlus, hasPercent, isDotFormatted };
}

function AnimatedStatValue({
  valStr,
  progressRatio,
}: {
  valStr: string;
  progressRatio: number;
}) {
  const { targetNum, hasPlus, hasPercent, isDotFormatted } = useMemo(
    () => parseStatNumber(valStr),
    [valStr]
  );

  const currentVal = Math.round(targetNum * Math.min(Math.max(progressRatio, 0), 1));

  let formatted = currentVal.toString();
  if (isDotFormatted && currentVal >= 1000) {
    formatted = currentVal.toLocaleString("id-ID");
  }
  if (hasPlus) formatted += "+";
  if (hasPercent) formatted += "%";

  return <span>{formatted}</span>;
}

export function AboutStatsScrollSection({ t }: AboutStatsScrollSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const a = t.aboutSection;
  const s = t.statsSection;

  const statsList = useMemo(
    () => [
      { icon: Users, number: s.stat1Number, label: s.stat1Label },
      { icon: Package, number: s.stat2Number, label: s.stat2Label },
      { icon: Building2, number: s.stat3Number, label: s.stat3Label },
      { icon: ShieldCheck, number: s.stat4Number, label: s.stat4Label },
    ],
    [s]
  );

  // Preload WebP frames into memory
  useEffect(() => {
    let isMounted = true;
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameIndexStr = i.toString().padStart(3, "0");
      img.src = `/frames/frame_${frameIndexStr}.webp`;

      img.onload = () => {
        if (!isMounted) return;
        loadedCount++;
        if (loadedCount >= 10) {
          setImagesLoaded(true);
        }
      };

      loadedImages.push(img);
    }

    imagesRef.current = loadedImages;

    return () => {
      isMounted = false;
    };
  }, []);

  // Draw frame on canvas with object-fit cover
  const drawFrame = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[frameIdx];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    const hRatio = width / img.naturalWidth;
    const vRatio = height / img.naturalHeight;
    const ratio = Math.max(hRatio, vRatio);

    const centerShiftX = (width - img.naturalWidth * ratio) / 2;
    const centerShiftY = (height - img.naturalHeight * ratio) / 2;

    ctx.drawImage(
      img,
      0,
      0,
      img.naturalWidth,
      img.naturalHeight,
      centerShiftX,
      centerShiftY,
      img.naturalWidth * ratio,
      img.naturalHeight * ratio
    );
  }, []);

  // Update canvas sizing
  const updateCanvasSize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const frameIdx = Math.min(
      Math.floor(scrollProgress * (TOTAL_FRAMES - 1)),
      TOTAL_FRAMES - 1
    );
    drawFrame(frameIdx);
  }, [scrollProgress, drawFrame]);

  // Scroll event listener for Curtain Reveal & Smooth Frame Playback
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollable = rect.height - windowHeight;

      if (totalScrollable <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.min(Math.max(currentScroll / totalScrollable, 0), 1);

      setScrollProgress(progress);

      const frameIdx = Math.min(
        Math.floor(progress * (TOTAL_FRAMES - 1)),
        TOTAL_FRAMES - 1
      );
      drawFrame(frameIdx);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateCanvasSize, { passive: true });

    handleScroll();
    updateCanvasSize();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, [drawFrame, updateCanvasSize]);

  useEffect(() => {
    if (imagesLoaded) {
      updateCanvasSize();
    }
  }, [imagesLoaded, updateCanvasSize]);

  // Content Phase 1 (About Us): progress 0.00 to 0.46 (Solid opacity right from curtain reveal)
  const aboutOpacity = useMemo(() => {
    if (scrollProgress <= 0.38) return 1;
    if (scrollProgress <= 0.46) return (0.46 - scrollProgress) / 0.08;
    return 0;
  }, [scrollProgress]);

  const aboutTranslateY = 0;

  // Content Phase 2 (Trusted By Numbers): progress 0.50 to 1.00
  const statsOpacity = useMemo(() => {
    if (scrollProgress < 0.46) return 0;
    if (scrollProgress < 0.56) return (scrollProgress - 0.46) / 0.1;
    return 1;
  }, [scrollProgress]);

  const statsTranslateY = (1 - Math.min(statsOpacity, 1)) * 20;

  const countProgress = useMemo(() => {
    if (scrollProgress < 0.50) return 0;
    return Math.min((scrollProgress - 0.50) / 0.3, 1);
  }, [scrollProgress]);

  return (
    <section id="about" ref={containerRef} className="relative z-10 -mt-screen h-[350vh] w-full bg-[#030618]">
      {/* Sticky Fullscreen Canvas Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Canvas background */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Hero-style Dark Backdrop Gradient Overlay matching HeroSection & ServicesSection */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#030618]/85 via-[#030618]/55 to-[#030618]/90 pointer-events-none z-0" />

        {/* --- PHASE 1: ABOUT US OVERLAY --- */}
        <div
          className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 flex flex-col justify-center transition-opacity duration-200 pointer-events-none h-full"
          style={{
            opacity: aboutOpacity,
            display: aboutOpacity > 0.01 ? "flex" : "none",
          }}
        >
          <div className="max-w-2xl text-left pointer-events-auto">
            <span className="text-emerald-400 font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider block mb-3">
              {a.tag}
            </span>
            <h2 className="text-white text-3xl sm:text-5xl font-bold tracking-tight leading-tight mb-5">
              {a.title}
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8 max-w-xl">
              {a.description}
            </p>
            <div>
              <a
                href="#services"
                className="inline-flex items-center gap-2 border border-emerald-500 text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 px-6 py-3.5 rounded-lg text-sm font-semibold transition-all duration-300 cursor-pointer shadow-md hover:-translate-y-0.5 active:translate-y-0"
              >
                {a.ctaButton}
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* --- PHASE 2: TRUSTED BY NUMBERS OVERLAY --- */}
        <div
          className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 flex flex-col items-center justify-center transition-all duration-300 pointer-events-none h-full"
          style={{
            opacity: statsOpacity,
            transform: `translateY(${statsTranslateY}px)`,
            display: statsOpacity > 0.01 ? "flex" : "none",
          }}
        >
          {/* Header */}
          <div className="text-center mb-10 pointer-events-auto">
            <span className="text-emerald-400 font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider block mb-2">
              {s.tag}
            </span>
            <h2 className="text-white text-3xl sm:text-4xl font-bold tracking-tight">
              {s.title || "Performa & Kepercayaan Teruji"}
            </h2>
          </div>

          {/* 4 Cards Grid with Gradient matching ServicesSection style */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl text-center pointer-events-auto">
            {statsList.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  style={{ borderRadius: "1.25rem" }}
                  className="bg-gradient-to-b from-[#14223d]/90 via-[#0d162a]/90 to-[#070c19]/95 border border-[#1d2f50]/60 p-6 sm:p-7 flex flex-col items-center justify-center min-h-[200px] shadow-xl shadow-black/40 backdrop-blur-md group hover:border-emerald-500/50 transition-all duration-300"
                >
                  <div
                    style={{ borderRadius: "50%" }}
                    className="w-12 h-12 bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 shrink-0 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all duration-300"
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2 font-mono group-hover:text-emerald-300 transition-colors">
                    <AnimatedStatValue
                      valStr={item.number}
                      progressRatio={countProgress}
                    />
                  </div>
                  <div className="text-slate-300 text-xs sm:text-sm font-medium">
                    {item.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
