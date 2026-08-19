"use client";

import { motion } from "framer-motion";
import { Compass, Anchor, Ship } from "lucide-react";

interface LandingLoaderProps {
  fullScreen?: boolean;
  message?: string;
}

export function LandingLoader({
  fullScreen = true,
  message = "Loading SLS Maritime Experience...",
}: LandingLoaderProps) {
  return (
    <div
      className={`relative w-full ${
        fullScreen ? "fixed inset-0 z-50 min-h-screen" : "min-h-[400px] py-16"
      } bg-[#030618] flex flex-col items-center justify-center overflow-hidden text-slate-100 select-none`}
    >
      {/* Ambient Lighting Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-sky-500/10 rounded-full blur-[80px] pointer-events-none" />

      {/* Radar Dial Spinner */}
      <div className="relative flex items-center justify-center mb-8">
        {/* Outer Rotating Radar Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border border-emerald-500/20 border-t-emerald-400 border-r-emerald-500/60 shadow-[0_0_30px_rgba(16,185,129,0.2)]"
        />

        {/* Inner Counter-Rotating Ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          className="absolute w-20 h-20 sm:w-24 sm:h-24 rounded-full border border-sky-500/20 border-b-sky-400 border-l-sky-500/60"
        />

        {/* Radar Sweeping Beam Effect */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute w-28 h-28 sm:w-36 sm:h-36 rounded-full pointer-events-none overflow-hidden"
        >
          <div className="w-1/2 h-1/2 bg-gradient-to-br from-emerald-400/30 to-transparent origin-bottom-right transform translate-x-0 translate-y-0" />
        </motion.div>

        {/* Center Glowing Vessel Icon */}
        <div className="absolute w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-slate-900/90 border border-emerald-500/40 flex items-center justify-center shadow-lg shadow-emerald-500/20 backdrop-blur-md">
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Compass className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-400" />
          </motion.div>
        </div>
      </div>

      {/* Brand & Subtitle */}
      <div className="text-center px-4 max-w-md z-10 space-y-2">
        <h2 className="text-sm sm:text-base font-extrabold tracking-widest text-white uppercase font-mono drop-shadow-[0_2px_10px_rgba(16,185,129,0.3)]">
          PT. NAUTIVA OCEAN AGENCY
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 font-medium tracking-wide">
          {message}
        </p>

        {/* Shimmering Progress Bar */}
        <div className="w-48 sm:w-64 h-1 bg-slate-800/80 rounded-full mx-auto mt-4 overflow-hidden border border-slate-700/50">
          <motion.div
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-1/2 h-full bg-gradient-to-r from-transparent via-emerald-400 to-transparent rounded-full shadow-[0_0_12px_#10b981]"
          />
        </div>
      </div>
    </div>
  );
}
