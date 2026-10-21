import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Wand2, RefreshCw, Eye, Flame, Moon, Star } from "lucide-react";
import useSound from "use-sound";
import confetti from "canvas-confetti";

const FORTUNES = [
"The stars foresee... a terrifying merge conflict in your near future. Bring a shield.",
"A dark curse plagues your realm. It is known by the ancients as 'missing comma on line 42'.",
"The enchanted scrolls reveal a tragic truth: It works on your machine, but nowhere else.",
"The spirits of Stack Overflow are currently unavailable. You must actually read the documentation.",
"I see you ignoring your compiler warnings. The server demons are taking notes.",
"Your mana is critically low. Consume another potion of roasted coffee beans immediately.",
"A legendary trial awaits you: centering a div both horizontally AND vertically.",
"The prophecy is written... you will spend three hours debugging a simple typo today.",
"Beware the dark omens! Never cast a production deployment spell on a Friday afternoon.",
"Your next great quest will be the hardest of all: deciding what to name a boolean variable.",
"The crystal ball is cloudy... Have you tried clearing your browser cache?",
"You will write a brilliant block of code today. Tomorrow, you will have absolutely no idea how it works.",
];

/**
 * CrystalBall Component (Tech Fortune Teller)
 * A glowing glassmorphic 2D Crystal Ball seated on an antique carved pedestal.
 * Users can click the orb or action button to shake the ball, trigger magical confetti & sound,
 * and receive randomized developer fortunes inscribed upon an ancient parchment bubble.
 */
