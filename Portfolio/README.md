# 🧙‍♂️ Ayush Mane — The Junior Data Weaver & AI Alchemist ✦

[![React](https://img.shields.io/badge/React-19.2-61dafb?style=flat-square&logo=react)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-r186-black?style=flat-square&logo=three.js)](https://threejs.org/)
[![React Three Fiber](https://img.shields.io/badge/R3F-v9.8-black?style=flat-square)](https://docs.pmnd.rs/react-three-fiber/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js)](https://nodejs.org/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646cff?style=flat-square&logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v4.3-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-14.3-ff0055?style=flat-square&logo=framer)](https://www.framer.com/motion/)
[![Web Audio API](https://img.shields.io/badge/Web_Audio-API-f59e0b?style=flat-square)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

An interactive, story-driven portfolio blending full-stack AI engineering, real-time telemetry, 3D WebGL immersion, and whimsical Data Mage aesthetics. Powered by a responsive React 19 frontend and a standalone Node.js Express backend with live local JSON persistence (`database.json`).

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
├── package.json                   # Client dependencies (React 19, R3F, Drei, Three.js, Tailwind v4)
├── backend/                       # Standalone Node.js Express REST API
│   ├── .env                       # Backend environment config (PORT=5000)
│   ├── .gitignore                 # Ignores node_modules & .env; tracks database.json
│   ├── database.json              # Committed JSON DB (odometer, triggers, guestbook)
│   ├── package.json               # Backend dependencies (express, cors, nodemon)
│   └── server.js                  # Express API routes & fs persistence
├── public/                        # Static 3D models, audio, and illustrated assets
│   ├── data-mage.glb              # High-fidelity 3D Data Mage character model
│   ├── 1792262595671.png          # Archmage 2D illustration on cloud
│   ├── ancient-scroll-base.png    # Illustrated parchment scroll asset
│   ├── ayush_chibi.png            # Chibi avatar asset
│   ├── mushroom-tree-bg.png       # Enchanted woodland background
│   └── sounds/                    # Chimes, pops, and Samvaad audio
│       ├── chime.mp3
│       ├── pop.mp3
│       └── samvaad.mpeg
└── src/
    ├── assets/                    # Bundled icons & images
    ├── components/
    │   ├── CharacterShowcase.jsx  # 2D/3D toggle viewport with OrbitControls & Canvas
    │   ├── CrystalBall.jsx        # Glassmorphic 2D tech fortune teller with physics shake
    │   ├── Footer.jsx             # Real-time Guestbook & Archmage Overdrive Easter Egg
    │   ├── Header.jsx             # Sticky navbar, mobile drawer, Bell, Odometer, & Archmage Welcome
    │   ├── Hero.jsx               # Side-by-side hero section mounting the 3D Character Showcase
    │   ├── MagicalPreloader.jsx   # Three.js Suspense preloader with rotating rune rings
    │   ├── OriginStory.jsx        # 3-Act story cards (The Awakening, Synthesis, Wand)
    │   ├── ScrollOfTruth.jsx      # Pitch-dark parchment with dynamic torchlight reveal
    │   ├── SparkleCursor.jsx      # Wand cursor trail & Master Alchemist badge
    │   ├── Spellbook.jsx          # Featured AI projects & live audio waveform player
    │   └── VisitorMemory.jsx      # LocalStorage traveler inscription modal
    ├── pages/
    │   ├── AuthPage.jsx           # Portal login / authentication realm
    │   ├── NotFound.jsx           # "Lost in the Void" cosmic 404 recovery realm
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

## ✨ Boss-Level Experience Highlights

### 1. 🧙‍♂️ Interactive 3D Character Showcase (`CharacterShowcase.jsx`)
- **Dual-Mode Toggle**: Seamlessly switches between an interactive 2D floating illustration and a live 3D WebGL model via a tactile parchment toggle button (*"Switch to 3D Model"* / *"Switch to 2D Image"*).
- **Three.js & React Three Fiber**: Renders `data-mage.glb` inside a responsive `<Canvas>` with multi-point directional studio lighting, rim lighting, and ambient glow.
- **Full 360° Interaction**: Powered by `@react-three/drei`'s `<OrbitControls>`, allowing judges to rotate 360°, pan, and scroll-to-zoom around the Data Mage.
- **Magical Preloader (`MagicalPreloader.jsx`)**: Enclosed in `<Html center>` inside the `<Suspense>` boundary, featuring spinning dashed arcane rings, sparkles, and pulsing status runes (*"Summoning the Data Mage from the Ether..."*).

### 2. 📜 The Scroll of Truth — Flashlight Reveal (`ScrollOfTruth.jsx`)
- **Pitch-Dark Torchlight Mechanic**: Dynamic `radial-gradient` tracking mouse coordinates (`x, y`) and mobile touch gestures to simulate a real-time magical torch sweeping across an ancient classified codex.
- **Hidden Archmage Lore**: Illuminates classified records confirming Team TechnoBytes as the Archmages of the Realm.
- **Secret Passphrase**: Unveils `✨ Secret Code: 404_MAGIC_NOT_FOUND` with 1-click clipboard inscription, sound effects, and celebratory confetti.
- **Universal Accessibility**: Includes a *"Summon Full Light 💡"* toggle button for full visibility on mobile devices and screen readers.

### 3. 🔮 The Crystal Ball — Tech Fortune Teller (`CrystalBall.jsx`)
- **Glassmorphic 2D Sphere**: Deep cosmic violet/indigo gradients with swirling cyan nebula mist, specular glass glare, and a carved antique mahogany pedestal.
- **Interactive Shaking Physics**: Click the orb or the *"Shake the Crystal Ball ✦"* button to trigger an animated shake vibration, sound effects, and particle confetti.
- **16 Developer & Hackathon Fortunes**: Randomized developer prophecies with smart deduplication (e.g., *"The stars foresee... a terrifying merge conflict in your near future"*, *"The prophecy is written... you will spend three hours debugging a simple typo today"*).
- **Animated Parchment Bubble**: Fading-in grimoire bubble displaying the revealed fortune and shake tally.

### 4. 🧠 "Visitor Memory" System (`VisitorMemory.jsx` & `Header.jsx`)
- **Traveler Inscription Modal**: Checks `localStorage` for `mageName`. If missing, renders an ancient parchment modal over a dark glassmorphism backdrop: *"Halt, traveler! Identify yourself to enter the Grimoire."*
- **Persistent Personalization**: Once inscribed, persists to `localStorage` and automatically renders a glowing badge across the entire portfolio: `"Welcome back, Archmage [Name]!"` on both the desktop navbar and the mobile drawer.

### 5. 🌌 "Lost in the Void" 404 Page (`NotFound.jsx`)
- **Cosmic Contrast Aesthetic**: Deep pitch-black / cosmic violet background (`#0a0612`) contrasting sharply with the bright parchment realm to signify stepping outside reality.
- **Unstable Void Elements**: Large glowing gradient "404" header, rotating compass anomaly, and drifting arcane void runes.
- **Teleportation CTA**: Glowing gradient button: *"Teleport back to the Grimoire"* with sound and confetti routing back home.

### 6. 🏰 Gatekeeper Authentication Realm (`AuthPage.jsx`)
- **Illustrated Ancient Scroll**: Custom parchment interface with brass rings and wooden spindles.
- **Client Authentication SDK**: Persistent local storage, RFC-compliant email validation, error handling, and password security.
- **Fast-Track Demo Access**: One-click bypass for instant access (`guest` / `magic`).
- **Interactive Chibi Mage**: Clickable Ayush avatar triggering full-page celebration confetti.

### 7. 🪄 Wand Cursor & Sparkle Trail (`SparkleCursor.jsx`)
- **Custom Wand Cursor**: Dynamic pixel-art wand pointer with custom click hotspots.
- **Sparkle Particle Physics**: Ambient pinging particles trailing cursor movements and multi-colored double-click star bursts.
- **Persistent Achievement Badge**: Automatically attaches the glowing `✦ MASTER ALCHEMIST` badge once unlocked from the Easter Egg.

### 8. 🔔 Interactive Notification Bell & System Alert (`Header.jsx`)
- **Animated Bell**: Positioned next to the Vintage Odometer with unread radar ping (`animate-ping`) and bouncy animation.
- **System Alert Dropdown**: Framer Motion animated modal revealing the clue to find the hidden red-capped mushroom in the undergrowth.

### 9. 📱 Bulletproof Mobile Navigation (`Header.jsx`)
- **Single-Row Top Bar on Mobile**: Prevents vertical bloating and screen clutter on small viewports.
- **Enchanted Hamburger Drawer**: Smooth sliding drawer with thumb-friendly navigation links and an embedded vintage odometer ticker.
- **Full Desktop Capsule**: Nav pills, Dream Mode toggle, volume switch, and live 5-digit zero-padded odometer (`00010`).

### 10. 🔮 The Spellbook — Featured Projects (`Spellbook.jsx`)
- **Responsive CSS Grid**: Dynamic layout (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`).
- **🎙️ SamvaadAI (The Conversational Oracle)**:
  - Voice-first multilingual AI translating government documentation into colloquial Marathi streams with sub-300ms latency.
  - **Live Audio Streaming**: Integrated MPEG audio player (`samvaad.mpeg`) with interactive animated equalizer bars and live status telemetry.
- **📊 Insight Hub (The Data Crystal Ball)**:
  - Enterprise telemetry and predictive anomaly detection dashboard with retro SVG analytics window.
- **🤖 AI Tutor (The Digital Mentor)**:
  - Personalized CS curriculum companion with adaptive reinforcement learning curves and contextual RAG.

### 11. 📖 Real-Time Enchanted Guestbook (`Footer.jsx`)
- **Live Local Node Backend Integration**: Fetches real-time entries directly from `GET /api/guestbook`.
- **Instant Inscription**: Submissions via `POST /api/guestbook` refresh the grimoire dynamically with zero page reloads.
- **Archive Pagination**: Clean `↓ Read More Spells...` and `↑ Hide Grimoire Archives` toggle with `break-words` text wrapping.

### 12. 🍄 "Archmage Overdrive" Secret Easter Egg (`Footer.jsx`)
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

- **Frontend Core**: [React 19](https://react.dev/), [Vite 8](https://vitejs.dev/), [Tailwind CSS v4](https://tailwindcss.com/)
- **3D Graphics & WebGL**: [Three.js](https://threejs.org/), [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber/), [@react-three/drei](https://github.com/pmndrs/drei)
- **Backend API**: [Node.js](https://nodejs.org/), [Express 5](https://expressjs.com/), [CORS](https://www.npmjs.com/package/cors), [Nodemon](https://nodemon.io/)
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
