# 🧙‍♂️ Ayush Mane — The Junior Data Weaver & AI Alchemist ✦

[![React](https://img.shields.io/badge/React-19.2-61dafb?style=flat-square&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646cff?style=flat-square&logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v4.3-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-14.3-ff0055?style=flat-square&logo=framer)](https://www.framer.com/motion/)
[![Web Audio API](https://img.shields.io/badge/Web_Audio-API-f59e0b?style=flat-square)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

An interactive, story-driven portfolio blending full-stack AI engineering, real-time telemetry, and whimsical Data Mage aesthetics. Built for high performance, rich micro-interactions, tactile retro cards, and responsive storytelling.

---

## ✨ Experience Highlights

### 1. 🏰 Gatekeeper Authentication Realm (`AuthPage.jsx`)
- **Illustrated Ancient Scroll**: Custom parchment interface with brass rings and wooden spindles.
- **Simulated Firebase Auth**: Production-ready client authentication SDK with persistent local storage, RFC-compliant email validation, error handling, and password security.
- **Fast-Track Demo Access**: One-click bypass for evaluators (`guest` / `magic`).
- **Interactive Chibi Mage**: Clickable Ayush avatar triggering whole-page confetti magic.

### 2. 🪄 Wand Cursor & Sparkle Trail (`SparkleCursor.jsx`)
- **Custom Wand Cursor**: Dynamic pixel-art wand pointer with custom click hotspots.
- **Sparkle Particle Physics**: Ambient pinging particles trailing cursor movements and multi-colored double-click star bursts.
- **Persistent Achievement Badge**: Automatically attaches the glowing `✦ MASTER ALCHEMIST` badge once unlocked.

### 3. ⚡ 3D Parallax Hero Sandbox (`Hero.jsx`)
- **Interactive Cloud Avatar**: Ayush reading his grimoire with continuous floating motion and 3D parallax tilt physics responding to mouse movements.
- **Tactile Comic Bubbles**: Interactive speech bubbles prompting magic sparks and double-click celebration effects.
- **High-Contrast Typography**: Bold, playful headlines with responsive scaling across mobile, tablet, and widescreen viewports.

### 4. 📜 3-Act Origin Story (`OriginStory.jsx`)
- **The Awakening**: Early AIML roots, neural networks, and mathematical foundations.
- **The Synthesis**: Merging heavy data engineering with modern reactive UI design.
- **The Wand & The Web**: Deploying PyTorch models, real-time pipelines, and micro-frontends.
- **Tactile Retro Styling**: Warm parchment fills (`#fbf5eb`), dark roast borders (`#382b26`), and 3D offset drop shadows.

### 5. 🔮 The Spellbook — Featured Projects (`Spellbook.jsx`)
- **🎙️ SamvaadAI (The Conversational Oracle)**:
  - Voice-first multilingual AI translating government documentation into colloquial Marathi streams with sub-300ms latency.
  - **Live Audio Streaming**: Integrated MPEG audio player (`samvaad.mpeg`) with interactive animated equalizer bars and live status telemetry.
  - Tech tags: `#FastAPI`, `#Whisper ASR`, `#Coqui TTS`, `#Marathi NLP`, `#WebSockets`.
- **📊 Insight Hub (The Data Crystal Ball)**:
  - Enterprise telemetry and predictive anomaly detection dashboard with retro SVG analytics window.
  - Tech tags: `#Next.js`, `#Python Pandas`, `#scikit-learn`, `#D3.js`, `#PostgreSQL`.
- **🤖 AI Tutor (The Digital Mentor)**:
  - Personalized CS curriculum companion with adaptive reinforcement learning curves and contextual RAG.
  - Tech tags: `#Adaptive RL`, `#Vector Embeddings`, `#Contextual RAG`, `#PyTorch`, `#LangChain`.

### 6. 🍄 "Archmage Overdrive" Secret Easter Egg (`Footer.jsx`)
- **Hidden Woodland Spirit**: Concealed mushroom button in the bottom telemetry corner.
- **Web Audio Level-Up Synth (`audio.js`)**: Real-time synthesized square-wave frequency ramp (200Hz $\to$ 1200Hz) layered over a harmonic major chord arpeggio (C5-E5-G5-C6) that bypasses global mute.
- **Full-Screen Overclocked Overlay**:
  - Spring-animated Archmage avatar with glowing yellow-gold screen blend aura.
  - Violently vibrating `⚠️ AIML NEURAL CORE OVERCLOCKED! ⚠️` typography.
  - Bouncy "Claim Master Alchemist Badge 🏆" button unlocking session-persistent cursor badges.

### 7. 🌙 Dual Realm Theming ("Dream Mode" vs Day Mode)
- **Top Sticky Dial Header (`Header.jsx`)**: Nav pills, sliding Dream Mode switch, volume toggle, and retro 6-digit vintage odometer.
- **Decoupled CSS-First Dark Mode**: Tailwind CSS v4 `@variant dark` rules prevent OS system dark mode from colliding with custom Day/Night state.

### 8. 📖 Enchanted Telemetry Grimoire (`Footer.jsx`)
- **Interactive Guestbook**: Inscribe greetings with persistent storage and celebration confetti bursts.

---

## 🏗️ Project Architecture

```
Portfolio/
├── public/
│   ├── 1792262595671.png          # Archmage character artwork
│   ├── ancient-scroll-base.png    # Illustrated scroll asset
│   ├── ayush_chibi.png            # Chibi avatar asset
│   ├── icons.svg                  # Vector icons
│   ├── mushroom-tree-bg.png       # Forest backdrop
│   ├── portfolio-char.png         # Cloud character asset
│   ├── wand-cursor*.png           # Custom wand cursor assets
│   └── sounds/                    # Chimes, pops, and Samvaad audio
│       ├── chime.mp3
│       ├── pop.mp3
│       └── samvaad.mpeg
├── src/
│   ├── assets/                    # Bundled static icons & images
│   ├── components/                # Modular UI components
│   │   ├── Footer.jsx             # Guestbook & Overdrive Easter Egg
│   │   ├── Header.jsx             # Sticky navbar, pills, & odometer
│   │   ├── Hero.jsx               # 3D character hero section
│   │   ├── OriginStory.jsx        # Journey story cards
│   │   ├── SparkleCursor.jsx      # Wand cursor & Master Alchemist badge
│   │   └── Spellbook.jsx          # Project showcase & audio streamer
│   ├── pages/                     # Primary routes
│   │   ├── AuthPage.jsx           # Portal login / signup realm
│   │   └── Portfolio.jsx          # Master portfolio experience
│   ├── utils/                     # Core utilities & engines
│   │   ├── audio.js               # Web Audio synth sound generator
│   │   └── firebase.js            # Authentication SDK & local storage DB
│   ├── App.jsx                    # Root view controller
│   ├── index.css                  # Design tokens, cursors, & theme variants
│   └── main.jsx                   # React 19 bootstrap entry
├── .gitignore                     # Production ignore rules
├── package.json
└── vite.config.js
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18.0 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/ayush-portfolio.git
   cd ayush-portfolio/Portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Preview the production bundle**:
   ```bash
   npm run preview
   ```

---

## 🔑 Demo Credentials

To enter the realm immediately from the Gatekeeper screen:
- **Email / Mage ID**: `guest` (or `guest@mage.realm`)
- **Secret Spell**: `magic`
- *Or click "Fast-Track Demo Login" on the portal scroll.*

---

## 🛠️ Built With

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 8](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Motion & Physics**: [Framer Motion](https://www.framer.com/motion/)
- **Sound & Synthesis**: Native [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) & [use-sound](https://github.com/joshwcomeau/use-sound)
- **Effects**: [canvas-confetti](https://www.npmjs.com/package/canvas-confetti)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 📜 License & Credits

- **Crafted with 💖 by Team TechnoBytes**
- **Author**: Ayush Mane (Junior Data Weaver & AI Alchemist)
- **License**: [MIT License](LICENSE) — Feel free to explore, learn, and weave your own magic!
