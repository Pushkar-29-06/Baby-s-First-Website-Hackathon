import React, { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html, Center, Float } from "@react-three/drei";
import { motion } from "framer-motion";
import useSound from "use-sound";
import confetti from "canvas-confetti";
import { Box, Image as ImageIcon, Sparkles, RefreshCw } from "lucide-react";
import defaultCharImg from "../assets/1792262595671.png";

/**
 * 3D Model Sub-component
 * Loads and renders the /data-mage.glb model using @react-three/drei's useGLTF.
 * Centers the model automatically to handle any custom Blender origin points.
 */
function DataMageModel({ scale = 1.9, position = [0, -0.2, 0] }) {
  const { scene } = useGLTF("/data-mage.glb");
  return (
    <Center>
      <primitive object={scene} scale={scale} position={position} />
    </Center>
  );
}

import MagicalPreloader from "./MagicalPreloader";

// Preload the 3D model asset for instant caching
useGLTF.preload("/data-mage.glb");


/**
 * CharacterShowcase Component
 * Sleek, interactive showcase with toggle between 2D static illustration and interactive 3D model.
 */
export default function CharacterShowcase({
  imageSrc = defaultCharImg,
  alt = "Data Mage Ayush",
  isNightMode = false,
  isMuted = false,
  className = "",
}) {
  const [is3DMode, setIs3DMode] = useState(false);
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

  return (
    <div
      className={`w-full flex flex-col items-center justify-center select-none font-sans relative ${className}`}
    >
      {/* ════════════════════════════════════════════════════════════════
          THE PARCHMENT TOGGLE BUTTON
          Prominent, high-contrast toggle between 2D and 3D mode
         ════════════════════════════════════════════════════════════════ */}
      <div className="mb-4 z-30 flex flex-col items-center gap-1.5">
        <button
          type="button"
          onClick={() => {
            setIs3DMode((prev) => !prev);
            if (!isMuted) {
              try {
                playPop();
              } catch (e) {}
            }
          }}
          className={`group relative inline-flex items-center gap-2.5 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full border-2 sm:border-3 font-extrabold text-xs sm:text-sm tracking-wide shadow-[4px_4px_0px_#5c4033] dark:shadow-[4px_4px_0px_#eab308] hover:shadow-[5px_5px_0px_#5c4033] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#5c4033] transition-all cursor-pointer ${
            isNightMode
              ? "bg-[#382b26] hover:bg-[#483730] text-[#fff8f1] border-amber-400"
              : "bg-[#fff8f1] hover:bg-[#fcf5e9] text-[#5c4033] border-[#5c4033]"
          }`}
          aria-label={is3DMode ? "Switch to 2D Image" : "Switch to 3D Model"}
        >
          {/* Animated Icon Container */}
          <span className="w-6 h-6 rounded-full bg-[#a34063] text-white flex items-center justify-center shrink-0 shadow-xs transition-transform group-hover:scale-110 group-hover:rotate-12">
            {is3DMode ? (
              <ImageIcon className="w-3.5 h-3.5" />
            ) : (
              <Box className="w-3.5 h-3.5" />
            )}
          </span>

          {/* Explicit Button Label */}
          <span className="font-sans font-black">
            {is3DMode ? "Switch to 2D Image" : "Switch to 3D Model"}
          </span>

          {/* Pill Badge */}
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400/20 border border-amber-500/40 text-amber-600 dark:text-amber-300 font-mono font-bold uppercase tracking-wider hidden sm:inline-block">
            {is3DMode ? "2D Mode" : "3D Mode"}
          </span>
        </button>

        {/* 3D Interaction Instructions */}
        {is3DMode && (
          <p className="text-[11px] font-mono text-[#5c4033]/80 dark:text-[#fff8f1]/80 font-bold text-center tracking-tight animate-fade-in bg-[#fff8f1]/70 dark:bg-[#382b26]/70 px-3 py-1 rounded-full border border-amber-500/30">
            ✦ Drag to rotate • Scroll to zoom • Right-click to pan ✦
          </p>
        )}
      </div>

      {/* ════════════════════════════════════════════════════════════════
          VIEWPORT CONTAINER (Responsive frame for 2D Image or 3D Canvas)
         ════════════════════════════════════════════════════════════════ */}
      <div className="relative w-full max-w-[340px] sm:max-w-[420px] md:max-w-[480px] h-[360px] sm:h-[420px] md:h-[480px] flex items-center justify-center overflow-visible">
        {is3DMode ? (
          /* ════════════════════════════════════════════════════════════
              3D VIEW: React Three Fiber Canvas with Controls & Lighting
             ════════════════════════════════════════════════════════════ */
          <div className="w-full h-full relative cursor-grab active:cursor-grabbing rounded-3xl border-3 border-[#5c4033]/30 dark:border-amber-400/40 bg-[#fff8f1]/60 dark:bg-[#2e201b]/60 backdrop-blur-xs shadow-inner overflow-hidden">
            {/* Ambient glow inside canvas */}
            <div className="absolute inset-0 bg-radial from-amber-400/10 via-transparent to-transparent pointer-events-none" />

            <Canvas
              camera={{ position: [0, 1.2, 3.8], fov: 45 }}
              dpr={[1, 2]}
              className="w-full h-full"
              gl={{ antialias: true, alpha: true }}
            >
              {/* Comprehensive Lighting Setup */}
              <ambientLight intensity={1.3} />
              <directionalLight
                position={[5, 8, 5]}
                intensity={1.8}
                castShadow
              />
              <directionalLight
                position={[-5, -2, -2]}
                intensity={0.6}
                color="#f472b6"
              />
              <pointLight position={[0, 3, 2]} intensity={0.9} color="#fef08a" />

              {/* Suspense boundary with magical preloader */}
              <Suspense fallback={<MagicalPreloader />}>
                <Float speed={2} rotationIntensity={0.25} floatIntensity={0.4}>
                  <DataMageModel />
                </Float>
              </Suspense>

              {/* Orbit Controls for 360° interactive rotation, pan, & zoom */}
              <OrbitControls
                makeDefault
                enableZoom={true}
                enablePan={true}
                minDistance={1.6}
                maxDistance={6.0}
                maxPolarAngle={Math.PI / 1.7}
              />
            </Canvas>
          </div>
        ) : (
          /* ════════════════════════════════════════════════════════════
              2D VIEW: Interactive Floating Illustration on Cloud
             ════════════════════════════════════════════════════════════ */
          <div
            className="w-full h-full flex items-center justify-center relative overflow-visible"
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
          >
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
              {/* Comic Speech Bubble 1: "Double Click for Sparkles!" */}
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                onClick={triggerDblClick}
                className="absolute top-2 sm:top-6 -left-2 sm:-left-8 z-30 cursor-pointer group scale-85 sm:scale-100"
              >
                <div className="bg-[#fffdf9] dark:bg-[#382b26] border-2 border-[#5c4033] dark:border-amber-400 px-3 py-1.5 rounded-2xl shadow-[2.5px_2.5px_0px_#5c4033] dark:shadow-[2.5px_2.5px_0px_#eab308] hover:scale-105 active:scale-95 transition-transform flex items-center gap-1.5 text-center">
                  <span className="text-[10px] sm:text-xs font-bold text-[#5c4033] dark:text-[#fff8f1] leading-tight font-sans">
                    Double Click<br />for Sparkles!
                  </span>
                  <span className="text-amber-500 font-bold text-xs">✦</span>
                </div>
                <svg
                  className="w-5 sm:w-6 h-5 sm:h-6 text-[#5c4033] dark:text-amber-400 absolute -bottom-3 right-1 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform"
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
                className="absolute top-6 sm:top-10 -right-2 sm:-right-6 z-30 cursor-pointer group scale-85 sm:scale-100"
              >
                <div className="bg-[#fffdf9] dark:bg-[#382b26] border-2 border-[#5c4033] dark:border-amber-400 px-3.5 py-1.5 rounded-2xl shadow-[2.5px_2.5px_0px_#5c4033] dark:shadow-[2.5px_2.5px_0px_#eab308] hover:scale-105 active:scale-95 transition-transform flex items-center gap-1.5 text-center">
                  <span className="text-[10px] sm:text-xs font-bold text-[#5c4033] dark:text-[#fff8f1] leading-tight font-sans">
                    click to<br />make magic
                  </span>
                  <span className="text-amber-500 font-bold text-xs">✦</span>
                </div>
                <svg
                  className="w-5 h-5 text-[#5c4033] dark:text-amber-400 absolute top-7 -left-2 group-hover:-translate-x-0.5 transition-transform"
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

              {/* 2D Ayush Reading Spellbook on Cloud */}
              <img
                src={imageSrc}
                alt={alt}
                className={`w-full max-w-[280px] sm:max-w-[340px] md:max-w-md object-contain select-none drop-shadow-2xl transition-transform duration-300 hover:scale-105 ${
                  isNightMode ? "" : "mix-blend-multiply"
                }`}
              />
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
