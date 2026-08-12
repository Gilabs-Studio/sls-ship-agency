"use client";

import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import {
  ArrowRight,
  Users,
  Package,
  Building2,
  ShieldCheck,
  UserCheck,
  Clock,
  Layers,
} from "lucide-react";
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
  const w = t.whyChooseUsSection;
  const c = t.ctaSection;

  const statsList = useMemo(
    () => [
      { icon: Users, number: s.stat1Number, label: s.stat1Label },
      { icon: Package, number: s.stat2Number, label: s.stat2Label },
      { icon: Building2, number: s.stat3Number, label: s.stat3Label },
      { icon: ShieldCheck, number: s.stat4Number, label: s.stat4Label },
    ],
    [s]
  );

  const whyChooseUsItems = useMemo(
    () => [
      { icon: UserCheck, title: w.item1Title, desc: w.item1Desc },
      { icon: Clock, title: w.item2Title, desc: w.item2Desc },
      { icon: ShieldCheck, title: w.item3Title, desc: w.item3Desc },
      { icon: Layers, title: w.item4Title, desc: w.item4Desc },
    ],
    [w]
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

    // During video frame playback phase (0 to 0.40), scale progress to 0..94
    const frameProgress = Math.min(scrollProgress / 0.40, 1);
    const frameIdx = Math.min(
      Math.floor(frameProgress * (TOTAL_FRAMES - 1)),
      TOTAL_FRAMES - 1
    );
    drawFrame(frameIdx);
  }, [scrollProgress, drawFrame]);

  // Scroll event listener for Curtain Reveal, Video Frame Playback & Blur Background Phases
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

      // Video frames play during progress 0.00 -> 0.40, then lock at Frame 95 (index 94)
      const frameProgress = Math.min(progress / 0.40, 1);
      const frameIdx = Math.min(
        Math.floor(frameProgress * (TOTAL_FRAMES - 1)),
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

  // Canvas background blur filter: starts blurring at progress 0.40 -> 0.50 up to 16px
  const blurAmount = useMemo(() => {
    if (scrollProgress < 0.40) return 0;
    if (scrollProgress < 0.50) return ((scrollProgress - 0.40) / 0.10) * 16;
    return 16;
  }, [scrollProgress]);

  // --- PHASE OPACITIES ---
  // Phase 1 (About Us): progress 0.00 to 0.22
  const aboutOpacity = useMemo(() => {
    if (scrollProgress <= 0.18) return 1;
    if (scrollProgress <= 0.24) return (0.24 - scrollProgress) / 0.06;
    return 0;
  }, [scrollProgress]);

  // Phase 2 (Trusted By Numbers): progress 0.24 to 0.48
  const statsOpacity = useMemo(() => {
    if (scrollProgress < 0.24) return 0;
    if (scrollProgress < 0.29) return (scrollProgress - 0.24) / 0.05;
    if (scrollProgress <= 0.44) return 1;
    if (scrollProgress <= 0.49) return (0.49 - scrollProgress) / 0.05;
    return 0;
  }, [scrollProgress]);

  const countProgress = useMemo(() => {
    if (scrollProgress < 0.26) return 0;
    return Math.min((scrollProgress - 0.26) / 0.18, 1);
  }, [scrollProgress]);

  // Phase 3 (Why Choose Us): progress 0.49 to 0.75 (Blurred background)
  const whyChooseUsOpacity = useMemo(() => {
    if (scrollProgress < 0.49) return 0;
    if (scrollProgress < 0.54) return (scrollProgress - 0.49) / 0.05;
    if (scrollProgress <= 0.70) return 1;
    if (scrollProgress <= 0.75) return (0.75 - scrollProgress) / 0.05;
    return 0;
  }, [scrollProgress]);

  // Phase 4 (CTA - Ready to Partner): progress 0.75 to 1.00 (Blurred background)
  const ctaOpacity = useMemo(() => {
    if (scrollProgress < 0.75) return 0;
    if (scrollProgress < 0.80) return (scrollProgress - 0.75) / 0.05;
    return 1;
  }, [scrollProgress]);

  return (
    <section id="about" ref={containerRef} className="relative z-10 -mt-screen h-[500vh] w-full bg-[#030618]">
      {/* Sticky Fullscreen Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Canvas background with dynamic blur transition */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-300"
          style={{
            filter: `blur(${blurAmount}px)`,
            transform: blurAmount > 0 ? "scale(1.05)" : "scale(1)",
          }}
        />

        {/* Hero-style Dark Backdrop Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#030618]/85 via-[#030618]/60 to-[#030618]/90 pointer-events-none z-0" />

        {/* --- PHASE 1: ABOUT US OVERLAY --- */}
        <div
          className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-10 flex flex-col justify-center transition-opacity duration-300 pointer-events-none h-full"
          style={{
            opacity: aboutOpacity,
            display: aboutOpacity > 0.01 ? "flex" : "none",
          }}
        >
          <div className="max-w-2xl text-left pointer-events-auto">
            <span className="text-emerald-400 font-mono text-[11px] sm:text-sm font-semibold uppercase tracking-wider block mb-2 sm:mb-3">
              {a.tag}
            </span>
            <h2 className="text-white text-2xl sm:text-5xl font-bold tracking-tight leading-tight mb-3 sm:mb-5">
              {a.title}
            </h2>
            <p className="text-slate-300 text-xs sm:text-lg leading-relaxed mb-6 sm:mb-8 max-w-xl">
              {a.description}
            </p>
            <div>
              <a
                href="#services"
                className="inline-flex items-center gap-2 border border-emerald-500 text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 px-4 py-2.5 sm:px-6 sm:py-3.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer shadow-md hover:-translate-y-0.5 active:translate-y-0"
              >
                {a.ctaButton}
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* --- PHASE 2: TRUSTED BY NUMBERS OVERLAY --- */}
        <div
          className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-10 flex flex-col items-center justify-center transition-opacity duration-300 pointer-events-none h-full"
          style={{
            opacity: statsOpacity,
            display: statsOpacity > 0.01 ? "flex" : "none",
          }}
        >
          <div className="text-center mb-4 sm:mb-10 pointer-events-auto">
            <span className="text-emerald-400 font-mono text-[10px] sm:text-sm font-semibold uppercase tracking-wider block mb-1 sm:mb-2">
              {s.tag}
            </span>
            <h2 className="text-white text-xl sm:text-4xl font-bold tracking-tight">
              {s.title || "Performa & Kepercayaan Teruji"}
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6 w-full max-w-6xl text-center pointer-events-auto">
            {statsList.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  style={{ borderRadius: "0.875rem" }}
                  className="bg-gradient-to-b from-[#14223d]/90 via-[#0d162a]/90 to-[#070c19]/95 border border-[#1d2f50]/60 p-3 sm:p-7 flex flex-col items-center justify-center min-h-[100px] sm:min-h-[200px] shadow-xl shadow-black/40 backdrop-blur-md group hover:border-emerald-500/50 transition-all duration-300"
                >
                  <div
                    style={{ borderRadius: "50%" }}
                    className="w-7 h-7 sm:w-12 sm:h-12 bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-2 sm:mb-4 shrink-0 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all duration-300"
                  >
                    <Icon className="w-3.5 h-3.5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="text-xl sm:text-4xl font-extrabold text-white tracking-tight mb-0.5 sm:mb-2 font-mono group-hover:text-emerald-300 transition-colors">
                    <AnimatedStatValue
                      valStr={item.number}
                      progressRatio={countProgress}
                    />
                  </div>
                  <div className="text-slate-300 text-[11px] sm:text-sm font-medium leading-tight">
                    {item.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* --- PHASE 3: WHY CHOOSE US OVERLAY (Blurred Frame 95 Canvas) --- */}
        <div
          className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-10 flex flex-col justify-center transition-opacity duration-300 pointer-events-none h-full"
          style={{
            opacity: whyChooseUsOpacity,
            display: whyChooseUsOpacity > 0.01 ? "flex" : "none",
          }}
        >
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-2 sm:gap-6 mb-4 sm:mb-12 pointer-events-auto text-center lg:text-left">
            <div className="mx-auto lg:mx-0">
              <span className="text-emerald-400 font-mono text-[10px] sm:text-sm font-semibold uppercase tracking-wider block mb-1 sm:mb-2">
                {w.tag}
              </span>
              <h2 className="text-white text-xl sm:text-4xl font-bold tracking-tight max-w-md leading-tight mx-auto lg:mx-0">
                {w.title}
              </h2>
            </div>
            <p className="text-slate-300 text-xs sm:text-base leading-relaxed max-w-lg lg:text-right hidden sm:block">
              {w.description}
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6 w-full pointer-events-auto">
            {whyChooseUsItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  style={{ borderRadius: "0.875rem" }}
                  className="bg-gradient-to-b from-[#14223d]/90 via-[#0d162a]/90 to-[#070c19]/95 border border-[#1d2f50]/60 p-3.5 sm:p-7 flex flex-col justify-between min-h-[125px] sm:min-h-[220px] shadow-xl shadow-black/40 backdrop-blur-md group hover:border-emerald-500/50 transition-all duration-300"
                >
                  <div>
                    <div
                      style={{ borderRadius: "50%" }}
                      className="w-7 h-7 sm:w-12 sm:h-12 bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-2 sm:mb-5 shrink-0 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all duration-300"
                    >
                      <Icon className="w-3.5 h-3.5 sm:w-6 sm:h-6" />
                    </div>
                    <h3 className="text-white text-xs sm:text-lg font-bold mb-1 sm:mb-2 tracking-tight group-hover:text-emerald-300 transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-slate-300/90 text-[10px] sm:text-sm leading-snug line-clamp-3 sm:line-clamp-none">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* --- PHASE 4: CTA OVERLAY ("Ready to Partner with a Trusted Ally?" Blurred Frame 95 Canvas) --- */}
        <div
          className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-12 flex items-center justify-between transition-opacity duration-300 pointer-events-none h-full"
          style={{
            opacity: ctaOpacity,
            display: ctaOpacity > 0.01 ? "flex" : "none",
          }}
        >
          <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-8 pointer-events-auto bg-gradient-to-b from-[#14223d]/80 via-[#0d162a]/85 to-[#070c19]/90 border border-[#1d2f50]/70 p-5 sm:p-12 rounded-2xl sm:rounded-3xl shadow-2xl backdrop-blur-md">
            <div className="max-w-xl">
              <h2 className="text-white text-xl sm:text-5xl font-bold tracking-tight leading-tight mb-2 sm:mb-4">
                {c.title}
              </h2>
              <p className="text-slate-300 text-xs sm:text-lg leading-relaxed max-w-md">
                {c.description}
              </p>
            </div>

            <a
              href="https://wa.me/62812345678"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold px-5 py-3 sm:px-8 sm:py-4 rounded-xl text-xs sm:text-base transition-all duration-300 shadow-xl shadow-emerald-500/25 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer shrink-0"
            >
              {c.button}
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
