/* main.js — reads SITE_CONFIG and builds the page */

document.addEventListener("DOMContentLoaded", () => {
  const C = SITE_CONFIG;

  setIdentity(C);
  buildHero(C);
  buildGallery(C);
  buildProyav(C);
  buildSketchNotes(C);
  buildAbout(C);
  buildContact(C);
  buildFooter(C);

  initScrollReveal();
  initLightbox();
  initNav();

});

/* ── Identity ─────────────────────────────────────────────── */
function setIdentity(C) {
  document.title = C.name;
  document.querySelectorAll("[data-name]").forEach(el => el.textContent = C.name);
  // nav logo is now an <img> — no text injection needed
}

/* ── Hero ─────────────────────────────────────────────────── */
function buildHero(C) {
  const pool = C.heroImages.filter(i => i.src);
  if (!pool.length) return;
  const pick = pool[Math.floor(Math.random() * pool.length)];

  const img = document.getElementById("hero-img");
  const cap = document.getElementById("hero-caption");
  if (img) { img.src = pick.src; img.alt = pick.caption || ""; }
  if (cap)   cap.textContent = pick.caption || "";
}

/* ── Gallery ──────────────────────────────────────────────── */
function buildGallery(C) {
  const grid = document.getElementById("gallery-grid");
  if (!grid) return;

  const allWorks = [
    ...C.paintings.map(w => ({ ...w, category: "painting" })),
    ...C.drawings.map(w => ({ ...w, category: "drawing" })),
  ];

  if (!allWorks.length) {
    grid.innerHTML = `<p class="empty-state">Add paintings to the config to see them here.</p>`;
    return;
  }

  // Render all items once — filtering just shows/hides, never re-renders
  grid.innerHTML = allWorks.map((w, i) => `
    <div class="gallery-item fade-in" data-category="${w.category}" data-index="${i}"
         role="button" tabindex="0" aria-label="View ${w.title}">
      <img src="${w.src}" alt="${w.title}" loading="lazy">
      <div class="gallery-item-info">
        <div class="gallery-item-title">${w.title}</div>
        <div class="gallery-item-meta">${w.medium}${w.year ? " · " + w.year : ""}</div>
      </div>
    </div>
  `).join("");

  attachGalleryEvents(grid);
  balanceMasonryColumns(grid);

  // Filter buttons — show/hide existing items, re-layout visible ones
  const filters = document.querySelectorAll("[data-filter]");
  filters.forEach(btn => {
    btn.addEventListener("click", () => {
      filters.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const cat = btn.dataset.filter;
      grid.querySelectorAll(".gallery-item").forEach(item => {
        item.style.display = (cat === "all" || item.dataset.category === cat) ? "" : "none";
      });
      balanceMasonryVisible(grid);
    });
  });

  // Hide filter buttons for empty categories
  const hasDrawings = C.drawings.length > 0;
  document.querySelector('[data-filter="drawing"]')?.closest("li")
    ?.style.setProperty("display", hasDrawings ? "" : "none");
}

function attachGalleryEvents(grid) {
  grid.querySelectorAll(".gallery-item").forEach(item => {
    const open = () => {
      const visibleItems = Array.from(grid.querySelectorAll(".gallery-item"))
        .filter(el => el.style.display !== "none");
      const idx = visibleItems.indexOf(item);
      const slides = visibleItems.map(el => ({
        src:     el.querySelector("img").src,
        caption: el.querySelector(".gallery-item-title").textContent,
      }));
      openLightbox(slides, idx);
    };
    item.addEventListener("click", open);
    item.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") open(); });
  });
}

/* ── Masonry layout for visible items (after filter) ─────── */
function balanceMasonryVisible(grid) {
  const GAP = 24;
  const gridW = grid.offsetWidth;
  const cols = gridW < 480 ? 1 : gridW < 900 ? 2 : 3;
  const colW = (gridW - GAP * (cols - 1)) / cols;
  const colTops = new Array(cols).fill(0);

  const items = Array.from(grid.querySelectorAll(".gallery-item"))
    .filter(item => item.style.display !== "none");

  items.forEach(item => {
    const img = item.querySelector("img");
    const h = (img && img.naturalWidth && img.naturalHeight)
      ? Math.round(colW * img.naturalHeight / img.naturalWidth)
      : Math.round(colW);
    const shortest = colTops.indexOf(Math.min(...colTops));
    item.style.width = colW + "px";
    item.style.left  = Math.round(shortest * (colW + GAP)) + "px";
    item.style.top   = colTops[shortest] + "px";
    colTops[shortest] += h + GAP;
  });

  grid.style.height = Math.max(...colTops) - GAP + "px";
}

/* ── JS Masonry layout ────────────────────────────────────── */
// Positions items with absolute coords — pixel-perfect top alignment,
// balanced bottom edge via shortest-column-first bin-packing.
let masonryResizeListener = null;

