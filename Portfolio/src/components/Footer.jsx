import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, BookMarked, Send, Heart } from "lucide-react";
import { playLevelUpSound } from "../utils/audio";
import characterImg from "../assets/1792262595671.png";

/**
 * Footer Component (The Enchanted Guestbook & Archmage Overdrive Easter Egg)
 * Styled with warm parchment fill (#fbf5eb), dark brown borders (#382b26),
 * and tactile 3D shadow matching the portfolio.png reference aesthetic.
 */
export default function Footer({ isNightMode, onClaimBadge }) {
  const API_BASE_URL = "http://localhost:5000/api";

  const [isOverdrive, setIsOverdrive] = useState(false);
  const [triggerCount, setTriggerCount] = useState(0);
  const [guestName, setGuestName] = useState("");
  const [guestNote, setGuestNote] = useState("");
  const [entries, setEntries] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAll, setShowAll] = useState(false);

  // Fetch existing guestbook entries on mount
  useEffect(() => {
    fetch(`${API_BASE_URL}/guestbook`)
      .then((res) => res.json())
      .then((data) => setEntries(data))
      .catch(console.error);
  }, []);

  const handleSignGuestbook = async (e) => {
    e.preventDefault();
    if (!guestName.trim() || !guestNote.trim()) return;
    setIsSubmitting(true);

    try {
      const payload = {
        name: guestName.trim(),
        message: guestNote.trim(),
        timestamp: new Date().toISOString(),
      };
      const res = await fetch(`${API_BASE_URL}/guestbook`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (result.success) {
        // Re-fetch full list so order is always correct
        const freshRes = await fetch(`${API_BASE_URL}/guestbook`);
        const freshData = await freshRes.json();
        setEntries(freshData);
        setGuestName("");
        setGuestNote("");
      }
    } catch (err) {
      console.error("Guestbook submit failed:", err);
    } finally {
      setIsSubmitting(false);
    }

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ["#a34063", "#eab308", "#fff8f1", "#5c4033"],
      });
    } catch (err) {}
  };

  const handleMushroomClick = async (e) => {
    e?.stopPropagation?.();
    playLevelUpSound();

    const brightGoldBerryColors = [
      "#fbbf24",
      "#f59e0b",
      "#eab308",
      "#fde047",
      "#a34063",
      "#be185d",
      "#ffffff",
      "#ffd700",
    ];

    try {
      confetti({
        particleCount: 200,
        spread: 160,
        origin: { y: 0.6 },
        colors: brightGoldBerryColors,
        shapes: ["star"],
      });
    } catch (err) {
      try {
        confetti({
          particleCount: 200,
          spread: 160,
          origin: { y: 0.6 },
          colors: brightGoldBerryColors,
        });
      } catch (e2) {}
    }

    setIsOverdrive(true);

    // Notify backend about the Easter Egg trigger
    try {
      const res = await fetch(`${API_BASE_URL}/easter-egg/trigger`, {
        method: "POST",
      });
      const data = await res.json();
      setTriggerCount(data.overdrive_triggers);
    } catch (err) {
      console.error("Easter-egg trigger failed:", err);
    }
  };

  const handleClaimBadge = (e) => {
    e?.stopPropagation?.();
    setIsOverdrive(false);

    try {
      sessionStorage.setItem("masterAlchemistBadge", "true");
    } catch (err) {}

    window.dispatchEvent(new CustomEvent("claim-master-badge"));
    onClaimBadge?.();

    try {
      confetti({
        particleCount: 150,
        spread: 120,
        origin: { y: 0.5 },
        colors: ["#fbbf24", "#a34063", "#ffffff", "#ffd700"],
      });
    } catch (err) {}
  };

  return (
    <footer id="guestbook-section" className="w-full relative select-none">
      {/* Section Divider */}
      <div className="flex items-center justify-center gap-3 sm:gap-4 my-8 sm:my-12">
        <div
          className="flex-1 h-[2px]"
          style={{ backgroundColor: isNightMode ? "rgba(255, 248, 241, 0.25)" : "rgba(56, 43, 38, 0.25)" }}
        />
        <div className="flex items-center gap-2 text-xl sm:text-2xl md:text-3xl font-extrabold font-serif tracking-widest uppercase">
          <span className="text-amber-500">✦</span>
          <span style={{ color: isNightMode ? "#fff8f1" : "#382b26" }}>GUESTBOOK &amp; TELEMETRY</span>
          <span className="text-amber-500">✦</span>
        </div>
        <div
          className="flex-1 h-[2px]"
          style={{ backgroundColor: isNightMode ? "rgba(255, 248, 241, 0.25)" : "rgba(56, 43, 38, 0.25)" }}
        />
      </div>

      {/* Guestbook Card */}
      <div className="rounded-3xl border-2 border-[#382b26] dark:border-[#fff8f1]/30 bg-[#fbf5eb] dark:bg-[#2e211b] p-5 sm:p-8 shadow-[4px_4px_0px_#382b26] dark:shadow-[4px_4px_0px_rgba(0,0,0,0.5)] mb-8">
        <div className="flex items-center gap-2.5 mb-2">
          <BookMarked className="w-6 h-6 text-[#a34063] dark:text-amber-400" />
          <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#382b26] dark:text-[#fff8f1]">
            Enchanted Guestbook
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-[#382b26]/80 dark:text-[#fff8f1]/80 mb-6">
          Inscribe your blessing, feedback, or whisper a greeting into the data grimoire.
        </p>

        {/* Signing Form */}
        <form onSubmit={handleSignGuestbook} className="space-y-3 mb-6">
          <input
            type="text"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            placeholder="Your Name or Mage Moniker"
            className="w-full px-4 py-2.5 rounded-2xl text-xs sm:text-sm border-2 border-[#382b26] bg-[#fff8f1] dark:bg-[#251b17] text-[#382b26] dark:text-[#fff8f1] placeholder-[#382b26]/40 dark:placeholder-[#fff8f1]/40 focus:outline-none focus:ring-2 focus:ring-[#a34063] transition-all shadow-inner"
          />
          <div className="flex flex-col md:flex-row gap-4 w-full">
            <input
              type="text"
              value={guestNote}
              onChange={(e) => setGuestNote(e.target.value)}
              placeholder="Inscribe your spell or greeting..."
              className="w-full md:flex-1 px-4 py-2.5 rounded-2xl text-xs sm:text-sm border-2 border-[#382b26] bg-[#fff8f1] dark:bg-[#251b17] text-[#382b26] dark:text-[#fff8f1] placeholder-[#382b26]/40 dark:placeholder-[#fff8f1]/40 focus:outline-none focus:ring-2 focus:ring-[#a34063] transition-all shadow-inner"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto px-5 py-2.5 rounded-2xl bg-[#a34063] text-white border-2 border-[#382b26] shadow-[2px_2px_0px_#382b26] hover:scale-102 active:scale-95 transition-all text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{isSubmitting ? "Inscribing..." : "Inscribe"}</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>

        {/* Guestbook Inscriptions — dynamic from API */}
        <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
          {entries.length === 0 && (
            <p className="text-center text-xs text-[#382b26]/50 dark:text-[#fff8f1]/50 py-6 italic">
              The grimoire is empty… be the first to inscribe!
            </p>
          )}
          {(showAll ? entries : entries.slice(0, 3)).map((entry, index) => (
            <div
              key={entry.timestamp || index}
              className="border border-[#e0cfbe] dark:border-[#fff8f1]/15 rounded-xl p-4 mb-3 bg-[#fffdf8]/50 dark:bg-[#251b17]/50 break-words whitespace-pre-wrap"
            >
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-bold text-[#a34063] dark:text-amber-400 break-words">{entry.name}</h4>
                <span className="text-xs text-[#8c7a6b] dark:text-[#fff8f1]/50 font-mono shrink-0 ml-2">
                  {entry.timestamp ? new Date(entry.timestamp).toLocaleDateString() : ""}
                </span>
              </div>
              <p className="text-[#5c4033] dark:text-[#fff8f1]/90 italic text-sm break-words whitespace-pre-wrap">
                "{entry.message}"
              </p>
            </div>
          ))}
        </div>
        {entries.length > 3 && (
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="w-full text-center text-sm text-[#a34063] dark:text-amber-400 font-bold py-2 hover:opacity-70 transition-opacity cursor-pointer"
          >
            {showAll ? "↑ Hide Grimoire Archives" : "↓ Read More Spells..."}
          </button>
        )}
      </div>

      {/* Bottom Credits & Copyright */}
      <div className="pt-6 pb-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#382b26]/80 dark:text-[#fff8f1]/80 border-t border-[#382b26]/10 dark:border-[#fff8f1]/10">
        <p className="flex items-center gap-1.5">
          <span>Crafted with</span>
          <Heart className="w-3.5 h-3.5 text-[#a34063] fill-[#a34063]" />
          <span>by Team TechnoBytes</span>
        </p>
        <p>© 2026 All Spells Reserved • Open Source Magic</p>
      </div>

      {/* Secret Mushroom Easter Egg in Bottom-Right Corner */}
      <div className="absolute bottom-4 right-4 z-20">
        <button
          type="button"
          onClick={handleMushroomClick}
          title="🍄 Secret Mushroom! Click to enter Archmage Overdrive!"
          aria-label="Secret Mushroom Easter Egg"
          className="group relative p-2 sm:p-2.5 opacity-60 hover:opacity-100 hover:scale-125 transition-all duration-300 cursor-pointer text-3xl md:text-2xl"
        >
          <svg viewBox="0 0 40 40" className="w-9 h-9 sm:w-8 sm:h-8 drop-shadow-md">
            {/* Mushroom Stem */}
            <path d="M 16 24 C 15 32, 14 36, 13 38 L 27 38 C 26 36, 25 32, 24 24 Z" fill="#f7ebe0" stroke="#382b26" strokeWidth="2" />
            {/* Mushroom Cap */}
            <path d="M 6 24 C 5 12, 35 12, 34 24 Z" fill="#a34063" stroke="#382b26" strokeWidth="2" />
            <circle cx="14" cy="18" r="2.5" fill="#fff8f1" />
            <circle cx="24" cy="17" r="2.5" fill="#fff8f1" />
            <circle cx="19" cy="22" r="1.5" fill="#fff8f1" />
          </svg>
        </button>
      </div>

      {/* ════════════════════════════════════════════════════════════════
          Archmage Overdrive Easter Egg Full-Screen Overlay
         ════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {isOverdrive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-9999 bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center overflow-hidden p-4 select-none"
          >
            {/* Ambient Overdrive Background Pulse */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-40">
              <div className="w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] rounded-full bg-gradient-to-r from-amber-500/40 via-yellow-400/30 to-[#a34063]/40 blur-3xl animate-pulse" />
            </div>

            {/* The Character with Spring & Glowing Aura */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1.5, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 180,
                damping: 14,
              }}
              className="relative flex items-center justify-center my-8 z-10"
            >
              <img
                src={characterImg}
                alt="Archmage Overdrive Ayush"
                className="w-44 sm:w-56 md:w-64 object-contain drop-shadow-[0_0_80px_rgba(234,179,8,0.8)] mix-blend-screen pointer-events-none select-none"
              />
            </motion.div>

            {/* The Typography with Violent Shake */}
            <motion.h1
              animate={{
                x: [-4, 4, -4, 4, -2, 2, 0],
                y: [-2, 2, -1, 1, -3, 3, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 0.1,
                ease: "linear",
              }}
              className="text-xl sm:text-3xl md:text-5xl font-black tracking-wider text-center uppercase my-4 sm:my-6 text-yellow-300 drop-shadow-[0_0_35px_rgba(234,179,8,1)] z-10 px-4"
              style={{
                WebkitTextStroke: "1.5px #ef4444",
                textShadow: "0 0 20px #eab308, 0 0 35px #ef4444",
              }}
            >
              ⚠️ AIML NEURAL CORE OVERCLOCKED! ⚠️
            </motion.h1>

            {/* Subtitle */}
            <p className="text-white/80 font-mono text-xs sm:text-sm tracking-widest uppercase mb-4 text-center max-w-lg z-10 px-4">
              ✦ QUANTUM TELEMETRY MAXED • ARCHMAGE AWAKENED ✦
            </p>
            <p className="text-amber-300/90 font-mono text-xs sm:text-sm tracking-wide mb-8 text-center z-10 px-4">
              ⚠️ The AIML Core has been overclocked {triggerCount} time{triggerCount !== 1 ? "s" : ""}!
            </p>

            {/* The Claim Button */}
            <motion.button
              type="button"
              onClick={handleClaimBadge}
              animate={{
                scale: [1, 1.05, 1],
                y: [0, -4, 0],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.94 }}
              className="bg-[#a34063] text-white px-8 py-4 rounded-full border-4 border-white font-extrabold text-base sm:text-xl shadow-[0_0_35px_rgba(163,64,99,0.8)] hover:shadow-[0_0_50px_rgba(234,179,8,0.9)] cursor-pointer select-none z-10 transition-shadow"
            >
              Claim Master Alchemist Badge 🏆
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}
