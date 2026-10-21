import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Eye, Copy, Check, Flame, KeyRound, ShieldAlert } from "lucide-react";
import useSound from "use-sound";
import confetti from "canvas-confetti";

/**
 * ScrollOfTruth Component (Flashlight / Torch Reveal)
 * A pitch-dark ancient scroll where the user sweeps their cursor (or touch)
 * like a magical torch to reveal glowing runes, secrets, and Archmage lore.
 */
export default function ScrollOfTruth({ isNightMode = false, isMuted = false }) {
  const containerRef = useRef(null);
  const [mouse, setMouse] = useState({ x: 260, y: 180 });
  const [isHovered, setIsHovered] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [torchSize, setTorchSize] = useState(160);
  const [copiedCode, setCopiedCode] = useState(false);
  const [alwaysLit, setAlwaysLit] = useState(false);

  const [playPop] = useSound("/sounds/pop.mp3", {
    soundEnabled: !isMuted,
    volume: 0.5,
  });

  const [playChime] = useSound("/sounds/chime.mp3", {
    soundEnabled: !isMuted,
    volume: 0.5,
  });

  // Calculate mouse or touch coordinate relative to container
  const updateTorchCoords = (clientX, clientY) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
    const y = Math.max(0, Math.min(rect.height, clientY - rect.top));
    setMouse({ x, y });
    setHasInteracted(true);
  };

  const handleMouseMove = (e) => {
    updateTorchCoords(e.clientX, e.clientY);
  };

  const handleTouchMove = (e) => {
    if (e.touches && e.touches[0]) {
      updateTorchCoords(e.touches[0].clientX, e.touches[0].clientY);
      setIsHovered(true);
    }
  };

  const handleTouchStart = (e) => {
    if (e.touches && e.touches[0]) {
      updateTorchCoords(e.touches[0].clientX, e.touches[0].clientY);
      setIsHovered(true);
    }
  };

  // Center the torch initially when mounted
  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMouse({ x: rect.width / 2, y: rect.height / 2 });
    }
  }, []);

  const handleCopySecret = (e) => {
    e.stopPropagation();
    try {
      playChime();
    } catch (err) {}
    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { x: 0.5, y: 0.6 },
        colors: ["#fbbf24", "#a34063", "#38bdf8", "#fff8f1"],
      });
    } catch (err) {}

    navigator.clipboard?.writeText("404_MAGIC_NOT_FOUND");
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  // Dynamic gradient string acting as the Torch
  const torchGradient = alwaysLit
    ? "none"
    : isHovered || !hasInteracted
    ? `radial-gradient(${torchSize}px circle at ${mouse.x}px ${mouse.y}px, transparent 15%, rgba(13, 10, 18, 0.94) 80%, rgba(13, 10, 18, 0.98) 100%)`
    : `radial-gradient(130px circle at ${mouse.x}px ${mouse.y}px, transparent 10%, rgba(13, 10, 18, 0.95) 85%, rgba(13, 10, 18, 0.99) 100%)`;

  return (
    <section id="scroll-of-truth-section" className="w-full max-w-4xl mx-auto select-none font-sans px-3 sm:px-6 py-6">
      {/* ════════════════════════════════════════════════════════════════
          SECTION HEADER
         ════════════════════════════════════════════════════════════════ */}
      <div className="flex items-center justify-center gap-3 sm:gap-4 my-6 sm:my-8">
        <div
          className="flex-1 h-[2px]"
          style={{
            backgroundColor: isNightMode
              ? "rgba(255, 248, 241, 0.2)"
              : "rgba(56, 43, 38, 0.2)",
          }}
        />
        <div className="flex items-center gap-2 text-xl sm:text-2xl md:text-3xl font-extrabold font-serif tracking-widest uppercase">
          <span className="text-amber-500 animate-pulse">✦</span>
          <span style={{ color: isNightMode ? "#fff8f1" : "#382b26" }}>
            SCROLL OF TRUTH
          </span>
          <span className="text-amber-500 animate-pulse">✦</span>
        </div>
        <div
          className="flex-1 h-[2px]"
          style={{
            backgroundColor: isNightMode
              ? "rgba(255, 248, 241, 0.2)"
              : "rgba(56, 43, 38, 0.2)",
          }}
        />
      </div>

      {/* Subtitle / Interaction Instructions */}
      <div className="text-center max-w-2xl mx-auto mb-6 px-2">
        <p
          className="text-xs sm:text-sm md:text-base font-medium opacity-90 leading-relaxed"
          style={{ color: isNightMode ? "#fff8f1" : "#382b26" }}
        >
          Sweep your mystic torch across the pitch-dark parchment to reveal hidden prophecies, Archmage secrets, and arcane Easter eggs.
        </p>

        {/* Torch Controls Bar */}
        <div className="mt-3 flex items-center justify-center flex-wrap gap-2.5 sm:gap-4 text-xs font-mono font-bold">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fff8f1] dark:bg-[#382b26] border-2 border-[#5c4033] dark:border-amber-400 text-[#5c4033] dark:text-[#fff8f1] shadow-xs">
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            <span>Torch Status: {isHovered ? "Illuminating" : "Idle"}</span>
          </span>

          {/* Toggle Always Lit Button for accessibility & touch devices */}
          <button
            type="button"
            onClick={() => {
              setAlwaysLit(!alwaysLit);
              try { playPop(); } catch (e) {}
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fff8f1] dark:bg-[#382b26] border-2 border-[#5c4033] dark:border-amber-400 hover:bg-[#faebd7] active:scale-95 text-[#5c4033] dark:text-[#fff8f1] shadow-xs transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#a34063] dark:text-amber-300" />
            <span>{alwaysLit ? "Restore Darkness 🌑" : "Summon Full Light 💡"}</span>
          </button>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════
          THE PARCHMENT SCROLL CONTAINER
         ════════════════════════════════════════════════════════════════ */}
      <div className="relative w-full max-w-3xl mx-auto rounded-3xl border-3 sm:border-4 border-[#5c4033] dark:border-amber-500/60 shadow-[8px_8px_0px_#5c4033] dark:shadow-[8px_8px_0px_rgba(0,0,0,0.6)] overflow-hidden">
        {/* Ancient Top Roller Bar */}
        <div className="w-full bg-[#382b26] border-b-3 border-[#241a16] px-4 py-2 flex items-center justify-between text-[#fff8f1] z-30 relative select-none">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="font-serif text-[11px] sm:text-xs font-bold tracking-widest uppercase">
              ✦ CLASSIFIED ARCHMAGE CODEX // AIML REALM ✦
            </span>
          </div>
          <span className="text-[10px] font-mono text-amber-300/80">
            {alwaysLit ? "UNVEILED" : "SHROUDED"}
          </span>
        </div>

        {/* ════════════════════════════════════════════════════════════
            INTERACTIVE TORCH AREA
           ════════════════════════════════════════════════════════════ */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchMove={handleTouchMove}
          onTouchStart={handleTouchStart}
          onTouchEnd={() => {
            // Keep lighted briefly after touch release
            setTimeout(() => setIsHovered(false), 2000);
          }}
          className="relative w-full min-h-[380px] sm:min-h-[420px] bg-[#fbf5eb] dark:bg-[#1a120e] cursor-crosshair overflow-hidden p-6 sm:p-10 flex flex-col justify-between"
        >
          {/* ════════════════════════════════════════════════════════
              REVEAL LAYER 1: Deep Background Ancient Watermark & Runes
             ════════════════════════════════════════════════════════ */}
          <div className="absolute inset-0 pointer-events-none opacity-20 flex items-center justify-center">
            <div className="w-72 h-72 rounded-full border-4 border-dashed border-[#5c4033] animate-[spin_60s_linear_infinite]" />
            <span className="absolute font-serif text-8xl font-black text-[#5c4033]">ᛟ</span>
          </div>

          {/* ════════════════════════════════════════════════════════
              REVEAL LAYER 2: The Glowing Secrets Content
             ════════════════════════════════════════════════════════ */}
          <div className="relative z-10 flex flex-col gap-5 sm:gap-6 text-center sm:text-left select-none">
            {/* Secret 1: Archmages Reveal */}
            <div className="p-3 sm:p-4 rounded-2xl bg-amber-100/90 dark:bg-amber-950/80 border-2 border-amber-500 shadow-sm transition-transform hover:scale-[1.01]">
              <div className="flex items-center gap-2 mb-1 justify-center sm:justify-start">
                <span className="text-base sm:text-lg">💫</span>
                <h4 className="font-serif font-black text-sm sm:text-base md:text-lg text-[#5c4033] dark:text-amber-200 tracking-wide">
                  Archmages of this Realm
                </h4>
              </div>
              <p className="text-xs sm:text-sm font-bold text-[#382b26] dark:text-amber-100/90 leading-relaxed">
                "Team TechnoBytes are the Archmages of this Realm! Bound by code and neural weights, weaving full-stack magic for the Hackathon."
              </p>
            </div>

            {/* Secret 2: Secret Code with Click-to-Copy */}
            <div className="p-3 sm:p-4 rounded-2xl bg-rose-100/90 dark:bg-rose-950/80 border-2 border-[#a34063] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-center sm:text-left">
                <div className="flex items-center gap-1.5 justify-center sm:justify-start">
                  <KeyRound className="w-4 h-4 text-[#a34063] dark:text-rose-300" />
                  <span className="font-serif font-extrabold text-xs sm:text-sm text-[#a34063] dark:text-rose-200">
                    Arcane Passphrase
                  </span>
                </div>
                <div className="font-mono font-black text-sm sm:text-base text-[#5c4033] dark:text-rose-100 mt-0.5 tracking-wider">
                  ✨ Secret Code: 404_MAGIC_NOT_FOUND
                </div>
              </div>

              <button
                type="button"
                onClick={handleCopySecret}
                className="px-3.5 py-1.5 rounded-xl bg-[#a34063] text-white font-extrabold text-xs shadow-[2px_2px_0px_#5c4033] hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                {copiedCode ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Inscribed!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Rune</span>
                  </>
                )}
              </button>
            </div>

            {/* Secret 3: Arcane Prophecy & Footer Easter Egg Hint */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="p-3 rounded-xl bg-sky-100/90 dark:bg-sky-950/80 border-2 border-sky-500 shadow-sm">
                <div className="font-serif font-bold text-xs text-sky-900 dark:text-sky-200 mb-1 flex items-center gap-1">
                  <span>⚡</span>
                  <span>Neural Prophecy</span>
                </div>
                <p className="text-[11px] sm:text-xs text-[#382b26] dark:text-sky-100/90 font-medium leading-relaxed">
                  "He who harmonizes backend endpoints with responsive frontend runes shall conquer the hackathon."
                </p>
              </div>

              <div className="p-3 rounded-xl bg-emerald-100/90 dark:bg-emerald-950/80 border-2 border-emerald-600 shadow-sm">
                <div className="font-serif font-bold text-xs text-emerald-900 dark:text-emerald-200 mb-1 flex items-center gap-1">
                  <span>🍄</span>
                  <span>Mushroom Chamber Hint</span>
                </div>
                <p className="text-[11px] sm:text-xs text-[#382b26] dark:text-emerald-100/90 font-medium leading-relaxed">
                  "The tiny red mushroom in the footer holds an Easter Egg overdrive spell. Click it 5 times to see chaos!"
                </p>
              </div>
            </div>

            {/* Secret 4: Ancient Gothic Runes Line */}
            <div className="py-2 text-center text-xs sm:text-sm font-serif tracking-[0.35em] text-[#5c4033]/90 dark:text-amber-300/80 font-black">
              ✦ ᚱ ᚦ ᚠ ᛟ 🔮 📜 ⚔️ ✵ ᚛ ᛊ ᛏ ᛒ ᛖ ᛗ ᛚ ᚜ ✦
            </div>
          </div>

          {/* ════════════════════════════════════════════════════════
              DARK OVERLAY LAYER: Dynamic Radial Torch
             ════════════════════════════════════════════════════════ */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-20"
            style={{
              background: torchGradient,
            }}
          />

          {/* Glowing Torch Ring Cursor Indicator */}
          {!alwaysLit && (isHovered || !hasInteracted) && (
            <div
              className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-amber-300/60 shadow-[0_0_30px_rgba(251,191,36,0.4)] transition-transform duration-75 z-25"
              style={{
                left: mouse.x,
                top: mouse.y,
                width: torchSize * 1.6,
                height: torchSize * 1.6,
              }}
            >
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_8px_#f59e0b] opacity-80" />
            </div>
          )}

          {/* Idle Prompt Banner when not hovered */}
          {!alwaysLit && !isHovered && hasInteracted && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
              <div className="px-4 py-2 rounded-2xl bg-[#fff8f1]/95 dark:bg-[#251b17]/95 border-2 border-amber-500 shadow-[4px_4px_0px_#5c4033] text-[#5c4033] dark:text-[#fff8f1] font-extrabold text-xs sm:text-sm flex items-center gap-2 animate-bounce">
                <span>🔦 Move cursor / drag finger to shine torch!</span>
              </div>
            </div>
          )}
        </div>

        {/* Ancient Bottom Roller Bar */}
        <div className="w-full bg-[#382b26] border-t-3 border-[#241a16] px-4 py-2 flex items-center justify-between text-[#fff8f1] z-30 relative select-none">
          <span className="text-[10px] sm:text-[11px] font-mono text-amber-300/80">
            Coordinates: X: {Math.round(mouse.x)} | Y: {Math.round(mouse.y)}
          </span>
          <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            RUNE CHAMBER: ACTIVE
          </span>
        </div>
      </div>
    </section>
  );
}
