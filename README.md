# Dar Al Sama Hotel & Residences — website

Mobile-first, bilingual (Arabic default, English via toggle or `?lang=en`) site for a demo boutique hotel in Old Sana'a.
The hotel, guests and contact details are fictional; bookings go to a WhatsApp demo number.

- Vite + React + TypeScript + Tailwind CSS v4
- `npm run build` type-checks, builds, server-renders the Arabic page and the 404 page (`scripts/prerender.mjs`)
- Set `BASE_PATH=/Dar-Al-Sama-Hotel-Website/` for GitHub Pages; deploy `dist/` to the `gh-pages` branch
- Images: `python3 scripts/optimize-images.py`; hero heading fonts: `python3 scripts/hero-fonts.py`
