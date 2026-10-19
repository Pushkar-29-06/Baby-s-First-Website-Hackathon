import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Bot } from "lucide-react";
import useSound from "use-sound";

/**
 * Spellbook Component (The Data Mage's Featured Projects)
 * Cards styled with authentic warm parchment fill (#fbf5eb), dark brown borders (#382b26),
 * white text for tech tags, and high-contrast section title.
 */
export default function Spellbook({ isNightMode, isMuted }) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioRef = useRef(null);

  const [playPop] = useSound("/sounds/pop.mp3", {
    soundEnabled: !isMuted,
    volume: 0.5,
  });

  // Initialize and manage samvaad.mpeg audio element
  useEffect(() => {
    const audio = new Audio("/sounds/samvaad.mpeg");
    audio.preload = "auto";
    audioRef.current = audio;

    const handleEnded = () => setIsPlayingAudio(false);
    const handlePause = () => setIsPlayingAudio(false);

    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("pause", handlePause);
      audio.pause();
    };
  }, []);

  // Sync mute state with audio element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const toggleAudio = () => {
    if (!isMuted) {
      try {
        playPop();
      } catch (e) {}
    }

    if (!audioRef.current) return;

    if (isPlayingAudio) {
      audioRef.current.pause();
      setIsPlayingAudio(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlayingAudio(true);
        })
        .catch((err) => {
          console.warn("Could not play samvaad.mpeg:", err);
          setIsPlayingAudio(false);
        });
    }
  };

  return (
    <section id="projects-section" className="w-full relative select-none">
      {/* Section Divider with High-Contrast Visible Title */}
      <div className="flex items-center justify-center gap-3 sm:gap-4 my-8 sm:my-12">
        <div
          className="flex-1 h-[2px]"
          style={{ backgroundColor: isNightMode ? "rgba(255, 248, 241, 0.25)" : "rgba(56, 43, 38, 0.25)" }}
        />
        <div className="flex items-center gap-2 text-xl sm:text-2xl md:text-3xl font-extrabold font-serif tracking-widest uppercase">
          <span className="text-amber-500">✦</span>
          <span style={{ color: isNightMode ? "#fff8f1" : "#382b26" }}>
            FEATURED PROJECTS
          </span>
          <span className="text-amber-500">✦</span>
        </div>
        <div
          className="flex-1 h-[2px]"
          style={{ backgroundColor: isNightMode ? "rgba(255, 248, 241, 0.25)" : "rgba(56, 43, 38, 0.25)" }}
        />
      </div>

      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 px-4">
        <p
          className="text-sm sm:text-base font-medium opacity-85 leading-relaxed"
          style={{ color: isNightMode ? "#fff8f1" : "#382b26" }}
        >
          Production-tested machine learning models, real-time voice translation systems, and telemetry dashboards crafted with code and creativity.
        </p>
      </div>

      {/* Project Cards Section: Responsive CSS Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        {/* ════════════════════════════════════════════════════════════════
            PROJECT 1: SamvaadAI (The Conversational Oracle)
           ════════════════════════════════════════════════════════════════ */}
        <div className="w-full flex flex-col justify-between border-2 border-[#382b26] dark:border-[#fff8f1]/30 rounded-3xl p-5 sm:p-7 bg-[#fbf5eb] dark:bg-[#2e211b] shadow-[4px_4px_0px_#382b26] dark:shadow-[4px_4px_0px_rgba(0,0,0,0.5)] transition-all hover:-translate-y-1">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-[#a34063] dark:text-amber-400 block mb-1">
                  PROJECT 1:
                </span>
                <h3 className="text-2xl font-bold font-serif text-[#382b26] dark:text-[#fff8f1]">
                  SamvaadAI
                </h3>
                <span className="text-xs font-semibold text-[#382b26]/70 dark:text-[#fff8f1]/70">
                  (The Conversational Oracle)
                </span>
              </div>

              {/* Speech Bubbles */}
              <div className="flex flex-col gap-1.5 items-end self-end sm:self-auto">
                <div className="bg-[#fff8f1] dark:bg-[#3d2b23] border-2 border-[#382b26] px-3 py-1 rounded-xl text-[10px] sm:text-xs font-bold text-[#382b26] dark:text-[#fff8f1] shadow-[2px_2px_0px_#382b26]">
                  English / Marathi
                </div>
                <div className="bg-[#a34063] text-white border-2 border-[#382b26] px-2.5 py-0.5 rounded-xl text-[10px] font-bold shadow-[2px_2px_0px_#382b26]">
                  ✦
                </div>
              </div>
            </div>

            {/* Audio Waveform Player Bar */}
            <div className="mt-2 flex items-center gap-2 p-2 sm:p-2.5 rounded-2xl border-2 border-[#382b26] bg-[#f0dfd5] dark:bg-[#251b17] shadow-inner w-full">
              <button
                type="button"
                onClick={toggleAudio}
                className="w-8 h-8 rounded-xl bg-[#a34063] text-white border-2 border-[#382b26] flex items-center justify-center hover:scale-105 active:scale-95 transition-transform cursor-pointer shadow-xs shrink-0"
                title={isPlayingAudio ? "Pause Oracle Voice" : "Play Oracle Voice"}
              >
                {isPlayingAudio ? (
                  <Pause className="w-3.5 h-3.5 fill-white" />
                ) : (
                  <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                )}
              </button>

              {/* Equalizer bars */}
              <div className="flex items-center gap-1 flex-1 h-6 px-1 overflow-hidden">
                {[8, 14, 20, 10, 18, 24, 16, 10, 22, 18, 12, 20].map((height, i) => (
                  <span
                    key={i}
                    className={`w-1 rounded-full transition-all duration-300 ${
                      isPlayingAudio ? "bg-[#a34063] animate-pulse" : "bg-[#382b26]/50 dark:bg-[#fff8f1]/40"
                    }`}
                    style={{
                      height: isPlayingAudio
                        ? `${Math.max(8, height + (i % 3) * 4)}px`
                        : `${Math.max(4, height * 0.45)}px`,
                      animationDelay: `${i * 65}ms`,
                    }}
                  />
                ))}
              </div>

              <span className="text-[9px] font-mono font-bold text-[#382b26] dark:text-[#fff8f1]/80 pr-1 shrink-0">
                {isPlayingAudio ? "LIVE 24kHz" : "LISTEN"}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#382b26]/85 dark:text-[#fff8f1]/85 mt-4 font-medium leading-relaxed">
              Voice-first multilingual conversational AI translating official documentation and public schemes into colloquial Marathi audio streams with sub-300ms latency.
            </p>
          </div>

          {/* Bottom Tech Tags with pure WHITE text */}
          <div className="mt-6 pt-3 border-t border-[#382b26]/15 dark:border-[#fff8f1]/15 flex flex-wrap gap-1.5">
            {["FastAPI", "Whisper ASR", "Coqui TTS", "Marathi NLP"].map((tech) => (
              <span
                key={tech}
                className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg bg-[#382b26] dark:bg-[#1a1310] border border-[#5c4033] dark:border-[#fff8f1]/20 shadow-xs"
                style={{ color: "#ffffff" }}
              >
                #{tech}
              </span>
            ))}
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════
            PROJECT 2: Insight Hub (The Data Crystal Ball)
           ════════════════════════════════════════════════════════════════ */}
        <div className="w-full flex flex-col justify-between border-2 border-[#382b26] dark:border-[#fff8f1]/30 rounded-3xl p-5 sm:p-7 bg-[#fbf5eb] dark:bg-[#2e211b] shadow-[4px_4px_0px_#382b26] dark:shadow-[4px_4px_0px_rgba(0,0,0,0.5)] transition-all hover:-translate-y-1">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
              <div>
                <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-[#a34063] dark:text-amber-400 block mb-1">
                  PROJECT 2:
                </span>
                <h3 className="text-2xl font-bold font-serif text-[#382b26] dark:text-[#fff8f1]">
                  Insight Hub
                </h3>
                <span className="text-xs font-semibold text-[#382b26]/70 dark:text-[#fff8f1]/70">
                  (The Data Crystal Ball)
                </span>
              </div>

              {/* Retro Mini Dashboard Window Graphic */}
              <div className="w-full sm:w-48 rounded-xl border-2 border-[#382b26] bg-[#fff8f1] dark:bg-[#251b17] shadow-[2px_2px_0px_#382b26] overflow-hidden">
                <div className="bg-[#a34063] px-2 py-0.5 flex items-center justify-between border-b-2 border-[#382b26]">
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  </div>
                  <span className="text-[8px] font-mono font-bold text-white/90">METRICS.EXE</span>
                </div>

                <div className="p-2 flex gap-1.5 h-16 items-end">
                  <div className="flex-1 h-full border border-[#382b26]/20 rounded-md p-1 bg-white dark:bg-[#1a1310]">
                    <svg className="w-full h-full" viewBox="0 0 100 50">
                      <path
                        d="M 0 45 L 20 30 L 40 38 L 65 15 L 85 22 L 100 8 L 100 50 L 0 50 Z"
                        fill="#a34063"
                        fillOpacity="0.75"
                        stroke="#382b26"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </div>

                  <div className="w-12 h-full border border-[#382b26]/20 rounded-md p-0.5 bg-white dark:bg-[#1a1310] flex items-end justify-between gap-1">
                    <div className="w-2 h-[65%] bg-amber-400 border border-[#382b26] rounded-xs" />
                    <div className="w-2 h-[90%] bg-[#a34063] border border-[#382b26] rounded-xs" />
                    <div className="w-2 h-[45%] bg-[#382b26] border border-[#382b26] rounded-xs" />
                  </div>
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#382b26]/85 dark:text-[#fff8f1]/85 mt-2 font-medium leading-relaxed">
              Transforming heterogeneous enterprise metrics and operational databases into predictive anomaly detection pipelines, interactive dashboards, and automated telemetry forecasts.
            </p>
          </div>

          {/* Bottom Tech Tags with pure WHITE text */}
          <div className="mt-6 pt-3 border-t border-[#382b26]/15 dark:border-[#fff8f1]/15 flex flex-wrap gap-1.5">
            {["Next.js", "Python Pandas", "scikit-learn", "D3.js"].map((tech) => (
              <span
                key={tech}
                className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg bg-[#382b26] dark:bg-[#1a1310] border border-[#5c4033] dark:border-[#fff8f1]/20 shadow-xs"
                style={{ color: "#ffffff" }}
              >
                #{tech}
              </span>
            ))}
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════
            PROJECT 3: AI Tutor (The Digital Mentor)
           ════════════════════════════════════════════════════════════════ */}
        <div className="w-full flex flex-col justify-between border-2 border-[#382b26] dark:border-[#fff8f1]/30 rounded-3xl p-5 sm:p-7 bg-[#fbf5eb] dark:bg-[#2e211b] shadow-[4px_4px_0px_#382b26] dark:shadow-[4px_4px_0px_rgba(0,0,0,0.5)] transition-all hover:-translate-y-1">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-[#a34063] dark:text-amber-400 block mb-1">
                  PROJECT 3:
                </span>
                <h3 className="text-2xl font-bold font-serif text-[#382b26] dark:text-[#fff8f1]">
                  AI Tutor
                </h3>
                <span className="text-xs font-semibold text-[#382b26]/70 dark:text-[#fff8f1]/70">
                  (The Digital Mentor)
                </span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f0dfd5] dark:bg-[#251b17] border-2 border-[#382b26] text-[11px] font-bold text-[#382b26] dark:text-[#fff8f1] shadow-[2px_2px_0px_#382b26]">
                <Bot className="w-3.5 h-3.5 text-[#a34063] dark:text-amber-400" />
                <span>RAG Adaptive Pipeline</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#382b26]/85 dark:text-[#fff8f1]/85 mb-4 font-medium leading-relaxed">
              An intelligent learning companion tailored to individual student cognitive curves, synthesizing advanced computer science curricula into interactive quest modules and automated code evaluation.
            </p>
          </div>

          {/* Bottom Tech Tags with pure WHITE text */}
          <div className="mt-6 pt-3 border-t border-[#382b26]/15 dark:border-[#fff8f1]/15 flex flex-wrap gap-1.5">
            {["Adaptive RL", "Vector Embeddings", "Contextual RAG", "LangChain"].map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg bg-[#382b26] dark:bg-[#1a1310] border border-[#5c4033] dark:border-[#fff8f1]/20 shadow-xs"
                style={{ color: "#ffffff" }}
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
