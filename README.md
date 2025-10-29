# 🏰 Solitaire Castle Royal — Mini Web Game

A lightweight, playable **Solitaire-inspired mini web game** built with **HTML, CSS, and JavaScript**.  
Perfect for showcasing your game assets, testing mechanics, or creating a short interactive ad!

---

## 🎮 Features

- **Card Draw System** — Tap the **Draw Deck** button to reveal the next card.
- **Score Counter** — Increases as you draw cards.
- **Interactive UI** — Includes deck, draw area, and smooth animations.
- **Game Assets** — High-quality images, background, and sound effects.
- **Playable Ad Ready** — Add a "Download Now" CTA and fireworks on win.

---

## 🗂️ Folder Structure

```
assets/
 ┣ 📁 cards/              # Contains all regular card PNGs (Clubs, Hearts, Spades, Diamonds)
 ┃ ┗ 📁 specialCards/     # +5Card, Wild Card, combo cards like AK, KQ, etc.
 ┣ 📁 exports/            # UI assets like background, logo, CTA button, fireworks
 ┣ 📁 sounds/             # Sound effects and background music
 ┣ 🎴 index.html          # Main game file
 ┣ 🎨 style.css           # Styling and layout
 ┗ ⚙️ script.js           # Game logic
```

---

## 🧩 Setup Instructions

### 1️⃣ Clone or Download the Game
```bash
git clone https://github.com/Archittt/Solitaire-Castle-Royal.git
cd Solitaire-Castle-Royal
```

### 2️⃣ Open in Browser
Simply double-click `index.html` or open it with:
```bash
start index.html      # Windows
open index.html       # macOS
xdg-open index.html   # Linux
```

---

## 🔊 Sound Assets
| File | Description |
|------|--------------|
| `Button.mp3` | Button click sound |
| `Collect Item.mp3` | Item collection |
| `Draw.mp3` | Card draw sound |
| `Fire_cracker_SFX.mp3` | Firework explosion |
| `Game music.mp3` | Background loop |
| `Game Win.mp3` | Win sound |
| `WinTrumpet.mp3` | Trumpet victory |

---

## 🕹️ Gameplay
1. Click **Draw Deck** to reveal the next card.
2. Each draw increases your **score counter**.
3. Special cards like `+5Card.png` give bonus points.
4. Trigger a **win animation** using `Fireworks.png` and `Text-Congrats.png`.

---

## 💡 Future Enhancements
- Add auto-card placement rules (classic Solitaire logic)
- Add timer and leaderboard
- Add sound toggle and settings menu
- Add level progression and “Play Again” screen

---

## 🧠 Developer Notes
- Built using **vanilla JavaScript** for fast loading.
- Uses **preloaded images** from `/assets/cards/`.
- Designed to be mobile-friendly and responsive.

---

## 🧰 License
This project is free for educational and non-commercial use.  
All graphical and sound assets belong to their respective creators.

---

**Created by:** Archit Rathor  
**Version:** 1.0.0 
