# hannakamyshanska.github.io

Personal portfolio — Hanna Kamyshanska.

---

## Folder structure

```
/
├── index.html              ← never needs editing
├── css/
│   └── style.css           ← design only; only touch for visual tweaks
├── js/
│   ├── config.js           ← ALL CONTENT LIVES HERE ← edit this
│   └── main.js             ← page logic; no need to touch
└── images/
    ├── paintings/          ← drop .jpg/.jpeg files here
    ├── drawings/           ← drop .jpg/.jpeg files here
    ├── sketch-notes/       ← optional thumbnails for note cards
    ├── proyav/             ← app screenshots (.png)
    └── profile/            ← your photo (.jpg)
```

---

## How to add a new painting

1. Drop the file into `images/paintings/` (e.g. `charcoal-portrait.jpg`)
2. Open `js/config.js`, find the `paintings` array, and add an entry:

```js
{
  src:    "images/paintings/charcoal-portrait.jpg",
  title:  "Portrait Study",
  medium: "Charcoal on paper",
  year:   "2025",
},
```

That's it. No HTML to touch.

---

## How to change the hero image

The hero picks a **random image from `heroImages`** in `config.js` on each page load.

To add or remove a hero image, just edit that array:
```js
heroImages: [
  { src: "images/paintings/frog-lily-pad.jpeg", caption: "Oil on canvas" },
  // add or remove lines here
],
```

---

## How to add your profile photo

1. Drop your photo in `images/profile/` (e.g. `hanna.jpg`)
2. In `config.js`, set:
```js
profilePhoto: "hanna.jpg",
```

---

## How to add a sketch note

In `config.js`, add to the `sketchNotes` array:
```js
{
  title:     "Your Note Title",
  topic:     "Topic label",
  desc:      "Short description.",
  thumbnail: "images/sketch-notes/your-thumb.jpg",  // or "" for placeholder
  youtube:   "https://youtu.be/...",   // or ""
  medium:    "https://medium.com/...", // or ""
},
```

---

## How to enable real email from the contact form

1. Go to [formspree.io](https://formspree.io), create a free account
2. Create a new form → copy the endpoint URL (looks like `https://formspree.io/f/xyzabcde`)
3. In `config.js`, paste it:
```js
formspreeEndpoint: "https://formspree.io/f/xyzabcde",
```

---

## Image tips

- **One file per artwork** — no thumbnails or resized copies needed.
- **Format:** JPG for paintings/drawings. PNG for app screenshots.
- **Size:** Aim for 1200–1800px on the longest side, under 500 KB.
  Use [Squoosh](https://squoosh.app) (free, browser-based) to compress before uploading.
- The browser handles all the cropping and lazy-loading automatically.

---

## Deploying to GitHub Pages

1. Push all files to the `main` branch of `hannakamyshanska.github.io`
2. Go to repo Settings → Pages → Source: `main` / `/ (root)` → Save
3. Live at `https://hannakamyshanska.github.io` within ~2 minutes
