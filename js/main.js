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
  initContactForm(C);
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

  // Lightbox triggers
  grid.querySelectorAll(".gallery-item").forEach(item => {
    const open = () => {
      const img = item.querySelector("img");
      openLightbox(img.src, item.querySelector(".gallery-item-title").textContent);
    };
    item.addEventListener("click", open);
    item.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") open(); });
  });

  // Filter buttons
  const filters = document.querySelectorAll("[data-filter]");
  filters.forEach(btn => {
    btn.addEventListener("click", () => {
      filters.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const cat = btn.dataset.filter;
      grid.querySelectorAll(".gallery-item").forEach(item => {
        item.style.display = (cat === "all" || item.dataset.category === cat) ? "" : "none";
      });
    });
  });

  // Hide filter buttons for empty categories
  const hasDrawings = C.drawings.length > 0;
  document.querySelector('[data-filter="drawing"]')?.closest("li")
    ?.style.setProperty("display", hasDrawings ? "" : "none");
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
      { label: "Medium",   value: "@MarginsExplained",               href: C.links.medium,  icon: "edit" },
      { label: "YouTube",  value: "In the Margins | Ideas Explained", href: C.links.youtube, icon: "video" },
      { label: "GitHub",   value: "kamishiki",                        href: C.links.github,  icon: "code" },
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
    <a href="${C.links.medium}"   target="_blank">Medium</a> &nbsp;·&nbsp;
    <a href="${C.links.youtube}"  target="_blank">YouTube</a> &nbsp;·&nbsp;
    <a href="${C.links.appstore}" target="_blank">Proyav</a>
  `;
}

/* ── Lightbox ─────────────────────────────────────────────── */
let lightboxOpen = false;

function initLightbox() {
  const lb = document.getElementById("lightbox");
  if (!lb) return;
  lb.addEventListener("click", e => {
    if (e.target === lb || e.target.classList.contains("lightbox-close")) {
      closeLightbox();
    }
  });
  document.addEventListener("keydown", e => {
    if (lightboxOpen && e.key === "Escape") closeLightbox();
  });
}

function openLightbox(src, caption) {
  const lb  = document.getElementById("lightbox");
  const img = document.getElementById("lightbox-img");
  const cap = document.getElementById("lightbox-caption");
  if (!lb || !img) return;
  img.src = src;
  img.alt = caption || "";
  if (cap) cap.textContent = caption || "";
  lb.classList.add("open");
  document.body.style.overflow = "hidden";
  lightboxOpen = true;
}

function closeLightbox() {
  document.getElementById("lightbox")?.classList.remove("open");
  document.body.style.overflow = "";
  lightboxOpen = false;
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

/* ── Contact form ─────────────────────────────────────────── */
function initContactForm(C) {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", async e => {
    e.preventDefault();
    const btn = form.querySelector(".btn-send");
    btn.textContent = "Sending…";
    btn.disabled = true;

    if (C.formspreeEndpoint) {
      try {
        const res = await fetch(C.formspreeEndpoint, {
          method: "POST",
          headers: { "Accept": "application/json" },
          body: new FormData(form),
        });
        if (res.ok) {
          showFormSuccess(btn, form);
        } else {
          btn.textContent = "Error — try again";
          btn.disabled = false;
        }
      } catch {
        btn.textContent = "Error — try again";
        btn.disabled = false;
      }
    } else {
      // No endpoint configured — show success anyway (demo mode)
      setTimeout(() => showFormSuccess(btn, form), 600);
    }
  });
}

function showFormSuccess(btn, form) {
  btn.textContent = "Sent ✓";
  btn.style.background = "var(--green)";
  setTimeout(() => {
    btn.textContent = "Send message →";
    btn.style.background = "";
    btn.disabled = false;
    form.reset();
  }, 3500);
}

/* ── Tiny icon helper (avoids external font dep for these) ── */
function iconSVG(name) {
  const icons = {
    edit: `<svg viewBox="0 0 24 24" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>`,
    video: `<svg viewBox="0 0 24 24" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="2" y="7" width="15" height="13" rx="2"/><path d="M17 10l5-3v10l-5-3V10z"/></svg>`,
    code: `<svg viewBox="0 0 24 24" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>`,
  };
  return icons[name] || "";
}