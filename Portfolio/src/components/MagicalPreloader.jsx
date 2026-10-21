import React from "react";
import { Html } from "@react-three/drei";
import { Sparkles, Loader2, Wand2 } from "lucide-react";

/**
 * MagicalPreloader Component
 * Designed specifically for use inside a Three.js Canvas <Suspense> boundary.
 * Renders glowing, rotating arcane runes and elegant pulsing text while the
 * 3D Data Mage (.glb) file streams through the digital ether.
 */
export default function MagicalPreloader() {
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center gap-3 p-5 rounded-3xl bg-[#fff8f1]/95 dark:bg-[#251814]/95 border-3 border-[#5c4033] dark:border-amber-400 shadow-[6px_6px_0px_#5c4033] dark:shadow-[6px_6px_0px_rgba(0,0,0,0.6)] backdrop-blur-md select-none text-center min-w-[240px] sm:min-w-[280px]">
        {/* Glowing Spinning Rune Ring */}
        <div className="relative flex items-center justify-center w-14 h-14">
          {/* Outer rotating ring */}
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#a34063] dark:border-amber-400 animate-[spin_8s_linear_infinite]" />
          
          {/* Inner fast spinner */}
          <Loader2 className="w-8 h-8 text-[#a34063] dark:text-amber-400 animate-spin" />

          {/* Floating magic sparkles */}
          <Sparkles className="w-4 h-4 text-amber-500 absolute -top-1 -right-1 animate-bounce" />
          <span className="text-[10px] text-pink-400 absolute -bottom-1 -left-1 animate-ping">
            ✦
          </span>
        </div>

        {/* Elegant Pulsing Text as requested */}
        <div className="flex flex-col items-center gap-1">
          <p className="font-serif font-black text-xs sm:text-sm tracking-wide text-[#5c4033] dark:text-amber-200 animate-pulse drop-shadow-xs">
            Summoning the Data Mage from the Ether...
          </p>
          <span className="font-mono text-[10px] text-[#5c4033]/70 dark:text-amber-300/70 font-semibold tracking-wider uppercase">
            ✦ Weaving 3D Polygons &amp; Shaders ✦
          </span>
        </div>
      </div>
    </Html>
  );
}
