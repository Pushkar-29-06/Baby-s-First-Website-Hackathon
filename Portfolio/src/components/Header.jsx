import React, { useState, useEffect } from "react";
import useSound from "use-sound";
import { Sun, Moon, Volume2, VolumeX, LogOut, Bell, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { API_BASE_URL } from "../utils/api";

/**
 * Header Component (Sticky Top Navbar)
 * Responsive across mobile, tablet, and desktop:
 * - Mobile (<md): Single-row top bar with brand badge, controls, and enchanted hamburger menu drawer
 * - Desktop (>=md): Full nav pills capsule, theme dials, audio toggle, notification bell, and vintage odometer
 */
export default function Header({
  activeTab = "booting-up",
  setActiveTab,
  isNightMode,
  toggleNightMode,
  isMuted,
  toggleMuted,
  onBackToPortal,
}) {
  const [showNotification, setShowNotification] = useState(false);
  const [hasRead, setHasRead] = useState(false);
  const [viewCount, setViewCount] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const endpoint = `${import.meta.env.VITE_API_BASE_URL || API_BASE_URL}/odometer/tick`;
    fetch(endpoint, { method: "POST" })
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.count === "number") {
          setViewCount(data.count);
        }
      })
      .catch((err) => console.error("Odometer tick failed:", err));
  }, []);

  const [playChime] = useSound("/sounds/chime.mp3", {
    soundEnabled: !isMuted,
    volume: 0.5,
  });

  const navItems = [
    { id: "booting-up", label: "Booting Up", target: "hero-section" },
    { id: "journey", label: "The Journey", target: "journey-section" },
    { id: "projects", label: "My Projects", target: "projects-section" },
    { id: "guestbook", label: "Guestbook", target: "guestbook-section" },
  ];

  const handleNavClick = (item) => {
    if (setActiveTab) setActiveTab(item.id);
    if (!isMuted) {
      try {
        playChime();
      } catch (e) {}
    }
    const el = document.getElementById(item.target);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleThemeToggle = () => {
    if (!isMuted) {
      try {
        playChime();
      } catch (err) {}
    }
    toggleNightMode();
  };

  const handleMuteToggle = () => {
    if (isMuted) {
      try {
        playChime();
      } catch (err) {}
    }
    toggleMuted();
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-inherit/90 backdrop-blur-md border-b-2 border-current/10 select-none transition-colors duration-700">
      {/* Top Bar Container: Single sleek row on all devices */}
      <div className="w-full px-4 sm:px-6 md:px-16 py-3 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left Side: Brand on mobile, and Logout + Nav Pills on desktop */}
        <div className="flex items-center gap-2 sm:gap-3">
          {onBackToPortal && (
            <button
              type="button"
              onClick={onBackToPortal}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-mono font-bold bg-[#a34063] text-[#fff8f1] border border-[#5c4033]/30 shadow-xs hover:scale-105 active:scale-95 transition-all cursor-pointer shrink-0"
              title="Sign out back to Realm Entry"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          )}

          {/* Mobile brand indicator */}
          <div className="md:hidden flex items-center gap-1 text-xs font-mono font-extrabold tracking-tight">
            <span className="text-amber-500 animate-pulse">✦</span>
            <span className="opacity-90">AYUSH.EXE</span>
          </div>

          {/* Desktop Nav Pills */}
          <nav
            aria-label="Portfolio sections"
            className="hidden md:inline-flex items-center gap-1 p-1 rounded-full border-2 border-current/20 bg-[#fff8f1]/80 dark:bg-[#382b26]/80 shadow-[2px_2px_0px_currentColor] transition-colors"
          >
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item)}
                  className={`px-3.5 lg:px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? "bg-[#5c4033] text-[#fff8f1] dark:bg-[#fff8f1] dark:text-[#5c4033] shadow-[1px_1px_0px_rgba(0,0,0,0.2)] scale-102"
                      : "hover:text-[#a34063] opacity-80 hover:opacity-100"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right Side: Quick Dials & Controls */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-5 text-xs sm:text-sm font-bold">
          {/* Dream Mode Toggle */}
          <div className="flex items-center gap-1.5">
            <span className="hidden lg:inline tracking-tight text-xs opacity-85">
              Dream Mode
            </span>
            <div
              onClick={handleThemeToggle}
              role="button"
              tabIndex={0}
              title={
                isNightMode ? "Wake Up (Day Mode)" : "Dream Mode (Night Mode)"
              }
              className="inline-flex items-center gap-1 p-1 rounded-full border-2 border-current/30 bg-[#fff8f1]/90 dark:bg-[#382b26]/90 shadow-[2px_2px_0px_currentColor] cursor-pointer active:scale-95 transition-all"
            >
              <div
                className={`p-1 rounded-full transition-colors ${
                  !isNightMode
                    ? "bg-[#a34063] text-[#fff8f1]"
                    : "opacity-60 hover:opacity-100"
                }`}
              >
                <Sun className="w-3.5 h-3.5" />
              </div>
              <div
                className={`p-1 rounded-full transition-colors ${
                  isNightMode
                    ? "bg-[#5c4033] text-amber-300 dark:bg-[#fff8f1] dark:text-[#251b17]"
                    : "opacity-60 hover:opacity-100"
                }`}
              >
                <Moon className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Sounds Toggle */}
          <button
            type="button"
            onClick={handleMuteToggle}
            title={isMuted ? "Unmute sounds" : "Mute sounds"}
            className="p-1.5 sm:p-2 rounded-full border-2 border-current/30 bg-[#fff8f1]/90 dark:bg-[#382b26]/90 shadow-[2px_2px_0px_currentColor] cursor-pointer active:scale-95 transition-all flex items-center justify-center"
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5 text-current/60" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-[#a34063] dark:text-amber-400" />
            )}
          </button>

          {/* Notification Bell */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setShowNotification(!showNotification);
                setHasRead(true);
              }}
              title="System Alert"
              className="p-1.5 sm:p-2 rounded-full border-2 border-current/30 bg-[#fff8f1]/90 dark:bg-[#382b26]/90 shadow-[2px_2px_0px_currentColor] cursor-pointer active:scale-95 transition-all flex items-center justify-center relative"
            >
              <Bell
                className={`w-3.5 h-3.5 text-[#a34063] dark:text-amber-400 ${
                  !hasRead ? "animate-bounce" : ""
                }`}
              />
              {!hasRead && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3 pointer-events-none">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
              )}
            </button>

            {/* Dropdown (System Alert) */}
            <AnimatePresence>
              {showNotification && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full right-0 mt-3 w-64 max-w-[calc(100vw-2rem)] bg-[#fffdf8] dark:bg-[#2e211b] border-2 border-[#a34063] rounded-xl p-4 shadow-xl z-50 text-left"
                >
                  <div className="text-[10px] font-mono text-[#a34063] dark:text-amber-400 font-bold mb-1">
                    ⚠️ SYSTEM ALERT
                  </div>
                  <p className="text-xs sm:text-sm text-[#5c4033] dark:text-[#fff8f1] leading-snug">
                    The AIML Core requires a backup energy source to achieve overdrive.{" "}
                    <strong>Seek the red-capped fungus in the undergrowth...</strong>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Desktop Vintage Odometer */}
          <div className="hidden md:flex items-center gap-2">
            <span className="hidden lg:inline tracking-tight text-xs opacity-85">
              Vintage Odometer
            </span>
            <div className="inline-flex items-center gap-0.5 p-1 rounded-lg border-2 border-current/30 bg-[#fff8f1]/90 dark:bg-[#382b26]/90 shadow-[2px_2px_0px_currentColor]">
              {String(viewCount || 432)
                .padStart(5, "0")
                .split("")
                .map((digit, idx) => (
                  <div
                    key={idx}
                    className="w-4 h-5 sm:w-5 sm:h-6 rounded-xs border border-current/25 bg-[#fcefe3] dark:bg-[#1f1612] text-current font-mono font-bold text-xs flex items-center justify-center shadow-inner"
                  >
                    {digit}
                  </div>
                ))}
            </div>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-1.5 sm:p-2 rounded-xl border-2 border-current/30 bg-[#fff8f1]/90 dark:bg-[#382b26]/90 shadow-[2px_2px_0px_currentColor] cursor-pointer active:scale-95 transition-all flex items-center justify-center text-[#5c4033] dark:text-[#fff8f1]"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-4 h-4 text-[#a34063] dark:text-amber-400" />
            ) : (
              <Menu className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden overflow-hidden border-t border-current/15 bg-[#fff8f1]/95 dark:bg-[#251b17]/95 backdrop-blur-xl px-4 py-4 space-y-4 shadow-xl"
          >
            {/* Nav Links Stack */}
            <div className="flex flex-col gap-2">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      handleNavClick(item);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full px-4 py-2.5 rounded-2xl text-left text-xs sm:text-sm font-bold transition-all flex items-center justify-between border cursor-pointer ${
                      isActive
                        ? "bg-[#5c4033] text-[#fff8f1] dark:bg-[#fff8f1] dark:text-[#5c4033] border-[#5c4033] shadow-[2px_2px_0px_rgba(0,0,0,0.25)]"
                        : "border-current/15 bg-white/50 dark:bg-black/20 hover:text-[#a34063]"
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="text-amber-400 text-xs">✦</span>
                  </button>
                );
              })}
            </div>

            {/* Mobile Odometer Display */}
            <div className="pt-3 border-t border-current/10 flex items-center justify-between px-1">
              <span className="text-xs font-mono font-bold tracking-tight opacity-75">
                VINTAGE ODOMETER
              </span>
              <div className="inline-flex items-center gap-0.5 p-1 rounded-lg border-2 border-current/30 bg-[#fff8f1]/90 dark:bg-[#382b26]/90 shadow-[2px_2px_0px_currentColor]">
                {String(viewCount || 432)
                  .padStart(5, "0")
                  .split("")
                  .map((digit, idx) => (
                    <div
                      key={idx}
                      className="w-4 h-5 rounded-xs border border-current/25 bg-[#fcefe3] dark:bg-[#1f1612] text-current font-mono font-bold text-xs flex items-center justify-center shadow-inner"
                    >
                      {digit}
                    </div>
                  ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// Backward-compatible individual exports
export function LeftNavPills(props) {
  return <Header {...props} />;
}

export function RightControls(props) {
  return null;
}