export default function CrystalBall({ isNightMode = false, isMuted = false }) {
  const [fortuneIndex, setFortuneIndex] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const [shakeCount, setShakeCount] = useState(0);

  const [playPop] = useSound("/sounds/pop.mp3", {
    soundEnabled: !isMuted,
    volume: 0.6,
  });

  const [playChime] = useSound("/sounds/chime.mp3", {
    soundEnabled: !isMuted,
    volume: 0.5,
  });

  // Randomize a new fortune different from the current one
  const shakeCrystalBall = () => {
    if (isShaking) return;
    setIsShaking(true);
    setShakeCount((prev) => prev + 1);

    try {
      playPop();
    } catch (e) {}

    // Magic Confetti burst from the crystal ball
    try {
      confetti({
        particleCount: 55,
        spread: 85,
        origin: { x: 0.5, y: 0.45 },
        colors: ["#a34063", "#38bdf8", "#fbbf24", "#c084fc", "#fff8f1"],
      });
    } catch (e) {}

    // Pick new fortune after a short mystical pause
    setTimeout(() => {
      let nextIndex;
      do {
        nextIndex = Math.floor(Math.random() * FORTUNES.length);
      } while (nextIndex === fortuneIndex && FORTUNES.length > 1);

      setFortuneIndex(nextIndex);
      setIsShaking(false);

      try {
        playChime();
      } catch (e) {}
    }, 450);
  };

  return (
    <section id="crystal-ball-section" className="w-full max-w-3xl mx-auto select-none font-sans px-3 sm:px-6 py-6">
      {/* ════════════════════════════════════════════════════════════════
          SECTION DIVIDER & TITLE
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
          <span className="text-purple-500 animate-pulse">🔮</span>
          <span style={{ color: isNightMode ? "#fff8f1" : "#382b26" }}>
            THE CRYSTAL BALL
          </span>
          <span className="text-purple-500 animate-pulse">🔮</span>
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

      {/* Subtitle */}
      <div className="text-center max-w-xl mx-auto mb-6 px-2">
        <p
          className="text-xs sm:text-sm md:text-base font-medium opacity-90 leading-relaxed"
          style={{ color: isNightMode ? "#fff8f1" : "#382b26" }}
        >
          Peer into the swirling cosmic ether. Click or shake the orb to divine your developer destiny and receive arcane tech fortunes.
        </p>
      </div>

      {/* ════════════════════════════════════════════════════════════════
          THE ORB & PEDESTAL CONTAINER
         ════════════════════════════════════════════════════════════════ */}
      <div className="relative flex flex-col items-center justify-center py-4">
        {/* Ambient Glow Aura */}
        <div className="absolute w-72 sm:w-80 h-72 sm:h-80 rounded-full bg-radial from-purple-600/30 via-pink-500/15 to-transparent blur-2xl pointer-events-none -top-4" />

        {/* Shaking Animated Wrapper */}
        <motion.div
          animate={
            isShaking
              ? {
                  x: [-9, 9, -7, 7, -4, 4, -2, 2, 0],
                  y: [-5, 5, -4, 4, -2, 2, 0],
                  rotate: [-3, 3, -2, 2, -1, 1, 0],
                }
              : {
                  y: [0, -6, 0],
                }
          }
          transition={
            isShaking
              ? { duration: 0.45, ease: "easeInOut" }
              : { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }
          onClick={shakeCrystalBall}
          className="relative flex flex-col items-center cursor-pointer group select-none"
          title="Click to shake the crystal ball!"
        >
          {/* ════════════════════════════════════════════════════════
              THE GLASSMORPHIC SPHERE / ORB
             ════════════════════════════════════════════════════════ */}
          <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full border-4 border-[#fff8f1]/30 shadow-[0_0_50px_rgba(168,85,247,0.45)] overflow-hidden transition-transform duration-300 group-hover:scale-105 active:scale-95 bg-gradient-to-tr from-[#1b0b2e] via-[#4a154b] to-[#25093f]">
            {/* Swirling Nebula Layer 1 */}
            <div className="absolute inset-0 bg-radial from-violet-500/40 via-fuchsia-500/25 to-transparent animate-pulse" />

            {/* Swirling Nebula Layer 2 (Cyan Arcane Mist) */}
            <div className="absolute -inset-4 bg-radial from-sky-400/30 via-transparent to-transparent animate-[spin_12s_linear_infinite] opacity-75" />

            {/* Drifting Arcane Sparks */}
            <div className="absolute top-10 left-12 text-amber-300 font-bold text-xs animate-ping">
              ✦
            </div>
            <div className="absolute bottom-14 right-14 text-sky-300 font-bold text-xs animate-pulse">
              ✦
            </div>
            <div className="absolute top-20 right-10 text-pink-300 font-bold text-sm animate-bounce">
              ✵
            </div>

            {/* Glowing Orb Center Symbol */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-4xl sm:text-5xl opacity-90 drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] filter transition-transform group-hover:rotate-12">
                🔮
              </span>
            </div>

            {/* Specular Curved Glass Glare (Top-Left Highlight) */}
            <div className="absolute top-3 left-6 w-36 sm:w-44 h-16 sm:h-20 rounded-full bg-gradient-to-b from-white/45 via-white/10 to-transparent -rotate-30 pointer-events-none" />

            {/* Subtle Bottom Rim Glow */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-40 h-16 rounded-full bg-sky-400/30 blur-md pointer-events-none" />
          </div>

          {/* ════════════════════════════════════════════════════════
              THE CARVED ANTIQUE PEDESTAL
             ════════════════════════════════════════════════════════ */}
          <div className="relative -mt-6 sm:-mt-7 flex flex-col items-center pointer-events-none z-10">
            {/* Golden Mounting Ring */}
            <div className="w-36 sm:w-40 h-5 rounded-full bg-gradient-to-r from-amber-700 via-amber-300 to-amber-700 border-2 border-[#5c4033] shadow-md flex items-center justify-around px-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-200" />
              <span className="w-1.5 h-1.5 rounded-full bg-amber-200" />
              <span className="w-1.5 h-1.5 rounded-full bg-amber-200" />
            </div>

            {/* Carved Mahogany Base */}
            <div className="w-44 sm:w-48 h-8 rounded-b-2xl bg-[#2a1a14] border-3 border-[#5c4033] shadow-[0_8px_16px_rgba(0,0,0,0.4)] flex items-center justify-center">
              <span className="font-serif text-[10px] text-amber-400 tracking-widest uppercase font-black">
                ✦ ARCANE DIVINATION ✦
              </span>
            </div>
          </div>
        </motion.div>

        {/* ════════════════════════════════════════════════════════════════
            THE REVEALED FORTUNE PARCHMENT BUBBLE
           ════════════════════════════════════════════════════════════════ */}
        <div className="w-full max-w-lg mt-6 min-h-[90px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={fortuneIndex}
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.96 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative w-full p-4 sm:p-5 rounded-2xl bg-[#fff8f1] dark:bg-[#382b26] border-3 border-[#5c4033] dark:border-amber-400 shadow-[5px_5px_0px_#5c4033] dark:shadow-[5px_5px_0px_#eab308] text-center"
            >
              {/* Decorative Corner Stars */}
              <span className="absolute top-2 left-2 text-[10px] text-amber-500">✦</span>
              <span className="absolute top-2 right-2 text-[10px] text-amber-500">✦</span>
              <span className="absolute bottom-2 left-2 text-[10px] text-amber-500">✦</span>
              <span className="absolute bottom-2 right-2 text-[10px] text-amber-500">✦</span>

              <p className="font-serif font-black text-sm sm:text-base md:text-lg text-[#5c4033] dark:text-[#fff8f1] leading-snug">
                {FORTUNES[fortuneIndex]}
              </p>

              {/* Shakes Counter Badge */}
              <div className="mt-2 text-[10px] font-mono text-[#5c4033]/65 dark:text-[#fff8f1]/65 font-bold uppercase tracking-wider">
                Fortune #{fortuneIndex + 1} • Divined {shakeCount > 0 ? `${shakeCount} time${shakeCount > 1 ? "s" : ""}` : "once"}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ════════════════════════════════════════════════════════════════
            ACCESSIBLE ACTION BUTTON: "Shake the Ball"
           ════════════════════════════════════════════════════════════════ */}
        <div className="mt-5 flex items-center justify-center">
          <button
            type="button"
            onClick={shakeCrystalBall}
            disabled={isShaking}
            className="group relative inline-flex items-center gap-2.5 px-6 sm:px-8 py-3 rounded-full border-3 border-[#5c4033] dark:border-amber-400 bg-[#a34063] hover:brightness-110 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#5c4033] text-white font-extrabold text-xs sm:text-sm tracking-wide shadow-[4px_4px_0px_#5c4033] dark:shadow-[4px_4px_0px_#eab308] transition-all cursor-pointer disabled:opacity-70"
          >
            <Sparkles className={`w-4 h-4 text-amber-300 transition-transform ${isShaking ? "animate-spin" : "group-hover:rotate-12"}`} />
            <span>{isShaking ? "Divining the Stars..." : "Shake the Crystal Ball ✦"}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
