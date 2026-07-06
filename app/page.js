"use client";

import { useEffect, useRef, useState } from "react";

const FORMSUBMIT_EMAIL = process.env.NEXT_PUBLIC_FORMSUBMIT_EMAIL || "YOUR_EMAIL";

const services = [
  {
    title: "Swapy silników",
    desc: "Zaawansowane przekładki jednostek napędowych wraz z instalacją i adaptacją elektroniki.",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 33h6v-6h8v-6h12v6h6l6-6h6v6h6v11a6 6 0 0 1-6 6H24l-5-5H8z" />
        <path d="M22 21v-6h9" />
        <path d="M54 27h5" />
        <circle cx="30" cy="39" r="3" />
      </svg>
    ),
  },
  {
    title: "Auta powypadkowe",
    desc: "Naprawa i przywracanie pełnej sprawności pojazdów po szkodach komunikacyjnych.",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 41v-5l8-3 4-8a5 5 0 0 1 4.5-3h13a5 5 0 0 1 4.4 2.8L49 33l8 3v5" />
        <path d="M7 41h6" />
        <path d="M24 41h16" />
        <path d="M51 41h6" />
        <path d="M18 29h29" />
        <circle cx="18" cy="44" r="5" />
        <circle cx="46" cy="44" r="5" />
      </svg>
    ),
  },
  {
    title: "Wymiana panewek",
    desc: "Specjalizacja w silnikach BMW — skuteczna profilaktyka i naprawa układu korbowego.",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <rect x="21" y="8" width="22" height="16" rx="2" />
        <path d="M24 14h16" />
        <path d="M24 19h16" />
        <path d="M28 24l-3 18" />
        <path d="M36 24l3 18" />
        <circle cx="32" cy="49" r="7" />
        <circle cx="32" cy="49" r="2.5" />
      </svg>
    ),
  },
  {
    title: "Serwis okresowy",
    desc: "Regularna obsługa techniczna zapewniająca niezawodność i bezpieczeństwo pojazdu.",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 24h24a6 6 0 0 1 6 6v18a6 6 0 0 1-6 6H24a6 6 0 0 1-6-6z" />
        <path d="M18 24l-6-6h-4" />
        <path d="M12 18v-3" />
        <path d="M42 24v-4h7" />
        <path d="M33 34c-4 5-6 8-6 11a6 6 0 0 0 12 0c0-3-2-6-6-11z" />
      </svg>
    ),
  },
  {
    title: "Wymiana rozrządu",
    desc: "Kompleksowa obsługa rozrządu w silnikach benzynowych i wysokoprężnych.",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="25" cy="40" r="14" />
        <circle cx="25" cy="40" r="3" />
        <circle cx="47" cy="21" r="6" />
        <circle cx="47" cy="21" r="1.5" />
        <path d="M34 51 51 26" />
        <path d="M16 29 43 16" />
      </svg>
    ),
  },
  {
    title: "Diagnostyka i naprawy",
    desc: "Precyzyjna diagnostyka komputerowa i usuwanie usterek bez zgadywania.",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <rect x="14" y="8" width="24" height="34" rx="4" />
        <rect x="19" y="14" width="14" height="10" rx="1" />
        <path d="M20 20h2.5l1.5 3 2-6 1.5 3h3" strokeWidth="2" />
        <path d="M20 31h6" />
        <path d="M20 36h6" />
        <path d="M31 42v5a6 6 0 0 0 6 6h5" />
        <rect x="42" y="49" width="11" height="8" rx="1" />
      </svg>
    ),
  },
];

const gallery = [
  { src: "/images/zdj1.jpg", alt: "Montaż dolotu — realizacja WorkshopJS, serwis BMW Łańcut", cap: "Montaż dolotu — Honda Civic Type R" },
  { src: "/images/zdjopinie1.jpg", alt: "BMW M3 E92 po serwisie w WorkshopJS Łańcut", cap: "BMW M3 E92 po serwisie" },
  { src: "/images/rozrzadzdj.jpg", alt: "Diagnostyka jednostki napędowej BMW — WorkshopJS Łańcut", cap: "Diagnostyka jednostki napędowej" },
  { src: "/images/panewki.jpg", alt: "Wymiana panewek w silniku BMW — WorkshopJS Łańcut", cap: "Wymiana panewek — układ korbowy" },
  { src: "/images/zdjopinie2.jpg", alt: "BMW M4 i Dodge Caliber SRT4", cap: "BMW M4 i Dodge Caliber SRT4" },
  { src: "/images/zdjopinie3.jpg", alt: "Infiniti Q60 S — obniżone zawieszenie", cap: "Infiniti Q60 S" },
  { src: "/images/zdjopinie4.jpeg", alt: "Chevrolet Corvette C4", cap: "Chevrolet Corvette C4" },
];

