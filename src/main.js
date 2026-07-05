import "./styles.css";

// ===== Rok w stopce =====
document.getElementById("year").textContent = new Date().getFullYear();

// ===== Sticky nav =====
const nav = document.getElementById("nav");
const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 20);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

// ===== Menu mobilne =====
const toggle = document.getElementById("navToggle");
const links = document.getElementById("navLinks");
toggle.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  toggle.classList.toggle("open", open);
  toggle.setAttribute("aria-expanded", String(open));
});
links.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    links.classList.remove("open");
    toggle.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  })
);

// ===== Reveal on scroll =====
const reveals = document.querySelectorAll(".reveal");
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 }
);
reveals.forEach((el) => io.observe(el));

// ===== Liczniki w hero =====
const counters = document.querySelectorAll(".stat__num");
const animateCount = (el) => {
  const target = Number(el.dataset.count);
  const dur = 1400;
  const start = performance.now();
  const step = (now) => {
    const p = Math.min((now - start) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.floor(eased * target).toLocaleString("pl-PL");
    if (p < 1) requestAnimationFrame(step);
    else el.textContent = target.toLocaleString("pl-PL");
  };
  requestAnimationFrame(step);
};
const countObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        animateCount(e.target);
        countObserver.unobserve(e.target);
      }
    });
  },
  { threshold: 0.6 }
);
counters.forEach((c) => countObserver.observe(c));

// ===== Formularz kontaktowy =====
// Wysyłka na e-mail przez FormSubmit (https://formsubmit.co) — darmowe, bez backendu i bez rejestracji.
// Ustaw docelowy adres e-mail w VITE_FORMSUBMIT_EMAIL (.env). Przy pierwszym zgłoszeniu
// FormSubmit pokaże stronę aktywacyjną / wyśle link na ten adres — trzeba go raz potwierdzić.
// Używamy natywnego POST-a (nie AJAX), bo endpoint AJAX bywa blokowany przez Cloudflare.
const FORMSUBMIT_EMAIL = import.meta.env.VITE_FORMSUBMIT_EMAIL || "YOUR_EMAIL";

const form = document.getElementById("contactForm");
const note = document.getElementById("formNote");

// Komunikat po powrocie z FormSubmit (?sent=1)
if (new URLSearchParams(location.search).get("sent") === "1") {
  note.textContent = "Dziękujemy! Zgłoszenie zostało wysłane — oddzwonimy najszybciej jak to możliwe.";
  note.className = "form__note ok";
  history.replaceState(null, "", location.pathname + "#kontakt");
}

const emailReady = FORMSUBMIT_EMAIL && FORMSUBMIT_EMAIL !== "YOUR_EMAIL";
if (emailReady) {
  form.action = `https://formsubmit.co/${encodeURIComponent(FORMSUBMIT_EMAIL)}`;
  let next = form.querySelector('input[name="_next"]');
  if (!next) {
    next = document.createElement("input");
    next.type = "hidden";
    next.name = "_next";
    form.appendChild(next);
  }
  next.value = `${location.origin}${location.pathname}?sent=1#kontakt`;
}

form.addEventListener("submit", (e) => {
  const name = form.name.value.trim();
  const phone = form.phone.value.trim();

  if (!name || !phone || !form.message.value.trim()) {
    e.preventDefault();
    note.textContent = "Uzupełnij imię, telefon i opis usterki.";
    note.className = "form__note err";
    return;
  }
  if (!/^[+\d][\d\s-]{6,}$/.test(phone)) {
    e.preventDefault();
    note.textContent = "Podaj poprawny numer telefonu.";
    note.className = "form__note err";
    return;
  }
  if (!emailReady) {
    e.preventDefault();
    note.textContent =
      "Formularz nie jest jeszcze podłączony do e-maila (brak adresu docelowego). Zadzwoń: +48 793 980 808.";
    note.className = "form__note err";
    return;
  }
  // walidacja OK → pozwalamy na natywny POST do FormSubmit
});

// ===== Galeria / Opinie — infinite scroll (duplicate items) =====
const galleryTrack = document.querySelector(".gallery__track");
if (galleryTrack) {
  galleryTrack.innerHTML += galleryTrack.innerHTML;
}
const quotesTrack = document.querySelector(".quotes__track");
if (quotesTrack) {
  quotesTrack.innerHTML += quotesTrack.innerHTML;
}

// ===== Galeria — lightbox =====
const galleryItems = Array.from(document.querySelectorAll("#gallery .gallery__item img"));
const originalCount = galleryItems.length / 2;
const lb = document.getElementById("lightbox");
const lbImg = document.getElementById("lightboxImg");
const lbCaption = document.getElementById("lightboxCaption");
let lbIndex = 0;

const showLightbox = (i) => {
  lbIndex = ((i % originalCount) + originalCount) % originalCount;
  const img = galleryItems[lbIndex];
  lbImg.src = img.src;
  lbImg.alt = img.alt;
  lbCaption.textContent = img.alt;
};
const openLightbox = (i) => {
  showLightbox(i);
  lb.classList.add("open");
  lb.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
};
const closeLightbox = () => {
  lb.classList.remove("open");
  lb.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
};

galleryItems.forEach((img, i) => img.addEventListener("click", () => openLightbox(i)));
document.getElementById("lightboxClose").addEventListener("click", closeLightbox);
document.getElementById("lightboxPrev").addEventListener("click", () => showLightbox(lbIndex - 1));
document.getElementById("lightboxNext").addEventListener("click", () => showLightbox(lbIndex + 1));
lb.addEventListener("click", (e) => {
  if (e.target === lb) closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if (!lb.classList.contains("open")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") showLightbox(lbIndex - 1);
  if (e.key === "ArrowRight") showLightbox(lbIndex + 1);
});