function balanceMasonryColumns(grid) {
  const items = Array.from(grid.querySelectorAll(".gallery-item"));
  if (!items.length) return;

  const GAP = 24; // px — keep in sync with --gap

  function colsForWidth(w) {
    if (w < 480) return 1;
    if (w < 900) return 2;
    return 3;
  }

  function layout() {
    const gridW = grid.offsetWidth;
    const cols  = colsForWidth(gridW);
    const colW  = (gridW - GAP * (cols - 1)) / cols;

    // Item heights from natural image dimensions (all images must be loaded)
    const itemHeights = items.map(item => {
      const img = item.querySelector("img");
      if (img && img.naturalWidth && img.naturalHeight) {
        return Math.round(colW * img.naturalHeight / img.naturalWidth);
      }
      return Math.round(colW); // square fallback
    });

    // Bin-pack: shortest column first
    const colTops = new Array(cols).fill(0);
    const positions = items.map((_, i) => {
      const shortest = colTops.indexOf(Math.min(...colTops));
      const pos = { left: Math.round(shortest * (colW + GAP)), top: colTops[shortest], width: colW };
      colTops[shortest] += itemHeights[i] + GAP;
      return pos;
    });

    // Apply positions
    items.forEach((item, i) => {
      item.style.width  = positions[i].width + "px";
      item.style.left   = positions[i].left  + "px";
      item.style.top    = positions[i].top   + "px";
    });

    // Set grid height to tallest column
    grid.style.height = Math.max(...colTops) - GAP + "px";
  }

  // Wait for every image to have natural dimensions
  const imgs = items.map(i => i.querySelector("img")).filter(Boolean);
  let pending = imgs.filter(img => !img.complete || !img.naturalWidth).length;

  function onLoad() {
    pending--;
    if (pending <= 0) layout();
  }

  if (pending === 0) {
    layout();
  } else {
    imgs.forEach(img => {
      if (!img.complete || !img.naturalWidth) {
        img.addEventListener("load",  onLoad, { once: true });
        img.addEventListener("error", onLoad, { once: true });
      }
    });
  }

  // Re-layout on resize (debounced); only attach once globally
  if (!masonryResizeListener) {
    let t;
    masonryResizeListener = () => { clearTimeout(t); t = setTimeout(() => balanceMasonryVisible(grid), 150); };
    window.addEventListener("resize", masonryResizeListener, { passive: true });
  }
}

/* ── Sketch Notes ─────────────────────────────────────────── */
function buildSketchNotes(C) {
  const grid = document.getElementById("notes-grid");
  if (!grid) return;

  if (!C.sketchNotes.length) {
    grid.innerHTML = `<p class="empty-state">Add sketch notes to the config to see them here.</p>`;
    return;
  }

  grid.innerHTML = C.sketchNotes.map(note => {
    const thumb = note.thumbnail
      ? `<img class="note-thumb" src="${note.thumbnail}" alt="${note.title}" loading="lazy">`
      : `<div class="note-thumb-placeholder" aria-hidden="true">
           <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path d="M8 12h32M8 20h24M8 28h28M8 36h20"
               stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
           </svg>
         </div>`;

    const linkDefs = [
      note.medium     ? { href: note.medium,    icon: "📖", label: "Read" }       : null,
      note.youtube    ? { href: note.youtube,   icon: "▶",  label: "Watch" }      : null,
      note.youtubeUa  ? { href: note.youtubeUa, icon: "▶",  label: "Watch · UA" } : null,
    ].filter(Boolean);

    const hasLinks = linkDefs.length > 0;
    const linksHtml = hasLinks
      ? `<div class="note-links">
          ${linkDefs.map(l => `
            <a class="note-link" href="${l.href}" target="_blank" rel="noopener">
              <span class="note-link-icon">${l.icon}</span>
              ${l.label}
            </a>`).join("")}
        </div>`
      : "";

    return `
      <div class="note-card fade-in${hasLinks ? "" : " no-links"}" data-topic="${note.topic || ""}">
        <div class="note-thumb-wrap">
          ${thumb}
          ${note.topic ? `<span class="note-topic">${note.topic}</span>` : ""}
        </div>
        <div class="note-body">
          <h3 class="note-title">${note.title}</h3>
          ${note.desc ? `<p class="note-desc">${note.desc}</p>` : ""}
        </div>
        ${linksHtml}
      </div>
    `;
  }).join("");

  // Lightbox for sketch note thumbnails
  attachNotesLightbox(grid);

  // Filter buttons
  const filters = document.querySelectorAll("[data-notes-filter]");
  filters.forEach(btn => {
    btn.addEventListener("click", () => {
      filters.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const cat = btn.dataset.notesFilter;
      grid.querySelectorAll(".note-card").forEach(card => {
        card.style.display = (cat === "all" || card.dataset.topic === cat) ? "" : "none";
      });
      attachNotesLightbox(grid); // re-wire after filter
    });
  });
}

