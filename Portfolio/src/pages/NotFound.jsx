import React from "react";
import { motion } from "framer-motion";
import { Compass, Sparkles, Wand2, ArrowLeft } from "lucide-react";
import useSound from "use-sound";
import confetti from "canvas-confetti";

/**
 * NotFound Component ("Lost in the Void" 404 Page)
 * Full-screen deep cosmic void theme contrasting with the bright parchment realm.
 * Features glowing 404 runes, unstable magical particles, and a teleportation CTA.
 */
export default function NotFound({ onTeleport, isMuted = false }) {
  const [playPop] = useSound("/sounds/pop.mp3", {
    soundEnabled: !isMuted,
    volume: 0.6,
  });

  const [playChime] = useSound("/sounds/chime.mp3", {
    soundEnabled: !isMuted,
    volume: 0.6,
  });

  const handleTeleport = () => {
    try {
      playPop();
    } catch (e) {}

    try {
      playChime();
    } catch (e) {}

    try {
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { x: 0.5, y: 0.6 },
        colors: ["#a34063", "#38bdf8", "#fbbf24", "#c084fc", "#fff8f1"],
      });
    } catch (e) {}

    if (onTeleport) {
      onTeleport();
    } else {
      window.location.href = "/";
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0a0612] text-[#fff8f1] flex flex-col items-center justify-center p-6 text-center select-none relative overflow-hidden font-sans">
      {/* ════════════════════════════════════════════════════════════════
          COSMIC VOID BACKGROUND EFFECTS
         ════════════════════════════════════════════════════════════════ */}
      {/* Deep Violet Nebula Blob */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-radial from-violet-900/30 via-fuchsia-900/10 to-transparent blur-3xl pointer-events-none -top-24 -left-24" />
      {/* Glowing Cyan Anomaly Blob */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-radial from-sky-900/25 via-purple-900/10 to-transparent blur-3xl pointer-events-none -bottom-24 -right-24" />

      {/* Floating Void Particles / Runes */}
      <div className="absolute top-1/4 left-16 text-purple-400 text-sm font-serif opacity-40 animate-pulse pointer-events-none">
        ᛟ
      </div>
      <div className="absolute top-1/3 right-20 text-cyan-400 text-xs font-serif opacity-35 animate-bounce pointer-events-none">
        ✦
      </div>
      <div className="absolute bottom-1/4 left-24 text-amber-400 text-base font-serif opacity-30 animate-pulse pointer-events-none">
        ✵
      </div>
      <div className="absolute bottom-1/3 right-16 text-pink-400 text-sm font-serif opacity-40 animate-ping pointer-events-none">
        ᚦ
      </div>

      {/* ════════════════════════════════════════════════════════════════
          CENTRAL VOID PORTAL & 404 RUNES
         ════════════════════════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 25 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 max-w-xl flex flex-col items-center"
      >
        {/* Floating Compass Anomaly */}
        <div className="relative mb-4">
          <div className="w-20 h-20 rounded-full border-2 border-dashed border-purple-500/50 animate-[spin_16s_linear_infinite] flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-purple-950/80 border border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.5)] flex items-center justify-center">
              <Compass className="w-7 h-7 text-amber-300 animate-pulse" />
            </div>
          </div>
          <span className="absolute -top-1 -right-1 text-xs text-amber-400 animate-ping">
            ✦
          </span>
        </div>

        {/* Large Glowing "404" */}
        <h1 className="text-8xl sm:text-9xl md:text-[10rem] font-black font-serif tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-[#fff8f1] via-purple-300 to-purple-800 drop-shadow-[0_0_35px_rgba(192,132,252,0.55)]">
          404
        </h1>

        {/* Void Title */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/40 text-purple-300 text-xs sm:text-sm font-mono font-bold uppercase tracking-widest mt-2 mb-4 shadow-inner">
          <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
          <span>REALM BREACH DETECTED</span>
        </div>

        {/* Narrative Description as required */}
        <p className="text-sm sm:text-base md:text-lg text-[#fff8f1]/80 font-medium leading-relaxed max-w-md mb-8">
          You have stepped outside the known Realm. The magic here is unstable, and the ether has swallowed your path.
        </p>

        {/* Teleportation CTA Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={handleTeleport}
          className="group relative inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-full border-2 border-amber-300 bg-gradient-to-r from-[#a34063] via-purple-700 to-[#a34063] text-white font-serif font-black text-sm sm:text-base tracking-wide shadow-[0_0_25px_rgba(251,191,36,0.45)] hover:shadow-[0_0_35px_rgba(251,191,36,0.65)] transition-all cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-amber-300 transition-transform group-hover:rotate-12" />
          <span>Teleport back to the Grimoire</span>
          <ArrowLeft className="w-4 h-4 text-amber-200 rotate-180 group-hover:translate-x-1 transition-transform" />
        </motion.button>

        {/* Footnote Rune */}
        <p className="mt-8 font-mono text-[11px] text-purple-400/60 tracking-wider">
          ✦ Coordinates: 0xDEADBEEF // Null Sector ✦
        </p>
      </motion.div>
    </div>
  );
}
