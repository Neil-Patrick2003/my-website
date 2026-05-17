# Neil Patrick Mulingbayan — Portfolio

A dark-themed, motion-rich personal portfolio built with React, Vite, and Tailwind CSS v4. Features a sound-on intro, mouse-tracked spotlight, 3D-tilt project cards, a live audio visualizer, and a procedurally generated ambient soundtrack — no audio files, all Web Audio API.

> **About me:** 4th-year IT student at BSU Arasof in the Philippines, working full-stack across React, React Native, Vue, and Laravel. Open to my first professional role.

---

## Stack

- **Framework** — React 19 + Vite 8
- **Styling** — Tailwind CSS v4 (`@theme` tokens, custom utilities)
- **Fonts** — Space Grotesk, Inter, JetBrains Mono
- **Audio** — Web Audio API (procedural ambient music, real-time analyser visualizer, UI effect sounds)
- **Linting** — ESLint with React Hooks + React Refresh plugins

## Features

- Procedural ambient soundtrack — drone, pad, arpeggio, soft kick & hi-hat scheduled via Web Audio's `AudioContext`
- Dark/gray theme with custom token system
- Mouse-tracked spotlight, custom cursor with trail, 3D-tilt cards
- Live frequency visualizer that reacts to the music
- Performance-tuned — shared IntersectionObserver, rAF-batched mouse updates, idle-stopped animation loops
- Respects `prefers-reduced-motion`, keyboard focus rings, `pointer: coarse` fallbacks

## Selected Projects

| Project | Description | Stack |
|---|---|---|
| **RealSync** | Real-estate platform with live property updates via Laravel Reverb | React, Laravel, Reverb |
| **Fitness Hub** | Workout tracker with custom routines and progress logs | Laravel, Blade, Tailwind |
| **Clover Bank** | Mobile-first banking app with secure transactions | React Native, Laravel, REST |
| **Nutri Safari** | Nutrition platform with React/Laravel web + Flutter mobile | React, Laravel, Flutter |
| **Job Finder** | Job board with employer dashboards | Laravel, Blade |
| **CSR Tracker** | Customer-service tracking mobile app | React Native |
| **Twitter Clone** | Social feed clone with posts, follows, threads | React Native, Laravel, REST |

## Run locally

```bash
# install dependencies (use NODE_ENV=development if your shell exports production)
npm install

# start the dev server
npm run dev

# build for production
npm run build

# preview the production build
npm run preview
```

The dev server starts on `http://localhost:5173` (or the next free port).

## Project structure

```
src/
├── App.jsx                  # entry — SoundPrompt then Portfolio
├── main.jsx
├── index.css                # Tailwind + custom theme + animations
├── components/
│   ├── Portfolio.jsx        # main layout + section dividers
│   ├── Hero.jsx
│   ├── About.jsx
│   ├── Skills.jsx
│   ├── Projects.jsx
│   ├── Contact.jsx
│   ├── Navbar.jsx
│   ├── SoundPrompt.jsx      # initial sound on/off question
│   ├── SoundToggle.jsx
│   ├── SoundVisualizer.jsx  # FFT bars driven by the analyser node
│   ├── Cursor.jsx           # custom cursor (dot + ring + trail)
│   ├── MouseSpotlight.jsx   # global mouse-tracked radial gradient
│   ├── TiltCard.jsx         # rAF-batched 3D tilt wrapper
│   ├── Reveal.jsx           # shared IntersectionObserver wrapper
│   └── ...
├── context/
│   └── SoundContext.jsx     # enabled state + auto-start/stop music
└── utils/
    ├── sounds.js            # procedural music engine + UI effect tones
    └── useActiveSection.js  # shared IO for active-section detection
```

## Contact

- **Email** — neilpatrickbautistamulingbayan@gmail.com
- **GitHub** — [@Neil-Patrick2003](https://github.com/Neil-Patrick2003)
- LinkedIn & X coming soon
