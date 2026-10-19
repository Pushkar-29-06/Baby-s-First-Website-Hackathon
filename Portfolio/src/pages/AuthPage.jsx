import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useSound from "use-sound";
import confetti from "canvas-confetti";
import { AlertCircle, CheckCircle2, Eye, EyeOff, Sparkles, Wand2 } from "lucide-react";
import chibiImg from "../assets/ayush_chibi.png";
import {
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  validateAuthFields,
  FIREBASE_STATUS,
} from "../utils/firebase";

/**
 * AuthPage Component
 * Authenticates user before entering Ayush Mane's Data Mage Realm:
 * - Outer viewport: locked h-screen overflow-hidden with mushroom forest background
 * - Centered browser card with macOS-styled dots & URL pill
 * - Left panel: Large Chibi Ayush floating on cloud; clicking triggers whole-page magic sparks;
 *   speech bubble "Identify yourself, Mage!"; no bottom curved line.
 * - Right panel: Ancient wooden-pillar scroll (bg-[url('/ancient-scroll-base.png')])
 *   with accessible real-time auth form positioned squarely inside the parchment.
 * - Real-time authentication logic: format validation, min length, persistent accounts,
 *   eye toggle for password, error feedback, and fast-track demo auto-fill.
 */
export default function AuthPage({ onAuthenticated }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMuted] = useState(false);

  // Audio effects
  const [playPop] = useSound("/sounds/pop.mp3", {
    soundEnabled: !isMuted,
    volume: 0.6,
  });

  const [playChime] = useSound("/sounds/chime.mp3", {
    soundEnabled: !isMuted,
    volume: 0.5,
  });

  // Whole-page magical effect with multi-cannon confetti
  const triggerFullPageMagic = () => {
    try {
      // 1. Left side cannon shooting up and inwards
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 70,
        origin: { x: 0.1, y: 0.75 },
        colors: ["#a34063", "#e09f3e", "#fff8f1", "#22c55e", "#f4a261"],
      });

      // 2. Right side cannon shooting up and inwards
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 70,
        origin: { x: 0.9, y: 0.75 },
        colors: ["#a34063", "#e09f3e", "#fff8f1", "#22c55e", "#f4a261"],
      });

      // 3. Center burst covering full screen
      confetti({
        particleCount: 85,
        spread: 100,
        origin: { x: 0.5, y: 0.4 },
        colors: ["#a34063", "#5c4033", "#fff8f1", "#e09f3e", "#f4a261", "#38bdf8"],
      });

      // 4. Delayed top stars shower
      setTimeout(() => {
        try {
          confetti({
            particleCount: 45,
            spread: 120,
            origin: { x: 0.5, y: 0.15 },
            gravity: 0.7,
            scalar: 1.2,
            colors: ["#fbbf24", "#f472b6", "#a78bfa", "#34d399", "#fff8f1"],
          });
        } catch (e) {}
      }, 180);
    } catch (e) {}
  };

  // Submit handler with robust real-time validation and persistent auth
  const handleSubmit = async (e) => {
    e?.preventDefault?.();
    setErrorMsg("");
    setSuccessMsg("");

    // Real-time client-side validation before sending request
    try {
      validateAuthFields(email, password, isRegisterMode);
    } catch (validationErr) {
      setErrorMsg(validationErr.message);
      return;
    }

    setIsLoading(true);

    try {
      playPop();
    } catch (e) {}

    try {
      if (isRegisterMode) {
        await createUserWithEmailAndPassword(auth, email, password);
        setSuccessMsg("✨ Record Inscribed in Arcane Registry! Welcome, Mage.");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        setSuccessMsg("🔮 The seal is broken! Welcome, Mage.");
      }

      try {
        playChime();
      } catch (e) {}
      triggerFullPageMagic();

      setTimeout(() => {
        if (onAuthenticated) onAuthenticated();
      }, 650);
    } catch (err) {
      console.warn("Auth spell failed:", err);
      setErrorMsg(err.message || "The arcane gateway rejects these runes. Whisper them again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Fast-track demo login handler
  const handleFastTrack = async () => {
    setErrorMsg("");
    setSuccessMsg("");
    setIsLoading(true);

    setEmail("guest");
    setPassword("magic");

    try {
      playPop();
    } catch (e) {}

    try {
      await signInWithEmailAndPassword(auth, "guest", "magic");
      setSuccessMsg("⚡ Fast-Track Spell Accepted! Passing through threshold...");
      try {
        playChime();
      } catch (e) {}
      triggerFullPageMagic();

      setTimeout(() => {
        if (onAuthenticated) onAuthenticated();
      }, 650);
    } catch (err) {
      setErrorMsg("Demo spell failed: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#5c4033] bg-[url('/mushroom-tree-bg.png')] bg-cover bg-center flex items-center justify-center relative select-none font-sans p-2 sm:p-4 md:p-6 py-4 sm:py-8 overflow-y-auto">
      {/* ════════════════════════════════════════════════════════════════
          THE INNER BROWSER WINDOW
          Responsive card with macOS-styled title bar & shadow
         ════════════════════════════════════════════════════════════════ */}
      <div className="w-[96%] sm:w-[92%] max-w-6xl my-auto bg-[#fff8f1] border-3 sm:border-4 border-[#5c4033] rounded-[1.5rem] sm:rounded-[2rem] flex flex-col relative shadow-[8px_8px_0px_rgba(0,0,0,0.18)] md:shadow-[12px_12px_0px_rgba(0,0,0,0.15)] overflow-hidden">
        {/* Mock Title Bar with Red/Yellow/Green dots and URL capsule */}
        <div className="w-full bg-[#382b26] px-4 sm:px-5 py-2.5 sm:py-3 flex items-center justify-between border-b-2 border-[#2b201c] shrink-0 z-30">
          {/* Top-left window control dots */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-[#ef4444] border border-[#7f1d1d] shadow-inner" />
            <span className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-[#eab308] border border-[#713f12] shadow-inner" />
            <span className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-[#22c55e] border border-[#14532d] shadow-inner" />
          </div>

          {/* Center dark capsule */}
          <div className="flex items-center justify-center w-52 sm:w-72 md:w-96 h-5 sm:h-6 rounded-full bg-[#291f1b] border border-[#483730] text-[10px] sm:text-[11px] font-mono text-[#f7ebe0]/75 shadow-inner">
            <span className="truncate px-2">ayush.exe // authentication.realm</span>
          </div>

          <div className="text-right text-[10px] font-mono text-emerald-400 flex items-center justify-end gap-1 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="hidden sm:inline">ONLINE</span>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════
            SPLIT CONTAINER: Left Character Panel & Right Ancient Scroll
           ════════════════════════════════════════════════════════════ */}
        <div className="flex-1 w-full flex flex-col md:flex-row relative overflow-y-auto md:overflow-hidden">
          {/* Mobile-only Interactive Chibi Header (<md) */}
          <div className="flex md:hidden flex-col items-center justify-center pt-3 pb-1 select-none">
            <motion.div
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                try {
                  playPop();
                } catch (e) {}
                triggerFullPageMagic();
              }}
              className="cursor-pointer flex items-center gap-2 px-3.5 py-1 bg-[#fff8f1] border-2 border-[#5c4033] rounded-full shadow-[2px_2px_0px_#5c4033] transition-transform active:scale-95"
              title="Click Ayush for whole-page magic sparkles!"
            >
              <img
                src={chibiImg}
                alt="Chibi Ayush"
                className="w-7 h-7 object-contain mix-blend-multiply"
              />
              <span className="text-[11px] font-extrabold text-[#5c4033]">
                Identify yourself, Mage! ✦
              </span>
            </motion.div>
          </div>

          {/* ════════════════════════════════════════════════════════════
              1. LEFT PANEL (Desktop Character Panel >=md)
              Prominent Chibi Ayush image with click-to-sparkle whole-page effect
             ════════════════════════════════════════════════════════════ */}
          <div className="hidden md:flex md:w-1/2 h-full flex-col justify-center items-center p-4 lg:p-6 relative select-none overflow-visible">
            {/* Ambient Star Sparkles */}
            <div className="absolute top-12 left-16 text-amber-500 font-bold text-sm pointer-events-none">
              ✦
            </div>
            <div className="absolute top-20 right-24 text-amber-500 font-bold text-xs pointer-events-none">
              ✦
            </div>
            <div className="absolute top-36 left-28 text-amber-500 font-bold text-xs pointer-events-none">
              ✦
            </div>
            <div className="absolute top-44 right-16 text-amber-500 font-bold text-sm pointer-events-none">
              ✦
            </div>
            <div className="absolute bottom-28 left-20 text-[#5c4033]/40 text-xs pointer-events-none">
              •
            </div>
            <div className="absolute bottom-36 right-20 text-[#5c4033]/40 text-xs pointer-events-none">
              •
            </div>

            {/* Character Container with continuous gentle float motion */}
            <div className="relative inline-block my-auto overflow-visible">
              {/* Comic Speech Bubble: "Identify yourself, Mage!" */}
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-6 -right-6 lg:-right-8 z-20 cursor-default"
              >
                <div className="relative bg-white border-2 border-[#5c4033] px-3.5 py-1.5 rounded-2xl shadow-[2.5px_2.5px_0px_#5c4033] text-center">
                  <span className="text-xs sm:text-sm font-bold text-[#5c4033] leading-tight font-sans block">
                    Identify
                    <br />
                    yourself,
                    <br />
                    Mage!
                  </span>
                  {/* Cursor Arrow Pointer */}
                  <div className="absolute -bottom-3 -right-2 text-[#5c4033]">
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="#fff8f1"
                      stroke="#5c4033"
                      strokeWidth="2.5"
                    >
                      <polygon points="3 3 10 20 13 13 20 10 3 3" />
                    </svg>
                  </div>
                </div>
                {/* Speech tail */}
                <svg
                  className="w-5 h-5 text-[#5c4033] absolute -bottom-1 -left-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M 20 5 C 15 15, 8 18, 2 20" />
                </svg>
              </motion.div>

              {/* Chibi Ayush: Enlarged size, click triggers whole-page magic effect */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut",
                }}
                onClick={() => {
                  try {
                    playPop();
                  } catch (e) {}
                  triggerFullPageMagic();
                }}
                className="cursor-pointer relative z-10 overflow-visible transition-transform hover:scale-105 active:scale-95"
                title="Click Ayush for whole-page magic sparkles!"
              >
                <img
                  src={chibiImg}
                  alt="Chibi Ayush Mage"
                  className="w-80 sm:w-96 md:w-[360px] lg:w-[410px] max-w-full object-contain mix-blend-multiply bg-transparent scale-110 select-none drop-shadow-md"
                />
              </motion.div>
            </div>
          </div>

          {/* ════════════════════════════════════════════════════════════
              2. RIGHT PANEL (The Ancient Paper Scroll - Responsive)
             ════════════════════════════════════════════════════════════ */}
          <div className="w-full md:w-1/2 flex-1 flex items-center justify-center p-3 sm:p-5 lg:p-6 relative">
            {/* The Ancient Scroll Background Wrapper:
                - On desktop (md+): Illustrated scroll background with spindles
                - On mobile (<md): High-contrast parchment container with comfortable padding */}
            <div className="w-full max-w-[500px] md:max-w-[650px] md:aspect-[3/4] relative bg-[#fcf6ea] md:bg-transparent md:bg-[url('/ancient-scroll-base.png')] md:bg-contain md:bg-no-repeat md:bg-center border-2 border-[#5c4033] md:border-none rounded-2xl md:rounded-none shadow-[4px_4px_0px_#5c4033] md:shadow-none flex flex-col justify-center px-4 py-4 sm:px-6 sm:py-6 md:px-[20%] md:pt-[20%] md:pb-[18%]">
              {/* Interactive Authentication Form & Real-Time Validation */}
              <form
                onSubmit={handleSubmit}
                className="w-full flex flex-col gap-2 font-sans relative z-10"
              >
                {/* Validation / Status Alert Banners */}
                <AnimatePresence>
                  {errorMsg && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="p-1.5 rounded-xl bg-red-100/95 border-2 border-red-400 text-red-900 text-[10px] sm:text-xs font-bold flex items-center gap-1.5 shadow-xs"
                    >
                      <AlertCircle className="w-3.5 h-3.5 shrink-0 text-red-600" />
                      <span className="truncate">{errorMsg}</span>
                    </motion.div>
                  )}
                  {successMsg && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="p-1.5 rounded-xl bg-emerald-100/95 border-2 border-emerald-500 text-emerald-900 text-[10px] sm:text-xs font-bold flex items-center gap-1.5 shadow-xs"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-600" />
                      <span className="truncate">{successMsg}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Mage ID Area: IDENTIFY YOURSELF (Email) */}
                <div>
                  <label className="block text-[10px] sm:text-xs font-extrabold text-[#5c4033] tracking-wide mb-0.5">
                    {isRegisterMode
                      ? "CHOOSE YOUR MAGE ID (Email)"
                      : "IDENTIFY YOURSELF (Email)"}
                  </label>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errorMsg) setErrorMsg("");
                    }}
                    placeholder="enter your email address..."
                    required
                    className="w-full px-3 py-1.5 sm:py-2 rounded-xl border-2 sm:border-3 border-[#5c4033] bg-[#fff8f1] text-[#5c4033] placeholder-[#5c4033]/45 font-bold text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#a34063] transition-all shadow-inner"
                  />
                </div>

                {/* Secret Spell Area: SECRET SPELL (Password) with Show/Hide toggle */}
                <div>
                  <div className="flex items-center justify-between mb-0.5">
                    <label className="block text-[10px] sm:text-xs font-extrabold text-[#5c4033] tracking-wide">
                      {isRegisterMode
                        ? "INSCRIBE SECRET SPELL (Password)"
                        : "SECRET SPELL (Password)"}
                    </label>
                    <span className="text-[9px] text-[#5c4033]/60 font-semibold">
                      (min 6 runes)
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (errorMsg) setErrorMsg("");
                      }}
                      placeholder="••••••••"
                      required
                      className="w-full px-3 py-1.5 sm:py-2 pr-9 rounded-xl border-2 sm:border-3 border-[#5c4033] bg-[#fff8f1] text-[#5c4033] placeholder-[#5c4033]/45 font-bold text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#a34063] transition-all shadow-inner"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#5c4033]/60 hover:text-[#5c4033] p-0.5 cursor-pointer"
                      title={showPassword ? "Hide spell" : "Show spell"}
                    >
                      {showPassword ? (
                        <EyeOff className="w-3.5 h-3.5" />
                      ) : (
                        <Eye className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* The Spell Banner: 3D-styled chunky berry #a34063 Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-0.5 py-2 sm:py-2.5 px-3 rounded-xl bg-[#a34063] hover:brightness-105 active:scale-95 text-white font-extrabold text-xs sm:text-sm shadow-[2.5px_2.5px_0px_#5c4033] border-2 sm:border-3 border-[#5c4033] transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-60"
                >
                  {isLoading ? (
                    <span className="animate-pulse flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 animate-spin" />
                      CASTING SPELL...
                    </span>
                  ) : (
                    <span>
                      {isRegisterMode
                        ? "INSCRIBE ACCOUNT 📜"
                        : "CAST LOGIN SPELL 🔮"}
                    </span>
                  )}
                </button>

                {/* Authentication Navigation Link: "Need an account? Inscribe / Register 📝" */}
                <div className="text-center my-0.5">
                  <button
                    type="button"
                    onClick={() => {
                      setIsRegisterMode(!isRegisterMode);
                      setErrorMsg("");
                      setSuccessMsg("");
                      try {
                        playPop();
                      } catch (e) {}
                    }}
                    className="text-[10px] sm:text-[11px] font-bold text-[#5c4033] hover:text-[#a34063] transition-colors cursor-pointer underline decoration-[#5c4033] underline-offset-2"
                  >
                    {isRegisterMode
                      ? "Already have a seal? Cast Login 🔮"
                      : "Need an account? Inscribe / Register 📝"}
                  </button>
                </div>

                {/* Fast-Track Demo Login Bounding Box */}
                <div className="border border-dashed border-[#5c4033] bg-[#fff8f1]/90 rounded-xl p-2 flex items-center justify-between gap-1.5 shadow-xs">
                  <div className="text-left leading-tight">
                    <div className="flex items-center gap-1 text-[10px] sm:text-[11px] font-extrabold text-[#5c4033]">
                      <span>⚡ FAST-TRACK DEMO LOGIN</span>
                    </div>
                    <p className="text-[9px] sm:text-[10px] text-[#5c4033]/85 font-medium">
                      (Guest ID: "guest", Spell: "magic")
                    </p>
                  </div>

                  {/* Clickable 3D "Auto-Fill" button */}
                  <button
                    type="button"
                    onClick={handleFastTrack}
                    disabled={isLoading}
                    className="px-2.5 py-1 rounded-lg border-2 border-[#5c4033] bg-[#fff8f1] shadow-[1.5px_1.5px_0px_#5c4033] active:scale-95 text-[10px] sm:text-xs font-extrabold text-[#5c4033] hover:bg-[#a34063] hover:text-white transition-all cursor-pointer shrink-0"
                  >
                    Auto-Fill
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Status Signal: Discreet status label "AIML Realm: ONLINE" (Bottom Right) */}
        <div className="hidden sm:block absolute bottom-3 right-5 z-20 pointer-events-none">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#382b26] text-[#fff8f1] border border-[#5c4033] text-[10px] sm:text-[11px] font-mono font-bold shadow-md">
            <span>AIML Realm: ONLINE</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
