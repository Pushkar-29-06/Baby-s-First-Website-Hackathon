import React, { useEffect, useState } from "react";

export default function SparkleCursor({ hasBadge: initialBadge = false }) {
  const [sparkles, setSparkles] = useState([]);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [hasMasterBadge, setHasMasterBadge] = useState(() => {
    if (initialBadge) return true;
    try {
      return sessionStorage.getItem("masterAlchemistBadge") === "true";
    } catch (e) {
      return false;
    }
  });

  useEffect(() => {
    if (initialBadge) setHasMasterBadge(true);
  }, [initialBadge]);

  useEffect(() => {
    let lastSpawn = 0;

    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });

      const now = Date.now();
      if (now - lastSpawn < 40) return;
      lastSpawn = now;

      const id = `${now}-${Math.random()}`;
      const newSparkle = {
        id,
        x: e.clientX,
        y: e.clientY,
        size: hasMasterBadge ? "w-2.5 h-2.5" : "w-2 h-2",
        color: hasMasterBadge
          ? Math.random() > 0.5
            ? "bg-amber-400 shadow-[0_0_10px_#fbbf24]"
            : "bg-[#a34063] shadow-[0_0_10px_#a34063]"
          : "bg-[#a34063]",
      };

      setSparkles((prev) => [...prev, newSparkle]);

      setTimeout(() => {
        setSparkles((prev) => prev.filter((s) => s.id !== id));
      }, 600);
    };

    const handleDblClick = (e) => {
      const now = Date.now();
      const burst = Array.from({ length: 12 }).map((_, i) => ({
        id: `burst-${now}-${i}`,
        x: e.clientX + (Math.random() - 0.5) * 50,
        y: e.clientY + (Math.random() - 0.5) * 50,
        size: "w-3 h-3",
        color: i % 2 === 0 ? "bg-[#a34063]" : "bg-amber-400 shadow-[0_0_8px_#fbbf24]",
      }));

      setSparkles((prev) => [...prev, ...burst]);

      setTimeout(() => {
        setSparkles((prev) => prev.filter((s) => !s.id.startsWith(`burst-${now}`)));
      }, 700);
    };

    const handleBadgeClaimed = () => {
      setHasMasterBadge(true);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("dblclick", handleDblClick);
    window.addEventListener("claim-master-badge", handleBadgeClaimed);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("dblclick", handleDblClick);
      window.removeEventListener("claim-master-badge", handleBadgeClaimed);
    };
  }, [hasMasterBadge]);

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
        {sparkles.map((sparkle) => (
          <div
            key={sparkle.id}
            className={`absolute ${sparkle.size} rounded-full ${sparkle.color} animate-ping`}
            style={{
              left: `${sparkle.x - 4}px`,
              top: `${sparkle.y - 4}px`,
            }}
          />
        ))}
      </div>

      {/* Persistent Glowing ✦ Master Alchemist Badge attached to Wand Cursor */}
      {hasMasterBadge && cursorPos.x > -50 && (
        <div
          className="pointer-events-none fixed z-9998 transition-transform duration-75 ease-out select-none"
          style={{
            left: `${cursorPos.x + 18}px`,
            top: `${cursorPos.y + 12}px`,
          }}
        >
          <div className="relative flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#251b17]/95 border-2 border-amber-400 text-amber-300 shadow-[0_0_18px_rgba(251,191,36,0.95)] backdrop-blur-xs">
            <span className="text-amber-400 text-sm font-extrabold animate-pulse drop-shadow-[0_0_8px_#fbbf24]">
              ✦
            </span>
            <span className="text-[10px] font-mono font-black tracking-wider uppercase text-amber-300">
              MASTER ALCHEMIST
            </span>
          </div>
        </div>
      )}
    </>
  );
}
