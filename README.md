# Quantum Quest

A game-style course that goes from counting to quantum gravity: 25 parts, 929 topics, 2,822 exercises.
Built with React, TypeScript, Vite and PixiJS. Art, sounds and font are from Kenney (kenney.nl), CC0.

## Play
- **Hosted on claude.ai:** progress syncs to your Claude account, the "Explain" buttons ask Claude, and Claude checks any answer the automatic marking rejects.
- **On the web:** https://megalodooon.github.io/quantum-quest/ (every push to `main` deploys). The Tutor tab, "Explain" buttons and Claude's answer checks only work on claude.ai. Written answers there are compared with the answer key by you.
- **On an iPhone:** open that link in Safari, tap *Share*, then *Add to Home Screen*. It opens full screen like an app.
  Progress is saved on that device only, and the home screen app keeps its own save, separate from Safari.

## Develop
```
npm install
npm run dev          # local dev server
npm run build        # single-file page for claude.ai (dist/quantum-quest.html)
npm run build:pages  # normal site for GitHub Pages (dist-pages/)
python3 scripts/build_content.py   # rebuild src/content/parts.json from content-src/
```
All tunable game numbers (XP, prices, quests, badges) live in `src/game/rules.ts`.
