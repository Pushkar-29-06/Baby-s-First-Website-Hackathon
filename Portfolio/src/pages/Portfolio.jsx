import React, { useState, useEffect } from "react";
import SparkleCursor from "../components/SparkleCursor";
import Header from "../components/Header";
import Hero from "../components/Hero";
import OriginStory from "../components/OriginStory";
import Spellbook from "../components/Spellbook";
import ScrollOfTruth from "../components/ScrollOfTruth";
import CrystalBall from "../components/CrystalBall";
import VisitorMemory from "../components/VisitorMemory";
import Footer from "../components/Footer";

/**
 * Portfolio Component (The Master Page)
 * Overhauled to a clean, modern, standard vertical-scrolling web page:
 * - Full-page wrapper: min-h-screen w-full relative transition-colors duration-700 overflow-x-hidden font-sans
 * - Day mode: bg-[#fff8f1] text-[#5c4033]. Night mode: bg-[#251b17] text-[#fff8f1]
 * - Soft blurry colored background orbs (filter blur-3xl opacity-30) in corners
 * - Global wand cursor with SparkleCursor trails
 * - Sticky Top Navbar (<Header/>) with Nav Pills, Dream Mode, Sounds, and Vintage Odometer
 * - Side-by-side Hero Section (<Hero/>) with bold typography, CTA, and 3D floating character (portfolio-char.png)
 * - Below-the-fold vertical content stack (<OriginStory/>, <Spellbook/>, <Footer/>)
 */
export default function Portfolio({ onBackToPortal }) {
  const [isNightMode, setIsNightMode] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [activeTab, setActiveTab] = useState("booting-up");

  useEffect(() => {
    if (isNightMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isNightMode]);

  const toggleNightMode = () => setIsNightMode((prev) => !prev);
  const toggleMuted = () => setIsMuted((prev) => !prev);

  return (
    <div
      className={`min-h-screen w-full max-w-[100vw] relative transition-colors duration-700 overflow-x-hidden font-sans select-none ${
        isNightMode ? "dark bg-[#251b17] text-[#fff8f1]" : "bg-[#fff8f1] text-[#5c4033]"
      }`}
    >
      {/* Interactive Global Sparkle Trail */}
      <SparkleCursor />

      {/* Soft Blurry Colored Orbs in Background Corners */}
      {/* Top-Right Berry Blob */}
      <div className="pointer-events-none fixed -top-24 -right-24 w-96 h-96 rounded-full bg-[#a34063] filter blur-3xl opacity-30 z-0" />
      {/* Bottom-Left Yellow Blob */}
      <div className="pointer-events-none fixed -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#eab308] filter blur-3xl opacity-30 z-0" />
      {/* Mid-Right Subtle Sky Blue Blob */}
      <div className="pointer-events-none fixed top-1/2 -right-32 w-80 h-80 rounded-full bg-[#38bdf8] filter blur-3xl opacity-15 z-0" />

      {/* Visitor Memory Inscription Modal (Checks localStorage) */}
      <VisitorMemory isMuted={isMuted} />

      {/* 2. The Navbar (Sticky Top) */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isNightMode={isNightMode}
        toggleNightMode={toggleNightMode}
        isMuted={isMuted}
        toggleMuted={toggleMuted}
        onBackToPortal={onBackToPortal}
      />

      {/* 3. The Hero Section (Side-by-Side) */}
      <Hero isMuted={isMuted} isNightMode={isNightMode} />

      {/* 4. Scrolling Content (Below the Fold) */}
      <main className="flex flex-col gap-16 sm:gap-24 md:gap-32 px-4 sm:px-8 md:px-12 lg:px-16 py-12 sm:py-16 md:py-24 max-w-7xl mx-auto relative z-10">
        {/* Section 1: Origin Story */}
        <OriginStory isNightMode={isNightMode} />

        {/* Section 2: Spellbook (Featured Projects: SamvaadAI, Insight Hub, AI Tutor) */}
        <Spellbook isNightMode={isNightMode} isMuted={isMuted} />

        {/* Section 3: Scroll of Truth (Torch/Flashlight Reveal) */}
        <ScrollOfTruth isNightMode={isNightMode} isMuted={isMuted} />

        {/* Section 4: The Crystal Ball (Tech Fortune Teller) */}
        <CrystalBall isNightMode={isNightMode} isMuted={isMuted} />

        {/* Section 5: Footer (Guestbook & Secret Mushroom Easter Egg) */}
        <Footer isNightMode={isNightMode} />
      </main>
    </div>
  );
}
