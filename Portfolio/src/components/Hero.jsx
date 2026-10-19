import React, { useState } from "react";
import { motion } from "framer-motion";
import useSound from "use-sound";
import confetti from "canvas-confetti";
import { Sparkles } from "lucide-react";
import characterImg from "../assets/1792262595671.png";

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
      className="min-h-[85vh] w-full flex flex-col md:flex-row items-center justify-between px-4 sm:px-8 md:px-12 lg:px-16 pt-6 sm:pt-10 md:pt-0 relative select-none"
    >
      {/* ════════════════════════════════════════════════════════════════
          LEFT SIDE: Typography & CTA (50% Width)
         ════════════════════════════════════════════════════════════════ */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-start z-10 relative py-6 md:py-12">
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
            <span className="block text-4xl sm:text-6xl md:text-7xl lg:text-8xl">
              HELLO!
            </span>
            <span className="flex items-center gap-2 sm:gap-3 text-4xl sm:text-6xl md:text-7xl lg:text-8xl mt-1 sm:mt-2">
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
          className="mt-6 sm:mt-8 flex items-center gap-3 sm:gap-4 relative"
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
          RIGHT SIDE: Interactive Character on Cloud (50% Width)
         ════════════════════════════════════════════════════════════════ */}
      <div className="w-full md:w-1/2 flex items-center justify-center relative py-6 md:py-0 overflow-visible">
        {/* Continuous Floating Motion + Parallax Tilt following mouse */}
        <motion.div
          animate={{
            y: [0, -12, 0],
            rotateX: -offset.y * 10,
            rotateY: offset.x * 10,
          }}
          transition={{
            y: { repeat: Infinity, duration: 4, ease: "easeInOut" },
            rotateX: { type: "spring", stiffness: 120, damping: 14 },
            rotateY: { type: "spring", stiffness: 120, damping: 14 },
          }}
          style={{ transformStyle: "preserve-3d" }}
          className="relative inline-block overflow-visible cursor-pointer"
          onClick={triggerMagic}
          onDoubleClick={triggerDblClick}
          title="Click Ayush for magical sparkles!"
        >
          {/* Comic Speech Bubble 1: "Double Click for Sparkles!" (Positioned lower as requested) */}
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            onClick={triggerDblClick}
            className="absolute top-8 sm:top-12 -left-2 sm:-left-10 z-30 cursor-pointer group scale-90 sm:scale-100"
          >
            <div className="bg-[#fffdf9] border-2 border-[#5c4033] px-3 py-1.5 rounded-2xl shadow-[2.5px_2.5px_0px_#5c4033] hover:scale-105 active:scale-95 transition-transform flex items-center gap-1.5 text-center">
              <span className="text-[10px] sm:text-xs font-bold text-[#5c4033] leading-tight font-sans">
                Double Click<br />for Sparkles!
              </span>
              <span className="text-amber-500 font-bold text-xs">✦</span>
            </div>
            {/* Curved arrow pointing to Ayush */}
            <svg
              className="w-5 sm:w-6 h-5 sm:h-6 text-[#5c4033] absolute -bottom-3 right-1 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17 3 C12 8, 8 14, 5 19" />
              <path d="M4 14 L5 19 L10 18" />
            </svg>
          </motion.div>

          {/* Comic Speech Bubble 2: Right "click to make magic" */}
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
            onClick={triggerMagic}
            className="absolute top-12 sm:top-16 -right-2 sm:-right-8 z-30 cursor-pointer group scale-90 sm:scale-100"
          >
            <div className="bg-[#fffdf9] border-2 border-[#5c4033] px-3.5 py-1.5 rounded-2xl shadow-[2.5px_2.5px_0px_#5c4033] hover:scale-105 active:scale-95 transition-transform flex items-center gap-1.5 text-center">
              <span className="text-[10px] sm:text-xs font-bold text-[#5c4033] leading-tight font-sans">
                click to<br />make magic
              </span>
              <span className="text-amber-500 font-bold text-xs">✦</span>
            </div>
            {/* Curved arrow pointing to Ayush */}
            <svg
              className="w-5 h-5 text-[#5c4033] absolute top-7 -left-2 group-hover:-translate-x-0.5 transition-transform"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 7 C14 10, 8 13, 3 15" />
              <path d="M8 12 L3 15 L7 18" />
            </svg>
          </motion.div>

          {/* Ayush Reading Spellbook on Cloud Image (1792262595671.png) */}
          <img
            src={characterImg}
            alt="Ayush The Junior Data Weaver"
            className={`w-64 sm:w-80 md:w-96 lg:w-[440px] max-w-full object-contain select-none drop-shadow-2xl ${
              isNightMode ? "" : "mix-blend-multiply"
            }`}
          />
        </motion.div>
      </div>
    </section>
  );
}
