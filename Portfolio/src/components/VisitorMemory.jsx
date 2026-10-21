import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Wand2, User, ShieldCheck } from "lucide-react";
import useSound from "use-sound";
import confetti from "canvas-confetti";

/**
 * VisitorMemory Component
 * Checks localStorage for 'mageName'. If no name exists, renders a high-fantasy,
 * screen-centered glassmorphism modal asking the traveler to identify themselves.
 * Once inscribed, persists to localStorage and triggers celebratory magic.
 */
export default function VisitorMemory({ onNameSaved, isMuted = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [playChime] = useSound("/sounds/chime.mp3", {
    soundEnabled: !isMuted,
    volume: 0.5,
  });

  const [playPop] = useSound("/sounds/pop.mp3", {
    soundEnabled: !isMuted,
    volume: 0.6,
  });

  useEffect(() => {
    try {
      const storedName = localStorage.getItem("mageName");
      if (!storedName || storedName.trim() === "") {
        // Small delay so entrance animation feels natural after initial mount
        const timer = setTimeout(() => setIsOpen(true), 600);
        return () => clearTimeout(timer);
      }
    } catch (e) {
      console.warn("localStorage access denied:", e);
    }
  }, []);

  const handleInscribe = (e) => {
    e?.preventDefault?.();
    const cleanName = nameInput.trim();

    if (!cleanName) {
      setErrorMsg("Whisper your true name, traveler!");
      return;
    }

    try {
      playPop();
    } catch (err) {}

    try {
      localStorage.setItem("mageName", cleanName);
    } catch (err) {
      console.warn("Could not save to localStorage:", err);
    }

    try {
      playChime();
    } catch (err) {}

    try {
      confetti({
        particleCount: 70,
        spread: 90,
        origin: { x: 0.5, y: 0.5 },
        colors: ["#a34063", "#fbbf24", "#38bdf8", "#fff8f1", "#5c4033"],
      });
    } catch (err) {}

    setIsOpen(false);
    if (onNameSaved) {
      onNameSaved(cleanName);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md select-none font-sans">
          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: -20 }}
            transition={{ type: "spring", damping: 22, stiffness: 260 }}
            className="relative w-full max-w-md bg-[#fff8f1] dark:bg-[#2b1f1a] border-4 border-[#5c4033] dark:border-amber-400 rounded-3xl shadow-[8px_8px_0px_#5c4033] dark:shadow-[8px_8px_0px_rgba(0,0,0,0.6)] p-6 sm:p-8 overflow-hidden text-center"
          >
            {/* Top Arcane Seals & Corner Accents */}
            <span className="absolute top-3 left-3 text-xs text-amber-500 font-bold">✦</span>
            <span className="absolute top-3 right-3 text-xs text-amber-500 font-bold">✦</span>
            <span className="absolute bottom-3 left-3 text-xs text-amber-500 font-bold">✦</span>
            <span className="absolute bottom-3 right-3 text-xs text-amber-500 font-bold">✦</span>

            {/* Glowing Icon Badge */}
            <div className="mx-auto w-14 h-14 rounded-2xl bg-[#a34063] text-white border-2 border-[#5c4033] dark:border-amber-400 shadow-[3px_3px_0px_#5c4033] flex items-center justify-center mb-4">
              <Wand2 className="w-7 h-7 text-amber-300 animate-pulse" />
            </div>

            {/* Title / Command */}
            <h3 className="font-serif font-black text-xl sm:text-2xl text-[#5c4033] dark:text-[#fff8f1] tracking-wide mb-2">
              Halt, Traveler!
            </h3>

            {/* Narrative prompt */}
            <p className="text-xs sm:text-sm font-medium text-[#5c4033]/85 dark:text-[#fff8f1]/85 mb-5 leading-relaxed">
              Identify yourself to enter the Grimoire. Inscribe your title so the realm may remember your presence across the ether.
            </p>

            {/* Inscription Form */}
            <form onSubmit={handleInscribe} className="flex flex-col gap-3">
              <div className="relative">
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => {
                    setNameInput(e.target.value);
                    if (errorMsg) setErrorMsg("");
                  }}
                  maxLength={30}
                  placeholder="Inscribe your name..."
                  autoFocus
                  required
                  className="w-full px-4 py-2.5 rounded-xl border-3 border-[#5c4033] dark:border-amber-400 bg-[#fbf5eb] dark:bg-[#1f1511] text-[#5c4033] dark:text-[#fff8f1] placeholder-[#5c4033]/45 font-bold text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#a34063] transition-all shadow-inner text-center"
                />
                <User className="w-4 h-4 text-[#5c4033]/40 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {errorMsg && (
                <p className="text-xs text-rose-600 dark:text-rose-400 font-bold">
                  {errorMsg}
                </p>
              )}

              {/* Glowing Inscribe Button */}
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#a34063] hover:brightness-110 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#5c4033] text-white font-extrabold text-sm sm:text-base shadow-[3.5px_3.5px_0px_#5c4033] dark:shadow-[3.5px_3.5px_0px_#eab308] border-2 border-[#5c4033] dark:border-amber-400 transition-all flex items-center justify-center gap-2 cursor-pointer mt-1"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>INSCRIBE IN GRIMOIRE 📜</span>
              </button>
            </form>

            {/* Footnote */}
            <p className="mt-3 text-[10px] font-mono text-[#5c4033]/60 dark:text-[#fff8f1]/60">
              ✦ Saved safely to your local crystal memory ✦
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
