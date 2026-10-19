import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Layers, Wand2 } from "lucide-react";

/**
 * OriginStory Component
 * Cards styled with warm retro parchment fill (#fbf5eb), dark brown border (#382b26),
 * and tactile 3D shadow matching the portfolio.png reference aesthetic.
 */
export default function OriginStory({ isNightMode }) {
  const scenes = [
    {
      scene: "Scene 1",
      heading: "The Awakening",
      text: "Summoned in the halls of the AIML department, Ayush discovered magic isn't in dusty books—it's in neural networks, mathematical proofs, and clean datasets.",
      icon: Sparkles,
      tag: "Neural Foundations",
    },
    {
      scene: "Scene 2",
      heading: "The Synthesis",
      text: "Realizing AI needs solid architectural bones, he bridged data engineering with modern UI design, weaving raw telemetry into intelligent predictive spells.",
      icon: Layers,
      tag: "Data Alchemy",
    },
    {
      scene: "Scene 3",
      heading: "The Wand & The Web",
      text: "Armed with Python wands, PyTorch models, and interactive web tools, Ayush creates high-performance user experiences that turn complex algorithms into child's play.",
      icon: Wand2,
      tag: "Modern Interface",
    },
  ];

  return (
    <section id="journey-section" className="w-full select-none">
      {/* Section Divider matching portfolio.png */}
      <div id="origin-story-divider" className="flex items-center justify-center gap-3 sm:gap-4 my-8 sm:my-12">
        <div
          className="flex-1 h-[2px]"
          style={{ backgroundColor: isNightMode ? "rgba(255, 248, 241, 0.25)" : "rgba(56, 43, 38, 0.25)" }}
        />
        <div className="flex items-center gap-2 text-xl sm:text-2xl md:text-3xl font-extrabold font-serif tracking-widest uppercase">
          <span className="text-amber-500">✦</span>
          <span style={{ color: isNightMode ? "#fff8f1" : "#382b26" }}>ORIGIN STORY</span>
          <span className="text-amber-500">✦</span>
        </div>
        <div
          className="flex-1 h-[2px]"
          style={{ backgroundColor: isNightMode ? "rgba(255, 248, 241, 0.25)" : "rgba(56, 43, 38, 0.25)" }}
        />
      </div>

      {/* Intro Subtitle */}
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 px-4">
        <p
          className="text-sm sm:text-base font-medium opacity-85 leading-relaxed"
          style={{ color: isNightMode ? "#fff8f1" : "#382b26" }}
        >
          From curious coder to Junior Data Weaver: how curiosity in machine learning transformed into full-stack AI craft.
        </p>
      </div>

      {/* 3 Story Cards with authentic warm parchment styling */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {scenes.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.scene}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ y: -6 }}
              className="p-5 sm:p-6 rounded-3xl border-2 border-[#382b26] dark:border-[#fff8f1]/30 bg-[#fbf5eb] dark:bg-[#2e211b] shadow-[4px_4px_0px_#382b26] dark:shadow-[4px_4px_0px_rgba(0,0,0,0.5)] flex flex-col justify-between gap-4 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 sm:w-12 h-11 sm:h-12 rounded-2xl bg-[#a34063] text-white border-2 border-[#382b26] flex items-center justify-center shadow-xs">
                    <Icon className="w-5 sm:w-6 h-5 sm:h-6" />
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#f0dfd5] dark:bg-[#3d2b23] text-[#382b26] dark:text-[#fff8f1] border border-[#382b26]/20">
                    {item.scene}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold font-serif mb-2 text-[#382b26] dark:text-[#fff8f1]">
                  {item.heading}
                </h3>

                <p className="text-xs sm:text-sm leading-relaxed text-[#382b26]/85 dark:text-[#fff8f1]/85 font-medium">
                  {item.text}
                </p>
              </div>

              <div className="pt-3 border-t border-[#382b26]/15 dark:border-[#fff8f1]/15 flex items-center justify-between text-[11px] font-mono text-[#382b26]/70 dark:text-[#fff8f1]/70">
                <span>{item.tag}</span>
                <span className="text-amber-500">✧</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
