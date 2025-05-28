# 🌌 Project [ConquestAce](http://www.conquestace.com/) — Astro + Tailwind Starter

A cryptic, anarchy-themed starter website powered by [Astro](https://astro.build) and styled with [Tailwind CSS](https://tailwindcss.com). Built for speed, modularity, and originality — this template is a perfect base for experimental, glitch-inspired, or dark-themed sites.

---

## 🚀 Tech Stack

- ⚡ [Astro](https://astro.build) — Static site generator for lightning-fast sites
- 🎨 [Tailwind CSS](https://tailwindcss.com) — Utility-first CSS for rapid styling
- 🌓 Custom Theme — Midnight blues, soft grays, glitch accents

---

## 📁 File Structure
```plaintext
├── public/ # Static assets
├── src/
│ ├── components/ # Reusable UI components (Header, Footer, etc.)
│ ├── layouts/ # Page layouts
│ ├── pages/ # Route-based pages (index, concept, etc.)
│ ├── styles/ # Global CSS (if needed)
│ └── utils/ # Utility scripts or helpers (optional)
├── astro.config.mjs # Astro configuration
├── tailwind.config.js # Tailwind theme and utility configuration
├── .gitignore
└── package.json
```

---

## 🛠️ Getting Started

```bash
# 1. Create a new project using this template
npx degit yourusername/conquestace-starter my-project
cd my-project

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Visit http://localhost:4321 to see your site live!

🎨 Theme Colors
midnight:   #21252d
mathblue:   #1b91d6
sky:        #8ecae6
slatecard:  #1a1e2a
lightblue:  #bfdbfe
hoverblue:  #60a5fa
slategray:  #1a1e2a
softgray:   #9ca3af

🧩 Customization Tips
- Modify layout in `src/layouts/BaseLayout.astro`

- Customize the theme in `tailwind.config.js`

- Add new pages in `src/pages`

- Use components from `src/components` to keep things modular

