import React from "react";
import useSound from "use-sound";
import { Sun, Moon, Volume2, VolumeX, LogOut } from "lucide-react";

/**
 * Header Component (Sticky Top Navbar)
 * Styled exactly to match portfolio.png:
 * - Left: "Nav Pills" label + pills capsule: "Booting Up", "The Journey", "My Projects", "Guestbook"
 * - Optional logout button to return to Auth Realm
 * - Right: "Dream Mode" toggle [ ☀️ | 🌙 ], "Sounds" [ 🔊 ], and "Vintage Odometer" [ 0 0 4 3 2 1 ]
 * - Sticky top-0 z-50 w-full px-6 md:px-16 py-4 flex items-center justify-between bg-inherit/80 backdrop-blur-md border-b-2 border-current/10
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
    <header className="sticky top-0 z-50 w-full px-4 sm:px-6 md:px-16 py-3.5 flex items-center justify-between bg-inherit/80 backdrop-blur-md border-b-2 border-current/10 select-none transition-colors duration-700">
      {/* Left Side: Nav Pills */}
      <div className="flex items-center gap-2 sm:gap-3">
        {onBackToPortal && (
          <button
            type="button"
            onClick={onBackToPortal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-bold bg-[#a34063] text-[#fff8f1] border border-[#5c4033]/30 shadow-xs hover:scale-105 active:scale-95 transition-all cursor-pointer"
            title="Sign out back to Realm Entry"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        )}

        {/* <div className="hidden lg:inline-block text-xs font-bold tracking-tight opacity-75">
          Nav Pills
        </div> */}

        <nav
          aria-label="Portfolio sections"
          className="inline-flex items-center gap-1 p-1 rounded-full border-2 border-current/20 bg-[#fff8f1]/80 dark:bg-[#382b26]/80 shadow-[2px_2px_0px_currentColor] transition-colors"
        >
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item)}
                className={`px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
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

      {/* Right Side: Control Dials (Dream Mode, Sounds, Vintage Odometer) */}
      <div className="flex items-center gap-3 sm:gap-4 md:gap-6 text-xs sm:text-sm font-bold">
        {/* Dream Mode Toggle */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="hidden md:inline tracking-tight text-xs opacity-85">
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
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="hidden md:inline tracking-tight text-xs opacity-85">
            Sounds
          </span>
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
        </div>

        {/* Vintage Odometer */}
        <div className="hidden sm:flex items-center gap-2">
          <span className="hidden lg:inline tracking-tight text-xs opacity-85">
            Vintage Odometer
          </span>
          <div className="inline-flex items-center gap-0.5 p-1 rounded-lg border-2 border-current/30 bg-[#fff8f1]/90 dark:bg-[#382b26]/90 shadow-[2px_2px_0px_currentColor]">
            {["0", "0", "4", "3", "2", "1"].map((digit, idx) => (
              <div
                key={idx}
                className="w-4 h-5 sm:w-5 sm:h-6 rounded-xs border border-current/25 bg-[#fcefe3] dark:bg-[#1f1612] text-current font-mono font-bold text-xs flex items-center justify-center shadow-inner"
              >
                {digit}
              </div>
            ))}
          </div>
        </div>
      </div>
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