const quotes = [
  { text: "Zdiagnozował wypadanie zapłonu, którego trzy inne warsztaty nie potrafiły znaleźć. Naprawił taniej, niż inni chcieli za samo zgadywanie.", name: "Patryk", car: "Łańcut · BMW 330i" },
  { text: "Uczciwe ceny, zero wciskania zbędnych napraw i naprawdę oddzwania. Cała moja rodzina wozi tu teraz auta.", name: "Krystian", car: "Rzeszów · BMW M3" },
  { text: "Umówiłem przegląd i serwis. Zrobione tego samego dnia, ze zdjęciami wszystkiego, czego dotykał. Porządna robota.", name: "Michał", car: "Rzeszów · BMW X5" },
  { text: "Wymiana rozrządu i pompy w moim E46 zrobiona wzorowo. Wszystko wyjaśnione, faktura, gwarancja. Polecam każdemu bmwiarzowi.", name: "Tomasz", car: "Łańcut · BMW E46 320d" },
  { text: "Panewki w N54 wymienione bez zarzutu. Auto znów ciągnie jak nowe, a cena uczciwa. W końcu warsztat, który zna się na BMW.", name: "Kamil", car: "Rzeszów · BMW F30 335i" },
  { text: "Kompleksowy serwis mojego 530d. Konkretna diagnoza, żadnego naciągania, a robota zrobiona na czas. Będę wracał.", name: "Marek", car: "Łańcut · BMW E60 530d" },
];

