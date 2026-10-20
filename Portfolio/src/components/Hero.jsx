import React, { useState } from "react";
import { motion } from "framer-motion";
import useSound from "use-sound";
import confetti from "canvas-confetti";
import { Sparkles } from "lucide-react";
import characterImg from "../assets/1792262595671.png";
import CharacterShowcase from "./CharacterShowcase";

/**
 * Hero Component (Side-by-Side Responsive Layout)
 * Matches portfolio.png reference:
 * - Left Side: Bold typography "HELLO! I'M AYUSH ✦", "The Junior Data Weaver & AI Alchemist.",
 *   and "Scroll to Explore ✨" CTA button with smooth scroll.
 * - Right Side: Interactive character (portfolio-char.png) on cloud with gentle floating,
 *   3D parallax physics following mouse, and lowered "Double Click for Sparkles!" bubble.
 * - Responsive scaling across mobile, tablet, and desktop screens.
 */
export default function Hero({ isMuted, isNightMode }) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const [playPop] = useSound("/sounds/pop.mp3", {
    soundEnabled: !isMuted,
    volume: 0.6,
  });

  const handlePointerMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    setOffset({ x, y });
  };

  const handlePointerLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  const triggerMagic = (e) => {
    e?.stopPropagation?.();
    if (!isMuted) {
      try {
        playPop();
      } catch (err) {}
    }
    try {
      confetti({
        particleCount: 65,
        spread: 80,
        origin: { x: 0.7, y: 0.45 },
        colors: ["#a34063", "#eab308", "#38bdf8", "#ec4899", "#fff8f1"],
      });
    } catch (err) {}
  };

  const triggerDblClick = (e) => {
    e?.stopPropagation?.();
    if (!isMuted) {
      try {
        playPop();
      } catch (err) {}
    }
    try {
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { x: 0.7, y: 0.45 },
        colors: ["#a34063", "#fbbf24", "#38bdf8", "#ec4899", "#fff8f1", "#5c4033"],
      });
    } catch (err) {}
  };

  const scrollToExplore = () => {
    const el = document.getElementById("origin-story-divider") || document.getElementById("journey-section") || document.getElementById("projects-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="hero-section"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="min-h-[85vh] w-full flex flex-col md:flex-row items-center justify-between px-4 md:px-16 pt-8 md:pt-0 text-center md:text-left relative select-none"
    >
      {/* ════════════════════════════════════════════════════════════════
          LEFT SIDE: Typography & CTA (50% Width)
         ════════════════════════════════════════════════════════════════ */}
      <div className="w-full md:w-1/2 flex flex-col items-center md:items-start z-10 relative py-6 md:py-12">
        {/* Ambient star sparkles matching portfolio.png */}
        <div className="absolute -top-4 left-2 text-amber-500 font-bold text-sm pointer-events-none animate-pulse">✦</div>
        <div className="absolute top-12 -left-3 text-current/40 text-xs pointer-events-none">✧</div>
        <div className="absolute bottom-16 -left-2 text-amber-400 text-xs pointer-events-none">✦</div>
        <div className="absolute bottom-6 right-12 text-current/30 text-xs pointer-events-none">•</div>

        {/* Section 1 Identifier Pill Tag (Booting Up) */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full mb-3 text-xs font-mono font-bold tracking-wider uppercase border border-[#382b26]/20 dark:border-[#fff8f1]/20 bg-[#f0dfd5] dark:bg-[#3d2b23] shadow-xs"
             style={{ color: isNightMode ? "#fff8f1" : "#382b26" }}>
          <span className="text-amber-500">✦</span>
          <span>BOOTING UP</span>
          <span className="text-amber-500">✦</span>
        </div>

        {/* Big Bold Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1
            className="font-extrabold tracking-tight font-sans leading-none"
            style={{ color: isNightMode ? "#fff8f1" : "#382b26" }}
          >
            <span className="block text-5xl md:text-7xl lg:text-8xl">
              HELLO!
            </span>
            <span className="flex items-center justify-center md:justify-start gap-2 sm:gap-3 text-5xl md:text-7xl lg:text-8xl mt-1 sm:mt-2">
              I'M AYUSH
              <span className="text-amber-400 text-3xl sm:text-5xl lg:text-6xl inline-block animate-pulse">
                ✦
              </span>
            </span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mt-4 sm:mt-5 tracking-tight max-w-lg leading-snug opacity-90"
          style={{ color: isNightMode ? "#fff8f1" : "#382b26" }}
        >
          The Junior Data Weaver &amp; AI Alchemist.
        </motion.p>

        {/* Call to Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 sm:mt-8 flex items-center justify-center md:justify-start gap-3 sm:gap-4 relative"
        >
          <button
            type="button"
            onClick={scrollToExplore}
            className="px-6 sm:px-8 py-3 sm:py-3.5 rounded-2xl bg-[#5c4033] dark:bg-[#a34063] text-[#fff8f1] font-extrabold text-sm sm:text-base shadow-[4px_4px_0px_rgba(0,0,0,0.3)] hover:brightness-110 active:scale-95 transition-all flex items-center gap-2.5 cursor-pointer border-2 border-current/20"
          >
            <span>Scroll to Explore</span>
            <Sparkles className="w-4 h-4 text-amber-300" />
          </button>

          {/* Doodle sparkle near button */}
          <span className="text-amber-500 font-bold text-lg select-none pointer-events-none">
            ✧
          </span>
        </motion.div>
      </div>

      {/* ════════════════════════════════════════════════════════════════
          RIGHT SIDE: Interactive Character Showcase (2D / 3D Toggle)
         ════════════════════════════════════════════════════════════════ */}
      <div className="w-full md:w-1/2 mt-10 md:mt-0 flex items-center justify-center relative py-4 md:py-0 overflow-visible">
        <CharacterShowcase
          imageSrc={characterImg}
          alt="Ayush The Junior Data Weaver"
          isNightMode={isNightMode}
          isMuted={isMuted}
        />
      </div>
    </section>
  );
}