function attachNotesLightbox(grid) {
  const cards = Array.from(grid.querySelectorAll(".note-card"))
    .filter(c => c.style.display !== "none" && c.querySelector(".note-thumb"));
  cards.forEach(card => {
    const thumb = card.querySelector(".note-thumb");
    if (!thumb) return;
    thumb.style.cursor = "zoom-in";
    // Remove old listener by cloning
    const fresh = thumb.cloneNode(true);
    thumb.replaceWith(fresh);
    fresh.addEventListener("click", () => {
      const visibleCards = Array.from(grid.querySelectorAll(".note-card"))
        .filter(c => c.style.display !== "none" && c.querySelector(".note-thumb"));
      const idx = visibleCards.indexOf(card);
      const slides = visibleCards.map(c => ({
        src:     c.querySelector(".note-thumb").src,
        caption: c.querySelector(".note-title")?.textContent || "",
      }));
      openLightbox(slides, idx);
    });
  });
}

/* ── Proyav ───────────────────────────────────────────────── */
function buildProyav(C) {
  const p = C.proyav;
  const pronunciation = document.getElementById("proyav-pronunciation");
  const desc = document.getElementById("proyav-desc");
  const features = document.getElementById("proyav-features");
  const screens = document.getElementById("proyav-screens");
  const appLink = document.getElementById("proyav-applink");

  if (pronunciation) pronunciation.textContent = p.pronunciation || "";
  if (desc) desc.innerHTML = p.desc.replace(/\n/g, "<br>");
if (features) features.innerHTML = p.features
  .map(f => `<li><span class="feature-heading">${f.heading}</span><span class="feature-text">${f.text}</span></li>`).join("");
  if (screens) screens.innerHTML = p.screens
    .map((s, i) => `<div class="proyav-screen">
      <img src="${s}" alt="Proyav app screenshot ${i + 1}" loading="lazy">
    </div>`).join("");
  if (appLink) appLink.href = C.links.appstore;
}

/* ── About ────────────────────────────────────────────────── */
function buildAbout(C) {
  const photo = document.getElementById("about-photo-wrap");
  if (photo) {
    if (C.profilePhoto) {
      photo.innerHTML = `
        <img src="images/profile/${C.profilePhoto}" alt="${C.name}" class="about-photo">
        <div class="about-accent"></div>`;
    } else {
      photo.innerHTML = `
        <div class="about-photo-placeholder">
          <span>${C.initials}</span>
        </div>
        <div class="about-accent"></div>`;
    }
  }

  const body = document.getElementById("about-body");
  if (body) body.innerHTML = C.about.trim();

  const tags = document.getElementById("about-tags");
  if (tags) tags.innerHTML = C.tags
    .map(t => `<span class="tag">${t}</span>`).join("");
}

/* ── Contact ──────────────────────────────────────────────── */
function buildContact(C) {
  const links = document.getElementById("contact-links");
  if (links) {
    const items = [
      { label: "Medium",    value: "@MarginsExplained",               href: C.links.medium,    icon: "edit" },
      { label: "YouTube",   value: "In the Margins | Ideas Explained", href: C.links.youtube,   icon: "video" },
      { label: "Instagram", value: "@hannakamyshanska",                href: C.links.instagram, icon: "instagram" },
    ];
    links.innerHTML = items.map(item => `
      <a href="${item.href}" target="_blank" rel="noopener" class="contact-link">
        <div class="contact-link-icon">
          ${iconSVG(item.icon)}
        </div>
        <div>
          <div class="contact-link-label">${item.label}</div>
          <div class="contact-link-value">${item.value}</div>
        </div>
      </a>
    `).join("");
  }
}

/* ── Footer ───────────────────────────────────────────────── */
function buildFooter(C) {
  const footer = document.getElementById("footer-links");
  if (!footer) return;
  footer.innerHTML = `
    © ${new Date().getFullYear()} ${C.name} &nbsp;·&nbsp;
    <a href="${C.links.medium}"    target="_blank">Medium</a> &nbsp;·&nbsp;
    <a href="${C.links.youtube}"   target="_blank">YouTube</a> &nbsp;·&nbsp;
    <a href="${C.links.instagram}" target="_blank">Instagram</a> &nbsp;·&nbsp;
    <a href="${C.links.appstore}"  target="_blank">Proyav</a> &nbsp;·&nbsp;
    <a href="impressum.html">Impressum</a> &nbsp;·&nbsp;
    <a href="privacy.html">Datenschutzerklärung</a>
    `;
}

