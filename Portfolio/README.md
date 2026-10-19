# 🧙‍♂️ Ayush Mane — The Junior Data Weaver & AI Alchemist ✦

[![React](https://img.shields.io/badge/React-19.2-61dafb?style=flat-square&logo=react)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js)](https://nodejs.org/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646cff?style=flat-square&logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v4.3-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-14.3-ff0055?style=flat-square&logo=framer)](https://www.framer.com/motion/)
[![Web Audio API](https://img.shields.io/badge/Web_Audio-API-f59e0b?style=flat-square)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

An interactive, story-driven portfolio blending full-stack AI engineering, real-time telemetry, and whimsical Data Mage aesthetics. Powered by a responsive React 19 frontend and a standalone Node.js Express backend with live local JSON persistence (`database.json`).

---

## ⚡ Quick Start for Judges & Evaluators

Run both the backend API and frontend dev server with two quick terminal commands:

### Terminal 1: Backend Server (Node.js + Express)
```bash
cd backend
npm install
npm start
# ✨ AIML Local Node Backend running on port 5000...
```

### Terminal 2: Frontend Client (Vite + React)
```bash
npm install
npm run dev
# ➜ Local: http://localhost:5173/
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔑 Demo Access Credentials

From the Gatekeeper Authentication Realm screen:
- **Email / Mage ID**: `guest` (or `guest@mage.realm`)
- **Secret Spell**: `magic`
- *Or simply click the **"Fast-Track Demo Login"** button on the scroll.*

---

## 🏗️ Architecture & Component Hierarchy

```
Portfolio/
├── .env                           # Frontend environment config (VITE_API_BASE_URL)
├── .gitignore                     # Production ignore rules (preserves database.json)
├── package.json                   # Client dependencies (React 19, Vite, Tailwind v4)
├── backend/                       # Standalone Node.js Express REST API
│   ├── .env                       # Backend environment config (PORT=5000)
│   ├── .gitignore                 # Ignores node_modules & .env; tracks database.json
│   ├── database.json              # Committed JSON DB (odometer, triggers, guestbook)
│   ├── package.json               # Backend dependencies (express, cors, nodemon)
│   └── server.js                  # Express API routes & fs persistence
├── public/                        # Static audio & high-res illustrated assets
│   ├── 1792262595671.png          # Archmage character art
│   ├── ancient-scroll-base.png    # Illustrated parchment scroll asset
│   ├── ayush_chibi.png            # Chibi avatar asset
│   └── sounds/                    # Chimes, pops, and Samvaad audio
│       ├── chime.mp3
│       ├── pop.mp3
│       └── samvaad.mpeg
└── src/
    ├── assets/                    # Bundled icons & images
    ├── components/
    │   ├── Footer.jsx             # Real-time Guestbook & Archmage Overdrive Easter Egg
    │   ├── Header.jsx             # Sticky navbar, mobile drawer, Bell & Odometer
    │   ├── Hero.jsx               # 3D interactive cloud character sandbox
    │   ├── OriginStory.jsx        # 3-Act story cards (The Awakening, Synthesis, Wand)
    │   ├── SparkleCursor.jsx      # Wand cursor trail & Master Alchemist badge
    │   └── Spellbook.jsx          # Featured AI projects & live audio waveform player
    ├── pages/
    │   ├── AuthPage.jsx           # Portal login / authentication realm
    │   └── Portfolio.jsx          # Master portfolio layout & theme manager
    └── utils/
        ├── api.js                 # API endpoint constant & fetch helper
        ├── audio.js               # Web Audio synth sound generator
        └── firebase.js            # Client authentication SDK & session manager
```

---

## 📡 Backend API Endpoints (`http://localhost:5000/api`)

The backend runs on Express with CORS enabled and uses `database.json` for file-based database persistence:

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/odometer` | Returns current view count `{ count: db.odometer }` |
| `POST` | `/api/odometer/tick` | Increments odometer count and returns `{ count: db.odometer }` |
| `POST` | `/api/easter-egg/trigger`| Increments overdrive counter and returns `{ overdrive_triggers: n }` |
| `GET` | `/api/guestbook` | Returns all inscribed grimoire entries as a JSON array |
| `POST` | `/api/guestbook` | Inscribes a new entry `{ name, message, timestamp }` |

---

## ✨ Experience Highlights

### 1. 🏰 Gatekeeper Authentication Realm (`AuthPage.jsx`)
- **Illustrated Ancient Scroll**: Custom parchment interface with brass rings and wooden spindles.
- **Client Authentication SDK**: Persistent local storage, RFC-compliant email validation, error handling, and password security.
- **Fast-Track Demo Access**: One-click bypass for instant access (`guest` / `magic`).
- **Interactive Chibi Mage**: Clickable Ayush avatar triggering full-page celebration confetti.

### 2. 🪄 Wand Cursor & Sparkle Trail (`SparkleCursor.jsx`)
- **Custom Wand Cursor**: Dynamic pixel-art wand pointer with custom click hotspots.
- **Sparkle Particle Physics**: Ambient pinging particles trailing cursor movements and multi-colored double-click star bursts.
- **Persistent Achievement Badge**: Automatically attaches the glowing `✦ MASTER ALCHEMIST` badge once unlocked from the Easter Egg.

### 3. 🔔 Interactive Notification Bell & System Alert (`Header.jsx`)
- **Animated Bell**: Positioned next to the Vintage Odometer with unread radar ping (`animate-ping`) and bouncy animation.
- **System Alert Dropdown**: Framer Motion animated modal revealing the clue to find the hidden red-capped mushroom in the undergrowth.

### 4. 📱 Bulletproof Mobile Navigation (`Header.jsx`)
- **Single-Row Top Bar on Mobile**: Prevents vertical bloating and screen clutter on small viewports.
- **Enchanted Hamburger Drawer**: Smooth sliding drawer with thumb-friendly navigation links and an embedded vintage odometer ticker.
- **Full Desktop Capsule**: Nav pills, Dream Mode toggle, volume switch, and live 5-digit zero-padded odometer (`00432`).

### 5. ⚡ 3D Parallax Hero Sandbox (`Hero.jsx`)
- **Interactive Cloud Avatar**: Ayush reading his grimoire with continuous floating motion and 3D parallax tilt physics responding to mouse movements.
- **Tactile Comic Bubbles**: Interactive speech bubbles prompting magic sparks and double-click celebration effects.
- **Responsive Typography**: Bold, playful headlines with mobile-optimized scaling (`text-5xl md:text-7xl lg:text-8xl`).

### 6. 🔮 The Spellbook — Featured Projects (`Spellbook.jsx`)
- **Responsive CSS Grid**: Dynamic layout (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`).
- **🎙️ SamvaadAI (The Conversational Oracle)**:
  - Voice-first multilingual AI translating government documentation into colloquial Marathi streams with sub-300ms latency.
  - **Live Audio Streaming**: Integrated MPEG audio player (`samvaad.mpeg`) with interactive animated equalizer bars and live status telemetry.
- **📊 Insight Hub (The Data Crystal Ball)**:
  - Enterprise telemetry and predictive anomaly detection dashboard with retro SVG analytics window.
- **🤖 AI Tutor (The Digital Mentor)**:
  - Personalized CS curriculum companion with adaptive reinforcement learning curves and contextual RAG.

### 7. 📖 Real-Time Enchanted Guestbook (`Footer.jsx`)
- **Live Local Node Backend Integration**: Fetches real-time entries directly from `GET /api/guestbook`.
- **Instant Inscription**: Submissions via `POST /api/guestbook` refresh the grimoire dynamically with zero page reloads.
- **Archive Pagination**: Clean `↓ Read More Spells...` and `↑ Hide Grimoire Archives` toggle with `break-words` text wrapping.

### 8. 🍄 "Archmage Overdrive" Secret Easter Egg (`Footer.jsx`)
- **Hidden Woodland Spirit**: Concealed mushroom button in the bottom telemetry corner.
- **Web Audio Level-Up Synth (`audio.js`)**: Real-time synthesized square-wave frequency ramp (200Hz $\to$ 1200Hz) layered over a harmonic major chord arpeggio (C5-E5-G5-C6) that bypasses global mute.
- **Live Overclock Counter**: Calls `POST /api/easter-egg/trigger` to update the global overclock tally live: `"⚠️ The AIML Core has been overclocked N times!"`.
- **Master Alchemist Badge**: Claiming the badge grants an achievement badge attached to the player's wand cursor.

---

## ⚙️ Environment Variables

### Frontend (`.env`)
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### Backend (`backend/.env`)
```env
PORT=5000
```

---

## 🛠️ Tech Stack

- **Frontend**: [React 19](https://react.dev/), [Vite 8](https://vitejs.dev/), [Tailwind CSS v4](https://tailwindcss.com/)
- **Backend**: [Node.js](https://nodejs.org/), [Express 5](https://expressjs.com/), [CORS](https://www.npmjs.com/package/cors), [Nodemon](https://nodemon.io/)
- **Database**: Local JSON File Database (`backend/database.json`)
- **Motion & Physics**: [Framer Motion](https://www.framer.com/motion/)
- **Audio & Synthesis**: Native [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) & [use-sound](https://github.com/joshwcomeau/use-sound)
- **Effects**: [canvas-confetti](https://www.npmjs.com/package/canvas-confetti)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 📜 License & Credits

- **Crafted with 💖 by Team TechnoBytes**
- **Author**: Ayush Mane (Junior Data Weaver & AI Alchemist)
- **License**: [MIT License](LICENSE) — Feel free to explore, learn, and weave your own magic!