export default function Home() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [lightbox, setLightbox] = useState(null); // index or null
  const [note, setNote] = useState({ text: "", type: "" });
  const formRef = useRef(null);
  const emailReady = FORMSUBMIT_EMAIL && FORMSUBMIT_EMAIL !== "YOUR_EMAIL";

  // Sticky nav
  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Reveal on scroll
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
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
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Counters
  useEffect(() => {
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
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            animateCount(e.target);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach((c) => obs.observe(c));
    return () => obs.disconnect();
  }, []);

  // FormSubmit return message
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("sent") === "1") {
      setNote({
        text: "Dziękujemy! Zgłoszenie zostało wysłane — oddzwonimy najszybciej jak to możliwe.",
        type: "ok",
      });
      window.history.replaceState(null, "", window.location.pathname + "#kontakt");
    }
  }, []);

  // Lightbox keyboard nav
  useEffect(() => {
    if (lightbox === null) return;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowLeft") setLightbox((i) => (i - 1 + gallery.length) % gallery.length);
      if (e.key === "ArrowRight") setLightbox((i) => (i + 1) % gallery.length);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [lightbox]);

  const closeNav = () => setNavOpen(false);

  const handleSubmit = (e) => {
    const form = formRef.current;
    const name = form.name.value.trim();
    const phone = form.phone.value.trim();
    if (!name || !phone || !form.message.value.trim()) {
      e.preventDefault();
      setNote({ text: "Uzupełnij imię, telefon i opis usterki.", type: "err" });
      return;
    }
    if (!/^[+\d][\d\s-]{6,}$/.test(phone)) {
      e.preventDefault();
      setNote({ text: "Podaj poprawny numer telefonu.", type: "err" });
      return;
    }
    if (!emailReady) {
      e.preventDefault();
      setNote({
        text: "Formularz nie jest jeszcze podłączony do e-maila (brak adresu docelowego). Zadzwoń: +48 793 980 808.",
        type: "err",
      });
      return;
    }
    // walidacja OK → natywny POST do FormSubmit
  };

  const nextUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}${window.location.pathname}?sent=1#kontakt`
      : "";

  return (
    <>
      {/* ===== Nawigacja ===== */}
      <header className={"nav" + (navScrolled ? " scrolled" : "")} id="nav">
        <div className="container nav__inner">
          <a href="#hero" className="brand" aria-label="WorkshopJS — strona główna">
            <img src="/images/logogit3.png" alt="WorkshopJS" className="brand__img" />
          </a>

          <nav className={"nav__links" + (navOpen ? " open" : "")} aria-label="Nawigacja główna">
            <a href="#uslugi" onClick={closeNav}>Usługi</a>
            <a href="#praca" onClick={closeNav}>Praca</a>
            <a href="#opinie" onClick={closeNav}>Opinie</a>
            <a href="#o-mnie" onClick={closeNav}>O mnie</a>
            <a href="#kontakt" onClick={closeNav}>Kontakt</a>
            <a href="#kontakt" className="btn btn--sm btn--primary nav__cta" onClick={closeNav}>Umów wizytę</a>
          </nav>

          <button
            className={"nav__toggle" + (navOpen ? " open" : "")}
            aria-label="Otwórz menu"
            aria-expanded={navOpen}
            onClick={() => setNavOpen((o) => !o)}
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </header>

      {/* ===== Hero ===== */}
      <section className="hero" id="hero">
        <div className="hero__photo" aria-hidden="true"></div>
        <div className="hero__overlay" aria-hidden="true"></div>
        <div className="container hero__inner">
          <p className="hero__eyebrow reveal">Niezależny serwis BMW i nie tylko &bull; Kraszewskiego 219, Łańcut</p>
          <h1 className="hero__title reveal">Niezależny<br />serwis <span>BMW</span><br />w Łańcucie</h1>
          <p className="hero__lead reveal">W jednym miejscu zajmę się wszystkim — od szybkiej wymiany płynów eksploatacyjnych po kompleksowy remont silnika. Sprawnie diagnozuję problem, wykonuję naprawę i pomagam szybko wrócić na drogę.</p>
          <div className="hero__actions reveal">
            <a href="#kontakt" className="btn btn--primary">Umów wizytę</a>
            <a href="tel:+48793980808" className="btn btn--light">Zadzwoń: +48 793 980 808</a>
          </div>
          <div className="hero__stats reveal">
            <div className="stat"><span className="stat__num" data-count="13">0</span><span className="stat__label">lat doświadczenia</span></div>
            <div className="stat"><span className="stat__num-static">Pon–Pt</span><span className="stat__label">07:30 – 18:00</span></div>
            <div className="stat"><span className="stat__num-static">BMW</span><span className="stat__label">i nie tylko</span></div>
          </div>
        </div>
        <a href="#uslugi" className="hero__scroll" aria-label="Przewiń w dół"><span></span></a>
      </section>

      {/* ===== Pasek ===== */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {[0, 1].map((k) => (
            <span key={k} style={{ display: "contents" }}>
              <span>Swapy silników</span><span>&bull;</span><span>Wymiana panewek</span><span>&bull;</span><span>Wymiana rozrządu</span><span>&bull;</span><span>Serwis okresowy</span><span>&bull;</span><span>Auta powypadkowe</span><span>&bull;</span><span>Diagnostyka</span><span>&bull;</span>
            </span>
          ))}
        </div>
      </div>

      {/* ===== Usługi ===== */}
      <section className="section" id="uslugi">
        <div className="container">
          <div className="section__head reveal">
            <p className="section__eyebrow">Co wykonuję</p>
            <h2 className="section__title">Usługi</h2>
            <p className="section__sub">Od szybkiej wymiany płynów po kompleksowy remont silnika — sprawnie diagnozuję, naprawiam i pomagam szybko wrócić na drogę.</p>
          </div>
          <div className="cards">
            {services.map((s) => (
              <article className="card reveal" key={s.title}>
                <div className="card__icon" aria-hidden="true">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Galeria / Praca ===== */}
      <section className="section section--alt" id="praca">
        <div className="container">
          <div className="section__head reveal">
            <p className="section__eyebrow">Zobacz zdjęcia z mojej pracy</p>
            <h2 className="section__title">Ostatnie zlecenia</h2>
            <p className="section__sub">Kilka realizacji z warsztatu — silniki, układy napędowe i auta klientów.</p>
          </div>
          <div className="gallery" id="gallery">
            <div className="gallery__track">
              {[...gallery, ...gallery].map((g, i) => (
                <figure className="gallery__item" key={i} onClick={() => setLightbox(i % gallery.length)}>
                  <img src={g.src} alt={g.alt} loading="lazy" />
                  <figcaption>{g.cap}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== O mnie ===== */}
      <section className="section" id="o-mnie">
        <div className="container about">
          <div className="about__media reveal">
            <div className="about__photo">
              <img src="/images/zdj1.jpg" alt="Mechanik WorkshopJS przy pracy nad silnikiem BMW w Łańcucie" loading="lazy" />
              <span className="about__badge">13 lat doświadczenia</span>
            </div>
            <div className="about__accent" aria-hidden="true"></div>
          </div>
          <div className="about__body reveal">
            <p className="section__eyebrow">O mnie</p>
            <h2 className="section__title">Uczciwie, konkretnie i porządnie</h2>
            <p className="about__quote">„Nie naciągam na niepotrzebne naprawy. Najpierw dokładnie diagnozuję problem, potem proponuję najlepsze rozwiązanie. Wolę naprawić auto raz i porządnie, niż widzieć je co miesiąc z tym samym problemem."</p>
            <p>WorkshopJS to niezależny serwis BMW (i nie tylko) w Łańcucie. Od 13 lat zajmuję się mechaniką — od serwisu okresowego, przez wymianę rozrządu i panewek, aż po swapy silników i naprawę aut powypadkowych.</p>
            <ul className="about__list">
              <li>Rzetelna diagnostyka przed naprawą</li>
              <li>Specjalizacja w silnikach BMW</li>
              <li>Zdjęcia z przebiegu prac</li>
              <li>Uczciwa wycena, bez wciskania zbędnych usług</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ===== Opinie ===== */}
      <section className="section section--alt" id="opinie">
        <div className="container">
          <div className="section__head reveal">
            <p className="section__eyebrow">Prosto od kierowców</p>
            <h2 className="section__title">Opinie</h2>
          </div>
          <div className="quotes" id="quotes">
            <div className="quotes__track">
              {[...quotes, ...quotes].map((q, i) => (
                <figure className="quote" key={i}>
                  <div className="quote__stars">★★★★★</div>
                  <blockquote>{"„" + q.text + "\u201d"}</blockquote>
                  <figcaption><strong>{q.name}</strong><span>{q.car}</span></figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Kontakt ===== */}
      <section className="section contact" id="kontakt">
        <div className="container contact__inner">
          <div className="contact__info reveal">
            <p className="section__eyebrow">Wpadnij do nas</p>
            <h2 className="section__title">Skontaktuj się z nami</h2>
            <p className="contact__lead">Zaplanuj wizytę — napisz lub zadzwoń, dobierzemy termin i wstępnie ocenimy zakres prac.</p>
            <ul className="contact__details">
              <li>
                <span className="contact__ico" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" /><circle cx="12" cy="10" r="2.6" /></svg>
                </span>
                <div><strong>Adres</strong><br />Kraszewskiego 219, 37-100 Łańcut</div>
              </li>
              <li>
                <span className="contact__ico" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6.5 3.5 9 3l1.6 4-2 1.5a12 12 0 0 0 5.4 5.4L15.5 12l4 1.6-.5 2.5a2 2 0 0 1-2.2 1.6A15.5 15.5 0 0 1 3.3 5.7 2 2 0 0 1 4.9 3.5z" /></svg>
                </span>
                <div><strong>Telefon</strong><br /><a href="tel:+48793980808">+48 793 980 808</a></div>
              </li>
              <li>
                <span className="contact__ico" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></svg>
                </span>
                <div><strong>Godziny</strong><br />Pon–Pt 07:30 – 18:00 &middot; Sob 08:00 – 13:00 &middot; Ndz nieczynne</div>
              </li>
            </ul>
          </div>

          <form
            className="contact__form reveal"
            id="contactForm"
            method="POST"
            action={emailReady ? `https://formsubmit.co/${encodeURIComponent(FORMSUBMIT_EMAIL)}` : undefined}
            noValidate
            ref={formRef}
            onSubmit={handleSubmit}
          >
            <input type="hidden" name="_subject" value="Nowe zgłoszenie ze strony WorkshopJS" />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_captcha" value="false" />
            {emailReady && <input type="hidden" name="_next" value={nextUrl} />}
            <input type="text" name="_honey" tabIndex={-1} autoComplete="off" style={{ position: "absolute", left: "-9999px" }} aria-hidden="true" />
            <div className="field">
              <label htmlFor="name">Imię</label>
              <input type="text" id="name" name="name" placeholder="Jan Kowalski" required />
            </div>
            <div className="field field--split">
              <div>
                <label htmlFor="phone">Nr. tel</label>
                <input type="tel" id="phone" name="phone" placeholder="+48 ..." required />
              </div>
              <div>
                <label htmlFor="car">Model auta</label>
                <input type="text" id="car" name="car" placeholder="np. BMW E90" />
              </div>
            </div>
            <div className="field">
              <label htmlFor="message">Wiadomość <span className="field__hint">(limit 300 znaków)</span></label>
              <textarea id="message" name="message" rows={5} maxLength={300} placeholder="Opisz krótko, w czym możemy pomóc..." required></textarea>
            </div>
            <button type="submit" className="btn btn--primary btn--block">Wyślij</button>
            <p className={"form__note" + (note.type ? " " + note.type : "")} id="formNote" role="status">{note.text}</p>
          </form>
        </div>

        <div className="map reveal">
          <iframe
            title="Mapa — WorkshopJS, Kraszewskiego 219, Łańcut"
            src="https://www.openstreetmap.org/export/embed.html?bbox=22.1954%2C50.0651%2C22.2174%2C50.0751&layer=mapnik&marker=50.0700595%2C22.2063847"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>

      {/* ===== Stopka ===== */}
      <footer className="footer">
        <div className="container footer__inner">
          <div className="footer__brand">
            <img src="/images/logogit3.png" alt="WorkshopJS" className="footer__logo" />
            <p>Niezależny serwis BMW i nie tylko — Łańcut, Rzeszów i okolice.</p>
          </div>
          <nav className="footer__nav" aria-label="Stopka">
            <a href="#uslugi">Usługi</a>
            <a href="#praca">Praca</a>
            <a href="#opinie">Opinie</a>
            <a href="#kontakt">Kontakt</a>
          </nav>
          <div className="footer__contact">
            <span>Kraszewskiego 219, 37-100 Łańcut</span>
            <a href="tel:+48793980808">+48 793 980 808</a>
            <span>Pon–Pt 07:30–18:00 · Sob 08:00–13:00</span>
          </div>
        </div>
        <div className="footer__bar">
          <div className="container">
            <span>© {new Date().getFullYear()} WorkshopJS · Serwis BMW Łańcut</span>
            <span className="footer__disclaimer">BMW jest zastrzeżonym znakiem towarowym BMW AG. WorkshopJS jest niezależnym serwisem.</span>
          </div>
        </div>
      </footer>

      <a href="tel:+48793980808" className="fab" aria-label="Zadzwoń do WorkshopJS">📞</a>

      {/* ===== Lightbox ===== */}
      <div
        className={"lightbox" + (lightbox !== null ? " open" : "")}
        id="lightbox"
        aria-hidden={lightbox === null}
        onClick={(e) => { if (e.target === e.currentTarget) setLightbox(null); }}
      >
        <button className="lightbox__close" aria-label="Zamknij" onClick={() => setLightbox(null)}>&times;</button>
        <button className="lightbox__nav lightbox__nav--prev" aria-label="Poprzednie" onClick={() => setLightbox((i) => (i - 1 + gallery.length) % gallery.length)}>&#8249;</button>
        <img className="lightbox__img" src={lightbox !== null ? gallery[lightbox].src : ""} alt={lightbox !== null ? gallery[lightbox].alt : ""} />
        <button className="lightbox__nav lightbox__nav--next" aria-label="Następne" onClick={() => setLightbox((i) => (i + 1) % gallery.length)}>&#8250;</button>
        <p className="lightbox__caption">{lightbox !== null ? gallery[lightbox].cap : ""}</p>
      </div>
    </>
  );
}