/* ── Lightbox ─────────────────────────────────────────────── */
/* ── Lightbox ─────────────────────────────────────────────── */
let lightboxOpen  = false;
let lbSlides      = [];
let lbIndex       = 0;

function initLightbox() {
  const lb = document.getElementById("lightbox");
  if (!lb) return;

  // Close on backdrop or close button
  lb.addEventListener("click", e => {
    if (e.target === lb || e.target.classList.contains("lightbox-close")) closeLightbox();
  });

  // Prev / next buttons
  document.getElementById("lb-prev")?.addEventListener("click", e => { e.stopPropagation(); lbNav(-1); });
  document.getElementById("lb-next")?.addEventListener("click", e => { e.stopPropagation(); lbNav(+1); });

  // Keyboard
  document.addEventListener("keydown", e => {
    if (!lightboxOpen) return;
    if (e.key === "Escape")     closeLightbox();
    if (e.key === "ArrowLeft")  lbNav(-1);
    if (e.key === "ArrowRight") lbNav(+1);
  });

  // Touch swipe
  let touchX = null;
  lb.addEventListener("touchstart", e => { touchX = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend",   e => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 40) lbNav(dx < 0 ? +1 : -1);
    touchX = null;
  });
}

function openLightbox(slides, index) {
  lbSlides = Array.isArray(slides) ? slides : [{ src: slides, caption: index || "" }];
  lbIndex  = typeof index === "number" ? index : 0;
  lbShow();
  document.getElementById("lightbox")?.classList.add("open");
  document.body.style.overflow = "hidden";
  lightboxOpen = true;
}

function lbNav(dir) {
  lbIndex = (lbIndex + dir + lbSlides.length) % lbSlides.length;
  lbShow();
}

function lbShow() {
  const slide = lbSlides[lbIndex];
  const img = document.getElementById("lightbox-img");
  const cap = document.getElementById("lightbox-caption");
  const counter = document.getElementById("lb-counter");
  if (img) { img.src = slide.src; img.alt = slide.caption || ""; }
  if (cap) cap.textContent = slide.caption || "";
  if (counter) counter.textContent = lbSlides.length > 1
    ? `${lbIndex + 1} / ${lbSlides.length}` : "";

  // Hide nav arrows for single images
  const showNav = lbSlides.length > 1;
  document.getElementById("lb-prev")?.style.setProperty("display", showNav ? "" : "none");
  document.getElementById("lb-next")?.style.setProperty("display", showNav ? "" : "none");
}

function closeLightbox() {
  document.getElementById("lightbox")?.classList.remove("open");
  document.body.style.overflow = "";
  lightboxOpen = false;
  lbSlides = [];
}

/* ── Scroll reveal ────────────────────────────────────────── */
function initScrollReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      // Stagger siblings in the same parent
      const siblings = entry.target.parentElement.querySelectorAll(".fade-in:not(.visible)");
      siblings.forEach((el, i) => {
        setTimeout(() => el.classList.add("visible"), i * 70);
      });
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08 });

  document.querySelectorAll(".fade-in").forEach(el => observer.observe(el));
}

/* ── Nav scroll behaviour ─────────────────────────────────── */
function initNav() {
  const nav = document.querySelector("nav");
  if (!nav) return;
  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 40);
  }, { passive: true });

  // Close lightbox if user clicks any nav link
  nav.addEventListener("click", () => {
    if (lightboxOpen) closeLightbox();
  });

  // Mobile menu toggle
  const toggle = document.getElementById("nav-toggle");
  const menu   = document.getElementById("nav-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open);
    });
    // Close on link click
    menu.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", false);
      });
    });
  }
}

function attachGalleryEvents(grid) {
  grid.querySelectorAll(".gallery-item").forEach(item => {
    const open = () => {
      // Find what is currently shown post-filter
      const visibleItems = Array.from(grid.querySelectorAll(".gallery-item"))
        .filter(el => el.style.display !== "none");
      
      const idx = visibleItems.indexOf(item);
      const slides = visibleItems.map(el => ({
        src:     el.querySelector("img").src,
        // Grabs the exact visible title rendering
        caption: el.querySelector(".gallery-item-title")?.textContent || "",
      }));
      
      openLightbox(slides, idx);
    };
    item.addEventListener("click", open);
    item.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") open(); });
  });
}

/* ── Tiny icon helper (avoids external font dep for these) ── */
function iconSVG(name) {
  const icons = {
    edit: `<svg viewBox="0 0 24 24" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>`,
    video: `<svg viewBox="0 0 24 24" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="2" y="7" width="15" height="13" rx="2"/><path d="M17 10l5-3v10l-5-3V10z"/></svg>`,
    instagram: `<svg viewBox="0 0 24 24" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4.5"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/></svg>`,
  };
  return icons[name] || "";
}