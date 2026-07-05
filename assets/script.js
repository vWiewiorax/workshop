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
const form = document.getElementById("contactForm");
const note = document.getElementById("formNote");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = form.name.value.trim();
  const phone = form.phone.value.trim();
  const message = form.message.value.trim();

  if (!name || !phone || !message) {
    note.textContent = "Uzupełnij imię, telefon i opis usterki.";
    note.className = "form__note err";
    return;
  }
  if (!/^[+\d][\d\s-]{6,}$/.test(phone)) {
    note.textContent = "Podaj poprawny numer telefonu.";
    note.className = "form__note err";
    return;
  }

  note.textContent = "Dziękujemy! Zgłoszenie zostało przyjęte — oddzwonimy najszybciej jak to możliwe.";
  note.className = "form__note ok";
  form.reset();
});
